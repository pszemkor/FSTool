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
        define("@angular/language-service/src/expression_type", ["require", "exports", "tslib", "@angular/compiler", "@angular/language-service/src/diagnostic_messages", "@angular/language-service/src/symbols"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var diagnostic_messages_1 = require("@angular/language-service/src/diagnostic_messages");
    var symbols_1 = require("@angular/language-service/src/symbols");
    // AstType calculatetype of the ast given AST element.
    var AstType = /** @class */ (function () {
        function AstType(scope, query, context, source) {
            this.scope = scope;
            this.query = query;
            this.context = context;
            this.source = source;
            this.diagnostics = [];
        }
        AstType.prototype.getType = function (ast) {
            return ast.visit(this);
        };
        AstType.prototype.getDiagnostics = function (ast) {
            var type = ast.visit(this);
            if (this.context.inEvent && type.callable) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.callable_expression_expected_method_call));
            }
            return this.diagnostics;
        };
        AstType.prototype.visitBinary = function (ast) {
            var _this_1 = this;
            var getType = function (ast, operation) {
                var type = _this_1.getType(ast);
                if (type.nullable) {
                    switch (operation) {
                        case '&&':
                        case '||':
                        case '==':
                        case '!=':
                        case '===':
                        case '!==':
                            // Nullable allowed.
                            break;
                        default:
                            _this_1.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.expression_might_be_null));
                            break;
                    }
                }
                return type;
            };
            var leftType = getType(ast.left, ast.operation);
            var rightType = getType(ast.right, ast.operation);
            var leftKind = this.query.getTypeKind(leftType);
            var rightKind = this.query.getTypeKind(rightType);
            // The following swtich implements operator typing similar to the
            // type production tables in the TypeScript specification.
            // https://github.com/Microsoft/TypeScript/blob/v1.8.10/doc/spec.md#4.19
            var operKind = leftKind << 8 | rightKind;
            switch (ast.operation) {
                case '*':
                case '/':
                case '%':
                case '-':
                case '<<':
                case '>>':
                case '>>>':
                case '&':
                case '^':
                case '|':
                    switch (operKind) {
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Number:
                            return this.query.getBuiltinType(symbols_1.BuiltinType.Number);
                        default:
                            var errorAst = ast.left;
                            switch (leftKind) {
                                case symbols_1.BuiltinType.Any:
                                case symbols_1.BuiltinType.Number:
                                    errorAst = ast.right;
                                    break;
                            }
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(errorAst.span, diagnostic_messages_1.Diagnostic.expected_a_number_type));
                            return this.anyType;
                    }
                case '+':
                    switch (operKind) {
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Boolean:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.Other:
                        case symbols_1.BuiltinType.Boolean << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.Other << 8 | symbols_1.BuiltinType.Any:
                            return this.anyType;
                        case symbols_1.BuiltinType.Any << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.Boolean << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Any:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Boolean:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.String:
                        case symbols_1.BuiltinType.String << 8 | symbols_1.BuiltinType.Other:
                        case symbols_1.BuiltinType.Other << 8 | symbols_1.BuiltinType.String:
                            return this.query.getBuiltinType(symbols_1.BuiltinType.String);
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Number:
                            return this.query.getBuiltinType(symbols_1.BuiltinType.Number);
                        case symbols_1.BuiltinType.Boolean << 8 | symbols_1.BuiltinType.Number:
                        case symbols_1.BuiltinType.Other << 8 | symbols_1.BuiltinType.Number:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.left.span, diagnostic_messages_1.Diagnostic.expected_a_number_type));
                            return this.anyType;
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Boolean:
                        case symbols_1.BuiltinType.Number << 8 | symbols_1.BuiltinType.Other:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.right.span, diagnostic_messages_1.Diagnostic.expected_a_number_type));
                            return this.anyType;
                        default:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.expected_a_string_or_number_type));
                            return this.anyType;
                    }
                case '>':
                case '<':
                case '<=':
                case '>=':
                case '==':
                case '!=':
                case '===':
                case '!==':
                    if (!(leftKind & rightKind) &&
                        !((leftKind | rightKind) & (symbols_1.BuiltinType.Null | symbols_1.BuiltinType.Undefined))) {
                        // Two values are comparable only if
                        //   - they have some type overlap, or
                        //   - at least one is not defined
                        this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.expected_operands_of_comparable_types_or_any));
                    }
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Boolean);
                case '&&':
                    return rightType;
                case '||':
                    return this.query.getTypeUnion(leftType, rightType);
            }
            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.unrecognized_operator, ast.operation));
            return this.anyType;
        };
        AstType.prototype.visitChain = function (ast) {
            var e_1, _a;
            try {
                // If we are producing diagnostics, visit the children
                for (var _b = tslib_1.__values(ast.expressions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var expr = _c.value;
                    expr.visit(this);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // The type of a chain is always undefined.
            return this.query.getBuiltinType(symbols_1.BuiltinType.Undefined);
        };
        AstType.prototype.visitConditional = function (ast) {
            // The type of a conditional is the union of the true and false conditions.
            ast.condition.visit(this);
            ast.trueExp.visit(this);
            ast.falseExp.visit(this);
            return this.query.getTypeUnion(this.getType(ast.trueExp), this.getType(ast.falseExp));
        };
        AstType.prototype.visitFunctionCall = function (ast) {
            var _this_1 = this;
            // The type of a function call is the return type of the selected signature.
            // The signature is selected based on the types of the arguments. Angular doesn't
            // support contextual typing of arguments so this is simpler than TypeScript's
            // version.
            var args = ast.args.map(function (arg) { return _this_1.getType(arg); });
            var target = this.getType(ast.target);
            if (!target || !target.callable) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.call_target_not_callable, this.sourceOf(ast.target), target.name));
                return this.anyType;
            }
            var signature = target.selectSignature(args);
            if (signature) {
                return signature.result;
            }
            // TODO: Consider a better error message here. See `typescript_symbols#selectSignature` for more
            // details.
            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.unable_to_resolve_compatible_call_signature));
            return this.anyType;
        };
        AstType.prototype.visitImplicitReceiver = function (_ast) {
            var _this = this;
            // Return a pseudo-symbol for the implicit receiver.
            // The members of the implicit receiver are what is defined by the
            // scope passed into this class.
            return {
                name: '$implicit',
                kind: 'component',
                language: 'ng-template',
                type: undefined,
                container: undefined,
                callable: false,
                nullable: false,
                public: true,
                definition: undefined,
                documentation: [],
                members: function () {
                    return _this.scope;
                },
                signatures: function () {
                    return [];
                },
                selectSignature: function (_types) {
                    return undefined;
                },
                indexed: function (_argument) {
                    return undefined;
                },
                typeArguments: function () {
                    return undefined;
                },
            };
        };
        AstType.prototype.visitInterpolation = function (ast) {
            var e_2, _a;
            try {
                // If we are producing diagnostics, visit the children.
                for (var _b = tslib_1.__values(ast.expressions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var expr = _c.value;
                    expr.visit(this);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return this.undefinedType;
        };
        AstType.prototype.visitKeyedRead = function (ast) {
            var targetType = this.getType(ast.obj);
            var keyType = this.getType(ast.key);
            var result = targetType.indexed(keyType, ast.key instanceof compiler_1.LiteralPrimitive ? ast.key.value : undefined);
            return result || this.anyType;
        };
        AstType.prototype.visitKeyedWrite = function (ast) {
            // The write of a type is the type of the value being written.
            return this.getType(ast.value);
        };
        AstType.prototype.visitLiteralArray = function (ast) {
            var _a;
            var _this_1 = this;
            // A type literal is an array type of the union of the elements
            return this.query.getArrayType((_a = this.query).getTypeUnion.apply(_a, tslib_1.__spread(ast.expressions.map(function (element) { return _this_1.getType(element); }))));
        };
        AstType.prototype.visitLiteralMap = function (ast) {
            var e_3, _a;
            try {
                // If we are producing diagnostics, visit the children
                for (var _b = tslib_1.__values(ast.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    value.visit(this);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            // TODO: Return a composite type.
            return this.anyType;
        };
        AstType.prototype.visitLiteralPrimitive = function (ast) {
            // The type of a literal primitive depends on the value of the literal.
            switch (ast.value) {
                case true:
                case false:
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Boolean);
                case null:
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Null);
                case undefined:
                    return this.query.getBuiltinType(symbols_1.BuiltinType.Undefined);
                default:
                    switch (typeof ast.value) {
                        case 'string':
                            return this.query.getBuiltinType(symbols_1.BuiltinType.String);
                        case 'number':
                            return this.query.getBuiltinType(symbols_1.BuiltinType.Number);
                        default:
                            this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.unrecognized_primitive, typeof ast.value));
                            return this.anyType;
                    }
            }
        };
        AstType.prototype.visitMethodCall = function (ast) {
            return this.resolveMethodCall(this.getType(ast.receiver), ast);
        };
        AstType.prototype.visitPipe = function (ast) {
            var _this_1 = this;
            // The type of a pipe node is the return type of the pipe's transform method. The table returned
            // by getPipes() is expected to contain symbols with the corresponding transform method type.
            var pipe = this.query.getPipes().get(ast.name);
            if (!pipe) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.no_pipe_found, ast.name));
                return this.anyType;
            }
            var expType = this.getType(ast.exp);
            var signature = pipe.selectSignature([expType].concat(ast.args.map(function (arg) { return _this_1.getType(arg); })));
            if (!signature) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.unable_to_resolve_signature, ast.name));
                return this.anyType;
            }
            return signature.result;
        };
        AstType.prototype.visitPrefixNot = function (ast) {
            // If we are producing diagnostics, visit the children
            ast.expression.visit(this);
            // The type of a prefix ! is always boolean.
            return this.query.getBuiltinType(symbols_1.BuiltinType.Boolean);
        };
        AstType.prototype.visitNonNullAssert = function (ast) {
            var expressionType = this.getType(ast.expression);
            return this.query.getNonNullableType(expressionType);
        };
        AstType.prototype.visitPropertyRead = function (ast) {
            return this.resolvePropertyRead(this.getType(ast.receiver), ast);
        };
        AstType.prototype.visitPropertyWrite = function (ast) {
            // The type of a write is the type of the value being written.
            return this.getType(ast.value);
        };
        AstType.prototype.visitQuote = function (_ast) {
            // The type of a quoted expression is any.
            return this.query.getBuiltinType(symbols_1.BuiltinType.Any);
        };
        AstType.prototype.visitSafeMethodCall = function (ast) {
            return this.resolveMethodCall(this.query.getNonNullableType(this.getType(ast.receiver)), ast);
        };
        AstType.prototype.visitSafePropertyRead = function (ast) {
            return this.resolvePropertyRead(this.query.getNonNullableType(this.getType(ast.receiver)), ast);
        };
        /**
         * Gets the source of an expession AST.
         * The AST's sourceSpan is relative to the start of the template source code, which is contained
         * at this.source.
         */
        AstType.prototype.sourceOf = function (ast) {
            return this.source.substring(ast.sourceSpan.start, ast.sourceSpan.end);
        };
        Object.defineProperty(AstType.prototype, "anyType", {
            get: function () {
                var result = this._anyType;
                if (!result) {
                    result = this._anyType = this.query.getBuiltinType(symbols_1.BuiltinType.Any);
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AstType.prototype, "undefinedType", {
            get: function () {
                var result = this._undefinedType;
                if (!result) {
                    result = this._undefinedType = this.query.getBuiltinType(symbols_1.BuiltinType.Undefined);
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        AstType.prototype.resolveMethodCall = function (receiverType, ast) {
            var _this_1 = this;
            if (this.isAny(receiverType)) {
                return this.anyType;
            }
            var methodType = this.resolvePropertyRead(receiverType, ast);
            if (!methodType) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.could_not_resolve_type, ast.name));
                return this.anyType;
            }
            if (this.isAny(methodType)) {
                return this.anyType;
            }
            if (!methodType.callable) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.identifier_not_callable, ast.name));
                return this.anyType;
            }
            var signature = methodType.selectSignature(ast.args.map(function (arg) { return _this_1.getType(arg); }));
            if (!signature) {
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.unable_to_resolve_signature, ast.name));
                return this.anyType;
            }
            return signature.result;
        };
        AstType.prototype.resolvePropertyRead = function (receiverType, ast) {
            if (this.isAny(receiverType)) {
                return this.anyType;
            }
            // The type of a property read is the seelcted member's type.
            var member = receiverType.members().get(ast.name);
            if (!member) {
                if (receiverType.name === '$implicit') {
                    this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.identifier_not_defined_in_app_context, ast.name));
                }
                else if (receiverType.nullable && ast.receiver instanceof compiler_1.PropertyRead) {
                    var receiver = ast.receiver.name;
                    this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.identifier_possibly_undefined, receiver, receiver + "?." + ast.name, receiver + "!." + ast.name));
                }
                else {
                    this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.identifier_not_defined_on_receiver, ast.name, receiverType.name));
                }
                return this.anyType;
            }
            if (!member.public) {
                var container = receiverType.name === '$implicit' ? 'the component' : "'" + receiverType.name + "'";
                this.diagnostics.push(diagnostic_messages_1.createDiagnostic(ast.span, diagnostic_messages_1.Diagnostic.identifier_is_private, ast.name, container));
            }
            return member.type;
        };
        AstType.prototype.isAny = function (symbol) {
            return !symbol || this.query.getTypeKind(symbol) === symbols_1.BuiltinType.Any ||
                (!!symbol.type && this.isAny(symbol.type));
        };
        return AstType;
    }());
    exports.AstType = AstType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbl90eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGFuZ3VhZ2Utc2VydmljZS9zcmMvZXhwcmVzc2lvbl90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUVILDhDQUF5VDtJQUV6VCx5RkFBbUU7SUFDbkUsaUVBQW1GO0lBT25GLHNEQUFzRDtJQUN0RDtRQUdFLGlCQUNZLEtBQWtCLEVBQVUsS0FBa0IsRUFDOUMsT0FBcUMsRUFBVSxNQUFjO1lBRDdELFVBQUssR0FBTCxLQUFLLENBQWE7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFhO1lBQzlDLFlBQU8sR0FBUCxPQUFPLENBQThCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUp4RCxnQkFBVyxHQUFvQixFQUFFLENBQUM7UUFJeUIsQ0FBQztRQUU3RSx5QkFBTyxHQUFQLFVBQVEsR0FBUTtZQUNkLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBRUQsZ0NBQWMsR0FBZCxVQUFlLEdBQVE7WUFDckIsSUFBTSxJQUFJLEdBQVcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNqQixzQ0FBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGdDQUFVLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7UUFFRCw2QkFBVyxHQUFYLFVBQVksR0FBVztZQUF2QixtQkEwSEM7WUF6SEMsSUFBTSxPQUFPLEdBQUcsVUFBQyxHQUFRLEVBQUUsU0FBaUI7Z0JBQzFD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QzVDLEtBQUsscUJBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLHFCQUFXLENBQUMsT0FBTyxDQUFDO3dCQUNoRCxLQUFLLHFCQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxxQkFBVyxDQUFDLE1BQU0sQ0FBQzt3QkFDL0MsS0FBSyxxQkFBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcscUJBQVcsQ0FBQyxLQUFLLENBQUM7d0JBQzlDLEtBQUsscUJBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLHFCQUFXLENBQUMsR0FBRyxDQUFDO3dCQUNoRCxLQUFLLHFCQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxxQkFBVyxDQUFDLEdBQUcsQ0FBQzt3QkFDL0MsS0FBSyxxQkFBVyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcscUJBQVcsQ0FBQyxHQUFHOzRCQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ3RCLEtBQUsscUJBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLHFCQUFXLENBQUMsTUFBTSxDQUFDO3dCQUMvQyxLQUFLLHFCQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxxQkFBVyxDQUFDLE1BQU0sQ0FBQzt3QkFDbkQsS0FBSyxxQkFBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcscUJBQVcsQ0FBQyxNQUFNLENBQUM7d0JBQ2xELEtBQUsscUJBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLHFCQUFXLENBQUMsR0FBRyxDQUFDO3dCQUMvQyxLQUFLLHFCQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxxQkFBVyxDQUFDLE9BQU8sQ0FBQzt3QkFDbkQsS0FBSyxxQkFBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcscUJBQVcsQ0FBQyxNQUFNLENBQUM7d0JBQ2xELEtBQUsscUJBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLHFCQUFXLENBQUMsTUFBTSxDQUFDO3dCQUNsRCxLQUFLLHFCQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxx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SUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDSCxjQUFDO0lBQUQsQ0FBQyxBQTFhRCxJQTBhQztJQTFhWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBU1QsIEFzdFZpc2l0b3IsIEJpbmFyeSwgQmluZGluZ1BpcGUsIENoYWluLCBDb25kaXRpb25hbCwgRnVuY3Rpb25DYWxsLCBJbXBsaWNpdFJlY2VpdmVyLCBJbnRlcnBvbGF0aW9uLCBLZXllZFJlYWQsIEtleWVkV3JpdGUsIExpdGVyYWxBcnJheSwgTGl0ZXJhbE1hcCwgTGl0ZXJhbFByaW1pdGl2ZSwgTWV0aG9kQ2FsbCwgTm9uTnVsbEFzc2VydCwgUHJlZml4Tm90LCBQcm9wZXJ0eVJlYWQsIFByb3BlcnR5V3JpdGUsIFF1b3RlLCBTYWZlTWV0aG9kQ2FsbCwgU2FmZVByb3BlcnR5UmVhZH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuXG5pbXBvcnQge2NyZWF0ZURpYWdub3N0aWMsIERpYWdub3N0aWN9IGZyb20gJy4vZGlhZ25vc3RpY19tZXNzYWdlcyc7XG5pbXBvcnQge0J1aWx0aW5UeXBlLCBTaWduYXR1cmUsIFN5bWJvbCwgU3ltYm9sUXVlcnksIFN5bWJvbFRhYmxlfSBmcm9tICcuL3N5bWJvbHMnO1xuaW1wb3J0ICogYXMgbmcgZnJvbSAnLi90eXBlcyc7XG5cbmludGVyZmFjZSBFeHByZXNzaW9uRGlhZ25vc3RpY3NDb250ZXh0IHtcbiAgaW5FdmVudD86IGJvb2xlYW47XG59XG5cbi8vIEFzdFR5cGUgY2FsY3VsYXRldHlwZSBvZiB0aGUgYXN0IGdpdmVuIEFTVCBlbGVtZW50LlxuZXhwb3J0IGNsYXNzIEFzdFR5cGUgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSBkaWFnbm9zdGljczogbmcuRGlhZ25vc3RpY1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHNjb3BlOiBTeW1ib2xUYWJsZSwgcHJpdmF0ZSBxdWVyeTogU3ltYm9sUXVlcnksXG4gICAgICBwcml2YXRlIGNvbnRleHQ6IEV4cHJlc3Npb25EaWFnbm9zdGljc0NvbnRleHQsIHByaXZhdGUgc291cmNlOiBzdHJpbmcpIHt9XG5cbiAgZ2V0VHlwZShhc3Q6IEFTVCk6IFN5bWJvbCB7XG4gICAgcmV0dXJuIGFzdC52aXNpdCh0aGlzKTtcbiAgfVxuXG4gIGdldERpYWdub3N0aWNzKGFzdDogQVNUKTogbmcuRGlhZ25vc3RpY1tdIHtcbiAgICBjb25zdCB0eXBlOiBTeW1ib2wgPSBhc3QudmlzaXQodGhpcyk7XG4gICAgaWYgKHRoaXMuY29udGV4dC5pbkV2ZW50ICYmIHR5cGUuY2FsbGFibGUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKGFzdC5zcGFuLCBEaWFnbm9zdGljLmNhbGxhYmxlX2V4cHJlc3Npb25fZXhwZWN0ZWRfbWV0aG9kX2NhbGwpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlhZ25vc3RpY3M7XG4gIH1cblxuICB2aXNpdEJpbmFyeShhc3Q6IEJpbmFyeSk6IFN5bWJvbCB7XG4gICAgY29uc3QgZ2V0VHlwZSA9IChhc3Q6IEFTVCwgb3BlcmF0aW9uOiBzdHJpbmcpOiBTeW1ib2wgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZ2V0VHlwZShhc3QpO1xuICAgICAgaWYgKHR5cGUubnVsbGFibGUpIHtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcbiAgICAgICAgICBjYXNlICcmJic6XG4gICAgICAgICAgY2FzZSAnfHwnOlxuICAgICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgY2FzZSAnPT09JzpcbiAgICAgICAgICBjYXNlICchPT0nOlxuICAgICAgICAgICAgLy8gTnVsbGFibGUgYWxsb3dlZC5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goY3JlYXRlRGlhZ25vc3RpYyhhc3Quc3BhbiwgRGlhZ25vc3RpYy5leHByZXNzaW9uX21pZ2h0X2JlX251bGwpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGVmdFR5cGUgPSBnZXRUeXBlKGFzdC5sZWZ0LCBhc3Qub3BlcmF0aW9uKTtcbiAgICBjb25zdCByaWdodFR5cGUgPSBnZXRUeXBlKGFzdC5yaWdodCwgYXN0Lm9wZXJhdGlvbik7XG4gICAgY29uc3QgbGVmdEtpbmQgPSB0aGlzLnF1ZXJ5LmdldFR5cGVLaW5kKGxlZnRUeXBlKTtcbiAgICBjb25zdCByaWdodEtpbmQgPSB0aGlzLnF1ZXJ5LmdldFR5cGVLaW5kKHJpZ2h0VHlwZSk7XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIHN3dGljaCBpbXBsZW1lbnRzIG9wZXJhdG9yIHR5cGluZyBzaW1pbGFyIHRvIHRoZVxuICAgIC8vIHR5cGUgcHJvZHVjdGlvbiB0YWJsZXMgaW4gdGhlIFR5cGVTY3JpcHQgc3BlY2lmaWNhdGlvbi5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvYmxvYi92MS44LjEwL2RvYy9zcGVjLm1kIzQuMTlcbiAgICBjb25zdCBvcGVyS2luZCA9IGxlZnRLaW5kIDw8IDggfCByaWdodEtpbmQ7XG4gICAgc3dpdGNoIChhc3Qub3BlcmF0aW9uKSB7XG4gICAgICBjYXNlICcqJzpcbiAgICAgIGNhc2UgJy8nOlxuICAgICAgY2FzZSAnJSc6XG4gICAgICBjYXNlICctJzpcbiAgICAgIGNhc2UgJzw8JzpcbiAgICAgIGNhc2UgJz4+JzpcbiAgICAgIGNhc2UgJz4+Pic6XG4gICAgICBjYXNlICcmJzpcbiAgICAgIGNhc2UgJ14nOlxuICAgICAgY2FzZSAnfCc6XG4gICAgICAgIHN3aXRjaCAob3BlcktpbmQpIHtcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLkFueSA8PCA4IHwgQnVpbHRpblR5cGUuQW55OlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuTnVtYmVyIDw8IDggfCBCdWlsdGluVHlwZS5Bbnk6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5BbnkgPDwgOCB8IEJ1aWx0aW5UeXBlLk51bWJlcjpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLk51bWJlciA8PCA4IHwgQnVpbHRpblR5cGUuTnVtYmVyOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuTnVtYmVyKTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbGV0IGVycm9yQXN0ID0gYXN0LmxlZnQ7XG4gICAgICAgICAgICBzd2l0Y2ggKGxlZnRLaW5kKSB7XG4gICAgICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQW55OlxuICAgICAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLk51bWJlcjpcbiAgICAgICAgICAgICAgICBlcnJvckFzdCA9IGFzdC5yaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKGVycm9yQXN0LnNwYW4sIERpYWdub3N0aWMuZXhwZWN0ZWRfYV9udW1iZXJfdHlwZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICAgICAgfVxuICAgICAgY2FzZSAnKyc6XG4gICAgICAgIHN3aXRjaCAob3BlcktpbmQpIHtcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLkFueSA8PCA4IHwgQnVpbHRpblR5cGUuQW55OlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQW55IDw8IDggfCBCdWlsdGluVHlwZS5Cb29sZWFuOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQW55IDw8IDggfCBCdWlsdGluVHlwZS5OdW1iZXI6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5BbnkgPDwgOCB8IEJ1aWx0aW5UeXBlLk90aGVyOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQm9vbGVhbiA8PCA4IHwgQnVpbHRpblR5cGUuQW55OlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuTnVtYmVyIDw8IDggfCBCdWlsdGluVHlwZS5Bbnk6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5PdGhlciA8PCA4IHwgQnVpbHRpblR5cGUuQW55OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLkFueSA8PCA4IHwgQnVpbHRpblR5cGUuU3RyaW5nOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuQm9vbGVhbiA8PCA4IHwgQnVpbHRpblR5cGUuU3RyaW5nOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuTnVtYmVyIDw8IDggfCBCdWlsdGluVHlwZS5TdHJpbmc6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5TdHJpbmcgPDwgOCB8IEJ1aWx0aW5UeXBlLkFueTpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLlN0cmluZyA8PCA4IHwgQnVpbHRpblR5cGUuQm9vbGVhbjpcbiAgICAgICAgICBjYXNlIEJ1aWx0aW5UeXBlLlN0cmluZyA8PCA4IHwgQnVpbHRpblR5cGUuTnVtYmVyOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuU3RyaW5nIDw8IDggfCBCdWlsdGluVHlwZS5TdHJpbmc6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5TdHJpbmcgPDwgOCB8IEJ1aWx0aW5UeXBlLk90aGVyOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuT3RoZXIgPDwgOCB8IEJ1aWx0aW5UeXBlLlN0cmluZzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLlN0cmluZyk7XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5OdW1iZXIgPDwgOCB8IEJ1aWx0aW5UeXBlLk51bWJlcjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLk51bWJlcik7XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5Cb29sZWFuIDw8IDggfCBCdWlsdGluVHlwZS5OdW1iZXI6XG4gICAgICAgICAgY2FzZSBCdWlsdGluVHlwZS5PdGhlciA8PCA4IHwgQnVpbHRpblR5cGUuTnVtYmVyOlxuICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICAgICAgICAgIGNyZWF0ZURpYWdub3N0aWMoYXN0LmxlZnQuc3BhbiwgRGlhZ25vc3RpYy5leHBlY3RlZF9hX251bWJlcl90eXBlKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuTnVtYmVyIDw8IDggfCBCdWlsdGluVHlwZS5Cb29sZWFuOlxuICAgICAgICAgIGNhc2UgQnVpbHRpblR5cGUuTnVtYmVyIDw8IDggfCBCdWlsdGluVHlwZS5PdGhlcjpcbiAgICAgICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKGFzdC5yaWdodC5zcGFuLCBEaWFnbm9zdGljLmV4cGVjdGVkX2FfbnVtYmVyX3R5cGUpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKGFzdC5zcGFuLCBEaWFnbm9zdGljLmV4cGVjdGVkX2Ffc3RyaW5nX29yX251bWJlcl90eXBlKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgICAgICB9XG4gICAgICBjYXNlICc+JzpcbiAgICAgIGNhc2UgJzwnOlxuICAgICAgY2FzZSAnPD0nOlxuICAgICAgY2FzZSAnPj0nOlxuICAgICAgY2FzZSAnPT0nOlxuICAgICAgY2FzZSAnIT0nOlxuICAgICAgY2FzZSAnPT09JzpcbiAgICAgIGNhc2UgJyE9PSc6XG4gICAgICAgIGlmICghKGxlZnRLaW5kICYgcmlnaHRLaW5kKSAmJlxuICAgICAgICAgICAgISgobGVmdEtpbmQgfCByaWdodEtpbmQpICYgKEJ1aWx0aW5UeXBlLk51bGwgfCBCdWlsdGluVHlwZS5VbmRlZmluZWQpKSkge1xuICAgICAgICAgIC8vIFR3byB2YWx1ZXMgYXJlIGNvbXBhcmFibGUgb25seSBpZlxuICAgICAgICAgIC8vICAgLSB0aGV5IGhhdmUgc29tZSB0eXBlIG92ZXJsYXAsIG9yXG4gICAgICAgICAgLy8gICAtIGF0IGxlYXN0IG9uZSBpcyBub3QgZGVmaW5lZFxuICAgICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhhc3Quc3BhbiwgRGlhZ25vc3RpYy5leHBlY3RlZF9vcGVyYW5kc19vZl9jb21wYXJhYmxlX3R5cGVzX29yX2FueSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLkJvb2xlYW4pO1xuICAgICAgY2FzZSAnJiYnOlxuICAgICAgICByZXR1cm4gcmlnaHRUeXBlO1xuICAgICAgY2FzZSAnfHwnOlxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRUeXBlVW5pb24obGVmdFR5cGUsIHJpZ2h0VHlwZSk7XG4gICAgfVxuXG4gICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICBjcmVhdGVEaWFnbm9zdGljKGFzdC5zcGFuLCBEaWFnbm9zdGljLnVucmVjb2duaXplZF9vcGVyYXRvciwgYXN0Lm9wZXJhdGlvbikpO1xuICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gIH1cblxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4pIHtcbiAgICAvLyBJZiB3ZSBhcmUgcHJvZHVjaW5nIGRpYWdub3N0aWNzLCB2aXNpdCB0aGUgY2hpbGRyZW5cbiAgICBmb3IgKGNvbnN0IGV4cHIgb2YgYXN0LmV4cHJlc3Npb25zKSB7XG4gICAgICBleHByLnZpc2l0KHRoaXMpO1xuICAgIH1cbiAgICAvLyBUaGUgdHlwZSBvZiBhIGNoYWluIGlzIGFsd2F5cyB1bmRlZmluZWQuXG4gICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuVW5kZWZpbmVkKTtcbiAgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCkge1xuICAgIC8vIFRoZSB0eXBlIG9mIGEgY29uZGl0aW9uYWwgaXMgdGhlIHVuaW9uIG9mIHRoZSB0cnVlIGFuZCBmYWxzZSBjb25kaXRpb25zLlxuICAgIGFzdC5jb25kaXRpb24udmlzaXQodGhpcyk7XG4gICAgYXN0LnRydWVFeHAudmlzaXQodGhpcyk7XG4gICAgYXN0LmZhbHNlRXhwLnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldFR5cGVVbmlvbih0aGlzLmdldFR5cGUoYXN0LnRydWVFeHApLCB0aGlzLmdldFR5cGUoYXN0LmZhbHNlRXhwKSk7XG4gIH1cblxuICB2aXNpdEZ1bmN0aW9uQ2FsbChhc3Q6IEZ1bmN0aW9uQ2FsbCkge1xuICAgIC8vIFRoZSB0eXBlIG9mIGEgZnVuY3Rpb24gY2FsbCBpcyB0aGUgcmV0dXJuIHR5cGUgb2YgdGhlIHNlbGVjdGVkIHNpZ25hdHVyZS5cbiAgICAvLyBUaGUgc2lnbmF0dXJlIGlzIHNlbGVjdGVkIGJhc2VkIG9uIHRoZSB0eXBlcyBvZiB0aGUgYXJndW1lbnRzLiBBbmd1bGFyIGRvZXNuJ3RcbiAgICAvLyBzdXBwb3J0IGNvbnRleHR1YWwgdHlwaW5nIG9mIGFyZ3VtZW50cyBzbyB0aGlzIGlzIHNpbXBsZXIgdGhhbiBUeXBlU2NyaXB0J3NcbiAgICAvLyB2ZXJzaW9uLlxuICAgIGNvbnN0IGFyZ3MgPSBhc3QuYXJncy5tYXAoYXJnID0+IHRoaXMuZ2V0VHlwZShhcmcpKTtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldFR5cGUoYXN0LnRhcmdldCEpO1xuICAgIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuY2FsbGFibGUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChjcmVhdGVEaWFnbm9zdGljKFxuICAgICAgICAgIGFzdC5zcGFuLCBEaWFnbm9zdGljLmNhbGxfdGFyZ2V0X25vdF9jYWxsYWJsZSwgdGhpcy5zb3VyY2VPZihhc3QudGFyZ2V0ISksIHRhcmdldC5uYW1lKSk7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBjb25zdCBzaWduYXR1cmUgPSB0YXJnZXQuc2VsZWN0U2lnbmF0dXJlKGFyZ3MpO1xuICAgIGlmIChzaWduYXR1cmUpIHtcbiAgICAgIHJldHVybiBzaWduYXR1cmUucmVzdWx0O1xuICAgIH1cbiAgICAvLyBUT0RPOiBDb25zaWRlciBhIGJldHRlciBlcnJvciBtZXNzYWdlIGhlcmUuIFNlZSBgdHlwZXNjcmlwdF9zeW1ib2xzI3NlbGVjdFNpZ25hdHVyZWAgZm9yIG1vcmVcbiAgICAvLyBkZXRhaWxzLlxuICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhhc3Quc3BhbiwgRGlhZ25vc3RpYy51bmFibGVfdG9fcmVzb2x2ZV9jb21wYXRpYmxlX2NhbGxfc2lnbmF0dXJlKSk7XG4gICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgfVxuXG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihfYXN0OiBJbXBsaWNpdFJlY2VpdmVyKTogU3ltYm9sIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgLy8gUmV0dXJuIGEgcHNldWRvLXN5bWJvbCBmb3IgdGhlIGltcGxpY2l0IHJlY2VpdmVyLlxuICAgIC8vIFRoZSBtZW1iZXJzIG9mIHRoZSBpbXBsaWNpdCByZWNlaXZlciBhcmUgd2hhdCBpcyBkZWZpbmVkIGJ5IHRoZVxuICAgIC8vIHNjb3BlIHBhc3NlZCBpbnRvIHRoaXMgY2xhc3MuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICckaW1wbGljaXQnLFxuICAgICAga2luZDogJ2NvbXBvbmVudCcsXG4gICAgICBsYW5ndWFnZTogJ25nLXRlbXBsYXRlJyxcbiAgICAgIHR5cGU6IHVuZGVmaW5lZCxcbiAgICAgIGNvbnRhaW5lcjogdW5kZWZpbmVkLFxuICAgICAgY2FsbGFibGU6IGZhbHNlLFxuICAgICAgbnVsbGFibGU6IGZhbHNlLFxuICAgICAgcHVibGljOiB0cnVlLFxuICAgICAgZGVmaW5pdGlvbjogdW5kZWZpbmVkLFxuICAgICAgZG9jdW1lbnRhdGlvbjogW10sXG4gICAgICBtZW1iZXJzKCk6IFN5bWJvbFRhYmxlIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnNjb3BlO1xuICAgICAgfSxcbiAgICAgIHNpZ25hdHVyZXMoKTogU2lnbmF0dXJlW10ge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9LFxuICAgICAgc2VsZWN0U2lnbmF0dXJlKF90eXBlcyk6IFNpZ25hdHVyZSB8XG4gICAgICAgICAgdW5kZWZpbmVkIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSxcbiAgICAgIGluZGV4ZWQoX2FyZ3VtZW50KTogU3ltYm9sIHxcbiAgICAgICAgICB1bmRlZmluZWQge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgICAgdHlwZUFyZ3VtZW50cygpOiBTeW1ib2xbXSB8XG4gICAgICAgICAgdW5kZWZpbmVkIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbik6IFN5bWJvbCB7XG4gICAgLy8gSWYgd2UgYXJlIHByb2R1Y2luZyBkaWFnbm9zdGljcywgdmlzaXQgdGhlIGNoaWxkcmVuLlxuICAgIGZvciAoY29uc3QgZXhwciBvZiBhc3QuZXhwcmVzc2lvbnMpIHtcbiAgICAgIGV4cHIudmlzaXQodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnVuZGVmaW5lZFR5cGU7XG4gIH1cblxuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCk6IFN5bWJvbCB7XG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IHRoaXMuZ2V0VHlwZShhc3Qub2JqKTtcbiAgICBjb25zdCBrZXlUeXBlID0gdGhpcy5nZXRUeXBlKGFzdC5rZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRhcmdldFR5cGUuaW5kZXhlZChcbiAgICAgICAga2V5VHlwZSwgYXN0LmtleSBpbnN0YW5jZW9mIExpdGVyYWxQcmltaXRpdmUgPyBhc3Qua2V5LnZhbHVlIDogdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gcmVzdWx0IHx8IHRoaXMuYW55VHlwZTtcbiAgfVxuXG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUpOiBTeW1ib2wge1xuICAgIC8vIFRoZSB3cml0ZSBvZiBhIHR5cGUgaXMgdGhlIHR5cGUgb2YgdGhlIHZhbHVlIGJlaW5nIHdyaXR0ZW4uXG4gICAgcmV0dXJuIHRoaXMuZ2V0VHlwZShhc3QudmFsdWUpO1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXkpOiBTeW1ib2wge1xuICAgIC8vIEEgdHlwZSBsaXRlcmFsIGlzIGFuIGFycmF5IHR5cGUgb2YgdGhlIHVuaW9uIG9mIHRoZSBlbGVtZW50c1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEFycmF5VHlwZShcbiAgICAgICAgdGhpcy5xdWVyeS5nZXRUeXBlVW5pb24oLi4uYXN0LmV4cHJlc3Npb25zLm1hcChlbGVtZW50ID0+IHRoaXMuZ2V0VHlwZShlbGVtZW50KSkpKTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IExpdGVyYWxNYXApOiBTeW1ib2wge1xuICAgIC8vIElmIHdlIGFyZSBwcm9kdWNpbmcgZGlhZ25vc3RpY3MsIHZpc2l0IHRoZSBjaGlsZHJlblxuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgYXN0LnZhbHVlcykge1xuICAgICAgdmFsdWUudmlzaXQodGhpcyk7XG4gICAgfVxuICAgIC8vIFRPRE86IFJldHVybiBhIGNvbXBvc2l0ZSB0eXBlLlxuICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gIH1cblxuICB2aXNpdExpdGVyYWxQcmltaXRpdmUoYXN0OiBMaXRlcmFsUHJpbWl0aXZlKSB7XG4gICAgLy8gVGhlIHR5cGUgb2YgYSBsaXRlcmFsIHByaW1pdGl2ZSBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiB0aGUgbGl0ZXJhbC5cbiAgICBzd2l0Y2ggKGFzdC52YWx1ZSkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuQm9vbGVhbik7XG4gICAgICBjYXNlIG51bGw6XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLk51bGwpO1xuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LmdldEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlLlVuZGVmaW5lZCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBhc3QudmFsdWUpIHtcbiAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuU3RyaW5nKTtcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0QnVpbHRpblR5cGUoQnVpbHRpblR5cGUuTnVtYmVyKTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICAgICAgICAgIGNyZWF0ZURpYWdub3N0aWMoYXN0LnNwYW4sIERpYWdub3N0aWMudW5yZWNvZ25pemVkX3ByaW1pdGl2ZSwgdHlwZW9mIGFzdC52YWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwpIHtcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlTWV0aG9kQ2FsbCh0aGlzLmdldFR5cGUoYXN0LnJlY2VpdmVyKSwgYXN0KTtcbiAgfVxuXG4gIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlKSB7XG4gICAgLy8gVGhlIHR5cGUgb2YgYSBwaXBlIG5vZGUgaXMgdGhlIHJldHVybiB0eXBlIG9mIHRoZSBwaXBlJ3MgdHJhbnNmb3JtIG1ldGhvZC4gVGhlIHRhYmxlIHJldHVybmVkXG4gICAgLy8gYnkgZ2V0UGlwZXMoKSBpcyBleHBlY3RlZCB0byBjb250YWluIHN5bWJvbHMgd2l0aCB0aGUgY29ycmVzcG9uZGluZyB0cmFuc2Zvcm0gbWV0aG9kIHR5cGUuXG4gICAgY29uc3QgcGlwZSA9IHRoaXMucXVlcnkuZ2V0UGlwZXMoKS5nZXQoYXN0Lm5hbWUpO1xuICAgIGlmICghcGlwZSkge1xuICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKGNyZWF0ZURpYWdub3N0aWMoYXN0LnNwYW4sIERpYWdub3N0aWMubm9fcGlwZV9mb3VuZCwgYXN0Lm5hbWUpKTtcbiAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgfVxuICAgIGNvbnN0IGV4cFR5cGUgPSB0aGlzLmdldFR5cGUoYXN0LmV4cCk7XG4gICAgY29uc3Qgc2lnbmF0dXJlID1cbiAgICAgICAgcGlwZS5zZWxlY3RTaWduYXR1cmUoW2V4cFR5cGVdLmNvbmNhdChhc3QuYXJncy5tYXAoYXJnID0+IHRoaXMuZ2V0VHlwZShhcmcpKSkpO1xuICAgIGlmICghc2lnbmF0dXJlKSB7XG4gICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhhc3Quc3BhbiwgRGlhZ25vc3RpYy51bmFibGVfdG9fcmVzb2x2ZV9zaWduYXR1cmUsIGFzdC5uYW1lKSk7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gc2lnbmF0dXJlLnJlc3VsdDtcbiAgfVxuXG4gIHZpc2l0UHJlZml4Tm90KGFzdDogUHJlZml4Tm90KSB7XG4gICAgLy8gSWYgd2UgYXJlIHByb2R1Y2luZyBkaWFnbm9zdGljcywgdmlzaXQgdGhlIGNoaWxkcmVuXG4gICAgYXN0LmV4cHJlc3Npb24udmlzaXQodGhpcyk7XG4gICAgLy8gVGhlIHR5cGUgb2YgYSBwcmVmaXggISBpcyBhbHdheXMgYm9vbGVhbi5cbiAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5Cb29sZWFuKTtcbiAgfVxuXG4gIHZpc2l0Tm9uTnVsbEFzc2VydChhc3Q6IE5vbk51bGxBc3NlcnQpIHtcbiAgICBjb25zdCBleHByZXNzaW9uVHlwZSA9IHRoaXMuZ2V0VHlwZShhc3QuZXhwcmVzc2lvbik7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkuZ2V0Tm9uTnVsbGFibGVUeXBlKGV4cHJlc3Npb25UeXBlKTtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogUHJvcGVydHlSZWFkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZVByb3BlcnR5UmVhZCh0aGlzLmdldFR5cGUoYXN0LnJlY2VpdmVyKSwgYXN0KTtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlXcml0ZShhc3Q6IFByb3BlcnR5V3JpdGUpIHtcbiAgICAvLyBUaGUgdHlwZSBvZiBhIHdyaXRlIGlzIHRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBiZWluZyB3cml0dGVuLlxuICAgIHJldHVybiB0aGlzLmdldFR5cGUoYXN0LnZhbHVlKTtcbiAgfVxuXG4gIHZpc2l0UXVvdGUoX2FzdDogUXVvdGUpIHtcbiAgICAvLyBUaGUgdHlwZSBvZiBhIHF1b3RlZCBleHByZXNzaW9uIGlzIGFueS5cbiAgICByZXR1cm4gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5BbnkpO1xuICB9XG5cbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZU1ldGhvZENhbGwodGhpcy5xdWVyeS5nZXROb25OdWxsYWJsZVR5cGUodGhpcy5nZXRUeXBlKGFzdC5yZWNlaXZlcikpLCBhc3QpO1xuICB9XG5cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCkge1xuICAgIHJldHVybiB0aGlzLnJlc29sdmVQcm9wZXJ0eVJlYWQodGhpcy5xdWVyeS5nZXROb25OdWxsYWJsZVR5cGUodGhpcy5nZXRUeXBlKGFzdC5yZWNlaXZlcikpLCBhc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNvdXJjZSBvZiBhbiBleHBlc3Npb24gQVNULlxuICAgKiBUaGUgQVNUJ3Mgc291cmNlU3BhbiBpcyByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHRlbXBsYXRlIHNvdXJjZSBjb2RlLCB3aGljaCBpcyBjb250YWluZWRcbiAgICogYXQgdGhpcy5zb3VyY2UuXG4gICAqL1xuICBwcml2YXRlIHNvdXJjZU9mKGFzdDogQVNUKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic3RyaW5nKGFzdC5zb3VyY2VTcGFuLnN0YXJ0LCBhc3Quc291cmNlU3Bhbi5lbmQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW55VHlwZTogU3ltYm9sfHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBnZXQgYW55VHlwZSgpOiBTeW1ib2wge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLl9hbnlUeXBlO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9hbnlUeXBlID0gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5BbnkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdW5kZWZpbmVkVHlwZTogU3ltYm9sfHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBnZXQgdW5kZWZpbmVkVHlwZSgpOiBTeW1ib2wge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLl91bmRlZmluZWRUeXBlO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl91bmRlZmluZWRUeXBlID0gdGhpcy5xdWVyeS5nZXRCdWlsdGluVHlwZShCdWlsdGluVHlwZS5VbmRlZmluZWQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlTWV0aG9kQ2FsbChyZWNlaXZlclR5cGU6IFN5bWJvbCwgYXN0OiBTYWZlTWV0aG9kQ2FsbHxNZXRob2RDYWxsKSB7XG4gICAgaWYgKHRoaXMuaXNBbnkocmVjZWl2ZXJUeXBlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kVHlwZSA9IHRoaXMucmVzb2x2ZVByb3BlcnR5UmVhZChyZWNlaXZlclR5cGUsIGFzdCk7XG4gICAgaWYgKCFtZXRob2RUeXBlKSB7XG4gICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRGlhZ25vc3RpYyhhc3Quc3BhbiwgRGlhZ25vc3RpYy5jb3VsZF9ub3RfcmVzb2x2ZV90eXBlLCBhc3QubmFtZSkpO1xuICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNBbnkobWV0aG9kVHlwZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgfVxuICAgIGlmICghbWV0aG9kVHlwZS5jYWxsYWJsZSkge1xuICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZURpYWdub3N0aWMoYXN0LnNwYW4sIERpYWdub3N0aWMuaWRlbnRpZmllcl9ub3RfY2FsbGFibGUsIGFzdC5uYW1lKSk7XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBjb25zdCBzaWduYXR1cmUgPSBtZXRob2RUeXBlLnNlbGVjdFNpZ25hdHVyZShhc3QuYXJncy5tYXAoYXJnID0+IHRoaXMuZ2V0VHlwZShhcmcpKSk7XG4gICAgaWYgKCFzaWduYXR1cmUpIHtcbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKGFzdC5zcGFuLCBEaWFnbm9zdGljLnVuYWJsZV90b19yZXNvbHZlX3NpZ25hdHVyZSwgYXN0Lm5hbWUpKTtcbiAgICAgIHJldHVybiB0aGlzLmFueVR5cGU7XG4gICAgfVxuICAgIHJldHVybiBzaWduYXR1cmUucmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlUHJvcGVydHlSZWFkKHJlY2VpdmVyVHlwZTogU3ltYm9sLCBhc3Q6IFNhZmVQcm9wZXJ0eVJlYWR8UHJvcGVydHlSZWFkKSB7XG4gICAgaWYgKHRoaXMuaXNBbnkocmVjZWl2ZXJUeXBlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYW55VHlwZTtcbiAgICB9XG4gICAgLy8gVGhlIHR5cGUgb2YgYSBwcm9wZXJ0eSByZWFkIGlzIHRoZSBzZWVsY3RlZCBtZW1iZXIncyB0eXBlLlxuICAgIGNvbnN0IG1lbWJlciA9IHJlY2VpdmVyVHlwZS5tZW1iZXJzKCkuZ2V0KGFzdC5uYW1lKTtcbiAgICBpZiAoIW1lbWJlcikge1xuICAgICAgaWYgKHJlY2VpdmVyVHlwZS5uYW1lID09PSAnJGltcGxpY2l0Jykge1xuICAgICAgICB0aGlzLmRpYWdub3N0aWNzLnB1c2goXG4gICAgICAgICAgICBjcmVhdGVEaWFnbm9zdGljKGFzdC5zcGFuLCBEaWFnbm9zdGljLmlkZW50aWZpZXJfbm90X2RlZmluZWRfaW5fYXBwX2NvbnRleHQsIGFzdC5uYW1lKSk7XG4gICAgICB9IGVsc2UgaWYgKHJlY2VpdmVyVHlwZS5udWxsYWJsZSAmJiBhc3QucmVjZWl2ZXIgaW5zdGFuY2VvZiBQcm9wZXJ0eVJlYWQpIHtcbiAgICAgICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIubmFtZTtcbiAgICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKGNyZWF0ZURpYWdub3N0aWMoXG4gICAgICAgICAgICBhc3Quc3BhbiwgRGlhZ25vc3RpYy5pZGVudGlmaWVyX3Bvc3NpYmx5X3VuZGVmaW5lZCwgcmVjZWl2ZXIsXG4gICAgICAgICAgICBgJHtyZWNlaXZlcn0/LiR7YXN0Lm5hbWV9YCwgYCR7cmVjZWl2ZXJ9IS4ke2FzdC5uYW1lfWApKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlhZ25vc3RpY3MucHVzaChjcmVhdGVEaWFnbm9zdGljKFxuICAgICAgICAgICAgYXN0LnNwYW4sIERpYWdub3N0aWMuaWRlbnRpZmllcl9ub3RfZGVmaW5lZF9vbl9yZWNlaXZlciwgYXN0Lm5hbWUsIHJlY2VpdmVyVHlwZS5uYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hbnlUeXBlO1xuICAgIH1cbiAgICBpZiAoIW1lbWJlci5wdWJsaWMpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9XG4gICAgICAgICAgcmVjZWl2ZXJUeXBlLm5hbWUgPT09ICckaW1wbGljaXQnID8gJ3RoZSBjb21wb25lbnQnIDogYCcke3JlY2VpdmVyVHlwZS5uYW1lfSdgO1xuICAgICAgdGhpcy5kaWFnbm9zdGljcy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZURpYWdub3N0aWMoYXN0LnNwYW4sIERpYWdub3N0aWMuaWRlbnRpZmllcl9pc19wcml2YXRlLCBhc3QubmFtZSwgY29udGFpbmVyKSk7XG4gICAgfVxuICAgIHJldHVybiBtZW1iZXIudHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBbnkoc3ltYm9sOiBTeW1ib2wpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXN5bWJvbCB8fCB0aGlzLnF1ZXJ5LmdldFR5cGVLaW5kKHN5bWJvbCkgPT09IEJ1aWx0aW5UeXBlLkFueSB8fFxuICAgICAgICAoISFzeW1ib2wudHlwZSAmJiB0aGlzLmlzQW55KHN5bWJvbC50eXBlKSk7XG4gIH1cbn1cbiJdfQ==