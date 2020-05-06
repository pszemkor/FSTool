/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class ParserError {
    constructor(message, input, errLocation, ctxLocation) {
        this.input = input;
        this.errLocation = errLocation;
        this.ctxLocation = ctxLocation;
        this.message = `Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`;
    }
}
export class ParseSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    toAbsolute(absoluteOffset) {
        return new AbsoluteSourceSpan(absoluteOffset + this.start, absoluteOffset + this.end);
    }
}
export class AST {
    constructor(span, 
    /**
     * Absolute location of the expression AST in a source code file.
     */
    sourceSpan) {
        this.span = span;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context = null) {
        return null;
    }
    toString() {
        return 'AST';
    }
}
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
export class Quote extends AST {
    constructor(span, sourceSpan, prefix, uninterpretedExpression, location) {
        super(span, sourceSpan);
        this.prefix = prefix;
        this.uninterpretedExpression = uninterpretedExpression;
        this.location = location;
    }
    visit(visitor, context = null) {
        return visitor.visitQuote(this, context);
    }
    toString() {
        return 'Quote';
    }
}
export class EmptyExpr extends AST {
    visit(visitor, context = null) {
        // do nothing
    }
}
export class ImplicitReceiver extends AST {
    visit(visitor, context = null) {
        return visitor.visitImplicitReceiver(this, context);
    }
}
/**
 * Multiple expressions separated by a semicolon.
 */
export class Chain extends AST {
    constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitChain(this, context);
    }
}
export class Conditional extends AST {
    constructor(span, sourceSpan, condition, trueExp, falseExp) {
        super(span, sourceSpan);
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
    }
    visit(visitor, context = null) {
        return visitor.visitConditional(this, context);
    }
}
export class PropertyRead extends AST {
    constructor(span, sourceSpan, receiver, name) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyRead(this, context);
    }
}
export class PropertyWrite extends AST {
    constructor(span, sourceSpan, receiver, name, value) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitPropertyWrite(this, context);
    }
}
export class SafePropertyRead extends AST {
    constructor(span, sourceSpan, receiver, name) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.name = name;
    }
    visit(visitor, context = null) {
        return visitor.visitSafePropertyRead(this, context);
    }
}
export class KeyedRead extends AST {
    constructor(span, sourceSpan, obj, key) {
        super(span, sourceSpan);
        this.obj = obj;
        this.key = key;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedRead(this, context);
    }
}
export class KeyedWrite extends AST {
    constructor(span, sourceSpan, obj, key, value) {
        super(span, sourceSpan);
        this.obj = obj;
        this.key = key;
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitKeyedWrite(this, context);
    }
}
export class BindingPipe extends AST {
    constructor(span, sourceSpan, exp, name, args, nameSpan) {
        super(span, sourceSpan);
        this.exp = exp;
        this.name = name;
        this.args = args;
        this.nameSpan = nameSpan;
    }
    visit(visitor, context = null) {
        return visitor.visitPipe(this, context);
    }
}
export class LiteralPrimitive extends AST {
    constructor(span, sourceSpan, value) {
        super(span, sourceSpan);
        this.value = value;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralPrimitive(this, context);
    }
}
export class LiteralArray extends AST {
    constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralArray(this, context);
    }
}
export class LiteralMap extends AST {
    constructor(span, sourceSpan, keys, values) {
        super(span, sourceSpan);
        this.keys = keys;
        this.values = values;
    }
    visit(visitor, context = null) {
        return visitor.visitLiteralMap(this, context);
    }
}
export class Interpolation extends AST {
    constructor(span, sourceSpan, strings, expressions) {
        super(span, sourceSpan);
        this.strings = strings;
        this.expressions = expressions;
    }
    visit(visitor, context = null) {
        return visitor.visitInterpolation(this, context);
    }
}
export class Binary extends AST {
    constructor(span, sourceSpan, operation, left, right) {
        super(span, sourceSpan);
        this.operation = operation;
        this.left = left;
        this.right = right;
    }
    visit(visitor, context = null) {
        return visitor.visitBinary(this, context);
    }
}
export class PrefixNot extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitPrefixNot(this, context);
    }
}
export class NonNullAssert extends AST {
    constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
    }
    visit(visitor, context = null) {
        return visitor.visitNonNullAssert(this, context);
    }
}
export class MethodCall extends AST {
    constructor(span, sourceSpan, receiver, name, args) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitMethodCall(this, context);
    }
}
export class SafeMethodCall extends AST {
    constructor(span, sourceSpan, receiver, name, args) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitSafeMethodCall(this, context);
    }
}
export class FunctionCall extends AST {
    constructor(span, sourceSpan, target, args) {
        super(span, sourceSpan);
        this.target = target;
        this.args = args;
    }
    visit(visitor, context = null) {
        return visitor.visitFunctionCall(this, context);
    }
}
/**
 * Records the absolute position of a text span in a source file, where `start` and `end` are the
 * starting and ending byte offsets, respectively, of the text span in a source file.
 */
export class AbsoluteSourceSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
export class ASTWithSource extends AST {
    constructor(ast, source, location, absoluteOffset, errors) {
        super(new ParseSpan(0, source === null ? 0 : source.length), new AbsoluteSourceSpan(absoluteOffset, source === null ? absoluteOffset : absoluteOffset + source.length));
        this.ast = ast;
        this.source = source;
        this.location = location;
        this.errors = errors;
    }
    visit(visitor, context = null) {
        if (visitor.visitASTWithSource) {
            return visitor.visitASTWithSource(this, context);
        }
        return this.ast.visit(visitor, context);
    }
    toString() {
        return `${this.source} in ${this.location}`;
    }
}
export class VariableBinding {
    /**
     * @param sourceSpan entire span of the binding.
     * @param key name of the LHS along with its span.
     * @param value optional value for the RHS along with its span.
     */
    constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
    }
}
export class ExpressionBinding {
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
    constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
    }
}
export class RecursiveAstVisitor {
    visit(ast, context) {
        // The default implementation just visits every node.
        // Classes that extend RecursiveAstVisitor should override this function
        // to selectively visit the specified node.
        ast.visit(this, context);
    }
    visitBinary(ast, context) {
        this.visit(ast.left, context);
        this.visit(ast.right, context);
    }
    visitChain(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitConditional(ast, context) {
        this.visit(ast.condition, context);
        this.visit(ast.trueExp, context);
        this.visit(ast.falseExp, context);
    }
    visitPipe(ast, context) {
        this.visit(ast.exp, context);
        this.visitAll(ast.args, context);
    }
    visitFunctionCall(ast, context) {
        if (ast.target) {
            this.visit(ast.target, context);
        }
        this.visitAll(ast.args, context);
    }
    visitImplicitReceiver(ast, context) { }
    visitInterpolation(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitKeyedRead(ast, context) {
        this.visit(ast.obj, context);
        this.visit(ast.key, context);
    }
    visitKeyedWrite(ast, context) {
        this.visit(ast.obj, context);
        this.visit(ast.key, context);
        this.visit(ast.value, context);
    }
    visitLiteralArray(ast, context) {
        this.visitAll(ast.expressions, context);
    }
    visitLiteralMap(ast, context) {
        this.visitAll(ast.values, context);
    }
    visitLiteralPrimitive(ast, context) { }
    visitMethodCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
    }
    visitPrefixNot(ast, context) {
        this.visit(ast.expression, context);
    }
    visitNonNullAssert(ast, context) {
        this.visit(ast.expression, context);
    }
    visitPropertyRead(ast, context) {
        this.visit(ast.receiver, context);
    }
    visitPropertyWrite(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.value, context);
    }
    visitSafePropertyRead(ast, context) {
        this.visit(ast.receiver, context);
    }
    visitSafeMethodCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
    }
    visitQuote(ast, context) { }
    // This is not part of the AstVisitor interface, just a helper method
    visitAll(asts, context) {
        for (const ast of asts) {
            this.visit(ast, context);
        }
    }
}
export class AstTransformer {
    visitImplicitReceiver(ast, context) {
        return ast;
    }
    visitInterpolation(ast, context) {
        return new Interpolation(ast.span, ast.sourceSpan, ast.strings, this.visitAll(ast.expressions));
    }
    visitLiteralPrimitive(ast, context) {
        return new LiteralPrimitive(ast.span, ast.sourceSpan, ast.value);
    }
    visitPropertyRead(ast, context) {
        return new PropertyRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name);
    }
    visitPropertyWrite(ast, context) {
        return new PropertyWrite(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name, ast.value.visit(this));
    }
    visitSafePropertyRead(ast, context) {
        return new SafePropertyRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name);
    }
    visitMethodCall(ast, context) {
        return new MethodCall(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    visitSafeMethodCall(ast, context) {
        return new SafeMethodCall(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    visitFunctionCall(ast, context) {
        return new FunctionCall(ast.span, ast.sourceSpan, ast.target.visit(this), this.visitAll(ast.args));
    }
    visitLiteralArray(ast, context) {
        return new LiteralArray(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
    }
    visitLiteralMap(ast, context) {
        return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, this.visitAll(ast.values));
    }
    visitBinary(ast, context) {
        return new Binary(ast.span, ast.sourceSpan, ast.operation, ast.left.visit(this), ast.right.visit(this));
    }
    visitPrefixNot(ast, context) {
        return new PrefixNot(ast.span, ast.sourceSpan, ast.expression.visit(this));
    }
    visitNonNullAssert(ast, context) {
        return new NonNullAssert(ast.span, ast.sourceSpan, ast.expression.visit(this));
    }
    visitConditional(ast, context) {
        return new Conditional(ast.span, ast.sourceSpan, ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
    }
    visitPipe(ast, context) {
        return new BindingPipe(ast.span, ast.sourceSpan, ast.exp.visit(this), ast.name, this.visitAll(ast.args), ast.nameSpan);
    }
    visitKeyedRead(ast, context) {
        return new KeyedRead(ast.span, ast.sourceSpan, ast.obj.visit(this), ast.key.visit(this));
    }
    visitKeyedWrite(ast, context) {
        return new KeyedWrite(ast.span, ast.sourceSpan, ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
    }
    visitAll(asts) {
        const res = [];
        for (let i = 0; i < asts.length; ++i) {
            res[i] = asts[i].visit(this);
        }
        return res;
    }
    visitChain(ast, context) {
        return new Chain(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
    }
    visitQuote(ast, context) {
        return new Quote(ast.span, ast.sourceSpan, ast.prefix, ast.uninterpretedExpression, ast.location);
    }
}
// A transformer that only creates new nodes if the transformer makes a change or
// a change is made a child node.
export class AstMemoryEfficientTransformer {
    visitImplicitReceiver(ast, context) {
        return ast;
    }
    visitInterpolation(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions)
            return new Interpolation(ast.span, ast.sourceSpan, ast.strings, expressions);
        return ast;
    }
    visitLiteralPrimitive(ast, context) {
        return ast;
    }
    visitPropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver !== ast.receiver) {
            return new PropertyRead(ast.span, ast.sourceSpan, receiver, ast.name);
        }
        return ast;
    }
    visitPropertyWrite(ast, context) {
        const receiver = ast.receiver.visit(this);
        const value = ast.value.visit(this);
        if (receiver !== ast.receiver || value !== ast.value) {
            return new PropertyWrite(ast.span, ast.sourceSpan, receiver, ast.name, value);
        }
        return ast;
    }
    visitSafePropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver !== ast.receiver) {
            return new SafePropertyRead(ast.span, ast.sourceSpan, receiver, ast.name);
        }
        return ast;
    }
    visitMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        const args = this.visitAll(ast.args);
        if (receiver !== ast.receiver || args !== ast.args) {
            return new MethodCall(ast.span, ast.sourceSpan, receiver, ast.name, args);
        }
        return ast;
    }
    visitSafeMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        const args = this.visitAll(ast.args);
        if (receiver !== ast.receiver || args !== ast.args) {
            return new SafeMethodCall(ast.span, ast.sourceSpan, receiver, ast.name, args);
        }
        return ast;
    }
    visitFunctionCall(ast, context) {
        const target = ast.target && ast.target.visit(this);
        const args = this.visitAll(ast.args);
        if (target !== ast.target || args !== ast.args) {
            return new FunctionCall(ast.span, ast.sourceSpan, target, args);
        }
        return ast;
    }
    visitLiteralArray(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions) {
            return new LiteralArray(ast.span, ast.sourceSpan, expressions);
        }
        return ast;
    }
    visitLiteralMap(ast, context) {
        const values = this.visitAll(ast.values);
        if (values !== ast.values) {
            return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, values);
        }
        return ast;
    }
    visitBinary(ast, context) {
        const left = ast.left.visit(this);
        const right = ast.right.visit(this);
        if (left !== ast.left || right !== ast.right) {
            return new Binary(ast.span, ast.sourceSpan, ast.operation, left, right);
        }
        return ast;
    }
    visitPrefixNot(ast, context) {
        const expression = ast.expression.visit(this);
        if (expression !== ast.expression) {
            return new PrefixNot(ast.span, ast.sourceSpan, expression);
        }
        return ast;
    }
    visitNonNullAssert(ast, context) {
        const expression = ast.expression.visit(this);
        if (expression !== ast.expression) {
            return new NonNullAssert(ast.span, ast.sourceSpan, expression);
        }
        return ast;
    }
    visitConditional(ast, context) {
        const condition = ast.condition.visit(this);
        const trueExp = ast.trueExp.visit(this);
        const falseExp = ast.falseExp.visit(this);
        if (condition !== ast.condition || trueExp !== ast.trueExp || falseExp !== ast.falseExp) {
            return new Conditional(ast.span, ast.sourceSpan, condition, trueExp, falseExp);
        }
        return ast;
    }
    visitPipe(ast, context) {
        const exp = ast.exp.visit(this);
        const args = this.visitAll(ast.args);
        if (exp !== ast.exp || args !== ast.args) {
            return new BindingPipe(ast.span, ast.sourceSpan, exp, ast.name, args, ast.nameSpan);
        }
        return ast;
    }
    visitKeyedRead(ast, context) {
        const obj = ast.obj.visit(this);
        const key = ast.key.visit(this);
        if (obj !== ast.obj || key !== ast.key) {
            return new KeyedRead(ast.span, ast.sourceSpan, obj, key);
        }
        return ast;
    }
    visitKeyedWrite(ast, context) {
        const obj = ast.obj.visit(this);
        const key = ast.key.visit(this);
        const value = ast.value.visit(this);
        if (obj !== ast.obj || key !== ast.key || value !== ast.value) {
            return new KeyedWrite(ast.span, ast.sourceSpan, obj, key, value);
        }
        return ast;
    }
    visitAll(asts) {
        const res = [];
        let modified = false;
        for (let i = 0; i < asts.length; ++i) {
            const original = asts[i];
            const value = original.visit(this);
            res[i] = value;
            modified = modified || value !== original;
        }
        return modified ? res : asts;
    }
    visitChain(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions) {
            return new Chain(ast.span, ast.sourceSpan, expressions);
        }
        return ast;
    }
    visitQuote(ast, context) {
        return ast;
    }
}
// Bindings
export class ParsedProperty {
    constructor(name, expression, type, sourceSpan, valueSpan) {
        this.name = name;
        this.expression = expression;
        this.type = type;
        this.sourceSpan = sourceSpan;
        this.valueSpan = valueSpan;
        this.isLiteral = this.type === ParsedPropertyType.LITERAL_ATTR;
        this.isAnimation = this.type === ParsedPropertyType.ANIMATION;
    }
}
export var ParsedPropertyType;
(function (ParsedPropertyType) {
    ParsedPropertyType[ParsedPropertyType["DEFAULT"] = 0] = "DEFAULT";
    ParsedPropertyType[ParsedPropertyType["LITERAL_ATTR"] = 1] = "LITERAL_ATTR";
    ParsedPropertyType[ParsedPropertyType["ANIMATION"] = 2] = "ANIMATION";
})(ParsedPropertyType || (ParsedPropertyType = {}));
export class ParsedEvent {
    // Regular events have a target
    // Animation events have a phase
    constructor(name, targetOrPhase, type, handler, sourceSpan, handlerSpan) {
        this.name = name;
        this.targetOrPhase = targetOrPhase;
        this.type = type;
        this.handler = handler;
        this.sourceSpan = sourceSpan;
        this.handlerSpan = handlerSpan;
    }
}
/**
 * ParsedVariable represents a variable declaration in a microsyntax expression.
 */
export class ParsedVariable {
    constructor(name, value, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
    }
}
export class BoundElementProperty {
    constructor(name, type, securityContext, value, unit, sourceSpan, valueSpan) {
        this.name = name;
        this.type = type;
        this.securityContext = securityContext;
        this.value = value;
        this.unit = unit;
        this.sourceSpan = sourceSpan;
        this.valueSpan = valueSpan;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2V4cHJlc3Npb25fcGFyc2VyL2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFLSCxNQUFNLE9BQU8sV0FBVztJQUV0QixZQUNJLE9BQWUsRUFBUyxLQUFhLEVBQVMsV0FBbUIsRUFBUyxXQUFpQjtRQUFuRSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBTTtRQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixPQUFPLElBQUksV0FBVyxLQUFLLEtBQUssUUFBUSxXQUFXLEVBQUUsQ0FBQztJQUN4RixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sU0FBUztJQUNwQixZQUFtQixLQUFhLEVBQVMsR0FBVztRQUFqQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUFHLENBQUM7SUFDeEQsVUFBVSxDQUFDLGNBQXNCO1FBQy9CLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxHQUFHO0lBQ2QsWUFDVyxJQUFlO0lBQ3RCOztPQUVHO0lBQ0ksVUFBOEI7UUFKOUIsU0FBSSxHQUFKLElBQUksQ0FBVztRQUlmLGVBQVUsR0FBVixVQUFVLENBQW9CO0lBQUcsQ0FBQztJQUM3QyxLQUFLLENBQUMsT0FBbUIsRUFBRSxVQUFlLElBQUk7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsUUFBUTtRQUNOLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlHO0FB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QUNXLElBQVksRUFBUyxJQUFpQixFQUFTLGVBQWdDLEVBQy9FLEtBQW9CLEVBQVMsSUFBaUIsRUFBUyxVQUEyQixFQUNsRixTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvRSxVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2xGLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUcsQ0FBQztDQUMzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTZWN1cml0eUNvbnRleHR9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgUGFyc2VyRXJyb3Ige1xuICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIG1lc3NhZ2U6IHN0cmluZywgcHVibGljIGlucHV0OiBzdHJpbmcsIHB1YmxpYyBlcnJMb2NhdGlvbjogc3RyaW5nLCBwdWJsaWMgY3R4TG9jYXRpb24/OiBhbnkpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBgUGFyc2VyIEVycm9yOiAke21lc3NhZ2V9ICR7ZXJyTG9jYXRpb259IFske2lucHV0fV0gaW4gJHtjdHhMb2NhdGlvbn1gO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZVNwYW4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhcnQ6IG51bWJlciwgcHVibGljIGVuZDogbnVtYmVyKSB7fVxuICB0b0Fic29sdXRlKGFic29sdXRlT2Zmc2V0OiBudW1iZXIpOiBBYnNvbHV0ZVNvdXJjZVNwYW4ge1xuICAgIHJldHVybiBuZXcgQWJzb2x1dGVTb3VyY2VTcGFuKGFic29sdXRlT2Zmc2V0ICsgdGhpcy5zdGFydCwgYWJzb2x1dGVPZmZzZXQgKyB0aGlzLmVuZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHNwYW46IFBhcnNlU3BhbixcbiAgICAgIC8qKlxuICAgICAgICogQWJzb2x1dGUgbG9jYXRpb24gb2YgdGhlIGV4cHJlc3Npb24gQVNUIGluIGEgc291cmNlIGNvZGUgZmlsZS5cbiAgICAgICAqL1xuICAgICAgcHVibGljIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0FTVCc7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcXVvdGVkIGV4cHJlc3Npb24gb2YgdGhlIGZvcm06XG4gKlxuICogcXVvdGUgPSBwcmVmaXggYDpgIHVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uXG4gKiBwcmVmaXggPSBpZGVudGlmaWVyXG4gKiB1bmludGVycHJldGVkRXhwcmVzc2lvbiA9IGFyYml0cmFyeSBzdHJpbmdcbiAqXG4gKiBBIHF1b3RlZCBleHByZXNzaW9uIGlzIG1lYW50IHRvIGJlIHByZS1wcm9jZXNzZWQgYnkgYW4gQVNUIHRyYW5zZm9ybWVyIHRoYXRcbiAqIGNvbnZlcnRzIGl0IGludG8gYW5vdGhlciBBU1QgdGhhdCBubyBsb25nZXIgY29udGFpbnMgcXVvdGVkIGV4cHJlc3Npb25zLlxuICogSXQgaXMgbWVhbnQgdG8gYWxsb3cgdGhpcmQtcGFydHkgZGV2ZWxvcGVycyB0byBleHRlbmQgQW5ndWxhciB0ZW1wbGF0ZVxuICogZXhwcmVzc2lvbiBsYW5ndWFnZS4gVGhlIGB1bmludGVycHJldGVkRXhwcmVzc2lvbmAgcGFydCBvZiB0aGUgcXVvdGUgaXNcbiAqIHRoZXJlZm9yZSBub3QgaW50ZXJwcmV0ZWQgYnkgdGhlIEFuZ3VsYXIncyBvd24gZXhwcmVzc2lvbiBwYXJzZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBRdW90ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBwcmVmaXg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyB1bmludGVycHJldGVkRXhwcmVzc2lvbjogc3RyaW5nLCBwdWJsaWMgbG9jYXRpb246IGFueSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0UXVvdGUodGhpcywgY29udGV4dCk7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1F1b3RlJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlFeHByIGV4dGVuZHMgQVNUIHtcbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW1wbGljaXRSZWNlaXZlciBleHRlbmRzIEFTVCB7XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0SW1wbGljaXRSZWNlaXZlcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIE11bHRpcGxlIGV4cHJlc3Npb25zIHNlcGFyYXRlZCBieSBhIHNlbWljb2xvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENoYWluIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHByZXNzaW9uczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENoYWluKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBjb25kaXRpb246IEFTVCwgcHVibGljIHRydWVFeHA6IEFTVCxcbiAgICAgIHB1YmxpYyBmYWxzZUV4cDogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDb25kaXRpb25hbCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlSZWFkIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByb3BlcnR5UmVhZCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXcml0ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHZhbHVlOiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByb3BlcnR5V3JpdGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVQcm9wZXJ0eVJlYWQgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgcmVjZWl2ZXI6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0U2FmZVByb3BlcnR5UmVhZCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgS2V5ZWRSZWFkIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBvYmo6IEFTVCwgcHVibGljIGtleTogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRLZXllZFJlYWQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEtleWVkV3JpdGUgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgb2JqOiBBU1QsIHB1YmxpYyBrZXk6IEFTVCxcbiAgICAgIHB1YmxpYyB2YWx1ZTogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRLZXllZFdyaXRlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nUGlwZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHA6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBhcmdzOiBhbnlbXSwgcHVibGljIG5hbWVTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFBpcGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpdGVyYWxQcmltaXRpdmUgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHZhbHVlOiBhbnkpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdExpdGVyYWxQcmltaXRpdmUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpdGVyYWxBcnJheSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgZXhwcmVzc2lvbnM6IGFueVtdKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRMaXRlcmFsQXJyYXkodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgTGl0ZXJhbE1hcEtleSA9IHtcbiAga2V5OiBzdHJpbmc7IHF1b3RlZDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsTWFwIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIGtleXM6IExpdGVyYWxNYXBLZXlbXSxcbiAgICAgIHB1YmxpYyB2YWx1ZXM6IGFueVtdKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRMaXRlcmFsTWFwKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcnBvbGF0aW9uIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHN0cmluZ3M6IGFueVtdLFxuICAgICAgcHVibGljIGV4cHJlc3Npb25zOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0SW50ZXJwb2xhdGlvbih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmluYXJ5IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIG9wZXJhdGlvbjogc3RyaW5nLCBwdWJsaWMgbGVmdDogQVNULFxuICAgICAgcHVibGljIHJpZ2h0OiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEJpbmFyeSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlZml4Tm90IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTcGFuLCBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sIHB1YmxpYyBleHByZXNzaW9uOiBBU1QpIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByZWZpeE5vdCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9uTnVsbEFzc2VydCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgZXhwcmVzc2lvbjogQVNUKSB7XG4gICAgc3VwZXIoc3Bhbiwgc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXROb25OdWxsQXNzZXJ0KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXRob2RDYWxsIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgYXJnczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdE1ldGhvZENhbGwodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVNZXRob2RDYWxsIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBzcGFuOiBQYXJzZVNwYW4sIHNvdXJjZVNwYW46IEFic29sdXRlU291cmNlU3BhbiwgcHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgYXJnczogYW55W10pIHtcbiAgICBzdXBlcihzcGFuLCBzb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFNhZmVNZXRob2RDYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbkNhbGwgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHNwYW46IFBhcnNlU3Bhbiwgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLCBwdWJsaWMgdGFyZ2V0OiBBU1R8bnVsbCxcbiAgICAgIHB1YmxpYyBhcmdzOiBhbnlbXSkge1xuICAgIHN1cGVyKHNwYW4sIHNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RnVuY3Rpb25DYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogUmVjb3JkcyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgYSB0ZXh0IHNwYW4gaW4gYSBzb3VyY2UgZmlsZSwgd2hlcmUgYHN0YXJ0YCBhbmQgYGVuZGAgYXJlIHRoZVxuICogc3RhcnRpbmcgYW5kIGVuZGluZyBieXRlIG9mZnNldHMsIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRleHQgc3BhbiBpbiBhIHNvdXJjZSBmaWxlLlxuICovXG5leHBvcnQgY2xhc3MgQWJzb2x1dGVTb3VyY2VTcGFuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHN0YXJ0OiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBlbmQ6IG51bWJlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEFTVFdpdGhTb3VyY2UgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBhc3Q6IEFTVCwgcHVibGljIHNvdXJjZTogc3RyaW5nfG51bGwsIHB1YmxpYyBsb2NhdGlvbjogc3RyaW5nLCBhYnNvbHV0ZU9mZnNldDogbnVtYmVyLFxuICAgICAgcHVibGljIGVycm9yczogUGFyc2VyRXJyb3JbXSkge1xuICAgIHN1cGVyKFxuICAgICAgICBuZXcgUGFyc2VTcGFuKDAsIHNvdXJjZSA9PT0gbnVsbCA/IDAgOiBzb3VyY2UubGVuZ3RoKSxcbiAgICAgICAgbmV3IEFic29sdXRlU291cmNlU3BhbihcbiAgICAgICAgICAgIGFic29sdXRlT2Zmc2V0LCBzb3VyY2UgPT09IG51bGwgPyBhYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0ICsgc291cmNlLmxlbmd0aCkpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmICh2aXNpdG9yLnZpc2l0QVNUV2l0aFNvdXJjZSkge1xuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRBU1RXaXRoU291cmNlKHRoaXMsIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hc3QudmlzaXQodmlzaXRvciwgY29udGV4dCk7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zb3VyY2V9IGluICR7dGhpcy5sb2NhdGlvbn1gO1xuICB9XG59XG5cbi8qKlxuICogVGVtcGxhdGVCaW5kaW5nIHJlZmVycyB0byBhIHBhcnRpY3VsYXIga2V5LXZhbHVlIHBhaXIgaW4gYSBtaWNyb3N5bnRheFxuICogZXhwcmVzc2lvbi4gQSBmZXcgZXhhbXBsZXMgYXJlOlxuICpcbiAqICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS18LS0tLS0tLS0tLS0tLS18XG4gKiAgIHwgICAgIGV4cHJlc3Npb24gICAgICB8ICAgICBrZXkgICAgICB8ICB2YWx1ZSAgfCBiaW5kaW5nIHR5cGUgfFxuICogICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXxcbiAqICAgfCAxLiBsZXQgaXRlbSAgICAgICAgIHwgICAgaXRlbSAgICAgIHwgIG51bGwgICB8ICAgdmFyaWFibGUgICB8XG4gKiAgIHwgMi4gb2YgaXRlbXMgICAgICAgICB8ICAgbmdGb3JPZiAgICB8ICBpdGVtcyAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8IDMuIGxldCB4ID0geSAgICAgICAgfCAgICAgIHggICAgICAgfCAgICB5ICAgIHwgICB2YXJpYWJsZSAgIHxcbiAqICAgfCA0LiBpbmRleCBhcyBpICAgICAgIHwgICAgICBpICAgICAgIHwgIGluZGV4ICB8ICAgdmFyaWFibGUgICB8XG4gKiAgIHwgNS4gdHJhY2tCeTogZnVuYyAgICB8IG5nRm9yVHJhY2tCeSB8ICAgZnVuYyAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8IDYuICpuZ0lmPVwiY29uZFwiICAgICB8ICAgICBuZ0lmICAgICB8ICAgY29uZCAgfCAgZXhwcmVzc2lvbiAgfFxuICogICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXxcbiAqXG4gKiAoNikgaXMgYSBub3RhYmxlIGV4Y2VwdGlvbiBiZWNhdXNlIGl0IGlzIGEgYmluZGluZyBmcm9tIHRoZSB0ZW1wbGF0ZSBrZXkgaW5cbiAqIHRoZSBMSFMgb2YgYSBIVE1MIGF0dHJpYnV0ZSB0byB0aGUgZXhwcmVzc2lvbiBpbiB0aGUgUkhTLiBBbGwgb3RoZXIgYmluZGluZ3NcbiAqIGluIHRoZSBleGFtcGxlIGFib3ZlIGFyZSBkZXJpdmVkIHNvbGVseSBmcm9tIHRoZSBSSFMuXG4gKi9cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQmluZGluZyA9IFZhcmlhYmxlQmluZGluZ3xFeHByZXNzaW9uQmluZGluZztcblxuZXhwb3J0IGNsYXNzIFZhcmlhYmxlQmluZGluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gc291cmNlU3BhbiBlbnRpcmUgc3BhbiBvZiB0aGUgYmluZGluZy5cbiAgICogQHBhcmFtIGtleSBuYW1lIG9mIHRoZSBMSFMgYWxvbmcgd2l0aCBpdHMgc3Bhbi5cbiAgICogQHBhcmFtIHZhbHVlIG9wdGlvbmFsIHZhbHVlIGZvciB0aGUgUkhTIGFsb25nIHdpdGggaXRzIHNwYW4uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBzb3VyY2VTcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkga2V5OiBUZW1wbGF0ZUJpbmRpbmdJZGVudGlmaWVyLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBUZW1wbGF0ZUJpbmRpbmdJZGVudGlmaWVyfG51bGwpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHByZXNzaW9uQmluZGluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gc291cmNlU3BhbiBlbnRpcmUgc3BhbiBvZiB0aGUgYmluZGluZy5cbiAgICogQHBhcmFtIGtleSBiaW5kaW5nIG5hbWUsIGxpa2UgbmdGb3JPZiwgbmdGb3JUcmFja0J5LCBuZ0lmLCBhbG9uZyB3aXRoIGl0c1xuICAgKiBzcGFuLiBOb3RlIHRoYXQgdGhlIGxlbmd0aCBvZiB0aGUgc3BhbiBtYXkgbm90IGJlIHRoZSBzYW1lIGFzXG4gICAqIGBrZXkuc291cmNlLmxlbmd0aGAuIEZvciBleGFtcGxlLFxuICAgKiAxLiBrZXkuc291cmNlID0gbmdGb3IsIGtleS5zcGFuIGlzIGZvciBcIm5nRm9yXCJcbiAgICogMi4ga2V5LnNvdXJjZSA9IG5nRm9yT2YsIGtleS5zcGFuIGlzIGZvciBcIm9mXCJcbiAgICogMy4ga2V5LnNvdXJjZSA9IG5nRm9yVHJhY2tCeSwga2V5LnNwYW4gaXMgZm9yIFwidHJhY2tCeVwiXG4gICAqIEBwYXJhbSB2YWx1ZSBvcHRpb25hbCBleHByZXNzaW9uIGZvciB0aGUgUkhTLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgc291cmNlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGtleTogVGVtcGxhdGVCaW5kaW5nSWRlbnRpZmllciwgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBBU1RXaXRoU291cmNlfG51bGwpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVCaW5kaW5nSWRlbnRpZmllciB7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBzcGFuOiBBYnNvbHV0ZVNvdXJjZVNwYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0VmlzaXRvciB7XG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdENvbmRpdGlvbmFsKGFzdDogQ29uZGl0aW9uYWwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRGdW5jdGlvbkNhbGwoYXN0OiBGdW5jdGlvbkNhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXksIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdExpdGVyYWxQcmltaXRpdmUoYXN0OiBMaXRlcmFsUHJpbWl0aXZlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXROb25OdWxsQXNzZXJ0KGFzdDogTm9uTnVsbEFzc2VydCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEFTVFdpdGhTb3VyY2U/KGFzdDogQVNUV2l0aFNvdXJjZSwgY29udGV4dDogYW55KTogYW55O1xuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBvcHRpb25hbGx5IGRlZmluZWQgdG8gYWxsb3cgY2xhc3NlcyB0aGF0IGltcGxlbWVudCB0aGlzXG4gICAqIGludGVyZmFjZSB0byBzZWxlY3RpdmVseSBkZWNpZGUgaWYgdGhlIHNwZWNpZmllZCBgYXN0YCBzaG91bGQgYmUgdmlzaXRlZC5cbiAgICogQHBhcmFtIGFzdCBub2RlIHRvIHZpc2l0XG4gICAqIEBwYXJhbSBjb250ZXh0IGNvbnRleHQgdGhhdCBnZXRzIHBhc3NlZCB0byB0aGUgbm9kZSBhbmQgYWxsIGl0cyBjaGlsZHJlblxuICAgKi9cbiAgdmlzaXQ/KGFzdDogQVNULCBjb250ZXh0PzogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlQXN0VmlzaXRvciBpbXBsZW1lbnRzIEFzdFZpc2l0b3Ige1xuICB2aXNpdChhc3Q6IEFTVCwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24ganVzdCB2aXNpdHMgZXZlcnkgbm9kZS5cbiAgICAvLyBDbGFzc2VzIHRoYXQgZXh0ZW5kIFJlY3Vyc2l2ZUFzdFZpc2l0b3Igc2hvdWxkIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb25cbiAgICAvLyB0byBzZWxlY3RpdmVseSB2aXNpdCB0aGUgc3BlY2lmaWVkIG5vZGUuXG4gICAgYXN0LnZpc2l0KHRoaXMsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LmxlZnQsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LnJpZ2h0LCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5jb25kaXRpb24sIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LnRydWVFeHAsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LmZhbHNlRXhwLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5leHAsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGlmIChhc3QudGFyZ2V0KSB7XG4gICAgICB0aGlzLnZpc2l0KGFzdC50YXJnZXQsIGNvbnRleHQpO1xuICAgIH1cbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdEltcGxpY2l0UmVjZWl2ZXIoYXN0OiBJbXBsaWNpdFJlY2VpdmVyLCBjb250ZXh0OiBhbnkpOiBhbnkge31cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbiwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRLZXllZFJlYWQoYXN0OiBLZXllZFJlYWQsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3Qub2JqLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC5rZXksIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52aXNpdChhc3Qub2JqLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC5rZXksIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXQoYXN0LnZhbHVlLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFByZWZpeE5vdChhc3Q6IFByZWZpeE5vdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5leHByZXNzaW9uLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdE5vbk51bGxBc3NlcnQoYXN0OiBOb25OdWxsQXNzZXJ0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LmV4cHJlc3Npb24sIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0KGFzdC52YWx1ZSwgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0KGFzdC5yZWNlaXZlciwgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXQoYXN0LnJlY2VpdmVyLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICAvLyBUaGlzIGlzIG5vdCBwYXJ0IG9mIHRoZSBBc3RWaXNpdG9yIGludGVyZmFjZSwganVzdCBhIGhlbHBlciBtZXRob2RcbiAgdmlzaXRBbGwoYXN0czogQVNUW10sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgZm9yIChjb25zdCBhc3Qgb2YgYXN0cykge1xuICAgICAgdGhpcy52aXNpdChhc3QsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXN0VHJhbnNmb3JtZXIgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlciwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbiwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEludGVycG9sYXRpb24oYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Quc3RyaW5ncywgdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpKTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnZhbHVlKTtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUHJvcGVydHlSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpLCBhc3QubmFtZSk7XG4gIH1cblxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUHJvcGVydHlXcml0ZShcbiAgICAgICAgYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lLCBhc3QudmFsdWUudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFNhZmVQcm9wZXJ0eVJlYWQoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lKTtcbiAgfVxuXG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBNZXRob2RDYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBTYWZlTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFNhZmVNZXRob2RDYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb25DYWxsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC50YXJnZXQhLnZpc2l0KHRoaXMpLCB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBMaXRlcmFsTWFwLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTGl0ZXJhbE1hcChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5rZXlzLCB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMpKTtcbiAgfVxuXG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgQmluYXJ5KFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5vcGVyYXRpb24sIGFzdC5sZWZ0LnZpc2l0KHRoaXMpLCBhc3QucmlnaHQudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBQcmVmaXhOb3QoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdE5vbk51bGxBc3NlcnQoYXN0OiBOb25OdWxsQXNzZXJ0LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTm9uTnVsbEFzc2VydChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5jb25kaXRpb24udmlzaXQodGhpcyksIGFzdC50cnVlRXhwLnZpc2l0KHRoaXMpLFxuICAgICAgICBhc3QuZmFsc2VFeHAudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUGlwZShcbiAgICAgICAgYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBhc3QuZXhwLnZpc2l0KHRoaXMpLCBhc3QubmFtZSwgdGhpcy52aXNpdEFsbChhc3QuYXJncyksXG4gICAgICAgIGFzdC5uYW1lU3Bhbik7XG4gIH1cblxuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEtleWVkUmVhZChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5vYmoudmlzaXQodGhpcyksIGFzdC5rZXkudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEtleWVkV3JpdGUoXG4gICAgICAgIGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0Lm9iai52aXNpdCh0aGlzKSwgYXN0LmtleS52aXNpdCh0aGlzKSwgYXN0LnZhbHVlLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0QWxsKGFzdHM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgcmVzW2ldID0gYXN0c1tpXS52aXNpdCh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IENoYWluKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpKTtcbiAgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFF1b3RlKFxuICAgICAgICBhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5wcmVmaXgsIGFzdC51bmludGVycHJldGVkRXhwcmVzc2lvbiwgYXN0LmxvY2F0aW9uKTtcbiAgfVxufVxuXG4vLyBBIHRyYW5zZm9ybWVyIHRoYXQgb25seSBjcmVhdGVzIG5ldyBub2RlcyBpZiB0aGUgdHJhbnNmb3JtZXIgbWFrZXMgYSBjaGFuZ2Ugb3Jcbi8vIGEgY2hhbmdlIGlzIG1hZGUgYSBjaGlsZCBub2RlLlxuZXhwb3J0IGNsYXNzIEFzdE1lbW9yeUVmZmljaWVudFRyYW5zZm9ybWVyIGltcGxlbWVudHMgQXN0VmlzaXRvciB7XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IEludGVycG9sYXRpb24sIGNvbnRleHQ6IGFueSk6IEludGVycG9sYXRpb24ge1xuICAgIGNvbnN0IGV4cHJlc3Npb25zID0gdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpO1xuICAgIGlmIChleHByZXNzaW9ucyAhPT0gYXN0LmV4cHJlc3Npb25zKVxuICAgICAgcmV0dXJuIG5ldyBJbnRlcnBvbGF0aW9uKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnN0cmluZ3MsIGV4cHJlc3Npb25zKTtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBQcm9wZXJ0eVJlYWQsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHlSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgcmVjZWl2ZXIsIGFzdC5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlXcml0ZShhc3Q6IFByb3BlcnR5V3JpdGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgY29uc3QgdmFsdWUgPSBhc3QudmFsdWUudmlzaXQodGhpcyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIgfHwgdmFsdWUgIT09IGFzdC52YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdyaXRlKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgcmVjZWl2ZXIsIGFzdC5uYW1lLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBTYWZlUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IHJlY2VpdmVyID0gYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpO1xuICAgIGlmIChyZWNlaXZlciAhPT0gYXN0LnJlY2VpdmVyKSB7XG4gICAgICByZXR1cm4gbmV3IFNhZmVQcm9wZXJ0eVJlYWQoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCByZWNlaXZlciwgYXN0Lm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKHJlY2VpdmVyICE9PSBhc3QucmVjZWl2ZXIgfHwgYXJncyAhPT0gYXN0LmFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgTWV0aG9kQ2FsbChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIHJlY2VpdmVyLCBhc3QubmFtZSwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgY29uc3QgYXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpO1xuICAgIGlmIChyZWNlaXZlciAhPT0gYXN0LnJlY2VpdmVyIHx8IGFyZ3MgIT09IGFzdC5hcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IFNhZmVNZXRob2RDYWxsKGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgcmVjZWl2ZXIsIGFzdC5uYW1lLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IHRhcmdldCA9IGFzdC50YXJnZXQgJiYgYXN0LnRhcmdldC52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKHRhcmdldCAhPT0gYXN0LnRhcmdldCB8fCBhcmdzICE9PSBhc3QuYXJncykge1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNhbGwoYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCB0YXJnZXQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucyk7XG4gICAgaWYgKGV4cHJlc3Npb25zICE9PSBhc3QuZXhwcmVzc2lvbnMpIHtcbiAgICAgIHJldHVybiBuZXcgTGl0ZXJhbEFycmF5KGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgZXhwcmVzc2lvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMpO1xuICAgIGlmICh2YWx1ZXMgIT09IGFzdC52YWx1ZXMpIHtcbiAgICAgIHJldHVybiBuZXcgTGl0ZXJhbE1hcChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5rZXlzLCB2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRCaW5hcnkoYXN0OiBCaW5hcnksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgbGVmdCA9IGFzdC5sZWZ0LnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IHJpZ2h0ID0gYXN0LnJpZ2h0LnZpc2l0KHRoaXMpO1xuICAgIGlmIChsZWZ0ICE9PSBhc3QubGVmdCB8fCByaWdodCAhPT0gYXN0LnJpZ2h0KSB7XG4gICAgICByZXR1cm4gbmV3IEJpbmFyeShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5vcGVyYXRpb24sIGxlZnQsIHJpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0UHJlZml4Tm90KGFzdDogUHJlZml4Tm90LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSBhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzKTtcbiAgICBpZiAoZXhwcmVzc2lvbiAhPT0gYXN0LmV4cHJlc3Npb24pIHtcbiAgICAgIHJldHVybiBuZXcgUHJlZml4Tm90KGFzdC5zcGFuLCBhc3Quc291cmNlU3BhbiwgZXhwcmVzc2lvbik7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdE5vbk51bGxBc3NlcnQoYXN0OiBOb25OdWxsQXNzZXJ0LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSBhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzKTtcbiAgICBpZiAoZXhwcmVzc2lvbiAhPT0gYXN0LmV4cHJlc3Npb24pIHtcbiAgICAgIHJldHVybiBuZXcgTm9uTnVsbEFzc2VydChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGV4cHJlc3Npb24pO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRDb25kaXRpb25hbChhc3Q6IENvbmRpdGlvbmFsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGFzdC5jb25kaXRpb24udmlzaXQodGhpcyk7XG4gICAgY29uc3QgdHJ1ZUV4cCA9IGFzdC50cnVlRXhwLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGZhbHNlRXhwID0gYXN0LmZhbHNlRXhwLnZpc2l0KHRoaXMpO1xuICAgIGlmIChjb25kaXRpb24gIT09IGFzdC5jb25kaXRpb24gfHwgdHJ1ZUV4cCAhPT0gYXN0LnRydWVFeHAgfHwgZmFsc2VFeHAgIT09IGFzdC5mYWxzZUV4cCkge1xuICAgICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbChhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGNvbmRpdGlvbiwgdHJ1ZUV4cCwgZmFsc2VFeHApO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwID0gYXN0LmV4cC52aXNpdCh0aGlzKTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgaWYgKGV4cCAhPT0gYXN0LmV4cCB8fCBhcmdzICE9PSBhc3QuYXJncykge1xuICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nUGlwZShhc3Quc3BhbiwgYXN0LnNvdXJjZVNwYW4sIGV4cCwgYXN0Lm5hbWUsIGFyZ3MsIGFzdC5uYW1lU3Bhbik7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBvYmogPSBhc3Qub2JqLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGtleSA9IGFzdC5rZXkudmlzaXQodGhpcyk7XG4gICAgaWYgKG9iaiAhPT0gYXN0Lm9iaiB8fCBrZXkgIT09IGFzdC5rZXkpIHtcbiAgICAgIHJldHVybiBuZXcgS2V5ZWRSZWFkKGFzdC5zcGFuLCBhc3Quc291cmNlU3Bhbiwgb2JqLCBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICBjb25zdCBvYmogPSBhc3Qub2JqLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGtleSA9IGFzdC5rZXkudmlzaXQodGhpcyk7XG4gICAgY29uc3QgdmFsdWUgPSBhc3QudmFsdWUudmlzaXQodGhpcyk7XG4gICAgaWYgKG9iaiAhPT0gYXN0Lm9iaiB8fCBrZXkgIT09IGFzdC5rZXkgfHwgdmFsdWUgIT09IGFzdC52YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBLZXllZFdyaXRlKGFzdC5zcGFuLCBhc3Quc291cmNlU3Bhbiwgb2JqLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0QWxsKGFzdHM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGxldCBtb2RpZmllZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3Qgb3JpZ2luYWwgPSBhc3RzW2ldO1xuICAgICAgY29uc3QgdmFsdWUgPSBvcmlnaW5hbC52aXNpdCh0aGlzKTtcbiAgICAgIHJlc1tpXSA9IHZhbHVlO1xuICAgICAgbW9kaWZpZWQgPSBtb2RpZmllZCB8fCB2YWx1ZSAhPT0gb3JpZ2luYWw7XG4gICAgfVxuICAgIHJldHVybiBtb2RpZmllZCA/IHJlcyA6IGFzdHM7XG4gIH1cblxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4sIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucyk7XG4gICAgaWYgKGV4cHJlc3Npb25zICE9PSBhc3QuZXhwcmVzc2lvbnMpIHtcbiAgICAgIHJldHVybiBuZXcgQ2hhaW4oYXN0LnNwYW4sIGFzdC5zb3VyY2VTcGFuLCBleHByZXNzaW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxufVxuXG4vLyBCaW5kaW5nc1xuXG5leHBvcnQgY2xhc3MgUGFyc2VkUHJvcGVydHkge1xuICBwdWJsaWMgcmVhZG9ubHkgaXNMaXRlcmFsOiBib29sZWFuO1xuICBwdWJsaWMgcmVhZG9ubHkgaXNBbmltYXRpb246IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZXhwcmVzc2lvbjogQVNUV2l0aFNvdXJjZSwgcHVibGljIHR5cGU6IFBhcnNlZFByb3BlcnR5VHlwZSxcbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyB2YWx1ZVNwYW4/OiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICB0aGlzLmlzTGl0ZXJhbCA9IHRoaXMudHlwZSA9PT0gUGFyc2VkUHJvcGVydHlUeXBlLkxJVEVSQUxfQVRUUjtcbiAgICB0aGlzLmlzQW5pbWF0aW9uID0gdGhpcy50eXBlID09PSBQYXJzZWRQcm9wZXJ0eVR5cGUuQU5JTUFUSU9OO1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIFBhcnNlZFByb3BlcnR5VHlwZSB7XG4gIERFRkFVTFQsXG4gIExJVEVSQUxfQVRUUixcbiAgQU5JTUFUSU9OXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFBhcnNlZEV2ZW50VHlwZSB7XG4gIC8vIERPTSBvciBEaXJlY3RpdmUgZXZlbnRcbiAgUmVndWxhcixcbiAgLy8gQW5pbWF0aW9uIHNwZWNpZmljIGV2ZW50XG4gIEFuaW1hdGlvbixcbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlZEV2ZW50IHtcbiAgLy8gUmVndWxhciBldmVudHMgaGF2ZSBhIHRhcmdldFxuICAvLyBBbmltYXRpb24gZXZlbnRzIGhhdmUgYSBwaGFzZVxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0YXJnZXRPclBoYXNlOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBQYXJzZWRFdmVudFR5cGUsXG4gICAgICBwdWJsaWMgaGFuZGxlcjogQVNUV2l0aFNvdXJjZSwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyBoYW5kbGVyU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxufVxuXG4vKipcbiAqIFBhcnNlZFZhcmlhYmxlIHJlcHJlc2VudHMgYSB2YXJpYWJsZSBkZWNsYXJhdGlvbiBpbiBhIG1pY3Jvc3ludGF4IGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQYXJzZWRWYXJpYWJsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgcmVhZG9ubHkga2V5U3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlU3Bhbj86IFBhcnNlU291cmNlU3Bhbikge31cbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gQmluZGluZ1R5cGUge1xuICAvLyBBIHJlZ3VsYXIgYmluZGluZyB0byBhIHByb3BlcnR5IChlLmcuIGBbcHJvcGVydHldPVwiZXhwcmVzc2lvblwiYCkuXG4gIFByb3BlcnR5LFxuICAvLyBBIGJpbmRpbmcgdG8gYW4gZWxlbWVudCBhdHRyaWJ1dGUgKGUuZy4gYFthdHRyLm5hbWVdPVwiZXhwcmVzc2lvblwiYCkuXG4gIEF0dHJpYnV0ZSxcbiAgLy8gQSBiaW5kaW5nIHRvIGEgQ1NTIGNsYXNzIChlLmcuIGBbY2xhc3MubmFtZV09XCJjb25kaXRpb25cImApLlxuICBDbGFzcyxcbiAgLy8gQSBiaW5kaW5nIHRvIGEgc3R5bGUgcnVsZSAoZS5nLiBgW3N0eWxlLnJ1bGVdPVwiZXhwcmVzc2lvblwiYCkuXG4gIFN0eWxlLFxuICAvLyBBIGJpbmRpbmcgdG8gYW4gYW5pbWF0aW9uIHJlZmVyZW5jZSAoZS5nLiBgW2FuaW1hdGUua2V5XT1cImV4cHJlc3Npb25cImApLlxuICBBbmltYXRpb24sXG59XG5cbmV4cG9ydCBjbGFzcyBCb3VuZEVsZW1lbnRQcm9wZXJ0eSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHR5cGU6IEJpbmRpbmdUeXBlLCBwdWJsaWMgc2VjdXJpdHlDb250ZXh0OiBTZWN1cml0eUNvbnRleHQsXG4gICAgICBwdWJsaWMgdmFsdWU6IEFTVFdpdGhTb3VyY2UsIHB1YmxpYyB1bml0OiBzdHJpbmd8bnVsbCwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyB2YWx1ZVNwYW4/OiBQYXJzZVNvdXJjZVNwYW4pIHt9XG59XG4iXX0=