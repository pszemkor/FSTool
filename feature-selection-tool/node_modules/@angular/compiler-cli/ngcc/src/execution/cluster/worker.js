/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <reference types="node" />
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/execution/cluster/worker", ["require", "exports", "tslib", "cluster", "@angular/compiler-cli/ngcc/src/command_line_options", "@angular/compiler-cli/ngcc/src/logging/console_logger", "@angular/compiler-cli/ngcc/src/logging/logger", "@angular/compiler-cli/ngcc/src/ngcc_options", "@angular/compiler-cli/ngcc/src/execution/create_compile_function", "@angular/compiler-cli/ngcc/src/execution/tasks/utils", "@angular/compiler-cli/ngcc/src/execution/cluster/package_json_updater", "@angular/compiler-cli/ngcc/src/execution/cluster/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var cluster = require("cluster");
    var command_line_options_1 = require("@angular/compiler-cli/ngcc/src/command_line_options");
    var console_logger_1 = require("@angular/compiler-cli/ngcc/src/logging/console_logger");
    var logger_1 = require("@angular/compiler-cli/ngcc/src/logging/logger");
    var ngcc_options_1 = require("@angular/compiler-cli/ngcc/src/ngcc_options");
    var create_compile_function_1 = require("@angular/compiler-cli/ngcc/src/execution/create_compile_function");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/execution/tasks/utils");
    var package_json_updater_1 = require("@angular/compiler-cli/ngcc/src/execution/cluster/package_json_updater");
    var utils_2 = require("@angular/compiler-cli/ngcc/src/execution/cluster/utils");
    // Cluster worker entry point
    if (require.main === module) {
        (function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, _b, createNewEntryPointFormats, _c, logger, pathMappings, _d, errorOnFailedEntryPoint, _e, enableI18nLegacyMessageIdFormat, fileSystem, tsConfig, pkgJsonUpdater, createCompileFn, e_1;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        process.title = 'ngcc (worker)';
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        _a = ngcc_options_1.getSharedSetup(command_line_options_1.parseCommandLineOptions(process.argv.slice(2))), _b = _a.createNewEntryPointFormats, createNewEntryPointFormats = _b === void 0 ? false : _b, _c = _a.logger, logger = _c === void 0 ? new console_logger_1.ConsoleLogger(logger_1.LogLevel.info) : _c, pathMappings = _a.pathMappings, _d = _a.errorOnFailedEntryPoint, errorOnFailedEntryPoint = _d === void 0 ? false : _d, _e = _a.enableI18nLegacyMessageIdFormat, enableI18nLegacyMessageIdFormat = _e === void 0 ? true : _e, fileSystem = _a.fileSystem, tsConfig = _a.tsConfig;
                        pkgJsonUpdater = new package_json_updater_1.ClusterWorkerPackageJsonUpdater();
                        createCompileFn = create_compile_function_1.getCreateCompileFn(fileSystem, logger, pkgJsonUpdater, createNewEntryPointFormats, errorOnFailedEntryPoint, enableI18nLegacyMessageIdFormat, tsConfig, pathMappings);
                        return [4 /*yield*/, startWorker(logger, createCompileFn)];
                    case 2:
                        _f.sent();
                        process.exitCode = 0;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _f.sent();
                        console.error(e_1.stack || e_1.message);
                        process.exit(1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    }
    function startWorker(logger, createCompileFn) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var compile;
            return tslib_1.__generator(this, function (_a) {
                if (cluster.isMaster) {
                    throw new Error('Tried to run cluster worker on the master process.');
                }
                compile = createCompileFn(function (_task, outcome, message) { return utils_2.sendMessageToMaster({ type: 'task-completed', outcome: outcome, message: message }); });
                // Listen for `ProcessTaskMessage`s and process tasks.
                cluster.worker.on('message', function (msg) {
                    try {
                        switch (msg.type) {
                            case 'process-task':
                                logger.debug("[Worker #" + cluster.worker.id + "] Processing task: " + utils_1.stringifyTask(msg.task));
                                return compile(msg.task);
                            default:
                                throw new Error("[Worker #" + cluster.worker.id + "] Invalid message received: " + JSON.stringify(msg));
                        }
                    }
                    catch (err) {
                        utils_2.sendMessageToMaster({
                            type: 'error',
                            error: (err instanceof Error) ? (err.stack || err.message) : err,
                        });
                    }
                });
                // Return a promise that is never resolved.
                return [2 /*return*/, new Promise(function () { return undefined; })];
            });
        });
    }
    exports.startWorker = startWorker;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL25nY2Mvc3JjL2V4ZWN1dGlvbi9jbHVzdGVyL3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCw4QkFBOEI7Ozs7Ozs7Ozs7Ozs7SUFFOUIsaUNBQW1DO0lBRW5DLDRGQUFtRTtJQUNuRSx3RkFBMkQ7SUFDM0Qsd0VBQXNEO0lBQ3RELDRFQUFrRDtJQUVsRCw0R0FBOEQ7SUFDOUQsOEVBQTZDO0lBRzdDLDhHQUF1RTtJQUN2RSxnRkFBNEM7SUFFNUMsNkJBQTZCO0lBQzdCLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDM0IsQ0FBQzs7Ozs7d0JBQ0MsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7Ozs7d0JBR3hCLEtBUUYsNkJBQWMsQ0FBQyw4Q0FBdUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBUGhFLGtDQUFrQyxFQUFsQywwQkFBMEIsbUJBQUcsS0FBSyxLQUFBLEVBQ2xDLGNBQXlDLEVBQXpDLE1BQU0sbUJBQUcsSUFBSSw4QkFBYSxDQUFDLGlCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUEsRUFDekMsWUFBWSxrQkFBQSxFQUNaLCtCQUErQixFQUEvQix1QkFBdUIsbUJBQUcsS0FBSyxLQUFBLEVBQy9CLHVDQUFzQyxFQUF0QywrQkFBK0IsbUJBQUcsSUFBSSxLQUFBLEVBQ3RDLFVBQVUsZ0JBQUEsRUFDVixRQUFRLGNBQUEsQ0FDeUQ7d0JBSzdELGNBQWMsR0FBRyxJQUFJLHNEQUErQixFQUFFLENBQUM7d0JBR3ZELGVBQWUsR0FBRyw0Q0FBa0IsQ0FDdEMsVUFBVSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQ3ZGLCtCQUErQixFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFFN0QscUJBQU0sV0FBVyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsRUFBQTs7d0JBQTFDLFNBQTBDLENBQUM7d0JBQzNDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDOzs7O3dCQUVyQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxLQUFLLElBQUksR0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OzthQUVuQixDQUFDLEVBQUUsQ0FBQztLQUNOO0lBRUQsU0FBc0IsV0FBVyxDQUFDLE1BQWMsRUFBRSxlQUFnQzs7OztnQkFDaEYsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7aUJBQ3ZFO2dCQUVLLE9BQU8sR0FBRyxlQUFlLENBQzNCLFVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUssT0FBQSwyQkFBbUIsQ0FBQyxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLFNBQUEsRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDLEVBQS9ELENBQStELENBQUMsQ0FBQztnQkFHbEcsc0RBQXNEO2dCQUN0RCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxHQUFvQjtvQkFDaEQsSUFBSTt3QkFDRixRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUU7NEJBQ2hCLEtBQUssY0FBYztnQ0FDakIsTUFBTSxDQUFDLEtBQUssQ0FDUixjQUFZLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSwyQkFBc0IscUJBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFHLENBQUMsQ0FBQztnQ0FDbEYsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMzQjtnQ0FDRSxNQUFNLElBQUksS0FBSyxDQUNYLGNBQVksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLG9DQUErQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7eUJBQzFGO3FCQUNGO29CQUFDLE9BQU8sR0FBRyxFQUFFO3dCQUNaLDJCQUFtQixDQUFDOzRCQUNsQixJQUFJLEVBQUUsT0FBTzs0QkFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7eUJBQ2pFLENBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFSCwyQ0FBMkM7Z0JBQzNDLHNCQUFPLElBQUksT0FBTyxDQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDLEVBQUM7OztLQUNyQztJQS9CRCxrQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIm5vZGVcIiAvPlxuXG5pbXBvcnQgKiBhcyBjbHVzdGVyIGZyb20gJ2NsdXN0ZXInO1xuXG5pbXBvcnQge3BhcnNlQ29tbWFuZExpbmVPcHRpb25zfSBmcm9tICcuLi8uLi9jb21tYW5kX2xpbmVfb3B0aW9ucyc7XG5pbXBvcnQge0NvbnNvbGVMb2dnZXJ9IGZyb20gJy4uLy4uL2xvZ2dpbmcvY29uc29sZV9sb2dnZXInO1xuaW1wb3J0IHtMb2dnZXIsIExvZ0xldmVsfSBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZ2dlcic7XG5pbXBvcnQge2dldFNoYXJlZFNldHVwfSBmcm9tICcuLi8uLi9uZ2NjX29wdGlvbnMnO1xuaW1wb3J0IHtDcmVhdGVDb21waWxlRm59IGZyb20gJy4uL2FwaSc7XG5pbXBvcnQge2dldENyZWF0ZUNvbXBpbGVGbn0gZnJvbSAnLi4vY3JlYXRlX2NvbXBpbGVfZnVuY3Rpb24nO1xuaW1wb3J0IHtzdHJpbmdpZnlUYXNrfSBmcm9tICcuLi90YXNrcy91dGlscyc7XG5cbmltcG9ydCB7TWVzc2FnZVRvV29ya2VyfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQge0NsdXN0ZXJXb3JrZXJQYWNrYWdlSnNvblVwZGF0ZXJ9IGZyb20gJy4vcGFja2FnZV9qc29uX3VwZGF0ZXInO1xuaW1wb3J0IHtzZW5kTWVzc2FnZVRvTWFzdGVyfSBmcm9tICcuL3V0aWxzJztcblxuLy8gQ2x1c3RlciB3b3JrZXIgZW50cnkgcG9pbnRcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICAoYXN5bmMgKCkgPT4ge1xuICAgIHByb2Nlc3MudGl0bGUgPSAnbmdjYyAod29ya2VyKSc7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjcmVhdGVOZXdFbnRyeVBvaW50Rm9ybWF0cyA9IGZhbHNlLFxuICAgICAgICBsb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcihMb2dMZXZlbC5pbmZvKSxcbiAgICAgICAgcGF0aE1hcHBpbmdzLFxuICAgICAgICBlcnJvck9uRmFpbGVkRW50cnlQb2ludCA9IGZhbHNlLFxuICAgICAgICBlbmFibGVJMThuTGVnYWN5TWVzc2FnZUlkRm9ybWF0ID0gdHJ1ZSxcbiAgICAgICAgZmlsZVN5c3RlbSxcbiAgICAgICAgdHNDb25maWdcbiAgICAgIH0gPSBnZXRTaGFyZWRTZXR1cChwYXJzZUNvbW1hbmRMaW5lT3B0aW9ucyhwcm9jZXNzLmFyZ3Yuc2xpY2UoMikpKTtcblxuICAgICAgLy8gTk9URTogVG8gYXZvaWQgZmlsZSBjb3JydXB0aW9uLCBgbmdjY2AgaW52b2NhdGlvbiBvbmx5IGNyZWF0ZXMgX29uZV8gaW5zdGFuY2Ugb2ZcbiAgICAgIC8vIGBQYWNrYWdlSnNvblVwZGF0ZXJgIHRoYXQgYWN0dWFsbHkgd3JpdGVzIHRvIGRpc2sgKGFjcm9zcyBhbGwgcHJvY2Vzc2VzKS5cbiAgICAgIC8vIEluIGNsdXN0ZXIgd29ya2VycyB3ZSB1c2UgYSBgUGFja2FnZUpzb25VcGRhdGVyYCB0aGF0IGRlbGVnYXRlcyB0byB0aGUgY2x1c3RlciBtYXN0ZXIuXG4gICAgICBjb25zdCBwa2dKc29uVXBkYXRlciA9IG5ldyBDbHVzdGVyV29ya2VyUGFja2FnZUpzb25VcGRhdGVyKCk7XG5cbiAgICAgIC8vIFRoZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgdGhlIGBjb21waWxlKClgIGZ1bmN0aW9uLlxuICAgICAgY29uc3QgY3JlYXRlQ29tcGlsZUZuID0gZ2V0Q3JlYXRlQ29tcGlsZUZuKFxuICAgICAgICAgIGZpbGVTeXN0ZW0sIGxvZ2dlciwgcGtnSnNvblVwZGF0ZXIsIGNyZWF0ZU5ld0VudHJ5UG9pbnRGb3JtYXRzLCBlcnJvck9uRmFpbGVkRW50cnlQb2ludCxcbiAgICAgICAgICBlbmFibGVJMThuTGVnYWN5TWVzc2FnZUlkRm9ybWF0LCB0c0NvbmZpZywgcGF0aE1hcHBpbmdzKTtcblxuICAgICAgYXdhaXQgc3RhcnRXb3JrZXIobG9nZ2VyLCBjcmVhdGVDb21waWxlRm4pO1xuICAgICAgcHJvY2Vzcy5leGl0Q29kZSA9IDA7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlLnN0YWNrIHx8IGUubWVzc2FnZSk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICB9KSgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRXb3JrZXIobG9nZ2VyOiBMb2dnZXIsIGNyZWF0ZUNvbXBpbGVGbjogQ3JlYXRlQ29tcGlsZUZuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChjbHVzdGVyLmlzTWFzdGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBydW4gY2x1c3RlciB3b3JrZXIgb24gdGhlIG1hc3RlciBwcm9jZXNzLicpO1xuICB9XG5cbiAgY29uc3QgY29tcGlsZSA9IGNyZWF0ZUNvbXBpbGVGbihcbiAgICAgIChfdGFzaywgb3V0Y29tZSwgbWVzc2FnZSkgPT4gc2VuZE1lc3NhZ2VUb01hc3Rlcih7dHlwZTogJ3Rhc2stY29tcGxldGVkJywgb3V0Y29tZSwgbWVzc2FnZX0pKTtcblxuXG4gIC8vIExpc3RlbiBmb3IgYFByb2Nlc3NUYXNrTWVzc2FnZWBzIGFuZCBwcm9jZXNzIHRhc2tzLlxuICBjbHVzdGVyLndvcmtlci5vbignbWVzc2FnZScsIChtc2c6IE1lc3NhZ2VUb1dvcmtlcikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3Byb2Nlc3MtdGFzayc6XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgICBgW1dvcmtlciAjJHtjbHVzdGVyLndvcmtlci5pZH1dIFByb2Nlc3NpbmcgdGFzazogJHtzdHJpbmdpZnlUYXNrKG1zZy50YXNrKX1gKTtcbiAgICAgICAgICByZXR1cm4gY29tcGlsZShtc2cudGFzayk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgW1dvcmtlciAjJHtjbHVzdGVyLndvcmtlci5pZH1dIEludmFsaWQgbWVzc2FnZSByZWNlaXZlZDogJHtKU09OLnN0cmluZ2lmeShtc2cpfWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2VuZE1lc3NhZ2VUb01hc3Rlcih7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIGVycm9yOiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpID8gKGVyci5zdGFjayB8fCBlcnIubWVzc2FnZSkgOiBlcnIsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFJldHVybiBhIHByb21pc2UgdGhhdCBpcyBuZXZlciByZXNvbHZlZC5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHVuZGVmaW5lZCk7XG59Il19