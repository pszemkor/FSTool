(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/dependencies/dts_dependency_host", ["require", "exports", "tslib", "@angular/compiler-cli/ngcc/src/dependencies/esm_dependency_host", "@angular/compiler-cli/ngcc/src/dependencies/module_resolver"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var esm_dependency_host_1 = require("@angular/compiler-cli/ngcc/src/dependencies/esm_dependency_host");
    var module_resolver_1 = require("@angular/compiler-cli/ngcc/src/dependencies/module_resolver");
    /**
     * Helper functions for computing dependencies via typings files.
     */
    var DtsDependencyHost = /** @class */ (function (_super) {
        tslib_1.__extends(DtsDependencyHost, _super);
        function DtsDependencyHost(fs, pathMappings) {
            return _super.call(this, fs, new module_resolver_1.ModuleResolver(fs, pathMappings, ['', '.d.ts', '/index.d.ts', '.js', '/index.js'])) || this;
        }
        /**
         * Attempts to process the `importPath` directly and also inside `@types/...`.
         */
        DtsDependencyHost.prototype.processImport = function (importPath, file, dependencies, missing, deepImports, alreadySeen) {
            return _super.prototype.processImport.call(this, importPath, file, dependencies, missing, deepImports, alreadySeen) ||
                _super.prototype.processImport.call(this, "@types/" + importPath, file, dependencies, missing, deepImports, alreadySeen);
        };
        return DtsDependencyHost;
    }(esm_dependency_host_1.EsmDependencyHost));
    exports.DtsDependencyHost = DtsDependencyHost;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHRzX2RlcGVuZGVuY3lfaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9uZ2NjL3NyYy9kZXBlbmRlbmNpZXMvZHRzX2RlcGVuZGVuY3lfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFTQSx1R0FBd0Q7SUFDeEQsK0ZBQWlEO0lBRWpEOztPQUVHO0lBQ0g7UUFBdUMsNkNBQWlCO1FBQ3RELDJCQUFZLEVBQWMsRUFBRSxZQUEyQjttQkFDckQsa0JBQ0ksRUFBRSxFQUFFLElBQUksZ0NBQWMsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakcsQ0FBQztRQUVEOztXQUVHO1FBQ08seUNBQWEsR0FBdkIsVUFDSSxVQUFrQixFQUFFLElBQW9CLEVBQUUsWUFBaUMsRUFDM0UsT0FBb0IsRUFBRSxXQUF3QixFQUFFLFdBQWdDO1lBQ2xGLE9BQU8saUJBQU0sYUFBYSxZQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO2dCQUN6RixpQkFBTSxhQUFhLFlBQ2YsWUFBVSxVQUFZLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDSCx3QkFBQztJQUFELENBQUMsQUFoQkQsQ0FBdUMsdUNBQWlCLEdBZ0J2RDtJQWhCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0Fic29sdXRlRnNQYXRoLCBGaWxlU3lzdGVtfSBmcm9tICcuLi8uLi8uLi9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHtQYXRoTWFwcGluZ3N9IGZyb20gJy4uL25nY2Nfb3B0aW9ucyc7XG5pbXBvcnQge0VzbURlcGVuZGVuY3lIb3N0fSBmcm9tICcuL2VzbV9kZXBlbmRlbmN5X2hvc3QnO1xuaW1wb3J0IHtNb2R1bGVSZXNvbHZlcn0gZnJvbSAnLi9tb2R1bGVfcmVzb2x2ZXInO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbnMgZm9yIGNvbXB1dGluZyBkZXBlbmRlbmNpZXMgdmlhIHR5cGluZ3MgZmlsZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEdHNEZXBlbmRlbmN5SG9zdCBleHRlbmRzIEVzbURlcGVuZGVuY3lIb3N0IHtcbiAgY29uc3RydWN0b3IoZnM6IEZpbGVTeXN0ZW0sIHBhdGhNYXBwaW5ncz86IFBhdGhNYXBwaW5ncykge1xuICAgIHN1cGVyKFxuICAgICAgICBmcywgbmV3IE1vZHVsZVJlc29sdmVyKGZzLCBwYXRoTWFwcGluZ3MsIFsnJywgJy5kLnRzJywgJy9pbmRleC5kLnRzJywgJy5qcycsICcvaW5kZXguanMnXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIHByb2Nlc3MgdGhlIGBpbXBvcnRQYXRoYCBkaXJlY3RseSBhbmQgYWxzbyBpbnNpZGUgYEB0eXBlcy8uLi5gLlxuICAgKi9cbiAgcHJvdGVjdGVkIHByb2Nlc3NJbXBvcnQoXG4gICAgICBpbXBvcnRQYXRoOiBzdHJpbmcsIGZpbGU6IEFic29sdXRlRnNQYXRoLCBkZXBlbmRlbmNpZXM6IFNldDxBYnNvbHV0ZUZzUGF0aD4sXG4gICAgICBtaXNzaW5nOiBTZXQ8c3RyaW5nPiwgZGVlcEltcG9ydHM6IFNldDxzdHJpbmc+LCBhbHJlYWR5U2VlbjogU2V0PEFic29sdXRlRnNQYXRoPik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzdXBlci5wcm9jZXNzSW1wb3J0KGltcG9ydFBhdGgsIGZpbGUsIGRlcGVuZGVuY2llcywgbWlzc2luZywgZGVlcEltcG9ydHMsIGFscmVhZHlTZWVuKSB8fFxuICAgICAgICBzdXBlci5wcm9jZXNzSW1wb3J0KFxuICAgICAgICAgICAgYEB0eXBlcy8ke2ltcG9ydFBhdGh9YCwgZmlsZSwgZGVwZW5kZW5jaWVzLCBtaXNzaW5nLCBkZWVwSW1wb3J0cywgYWxyZWFkeVNlZW4pO1xuICB9XG59XG4iXX0=