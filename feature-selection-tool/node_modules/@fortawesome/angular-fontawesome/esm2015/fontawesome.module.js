import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FaDuotoneIconComponent } from './icon/duotone-icon.component';
import { FaIconComponent } from './icon/icon.component';
import { FaLayersCounterComponent } from './layers/layers-counter.component';
import { FaLayersTextComponent } from './layers/layers-text.component';
import { FaLayersComponent } from './layers/layers.component';
import { FaStackItemSizeDirective } from './stack/stack-item-size.directive';
import { FaStackComponent } from './stack/stack.component';
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
export { FontAwesomeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGF3ZXNvbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJmb250YXdlc29tZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBdUIzRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtDQUFHLENBQUE7QUFBcEIsaUJBQWlCO0lBckI3QixRQUFRLENBQUM7UUFDUixZQUFZLEVBQUU7WUFDWixlQUFlO1lBQ2Ysc0JBQXNCO1lBQ3RCLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLGdCQUFnQjtZQUNoQix3QkFBd0I7U0FDekI7UUFDRCxPQUFPLEVBQUU7WUFDUCxlQUFlO1lBQ2Ysc0JBQXNCO1lBQ3RCLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLGdCQUFnQjtZQUNoQix3QkFBd0I7U0FDekI7UUFDRCxlQUFlLEVBQUUsQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUM7S0FDM0QsQ0FBQztHQUNXLGlCQUFpQixDQUFHO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGYUR1b3RvbmVJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29uL2R1b3RvbmUtaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IEZhTGF5ZXJzQ291bnRlckNvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXJzL2xheWVycy1jb3VudGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYUxheWVyc1RleHRDb21wb25lbnQgfSBmcm9tICcuL2xheWVycy9sYXllcnMtdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFMYXllcnNDb21wb25lbnQgfSBmcm9tICcuL2xheWVycy9sYXllcnMuY29tcG9uZW50JztcbmltcG9ydCB7IEZhU3RhY2tJdGVtU2l6ZURpcmVjdGl2ZSB9IGZyb20gJy4vc3RhY2svc3RhY2staXRlbS1zaXplLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGYVN0YWNrQ29tcG9uZW50IH0gZnJvbSAnLi9zdGFjay9zdGFjay5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGYUljb25Db21wb25lbnQsXG4gICAgRmFEdW90b25lSWNvbkNvbXBvbmVudCxcbiAgICBGYUxheWVyc0NvbXBvbmVudCxcbiAgICBGYUxheWVyc1RleHRDb21wb25lbnQsXG4gICAgRmFMYXllcnNDb3VudGVyQ29tcG9uZW50LFxuICAgIEZhU3RhY2tDb21wb25lbnQsXG4gICAgRmFTdGFja0l0ZW1TaXplRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRmFJY29uQ29tcG9uZW50LFxuICAgIEZhRHVvdG9uZUljb25Db21wb25lbnQsXG4gICAgRmFMYXllcnNDb21wb25lbnQsXG4gICAgRmFMYXllcnNUZXh0Q29tcG9uZW50LFxuICAgIEZhTGF5ZXJzQ291bnRlckNvbXBvbmVudCxcbiAgICBGYVN0YWNrQ29tcG9uZW50LFxuICAgIEZhU3RhY2tJdGVtU2l6ZURpcmVjdGl2ZSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRmFJY29uQ29tcG9uZW50LCBGYUR1b3RvbmVJY29uQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRm9udEF3ZXNvbWVNb2R1bGUge31cbiJdfQ==