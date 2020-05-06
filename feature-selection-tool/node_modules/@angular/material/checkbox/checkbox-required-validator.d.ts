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
export declare const MAT_CHECKBOX_REQUIRED_VALIDATOR: Provider;
/**
 * Validator for Material checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mat-checkbox`.
 */
export declare class MatCheckboxRequiredValidator extends CheckboxRequiredValidator {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCheckboxRequiredValidator, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCheckboxRequiredValidator, "mat-checkbox[required][formControlName],             mat-checkbox[required][formControl], mat-checkbox[required][ngModel]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcmVxdWlyZWQtdmFsaWRhdG9yLmQudHMiLCJzb3VyY2VzIjpbImNoZWNrYm94LXJlcXVpcmVkLXZhbGlkYXRvci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0NIRUNLQk9YX1JFUVVJUkVEX1ZBTElEQVRPUjogUHJvdmlkZXI7XG4vKipcbiAqIFZhbGlkYXRvciBmb3IgTWF0ZXJpYWwgY2hlY2tib3gncyByZXF1aXJlZCBhdHRyaWJ1dGUgaW4gdGVtcGxhdGUtZHJpdmVuIGNoZWNrYm94LlxuICogQ3VycmVudCBDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yIG9ubHkgd29yayB3aXRoIGBpbnB1dCB0eXBlPWNoZWNrYm94YCBhbmQgZG9lcyBub3RcbiAqIHdvcmsgd2l0aCBgbWF0LWNoZWNrYm94YC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvciBleHRlbmRzIENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3Ige1xufVxuIl19