import { __decorate } from "tslib";
import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FaConfig } from '../config';
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
export { FaLayersComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lLyIsInNvdXJjZXMiOlsibGF5ZXJzL2xheWVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDckM7O0dBRUc7QUFPSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUs1QixZQUFvQixRQUFtQixFQUFVLFVBQXNCLEVBQVUsTUFBZ0I7UUFBN0UsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFVO0lBQUcsQ0FBQztJQUVyRyxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwRyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNyQixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtnQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDMUY7WUFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7YUFDOUY7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBOztZQWpCK0IsU0FBUztZQUFzQixVQUFVO1lBQWtCLFFBQVE7O0FBSnhGO0lBQVIsS0FBSyxFQUFFOytDQUFpQjtBQUVZO0lBQXBDLEtBQUssRUFBRSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUM7cURBQXNCO0FBSC9DLGlCQUFpQjtJQU43QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUU7O0dBRVQ7S0FDRixDQUFDO0dBQ1csaUJBQWlCLENBc0I3QjtTQXRCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2l6ZVByb3AgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgRmFDb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuLyoqXG4gKiBGb250YXdlc29tZSBsYXllcnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZhLWxheWVycycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZmEtaWNvbiwgZmEtZHVvdG9uZS1pY29uLCBmYS1sYXllcnMtdGV4dCwgZmEtbGF5ZXJzLWNvdW50ZXJcIj48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEZhTGF5ZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBzaXplPzogU2l6ZVByb3A7XG5cbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcy5mYS1mdycpIGZpeGVkV2lkdGg/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNvbmZpZzogRmFDb25maWcpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZhLWxheWVycycpO1xuICAgIHRoaXMuZml4ZWRXaWR0aCA9IHR5cGVvZiB0aGlzLmZpeGVkV2lkdGggPT09ICdib29sZWFuJyA/IHRoaXMuZml4ZWRXaWR0aCA6IHRoaXMuY29uZmlnLmZpeGVkV2lkdGg7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdzaXplJyBpbiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlcy5zaXplLmN1cnJlbnRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGBmYS0ke2NoYW5nZXMuc2l6ZS5jdXJyZW50VmFsdWV9YCk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5zaXplLnByZXZpb3VzVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgZmEtJHtjaGFuZ2VzLnNpemUucHJldmlvdXNWYWx1ZX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==