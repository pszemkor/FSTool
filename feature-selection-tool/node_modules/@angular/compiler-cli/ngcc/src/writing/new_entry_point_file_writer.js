(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/src/ngtsc/util/src/typescript", "@angular/compiler-cli/ngcc/src/writing/in_place_file_writer"], factory);
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
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var typescript_1 = require("@angular/compiler-cli/src/ngtsc/util/src/typescript");
    var in_place_file_writer_1 = require("@angular/compiler-cli/ngcc/src/writing/in_place_file_writer");
    exports.NGCC_DIRECTORY = '__ivy_ngcc__';
    exports.NGCC_PROPERTY_EXTENSION = '_ivy_ngcc';
    /**
     * This FileWriter creates a copy of the original entry-point, then writes the transformed
     * files onto the files in this copy, and finally updates the package.json with a new
     * entry-point format property that points to this new entry-point.
     *
     * If there are transformed typings files in this bundle, they are updated in-place (see the
     * `InPlaceFileWriter`).
     */
    var NewEntryPointFileWriter = /** @class */ (function (_super) {
        tslib_1.__extends(NewEntryPointFileWriter, _super);
        function NewEntryPointFileWriter(fs, logger, errorOnFailedEntryPoint, pkgJsonUpdater) {
            var _this = _super.call(this, fs, logger, errorOnFailedEntryPoint) || this;
            _this.pkgJsonUpdater = pkgJsonUpdater;
            return _this;
        }
        NewEntryPointFileWriter.prototype.writeBundle = function (bundle, transformedFiles, formatProperties) {
            var _this = this;
            // The new folder is at the root of the overall package
            var entryPoint = bundle.entryPoint;
            var ngccFolder = file_system_1.join(entryPoint.package, exports.NGCC_DIRECTORY);
            this.copyBundle(bundle, entryPoint.package, ngccFolder);
            transformedFiles.forEach(function (file) { return _this.writeFile(file, entryPoint.package, ngccFolder); });
            this.updatePackageJson(entryPoint, formatProperties, ngccFolder);
        };
        NewEntryPointFileWriter.prototype.copyBundle = function (bundle, packagePath, ngccFolder) {
            var _this = this;
            bundle.src.program.getSourceFiles().forEach(function (sourceFile) {
                var relativePath = file_system_1.relative(packagePath, file_system_1.absoluteFromSourceFile(sourceFile));
                var isOutsidePackage = relativePath.startsWith('..');
                if (!sourceFile.isDeclarationFile && !isOutsidePackage) {
                    var newFilePath = file_system_1.join(ngccFolder, relativePath);
                    _this.fs.ensureDir(file_system_1.dirname(newFilePath));
                    _this.fs.copyFile(file_system_1.absoluteFromSourceFile(sourceFile), newFilePath);
                }
            });
        };
        NewEntryPointFileWriter.prototype.writeFile = function (file, packagePath, ngccFolder) {
            if (typescript_1.isDtsPath(file.path.replace(/\.map$/, ''))) {
                // This is either `.d.ts` or `.d.ts.map` file
                _super.prototype.writeFileAndBackup.call(this, file);
            }
            else {
                var relativePath = file_system_1.relative(packagePath, file.path);
                var newFilePath = file_system_1.join(ngccFolder, relativePath);
                this.fs.ensureDir(file_system_1.dirname(newFilePath));
                this.fs.writeFile(newFilePath, file.contents);
            }
        };
        NewEntryPointFileWriter.prototype.updatePackageJson = function (entryPoint, formatProperties, ngccFolder) {
            var e_1, _a;
            if (formatProperties.length === 0) {
                // No format properties need updating.
                return;
            }
            var packageJson = entryPoint.packageJson;
            var packageJsonPath = file_system_1.join(entryPoint.path, 'package.json');
            // All format properties point to the same format-path.
            var oldFormatProp = formatProperties[0];
            var oldFormatPath = packageJson[oldFormatProp];
            var oldAbsFormatPath = file_system_1.join(entryPoint.path, oldFormatPath);
            var newAbsFormatPath = file_system_1.join(ngccFolder, file_system_1.relative(entryPoint.package, oldAbsFormatPath));
            var newFormatPath = file_system_1.relative(entryPoint.path, newAbsFormatPath);
            // Update all properties in `package.json` (both in memory and on disk).
            var update = this.pkgJsonUpdater.createUpdate();
            try {
                for (var formatProperties_1 = tslib_1.__values(formatProperties), formatProperties_1_1 = formatProperties_1.next(); !formatProperties_1_1.done; formatProperties_1_1 = formatProperties_1.next()) {
                    var formatProperty = formatProperties_1_1.value;
                    if (packageJson[formatProperty] !== oldFormatPath) {
                        throw new Error("Unable to update '" + packageJsonPath + "': Format properties " +
                            ("(" + formatProperties.join(', ') + ") map to more than one format-path."));
                    }
                    update.addChange(["" + formatProperty + exports.NGCC_PROPERTY_EXTENSION], newFormatPath, { before: formatProperty });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (formatProperties_1_1 && !formatProperties_1_1.done && (_a = formatProperties_1.return)) _a.call(formatProperties_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            update.writeChanges(packageJsonPath, packageJson);
        };
        return NewEntryPointFileWriter;
    }(in_place_file_writer_1.InPlaceFileWriter));
    exports.NewEntryPointFileWriter = NewEntryPointFileWriter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3X2VudHJ5X3BvaW50X2ZpbGVfd3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL25nY2Mvc3JjL3dyaXRpbmcvbmV3X2VudHJ5X3BvaW50X2ZpbGVfd3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUNBOzs7Ozs7T0FNRztJQUNILDJFQUEySDtJQUMzSCxrRkFBaUU7SUFNakUsb0dBQXlEO0lBRzVDLFFBQUEsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUNoQyxRQUFBLHVCQUF1QixHQUFHLFdBQVcsQ0FBQztJQUVuRDs7Ozs7OztPQU9HO0lBQ0g7UUFBNkMsbURBQWlCO1FBQzVELGlDQUNJLEVBQWMsRUFBRSxNQUFjLEVBQUUsdUJBQWdDLEVBQ3hELGNBQWtDO1lBRjlDLFlBR0Usa0JBQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxTQUMzQztZQUZXLG9CQUFjLEdBQWQsY0FBYyxDQUFvQjs7UUFFOUMsQ0FBQztRQUVELDZDQUFXLEdBQVgsVUFDSSxNQUF3QixFQUFFLGdCQUErQixFQUN6RCxnQkFBMEM7WUFGOUMsaUJBU0M7WUFOQyx1REFBdUQ7WUFDdkQsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxJQUFNLFVBQVUsR0FBRyxrQkFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsc0JBQWMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDeEQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO1lBQ3ZG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QUFBLGtEQUFBLGdGQUFFO29CQUExQyxJQUFNLGNBQWMsNkJBQUE7b0JBQ3ZCLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLGFBQWEsRUFBRTt3QkFDakQsTUFBTSxJQUFJLEtBQUssQ0FDWCx1QkFBcUIsZUFBZSwwQkFBdUI7NkJBQzNELE1BQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3Q0FBcUMsQ0FBQSxDQUFDLENBQUM7cUJBQzNFO29CQUVELE1BQU0sQ0FBQyxTQUFTLENBQ1osQ0FBQyxLQUFHLGNBQWMsR0FBRywrQkFBeUIsQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDO2lCQUMvRjs7Ozs7Ozs7O1lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNILDhCQUFDO0lBQUQsQ0FBQyxBQTlFRCxDQUE2Qyx3Q0FBaUIsR0E4RTdEO0lBOUVZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHthYnNvbHV0ZUZyb21Tb3VyY2VGaWxlLCBBYnNvbHV0ZUZzUGF0aCwgZGlybmFtZSwgRmlsZVN5c3RlbSwgam9pbiwgcmVsYXRpdmV9IGZyb20gJy4uLy4uLy4uL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge2lzRHRzUGF0aH0gZnJvbSAnLi4vLi4vLi4vc3JjL25ndHNjL3V0aWwvc3JjL3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4uL2xvZ2dpbmcvbG9nZ2VyJztcbmltcG9ydCB7RW50cnlQb2ludCwgRW50cnlQb2ludEpzb25Qcm9wZXJ0eX0gZnJvbSAnLi4vcGFja2FnZXMvZW50cnlfcG9pbnQnO1xuaW1wb3J0IHtFbnRyeVBvaW50QnVuZGxlfSBmcm9tICcuLi9wYWNrYWdlcy9lbnRyeV9wb2ludF9idW5kbGUnO1xuaW1wb3J0IHtGaWxlVG9Xcml0ZX0gZnJvbSAnLi4vcmVuZGVyaW5nL3V0aWxzJztcblxuaW1wb3J0IHtJblBsYWNlRmlsZVdyaXRlcn0gZnJvbSAnLi9pbl9wbGFjZV9maWxlX3dyaXRlcic7XG5pbXBvcnQge1BhY2thZ2VKc29uVXBkYXRlcn0gZnJvbSAnLi9wYWNrYWdlX2pzb25fdXBkYXRlcic7XG5cbmV4cG9ydCBjb25zdCBOR0NDX0RJUkVDVE9SWSA9ICdfX2l2eV9uZ2NjX18nO1xuZXhwb3J0IGNvbnN0IE5HQ0NfUFJPUEVSVFlfRVhURU5TSU9OID0gJ19pdnlfbmdjYyc7XG5cbi8qKlxuICogVGhpcyBGaWxlV3JpdGVyIGNyZWF0ZXMgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBlbnRyeS1wb2ludCwgdGhlbiB3cml0ZXMgdGhlIHRyYW5zZm9ybWVkXG4gKiBmaWxlcyBvbnRvIHRoZSBmaWxlcyBpbiB0aGlzIGNvcHksIGFuZCBmaW5hbGx5IHVwZGF0ZXMgdGhlIHBhY2thZ2UuanNvbiB3aXRoIGEgbmV3XG4gKiBlbnRyeS1wb2ludCBmb3JtYXQgcHJvcGVydHkgdGhhdCBwb2ludHMgdG8gdGhpcyBuZXcgZW50cnktcG9pbnQuXG4gKlxuICogSWYgdGhlcmUgYXJlIHRyYW5zZm9ybWVkIHR5cGluZ3MgZmlsZXMgaW4gdGhpcyBidW5kbGUsIHRoZXkgYXJlIHVwZGF0ZWQgaW4tcGxhY2UgKHNlZSB0aGVcbiAqIGBJblBsYWNlRmlsZVdyaXRlcmApLlxuICovXG5leHBvcnQgY2xhc3MgTmV3RW50cnlQb2ludEZpbGVXcml0ZXIgZXh0ZW5kcyBJblBsYWNlRmlsZVdyaXRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZnM6IEZpbGVTeXN0ZW0sIGxvZ2dlcjogTG9nZ2VyLCBlcnJvck9uRmFpbGVkRW50cnlQb2ludDogYm9vbGVhbixcbiAgICAgIHByaXZhdGUgcGtnSnNvblVwZGF0ZXI6IFBhY2thZ2VKc29uVXBkYXRlcikge1xuICAgIHN1cGVyKGZzLCBsb2dnZXIsIGVycm9yT25GYWlsZWRFbnRyeVBvaW50KTtcbiAgfVxuXG4gIHdyaXRlQnVuZGxlKFxuICAgICAgYnVuZGxlOiBFbnRyeVBvaW50QnVuZGxlLCB0cmFuc2Zvcm1lZEZpbGVzOiBGaWxlVG9Xcml0ZVtdLFxuICAgICAgZm9ybWF0UHJvcGVydGllczogRW50cnlQb2ludEpzb25Qcm9wZXJ0eVtdKSB7XG4gICAgLy8gVGhlIG5ldyBmb2xkZXIgaXMgYXQgdGhlIHJvb3Qgb2YgdGhlIG92ZXJhbGwgcGFja2FnZVxuICAgIGNvbnN0IGVudHJ5UG9pbnQgPSBidW5kbGUuZW50cnlQb2ludDtcbiAgICBjb25zdCBuZ2NjRm9sZGVyID0gam9pbihlbnRyeVBvaW50LnBhY2thZ2UsIE5HQ0NfRElSRUNUT1JZKTtcbiAgICB0aGlzLmNvcHlCdW5kbGUoYnVuZGxlLCBlbnRyeVBvaW50LnBhY2thZ2UsIG5nY2NGb2xkZXIpO1xuICAgIHRyYW5zZm9ybWVkRmlsZXMuZm9yRWFjaChmaWxlID0+IHRoaXMud3JpdGVGaWxlKGZpbGUsIGVudHJ5UG9pbnQucGFja2FnZSwgbmdjY0ZvbGRlcikpO1xuICAgIHRoaXMudXBkYXRlUGFja2FnZUpzb24oZW50cnlQb2ludCwgZm9ybWF0UHJvcGVydGllcywgbmdjY0ZvbGRlcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29weUJ1bmRsZShcbiAgICAgIGJ1bmRsZTogRW50cnlQb2ludEJ1bmRsZSwgcGFja2FnZVBhdGg6IEFic29sdXRlRnNQYXRoLCBuZ2NjRm9sZGVyOiBBYnNvbHV0ZUZzUGF0aCkge1xuICAgIGJ1bmRsZS5zcmMucHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpLmZvckVhY2goc291cmNlRmlsZSA9PiB7XG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSByZWxhdGl2ZShwYWNrYWdlUGF0aCwgYWJzb2x1dGVGcm9tU291cmNlRmlsZShzb3VyY2VGaWxlKSk7XG4gICAgICBjb25zdCBpc091dHNpZGVQYWNrYWdlID0gcmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoJy4uJyk7XG4gICAgICBpZiAoIXNvdXJjZUZpbGUuaXNEZWNsYXJhdGlvbkZpbGUgJiYgIWlzT3V0c2lkZVBhY2thZ2UpIHtcbiAgICAgICAgY29uc3QgbmV3RmlsZVBhdGggPSBqb2luKG5nY2NGb2xkZXIsIHJlbGF0aXZlUGF0aCk7XG4gICAgICAgIHRoaXMuZnMuZW5zdXJlRGlyKGRpcm5hbWUobmV3RmlsZVBhdGgpKTtcbiAgICAgICAgdGhpcy5mcy5jb3B5RmlsZShhYnNvbHV0ZUZyb21Tb3VyY2VGaWxlKHNvdXJjZUZpbGUpLCBuZXdGaWxlUGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgd3JpdGVGaWxlKGZpbGU6IEZpbGVUb1dyaXRlLCBwYWNrYWdlUGF0aDogQWJzb2x1dGVGc1BhdGgsIG5nY2NGb2xkZXI6IEFic29sdXRlRnNQYXRoKTpcbiAgICAgIHZvaWQge1xuICAgIGlmIChpc0R0c1BhdGgoZmlsZS5wYXRoLnJlcGxhY2UoL1xcLm1hcCQvLCAnJykpKSB7XG4gICAgICAvLyBUaGlzIGlzIGVpdGhlciBgLmQudHNgIG9yIGAuZC50cy5tYXBgIGZpbGVcbiAgICAgIHN1cGVyLndyaXRlRmlsZUFuZEJhY2t1cChmaWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcmVsYXRpdmUocGFja2FnZVBhdGgsIGZpbGUucGF0aCk7XG4gICAgICBjb25zdCBuZXdGaWxlUGF0aCA9IGpvaW4obmdjY0ZvbGRlciwgcmVsYXRpdmVQYXRoKTtcbiAgICAgIHRoaXMuZnMuZW5zdXJlRGlyKGRpcm5hbWUobmV3RmlsZVBhdGgpKTtcbiAgICAgIHRoaXMuZnMud3JpdGVGaWxlKG5ld0ZpbGVQYXRoLCBmaWxlLmNvbnRlbnRzKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlUGFja2FnZUpzb24oXG4gICAgICBlbnRyeVBvaW50OiBFbnRyeVBvaW50LCBmb3JtYXRQcm9wZXJ0aWVzOiBFbnRyeVBvaW50SnNvblByb3BlcnR5W10sXG4gICAgICBuZ2NjRm9sZGVyOiBBYnNvbHV0ZUZzUGF0aCkge1xuICAgIGlmIChmb3JtYXRQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTm8gZm9ybWF0IHByb3BlcnRpZXMgbmVlZCB1cGRhdGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYWNrYWdlSnNvbiA9IGVudHJ5UG9pbnQucGFja2FnZUpzb247XG4gICAgY29uc3QgcGFja2FnZUpzb25QYXRoID0gam9pbihlbnRyeVBvaW50LnBhdGgsICdwYWNrYWdlLmpzb24nKTtcblxuICAgIC8vIEFsbCBmb3JtYXQgcHJvcGVydGllcyBwb2ludCB0byB0aGUgc2FtZSBmb3JtYXQtcGF0aC5cbiAgICBjb25zdCBvbGRGb3JtYXRQcm9wID0gZm9ybWF0UHJvcGVydGllc1swXSE7XG4gICAgY29uc3Qgb2xkRm9ybWF0UGF0aCA9IHBhY2thZ2VKc29uW29sZEZvcm1hdFByb3BdITtcbiAgICBjb25zdCBvbGRBYnNGb3JtYXRQYXRoID0gam9pbihlbnRyeVBvaW50LnBhdGgsIG9sZEZvcm1hdFBhdGgpO1xuICAgIGNvbnN0IG5ld0Fic0Zvcm1hdFBhdGggPSBqb2luKG5nY2NGb2xkZXIsIHJlbGF0aXZlKGVudHJ5UG9pbnQucGFja2FnZSwgb2xkQWJzRm9ybWF0UGF0aCkpO1xuICAgIGNvbnN0IG5ld0Zvcm1hdFBhdGggPSByZWxhdGl2ZShlbnRyeVBvaW50LnBhdGgsIG5ld0Fic0Zvcm1hdFBhdGgpO1xuXG4gICAgLy8gVXBkYXRlIGFsbCBwcm9wZXJ0aWVzIGluIGBwYWNrYWdlLmpzb25gIChib3RoIGluIG1lbW9yeSBhbmQgb24gZGlzaykuXG4gICAgY29uc3QgdXBkYXRlID0gdGhpcy5wa2dKc29uVXBkYXRlci5jcmVhdGVVcGRhdGUoKTtcblxuICAgIGZvciAoY29uc3QgZm9ybWF0UHJvcGVydHkgb2YgZm9ybWF0UHJvcGVydGllcykge1xuICAgICAgaWYgKHBhY2thZ2VKc29uW2Zvcm1hdFByb3BlcnR5XSAhPT0gb2xkRm9ybWF0UGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgVW5hYmxlIHRvIHVwZGF0ZSAnJHtwYWNrYWdlSnNvblBhdGh9JzogRm9ybWF0IHByb3BlcnRpZXMgYCArXG4gICAgICAgICAgICBgKCR7Zm9ybWF0UHJvcGVydGllcy5qb2luKCcsICcpfSkgbWFwIHRvIG1vcmUgdGhhbiBvbmUgZm9ybWF0LXBhdGguYCk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZS5hZGRDaGFuZ2UoXG4gICAgICAgICAgW2Ake2Zvcm1hdFByb3BlcnR5fSR7TkdDQ19QUk9QRVJUWV9FWFRFTlNJT059YF0sIG5ld0Zvcm1hdFBhdGgsIHtiZWZvcmU6IGZvcm1hdFByb3BlcnR5fSk7XG4gICAgfVxuXG4gICAgdXBkYXRlLndyaXRlQ2hhbmdlcyhwYWNrYWdlSnNvblBhdGgsIHBhY2thZ2VKc29uKTtcbiAgfVxufVxuIl19