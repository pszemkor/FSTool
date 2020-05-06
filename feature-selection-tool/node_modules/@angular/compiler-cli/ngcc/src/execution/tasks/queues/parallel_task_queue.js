(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/execution/tasks/queues/parallel_task_queue", ["require", "exports", "tslib", "@angular/compiler-cli/ngcc/src/execution/tasks/utils", "@angular/compiler-cli/ngcc/src/execution/tasks/queues/base_task_queue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/execution/tasks/utils");
    var base_task_queue_1 = require("@angular/compiler-cli/ngcc/src/execution/tasks/queues/base_task_queue");
    /**
     * A `TaskQueue` implementation that assumes tasks are processed in parallel, thus has to ensure a
     * task's dependencies have been processed before processing the task.
     */
    var ParallelTaskQueue = /** @class */ (function (_super) {
        tslib_1.__extends(ParallelTaskQueue, _super);
        function ParallelTaskQueue(logger, tasks, dependencies) {
            var _this = _super.call(this, logger, utils_1.sortTasksByPriority(tasks, dependencies), dependencies) || this;
            _this.blockedTasks = utils_1.getBlockedTasks(dependencies);
            return _this;
        }
        ParallelTaskQueue.prototype.computeNextTask = function () {
            var _this = this;
            // Look for the first available (i.e. not blocked) task.
            // (NOTE: Since tasks are sorted by priority, the first available one is the best choice.)
            var nextTaskIdx = this.tasks.findIndex(function (task) { return !_this.blockedTasks.has(task); });
            if (nextTaskIdx === -1)
                return null;
            // Remove the task from the list of available tasks and add it to the list of in-progress tasks.
            var nextTask = this.tasks[nextTaskIdx];
            this.tasks.splice(nextTaskIdx, 1);
            this.inProgressTasks.add(nextTask);
            return nextTask;
        };
        ParallelTaskQueue.prototype.markTaskCompleted = function (task) {
            var e_1, _a;
            _super.prototype.markTaskCompleted.call(this, task);
            if (!this.dependencies.has(task)) {
                return;
            }
            try {
                // Unblock the tasks that are dependent upon `task`
                for (var _b = tslib_1.__values(this.dependencies.get(task)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var dependentTask = _c.value;
                    if (this.blockedTasks.has(dependentTask)) {
                        var blockingTasks = this.blockedTasks.get(dependentTask);
                        // Remove the completed task from the lists of tasks blocking other tasks.
                        blockingTasks.delete(task);
                        if (blockingTasks.size === 0) {
                            // If the dependent task is not blocked any more, mark it for unblocking.
                            this.blockedTasks.delete(dependentTask);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        ParallelTaskQueue.prototype.toString = function () {
            return _super.prototype.toString.call(this) + "\n" +
                ("  Blocked tasks (" + this.blockedTasks.size + "): " + this.stringifyBlockedTasks('    '));
        };
        ParallelTaskQueue.prototype.stringifyBlockedTasks = function (indentation) {
            var _this = this;
            return Array.from(this.blockedTasks)
                .map(function (_a) {
                var _b = tslib_1.__read(_a, 2), task = _b[0], blockingTasks = _b[1];
                return "\n" + indentation + "- " + utils_1.stringifyTask(task) + " (" + blockingTasks.size + "): " +
                    _this.stringifyTasks(Array.from(blockingTasks), indentation + "    ");
            })
                .join('');
        };
        return ParallelTaskQueue;
    }(base_task_queue_1.BaseTaskQueue));
    exports.ParallelTaskQueue = ParallelTaskQueue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWxsZWxfdGFza19xdWV1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9uZ2NjL3NyYy9leGVjdXRpb24vdGFza3MvcXVldWVzL3BhcmFsbGVsX3Rhc2tfcXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBU0EsOEVBQTZFO0lBQzdFLHlHQUFnRDtJQUVoRDs7O09BR0c7SUFDSDtRQUF1Qyw2Q0FBYTtRQVFsRCwyQkFBWSxNQUFjLEVBQUUsS0FBNEIsRUFBRSxZQUE4QjtZQUF4RixZQUNFLGtCQUFNLE1BQU0sRUFBRSwyQkFBbUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUUsWUFBWSxDQUFDLFNBRXRFO1lBREMsS0FBSSxDQUFDLFlBQVksR0FBRyx1QkFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDOztRQUNwRCxDQUFDO1FBRUQsMkNBQWUsR0FBZjtZQUFBLGlCQVlDO1lBWEMsd0RBQXdEO1lBQ3hELDBGQUEwRjtZQUMxRixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztZQUMvRSxJQUFJLFdBQVcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFFcEMsZ0dBQWdHO1lBQ2hHLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRW5DLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFFRCw2Q0FBaUIsR0FBakIsVUFBa0IsSUFBVTs7WUFDMUIsaUJBQU0saUJBQWlCLFlBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxPQUFPO2FBQ1I7O2dCQUVELG1EQUFtRDtnQkFDbkQsS0FBNEIsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFBLGdCQUFBLDRCQUFFO29CQUFyRCxJQUFNLGFBQWEsV0FBQTtvQkFDdEIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTt3QkFDeEMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFFLENBQUM7d0JBQzVELDBFQUEwRTt3QkFDMUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDM0IsSUFBSSxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTs0QkFDNUIseUVBQXlFOzRCQUN6RSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDekM7cUJBQ0Y7aUJBQ0Y7Ozs7Ozs7OztRQUNILENBQUM7UUFFRCxvQ0FBUSxHQUFSO1lBQ0UsT0FBVSxpQkFBTSxRQUFRLFdBQUUsT0FBSTtpQkFDMUIsc0JBQW9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxXQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUcsQ0FBQSxDQUFDO1FBQzNGLENBQUM7UUFFTyxpREFBcUIsR0FBN0IsVUFBOEIsV0FBbUI7WUFBakQsaUJBT0M7WUFOQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDL0IsR0FBRyxDQUNBLFVBQUMsRUFBcUI7b0JBQXJCLDBCQUFxQixFQUFwQixZQUFJLEVBQUUscUJBQWE7Z0JBQ2pCLE9BQUEsT0FBSyxXQUFXLFVBQUsscUJBQWEsQ0FBQyxJQUFJLENBQUMsVUFBSyxhQUFhLENBQUMsSUFBSSxRQUFLO29CQUNwRSxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUssV0FBVyxTQUFNLENBQUM7WUFEcEUsQ0FDb0UsQ0FBQztpQkFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUM7UUFDSCx3QkFBQztJQUFELENBQUMsQUE3REQsQ0FBdUMsK0JBQWEsR0E2RG5EO0lBN0RZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi8uLi8uLi9sb2dnaW5nL2xvZ2dlcic7XG5pbXBvcnQge1BhcnRpYWxseU9yZGVyZWRUYXNrcywgVGFzaywgVGFza0RlcGVuZGVuY2llc30gZnJvbSAnLi4vYXBpJztcbmltcG9ydCB7Z2V0QmxvY2tlZFRhc2tzLCBzb3J0VGFza3NCeVByaW9yaXR5LCBzdHJpbmdpZnlUYXNrfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge0Jhc2VUYXNrUXVldWV9IGZyb20gJy4vYmFzZV90YXNrX3F1ZXVlJztcblxuLyoqXG4gKiBBIGBUYXNrUXVldWVgIGltcGxlbWVudGF0aW9uIHRoYXQgYXNzdW1lcyB0YXNrcyBhcmUgcHJvY2Vzc2VkIGluIHBhcmFsbGVsLCB0aHVzIGhhcyB0byBlbnN1cmUgYVxuICogdGFzaydzIGRlcGVuZGVuY2llcyBoYXZlIGJlZW4gcHJvY2Vzc2VkIGJlZm9yZSBwcm9jZXNzaW5nIHRoZSB0YXNrLlxuICovXG5leHBvcnQgY2xhc3MgUGFyYWxsZWxUYXNrUXVldWUgZXh0ZW5kcyBCYXNlVGFza1F1ZXVlIHtcbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gVGFza3MgdG8gdGhlIFRhc2tzIHRoYXQgaXQgZGVwZW5kcyB1cG9uLlxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSByZXZlcnNlIG1hcHBpbmcgb2YgYFRhc2tEZXBlbmRlbmNpZXNgLlxuICAgKi9cbiAgcHJpdmF0ZSBibG9ja2VkVGFza3M6IE1hcDxUYXNrLCBTZXQ8VGFzaz4+O1xuXG4gIGNvbnN0cnVjdG9yKGxvZ2dlcjogTG9nZ2VyLCB0YXNrczogUGFydGlhbGx5T3JkZXJlZFRhc2tzLCBkZXBlbmRlbmNpZXM6IFRhc2tEZXBlbmRlbmNpZXMpIHtcbiAgICBzdXBlcihsb2dnZXIsIHNvcnRUYXNrc0J5UHJpb3JpdHkodGFza3MsIGRlcGVuZGVuY2llcyksIGRlcGVuZGVuY2llcyk7XG4gICAgdGhpcy5ibG9ja2VkVGFza3MgPSBnZXRCbG9ja2VkVGFza3MoZGVwZW5kZW5jaWVzKTtcbiAgfVxuXG4gIGNvbXB1dGVOZXh0VGFzaygpOiBUYXNrfG51bGwge1xuICAgIC8vIExvb2sgZm9yIHRoZSBmaXJzdCBhdmFpbGFibGUgKGkuZS4gbm90IGJsb2NrZWQpIHRhc2suXG4gICAgLy8gKE5PVEU6IFNpbmNlIHRhc2tzIGFyZSBzb3J0ZWQgYnkgcHJpb3JpdHksIHRoZSBmaXJzdCBhdmFpbGFibGUgb25lIGlzIHRoZSBiZXN0IGNob2ljZS4pXG4gICAgY29uc3QgbmV4dFRhc2tJZHggPSB0aGlzLnRhc2tzLmZpbmRJbmRleCh0YXNrID0+ICF0aGlzLmJsb2NrZWRUYXNrcy5oYXModGFzaykpO1xuICAgIGlmIChuZXh0VGFza0lkeCA9PT0gLTEpIHJldHVybiBudWxsO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSB0YXNrIGZyb20gdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIHRhc2tzIGFuZCBhZGQgaXQgdG8gdGhlIGxpc3Qgb2YgaW4tcHJvZ3Jlc3MgdGFza3MuXG4gICAgY29uc3QgbmV4dFRhc2sgPSB0aGlzLnRhc2tzW25leHRUYXNrSWR4XTtcbiAgICB0aGlzLnRhc2tzLnNwbGljZShuZXh0VGFza0lkeCwgMSk7XG4gICAgdGhpcy5pblByb2dyZXNzVGFza3MuYWRkKG5leHRUYXNrKTtcblxuICAgIHJldHVybiBuZXh0VGFzaztcbiAgfVxuXG4gIG1hcmtUYXNrQ29tcGxldGVkKHRhc2s6IFRhc2spOiB2b2lkIHtcbiAgICBzdXBlci5tYXJrVGFza0NvbXBsZXRlZCh0YXNrKTtcblxuICAgIGlmICghdGhpcy5kZXBlbmRlbmNpZXMuaGFzKHRhc2spKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVW5ibG9jayB0aGUgdGFza3MgdGhhdCBhcmUgZGVwZW5kZW50IHVwb24gYHRhc2tgXG4gICAgZm9yIChjb25zdCBkZXBlbmRlbnRUYXNrIG9mIHRoaXMuZGVwZW5kZW5jaWVzLmdldCh0YXNrKSEpIHtcbiAgICAgIGlmICh0aGlzLmJsb2NrZWRUYXNrcy5oYXMoZGVwZW5kZW50VGFzaykpIHtcbiAgICAgICAgY29uc3QgYmxvY2tpbmdUYXNrcyA9IHRoaXMuYmxvY2tlZFRhc2tzLmdldChkZXBlbmRlbnRUYXNrKSE7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgY29tcGxldGVkIHRhc2sgZnJvbSB0aGUgbGlzdHMgb2YgdGFza3MgYmxvY2tpbmcgb3RoZXIgdGFza3MuXG4gICAgICAgIGJsb2NraW5nVGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICBpZiAoYmxvY2tpbmdUYXNrcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlcGVuZGVudCB0YXNrIGlzIG5vdCBibG9ja2VkIGFueSBtb3JlLCBtYXJrIGl0IGZvciB1bmJsb2NraW5nLlxuICAgICAgICAgIHRoaXMuYmxvY2tlZFRhc2tzLmRlbGV0ZShkZXBlbmRlbnRUYXNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3N1cGVyLnRvU3RyaW5nKCl9XFxuYCArXG4gICAgICAgIGAgIEJsb2NrZWQgdGFza3MgKCR7dGhpcy5ibG9ja2VkVGFza3Muc2l6ZX0pOiAke3RoaXMuc3RyaW5naWZ5QmxvY2tlZFRhc2tzKCcgICAgJyl9YDtcbiAgfVxuXG4gIHByaXZhdGUgc3RyaW5naWZ5QmxvY2tlZFRhc2tzKGluZGVudGF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuYmxvY2tlZFRhc2tzKVxuICAgICAgICAubWFwKFxuICAgICAgICAgICAgKFt0YXNrLCBibG9ja2luZ1Rhc2tzXSkgPT5cbiAgICAgICAgICAgICAgICBgXFxuJHtpbmRlbnRhdGlvbn0tICR7c3RyaW5naWZ5VGFzayh0YXNrKX0gKCR7YmxvY2tpbmdUYXNrcy5zaXplfSk6IGAgK1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5naWZ5VGFza3MoQXJyYXkuZnJvbShibG9ja2luZ1Rhc2tzKSwgYCR7aW5kZW50YXRpb259ICAgIGApKVxuICAgICAgICAuam9pbignJyk7XG4gIH1cbn1cbiJdfQ==