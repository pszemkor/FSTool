/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { CdkStep, CdkStepper, StepperOptions } from '@angular/cdk/stepper';
import { AnimationEvent } from '@angular/animations';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';
import { MatStepHeader } from './step-header';
import { MatStepLabel } from './step-label';
import { MatStepperIcon, MatStepperIconContext } from './stepper-icon';
import * as ɵngcc0 from '@angular/core';
export declare class MatStep extends CdkStep implements ErrorStateMatcher {
    private _errorStateMatcher;
    /** Content for step label given by `<ng-template matStepLabel>`. */
    stepLabel: MatStepLabel;
    /** @breaking-change 8.0.0 remove the `?` after `stepperOptions` */
    constructor(stepper: MatStepper, _errorStateMatcher: ErrorStateMatcher, stepperOptions?: StepperOptions);
    /** Custom error state matcher that additionally checks for validity of interacted form. */
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatStep, [null, { skipSelf: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatStep, "mat-step", ["matStep"], {}, {}, ["stepLabel"], ["*"]>;
}
export declare class MatStepper extends CdkStepper implements AfterContentInit {
    /** The list of step headers of the steps in the stepper. */
    _stepHeader: QueryList<MatStepHeader>;
    /** Steps that the stepper holds. */
    _steps: QueryList<MatStep>;
    /** Custom icon overrides passed in by the consumer. */
    _icons: QueryList<MatStepperIcon>;
    /** Event emitted when the current step is done transitioning in. */
    readonly animationDone: EventEmitter<void>;
    /** Whether ripples should be disabled for the step headers. */
    disableRipple: boolean;
    /** Consumer-specified template-refs to be used to override the header icons. */
    _iconOverrides: {
        [key: string]: TemplateRef<MatStepperIconContext>;
    };
    /** Stream of animation `done` events when the body expands/collapses. */
    _animationDone: Subject<AnimationEvent>;
    ngAfterContentInit(): void;
    static ngAcceptInputType_editable: BooleanInput;
    static ngAcceptInputType_optional: BooleanInput;
    static ngAcceptInputType_completed: BooleanInput;
    static ngAcceptInputType_hasError: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatStepper, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatStepper, "[matStepper]", never, { "disableRipple": "disableRipple"; }, { "animationDone": "animationDone"; }, ["_steps", "_icons"]>;
}
export declare class MatHorizontalStepper extends MatStepper {
    /** Whether the label should display in bottom or end position. */
    labelPosition: 'bottom' | 'end';
    static ngAcceptInputType_editable: BooleanInput;
    static ngAcceptInputType_optional: BooleanInput;
    static ngAcceptInputType_completed: BooleanInput;
    static ngAcceptInputType_hasError: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatHorizontalStepper, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatHorizontalStepper, "mat-horizontal-stepper", ["matHorizontalStepper"], { "selectedIndex": "selectedIndex"; "labelPosition": "labelPosition"; }, {}, never, never>;
}
export declare class MatVerticalStepper extends MatStepper {
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef?: ElementRef<HTMLElement>, _document?: any);
    static ngAcceptInputType_editable: BooleanInput;
    static ngAcceptInputType_optional: BooleanInput;
    static ngAcceptInputType_completed: BooleanInput;
    static ngAcceptInputType_hasError: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatVerticalStepper, [{ optional: true; }, null, null, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatVerticalStepper, "mat-vertical-stepper", ["matVerticalStepper"], { "selectedIndex": "selectedIndex"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5kLnRzIiwic291cmNlcyI6WyJzdGVwcGVyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrU3RlcCwgQ2RrU3RlcHBlciwgU3RlcHBlck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRXJyb3JTdGF0ZU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdFN0ZXBIZWFkZXIgfSBmcm9tICcuL3N0ZXAtaGVhZGVyJztcbmltcG9ydCB7IE1hdFN0ZXBMYWJlbCB9IGZyb20gJy4vc3RlcC1sYWJlbCc7XG5pbXBvcnQgeyBNYXRTdGVwcGVySWNvbiwgTWF0U3RlcHBlckljb25Db250ZXh0IH0gZnJvbSAnLi9zdGVwcGVyLWljb24nO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0U3RlcCBleHRlbmRzIENka1N0ZXAgaW1wbGVtZW50cyBFcnJvclN0YXRlTWF0Y2hlciB7XG4gICAgcHJpdmF0ZSBfZXJyb3JTdGF0ZU1hdGNoZXI7XG4gICAgLyoqIENvbnRlbnQgZm9yIHN0ZXAgbGFiZWwgZ2l2ZW4gYnkgYDxuZy10ZW1wbGF0ZSBtYXRTdGVwTGFiZWw+YC4gKi9cbiAgICBzdGVwTGFiZWw6IE1hdFN0ZXBMYWJlbDtcbiAgICAvKiogQGJyZWFraW5nLWNoYW5nZSA4LjAuMCByZW1vdmUgdGhlIGA/YCBhZnRlciBgc3RlcHBlck9wdGlvbnNgICovXG4gICAgY29uc3RydWN0b3Ioc3RlcHBlcjogTWF0U3RlcHBlciwgX2Vycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlciwgc3RlcHBlck9wdGlvbnM/OiBTdGVwcGVyT3B0aW9ucyk7XG4gICAgLyoqIEN1c3RvbSBlcnJvciBzdGF0ZSBtYXRjaGVyIHRoYXQgYWRkaXRpb25hbGx5IGNoZWNrcyBmb3IgdmFsaWRpdHkgb2YgaW50ZXJhY3RlZCBmb3JtLiAqL1xuICAgIGlzRXJyb3JTdGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCB8IG51bGwsIGZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSB8IE5nRm9ybSB8IG51bGwpOiBib29sZWFuO1xufVxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0U3RlcHBlciBleHRlbmRzIENka1N0ZXBwZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKiogVGhlIGxpc3Qgb2Ygc3RlcCBoZWFkZXJzIG9mIHRoZSBzdGVwcyBpbiB0aGUgc3RlcHBlci4gKi9cbiAgICBfc3RlcEhlYWRlcjogUXVlcnlMaXN0PE1hdFN0ZXBIZWFkZXI+O1xuICAgIC8qKiBTdGVwcyB0aGF0IHRoZSBzdGVwcGVyIGhvbGRzLiAqL1xuICAgIF9zdGVwczogUXVlcnlMaXN0PE1hdFN0ZXA+O1xuICAgIC8qKiBDdXN0b20gaWNvbiBvdmVycmlkZXMgcGFzc2VkIGluIGJ5IHRoZSBjb25zdW1lci4gKi9cbiAgICBfaWNvbnM6IFF1ZXJ5TGlzdDxNYXRTdGVwcGVySWNvbj47XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY3VycmVudCBzdGVwIGlzIGRvbmUgdHJhbnNpdGlvbmluZyBpbi4gKi9cbiAgICByZWFkb25seSBhbmltYXRpb25Eb25lOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqIFdoZXRoZXIgcmlwcGxlcyBzaG91bGQgYmUgZGlzYWJsZWQgZm9yIHRoZSBzdGVwIGhlYWRlcnMuICovXG4gICAgZGlzYWJsZVJpcHBsZTogYm9vbGVhbjtcbiAgICAvKiogQ29uc3VtZXItc3BlY2lmaWVkIHRlbXBsYXRlLXJlZnMgdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgaGVhZGVyIGljb25zLiAqL1xuICAgIF9pY29uT3ZlcnJpZGVzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IFRlbXBsYXRlUmVmPE1hdFN0ZXBwZXJJY29uQ29udGV4dD47XG4gICAgfTtcbiAgICAvKiogU3RyZWFtIG9mIGFuaW1hdGlvbiBgZG9uZWAgZXZlbnRzIHdoZW4gdGhlIGJvZHkgZXhwYW5kcy9jb2xsYXBzZXMuICovXG4gICAgX2FuaW1hdGlvbkRvbmU6IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+O1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9lZGl0YWJsZTogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vcHRpb25hbDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jb21wbGV0ZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGFzRXJyb3I6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEhvcml6b250YWxTdGVwcGVyIGV4dGVuZHMgTWF0U3RlcHBlciB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBkaXNwbGF5IGluIGJvdHRvbSBvciBlbmQgcG9zaXRpb24uICovXG4gICAgbGFiZWxQb3NpdGlvbjogJ2JvdHRvbScgfCAnZW5kJztcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZWRpdGFibGU6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3B0aW9uYWw6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY29tcGxldGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hhc0Vycm9yOiBCb29sZWFuSW5wdXQ7XG59XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRWZXJ0aWNhbFN0ZXBwZXIgZXh0ZW5kcyBNYXRTdGVwcGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkaXI6IERpcmVjdGlvbmFsaXR5LCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGVsZW1lbnRSZWY/OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgX2RvY3VtZW50PzogYW55KTtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZWRpdGFibGU6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3B0aW9uYWw6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY29tcGxldGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hhc0Vycm9yOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=