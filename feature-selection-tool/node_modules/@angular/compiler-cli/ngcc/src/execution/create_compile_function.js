(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/execution/create_compile_function", ["require", "exports", "typescript", "@angular/compiler-cli/src/ngtsc/diagnostics", "@angular/compiler-cli/ngcc/src/packages/entry_point", "@angular/compiler-cli/ngcc/src/packages/entry_point_bundle", "@angular/compiler-cli/ngcc/src/writing/in_place_file_writer", "@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
    var entry_point_1 = require("@angular/compiler-cli/ngcc/src/packages/entry_point");
    var entry_point_bundle_1 = require("@angular/compiler-cli/ngcc/src/packages/entry_point_bundle");
    var in_place_file_writer_1 = require("@angular/compiler-cli/ngcc/src/writing/in_place_file_writer");
    var new_entry_point_file_writer_1 = require("@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer");
    /**
     * The function for creating the `compile()` function.
     */
    function getCreateCompileFn(fileSystem, logger, pkgJsonUpdater, createNewEntryPointFormats, errorOnFailedEntryPoint, enableI18nLegacyMessageIdFormat, tsConfig, pathMappings) {
        return function (onTaskCompleted) {
            var fileWriter = getFileWriter(fileSystem, logger, pkgJsonUpdater, createNewEntryPointFormats, errorOnFailedEntryPoint);
            var Transformer = require('../packages/transformer').Transformer;
            var transformer = new Transformer(fileSystem, logger, tsConfig);
            return function (task) {
                var entryPoint = task.entryPoint, formatProperty = task.formatProperty, formatPropertiesToMarkAsProcessed = task.formatPropertiesToMarkAsProcessed, processDts = task.processDts;
                var isCore = entryPoint.name === '@angular/core'; // Are we compiling the Angular core?
                var packageJson = entryPoint.packageJson;
                var formatPath = packageJson[formatProperty];
                var format = entry_point_1.getEntryPointFormat(fileSystem, entryPoint, formatProperty);
                // All properties listed in `propertiesToProcess` are guaranteed to point to a format-path
                // (i.e. they are defined in `entryPoint.packageJson`). Furthermore, they are also guaranteed
                // to be among `SUPPORTED_FORMAT_PROPERTIES`.
                // Based on the above, `formatPath` should always be defined and `getEntryPointFormat()`
                // should always return a format here (and not `undefined`).
                if (!formatPath || !format) {
                    // This should never happen.
                    throw new Error("Invariant violated: No format-path or format for " + entryPoint.path + " : " +
                        (formatProperty + " (formatPath: " + formatPath + " | format: " + format + ")"));
                }
                var bundle = entry_point_bundle_1.makeEntryPointBundle(fileSystem, entryPoint, formatPath, isCore, format, processDts, pathMappings, true, enableI18nLegacyMessageIdFormat);
                logger.info("Compiling " + entryPoint.name + " : " + formatProperty + " as " + format);
                var result = transformer.transform(bundle);
                if (result.success) {
                    if (result.diagnostics.length > 0) {
                        logger.warn(diagnostics_1.replaceTsWithNgInErrors(ts.formatDiagnosticsWithColorAndContext(result.diagnostics, bundle.src.host)));
                    }
                    fileWriter.writeBundle(bundle, result.transformedFiles, formatPropertiesToMarkAsProcessed);
                    logger.debug("  Successfully compiled " + entryPoint.name + " : " + formatProperty);
                    onTaskCompleted(task, 0 /* Processed */, null);
                }
                else {
                    var errors = diagnostics_1.replaceTsWithNgInErrors(ts.formatDiagnosticsWithColorAndContext(result.diagnostics, bundle.src.host));
                    onTaskCompleted(task, 1 /* Failed */, "compilation errors:\n" + errors);
                }
            };
        };
    }
    exports.getCreateCompileFn = getCreateCompileFn;
    function getFileWriter(fs, logger, pkgJsonUpdater, createNewEntryPointFormats, errorOnFailedEntryPoint) {
        return createNewEntryPointFormats ?
            new new_entry_point_file_writer_1.NewEntryPointFileWriter(fs, logger, errorOnFailedEntryPoint, pkgJsonUpdater) :
            new in_place_file_writer_1.InPlaceFileWriter(fs, logger, errorOnFailedEntryPoint);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2NvbXBpbGVfZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvZXhlY3V0aW9uL2NyZWF0ZV9jb21waWxlX2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQ0E7Ozs7OztPQU1HO0lBQ0gsK0JBQWlDO0lBRWpDLDJFQUF1RTtJQUt2RSxtRkFBNEQ7SUFDNUQsaUdBQW9FO0lBRXBFLG9HQUFrRTtJQUNsRSxrSEFBK0U7SUFNL0U7O09BRUc7SUFDSCxTQUFnQixrQkFBa0IsQ0FDOUIsVUFBc0IsRUFBRSxNQUFjLEVBQUUsY0FBa0MsRUFDMUUsMEJBQW1DLEVBQUUsdUJBQWdDLEVBQ3JFLCtCQUF3QyxFQUFFLFFBQWtDLEVBQzVFLFlBQW9DO1FBQ3RDLE9BQU8sVUFBQSxlQUFlO1lBQ3BCLElBQU0sVUFBVSxHQUFHLGFBQWEsQ0FDNUIsVUFBVSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUN0RixJQUFBLDREQUFXLENBQXVDO1lBQ3pELElBQU0sV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbEUsT0FBTyxVQUFDLElBQVU7Z0JBQ1QsSUFBQSw0QkFBVSxFQUFFLG9DQUFjLEVBQUUsMEVBQWlDLEVBQUUsNEJBQVUsQ0FBUztnQkFFekYsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBRSxxQ0FBcUM7Z0JBQzFGLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7Z0JBQzNDLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDL0MsSUFBTSxNQUFNLEdBQUcsaUNBQW1CLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFFM0UsMEZBQTBGO2dCQUMxRiw2RkFBNkY7Z0JBQzdGLDZDQUE2QztnQkFDN0Msd0ZBQXdGO2dCQUN4Riw0REFBNEQ7Z0JBQzVELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQzFCLDRCQUE0QjtvQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FDWCxzREFBb0QsVUFBVSxDQUFDLElBQUksUUFBSzt5QkFDckUsY0FBYyxzQkFBaUIsVUFBVSxtQkFBYyxNQUFNLE1BQUcsQ0FBQSxDQUFDLENBQUM7aUJBQzFFO2dCQUVELElBQU0sTUFBTSxHQUFHLHlDQUFvQixDQUMvQixVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUNsRiwrQkFBK0IsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWEsVUFBVSxDQUFDLElBQUksV0FBTSxjQUFjLFlBQU8sTUFBUSxDQUFDLENBQUM7Z0JBRTdFLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDbEIsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUNBQXVCLENBQy9CLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNwRjtvQkFDRCxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztvQkFFM0YsTUFBTSxDQUFDLEtBQUssQ0FBQyw2QkFBMkIsVUFBVSxDQUFDLElBQUksV0FBTSxjQUFnQixDQUFDLENBQUM7b0JBRS9FLGVBQWUsQ0FBQyxJQUFJLHFCQUFtQyxJQUFJLENBQUMsQ0FBQztpQkFDOUQ7cUJBQU07b0JBQ0wsSUFBTSxNQUFNLEdBQUcscUNBQXVCLENBQ2xDLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbEYsZUFBZSxDQUFDLElBQUksa0JBQWdDLDBCQUF3QixNQUFRLENBQUMsQ0FBQztpQkFDdkY7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7SUFDSixDQUFDO0lBdkRELGdEQXVEQztJQUVELFNBQVMsYUFBYSxDQUNsQixFQUFjLEVBQUUsTUFBYyxFQUFFLGNBQWtDLEVBQ2xFLDBCQUFtQyxFQUFFLHVCQUFnQztRQUN2RSxPQUFPLDBCQUEwQixDQUFDLENBQUM7WUFDL0IsSUFBSSxxREFBdUIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSx3Q0FBaUIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDakUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7cmVwbGFjZVRzV2l0aE5nSW5FcnJvcnN9IGZyb20gJy4uLy4uLy4uL3NyYy9uZ3RzYy9kaWFnbm9zdGljcyc7XG5pbXBvcnQge0ZpbGVTeXN0ZW19IGZyb20gJy4uLy4uLy4uL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge1BhcnNlZENvbmZpZ3VyYXRpb259IGZyb20gJy4uLy4uLy4uL3NyYy9wZXJmb3JtX2NvbXBpbGUnO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4uL2xvZ2dpbmcvbG9nZ2VyJztcbmltcG9ydCB7UGF0aE1hcHBpbmdzfSBmcm9tICcuLi9uZ2NjX29wdGlvbnMnO1xuaW1wb3J0IHtnZXRFbnRyeVBvaW50Rm9ybWF0fSBmcm9tICcuLi9wYWNrYWdlcy9lbnRyeV9wb2ludCc7XG5pbXBvcnQge21ha2VFbnRyeVBvaW50QnVuZGxlfSBmcm9tICcuLi9wYWNrYWdlcy9lbnRyeV9wb2ludF9idW5kbGUnO1xuaW1wb3J0IHtGaWxlV3JpdGVyfSBmcm9tICcuLi93cml0aW5nL2ZpbGVfd3JpdGVyJztcbmltcG9ydCB7SW5QbGFjZUZpbGVXcml0ZXJ9IGZyb20gJy4uL3dyaXRpbmcvaW5fcGxhY2VfZmlsZV93cml0ZXInO1xuaW1wb3J0IHtOZXdFbnRyeVBvaW50RmlsZVdyaXRlcn0gZnJvbSAnLi4vd3JpdGluZy9uZXdfZW50cnlfcG9pbnRfZmlsZV93cml0ZXInO1xuaW1wb3J0IHtQYWNrYWdlSnNvblVwZGF0ZXJ9IGZyb20gJy4uL3dyaXRpbmcvcGFja2FnZV9qc29uX3VwZGF0ZXInO1xuXG5pbXBvcnQge0NyZWF0ZUNvbXBpbGVGbn0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHtUYXNrLCBUYXNrUHJvY2Vzc2luZ091dGNvbWV9IGZyb20gJy4vdGFza3MvYXBpJztcblxuLyoqXG4gKiBUaGUgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIHRoZSBgY29tcGlsZSgpYCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENyZWF0ZUNvbXBpbGVGbihcbiAgICBmaWxlU3lzdGVtOiBGaWxlU3lzdGVtLCBsb2dnZXI6IExvZ2dlciwgcGtnSnNvblVwZGF0ZXI6IFBhY2thZ2VKc29uVXBkYXRlcixcbiAgICBjcmVhdGVOZXdFbnRyeVBvaW50Rm9ybWF0czogYm9vbGVhbiwgZXJyb3JPbkZhaWxlZEVudHJ5UG9pbnQ6IGJvb2xlYW4sXG4gICAgZW5hYmxlSTE4bkxlZ2FjeU1lc3NhZ2VJZEZvcm1hdDogYm9vbGVhbiwgdHNDb25maWc6IFBhcnNlZENvbmZpZ3VyYXRpb258bnVsbCxcbiAgICBwYXRoTWFwcGluZ3M6IFBhdGhNYXBwaW5nc3x1bmRlZmluZWQpOiBDcmVhdGVDb21waWxlRm4ge1xuICByZXR1cm4gb25UYXNrQ29tcGxldGVkID0+IHtcbiAgICBjb25zdCBmaWxlV3JpdGVyID0gZ2V0RmlsZVdyaXRlcihcbiAgICAgICAgZmlsZVN5c3RlbSwgbG9nZ2VyLCBwa2dKc29uVXBkYXRlciwgY3JlYXRlTmV3RW50cnlQb2ludEZvcm1hdHMsIGVycm9yT25GYWlsZWRFbnRyeVBvaW50KTtcbiAgICBjb25zdCB7VHJhbnNmb3JtZXJ9ID0gcmVxdWlyZSgnLi4vcGFja2FnZXMvdHJhbnNmb3JtZXInKTtcbiAgICBjb25zdCB0cmFuc2Zvcm1lciA9IG5ldyBUcmFuc2Zvcm1lcihmaWxlU3lzdGVtLCBsb2dnZXIsIHRzQ29uZmlnKTtcblxuICAgIHJldHVybiAodGFzazogVGFzaykgPT4ge1xuICAgICAgY29uc3Qge2VudHJ5UG9pbnQsIGZvcm1hdFByb3BlcnR5LCBmb3JtYXRQcm9wZXJ0aWVzVG9NYXJrQXNQcm9jZXNzZWQsIHByb2Nlc3NEdHN9ID0gdGFzaztcblxuICAgICAgY29uc3QgaXNDb3JlID0gZW50cnlQb2ludC5uYW1lID09PSAnQGFuZ3VsYXIvY29yZSc7ICAvLyBBcmUgd2UgY29tcGlsaW5nIHRoZSBBbmd1bGFyIGNvcmU/XG4gICAgICBjb25zdCBwYWNrYWdlSnNvbiA9IGVudHJ5UG9pbnQucGFja2FnZUpzb247XG4gICAgICBjb25zdCBmb3JtYXRQYXRoID0gcGFja2FnZUpzb25bZm9ybWF0UHJvcGVydHldO1xuICAgICAgY29uc3QgZm9ybWF0ID0gZ2V0RW50cnlQb2ludEZvcm1hdChmaWxlU3lzdGVtLCBlbnRyeVBvaW50LCBmb3JtYXRQcm9wZXJ0eSk7XG5cbiAgICAgIC8vIEFsbCBwcm9wZXJ0aWVzIGxpc3RlZCBpbiBgcHJvcGVydGllc1RvUHJvY2Vzc2AgYXJlIGd1YXJhbnRlZWQgdG8gcG9pbnQgdG8gYSBmb3JtYXQtcGF0aFxuICAgICAgLy8gKGkuZS4gdGhleSBhcmUgZGVmaW5lZCBpbiBgZW50cnlQb2ludC5wYWNrYWdlSnNvbmApLiBGdXJ0aGVybW9yZSwgdGhleSBhcmUgYWxzbyBndWFyYW50ZWVkXG4gICAgICAvLyB0byBiZSBhbW9uZyBgU1VQUE9SVEVEX0ZPUk1BVF9QUk9QRVJUSUVTYC5cbiAgICAgIC8vIEJhc2VkIG9uIHRoZSBhYm92ZSwgYGZvcm1hdFBhdGhgIHNob3VsZCBhbHdheXMgYmUgZGVmaW5lZCBhbmQgYGdldEVudHJ5UG9pbnRGb3JtYXQoKWBcbiAgICAgIC8vIHNob3VsZCBhbHdheXMgcmV0dXJuIGEgZm9ybWF0IGhlcmUgKGFuZCBub3QgYHVuZGVmaW5lZGApLlxuICAgICAgaWYgKCFmb3JtYXRQYXRoIHx8ICFmb3JtYXQpIHtcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgSW52YXJpYW50IHZpb2xhdGVkOiBObyBmb3JtYXQtcGF0aCBvciBmb3JtYXQgZm9yICR7ZW50cnlQb2ludC5wYXRofSA6IGAgK1xuICAgICAgICAgICAgYCR7Zm9ybWF0UHJvcGVydHl9IChmb3JtYXRQYXRoOiAke2Zvcm1hdFBhdGh9IHwgZm9ybWF0OiAke2Zvcm1hdH0pYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1bmRsZSA9IG1ha2VFbnRyeVBvaW50QnVuZGxlKFxuICAgICAgICAgIGZpbGVTeXN0ZW0sIGVudHJ5UG9pbnQsIGZvcm1hdFBhdGgsIGlzQ29yZSwgZm9ybWF0LCBwcm9jZXNzRHRzLCBwYXRoTWFwcGluZ3MsIHRydWUsXG4gICAgICAgICAgZW5hYmxlSTE4bkxlZ2FjeU1lc3NhZ2VJZEZvcm1hdCk7XG5cbiAgICAgIGxvZ2dlci5pbmZvKGBDb21waWxpbmcgJHtlbnRyeVBvaW50Lm5hbWV9IDogJHtmb3JtYXRQcm9wZXJ0eX0gYXMgJHtmb3JtYXR9YCk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYW5zZm9ybWVyLnRyYW5zZm9ybShidW5kbGUpO1xuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIGlmIChyZXN1bHQuZGlhZ25vc3RpY3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxvZ2dlci53YXJuKHJlcGxhY2VUc1dpdGhOZ0luRXJyb3JzKFxuICAgICAgICAgICAgICB0cy5mb3JtYXREaWFnbm9zdGljc1dpdGhDb2xvckFuZENvbnRleHQocmVzdWx0LmRpYWdub3N0aWNzLCBidW5kbGUuc3JjLmhvc3QpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZVdyaXRlci53cml0ZUJ1bmRsZShidW5kbGUsIHJlc3VsdC50cmFuc2Zvcm1lZEZpbGVzLCBmb3JtYXRQcm9wZXJ0aWVzVG9NYXJrQXNQcm9jZXNzZWQpO1xuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgICBTdWNjZXNzZnVsbHkgY29tcGlsZWQgJHtlbnRyeVBvaW50Lm5hbWV9IDogJHtmb3JtYXRQcm9wZXJ0eX1gKTtcblxuICAgICAgICBvblRhc2tDb21wbGV0ZWQodGFzaywgVGFza1Byb2Nlc3NpbmdPdXRjb21lLlByb2Nlc3NlZCwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXBsYWNlVHNXaXRoTmdJbkVycm9ycyhcbiAgICAgICAgICAgIHRzLmZvcm1hdERpYWdub3N0aWNzV2l0aENvbG9yQW5kQ29udGV4dChyZXN1bHQuZGlhZ25vc3RpY3MsIGJ1bmRsZS5zcmMuaG9zdCkpO1xuICAgICAgICBvblRhc2tDb21wbGV0ZWQodGFzaywgVGFza1Byb2Nlc3NpbmdPdXRjb21lLkZhaWxlZCwgYGNvbXBpbGF0aW9uIGVycm9yczpcXG4ke2Vycm9yc31gKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlV3JpdGVyKFxuICAgIGZzOiBGaWxlU3lzdGVtLCBsb2dnZXI6IExvZ2dlciwgcGtnSnNvblVwZGF0ZXI6IFBhY2thZ2VKc29uVXBkYXRlcixcbiAgICBjcmVhdGVOZXdFbnRyeVBvaW50Rm9ybWF0czogYm9vbGVhbiwgZXJyb3JPbkZhaWxlZEVudHJ5UG9pbnQ6IGJvb2xlYW4pOiBGaWxlV3JpdGVyIHtcbiAgcmV0dXJuIGNyZWF0ZU5ld0VudHJ5UG9pbnRGb3JtYXRzID9cbiAgICAgIG5ldyBOZXdFbnRyeVBvaW50RmlsZVdyaXRlcihmcywgbG9nZ2VyLCBlcnJvck9uRmFpbGVkRW50cnlQb2ludCwgcGtnSnNvblVwZGF0ZXIpIDpcbiAgICAgIG5ldyBJblBsYWNlRmlsZVdyaXRlcihmcywgbG9nZ2VyLCBlcnJvck9uRmFpbGVkRW50cnlQb2ludCk7XG59XG4iXX0=