/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, OnDestroy, TemplateRef } from '@angular/core';
import { MatStepLabel } from './step-label';
import { MatStepperIntl } from './stepper-intl';
import { MatStepperIconContext } from './stepper-icon';
import { CdkStepHeader, StepState } from '@angular/cdk/stepper';
import * as ɵngcc0 from '@angular/core';
export declare class MatStepHeader extends CdkStepHeader implements OnDestroy {
    _intl: MatStepperIntl;
    private _focusMonitor;
    private _intlSubscription;
    /** State of the given step. */
    state: StepState;
    /** Label of the given step. */
    label: MatStepLabel | string;
    /** Error message to display when there's an error. */
    errorMessage: string;
    /** Overrides for the header icons, passed in via the stepper. */
    iconOverrides: {
        [key: string]: TemplateRef<MatStepperIconContext>;
    };
    /** Index of the given step. */
    index: number;
    /** Whether the given step is selected. */
    selected: boolean;
    /** Whether the given step label is active. */
    active: boolean;
    /** Whether the given step is optional. */
    optional: boolean;
    /** Whether the ripple should be disabled. */
    disableRipple: boolean;
    constructor(_intl: MatStepperIntl, _focusMonitor: FocusMonitor, _elementRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    /** Focuses the step header. */
    focus(): void;
    /** Returns string label of given step if it is a text label. */
    _stringLabel(): string | null;
    /** Returns MatStepLabel if the label of given step is a template label. */
    _templateLabel(): MatStepLabel | null;
    /** Returns the host HTML element. */
    _getHostElement(): HTMLElement;
    /** Template context variables that are exposed to the `matStepperIcon` instances. */
    _getIconContext(): MatStepperIconContext;
    _getDefaultTextForState(state: StepState): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatStepHeader, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatStepHeader, "mat-step-header", never, { "state": "state"; "label": "label"; "errorMessage": "errorMessage"; "iconOverrides": "iconOverrides"; "index": "index"; "selected": "selected"; "active": "active"; "optional": "optional"; "disableRipple": "disableRipple"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1oZWFkZXIuZC50cyIsInNvdXJjZXMiOlsic3RlcC1oZWFkZXIuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTdGVwTGFiZWwgfSBmcm9tICcuL3N0ZXAtbGFiZWwnO1xuaW1wb3J0IHsgTWF0U3RlcHBlckludGwgfSBmcm9tICcuL3N0ZXBwZXItaW50bCc7XG5pbXBvcnQgeyBNYXRTdGVwcGVySWNvbkNvbnRleHQgfSBmcm9tICcuL3N0ZXBwZXItaWNvbic7XG5pbXBvcnQgeyBDZGtTdGVwSGVhZGVyLCBTdGVwU3RhdGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRTdGVwSGVhZGVyIGV4dGVuZHMgQ2RrU3RlcEhlYWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgX2ludGw6IE1hdFN0ZXBwZXJJbnRsO1xuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjtcbiAgICBwcml2YXRlIF9pbnRsU3Vic2NyaXB0aW9uO1xuICAgIC8qKiBTdGF0ZSBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgICBzdGF0ZTogU3RlcFN0YXRlO1xuICAgIC8qKiBMYWJlbCBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgICBsYWJlbDogTWF0U3RlcExhYmVsIHwgc3RyaW5nO1xuICAgIC8qKiBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGVyZSdzIGFuIGVycm9yLiAqL1xuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICAgIC8qKiBPdmVycmlkZXMgZm9yIHRoZSBoZWFkZXIgaWNvbnMsIHBhc3NlZCBpbiB2aWEgdGhlIHN0ZXBwZXIuICovXG4gICAgaWNvbk92ZXJyaWRlczoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBUZW1wbGF0ZVJlZjxNYXRTdGVwcGVySWNvbkNvbnRleHQ+O1xuICAgIH07XG4gICAgLyoqIEluZGV4IG9mIHRoZSBnaXZlbiBzdGVwLiAqL1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgaXMgc2VsZWN0ZWQuICovXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgbGFiZWwgaXMgYWN0aXZlLiAqL1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBpcyBvcHRpb25hbC4gKi9cbiAgICBvcHRpb25hbDogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgcmlwcGxlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgICBkaXNhYmxlUmlwcGxlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKF9pbnRsOiBNYXRTdGVwcGVySW50bCwgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogRm9jdXNlcyB0aGUgc3RlcCBoZWFkZXIuICovXG4gICAgZm9jdXMoKTogdm9pZDtcbiAgICAvKiogUmV0dXJucyBzdHJpbmcgbGFiZWwgb2YgZ2l2ZW4gc3RlcCBpZiBpdCBpcyBhIHRleHQgbGFiZWwuICovXG4gICAgX3N0cmluZ0xhYmVsKCk6IHN0cmluZyB8IG51bGw7XG4gICAgLyoqIFJldHVybnMgTWF0U3RlcExhYmVsIGlmIHRoZSBsYWJlbCBvZiBnaXZlbiBzdGVwIGlzIGEgdGVtcGxhdGUgbGFiZWwuICovXG4gICAgX3RlbXBsYXRlTGFiZWwoKTogTWF0U3RlcExhYmVsIHwgbnVsbDtcbiAgICAvKiogUmV0dXJucyB0aGUgaG9zdCBIVE1MIGVsZW1lbnQuICovXG4gICAgX2dldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50O1xuICAgIC8qKiBUZW1wbGF0ZSBjb250ZXh0IHZhcmlhYmxlcyB0aGF0IGFyZSBleHBvc2VkIHRvIHRoZSBgbWF0U3RlcHBlckljb25gIGluc3RhbmNlcy4gKi9cbiAgICBfZ2V0SWNvbkNvbnRleHQoKTogTWF0U3RlcHBlckljb25Db250ZXh0O1xuICAgIF9nZXREZWZhdWx0VGV4dEZvclN0YXRlKHN0YXRlOiBTdGVwU3RhdGUpOiBzdHJpbmc7XG59XG4iXX0=