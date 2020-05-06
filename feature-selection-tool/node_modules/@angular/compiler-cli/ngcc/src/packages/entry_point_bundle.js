(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/packages/entry_point_bundle", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/ngcc/src/packages/bundle_program", "@angular/compiler-cli/ngcc/src/packages/ngcc_compiler_host"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var bundle_program_1 = require("@angular/compiler-cli/ngcc/src/packages/bundle_program");
    var ngcc_compiler_host_1 = require("@angular/compiler-cli/ngcc/src/packages/ngcc_compiler_host");
    /**
     * Get an object that describes a formatted bundle for an entry-point.
     * @param fs The current file-system being used.
     * @param entryPoint The entry-point that contains the bundle.
     * @param formatPath The path to the source files for this bundle.
     * @param isCore This entry point is the Angular core package.
     * @param format The underlying format of the bundle.
     * @param transformDts Whether to transform the typings along with this bundle.
     * @param pathMappings An optional set of mappings to use when compiling files.
     * @param mirrorDtsFromSrc If true then the `dts` program will contain additional files that
     * were guessed by mapping the `src` files to `dts` files.
     * @param enableI18nLegacyMessageIdFormat Whether to render legacy message ids for i18n messages in
     * component templates.
     */
    function makeEntryPointBundle(fs, entryPoint, formatPath, isCore, format, transformDts, pathMappings, mirrorDtsFromSrc, enableI18nLegacyMessageIdFormat) {
        if (mirrorDtsFromSrc === void 0) { mirrorDtsFromSrc = false; }
        if (enableI18nLegacyMessageIdFormat === void 0) { enableI18nLegacyMessageIdFormat = true; }
        // Create the TS program and necessary helpers.
        var rootDir = entryPoint.package;
        var options = tslib_1.__assign({ allowJs: true, maxNodeModuleJsDepth: Infinity, rootDir: rootDir }, pathMappings);
        var srcHost = new ngcc_compiler_host_1.NgccSourcesCompilerHost(fs, options, entryPoint.path);
        var dtsHost = new file_system_1.NgtscCompilerHost(fs, options);
        // Create the bundle programs, as necessary.
        var absFormatPath = fs.resolve(entryPoint.path, formatPath);
        var typingsPath = fs.resolve(entryPoint.path, entryPoint.typings);
        var src = bundle_program_1.makeBundleProgram(fs, isCore, entryPoint.package, absFormatPath, 'r3_symbols.js', options, srcHost);
        var additionalDtsFiles = transformDts && mirrorDtsFromSrc ?
            computePotentialDtsFilesFromJsFiles(fs, src.program, absFormatPath, typingsPath) :
            [];
        var dts = transformDts ? bundle_program_1.makeBundleProgram(fs, isCore, entryPoint.package, typingsPath, 'r3_symbols.d.ts', options, dtsHost, additionalDtsFiles) :
            null;
        var isFlatCore = isCore && src.r3SymbolsFile === null;
        return {
            entryPoint: entryPoint,
            format: format,
            rootDirs: [rootDir],
            isCore: isCore,
            isFlatCore: isFlatCore,
            src: src,
            dts: dts,
            enableI18nLegacyMessageIdFormat: enableI18nLegacyMessageIdFormat
        };
    }
    exports.makeEntryPointBundle = makeEntryPointBundle;
    function computePotentialDtsFilesFromJsFiles(fs, srcProgram, formatPath, typingsPath) {
        var e_1, _a;
        var formatRoot = fs.dirname(formatPath);
        var typingsRoot = fs.dirname(typingsPath);
        var additionalFiles = [];
        try {
            for (var _b = tslib_1.__values(srcProgram.getSourceFiles()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sf = _c.value;
                if (!sf.fileName.endsWith('.js')) {
                    continue;
                }
                // Given a source file at e.g. `esm2015/src/some/nested/index.js`, try to resolve the
                // declaration file under the typings root in `src/some/nested/index.d.ts`.
                var mirroredDtsPath = fs.resolve(typingsRoot, fs.relative(formatRoot, sf.fileName.replace(/\.js$/, '.d.ts')));
                if (fs.exists(mirroredDtsPath)) {
                    additionalFiles.push(mirroredDtsPath);
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
        return additionalFiles;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlfcG9pbnRfYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL25nY2Mvc3JjL3BhY2thZ2VzL2VudHJ5X3BvaW50X2J1bmRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFRQSwyRUFBNkY7SUFFN0YseUZBQWtFO0lBRWxFLGlHQUE2RDtJQWlCN0Q7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFNBQWdCLG9CQUFvQixDQUNoQyxFQUFjLEVBQUUsVUFBc0IsRUFBRSxVQUFrQixFQUFFLE1BQWUsRUFDM0UsTUFBd0IsRUFBRSxZQUFxQixFQUFFLFlBQTJCLEVBQzVFLGdCQUFpQyxFQUNqQywrQkFBK0M7UUFEL0MsaUNBQUEsRUFBQSx3QkFBaUM7UUFDakMsZ0RBQUEsRUFBQSxzQ0FBK0M7UUFDakQsK0NBQStDO1FBQy9DLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbkMsSUFBTSxPQUFPLHNCQUNXLE9BQU8sRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLE9BQU8sU0FBQSxJQUFLLFlBQVksQ0FBQyxDQUFDO1FBQ2pHLElBQU0sT0FBTyxHQUFHLElBQUksNENBQXVCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUUsSUFBTSxPQUFPLEdBQUcsSUFBSSwrQkFBaUIsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbkQsNENBQTRDO1FBQzVDLElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM5RCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLElBQU0sR0FBRyxHQUFHLGtDQUFpQixDQUN6QixFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEYsSUFBTSxrQkFBa0IsR0FBRyxZQUFZLElBQUksZ0JBQWdCLENBQUMsQ0FBQztZQUN6RCxtQ0FBbUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsRixFQUFFLENBQUM7UUFDUCxJQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLGtDQUFpQixDQUNiLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQztRQUNoQyxJQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksR0FBRyxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUM7UUFFeEQsT0FBTztZQUNMLFVBQVUsWUFBQTtZQUNWLE1BQU0sUUFBQTtZQUNOLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNuQixNQUFNLFFBQUE7WUFDTixVQUFVLFlBQUE7WUFDVixHQUFHLEtBQUE7WUFDSCxHQUFHLEtBQUE7WUFDSCwrQkFBK0IsaUNBQUE7U0FDaEMsQ0FBQztJQUNKLENBQUM7SUFwQ0Qsb0RBb0NDO0lBRUQsU0FBUyxtQ0FBbUMsQ0FDeEMsRUFBYyxFQUFFLFVBQXNCLEVBQUUsVUFBMEIsRUFDbEUsV0FBMkI7O1FBQzdCLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QyxJQUFNLGVBQWUsR0FBcUIsRUFBRSxDQUFDOztZQUM3QyxLQUFpQixJQUFBLEtBQUEsaUJBQUEsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFBLGdCQUFBLDRCQUFFO2dCQUF6QyxJQUFNLEVBQUUsV0FBQTtnQkFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2hDLFNBQVM7aUJBQ1Y7Z0JBRUQscUZBQXFGO2dCQUNyRiwyRUFBMkU7Z0JBQzNFLElBQU0sZUFBZSxHQUNqQixFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBQzlCLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Y7Ozs7Ozs7OztRQUNELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW0sIE5ndHNjQ29tcGlsZXJIb3N0fSBmcm9tICcuLi8uLi8uLi9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHtQYXRoTWFwcGluZ3N9IGZyb20gJy4uL25nY2Nfb3B0aW9ucyc7XG5pbXBvcnQge0J1bmRsZVByb2dyYW0sIG1ha2VCdW5kbGVQcm9ncmFtfSBmcm9tICcuL2J1bmRsZV9wcm9ncmFtJztcbmltcG9ydCB7RW50cnlQb2ludCwgRW50cnlQb2ludEZvcm1hdH0gZnJvbSAnLi9lbnRyeV9wb2ludCc7XG5pbXBvcnQge05nY2NTb3VyY2VzQ29tcGlsZXJIb3N0fSBmcm9tICcuL25nY2NfY29tcGlsZXJfaG9zdCc7XG5cbi8qKlxuICogQSBidW5kbGUgb2YgZmlsZXMgYW5kIHBhdGhzIChhbmQgVFMgcHJvZ3JhbXMpIHRoYXQgY29ycmVzcG9uZCB0byBhIHBhcnRpY3VsYXJcbiAqIGZvcm1hdCBvZiBhIHBhY2thZ2UgZW50cnktcG9pbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW50cnlQb2ludEJ1bmRsZSB7XG4gIGVudHJ5UG9pbnQ6IEVudHJ5UG9pbnQ7XG4gIGZvcm1hdDogRW50cnlQb2ludEZvcm1hdDtcbiAgaXNDb3JlOiBib29sZWFuO1xuICBpc0ZsYXRDb3JlOiBib29sZWFuO1xuICByb290RGlyczogQWJzb2x1dGVGc1BhdGhbXTtcbiAgc3JjOiBCdW5kbGVQcm9ncmFtO1xuICBkdHM6IEJ1bmRsZVByb2dyYW18bnVsbDtcbiAgZW5hYmxlSTE4bkxlZ2FjeU1lc3NhZ2VJZEZvcm1hdDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IHRoYXQgZGVzY3JpYmVzIGEgZm9ybWF0dGVkIGJ1bmRsZSBmb3IgYW4gZW50cnktcG9pbnQuXG4gKiBAcGFyYW0gZnMgVGhlIGN1cnJlbnQgZmlsZS1zeXN0ZW0gYmVpbmcgdXNlZC5cbiAqIEBwYXJhbSBlbnRyeVBvaW50IFRoZSBlbnRyeS1wb2ludCB0aGF0IGNvbnRhaW5zIHRoZSBidW5kbGUuXG4gKiBAcGFyYW0gZm9ybWF0UGF0aCBUaGUgcGF0aCB0byB0aGUgc291cmNlIGZpbGVzIGZvciB0aGlzIGJ1bmRsZS5cbiAqIEBwYXJhbSBpc0NvcmUgVGhpcyBlbnRyeSBwb2ludCBpcyB0aGUgQW5ndWxhciBjb3JlIHBhY2thZ2UuXG4gKiBAcGFyYW0gZm9ybWF0IFRoZSB1bmRlcmx5aW5nIGZvcm1hdCBvZiB0aGUgYnVuZGxlLlxuICogQHBhcmFtIHRyYW5zZm9ybUR0cyBXaGV0aGVyIHRvIHRyYW5zZm9ybSB0aGUgdHlwaW5ncyBhbG9uZyB3aXRoIHRoaXMgYnVuZGxlLlxuICogQHBhcmFtIHBhdGhNYXBwaW5ncyBBbiBvcHRpb25hbCBzZXQgb2YgbWFwcGluZ3MgdG8gdXNlIHdoZW4gY29tcGlsaW5nIGZpbGVzLlxuICogQHBhcmFtIG1pcnJvckR0c0Zyb21TcmMgSWYgdHJ1ZSB0aGVuIHRoZSBgZHRzYCBwcm9ncmFtIHdpbGwgY29udGFpbiBhZGRpdGlvbmFsIGZpbGVzIHRoYXRcbiAqIHdlcmUgZ3Vlc3NlZCBieSBtYXBwaW5nIHRoZSBgc3JjYCBmaWxlcyB0byBgZHRzYCBmaWxlcy5cbiAqIEBwYXJhbSBlbmFibGVJMThuTGVnYWN5TWVzc2FnZUlkRm9ybWF0IFdoZXRoZXIgdG8gcmVuZGVyIGxlZ2FjeSBtZXNzYWdlIGlkcyBmb3IgaTE4biBtZXNzYWdlcyBpblxuICogY29tcG9uZW50IHRlbXBsYXRlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFbnRyeVBvaW50QnVuZGxlKFxuICAgIGZzOiBGaWxlU3lzdGVtLCBlbnRyeVBvaW50OiBFbnRyeVBvaW50LCBmb3JtYXRQYXRoOiBzdHJpbmcsIGlzQ29yZTogYm9vbGVhbixcbiAgICBmb3JtYXQ6IEVudHJ5UG9pbnRGb3JtYXQsIHRyYW5zZm9ybUR0czogYm9vbGVhbiwgcGF0aE1hcHBpbmdzPzogUGF0aE1hcHBpbmdzLFxuICAgIG1pcnJvckR0c0Zyb21TcmM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBlbmFibGVJMThuTGVnYWN5TWVzc2FnZUlkRm9ybWF0OiBib29sZWFuID0gdHJ1ZSk6IEVudHJ5UG9pbnRCdW5kbGUge1xuICAvLyBDcmVhdGUgdGhlIFRTIHByb2dyYW0gYW5kIG5lY2Vzc2FyeSBoZWxwZXJzLlxuICBjb25zdCByb290RGlyID0gZW50cnlQb2ludC5wYWNrYWdlO1xuICBjb25zdCBvcHRpb25zOiB0c1xuICAgICAgLkNvbXBpbGVyT3B0aW9ucyA9IHthbGxvd0pzOiB0cnVlLCBtYXhOb2RlTW9kdWxlSnNEZXB0aDogSW5maW5pdHksIHJvb3REaXIsIC4uLnBhdGhNYXBwaW5nc307XG4gIGNvbnN0IHNyY0hvc3QgPSBuZXcgTmdjY1NvdXJjZXNDb21waWxlckhvc3QoZnMsIG9wdGlvbnMsIGVudHJ5UG9pbnQucGF0aCk7XG4gIGNvbnN0IGR0c0hvc3QgPSBuZXcgTmd0c2NDb21waWxlckhvc3QoZnMsIG9wdGlvbnMpO1xuXG4gIC8vIENyZWF0ZSB0aGUgYnVuZGxlIHByb2dyYW1zLCBhcyBuZWNlc3NhcnkuXG4gIGNvbnN0IGFic0Zvcm1hdFBhdGggPSBmcy5yZXNvbHZlKGVudHJ5UG9pbnQucGF0aCwgZm9ybWF0UGF0aCk7XG4gIGNvbnN0IHR5cGluZ3NQYXRoID0gZnMucmVzb2x2ZShlbnRyeVBvaW50LnBhdGgsIGVudHJ5UG9pbnQudHlwaW5ncyk7XG4gIGNvbnN0IHNyYyA9IG1ha2VCdW5kbGVQcm9ncmFtKFxuICAgICAgZnMsIGlzQ29yZSwgZW50cnlQb2ludC5wYWNrYWdlLCBhYnNGb3JtYXRQYXRoLCAncjNfc3ltYm9scy5qcycsIG9wdGlvbnMsIHNyY0hvc3QpO1xuICBjb25zdCBhZGRpdGlvbmFsRHRzRmlsZXMgPSB0cmFuc2Zvcm1EdHMgJiYgbWlycm9yRHRzRnJvbVNyYyA/XG4gICAgICBjb21wdXRlUG90ZW50aWFsRHRzRmlsZXNGcm9tSnNGaWxlcyhmcywgc3JjLnByb2dyYW0sIGFic0Zvcm1hdFBhdGgsIHR5cGluZ3NQYXRoKSA6XG4gICAgICBbXTtcbiAgY29uc3QgZHRzID0gdHJhbnNmb3JtRHRzID8gbWFrZUJ1bmRsZVByb2dyYW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcywgaXNDb3JlLCBlbnRyeVBvaW50LnBhY2thZ2UsIHR5cGluZ3NQYXRoLCAncjNfc3ltYm9scy5kLnRzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMsIGR0c0hvc3QsIGFkZGl0aW9uYWxEdHNGaWxlcykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICBjb25zdCBpc0ZsYXRDb3JlID0gaXNDb3JlICYmIHNyYy5yM1N5bWJvbHNGaWxlID09PSBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgZW50cnlQb2ludCxcbiAgICBmb3JtYXQsXG4gICAgcm9vdERpcnM6IFtyb290RGlyXSxcbiAgICBpc0NvcmUsXG4gICAgaXNGbGF0Q29yZSxcbiAgICBzcmMsXG4gICAgZHRzLFxuICAgIGVuYWJsZUkxOG5MZWdhY3lNZXNzYWdlSWRGb3JtYXRcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVBvdGVudGlhbER0c0ZpbGVzRnJvbUpzRmlsZXMoXG4gICAgZnM6IEZpbGVTeXN0ZW0sIHNyY1Byb2dyYW06IHRzLlByb2dyYW0sIGZvcm1hdFBhdGg6IEFic29sdXRlRnNQYXRoLFxuICAgIHR5cGluZ3NQYXRoOiBBYnNvbHV0ZUZzUGF0aCkge1xuICBjb25zdCBmb3JtYXRSb290ID0gZnMuZGlybmFtZShmb3JtYXRQYXRoKTtcbiAgY29uc3QgdHlwaW5nc1Jvb3QgPSBmcy5kaXJuYW1lKHR5cGluZ3NQYXRoKTtcbiAgY29uc3QgYWRkaXRpb25hbEZpbGVzOiBBYnNvbHV0ZUZzUGF0aFtdID0gW107XG4gIGZvciAoY29uc3Qgc2Ygb2Ygc3JjUHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgaWYgKCFzZi5maWxlTmFtZS5lbmRzV2l0aCgnLmpzJykpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIEdpdmVuIGEgc291cmNlIGZpbGUgYXQgZS5nLiBgZXNtMjAxNS9zcmMvc29tZS9uZXN0ZWQvaW5kZXguanNgLCB0cnkgdG8gcmVzb2x2ZSB0aGVcbiAgICAvLyBkZWNsYXJhdGlvbiBmaWxlIHVuZGVyIHRoZSB0eXBpbmdzIHJvb3QgaW4gYHNyYy9zb21lL25lc3RlZC9pbmRleC5kLnRzYC5cbiAgICBjb25zdCBtaXJyb3JlZER0c1BhdGggPVxuICAgICAgICBmcy5yZXNvbHZlKHR5cGluZ3NSb290LCBmcy5yZWxhdGl2ZShmb3JtYXRSb290LCBzZi5maWxlTmFtZS5yZXBsYWNlKC9cXC5qcyQvLCAnLmQudHMnKSkpO1xuICAgIGlmIChmcy5leGlzdHMobWlycm9yZWREdHNQYXRoKSkge1xuICAgICAgYWRkaXRpb25hbEZpbGVzLnB1c2gobWlycm9yZWREdHNQYXRoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFkZGl0aW9uYWxGaWxlcztcbn1cbiJdfQ==