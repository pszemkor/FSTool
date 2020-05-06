(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/execution/cluster/executor", ["require", "exports", "tslib", "@angular/compiler-cli/ngcc/src/execution/cluster/master"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var master_1 = require("@angular/compiler-cli/ngcc/src/execution/cluster/master");
    /**
     * An `Executor` that processes tasks in parallel (on multiple processes) and completes
     * asynchronously.
     */
    var ClusterExecutor = /** @class */ (function () {
        function ClusterExecutor(workerCount, fileSystem, logger, pkgJsonUpdater, lockFile, createTaskCompletedCallback) {
            this.workerCount = workerCount;
            this.fileSystem = fileSystem;
            this.logger = logger;
            this.pkgJsonUpdater = pkgJsonUpdater;
            this.lockFile = lockFile;
            this.createTaskCompletedCallback = createTaskCompletedCallback;
        }
        ClusterExecutor.prototype.execute = function (analyzeEntryPoints, _createCompileFn) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.lockFile.lock(function () {
                            _this.logger.debug("Running ngcc on " + _this.constructor.name + " (using " + _this.workerCount + " worker processes).");
                            var master = new master_1.ClusterMaster(_this.workerCount, _this.fileSystem, _this.logger, _this.pkgJsonUpdater, analyzeEntryPoints, _this.createTaskCompletedCallback);
                            return master.run();
                        })];
                });
            });
        };
        return ClusterExecutor;
    }());
    exports.ClusterExecutor = ClusterExecutor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvZXhlY3V0aW9uL2NsdXN0ZXIvZXhlY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBY0Esa0ZBQXVDO0lBRXZDOzs7T0FHRztJQUNIO1FBQ0UseUJBQ1ksV0FBbUIsRUFBVSxVQUFzQixFQUFVLE1BQWMsRUFDM0UsY0FBa0MsRUFBVSxRQUFxQixFQUNqRSwyQkFBd0Q7WUFGeEQsZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUMzRSxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7WUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFhO1lBQ2pFLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFBRyxDQUFDO1FBRWxFLGlDQUFPLEdBQWIsVUFBYyxrQkFBd0MsRUFBRSxnQkFBaUM7Ozs7b0JBRXZGLHNCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDYixxQkFBbUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGdCQUFXLEtBQUksQ0FBQyxXQUFXLHdCQUFxQixDQUFDLENBQUM7NEJBQzlGLElBQU0sTUFBTSxHQUFHLElBQUksc0JBQWEsQ0FDNUIsS0FBSSxDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFDdkYsS0FBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7NEJBQ3RDLE9BQU8sTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUN0QixDQUFDLENBQUMsRUFBQzs7O1NBQ0o7UUFDSCxzQkFBQztJQUFELENBQUMsQUFqQkQsSUFpQkM7SUFqQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0ZpbGVTeXN0ZW19IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge0FzeW5jTG9ja2VyfSBmcm9tICcuLi8uLi9sb2NraW5nL2FzeW5jX2xvY2tlcic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2dnZXInO1xuaW1wb3J0IHtQYWNrYWdlSnNvblVwZGF0ZXJ9IGZyb20gJy4uLy4uL3dyaXRpbmcvcGFja2FnZV9qc29uX3VwZGF0ZXInO1xuaW1wb3J0IHtBbmFseXplRW50cnlQb2ludHNGbiwgQ3JlYXRlQ29tcGlsZUZuLCBFeGVjdXRvcn0gZnJvbSAnLi4vYXBpJztcbmltcG9ydCB7Q3JlYXRlVGFza0NvbXBsZXRlZENhbGxiYWNrfSBmcm9tICcuLi90YXNrcy9hcGknO1xuXG5pbXBvcnQge0NsdXN0ZXJNYXN0ZXJ9IGZyb20gJy4vbWFzdGVyJztcblxuLyoqXG4gKiBBbiBgRXhlY3V0b3JgIHRoYXQgcHJvY2Vzc2VzIHRhc2tzIGluIHBhcmFsbGVsIChvbiBtdWx0aXBsZSBwcm9jZXNzZXMpIGFuZCBjb21wbGV0ZXNcbiAqIGFzeW5jaHJvbm91c2x5LlxuICovXG5leHBvcnQgY2xhc3MgQ2x1c3RlckV4ZWN1dG9yIGltcGxlbWVudHMgRXhlY3V0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgd29ya2VyQ291bnQ6IG51bWJlciwgcHJpdmF0ZSBmaWxlU3lzdGVtOiBGaWxlU3lzdGVtLCBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyLFxuICAgICAgcHJpdmF0ZSBwa2dKc29uVXBkYXRlcjogUGFja2FnZUpzb25VcGRhdGVyLCBwcml2YXRlIGxvY2tGaWxlOiBBc3luY0xvY2tlcixcbiAgICAgIHByaXZhdGUgY3JlYXRlVGFza0NvbXBsZXRlZENhbGxiYWNrOiBDcmVhdGVUYXNrQ29tcGxldGVkQ2FsbGJhY2spIHt9XG5cbiAgYXN5bmMgZXhlY3V0ZShhbmFseXplRW50cnlQb2ludHM6IEFuYWx5emVFbnRyeVBvaW50c0ZuLCBfY3JlYXRlQ29tcGlsZUZuOiBDcmVhdGVDb21waWxlRm4pOlxuICAgICAgUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMubG9ja0ZpbGUubG9jaygoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICBgUnVubmluZyBuZ2NjIG9uICR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAodXNpbmcgJHt0aGlzLndvcmtlckNvdW50fSB3b3JrZXIgcHJvY2Vzc2VzKS5gKTtcbiAgICAgIGNvbnN0IG1hc3RlciA9IG5ldyBDbHVzdGVyTWFzdGVyKFxuICAgICAgICAgIHRoaXMud29ya2VyQ291bnQsIHRoaXMuZmlsZVN5c3RlbSwgdGhpcy5sb2dnZXIsIHRoaXMucGtnSnNvblVwZGF0ZXIsIGFuYWx5emVFbnRyeVBvaW50cyxcbiAgICAgICAgICB0aGlzLmNyZWF0ZVRhc2tDb21wbGV0ZWRDYWxsYmFjayk7XG4gICAgICByZXR1cm4gbWFzdGVyLnJ1bigpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=