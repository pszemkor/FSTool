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
        define("@angular/compiler/src/expression_parser/ast", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ParserError = /** @class */ (function () {
        function ParserError(message, input, errLocation, ctxLocation) {
            this.input = input;
            this.errLocation = errLocation;
            this.ctxLocation = ctxLocation;
            this.message = "Parser Error: " + message + " " + errLocation + " [" + input + "] in " + ctxLocation;
        }
        return ParserError;
    }());
    exports.ParserError = ParserError;
    var ParseSpan = /** @class */ (function () {
        function ParseSpan(start, end) {
            this.start = start;
            this.end = end;
        }
        ParseSpan.prototype.toAbsolute = function (absoluteOffset) {
            return new AbsoluteSourceSpan(absoluteOffset + this.start, absoluteOffset + this.end);
        };
        return ParseSpan;
    }());
    exports.ParseSpan = ParseSpan;
    var AST = /** @class */ (function () {
        function AST(span, 
        /**
         * Absolute location of the expression AST in a source code file.
         */
        sourceSpan) {
            this.span = span;
            this.sourceSpan = sourceSpan;
        }
        AST.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return null;
        };
        AST.prototype.toString = function () {
            return 'AST';
        };
        return AST;
    }());
    exports.AST = AST;
    /**
     * Represents a quoted expression of the form:
     *
     * quote = prefix `:` uninterpretedExpression
     * prefix = identifier
     * uninterpretedExpression = arbitrary string
     *
     * A quoted expression is meant to be pre-processed by an AST transformer that
     * converts it into another AST that no longer contains quoted expressions.
     * It is meant to allow third-party developers to extend Angular template
     * expression language. The `uninterpretedExpression` part of the quote is
     * therefore not interpreted by the Angular's own expression parser.
     */
    var Quote = /** @class */ (function (_super) {
        tslib_1.__extends(Quote, _super);
        function Quote(span, sourceSpan, prefix, uninterpretedExpression, location) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.prefix = prefix;
            _this.uninterpretedExpression = uninterpretedExpression;
            _this.location = location;
            return _this;
        }
        Quote.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitQuote(this, context);
        };
        Quote.prototype.toString = function () {
            return 'Quote';
        };
        return Quote;
    }(AST));
    exports.Quote = Quote;
    var EmptyExpr = /** @class */ (function (_super) {
        tslib_1.__extends(EmptyExpr, _super);
        function EmptyExpr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EmptyExpr.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            // do nothing
        };
        return EmptyExpr;
    }(AST));
    exports.EmptyExpr = EmptyExpr;
    var ImplicitReceiver = /** @class */ (function (_super) {
        tslib_1.__extends(ImplicitReceiver, _super);
        function ImplicitReceiver() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplicitReceiver.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitImplicitReceiver(this, context);
        };
        return ImplicitReceiver;
    }(AST));
    exports.ImplicitReceiver = ImplicitReceiver;
    /**
     * Multiple expressions separated by a semicolon.
     */
    var Chain = /** @class */ (function (_super) {
        tslib_1.__extends(Chain, _super);
        function Chain(span, sourceSpan, expressions) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.expressions = expressions;
            return _this;
        }
        Chain.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitChain(this, context);
        };
        return Chain;
    }(AST));
    exports.Chain = Chain;
    var Conditional = /** @class */ (function (_super) {
        tslib_1.__extends(Conditional, _super);
        function Conditional(span, sourceSpan, condition, trueExp, falseExp) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.condition = condition;
            _this.trueExp = trueExp;
            _this.falseExp = falseExp;
            return _this;
        }
        Conditional.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitConditional(this, context);
        };
        return Conditional;
    }(AST));
    exports.Conditional = Conditional;
    var PropertyRead = /** @class */ (function (_super) {
        tslib_1.__extends(PropertyRead, _super);
        function PropertyRead(span, sourceSpan, receiver, name) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.receiver = receiver;
            _this.name = name;
            return _this;
        }
        PropertyRead.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitPropertyRead(this, context);
        };
        return PropertyRead;
    }(AST));
    exports.PropertyRead = PropertyRead;
    var PropertyWrite = /** @class */ (function (_super) {
        tslib_1.__extends(PropertyWrite, _super);
        function PropertyWrite(span, sourceSpan, receiver, name, value) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.receiver = receiver;
            _this.name = name;
            _this.value = value;
            return _this;
        }
        PropertyWrite.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitPropertyWrite(this, context);
        };
        return PropertyWrite;
    }(AST));
    exports.PropertyWrite = PropertyWrite;
    var SafePropertyRead = /** @class */ (function (_super) {
        tslib_1.__extends(SafePropertyRead, _super);
        function SafePropertyRead(span, sourceSpan, receiver, name) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.receiver = receiver;
            _this.name = name;
            return _this;
        }
        SafePropertyRead.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitSafePropertyRead(this, context);
        };
        return SafePropertyRead;
    }(AST));
    exports.SafePropertyRead = SafePropertyRead;
    var KeyedRead = /** @class */ (function (_super) {
        tslib_1.__extends(KeyedRead, _super);
        function KeyedRead(span, sourceSpan, obj, key) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.obj = obj;
            _this.key = key;
            return _this;
        }
        KeyedRead.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitKeyedRead(this, context);
        };
        return KeyedRead;
    }(AST));
    exports.KeyedRead = KeyedRead;
    var KeyedWrite = /** @class */ (function (_super) {
        tslib_1.__extends(KeyedWrite, _super);
        function KeyedWrite(span, sourceSpan, obj, key, value) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.obj = obj;
            _this.key = key;
            _this.value = value;
            return _this;
        }
        KeyedWrite.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitKeyedWrite(this, context);
        };
        return KeyedWrite;
    }(AST));
    exports.KeyedWrite = KeyedWrite;
    var BindingPipe = /** @class */ (function (_super) {
        tslib_1.__extends(BindingPipe, _super);
        function BindingPipe(span, sourceSpan, exp, name, args, nameSpan) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.exp = exp;
            _this.name = name;
            _this.args = args;
            _this.nameSpan = nameSpan;
            return _this;
        }
        BindingPipe.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitPipe(this, context);
        };
        return BindingPipe;
    }(AST));
    exports.BindingPipe = BindingPipe;
    var LiteralPrimitive = /** @class */ (function (_super) {
        tslib_1.__extends(LiteralPrimitive, _super);
        function LiteralPrimitive(span, sourceSpan, value) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.value = value;
            return _this;
        }
        LiteralPrimitive.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitLiteralPrimitive(this, context);
        };
        return LiteralPrimitive;
    }(AST));
    exports.LiteralPrimitive = LiteralPrimitive;
    var LiteralArray = /** @class */ (function (_super) {
        tslib_1.__extends(LiteralArray, _super);
        function LiteralArray(span, sourceSpan, expressions) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.expressions = expressions;
            return _this;
        }
        LiteralArray.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitLiteralArray(this, context);
        };
        return LiteralArray;
    }(AST));
    exports.LiteralArray = LiteralArray;
    var LiteralMap = /** @class */ (function (_super) {
        tslib_1.__extends(LiteralMap, _super);
        function LiteralMap(span, sourceSpan, keys, values) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.keys = keys;
            _this.values = values;
            return _this;
        }
        LiteralMap.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitLiteralMap(this, context);
        };
        return LiteralMap;
    }(AST));
    exports.LiteralMap = LiteralMap;
    var Interpolation = /** @class */ (function (_super) {
        tslib_1.__extends(Interpolation, _super);
        function Interpolation(span, sourceSpan, strings, expressions) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.strings = strings;
            _this.expressions = expressions;
            return _this;
        }
        Interpolation.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitInterpolation(this, context);
        };
        return Interpolation;
    }(AST));
    exports.Interpolation = Interpolation;
    var Binary = /** @class */ (function (_super) {
        tslib_1.__extends(Binary, _super);
        function Binary(span, sourceSpan, operation, left, right) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.operation = operation;
            _this.left = left;
            _this.right = right;
            return _this;
        }
        Binary.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitBinary(this, context);
        };
        return Binary;
    }(AST));
    exports.Binary = Binary;
    var PrefixNot = /** @class */ (function (_super) {
        tslib_1.__extends(PrefixNot, _super);
        function PrefixNot(span, sourceSpan, expression) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.expression = expression;
            return _this;
        }
        PrefixNot.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitPrefixNot(this, context);
        };
        return PrefixNot;
    }(AST));
    exports.PrefixNot = PrefixNot;
    var NonNullAssert = /** @class */ (function (_super) {
        tslib_1.__extends(NonNullAssert, _super);
        function NonNullAssert(span, sourceSpan, expression) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.expression = expression;
            return _this;
        }
        NonNullAssert.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitNonNullAssert(this, context);
        };
        return NonNullAssert;
    }(AST));
    exports.NonNullAssert = NonNullAssert;
    var MethodCall = /** @class */ (function (_super) {
        tslib_1.__extends(MethodCall, _super);
        function MethodCall(span, sourceSpan, receiver, name, args) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.receiver = receiver;
            _this.name = name;
            _this.args = args;
            return _this;
        }
        MethodCall.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitMethodCall(this, context);
        };
        return MethodCall;
    }(AST));
    exports.MethodCall = MethodCall;
    var SafeMethodCall = /** @class */ (function (_super) {
        tslib_1.__extends(SafeMethodCall, _super);
        function SafeMethodCall(span, sourceSpan, receiver, name, args) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.receiver = receiver;
            _this.name = name;
            _this.args = args;
            return _this;
        }
        SafeMethodCall.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitSafeMethodCall(this, context);
        };
        return SafeMethodCall;
    }(AST));
    exports.SafeMethodCall = SafeMethodCall;
    var FunctionCall = /** @class */ (function (_super) {
        tslib_1.__extends(FunctionCall, _super);
        function FunctionCall(span, sourceSpan, target, args) {
            var _this = _super.call(this, span, sourceSpan) || this;
            _this.target = target;
            _this.args = args;
            return _this;
        }
        FunctionCall.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            return visitor.visitFunctionCall(this, context);
        };
        return FunctionCall;
    }(AST));
    exports.FunctionCall = FunctionCall;
    /**
     * Records the absolute position of a text span in a source file, where `start` and `end` are the
     * starting and ending byte offsets, respectively, of the text span in a source file.
     */
    var AbsoluteSourceSpan = /** @class */ (function () {
        function AbsoluteSourceSpan(start, end) {
            this.start = start;
            this.end = end;
        }
        return AbsoluteSourceSpan;
    }());
    exports.AbsoluteSourceSpan = AbsoluteSourceSpan;
    var ASTWithSource = /** @class */ (function (_super) {
        tslib_1.__extends(ASTWithSource, _super);
        function ASTWithSource(ast, source, location, absoluteOffset, errors) {
            var _this = _super.call(this, new ParseSpan(0, source === null ? 0 : source.length), new AbsoluteSourceSpan(absoluteOffset, source === null ? absoluteOffset : absoluteOffset + source.length)) || this;
            _this.ast = ast;
            _this.source = source;
            _this.location = location;
            _this.errors = errors;
            return _this;
        }
        ASTWithSource.prototype.visit = function (visitor, context) {
            if (context === void 0) { context = null; }
            if (visitor.visitASTWithSource) {
                return visitor.visitASTWithSource(this, context);
            }
            return this.ast.visit(visitor, context);
        };
        ASTWithSource.prototype.toString = function () {
            return this.source + " in " + this.location;
        };
        return ASTWithSource;
    }(AST));
    exports.ASTWithSource = ASTWithSource;
    var VariableBinding = /** @class */ (function () {
        /**
         * @param sourceSpan entire span of the binding.
         * @param key name of the LHS along with its span.
         * @param value optional value for the RHS along with its span.
         */
        function VariableBinding(sourceSpan, key, value) {
            this.sourceSpan = sourceSpan;
            this.key = key;
            this.value = value;
        }
        return VariableBinding;
    }());
    exports.VariableBinding = VariableBinding;
    var ExpressionBinding = /** @class */ (function () {
        /**
         * @param sourceSpan entire span of the binding.
         * @param key binding name, like ngForOf, ngForTrackBy, ngIf, along with its
         * span. Note that the length of the span may not be the same as
         * `key.source.length`. For example,
         * 1. key.source = ngFor, key.span is for "ngFor"
         * 2. key.source = ngForOf, key.span is for "of"
         * 3. key.source = ngForTrackBy, key.span is for "trackBy"
         * @param value optional expression for the RHS.
         */
        function ExpressionBinding(sourceSpan, key, value) {
            this.sourceSpan = sourceSpan;
            this.key = key;
            this.value = value;
        }
        return ExpressionBinding;
    }());
    exports.ExpressionBinding = ExpressionBinding;
    var RecursiveAstVisitor = /** @class */ (function () {
        function RecursiveAstVisitor() {
        }
        RecursiveAstVisitor.prototype.visit = function (ast, context) {
            // The default implementation just visits every node.
            // Classes that extend RecursiveAstVisitor should override this function
            // to selectively visit the specified node.
            ast.visit(this, context);
        };
        RecursiveAstVisitor.prototype.visitBinary = function (ast, context) {
            this.visit(ast.left, context);
            this.visit(ast.right, context);
        };
        RecursiveAstVisitor.prototype.visitChain = function (ast, context) {
            this.visitAll(ast.expressions, context);
        };
        RecursiveAstVisitor.prototype.visitConditional = function (ast, context) {
            this.visit(ast.condition, context);
            this.visit(ast.trueExp, context);
            this.visit(ast.falseExp, context);
        };
        RecursiveAstVisitor.prototype.visitPipe = function (ast, context) {
            this.visit(ast.exp, context);
            this.visitAll(ast.args, context);
        };
        RecursiveAstVisitor.prototype.visitFunctionCall = function (ast, context) {
            if (ast.target) {
                this.visit(ast.target, context);
            }
            this.visitAll(ast.args, context);
        };
        RecursiveAstVisitor.prototype.visitImplicitReceiver = function (ast, context) { };
        RecursiveAstVisitor.prototype.visitInterpolation = function (ast, context) {
            this.visitAll(ast.expressions, context);
        };
        RecursiveAstVisitor.prototype.visitKeyedRead = function (ast, context) {
            this.visit(ast.obj, context);
            this.visit(ast.key, context);
        };
        RecursiveAstVisitor.prototype.visitKeyedWrite = function (ast, context) {
            this.visit(ast.obj, context);
            this.visit(ast.key, context);
            this.visit(ast.value, context);
        };
        RecursiveAstVisitor.prototype.visitLiteralArray = function (ast, context) {
            this.visitAll(ast.expressions, context);
        };
        RecursiveAstVisitor.prototype.visitLiteralMap = function (ast, context) {
            this.visitAll(ast.values, context);
        };
        RecursiveAstVisitor.prototype.visitLiteralPrimitive = function (ast, context) { };
        RecursiveAstVisitor.prototype.visitMethodCall = function (ast, context) {
            this.visit(ast.receiver, context);
            this.visitAll(ast.args, context);
        };
        RecursiveAstVisitor.prototype.visitPrefixNot = function (ast, context) {
            this.visit(ast.expression, context);
        };
        RecursiveAstVisitor.prototype.visitNonNullAssert = function (ast, context) {
            this.visit(ast.expression, context);
        };
        RecursiveAstVisitor.prototype.visitPropertyRead = function (ast, context) {
            this.visit(ast.receiver, context);
        };
        RecursiveAstVisitor.prototype.visitPropertyWrite = function (ast, context) {
            this.visit(ast.receiver, context);
            this.visit(ast.value, context);
        };
        RecursiveAstVisitor.prototype.visitSafePropertyRead = function (ast, context) {
            this.visit(ast.receiver, context);
        };
        RecursiveAstVisitor.prototype.visitSafeMethodCall = function (ast, context) {
            this.visit(ast.receiver, context);
            this.visitAll(ast.args, context);
        };
        RecursiveAstVisitor.prototype.visitQuote = function (ast, context) { };
        // This is not part of the AstVisitor interface, just a helper method
        RecursiveAstVisitor.prototype.visitAll = function (asts, context) {
            var e_1, _a;
            try {
                for (var asts_1 = tslib_1.__values(asts), asts_1_1 = asts_1.next(); !asts_1_1.done; asts_1_1 = asts_1.next()) {
                    var ast = asts_1_1.value;
                    this.visit(ast, context);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (asts_1_1 && !asts_1_1.done && (_a = asts_1.return)) _a.call(asts_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        return RecursiveAstVisitor;
    }());
    exports.RecursiveAstVisitor = RecursiveAstVisitor;
    var AstTransformer = /** @class */ (function () {
        function AstTransformer() {
        }
        AstTransformer.prototype.visitImplicitReceiver = function (ast, context) {
            return ast;
        };
        AstTransformer.prototype.visitInterpolation = function (ast, context) {
            return new Interpolation(ast.span, ast.sourceSpan, ast.strings, this.visitAll(ast.expressions));
        };
        AstTransformer.prototype.visitLiteralPrimitive = function (ast, context) {
            return new LiteralPrimitive(ast.span, ast.sourceSpan, ast.value);
        };
        AstTransformer.prototype.visitPropertyRead = function (ast, context) {
            return new PropertyRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name);
        };
        AstTransformer.prototype.visitPropertyWrite = function (ast, context) {
            return new PropertyWrite(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name, ast.value.visit(this));
        };
        AstTransformer.prototype.visitSafePropertyRead = function (ast, context) {
            return new SafePropertyRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name);
        };
        AstTransformer.prototype.visitMethodCall = function (ast, context) {
            return new MethodCall(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
        };
        AstTransformer.prototype.visitSafeMethodCall = function (ast, context) {
            return new SafeMethodCall(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
        };
        AstTransformer.prototype.visitFunctionCall = function (ast, context) {
            return new FunctionCall(ast.span, ast.sourceSpan, ast.target.visit(this), this.visitAll(ast.args));
        };
        AstTransformer.prototype.visitLiteralArray = function (ast, context) {
            return new LiteralArray(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
        };
        AstTransformer.prototype.visitLiteralMap = function (ast, context) {
            return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, this.visitAll(ast.values));
        };
        AstTransformer.prototype.visitBinary = function (ast, context) {
            return new Binary(ast.span, ast.sourceSpan, ast.operation, ast.left.visit(this), ast.right.visit(this));
        };
        AstTransformer.prototype.visitPrefixNot = function (ast, context) {
            return new PrefixNot(ast.span, ast.sourceSpan, ast.expression.visit(this));
        };
        AstTransformer.prototype.visitNonNullAssert = function (ast, context) {
            return new NonNullAssert(ast.span, ast.sourceSpan, ast.expression.visit(this));
        };
        AstTransformer.prototype.visitConditional = function (ast, context) {
            return new Conditional(ast.span, ast.sourceSpan, ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
        };
        AstTransformer.prototype.visitPipe = function (ast, context) {
            return new BindingPipe(ast.span, ast.sourceSpan, ast.exp.visit(this), ast.name, this.visitAll(ast.args), ast.nameSpan);
        };
        AstTransformer.prototype.visitKeyedRead = function (ast, context) {
            return new KeyedRead(ast.span, ast.sourceSpan, ast.obj.visit(this), ast.key.visit(this));
        };
        AstTransformer.prototype.visitKeyedWrite = function (ast, context) {
            return new KeyedWrite(ast.span, ast.sourceSpan, ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
        };
        AstTransformer.prototype.visitAll = function (asts) {
            var res = [];
            for (var i = 0; i < asts.length; ++i) {
                res[i] = asts[i].visit(this);
            }
            return res;
        };
        AstTransformer.prototype.visitChain = function (ast, context) {
            return new Chain(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
        };
        AstTransformer.prototype.visitQuote = function (ast, context) {
            return new Quote(ast.span, ast.sourceSpan, ast.prefix, ast.uninterpretedExpression, ast.location);
        };
        return AstTransformer;
    }());
    exports.AstTransformer = AstTransformer;
    // A transformer that only creates new nodes if the transformer makes a change or
    // a change is made a child node.
    var AstMemoryEfficientTransformer = /** @class */ (function () {
        function AstMemoryEfficientTransformer() {
        }
        AstMemoryEfficientTransformer.prototype.visitImplicitReceiver = function (ast, context) {
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitInterpolation = function (ast, context) {
            var expressions = this.visitAll(ast.expressions);
            if (expressions !== ast.expressions)
                return new Interpolation(ast.span, ast.sourceSpan, ast.strings, expressions);
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitLiteralPrimitive = function (ast, context) {
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitPropertyRead = function (ast, context) {
            var receiver = ast.receiver.visit(this);
            if (receiver !== ast.receiver) {
                return new PropertyRead(ast.span, ast.sourceSpan, receiver, ast.name);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitPropertyWrite = function (ast, context) {
            var receiver = ast.receiver.visit(this);
            var value = ast.value.visit(this);
            if (receiver !== ast.receiver || value !== ast.value) {
                return new PropertyWrite(ast.span, ast.sourceSpan, receiver, ast.name, value);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitSafePropertyRead = function (ast, context) {
            var receiver = ast.receiver.visit(this);
            if (receiver !== ast.receiver) {
                return new SafePropertyRead(ast.span, ast.sourceSpan, receiver, ast.name);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitMethodCall = function (ast, context) {
            var receiver = ast.receiver.visit(this);
            var args = this.visitAll(ast.args);
            if (receiver !== ast.receiver || args !== ast.args) {
                return new MethodCall(ast.span, ast.sourceSpan, receiver, ast.name, args);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitSafeMethodCall = function (ast, context) {
            var receiver = ast.receiver.visit(this);
            var args = this.visitAll(ast.args);
            if (receiver !== ast.receiver || args !== ast.args) {
                return new SafeMethodCall(ast.span, ast.sourceSpan, receiver, ast.name, args);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitFunctionCall = function (ast, context) {
            var target = ast.target && ast.target.visit(this);
            var args = this.visitAll(ast.args);
            if (target !== ast.target || args !== ast.args) {
                return new FunctionCall(ast.span, ast.sourceSpan, target, args);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitLiteralArray = function (ast, context) {
            var expressions = this.visitAll(ast.expressions);
            if (expressions !== ast.expressions) {
                return new LiteralArray(ast.span, ast.sourceSpan, expressions);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitLiteralMap = function (ast, context) {
            var values = this.visitAll(ast.values);
            if (values !== ast.values) {
                return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, values);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitBinary = function (ast, context) {
            var left = ast.left.visit(this);
            var right = ast.right.visit(this);
            if (left !== ast.left || right !== ast.right) {
                return new Binary(ast.span, ast.sourceSpan, ast.operation, left, right);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitPrefixNot = function (ast, context) {
            var expression = ast.expression.visit(this);
            if (expression !== ast.expression) {
                return new PrefixNot(ast.span, ast.sourceSpan, expression);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitNonNullAssert = function (ast, context) {
            var expression = ast.expression.visit(this);
            if (expression !== ast.expression) {
                return new NonNullAssert(ast.span, ast.sourceSpan, expression);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitConditional = function (ast, context) {
            var condition = ast.condition.visit(this);
            var trueExp = ast.trueExp.visit(this);
            var falseExp = ast.falseExp.visit(this);
            if (condition !== ast.condition || trueExp !== ast.trueExp || falseExp !== ast.falseExp) {
                return new Conditional(ast.span, ast.sourceSpan, condition, trueExp, falseExp);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitPipe = function (ast, context) {
            var exp = ast.exp.visit(this);
            var args = this.visitAll(ast.args);
            if (exp !== ast.exp || args !== ast.args) {
                return new BindingPipe(ast.span, ast.sourceSpan, exp, ast.name, args, ast.nameSpan);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitKeyedRead = function (ast, context) {
            var obj = ast.obj.visit(this);
            var key = ast.key.visit(this);
            if (obj !== ast.obj || key !== ast.key) {
                return new KeyedRead(ast.span, ast.sourceSpan, obj, key);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitKeyedWrite = function (ast, context) {
            var obj = ast.obj.visit(this);
            var key = ast.key.visit(this);
            var value = ast.value.visit(this);
            if (obj !== ast.obj || key !== ast.key || value !== ast.value) {
                return new KeyedWrite(ast.span, ast.sourceSpan, obj, key, value);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitAll = function (asts) {
            var res = [];
            var modified = false;
            for (var i = 0; i < asts.length; ++i) {
                var original = asts[i];
                var value = original.visit(this);
                res[i] = value;
                modified = modified || value !== original;
            }
            return modified ? res : asts;
        };
        AstMemoryEfficientTransformer.prototype.visitChain = function (ast, context) {
            var expressions = this.visitAll(ast.expressions);
            if (expressions !== ast.expressions) {
                return new Chain(ast.span, ast.sourceSpan, expressions);
            }
            return ast;
        };
        AstMemoryEfficientTransformer.prototype.visitQuote = function (ast, context) {
            return ast;
        };
        return AstMemoryEfficientTransformer;
    }());
    exports.AstMemoryEfficientTransformer = AstMemoryEfficientTransformer;
    // Bindings
    var ParsedProperty = /** @class */ (function () {
        function ParsedProperty(name, expression, type, sourceSpan, valueSpan) {
            this.name = name;
            this.expression = expression;
            this.type = type;
            this.sourceSpan = sourceSpan;
            this.valueSpan = valueSpan;
            this.isLiteral = this.type === ParsedPropertyType.LITERAL_ATTR;
            this.isAnimation = this.type === ParsedPropertyType.ANIMATION;
        }
        return ParsedProperty;
    }());
    exports.ParsedProperty = ParsedProperty;
    var ParsedPropertyType;
    (function (ParsedPropertyType) {
        ParsedPropertyType[ParsedPropertyType["DEFAULT"] = 0] = "DEFAULT";
        ParsedPropertyType[ParsedPropertyType["LITERAL_ATTR"] = 1] = "LITERAL_ATTR";
        ParsedPropertyType[ParsedPropertyType["ANIMATION"] = 2] = "ANIMATION";
    })(ParsedPropertyType = exports.ParsedPropertyType || (exports.ParsedPropertyType = {}));
    var ParsedEvent = /** @class */ (function () {
        // Regular events have a target
        // Animation events have a phase
        function ParsedEvent(name, targetOrPhase, type, handler, sourceSpan, handlerSpan) {
            this.name = name;
            this.targetOrPhase = targetOrPhase;
            this.type = type;
            this.handler = handler;
            this.sourceSpan = sourceSpan;
            this.handlerSpan = handlerSpan;
        }
        return ParsedEvent;
    }());
    exports.ParsedEvent = ParsedEvent;
    /**
     * ParsedVariable represents a variable declaration in a microsyntax expression.
     */
    var ParsedVariable = /** @class */ (function () {
        function ParsedVariable(name, value, sourceSpan, keySpan, valueSpan) {
            this.name = name;
            this.value = value;
            this.sourceSpan = sourceSpan;
            this.keySpan = keySpan;
            this.valueSpan = valueSpan;
        }
        return ParsedVariable;
    }());
    exports.ParsedVariable = ParsedVariable;
    var BoundElementProperty = /** @class */ (function () {
        function BoundElementProperty(name, type, securityContext, value, unit, sourceSpan, valueSpan) {
            this.name = name;
            this.type = type;
            this.securityContext = securityContext;
            this.value = value;
            this.unit = unit;
            this.sourceSpan = sourceSpan;
            this.valueSpan = valueSpan;
        }
        return BoundElementProperty;
    }());
    exports.BoundElementProperty = BoundElementProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2V4cHJlc3Npb25fcGFyc2VyL2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFLSDtRQUVFLHFCQUNJLE9BQWUsRUFBUyxLQUFhLEVBQVMsV0FBbUIsRUFBUyxXQUFpQjtZQUFuRSxVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBTTtZQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFpQixPQUFPLFNBQUksV0FBVyxVQUFLLEtBQUssYUFBUSxXQUFhLENBQUM7UUFDeEYsQ0FBQztRQUNILGtCQUFDO0lBQUQsQ0FBQyxBQU5ELElBTUM7SUFOWSxrQ0FBVztJQVF4QjtRQUNFLG1CQUFtQixLQUFhLEVBQVMsR0FBVztZQUFqQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUFHLENBQUM7UUFDeEQsOEJBQVUsR0FBVixVQUFXLGNBQXNCO1lBQy9CLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7UUFDSCxnQkFBQztJQUFELENBQUMsQUFMRCxJQUtDO0lBTFksOEJBQVM7SUFPdEI7UUFDRSxhQUNXLElBQWU7UUFDdEI7O1dBRUc7UUFDSSxVQUE4QjtZQUo5QixTQUFJLEdBQUosSUFBSSxDQUFXO1lBSWYsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7UUFBRyxDQUFDO1FBQzdDLG1CQUFLLEdBQUwsVUFBTSxPQUFtQixFQUFFLE9BQW1CO1lBQW5CLHdCQUFBLEVBQUEsY0FBbUI7WUFDNUMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFD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b29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTZWN1cml0eUNvbnRleHR9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgUGFyc2VyRXJyb3Ige1xuICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIG1lc3NhZ2U6IHN0cmluZywgcHVibGljIGlucHV0OiBzdHJpbmcsIHB1YmxpYyBlcnJMb2NhdGlvbjogc3RyaW5nLCBwdWJsaWMgY3R4TG9jYXRpb24/OiBhbnkpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBgUGFyc2VyIEVycm9yOiAke21lc3NhZ2V9ICR7ZXJyTG9jYXRpb259IFske2lucHV0fV0gaW4gJHtjdHhMb2NhdGlvbn1gO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZVNwYW4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhcnQ6IG51bWJlciwgcHVibGljIGVuZDogbnVtYmVyKSB7fVxuICB0b0Fic29sdXRlKGFic29sdXRlT2Zmc2V0OiBudW1iZXIpOiBBYnNvbHV0ZVNvdXJjZVNwYW4ge1xuICAgIHJldHVybiBuZXcgQWJzb2x1dGVTb3VyY2VTcGFuKGFic29sdXRlT2Zmc2V0ICsgdGhpcy5zdGFydCwgYWJzb2x1dGVPZmZzZXQgKyB0aGlzLmVuZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHNwYW46IFBhcnNlU3BhbixcbiAgICAgIC8qKlxuICAgICAgICogQWJzb2x1dGUgbG9jYXRpb24gb2YgdGhlIGV4cHJlc3Npb24gQVNUIGluIGEgc291cmNlIGNvZGUgZmlsZS5cbiAgICAgICAqL1xuICAgICAgcHVibGljIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0FTVCc7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcXVvdGVkIGV4cHJlc3Npb24gb2YgdGhlIGZvcm06XG4gKlxuICogcXVvdGUgPSBwcmVmaXggYDpgIHVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uXG4gKiBwcmVmaXggPSBpZGVudGlmaWVyXG4gKiB1bmludGVycHJldGVkRXhwcmVzc2lvbiA9IGFyYml0cmFyeSBzdHJpbmdcbiAqXG4gKiBBIHF1b3RlZCBleHByZXNzaW9uIGlzIG1lYW50IHRvIGJlIHByZS1wcm9jZXNzZWQgYnkgYW4gQVNUIHRyYW5zZm9ybWVyIHRoYXRcbiAqIGNvbnZlcnRzIGl0IGludG8gYW5vdGhlciBBU1QgdGhhdCBubyBsb25nZXIgY29udGFpbnMgcXVvdGVkIGV4cHJlc3Npb25zLlxuICogSXQgaXMgbWVhbnQgdG8gYWxsb3cgdGhpcmQtcGFydHkgZGV2ZWxvcGVycyB0byBleHRlbmQgQW5ndWxhciB0ZW1wbGF0ZVxuICogZXhwcmVzc2lvbiBsYW5ndWFnZS4gVGhlIGB1bmludGVycHJldGVkRXhwcmVzc2lvbmAgcGFydCBvZiB0aGUgcXVvdGUgaXNcbiAqIHRoZXJlZm9yZSBub3QgaW50ZXJwcmV0ZWQgYnkgdGhlIEFuZ3VsYXIncyBvd24gZXhwcmVzc2lvbiBwYXJzZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdW90ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBwcmVmaXg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyB1bmludGVycHJldGVkRXhwcmVzc2lvbjogc3RyaW5nLCBwdWJsaWMgbG9jYXRpb246IGFueSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0UXVvdGUodGhpcywgY29udGV4dCk7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1F1b3RlJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlFeHByIGV4dGVuZHMgQVNUIHtcbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW1wbGljaXRSZWNlaXZlciBleHRlbmRzIEFTVCB7XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0SW1wbGljaXRSZWNlaXZlcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIE11bHRpcGxlIGV4cHJlc3Npb25zIHNlcGFyYXRlZCBieSBhIHNlbWljb2xvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENoYWluIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHByZXNzaW9uczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENoYWluKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBjb25kaXRpb246IEFTVCwgcHVibGljIHRydWVFeHA6IEFTVCxcbiAgICAgIHB1YmxpYyBmYWxzZUV4cDogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDb25kaXRpb25hbCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlSZWFkIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByb3BlcnR5UmVhZCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXcml0ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHZhbHVlOiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByb3BlcnR5V3JpdGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVQcm9wZXJ0eVJlYWQgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgcmVjZWl2ZXI6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0U2FmZVByb3BlcnR5UmVhZCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgS2V5ZWRSZWFkIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBvYmo6IEFTVCwgcHVibGljIGtleTogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRLZXllZFJlYWQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEtleWVkV3JpdGUgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgb2JqOiBBU1QsIHB1YmxpYyBrZXk6IEFTVCxcbiAgICAgIHB1YmxpYyB2YWx1ZTogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRLZXllZFdyaXRlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nUGlwZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHA6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBhcmdzOiBhbnlbXSwgcHVibGljIG5hbWVTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFBpcGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpdGVyYWxQcmltaXRpdmUgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHZhbHVlOiBhbnkpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdExpdGVyYWxQcmltaXRpdmUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpdGVyYWxBcnJheSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgZXhwcmVzc2lvbnM6IGFueVtdKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRMaXRlcmFsQXJyYXkodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgTGl0ZXJhbE1hcEtleSA9IHtcbiAga2V5OiBzdHJpbmc7IHF1b3RlZDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsTWFwIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIGtleXM6IExpdGVyYWxNYXBLZXlbXSxcbiAgICAgIHB1YmxpYyB2YWx1ZXM6IGFueVtdKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRMaXRlcmFsTWFwKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcnBvbGF0aW9uIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHN0cmluZ3M6IGFueVtdLFxuICAgICAgcHVibGljIGV4cHJlc3Npb25zOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0SW50ZXJwb2xhdGlvbih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmluYXJ5IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIG9wZXJhdGlvbjogc3RyaW5nLCBwdWJsaWMgbGVmdDogQVNULFxuICAgICAgcHVibGljIHJpZ2h0OiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEJpbmFyeSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlZml4Tm90IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHByZXNzaW9uOiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByZWZpeE5vdCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9uTnVsbEFzc2VydCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgZXhwcmVzc2lvbjogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXROb25OdWxsQXNzZXJ0KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXRob2RDYWxsIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgYXJnczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdE1ldGhvZENhbGwodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVNZXRob2RDYWxsIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgYXJnczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFNhZmVNZXRob2RDYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbkNhbGwgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgdGFyZ2V0OiBBU1R8bnVsbCxcbiAgICAgIHB1YmxpYyBhcmdzOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RnVuY3Rpb25DYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogUmVjb3JkcyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgYSB0ZXh0IHNwYW4gaW4gYSBzb3VyY2UgZmlsZSwgd2hlcmUgYHN0YXJ0YCBhbmQgYGVuZGAgYXJlIHRoZVxuICogc3RhcnRpbmcgYW5kIGVuZGluZyBieXRlIG9mZnNldHMsIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRleHQgc3BhbiBpbiBhIHNvdXJjZSBmaWxlLlxuICovXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVTb3VyY2VTcGFuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHN0YXJ0OiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBlbmQ6IG51bWJlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEFTVFdpdGhTb3VyY2UgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBhc3Q6IEFTVCwgcHVibGljIHNvdXJjZTogc3RyaW5nfG51bGwsIHB1YmxpYyBsb2NhdGlvbjogc3RyaW5nLCBhYnNvbHV0ZU9mZnNldDogbnVtYmVyLFxuICAgICAgcHVibGljIGVycm9yczogUGFyc2VyRXJyb3JbXSkge1xuICAgIHN1cGVyKFxuICAgICAgICBuZXcgUGFyc2VTcGFuKDAsIHNvdXJjZSA9PT0gbnVsbCA/IDAgOiBzb3VyY2UubGVuZ3RoKSxcbiAgICAgICAgbmV3IEFic29sdXRlU291cmNlU3BhbihcbiAgICAgICAgICAgIGFic29sdXRlT2Zmc2V0LCBzb3VyY2UgPT09IG51bGwgPyBhYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0ICsgc291cmNlLmxlbmd0aCkpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmICh2aXNpdG9yLnZpc2l0QVNUV2l0aFNvdXJjZSkge1xuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRBU1RXaXRoU291cmNlKHRoaXMsIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hc3QudmlzaXQodmlzaXRvciwgY29udGV4dCk7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zb3VyY2V9IGluICR7dGhpcy5sb2NhdGlvbn1gO1xuICB9XG59XG5cbi8qKlxuICogVGVtcGxhdGVCaW5kaW5nIHJlZmVycyB0byBhIHBhcnRpY3VsYXIga2V5LXZhbHVlIHBhaXIgaW4gYSBtaWNyb3N5bnRheFxuICogZXhwcmVzc2lvbi4gQSBmZXcgZXhhbXBsZXMgYXJlOlxuICpcbiAqICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS18LS0tLS0tLS0tLS0tLS18XG4gKiAgIHwgICAgIGV4cHJlc3Npb24gICAgICB8ICAgICBrZXkgICAgICB8ICB2YWx1ZSAgfCBiaW5kaW5nIHR5cGUgfFxuICogICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXxcbiAqICAgfCAxLiBsZXQgaXRlbSAgICAgICAgIHwgICAgaXRlbSAgICAgIHwgIG51bGwgICB8ICAgdmFyaWFibGUgICB8XG4gKiAgIHwgMi4gb2YgaXRlbXMgICAgICAgICB8ICAgbmdGb3JPZiAgICB8ICBpdGVtcyAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8IDMuIGxldCB4ID0geSAgICAgICAgfCAgICAgIHggICAgICAgfCAgICB5ICAgIHwgICB2YXJpYWJsZSAgIHxcbiAqICAgfCA0LiBpbmRleCBhcyBpICAgICAgIHwgICAgICBpICAgICAgIHwgIGluZGV4ICB8ICAgdmFyaWFibGUgICB8XG4gKiAgIHwgNS4gdHJhY2tCeTogZnVuYyAgICB8IG5nRm9yVHJhY2tCeSB8ICAgZnVuYyAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8IDYuICpuZ0lmPVwiY29uZFwiICAgICB8ICAgICBuZ0lmICAgICB8ICAgY29uZCAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXxcbiAqXG4gKiAoNikgaXMgYSBub3RhYmxlIGV4Y2VwdGlvbiBiZWNhdXNlIGl0IGlzIGEgYmluZGluZyBmcm9tIHRoZSB0ZW1wbGF0ZSBrZXkgaW5cbiAqIHRoZSBMSFMgb2YgYSBIVE1MIGF0dHJpYnV0ZSB0byB0aGUgZXhwcmVzc2lvbiBpbiB0aGUgUkhTLiBBbGwgb3RoZXIgYmluZGluZ3NcbiAqIGluIHRoZSBleGFtcGxlIGFib3ZlIGFyZSBkZXJpdmVkIHNvbGVseSBmcm9tIHRoZSBSSFMuXG4gKi9cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQmluZGluZyA9IFZhcmlhYmxlQmluZGluZ3xFeHByZXNzaW9uQmluZGluZztcblxuZXhwb3J0IGNsYXNzIFZhcmlhYmxlQmluZGluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gc291cmNlU3BhbiBlbnRpcmUgc3BhbiBvZiB0aGUgYmluZGluZy5cbiAgICogQHBhcmFtIGtleSBuYW1lIG9mIHRoZSBMSFMgYWxvbmcgd2l0aCBpdHMgc3Bhbi5cbiAgICogQHBhcmFtIHZhbHVlIG9wdGlvbmFsIHZhbHVlIGZvciB0aGUgUkhTIGFsb25nIHdpdGggaXRzIHNwYW4uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkga2V5OiBUZW1wbGF0ZUJpbmRpbmdJZGVudGlmaWVyLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBUZW1wbGF0ZUJpbmRpbmdJZGVudGlmaWVyfG51bGwpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHByZXNzaW9uQmluZGluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gc291cmNlU3BhbiBlbnRpcmUgc3BhbiBvZiB0aGUgYmluZGluZy5cbiAgICogQHBhcmFtIGtleSBiaW5kaW5nIG5hbWUsIGxpa2UgbmdGb3JPZiwgbmdGb3JUcmFja0J5LCBuZ0lmLCBhbG9uZyB3aXRoIGl0c1xuICAgKiBzcGFuLiBOb3RlIHRoYXQgdGhlIGxlbmd0aCBvZiB0aGUgc3BhbiBtYXkgbm90IGJlIHRoZSBzYW1lIGFzXG4gICAqIGBrZXkuc291cmNlLmxlbmd0aGAuIEZvciBleGFtcGxlLFxuICAgKiAxLiBrZXkuc291cmNlID0gbmdGb3IsIGtleS5zcGFuIGlzIGZvciBcIm5nRm9yXCJcbiAgICogMi4ga2V5LnNvdXJjZSA9IG5nRm9yT2YsIGtleS5zcGFuIGlzIGZvciBcIm9mXCJcbiAgICogMy4ga2V5LnNvdXJjZSA9IG5nRm9yVHJhY2tCeSwga2V5LnNwYW4gaXMgZm9yIFwidHJhY2tCeVwiXG4gICAqIEBwYXJhbSB2YWx1ZSBvcHRpb25hbCBleHByZXNzaW9uIGZvciB0aGUgUkhTLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGtleTogVGVtcGxhdGVCaW5kaW5nSWRlbnRpZmllciwgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBBU1RXaXRoU291cmNlfG51bGwpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVCaW5kaW5nSWRlbnRpZmllciB7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBzcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0VmlzaXRvciB7XG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdENvbmRpdGlvbmFsKGFzdDogQ29uZGl0aW9uYWwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRGdW5jdGlvbkNhbGwoYXN0OiBGdW5jdGlvbkNhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXksIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdExpdGVyYWxQcmltaXRpdmUoYXN0OiBMaXRlcmFsUHJpbWl0aXZlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXROb25OdWxsQXNzZXJ0KGFzdDogTm9uTnVsbEFzc2VydCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEFTVFdpdGhTb3VyY2U/KGFzdDogQVNUV2l0aFNvdXJjZSwgY29udGV4dDogYW55KTogYW55O1xuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBvcHRpb25hbGx5IGRlZmluZWQgdG8gYWxsb3cgY2xhc3NlcyB0aGF0IGltcGxlbWVudCB0aGlzXG4gICAqIGludGVyZmFjZSB0byBzZWxlY3RpdmVseSBkZWNpZGUgaWYgdGhlIHNwZWNpZmllZCBgYXN0YCBzaG91bGQgYmUgdmlzaXRlZC5cbiAgICogQHBhcmFtIGFzdCBub2RlIHRvIHZpc2l0XG4gICAqIEBwYXJhbSBjb250ZXh0IGNvbnRleHQgdGhhdCBnZXRzIHBhc3NlZCB0byB0aGUgbm9kZSBhbmQgYWxsIGl0cyBjaGlsZHJlblxuICAgKi9cbiAgdmlzaXQ/KGFzdDogQVNULCBjb250ZXh0PzogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlQXN0VmlzaXRvciBpbXBsZW1lbnRzIEFzdFZpc2l0b3Ige1xuICB2aXNpdChhc3Q6IEFTVCwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24ganVzdCB2aXNpdHMgZXZlcnkgbm9kZS5cbiAgICAvLyBDbGFzc2VzIHRoYXQgZXh0ZW5kIFJlY3Vyc2l2ZUFzdFZpc2l0b3Igc2hvdWxkIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb25cbiAgICAvLyB0byBzZWxlY3RpdmVseSB2aXNpdCB0aGUgc3BlY2lmaWVkIG5vZGUuXG4gICAgYXN0LnZpc2l0KHRoaXMsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LmxlZnQsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LnJpZ2h0LCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5jb25kaXRpb24sIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LnRydWVFeHAsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LmZhbHNlRXhwLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5leHAsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGlmIChhc3QudGFyZ2V0KSB7XG4gICAgICB0aGlzLnZpc2l0KGFzdC50YXJnZXQsIGNvbnRleHQpO1xuICAgIH1cbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdEltcGxpY2l0UmVjZWl2ZXIoYXN0OiBJbXBsaWNpdFJlY2VpdmVyLCBjb250ZXh0OiBhbnkpOiBhbnkge31cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbiwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRLZXllZFJlYWQoYXN0OiBLZXllZFJlYWQsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3Qub2JqLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC5rZXksIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3Qub2JqLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC5rZXksIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LnZhbHVlLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFByZWZpeE5vdChhc3Q6IFByZWZpeE5vdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5leHByZXNzaW9uLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdE5vbk51bGxBc3NlcnQoYXN0OiBOb25OdWxsQXNzZXJ0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LmV4cHJlc3Npb24sIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC52YWx1ZSwgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5yZWNlaXZlciwgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICAvLyBUaGlzIGlzIG5vdCBwYXJ0IG9mIHRoZSBBc3RWaXNpdG9yIGludGVyZmFjZSwganVzdCBhIGhlbHBlciBtZXRob2RcbiAgdmlzaXRBbGwoYXN0czogQVNUW10sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgZm9yIChjb25zdCBhc3Qgb2YgYXN0cykge1xuICAgICAgdGhpcy52aXNpdChhc3QsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXN0VHJhbnNmb3JtZXIgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlciwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbiwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEludGVycG9sYXRpb24oYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Quc3RyaW5ncywgdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpKTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnZhbHVlKTtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUHJvcGVydHlSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpLCBhc3QubmFtZSk7XG4gIH1cblxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUHJvcGVydHlXcml0ZShcbiAgICAgICAgYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lLCBhc3QudmFsdWUudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFNhZmVQcm9wZXJ0eVJlYWQoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lKTtcbiAgfVxuXG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBNZXRob2RDYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBTYWZlTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFNhZmVNZXRob2RDYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb25DYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC50YXJnZXQhLnZpc2l0KHRoaXMpLCB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBMaXRlcmFsTWFwLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTGl0ZXJhbE1hcChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5rZXlzLCB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMpKTtcbiAgfVxuXG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgQmluYXJ5KFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5vcGVyYXRpb24sIGFzdC5sZWZ0LnZpc2l0KHRoaXMpLCBhc3QucmlnaHQudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBQcmVmaXhOb3QoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdE5vbk51bGxBc3NlcnQoYXN0OiBOb25OdWxsQXNzZXJ0LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTm9uTnVsbEFzc2VydChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5jb25kaXRpb24udmlzaXQodGhpcyksIGFzdC50cnVlRXhwLnZpc2l0KHRoaXMpLFxuICAgICAgICBhc3QuZmFsc2VFeHAudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUGlwZShcbiAgICAgICAgYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QuZXhwLnZpc2l0KHRoaXMpLCBhc3QubmFtZSwgdGhpcy52aXNpdEFsbChhc3QuYXJncyksXG4gICAgICAgIGFzdC5uYW1lU3Bhbik7XG4gIH1cblxuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEtleWVkUmVhZChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5vYmoudmlzaXQodGhpcyksIGFzdC5rZXkudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEtleWVkV3JpdGUoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm9iai52aXNpdCh0aGlzKSwgYXN0LmtleS52aXNpdCh0aGlzKSwgYXN0LnZhbHVlLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0QWxsKGFzdHM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgcmVzW2ldID0gYXN0c1tpXS52aXNpdCh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IENoYWluKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpKTtcbiAgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFF1b3RlKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5wcmVmaXgsIGFzdC51bmludGVycHJldGVkRXhwcmVzc2lvbiwgYXN0LmxvY2F0aW9uKTtcbiAgfVxufVxuXG4vLyBBIHRyYW5zZm9ybWVyIHRoYXQgb25seSBjcmVhdGVzIG5ldyBub2RlcyBpZiB0aGUgdHJhbnNmb3JtZXIgbWFrZXMgYSBjaGFuZ2Ugb3Jcbi8vIGEgY2hhbmdlIGlzIG1hZGUgYSBjaGlsZCBub2RlLlxuZXhwb3J0IGNsYXNzIEFzdE1lbW9yeUVmZmljaWVudFRyYW5zZm9ybWVyIGltcGxlbWVudHMgQXN0VmlzaXRvciB7XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IEludGVycG9sYXRpb24sIGNvbnRleHQ6IGFueSk6IEludGVycG9sYXRpb24ge1xuICAgIGNvbnN0IGV4cHJlc3Npb25zID0gdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpO1xuICAgIGlmIChleHByZXNzaW9ucyAhPT0gYXN0LmV4cHJlc3Npb25zKVxuICAgICAgcmV0dXJuIG5ldyBJbnRlcnBvbGF0aW9uKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnN0cmluZ3MsIGV4cHJlc3Npb25zKTtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBQcm9wZXJ0eVJlYWQsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHlSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgcmVjZWl2ZXIsIGFzdC5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlXcml0ZShhc3Q6IFByb3BlcnR5V3JpdGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgY29uc3QgdmFsdWUgPSBhc3QudmFsdWUudmlzaXQodGhpcyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIgfHwgdmFsdWUgIT09IGFzdC52YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdyaXRlKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgcmVjZWl2ZXIsIGFzdC5uYW1lLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBTYWZlUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IHJlY2VpdmVyID0gYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpO1xuICAgIGlmIChyZWNlaXZlciAhPT0gYXN0LnJlY2VpdmVyKSB7XG4gICAgICByZXR1cm4gbmV3IFNhZmVQcm9wZXJ0eVJlYWQoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCByZWNlaXZlciwgYXN0Lm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIgfHwgYXJncyAhPT0gYXN0LmFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgTWV0aG9kQ2FsbChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIHJlY2VpdmVyLCBhc3QubmFtZSwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgY29uc3QgYXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpO1xuICAgIGlmIChyZWNlaXZlciAhPT0gYXN0LnJlY2VpdmVyIHx8IGFyZ3MgIT09IGFzdC5hcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IFNhZmVNZXRob2RDYWxsKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgcmVjZWl2ZXIsIGFzdC5uYW1lLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGFzdC50YXJnZXQgJiYgYXN0LnRhcmdldC52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKHRhcmdldCAhPT0gYXN0LnRhcmdldCB8fCBhcmdzICE9PSBhc3QuYXJncykge1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNhbGwoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCB0YXJnZXQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucyk7XG4gICAgaWYgKGV4cHJlc3Npb25zICE9PSBhc3QuZXhwcmVzc2lvbnMpIHtcbiAgICAgIHJldHVybiBuZXcgTGl0ZXJhbEFycmF5KGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgZXhwcmVzc2lvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMpO1xuICAgIGlmICh2YWx1ZXMgIT09IGFzdC52YWx1ZXMpIHtcbiAgICAgIHJldHVybiBuZXcgTGl0ZXJhbE1hcChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5rZXlzLCB2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRCaW5hcnkoYXN0OiBCaW5hcnksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgbGVmdCA9IGFzdC5sZWZ0LnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IHJpZ2h0ID0gYXN0LnJpZ2h0LnZpc2l0KHRoaXMpO1xuICAgIGlmIChsZWZ0ICE9PSBhc3QubGVmdCB8fCByaWdodCAhPT0gYXN0LnJpZ2h0KSB7XG4gICAgICByZXR1cm4gbmV3IEJpbmFyeShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5vcGVyYXRpb24sIGxlZnQsIHJpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0UHJlZml4Tm90KGFzdDogUHJlZml4Tm90LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSBhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzKTtcbiAgICBpZiAoZXhwcmVzc2lvbiAhPT0gYXN0LmV4cHJlc3Npb24pIHtcbiAgICAgIHJldHVybiBuZXcgUHJlZml4Tm90KGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgZXhwcmVzc2lvbik7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdE5vbk51bGxBc3NlcnQoYXN0OiBOb25OdWxsQXNzZXJ0LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSBhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzKTtcbiAgICBpZiAoZXhwcmVzc2lvbiAhPT0gYXN0LmV4cHJlc3Npb24pIHtcbiAgICAgIHJldHVybiBuZXcgTm9uTnVsbEFzc2VydChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGV4cHJlc3Npb24pO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRDb25kaXRpb25hbChhc3Q6IENvbmRpdGlvbmFsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGFzdC5jb25kaXRpb24udmlzaXQodGhpcyk7XG4gICAgY29uc3QgdHJ1ZUV4cCA9IGFzdC50cnVlRXhwLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGZhbHNlRXhwID0gYXN0LmZhbHNlRXhwLnZpc2l0KHRoaXMpO1xuICAgIGlmIChjb25kaXRpb24gIT09IGFzdC5jb25kaXRpb24gfHwgdHJ1ZUV4cCAhPT0gYXN0LnRydWVFeHAgfHwgZmFsc2VFeHAgIT09IGFzdC5mYWxzZUV4cCkge1xuICAgICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGNvbmRpdGlvbiwgdHJ1ZUV4cCwgZmFsc2VFeHApO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwID0gYXN0LmV4cC52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKGV4cCAhPT0gYXN0LmV4cCB8fCBhcmdzICE9PSBhc3QuYXJncykge1xuICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nUGlwZShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGV4cCwgYXN0Lm5hbWUsIGFyZ3MsIGFzdC5uYW1lU3Bhbik7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBvYmogPSBhc3Qub2JqLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGtleSA9IGFzdC5rZXkudmlzaXQodGhpcyk7XG4gICAgaWYgKG9iaiAhPT0gYXN0Lm9iaiB8fCBrZXkgIT09IGFzdC5rZXkpIHtcbiAgICAgIHJldHVybiBuZXcgS2V5ZWRSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3Bhbiwgb2JqLCBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBvYmogPSBhc3Qub2JqLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGtleSA9IGFzdC5rZXkudmlzaXQodGhpcyk7XG4gICAgY29uc3QgdmFsdWUgPSBhc3QudmFsdWUudmlzaXQodGhpcyk7XG4gICAgaWYgKG9iaiAhPT0gYXN0Lm9iaiB8fCBrZXkgIT09IGFzdC5rZXkgfHwgdmFsdWUgIT09IGFzdC52YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBLZXllZFdyaXRlKGFzdC5zcGFuLCBhc3Quc291cmNlU3Bhbiwgb2JqLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0QWxsKGFzdHM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGxldCBtb2RpZmllZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3Qgb3JpZ2luYWwgPSBhc3RzW2ldO1xuICAgICAgY29uc3QgdmFsdWUgPSBvcmlnaW5hbC52aXNpdCh0aGlzKTtcbiAgICAgIHJlc1tpXSA9IHZhbHVlO1xuICAgICAgbW9kaWZpZWQgPSBtb2RpZmllZCB8fCB2YWx1ZSAhPT0gb3JpZ2luYWw7XG4gICAgfVxuICAgIHJldHVybiBtb2RpZmllZCA/IHJlcyA6IGFzdHM7XG4gIH1cblxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4sIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucyk7XG4gICAgaWYgKGV4cHJlc3Npb25zICE9PSBhc3QuZXhwcmVzc2lvbnMpIHtcbiAgICAgIHJldHVybiBuZXcgQ2hhaW4oYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBleHByZXNzaW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxufVxuXG4vLyBCaW5kaW5nc1xuXG5leHBvcnQgY2xhc3MgUGFyc2VkUHJvcGVydHkge1xuICBwdWJsaWMgcmVhZG9ubHkgaXNMaXRlcmFsOiBib29sZWFuO1xuICBwdWJsaWMgcmVhZG9ubHkgaXNBbmltYXRpb246IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZXhwcmVzc2lvbjogQVNUV2l0aFNvdXJjZSwgcHVibGljIHR5cGU6IFBhcnNlZFByb3BlcnR5VHlwZSxcbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyB2YWx1ZVNwYW4/OiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICB0aGlzLmlzTGl0ZXJhbCA9IHRoaXMudHlwZSA9PT0gUGFyc2VkUHJvcGVydHlUeXBlLkxJVEVSQUxfQVRUUjtcbiAgICB0aGlzLmlzQW5pbWF0aW9uID0gdGhpcy50eXBlID09PSBQYXJzZWRQcm9wZXJ0eVR5cGUuQU5JTUFUSU9OO1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIFBhcnNlZFByb3BlcnR5VHlwZSB7XG4gIERFRkFVTFQsXG4gIExJVEVSQUxfQVRUUixcbiAgQU5JTUFUSU9OXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFBhcnNlZEV2ZW50VHlwZSB7XG4gIC8vIERPTSBvciBEaXJlY3RpdmUgZXZlbnRcbiAgUmVndWxhcixcbiAgLy8gQW5pbWF0aW9uIHNwZWNpZmljIGV2ZW50XG4gIEFuaW1hdGlvbixcbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlZEV2ZW50IHtcbiAgLy8gUmVndWxhciBldmVudHMgaGF2ZSBhIHRhcmdldFxuICAvLyBBbmltYXRpb24gZXZlbnRzIGhhdmUgYSBwaGFzZVxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0YXJnZXRPclBoYXNlOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBQYXJzZWRFdmVudFR5cGUsXG4gICAgICBwdWJsaWMgaGFuZGxlcjogQVNUV2l0aFNvdXJjZSwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyBoYW5kbGVyU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxufVxuXG4vKipcbiAqIFBhcnNlZFZhcmlhYmxlIHJlcHJlc2VudHMgYSB2YXJpYWJsZSBkZWNsYXJhdGlvbiBpbiBhIG1pY3Jvc3ludGF4IGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQYXJzZWRWYXJpYWJsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgcmVhZG9ubHkga2V5U3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlU3Bhbj86IFBhcnNlU291cmNlU3Bhbikge31cbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gQmluZGluZ1R5cGUge1xuICAvLyBBIHJlZ3VsYXIgYmluZGluZyB0byBhIHByb3BlcnR5IChlLmcuIGBbcHJvcGVydHldPVwiZXhwcmVzc2lvblwiYCkuXG4gIFByb3BlcnR5LFxuICAvLyBBIGJpbmRpbmcgdG8gYW4gZWxlbWVudCBhdHRyaWJ1dGUgKGUuZy4gYFthdHRyLm5hbWVdPVwiZXhwcmVzc2lvblwiYCkuXG4gIEF0dHJpYnV0ZSxcbiAgLy8gQSBiaW5kaW5nIHRvIGEgQ1NTIGNsYXNzIChlLmcuIGBbY2xhc3MubmFtZV09XCJjb25kaXRpb25cImApLlxuICBDbGFzcyxcbiAgLy8gQSBiaW5kaW5nIHRvIGEgc3R5bGUgcnVsZSAoZS5nLiBgW3N0eWxlLnJ1bGVdPVwiZXhwcmVzc2lvblwiYCkuXG4gIFN0eWxlLFxuICAvLyBBIGJpbmRpbmcgdG8gYW4gYW5pbWF0aW9uIHJlZmVyZW5jZSAoZS5nLiBgW2FuaW1hdGUua2V5XT1cImV4cHJlc3Npb25cImApLlxuICBBbmltYXRpb24sXG59XG5cbmV4cG9ydCBjbGFzcyBCb3VuZEVsZW1lbnRQcm9wZXJ0eSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHR5cGU6IEJpbmRpbmdUeXBlLCBwdWJsaWMgc2VjdXJpdHlDb250ZXh0OiBTZWN1cml0eUNvbnRleHQsXG4gICAgICBwdWJsaWMgdmFsdWU6IEFTVFdpdGhTb3VyY2UsIHB1YmxpYyB1bml0OiBzdHJpbmd8bnVsbCwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyB2YWx1ZVNwYW4/OiBQYXJzZVNvdXJjZVNwYW4pIHt9XG59XG4iXX0=