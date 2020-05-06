/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDatepicker } from './datepicker';
import { MatDatepickerIntl } from './datepicker-intl';
/** Can be used to override the icon of a `matDatepickerToggle`. */
import * as ɵngcc0 from '@angular/core';
export declare class MatDatepickerToggleIcon {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDatepickerToggleIcon, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatDatepickerToggleIcon, "[matDatepickerToggleIcon]", never, {}, {}, never>;
}
export declare class MatDatepickerToggle<D> implements AfterContentInit, OnChanges, OnDestroy {
    _intl: MatDatepickerIntl;
    private _changeDetectorRef;
    private _stateChanges;
    /** Datepicker instance that the button will toggle. */
    datepicker: MatDatepicker<D>;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** Whether the toggle button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Whether ripples on the toggle should be disabled. */
    disableRipple: boolean;
    /** Custom icon set by the consumer. */
    _customIcon: MatDatepickerToggleIcon;
    /** Underlying button element. */
    _button: MatButton;
    constructor(_intl: MatDatepickerIntl, _changeDetectorRef: ChangeDetectorRef, defaultTabIndex: string);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    _open(event: Event): void;
    private _watchStateChanges;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDatepickerToggle<any>, [null, null, { attribute: "tabindex"; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatDatepickerToggle<any>, "mat-datepicker-toggle", ["matDatepickerToggle"], { "tabIndex": "tabIndex"; "disabled": "disabled"; "datepicker": "for"; "disableRipple": "disableRipple"; }, {}, ["_customIcon"], ["[matDatepickerToggleIcon]"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuZC50cyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci10b2dnbGUuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEJ1dHRvbiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyJztcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuLyoqIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBpY29uIG9mIGEgYG1hdERhdGVwaWNrZXJUb2dnbGVgLiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0RGF0ZXBpY2tlclRvZ2dsZUljb24ge1xufVxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0RGF0ZXBpY2tlclRvZ2dsZTxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBfaW50bDogTWF0RGF0ZXBpY2tlckludGw7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VzO1xuICAgIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cbiAgICBkYXRlcGlja2VyOiBNYXREYXRlcGlja2VyPEQ+O1xuICAgIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgICB0YWJJbmRleDogbnVtYmVyIHwgbnVsbDtcbiAgICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKiBXaGV0aGVyIHJpcHBsZXMgb24gdGhlIHRvZ2dsZSBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gICAgZGlzYWJsZVJpcHBsZTogYm9vbGVhbjtcbiAgICAvKiogQ3VzdG9tIGljb24gc2V0IGJ5IHRoZSBjb25zdW1lci4gKi9cbiAgICBfY3VzdG9tSWNvbjogTWF0RGF0ZXBpY2tlclRvZ2dsZUljb247XG4gICAgLyoqIFVuZGVybHlpbmcgYnV0dG9uIGVsZW1lbnQuICovXG4gICAgX2J1dHRvbjogTWF0QnV0dG9uO1xuICAgIGNvbnN0cnVjdG9yKF9pbnRsOiBNYXREYXRlcGlja2VySW50bCwgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgZGVmYXVsdFRhYkluZGV4OiBzdHJpbmcpO1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgX29wZW4oZXZlbnQ6IEV2ZW50KTogdm9pZDtcbiAgICBwcml2YXRlIF93YXRjaFN0YXRlQ2hhbmdlcztcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==