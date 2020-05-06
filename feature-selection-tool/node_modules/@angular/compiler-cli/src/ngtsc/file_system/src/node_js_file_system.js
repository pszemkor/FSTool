(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/file_system/src/node_js_file_system", ["require", "exports", "tslib", "fs", "fs-extra", "path", "@angular/compiler-cli/src/ngtsc/file_system/src/helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /// <reference types="node" />
    var fs = require("fs");
    var fsExtra = require("fs-extra");
    var p = require("path");
    var helpers_1 = require("@angular/compiler-cli/src/ngtsc/file_system/src/helpers");
    /**
     * A wrapper around the Node.js file-system (i.e the `fs` package).
     */
    var NodeJSFileSystem = /** @class */ (function () {
        function NodeJSFileSystem() {
            this._caseSensitive = undefined;
        }
        NodeJSFileSystem.prototype.exists = function (path) {
            return fs.existsSync(path);
        };
        NodeJSFileSystem.prototype.readFile = function (path) {
            return fs.readFileSync(path, 'utf8');
        };
        NodeJSFileSystem.prototype.writeFile = function (path, data, exclusive) {
            if (exclusive === void 0) { exclusive = false; }
            fs.writeFileSync(path, data, exclusive ? { flag: 'wx' } : undefined);
        };
        NodeJSFileSystem.prototype.removeFile = function (path) {
            fs.unlinkSync(path);
        };
        NodeJSFileSystem.prototype.symlink = function (target, path) {
            fs.symlinkSync(target, path);
        };
        NodeJSFileSystem.prototype.readdir = function (path) {
            return fs.readdirSync(path);
        };
        NodeJSFileSystem.prototype.lstat = function (path) {
            return fs.lstatSync(path);
        };
        NodeJSFileSystem.prototype.stat = function (path) {
            return fs.statSync(path);
        };
        NodeJSFileSystem.prototype.pwd = function () {
            return this.normalize(process.cwd());
        };
        NodeJSFileSystem.prototype.chdir = function (dir) {
            process.chdir(dir);
        };
        NodeJSFileSystem.prototype.copyFile = function (from, to) {
            fs.copyFileSync(from, to);
        };
        NodeJSFileSystem.prototype.moveFile = function (from, to) {
            fs.renameSync(from, to);
        };
        NodeJSFileSystem.prototype.ensureDir = function (path) {
            var parents = [];
            while (!this.isRoot(path) && !this.exists(path)) {
                parents.push(path);
                path = this.dirname(path);
            }
            while (parents.length) {
                this.safeMkdir(parents.pop());
            }
        };
        NodeJSFileSystem.prototype.removeDeep = function (path) {
            fsExtra.removeSync(path);
        };
        NodeJSFileSystem.prototype.isCaseSensitive = function () {
            if (this._caseSensitive === undefined) {
                this._caseSensitive = this.exists(togglePathCase(__filename));
            }
            return this._caseSensitive;
        };
        NodeJSFileSystem.prototype.resolve = function () {
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i] = arguments[_i];
            }
            return this.normalize(p.resolve.apply(p, tslib_1.__spread(paths)));
        };
        NodeJSFileSystem.prototype.dirname = function (file) {
            return this.normalize(p.dirname(file));
        };
        NodeJSFileSystem.prototype.join = function (basePath) {
            var paths = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                paths[_i - 1] = arguments[_i];
            }
            return this.normalize(p.join.apply(p, tslib_1.__spread([basePath], paths)));
        };
        NodeJSFileSystem.prototype.isRoot = function (path) {
            return this.dirname(path) === this.normalize(path);
        };
        NodeJSFileSystem.prototype.isRooted = function (path) {
            return p.isAbsolute(path);
        };
        NodeJSFileSystem.prototype.relative = function (from, to) {
            return helpers_1.relativeFrom(this.normalize(p.relative(from, to)));
        };
        NodeJSFileSystem.prototype.basename = function (filePath, extension) {
            return p.basename(filePath, extension);
        };
        NodeJSFileSystem.prototype.extname = function (path) {
            return p.extname(path);
        };
        NodeJSFileSystem.prototype.realpath = function (path) {
            return this.resolve(fs.realpathSync(path));
        };
        NodeJSFileSystem.prototype.getDefaultLibLocation = function () {
            return this.resolve(require.resolve('typescript'), '..');
        };
        NodeJSFileSystem.prototype.normalize = function (path) {
            // Convert backslashes to forward slashes
            return path.replace(/\\/g, '/');
        };
        NodeJSFileSystem.prototype.safeMkdir = function (path) {
            try {
                fs.mkdirSync(path);
            }
            catch (err) {
                // Ignore the error, if the path already exists and points to a directory.
                // Re-throw otherwise.
                if (!this.exists(path) || !this.stat(path).isDirectory()) {
                    throw err;
                }
            }
        };
        return NodeJSFileSystem;
    }());
    exports.NodeJSFileSystem = NodeJSFileSystem;
    /**
     * Toggle the case of each character in a file path.
     */
    function togglePathCase(str) {
        return helpers_1.absoluteFrom(str.replace(/\w/g, function (ch) { return ch.toUpperCase() === ch ? ch.toLowerCase() : ch.toUpperCase(); }));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9qc19maWxlX3N5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0vc3JjL25vZGVfanNfZmlsZV9zeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsOEJBQThCO0lBQzlCLHVCQUF5QjtJQUN6QixrQ0FBb0M7SUFDcEMsd0JBQTBCO0lBQzFCLG1GQUFxRDtJQUdyRDs7T0FFRztJQUNIO1FBQUE7WUFDVSxtQkFBYyxHQUFzQixTQUFTLENBQUM7UUF1R3hELENBQUM7UUF0R0MsaUNBQU0sR0FBTixVQUFPLElBQW9CO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsbUNBQVEsR0FBUixVQUFTLElBQW9CO1lBQzNCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELG9DQUFTLEdBQVQsVUFBVSxJQUFvQixFQUFFLElBQVksRUFBRSxTQUEwQjtZQUExQiwwQkFBQSxFQUFBLGlCQUEwQjtZQUN0RSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUNELHFDQUFVLEdBQVYsVUFBVyxJQUFvQjtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxrQ0FBTyxHQUFQLFVBQVEsTUFBc0IsRUFBRSxJQUFvQjtZQUNsRCxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztR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QUFzQjtnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUN4RCxNQUFNLEdBQUcsQ0FBQztpQkFDWDthQUNGO1FBQ0gsQ0FBQztRQUNILHVCQUFDO0lBQUQsQ0FBQyxBQXhHRCxJQXdHQztJQXhHWSw0Q0FBZ0I7SUEwRzdCOztPQUVHO0lBQ0gsU0FBUyxjQUFjLENBQUMsR0FBVztRQUNqQyxPQUFPLHNCQUFZLENBQ2YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBN0QsQ0FBNkQsQ0FBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwibm9kZVwiIC8+XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBmc0V4dHJhIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHAgZnJvbSAncGF0aCc7XG5pbXBvcnQge2Fic29sdXRlRnJvbSwgcmVsYXRpdmVGcm9tfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHtBYnNvbHV0ZUZzUGF0aCwgRmlsZVN0YXRzLCBGaWxlU3lzdGVtLCBQYXRoU2VnbWVudCwgUGF0aFN0cmluZ30gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCB0aGUgTm9kZS5qcyBmaWxlLXN5c3RlbSAoaS5lIHRoZSBgZnNgIHBhY2thZ2UpLlxuICovXG5leHBvcnQgY2xhc3MgTm9kZUpTRmlsZVN5c3RlbSBpbXBsZW1lbnRzIEZpbGVTeXN0ZW0ge1xuICBwcml2YXRlIF9jYXNlU2Vuc2l0aXZlOiBib29sZWFufHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgZXhpc3RzKHBhdGg6IEFic29sdXRlRnNQYXRoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZzLmV4aXN0c1N5bmMocGF0aCk7XG4gIH1cbiAgcmVhZEZpbGUocGF0aDogQWJzb2x1dGVGc1BhdGgpOiBzdHJpbmcge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0ZjgnKTtcbiAgfVxuICB3cml0ZUZpbGUocGF0aDogQWJzb2x1dGVGc1BhdGgsIGRhdGE6IHN0cmluZywgZXhjbHVzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGgsIGRhdGEsIGV4Y2x1c2l2ZSA/IHtmbGFnOiAnd3gnfSA6IHVuZGVmaW5lZCk7XG4gIH1cbiAgcmVtb3ZlRmlsZShwYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IHZvaWQge1xuICAgIGZzLnVubGlua1N5bmMocGF0aCk7XG4gIH1cbiAgc3ltbGluayh0YXJnZXQ6IEFic29sdXRlRnNQYXRoLCBwYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IHZvaWQge1xuICAgIGZzLnN5bWxpbmtTeW5jKHRhcmdldCwgcGF0aCk7XG4gIH1cbiAgcmVhZGRpcihwYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IFBhdGhTZWdtZW50W10ge1xuICAgIHJldHVybiBmcy5yZWFkZGlyU3luYyhwYXRoKSBhcyBQYXRoU2VnbWVudFtdO1xuICB9XG4gIGxzdGF0KHBhdGg6IEFic29sdXRlRnNQYXRoKTogRmlsZVN0YXRzIHtcbiAgICByZXR1cm4gZnMubHN0YXRTeW5jKHBhdGgpO1xuICB9XG4gIHN0YXQocGF0aDogQWJzb2x1dGVGc1BhdGgpOiBGaWxlU3RhdHMge1xuICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKTtcbiAgfVxuICBwd2QoKTogQWJzb2x1dGVGc1BhdGgge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZShwcm9jZXNzLmN3ZCgpKSBhcyBBYnNvbHV0ZUZzUGF0aDtcbiAgfVxuICBjaGRpcihkaXI6IEFic29sdXRlRnNQYXRoKTogdm9pZCB7XG4gICAgcHJvY2Vzcy5jaGRpcihkaXIpO1xuICB9XG4gIGNvcHlGaWxlKGZyb206IEFic29sdXRlRnNQYXRoLCB0bzogQWJzb2x1dGVGc1BhdGgpOiB2b2lkIHtcbiAgICBmcy5jb3B5RmlsZVN5bmMoZnJvbSwgdG8pO1xuICB9XG4gIG1vdmVGaWxlKGZyb206IEFic29sdXRlRnNQYXRoLCB0bzogQWJzb2x1dGVGc1BhdGgpOiB2b2lkIHtcbiAgICBmcy5yZW5hbWVTeW5jKGZyb20sIHRvKTtcbiAgfVxuICBlbnN1cmVEaXIocGF0aDogQWJzb2x1dGVGc1BhdGgpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJlbnRzOiBBYnNvbHV0ZUZzUGF0aFtdID0gW107XG4gICAgd2hpbGUgKCF0aGlzLmlzUm9vdChwYXRoKSAmJiAhdGhpcy5leGlzdHMocGF0aCkpIHtcbiAgICAgIHBhcmVudHMucHVzaChwYXRoKTtcbiAgICAgIHBhdGggPSB0aGlzLmRpcm5hbWUocGF0aCk7XG4gICAgfVxuICAgIHdoaWxlIChwYXJlbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5zYWZlTWtkaXIocGFyZW50cy5wb3AoKSEpO1xuICAgIH1cbiAgfVxuICByZW1vdmVEZWVwKHBhdGg6IEFic29sdXRlRnNQYXRoKTogdm9pZCB7XG4gICAgZnNFeHRyYS5yZW1vdmVTeW5jKHBhdGgpO1xuICB9XG4gIGlzQ2FzZVNlbnNpdGl2ZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fY2FzZVNlbnNpdGl2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jYXNlU2Vuc2l0aXZlID0gdGhpcy5leGlzdHModG9nZ2xlUGF0aENhc2UoX19maWxlbmFtZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2FzZVNlbnNpdGl2ZTtcbiAgfVxuICByZXNvbHZlKC4uLnBhdGhzOiBzdHJpbmdbXSk6IEFic29sdXRlRnNQYXRoIHtcbiAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUocC5yZXNvbHZlKC4uLnBhdGhzKSkgYXMgQWJzb2x1dGVGc1BhdGg7XG4gIH1cblxuICBkaXJuYW1lPFQgZXh0ZW5kcyBzdHJpbmc+KGZpbGU6IFQpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUocC5kaXJuYW1lKGZpbGUpKSBhcyBUO1xuICB9XG4gIGpvaW48VCBleHRlbmRzIHN0cmluZz4oYmFzZVBhdGg6IFQsIC4uLnBhdGhzOiBzdHJpbmdbXSk6IFQge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZShwLmpvaW4oYmFzZVBhdGgsIC4uLnBhdGhzKSkgYXMgVDtcbiAgfVxuICBpc1Jvb3QocGF0aDogQWJzb2x1dGVGc1BhdGgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXJuYW1lKHBhdGgpID09PSB0aGlzLm5vcm1hbGl6ZShwYXRoKTtcbiAgfVxuICBpc1Jvb3RlZChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcC5pc0Fic29sdXRlKHBhdGgpO1xuICB9XG4gIHJlbGF0aXZlPFQgZXh0ZW5kcyBQYXRoU3RyaW5nPihmcm9tOiBULCB0bzogVCk6IFBhdGhTZWdtZW50IHtcbiAgICByZXR1cm4gcmVsYXRpdmVGcm9tKHRoaXMubm9ybWFsaXplKHAucmVsYXRpdmUoZnJvbSwgdG8pKSk7XG4gIH1cbiAgYmFzZW5hbWUoZmlsZVBhdGg6IHN0cmluZywgZXh0ZW5zaW9uPzogc3RyaW5nKTogUGF0aFNlZ21lbnQge1xuICAgIHJldHVybiBwLmJhc2VuYW1lKGZpbGVQYXRoLCBleHRlbnNpb24pIGFzIFBhdGhTZWdtZW50O1xuICB9XG4gIGV4dG5hbWUocGF0aDogQWJzb2x1dGVGc1BhdGh8UGF0aFNlZ21lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBwLmV4dG5hbWUocGF0aCk7XG4gIH1cbiAgcmVhbHBhdGgocGF0aDogQWJzb2x1dGVGc1BhdGgpOiBBYnNvbHV0ZUZzUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZShmcy5yZWFscGF0aFN5bmMocGF0aCkpO1xuICB9XG4gIGdldERlZmF1bHRMaWJMb2NhdGlvbigpOiBBYnNvbHV0ZUZzUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZShyZXF1aXJlLnJlc29sdmUoJ3R5cGVzY3JpcHQnKSwgJy4uJyk7XG4gIH1cbiAgbm9ybWFsaXplPFQgZXh0ZW5kcyBzdHJpbmc+KHBhdGg6IFQpOiBUIHtcbiAgICAvLyBDb252ZXJ0IGJhY2tzbGFzaGVzIHRvIGZvcndhcmQgc2xhc2hlc1xuICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcXFwvZywgJy8nKSBhcyBUO1xuICB9XG5cbiAgcHJpdmF0ZSBzYWZlTWtkaXIocGF0aDogQWJzb2x1dGVGc1BhdGgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgZnMubWtkaXJTeW5jKHBhdGgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWdub3JlIHRoZSBlcnJvciwgaWYgdGhlIHBhdGggYWxyZWFkeSBleGlzdHMgYW5kIHBvaW50cyB0byBhIGRpcmVjdG9yeS5cbiAgICAgIC8vIFJlLXRocm93IG90aGVyd2lzZS5cbiAgICAgIGlmICghdGhpcy5leGlzdHMocGF0aCkgfHwgIXRoaXMuc3RhdChwYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBUb2dnbGUgdGhlIGNhc2Ugb2YgZWFjaCBjaGFyYWN0ZXIgaW4gYSBmaWxlIHBhdGguXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZVBhdGhDYXNlKHN0cjogc3RyaW5nKTogQWJzb2x1dGVGc1BhdGgge1xuICByZXR1cm4gYWJzb2x1dGVGcm9tKFxuICAgICAgc3RyLnJlcGxhY2UoL1xcdy9nLCBjaCA9PiBjaC50b1VwcGVyQ2FzZSgpID09PSBjaCA/IGNoLnRvTG93ZXJDYXNlKCkgOiBjaC50b1VwcGVyQ2FzZSgpKSk7XG59XG4iXX0=