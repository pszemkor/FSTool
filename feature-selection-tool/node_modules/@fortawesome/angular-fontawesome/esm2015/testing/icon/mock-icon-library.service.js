import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export const dummyIcon = {
    prefix: 'fad',
    iconName: 'dummy',
    icon: [512, 512, [], 'f030', 'M50 50 H462 V462 H50 Z'],
};
let MockFaIconLibrary = class MockFaIconLibrary {
    addIcons() {
        throw new Error('Attempt to add an icon to the MockFaIconLibrary.');
    }
    addIconPacks() {
        throw new Error('Attempt to add an icon pack to the MockFaIconLibrary.');
    }
    getIconDefinition(prefix, name) {
        return dummyIcon;
    }
};
MockFaIconLibrary.ɵprov = i0.ɵɵdefineInjectable({ factory: function MockFaIconLibrary_Factory() { return new MockFaIconLibrary(); }, token: MockFaIconLibrary, providedIn: "root" });
MockFaIconLibrary = __decorate([
    Injectable({
        providedIn: 'root',
    })
], MockFaIconLibrary);
export { MockFaIconLibrary };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1pY29uLWxpYnJhcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lL3Rlc3RpbmcvIiwic291cmNlcyI6WyJpY29uL21vY2staWNvbi1saWJyYXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBbUI7SUFDdkMsTUFBTSxFQUFFLEtBQUs7SUFDYixRQUFRLEVBQUUsT0FBbUI7SUFDN0IsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixDQUFDO0NBQ3ZELENBQUM7QUFLRixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUM1QixRQUFRO1FBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxZQUFZO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxNQUFrQixFQUFFLElBQWM7UUFDbEQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGLENBQUE7O0FBWlksaUJBQWlCO0lBSDdCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxpQkFBaUIsQ0FZN0I7U0FaWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGYUljb25MaWJyYXJ5SW50ZXJmYWNlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24sIEljb25OYW1lLCBJY29uUHJlZml4IH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcblxuZXhwb3J0IGNvbnN0IGR1bW15SWNvbjogSWNvbkRlZmluaXRpb24gPSB7XG4gIHByZWZpeDogJ2ZhZCcsXG4gIGljb25OYW1lOiAnZHVtbXknIGFzIEljb25OYW1lLFxuICBpY29uOiBbNTEyLCA1MTIsIFtdLCAnZjAzMCcsICdNNTAgNTAgSDQ2MiBWNDYyIEg1MCBaJ10sXG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTW9ja0ZhSWNvbkxpYnJhcnkgaW1wbGVtZW50cyBGYUljb25MaWJyYXJ5SW50ZXJmYWNlIHtcbiAgYWRkSWNvbnMoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIGFkZCBhbiBpY29uIHRvIHRoZSBNb2NrRmFJY29uTGlicmFyeS4nKTtcbiAgfVxuXG4gIGFkZEljb25QYWNrcygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHQgdG8gYWRkIGFuIGljb24gcGFjayB0byB0aGUgTW9ja0ZhSWNvbkxpYnJhcnkuJyk7XG4gIH1cblxuICBnZXRJY29uRGVmaW5pdGlvbihwcmVmaXg6IEljb25QcmVmaXgsIG5hbWU6IEljb25OYW1lKTogSWNvbkRlZmluaXRpb24ge1xuICAgIHJldHVybiBkdW1teUljb247XG4gIH1cbn1cbiJdfQ==