import { __decorate, __param } from "tslib";
import { Component, HostBinding, Input, Optional } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { FaLayersComponent } from './layers.component';
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
export { FaLayersCounterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLWNvdW50ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJsYXllcnMvbGF5ZXJzLWNvdW50ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxPQUFPLEVBQXlCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFTdkQsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFRbkMsWUFBZ0MsTUFBeUIsRUFBVSxTQUF1QjtRQUExRCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFKakYsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUsvQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sRUFBRTtZQUNYLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVTLFdBQVc7UUFDbkIsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQXFCO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hILENBQUM7Q0FDRixDQUFBOztZQXRCeUMsaUJBQWlCLHVCQUE1QyxRQUFRO1lBQXlELFlBQVk7O0FBUGpGO0lBQVIsS0FBSyxFQUFFO3lEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTt1REFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTt3REFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7eURBQXlCO0FBRVA7SUFBekIsV0FBVyxDQUFDLFdBQVcsQ0FBQzs4REFBd0I7QUFOdEMsd0JBQXdCO0lBUHBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUsc0JBQXNCO1NBQzlCO0tBQ0YsQ0FBQztJQVNhLFdBQUEsUUFBUSxFQUFFLENBQUE7R0FSWix3QkFBd0IsQ0E4QnBDO1NBOUJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9wdGlvbmFsLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBjb3VudGVyLCBDb3VudGVyUGFyYW1zLCBTdHlsZXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFXYXJuSWZQYXJlbnROb3RFeGlzdCB9IGZyb20gJy4uL3NoYXJlZC9lcnJvcnMvd2Fybi1pZi1wYXJlbnQtbm90LWV4aXN0JztcbmltcG9ydCB7IEZhTGF5ZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllcnMuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmEtbGF5ZXJzLWNvdW50ZXInLFxuICB0ZW1wbGF0ZTogJycsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25nLWZhLWxheWVycy1jb3VudGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgRmFMYXllcnNDb3VudGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY29udGVudDogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZztcbiAgQElucHV0KCkgc3R5bGVzPzogU3R5bGVzO1xuICBASW5wdXQoKSBjbGFzc2VzPzogc3RyaW5nW10gPSBbXTtcblxuICBASG9zdEJpbmRpbmcoJ2lubmVySFRNTCcpIHJlbmRlcmVkSFRNTDogU2FmZUh0bWw7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBwYXJlbnQ6IEZhTGF5ZXJzQ29tcG9uZW50LCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgZmFXYXJuSWZQYXJlbnROb3RFeGlzdCh0aGlzLnBhcmVudCwgJ0ZhTGF5ZXJzQ29tcG9uZW50JywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5idWlsZFBhcmFtcygpO1xuICAgICAgdGhpcy51cGRhdGVDb250ZW50KHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkUGFyYW1zKCk6IENvdW50ZXJQYXJhbXMge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIGNsYXNzZXM6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29udGVudChwYXJhbXM6IENvdW50ZXJQYXJhbXMpIHtcbiAgICB0aGlzLnJlbmRlcmVkSFRNTCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGNvdW50ZXIodGhpcy5jb250ZW50IHx8ICcnLCBwYXJhbXMpLmh0bWwuam9pbignJykpO1xuICB9XG59XG4iXX0=