import { __decorate, __values, __spread, __param, __extends } from 'tslib';
import { ɵɵdefineInjectable, Injectable, Input, Directive, Optional, HostBinding, Component, Renderer2, ElementRef, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { findIconDefinition, parse, icon, counter, text } from '@fortawesome/fontawesome-svg-core';

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
    FaConfig.ɵprov = ɵɵdefineInjectable({ factory: function FaConfig_Factory() { return new FaConfig(); }, token: FaConfig, providedIn: "root" });
    FaConfig = __decorate([
        Injectable({ providedIn: 'root' })
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
    FaIconLibrary.ɵprov = ɵɵdefineInjectable({ factory: function FaIconLibrary_Factory() { return new FaIconLibrary(); }, token: FaIconLibrary, providedIn: "root" });
    FaIconLibrary = __decorate([
        Injectable({ providedIn: 'root' })
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
        Input()
    ], FaStackItemSizeDirective.prototype, "stackItemSize", void 0);
    __decorate([
        Input()
    ], FaStackItemSizeDirective.prototype, "size", void 0);
    FaStackItemSizeDirective = __decorate([
        Directive({
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
        var globalDefinition = findIconDefinition(lookup);
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
        var parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;
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
        var renderedIcon = icon(definition, params);
        this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html.join('\n'));
    };
    FaIconComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: FaConfig },
        { type: FaIconLibrary },
        { type: FaStackItemSizeDirective, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input()
    ], FaIconComponent.prototype, "icon", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "title", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "spin", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "pulse", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "mask", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "styles", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "flip", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "size", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "pull", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "border", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "inverse", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "symbol", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "rotate", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "fixedWidth", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "classes", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "transform", void 0);
    __decorate([
        Input()
    ], FaIconComponent.prototype, "a11yRole", void 0);
    __decorate([
        HostBinding('innerHTML')
    ], FaIconComponent.prototype, "renderedIconHTML", void 0);
    FaIconComponent = __decorate([
        Component({
            selector: 'fa-icon',
            template: "",
            host: {
                class: 'ng-fa-icon',
                '[attr.title]': 'title',
            }
        }),
        __param(3, Optional())
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
        Input()
    ], FaDuotoneIconComponent.prototype, "swapOpacity", void 0);
    __decorate([
        Input()
    ], FaDuotoneIconComponent.prototype, "primaryOpacity", void 0);
    __decorate([
        Input()
    ], FaDuotoneIconComponent.prototype, "secondaryOpacity", void 0);
    __decorate([
        Input()
    ], FaDuotoneIconComponent.prototype, "primaryColor", void 0);
    __decorate([
        Input()
    ], FaDuotoneIconComponent.prototype, "secondaryColor", void 0);
    FaDuotoneIconComponent = __decorate([
        Component({
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
        { type: Renderer2 },
        { type: ElementRef },
        { type: FaConfig }
    ]; };
    __decorate([
        Input()
    ], FaLayersComponent.prototype, "size", void 0);
    __decorate([
        Input(), HostBinding('class.fa-fw')
    ], FaLayersComponent.prototype, "fixedWidth", void 0);
    FaLayersComponent = __decorate([
        Component({
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
        this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(counter(this.content || '', params).html.join(''));
    };
    FaLayersCounterComponent.ctorParameters = function () { return [
        { type: FaLayersComponent, decorators: [{ type: Optional }] },
        { type: DomSanitizer }
    ]; };
    __decorate([
        Input()
    ], FaLayersCounterComponent.prototype, "content", void 0);
    __decorate([
        Input()
    ], FaLayersCounterComponent.prototype, "title", void 0);
    __decorate([
        Input()
    ], FaLayersCounterComponent.prototype, "styles", void 0);
    __decorate([
        Input()
    ], FaLayersCounterComponent.prototype, "classes", void 0);
    __decorate([
        HostBinding('innerHTML')
    ], FaLayersCounterComponent.prototype, "renderedHTML", void 0);
    FaLayersCounterComponent = __decorate([
        Component({
            selector: 'fa-layers-counter',
            template: '',
            host: {
                class: 'ng-fa-layers-counter',
            }
        }),
        __param(0, Optional())
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
        var parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;
        return {
            transform: parsedTransform,
            classes: __spread(faClassList(classOpts), this.classes),
            title: this.title,
            styles: this.styles,
        };
    };
    FaLayersTextComponent.prototype.updateContent = function (params) {
        this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(text(this.content || '', params).html.join('\n'));
    };
    FaLayersTextComponent.ctorParameters = function () { return [
        { type: FaLayersComponent, decorators: [{ type: Optional }] },
        { type: DomSanitizer }
    ]; };
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "content", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "title", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "styles", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "classes", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "spin", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "pulse", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "flip", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "size", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "pull", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "border", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "inverse", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "rotate", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "fixedWidth", void 0);
    __decorate([
        Input()
    ], FaLayersTextComponent.prototype, "transform", void 0);
    __decorate([
        HostBinding('innerHTML')
    ], FaLayersTextComponent.prototype, "renderedHTML", void 0);
    FaLayersTextComponent = __decorate([
        Component({
            selector: 'fa-layers-text',
            template: '',
            host: {
                class: 'ng-fa-layers-text',
            }
        }),
        __param(0, Optional())
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
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], FaStackComponent.prototype, "size", void 0);
    FaStackComponent = __decorate([
        Component({
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
        NgModule({
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

/**
 * Generated bundle index. Do not edit.
 */

export { FaConfig, FaDuotoneIconComponent, FaIconComponent, FaIconLibrary, FaLayersComponent, FaLayersCounterComponent, FaLayersTextComponent, FaStackComponent, FaStackItemSizeDirective, FontAwesomeModule };
//# sourceMappingURL=angular-fontawesome.js.map
