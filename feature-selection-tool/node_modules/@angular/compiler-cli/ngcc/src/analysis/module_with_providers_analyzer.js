(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/analysis/module_with_providers_analyzer", ["require", "exports", "typescript", "@angular/compiler-cli/src/ngtsc/imports", "@angular/compiler-cli/ngcc/src/utils"], factory);
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
    var imports_1 = require("@angular/compiler-cli/src/ngtsc/imports");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/utils");
    exports.ModuleWithProvidersAnalyses = Map;
    var ModuleWithProvidersAnalyzer = /** @class */ (function () {
        function ModuleWithProvidersAnalyzer(host, referencesRegistry, processDts) {
            this.host = host;
            this.referencesRegistry = referencesRegistry;
            this.processDts = processDts;
        }
        ModuleWithProvidersAnalyzer.prototype.analyzeProgram = function (program) {
            var _this = this;
            var analyses = new exports.ModuleWithProvidersAnalyses();
            var rootFiles = this.getRootFiles(program);
            rootFiles.forEach(function (f) {
                var fns = _this.host.getModuleWithProvidersFunctions(f);
                fns && fns.forEach(function (fn) {
                    if (fn.ngModule.viaModule === null) {
                        // Record the usage of an internal module as it needs to become an exported symbol
                        _this.referencesRegistry.add(fn.ngModule.node, new imports_1.Reference(fn.ngModule.node));
                    }
                    // Only when processing the dts files do we need to determine which declaration to update.
                    if (_this.processDts) {
                        var dtsFn = _this.getDtsDeclarationForFunction(fn);
                        var typeParam = dtsFn.type && ts.isTypeReferenceNode(dtsFn.type) &&
                            dtsFn.type.typeArguments && dtsFn.type.typeArguments[0] ||
                            null;
                        if (!typeParam || isAnyKeyword(typeParam)) {
                            var ngModule = _this.resolveNgModuleReference(fn);
                            var dtsFile = dtsFn.getSourceFile();
                            var analysis = analyses.has(dtsFile) ? analyses.get(dtsFile) : [];
                            analysis.push({ declaration: dtsFn, ngModule: ngModule });
                            analyses.set(dtsFile, analysis);
                        }
                    }
                });
            });
            return analyses;
        };
        ModuleWithProvidersAnalyzer.prototype.getRootFiles = function (program) {
            return program.getRootFileNames().map(function (f) { return program.getSourceFile(f); }).filter(utils_1.isDefined);
        };
        ModuleWithProvidersAnalyzer.prototype.getDtsDeclarationForFunction = function (fn) {
            var dtsFn = null;
            var containerClass = fn.container && this.host.getClassSymbol(fn.container);
            if (containerClass) {
                var dtsClass = this.host.getDtsDeclaration(containerClass.declaration.valueDeclaration);
                // Get the declaration of the matching static method
                dtsFn = dtsClass && ts.isClassDeclaration(dtsClass) ?
                    dtsClass.members.find(function (member) { return ts.isMethodDeclaration(member) && ts.isIdentifier(member.name) &&
                        member.name.text === fn.name; }) :
                    null;
            }
            else {
                dtsFn = this.host.getDtsDeclaration(fn.declaration);
            }
            if (!dtsFn) {
                throw new Error("Matching type declaration for " + fn.declaration.getText() + " is missing");
            }
            if (!isFunctionOrMethod(dtsFn)) {
                throw new Error("Matching type declaration for " + fn.declaration.getText() + " is not a function: " + dtsFn.getText());
            }
            return dtsFn;
        };
        ModuleWithProvidersAnalyzer.prototype.resolveNgModuleReference = function (fn) {
            var ngModule = fn.ngModule;
            // For external module references, use the declaration as is.
            if (ngModule.viaModule !== null) {
                return ngModule;
            }
            // For internal (non-library) module references, redirect the module's value declaration
            // to its type declaration.
            var dtsNgModule = this.host.getDtsDeclaration(ngModule.node);
            if (!dtsNgModule) {
                throw new Error("No typings declaration can be found for the referenced NgModule class in " + fn.declaration.getText() + ".");
            }
            if (!ts.isClassDeclaration(dtsNgModule) || !utils_1.hasNameIdentifier(dtsNgModule)) {
                throw new Error("The referenced NgModule in " + fn.declaration
                    .getText() + " is not a named class declaration in the typings program; instead we get " + dtsNgModule.getText());
            }
            return { node: dtsNgModule, known: null, viaModule: null, identity: null };
        };
        return ModuleWithProvidersAnalyzer;
    }());
    exports.ModuleWithProvidersAnalyzer = ModuleWithProvidersAnalyzer;
    function isFunctionOrMethod(declaration) {
        return ts.isFunctionDeclaration(declaration) || ts.isMethodDeclaration(declaration);
    }
    function isAnyKeyword(typeParam) {
        return typeParam.kind === ts.SyntaxKind.AnyKeyword;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlX3dpdGhfcHJvdmlkZXJzX2FuYWx5emVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL25nY2Mvc3JjL2FuYWx5c2lzL21vZHVsZV93aXRoX3Byb3ZpZGVyc19hbmFseXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILCtCQUFpQztJQUdqQyxtRUFBcUQ7SUFHckQsOERBQXNEO0lBZ0J6QyxRQUFBLDJCQUEyQixHQUFHLEdBQUcsQ0FBQztJQUUvQztRQUNFLHFDQUNZLElBQXdCLEVBQVUsa0JBQXNDLEVBQ3hFLFVBQW1CO1lBRG5CLFNBQUksR0FBSixJQUFJLENBQW9CO1lBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtZQUN4RSxlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQUcsQ0FBQztRQUVuQyxvREFBYyxHQUFkLFVBQWUsT0FBbUI7WUFBbEMsaUJBNEJDO1lBM0JDLElBQU0sUUFBUSxHQUFHLElBQUksbUNBQTJCLEVBQUUsQ0FBQztZQUNuRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUNqQixJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7b0JBQ25CLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO3dCQUNsQyxrRkFBa0Y7d0JBQ2xGLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxtQkFBUyxDQUFDLEVBQUUsQ0FBQyxR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MkI7UUFFckQsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxTQUFTLFlBQVksQ0FBQyxTQUFzQjtRQUMxQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDckQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge1JlZmVyZW5jZXNSZWdpc3RyeX0gZnJvbSAnLi4vLi4vLi4vc3JjL25ndHNjL2Fubm90YXRpb25zJztcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tICcuLi8uLi8uLi9zcmMvbmd0c2MvaW1wb3J0cyc7XG5pbXBvcnQge0NsYXNzRGVjbGFyYXRpb24sIENvbmNyZXRlRGVjbGFyYXRpb259IGZyb20gJy4uLy4uLy4uL3NyYy9uZ3RzYy9yZWZsZWN0aW9uJztcbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVyc0Z1bmN0aW9uLCBOZ2NjUmVmbGVjdGlvbkhvc3R9IGZyb20gJy4uL2hvc3QvbmdjY19ob3N0JztcbmltcG9ydCB7aGFzTmFtZUlkZW50aWZpZXIsIGlzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZHVsZVdpdGhQcm92aWRlcnNJbmZvIHtcbiAgLyoqXG4gICAqIFRoZSBkZWNsYXJhdGlvbiAoaW4gdGhlIC5kLnRzIGZpbGUpIG9mIHRoZSBmdW5jdGlvbiB0aGF0IHJldHVybnNcbiAgICogYSBgTW9kdWxlV2l0aFByb3ZpZGVycyBvYmplY3QsIGJ1dCBoYXMgYSBzaWduYXR1cmUgdGhhdCBuZWVkc1xuICAgKiBhIHR5cGUgcGFyYW1ldGVyIGFkZGluZy5cbiAgICovXG4gIGRlY2xhcmF0aW9uOiB0cy5NZXRob2REZWNsYXJhdGlvbnx0cy5GdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAvKipcbiAgICogVGhlIE5nTW9kdWxlIGNsYXNzIGRlY2xhcmF0aW9uIChpbiB0aGUgLmQudHMgZmlsZSkgdG8gYWRkIGFzIGEgdHlwZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBuZ01vZHVsZTogQ29uY3JldGVEZWNsYXJhdGlvbjxDbGFzc0RlY2xhcmF0aW9uPjtcbn1cblxuZXhwb3J0IHR5cGUgTW9kdWxlV2l0aFByb3ZpZGVyc0FuYWx5c2VzID0gTWFwPHRzLlNvdXJjZUZpbGUsIE1vZHVsZVdpdGhQcm92aWRlcnNJbmZvW10+O1xuZXhwb3J0IGNvbnN0IE1vZHVsZVdpdGhQcm92aWRlcnNBbmFseXNlcyA9IE1hcDtcblxuZXhwb3J0IGNsYXNzIE1vZHVsZVdpdGhQcm92aWRlcnNBbmFseXplciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBob3N0OiBOZ2NjUmVmbGVjdGlvbkhvc3QsIHByaXZhdGUgcmVmZXJlbmNlc1JlZ2lzdHJ5OiBSZWZlcmVuY2VzUmVnaXN0cnksXG4gICAgICBwcml2YXRlIHByb2Nlc3NEdHM6IGJvb2xlYW4pIHt9XG5cbiAgYW5hbHl6ZVByb2dyYW0ocHJvZ3JhbTogdHMuUHJvZ3JhbSk6IE1vZHVsZVdpdGhQcm92aWRlcnNBbmFseXNlcyB7XG4gICAgY29uc3QgYW5hbHlzZXMgPSBuZXcgTW9kdWxlV2l0aFByb3ZpZGVyc0FuYWx5c2VzKCk7XG4gICAgY29uc3Qgcm9vdEZpbGVzID0gdGhpcy5nZXRSb290RmlsZXMocHJvZ3JhbSk7XG4gICAgcm9vdEZpbGVzLmZvckVhY2goZiA9PiB7XG4gICAgICBjb25zdCBmbnMgPSB0aGlzLmhvc3QuZ2V0TW9kdWxlV2l0aFByb3ZpZGVyc0Z1bmN0aW9ucyhmKTtcbiAgICAgIGZucyAmJiBmbnMuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgIGlmIChmbi5uZ01vZHVsZS52aWFNb2R1bGUgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBSZWNvcmQgdGhlIHVzYWdlIG9mIGFuIGludGVybmFsIG1vZHVsZSBhcyBpdCBuZWVkcyB0byBiZWNvbWUgYW4gZXhwb3J0ZWQgc3ltYm9sXG4gICAgICAgICAgdGhpcy5yZWZlcmVuY2VzUmVnaXN0cnkuYWRkKGZuLm5nTW9kdWxlLm5vZGUsIG5ldyBSZWZlcmVuY2UoZm4ubmdNb2R1bGUubm9kZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSB3aGVuIHByb2Nlc3NpbmcgdGhlIGR0cyBmaWxlcyBkbyB3ZSBuZWVkIHRvIGRldGVybWluZSB3aGljaCBkZWNsYXJhdGlvbiB0byB1cGRhdGUuXG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NEdHMpIHtcbiAgICAgICAgICBjb25zdCBkdHNGbiA9IHRoaXMuZ2V0RHRzRGVjbGFyYXRpb25Gb3JGdW5jdGlvbihmbik7XG4gICAgICAgICAgY29uc3QgdHlwZVBhcmFtID0gZHRzRm4udHlwZSAmJiB0cy5pc1R5cGVSZWZlcmVuY2VOb2RlKGR0c0ZuLnR5cGUpICYmXG4gICAgICAgICAgICAgICAgICBkdHNGbi50eXBlLnR5cGVBcmd1bWVudHMgJiYgZHRzRm4udHlwZS50eXBlQXJndW1lbnRzWzBdIHx8XG4gICAgICAgICAgICAgIG51bGw7XG4gICAgICAgICAgaWYgKCF0eXBlUGFyYW0gfHwgaXNBbnlLZXl3b3JkKHR5cGVQYXJhbSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5nTW9kdWxlID0gdGhpcy5yZXNvbHZlTmdNb2R1bGVSZWZlcmVuY2UoZm4pO1xuICAgICAgICAgICAgY29uc3QgZHRzRmlsZSA9IGR0c0ZuLmdldFNvdXJjZUZpbGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuYWx5c2lzID0gYW5hbHlzZXMuaGFzKGR0c0ZpbGUpID8gYW5hbHlzZXMuZ2V0KGR0c0ZpbGUpIDogW107XG4gICAgICAgICAgICBhbmFseXNpcy5wdXNoKHtkZWNsYXJhdGlvbjogZHRzRm4sIG5nTW9kdWxlfSk7XG4gICAgICAgICAgICBhbmFseXNlcy5zZXQoZHRzRmlsZSwgYW5hbHlzaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFuYWx5c2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb290RmlsZXMocHJvZ3JhbTogdHMuUHJvZ3JhbSk6IHRzLlNvdXJjZUZpbGVbXSB7XG4gICAgcmV0dXJuIHByb2dyYW0uZ2V0Um9vdEZpbGVOYW1lcygpLm1hcChmID0+IHByb2dyYW0uZ2V0U291cmNlRmlsZShmKSkuZmlsdGVyKGlzRGVmaW5lZCk7XG4gIH1cblxuICBwcml2YXRlIGdldER0c0RlY2xhcmF0aW9uRm9yRnVuY3Rpb24oZm46IE1vZHVsZVdpdGhQcm92aWRlcnNGdW5jdGlvbikge1xuICAgIGxldCBkdHNGbjogdHMuRGVjbGFyYXRpb258bnVsbCA9IG51bGw7XG4gICAgY29uc3QgY29udGFpbmVyQ2xhc3MgPSBmbi5jb250YWluZXIgJiYgdGhpcy5ob3N0LmdldENsYXNzU3ltYm9sKGZuLmNvbnRhaW5lcik7XG4gICAgaWYgKGNvbnRhaW5lckNsYXNzKSB7XG4gICAgICBjb25zdCBkdHNDbGFzcyA9IHRoaXMuaG9zdC5nZXREdHNEZWNsYXJhdGlvbihjb250YWluZXJDbGFzcy5kZWNsYXJhdGlvbi52YWx1ZURlY2xhcmF0aW9uKTtcbiAgICAgIC8vIEdldCB0aGUgZGVjbGFyYXRpb24gb2YgdGhlIG1hdGNoaW5nIHN0YXRpYyBtZXRob2RcbiAgICAgIGR0c0ZuID0gZHRzQ2xhc3MgJiYgdHMuaXNDbGFzc0RlY2xhcmF0aW9uKGR0c0NsYXNzKSA/XG4gICAgICAgICAgZHRzQ2xhc3MubWVtYmVycy5maW5kKFxuICAgICAgICAgICAgICBtZW1iZXIgPT4gdHMuaXNNZXRob2REZWNsYXJhdGlvbihtZW1iZXIpICYmIHRzLmlzSWRlbnRpZmllcihtZW1iZXIubmFtZSkgJiZcbiAgICAgICAgICAgICAgICAgIG1lbWJlci5uYW1lLnRleHQgPT09IGZuLm5hbWUpIGFzIHRzLkRlY2xhcmF0aW9uIDpcbiAgICAgICAgICBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBkdHNGbiA9IHRoaXMuaG9zdC5nZXREdHNEZWNsYXJhdGlvbihmbi5kZWNsYXJhdGlvbik7XG4gICAgfVxuICAgIGlmICghZHRzRm4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWF0Y2hpbmcgdHlwZSBkZWNsYXJhdGlvbiBmb3IgJHtmbi5kZWNsYXJhdGlvbi5nZXRUZXh0KCl9IGlzIG1pc3NpbmdgKTtcbiAgICB9XG4gICAgaWYgKCFpc0Z1bmN0aW9uT3JNZXRob2QoZHRzRm4pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoaW5nIHR5cGUgZGVjbGFyYXRpb24gZm9yICR7XG4gICAgICAgICAgZm4uZGVjbGFyYXRpb24uZ2V0VGV4dCgpfSBpcyBub3QgYSBmdW5jdGlvbjogJHtkdHNGbi5nZXRUZXh0KCl9YCk7XG4gICAgfVxuICAgIHJldHVybiBkdHNGbjtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZU5nTW9kdWxlUmVmZXJlbmNlKGZuOiBNb2R1bGVXaXRoUHJvdmlkZXJzRnVuY3Rpb24pOlxuICAgICAgQ29uY3JldGVEZWNsYXJhdGlvbjxDbGFzc0RlY2xhcmF0aW9uPiB7XG4gICAgY29uc3QgbmdNb2R1bGUgPSBmbi5uZ01vZHVsZTtcblxuICAgIC8vIEZvciBleHRlcm5hbCBtb2R1bGUgcmVmZXJlbmNlcywgdXNlIHRoZSBkZWNsYXJhdGlvbiBhcyBpcy5cbiAgICBpZiAobmdNb2R1bGUudmlhTW9kdWxlICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmdNb2R1bGU7XG4gICAgfVxuXG4gICAgLy8gRm9yIGludGVybmFsIChub24tbGlicmFyeSkgbW9kdWxlIHJlZmVyZW5jZXMsIHJlZGlyZWN0IHRoZSBtb2R1bGUncyB2YWx1ZSBkZWNsYXJhdGlvblxuICAgIC8vIHRvIGl0cyB0eXBlIGRlY2xhcmF0aW9uLlxuICAgIGNvbnN0IGR0c05nTW9kdWxlID0gdGhpcy5ob3N0LmdldER0c0RlY2xhcmF0aW9uKG5nTW9kdWxlLm5vZGUpO1xuICAgIGlmICghZHRzTmdNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gdHlwaW5ncyBkZWNsYXJhdGlvbiBjYW4gYmUgZm91bmQgZm9yIHRoZSByZWZlcmVuY2VkIE5nTW9kdWxlIGNsYXNzIGluICR7XG4gICAgICAgICAgZm4uZGVjbGFyYXRpb24uZ2V0VGV4dCgpfS5gKTtcbiAgICB9XG4gICAgaWYgKCF0cy5pc0NsYXNzRGVjbGFyYXRpb24oZHRzTmdNb2R1bGUpIHx8ICFoYXNOYW1lSWRlbnRpZmllcihkdHNOZ01vZHVsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHJlZmVyZW5jZWQgTmdNb2R1bGUgaW4gJHtcbiAgICAgICAgICBmbi5kZWNsYXJhdGlvblxuICAgICAgICAgICAgICAuZ2V0VGV4dCgpfSBpcyBub3QgYSBuYW1lZCBjbGFzcyBkZWNsYXJhdGlvbiBpbiB0aGUgdHlwaW5ncyBwcm9ncmFtOyBpbnN0ZWFkIHdlIGdldCAke1xuICAgICAgICAgIGR0c05nTW9kdWxlLmdldFRleHQoKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge25vZGU6IGR0c05nTW9kdWxlLCBrbm93bjogbnVsbCwgdmlhTW9kdWxlOiBudWxsLCBpZGVudGl0eTogbnVsbH07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uT3JNZXRob2QoZGVjbGFyYXRpb246IHRzLkRlY2xhcmF0aW9uKTogZGVjbGFyYXRpb24gaXMgdHMuRnVuY3Rpb25EZWNsYXJhdGlvbnxcbiAgICB0cy5NZXRob2REZWNsYXJhdGlvbiB7XG4gIHJldHVybiB0cy5pc0Z1bmN0aW9uRGVjbGFyYXRpb24oZGVjbGFyYXRpb24pIHx8IHRzLmlzTWV0aG9kRGVjbGFyYXRpb24oZGVjbGFyYXRpb24pO1xufVxuXG5mdW5jdGlvbiBpc0FueUtleXdvcmQodHlwZVBhcmFtOiB0cy5UeXBlTm9kZSk6IHR5cGVQYXJhbSBpcyB0cy5LZXl3b3JkVHlwZU5vZGUge1xuICByZXR1cm4gdHlwZVBhcmFtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQW55S2V5d29yZDtcbn1cbiJdfQ==