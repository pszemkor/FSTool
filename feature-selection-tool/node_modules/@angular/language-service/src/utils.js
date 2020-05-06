/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/language-service/src/utils", ["require", "exports", "tslib", "@angular/compiler", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var ts = require("typescript");
    function isParseSourceSpan(value) {
        return value && !!value.start;
    }
    function spanOf(span) {
        if (!span)
            return undefined;
        if (isParseSourceSpan(span)) {
            return { start: span.start.offset, end: span.end.offset };
        }
        else {
            if (span.endSourceSpan) {
                return { start: span.sourceSpan.start.offset, end: span.endSourceSpan.end.offset };
            }
            else if (span.children && span.children.length) {
                return {
                    start: span.sourceSpan.start.offset,
                    end: spanOf(span.children[span.children.length - 1]).end
                };
            }
            return { start: span.sourceSpan.start.offset, end: span.sourceSpan.end.offset };
        }
    }
    exports.spanOf = spanOf;
    function inSpan(position, span, exclusive) {
        return span != null &&
            (exclusive ? position >= span.start && position < span.end :
                position >= span.start && position <= span.end);
    }
    exports.inSpan = inSpan;
    function offsetSpan(span, amount) {
        return { start: span.start + amount, end: span.end + amount };
    }
    exports.offsetSpan = offsetSpan;
    function isNarrower(spanA, spanB) {
        return spanA.start >= spanB.start && spanA.end <= spanB.end;
    }
    exports.isNarrower = isNarrower;
    function isStructuralDirective(type) {
        var e_1, _a;
        var _b;
        try {
            for (var _c = tslib_1.__values(type.diDeps), _d = _c.next(); !_d.done; _d = _c.next()) {
                var diDep = _d.value;
                var diDepName = compiler_1.identifierName((_b = diDep.token) === null || _b === void 0 ? void 0 : _b.identifier);
                if (diDepName === compiler_1.Identifiers.TemplateRef.name ||
                    diDepName === compiler_1.Identifiers.ViewContainerRef.name) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    }
    exports.isStructuralDirective = isStructuralDirective;
    function getSelectors(info) {
        var e_2, _a, e_3, _b;
        var map = new Map();
        var results = [];
        try {
            for (var _c = tslib_1.__values(info.directives), _d = _c.next(); !_d.done; _d = _c.next()) {
                var directive = _d.value;
                var selectors = compiler_1.CssSelector.parse(directive.selector);
                try {
                    for (var selectors_1 = (e_3 = void 0, tslib_1.__values(selectors)), selectors_1_1 = selectors_1.next(); !selectors_1_1.done; selectors_1_1 = selectors_1.next()) {
                        var selector = selectors_1_1.value;
                        results.push(selector);
                        map.set(selector, directive);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (selectors_1_1 && !selectors_1_1.done && (_b = selectors_1.return)) _b.call(selectors_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return { selectors: results, map: map };
    }
    exports.getSelectors = getSelectors;
    function diagnosticInfoFromTemplateInfo(info) {
        return {
            fileName: info.template.fileName,
            offset: info.template.span.start,
            query: info.template.query,
            members: info.template.members,
            htmlAst: info.htmlAst,
            templateAst: info.templateAst,
            source: info.template.source,
        };
    }
    exports.diagnosticInfoFromTemplateInfo = diagnosticInfoFromTemplateInfo;
    function findTemplateAstAt(ast, position) {
        var path = [];
        var visitor = new /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.visit = function (ast) {
                var span = spanOf(ast);
                if (inSpan(position, span)) {
                    var len = path.length;
                    if (!len || isNarrower(span, spanOf(path[len - 1]))) {
                        path.push(ast);
                    }
                }
                else {
                    // Returning a value here will result in the children being skipped.
                    return true;
                }
            };
            class_1.prototype.visitEmbeddedTemplate = function (ast, context) {
                return this.visitChildren(context, function (visit) {
                    // Ignore reference, variable and providers
                    visit(ast.attrs);
                    visit(ast.directives);
                    visit(ast.children);
                });
            };
            class_1.prototype.visitElement = function (ast, context) {
                return this.visitChildren(context, function (visit) {
                    // Ingnore providers
                    visit(ast.attrs);
                    visit(ast.inputs);
                    visit(ast.outputs);
                    visit(ast.references);
                    visit(ast.directives);
                    visit(ast.children);
                });
            };
            class_1.prototype.visitDirective = function (ast, context) {
                // Ignore the host properties of a directive
                var result = this.visitChildren(context, function (visit) {
                    visit(ast.inputs);
                });
                // We never care about the diretive itself, just its inputs.
                if (path[path.length - 1] === ast) {
                    path.pop();
                }
                return result;
            };
            return class_1;
        }(compiler_1.RecursiveTemplateAstVisitor));
        compiler_1.templateVisitAll(visitor, ast);
        return new compiler_1.AstPath(path, position);
    }
    exports.findTemplateAstAt = findTemplateAstAt;
    /**
     * Return the node that most tightly encompass the specified `position`.
     * @param node
     * @param position
     */
    function findTightestNode(node, position) {
        if (node.getStart() <= position && position < node.getEnd()) {
            return node.forEachChild(function (c) { return findTightestNode(c, position); }) || node;
        }
    }
    exports.findTightestNode = findTightestNode;
    /**
     * Return metadata about `node` if it looks like an Angular directive class.
     * In this case, potential matches are `@NgModule`, `@Component`, `@Directive`,
     * `@Pipe`, etc.
     * These class declarations all share some common attributes, namely their
     * decorator takes exactly one parameter and the parameter must be an object
     * literal.
     *
     * For example,
     *     v---------- `decoratorId`
     * @NgModule({           <
     *   declarations: [],   < classDecl
     * })                    <
     * class AppModule {}    <
     *          ^----- `classId`
     *
     * @param node Potential node that represents an Angular directive.
     */
    function getDirectiveClassLike(node) {
        var e_4, _a;
        if (!ts.isClassDeclaration(node) || !node.name || !node.decorators) {
            return;
        }
        try {
            for (var _b = tslib_1.__values(node.decorators), _c = _b.next(); !_c.done; _c = _b.next()) {
                var d = _c.value;
                var expr = d.expression;
                if (!ts.isCallExpression(expr) || expr.arguments.length !== 1 ||
                    !ts.isIdentifier(expr.expression)) {
                    continue;
                }
                var arg = expr.arguments[0];
                if (ts.isObjectLiteralExpression(arg)) {
                    return {
                        decoratorId: expr.expression,
                        classId: node.name,
                    };
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
    exports.getDirectiveClassLike = getDirectiveClassLike;
    /**
     * Finds the value of a property assignment that is nested in a TypeScript node and is of a certain
     * type T.
     *
     * @param startNode node to start searching for nested property assignment from
     * @param propName property assignment name
     * @param predicate function to verify that a node is of type T.
     * @return node property assignment value of type T, or undefined if none is found
     */
    function findPropertyValueOfType(startNode, propName, predicate) {
        if (ts.isPropertyAssignment(startNode) && startNode.name.getText() === propName) {
            var initializer = startNode.initializer;
            if (predicate(initializer))
                return initializer;
        }
        return startNode.forEachChild(function (c) { return findPropertyValueOfType(c, propName, predicate); });
    }
    exports.findPropertyValueOfType = findPropertyValueOfType;
    /**
     * Find the tightest node at the specified `position` from the AST `nodes`, and
     * return the path to the node.
     * @param nodes HTML AST nodes
     * @param position
     */
    function getPathToNodeAtPosition(nodes, position) {
        var path = [];
        var visitor = new /** @class */ (function (_super) {
            tslib_1.__extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_2.prototype.visit = function (ast) {
                var span = spanOf(ast);
                if (inSpan(position, span)) {
                    path.push(ast);
                }
                else {
                    // Returning a truthy value here will skip all children and terminate
                    // the visit.
                    return true;
                }
            };
            return class_2;
        }(compiler_1.RecursiveVisitor));
        compiler_1.visitAll(visitor, nodes);
        return new compiler_1.AstPath(path, position);
    }
    exports.getPathToNodeAtPosition = getPathToNodeAtPosition;
    /**
     * Inverts an object's key-value pairs.
     */
    function invertMap(obj) {
        var e_5, _a;
        var result = {};
        try {
            for (var _b = tslib_1.__values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                var v = obj[name_1];
                result[v] = name_1;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return result;
    }
    exports.invertMap = invertMap;
    /**
     * Finds the directive member providing a template output binding, if one exists.
     * @param info aggregate template AST information
     * @param path narrowing
     */
    function findOutputBinding(binding, path, query) {
        var e_6, _a;
        var element = path.first(compiler_1.ElementAst);
        if (element) {
            try {
                for (var _b = tslib_1.__values(element.directives), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var directive = _c.value;
                    var invertedOutputs = invertMap(directive.directive.outputs);
                    var fieldName = invertedOutputs[binding.name];
                    if (fieldName) {
                        var classSymbol = query.getTypeSymbol(directive.directive.type.reference);
                        if (classSymbol) {
                            return classSymbol.members().get(fieldName);
                        }
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
    }
    exports.findOutputBinding = findOutputBinding;
    /**
     * Returns a property assignment from the assignment value, or `undefined` if there is no
     * assignment.
     */
    function getPropertyAssignmentFromValue(value) {
        if (!value.parent || !ts.isPropertyAssignment(value.parent)) {
            return;
        }
        return value.parent;
    }
    exports.getPropertyAssignmentFromValue = getPropertyAssignmentFromValue;
    /**
     * Given a decorator property assignment, return the ClassDeclaration node that corresponds to the
     * directive class the property applies to.
     * If the property assignment is not on a class decorator, no declaration is returned.
     *
     * For example,
     *
     * @Component({
     *   template: '<div></div>'
     *   ^^^^^^^^^^^^^^^^^^^^^^^---- property assignment
     * })
     * class AppComponent {}
     *           ^---- class declaration node
     *
     * @param propAsgn property assignment
     */
    function getClassDeclFromDecoratorProp(propAsgnNode) {
        if (!propAsgnNode.parent || !ts.isObjectLiteralExpression(propAsgnNode.parent)) {
            return;
        }
        var objLitExprNode = propAsgnNode.parent;
        if (!objLitExprNode.parent || !ts.isCallExpression(objLitExprNode.parent)) {
            return;
        }
        var callExprNode = objLitExprNode.parent;
        if (!callExprNode.parent || !ts.isDecorator(callExprNode.parent)) {
            return;
        }
        var decorator = callExprNode.parent;
        if (!decorator.parent || !ts.isClassDeclaration(decorator.parent)) {
            return;
        }
        var classDeclNode = decorator.parent;
        return classDeclNode;
    }
    exports.getClassDeclFromDecoratorProp = getClassDeclFromDecoratorProp;
    /**
     * Determines if a property assignment is on a class decorator.
     * See `getClassDeclFromDecoratorProperty`, which gets the class the decorator is applied to, for
     * more details.
     *
     * @param prop property assignment
     */
    function isClassDecoratorProperty(propAsgn) {
        return !!getClassDeclFromDecoratorProp(propAsgn);
    }
    exports.isClassDecoratorProperty = isClassDecoratorProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sYW5ndWFnZS1zZXJ2aWNlL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCw4Q0FBNlU7SUFDN1UsK0JBQWlDO0lBVWpDLFNBQVMsaUJBQWlCLENBQUMsS0FBVTtRQUNuQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBS0QsU0FBZ0IsTUFBTSxDQUFDLElBQWlDO1FBQ3RELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDNUIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDO1NBQ3pEO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQzthQUNsRjtpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hELE9BQU87b0JBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU07b0JBQ25DLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUc7aUJBQzFELENBQUM7YUFD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QUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN2QyxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBbkJELHNFQW1CQztJQUVEOzs7Ozs7T0FNRztJQUNILFNBQWdCLHdCQUF3QixDQUFDLFFBQStCO1FBQ3RFLE9BQU8sQ0FBQyxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFGRCw0REFFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBc3RQYXRoLCBCb3VuZEV2ZW50QXN0LCBDb21waWxlRGlyZWN0aXZlU3VtbWFyeSwgQ29tcGlsZVR5cGVNZXRhZGF0YSwgQ3NzU2VsZWN0b3IsIERpcmVjdGl2ZUFzdCwgRWxlbWVudEFzdCwgRW1iZWRkZWRUZW1wbGF0ZUFzdCwgSHRtbEFzdFBhdGgsIGlkZW50aWZpZXJOYW1lLCBJZGVudGlmaWVycywgTm9kZSwgUGFyc2VTb3VyY2VTcGFuLCBSZWN1cnNpdmVUZW1wbGF0ZUFzdFZpc2l0b3IsIFJlY3Vyc2l2ZVZpc2l0b3IsIFRlbXBsYXRlQXN0LCBUZW1wbGF0ZUFzdFBhdGgsIHRlbXBsYXRlVmlzaXRBbGwsIHZpc2l0QWxsfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtBc3RSZXN1bHQsIERpYWdub3N0aWNUZW1wbGF0ZUluZm8sIFNlbGVjdG9ySW5mbywgU3BhbiwgU3ltYm9sLCBTeW1ib2xRdWVyeX0gZnJvbSAnLi90eXBlcyc7XG5cbmludGVyZmFjZSBTcGFuSG9sZGVyIHtcbiAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICBlbmRTb3VyY2VTcGFuPzogUGFyc2VTb3VyY2VTcGFufG51bGw7XG4gIGNoaWxkcmVuPzogU3BhbkhvbGRlcltdO1xufVxuXG5mdW5jdGlvbiBpc1BhcnNlU291cmNlU3Bhbih2YWx1ZTogYW55KTogdmFsdWUgaXMgUGFyc2VTb3VyY2VTcGFuIHtcbiAgcmV0dXJuIHZhbHVlICYmICEhdmFsdWUuc3RhcnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFuT2Yoc3BhbjogU3BhbkhvbGRlcik6IFNwYW47XG5leHBvcnQgZnVuY3Rpb24gc3Bhbk9mKHNwYW46IFBhcnNlU291cmNlU3Bhbik6IFNwYW47XG5leHBvcnQgZnVuY3Rpb24gc3Bhbk9mKHNwYW46IFNwYW5Ib2xkZXJ8UGFyc2VTb3VyY2VTcGFufHVuZGVmaW5lZCk6IFNwYW58dW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIHNwYW5PZihzcGFuPzogU3BhbkhvbGRlcnxQYXJzZVNvdXJjZVNwYW4pOiBTcGFufHVuZGVmaW5lZCB7XG4gIGlmICghc3BhbikgcmV0dXJuIHVuZGVmaW5lZDtcbiAgaWYgKGlzUGFyc2VTb3VyY2VTcGFuKHNwYW4pKSB7XG4gICAgcmV0dXJuIHtzdGFydDogc3Bhbi5zdGFydC5vZmZzZXQsIGVuZDogc3Bhbi5lbmQub2Zmc2V0fTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoc3Bhbi5lbmRTb3VyY2VTcGFuKSB7XG4gICAgICByZXR1cm4ge3N0YXJ0OiBzcGFuLnNvdXJjZVNwYW4uc3RhcnQub2Zmc2V0LCBlbmQ6IHNwYW4uZW5kU291cmNlU3Bhbi5lbmQub2Zmc2V0fTtcbiAgICB9IGVsc2UgaWYgKHNwYW4uY2hpbGRyZW4gJiYgc3Bhbi5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzcGFuLnNvdXJjZVNwYW4uc3RhcnQub2Zmc2V0LFxuICAgICAgICBlbmQ6IHNwYW5PZihzcGFuLmNoaWxkcmVuW3NwYW4uY2hpbGRyZW4ubGVuZ3RoIC0gMV0pIS5lbmRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7c3RhcnQ6IHNwYW4uc291cmNlU3Bhbi5zdGFydC5vZmZzZXQsIGVuZDogc3Bhbi5zb3VyY2VTcGFuLmVuZC5vZmZzZXR9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpblNwYW4ocG9zaXRpb246IG51bWJlciwgc3Bhbj86IFNwYW4sIGV4Y2x1c2l2ZT86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgcmV0dXJuIHNwYW4gIT0gbnVsbCAmJlxuICAgICAgKGV4Y2x1c2l2ZSA/IHBvc2l0aW9uID49IHNwYW4uc3RhcnQgJiYgcG9zaXRpb24gPCBzcGFuLmVuZCA6XG4gICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPj0gc3Bhbi5zdGFydCAmJiBwb3NpdGlvbiA8PSBzcGFuLmVuZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXRTcGFuKHNwYW46IFNwYW4sIGFtb3VudDogbnVtYmVyKTogU3BhbiB7XG4gIHJldHVybiB7c3RhcnQ6IHNwYW4uc3RhcnQgKyBhbW91bnQsIGVuZDogc3Bhbi5lbmQgKyBhbW91bnR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOYXJyb3dlcihzcGFuQTogU3Bhbiwgc3BhbkI6IFNwYW4pOiBib29sZWFuIHtcbiAgcmV0dXJuIHNwYW5BLnN0YXJ0ID49IHNwYW5CLnN0YXJ0ICYmIHNwYW5BLmVuZCA8PSBzcGFuQi5lbmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cnVjdHVyYWxEaXJlY3RpdmUodHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSk6IGJvb2xlYW4ge1xuICBmb3IgKGNvbnN0IGRpRGVwIG9mIHR5cGUuZGlEZXBzKSB7XG4gICAgY29uc3QgZGlEZXBOYW1lID0gaWRlbnRpZmllck5hbWUoZGlEZXAudG9rZW4/LmlkZW50aWZpZXIpO1xuICAgIGlmIChkaURlcE5hbWUgPT09IElkZW50aWZpZXJzLlRlbXBsYXRlUmVmLm5hbWUgfHxcbiAgICAgICAgZGlEZXBOYW1lID09PSBJZGVudGlmaWVycy5WaWV3Q29udGFpbmVyUmVmLm5hbWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoaW5mbzogQXN0UmVzdWx0KTogU2VsZWN0b3JJbmZvIHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxDc3NTZWxlY3RvciwgQ29tcGlsZURpcmVjdGl2ZVN1bW1hcnk+KCk7XG4gIGNvbnN0IHJlc3VsdHM6IENzc1NlbGVjdG9yW10gPSBbXTtcbiAgZm9yIChjb25zdCBkaXJlY3RpdmUgb2YgaW5mby5kaXJlY3RpdmVzKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdID0gQ3NzU2VsZWN0b3IucGFyc2UoZGlyZWN0aXZlLnNlbGVjdG9yISk7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIHJlc3VsdHMucHVzaChzZWxlY3Rvcik7XG4gICAgICBtYXAuc2V0KHNlbGVjdG9yLCBkaXJlY3RpdmUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge3NlbGVjdG9yczogcmVzdWx0cywgbWFwfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpYWdub3N0aWNJbmZvRnJvbVRlbXBsYXRlSW5mbyhpbmZvOiBBc3RSZXN1bHQpOiBEaWFnbm9zdGljVGVtcGxhdGVJbmZvIHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlTmFtZTogaW5mby50ZW1wbGF0ZS5maWxlTmFtZSxcbiAgICBvZmZzZXQ6IGluZm8udGVtcGxhdGUuc3Bhbi5zdGFydCxcbiAgICBxdWVyeTogaW5mby50ZW1wbGF0ZS5xdWVyeSxcbiAgICBtZW1iZXJzOiBpbmZvLnRlbXBsYXRlLm1lbWJlcnMsXG4gICAgaHRtbEFzdDogaW5mby5odG1sQXN0LFxuICAgIHRlbXBsYXRlQXN0OiBpbmZvLnRlbXBsYXRlQXN0LFxuICAgIHNvdXJjZTogaW5mby50ZW1wbGF0ZS5zb3VyY2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kVGVtcGxhdGVBc3RBdChhc3Q6IFRlbXBsYXRlQXN0W10sIHBvc2l0aW9uOiBudW1iZXIpOiBUZW1wbGF0ZUFzdFBhdGgge1xuICBjb25zdCBwYXRoOiBUZW1wbGF0ZUFzdFtdID0gW107XG4gIGNvbnN0IHZpc2l0b3IgPSBuZXcgY2xhc3MgZXh0ZW5kcyBSZWN1cnNpdmVUZW1wbGF0ZUFzdFZpc2l0b3Ige1xuICAgIHZpc2l0KGFzdDogVGVtcGxhdGVBc3QpOiBhbnkge1xuICAgICAgbGV0IHNwYW4gPSBzcGFuT2YoYXN0KTtcbiAgICAgIGlmIChpblNwYW4ocG9zaXRpb24sIHNwYW4pKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHBhdGgubGVuZ3RoO1xuICAgICAgICBpZiAoIWxlbiB8fCBpc05hcnJvd2VyKHNwYW4sIHNwYW5PZihwYXRoW2xlbiAtIDFdKSkpIHtcbiAgICAgICAgICBwYXRoLnB1c2goYXN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuaW5nIGEgdmFsdWUgaGVyZSB3aWxsIHJlc3VsdCBpbiB0aGUgY2hpbGRyZW4gYmVpbmcgc2tpcHBlZC5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgICAvLyBJZ25vcmUgcmVmZXJlbmNlLCB2YXJpYWJsZSBhbmQgcHJvdmlkZXJzXG4gICAgICAgIHZpc2l0KGFzdC5hdHRycyk7XG4gICAgICAgIHZpc2l0KGFzdC5kaXJlY3RpdmVzKTtcbiAgICAgICAgdmlzaXQoYXN0LmNoaWxkcmVuKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpc2l0RWxlbWVudChhc3Q6IEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy52aXNpdENoaWxkcmVuKGNvbnRleHQsIHZpc2l0ID0+IHtcbiAgICAgICAgLy8gSW5nbm9yZSBwcm92aWRlcnNcbiAgICAgICAgdmlzaXQoYXN0LmF0dHJzKTtcbiAgICAgICAgdmlzaXQoYXN0LmlucHV0cyk7XG4gICAgICAgIHZpc2l0KGFzdC5vdXRwdXRzKTtcbiAgICAgICAgdmlzaXQoYXN0LnJlZmVyZW5jZXMpO1xuICAgICAgICB2aXNpdChhc3QuZGlyZWN0aXZlcyk7XG4gICAgICAgIHZpc2l0KGFzdC5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIC8vIElnbm9yZSB0aGUgaG9zdCBwcm9wZXJ0aWVzIG9mIGEgZGlyZWN0aXZlXG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgICB2aXNpdChhc3QuaW5wdXRzKTtcbiAgICAgIH0pO1xuICAgICAgLy8gV2UgbmV2ZXIgY2FyZSBhYm91dCB0aGUgZGlyZXRpdmUgaXRzZWxmLCBqdXN0IGl0cyBpbnB1dHMuXG4gICAgICBpZiAocGF0aFtwYXRoLmxlbmd0aCAtIDFdID09PSBhc3QpIHtcbiAgICAgICAgcGF0aC5wb3AoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuXG4gIHRlbXBsYXRlVmlzaXRBbGwodmlzaXRvciwgYXN0KTtcblxuICByZXR1cm4gbmV3IEFzdFBhdGg8VGVtcGxhdGVBc3Q+KHBhdGgsIHBvc2l0aW9uKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG5vZGUgdGhhdCBtb3N0IHRpZ2h0bHkgZW5jb21wYXNzIHRoZSBzcGVjaWZpZWQgYHBvc2l0aW9uYC5cbiAqIEBwYXJhbSBub2RlXG4gKiBAcGFyYW0gcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRUaWdodGVzdE5vZGUobm9kZTogdHMuTm9kZSwgcG9zaXRpb246IG51bWJlcik6IHRzLk5vZGV8dW5kZWZpbmVkIHtcbiAgaWYgKG5vZGUuZ2V0U3RhcnQoKSA8PSBwb3NpdGlvbiAmJiBwb3NpdGlvbiA8IG5vZGUuZ2V0RW5kKCkpIHtcbiAgICByZXR1cm4gbm9kZS5mb3JFYWNoQ2hpbGQoYyA9PiBmaW5kVGlnaHRlc3ROb2RlKGMsIHBvc2l0aW9uKSkgfHwgbm9kZTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlyZWN0aXZlQ2xhc3NMaWtlIHtcbiAgZGVjb3JhdG9ySWQ6IHRzLklkZW50aWZpZXI7ICAvLyBkZWNvcmF0b3IgaWRlbnRpZmllciwgbGlrZSBAQ29tcG9uZW50XG4gIGNsYXNzSWQ6IHRzLklkZW50aWZpZXI7XG59XG5cbi8qKlxuICogUmV0dXJuIG1ldGFkYXRhIGFib3V0IGBub2RlYCBpZiBpdCBsb29rcyBsaWtlIGFuIEFuZ3VsYXIgZGlyZWN0aXZlIGNsYXNzLlxuICogSW4gdGhpcyBjYXNlLCBwb3RlbnRpYWwgbWF0Y2hlcyBhcmUgYEBOZ01vZHVsZWAsIGBAQ29tcG9uZW50YCwgYEBEaXJlY3RpdmVgLFxuICogYEBQaXBlYCwgZXRjLlxuICogVGhlc2UgY2xhc3MgZGVjbGFyYXRpb25zIGFsbCBzaGFyZSBzb21lIGNvbW1vbiBhdHRyaWJ1dGVzLCBuYW1lbHkgdGhlaXJcbiAqIGRlY29yYXRvciB0YWtlcyBleGFjdGx5IG9uZSBwYXJhbWV0ZXIgYW5kIHRoZSBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBvYmplY3RcbiAqIGxpdGVyYWwuXG4gKlxuICogRm9yIGV4YW1wbGUsXG4gKiAgICAgdi0tLS0tLS0tLS0gYGRlY29yYXRvcklkYFxuICogQE5nTW9kdWxlKHsgICAgICAgICAgIDxcbiAqICAgZGVjbGFyYXRpb25zOiBbXSwgICA8IGNsYXNzRGVjbFxuICogfSkgICAgICAgICAgICAgICAgICAgIDxcbiAqIGNsYXNzIEFwcE1vZHVsZSB7fSAgICA8XG4gKiAgICAgICAgICBeLS0tLS0gYGNsYXNzSWRgXG4gKlxuICogQHBhcmFtIG5vZGUgUG90ZW50aWFsIG5vZGUgdGhhdCByZXByZXNlbnRzIGFuIEFuZ3VsYXIgZGlyZWN0aXZlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlyZWN0aXZlQ2xhc3NMaWtlKG5vZGU6IHRzLk5vZGUpOiBEaXJlY3RpdmVDbGFzc0xpa2V8dW5kZWZpbmVkIHtcbiAgaWYgKCF0cy5pc0NsYXNzRGVjbGFyYXRpb24obm9kZSkgfHwgIW5vZGUubmFtZSB8fCAhbm9kZS5kZWNvcmF0b3JzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoY29uc3QgZCBvZiBub2RlLmRlY29yYXRvcnMpIHtcbiAgICBjb25zdCBleHByID0gZC5leHByZXNzaW9uO1xuICAgIGlmICghdHMuaXNDYWxsRXhwcmVzc2lvbihleHByKSB8fCBleHByLmFyZ3VtZW50cy5sZW5ndGggIT09IDEgfHxcbiAgICAgICAgIXRzLmlzSWRlbnRpZmllcihleHByLmV4cHJlc3Npb24pKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgYXJnID0gZXhwci5hcmd1bWVudHNbMF07XG4gICAgaWYgKHRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24oYXJnKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGVjb3JhdG9ySWQ6IGV4cHIuZXhwcmVzc2lvbixcbiAgICAgICAgY2xhc3NJZDogbm9kZS5uYW1lLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBhc3NpZ25tZW50IHRoYXQgaXMgbmVzdGVkIGluIGEgVHlwZVNjcmlwdCBub2RlIGFuZCBpcyBvZiBhIGNlcnRhaW5cbiAqIHR5cGUgVC5cbiAqXG4gKiBAcGFyYW0gc3RhcnROb2RlIG5vZGUgdG8gc3RhcnQgc2VhcmNoaW5nIGZvciBuZXN0ZWQgcHJvcGVydHkgYXNzaWdubWVudCBmcm9tXG4gKiBAcGFyYW0gcHJvcE5hbWUgcHJvcGVydHkgYXNzaWdubWVudCBuYW1lXG4gKiBAcGFyYW0gcHJlZGljYXRlIGZ1bmN0aW9uIHRvIHZlcmlmeSB0aGF0IGEgbm9kZSBpcyBvZiB0eXBlIFQuXG4gKiBAcmV0dXJuIG5vZGUgcHJvcGVydHkgYXNzaWdubWVudCB2YWx1ZSBvZiB0eXBlIFQsIG9yIHVuZGVmaW5lZCBpZiBub25lIGlzIGZvdW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUHJvcGVydHlWYWx1ZU9mVHlwZTxUIGV4dGVuZHMgdHMuTm9kZT4oXG4gICAgc3RhcnROb2RlOiB0cy5Ob2RlLCBwcm9wTmFtZTogc3RyaW5nLCBwcmVkaWNhdGU6IChub2RlOiB0cy5Ob2RlKSA9PiBub2RlIGlzIFQpOiBUfHVuZGVmaW5lZCB7XG4gIGlmICh0cy5pc1Byb3BlcnR5QXNzaWdubWVudChzdGFydE5vZGUpICYmIHN0YXJ0Tm9kZS5uYW1lLmdldFRleHQoKSA9PT0gcHJvcE5hbWUpIHtcbiAgICBjb25zdCB7aW5pdGlhbGl6ZXJ9ID0gc3RhcnROb2RlO1xuICAgIGlmIChwcmVkaWNhdGUoaW5pdGlhbGl6ZXIpKSByZXR1cm4gaW5pdGlhbGl6ZXI7XG4gIH1cbiAgcmV0dXJuIHN0YXJ0Tm9kZS5mb3JFYWNoQ2hpbGQoYyA9PiBmaW5kUHJvcGVydHlWYWx1ZU9mVHlwZShjLCBwcm9wTmFtZSwgcHJlZGljYXRlKSk7XG59XG5cbi8qKlxuICogRmluZCB0aGUgdGlnaHRlc3Qgbm9kZSBhdCB0aGUgc3BlY2lmaWVkIGBwb3NpdGlvbmAgZnJvbSB0aGUgQVNUIGBub2Rlc2AsIGFuZFxuICogcmV0dXJuIHRoZSBwYXRoIHRvIHRoZSBub2RlLlxuICogQHBhcmFtIG5vZGVzIEhUTUwgQVNUIG5vZGVzXG4gKiBAcGFyYW0gcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBhdGhUb05vZGVBdFBvc2l0aW9uKG5vZGVzOiBOb2RlW10sIHBvc2l0aW9uOiBudW1iZXIpOiBIdG1sQXN0UGF0aCB7XG4gIGNvbnN0IHBhdGg6IE5vZGVbXSA9IFtdO1xuICBjb25zdCB2aXNpdG9yID0gbmV3IGNsYXNzIGV4dGVuZHMgUmVjdXJzaXZlVmlzaXRvciB7XG4gICAgdmlzaXQoYXN0OiBOb2RlKSB7XG4gICAgICBjb25zdCBzcGFuID0gc3Bhbk9mKGFzdCk7XG4gICAgICBpZiAoaW5TcGFuKHBvc2l0aW9uLCBzcGFuKSkge1xuICAgICAgICBwYXRoLnB1c2goYXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybmluZyBhIHRydXRoeSB2YWx1ZSBoZXJlIHdpbGwgc2tpcCBhbGwgY2hpbGRyZW4gYW5kIHRlcm1pbmF0ZVxuICAgICAgICAvLyB0aGUgdmlzaXQuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmlzaXRBbGwodmlzaXRvciwgbm9kZXMpO1xuICByZXR1cm4gbmV3IEFzdFBhdGg8Tm9kZT4ocGF0aCwgcG9zaXRpb24pO1xufVxuXG5cbi8qKlxuICogSW52ZXJ0cyBhbiBvYmplY3QncyBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnRNYXAob2JqOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30ge1xuICBjb25zdCByZXN1bHQ6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgIGNvbnN0IHYgPSBvYmpbbmFtZV07XG4gICAgcmVzdWx0W3ZdID0gbmFtZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8qKlxuICogRmluZHMgdGhlIGRpcmVjdGl2ZSBtZW1iZXIgcHJvdmlkaW5nIGEgdGVtcGxhdGUgb3V0cHV0IGJpbmRpbmcsIGlmIG9uZSBleGlzdHMuXG4gKiBAcGFyYW0gaW5mbyBhZ2dyZWdhdGUgdGVtcGxhdGUgQVNUIGluZm9ybWF0aW9uXG4gKiBAcGFyYW0gcGF0aCBuYXJyb3dpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRPdXRwdXRCaW5kaW5nKFxuICAgIGJpbmRpbmc6IEJvdW5kRXZlbnRBc3QsIHBhdGg6IFRlbXBsYXRlQXN0UGF0aCwgcXVlcnk6IFN5bWJvbFF1ZXJ5KTogU3ltYm9sfHVuZGVmaW5lZCB7XG4gIGNvbnN0IGVsZW1lbnQgPSBwYXRoLmZpcnN0KEVsZW1lbnRBc3QpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGZvciAoY29uc3QgZGlyZWN0aXZlIG9mIGVsZW1lbnQuZGlyZWN0aXZlcykge1xuICAgICAgY29uc3QgaW52ZXJ0ZWRPdXRwdXRzID0gaW52ZXJ0TWFwKGRpcmVjdGl2ZS5kaXJlY3RpdmUub3V0cHV0cyk7XG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBpbnZlcnRlZE91dHB1dHNbYmluZGluZy5uYW1lXTtcbiAgICAgIGlmIChmaWVsZE5hbWUpIHtcbiAgICAgICAgY29uc3QgY2xhc3NTeW1ib2wgPSBxdWVyeS5nZXRUeXBlU3ltYm9sKGRpcmVjdGl2ZS5kaXJlY3RpdmUudHlwZS5yZWZlcmVuY2UpO1xuICAgICAgICBpZiAoY2xhc3NTeW1ib2wpIHtcbiAgICAgICAgICByZXR1cm4gY2xhc3NTeW1ib2wubWVtYmVycygpLmdldChmaWVsZE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHByb3BlcnR5IGFzc2lnbm1lbnQgZnJvbSB0aGUgYXNzaWdubWVudCB2YWx1ZSwgb3IgYHVuZGVmaW5lZGAgaWYgdGhlcmUgaXMgbm9cbiAqIGFzc2lnbm1lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eUFzc2lnbm1lbnRGcm9tVmFsdWUodmFsdWU6IHRzLk5vZGUpOiB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnR8dW5kZWZpbmVkIHtcbiAgaWYgKCF2YWx1ZS5wYXJlbnQgfHwgIXRzLmlzUHJvcGVydHlBc3NpZ25tZW50KHZhbHVlLnBhcmVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIHZhbHVlLnBhcmVudDtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIGRlY29yYXRvciBwcm9wZXJ0eSBhc3NpZ25tZW50LCByZXR1cm4gdGhlIENsYXNzRGVjbGFyYXRpb24gbm9kZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZVxuICogZGlyZWN0aXZlIGNsYXNzIHRoZSBwcm9wZXJ0eSBhcHBsaWVzIHRvLlxuICogSWYgdGhlIHByb3BlcnR5IGFzc2lnbm1lbnQgaXMgbm90IG9uIGEgY2xhc3MgZGVjb3JhdG9yLCBubyBkZWNsYXJhdGlvbiBpcyByZXR1cm5lZC5cbiAqXG4gKiBGb3IgZXhhbXBsZSxcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgdGVtcGxhdGU6ICc8ZGl2PjwvZGl2PidcbiAqICAgXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl4tLS0tIHByb3BlcnR5IGFzc2lnbm1lbnRcbiAqIH0pXG4gKiBjbGFzcyBBcHBDb21wb25lbnQge31cbiAqICAgICAgICAgICBeLS0tLSBjbGFzcyBkZWNsYXJhdGlvbiBub2RlXG4gKlxuICogQHBhcmFtIHByb3BBc2duIHByb3BlcnR5IGFzc2lnbm1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzRGVjbEZyb21EZWNvcmF0b3JQcm9wKHByb3BBc2duTm9kZTogdHMuUHJvcGVydHlBc3NpZ25tZW50KTpcbiAgICB0cy5DbGFzc0RlY2xhcmF0aW9ufHVuZGVmaW5lZCB7XG4gIGlmICghcHJvcEFzZ25Ob2RlLnBhcmVudCB8fCAhdHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihwcm9wQXNnbk5vZGUucGFyZW50KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBvYmpMaXRFeHByTm9kZSA9IHByb3BBc2duTm9kZS5wYXJlbnQ7XG4gIGlmICghb2JqTGl0RXhwck5vZGUucGFyZW50IHx8ICF0cy5pc0NhbGxFeHByZXNzaW9uKG9iakxpdEV4cHJOb2RlLnBhcmVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY2FsbEV4cHJOb2RlID0gb2JqTGl0RXhwck5vZGUucGFyZW50O1xuICBpZiAoIWNhbGxFeHByTm9kZS5wYXJlbnQgfHwgIXRzLmlzRGVjb3JhdG9yKGNhbGxFeHByTm9kZS5wYXJlbnQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGRlY29yYXRvciA9IGNhbGxFeHByTm9kZS5wYXJlbnQ7XG4gIGlmICghZGVjb3JhdG9yLnBhcmVudCB8fCAhdHMuaXNDbGFzc0RlY2xhcmF0aW9uKGRlY29yYXRvci5wYXJlbnQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGNsYXNzRGVjbE5vZGUgPSBkZWNvcmF0b3IucGFyZW50O1xuICByZXR1cm4gY2xhc3NEZWNsTm9kZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgcHJvcGVydHkgYXNzaWdubWVudCBpcyBvbiBhIGNsYXNzIGRlY29yYXRvci5cbiAqIFNlZSBgZ2V0Q2xhc3NEZWNsRnJvbURlY29yYXRvclByb3BlcnR5YCwgd2hpY2ggZ2V0cyB0aGUgY2xhc3MgdGhlIGRlY29yYXRvciBpcyBhcHBsaWVkIHRvLCBmb3JcbiAqIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcGFyYW0gcHJvcCBwcm9wZXJ0eSBhc3NpZ25tZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0NsYXNzRGVjb3JhdG9yUHJvcGVydHkocHJvcEFzZ246IHRzLlByb3BlcnR5QXNzaWdubWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gISFnZXRDbGFzc0RlY2xGcm9tRGVjb3JhdG9yUHJvcChwcm9wQXNnbik7XG59XG4iXX0=