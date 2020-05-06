/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Provider } from '@angular/core';
import { CheckboxRequiredValidator } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
export declare const MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR: Provider;
/**
 * Validator for Material slide-toggle components with the required attribute in a
 * template-driven form. The default validator for required form controls asserts
 * that the control value is not undefined but that is not appropriate for a slide-toggle
 * where the value is always defined.
 *
 * Required slide-toggle form controls are valid when checked.
 */
export declare class MatSlideToggleRequiredValidator extends CheckboxRequiredValidator {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSlideToggleRequiredValidator, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatSlideToggleRequiredValidator, "mat-slide-toggle[required][formControlName],             mat-slide-toggle[required][formControl], mat-slide-toggle[required][ngModel]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLXJlcXVpcmVkLXZhbGlkYXRvci5kLnRzIiwic291cmNlcyI6WyJzbGlkZS10b2dnbGUtcmVxdWlyZWQtdmFsaWRhdG9yLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfU0xJREVfVE9HR0xFX1JFUVVJUkVEX1ZBTElEQVRPUjogUHJvdmlkZXI7XG4vKipcbiAqIFZhbGlkYXRvciBmb3IgTWF0ZXJpYWwgc2xpZGUtdG9nZ2xlIGNvbXBvbmVudHMgd2l0aCB0aGUgcmVxdWlyZWQgYXR0cmlidXRlIGluIGFcbiAqIHRlbXBsYXRlLWRyaXZlbiBmb3JtLiBUaGUgZGVmYXVsdCB2YWxpZGF0b3IgZm9yIHJlcXVpcmVkIGZvcm0gY29udHJvbHMgYXNzZXJ0c1xuICogdGhhdCB0aGUgY29udHJvbCB2YWx1ZSBpcyBub3QgdW5kZWZpbmVkIGJ1dCB0aGF0IGlzIG5vdCBhcHByb3ByaWF0ZSBmb3IgYSBzbGlkZS10b2dnbGVcbiAqIHdoZXJlIHRoZSB2YWx1ZSBpcyBhbHdheXMgZGVmaW5lZC5cbiAqXG4gKiBSZXF1aXJlZCBzbGlkZS10b2dnbGUgZm9ybSBjb250cm9scyBhcmUgdmFsaWQgd2hlbiBjaGVja2VkLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRTbGlkZVRvZ2dsZVJlcXVpcmVkVmFsaWRhdG9yIGV4dGVuZHMgQ2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvciB7XG59XG4iXX0=