/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Optional } from '@angular/core';
import { Subject } from 'rxjs';
/** Stepper data that is required for internationalization. */
import * as ɵngcc0 from '@angular/core';
export declare class MatStepperIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes: Subject<void>;
    /** Label that is rendered below optional steps. */
    optionalLabel: string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatStepperIntl, never>;
}
/** @docs-private */
export declare function MAT_STEPPER_INTL_PROVIDER_FACTORY(parentIntl: MatStepperIntl): MatStepperIntl;
/** @docs-private */
export declare const MAT_STEPPER_INTL_PROVIDER: {
    provide: typeof MatStepperIntl;
    deps: Optional[][];
    useFactory: typeof MAT_STEPPER_INTL_PROVIDER_FACTORY;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1pbnRsLmQudHMiLCJzb3VyY2VzIjpbInN0ZXBwZXItaW50bC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLyoqIFN0ZXBwZXIgZGF0YSB0aGF0IGlzIHJlcXVpcmVkIGZvciBpbnRlcm5hdGlvbmFsaXphdGlvbi4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFN0ZXBwZXJJbnRsIHtcbiAgICAvKipcbiAgICAgKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgbGFiZWxzIGhlcmUgYXJlIGNoYW5nZWQuIFVzZSB0aGlzIHRvIG5vdGlmeVxuICAgICAqIGNvbXBvbmVudHMgaWYgdGhlIGxhYmVscyBoYXZlIGNoYW5nZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgY2hhbmdlczogU3ViamVjdDx2b2lkPjtcbiAgICAvKiogTGFiZWwgdGhhdCBpcyByZW5kZXJlZCBiZWxvdyBvcHRpb25hbCBzdGVwcy4gKi9cbiAgICBvcHRpb25hbExhYmVsOiBzdHJpbmc7XG59XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gTUFUX1NURVBQRVJfSU5UTF9QUk9WSURFUl9GQUNUT1JZKHBhcmVudEludGw6IE1hdFN0ZXBwZXJJbnRsKTogTWF0U3RlcHBlckludGw7XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX1NURVBQRVJfSU5UTF9QUk9WSURFUjoge1xuICAgIHByb3ZpZGU6IHR5cGVvZiBNYXRTdGVwcGVySW50bDtcbiAgICBkZXBzOiBPcHRpb25hbFtdW107XG4gICAgdXNlRmFjdG9yeTogdHlwZW9mIE1BVF9TVEVQUEVSX0lOVExfUFJPVklERVJfRkFDVE9SWTtcbn07XG4iXX0=