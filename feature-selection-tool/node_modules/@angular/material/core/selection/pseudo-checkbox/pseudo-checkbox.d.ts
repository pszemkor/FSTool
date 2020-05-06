/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Possible states for a pseudo checkbox.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare type MatPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `mat-primary .mat-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<mat-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
export declare class MatPseudoCheckbox {
    _animationMode?: string | undefined;
    /** Display state of the checkbox. */
    state: MatPseudoCheckboxState;
    /** Whether the checkbox is disabled. */
    disabled: boolean;
    constructor(_animationMode?: string | undefined);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatPseudoCheckbox, [{ optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatPseudoCheckbox, "mat-pseudo-checkbox", never, { "state": "state"; "disabled": "disabled"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWNoZWNrYm94LmQudHMiLCJzb3VyY2VzIjpbInBzZXVkby1jaGVja2JveC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBQb3NzaWJsZSBzdGF0ZXMgZm9yIGEgcHNldWRvIGNoZWNrYm94LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIE1hdFBzZXVkb0NoZWNrYm94U3RhdGUgPSAndW5jaGVja2VkJyB8ICdjaGVja2VkJyB8ICdpbmRldGVybWluYXRlJztcbi8qKlxuICogQ29tcG9uZW50IHRoYXQgc2hvd3MgYSBzaW1wbGlmaWVkIGNoZWNrYm94IHdpdGhvdXQgaW5jbHVkaW5nIGFueSBraW5kIG9mIFwicmVhbFwiIGNoZWNrYm94LlxuICogTWVhbnQgdG8gYmUgdXNlZCB3aGVuIHRoZSBjaGVja2JveCBpcyBwdXJlbHkgZGVjb3JhdGl2ZSBhbmQgYSBsYXJnZSBudW1iZXIgb2YgdGhlbSB3aWxsIGJlXG4gKiBpbmNsdWRlZCwgc3VjaCBhcyBmb3IgdGhlIG9wdGlvbnMgaW4gYSBtdWx0aS1zZWxlY3QuIFVzZXMgbm8gU1ZHcyBvciBjb21wbGV4IGFuaW1hdGlvbnMuXG4gKiBOb3RlIHRoYXQgdGhlbWluZyBpcyBtZWFudCB0byBiZSBoYW5kbGVkIGJ5IHRoZSBwYXJlbnQgZWxlbWVudCwgZS5nLlxuICogYG1hdC1wcmltYXJ5IC5tYXQtcHNldWRvLWNoZWNrYm94YC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBjb21wb25lbnQgd2lsbCBiZSBjb21wbGV0ZWx5IGludmlzaWJsZSB0byBzY3JlZW4tcmVhZGVyIHVzZXJzLiBUaGlzIGlzICpub3QqXG4gKiBpbnRlcmNoYW5nZWFibGUgd2l0aCBgPG1hdC1jaGVja2JveD5gIGFuZCBzaG91bGQgKm5vdCogYmUgdXNlZCBpZiB0aGUgdXNlciB3b3VsZCBkaXJlY3RseVxuICogaW50ZXJhY3Qgd2l0aCB0aGUgY2hlY2tib3guIFRoZSBwc2V1ZG8tY2hlY2tib3ggc2hvdWxkIG9ubHkgYmUgdXNlZCBhcyBhbiBpbXBsZW1lbnRhdGlvbiBkZXRhaWxcbiAqIG9mIG1vcmUgY29tcGxleCBjb21wb25lbnRzIHRoYXQgYXBwcm9wcmlhdGVseSBoYW5kbGUgc2VsZWN0ZWQgLyBjaGVja2VkIHN0YXRlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRQc2V1ZG9DaGVja2JveCB7XG4gICAgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqIERpc3BsYXkgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICAgIHN0YXRlOiBNYXRQc2V1ZG9DaGVja2JveFN0YXRlO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBkaXNhYmxlZC4gKi9cbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3RvcihfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZCk7XG59XG4iXX0=