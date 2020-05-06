import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

const dummyIcon = {
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
MockFaIconLibrary.ɵprov = ɵɵdefineInjectable({ factory: function MockFaIconLibrary_Factory() { return new MockFaIconLibrary(); }, token: MockFaIconLibrary, providedIn: "root" });
MockFaIconLibrary = __decorate([
    Injectable({
        providedIn: 'root',
    })
], MockFaIconLibrary);

let FontAwesomeTestingModule = class FontAwesomeTestingModule {
};
FontAwesomeTestingModule = __decorate([
    NgModule({
        exports: [FontAwesomeModule],
        providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }],
    })
], FontAwesomeTestingModule);

/**
 * Generated bundle index. Do not edit.
 */

export { FontAwesomeTestingModule, MockFaIconLibrary as ɵa };
//# sourceMappingURL=fortawesome-angular-fontawesome-testing.js.map
