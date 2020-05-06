/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FormGroupDirective, NgForm, FormControl } from '@angular/forms';
/** Error state matcher that matches when a control is invalid and dirty. */
import * as ɵngcc0 from '@angular/core';
export declare class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ShowOnDirtyErrorStateMatcher, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ShowOnDirtyErrorStateMatcher>;
}
/** Provider that defines how form controls behave with regards to displaying error messages. */
export declare class ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ErrorStateMatcher, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itb3B0aW9ucy5kLnRzIiwic291cmNlcyI6WyJlcnJvci1vcHRpb25zLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nRm9ybSwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vKiogRXJyb3Igc3RhdGUgbWF0Y2hlciB0aGF0IG1hdGNoZXMgd2hlbiBhIGNvbnRyb2wgaXMgaW52YWxpZCBhbmQgZGlydHkuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBTaG93T25EaXJ0eUVycm9yU3RhdGVNYXRjaGVyIGltcGxlbWVudHMgRXJyb3JTdGF0ZU1hdGNoZXIge1xuICAgIGlzRXJyb3JTdGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCB8IG51bGwsIGZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSB8IE5nRm9ybSB8IG51bGwpOiBib29sZWFuO1xufVxuLyoqIFByb3ZpZGVyIHRoYXQgZGVmaW5lcyBob3cgZm9ybSBjb250cm9scyBiZWhhdmUgd2l0aCByZWdhcmRzIHRvIGRpc3BsYXlpbmcgZXJyb3IgbWVzc2FnZXMuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBFcnJvclN0YXRlTWF0Y2hlciB7XG4gICAgaXNFcnJvclN0YXRlKGNvbnRyb2w6IEZvcm1Db250cm9sIHwgbnVsbCwgZm9ybTogRm9ybUdyb3VwRGlyZWN0aXZlIHwgTmdGb3JtIHwgbnVsbCk6IGJvb2xlYW47XG59XG4iXX0=