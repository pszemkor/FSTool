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
        define("@angular/compiler-cli/ngcc/src/host/esm5_host", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/ngtsc/reflection", "@angular/compiler-cli/ngcc/src/utils", "@angular/compiler-cli/ngcc/src/host/esm2015_host", "@angular/compiler-cli/ngcc/src/host/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    var reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/utils");
    var esm2015_host_1 = require("@angular/compiler-cli/ngcc/src/host/esm2015_host");
    var utils_2 = require("@angular/compiler-cli/ngcc/src/host/utils");
    /**
     * ESM5 packages contain ECMAScript IIFE functions that act like classes. For example:
     *
     * ```
     * var CommonModule = (function () {
     *  function CommonModule() {
     *  }
     *  CommonModule.decorators = [ ... ];
     * ```
     *
     * * "Classes" are decorated if they have a static property called `decorators`.
     * * Members are decorated if there is a matching key on a static property
     *   called `propDecorators`.
     * * Constructor parameters decorators are found on an object returned from
     *   a static method called `ctorParameters`.
     *
     */
    var Esm5ReflectionHost = /** @class */ (function (_super) {
        tslib_1.__extends(Esm5ReflectionHost, _super);
        function Esm5ReflectionHost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Determines whether the given declaration, which should be a "class", has a base "class".
         *
         * In ES5 code, we need to determine if the IIFE wrapper takes a `_super` parameter .
         *
         * @param clazz a `ClassDeclaration` representing the class over which to reflect.
         */
        Esm5ReflectionHost.prototype.hasBaseClass = function (clazz) {
            var classSymbol = this.getClassSymbol(clazz);
            if (classSymbol === undefined) {
                return false;
            }
            var iifeBody = getIifeBody(classSymbol.declaration.valueDeclaration);
            if (!iifeBody)
                return false;
            var iife = iifeBody.parent;
            if (!iife || !ts.isFunctionExpression(iife))
                return false;
            return iife.parameters.length === 1 && isSuperIdentifier(iife.parameters[0].name);
        };
        Esm5ReflectionHost.prototype.getBaseClassExpression = function (clazz) {
            var classSymbol = this.getClassSymbol(clazz);
            if (classSymbol === undefined) {
                return null;
            }
            var iifeBody = getIifeBody(classSymbol.declaration.valueDeclaration);
            if (!iifeBody)
                return null;
            var iife = iifeBody.parent;
            if (!iife || !ts.isFunctionExpression(iife))
                return null;
            if (iife.parameters.length !== 1 || !isSuperIdentifier(iife.parameters[0].name)) {
                return null;
            }
            if (!ts.isCallExpression(iife.parent)) {
                return null;
            }
            return iife.parent.arguments[0];
        };
        Esm5ReflectionHost.prototype.getInternalNameOfClass = function (clazz) {
            var innerClass = this.getInnerFunctionDeclarationFromClassDeclaration(clazz);
            if (innerClass === undefined) {
                throw new Error("getInternalNameOfClass() called on a non-ES5 class: expected " + clazz.name.text + " to have an inner class declaration");
            }
            if (innerClass.name === undefined) {
                throw new Error("getInternalNameOfClass() called on a class with an anonymous inner declaration: expected a name on:\n" + innerClass.getText());
            }
            return innerClass.name;
        };
        Esm5ReflectionHost.prototype.getAdjacentNameOfClass = function (clazz) {
            return this.getInternalNameOfClass(clazz);
        };
        Esm5ReflectionHost.prototype.getEndOfClass = function (classSymbol) {
            var iifeBody = getIifeBody(classSymbol.declaration.valueDeclaration);
            if (!iifeBody) {
                throw new Error("Compiled class declaration is not inside an IIFE: " + classSymbol.name + " in " + classSymbol.declaration.valueDeclaration.getSourceFile().fileName);
            }
            var returnStatementIndex = iifeBody.statements.findIndex(ts.isReturnStatement);
            if (returnStatementIndex === -1) {
                throw new Error("Compiled class wrapper IIFE does not have a return statement: " + classSymbol.name + " in " + classSymbol.declaration.valueDeclaration.getSourceFile().fileName);
            }
            // Return the statement before the IIFE return statement
            return iifeBody.statements[returnStatementIndex - 1];
        };
        /**
         * In ES5, the implementation of a class is a function expression that is hidden inside an IIFE,
         * whose value is assigned to a variable (which represents the class to the rest of the program).
         * So we might need to dig around to get hold of the "class" declaration.
         *
         * This method extracts a `NgccClassSymbol` if `declaration` is the outer variable which is
         * assigned the result of the IIFE. Otherwise, undefined is returned.
         *
         * @param declaration the declaration whose symbol we are finding.
         * @returns the symbol for the node or `undefined` if it is not a "class" or has no symbol.
         */
        Esm5ReflectionHost.prototype.getClassSymbolFromOuterDeclaration = function (declaration) {
            var classSymbol = _super.prototype.getClassSymbolFromOuterDeclaration.call(this, declaration);
            if (classSymbol !== undefined) {
                return classSymbol;
            }
            if (!reflection_1.isNamedVariableDeclaration(declaration)) {
                return undefined;
            }
            var innerDeclaration = this.getInnerFunctionDeclarationFromClassDeclaration(declaration);
            if (innerDeclaration === undefined || !utils_1.hasNameIdentifier(innerDeclaration)) {
                return undefined;
            }
            return this.createClassSymbol(declaration, innerDeclaration);
        };
        /**
         * In ES5, the implementation of a class is a function expression that is hidden inside an IIFE,
         * whose value is assigned to a variable (which represents the class to the rest of the program).
         * So we might need to dig around to get hold of the "class" declaration.
         *
         * This method extracts a `NgccClassSymbol` if `declaration` is the function declaration inside
         * the IIFE. Otherwise, undefined is returned.
         *
         * @param declaration the declaration whose symbol we are finding.
         * @returns the symbol for the node or `undefined` if it is not a "class" or has no symbol.
         */
        Esm5ReflectionHost.prototype.getClassSymbolFromInnerDeclaration = function (declaration) {
            var classSymbol = _super.prototype.getClassSymbolFromInnerDeclaration.call(this, declaration);
            if (classSymbol !== undefined) {
                return classSymbol;
            }
            if (!ts.isFunctionDeclaration(declaration) || !utils_1.hasNameIdentifier(declaration)) {
                return undefined;
            }
            var outerDeclaration = getClassDeclarationFromInnerFunctionDeclaration(declaration);
            if (outerDeclaration === null || !utils_1.hasNameIdentifier(outerDeclaration)) {
                return undefined;
            }
            return this.createClassSymbol(outerDeclaration, declaration);
        };
        /**
         * Trace an identifier to its declaration, if possible.
         *
         * This method attempts to resolve the declaration of the given identifier, tracing back through
         * imports and re-exports until the original declaration statement is found. A `Declaration`
         * object is returned if the original declaration is found, or `null` is returned otherwise.
         *
         * In ES5, the implementation of a class is a function expression that is hidden inside an IIFE.
         * If we are looking for the declaration of the identifier of the inner function expression, we
         * will get hold of the outer "class" variable declaration and return its identifier instead. See
         * `getClassDeclarationFromInnerFunctionDeclaration()` for more info.
         *
         * @param id a TypeScript `ts.Identifier` to trace back to a declaration.
         *
         * @returns metadata about the `Declaration` if the original declaration is found, or `null`
         * otherwise.
         */
        Esm5ReflectionHost.prototype.getDeclarationOfIdentifier = function (id) {
            var superDeclaration = _super.prototype.getDeclarationOfIdentifier.call(this, id);
            if (superDeclaration === null) {
                var nonEmittedNorImportedTsHelperDeclaration = utils_1.getTsHelperFnFromIdentifier(id);
                if (nonEmittedNorImportedTsHelperDeclaration !== null) {
                    // No declaration could be found for this identifier and its name matches a known TS helper
                    // function. This can happen if a package is compiled with `noEmitHelpers: true` and
                    // `importHelpers: false` (the default). This is, for example, the case with
                    // `@nativescript/angular@9.0.0-next-2019-11-12-155500-01`.
                    return {
                        expression: id,
                        known: nonEmittedNorImportedTsHelperDeclaration,
                        node: null,
                        viaModule: null,
                    };
                }
            }
            if (superDeclaration === null || superDeclaration.node === null ||
                superDeclaration.known !== null) {
                return superDeclaration;
            }
            // Get the identifier for the outer class node (if any).
            var outerClassNode = getClassDeclarationFromInnerFunctionDeclaration(superDeclaration.node);
            var declaration = outerClassNode !== null ?
                _super.prototype.getDeclarationOfIdentifier.call(this, outerClassNode.name) :
                superDeclaration;
            if (declaration === null || declaration.node === null || declaration.known !== null) {
                return declaration;
            }
            if (!ts.isVariableDeclaration(declaration.node) || declaration.node.initializer !== undefined ||
                // VariableDeclaration => VariableDeclarationList => VariableStatement => IIFE Block
                !ts.isBlock(declaration.node.parent.parent.parent)) {
                return declaration;
            }
            // We might have an alias to another variable declaration.
            // Search the containing iife body for it.
            var block = declaration.node.parent.parent.parent;
            var aliasSymbol = this.checker.getSymbolAtLocation(declaration.node.name);
            for (var i = 0; i < block.statements.length; i++) {
                var statement = block.statements[i];
                // Looking for statement that looks like: `AliasedVariable = OriginalVariable;`
                if (esm2015_host_1.isAssignmentStatement(statement) && ts.isIdentifier(statement.expression.left) &&
                    ts.isIdentifier(statement.expression.right) &&
                    this.checker.getSymbolAtLocation(statement.expression.left) === aliasSymbol) {
                    return this.getDeclarationOfIdentifier(statement.expression.right);
                }
            }
            return declaration;
        };
        /**
         * Parse a function declaration to find the relevant metadata about it.
         *
         * In ESM5 we need to do special work with optional arguments to the function, since they get
         * their own initializer statement that needs to be parsed and then not included in the "body"
         * statements of the function.
         *
         * @param node the function declaration to parse.
         * @returns an object containing the node, statements and parameters of the function.
         */
        Esm5ReflectionHost.prototype.getDefinitionOfFunction = function (node) {
            if (!ts.isFunctionDeclaration(node) && !ts.isMethodDeclaration(node) &&
                !ts.isFunctionExpression(node)) {
                return null;
            }
            var parameters = node.parameters.map(function (p) { return ({ name: utils_1.getNameText(p.name), node: p, initializer: null }); });
            var lookingForParamInitializers = true;
            var statements = node.body && node.body.statements.filter(function (s) {
                lookingForParamInitializers =
                    lookingForParamInitializers && reflectParamInitializer(s, parameters);
                // If we are no longer looking for parameter initializers then we include this statement
                return !lookingForParamInitializers;
            });
            return { node: node, body: statements || null, parameters: parameters };
        };
        Esm5ReflectionHost.prototype.detectKnownDeclaration = function (decl) {
            decl = _super.prototype.detectKnownDeclaration.call(this, decl);
            if (decl !== null && decl.known === null && decl.node !== null) {
                decl.known = utils_1.getTsHelperFnFromDeclaration(decl.node);
            }
            return decl;
        };
        ///////////// Protected Helpers /////////////
        /**
         * Get the inner function declaration of an ES5-style class.
         *
         * In ES5, the implementation of a class is a function expression that is hidden inside an IIFE
         * and returned to be assigned to a variable outside the IIFE, which is what the rest of the
         * program interacts with.
         *
         * Given the outer variable declaration, we want to get to the inner function declaration.
         *
         * @param decl a declaration node that could be the variable expression outside an ES5 class IIFE.
         * @param checker the TS program TypeChecker
         * @returns the inner function declaration or `undefined` if it is not a "class".
         */
        Esm5ReflectionHost.prototype.getInnerFunctionDeclarationFromClassDeclaration = function (decl) {
            // Extract the IIFE body (if any).
            var iifeBody = getIifeBody(decl);
            if (!iifeBody)
                return undefined;
            // Extract the function declaration from inside the IIFE.
            var functionDeclaration = iifeBody.statements.find(ts.isFunctionDeclaration);
            if (!functionDeclaration)
                return undefined;
            // Extract the return identifier of the IIFE.
            var returnIdentifier = getReturnIdentifier(iifeBody);
            var returnIdentifierSymbol = returnIdentifier && this.checker.getSymbolAtLocation(returnIdentifier);
            if (!returnIdentifierSymbol)
                return undefined;
            // Verify that the inner function is returned.
            if (returnIdentifierSymbol.valueDeclaration !== functionDeclaration)
                return undefined;
            return functionDeclaration;
        };
        /**
         * Find the declarations of the constructor parameters of a class identified by its symbol.
         *
         * In ESM5, there is no "class" so the constructor that we want is actually the inner function
         * declaration inside the IIFE, whose return value is assigned to the outer variable declaration
         * (that represents the class to the rest of the program).
         *
         * @param classSymbol the symbol of the class (i.e. the outer variable declaration) whose
         * parameters we want to find.
         * @returns an array of `ts.ParameterDeclaration` objects representing each of the parameters in
         * the class's constructor or `null` if there is no constructor.
         */
        Esm5ReflectionHost.prototype.getConstructorParameterDeclarations = function (classSymbol) {
            var constructor = classSymbol.implementation.valueDeclaration;
            if (!ts.isFunctionDeclaration(constructor))
                return null;
            if (constructor.parameters.length > 0) {
                return Array.from(constructor.parameters);
            }
            if (isSynthesizedConstructor(constructor)) {
                return null;
            }
            return [];
        };
        /**
         * Get the parameter type and decorators for the constructor of a class,
         * where the information is stored on a static method of the class.
         *
         * In this case the decorators are stored in the body of a method
         * (`ctorParatemers`) attached to the constructor function.
         *
         * Note that unlike ESM2015 this is a function expression rather than an arrow
         * function:
         *
         * ```
         * SomeDirective.ctorParameters = function() { return [
         *   { type: ViewContainerRef, },
         *   { type: TemplateRef, },
         *   { type: IterableDiffers, },
         *   { type: undefined, decorators: [{ type: Inject, args: [INJECTED_TOKEN,] },] },
         * ]; };
         * ```
         *
         * @param paramDecoratorsProperty the property that holds the parameter info we want to get.
         * @returns an array of objects containing the type and decorators for each parameter.
         */
        Esm5ReflectionHost.prototype.getParamInfoFromStaticProperty = function (paramDecoratorsProperty) {
            var _this = this;
            var paramDecorators = esm2015_host_1.getPropertyValueFromSymbol(paramDecoratorsProperty);
            // The decorators array may be wrapped in a function. If so unwrap it.
            var returnStatement = getReturnStatement(paramDecorators);
            var expression = returnStatement ? returnStatement.expression : paramDecorators;
            if (expression && ts.isArrayLiteralExpression(expression)) {
                var elements = expression.elements;
                return elements.map(reflectArrayElement).map(function (paramInfo) {
                    var typeExpression = paramInfo && paramInfo.has('type') ? paramInfo.get('type') : null;
                    var decoratorInfo = paramInfo && paramInfo.has('decorators') ? paramInfo.get('decorators') : null;
                    var decorators = decoratorInfo && _this.reflectDecorators(decoratorInfo);
                    return { typeExpression: typeExpression, decorators: decorators };
                });
            }
            else if (paramDecorators !== undefined) {
                this.logger.warn('Invalid constructor parameter decorator in ' + paramDecorators.getSourceFile().fileName +
                    ':\n', paramDecorators.getText());
            }
            return null;
        };
        /**
         * Reflect over a symbol and extract the member information, combining it with the
         * provided decorator information, and whether it is a static member.
         *
         * If a class member uses accessors (e.g getters and/or setters) then it gets downleveled
         * in ES5 to a single `Object.defineProperty()` call. In that case we must parse this
         * call to extract the one or two ClassMember objects that represent the accessors.
         *
         * @param symbol the symbol for the member to reflect over.
         * @param decorators an array of decorators associated with the member.
         * @param isStatic true if this member is static, false if it is an instance property.
         * @returns the reflected member information, or null if the symbol is not a member.
         */
        Esm5ReflectionHost.prototype.reflectMembers = function (symbol, decorators, isStatic) {
            var node = symbol.valueDeclaration || symbol.declarations && symbol.declarations[0];
            var propertyDefinition = node && getPropertyDefinition(node);
            if (propertyDefinition) {
                var members_1 = [];
                if (propertyDefinition.setter) {
                    members_1.push({
                        node: node,
                        implementation: propertyDefinition.setter,
                        kind: reflection_1.ClassMemberKind.Setter,
                        type: null,
                        name: symbol.name,
                        nameNode: null,
                        value: null,
                        isStatic: isStatic || false,
                        decorators: decorators || [],
                    });
                    // Prevent attaching the decorators to a potential getter. In ES5, we can't tell where the
                    // decorators were originally attached to, however we only want to attach them to a single
                    // `ClassMember` as otherwise ngtsc would handle the same decorators twice.
                    decorators = undefined;
                }
                if (propertyDefinition.getter) {
                    members_1.push({
                        node: node,
                        implementation: propertyDefinition.getter,
                        kind: reflection_1.ClassMemberKind.Getter,
                        type: null,
                        name: symbol.name,
                        nameNode: null,
                        value: null,
                        isStatic: isStatic || false,
                        decorators: decorators || [],
                    });
                }
                return members_1;
            }
            var members = _super.prototype.reflectMembers.call(this, symbol, decorators, isStatic);
            members && members.forEach(function (member) {
                if (member && member.kind === reflection_1.ClassMemberKind.Method && member.isStatic && member.node &&
                    ts.isPropertyAccessExpression(member.node) && member.node.parent &&
                    ts.isBinaryExpression(member.node.parent) &&
                    ts.isFunctionExpression(member.node.parent.right)) {
                    // Recompute the implementation for this member:
                    // ES5 static methods are variable declarations so the declaration is actually the
                    // initializer of the variable assignment
                    member.implementation = member.node.parent.right;
                }
            });
            return members;
        };
        /**
         * Find statements related to the given class that may contain calls to a helper.
         *
         * In ESM5 code the helper calls are hidden inside the class's IIFE.
         *
         * @param classSymbol the class whose helper calls we are interested in. We expect this symbol
         * to reference the inner identifier inside the IIFE.
         * @returns an array of statements that may contain helper calls.
         */
        Esm5ReflectionHost.prototype.getStatementsForClass = function (classSymbol) {
            var classDeclarationParent = classSymbol.implementation.valueDeclaration.parent;
            return ts.isBlock(classDeclarationParent) ? Array.from(classDeclarationParent.statements) : [];
        };
        /**
         * Try to retrieve the symbol of a static property on a class.
         *
         * In ES5, a static property can either be set on the inner function declaration inside the class'
         * IIFE, or it can be set on the outer variable declaration. Therefore, the ES5 host checks both
         * places, first looking up the property on the inner symbol, and if the property is not found it
         * will fall back to looking up the property on the outer symbol.
         *
         * @param symbol the class whose property we are interested in.
         * @param propertyName the name of static property.
         * @returns the symbol if it is found or `undefined` if not.
         */
        Esm5ReflectionHost.prototype.getStaticProperty = function (symbol, propertyName) {
            // First lets see if the static property can be resolved from the inner class symbol.
            var prop = symbol.implementation.exports && symbol.implementation.exports.get(propertyName);
            if (prop !== undefined) {
                return prop;
            }
            // Otherwise, lookup the static properties on the outer class symbol.
            return symbol.declaration.exports && symbol.declaration.exports.get(propertyName);
        };
        return Esm5ReflectionHost;
    }(esm2015_host_1.Esm2015ReflectionHost));
    exports.Esm5ReflectionHost = Esm5ReflectionHost;
    /**
     * In ES5, getters and setters have been downleveled into call expressions of
     * `Object.defineProperty`, such as
     *
     * ```
     * Object.defineProperty(Clazz.prototype, "property", {
     *   get: function () {
     *       return 'value';
     *   },
     *   set: function (value) {
     *       this.value = value;
     *   },
     *   enumerable: true,
     *   configurable: true
     * });
     * ```
     *
     * This function inspects the given node to determine if it corresponds with such a call, and if so
     * extracts the `set` and `get` function expressions from the descriptor object, if they exist.
     *
     * @param node The node to obtain the property definition from.
     * @returns The property definition if the node corresponds with accessor, null otherwise.
     */
    function getPropertyDefinition(node) {
        if (!ts.isCallExpression(node))
            return null;
        var fn = node.expression;
        if (!ts.isPropertyAccessExpression(fn) || !ts.isIdentifier(fn.expression) ||
            fn.expression.text !== 'Object' || fn.name.text !== 'defineProperty')
            return null;
        var descriptor = node.arguments[2];
        if (!descriptor || !ts.isObjectLiteralExpression(descriptor))
            return null;
        return {
            setter: readPropertyFunctionExpression(descriptor, 'set'),
            getter: readPropertyFunctionExpression(descriptor, 'get'),
        };
    }
    function readPropertyFunctionExpression(object, name) {
        var property = object.properties.find(function (p) {
            return ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === name;
        });
        return property && ts.isFunctionExpression(property.initializer) && property.initializer || null;
    }
    /**
     * Get the actual (outer) declaration of a class.
     *
     * In ES5, the implementation of a class is a function expression that is hidden inside an IIFE and
     * returned to be assigned to a variable outside the IIFE, which is what the rest of the program
     * interacts with.
     *
     * Given the inner function declaration, we want to get to the declaration of the outer variable
     * that represents the class.
     *
     * @param node a node that could be the function expression inside an ES5 class IIFE.
     * @returns the outer variable declaration or `undefined` if it is not a "class".
     */
    function getClassDeclarationFromInnerFunctionDeclaration(node) {
        if (ts.isFunctionDeclaration(node)) {
            // It might be the function expression inside the IIFE. We need to go 5 levels up...
            // 1. IIFE body.
            var outerNode = node.parent;
            if (!outerNode || !ts.isBlock(outerNode))
                return null;
            // 2. IIFE function expression.
            outerNode = outerNode.parent;
            if (!outerNode || !ts.isFunctionExpression(outerNode))
                return null;
            // 3. IIFE call expression.
            outerNode = outerNode.parent;
            if (!outerNode || !ts.isCallExpression(outerNode))
                return null;
            // 4. Parenthesis around IIFE.
            outerNode = outerNode.parent;
            if (!outerNode || !ts.isParenthesizedExpression(outerNode))
                return null;
            // 5. Outer variable declaration.
            outerNode = outerNode.parent;
            if (!outerNode || !ts.isVariableDeclaration(outerNode))
                return null;
            // Finally, ensure that the variable declaration has a `name` identifier.
            return utils_1.hasNameIdentifier(outerNode) ? outerNode : null;
        }
        return null;
    }
    function getIifeBody(declaration) {
        if (!ts.isVariableDeclaration(declaration) || !declaration.initializer) {
            return undefined;
        }
        // Recognize a variable declaration of one of the forms:
        // - `var MyClass = (function () { ... }());`
        // - `var MyClass = MyClass_1 = (function () { ... }());`
        var parenthesizedCall = declaration.initializer;
        while (esm2015_host_1.isAssignment(parenthesizedCall)) {
            parenthesizedCall = parenthesizedCall.right;
        }
        var call = utils_2.stripParentheses(parenthesizedCall);
        if (!ts.isCallExpression(call)) {
            return undefined;
        }
        var fn = utils_2.stripParentheses(call.expression);
        if (!ts.isFunctionExpression(fn)) {
            return undefined;
        }
        return fn.body;
    }
    exports.getIifeBody = getIifeBody;
    function getReturnIdentifier(body) {
        var returnStatement = body.statements.find(ts.isReturnStatement);
        if (!returnStatement || !returnStatement.expression) {
            return undefined;
        }
        if (ts.isIdentifier(returnStatement.expression)) {
            return returnStatement.expression;
        }
        if (esm2015_host_1.isAssignment(returnStatement.expression) &&
            ts.isIdentifier(returnStatement.expression.left)) {
            return returnStatement.expression.left;
        }
        return undefined;
    }
    function getReturnStatement(declaration) {
        return declaration && ts.isFunctionExpression(declaration) ?
            declaration.body.statements.find(ts.isReturnStatement) :
            undefined;
    }
    function reflectArrayElement(element) {
        return ts.isObjectLiteralExpression(element) ? reflection_1.reflectObjectLiteral(element) : null;
    }
    /**
     * A constructor function may have been "synthesized" by TypeScript during JavaScript emit,
     * in the case no user-defined constructor exists and e.g. property initializers are used.
     * Those initializers need to be emitted into a constructor in JavaScript, so the TypeScript
     * compiler generates a synthetic constructor.
     *
     * We need to identify such constructors as ngcc needs to be able to tell if a class did
     * originally have a constructor in the TypeScript source. For ES5, we can not tell an
     * empty constructor apart from a synthesized constructor, but fortunately that does not
     * matter for the code generated by ngtsc.
     *
     * When a class has a superclass however, a synthesized constructor must not be considered
     * as a user-defined constructor as that prevents a base factory call from being created by
     * ngtsc, resulting in a factory function that does not inject the dependencies of the
     * superclass. Hence, we identify a default synthesized super call in the constructor body,
     * according to the structure that TypeScript's ES2015 to ES5 transformer generates in
     * https://github.com/Microsoft/TypeScript/blob/v3.2.2/src/compiler/transformers/es2015.ts#L1082-L1098
     *
     * @param constructor a constructor function to test
     * @returns true if the constructor appears to have been synthesized
     */
    function isSynthesizedConstructor(constructor) {
        if (!constructor.body)
            return false;
        var firstStatement = constructor.body.statements[0];
        if (!firstStatement)
            return false;
        return isSynthesizedSuperThisAssignment(firstStatement) ||
            isSynthesizedSuperReturnStatement(firstStatement);
    }
    /**
     * Identifies a synthesized super call of the form:
     *
     * ```
     * var _this = _super !== null && _super.apply(this, arguments) || this;
     * ```
     *
     * @param statement a statement that may be a synthesized super call
     * @returns true if the statement looks like a synthesized super call
     */
    function isSynthesizedSuperThisAssignment(statement) {
        if (!ts.isVariableStatement(statement))
            return false;
        var variableDeclarations = statement.declarationList.declarations;
        if (variableDeclarations.length !== 1)
            return false;
        var variableDeclaration = variableDeclarations[0];
        if (!ts.isIdentifier(variableDeclaration.name) ||
            !variableDeclaration.name.text.startsWith('_this'))
            return false;
        var initializer = variableDeclaration.initializer;
        if (!initializer)
            return false;
        return isSynthesizedDefaultSuperCall(initializer);
    }
    /**
     * Identifies a synthesized super call of the form:
     *
     * ```
     * return _super !== null && _super.apply(this, arguments) || this;
     * ```
     *
     * @param statement a statement that may be a synthesized super call
     * @returns true if the statement looks like a synthesized super call
     */
    function isSynthesizedSuperReturnStatement(statement) {
        if (!ts.isReturnStatement(statement))
            return false;
        var expression = statement.expression;
        if (!expression)
            return false;
        return isSynthesizedDefaultSuperCall(expression);
    }
    /**
     * Tests whether the expression is of the form:
     *
     * ```
     * _super !== null && _super.apply(this, arguments) || this;
     * ```
     *
     * This structure is generated by TypeScript when transforming ES2015 to ES5, see
     * https://github.com/Microsoft/TypeScript/blob/v3.2.2/src/compiler/transformers/es2015.ts#L1148-L1163
     *
     * @param expression an expression that may represent a default super call
     * @returns true if the expression corresponds with the above form
     */
    function isSynthesizedDefaultSuperCall(expression) {
        if (!isBinaryExpr(expression, ts.SyntaxKind.BarBarToken))
            return false;
        if (expression.right.kind !== ts.SyntaxKind.ThisKeyword)
            return false;
        var left = expression.left;
        if (!isBinaryExpr(left, ts.SyntaxKind.AmpersandAmpersandToken))
            return false;
        return isSuperNotNull(left.left) && isSuperApplyCall(left.right);
    }
    function isSuperNotNull(expression) {
        return isBinaryExpr(expression, ts.SyntaxKind.ExclamationEqualsEqualsToken) &&
            isSuperIdentifier(expression.left);
    }
    /**
     * Tests whether the expression is of the form
     *
     * ```
     * _super.apply(this, arguments)
     * ```
     *
     * @param expression an expression that may represent a default super call
     * @returns true if the expression corresponds with the above form
     */
    function isSuperApplyCall(expression) {
        if (!ts.isCallExpression(expression) || expression.arguments.length !== 2)
            return false;
        var targetFn = expression.expression;
        if (!ts.isPropertyAccessExpression(targetFn))
            return false;
        if (!isSuperIdentifier(targetFn.expression))
            return false;
        if (targetFn.name.text !== 'apply')
            return false;
        var thisArgument = expression.arguments[0];
        if (thisArgument.kind !== ts.SyntaxKind.ThisKeyword)
            return false;
        var argumentsArgument = expression.arguments[1];
        return ts.isIdentifier(argumentsArgument) && argumentsArgument.text === 'arguments';
    }
    function isBinaryExpr(expression, operator) {
        return ts.isBinaryExpression(expression) && expression.operatorToken.kind === operator;
    }
    function isSuperIdentifier(node) {
        // Verify that the identifier is prefixed with `_super`. We don't test for equivalence
        // as TypeScript may have suffixed the name, e.g. `_super_1` to avoid name conflicts.
        // Requiring only a prefix should be sufficiently accurate.
        return ts.isIdentifier(node) && node.text.startsWith('_super');
    }
    /**
     * Parse the statement to extract the ESM5 parameter initializer if there is one.
     * If one is found, add it to the appropriate parameter in the `parameters` collection.
     *
     * The form we are looking for is:
     *
     * ```
     * if (arg === void 0) { arg = initializer; }
     * ```
     *
     * @param statement a statement that may be initializing an optional parameter
     * @param parameters the collection of parameters that were found in the function definition
     * @returns true if the statement was a parameter initializer
     */
    function reflectParamInitializer(statement, parameters) {
        if (ts.isIfStatement(statement) && isUndefinedComparison(statement.expression) &&
            ts.isBlock(statement.thenStatement) && statement.thenStatement.statements.length === 1) {
            var ifStatementComparison = statement.expression; // (arg === void 0)
            var thenStatement = statement.thenStatement.statements[0]; // arg = initializer;
            if (esm2015_host_1.isAssignmentStatement(thenStatement)) {
                var comparisonName_1 = ifStatementComparison.left.text;
                var assignmentName = thenStatement.expression.left.text;
                if (comparisonName_1 === assignmentName) {
                    var parameter = parameters.find(function (p) { return p.name === comparisonName_1; });
                    if (parameter) {
                        parameter.initializer = thenStatement.expression.right;
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function isUndefinedComparison(expression) {
        return ts.isBinaryExpression(expression) &&
            expression.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken &&
            ts.isVoidExpression(expression.right) && ts.isIdentifier(expression.left);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtNV9ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL25nY2Mvc3JjL2hvc3QvZXNtNV9ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUVILCtCQUFpQztJQUVqQyx5RUFBc007SUFDdE0sOERBQW1IO0lBRW5ILGlGQUFpSTtJQUVqSSxtRUFBeUM7SUFHekM7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSDtRQUF3Qyw4Q0FBcUI7UUFBN0Q7O1FBZ2VBLENBQUM7UUEvZEM7Ozs7OztXQU1HO1FBQ0gseUNBQVksR0FBWixVQUFhLEtBQXVCO1lBQ2xDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUM3QixPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUU1QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBRTFELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVELG1EQUFzQixHQUF0QixVQUF1QixLQUF1QjtZQUM1QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFD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QVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxnQkFBYyxFQUF6QixDQUF5QixDQUFDLENBQUM7b0JBQ2xFLElBQUksU0FBUyxFQUFFO3dCQUNiLFNBQVMsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7d0JBQ3ZELE9BQU8sSUFBSSxDQUFDO3FCQUNiO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFNBQVMscUJBQXFCLENBQUMsVUFBeUI7UUFFdEQsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBQ3BDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO1lBQ3ZFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7Q2xhc3NEZWNsYXJhdGlvbiwgQ2xhc3NNZW1iZXIsIENsYXNzTWVtYmVyS2luZCwgRGVjbGFyYXRpb24sIERlY29yYXRvciwgRnVuY3Rpb25EZWZpbml0aW9uLCBpc05hbWVkVmFyaWFibGVEZWNsYXJhdGlvbiwgUGFyYW1ldGVyLCByZWZsZWN0T2JqZWN0TGl0ZXJhbH0gZnJvbSAnLi4vLi4vLi4vc3JjL25ndHNjL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtnZXROYW1lVGV4dCwgZ2V0VHNIZWxwZXJGbkZyb21EZWNsYXJhdGlvbiwgZ2V0VHNIZWxwZXJGbkZyb21JZGVudGlmaWVyLCBoYXNOYW1lSWRlbnRpZmllcn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQge0VzbTIwMTVSZWZsZWN0aW9uSG9zdCwgZ2V0UHJvcGVydHlWYWx1ZUZyb21TeW1ib2wsIGlzQXNzaWdubWVudCwgaXNBc3NpZ25tZW50U3RhdGVtZW50LCBQYXJhbUluZm99IGZyb20gJy4vZXNtMjAxNV9ob3N0JztcbmltcG9ydCB7TmdjY0NsYXNzU3ltYm9sfSBmcm9tICcuL25nY2NfaG9zdCc7XG5pbXBvcnQge3N0cmlwUGFyZW50aGVzZXN9IGZyb20gJy4vdXRpbHMnO1xuXG5cbi8qKlxuICogRVNNNSBwYWNrYWdlcyBjb250YWluIEVDTUFTY3JpcHQgSUlGRSBmdW5jdGlvbnMgdGhhdCBhY3QgbGlrZSBjbGFzc2VzLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIHZhciBDb21tb25Nb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICogIGZ1bmN0aW9uIENvbW1vbk1vZHVsZSgpIHtcbiAqICB9XG4gKiAgQ29tbW9uTW9kdWxlLmRlY29yYXRvcnMgPSBbIC4uLiBdO1xuICogYGBgXG4gKlxuICogKiBcIkNsYXNzZXNcIiBhcmUgZGVjb3JhdGVkIGlmIHRoZXkgaGF2ZSBhIHN0YXRpYyBwcm9wZXJ0eSBjYWxsZWQgYGRlY29yYXRvcnNgLlxuICogKiBNZW1iZXJzIGFyZSBkZWNvcmF0ZWQgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBrZXkgb24gYSBzdGF0aWMgcHJvcGVydHlcbiAqICAgY2FsbGVkIGBwcm9wRGVjb3JhdG9yc2AuXG4gKiAqIENvbnN0cnVjdG9yIHBhcmFtZXRlcnMgZGVjb3JhdG9ycyBhcmUgZm91bmQgb24gYW4gb2JqZWN0IHJldHVybmVkIGZyb21cbiAqICAgYSBzdGF0aWMgbWV0aG9kIGNhbGxlZCBgY3RvclBhcmFtZXRlcnNgLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEVzbTVSZWZsZWN0aW9uSG9zdCBleHRlbmRzIEVzbTIwMTVSZWZsZWN0aW9uSG9zdCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGdpdmVuIGRlY2xhcmF0aW9uLCB3aGljaCBzaG91bGQgYmUgYSBcImNsYXNzXCIsIGhhcyBhIGJhc2UgXCJjbGFzc1wiLlxuICAgKlxuICAgKiBJbiBFUzUgY29kZSwgd2UgbmVlZCB0byBkZXRlcm1pbmUgaWYgdGhlIElJRkUgd3JhcHBlciB0YWtlcyBhIGBfc3VwZXJgIHBhcmFtZXRlciAuXG4gICAqXG4gICAqIEBwYXJhbSBjbGF6eiBhIGBDbGFzc0RlY2xhcmF0aW9uYCByZXByZXNlbnRpbmcgdGhlIGNsYXNzIG92ZXIgd2hpY2ggdG8gcmVmbGVjdC5cbiAgICovXG4gIGhhc0Jhc2VDbGFzcyhjbGF6ejogQ2xhc3NEZWNsYXJhdGlvbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNsYXNzU3ltYm9sID0gdGhpcy5nZXRDbGFzc1N5bWJvbChjbGF6eik7XG4gICAgaWYgKGNsYXNzU3ltYm9sID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpaWZlQm9keSA9IGdldElpZmVCb2R5KGNsYXNzU3ltYm9sLmRlY2xhcmF0aW9uLnZhbHVlRGVjbGFyYXRpb24pO1xuICAgIGlmICghaWlmZUJvZHkpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGlpZmUgPSBpaWZlQm9keS5wYXJlbnQ7XG4gICAgaWYgKCFpaWZlIHx8ICF0cy5pc0Z1bmN0aW9uRXhwcmVzc2lvbihpaWZlKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIGlpZmUucGFyYW1ldGVycy5sZW5ndGggPT09IDEgJiYgaXNTdXBlcklkZW50aWZpZXIoaWlmZS5wYXJhbWV0ZXJzWzBdLm5hbWUpO1xuICB9XG5cbiAgZ2V0QmFzZUNsYXNzRXhwcmVzc2lvbihjbGF6ejogQ2xhc3NEZWNsYXJhdGlvbik6IHRzLkV4cHJlc3Npb258bnVsbCB7XG4gICAgY29uc3QgY2xhc3NTeW1ib2wgPSB0aGlzLmdldENsYXNzU3ltYm9sKGNsYXp6KTtcbiAgICBpZiAoY2xhc3NTeW1ib2wgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaWlmZUJvZHkgPSBnZXRJaWZlQm9keShjbGFzc1N5bWJvbC5kZWNsYXJhdGlvbi52YWx1ZURlY2xhcmF0aW9uKTtcbiAgICBpZiAoIWlpZmVCb2R5KSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGlpZmUgPSBpaWZlQm9keS5wYXJlbnQ7XG4gICAgaWYgKCFpaWZlIHx8ICF0cy5pc0Z1bmN0aW9uRXhwcmVzc2lvbihpaWZlKSkgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoaWlmZS5wYXJhbWV0ZXJzLmxlbmd0aCAhPT0gMSB8fCAhaXNTdXBlcklkZW50aWZpZXIoaWlmZS5wYXJhbWV0ZXJzWzBdLm5hbWUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXRzLmlzQ2FsbEV4cHJlc3Npb24oaWlmZS5wYXJlbnQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gaWlmZS5wYXJlbnQuYXJndW1lbnRzWzBdO1xuICB9XG5cbiAgZ2V0SW50ZXJuYWxOYW1lT2ZDbGFzcyhjbGF6ejogQ2xhc3NEZWNsYXJhdGlvbik6IHRzLklkZW50aWZpZXIge1xuICAgIGNvbnN0IGlubmVyQ2xhc3MgPSB0aGlzLmdldElubmVyRnVuY3Rpb25EZWNsYXJhdGlvbkZyb21DbGFzc0RlY2xhcmF0aW9uKGNsYXp6KTtcbiAgICBpZiAoaW5uZXJDbGFzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGdldEludGVybmFsTmFtZU9mQ2xhc3MoKSBjYWxsZWQgb24gYSBub24tRVM1IGNsYXNzOiBleHBlY3RlZCAke1xuICAgICAgICAgIGNsYXp6Lm5hbWUudGV4dH0gdG8gaGF2ZSBhbiBpbm5lciBjbGFzcyBkZWNsYXJhdGlvbmApO1xuICAgIH1cbiAgICBpZiAoaW5uZXJDbGFzcy5uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgZ2V0SW50ZXJuYWxOYW1lT2ZDbGFzcygpIGNhbGxlZCBvbiBhIGNsYXNzIHdpdGggYW4gYW5vbnltb3VzIGlubmVyIGRlY2xhcmF0aW9uOiBleHBlY3RlZCBhIG5hbWUgb246XFxuJHtcbiAgICAgICAgICAgICAgaW5uZXJDbGFzcy5nZXRUZXh0KCl9YCk7XG4gICAgfVxuICAgIHJldHVybiBpbm5lckNsYXNzLm5hbWU7XG4gIH1cblxuICBnZXRBZGphY2VudE5hbWVPZkNsYXNzKGNsYXp6OiBDbGFzc0RlY2xhcmF0aW9uKTogdHMuSWRlbnRpZmllciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SW50ZXJuYWxOYW1lT2ZDbGFzcyhjbGF6eik7XG4gIH1cblxuICBnZXRFbmRPZkNsYXNzKGNsYXNzU3ltYm9sOiBOZ2NjQ2xhc3NTeW1ib2wpOiB0cy5Ob2RlIHtcbiAgICBjb25zdCBpaWZlQm9keSA9IGdldElpZmVCb2R5KGNsYXNzU3ltYm9sLmRlY2xhcmF0aW9uLnZhbHVlRGVjbGFyYXRpb24pO1xuICAgIGlmICghaWlmZUJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29tcGlsZWQgY2xhc3MgZGVjbGFyYXRpb24gaXMgbm90IGluc2lkZSBhbiBJSUZFOiAke2NsYXNzU3ltYm9sLm5hbWV9IGluICR7XG4gICAgICAgICAgY2xhc3NTeW1ib2wuZGVjbGFyYXRpb24udmFsdWVEZWNsYXJhdGlvbi5nZXRTb3VyY2VGaWxlKCkuZmlsZU5hbWV9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmV0dXJuU3RhdGVtZW50SW5kZXggPSBpaWZlQm9keS5zdGF0ZW1lbnRzLmZpbmRJbmRleCh0cy5pc1JldHVyblN0YXRlbWVudCk7XG4gICAgaWYgKHJldHVyblN0YXRlbWVudEluZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDb21waWxlZCBjbGFzcyB3cmFwcGVyIElJRkUgZG9lcyBub3QgaGF2ZSBhIHJldHVybiBzdGF0ZW1lbnQ6ICR7Y2xhc3NTeW1ib2wubmFtZX0gaW4gJHtcbiAgICAgICAgICAgICAgY2xhc3NTeW1ib2wuZGVjbGFyYXRpb24udmFsdWVEZWNsYXJhdGlvbi5nZXRTb3VyY2VGaWxlKCkuZmlsZU5hbWV9YCk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSBzdGF0ZW1lbnQgYmVmb3JlIHRoZSBJSUZFIHJldHVybiBzdGF0ZW1lbnRcbiAgICByZXR1cm4gaWlmZUJvZHkuc3RhdGVtZW50c1tyZXR1cm5TdGF0ZW1lbnRJbmRleCAtIDFdO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIEVTNSwgdGhlIGltcGxlbWVudGF0aW9uIG9mIGEgY2xhc3MgaXMgYSBmdW5jdGlvbiBleHByZXNzaW9uIHRoYXQgaXMgaGlkZGVuIGluc2lkZSBhbiBJSUZFLFxuICAgKiB3aG9zZSB2YWx1ZSBpcyBhc3NpZ25lZCB0byBhIHZhcmlhYmxlICh3aGljaCByZXByZXNlbnRzIHRoZSBjbGFzcyB0byB0aGUgcmVzdCBvZiB0aGUgcHJvZ3JhbSkuXG4gICAqIFNvIHdlIG1pZ2h0IG5lZWQgdG8gZGlnIGFyb3VuZCB0byBnZXQgaG9sZCBvZiB0aGUgXCJjbGFzc1wiIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHRyYWN0cyBhIGBOZ2NjQ2xhc3NTeW1ib2xgIGlmIGBkZWNsYXJhdGlvbmAgaXMgdGhlIG91dGVyIHZhcmlhYmxlIHdoaWNoIGlzXG4gICAqIGFzc2lnbmVkIHRoZSByZXN1bHQgb2YgdGhlIElJRkUuIE90aGVyd2lzZSwgdW5kZWZpbmVkIGlzIHJldHVybmVkLlxuICAgKlxuICAgKiBAcGFyYW0gZGVjbGFyYXRpb24gdGhlIGRlY2xhcmF0aW9uIHdob3NlIHN5bWJvbCB3ZSBhcmUgZmluZGluZy5cbiAgICogQHJldHVybnMgdGhlIHN5bWJvbCBmb3IgdGhlIG5vZGUgb3IgYHVuZGVmaW5lZGAgaWYgaXQgaXMgbm90IGEgXCJjbGFzc1wiIG9yIGhhcyBubyBzeW1ib2wuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2xhc3NTeW1ib2xGcm9tT3V0ZXJEZWNsYXJhdGlvbihkZWNsYXJhdGlvbjogdHMuTm9kZSk6IE5nY2NDbGFzc1N5bWJvbHx1bmRlZmluZWQge1xuICAgIGNvbnN0IGNsYXNzU3ltYm9sID0gc3VwZXIuZ2V0Q2xhc3NTeW1ib2xGcm9tT3V0ZXJEZWNsYXJhdGlvbihkZWNsYXJhdGlvbik7XG4gICAgaWYgKGNsYXNzU3ltYm9sICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjbGFzc1N5bWJvbDtcbiAgICB9XG5cbiAgICBpZiAoIWlzTmFtZWRWYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBpbm5lckRlY2xhcmF0aW9uID0gdGhpcy5nZXRJbm5lckZ1bmN0aW9uRGVjbGFyYXRpb25Gcm9tQ2xhc3NEZWNsYXJhdGlvbihkZWNsYXJhdGlvbik7XG4gICAgaWYgKGlubmVyRGVjbGFyYXRpb24gPT09IHVuZGVmaW5lZCB8fCAhaGFzTmFtZUlkZW50aWZpZXIoaW5uZXJEZWNsYXJhdGlvbikpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2xhc3NTeW1ib2woZGVjbGFyYXRpb24sIGlubmVyRGVjbGFyYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIEVTNSwgdGhlIGltcGxlbWVudGF0aW9uIG9mIGEgY2xhc3MgaXMgYSBmdW5jdGlvbiBleHByZXNzaW9uIHRoYXQgaXMgaGlkZGVuIGluc2lkZSBhbiBJSUZFLFxuICAgKiB3aG9zZSB2YWx1ZSBpcyBhc3NpZ25lZCB0byBhIHZhcmlhYmxlICh3aGljaCByZXByZXNlbnRzIHRoZSBjbGFzcyB0byB0aGUgcmVzdCBvZiB0aGUgcHJvZ3JhbSkuXG4gICAqIFNvIHdlIG1pZ2h0IG5lZWQgdG8gZGlnIGFyb3VuZCB0byBnZXQgaG9sZCBvZiB0aGUgXCJjbGFzc1wiIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHRyYWN0cyBhIGBOZ2NjQ2xhc3NTeW1ib2xgIGlmIGBkZWNsYXJhdGlvbmAgaXMgdGhlIGZ1bmN0aW9uIGRlY2xhcmF0aW9uIGluc2lkZVxuICAgKiB0aGUgSUlGRS4gT3RoZXJ3aXNlLCB1bmRlZmluZWQgaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWNsYXJhdGlvbiB0aGUgZGVjbGFyYXRpb24gd2hvc2Ugc3ltYm9sIHdlIGFyZSBmaW5kaW5nLlxuICAgKiBAcmV0dXJucyB0aGUgc3ltYm9sIGZvciB0aGUgbm9kZSBvciBgdW5kZWZpbmVkYCBpZiBpdCBpcyBub3QgYSBcImNsYXNzXCIgb3IgaGFzIG5vIHN5bWJvbC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRDbGFzc1N5bWJvbEZyb21Jbm5lckRlY2xhcmF0aW9uKGRlY2xhcmF0aW9uOiB0cy5Ob2RlKTogTmdjY0NsYXNzU3ltYm9sfHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY2xhc3NTeW1ib2wgPSBzdXBlci5nZXRDbGFzc1N5bWJvbEZyb21Jbm5lckRlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKTtcbiAgICBpZiAoY2xhc3NTeW1ib2wgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNsYXNzU3ltYm9sO1xuICAgIH1cblxuICAgIGlmICghdHMuaXNGdW5jdGlvbkRlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKSB8fCAhaGFzTmFtZUlkZW50aWZpZXIoZGVjbGFyYXRpb24pKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IG91dGVyRGVjbGFyYXRpb24gPSBnZXRDbGFzc0RlY2xhcmF0aW9uRnJvbUlubmVyRnVuY3Rpb25EZWNsYXJhdGlvbihkZWNsYXJhdGlvbik7XG4gICAgaWYgKG91dGVyRGVjbGFyYXRpb24gPT09IG51bGwgfHwgIWhhc05hbWVJZGVudGlmaWVyKG91dGVyRGVjbGFyYXRpb24pKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNsYXNzU3ltYm9sKG91dGVyRGVjbGFyYXRpb24sIGRlY2xhcmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFjZSBhbiBpZGVudGlmaWVyIHRvIGl0cyBkZWNsYXJhdGlvbiwgaWYgcG9zc2libGUuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGF0dGVtcHRzIHRvIHJlc29sdmUgdGhlIGRlY2xhcmF0aW9uIG9mIHRoZSBnaXZlbiBpZGVudGlmaWVyLCB0cmFjaW5nIGJhY2sgdGhyb3VnaFxuICAgKiBpbXBvcnRzIGFuZCByZS1leHBvcnRzIHVudGlsIHRoZSBvcmlnaW5hbCBkZWNsYXJhdGlvbiBzdGF0ZW1lbnQgaXMgZm91bmQuIEEgYERlY2xhcmF0aW9uYFxuICAgKiBvYmplY3QgaXMgcmV0dXJuZWQgaWYgdGhlIG9yaWdpbmFsIGRlY2xhcmF0aW9uIGlzIGZvdW5kLCBvciBgbnVsbGAgaXMgcmV0dXJuZWQgb3RoZXJ3aXNlLlxuICAgKlxuICAgKiBJbiBFUzUsIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNsYXNzIGlzIGEgZnVuY3Rpb24gZXhwcmVzc2lvbiB0aGF0IGlzIGhpZGRlbiBpbnNpZGUgYW4gSUlGRS5cbiAgICogSWYgd2UgYXJlIGxvb2tpbmcgZm9yIHRoZSBkZWNsYXJhdGlvbiBvZiB0aGUgaWRlbnRpZmllciBvZiB0aGUgaW5uZXIgZnVuY3Rpb24gZXhwcmVzc2lvbiwgd2VcbiAgICogd2lsbCBnZXQgaG9sZCBvZiB0aGUgb3V0ZXIgXCJjbGFzc1wiIHZhcmlhYmxlIGRlY2xhcmF0aW9uIGFuZCByZXR1cm4gaXRzIGlkZW50aWZpZXIgaW5zdGVhZC4gU2VlXG4gICAqIGBnZXRDbGFzc0RlY2xhcmF0aW9uRnJvbUlubmVyRnVuY3Rpb25EZWNsYXJhdGlvbigpYCBmb3IgbW9yZSBpbmZvLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgYSBUeXBlU2NyaXB0IGB0cy5JZGVudGlmaWVyYCB0byB0cmFjZSBiYWNrIHRvIGEgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIG1ldGFkYXRhIGFib3V0IHRoZSBgRGVjbGFyYXRpb25gIGlmIHRoZSBvcmlnaW5hbCBkZWNsYXJhdGlvbiBpcyBmb3VuZCwgb3IgYG51bGxgXG4gICAqIG90aGVyd2lzZS5cbiAgICovXG4gIGdldERlY2xhcmF0aW9uT2ZJZGVudGlmaWVyKGlkOiB0cy5JZGVudGlmaWVyKTogRGVjbGFyYXRpb258bnVsbCB7XG4gICAgY29uc3Qgc3VwZXJEZWNsYXJhdGlvbiA9IHN1cGVyLmdldERlY2xhcmF0aW9uT2ZJZGVudGlmaWVyKGlkKTtcblxuICAgIGlmIChzdXBlckRlY2xhcmF0aW9uID09PSBudWxsKSB7XG4gICAgICBjb25zdCBub25FbWl0dGVkTm9ySW1wb3J0ZWRUc0hlbHBlckRlY2xhcmF0aW9uID0gZ2V0VHNIZWxwZXJGbkZyb21JZGVudGlmaWVyKGlkKTtcbiAgICAgIGlmIChub25FbWl0dGVkTm9ySW1wb3J0ZWRUc0hlbHBlckRlY2xhcmF0aW9uICE9PSBudWxsKSB7XG4gICAgICAgIC8vIE5vIGRlY2xhcmF0aW9uIGNvdWxkIGJlIGZvdW5kIGZvciB0aGlzIGlkZW50aWZpZXIgYW5kIGl0cyBuYW1lIG1hdGNoZXMgYSBrbm93biBUUyBoZWxwZXJcbiAgICAgICAgLy8gZnVuY3Rpb24uIFRoaXMgY2FuIGhhcHBlbiBpZiBhIHBhY2thZ2UgaXMgY29tcGlsZWQgd2l0aCBgbm9FbWl0SGVscGVyczogdHJ1ZWAgYW5kXG4gICAgICAgIC8vIGBpbXBvcnRIZWxwZXJzOiBmYWxzZWAgKHRoZSBkZWZhdWx0KS4gVGhpcyBpcywgZm9yIGV4YW1wbGUsIHRoZSBjYXNlIHdpdGhcbiAgICAgICAgLy8gYEBuYXRpdmVzY3JpcHQvYW5ndWxhckA5LjAuMC1uZXh0LTIwMTktMTEtMTItMTU1NTAwLTAxYC5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBleHByZXNzaW9uOiBpZCxcbiAgICAgICAgICBrbm93bjogbm9uRW1pdHRlZE5vckltcG9ydGVkVHNIZWxwZXJEZWNsYXJhdGlvbixcbiAgICAgICAgICBub2RlOiBudWxsLFxuICAgICAgICAgIHZpYU1vZHVsZTogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwZXJEZWNsYXJhdGlvbiA9PT0gbnVsbCB8fCBzdXBlckRlY2xhcmF0aW9uLm5vZGUgPT09IG51bGwgfHxcbiAgICAgICAgc3VwZXJEZWNsYXJhdGlvbi5rbm93biAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHN1cGVyRGVjbGFyYXRpb247XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBpZGVudGlmaWVyIGZvciB0aGUgb3V0ZXIgY2xhc3Mgbm9kZSAoaWYgYW55KS5cbiAgICBjb25zdCBvdXRlckNsYXNzTm9kZSA9IGdldENsYXNzRGVjbGFyYXRpb25Gcm9tSW5uZXJGdW5jdGlvbkRlY2xhcmF0aW9uKHN1cGVyRGVjbGFyYXRpb24ubm9kZSk7XG4gICAgY29uc3QgZGVjbGFyYXRpb24gPSBvdXRlckNsYXNzTm9kZSAhPT0gbnVsbCA/XG4gICAgICAgIHN1cGVyLmdldERlY2xhcmF0aW9uT2ZJZGVudGlmaWVyKG91dGVyQ2xhc3NOb2RlLm5hbWUpIDpcbiAgICAgICAgc3VwZXJEZWNsYXJhdGlvbjtcblxuICAgIGlmIChkZWNsYXJhdGlvbiA9PT0gbnVsbCB8fCBkZWNsYXJhdGlvbi5ub2RlID09PSBudWxsIHx8IGRlY2xhcmF0aW9uLmtub3duICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZGVjbGFyYXRpb247XG4gICAgfVxuXG4gICAgaWYgKCF0cy5pc1ZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb24ubm9kZSkgfHwgZGVjbGFyYXRpb24ubm9kZS5pbml0aWFsaXplciAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIC8vIFZhcmlhYmxlRGVjbGFyYXRpb24gPT4gVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QgPT4gVmFyaWFibGVTdGF0ZW1lbnQgPT4gSUlGRSBCbG9ja1xuICAgICAgICAhdHMuaXNCbG9jayhkZWNsYXJhdGlvbi5ub2RlLnBhcmVudC5wYXJlbnQucGFyZW50KSkge1xuICAgICAgcmV0dXJuIGRlY2xhcmF0aW9uO1xuICAgIH1cblxuICAgIC8vIFdlIG1pZ2h0IGhhdmUgYW4gYWxpYXMgdG8gYW5vdGhlciB2YXJpYWJsZSBkZWNsYXJhdGlvbi5cbiAgICAvLyBTZWFyY2ggdGhlIGNvbnRhaW5pbmcgaWlmZSBib2R5IGZvciBpdC5cbiAgICBjb25zdCBibG9jayA9IGRlY2xhcmF0aW9uLm5vZGUucGFyZW50LnBhcmVudC5wYXJlbnQ7XG4gICAgY29uc3QgYWxpYXNTeW1ib2wgPSB0aGlzLmNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihkZWNsYXJhdGlvbi5ub2RlLm5hbWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2suc3RhdGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3RhdGVtZW50ID0gYmxvY2suc3RhdGVtZW50c1tpXTtcbiAgICAgIC8vIExvb2tpbmcgZm9yIHN0YXRlbWVudCB0aGF0IGxvb2tzIGxpa2U6IGBBbGlhc2VkVmFyaWFibGUgPSBPcmlnaW5hbFZhcmlhYmxlO2BcbiAgICAgIGlmIChpc0Fzc2lnbm1lbnRTdGF0ZW1lbnQoc3RhdGVtZW50KSAmJiB0cy5pc0lkZW50aWZpZXIoc3RhdGVtZW50LmV4cHJlc3Npb24ubGVmdCkgJiZcbiAgICAgICAgICB0cy5pc0lkZW50aWZpZXIoc3RhdGVtZW50LmV4cHJlc3Npb24ucmlnaHQpICYmXG4gICAgICAgICAgdGhpcy5jaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24oc3RhdGVtZW50LmV4cHJlc3Npb24ubGVmdCkgPT09IGFsaWFzU3ltYm9sKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERlY2xhcmF0aW9uT2ZJZGVudGlmaWVyKHN0YXRlbWVudC5leHByZXNzaW9uLnJpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVjbGFyYXRpb247XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgYSBmdW5jdGlvbiBkZWNsYXJhdGlvbiB0byBmaW5kIHRoZSByZWxldmFudCBtZXRhZGF0YSBhYm91dCBpdC5cbiAgICpcbiAgICogSW4gRVNNNSB3ZSBuZWVkIHRvIGRvIHNwZWNpYWwgd29yayB3aXRoIG9wdGlvbmFsIGFyZ3VtZW50cyB0byB0aGUgZnVuY3Rpb24sIHNpbmNlIHRoZXkgZ2V0XG4gICAqIHRoZWlyIG93biBpbml0aWFsaXplciBzdGF0ZW1lbnQgdGhhdCBuZWVkcyB0byBiZSBwYXJzZWQgYW5kIHRoZW4gbm90IGluY2x1ZGVkIGluIHRoZSBcImJvZHlcIlxuICAgKiBzdGF0ZW1lbnRzIG9mIHRoZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIG5vZGUgdGhlIGZ1bmN0aW9uIGRlY2xhcmF0aW9uIHRvIHBhcnNlLlxuICAgKiBAcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbm9kZSwgc3RhdGVtZW50cyBhbmQgcGFyYW1ldGVycyBvZiB0aGUgZnVuY3Rpb24uXG4gICAqL1xuICBnZXREZWZpbml0aW9uT2ZGdW5jdGlvbihub2RlOiB0cy5Ob2RlKTogRnVuY3Rpb25EZWZpbml0aW9ufG51bGwge1xuICAgIGlmICghdHMuaXNGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGUpICYmICF0cy5pc01ldGhvZERlY2xhcmF0aW9uKG5vZGUpICYmXG4gICAgICAgICF0cy5pc0Z1bmN0aW9uRXhwcmVzc2lvbihub2RlKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1ldGVycyA9XG4gICAgICAgIG5vZGUucGFyYW1ldGVycy5tYXAocCA9PiAoe25hbWU6IGdldE5hbWVUZXh0KHAubmFtZSksIG5vZGU6IHAsIGluaXRpYWxpemVyOiBudWxsfSkpO1xuICAgIGxldCBsb29raW5nRm9yUGFyYW1Jbml0aWFsaXplcnMgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhdGVtZW50cyA9IG5vZGUuYm9keSAmJiBub2RlLmJvZHkuc3RhdGVtZW50cy5maWx0ZXIocyA9PiB7XG4gICAgICBsb29raW5nRm9yUGFyYW1Jbml0aWFsaXplcnMgPVxuICAgICAgICAgIGxvb2tpbmdGb3JQYXJhbUluaXRpYWxpemVycyAmJiByZWZsZWN0UGFyYW1Jbml0aWFsaXplcihzLCBwYXJhbWV0ZXJzKTtcbiAgICAgIC8vIElmIHdlIGFyZSBubyBsb25nZXIgbG9va2luZyBmb3IgcGFyYW1ldGVyIGluaXRpYWxpemVycyB0aGVuIHdlIGluY2x1ZGUgdGhpcyBzdGF0ZW1lbnRcbiAgICAgIHJldHVybiAhbG9va2luZ0ZvclBhcmFtSW5pdGlhbGl6ZXJzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtub2RlLCBib2R5OiBzdGF0ZW1lbnRzIHx8IG51bGwsIHBhcmFtZXRlcnN9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgYSBgRGVjbGFyYXRpb25gIGNvcnJlc3BvbmRzIHdpdGggYSBrbm93biBkZWNsYXJhdGlvbiwgc3VjaCBhcyBhIFR5cGVTY3JpcHQgaGVscGVyXG4gICAqIGZ1bmN0aW9uLCBhbmQgc2V0IGl0cyBga25vd25gIHByb3BlcnR5IHRvIHRoZSBhcHByb3ByaWF0ZSBgS25vd25EZWNsYXJhdGlvbmAuXG4gICAqXG4gICAqIEBwYXJhbSBkZWNsIFRoZSBgRGVjbGFyYXRpb25gIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJuIFRoZSBwYXNzZWQgaW4gYERlY2xhcmF0aW9uYCAocG90ZW50aWFsbHkgZW5oYW5jZWQgd2l0aCBhIGBLbm93bkRlY2xhcmF0aW9uYCkuXG4gICAqL1xuICBkZXRlY3RLbm93bkRlY2xhcmF0aW9uKGRlY2w6IG51bGwpOiBudWxsO1xuICBkZXRlY3RLbm93bkRlY2xhcmF0aW9uPFQgZXh0ZW5kcyBEZWNsYXJhdGlvbj4oZGVjbDogVCk6IFQ7XG4gIGRldGVjdEtub3duRGVjbGFyYXRpb248VCBleHRlbmRzIERlY2xhcmF0aW9uPihkZWNsOiBUfG51bGwpOiBUfG51bGw7XG4gIGRldGVjdEtub3duRGVjbGFyYXRpb248VCBleHRlbmRzIERlY2xhcmF0aW9uPihkZWNsOiBUfG51bGwpOiBUfG51bGwge1xuICAgIGRlY2wgPSBzdXBlci5kZXRlY3RLbm93bkRlY2xhcmF0aW9uKGRlY2wpO1xuXG4gICAgaWYgKGRlY2wgIT09IG51bGwgJiYgZGVjbC5rbm93biA9PT0gbnVsbCAmJiBkZWNsLm5vZGUgIT09IG51bGwpIHtcbiAgICAgIGRlY2wua25vd24gPSBnZXRUc0hlbHBlckZuRnJvbURlY2xhcmF0aW9uKGRlY2wubm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlY2w7XG4gIH1cblxuXG4gIC8vLy8vLy8vLy8vLy8gUHJvdGVjdGVkIEhlbHBlcnMgLy8vLy8vLy8vLy8vL1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGlubmVyIGZ1bmN0aW9uIGRlY2xhcmF0aW9uIG9mIGFuIEVTNS1zdHlsZSBjbGFzcy5cbiAgICpcbiAgICogSW4gRVM1LCB0aGUgaW1wbGVtZW50YXRpb24gb2YgYSBjbGFzcyBpcyBhIGZ1bmN0aW9uIGV4cHJlc3Npb24gdGhhdCBpcyBoaWRkZW4gaW5zaWRlIGFuIElJRkVcbiAgICogYW5kIHJldHVybmVkIHRvIGJlIGFzc2lnbmVkIHRvIGEgdmFyaWFibGUgb3V0c2lkZSB0aGUgSUlGRSwgd2hpY2ggaXMgd2hhdCB0aGUgcmVzdCBvZiB0aGVcbiAgICogcHJvZ3JhbSBpbnRlcmFjdHMgd2l0aC5cbiAgICpcbiAgICogR2l2ZW4gdGhlIG91dGVyIHZhcmlhYmxlIGRlY2xhcmF0aW9uLCB3ZSB3YW50IHRvIGdldCB0byB0aGUgaW5uZXIgZnVuY3Rpb24gZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBkZWNsIGEgZGVjbGFyYXRpb24gbm9kZSB0aGF0IGNvdWxkIGJlIHRoZSB2YXJpYWJsZSBleHByZXNzaW9uIG91dHNpZGUgYW4gRVM1IGNsYXNzIElJRkUuXG4gICAqIEBwYXJhbSBjaGVja2VyIHRoZSBUUyBwcm9ncmFtIFR5cGVDaGVja2VyXG4gICAqIEByZXR1cm5zIHRoZSBpbm5lciBmdW5jdGlvbiBkZWNsYXJhdGlvbiBvciBgdW5kZWZpbmVkYCBpZiBpdCBpcyBub3QgYSBcImNsYXNzXCIuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0SW5uZXJGdW5jdGlvbkRlY2xhcmF0aW9uRnJvbUNsYXNzRGVjbGFyYXRpb24oZGVjbDogdHMuRGVjbGFyYXRpb24pOlxuICAgICAgdHMuRnVuY3Rpb25EZWNsYXJhdGlvbnx1bmRlZmluZWQge1xuICAgIC8vIEV4dHJhY3QgdGhlIElJRkUgYm9keSAoaWYgYW55KS5cbiAgICBjb25zdCBpaWZlQm9keSA9IGdldElpZmVCb2R5KGRlY2wpO1xuICAgIGlmICghaWlmZUJvZHkpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAvLyBFeHRyYWN0IHRoZSBmdW5jdGlvbiBkZWNsYXJhdGlvbiBmcm9tIGluc2lkZSB0aGUgSUlGRS5cbiAgICBjb25zdCBmdW5jdGlvbkRlY2xhcmF0aW9uID0gaWlmZUJvZHkuc3RhdGVtZW50cy5maW5kKHRzLmlzRnVuY3Rpb25EZWNsYXJhdGlvbik7XG4gICAgaWYgKCFmdW5jdGlvbkRlY2xhcmF0aW9uKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgLy8gRXh0cmFjdCB0aGUgcmV0dXJuIGlkZW50aWZpZXIgb2YgdGhlIElJRkUuXG4gICAgY29uc3QgcmV0dXJuSWRlbnRpZmllciA9IGdldFJldHVybklkZW50aWZpZXIoaWlmZUJvZHkpO1xuICAgIGNvbnN0IHJldHVybklkZW50aWZpZXJTeW1ib2wgPVxuICAgICAgICByZXR1cm5JZGVudGlmaWVyICYmIHRoaXMuY2hlY2tlci5nZXRTeW1ib2xBdExvY2F0aW9uKHJldHVybklkZW50aWZpZXIpO1xuICAgIGlmICghcmV0dXJuSWRlbnRpZmllclN5bWJvbCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIC8vIFZlcmlmeSB0aGF0IHRoZSBpbm5lciBmdW5jdGlvbiBpcyByZXR1cm5lZC5cbiAgICBpZiAocmV0dXJuSWRlbnRpZmllclN5bWJvbC52YWx1ZURlY2xhcmF0aW9uICE9PSBmdW5jdGlvbkRlY2xhcmF0aW9uKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uRGVjbGFyYXRpb247XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgZGVjbGFyYXRpb25zIG9mIHRoZSBjb25zdHJ1Y3RvciBwYXJhbWV0ZXJzIG9mIGEgY2xhc3MgaWRlbnRpZmllZCBieSBpdHMgc3ltYm9sLlxuICAgKlxuICAgKiBJbiBFU001LCB0aGVyZSBpcyBubyBcImNsYXNzXCIgc28gdGhlIGNvbnN0cnVjdG9yIHRoYXQgd2Ugd2FudCBpcyBhY3R1YWxseSB0aGUgaW5uZXIgZnVuY3Rpb25cbiAgICogZGVjbGFyYXRpb24gaW5zaWRlIHRoZSBJSUZFLCB3aG9zZSByZXR1cm4gdmFsdWUgaXMgYXNzaWduZWQgdG8gdGhlIG91dGVyIHZhcmlhYmxlIGRlY2xhcmF0aW9uXG4gICAqICh0aGF0IHJlcHJlc2VudHMgdGhlIGNsYXNzIHRvIHRoZSByZXN0IG9mIHRoZSBwcm9ncmFtKS5cbiAgICpcbiAgICogQHBhcmFtIGNsYXNzU3ltYm9sIHRoZSBzeW1ib2wgb2YgdGhlIGNsYXNzIChpLmUuIHRoZSBvdXRlciB2YXJpYWJsZSBkZWNsYXJhdGlvbikgd2hvc2VcbiAgICogcGFyYW1ldGVycyB3ZSB3YW50IHRvIGZpbmQuXG4gICAqIEByZXR1cm5zIGFuIGFycmF5IG9mIGB0cy5QYXJhbWV0ZXJEZWNsYXJhdGlvbmAgb2JqZWN0cyByZXByZXNlbnRpbmcgZWFjaCBvZiB0aGUgcGFyYW1ldGVycyBpblxuICAgKiB0aGUgY2xhc3MncyBjb25zdHJ1Y3RvciBvciBgbnVsbGAgaWYgdGhlcmUgaXMgbm8gY29uc3RydWN0b3IuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q29uc3RydWN0b3JQYXJhbWV0ZXJEZWNsYXJhdGlvbnMoY2xhc3NTeW1ib2w6IE5nY2NDbGFzc1N5bWJvbCk6XG4gICAgICB0cy5QYXJhbWV0ZXJEZWNsYXJhdGlvbltdfG51bGwge1xuICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gY2xhc3NTeW1ib2wuaW1wbGVtZW50YXRpb24udmFsdWVEZWNsYXJhdGlvbjtcbiAgICBpZiAoIXRzLmlzRnVuY3Rpb25EZWNsYXJhdGlvbihjb25zdHJ1Y3RvcikpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGNvbnN0cnVjdG9yLnBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20oY29uc3RydWN0b3IucGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU3ludGhlc2l6ZWRDb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvcikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBhcmFtZXRlciB0eXBlIGFuZCBkZWNvcmF0b3JzIGZvciB0aGUgY29uc3RydWN0b3Igb2YgYSBjbGFzcyxcbiAgICogd2hlcmUgdGhlIGluZm9ybWF0aW9uIGlzIHN0b3JlZCBvbiBhIHN0YXRpYyBtZXRob2Qgb2YgdGhlIGNsYXNzLlxuICAgKlxuICAgKiBJbiB0aGlzIGNhc2UgdGhlIGRlY29yYXRvcnMgYXJlIHN0b3JlZCBpbiB0aGUgYm9keSBvZiBhIG1ldGhvZFxuICAgKiAoYGN0b3JQYXJhdGVtZXJzYCkgYXR0YWNoZWQgdG8gdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdW5saWtlIEVTTTIwMTUgdGhpcyBpcyBhIGZ1bmN0aW9uIGV4cHJlc3Npb24gcmF0aGVyIHRoYW4gYW4gYXJyb3dcbiAgICogZnVuY3Rpb246XG4gICAqXG4gICAqIGBgYFxuICAgKiBTb21lRGlyZWN0aXZlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24oKSB7IHJldHVybiBbXG4gICAqICAgeyB0eXBlOiBWaWV3Q29udGFpbmVyUmVmLCB9LFxuICAgKiAgIHsgdHlwZTogVGVtcGxhdGVSZWYsIH0sXG4gICAqICAgeyB0eXBlOiBJdGVyYWJsZURpZmZlcnMsIH0sXG4gICAqICAgeyB0eXBlOiB1bmRlZmluZWQsIGRlY29yYXRvcnM6IFt7IHR5cGU6IEluamVjdCwgYXJnczogW0lOSkVDVEVEX1RPS0VOLF0gfSxdIH0sXG4gICAqIF07IH07XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1EZWNvcmF0b3JzUHJvcGVydHkgdGhlIHByb3BlcnR5IHRoYXQgaG9sZHMgdGhlIHBhcmFtZXRlciBpbmZvIHdlIHdhbnQgdG8gZ2V0LlxuICAgKiBAcmV0dXJucyBhbiBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgdGhlIHR5cGUgYW5kIGRlY29yYXRvcnMgZm9yIGVhY2ggcGFyYW1ldGVyLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFBhcmFtSW5mb0Zyb21TdGF0aWNQcm9wZXJ0eShwYXJhbURlY29yYXRvcnNQcm9wZXJ0eTogdHMuU3ltYm9sKTogUGFyYW1JbmZvW118bnVsbCB7XG4gICAgY29uc3QgcGFyYW1EZWNvcmF0b3JzID0gZ2V0UHJvcGVydHlWYWx1ZUZyb21TeW1ib2wocGFyYW1EZWNvcmF0b3JzUHJvcGVydHkpO1xuICAgIC8vIFRoZSBkZWNvcmF0b3JzIGFycmF5IG1heSBiZSB3cmFwcGVkIGluIGEgZnVuY3Rpb24uIElmIHNvIHVud3JhcCBpdC5cbiAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnQgPSBnZXRSZXR1cm5TdGF0ZW1lbnQocGFyYW1EZWNvcmF0b3JzKTtcbiAgICBjb25zdCBleHByZXNzaW9uID0gcmV0dXJuU3RhdGVtZW50ID8gcmV0dXJuU3RhdGVtZW50LmV4cHJlc3Npb24gOiBwYXJhbURlY29yYXRvcnM7XG4gICAgaWYgKGV4cHJlc3Npb24gJiYgdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKGV4cHJlc3Npb24pKSB7XG4gICAgICBjb25zdCBlbGVtZW50cyA9IGV4cHJlc3Npb24uZWxlbWVudHM7XG4gICAgICByZXR1cm4gZWxlbWVudHMubWFwKHJlZmxlY3RBcnJheUVsZW1lbnQpLm1hcChwYXJhbUluZm8gPT4ge1xuICAgICAgICBjb25zdCB0eXBlRXhwcmVzc2lvbiA9IHBhcmFtSW5mbyAmJiBwYXJhbUluZm8uaGFzKCd0eXBlJykgPyBwYXJhbUluZm8uZ2V0KCd0eXBlJykhIDogbnVsbDtcbiAgICAgICAgY29uc3QgZGVjb3JhdG9ySW5mbyA9XG4gICAgICAgICAgICBwYXJhbUluZm8gJiYgcGFyYW1JbmZvLmhhcygnZGVjb3JhdG9ycycpID8gcGFyYW1JbmZvLmdldCgnZGVjb3JhdG9ycycpISA6IG51bGw7XG4gICAgICAgIGNvbnN0IGRlY29yYXRvcnMgPSBkZWNvcmF0b3JJbmZvICYmIHRoaXMucmVmbGVjdERlY29yYXRvcnMoZGVjb3JhdG9ySW5mbyk7XG4gICAgICAgIHJldHVybiB7dHlwZUV4cHJlc3Npb24sIGRlY29yYXRvcnN9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChwYXJhbURlY29yYXRvcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAnSW52YWxpZCBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIgZGVjb3JhdG9yIGluICcgKyBwYXJhbURlY29yYXRvcnMuZ2V0U291cmNlRmlsZSgpLmZpbGVOYW1lICtcbiAgICAgICAgICAgICAgJzpcXG4nLFxuICAgICAgICAgIHBhcmFtRGVjb3JhdG9ycy5nZXRUZXh0KCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZsZWN0IG92ZXIgYSBzeW1ib2wgYW5kIGV4dHJhY3QgdGhlIG1lbWJlciBpbmZvcm1hdGlvbiwgY29tYmluaW5nIGl0IHdpdGggdGhlXG4gICAqIHByb3ZpZGVkIGRlY29yYXRvciBpbmZvcm1hdGlvbiwgYW5kIHdoZXRoZXIgaXQgaXMgYSBzdGF0aWMgbWVtYmVyLlxuICAgKlxuICAgKiBJZiBhIGNsYXNzIG1lbWJlciB1c2VzIGFjY2Vzc29ycyAoZS5nIGdldHRlcnMgYW5kL29yIHNldHRlcnMpIHRoZW4gaXQgZ2V0cyBkb3dubGV2ZWxlZFxuICAgKiBpbiBFUzUgdG8gYSBzaW5nbGUgYE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpYCBjYWxsLiBJbiB0aGF0IGNhc2Ugd2UgbXVzdCBwYXJzZSB0aGlzXG4gICAqIGNhbGwgdG8gZXh0cmFjdCB0aGUgb25lIG9yIHR3byBDbGFzc01lbWJlciBvYmplY3RzIHRoYXQgcmVwcmVzZW50IHRoZSBhY2Nlc3NvcnMuXG4gICAqXG4gICAqIEBwYXJhbSBzeW1ib2wgdGhlIHN5bWJvbCBmb3IgdGhlIG1lbWJlciB0byByZWZsZWN0IG92ZXIuXG4gICAqIEBwYXJhbSBkZWNvcmF0b3JzIGFuIGFycmF5IG9mIGRlY29yYXRvcnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBtZW1iZXIuXG4gICAqIEBwYXJhbSBpc1N0YXRpYyB0cnVlIGlmIHRoaXMgbWVtYmVyIGlzIHN0YXRpYywgZmFsc2UgaWYgaXQgaXMgYW4gaW5zdGFuY2UgcHJvcGVydHkuXG4gICAqIEByZXR1cm5zIHRoZSByZWZsZWN0ZWQgbWVtYmVyIGluZm9ybWF0aW9uLCBvciBudWxsIGlmIHRoZSBzeW1ib2wgaXMgbm90IGEgbWVtYmVyLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZmxlY3RNZW1iZXJzKHN5bWJvbDogdHMuU3ltYm9sLCBkZWNvcmF0b3JzPzogRGVjb3JhdG9yW10sIGlzU3RhdGljPzogYm9vbGVhbik6XG4gICAgICBDbGFzc01lbWJlcltdfG51bGwge1xuICAgIGNvbnN0IG5vZGUgPSBzeW1ib2wudmFsdWVEZWNsYXJhdGlvbiB8fCBzeW1ib2wuZGVjbGFyYXRpb25zICYmIHN5bWJvbC5kZWNsYXJhdGlvbnNbMF07XG4gICAgY29uc3QgcHJvcGVydHlEZWZpbml0aW9uID0gbm9kZSAmJiBnZXRQcm9wZXJ0eURlZmluaXRpb24obm9kZSk7XG4gICAgaWYgKHByb3BlcnR5RGVmaW5pdGlvbikge1xuICAgICAgY29uc3QgbWVtYmVyczogQ2xhc3NNZW1iZXJbXSA9IFtdO1xuICAgICAgaWYgKHByb3BlcnR5RGVmaW5pdGlvbi5zZXR0ZXIpIHtcbiAgICAgICAgbWVtYmVycy5wdXNoKHtcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIGltcGxlbWVudGF0aW9uOiBwcm9wZXJ0eURlZmluaXRpb24uc2V0dGVyLFxuICAgICAgICAgIGtpbmQ6IENsYXNzTWVtYmVyS2luZC5TZXR0ZXIsXG4gICAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgICBuYW1lOiBzeW1ib2wubmFtZSxcbiAgICAgICAgICBuYW1lTm9kZTogbnVsbCxcbiAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICBpc1N0YXRpYzogaXNTdGF0aWMgfHwgZmFsc2UsXG4gICAgICAgICAgZGVjb3JhdG9yczogZGVjb3JhdG9ycyB8fCBbXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUHJldmVudCBhdHRhY2hpbmcgdGhlIGRlY29yYXRvcnMgdG8gYSBwb3RlbnRpYWwgZ2V0dGVyLiBJbiBFUzUsIHdlIGNhbid0IHRlbGwgd2hlcmUgdGhlXG4gICAgICAgIC8vIGRlY29yYXRvcnMgd2VyZSBvcmlnaW5hbGx5IGF0dGFjaGVkIHRvLCBob3dldmVyIHdlIG9ubHkgd2FudCB0byBhdHRhY2ggdGhlbSB0byBhIHNpbmdsZVxuICAgICAgICAvLyBgQ2xhc3NNZW1iZXJgIGFzIG90aGVyd2lzZSBuZ3RzYyB3b3VsZCBoYW5kbGUgdGhlIHNhbWUgZGVjb3JhdG9ycyB0d2ljZS5cbiAgICAgICAgZGVjb3JhdG9ycyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wZXJ0eURlZmluaXRpb24uZ2V0dGVyKSB7XG4gICAgICAgIG1lbWJlcnMucHVzaCh7XG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBpbXBsZW1lbnRhdGlvbjogcHJvcGVydHlEZWZpbml0aW9uLmdldHRlcixcbiAgICAgICAgICBraW5kOiBDbGFzc01lbWJlcktpbmQuR2V0dGVyLFxuICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgbmFtZTogc3ltYm9sLm5hbWUsXG4gICAgICAgICAgbmFtZU5vZGU6IG51bGwsXG4gICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgaXNTdGF0aWM6IGlzU3RhdGljIHx8IGZhbHNlLFxuICAgICAgICAgIGRlY29yYXRvcnM6IGRlY29yYXRvcnMgfHwgW10sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbWJlcnM7XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVycyA9IHN1cGVyLnJlZmxlY3RNZW1iZXJzKHN5bWJvbCwgZGVjb3JhdG9ycywgaXNTdGF0aWMpO1xuICAgIG1lbWJlcnMgJiYgbWVtYmVycy5mb3JFYWNoKG1lbWJlciA9PiB7XG4gICAgICBpZiAobWVtYmVyICYmIG1lbWJlci5raW5kID09PSBDbGFzc01lbWJlcktpbmQuTWV0aG9kICYmIG1lbWJlci5pc1N0YXRpYyAmJiBtZW1iZXIubm9kZSAmJlxuICAgICAgICAgIHRzLmlzUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uKG1lbWJlci5ub2RlKSAmJiBtZW1iZXIubm9kZS5wYXJlbnQgJiZcbiAgICAgICAgICB0cy5pc0JpbmFyeUV4cHJlc3Npb24obWVtYmVyLm5vZGUucGFyZW50KSAmJlxuICAgICAgICAgIHRzLmlzRnVuY3Rpb25FeHByZXNzaW9uKG1lbWJlci5ub2RlLnBhcmVudC5yaWdodCkpIHtcbiAgICAgICAgLy8gUmVjb21wdXRlIHRoZSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBtZW1iZXI6XG4gICAgICAgIC8vIEVTNSBzdGF0aWMgbWV0aG9kcyBhcmUgdmFyaWFibGUgZGVjbGFyYXRpb25zIHNvIHRoZSBkZWNsYXJhdGlvbiBpcyBhY3R1YWxseSB0aGVcbiAgICAgICAgLy8gaW5pdGlhbGl6ZXIgb2YgdGhlIHZhcmlhYmxlIGFzc2lnbm1lbnRcbiAgICAgICAgbWVtYmVyLmltcGxlbWVudGF0aW9uID0gbWVtYmVyLm5vZGUucGFyZW50LnJpZ2h0O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtZW1iZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgc3RhdGVtZW50cyByZWxhdGVkIHRvIHRoZSBnaXZlbiBjbGFzcyB0aGF0IG1heSBjb250YWluIGNhbGxzIHRvIGEgaGVscGVyLlxuICAgKlxuICAgKiBJbiBFU001IGNvZGUgdGhlIGhlbHBlciBjYWxscyBhcmUgaGlkZGVuIGluc2lkZSB0aGUgY2xhc3MncyBJSUZFLlxuICAgKlxuICAgKiBAcGFyYW0gY2xhc3NTeW1ib2wgdGhlIGNsYXNzIHdob3NlIGhlbHBlciBjYWxscyB3ZSBhcmUgaW50ZXJlc3RlZCBpbi4gV2UgZXhwZWN0IHRoaXMgc3ltYm9sXG4gICAqIHRvIHJlZmVyZW5jZSB0aGUgaW5uZXIgaWRlbnRpZmllciBpbnNpZGUgdGhlIElJRkUuXG4gICAqIEByZXR1cm5zIGFuIGFycmF5IG9mIHN0YXRlbWVudHMgdGhhdCBtYXkgY29udGFpbiBoZWxwZXIgY2FsbHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0U3RhdGVtZW50c0ZvckNsYXNzKGNsYXNzU3ltYm9sOiBOZ2NjQ2xhc3NTeW1ib2wpOiB0cy5TdGF0ZW1lbnRbXSB7XG4gICAgY29uc3QgY2xhc3NEZWNsYXJhdGlvblBhcmVudCA9IGNsYXNzU3ltYm9sLmltcGxlbWVudGF0aW9uLnZhbHVlRGVjbGFyYXRpb24ucGFyZW50O1xuICAgIHJldHVybiB0cy5pc0Jsb2NrKGNsYXNzRGVjbGFyYXRpb25QYXJlbnQpID8gQXJyYXkuZnJvbShjbGFzc0RlY2xhcmF0aW9uUGFyZW50LnN0YXRlbWVudHMpIDogW107XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIHJldHJpZXZlIHRoZSBzeW1ib2wgb2YgYSBzdGF0aWMgcHJvcGVydHkgb24gYSBjbGFzcy5cbiAgICpcbiAgICogSW4gRVM1LCBhIHN0YXRpYyBwcm9wZXJ0eSBjYW4gZWl0aGVyIGJlIHNldCBvbiB0aGUgaW5uZXIgZnVuY3Rpb24gZGVjbGFyYXRpb24gaW5zaWRlIHRoZSBjbGFzcydcbiAgICogSUlGRSwgb3IgaXQgY2FuIGJlIHNldCBvbiB0aGUgb3V0ZXIgdmFyaWFibGUgZGVjbGFyYXRpb24uIFRoZXJlZm9yZSwgdGhlIEVTNSBob3N0IGNoZWNrcyBib3RoXG4gICAqIHBsYWNlcywgZmlyc3QgbG9va2luZyB1cCB0aGUgcHJvcGVydHkgb24gdGhlIGlubmVyIHN5bWJvbCwgYW5kIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgZm91bmQgaXRcbiAgICogd2lsbCBmYWxsIGJhY2sgdG8gbG9va2luZyB1cCB0aGUgcHJvcGVydHkgb24gdGhlIG91dGVyIHN5bWJvbC5cbiAgICpcbiAgICogQHBhcmFtIHN5bWJvbCB0aGUgY2xhc3Mgd2hvc2UgcHJvcGVydHkgd2UgYXJlIGludGVyZXN0ZWQgaW4uXG4gICAqIEBwYXJhbSBwcm9wZXJ0eU5hbWUgdGhlIG5hbWUgb2Ygc3RhdGljIHByb3BlcnR5LlxuICAgKiBAcmV0dXJucyB0aGUgc3ltYm9sIGlmIGl0IGlzIGZvdW5kIG9yIGB1bmRlZmluZWRgIGlmIG5vdC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRTdGF0aWNQcm9wZXJ0eShzeW1ib2w6IE5nY2NDbGFzc1N5bWJvbCwgcHJvcGVydHlOYW1lOiB0cy5fX1N0cmluZyk6IHRzLlN5bWJvbFxuICAgICAgfHVuZGVmaW5lZCB7XG4gICAgLy8gRmlyc3QgbGV0cyBzZWUgaWYgdGhlIHN0YXRpYyBwcm9wZXJ0eSBjYW4gYmUgcmVzb2x2ZWQgZnJvbSB0aGUgaW5uZXIgY2xhc3Mgc3ltYm9sLlxuICAgIGNvbnN0IHByb3AgPSBzeW1ib2wuaW1wbGVtZW50YXRpb24uZXhwb3J0cyAmJiBzeW1ib2wuaW1wbGVtZW50YXRpb24uZXhwb3J0cy5nZXQocHJvcGVydHlOYW1lKTtcbiAgICBpZiAocHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcHJvcDtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIGxvb2t1cCB0aGUgc3RhdGljIHByb3BlcnRpZXMgb24gdGhlIG91dGVyIGNsYXNzIHN5bWJvbC5cbiAgICByZXR1cm4gc3ltYm9sLmRlY2xhcmF0aW9uLmV4cG9ydHMgJiYgc3ltYm9sLmRlY2xhcmF0aW9uLmV4cG9ydHMuZ2V0KHByb3BlcnR5TmFtZSk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLyBJbnRlcm5hbCBIZWxwZXJzIC8vLy8vLy8vLy8vLy9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkZXRhaWxzIGFib3V0IHByb3BlcnR5IGRlZmluaXRpb25zIHRoYXQgd2VyZSBzZXQgdXNpbmcgYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAuXG4gKi9cbmludGVyZmFjZSBQcm9wZXJ0eURlZmluaXRpb24ge1xuICBzZXR0ZXI6IHRzLkZ1bmN0aW9uRXhwcmVzc2lvbnxudWxsO1xuICBnZXR0ZXI6IHRzLkZ1bmN0aW9uRXhwcmVzc2lvbnxudWxsO1xufVxuXG4vKipcbiAqIEluIEVTNSwgZ2V0dGVycyBhbmQgc2V0dGVycyBoYXZlIGJlZW4gZG93bmxldmVsZWQgaW50byBjYWxsIGV4cHJlc3Npb25zIG9mXG4gKiBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCwgc3VjaCBhc1xuICpcbiAqIGBgYFxuICogT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6LnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiLCB7XG4gKiAgIGdldDogZnVuY3Rpb24gKCkge1xuICogICAgICAgcmV0dXJuICd2YWx1ZSc7XG4gKiAgIH0sXG4gKiAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gKiAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gKiAgIH0sXG4gKiAgIGVudW1lcmFibGU6IHRydWUsXG4gKiAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGluc3BlY3RzIHRoZSBnaXZlbiBub2RlIHRvIGRldGVybWluZSBpZiBpdCBjb3JyZXNwb25kcyB3aXRoIHN1Y2ggYSBjYWxsLCBhbmQgaWYgc29cbiAqIGV4dHJhY3RzIHRoZSBgc2V0YCBhbmQgYGdldGAgZnVuY3Rpb24gZXhwcmVzc2lvbnMgZnJvbSB0aGUgZGVzY3JpcHRvciBvYmplY3QsIGlmIHRoZXkgZXhpc3QuXG4gKlxuICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gb2J0YWluIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uIGZyb20uXG4gKiBAcmV0dXJucyBUaGUgcHJvcGVydHkgZGVmaW5pdGlvbiBpZiB0aGUgbm9kZSBjb3JyZXNwb25kcyB3aXRoIGFjY2Vzc29yLCBudWxsIG90aGVyd2lzZS5cbiAqL1xuZnVuY3Rpb24gZ2V0UHJvcGVydHlEZWZpbml0aW9uKG5vZGU6IHRzLk5vZGUpOiBQcm9wZXJ0eURlZmluaXRpb258bnVsbCB7XG4gIGlmICghdHMuaXNDYWxsRXhwcmVzc2lvbihub2RlKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZm4gPSBub2RlLmV4cHJlc3Npb247XG4gIGlmICghdHMuaXNQcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24oZm4pIHx8ICF0cy5pc0lkZW50aWZpZXIoZm4uZXhwcmVzc2lvbikgfHxcbiAgICAgIGZuLmV4cHJlc3Npb24udGV4dCAhPT0gJ09iamVjdCcgfHwgZm4ubmFtZS50ZXh0ICE9PSAnZGVmaW5lUHJvcGVydHknKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGRlc2NyaXB0b3IgPSBub2RlLmFyZ3VtZW50c1syXTtcbiAgaWYgKCFkZXNjcmlwdG9yIHx8ICF0cy5pc09iamVjdExpdGVyYWxFeHByZXNzaW9uKGRlc2NyaXB0b3IpKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4ge1xuICAgIHNldHRlcjogcmVhZFByb3BlcnR5RnVuY3Rpb25FeHByZXNzaW9uKGRlc2NyaXB0b3IsICdzZXQnKSxcbiAgICBnZXR0ZXI6IHJlYWRQcm9wZXJ0eUZ1bmN0aW9uRXhwcmVzc2lvbihkZXNjcmlwdG9yLCAnZ2V0JyksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlYWRQcm9wZXJ0eUZ1bmN0aW9uRXhwcmVzc2lvbihvYmplY3Q6IHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uLCBuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgcHJvcGVydHkgPSBvYmplY3QucHJvcGVydGllcy5maW5kKFxuICAgICAgKHApOiBwIGlzIHRzLlByb3BlcnR5QXNzaWdubWVudCA9PlxuICAgICAgICAgIHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KHApICYmIHRzLmlzSWRlbnRpZmllcihwLm5hbWUpICYmIHAubmFtZS50ZXh0ID09PSBuYW1lKTtcblxuICByZXR1cm4gcHJvcGVydHkgJiYgdHMuaXNGdW5jdGlvbkV4cHJlc3Npb24ocHJvcGVydHkuaW5pdGlhbGl6ZXIpICYmIHByb3BlcnR5LmluaXRpYWxpemVyIHx8IG51bGw7XG59XG5cbi8qKlxuICogR2V0IHRoZSBhY3R1YWwgKG91dGVyKSBkZWNsYXJhdGlvbiBvZiBhIGNsYXNzLlxuICpcbiAqIEluIEVTNSwgdGhlIGltcGxlbWVudGF0aW9uIG9mIGEgY2xhc3MgaXMgYSBmdW5jdGlvbiBleHByZXNzaW9uIHRoYXQgaXMgaGlkZGVuIGluc2lkZSBhbiBJSUZFIGFuZFxuICogcmV0dXJuZWQgdG8gYmUgYXNzaWduZWQgdG8gYSB2YXJpYWJsZSBvdXRzaWRlIHRoZSBJSUZFLCB3aGljaCBpcyB3aGF0IHRoZSByZXN0IG9mIHRoZSBwcm9ncmFtXG4gKiBpbnRlcmFjdHMgd2l0aC5cbiAqXG4gKiBHaXZlbiB0aGUgaW5uZXIgZnVuY3Rpb24gZGVjbGFyYXRpb24sIHdlIHdhbnQgdG8gZ2V0IHRvIHRoZSBkZWNsYXJhdGlvbiBvZiB0aGUgb3V0ZXIgdmFyaWFibGVcbiAqIHRoYXQgcmVwcmVzZW50cyB0aGUgY2xhc3MuXG4gKlxuICogQHBhcmFtIG5vZGUgYSBub2RlIHRoYXQgY291bGQgYmUgdGhlIGZ1bmN0aW9uIGV4cHJlc3Npb24gaW5zaWRlIGFuIEVTNSBjbGFzcyBJSUZFLlxuICogQHJldHVybnMgdGhlIG91dGVyIHZhcmlhYmxlIGRlY2xhcmF0aW9uIG9yIGB1bmRlZmluZWRgIGlmIGl0IGlzIG5vdCBhIFwiY2xhc3NcIi5cbiAqL1xuZnVuY3Rpb24gZ2V0Q2xhc3NEZWNsYXJhdGlvbkZyb21Jbm5lckZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZTogdHMuTm9kZSk6XG4gICAgQ2xhc3NEZWNsYXJhdGlvbjx0cy5WYXJpYWJsZURlY2xhcmF0aW9uPnxudWxsIHtcbiAgaWYgKHRzLmlzRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlKSkge1xuICAgIC8vIEl0IG1pZ2h0IGJlIHRoZSBmdW5jdGlvbiBleHByZXNzaW9uIGluc2lkZSB0aGUgSUlGRS4gV2UgbmVlZCB0byBnbyA1IGxldmVscyB1cC4uLlxuXG4gICAgLy8gMS4gSUlGRSBib2R5LlxuICAgIGxldCBvdXRlck5vZGUgPSBub2RlLnBhcmVudDtcbiAgICBpZiAoIW91dGVyTm9kZSB8fCAhdHMuaXNCbG9jayhvdXRlck5vZGUpKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIDIuIElJRkUgZnVuY3Rpb24gZXhwcmVzc2lvbi5cbiAgICBvdXRlck5vZGUgPSBvdXRlck5vZGUucGFyZW50O1xuICAgIGlmICghb3V0ZXJOb2RlIHx8ICF0cy5pc0Z1bmN0aW9uRXhwcmVzc2lvbihvdXRlck5vZGUpKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIDMuIElJRkUgY2FsbCBleHByZXNzaW9uLlxuICAgIG91dGVyTm9kZSA9IG91dGVyTm9kZS5wYXJlbnQ7XG4gICAgaWYgKCFvdXRlck5vZGUgfHwgIXRzLmlzQ2FsbEV4cHJlc3Npb24ob3V0ZXJOb2RlKSkgcmV0dXJuIG51bGw7XG5cbiAgICAvLyA0LiBQYXJlbnRoZXNpcyBhcm91bmQgSUlGRS5cbiAgICBvdXRlck5vZGUgPSBvdXRlck5vZGUucGFyZW50O1xuICAgIGlmICghb3V0ZXJOb2RlIHx8ICF0cy5pc1BhcmVudGhlc2l6ZWRFeHByZXNzaW9uKG91dGVyTm9kZSkpIHJldHVybiBudWxsO1xuXG4gICAgLy8gNS4gT3V0ZXIgdmFyaWFibGUgZGVjbGFyYXRpb24uXG4gICAgb3V0ZXJOb2RlID0gb3V0ZXJOb2RlLnBhcmVudDtcbiAgICBpZiAoIW91dGVyTm9kZSB8fCAhdHMuaXNWYXJpYWJsZURlY2xhcmF0aW9uKG91dGVyTm9kZSkpIHJldHVybiBudWxsO1xuXG4gICAgLy8gRmluYWxseSwgZW5zdXJlIHRoYXQgdGhlIHZhcmlhYmxlIGRlY2xhcmF0aW9uIGhhcyBhIGBuYW1lYCBpZGVudGlmaWVyLlxuICAgIHJldHVybiBoYXNOYW1lSWRlbnRpZmllcihvdXRlck5vZGUpID8gb3V0ZXJOb2RlIDogbnVsbDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWlmZUJvZHkoZGVjbGFyYXRpb246IHRzLkRlY2xhcmF0aW9uKTogdHMuQmxvY2t8dW5kZWZpbmVkIHtcbiAgaWYgKCF0cy5pc1ZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb24pIHx8ICFkZWNsYXJhdGlvbi5pbml0aWFsaXplcikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBSZWNvZ25pemUgYSB2YXJpYWJsZSBkZWNsYXJhdGlvbiBvZiBvbmUgb2YgdGhlIGZvcm1zOlxuICAvLyAtIGB2YXIgTXlDbGFzcyA9IChmdW5jdGlvbiAoKSB7IC4uLiB9KCkpO2BcbiAgLy8gLSBgdmFyIE15Q2xhc3MgPSBNeUNsYXNzXzEgPSAoZnVuY3Rpb24gKCkgeyAuLi4gfSgpKTtgXG4gIGxldCBwYXJlbnRoZXNpemVkQ2FsbCA9IGRlY2xhcmF0aW9uLmluaXRpYWxpemVyO1xuICB3aGlsZSAoaXNBc3NpZ25tZW50KHBhcmVudGhlc2l6ZWRDYWxsKSkge1xuICAgIHBhcmVudGhlc2l6ZWRDYWxsID0gcGFyZW50aGVzaXplZENhbGwucmlnaHQ7XG4gIH1cblxuICBjb25zdCBjYWxsID0gc3RyaXBQYXJlbnRoZXNlcyhwYXJlbnRoZXNpemVkQ2FsbCk7XG4gIGlmICghdHMuaXNDYWxsRXhwcmVzc2lvbihjYWxsKSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBmbiA9IHN0cmlwUGFyZW50aGVzZXMoY2FsbC5leHByZXNzaW9uKTtcbiAgaWYgKCF0cy5pc0Z1bmN0aW9uRXhwcmVzc2lvbihmbikpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIGZuLmJvZHk7XG59XG5cbmZ1bmN0aW9uIGdldFJldHVybklkZW50aWZpZXIoYm9keTogdHMuQmxvY2spOiB0cy5JZGVudGlmaWVyfHVuZGVmaW5lZCB7XG4gIGNvbnN0IHJldHVyblN0YXRlbWVudCA9IGJvZHkuc3RhdGVtZW50cy5maW5kKHRzLmlzUmV0dXJuU3RhdGVtZW50KTtcbiAgaWYgKCFyZXR1cm5TdGF0ZW1lbnQgfHwgIXJldHVyblN0YXRlbWVudC5leHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodHMuaXNJZGVudGlmaWVyKHJldHVyblN0YXRlbWVudC5leHByZXNzaW9uKSkge1xuICAgIHJldHVybiByZXR1cm5TdGF0ZW1lbnQuZXhwcmVzc2lvbjtcbiAgfVxuICBpZiAoaXNBc3NpZ25tZW50KHJldHVyblN0YXRlbWVudC5leHByZXNzaW9uKSAmJlxuICAgICAgdHMuaXNJZGVudGlmaWVyKHJldHVyblN0YXRlbWVudC5leHByZXNzaW9uLmxlZnQpKSB7XG4gICAgcmV0dXJuIHJldHVyblN0YXRlbWVudC5leHByZXNzaW9uLmxlZnQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0UmV0dXJuU3RhdGVtZW50KGRlY2xhcmF0aW9uOiB0cy5FeHByZXNzaW9ufHVuZGVmaW5lZCk6IHRzLlJldHVyblN0YXRlbWVudHx1bmRlZmluZWQge1xuICByZXR1cm4gZGVjbGFyYXRpb24gJiYgdHMuaXNGdW5jdGlvbkV4cHJlc3Npb24oZGVjbGFyYXRpb24pID9cbiAgICAgIGRlY2xhcmF0aW9uLmJvZHkuc3RhdGVtZW50cy5maW5kKHRzLmlzUmV0dXJuU3RhdGVtZW50KSA6XG4gICAgICB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHJlZmxlY3RBcnJheUVsZW1lbnQoZWxlbWVudDogdHMuRXhwcmVzc2lvbikge1xuICByZXR1cm4gdHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihlbGVtZW50KSA/IHJlZmxlY3RPYmplY3RMaXRlcmFsKGVsZW1lbnQpIDogbnVsbDtcbn1cblxuLyoqXG4gKiBBIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIG1heSBoYXZlIGJlZW4gXCJzeW50aGVzaXplZFwiIGJ5IFR5cGVTY3JpcHQgZHVyaW5nIEphdmFTY3JpcHQgZW1pdCxcbiAqIGluIHRoZSBjYXNlIG5vIHVzZXItZGVmaW5lZCBjb25zdHJ1Y3RvciBleGlzdHMgYW5kIGUuZy4gcHJvcGVydHkgaW5pdGlhbGl6ZXJzIGFyZSB1c2VkLlxuICogVGhvc2UgaW5pdGlhbGl6ZXJzIG5lZWQgdG8gYmUgZW1pdHRlZCBpbnRvIGEgY29uc3RydWN0b3IgaW4gSmF2YVNjcmlwdCwgc28gdGhlIFR5cGVTY3JpcHRcbiAqIGNvbXBpbGVyIGdlbmVyYXRlcyBhIHN5bnRoZXRpYyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBXZSBuZWVkIHRvIGlkZW50aWZ5IHN1Y2ggY29uc3RydWN0b3JzIGFzIG5nY2MgbmVlZHMgdG8gYmUgYWJsZSB0byB0ZWxsIGlmIGEgY2xhc3MgZGlkXG4gKiBvcmlnaW5hbGx5IGhhdmUgYSBjb25zdHJ1Y3RvciBpbiB0aGUgVHlwZVNjcmlwdCBzb3VyY2UuIEZvciBFUzUsIHdlIGNhbiBub3QgdGVsbCBhblxuICogZW1wdHkgY29uc3RydWN0b3IgYXBhcnQgZnJvbSBhIHN5bnRoZXNpemVkIGNvbnN0cnVjdG9yLCBidXQgZm9ydHVuYXRlbHkgdGhhdCBkb2VzIG5vdFxuICogbWF0dGVyIGZvciB0aGUgY29kZSBnZW5lcmF0ZWQgYnkgbmd0c2MuXG4gKlxuICogV2hlbiBhIGNsYXNzIGhhcyBhIHN1cGVyY2xhc3MgaG93ZXZlciwgYSBzeW50aGVzaXplZCBjb25zdHJ1Y3RvciBtdXN0IG5vdCBiZSBjb25zaWRlcmVkXG4gKiBhcyBhIHVzZXItZGVmaW5lZCBjb25zdHJ1Y3RvciBhcyB0aGF0IHByZXZlbnRzIGEgYmFzZSBmYWN0b3J5IGNhbGwgZnJvbSBiZWluZyBjcmVhdGVkIGJ5XG4gKiBuZ3RzYywgcmVzdWx0aW5nIGluIGEgZmFjdG9yeSBmdW5jdGlvbiB0aGF0IGRvZXMgbm90IGluamVjdCB0aGUgZGVwZW5kZW5jaWVzIG9mIHRoZVxuICogc3VwZXJjbGFzcy4gSGVuY2UsIHdlIGlkZW50aWZ5IGEgZGVmYXVsdCBzeW50aGVzaXplZCBzdXBlciBjYWxsIGluIHRoZSBjb25zdHJ1Y3RvciBib2R5LFxuICogYWNjb3JkaW5nIHRvIHRoZSBzdHJ1Y3R1cmUgdGhhdCBUeXBlU2NyaXB0J3MgRVMyMDE1IHRvIEVTNSB0cmFuc2Zvcm1lciBnZW5lcmF0ZXMgaW5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL3YzLjIuMi9zcmMvY29tcGlsZXIvdHJhbnNmb3JtZXJzL2VzMjAxNS50cyNMMTA4Mi1MMTA5OFxuICpcbiAqIEBwYXJhbSBjb25zdHJ1Y3RvciBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIHRlc3RcbiAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGNvbnN0cnVjdG9yIGFwcGVhcnMgdG8gaGF2ZSBiZWVuIHN5bnRoZXNpemVkXG4gKi9cbmZ1bmN0aW9uIGlzU3ludGhlc2l6ZWRDb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvcjogdHMuRnVuY3Rpb25EZWNsYXJhdGlvbik6IGJvb2xlYW4ge1xuICBpZiAoIWNvbnN0cnVjdG9yLmJvZHkpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBmaXJzdFN0YXRlbWVudCA9IGNvbnN0cnVjdG9yLmJvZHkuc3RhdGVtZW50c1swXTtcbiAgaWYgKCFmaXJzdFN0YXRlbWVudCkgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiBpc1N5bnRoZXNpemVkU3VwZXJUaGlzQXNzaWdubWVudChmaXJzdFN0YXRlbWVudCkgfHxcbiAgICAgIGlzU3ludGhlc2l6ZWRTdXBlclJldHVyblN0YXRlbWVudChmaXJzdFN0YXRlbWVudCk7XG59XG5cbi8qKlxuICogSWRlbnRpZmllcyBhIHN5bnRoZXNpemVkIHN1cGVyIGNhbGwgb2YgdGhlIGZvcm06XG4gKlxuICogYGBgXG4gKiB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBzdGF0ZW1lbnQgYSBzdGF0ZW1lbnQgdGhhdCBtYXkgYmUgYSBzeW50aGVzaXplZCBzdXBlciBjYWxsXG4gKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBzdGF0ZW1lbnQgbG9va3MgbGlrZSBhIHN5bnRoZXNpemVkIHN1cGVyIGNhbGxcbiAqL1xuZnVuY3Rpb24gaXNTeW50aGVzaXplZFN1cGVyVGhpc0Fzc2lnbm1lbnQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBib29sZWFuIHtcbiAgaWYgKCF0cy5pc1ZhcmlhYmxlU3RhdGVtZW50KHN0YXRlbWVudCkpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCB2YXJpYWJsZURlY2xhcmF0aW9ucyA9IHN0YXRlbWVudC5kZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zO1xuICBpZiAodmFyaWFibGVEZWNsYXJhdGlvbnMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgdmFyaWFibGVEZWNsYXJhdGlvbiA9IHZhcmlhYmxlRGVjbGFyYXRpb25zWzBdO1xuICBpZiAoIXRzLmlzSWRlbnRpZmllcih2YXJpYWJsZURlY2xhcmF0aW9uLm5hbWUpIHx8XG4gICAgICAhdmFyaWFibGVEZWNsYXJhdGlvbi5uYW1lLnRleHQuc3RhcnRzV2l0aCgnX3RoaXMnKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgaW5pdGlhbGl6ZXIgPSB2YXJpYWJsZURlY2xhcmF0aW9uLmluaXRpYWxpemVyO1xuICBpZiAoIWluaXRpYWxpemVyKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIGlzU3ludGhlc2l6ZWREZWZhdWx0U3VwZXJDYWxsKGluaXRpYWxpemVyKTtcbn1cbi8qKlxuICogSWRlbnRpZmllcyBhIHN5bnRoZXNpemVkIHN1cGVyIGNhbGwgb2YgdGhlIGZvcm06XG4gKlxuICogYGBgXG4gKiByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gc3RhdGVtZW50IGEgc3RhdGVtZW50IHRoYXQgbWF5IGJlIGEgc3ludGhlc2l6ZWQgc3VwZXIgY2FsbFxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgc3RhdGVtZW50IGxvb2tzIGxpa2UgYSBzeW50aGVzaXplZCBzdXBlciBjYWxsXG4gKi9cbmZ1bmN0aW9uIGlzU3ludGhlc2l6ZWRTdXBlclJldHVyblN0YXRlbWVudChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IGJvb2xlYW4ge1xuICBpZiAoIXRzLmlzUmV0dXJuU3RhdGVtZW50KHN0YXRlbWVudCkpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBleHByZXNzaW9uID0gc3RhdGVtZW50LmV4cHJlc3Npb247XG4gIGlmICghZXhwcmVzc2lvbikgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiBpc1N5bnRoZXNpemVkRGVmYXVsdFN1cGVyQ2FsbChleHByZXNzaW9uKTtcbn1cblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIHRoZSBleHByZXNzaW9uIGlzIG9mIHRoZSBmb3JtOlxuICpcbiAqIGBgYFxuICogX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gKiBgYGBcbiAqXG4gKiBUaGlzIHN0cnVjdHVyZSBpcyBnZW5lcmF0ZWQgYnkgVHlwZVNjcmlwdCB3aGVuIHRyYW5zZm9ybWluZyBFUzIwMTUgdG8gRVM1LCBzZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL3YzLjIuMi9zcmMvY29tcGlsZXIvdHJhbnNmb3JtZXJzL2VzMjAxNS50cyNMMTE0OC1MMTE2M1xuICpcbiAqIEBwYXJhbSBleHByZXNzaW9uIGFuIGV4cHJlc3Npb24gdGhhdCBtYXkgcmVwcmVzZW50IGEgZGVmYXVsdCBzdXBlciBjYWxsXG4gKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBleHByZXNzaW9uIGNvcnJlc3BvbmRzIHdpdGggdGhlIGFib3ZlIGZvcm1cbiAqL1xuZnVuY3Rpb24gaXNTeW50aGVzaXplZERlZmF1bHRTdXBlckNhbGwoZXhwcmVzc2lvbjogdHMuRXhwcmVzc2lvbik6IGJvb2xlYW4ge1xuICBpZiAoIWlzQmluYXJ5RXhwcihleHByZXNzaW9uLCB0cy5TeW50YXhLaW5kLkJhckJhclRva2VuKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoZXhwcmVzc2lvbi5yaWdodC5raW5kICE9PSB0cy5TeW50YXhLaW5kLlRoaXNLZXl3b3JkKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgbGVmdCA9IGV4cHJlc3Npb24ubGVmdDtcbiAgaWYgKCFpc0JpbmFyeUV4cHIobGVmdCwgdHMuU3ludGF4S2luZC5BbXBlcnNhbmRBbXBlcnNhbmRUb2tlbikpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gaXNTdXBlck5vdE51bGwobGVmdC5sZWZ0KSAmJiBpc1N1cGVyQXBwbHlDYWxsKGxlZnQucmlnaHQpO1xufVxuXG5mdW5jdGlvbiBpc1N1cGVyTm90TnVsbChleHByZXNzaW9uOiB0cy5FeHByZXNzaW9uKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc0JpbmFyeUV4cHIoZXhwcmVzc2lvbiwgdHMuU3ludGF4S2luZC5FeGNsYW1hdGlvbkVxdWFsc0VxdWFsc1Rva2VuKSAmJlxuICAgICAgaXNTdXBlcklkZW50aWZpZXIoZXhwcmVzc2lvbi5sZWZ0KTtcbn1cblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIHRoZSBleHByZXNzaW9uIGlzIG9mIHRoZSBmb3JtXG4gKlxuICogYGBgXG4gKiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICogYGBgXG4gKlxuICogQHBhcmFtIGV4cHJlc3Npb24gYW4gZXhwcmVzc2lvbiB0aGF0IG1heSByZXByZXNlbnQgYSBkZWZhdWx0IHN1cGVyIGNhbGxcbiAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGV4cHJlc3Npb24gY29ycmVzcG9uZHMgd2l0aCB0aGUgYWJvdmUgZm9ybVxuICovXG5mdW5jdGlvbiBpc1N1cGVyQXBwbHlDYWxsKGV4cHJlc3Npb246IHRzLkV4cHJlc3Npb24pOiBib29sZWFuIHtcbiAgaWYgKCF0cy5pc0NhbGxFeHByZXNzaW9uKGV4cHJlc3Npb24pIHx8IGV4cHJlc3Npb24uYXJndW1lbnRzLmxlbmd0aCAhPT0gMikgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IHRhcmdldEZuID0gZXhwcmVzc2lvbi5leHByZXNzaW9uO1xuICBpZiAoIXRzLmlzUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uKHRhcmdldEZuKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzU3VwZXJJZGVudGlmaWVyKHRhcmdldEZuLmV4cHJlc3Npb24pKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0YXJnZXRGbi5uYW1lLnRleHQgIT09ICdhcHBseScpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCB0aGlzQXJndW1lbnQgPSBleHByZXNzaW9uLmFyZ3VtZW50c1swXTtcbiAgaWYgKHRoaXNBcmd1bWVudC5raW5kICE9PSB0cy5TeW50YXhLaW5kLlRoaXNLZXl3b3JkKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgYXJndW1lbnRzQXJndW1lbnQgPSBleHByZXNzaW9uLmFyZ3VtZW50c1sxXTtcbiAgcmV0dXJuIHRzLmlzSWRlbnRpZmllcihhcmd1bWVudHNBcmd1bWVudCkgJiYgYXJndW1lbnRzQXJndW1lbnQudGV4dCA9PT0gJ2FyZ3VtZW50cyc7XG59XG5cbmZ1bmN0aW9uIGlzQmluYXJ5RXhwcihcbiAgICBleHByZXNzaW9uOiB0cy5FeHByZXNzaW9uLCBvcGVyYXRvcjogdHMuQmluYXJ5T3BlcmF0b3IpOiBleHByZXNzaW9uIGlzIHRzLkJpbmFyeUV4cHJlc3Npb24ge1xuICByZXR1cm4gdHMuaXNCaW5hcnlFeHByZXNzaW9uKGV4cHJlc3Npb24pICYmIGV4cHJlc3Npb24ub3BlcmF0b3JUb2tlbi5raW5kID09PSBvcGVyYXRvcjtcbn1cblxuZnVuY3Rpb24gaXNTdXBlcklkZW50aWZpZXIobm9kZTogdHMuTm9kZSk6IGJvb2xlYW4ge1xuICAvLyBWZXJpZnkgdGhhdCB0aGUgaWRlbnRpZmllciBpcyBwcmVmaXhlZCB3aXRoIGBfc3VwZXJgLiBXZSBkb24ndCB0ZXN0IGZvciBlcXVpdmFsZW5jZVxuICAvLyBhcyBUeXBlU2NyaXB0IG1heSBoYXZlIHN1ZmZpeGVkIHRoZSBuYW1lLCBlLmcuIGBfc3VwZXJfMWAgdG8gYXZvaWQgbmFtZSBjb25mbGljdHMuXG4gIC8vIFJlcXVpcmluZyBvbmx5IGEgcHJlZml4IHNob3VsZCBiZSBzdWZmaWNpZW50bHkgYWNjdXJhdGUuXG4gIHJldHVybiB0cy5pc0lkZW50aWZpZXIobm9kZSkgJiYgbm9kZS50ZXh0LnN0YXJ0c1dpdGgoJ19zdXBlcicpO1xufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBzdGF0ZW1lbnQgdG8gZXh0cmFjdCB0aGUgRVNNNSBwYXJhbWV0ZXIgaW5pdGlhbGl6ZXIgaWYgdGhlcmUgaXMgb25lLlxuICogSWYgb25lIGlzIGZvdW5kLCBhZGQgaXQgdG8gdGhlIGFwcHJvcHJpYXRlIHBhcmFtZXRlciBpbiB0aGUgYHBhcmFtZXRlcnNgIGNvbGxlY3Rpb24uXG4gKlxuICogVGhlIGZvcm0gd2UgYXJlIGxvb2tpbmcgZm9yIGlzOlxuICpcbiAqIGBgYFxuICogaWYgKGFyZyA9PT0gdm9pZCAwKSB7IGFyZyA9IGluaXRpYWxpemVyOyB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gc3RhdGVtZW50IGEgc3RhdGVtZW50IHRoYXQgbWF5IGJlIGluaXRpYWxpemluZyBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcbiAqIEBwYXJhbSBwYXJhbWV0ZXJzIHRoZSBjb2xsZWN0aW9uIG9mIHBhcmFtZXRlcnMgdGhhdCB3ZXJlIGZvdW5kIGluIHRoZSBmdW5jdGlvbiBkZWZpbml0aW9uXG4gKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBzdGF0ZW1lbnQgd2FzIGEgcGFyYW1ldGVyIGluaXRpYWxpemVyXG4gKi9cbmZ1bmN0aW9uIHJlZmxlY3RQYXJhbUluaXRpYWxpemVyKHN0YXRlbWVudDogdHMuU3RhdGVtZW50LCBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJbXSkge1xuICBpZiAodHMuaXNJZlN0YXRlbWVudChzdGF0ZW1lbnQpICYmIGlzVW5kZWZpbmVkQ29tcGFyaXNvbihzdGF0ZW1lbnQuZXhwcmVzc2lvbikgJiZcbiAgICAgIHRzLmlzQmxvY2soc3RhdGVtZW50LnRoZW5TdGF0ZW1lbnQpICYmIHN0YXRlbWVudC50aGVuU3RhdGVtZW50LnN0YXRlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3QgaWZTdGF0ZW1lbnRDb21wYXJpc29uID0gc3RhdGVtZW50LmV4cHJlc3Npb247ICAgICAgICAgICAvLyAoYXJnID09PSB2b2lkIDApXG4gICAgY29uc3QgdGhlblN0YXRlbWVudCA9IHN0YXRlbWVudC50aGVuU3RhdGVtZW50LnN0YXRlbWVudHNbMF07ICAvLyBhcmcgPSBpbml0aWFsaXplcjtcbiAgICBpZiAoaXNBc3NpZ25tZW50U3RhdGVtZW50KHRoZW5TdGF0ZW1lbnQpKSB7XG4gICAgICBjb25zdCBjb21wYXJpc29uTmFtZSA9IGlmU3RhdGVtZW50Q29tcGFyaXNvbi5sZWZ0LnRleHQ7XG4gICAgICBjb25zdCBhc3NpZ25tZW50TmFtZSA9IHRoZW5TdGF0ZW1lbnQuZXhwcmVzc2lvbi5sZWZ0LnRleHQ7XG4gICAgICBpZiAoY29tcGFyaXNvbk5hbWUgPT09IGFzc2lnbm1lbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlciA9IHBhcmFtZXRlcnMuZmluZChwID0+IHAubmFtZSA9PT0gY29tcGFyaXNvbk5hbWUpO1xuICAgICAgICBpZiAocGFyYW1ldGVyKSB7XG4gICAgICAgICAgcGFyYW1ldGVyLmluaXRpYWxpemVyID0gdGhlblN0YXRlbWVudC5leHByZXNzaW9uLnJpZ2h0O1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWRDb21wYXJpc29uKGV4cHJlc3Npb246IHRzLkV4cHJlc3Npb24pOiBleHByZXNzaW9uIGlzIHRzLkV4cHJlc3Npb24mXG4gICAge2xlZnQ6IHRzLklkZW50aWZpZXIsIHJpZ2h0OiB0cy5FeHByZXNzaW9ufSB7XG4gIHJldHVybiB0cy5pc0JpbmFyeUV4cHJlc3Npb24oZXhwcmVzc2lvbikgJiZcbiAgICAgIGV4cHJlc3Npb24ub3BlcmF0b3JUb2tlbi5raW5kID09PSB0cy5TeW50YXhLaW5kLkVxdWFsc0VxdWFsc0VxdWFsc1Rva2VuICYmXG4gICAgICB0cy5pc1ZvaWRFeHByZXNzaW9uKGV4cHJlc3Npb24ucmlnaHQpICYmIHRzLmlzSWRlbnRpZmllcihleHByZXNzaW9uLmxlZnQpO1xufVxuIl19