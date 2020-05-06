(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/entry_point_finder/directory_walker_entry_point_finder", ["require", "exports", "tslib", "@angular/compiler-cli/ngcc/src/packages/entry_point", "@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer", "@angular/compiler-cli/ngcc/src/entry_point_finder/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var entry_point_1 = require("@angular/compiler-cli/ngcc/src/packages/entry_point");
    var new_entry_point_file_writer_1 = require("@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/entry_point_finder/utils");
    /**
     * An EntryPointFinder that searches for all entry-points that can be found given a `basePath` and
     * `pathMappings`.
     */
    var DirectoryWalkerEntryPointFinder = /** @class */ (function () {
        function DirectoryWalkerEntryPointFinder(fs, config, logger, resolver, entryPointManifest, sourceDirectory, pathMappings) {
            this.fs = fs;
            this.config = config;
            this.logger = logger;
            this.resolver = resolver;
            this.entryPointManifest = entryPointManifest;
            this.sourceDirectory = sourceDirectory;
            this.pathMappings = pathMappings;
            this.basePaths = utils_1.getBasePaths(this.logger, this.sourceDirectory, this.pathMappings);
        }
        /**
         * Search the `sourceDirectory`, and sub-directories, using `pathMappings` as necessary, to find
         * all package entry-points.
         */
        DirectoryWalkerEntryPointFinder.prototype.findEntryPoints = function () {
            var e_1, _a;
            var unsortedEntryPoints = [];
            try {
                for (var _b = tslib_1.__values(this.basePaths), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var basePath = _c.value;
                    var entryPoints = this.entryPointManifest.readEntryPointsUsingManifest(basePath) ||
                        this.walkBasePathForPackages(basePath);
                    entryPoints.forEach(function (e) { return unsortedEntryPoints.push(e); });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this.resolver.sortEntryPointsByDependency(unsortedEntryPoints);
        };
        /**
         * Search the `basePath` for possible Angular packages and entry-points.
         *
         * @param basePath The path at which to start the search
         * @returns an array of `EntryPoint`s that were found within `basePath`.
         */
        DirectoryWalkerEntryPointFinder.prototype.walkBasePathForPackages = function (basePath) {
            var _this = this;
            this.logger.debug("No manifest found for " + basePath + " so walking the directories for entry-points.");
            var entryPoints = utils_1.trackDuration(function () { return _this.walkDirectoryForPackages(basePath); }, function (duration) { return _this.logger.debug("Walking " + basePath + " for entry-points took " + duration + "s."); });
            this.entryPointManifest.writeEntryPointManifest(basePath, entryPoints);
            return entryPoints;
        };
        /**
         * Look for Angular packages that need to be compiled, starting at the source directory.
         * The function will recurse into directories that start with `@...`, e.g. `@angular/...`.
         *
         * @param sourceDirectory An absolute path to the root directory where searching begins.
         * @returns an array of `EntryPoint`s that were found within `sourceDirectory`.
         */
        DirectoryWalkerEntryPointFinder.prototype.walkDirectoryForPackages = function (sourceDirectory) {
            var e_2, _a;
            // Try to get a primary entry point from this directory
            var primaryEntryPoint = entry_point_1.getEntryPointInfo(this.fs, this.config, this.logger, sourceDirectory, sourceDirectory);
            // If there is an entry-point but it is not compatible with ngcc (it has a bad package.json or
            // invalid typings) then exit. It is unlikely that such an entry point has a dependency on an
            // Angular library.
            if (primaryEntryPoint === entry_point_1.INCOMPATIBLE_ENTRY_POINT) {
                return [];
            }
            var entryPoints = [];
            if (primaryEntryPoint !== entry_point_1.NO_ENTRY_POINT) {
                entryPoints.push(this.resolver.getEntryPointWithDependencies(primaryEntryPoint));
                this.collectSecondaryEntryPoints(entryPoints, sourceDirectory, sourceDirectory, this.fs.readdir(sourceDirectory));
                // Also check for any nested node_modules in this package but only if at least one of the
                // entry-points was compiled by Angular.
                if (entryPoints.some(function (e) { return e.entryPoint.compiledByAngular; })) {
                    var nestedNodeModulesPath = this.fs.join(sourceDirectory, 'node_modules');
                    if (this.fs.exists(nestedNodeModulesPath)) {
                        entryPoints.push.apply(entryPoints, tslib_1.__spread(this.walkDirectoryForPackages(nestedNodeModulesPath)));
                    }
                }
                return entryPoints;
            }
            try {
                // The `sourceDirectory` was not a package (i.e. there was no package.json)
                // So search its sub-directories for Angular packages and entry-points
                for (var _b = tslib_1.__values(this.fs.readdir(sourceDirectory)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var path = _c.value;
                    if (isIgnorablePath(path)) {
                        // Ignore hidden files, node_modules and ngcc directory
                        continue;
                    }
                    var absolutePath = this.fs.resolve(sourceDirectory, path);
                    var stat = this.fs.lstat(absolutePath);
                    if (stat.isSymbolicLink() || !stat.isDirectory()) {
                        // Ignore symbolic links and non-directories
                        continue;
                    }
                    entryPoints.push.apply(entryPoints, tslib_1.__spread(this.walkDirectoryForPackages(this.fs.join(sourceDirectory, path))));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return entryPoints;
        };
        /**
         * Search the `directory` looking for any secondary entry-points for a package, adding any that
         * are found to the `entryPoints` array.
         *
         * @param entryPoints An array where we will add any entry-points found in this directory
         * @param packagePath The absolute path to the package that may contain entry-points
         * @param directory The current directory being searched
         * @param paths The paths contained in the current `directory`.
         */
        DirectoryWalkerEntryPointFinder.prototype.collectSecondaryEntryPoints = function (entryPoints, packagePath, directory, paths) {
            var e_3, _a;
            var _this = this;
            var _loop_1 = function (path) {
                if (isIgnorablePath(path)) {
                    return "continue";
                }
                var absolutePath = this_1.fs.resolve(directory, path);
                var stat = this_1.fs.lstat(absolutePath);
                if (stat.isSymbolicLink()) {
                    return "continue";
                }
                var isDirectory = stat.isDirectory();
                if (!path.endsWith('.js') && !isDirectory) {
                    return "continue";
                }
                // If the path is a JS file then strip its extension and see if we can match an
                // entry-point.
                var possibleEntryPointPath = isDirectory ? absolutePath : stripJsExtension(absolutePath);
                var isEntryPoint = false;
                var subEntryPoint = entry_point_1.getEntryPointInfo(this_1.fs, this_1.config, this_1.logger, packagePath, possibleEntryPointPath);
                if (subEntryPoint !== entry_point_1.NO_ENTRY_POINT && subEntryPoint !== entry_point_1.INCOMPATIBLE_ENTRY_POINT) {
                    entryPoints.push(this_1.resolver.getEntryPointWithDependencies(subEntryPoint));
                    isEntryPoint = true;
                }
                if (!isDirectory) {
                    return "continue";
                }
                // This directory may contain entry-points of its own.
                var childPaths = this_1.fs.readdir(absolutePath);
                if (!isEntryPoint &&
                    childPaths.some(function (childPath) { return childPath.endsWith('.js') &&
                        _this.fs.stat(_this.fs.resolve(absolutePath, childPath)).isFile(); })) {
                    return "continue";
                }
                this_1.collectSecondaryEntryPoints(entryPoints, packagePath, absolutePath, childPaths);
            };
            var this_1 = this;
            try {
                for (var paths_1 = tslib_1.__values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                    var path = paths_1_1.value;
                    _loop_1(path);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        return DirectoryWalkerEntryPointFinder;
    }());
    exports.DirectoryWalkerEntryPointFinder = DirectoryWalkerEntryPointFinder;
    function stripJsExtension(filePath) {
        return filePath.replace(/\.js$/, '');
    }
    function isIgnorablePath(path) {
        return path.startsWith('.') || path === 'node_modules' || path === new_entry_point_file_writer_1.NGCC_DIRECTORY;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0b3J5X3dhbGtlcl9lbnRyeV9wb2ludF9maW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvZW50cnlfcG9pbnRfZmluZGVyL2RpcmVjdG9yeV93YWxrZXJfZW50cnlfcG9pbnRfZmluZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQWFBLG1GQUFvRztJQUVwRyxrSEFBc0U7SUFHdEUsaUZBQW9EO0lBRXBEOzs7T0FHRztJQUNIO1FBRUUseUNBQ1ksRUFBYyxFQUFVLE1BQXlCLEVBQVUsTUFBYyxFQUN6RSxRQUE0QixFQUFVLGtCQUFzQyxFQUM1RSxlQUErQixFQUFVLFlBQW9DO1lBRjdFLE9BQUUsR0FBRixFQUFFLENBQVk7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtZQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7WUFDekUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7WUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1lBQzVFLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtZQUFVLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtZQUpqRixjQUFTLEdBQUcsb0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSUssQ0FBQztRQUM3Rjs7O1dBR0c7UUFDSCx5REFBZSxHQUFmOztZQUNFLElBQU0sbUJBQW1CLEdBQWlDLEVBQUUsQ0FBQzs7Z0JBQzdELEtBQXVCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFBLGdCQUFBLDRCQUFFO29CQUFsQyxJQUFNLFFBQVEsV0FBQTtvQkFDakIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQzt3QkFDOUUsSUFBSSxDQUFD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U0FBUyxnQkFBZ0IsQ0FBbUIsUUFBVztRQUNyRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBTSxDQUFDO0lBQzVDLENBQUM7SUFFRCxTQUFTLGVBQWUsQ0FBQyxJQUFpQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLGNBQWMsSUFBSSxJQUFJLEtBQUssNENBQWMsQ0FBQztJQUNwRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBYnNvbHV0ZUZzUGF0aCwgRmlsZVN5c3RlbSwgUGF0aFNlZ21lbnR9IGZyb20gJy4uLy4uLy4uL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge0VudHJ5UG9pbnRXaXRoRGVwZW5kZW5jaWVzfSBmcm9tICcuLi9kZXBlbmRlbmNpZXMvZGVwZW5kZW5jeV9ob3N0JztcbmltcG9ydCB7RGVwZW5kZW5jeVJlc29sdmVyLCBTb3J0ZWRFbnRyeVBvaW50c0luZm99IGZyb20gJy4uL2RlcGVuZGVuY2llcy9kZXBlbmRlbmN5X3Jlc29sdmVyJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi9sb2dnaW5nL2xvZ2dlcic7XG5pbXBvcnQge1BhdGhNYXBwaW5nc30gZnJvbSAnLi4vbmdjY19vcHRpb25zJztcbmltcG9ydCB7TmdjY0NvbmZpZ3VyYXRpb259IGZyb20gJy4uL3BhY2thZ2VzL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtnZXRFbnRyeVBvaW50SW5mbywgSU5DT01QQVRJQkxFX0VOVFJZX1BPSU5ULCBOT19FTlRSWV9QT0lOVH0gZnJvbSAnLi4vcGFja2FnZXMvZW50cnlfcG9pbnQnO1xuaW1wb3J0IHtFbnRyeVBvaW50TWFuaWZlc3R9IGZyb20gJy4uL3BhY2thZ2VzL2VudHJ5X3BvaW50X21hbmlmZXN0JztcbmltcG9ydCB7TkdDQ19ESVJFQ1RPUll9IGZyb20gJy4uL3dyaXRpbmcvbmV3X2VudHJ5X3BvaW50X2ZpbGVfd3JpdGVyJztcblxuaW1wb3J0IHtFbnRyeVBvaW50RmluZGVyfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQge2dldEJhc2VQYXRocywgdHJhY2tEdXJhdGlvbn0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogQW4gRW50cnlQb2ludEZpbmRlciB0aGF0IHNlYXJjaGVzIGZvciBhbGwgZW50cnktcG9pbnRzIHRoYXQgY2FuIGJlIGZvdW5kIGdpdmVuIGEgYGJhc2VQYXRoYCBhbmRcbiAqIGBwYXRoTWFwcGluZ3NgLlxuICovXG5leHBvcnQgY2xhc3MgRGlyZWN0b3J5V2Fsa2VyRW50cnlQb2ludEZpbmRlciBpbXBsZW1lbnRzIEVudHJ5UG9pbnRGaW5kZXIge1xuICBwcml2YXRlIGJhc2VQYXRocyA9IGdldEJhc2VQYXRocyh0aGlzLmxvZ2dlciwgdGhpcy5zb3VyY2VEaXJlY3RvcnksIHRoaXMucGF0aE1hcHBpbmdzKTtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGZzOiBGaWxlU3lzdGVtLCBwcml2YXRlIGNvbmZpZzogTmdjY0NvbmZpZ3VyYXRpb24sIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXIsXG4gICAgICBwcml2YXRlIHJlc29sdmVyOiBEZXBlbmRlbmN5UmVzb2x2ZXIsIHByaXZhdGUgZW50cnlQb2ludE1hbmlmZXN0OiBFbnRyeVBvaW50TWFuaWZlc3QsXG4gICAgICBwcml2YXRlIHNvdXJjZURpcmVjdG9yeTogQWJzb2x1dGVGc1BhdGgsIHByaXZhdGUgcGF0aE1hcHBpbmdzOiBQYXRoTWFwcGluZ3N8dW5kZWZpbmVkKSB7fVxuICAvKipcbiAgICogU2VhcmNoIHRoZSBgc291cmNlRGlyZWN0b3J5YCwgYW5kIHN1Yi1kaXJlY3RvcmllcywgdXNpbmcgYHBhdGhNYXBwaW5nc2AgYXMgbmVjZXNzYXJ5LCB0byBmaW5kXG4gICAqIGFsbCBwYWNrYWdlIGVudHJ5LXBvaW50cy5cbiAgICovXG4gIGZpbmRFbnRyeVBvaW50cygpOiBTb3J0ZWRFbnRyeVBvaW50c0luZm8ge1xuICAgIGNvbnN0IHVuc29ydGVkRW50cnlQb2ludHM6IEVudHJ5UG9pbnRXaXRoRGVwZW5kZW5jaWVzW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGJhc2VQYXRoIG9mIHRoaXMuYmFzZVBhdGhzKSB7XG4gICAgICBjb25zdCBlbnRyeVBvaW50cyA9IHRoaXMuZW50cnlQb2ludE1hbmlmZXN0LnJlYWRFbnRyeVBvaW50c1VzaW5nTWFuaWZlc3QoYmFzZVBhdGgpIHx8XG4gICAgICAgICAgdGhpcy53YWxrQmFzZVBhdGhGb3JQYWNrYWdlcyhiYXNlUGF0aCk7XG4gICAgICBlbnRyeVBvaW50cy5mb3JFYWNoKGUgPT4gdW5zb3J0ZWRFbnRyeVBvaW50cy5wdXNoKGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZXIuc29ydEVudHJ5UG9pbnRzQnlEZXBlbmRlbmN5KHVuc29ydGVkRW50cnlQb2ludHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgYGJhc2VQYXRoYCBmb3IgcG9zc2libGUgQW5ndWxhciBwYWNrYWdlcyBhbmQgZW50cnktcG9pbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gYmFzZVBhdGggVGhlIHBhdGggYXQgd2hpY2ggdG8gc3RhcnQgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyBhbiBhcnJheSBvZiBgRW50cnlQb2ludGBzIHRoYXQgd2VyZSBmb3VuZCB3aXRoaW4gYGJhc2VQYXRoYC5cbiAgICovXG4gIHdhbGtCYXNlUGF0aEZvclBhY2thZ2VzKGJhc2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IEVudHJ5UG9pbnRXaXRoRGVwZW5kZW5jaWVzW10ge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKFxuICAgICAgICBgTm8gbWFuaWZlc3QgZm91bmQgZm9yICR7YmFzZVBhdGh9IHNvIHdhbGtpbmcgdGhlIGRpcmVjdG9yaWVzIGZvciBlbnRyeS1wb2ludHMuYCk7XG4gICAgY29uc3QgZW50cnlQb2ludHMgPSB0cmFja0R1cmF0aW9uKFxuICAgICAgICAoKSA9PiB0aGlzLndhbGtEaXJlY3RvcnlGb3JQYWNrYWdlcyhiYXNlUGF0aCksXG4gICAgICAgIGR1cmF0aW9uID0+IHRoaXMubG9nZ2VyLmRlYnVnKGBXYWxraW5nICR7YmFzZVBhdGh9IGZvciBlbnRyeS1wb2ludHMgdG9vayAke2R1cmF0aW9ufXMuYCkpO1xuICAgIHRoaXMuZW50cnlQb2ludE1hbmlmZXN0LndyaXRlRW50cnlQb2ludE1hbmlmZXN0KGJhc2VQYXRoLCBlbnRyeVBvaW50cyk7XG4gICAgcmV0dXJuIGVudHJ5UG9pbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIExvb2sgZm9yIEFuZ3VsYXIgcGFja2FnZXMgdGhhdCBuZWVkIHRvIGJlIGNvbXBpbGVkLCBzdGFydGluZyBhdCB0aGUgc291cmNlIGRpcmVjdG9yeS5cbiAgICogVGhlIGZ1bmN0aW9uIHdpbGwgcmVjdXJzZSBpbnRvIGRpcmVjdG9yaWVzIHRoYXQgc3RhcnQgd2l0aCBgQC4uLmAsIGUuZy4gYEBhbmd1bGFyLy4uLmAuXG4gICAqXG4gICAqIEBwYXJhbSBzb3VyY2VEaXJlY3RvcnkgQW4gYWJzb2x1dGUgcGF0aCB0byB0aGUgcm9vdCBkaXJlY3Rvcnkgd2hlcmUgc2VhcmNoaW5nIGJlZ2lucy5cbiAgICogQHJldHVybnMgYW4gYXJyYXkgb2YgYEVudHJ5UG9pbnRgcyB0aGF0IHdlcmUgZm91bmQgd2l0aGluIGBzb3VyY2VEaXJlY3RvcnlgLlxuICAgKi9cbiAgd2Fsa0RpcmVjdG9yeUZvclBhY2thZ2VzKHNvdXJjZURpcmVjdG9yeTogQWJzb2x1dGVGc1BhdGgpOiBFbnRyeVBvaW50V2l0aERlcGVuZGVuY2llc1tdIHtcbiAgICAvLyBUcnkgdG8gZ2V0IGEgcHJpbWFyeSBlbnRyeSBwb2ludCBmcm9tIHRoaXMgZGlyZWN0b3J5XG4gICAgY29uc3QgcHJpbWFyeUVudHJ5UG9pbnQgPVxuICAgICAgICBnZXRFbnRyeVBvaW50SW5mbyh0aGlzLmZzLCB0aGlzLmNvbmZpZywgdGhpcy5sb2dnZXIsIHNvdXJjZURpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5KTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGFuIGVudHJ5LXBvaW50IGJ1dCBpdCBpcyBub3QgY29tcGF0aWJsZSB3aXRoIG5nY2MgKGl0IGhhcyBhIGJhZCBwYWNrYWdlLmpzb24gb3JcbiAgICAvLyBpbnZhbGlkIHR5cGluZ3MpIHRoZW4gZXhpdC4gSXQgaXMgdW5saWtlbHkgdGhhdCBzdWNoIGFuIGVudHJ5IHBvaW50IGhhcyBhIGRlcGVuZGVuY3kgb24gYW5cbiAgICAvLyBBbmd1bGFyIGxpYnJhcnkuXG4gICAgaWYgKHByaW1hcnlFbnRyeVBvaW50ID09PSBJTkNPTVBBVElCTEVfRU5UUllfUE9JTlQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeVBvaW50czogRW50cnlQb2ludFdpdGhEZXBlbmRlbmNpZXNbXSA9IFtdO1xuICAgIGlmIChwcmltYXJ5RW50cnlQb2ludCAhPT0gTk9fRU5UUllfUE9JTlQpIHtcbiAgICAgIGVudHJ5UG9pbnRzLnB1c2godGhpcy5yZXNvbHZlci5nZXRFbnRyeVBvaW50V2l0aERlcGVuZGVuY2llcyhwcmltYXJ5RW50cnlQb2ludCkpO1xuICAgICAgdGhpcy5jb2xsZWN0U2Vjb25kYXJ5RW50cnlQb2ludHMoXG4gICAgICAgICAgZW50cnlQb2ludHMsIHNvdXJjZURpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5LCB0aGlzLmZzLnJlYWRkaXIoc291cmNlRGlyZWN0b3J5KSk7XG5cbiAgICAgIC8vIEFsc28gY2hlY2sgZm9yIGFueSBuZXN0ZWQgbm9kZV9tb2R1bGVzIGluIHRoaXMgcGFja2FnZSBidXQgb25seSBpZiBhdCBsZWFzdCBvbmUgb2YgdGhlXG4gICAgICAvLyBlbnRyeS1wb2ludHMgd2FzIGNvbXBpbGVkIGJ5IEFuZ3VsYXIuXG4gICAgICBpZiAoZW50cnlQb2ludHMuc29tZShlID0+IGUuZW50cnlQb2ludC5jb21waWxlZEJ5QW5ndWxhcikpIHtcbiAgICAgICAgY29uc3QgbmVzdGVkTm9kZU1vZHVsZXNQYXRoID0gdGhpcy5mcy5qb2luKHNvdXJjZURpcmVjdG9yeSwgJ25vZGVfbW9kdWxlcycpO1xuICAgICAgICBpZiAodGhpcy5mcy5leGlzdHMobmVzdGVkTm9kZU1vZHVsZXNQYXRoKSkge1xuICAgICAgICAgIGVudHJ5UG9pbnRzLnB1c2goLi4udGhpcy53YWxrRGlyZWN0b3J5Rm9yUGFja2FnZXMobmVzdGVkTm9kZU1vZHVsZXNQYXRoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVudHJ5UG9pbnRzO1xuICAgIH1cblxuICAgIC8vIFRoZSBgc291cmNlRGlyZWN0b3J5YCB3YXMgbm90IGEgcGFja2FnZSAoaS5lLiB0aGVyZSB3YXMgbm8gcGFja2FnZS5qc29uKVxuICAgIC8vIFNvIHNlYXJjaCBpdHMgc3ViLWRpcmVjdG9yaWVzIGZvciBBbmd1bGFyIHBhY2thZ2VzIGFuZCBlbnRyeS1wb2ludHNcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgdGhpcy5mcy5yZWFkZGlyKHNvdXJjZURpcmVjdG9yeSkpIHtcbiAgICAgIGlmIChpc0lnbm9yYWJsZVBhdGgocGF0aCkpIHtcbiAgICAgICAgLy8gSWdub3JlIGhpZGRlbiBmaWxlcywgbm9kZV9tb2R1bGVzIGFuZCBuZ2NjIGRpcmVjdG9yeVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWJzb2x1dGVQYXRoID0gdGhpcy5mcy5yZXNvbHZlKHNvdXJjZURpcmVjdG9yeSwgcGF0aCk7XG4gICAgICBjb25zdCBzdGF0ID0gdGhpcy5mcy5sc3RhdChhYnNvbHV0ZVBhdGgpO1xuICAgICAgaWYgKHN0YXQuaXNTeW1ib2xpY0xpbmsoKSB8fCAhc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIC8vIElnbm9yZSBzeW1ib2xpYyBsaW5rcyBhbmQgbm9uLWRpcmVjdG9yaWVzXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBlbnRyeVBvaW50cy5wdXNoKC4uLnRoaXMud2Fsa0RpcmVjdG9yeUZvclBhY2thZ2VzKHRoaXMuZnMuam9pbihzb3VyY2VEaXJlY3RvcnksIHBhdGgpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVudHJ5UG9pbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgYGRpcmVjdG9yeWAgbG9va2luZyBmb3IgYW55IHNlY29uZGFyeSBlbnRyeS1wb2ludHMgZm9yIGEgcGFja2FnZSwgYWRkaW5nIGFueSB0aGF0XG4gICAqIGFyZSBmb3VuZCB0byB0aGUgYGVudHJ5UG9pbnRzYCBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIGVudHJ5UG9pbnRzIEFuIGFycmF5IHdoZXJlIHdlIHdpbGwgYWRkIGFueSBlbnRyeS1wb2ludHMgZm91bmQgaW4gdGhpcyBkaXJlY3RvcnlcbiAgICogQHBhcmFtIHBhY2thZ2VQYXRoIFRoZSBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBwYWNrYWdlIHRoYXQgbWF5IGNvbnRhaW4gZW50cnktcG9pbnRzXG4gICAqIEBwYXJhbSBkaXJlY3RvcnkgVGhlIGN1cnJlbnQgZGlyZWN0b3J5IGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBwYXRocyBUaGUgcGF0aHMgY29udGFpbmVkIGluIHRoZSBjdXJyZW50IGBkaXJlY3RvcnlgLlxuICAgKi9cbiAgcHJpdmF0ZSBjb2xsZWN0U2Vjb25kYXJ5RW50cnlQb2ludHMoXG4gICAgICBlbnRyeVBvaW50czogRW50cnlQb2ludFdpdGhEZXBlbmRlbmNpZXNbXSwgcGFja2FnZVBhdGg6IEFic29sdXRlRnNQYXRoLFxuICAgICAgZGlyZWN0b3J5OiBBYnNvbHV0ZUZzUGF0aCwgcGF0aHM6IFBhdGhTZWdtZW50W10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGF0aHMpIHtcbiAgICAgIGlmIChpc0lnbm9yYWJsZVBhdGgocGF0aCkpIHtcbiAgICAgICAgLy8gSWdub3JlIGhpZGRlbiBmaWxlcywgbm9kZV9tb2R1bGVzIGFuZCBuZ2NjIGRpcmVjdG9yeVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWJzb2x1dGVQYXRoID0gdGhpcy5mcy5yZXNvbHZlKGRpcmVjdG9yeSwgcGF0aCk7XG4gICAgICBjb25zdCBzdGF0ID0gdGhpcy5mcy5sc3RhdChhYnNvbHV0ZVBhdGgpO1xuICAgICAgaWYgKHN0YXQuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAgICAvLyBJZ25vcmUgc3ltYm9saWMgbGlua3NcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzRGlyZWN0b3J5ID0gc3RhdC5pc0RpcmVjdG9yeSgpO1xuICAgICAgaWYgKCFwYXRoLmVuZHNXaXRoKCcuanMnKSAmJiAhaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgLy8gSWdub3JlIGZpbGVzIHRoYXQgZG8gbm90IGVuZCBpbiBgLmpzYFxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIHBhdGggaXMgYSBKUyBmaWxlIHRoZW4gc3RyaXAgaXRzIGV4dGVuc2lvbiBhbmQgc2VlIGlmIHdlIGNhbiBtYXRjaCBhblxuICAgICAgLy8gZW50cnktcG9pbnQuXG4gICAgICBjb25zdCBwb3NzaWJsZUVudHJ5UG9pbnRQYXRoID0gaXNEaXJlY3RvcnkgPyBhYnNvbHV0ZVBhdGggOiBzdHJpcEpzRXh0ZW5zaW9uKGFic29sdXRlUGF0aCk7XG4gICAgICBsZXQgaXNFbnRyeVBvaW50ID0gZmFsc2U7XG4gICAgICBjb25zdCBzdWJFbnRyeVBvaW50ID1cbiAgICAgICAgICBnZXRFbnRyeVBvaW50SW5mbyh0aGlzLmZzLCB0aGlzLmNvbmZpZywgdGhpcy5sb2dnZXIsIHBhY2thZ2VQYXRoLCBwb3NzaWJsZUVudHJ5UG9pbnRQYXRoKTtcbiAgICAgIGlmIChzdWJFbnRyeVBvaW50ICE9PSBOT19FTlRSWV9QT0lOVCAmJiBzdWJFbnRyeVBvaW50ICE9PSBJTkNPTVBBVElCTEVfRU5UUllfUE9JTlQpIHtcbiAgICAgICAgZW50cnlQb2ludHMucHVzaCh0aGlzLnJlc29sdmVyLmdldEVudHJ5UG9pbnRXaXRoRGVwZW5kZW5jaWVzKHN1YkVudHJ5UG9pbnQpKTtcbiAgICAgICAgaXNFbnRyeVBvaW50ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0RpcmVjdG9yeSkge1xuICAgICAgICAvLyBUaGlzIHBhdGggaXMgbm90IGEgZGlyZWN0b3J5IHNvIHdlIGFyZSBkb25lLlxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhpcyBkaXJlY3RvcnkgbWF5IGNvbnRhaW4gZW50cnktcG9pbnRzIG9mIGl0cyBvd24uXG4gICAgICBjb25zdCBjaGlsZFBhdGhzID0gdGhpcy5mcy5yZWFkZGlyKGFic29sdXRlUGF0aCk7XG4gICAgICBpZiAoIWlzRW50cnlQb2ludCAmJlxuICAgICAgICAgIGNoaWxkUGF0aHMuc29tZShcbiAgICAgICAgICAgICAgY2hpbGRQYXRoID0+IGNoaWxkUGF0aC5lbmRzV2l0aCgnLmpzJykgJiZcbiAgICAgICAgICAgICAgICAgIHRoaXMuZnMuc3RhdCh0aGlzLmZzLnJlc29sdmUoYWJzb2x1dGVQYXRoLCBjaGlsZFBhdGgpKS5pc0ZpbGUoKSkpIHtcbiAgICAgICAgLy8gV2UgZG8gbm90IGNvbnNpZGVyIG5vbi1lbnRyeS1wb2ludCBkaXJlY3RvcmllcyB0aGF0IGNvbnRhaW4gSlMgZmlsZXMgYXMgdGhleSBhcmUgdmVyeVxuICAgICAgICAvLyB1bmxpa2VseSB0byBiZSBjb250YWluZXJzIGZvciBzdWItZW50cnktcG9pbnRzLlxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29sbGVjdFNlY29uZGFyeUVudHJ5UG9pbnRzKGVudHJ5UG9pbnRzLCBwYWNrYWdlUGF0aCwgYWJzb2x1dGVQYXRoLCBjaGlsZFBhdGhzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RyaXBKc0V4dGVuc2lvbjxUIGV4dGVuZHMgc3RyaW5nPihmaWxlUGF0aDogVCk6IFQge1xuICByZXR1cm4gZmlsZVBhdGgucmVwbGFjZSgvXFwuanMkLywgJycpIGFzIFQ7XG59XG5cbmZ1bmN0aW9uIGlzSWdub3JhYmxlUGF0aChwYXRoOiBQYXRoU2VnbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gcGF0aC5zdGFydHNXaXRoKCcuJykgfHwgcGF0aCA9PT0gJ25vZGVfbW9kdWxlcycgfHwgcGF0aCA9PT0gTkdDQ19ESVJFQ1RPUlk7XG59XG4iXX0=