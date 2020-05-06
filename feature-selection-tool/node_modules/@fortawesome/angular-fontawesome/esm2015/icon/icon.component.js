import { __decorate, __param } from "tslib";
import { Component, HostBinding, Input, Optional } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { findIconDefinition, icon, parse, } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { FaIconLibrary } from '../icon-library';
import { faWarnIfIconDefinitionMissing } from '../shared/errors/warn-if-icon-html-missing';
import { faWarnIfIconSpecMissing } from '../shared/errors/warn-if-icon-spec-missing';
import { faClassList } from '../shared/utils/classlist.util';
import { faNormalizeIconSpec } from '../shared/utils/normalize-icon-spec.util';
import { FaStackItemSizeDirective } from '../stack/stack-item-size.directive';
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
export { FaIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZS8iLCJzb3VyY2VzIjpbImljb24vaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUVMLGtCQUFrQixFQUVsQixJQUFJLEVBSUosS0FBSyxHQU1OLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBVTlFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFpQzFCLFlBQ1UsU0FBdUIsRUFDdkIsTUFBZ0IsRUFDaEIsV0FBMEIsRUFDZCxTQUFtQztRQUgvQyxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQWhCaEQsWUFBTyxHQUFjLEVBQUUsQ0FBQztJQWlCOUIsQ0FBQztJQUVKLFdBQVcsQ0FBQyxPQUFz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LFlBQVk7WUFDZixRQUFRO1lBQ0gsYUFBYTtZQUNILHdCQUF3Qix1QkFBdEQsUUFBUTs7QUFwQ0Y7SUFBUixLQUFLLEVBQUU7NkNBQWdCO0FBT2Y7SUFBUixLQUFLLEVBQUU7OENBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7NkNBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7OENBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOzZDQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTsrQ0FBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7NkNBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOzZDQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs2Q0FBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7K0NBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFO2dEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTsrQ0FBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7K0NBQXFCO0FBQ3BCO0lBQVIsS0FBSyxFQUFFO21EQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTtnREFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7a0RBQWdDO0FBTy9CO0lBQVIsS0FBSyxFQUFFO2lEQUFrQjtBQUVBO0lBQXpCLFdBQVcsQ0FBQyxXQUFXLENBQUM7eURBQTRCO0FBL0IxQyxlQUFlO0lBUjNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLFlBQVk7WUFDbkIsY0FBYyxFQUFFLE9BQU87U0FDeEI7S0FDRixDQUFDO0lBc0NHLFdBQUEsUUFBUSxFQUFFLENBQUE7R0FyQ0YsZUFBZSxDQXVJM0I7U0F2SVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9wdGlvbmFsLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBGYVN5bWJvbCxcbiAgZmluZEljb25EZWZpbml0aW9uLFxuICBGbGlwUHJvcCxcbiAgaWNvbixcbiAgSWNvbkRlZmluaXRpb24sXG4gIEljb25QYXJhbXMsXG4gIEljb25Qcm9wLFxuICBwYXJzZSxcbiAgUHVsbFByb3AsXG4gIFJvdGF0ZVByb3AsXG4gIFNpemVQcm9wLFxuICBTdHlsZXMsXG4gIFRyYW5zZm9ybSxcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IEZhQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7IEZhSWNvbkxpYnJhcnkgfSBmcm9tICcuLi9pY29uLWxpYnJhcnknO1xuaW1wb3J0IHsgZmFXYXJuSWZJY29uRGVmaW5pdGlvbk1pc3NpbmcgfSBmcm9tICcuLi9zaGFyZWQvZXJyb3JzL3dhcm4taWYtaWNvbi1odG1sLW1pc3NpbmcnO1xuaW1wb3J0IHsgZmFXYXJuSWZJY29uU3BlY01pc3NpbmcgfSBmcm9tICcuLi9zaGFyZWQvZXJyb3JzL3dhcm4taWYtaWNvbi1zcGVjLW1pc3NpbmcnO1xuaW1wb3J0IHsgRmFQcm9wcyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvcHJvcHMubW9kZWwnO1xuaW1wb3J0IHsgZmFDbGFzc0xpc3QgfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvY2xhc3NsaXN0LnV0aWwnO1xuaW1wb3J0IHsgZmFOb3JtYWxpemVJY29uU3BlYyB9IGZyb20gJy4uL3NoYXJlZC91dGlscy9ub3JtYWxpemUtaWNvbi1zcGVjLnV0aWwnO1xuaW1wb3J0IHsgRmFTdGFja0l0ZW1TaXplRGlyZWN0aXZlIH0gZnJvbSAnLi4vc3RhY2svc3RhY2staXRlbS1zaXplLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZhLWljb24nLFxuICB0ZW1wbGF0ZTogYGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25nLWZhLWljb24nLFxuICAgICdbYXR0ci50aXRsZV0nOiAndGl0bGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBGYUljb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpY29uOiBJY29uUHJvcDtcblxuICAvKipcbiAgICogU3BlY2lmeSBhIHRpdGxlIGZvciB0aGUgaWNvbi5cbiAgICogVGhpcyB0ZXh0IHdpbGwgYmUgZGlzcGxheWVkIGluIGEgdG9vbHRpcCBvbiBob3ZlciBhbmQgcHJlc2VudGVkIHRvIHRoZVxuICAgKiBzY3JlZW4gcmVhZGVycy5cbiAgICovXG4gIEBJbnB1dCgpIHRpdGxlPzogc3RyaW5nO1xuICBASW5wdXQoKSBzcGluPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVsc2U/OiBib29sZWFuO1xuICBASW5wdXQoKSBtYXNrPzogSWNvblByb3A7XG4gIEBJbnB1dCgpIHN0eWxlcz86IFN0eWxlcztcbiAgQElucHV0KCkgZmxpcD86IEZsaXBQcm9wO1xuICBASW5wdXQoKSBzaXplPzogU2l6ZVByb3A7XG4gIEBJbnB1dCgpIHB1bGw/OiBQdWxsUHJvcDtcbiAgQElucHV0KCkgYm9yZGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaW52ZXJzZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN5bWJvbD86IEZhU3ltYm9sO1xuICBASW5wdXQoKSByb3RhdGU/OiBSb3RhdGVQcm9wO1xuICBASW5wdXQoKSBmaXhlZFdpZHRoPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xhc3Nlcz86IHN0cmluZ1tdID0gW107XG4gIEBJbnB1dCgpIHRyYW5zZm9ybT86IHN0cmluZyB8IFRyYW5zZm9ybTtcblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgYHJvbGVgIGF0dHJpYnV0ZSBmb3IgdGhlIHJlbmRlcmVkIDxzdmc+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBkZWZhdWx0ICdpbWcnXG4gICAqL1xuICBASW5wdXQoKSBhMTF5Um9sZTogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnaW5uZXJIVE1MJykgcmVuZGVyZWRJY29uSFRNTDogU2FmZUh0bWw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIGNvbmZpZzogRmFDb25maWcsXG4gICAgcHJpdmF0ZSBpY29uTGlicmFyeTogRmFJY29uTGlicmFyeSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHN0YWNrSXRlbTogRmFTdGFja0l0ZW1TaXplRGlyZWN0aXZlLFxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmljb24gPT0gbnVsbCAmJiB0aGlzLmNvbmZpZy5mYWxsYmFja0ljb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhV2FybklmSWNvblNwZWNNaXNzaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGljb25Ub0JlUmVuZGVyZWQ6IEljb25Qcm9wID0gbnVsbDtcbiAgICBpZiAodGhpcy5pY29uID09IG51bGwpIHtcbiAgICAgIGljb25Ub0JlUmVuZGVyZWQgPSB0aGlzLmNvbmZpZy5mYWxsYmFja0ljb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGljb25Ub0JlUmVuZGVyZWQgPSB0aGlzLmljb247XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgIGNvbnN0IGljb25EZWZpbml0aW9uID0gdGhpcy5maW5kSWNvbkRlZmluaXRpb24oaWNvblRvQmVSZW5kZXJlZCk7XG4gICAgICBpZiAoaWNvbkRlZmluaXRpb24gIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmJ1aWxkUGFyYW1zKCk7XG4gICAgICAgIHRoaXMucmVuZGVySWNvbihpY29uRGVmaW5pdGlvbiwgcGFyYW1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvZ3JhbW1hdGljYWxseSB0cmlnZ2VyIHJlbmRlcmluZyBvZiB0aGUgaWNvbi5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgdXNlZnVsLCB3aGVuIGNyZWF0aW5nIHtAbGluayBGYUljb25Db21wb25lbnR9IGR5bmFtaWNhbGx5IG9yXG4gICAqIGNoYW5naW5nIGl0cyBpbnB1dHMgcHJvZ3JhbW1hdGljYWxseSBhcyBpbiB0aGVzZSBjYXNlcyBpY29uIHdvbid0IGJlXG4gICAqIHJlLXJlbmRlcmVkIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgdGhpcy5uZ09uQ2hhbmdlcyh7fSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZmluZEljb25EZWZpbml0aW9uKGk6IEljb25Qcm9wIHwgSWNvbkRlZmluaXRpb24pOiBJY29uRGVmaW5pdGlvbiB8IG51bGwge1xuICAgIGNvbnN0IGxvb2t1cCA9IGZhTm9ybWFsaXplSWNvblNwZWMoaSwgdGhpcy5jb25maWcuZGVmYXVsdFByZWZpeCk7XG4gICAgaWYgKCdpY29uJyBpbiBsb29rdXApIHtcbiAgICAgIHJldHVybiBsb29rdXA7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IHRoaXMuaWNvbkxpYnJhcnkuZ2V0SWNvbkRlZmluaXRpb24obG9va3VwLnByZWZpeCwgbG9va3VwLmljb25OYW1lKTtcbiAgICBpZiAoZGVmaW5pdGlvbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZGVmaW5pdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBnbG9iYWxEZWZpbml0aW9uID0gZmluZEljb25EZWZpbml0aW9uKGxvb2t1cCk7XG4gICAgaWYgKGdsb2JhbERlZmluaXRpb24gIT0gbnVsbCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICdHbG9iYWwgaWNvbiBsaWJyYXJ5IGlzIGRlcHJlY2F0ZWQuICcgK1xuICAgICAgICAnQ29uc3VsdCBodHRwczovL2dpdGh1Yi5jb20vRm9ydEF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZS9ibG9iL21hc3Rlci9VUEdSQURJTkcubWQgJyArXG4gICAgICAgICdmb3IgdGhlIG1pZ3JhdGlvbiBpbnN0cnVjdGlvbnMuJztcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5nbG9iYWxMaWJyYXJ5ID09PSAndW5zZXQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZvbnRBd2Vzb21lOiAnICsgbWVzc2FnZSk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmNvbmZpZy5nbG9iYWxMaWJyYXJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdsb2JhbERlZmluaXRpb247XG4gICAgfVxuXG4gICAgZmFXYXJuSWZJY29uRGVmaW5pdGlvbk1pc3NpbmcobG9va3VwKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZFBhcmFtcygpIHtcbiAgICBjb25zdCBjbGFzc09wdHM6IEZhUHJvcHMgPSB7XG4gICAgICBmbGlwOiB0aGlzLmZsaXAsXG4gICAgICBzcGluOiB0aGlzLnNwaW4sXG4gICAgICBwdWxzZTogdGhpcy5wdWxzZSxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXIsXG4gICAgICBpbnZlcnNlOiB0aGlzLmludmVyc2UsXG4gICAgICBzaXplOiB0aGlzLnNpemUgfHwgbnVsbCxcbiAgICAgIHB1bGw6IHRoaXMucHVsbCB8fCBudWxsLFxuICAgICAgcm90YXRlOiB0aGlzLnJvdGF0ZSB8fCBudWxsLFxuICAgICAgZml4ZWRXaWR0aDogdHlwZW9mIHRoaXMuZml4ZWRXaWR0aCA9PT0gJ2Jvb2xlYW4nID8gdGhpcy5maXhlZFdpZHRoIDogdGhpcy5jb25maWcuZml4ZWRXaWR0aCxcbiAgICAgIHN0YWNrSXRlbVNpemU6IHRoaXMuc3RhY2tJdGVtICE9IG51bGwgPyB0aGlzLnN0YWNrSXRlbS5zdGFja0l0ZW1TaXplIDogbnVsbCxcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyc2VkVHJhbnNmb3JtID0gdHlwZW9mIHRoaXMudHJhbnNmb3JtID09PSAnc3RyaW5nJyA/IHBhcnNlLnRyYW5zZm9ybSh0aGlzLnRyYW5zZm9ybSkgOiB0aGlzLnRyYW5zZm9ybTtcblxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIHRyYW5zZm9ybTogcGFyc2VkVHJhbnNmb3JtLFxuICAgICAgY2xhc3NlczogWy4uLmZhQ2xhc3NMaXN0KGNsYXNzT3B0cyksIC4uLnRoaXMuY2xhc3Nlc10sXG4gICAgICBtYXNrOiB0aGlzLm1hc2sgIT0gbnVsbCA/IHRoaXMuZmluZEljb25EZWZpbml0aW9uKHRoaXMubWFzaykgOiBudWxsLFxuICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyAhPSBudWxsID8gdGhpcy5zdHlsZXMgOiB7fSxcbiAgICAgIHN5bWJvbDogdGhpcy5zeW1ib2wsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIHJvbGU6IHRoaXMuYTExeVJvbGUsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckljb24oZGVmaW5pdGlvbjogSWNvbkRlZmluaXRpb24sIHBhcmFtczogSWNvblBhcmFtcykge1xuICAgIGNvbnN0IHJlbmRlcmVkSWNvbiA9IGljb24oZGVmaW5pdGlvbiwgcGFyYW1zKTtcbiAgICB0aGlzLnJlbmRlcmVkSWNvbkhUTUwgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChyZW5kZXJlZEljb24uaHRtbC5qb2luKCdcXG4nKSk7XG4gIH1cbn1cbiJdfQ==