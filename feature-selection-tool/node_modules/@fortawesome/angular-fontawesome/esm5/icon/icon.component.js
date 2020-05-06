import { __decorate, __param, __read, __spread } from "tslib";
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
export { FaIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZS8iLCJzb3VyY2VzIjpbImljb24vaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUVMLGtCQUFrQixFQUVsQixJQUFJLEVBSUosS0FBSyxHQU1OLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBVTlFO0lBaUNFLHlCQUNVLFNBQXVCLEVBQ3ZCLE1BQWdCLEVBQ2hCLFdBQTBCLEVBQ2QsU0FBbUM7UUFIL0MsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBMEI7UUFoQmhELFlBQU8sR0FBYyxFQUFFLENBQUM7SUFpQjlCLENBQUM7SUFFSixxQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxJQUFJLENB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Z0JBQ0gsYUFBYTtnQkFDSCx3QkFBd0IsdUJBQXRELFFBQVE7O0lBcENGO1FBQVIsS0FBSyxFQUFFO2lEQUFnQjtJQU9mO1FBQVIsS0FBSyxFQUFFO2tEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFO2lEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFO2tEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTtpREFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7bURBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO2lEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTtpREFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7aURBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO21EQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTtvREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7bURBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO21EQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTt1REFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7b0RBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFO3NEQUFnQztJQU8vQjtRQUFSLEtBQUssRUFBRTtxREFBa0I7SUFFQTtRQUF6QixXQUFXLENBQUMsV0FBVyxDQUFDOzZEQUE0QjtJQS9CMUMsZUFBZTtRQVIzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsRUFBRTtZQUNaLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsY0FBYyxFQUFFLE9BQU87YUFDeEI7U0FDRixDQUFDO1FBc0NHLFdBQUEsUUFBUSxFQUFFLENBQUE7T0FyQ0YsZUFBZSxDQXVJM0I7SUFBRCxzQkFBQztDQUFBLEFBdklELElBdUlDO1NBdklZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPcHRpb25hbCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgRmFTeW1ib2wsXG4gIGZpbmRJY29uRGVmaW5pdGlvbixcbiAgRmxpcFByb3AsXG4gIGljb24sXG4gIEljb25EZWZpbml0aW9uLFxuICBJY29uUGFyYW1zLFxuICBJY29uUHJvcCxcbiAgcGFyc2UsXG4gIFB1bGxQcm9wLFxuICBSb3RhdGVQcm9wLFxuICBTaXplUHJvcCxcbiAgU3R5bGVzLFxuICBUcmFuc2Zvcm0sXG59IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBGYUNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBGYUljb25MaWJyYXJ5IH0gZnJvbSAnLi4vaWNvbi1saWJyYXJ5JztcbmltcG9ydCB7IGZhV2FybklmSWNvbkRlZmluaXRpb25NaXNzaW5nIH0gZnJvbSAnLi4vc2hhcmVkL2Vycm9ycy93YXJuLWlmLWljb24taHRtbC1taXNzaW5nJztcbmltcG9ydCB7IGZhV2FybklmSWNvblNwZWNNaXNzaW5nIH0gZnJvbSAnLi4vc2hhcmVkL2Vycm9ycy93YXJuLWlmLWljb24tc3BlYy1taXNzaW5nJztcbmltcG9ydCB7IEZhUHJvcHMgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL3Byb3BzLm1vZGVsJztcbmltcG9ydCB7IGZhQ2xhc3NMaXN0IH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzL2NsYXNzbGlzdC51dGlsJztcbmltcG9ydCB7IGZhTm9ybWFsaXplSWNvblNwZWMgfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvbm9ybWFsaXplLWljb24tc3BlYy51dGlsJztcbmltcG9ydCB7IEZhU3RhY2tJdGVtU2l6ZURpcmVjdGl2ZSB9IGZyb20gJy4uL3N0YWNrL3N0YWNrLWl0ZW0tc2l6ZS5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYS1pY29uJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICduZy1mYS1pY29uJyxcbiAgICAnW2F0dHIudGl0bGVdJzogJ3RpdGxlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgRmFJY29uQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaWNvbjogSWNvblByb3A7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYSB0aXRsZSBmb3IgdGhlIGljb24uXG4gICAqIFRoaXMgdGV4dCB3aWxsIGJlIGRpc3BsYXllZCBpbiBhIHRvb2x0aXAgb24gaG92ZXIgYW5kIHByZXNlbnRlZCB0byB0aGVcbiAgICogc2NyZWVuIHJlYWRlcnMuXG4gICAqL1xuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZztcbiAgQElucHV0KCkgc3Bpbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1bHNlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbWFzaz86IEljb25Qcm9wO1xuICBASW5wdXQoKSBzdHlsZXM/OiBTdHlsZXM7XG4gIEBJbnB1dCgpIGZsaXA/OiBGbGlwUHJvcDtcbiAgQElucHV0KCkgc2l6ZT86IFNpemVQcm9wO1xuICBASW5wdXQoKSBwdWxsPzogUHVsbFByb3A7XG4gIEBJbnB1dCgpIGJvcmRlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGludmVyc2U/OiBib29sZWFuO1xuICBASW5wdXQoKSBzeW1ib2w/OiBGYVN5bWJvbDtcbiAgQElucHV0KCkgcm90YXRlPzogUm90YXRlUHJvcDtcbiAgQElucHV0KCkgZml4ZWRXaWR0aD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzZXM/OiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSB0cmFuc2Zvcm0/OiBzdHJpbmcgfCBUcmFuc2Zvcm07XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGByb2xlYCBhdHRyaWJ1dGUgZm9yIHRoZSByZW5kZXJlZCA8c3ZnPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZGVmYXVsdCAnaW1nJ1xuICAgKi9cbiAgQElucHV0KCkgYTExeVJvbGU6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2lubmVySFRNTCcpIHJlbmRlcmVkSWNvbkhUTUw6IFNhZmVIdG1sO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBjb25maWc6IEZhQ29uZmlnLFxuICAgIHByaXZhdGUgaWNvbkxpYnJhcnk6IEZhSWNvbkxpYnJhcnksXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBzdGFja0l0ZW06IEZhU3RhY2tJdGVtU2l6ZURpcmVjdGl2ZSxcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5pY29uID09IG51bGwgJiYgdGhpcy5jb25maWcuZmFsbGJhY2tJY29uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYVdhcm5JZkljb25TcGVjTWlzc2luZygpO1xuICAgIH1cblxuICAgIGxldCBpY29uVG9CZVJlbmRlcmVkOiBJY29uUHJvcCA9IG51bGw7XG4gICAgaWYgKHRoaXMuaWNvbiA9PSBudWxsKSB7XG4gICAgICBpY29uVG9CZVJlbmRlcmVkID0gdGhpcy5jb25maWcuZmFsbGJhY2tJY29uO1xuICAgIH0gZWxzZSB7XG4gICAgICBpY29uVG9CZVJlbmRlcmVkID0gdGhpcy5pY29uO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICBjb25zdCBpY29uRGVmaW5pdGlvbiA9IHRoaXMuZmluZEljb25EZWZpbml0aW9uKGljb25Ub0JlUmVuZGVyZWQpO1xuICAgICAgaWYgKGljb25EZWZpbml0aW9uICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5idWlsZFBhcmFtcygpO1xuICAgICAgICB0aGlzLnJlbmRlckljb24oaWNvbkRlZmluaXRpb24sIHBhcmFtcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2dyYW1tYXRpY2FsbHkgdHJpZ2dlciByZW5kZXJpbmcgb2YgdGhlIGljb24uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHVzZWZ1bCwgd2hlbiBjcmVhdGluZyB7QGxpbmsgRmFJY29uQ29tcG9uZW50fSBkeW5hbWljYWxseSBvclxuICAgKiBjaGFuZ2luZyBpdHMgaW5wdXRzIHByb2dyYW1tYXRpY2FsbHkgYXMgaW4gdGhlc2UgY2FzZXMgaWNvbiB3b24ndCBiZVxuICAgKiByZS1yZW5kZXJlZCBhdXRvbWF0aWNhbGx5LlxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMubmdPbkNoYW5nZXMoe30pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGZpbmRJY29uRGVmaW5pdGlvbihpOiBJY29uUHJvcCB8IEljb25EZWZpbml0aW9uKTogSWNvbkRlZmluaXRpb24gfCBudWxsIHtcbiAgICBjb25zdCBsb29rdXAgPSBmYU5vcm1hbGl6ZUljb25TcGVjKGksIHRoaXMuY29uZmlnLmRlZmF1bHRQcmVmaXgpO1xuICAgIGlmICgnaWNvbicgaW4gbG9va3VwKSB7XG4gICAgICByZXR1cm4gbG9va3VwO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSB0aGlzLmljb25MaWJyYXJ5LmdldEljb25EZWZpbml0aW9uKGxvb2t1cC5wcmVmaXgsIGxvb2t1cC5pY29uTmFtZSk7XG4gICAgaWYgKGRlZmluaXRpb24gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGRlZmluaXRpb247XG4gICAgfVxuXG4gICAgY29uc3QgZ2xvYmFsRGVmaW5pdGlvbiA9IGZpbmRJY29uRGVmaW5pdGlvbihsb29rdXApO1xuICAgIGlmIChnbG9iYWxEZWZpbml0aW9uICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAnR2xvYmFsIGljb24gbGlicmFyeSBpcyBkZXByZWNhdGVkLiAnICtcbiAgICAgICAgJ0NvbnN1bHQgaHR0cHM6Ly9naXRodWIuY29tL0ZvcnRBd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvYmxvYi9tYXN0ZXIvVVBHUkFESU5HLm1kICcgK1xuICAgICAgICAnZm9yIHRoZSBtaWdyYXRpb24gaW5zdHJ1Y3Rpb25zLic7XG4gICAgICBpZiAodGhpcy5jb25maWcuZ2xvYmFsTGlicmFyeSA9PT0gJ3Vuc2V0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGb250QXdlc29tZTogJyArIG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5jb25maWcuZ2xvYmFsTGlicmFyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnbG9iYWxEZWZpbml0aW9uO1xuICAgIH1cblxuICAgIGZhV2FybklmSWNvbkRlZmluaXRpb25NaXNzaW5nKGxvb2t1cCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRQYXJhbXMoKSB7XG4gICAgY29uc3QgY2xhc3NPcHRzOiBGYVByb3BzID0ge1xuICAgICAgZmxpcDogdGhpcy5mbGlwLFxuICAgICAgc3BpbjogdGhpcy5zcGluLFxuICAgICAgcHVsc2U6IHRoaXMucHVsc2UsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyLFxuICAgICAgaW52ZXJzZTogdGhpcy5pbnZlcnNlLFxuICAgICAgc2l6ZTogdGhpcy5zaXplIHx8IG51bGwsXG4gICAgICBwdWxsOiB0aGlzLnB1bGwgfHwgbnVsbCxcbiAgICAgIHJvdGF0ZTogdGhpcy5yb3RhdGUgfHwgbnVsbCxcbiAgICAgIGZpeGVkV2lkdGg6IHR5cGVvZiB0aGlzLmZpeGVkV2lkdGggPT09ICdib29sZWFuJyA/IHRoaXMuZml4ZWRXaWR0aCA6IHRoaXMuY29uZmlnLmZpeGVkV2lkdGgsXG4gICAgICBzdGFja0l0ZW1TaXplOiB0aGlzLnN0YWNrSXRlbSAhPSBudWxsID8gdGhpcy5zdGFja0l0ZW0uc3RhY2tJdGVtU2l6ZSA6IG51bGwsXG4gICAgfTtcblxuICAgIGNvbnN0IHBhcnNlZFRyYW5zZm9ybSA9IHR5cGVvZiB0aGlzLnRyYW5zZm9ybSA9PT0gJ3N0cmluZycgPyBwYXJzZS50cmFuc2Zvcm0odGhpcy50cmFuc2Zvcm0pIDogdGhpcy50cmFuc2Zvcm07XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICB0cmFuc2Zvcm06IHBhcnNlZFRyYW5zZm9ybSxcbiAgICAgIGNsYXNzZXM6IFsuLi5mYUNsYXNzTGlzdChjbGFzc09wdHMpLCAuLi50aGlzLmNsYXNzZXNdLFxuICAgICAgbWFzazogdGhpcy5tYXNrICE9IG51bGwgPyB0aGlzLmZpbmRJY29uRGVmaW5pdGlvbih0aGlzLm1hc2spIDogbnVsbCxcbiAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMgIT0gbnVsbCA/IHRoaXMuc3R5bGVzIDoge30sXG4gICAgICBzeW1ib2w6IHRoaXMuc3ltYm9sLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICByb2xlOiB0aGlzLmExMXlSb2xlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJJY29uKGRlZmluaXRpb246IEljb25EZWZpbml0aW9uLCBwYXJhbXM6IEljb25QYXJhbXMpIHtcbiAgICBjb25zdCByZW5kZXJlZEljb24gPSBpY29uKGRlZmluaXRpb24sIHBhcmFtcyk7XG4gICAgdGhpcy5yZW5kZXJlZEljb25IVE1MID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwocmVuZGVyZWRJY29uLmh0bWwuam9pbignXFxuJykpO1xuICB9XG59XG4iXX0=