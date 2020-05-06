(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@fortawesome/fontawesome-svg-core')) :
    typeof define === 'function' && define.amd ? define('@fortawesome/angular-fontawesome', ['exports', '@angular/core', '@angular/platform-browser', '@fortawesome/fontawesome-svg-core'], factory) :
    (global = global || self, factory((global.fortawesome = global.fortawesome || {}, global.fortawesome['angular-fontawesome'] = {}), global.ng.core, global.ng.platformBrowser, global.fontawesomeSvgCore));
}(this, (function (exports, core, platformBrowser, fontawesomeSvgCore) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var FaConfig = /** @class */ (function () {
        function FaConfig() {
            /**
             * Default prefix to use, when one is not provided with the icon name.
             *
             * @default 'fas'
             */
            this.defaultPrefix = 'fas';
            /**
             * Provides a fallback icon to use whilst main icon is being loaded asynchronously.
             * When value is null, then fa-icon component will throw an error if icon input is missing.
             * When value is not null, then the provided icon will be used as a fallback icon if icon input is missing.
             *
             * @default null
             */
            this.fallbackIcon = null;
            /**
             * Whether components should lookup icon definitions in the global icon
             * library (the one available from
             * `import { library } from '@fortawesome/fontawesome-svg-core')`.
             *
             * See https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/icon-library.md
             * for detailed description of library modes.
             *
             * - 'unset' - Components should lookup icon definitions in the global library
             * and emit warning if they find a definition there. This option is a default
             * to assist existing applications with a migration. Applications are expected
             * to switch to using {@link FaIconLibrary}.
             * - true - Components should lookup icon definitions in the global library.
             * Note that global icon library is deprecated and support for it will be
             * removed. This option can be used to temporarily suppress warnings.
             * - false - Components should not lookup icon definitions in the global
             * library. Library will throw an error if missing icon is found in the global
             * library.
             *
             * @deprecated This option is deprecated since 0.5.0. In 0.6.0 default will
             * be changed to false. In 0.7.0 the option will be removed together with the
             * support for the global icon library.
             *
             * @default false
             */
            this.globalLibrary = false;
        }
        FaConfig.ɵprov = core["ɵɵdefineInjectable"]({ factory: function FaConfig_Factory() { return new FaConfig(); }, token: FaConfig, providedIn: "root" });
        FaConfig = __decorate([
            core.Injectable({ providedIn: 'root' })
        ], FaConfig);
        return FaConfig;
    }());

    var FaIconLibrary = /** @class */ (function () {
        function FaIconLibrary() {
            this.definitions = {};
        }
        FaIconLibrary.prototype.addIcons = function () {
            var e_1, _a;
            var icons = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                icons[_i] = arguments[_i];
            }
            try {
                for (var icons_1 = __values(icons), icons_1_1 = icons_1.next(); !icons_1_1.done; icons_1_1 = icons_1.next()) {
                    var icon = icons_1_1.value;
                    if (!(icon.prefix in this.definitions)) {
                        this.definitions[icon.prefix] = {};
                    }
                    this.definitions[icon.prefix][icon.iconName] = icon;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (icons_1_1 && !icons_1_1.done && (_a = icons_1.return)) _a.call(icons_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        FaIconLibrary.prototype.addIconPacks = function () {
            var e_2, _a;
            var packs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                packs[_i] = arguments[_i];
            }
            var _loop_1 = function (pack) {
                var icons = Object.keys(pack).map(function (key) { return pack[key]; });
                this_1.addIcons.apply(this_1, __spread(icons));
            };
            var this_1 = this;
            try {
                for (var packs_1 = __values(packs), packs_1_1 = packs_1.next(); !packs_1_1.done; packs_1_1 = packs_1.next()) {
                    var pack = packs_1_1.value;
                    _loop_1(pack);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (packs_1_1 && !packs_1_1.done && (_a = packs_1.return)) _a.call(packs_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        FaIconLibrary.prototype.getIconDefinition = function (prefix, name) {
            if (prefix in this.definitions && name in this.definitions[prefix]) {
                return this.definitions[prefix][name];
            }
            return null;
        };
        FaIconLibrary.ɵprov = core["ɵɵdefineInjectable"]({ factory: function FaIconLibrary_Factory() { return new FaIconLibrary(); }, token: FaIconLibrary, providedIn: "root" });
        FaIconLibrary = __decorate([
            core.Injectable({ providedIn: 'root' })
        ], FaIconLibrary);
        return FaIconLibrary;
    }());

    var faWarnIfIconDefinitionMissing = function (iconSpec) {
        throw new Error("Could not find icon with iconName=" + iconSpec.iconName + " and prefix=" + iconSpec.prefix + " in the icon library.");
    };

    var faWarnIfIconSpecMissing = function () {
        throw new Error('Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.');
    };

    /**
     * Fontawesome class list.
     * Returns classes array by props.
     */
    var faClassList = function (props) {
        var _a;
        var classes = (_a = {
                'fa-spin': props.spin,
                'fa-pulse': props.pulse,
                'fa-fw': props.fixedWidth,
                'fa-border': props.border,
                'fa-inverse': props.inverse,
                'fa-layers-counter': props.counter,
                'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
                'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both'
            },
            _a["fa-" + props.size] = props.size !== null,
            _a["fa-rotate-" + props.rotate] = props.rotate !== null,
            _a["fa-pull-" + props.pull] = props.pull !== null,
            _a["fa-stack-" + props.stackItemSize] = props.stackItemSize != null,
            _a);
        return Object.keys(classes)
            .map(function (key) { return (classes[key] ? key : null); })
            .filter(function (key) { return key; });
    };

    /**
     * Returns if is IconLookup or not.
     */
    var isIconLookup = function (i) {
        return i.prefix !== undefined && i.iconName !== undefined;
    };

    /**
     * Normalizing icon spec.
     */
    var faNormalizeIconSpec = function (iconSpec, defaultPrefix) {
        if (isIconLookup(iconSpec)) {
            return iconSpec;
        }
        if (Array.isArray(iconSpec) && iconSpec.length === 2) {
            return { prefix: iconSpec[0], iconName: iconSpec[1] };
        }
        if (typeof iconSpec === 'string') {
            return { prefix: defaultPrefix, iconName: iconSpec };
        }
    };

    var FaStackItemSizeDirective = /** @class */ (function () {
        function FaStackItemSizeDirective() {
            /**
             * Specify whether icon inside {@link FaStackComponent} should be rendered in
             * regular size (1x) or as a larger icon (2x).
             */
            this.stackItemSize = '1x';
        }
        FaStackItemSizeDirective.prototype.ngOnChanges = function (changes) {
            if ('size' in changes) {
                throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. ' +
                    'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.');
            }
        };
        __decorate([
            core.Input()
        ], FaStackItemSizeDirective.prototype, "stackItemSize", void 0);
        __decorate([
            core.Input()
        ], FaStackItemSizeDirective.prototype, "size", void 0);
        FaStackItemSizeDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line:directive-selector
                selector: 'fa-icon[stackItemSize],fa-duotone-icon[stackItemSize]',
            })
        ], FaStackItemSizeDirective);
        return FaStackItemSizeDirective;
    }());

    var FaIconComponent = /** @class */ (function () {
        function FaIconComponent(sanitizer, config, iconLibrary, stackItem) {
            this.sanitizer = sanitizer;
            this.config = config;
            this.iconLibrary = iconLibrary;
            this.stackItem = stackItem;
            this.classes = [];
        }
        FaIconComponent.prototype.ngOnChanges = function (changes) {
            if (this.icon == null && this.config.fallbackIcon == null) {
                return faWarnIfIconSpecMissing();
            }
            var iconToBeRendered = null;
            if (this.icon == null) {
                iconToBeRendered = this.config.fallbackIcon;
            }
            else {
                iconToBeRendered = this.icon;
            }
            if (changes) {
                var iconDefinition = this.findIconDefinition(iconToBeRendered);
                if (iconDefinition != null) {
                    var params = this.buildParams();
                    this.renderIcon(iconDefinition, params);
                }
            }
        };
        /**
         * Programmatically trigger rendering of the icon.
         *
         * This method is useful, when creating {@link FaIconComponent} dynamically or
         * changing its inputs programmatically as in these cases icon won't be
         * re-rendered automatically.
         */
        FaIconComponent.prototype.render = function () {
            this.ngOnChanges({});
        };
        FaIconComponent.prototype.findIconDefinition = function (i) {
            var lookup = faNormalizeIconSpec(i, this.config.defaultPrefix);
            if ('icon' in lookup) {
                return lookup;
            }
            var definition = this.iconLibrary.getIconDefinition(lookup.prefix, lookup.iconName);
            if (definition != null) {
                return definition;
            }
            var globalDefinition = fontawesomeSvgCore.findIconDefinition(lookup);
            if (globalDefinition != null) {
                var message = 'Global icon library is deprecated. ' +
                    'Consult https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md ' +
                    'for the migration instructions.';
                if (this.config.globalLibrary === 'unset') {
                    console.error('FontAwesome: ' + message);
                }
                else if (!this.config.globalLibrary) {
                    throw new Error(message);
                }
                return globalDefinition;
            }
            faWarnIfIconDefinitionMissing(lookup);
            return null;
        };
        FaIconComponent.prototype.buildParams = function () {
            var classOpts = {
                flip: this.flip,
                spin: this.spin,
                pulse: this.pulse,
                border: this.border,
                inverse: this.inverse,
                size: this.size || null,
                pull: this.pull || null,
                rotate: this.rotate || null,
                fixedWidth: typeof this.fixedWidth === 'boolean' ? this.fixedWidth : this.config.fixedWidth,
                stackItemSize: this.stackItem != null ? this.stackItem.stackItemSize : null,
            };
            var parsedTransform = typeof this.transform === 'string' ? fontawesomeSvgCore.parse.transform(this.transform) : this.transform;
            return {
                title: this.title,
                transform: parsedTransform,
                classes: __spread(faClassList(classOpts), this.classes),
                mask: this.mask != null ? this.findIconDefinition(this.mask) : null,
                styles: this.styles != null ? this.styles : {},
                symbol: this.symbol,
                attributes: {
                    role: this.a11yRole,
                },
            };
        };
        FaIconComponent.prototype.renderIcon = function (definition, params) {
            var renderedIcon = fontawesomeSvgCore.icon(definition, params);
            this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html.join('\n'));
        };
        FaIconComponent.ctorParameters = function () { return [
            { type: platformBrowser.DomSanitizer },
            { type: FaConfig },
            { type: FaIconLibrary },
            { type: FaStackItemSizeDirective, decorators: [{ type: core.Optional }] }
        ]; };
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "title", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "spin", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "pulse", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "mask", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "styles", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "flip", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "size", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "pull", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "border", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "inverse", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "symbol", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "rotate", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "fixedWidth", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "classes", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "transform", void 0);
        __decorate([
            core.Input()
        ], FaIconComponent.prototype, "a11yRole", void 0);
        __decorate([
            core.HostBinding('innerHTML')
        ], FaIconComponent.prototype, "renderedIconHTML", void 0);
        FaIconComponent = __decorate([
            core.Component({
                selector: 'fa-icon',
                template: "",
                host: {
                    class: 'ng-fa-icon',
                    '[attr.title]': 'title',
                }
            }),
            __param(3, core.Optional())
        ], FaIconComponent);
        return FaIconComponent;
    }());

    var FaDuotoneIconComponent = /** @class */ (function (_super) {
        __extends(FaDuotoneIconComponent, _super);
        function FaDuotoneIconComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FaDuotoneIconComponent.prototype.findIconDefinition = function (i) {
            var lookup = _super.prototype.findIconDefinition.call(this, i);
            if (lookup != null && lookup.prefix !== 'fad') {
                throw new Error('The specified icon does not appear to be a Duotone icon. ' +
                    'Check that you specified the correct style: ' +
                    ("<fa-duotone-icon [icon]=\"['fab', '" + lookup.iconName + "']\"></fa-duotone-icon> ") +
                    ("or use: <fa-icon icon=\"" + lookup.iconName + "\"></fa-icon> instead."));
            }
            return lookup;
        };
        FaDuotoneIconComponent.prototype.buildParams = function () {
            var params = _super.prototype.buildParams.call(this);
            if (this.swapOpacity === true || this.swapOpacity === 'true') {
                params.classes.push('fa-swap-opacity');
            }
            if (this.primaryOpacity != null) {
                params.styles['--fa-primary-opacity'] = this.primaryOpacity.toString();
            }
            if (this.secondaryOpacity != null) {
                params.styles['--fa-secondary-opacity'] = this.secondaryOpacity.toString();
            }
            if (this.primaryColor != null) {
                params.styles['--fa-primary-color'] = this.primaryColor;
            }
            if (this.secondaryColor != null) {
                params.styles['--fa-secondary-color'] = this.secondaryColor;
            }
            return params;
        };
        __decorate([
            core.Input()
        ], FaDuotoneIconComponent.prototype, "swapOpacity", void 0);
        __decorate([
            core.Input()
        ], FaDuotoneIconComponent.prototype, "primaryOpacity", void 0);
        __decorate([
            core.Input()
        ], FaDuotoneIconComponent.prototype, "secondaryOpacity", void 0);
        __decorate([
            core.Input()
        ], FaDuotoneIconComponent.prototype, "primaryColor", void 0);
        __decorate([
            core.Input()
        ], FaDuotoneIconComponent.prototype, "secondaryColor", void 0);
        FaDuotoneIconComponent = __decorate([
            core.Component({
                selector: 'fa-duotone-icon',
                template: ""
            })
        ], FaDuotoneIconComponent);
        return FaDuotoneIconComponent;
    }(FaIconComponent));

    /**
     * Warns if parent component not existing.
     */
    var faWarnIfParentNotExist = function (parent, parentName, childName) {
        if (!parent) {
            throw new Error(childName + " should be used as child of " + parentName + " only.");
        }
    };

    /**
     * Fontawesome layers.
     */
    var FaLayersComponent = /** @class */ (function () {
        function FaLayersComponent(renderer, elementRef, config) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.config = config;
        }
        FaLayersComponent.prototype.ngOnInit = function () {
            this.renderer.addClass(this.elementRef.nativeElement, 'fa-layers');
            this.fixedWidth = typeof this.fixedWidth === 'boolean' ? this.fixedWidth : this.config.fixedWidth;
        };
        FaLayersComponent.prototype.ngOnChanges = function (changes) {
            if ('size' in changes) {
                if (changes.size.currentValue != null) {
                    this.renderer.addClass(this.elementRef.nativeElement, "fa-" + changes.size.currentValue);
                }
                if (changes.size.previousValue != null) {
                    this.renderer.removeClass(this.elementRef.nativeElement, "fa-" + changes.size.previousValue);
                }
            }
        };
        FaLayersComponent.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: FaConfig }
        ]; };
        __decorate([
            core.Input()
        ], FaLayersComponent.prototype, "size", void 0);
        __decorate([
            core.Input(), core.HostBinding('class.fa-fw')
        ], FaLayersComponent.prototype, "fixedWidth", void 0);
        FaLayersComponent = __decorate([
            core.Component({
                selector: 'fa-layers',
                template: "\n    <ng-content select=\"fa-icon, fa-duotone-icon, fa-layers-text, fa-layers-counter\"></ng-content>\n  "
            })
        ], FaLayersComponent);
        return FaLayersComponent;
    }());

    var FaLayersCounterComponent = /** @class */ (function () {
        function FaLayersCounterComponent(parent, sanitizer) {
            this.parent = parent;
            this.sanitizer = sanitizer;
            this.classes = [];
            faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
        }
        FaLayersCounterComponent.prototype.ngOnChanges = function (changes) {
            if (changes) {
                var params = this.buildParams();
                this.updateContent(params);
            }
        };
        FaLayersCounterComponent.prototype.buildParams = function () {
            return {
                title: this.title,
                classes: this.classes,
                styles: this.styles,
            };
        };
        FaLayersCounterComponent.prototype.updateContent = function (params) {
            this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(fontawesomeSvgCore.counter(this.content || '', params).html.join(''));
        };
        FaLayersCounterComponent.ctorParameters = function () { return [
            { type: FaLayersComponent, decorators: [{ type: core.Optional }] },
            { type: platformBrowser.DomSanitizer }
        ]; };
        __decorate([
            core.Input()
        ], FaLayersCounterComponent.prototype, "content", void 0);
        __decorate([
            core.Input()
        ], FaLayersCounterComponent.prototype, "title", void 0);
        __decorate([
            core.Input()
        ], FaLayersCounterComponent.prototype, "styles", void 0);
        __decorate([
            core.Input()
        ], FaLayersCounterComponent.prototype, "classes", void 0);
        __decorate([
            core.HostBinding('innerHTML')
        ], FaLayersCounterComponent.prototype, "renderedHTML", void 0);
        FaLayersCounterComponent = __decorate([
            core.Component({
                selector: 'fa-layers-counter',
                template: '',
                host: {
                    class: 'ng-fa-layers-counter',
                }
            }),
            __param(0, core.Optional())
        ], FaLayersCounterComponent);
        return FaLayersCounterComponent;
    }());

    var FaLayersTextComponent = /** @class */ (function () {
        function FaLayersTextComponent(parent, sanitizer) {
            this.parent = parent;
            this.sanitizer = sanitizer;
            this.classes = [];
            faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
        }
        FaLayersTextComponent.prototype.ngOnChanges = function (changes) {
            if (changes) {
                var params = this.buildParams();
                this.updateContent(params);
            }
        };
        /**
         * Updating params by component props.
         */
        FaLayersTextComponent.prototype.buildParams = function () {
            var classOpts = {
                flip: this.flip,
                spin: this.spin,
                pulse: this.pulse,
                border: this.border,
                inverse: this.inverse,
                size: this.size || null,
                pull: this.pull || null,
                rotate: this.rotate || null,
                fixedWidth: this.fixedWidth,
            };
            var parsedTransform = typeof this.transform === 'string' ? fontawesomeSvgCore.parse.transform(this.transform) : this.transform;
            return {
                transform: parsedTransform,
                classes: __spread(faClassList(classOpts), this.classes),
                title: this.title,
                styles: this.styles,
            };
        };
        FaLayersTextComponent.prototype.updateContent = function (params) {
            this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(fontawesomeSvgCore.text(this.content || '', params).html.join('\n'));
        };
        FaLayersTextComponent.ctorParameters = function () { return [
            { type: FaLayersComponent, decorators: [{ type: core.Optional }] },
            { type: platformBrowser.DomSanitizer }
        ]; };
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "content", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "title", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "styles", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "classes", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "spin", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "pulse", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "flip", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "size", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "pull", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "border", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "inverse", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "rotate", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "fixedWidth", void 0);
        __decorate([
            core.Input()
        ], FaLayersTextComponent.prototype, "transform", void 0);
        __decorate([
            core.HostBinding('innerHTML')
        ], FaLayersTextComponent.prototype, "renderedHTML", void 0);
        FaLayersTextComponent = __decorate([
            core.Component({
                selector: 'fa-layers-text',
                template: '',
                host: {
                    class: 'ng-fa-layers-text',
                }
            }),
            __param(0, core.Optional())
        ], FaLayersTextComponent);
        return FaLayersTextComponent;
    }());

    var FaStackComponent = /** @class */ (function () {
        function FaStackComponent(renderer, elementRef) {
            this.renderer = renderer;
            this.elementRef = elementRef;
        }
        FaStackComponent.prototype.ngOnInit = function () {
            this.renderer.addClass(this.elementRef.nativeElement, 'fa-stack');
        };
        FaStackComponent.prototype.ngOnChanges = function (changes) {
            if ('size' in changes) {
                if (changes.size.currentValue != null) {
                    this.renderer.addClass(this.elementRef.nativeElement, "fa-" + changes.size.currentValue);
                }
                if (changes.size.previousValue != null) {
                    this.renderer.removeClass(this.elementRef.nativeElement, "fa-" + changes.size.previousValue);
                }
            }
        };
        FaStackComponent.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], FaStackComponent.prototype, "size", void 0);
        FaStackComponent = __decorate([
            core.Component({
                selector: 'fa-stack',
                // TODO: See if it is better to select fa-icon and throw if it does not have stackItemSize directive
                template: "\n    <ng-content select=\"fa-icon[stackItemSize],fa-duotone-icon[stackItemSize]\"></ng-content>\n  "
            })
        ], FaStackComponent);
        return FaStackComponent;
    }());

    var FontAwesomeModule = /** @class */ (function () {
        function FontAwesomeModule() {
        }
        FontAwesomeModule = __decorate([
            core.NgModule({
                declarations: [
                    FaIconComponent,
                    FaDuotoneIconComponent,
                    FaLayersComponent,
                    FaLayersTextComponent,
                    FaLayersCounterComponent,
                    FaStackComponent,
                    FaStackItemSizeDirective,
                ],
                exports: [
                    FaIconComponent,
                    FaDuotoneIconComponent,
                    FaLayersComponent,
                    FaLayersTextComponent,
                    FaLayersCounterComponent,
                    FaStackComponent,
                    FaStackItemSizeDirective,
                ],
                entryComponents: [FaIconComponent, FaDuotoneIconComponent],
            })
        ], FontAwesomeModule);
        return FontAwesomeModule;
    }());

    exports.FaConfig = FaConfig;
    exports.FaDuotoneIconComponent = FaDuotoneIconComponent;
    exports.FaIconComponent = FaIconComponent;
    exports.FaIconLibrary = FaIconLibrary;
    exports.FaLayersComponent = FaLayersComponent;
    exports.FaLayersCounterComponent = FaLayersCounterComponent;
    exports.FaLayersTextComponent = FaLayersTextComponent;
    exports.FaStackComponent = FaStackComponent;
    exports.FaStackItemSizeDirective = FaStackItemSizeDirective;
    exports.FontAwesomeModule = FontAwesomeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-fontawesome.umd.js.map
