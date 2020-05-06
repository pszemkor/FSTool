import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import * as ɵngcc0 from '@angular/core';
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
MockFaIconLibrary.ɵfac = function MockFaIconLibrary_Factory(t) { return new (t || MockFaIconLibrary)(); };
MockFaIconLibrary.ɵprov = ɵɵdefineInjectable({ factory: function MockFaIconLibrary_Factory() { return new MockFaIconLibrary(); }, token: MockFaIconLibrary, providedIn: "root" });

let FontAwesomeTestingModule = class FontAwesomeTestingModule {
};
FontAwesomeTestingModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: FontAwesomeTestingModule });
FontAwesomeTestingModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function FontAwesomeTestingModule_Factory(t) { return new (t || FontAwesomeTestingModule)(); }, providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }], imports: [FontAwesomeModule] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MockFaIconLibrary, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(FontAwesomeTestingModule, { exports: function () { return [FontAwesomeModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FontAwesomeTestingModule, [{
        type: NgModule,
        args: [{
                exports: [FontAwesomeModule],
                providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { FontAwesomeTestingModule, MockFaIconLibrary as ɵa };

//# sourceMappingURL=fortawesome-angular-fontawesome-testing.js.map