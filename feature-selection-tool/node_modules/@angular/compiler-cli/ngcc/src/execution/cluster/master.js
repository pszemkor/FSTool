/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/execution/cluster/master", ["require", "exports", "tslib", "cluster", "@angular/compiler-cli/ngcc/src/execution/tasks/utils", "@angular/compiler-cli/ngcc/src/execution/cluster/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /// <reference types="node" />
    var cluster = require("cluster");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/execution/tasks/utils");
    var utils_2 = require("@angular/compiler-cli/ngcc/src/execution/cluster/utils");
    /**
     * The cluster master is responsible for analyzing all entry-points, planning the work that needs to
     * be done, distributing it to worker-processes and collecting/post-processing the results.
     */
    var ClusterMaster = /** @class */ (function () {
        function ClusterMaster(maxWorkerCount, fileSystem, logger, pkgJsonUpdater, analyzeEntryPoints, createTaskCompletedCallback) {
            this.maxWorkerCount = maxWorkerCount;
            this.fileSystem = fileSystem;
            this.logger = logger;
            this.pkgJsonUpdater = pkgJsonUpdater;
            this.finishedDeferred = new utils_2.Deferred();
            this.processingStartTime = -1;
            this.taskAssignments = new Map();
            if (!cluster.isMaster) {
                throw new Error('Tried to instantiate `ClusterMaster` on a worker process.');
            }
            // Set the worker entry-point
            cluster.setupMaster({ exec: this.fileSystem.resolve(__dirname, 'worker.js') });
            this.taskQueue = analyzeEntryPoints();
            this.onTaskCompleted = createTaskCompletedCallback(this.taskQueue);
        }
        ClusterMaster.prototype.run = function () {
            var _this = this;
            if (this.taskQueue.allTasksCompleted) {
                return Promise.resolve();
            }
            // Set up listeners for worker events (emitted on `cluster`).
            cluster.on('online', this.wrapEventHandler(function (worker) { return _this.onWorkerOnline(worker.id); }));
            cluster.on('message', this.wrapEventHandler(function (worker, msg) { return _this.onWorkerMessage(worker.id, msg); }));
            cluster.on('exit', this.wrapEventHandler(function (worker, code, signal) { return _this.onWorkerExit(worker, code, signal); }));
            // Since we have pending tasks at the very minimum we need a single worker.
            cluster.fork();
            return this.finishedDeferred.promise.then(function () { return _this.stopWorkers(); }, function (err) {
                _this.stopWorkers();
                return Promise.reject(err);
            });
        };
        /** Try to find available (idle) workers and assign them available (non-blocked) tasks. */
        ClusterMaster.prototype.maybeDistributeWork = function () {
            var e_1, _a;
            var isWorkerAvailable = false;
            // First, check whether all tasks have been completed.
            if (this.taskQueue.allTasksCompleted) {
                var duration = Math.round((Date.now() - this.processingStartTime) / 100) / 10;
                this.logger.debug("Processed tasks in " + duration + "s.");
                return this.finishedDeferred.resolve();
            }
            try {
                // Look for available workers and available tasks to assign to them.
                for (var _b = tslib_1.__values(Array.from(this.taskAssignments)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = tslib_1.__read(_c.value, 2), workerId = _d[0], assignedTask = _d[1];
                    if (assignedTask !== null) {
                        // This worker already has a job; check other workers.
                        continue;
                    }
                    else {
                        // This worker is available.
                        isWorkerAvailable = true;
                    }
                    // This worker needs a job. See if any are available.
                    var task = this.taskQueue.getNextTask();
                    if (task === null) {
                        // No suitable work available right now.
                        break;
                    }
                    // Process the next task on the worker.
                    this.taskAssignments.set(workerId, task);
                    utils_2.sendMessageToWorker(workerId, { type: 'process-task', task: task });
                    isWorkerAvailable = false;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (!isWorkerAvailable) {
                var spawnedWorkerCount = Object.keys(cluster.workers).length;
                if (spawnedWorkerCount < this.maxWorkerCount) {
                    this.logger.debug('Spawning another worker process as there is more work to be done.');
                    cluster.fork();
                }
                else {
                    // If there are no available workers or no available tasks, log (for debugging purposes).
                    this.logger.debug("All " + spawnedWorkerCount + " workers are currently busy and cannot take on more work.");
                }
            }
            else {
                var busyWorkers = Array.from(this.taskAssignments)
                    .filter(function (_a) {
                    var _b = tslib_1.__read(_a, 2), _workerId = _b[0], task = _b[1];
                    return task !== null;
                })
                    .map(function (_a) {
                    var _b = tslib_1.__read(_a, 1), workerId = _b[0];
                    return workerId;
                });
                var totalWorkerCount = this.taskAssignments.size;
                var idleWorkerCount = totalWorkerCount - busyWorkers.length;
                this.logger.debug("No assignments for " + idleWorkerCount + " idle (out of " + totalWorkerCount + " total) " +
                    ("workers. Busy workers: " + busyWorkers.join(', ')));
                if (busyWorkers.length === 0) {
                    // This is a bug:
                    // All workers are idle (meaning no tasks are in progress) and `taskQueue.allTasksCompleted`
                    // is `false`, but there is still no assignable work.
                    throw new Error('There are still unprocessed tasks in the queue and no tasks are currently in ' +
                        ("progress, yet the queue did not return any available tasks: " + this.taskQueue));
                }
            }
        };
        /** Handle a worker's exiting. (Might be intentional or not.) */
        ClusterMaster.prototype.onWorkerExit = function (worker, code, signal) {
            // If the worker's exiting was intentional, nothing to do.
            if (worker.exitedAfterDisconnect)
                return;
            // The worker exited unexpectedly: Determine it's status and take an appropriate action.
            var currentTask = this.taskAssignments.get(worker.id);
            this.logger.warn("Worker #" + worker.id + " exited unexpectedly (code: " + code + " | signal: " + signal + ").\n" +
                ("  Current assignment: " + ((currentTask == null) ? '-' : utils_1.stringifyTask(currentTask))));
            if (currentTask == null) {
                // The crashed worker process was not in the middle of a task:
                // Just spawn another process.
                this.logger.debug("Spawning another worker process to replace #" + worker.id + "...");
                this.taskAssignments.delete(worker.id);
                cluster.fork();
            }
            else {
                // The crashed worker process was in the middle of a task:
                // Impossible to know whether we can recover (without ending up with a corrupted entry-point).
                throw new Error('Process unexpectedly crashed, while processing format property ' +
                    (currentTask.formatProperty + " for entry-point '" + currentTask.entryPoint.path + "'."));
            }
        };
        /** Handle a message from a worker. */
        ClusterMaster.prototype.onWorkerMessage = function (workerId, msg) {
            if (!this.taskAssignments.has(workerId)) {
                var knownWorkers = Array.from(this.taskAssignments.keys());
                throw new Error("Received message from unknown worker #" + workerId + " (known workers: " +
                    (knownWorkers.join(', ') + "): " + JSON.stringify(msg)));
            }
            switch (msg.type) {
                case 'error':
                    throw new Error("Error on worker #" + workerId + ": " + msg.error);
                case 'task-completed':
                    return this.onWorkerTaskCompleted(workerId, msg);
                case 'update-package-json':
                    return this.onWorkerUpdatePackageJson(workerId, msg);
                default:
                    throw new Error("Invalid message received from worker #" + workerId + ": " + JSON.stringify(msg));
            }
        };
        /** Handle a worker's coming online. */
        ClusterMaster.prototype.onWorkerOnline = function (workerId) {
            if (this.taskAssignments.has(workerId)) {
                throw new Error("Invariant violated: Worker #" + workerId + " came online more than once.");
            }
            if (this.processingStartTime === -1) {
                this.logger.debug('Processing tasks...');
                this.processingStartTime = Date.now();
            }
            this.taskAssignments.set(workerId, null);
            this.maybeDistributeWork();
        };
        /** Handle a worker's having completed their assigned task. */
        ClusterMaster.prototype.onWorkerTaskCompleted = function (workerId, msg) {
            var task = this.taskAssignments.get(workerId) || null;
            if (task === null) {
                throw new Error("Expected worker #" + workerId + " to have a task assigned, while handling message: " +
                    JSON.stringify(msg));
            }
            this.onTaskCompleted(task, msg.outcome, msg.message);
            this.taskQueue.markTaskCompleted(task);
            this.taskAssignments.set(workerId, null);
            this.maybeDistributeWork();
        };
        /** Handle a worker's request to update a `package.json` file. */
        ClusterMaster.prototype.onWorkerUpdatePackageJson = function (workerId, msg) {
            var task = this.taskAssignments.get(workerId) || null;
            if (task === null) {
                throw new Error("Expected worker #" + workerId + " to have a task assigned, while handling message: " +
                    JSON.stringify(msg));
            }
            var expectedPackageJsonPath = this.fileSystem.resolve(task.entryPoint.path, 'package.json');
            var parsedPackageJson = task.entryPoint.packageJson;
            if (expectedPackageJsonPath !== msg.packageJsonPath) {
                throw new Error("Received '" + msg.type + "' message from worker #" + workerId + " for '" + msg.packageJsonPath + "', " +
                    ("but was expecting '" + expectedPackageJsonPath + "' (based on task assignment)."));
            }
            // NOTE: Although the change in the parsed `package.json` will be reflected in tasks objects
            //       locally and thus also in future `process-task` messages sent to worker processes, any
            //       processes already running and processing a task for the same entry-point will not get
            //       the change.
            //       Do not rely on having an up-to-date `package.json` representation in worker processes.
            //       In other words, task processing should only rely on the info that was there when the
            //       file was initially parsed (during entry-point analysis) and not on the info that might
            //       be added later (during task processing).
            this.pkgJsonUpdater.writeChanges(msg.changes, msg.packageJsonPath, parsedPackageJson);
        };
        /** Stop all workers and stop listening on cluster events. */
        ClusterMaster.prototype.stopWorkers = function () {
            var workers = Object.values(cluster.workers);
            this.logger.debug("Stopping " + workers.length + " workers...");
            cluster.removeAllListeners();
            workers.forEach(function (worker) { return worker.kill(); });
        };
        /**
         * Wrap an event handler to ensure that `finishedDeferred` will be rejected on error (regardless
         * if the handler completes synchronously or asynchronously).
         */
        ClusterMaster.prototype.wrapEventHandler = function (fn) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var err_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fn.apply(void 0, tslib_1.__spread(args))];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                this.finishedDeferred.reject(err_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
        };
        return ClusterMaster;
    }());
    exports.ClusterMaster = ClusterMaster;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL25nY2Mvc3JjL2V4ZWN1dGlvbi9jbHVzdGVyL21hc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCw4QkFBOEI7SUFFOUIsaUNBQW1DO0lBT25DLDhFQUE2QztJQUc3QyxnRkFBc0Q7SUFHdEQ7OztPQUdHO0lBQ0g7UUFPRSx1QkFDWSxjQUFzQixFQUFVLFVBQXNCLEVBQVUsTUFBYyxFQUM5RSxjQUFrQyxFQUFFLGtCQUF3QyxFQUNwRiwyQkFBd0Q7WUFGaEQsbUJBQWMsR0FBZCxjQUFjLENBQVE7WUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUM5RSxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7WUFSdEMscUJBQWdCLEdBQUcsSUFBSSxnQkFBUSxFQUFRLENBQUM7WUFDeEMsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztZQVFyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO2FBQzlFO1lBRUQsNkJBQTZCO1lBQzdCLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUU3RSxJQUFJLENBQUMsU0FBUyxHQUFHLGtCQUFrQixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELDJCQUFHLEdBQUg7WUFBQSxpQkFzQkM7WUFyQkMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFO2dCQUNwQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQjtZQUVELDZEQUE2RDtZQUM3RCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDLENBQUM7WUFFdEYsT0FBTyxDQUFDLEVBQUUsQ0FDTixTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDLENBQUM7WUFFN0YsT0FBTyxDQUFDLEVBQUUsQ0FDTixNQUFNLEVBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQyxDQUFDO1lBRTlGLDJFQUEyRTtZQUMzRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFZixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLEVBQUUsVUFBQSxHQUFHO2dCQUNyRSxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCwwRkFBMEY7UUFDbEYsMkNBQW1CLEdBQTNCOztZQUNFLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBRTlCLHNEQUFzRDtZQUN0RCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3BDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBc0IsUUFBUSxPQUFJLENBQUMsQ0FBQztnQkFFdEQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEM7O2dCQUVELG9FQUFvRTtnQkFDcEUsS0FBdUMsSUFBQSxLQUFBLGlCQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO29CQUE5RCxJQUFBLGdDQUF3QixFQUF2QixnQkFBUSxFQUFFLG9CQUFZO29CQUNoQyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7d0JBQ3pCLHNEQUFzRDt3QkFDdEQsU0FBUztxQkFDVjt5QkFBTTt3QkFDTCw0QkFBNEI7d0JBQzVCLGlCQUFpQixHQUFHLElBQUksQ0FBQztxQkFDMUI7b0JBRUQscURBQXFEO29CQUNyRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMxQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7d0JBQ2pCLHdDQUF3Qzt3QkFDeEMsTUFBTTtxQkFDUDtvQkFFRCx1Q0FBdUM7b0JBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDekMsMkJBQW1CLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLE1BQUEsRUFBQyxDQUFDLENBQUM7b0JBRTVELGlCQUFpQixHQUFHLEtBQUssQ0FBQztpQkFDM0I7Ozs7Ozs7OztZQUVELElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDdEIsSUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQy9ELElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztvQkFDdkYsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDTCx5RkFBeUY7b0JBQ3pGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNiLFNBQU8sa0JBQWtCLDhEQUEyRCxDQUFDLENBQUM7aUJBQzNGO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO3FCQUMzQixNQUFNLENBQUMsVUFBQyxFQUFpQjt3QkFBakIsMEJBQWlCLEVBQWhCLGlCQUFTLEVBQUUsWUFBSTtvQkFBTSxPQUFBLElBQUksS0FBSyxJQUFJO2dCQUFiLENBQWEsQ0FBQztxQkFDNUMsR0FBRyxDQUFDLFVBQUMsRUFBVTt3QkFBViwwQkFBVSxFQUFULGdCQUFRO29CQUFNLE9BQUEsUUFBUTtnQkFBUixDQUFRLENBQUMsQ0FBQztnQkFDdkQsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDbkQsSUFBTSxlQUFlLEdBQUcsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFFOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2Isd0JBQXNCLGVBQWUsc0JBQWlCLGdCQUFnQixhQUFVO3FCQUNoRiw0QkFBMEIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQSxDQUFDLENBQUM7Z0JBRXhELElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzVCLGlCQUFpQjtvQkFDakIsNEZBQTRGO29CQUM1RixxREFBcUQ7b0JBQ3JELE1BQU0sSUFBSSxLQUFLLENBQ1gsK0VBQStFO3lCQUMvRSxpRUFBK0QsSUFBSSxDQUFDLFNBQVcsQ0FBQSxDQUFDLENBQUM7aUJBQ3RGO2FBQ0Y7UUFDSCxDQUFDO1FBRUQsZ0VBQWdFO1FBQ3hELG9DQUFZLEdBQXBCLFVBQXFCLE1BQXNCLEVBQUUsSUFBaUIsRUFBRSxNQUFtQjtZQUNqRiwwREFBMEQ7WUFDMUQsSUFBSSxNQUFNLENBQUMscUJBQXFCO2dCQUFFLE9BQU87WUFFekMsd0ZBQXdGO1lBQ3hGLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDWixhQUFXLE1BQU0sQ0FBQyxFQUFFLG9DQUErQixJQUFJLG1CQUFjLE1BQU0sU0FBTTtpQkFDakYsNEJBQXlCLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHFCQUFhLENBQUMsV0FBVyxDQUFDLENBQUUsQ0FBQSxDQUFDLENBQUM7WUFFekYsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUN2Qiw4REFBOEQ7Z0JBQzlELDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaURBQStDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQyxDQUFDO2dCQUNqRixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCwwREFBMEQ7Z0JBQzFELDhGQUE4RjtnQkFDOUYsTUFBTSxJQUFJLEtBQUssQ0FDWCxpRUFBaUU7cUJBQzlELFdBQVcsQ0FBQyxjQUFjLDBCQUFxQixXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksT0FBSSxDQUFBLENBQUMsQ0FBQzthQUN4RjtRQUNILENBQUM7UUFFRCxzQ0FBc0M7UUFDOUIsdUNBQWUsR0FBdkIsVUFBd0IsUUFBZ0IsRUFBRSxHQUFzQjtZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZDLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLElBQUksS0FBSyxDQUNYLDJDQUF5QyxRQUFRLHNCQUFtQjtxQkFDakUsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRyxDQUFBLENBQUMsQ0FBQzthQUM1RDtZQUVELFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDaEIsS0FBSyxPQUFPO29CQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQW9CLFFBQVEsVUFBSyxHQUFHLENBQUMsS0FBTyxDQUFDLENBQUM7Z0JBQ2hFLEtBQUssZ0JBQWdCO29CQUNuQixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ25ELEtBQUsscUJBQXFCO29CQUN4QixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZEO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQ1gsMkNBQXlDLFFBQVEsVUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7YUFDcEY7UUFDSCxDQUFDO1FBRUQsdUNBQXVDO1FBQy9CLHNDQUFjLEdBQXRCLFVBQXVCLFFBQWdCO1lBQ3JDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLFFBQVEsaUNBQThCLENBQUMsQ0FBQzthQUN4RjtZQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3ZDO1lBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFFRCw4REFBOEQ7UUFDdEQsNkNBQXFCLEdBQTdCLFVBQThCLFFBQWdCLEVBQUUsR0FBeUI7WUFDdkUsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDO1lBRXhELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FDWCxzQkFBb0IsUUFBUSx1REFBb0Q7b0JBQ2hGLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMxQjtZQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFFRCxpRUFBaUU7UUFDekQsaURBQXlCLEdBQWpDLFVBQWtDLFFBQWdCLEVBQUUsR0FBNkI7WUFDL0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDO1lBRXhELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FDWCxzQkFBb0IsUUFBUSx1REFBb0Q7b0JBQ2hGLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMxQjtZQUVELElBQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDOUYsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUV0RCxJQUFJLHVCQUF1QixLQUFLLEdBQUcsQ0FBQyxlQUFlLEVBQUU7Z0JBQ25ELE1BQU0sSUFBSSxLQUFLLENBQ1gsZUFBYSxHQUFHLENBQUMsSUFBSSwrQkFBMEIsUUFBUSxjQUFTLEdBQUcsQ0FBQyxlQUFlLFFBQUs7cUJBQ3hGLHdCQUFzQix1QkFBdUIsa0NBQStCLENBQUEsQ0FBQyxDQUFDO2FBQ25GO1lBRUQsNEZBQTRGO1lBQzVGLDhGQUE4RjtZQUM5Riw4RkFBOEY7WUFDOUYsb0JBQW9CO1lBQ3BCLCtGQUErRjtZQUMvRiw2RkFBNkY7WUFDN0YsK0ZBQStGO1lBQy9GLGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBRUQsNkRBQTZEO1FBQ3JELG1DQUFXLEdBQW5CO1lBQ0UsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFxQixDQUFDO1lBQ25FLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksT0FBTyxDQUFDLE1BQU0sZ0JBQWEsQ0FBQyxDQUFDO1lBRTNELE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7V0FHRztRQUNLLHdDQUFnQixHQUF4QixVQUFpRCxFQUF5QztZQUExRixpQkFTQztZQVBDLE9BQU87Z0JBQU8sY0FBYTtxQkFBYixVQUFhLEVBQWIscUJBQWEsRUFBYixJQUFhO29CQUFiLHlCQUFhOzs7Ozs7OztnQ0FFdkIscUJBQU0sRUFBRSxnQ0FBSSxJQUFJLElBQUM7O2dDQUFqQixTQUFpQixDQUFDOzs7O2dDQUVsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUcsQ0FBQyxDQUFDOzs7Ozs7YUFFckMsQ0FBQztRQUNKLENBQUM7UUFDSCxvQkFBQztJQUFELENBQUMsQUF4UEQsSUF3UEM7SUF4UFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwibm9kZVwiIC8+XG5cbmltcG9ydCAqIGFzIGNsdXN0ZXIgZnJvbSAnY2x1c3Rlcic7XG5cbmltcG9ydCB7RmlsZVN5c3RlbX0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL25ndHNjL2ZpbGVfc3lzdGVtJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZ2dlcic7XG5pbXBvcnQge1BhY2thZ2VKc29uVXBkYXRlcn0gZnJvbSAnLi4vLi4vd3JpdGluZy9wYWNrYWdlX2pzb25fdXBkYXRlcic7XG5pbXBvcnQge0FuYWx5emVFbnRyeVBvaW50c0ZufSBmcm9tICcuLi9hcGknO1xuaW1wb3J0IHtDcmVhdGVUYXNrQ29tcGxldGVkQ2FsbGJhY2ssIFRhc2ssIFRhc2tDb21wbGV0ZWRDYWxsYmFjaywgVGFza1F1ZXVlfSBmcm9tICcuLi90YXNrcy9hcGknO1xuaW1wb3J0IHtzdHJpbmdpZnlUYXNrfSBmcm9tICcuLi90YXNrcy91dGlscyc7XG5cbmltcG9ydCB7TWVzc2FnZUZyb21Xb3JrZXIsIFRhc2tDb21wbGV0ZWRNZXNzYWdlLCBVcGRhdGVQYWNrYWdlSnNvbk1lc3NhZ2V9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7RGVmZXJyZWQsIHNlbmRNZXNzYWdlVG9Xb3JrZXJ9IGZyb20gJy4vdXRpbHMnO1xuXG5cbi8qKlxuICogVGhlIGNsdXN0ZXIgbWFzdGVyIGlzIHJlc3BvbnNpYmxlIGZvciBhbmFseXppbmcgYWxsIGVudHJ5LXBvaW50cywgcGxhbm5pbmcgdGhlIHdvcmsgdGhhdCBuZWVkcyB0b1xuICogYmUgZG9uZSwgZGlzdHJpYnV0aW5nIGl0IHRvIHdvcmtlci1wcm9jZXNzZXMgYW5kIGNvbGxlY3RpbmcvcG9zdC1wcm9jZXNzaW5nIHRoZSByZXN1bHRzLlxuICovXG5leHBvcnQgY2xhc3MgQ2x1c3Rlck1hc3RlciB7XG4gIHByaXZhdGUgZmluaXNoZWREZWZlcnJlZCA9IG5ldyBEZWZlcnJlZDx2b2lkPigpO1xuICBwcml2YXRlIHByb2Nlc3NpbmdTdGFydFRpbWU6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIHRhc2tBc3NpZ25tZW50cyA9IG5ldyBNYXA8bnVtYmVyLCBUYXNrfG51bGw+KCk7XG4gIHByaXZhdGUgdGFza1F1ZXVlOiBUYXNrUXVldWU7XG4gIHByaXZhdGUgb25UYXNrQ29tcGxldGVkOiBUYXNrQ29tcGxldGVkQ2FsbGJhY2s7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIG1heFdvcmtlckNvdW50OiBudW1iZXIsIHByaXZhdGUgZmlsZVN5c3RlbTogRmlsZVN5c3RlbSwgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlcixcbiAgICAgIHByaXZhdGUgcGtnSnNvblVwZGF0ZXI6IFBhY2thZ2VKc29uVXBkYXRlciwgYW5hbHl6ZUVudHJ5UG9pbnRzOiBBbmFseXplRW50cnlQb2ludHNGbixcbiAgICAgIGNyZWF0ZVRhc2tDb21wbGV0ZWRDYWxsYmFjazogQ3JlYXRlVGFza0NvbXBsZXRlZENhbGxiYWNrKSB7XG4gICAgaWYgKCFjbHVzdGVyLmlzTWFzdGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGluc3RhbnRpYXRlIGBDbHVzdGVyTWFzdGVyYCBvbiBhIHdvcmtlciBwcm9jZXNzLicpO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgd29ya2VyIGVudHJ5LXBvaW50XG4gICAgY2x1c3Rlci5zZXR1cE1hc3Rlcih7ZXhlYzogdGhpcy5maWxlU3lzdGVtLnJlc29sdmUoX19kaXJuYW1lLCAnd29ya2VyLmpzJyl9KTtcblxuICAgIHRoaXMudGFza1F1ZXVlID0gYW5hbHl6ZUVudHJ5UG9pbnRzKCk7XG4gICAgdGhpcy5vblRhc2tDb21wbGV0ZWQgPSBjcmVhdGVUYXNrQ29tcGxldGVkQ2FsbGJhY2sodGhpcy50YXNrUXVldWUpO1xuICB9XG5cbiAgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLnRhc2tRdWV1ZS5hbGxUYXNrc0NvbXBsZXRlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIC8vIFNldCB1cCBsaXN0ZW5lcnMgZm9yIHdvcmtlciBldmVudHMgKGVtaXR0ZWQgb24gYGNsdXN0ZXJgKS5cbiAgICBjbHVzdGVyLm9uKCdvbmxpbmUnLCB0aGlzLndyYXBFdmVudEhhbmRsZXIod29ya2VyID0+IHRoaXMub25Xb3JrZXJPbmxpbmUod29ya2VyLmlkKSkpO1xuXG4gICAgY2x1c3Rlci5vbihcbiAgICAgICAgJ21lc3NhZ2UnLCB0aGlzLndyYXBFdmVudEhhbmRsZXIoKHdvcmtlciwgbXNnKSA9PiB0aGlzLm9uV29ya2VyTWVzc2FnZSh3b3JrZXIuaWQsIG1zZykpKTtcblxuICAgIGNsdXN0ZXIub24oXG4gICAgICAgICdleGl0JyxcbiAgICAgICAgdGhpcy53cmFwRXZlbnRIYW5kbGVyKCh3b3JrZXIsIGNvZGUsIHNpZ25hbCkgPT4gdGhpcy5vbldvcmtlckV4aXQod29ya2VyLCBjb2RlLCBzaWduYWwpKSk7XG5cbiAgICAvLyBTaW5jZSB3ZSBoYXZlIHBlbmRpbmcgdGFza3MgYXQgdGhlIHZlcnkgbWluaW11bSB3ZSBuZWVkIGEgc2luZ2xlIHdvcmtlci5cbiAgICBjbHVzdGVyLmZvcmsoKTtcblxuICAgIHJldHVybiB0aGlzLmZpbmlzaGVkRGVmZXJyZWQucHJvbWlzZS50aGVuKCgpID0+IHRoaXMuc3RvcFdvcmtlcnMoKSwgZXJyID0+IHtcbiAgICAgIHRoaXMuc3RvcFdvcmtlcnMoKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFRyeSB0byBmaW5kIGF2YWlsYWJsZSAoaWRsZSkgd29ya2VycyBhbmQgYXNzaWduIHRoZW0gYXZhaWxhYmxlIChub24tYmxvY2tlZCkgdGFza3MuICovXG4gIHByaXZhdGUgbWF5YmVEaXN0cmlidXRlV29yaygpOiB2b2lkIHtcbiAgICBsZXQgaXNXb3JrZXJBdmFpbGFibGUgPSBmYWxzZTtcblxuICAgIC8vIEZpcnN0LCBjaGVjayB3aGV0aGVyIGFsbCB0YXNrcyBoYXZlIGJlZW4gY29tcGxldGVkLlxuICAgIGlmICh0aGlzLnRhc2tRdWV1ZS5hbGxUYXNrc0NvbXBsZXRlZCkge1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLnJvdW5kKChEYXRlLm5vdygpIC0gdGhpcy5wcm9jZXNzaW5nU3RhcnRUaW1lKSAvIDEwMCkgLyAxMDtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBQcm9jZXNzZWQgdGFza3MgaW4gJHtkdXJhdGlvbn1zLmApO1xuXG4gICAgICByZXR1cm4gdGhpcy5maW5pc2hlZERlZmVycmVkLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICAvLyBMb29rIGZvciBhdmFpbGFibGUgd29ya2VycyBhbmQgYXZhaWxhYmxlIHRhc2tzIHRvIGFzc2lnbiB0byB0aGVtLlxuICAgIGZvciAoY29uc3QgW3dvcmtlcklkLCBhc3NpZ25lZFRhc2tdIG9mIEFycmF5LmZyb20odGhpcy50YXNrQXNzaWdubWVudHMpKSB7XG4gICAgICBpZiAoYXNzaWduZWRUYXNrICE9PSBudWxsKSB7XG4gICAgICAgIC8vIFRoaXMgd29ya2VyIGFscmVhZHkgaGFzIGEgam9iOyBjaGVjayBvdGhlciB3b3JrZXJzLlxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgd29ya2VyIGlzIGF2YWlsYWJsZS5cbiAgICAgICAgaXNXb3JrZXJBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGlzIHdvcmtlciBuZWVkcyBhIGpvYi4gU2VlIGlmIGFueSBhcmUgYXZhaWxhYmxlLlxuICAgICAgY29uc3QgdGFzayA9IHRoaXMudGFza1F1ZXVlLmdldE5leHRUYXNrKCk7XG4gICAgICBpZiAodGFzayA9PT0gbnVsbCkge1xuICAgICAgICAvLyBObyBzdWl0YWJsZSB3b3JrIGF2YWlsYWJsZSByaWdodCBub3cuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBQcm9jZXNzIHRoZSBuZXh0IHRhc2sgb24gdGhlIHdvcmtlci5cbiAgICAgIHRoaXMudGFza0Fzc2lnbm1lbnRzLnNldCh3b3JrZXJJZCwgdGFzayk7XG4gICAgICBzZW5kTWVzc2FnZVRvV29ya2VyKHdvcmtlcklkLCB7dHlwZTogJ3Byb2Nlc3MtdGFzaycsIHRhc2t9KTtcblxuICAgICAgaXNXb3JrZXJBdmFpbGFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzV29ya2VyQXZhaWxhYmxlKSB7XG4gICAgICBjb25zdCBzcGF3bmVkV29ya2VyQ291bnQgPSBPYmplY3Qua2V5cyhjbHVzdGVyLndvcmtlcnMpLmxlbmd0aDtcbiAgICAgIGlmIChzcGF3bmVkV29ya2VyQ291bnQgPCB0aGlzLm1heFdvcmtlckNvdW50KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdTcGF3bmluZyBhbm90aGVyIHdvcmtlciBwcm9jZXNzIGFzIHRoZXJlIGlzIG1vcmUgd29yayB0byBiZSBkb25lLicpO1xuICAgICAgICBjbHVzdGVyLmZvcmsoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBhdmFpbGFibGUgd29ya2VycyBvciBubyBhdmFpbGFibGUgdGFza3MsIGxvZyAoZm9yIGRlYnVnZ2luZyBwdXJwb3NlcykuXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgYEFsbCAke3NwYXduZWRXb3JrZXJDb3VudH0gd29ya2VycyBhcmUgY3VycmVudGx5IGJ1c3kgYW5kIGNhbm5vdCB0YWtlIG9uIG1vcmUgd29yay5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYnVzeVdvcmtlcnMgPSBBcnJheS5mcm9tKHRoaXMudGFza0Fzc2lnbm1lbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoW193b3JrZXJJZCwgdGFza10pID0+IHRhc2sgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChbd29ya2VySWRdKSA9PiB3b3JrZXJJZCk7XG4gICAgICBjb25zdCB0b3RhbFdvcmtlckNvdW50ID0gdGhpcy50YXNrQXNzaWdubWVudHMuc2l6ZTtcbiAgICAgIGNvbnN0IGlkbGVXb3JrZXJDb3VudCA9IHRvdGFsV29ya2VyQ291bnQgLSBidXN5V29ya2Vycy5sZW5ndGg7XG5cbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFxuICAgICAgICAgIGBObyBhc3NpZ25tZW50cyBmb3IgJHtpZGxlV29ya2VyQ291bnR9IGlkbGUgKG91dCBvZiAke3RvdGFsV29ya2VyQ291bnR9IHRvdGFsKSBgICtcbiAgICAgICAgICBgd29ya2Vycy4gQnVzeSB3b3JrZXJzOiAke2J1c3lXb3JrZXJzLmpvaW4oJywgJyl9YCk7XG5cbiAgICAgIGlmIChidXN5V29ya2Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIGJ1ZzpcbiAgICAgICAgLy8gQWxsIHdvcmtlcnMgYXJlIGlkbGUgKG1lYW5pbmcgbm8gdGFza3MgYXJlIGluIHByb2dyZXNzKSBhbmQgYHRhc2tRdWV1ZS5hbGxUYXNrc0NvbXBsZXRlZGBcbiAgICAgICAgLy8gaXMgYGZhbHNlYCwgYnV0IHRoZXJlIGlzIHN0aWxsIG5vIGFzc2lnbmFibGUgd29yay5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ1RoZXJlIGFyZSBzdGlsbCB1bnByb2Nlc3NlZCB0YXNrcyBpbiB0aGUgcXVldWUgYW5kIG5vIHRhc2tzIGFyZSBjdXJyZW50bHkgaW4gJyArXG4gICAgICAgICAgICBgcHJvZ3Jlc3MsIHlldCB0aGUgcXVldWUgZGlkIG5vdCByZXR1cm4gYW55IGF2YWlsYWJsZSB0YXNrczogJHt0aGlzLnRhc2tRdWV1ZX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlIGEgd29ya2VyJ3MgZXhpdGluZy4gKE1pZ2h0IGJlIGludGVudGlvbmFsIG9yIG5vdC4pICovXG4gIHByaXZhdGUgb25Xb3JrZXJFeGl0KHdvcmtlcjogY2x1c3Rlci5Xb3JrZXIsIGNvZGU6IG51bWJlcnxudWxsLCBzaWduYWw6IHN0cmluZ3xudWxsKTogdm9pZCB7XG4gICAgLy8gSWYgdGhlIHdvcmtlcidzIGV4aXRpbmcgd2FzIGludGVudGlvbmFsLCBub3RoaW5nIHRvIGRvLlxuICAgIGlmICh3b3JrZXIuZXhpdGVkQWZ0ZXJEaXNjb25uZWN0KSByZXR1cm47XG5cbiAgICAvLyBUaGUgd29ya2VyIGV4aXRlZCB1bmV4cGVjdGVkbHk6IERldGVybWluZSBpdCdzIHN0YXR1cyBhbmQgdGFrZSBhbiBhcHByb3ByaWF0ZSBhY3Rpb24uXG4gICAgY29uc3QgY3VycmVudFRhc2sgPSB0aGlzLnRhc2tBc3NpZ25tZW50cy5nZXQod29ya2VyLmlkKTtcblxuICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgIGBXb3JrZXIgIyR7d29ya2VyLmlkfSBleGl0ZWQgdW5leHBlY3RlZGx5IChjb2RlOiAke2NvZGV9IHwgc2lnbmFsOiAke3NpZ25hbH0pLlxcbmAgK1xuICAgICAgICBgICBDdXJyZW50IGFzc2lnbm1lbnQ6ICR7KGN1cnJlbnRUYXNrID09IG51bGwpID8gJy0nIDogc3RyaW5naWZ5VGFzayhjdXJyZW50VGFzayl9YCk7XG5cbiAgICBpZiAoY3VycmVudFRhc2sgPT0gbnVsbCkge1xuICAgICAgLy8gVGhlIGNyYXNoZWQgd29ya2VyIHByb2Nlc3Mgd2FzIG5vdCBpbiB0aGUgbWlkZGxlIG9mIGEgdGFzazpcbiAgICAgIC8vIEp1c3Qgc3Bhd24gYW5vdGhlciBwcm9jZXNzLlxuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFNwYXduaW5nIGFub3RoZXIgd29ya2VyIHByb2Nlc3MgdG8gcmVwbGFjZSAjJHt3b3JrZXIuaWR9Li4uYCk7XG4gICAgICB0aGlzLnRhc2tBc3NpZ25tZW50cy5kZWxldGUod29ya2VyLmlkKTtcbiAgICAgIGNsdXN0ZXIuZm9yaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgY3Jhc2hlZCB3b3JrZXIgcHJvY2VzcyB3YXMgaW4gdGhlIG1pZGRsZSBvZiBhIHRhc2s6XG4gICAgICAvLyBJbXBvc3NpYmxlIHRvIGtub3cgd2hldGhlciB3ZSBjYW4gcmVjb3ZlciAod2l0aG91dCBlbmRpbmcgdXAgd2l0aCBhIGNvcnJ1cHRlZCBlbnRyeS1wb2ludCkuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Byb2Nlc3MgdW5leHBlY3RlZGx5IGNyYXNoZWQsIHdoaWxlIHByb2Nlc3NpbmcgZm9ybWF0IHByb3BlcnR5ICcgK1xuICAgICAgICAgIGAke2N1cnJlbnRUYXNrLmZvcm1hdFByb3BlcnR5fSBmb3IgZW50cnktcG9pbnQgJyR7Y3VycmVudFRhc2suZW50cnlQb2ludC5wYXRofScuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZSBhIG1lc3NhZ2UgZnJvbSBhIHdvcmtlci4gKi9cbiAgcHJpdmF0ZSBvbldvcmtlck1lc3NhZ2Uod29ya2VySWQ6IG51bWJlciwgbXNnOiBNZXNzYWdlRnJvbVdvcmtlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy50YXNrQXNzaWdubWVudHMuaGFzKHdvcmtlcklkKSkge1xuICAgICAgY29uc3Qga25vd25Xb3JrZXJzID0gQXJyYXkuZnJvbSh0aGlzLnRhc2tBc3NpZ25tZW50cy5rZXlzKCkpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBSZWNlaXZlZCBtZXNzYWdlIGZyb20gdW5rbm93biB3b3JrZXIgIyR7d29ya2VySWR9IChrbm93biB3b3JrZXJzOiBgICtcbiAgICAgICAgICBgJHtrbm93bldvcmtlcnMuam9pbignLCAnKX0pOiAke0pTT04uc3RyaW5naWZ5KG1zZyl9YCk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChtc2cudHlwZSkge1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIG9uIHdvcmtlciAjJHt3b3JrZXJJZH06ICR7bXNnLmVycm9yfWApO1xuICAgICAgY2FzZSAndGFzay1jb21wbGV0ZWQnOlxuICAgICAgICByZXR1cm4gdGhpcy5vbldvcmtlclRhc2tDb21wbGV0ZWQod29ya2VySWQsIG1zZyk7XG4gICAgICBjYXNlICd1cGRhdGUtcGFja2FnZS1qc29uJzpcbiAgICAgICAgcmV0dXJuIHRoaXMub25Xb3JrZXJVcGRhdGVQYWNrYWdlSnNvbih3b3JrZXJJZCwgbXNnKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBJbnZhbGlkIG1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSB3b3JrZXIgIyR7d29ya2VySWR9OiAke0pTT04uc3RyaW5naWZ5KG1zZyl9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZSBhIHdvcmtlcidzIGNvbWluZyBvbmxpbmUuICovXG4gIHByaXZhdGUgb25Xb3JrZXJPbmxpbmUod29ya2VySWQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhc2tBc3NpZ25tZW50cy5oYXMod29ya2VySWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFyaWFudCB2aW9sYXRlZDogV29ya2VyICMke3dvcmtlcklkfSBjYW1lIG9ubGluZSBtb3JlIHRoYW4gb25jZS5gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9jZXNzaW5nU3RhcnRUaW1lID09PSAtMSkge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1Byb2Nlc3NpbmcgdGFza3MuLi4nKTtcbiAgICAgIHRoaXMucHJvY2Vzc2luZ1N0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgdGhpcy50YXNrQXNzaWdubWVudHMuc2V0KHdvcmtlcklkLCBudWxsKTtcbiAgICB0aGlzLm1heWJlRGlzdHJpYnV0ZVdvcmsoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGUgYSB3b3JrZXIncyBoYXZpbmcgY29tcGxldGVkIHRoZWlyIGFzc2lnbmVkIHRhc2suICovXG4gIHByaXZhdGUgb25Xb3JrZXJUYXNrQ29tcGxldGVkKHdvcmtlcklkOiBudW1iZXIsIG1zZzogVGFza0NvbXBsZXRlZE1lc3NhZ2UpOiB2b2lkIHtcbiAgICBjb25zdCB0YXNrID0gdGhpcy50YXNrQXNzaWdubWVudHMuZ2V0KHdvcmtlcklkKSB8fCBudWxsO1xuXG4gICAgaWYgKHRhc2sgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRXhwZWN0ZWQgd29ya2VyICMke3dvcmtlcklkfSB0byBoYXZlIGEgdGFzayBhc3NpZ25lZCwgd2hpbGUgaGFuZGxpbmcgbWVzc2FnZTogYCArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgfVxuXG4gICAgdGhpcy5vblRhc2tDb21wbGV0ZWQodGFzaywgbXNnLm91dGNvbWUsIG1zZy5tZXNzYWdlKTtcblxuICAgIHRoaXMudGFza1F1ZXVlLm1hcmtUYXNrQ29tcGxldGVkKHRhc2spO1xuICAgIHRoaXMudGFza0Fzc2lnbm1lbnRzLnNldCh3b3JrZXJJZCwgbnVsbCk7XG4gICAgdGhpcy5tYXliZURpc3RyaWJ1dGVXb3JrKCk7XG4gIH1cblxuICAvKiogSGFuZGxlIGEgd29ya2VyJ3MgcmVxdWVzdCB0byB1cGRhdGUgYSBgcGFja2FnZS5qc29uYCBmaWxlLiAqL1xuICBwcml2YXRlIG9uV29ya2VyVXBkYXRlUGFja2FnZUpzb24od29ya2VySWQ6IG51bWJlciwgbXNnOiBVcGRhdGVQYWNrYWdlSnNvbk1lc3NhZ2UpOiB2b2lkIHtcbiAgICBjb25zdCB0YXNrID0gdGhpcy50YXNrQXNzaWdubWVudHMuZ2V0KHdvcmtlcklkKSB8fCBudWxsO1xuXG4gICAgaWYgKHRhc2sgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRXhwZWN0ZWQgd29ya2VyICMke3dvcmtlcklkfSB0byBoYXZlIGEgdGFzayBhc3NpZ25lZCwgd2hpbGUgaGFuZGxpbmcgbWVzc2FnZTogYCArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZXhwZWN0ZWRQYWNrYWdlSnNvblBhdGggPSB0aGlzLmZpbGVTeXN0ZW0ucmVzb2x2ZSh0YXNrLmVudHJ5UG9pbnQucGF0aCwgJ3BhY2thZ2UuanNvbicpO1xuICAgIGNvbnN0IHBhcnNlZFBhY2thZ2VKc29uID0gdGFzay5lbnRyeVBvaW50LnBhY2thZ2VKc29uO1xuXG4gICAgaWYgKGV4cGVjdGVkUGFja2FnZUpzb25QYXRoICE9PSBtc2cucGFja2FnZUpzb25QYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFJlY2VpdmVkICcke21zZy50eXBlfScgbWVzc2FnZSBmcm9tIHdvcmtlciAjJHt3b3JrZXJJZH0gZm9yICcke21zZy5wYWNrYWdlSnNvblBhdGh9JywgYCArXG4gICAgICAgICAgYGJ1dCB3YXMgZXhwZWN0aW5nICcke2V4cGVjdGVkUGFja2FnZUpzb25QYXRofScgKGJhc2VkIG9uIHRhc2sgYXNzaWdubWVudCkuYCk7XG4gICAgfVxuXG4gICAgLy8gTk9URTogQWx0aG91Z2ggdGhlIGNoYW5nZSBpbiB0aGUgcGFyc2VkIGBwYWNrYWdlLmpzb25gIHdpbGwgYmUgcmVmbGVjdGVkIGluIHRhc2tzIG9iamVjdHNcbiAgICAvLyAgICAgICBsb2NhbGx5IGFuZCB0aHVzIGFsc28gaW4gZnV0dXJlIGBwcm9jZXNzLXRhc2tgIG1lc3NhZ2VzIHNlbnQgdG8gd29ya2VyIHByb2Nlc3NlcywgYW55XG4gICAgLy8gICAgICAgcHJvY2Vzc2VzIGFscmVhZHkgcnVubmluZyBhbmQgcHJvY2Vzc2luZyBhIHRhc2sgZm9yIHRoZSBzYW1lIGVudHJ5LXBvaW50IHdpbGwgbm90IGdldFxuICAgIC8vICAgICAgIHRoZSBjaGFuZ2UuXG4gICAgLy8gICAgICAgRG8gbm90IHJlbHkgb24gaGF2aW5nIGFuIHVwLXRvLWRhdGUgYHBhY2thZ2UuanNvbmAgcmVwcmVzZW50YXRpb24gaW4gd29ya2VyIHByb2Nlc3Nlcy5cbiAgICAvLyAgICAgICBJbiBvdGhlciB3b3JkcywgdGFzayBwcm9jZXNzaW5nIHNob3VsZCBvbmx5IHJlbHkgb24gdGhlIGluZm8gdGhhdCB3YXMgdGhlcmUgd2hlbiB0aGVcbiAgICAvLyAgICAgICBmaWxlIHdhcyBpbml0aWFsbHkgcGFyc2VkIChkdXJpbmcgZW50cnktcG9pbnQgYW5hbHlzaXMpIGFuZCBub3Qgb24gdGhlIGluZm8gdGhhdCBtaWdodFxuICAgIC8vICAgICAgIGJlIGFkZGVkIGxhdGVyIChkdXJpbmcgdGFzayBwcm9jZXNzaW5nKS5cbiAgICB0aGlzLnBrZ0pzb25VcGRhdGVyLndyaXRlQ2hhbmdlcyhtc2cuY2hhbmdlcywgbXNnLnBhY2thZ2VKc29uUGF0aCwgcGFyc2VkUGFja2FnZUpzb24pO1xuICB9XG5cbiAgLyoqIFN0b3AgYWxsIHdvcmtlcnMgYW5kIHN0b3AgbGlzdGVuaW5nIG9uIGNsdXN0ZXIgZXZlbnRzLiAqL1xuICBwcml2YXRlIHN0b3BXb3JrZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IHdvcmtlcnMgPSBPYmplY3QudmFsdWVzKGNsdXN0ZXIud29ya2VycykgYXMgY2x1c3Rlci5Xb3JrZXJbXTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RvcHBpbmcgJHt3b3JrZXJzLmxlbmd0aH0gd29ya2Vycy4uLmApO1xuXG4gICAgY2x1c3Rlci5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB3b3JrZXJzLmZvckVhY2god29ya2VyID0+IHdvcmtlci5raWxsKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXAgYW4gZXZlbnQgaGFuZGxlciB0byBlbnN1cmUgdGhhdCBgZmluaXNoZWREZWZlcnJlZGAgd2lsbCBiZSByZWplY3RlZCBvbiBlcnJvciAocmVnYXJkbGVzc1xuICAgKiBpZiB0aGUgaGFuZGxlciBjb21wbGV0ZXMgc3luY2hyb25vdXNseSBvciBhc3luY2hyb25vdXNseSkuXG4gICAqL1xuICBwcml2YXRlIHdyYXBFdmVudEhhbmRsZXI8QXJncyBleHRlbmRzIHVua25vd25bXT4oZm46ICguLi5hcmdzOiBBcmdzKSA9PiB2b2lkfFByb21pc2U8dm9pZD4pOlxuICAgICAgKC4uLmFyZ3M6IEFyZ3MpID0+IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBhc3luYyAoLi4uYXJnczogQXJncykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZm4oLi4uYXJncyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5maW5pc2hlZERlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiJdfQ==