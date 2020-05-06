import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export var dummyIcon = {
    prefix: 'fad',
    iconName: 'dummy',
    icon: [512, 512, [], 'f030', 'M50 50 H462 V462 H50 Z'],
};
var MockFaIconLibrary = /** @class */ (function () {
    function MockFaIconLibrary() {
    }
    MockFaIconLibrary.prototype.addIcons = function () {
        throw new Error('Attempt to add an icon to the MockFaIconLibrary.');
    };
    MockFaIconLibrary.prototype.addIconPacks = function () {
        throw new Error('Attempt to add an icon pack to the MockFaIconLibrary.');
    };
    MockFaIconLibrary.prototype.getIconDefinition = function (prefix, name) {
        return dummyIcon;
    };
    MockFaIconLibrary.ɵprov = i0.ɵɵdefineInjectable({ factory: function MockFaIconLibrary_Factory() { return new MockFaIconLibrary(); }, token: MockFaIconLibrary, providedIn: "root" });
    MockFaIconLibrary = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], MockFaIconLibrary);
    return MockFaIconLibrary;
}());
export { MockFaIconLibrary };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1pY29uLWxpYnJhcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lL3Rlc3RpbmcvIiwic291cmNlcyI6WyJpY29uL21vY2staWNvbi1saWJyYXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBbUI7SUFDdkMsTUFBTSxFQUFFLEtBQUs7SUFDYixRQUFRLEVBQUUsT0FBbUI7SUFDN0IsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixDQUFDO0NBQ3ZELENBQUM7QUFLRjtJQUFBO0tBWUM7SUFYQyxvQ0FBUSxHQUFSO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCw2Q0FBaUIsR0FBakIsVUFBa0IsTUFBa0IsRUFBRSxJQUFjO1FBQ2xELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O0lBWFUsaUJBQWlCO1FBSDdCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxpQkFBaUIsQ0FZN0I7NEJBekJEO0NBeUJDLEFBWkQsSUFZQztTQVpZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZhSWNvbkxpYnJhcnlJbnRlcmZhY2UgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBJY29uRGVmaW5pdGlvbiwgSWNvbk5hbWUsIEljb25QcmVmaXggfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuXG5leHBvcnQgY29uc3QgZHVtbXlJY29uOiBJY29uRGVmaW5pdGlvbiA9IHtcbiAgcHJlZml4OiAnZmFkJyxcbiAgaWNvbk5hbWU6ICdkdW1teScgYXMgSWNvbk5hbWUsXG4gIGljb246IFs1MTIsIDUxMiwgW10sICdmMDMwJywgJ001MCA1MCBINDYyIFY0NjIgSDUwIFonXSxcbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNb2NrRmFJY29uTGlicmFyeSBpbXBsZW1lbnRzIEZhSWNvbkxpYnJhcnlJbnRlcmZhY2Uge1xuICBhZGRJY29ucygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHQgdG8gYWRkIGFuIGljb24gdG8gdGhlIE1vY2tGYUljb25MaWJyYXJ5LicpO1xuICB9XG5cbiAgYWRkSWNvblBhY2tzKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBhZGQgYW4gaWNvbiBwYWNrIHRvIHRoZSBNb2NrRmFJY29uTGlicmFyeS4nKTtcbiAgfVxuXG4gIGdldEljb25EZWZpbml0aW9uKHByZWZpeDogSWNvblByZWZpeCwgbmFtZTogSWNvbk5hbWUpOiBJY29uRGVmaW5pdGlvbiB7XG4gICAgcmV0dXJuIGR1bW15SWNvbjtcbiAgfVxufVxuIl19