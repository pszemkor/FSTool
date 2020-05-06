import { __decorate, __param } from 'tslib';
import { ɵɵdefineInjectable, Injectable, Input, Directive, Optional, HostBinding, Component, Renderer2, ElementRef, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { findIconDefinition, parse, icon, counter, text } from '@fortawesome/fontawesome-svg-core';

let FaConfig = class FaConfig {
    constructor() {
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
};
FaConfig.ɵprov = ɵɵdefineInjectable({ factory: function FaConfig_Factory() { return new FaConfig(); }, token: FaConfig, providedIn: "root" });
FaConfig = __decorate([
    Injectable({ providedIn: 'root' })
], FaConfig);

let FaIconLibrary = class FaIconLibrary {
    constructor() {
        this.definitions = {};
    }
    addIcons(...icons) {
        for (const icon of icons) {
            if (!(icon.prefix in this.definitions)) {
                this.definitions[icon.prefix] = {};
            }
            this.definitions[icon.prefix][icon.iconName] = icon;
        }
    }
    addIconPacks(...packs) {
        for (const pack of packs) {
            const icons = Object.keys(pack).map((key) => pack[key]);
            this.addIcons(...icons);
        }
    }
    getIconDefinition(prefix, name) {
        if (prefix in this.definitions && name in this.definitions[prefix]) {
            return this.definitions[prefix][name];
        }
        return null;
    }
};
FaIconLibrary.ɵprov = ɵɵdefineInjectable({ factory: function FaIconLibrary_Factory() { return new FaIconLibrary(); }, token: FaIconLibrary, providedIn: "root" });
FaIconLibrary = __decorate([
    Injectable({ providedIn: 'root' })
], FaIconLibrary);

const faWarnIfIconDefinitionMissing = (iconSpec) => {
    throw new Error(`Could not find icon with iconName=${iconSpec.iconName} and prefix=${iconSpec.prefix} in the icon library.`);
};

const faWarnIfIconSpecMissing = () => {
    throw new Error('Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.');
};

/**
 * Fontawesome class list.
 * Returns classes array by props.
 */
const faClassList = (props) => {
    const classes = {
        'fa-spin': props.spin,
        'fa-pulse': props.pulse,
        'fa-fw': props.fixedWidth,
        'fa-border': props.border,
        'fa-inverse': props.inverse,
        'fa-layers-counter': props.counter,
        'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
        'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
        [`fa-${props.size}`]: props.size !== null,
        [`fa-rotate-${props.rotate}`]: props.rotate !== null,
        [`fa-pull-${props.pull}`]: props.pull !== null,
        [`fa-stack-${props.stackItemSize}`]: props.stackItemSize != null,
    };
    return Object.keys(classes)
        .map((key) => (classes[key] ? key : null))
        .filter((key) => key);
};

/**
 * Returns if is IconLookup or not.
 */
const isIconLookup = (i) => {
    return i.prefix !== undefined && i.iconName !== undefined;
};

/**
 * Normalizing icon spec.
 */
const faNormalizeIconSpec = (iconSpec, defaultPrefix) => {
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

let FaStackItemSizeDirective = class FaStackItemSizeDirective {
    constructor() {
        /**
         * Specify whether icon inside {@link FaStackComponent} should be rendered in
         * regular size (1x) or as a larger icon (2x).
         */
        this.stackItemSize = '1x';
    }
    ngOnChanges(changes) {
        if ('size' in changes) {
            throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. ' +
                'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.');
        }
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

let FaIconComponent = class FaIconComponent {
    constructor(sanitizer, config, iconLibrary, stackItem) {
        this.sanitizer = sanitizer;
        this.config = config;
        this.iconLibrary = iconLibrary;
        this.stackItem = stackItem;
        this.classes = [];
    }
    ngOnChanges(changes) {
        if (this.icon == null && this.config.fallbackIcon == null) {
            return faWarnIfIconSpecMissing();
        }
        let iconToBeRendered = null;
        if (this.icon == null) {
            iconToBeRendered = this.config.fallbackIcon;
        }
        else {
            iconToBeRendered = this.icon;
        }
        if (changes) {
            const iconDefinition = this.findIconDefinition(iconToBeRendered);
            if (iconDefinition != null) {
                const params = this.buildParams();
                this.renderIcon(iconDefinition, params);
            }
        }
    }
    /**
     * Programmatically trigger rendering of the icon.
     *
     * This method is useful, when creating {@link FaIconComponent} dynamically or
     * changing its inputs programmatically as in these cases icon won't be
     * re-rendered automatically.
     */
    render() {
        this.ngOnChanges({});
    }
    findIconDefinition(i) {
        const lookup = faNormalizeIconSpec(i, this.config.defaultPrefix);
        if ('icon' in lookup) {
            return lookup;
        }
        const definition = this.iconLibrary.getIconDefinition(lookup.prefix, lookup.iconName);
        if (definition != null) {
            return definition;
        }
        const globalDefinition = findIconDefinition(lookup);
        if (globalDefinition != null) {
            const message = 'Global icon library is deprecated. ' +
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
    }
    buildParams() {
        const classOpts = {
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
        const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;
        return {
            title: this.title,
            transform: parsedTransform,
            classes: [...faClassList(classOpts), ...this.classes],
            mask: this.mask != null ? this.findIconDefinition(this.mask) : null,
            styles: this.styles != null ? this.styles : {},
            symbol: this.symbol,
            attributes: {
                role: this.a11yRole,
            },
        };
    }
    renderIcon(definition, params) {
        const renderedIcon = icon(definition, params);
        this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html.join('\n'));
    }
};
FaIconComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: FaConfig },
    { type: FaIconLibrary },
    { type: FaStackItemSizeDirective, decorators: [{ type: Optional }] }
];
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
        template: ``,
        host: {
            class: 'ng-fa-icon',
            '[attr.title]': 'title',
        }
    }),
    __param(3, Optional())
], FaIconComponent);

let FaDuotoneIconComponent = class FaDuotoneIconComponent extends FaIconComponent {
    findIconDefinition(i) {
        const lookup = super.findIconDefinition(i);
        if (lookup != null && lookup.prefix !== 'fad') {
            throw new Error('The specified icon does not appear to be a Duotone icon. ' +
                'Check that you specified the correct style: ' +
                `<fa-duotone-icon [icon]="['fab', '${lookup.iconName}']"></fa-duotone-icon> ` +
                `or use: <fa-icon icon="${lookup.iconName}"></fa-icon> instead.`);
        }
        return lookup;
    }
    buildParams() {
        const params = super.buildParams();
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
    }
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
        template: ``
    })
], FaDuotoneIconComponent);

/**
 * Warns if parent component not existing.
 */
const faWarnIfParentNotExist = (parent, parentName, childName) => {
    if (!parent) {
        throw new Error(`${childName} should be used as child of ${parentName} only.`);
    }
};

/**
 * Fontawesome layers.
 */
let FaLayersComponent = class FaLayersComponent {
    constructor(renderer, elementRef, config) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.config = config;
    }
    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'fa-layers');
        this.fixedWidth = typeof this.fixedWidth === 'boolean' ? this.fixedWidth : this.config.fixedWidth;
    }
    ngOnChanges(changes) {
        if ('size' in changes) {
            if (changes.size.currentValue != null) {
                this.renderer.addClass(this.elementRef.nativeElement, `fa-${changes.size.currentValue}`);
            }
            if (changes.size.previousValue != null) {
                this.renderer.removeClass(this.elementRef.nativeElement, `fa-${changes.size.previousValue}`);
            }
        }
    }
};
FaLayersComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: FaConfig }
];
__decorate([
    Input()
], FaLayersComponent.prototype, "size", void 0);
__decorate([
    Input(), HostBinding('class.fa-fw')
], FaLayersComponent.prototype, "fixedWidth", void 0);
FaLayersComponent = __decorate([
    Component({
        selector: 'fa-layers',
        template: `
    <ng-content select="fa-icon, fa-duotone-icon, fa-layers-text, fa-layers-counter"></ng-content>
  `
    })
], FaLayersComponent);

let FaLayersCounterComponent = class FaLayersCounterComponent {
    constructor(parent, sanitizer) {
        this.parent = parent;
        this.sanitizer = sanitizer;
        this.classes = [];
        faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
    }
    ngOnChanges(changes) {
        if (changes) {
            const params = this.buildParams();
            this.updateContent(params);
        }
    }
    buildParams() {
        return {
            title: this.title,
            classes: this.classes,
            styles: this.styles,
        };
    }
    updateContent(params) {
        this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(counter(this.content || '', params).html.join(''));
    }
};
FaLayersCounterComponent.ctorParameters = () => [
    { type: FaLayersComponent, decorators: [{ type: Optional }] },
    { type: DomSanitizer }
];
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

let FaLayersTextComponent = class FaLayersTextComponent {
    constructor(parent, sanitizer) {
        this.parent = parent;
        this.sanitizer = sanitizer;
        this.classes = [];
        faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
    }
    ngOnChanges(changes) {
        if (changes) {
            const params = this.buildParams();
            this.updateContent(params);
        }
    }
    /**
     * Updating params by component props.
     */
    buildParams() {
        const classOpts = {
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
        const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;
        return {
            transform: parsedTransform,
            classes: [...faClassList(classOpts), ...this.classes],
            title: this.title,
            styles: this.styles,
        };
    }
    updateContent(params) {
        this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(text(this.content || '', params).html.join('\n'));
    }
};
FaLayersTextComponent.ctorParameters = () => [
    { type: FaLayersComponent, decorators: [{ type: Optional }] },
    { type: DomSanitizer }
];
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

let FaStackComponent = class FaStackComponent {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'fa-stack');
    }
    ngOnChanges(changes) {
        if ('size' in changes) {
            if (changes.size.currentValue != null) {
                this.renderer.addClass(this.elementRef.nativeElement, `fa-${changes.size.currentValue}`);
            }
            if (changes.size.previousValue != null) {
                this.renderer.removeClass(this.elementRef.nativeElement, `fa-${changes.size.previousValue}`);
            }
        }
    }
};
FaStackComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
__decorate([
    Input()
], FaStackComponent.prototype, "size", void 0);
FaStackComponent = __decorate([
    Component({
        selector: 'fa-stack',
        // TODO: See if it is better to select fa-icon and throw if it does not have stackItemSize directive
        template: `
    <ng-content select="fa-icon[stackItemSize],fa-duotone-icon[stackItemSize]"></ng-content>
  `
    })
], FaStackComponent);

let FontAwesomeModule = class FontAwesomeModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { FaConfig, FaDuotoneIconComponent, FaIconComponent, FaIconLibrary, FaLayersComponent, FaLayersCounterComponent, FaLayersTextComponent, FaStackComponent, FaStackItemSizeDirective, FontAwesomeModule };
//# sourceMappingURL=angular-fontawesome.js.map
