import { __decorate } from "tslib";
import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FaConfig } from '../config';
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
export { FaLayersComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lLyIsInNvdXJjZXMiOlsibGF5ZXJzL2xheWVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDckM7O0dBRUc7QUFPSDtJQUtFLDJCQUFvQixRQUFtQixFQUFVLFVBQXNCLEVBQVUsTUFBZ0I7UUFBN0UsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFVO0lBQUcsQ0FBQztJQUVyRyxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwRyxDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNyQixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtnQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQWMsQ0FBQyxDQUFDO2FBQzFGO1lBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFFBQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFlLENBQUMsQ0FBQzthQUM5RjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBaEI2QixTQUFTO2dCQUFzQixVQUFVO2dCQUFrQixRQUFROztJQUp4RjtRQUFSLEtBQUssRUFBRTttREFBaUI7SUFFWTtRQUFwQyxLQUFLLEVBQUUsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDO3lEQUFzQjtJQUgvQyxpQkFBaUI7UUFON0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLDRHQUVUO1NBQ0YsQ0FBQztPQUNXLGlCQUFpQixDQXNCN0I7SUFBRCx3QkFBQztDQUFBLEFBdEJELElBc0JDO1NBdEJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaXplUHJvcCB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBGYUNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG4vKipcbiAqIEZvbnRhd2Vzb21lIGxheWVycy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmEtbGF5ZXJzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJmYS1pY29uLCBmYS1kdW90b25lLWljb24sIGZhLWxheWVycy10ZXh0LCBmYS1sYXllcnMtY291bnRlclwiPjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRmFMYXllcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHNpemU/OiBTaXplUHJvcDtcblxuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmZhLWZ3JykgZml4ZWRXaWR0aD86IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY29uZmlnOiBGYUNvbmZpZykge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZmEtbGF5ZXJzJyk7XG4gICAgdGhpcy5maXhlZFdpZHRoID0gdHlwZW9mIHRoaXMuZml4ZWRXaWR0aCA9PT0gJ2Jvb2xlYW4nID8gdGhpcy5maXhlZFdpZHRoIDogdGhpcy5jb25maWcuZml4ZWRXaWR0aDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoJ3NpemUnIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2VzLnNpemUuY3VycmVudFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYGZhLSR7Y2hhbmdlcy5zaXplLmN1cnJlbnRWYWx1ZX1gKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLnNpemUucHJldmlvdXNWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGBmYS0ke2NoYW5nZXMuc2l6ZS5wcmV2aW91c1ZhbHVlfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19