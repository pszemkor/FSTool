import { __decorate } from "tslib";
import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
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
export { FaStackComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJzdGFjay9zdGFjay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVMUc7SUFTRSwwQkFBb0IsUUFBbUIsRUFBVSxVQUFzQjtRQUFuRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFM0UsbUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3JCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFO2dCQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBYyxDQUFDLENBQUM7YUFDMUY7WUFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWUsQ0FBQyxDQUFDO2FBQzlGO1NBQ0Y7SUFDSCxDQUFDOztnQkFmNkIsU0FBUztnQkFBc0IsVUFBVTs7SUFGOUQ7UUFBUixLQUFLLEVBQUU7a0RBQWlCO0lBUGQsZ0JBQWdCO1FBUDVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLG9HQUFvRztZQUNwRyxRQUFRLEVBQUUsc0dBRVQ7U0FDRixDQUFDO09BQ1csZ0JBQWdCLENBeUI1QjtJQUFELHVCQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0F6QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2l6ZVByb3AgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYS1zdGFjaycsXG4gIC8vIFRPRE86IFNlZSBpZiBpdCBpcyBiZXR0ZXIgdG8gc2VsZWN0IGZhLWljb24gYW5kIHRocm93IGlmIGl0IGRvZXMgbm90IGhhdmUgc3RhY2tJdGVtU2l6ZSBkaXJlY3RpdmVcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJmYS1pY29uW3N0YWNrSXRlbVNpemVdLGZhLWR1b3RvbmUtaWNvbltzdGFja0l0ZW1TaXplXVwiPjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRmFTdGFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIHN0YWNrZWQgaWNvbi5cbiAgICogTm90ZSB0aGF0IHN0YWNrZWQgaWNvbiBpcyBieSBkZWZhdWx0IDIgdGltZXMgYmlnZ2VyLCB0aGFuIG5vbi1zdGFja2VkIGljb24uXG4gICAqIFlvdSdsbCBuZWVkIHRvIHNldCBzaXplIHVzaW5nIGN1c3RvbSBDU1MgdG8gYWxpZ24gc3RhY2tlZCBpY29uIHdpdGggYVxuICAgKiBzaW1wbGUgb25lLiBFLmcuIGBmYS1zdGFjayB7IGZvbnQtc2l6ZTogMC41ZW07IH1gLlxuICAgKi9cbiAgQElucHV0KCkgc2l6ZT86IFNpemVQcm9wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmYS1zdGFjaycpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICgnc2l6ZScgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZXMuc2l6ZS5jdXJyZW50VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgZmEtJHtjaGFuZ2VzLnNpemUuY3VycmVudFZhbHVlfWApO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuc2l6ZS5wcmV2aW91c1ZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYGZhLSR7Y2hhbmdlcy5zaXplLnByZXZpb3VzVmFsdWV9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=