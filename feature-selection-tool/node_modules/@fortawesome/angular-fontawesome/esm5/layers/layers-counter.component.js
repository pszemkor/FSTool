import { __decorate, __param } from "tslib";
import { Component, HostBinding, Input, Optional } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { FaLayersComponent } from './layers.component';
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
export { FaLayersCounterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLWNvdW50ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJsYXllcnMvbGF5ZXJzLWNvdW50ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxPQUFPLEVBQXlCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFTdkQ7SUFRRSxrQ0FBZ0MsTUFBeUIsRUFBVSxTQUF1QjtRQUExRCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFKakYsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUsvQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELDhDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVTLDhDQUFXLEdBQXJCO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRU8sZ0RBQWEsR0FBckIsVUFBc0IsTUFBcUI7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEgsQ0FBQzs7Z0JBckJ1QyxpQkFBaUIsdUJBQTVDLFFBQVE7Z0JBQXlELFlBQVk7O0lBUGpGO1FBQVIsS0FBSyxFQUFFOzZEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTsyREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs0REFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7NkRBQXlCO0lBRVA7UUFBekIsV0FBVyxDQUFDLFdBQVcsQ0FBQztrRUFBd0I7SUFOdEMsd0JBQXdCO1FBUHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLEVBQUU7WUFDWixJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLHNCQUFzQjthQUM5QjtTQUNGLENBQUM7UUFTYSxXQUFBLFFBQVEsRUFBRSxDQUFBO09BUlosd0JBQXdCLENBOEJwQztJQUFELCtCQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0E5Qlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT3B0aW9uYWwsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGNvdW50ZXIsIENvdW50ZXJQYXJhbXMsIFN0eWxlcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYVdhcm5JZlBhcmVudE5vdEV4aXN0IH0gZnJvbSAnLi4vc2hhcmVkL2Vycm9ycy93YXJuLWlmLXBhcmVudC1ub3QtZXhpc3QnO1xuaW1wb3J0IHsgRmFMYXllcnNDb21wb25lbnQgfSBmcm9tICcuL2xheWVycy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYS1sYXllcnMtY291bnRlcicsXG4gIHRlbXBsYXRlOiAnJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbmctZmEtbGF5ZXJzLWNvdW50ZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBGYUxheWVyc0NvdW50ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb250ZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpdGxlPzogc3RyaW5nO1xuICBASW5wdXQoKSBzdHlsZXM/OiBTdHlsZXM7XG4gIEBJbnB1dCgpIGNsYXNzZXM/OiBzdHJpbmdbXSA9IFtdO1xuXG4gIEBIb3N0QmluZGluZygnaW5uZXJIVE1MJykgcmVuZGVyZWRIVE1MOiBTYWZlSHRtbDtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudDogRmFMYXllcnNDb21wb25lbnQsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICBmYVdhcm5JZlBhcmVudE5vdEV4aXN0KHRoaXMucGFyZW50LCAnRmFMYXllcnNDb21wb25lbnQnLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmJ1aWxkUGFyYW1zKCk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbnRlbnQocGFyYW1zKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRQYXJhbXMoKTogQ291bnRlclBhcmFtcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgY2xhc3NlczogdGhpcy5jbGFzc2VzLFxuICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50KHBhcmFtczogQ291bnRlclBhcmFtcykge1xuICAgIHRoaXMucmVuZGVyZWRIVE1MID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoY291bnRlcih0aGlzLmNvbnRlbnQgfHwgJycsIHBhcmFtcykuaHRtbC5qb2luKCcnKSk7XG4gIH1cbn1cbiJdfQ==