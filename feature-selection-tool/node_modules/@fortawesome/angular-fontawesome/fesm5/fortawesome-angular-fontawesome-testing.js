import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

var dummyIcon = {
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
    MockFaIconLibrary.ɵprov = ɵɵdefineInjectable({ factory: function MockFaIconLibrary_Factory() { return new MockFaIconLibrary(); }, token: MockFaIconLibrary, providedIn: "root" });
    MockFaIconLibrary = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], MockFaIconLibrary);
    return MockFaIconLibrary;
}());

var FontAwesomeTestingModule = /** @class */ (function () {
    function FontAwesomeTestingModule() {
    }
    FontAwesomeTestingModule = __decorate([
        NgModule({
            exports: [FontAwesomeModule],
            providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }],
        })
    ], FontAwesomeTestingModule);
    return FontAwesomeTestingModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { FontAwesomeTestingModule, MockFaIconLibrary as ɵa };
//# sourceMappingURL=fortawesome-angular-fontawesome-testing.js.map
