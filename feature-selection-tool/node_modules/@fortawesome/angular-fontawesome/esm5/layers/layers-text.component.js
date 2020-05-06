import { __decorate, __param, __read, __spread } from "tslib";
import { Component, HostBinding, Input, Optional } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { parse, text, } from '@fortawesome/fontawesome-svg-core';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { faClassList } from '../shared/utils/classlist.util';
import { FaLayersComponent } from './layers.component';
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
export { FaLayersTextComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJsYXllcnMvbGF5ZXJzLXRleHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFFTCxLQUFLLEVBS0wsSUFBSSxHQUdMLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBU3ZEO0lBa0JFLCtCQUFnQyxNQUF5QixFQUFVLFNBQXVCO1FBQTFELFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQWRqRixZQUFPLEdBQWMsRUFBRSxDQUFDO1FBZS9CLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTywyQ0FBVyxHQUFyQjtRQUNFLElBQU0sU0FBUyxHQUFZO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUk7WUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSTtZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUM1QixDQUFDO1FBRUYsSUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFOUcsT0FBTztZQUNMLFNBQVMsRUFBRSxlQUFlO1lBQzFCLE9BQU8sV0FBTSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNyRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRU8sNkNBQWEsR0FBckIsVUFBc0IsTUFBa0I7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0csQ0FBQzs7Z0JBdkN1QyxpQkFBaUIsdUJBQTVDLFFBQVE7Z0JBQXlELFlBQVk7O0lBakJqRjtRQUFSLEtBQUssRUFBRTswREFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7d0RBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7eURBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOzBEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTt1REFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTt3REFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7dURBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO3VEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTt1REFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7eURBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOzBEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTt5REFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7NkRBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzREQUFnQztJQUVkO1FBQXpCLFdBQVcsQ0FBQyxXQUFXLENBQUM7K0RBQXdCO0lBaEJ0QyxxQkFBcUI7UUFQakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsRUFBRTtZQUNaLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsbUJBQW1CO2FBQzNCO1NBQ0YsQ0FBQztRQW1CYSxXQUFBLFFBQVEsRUFBRSxDQUFBO09BbEJaLHFCQUFxQixDQTBEakM7SUFBRCw0QkFBQztDQUFBLEFBMURELElBMERDO1NBMURZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9wdGlvbmFsLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBGbGlwUHJvcCxcbiAgcGFyc2UsXG4gIFB1bGxQcm9wLFxuICBSb3RhdGVQcm9wLFxuICBTaXplUHJvcCxcbiAgU3R5bGVzLFxuICB0ZXh0LFxuICBUZXh0UGFyYW1zLFxuICBUcmFuc2Zvcm0sXG59IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYVdhcm5JZlBhcmVudE5vdEV4aXN0IH0gZnJvbSAnLi4vc2hhcmVkL2Vycm9ycy93YXJuLWlmLXBhcmVudC1ub3QtZXhpc3QnO1xuaW1wb3J0IHsgRmFQcm9wcyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvcHJvcHMubW9kZWwnO1xuaW1wb3J0IHsgZmFDbGFzc0xpc3QgfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvY2xhc3NsaXN0LnV0aWwnO1xuaW1wb3J0IHsgRmFMYXllcnNDb21wb25lbnQgfSBmcm9tICcuL2xheWVycy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYS1sYXllcnMtdGV4dCcsXG4gIHRlbXBsYXRlOiAnJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbmctZmEtbGF5ZXJzLXRleHQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBGYUxheWVyc1RleHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb250ZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpdGxlPzogc3RyaW5nO1xuICBASW5wdXQoKSBzdHlsZXM/OiBTdHlsZXM7XG4gIEBJbnB1dCgpIGNsYXNzZXM/OiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBzcGluPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVsc2U/OiBib29sZWFuO1xuICBASW5wdXQoKSBmbGlwPzogRmxpcFByb3A7XG4gIEBJbnB1dCgpIHNpemU/OiBTaXplUHJvcDtcbiAgQElucHV0KCkgcHVsbD86IFB1bGxQcm9wO1xuICBASW5wdXQoKSBib3JkZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBpbnZlcnNlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcm90YXRlPzogUm90YXRlUHJvcDtcbiAgQElucHV0KCkgZml4ZWRXaWR0aD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRyYW5zZm9ybT86IHN0cmluZyB8IFRyYW5zZm9ybTtcblxuICBASG9zdEJpbmRpbmcoJ2lubmVySFRNTCcpIHJlbmRlcmVkSFRNTDogU2FmZUh0bWw7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBwYXJlbnQ6IEZhTGF5ZXJzQ29tcG9uZW50LCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgZmFXYXJuSWZQYXJlbnROb3RFeGlzdCh0aGlzLnBhcmVudCwgJ0ZhTGF5ZXJzQ29tcG9uZW50JywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5idWlsZFBhcmFtcygpO1xuICAgICAgdGhpcy51cGRhdGVDb250ZW50KHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0aW5nIHBhcmFtcyBieSBjb21wb25lbnQgcHJvcHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRQYXJhbXMoKTogVGV4dFBhcmFtcyB7XG4gICAgY29uc3QgY2xhc3NPcHRzOiBGYVByb3BzID0ge1xuICAgICAgZmxpcDogdGhpcy5mbGlwLFxuICAgICAgc3BpbjogdGhpcy5zcGluLFxuICAgICAgcHVsc2U6IHRoaXMucHVsc2UsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyLFxuICAgICAgaW52ZXJzZTogdGhpcy5pbnZlcnNlLFxuICAgICAgc2l6ZTogdGhpcy5zaXplIHx8IG51bGwsXG4gICAgICBwdWxsOiB0aGlzLnB1bGwgfHwgbnVsbCxcbiAgICAgIHJvdGF0ZTogdGhpcy5yb3RhdGUgfHwgbnVsbCxcbiAgICAgIGZpeGVkV2lkdGg6IHRoaXMuZml4ZWRXaWR0aCxcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyc2VkVHJhbnNmb3JtID0gdHlwZW9mIHRoaXMudHJhbnNmb3JtID09PSAnc3RyaW5nJyA/IHBhcnNlLnRyYW5zZm9ybSh0aGlzLnRyYW5zZm9ybSkgOiB0aGlzLnRyYW5zZm9ybTtcblxuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2Zvcm06IHBhcnNlZFRyYW5zZm9ybSxcbiAgICAgIGNsYXNzZXM6IFsuLi5mYUNsYXNzTGlzdChjbGFzc09wdHMpLCAuLi50aGlzLmNsYXNzZXNdLFxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbnRlbnQocGFyYW1zOiBUZXh0UGFyYW1zKSB7XG4gICAgdGhpcy5yZW5kZXJlZEhUTUwgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0ZXh0KHRoaXMuY29udGVudCB8fCAnJywgcGFyYW1zKS5odG1sLmpvaW4oJ1xcbicpKTtcbiAgfVxufVxuIl19