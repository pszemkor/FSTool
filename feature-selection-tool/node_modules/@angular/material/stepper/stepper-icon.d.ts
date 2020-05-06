/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TemplateRef } from '@angular/core';
import { StepState } from '@angular/cdk/stepper';
/** Template context available to an attached `matStepperIcon`. */
import * as ɵngcc0 from '@angular/core';
export interface MatStepperIconContext {
    /** Index of the step. */
    index: number;
    /** Whether the step is currently active. */
    active: boolean;
    /** Whether the step is optional. */
    optional: boolean;
}
/**
 * Template to be used to override the icons inside the step header.
 */
export declare class MatStepperIcon {
    templateRef: TemplateRef<MatStepperIconContext>;
    /** Name of the icon to be overridden. */
    name: StepState;
    constructor(templateRef: TemplateRef<MatStepperIconContext>);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatStepperIcon, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatStepperIcon, "ng-template[matStepperIcon]", never, { "name": "matStepperIcon"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1pY29uLmQudHMiLCJzb3VyY2VzIjpbInN0ZXBwZXItaWNvbi5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXBTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbi8qKiBUZW1wbGF0ZSBjb250ZXh0IGF2YWlsYWJsZSB0byBhbiBhdHRhY2hlZCBgbWF0U3RlcHBlckljb25gLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRTdGVwcGVySWNvbkNvbnRleHQge1xuICAgIC8qKiBJbmRleCBvZiB0aGUgc3RlcC4gKi9cbiAgICBpbmRleDogbnVtYmVyO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBzdGVwIGlzIGN1cnJlbnRseSBhY3RpdmUuICovXG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBzdGVwIGlzIG9wdGlvbmFsLiAqL1xuICAgIG9wdGlvbmFsOiBib29sZWFuO1xufVxuLyoqXG4gKiBUZW1wbGF0ZSB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBpY29ucyBpbnNpZGUgdGhlIHN0ZXAgaGVhZGVyLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRTdGVwcGVySWNvbiB7XG4gICAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE1hdFN0ZXBwZXJJY29uQ29udGV4dD47XG4gICAgLyoqIE5hbWUgb2YgdGhlIGljb24gdG8gYmUgb3ZlcnJpZGRlbi4gKi9cbiAgICBuYW1lOiBTdGVwU3RhdGU7XG4gICAgY29uc3RydWN0b3IodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE1hdFN0ZXBwZXJJY29uQ29udGV4dD4pO1xufVxuIl19