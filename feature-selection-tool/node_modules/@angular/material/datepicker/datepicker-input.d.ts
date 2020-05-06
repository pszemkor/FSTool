/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { DateAdapter, MatDateFormats, ThemePalette } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepicker } from './datepicker';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_DATEPICKER_VALUE_ACCESSOR: any;
/** @docs-private */
export declare const MAT_DATEPICKER_VALIDATORS: any;
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 */
export declare class MatDatepickerInputEvent<D> {
    /** Reference to the datepicker input component that emitted the event. */
    target: MatDatepickerInput<D>;
    /** Reference to the native input element associated with the datepicker input. */
    targetElement: HTMLElement;
    /** The new value for the target datepicker input. */
    value: D | null;
    constructor(
    /** Reference to the datepicker input component that emitted the event. */
    target: MatDatepickerInput<D>, 
    /** Reference to the native input element associated with the datepicker input. */
    targetElement: HTMLElement);
}
/** Directive used to connect an input to a MatDatepicker. */
export declare class MatDatepickerInput<D> implements ControlValueAccessor, OnDestroy, AfterViewInit, Validator {
    private _elementRef;
    _dateAdapter: DateAdapter<D>;
    private _dateFormats;
    private _formField;
    /** Whether the component has been initialized. */
    private _isInitialized;
    /** The datepicker that this input is associated with. */
    set matDatepicker(value: MatDatepicker<D>);
    _datepicker: MatDatepicker<D>;
    /** Function that can be used to filter out dates within the datepicker. */
    set matDatepickerFilter(value: (date: D | null) => boolean);
    _dateFilter: (date: D | null) => boolean;
    /** The value of the input. */
    get value(): D | null;
    set value(value: D | null);
    private _value;
    /** The minimum valid date. */
    get min(): D | null;
    set min(value: D | null);
    private _min;
    /** The maximum valid date. */
    get max(): D | null;
    set max(value: D | null);
    private _max;
    /** Whether the datepicker-input is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Emits when a `change` event is fired on this `<input>`. */
    readonly dateChange: EventEmitter<MatDatepickerInputEvent<D>>;
    /** Emits when an `input` event is fired on this `<input>`. */
    readonly dateInput: EventEmitter<MatDatepickerInputEvent<D>>;
    /** Emits when the value changes (either due to user input or programmatic change). */
    _valueChange: EventEmitter<D | null>;
    /** Emits when the disabled state has changed */
    _disabledChange: EventEmitter<boolean>;
    _onTouched: () => void;
    private _cvaOnChange;
    private _validatorOnChange;
    private _datepickerSubscription;
    private _localeSubscription;
    /** The form control validator for whether the input parses. */
    private _parseValidator;
    /** The form control validator for the min date. */
    private _minValidator;
    /** The form control validator for the max date. */
    private _maxValidator;
    /** The form control validator for the date filter. */
    private _filterValidator;
    /** The combined form control validator for this input. */
    private _validator;
    /** Whether the last value set on the input was valid. */
    private _lastValueValid;
    constructor(_elementRef: ElementRef<HTMLInputElement>, _dateAdapter: DateAdapter<D>, _dateFormats: MatDateFormats, _formField: MatFormField);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** @docs-private */
    registerOnValidatorChange(fn: () => void): void;
    /** @docs-private */
    validate(c: AbstractControl): ValidationErrors | null;
    /**
     * @deprecated
     * @breaking-change 8.0.0 Use `getConnectedOverlayOrigin` instead
     */
    getPopupConnectionElementRef(): ElementRef;
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    getConnectedOverlayOrigin(): ElementRef;
    writeValue(value: D): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    _onKeydown(event: KeyboardEvent): void;
    _onInput(value: string): void;
    _onChange(): void;
    /** Returns the palette used by the input's form field, if any. */
    _getThemePalette(): ThemePalette;
    /** Handles blur events on the input. */
    _onBlur(): void;
    /** Formats a value and sets it on the input element. */
    private _formatValue;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    static ngAcceptInputType_value: any;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDatepickerInput<any>, [null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatDatepickerInput<any>, "input[matDatepicker]", ["matDatepickerInput"], { "value": "value"; "matDatepicker": "matDatepicker"; "matDatepickerFilter": "matDatepickerFilter"; "min": "min"; "max": "max"; "disabled": "disabled"; }, { "dateChange": "dateChange"; "dateInput": "dateInput"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5kLnRzIiwic291cmNlcyI6WyJkYXRlcGlja2VyLWlucHV0LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTWF0RGF0ZUZvcm1hdHMsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyJztcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9EQVRFUElDS0VSX1ZBTElEQVRPUlM6IGFueTtcbi8qKlxuICogQW4gZXZlbnQgdXNlZCBmb3IgZGF0ZXBpY2tlciBpbnB1dCBhbmQgY2hhbmdlIGV2ZW50cy4gV2UgZG9uJ3QgYWx3YXlzIGhhdmUgYWNjZXNzIHRvIGEgbmF0aXZlXG4gKiBpbnB1dCBvciBjaGFuZ2UgZXZlbnQgYmVjYXVzZSB0aGUgZXZlbnQgbWF5IGhhdmUgYmVlbiB0cmlnZ2VyZWQgYnkgdGhlIHVzZXIgY2xpY2tpbmcgb24gdGhlXG4gKiBjYWxlbmRhciBwb3B1cC4gRm9yIGNvbnNpc3RlbmN5LCB3ZSBhbHdheXMgdXNlIE1hdERhdGVwaWNrZXJJbnB1dEV2ZW50IGluc3RlYWQuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdERhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+IHtcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBkYXRlcGlja2VyIGlucHV0IGNvbXBvbmVudCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHRhcmdldDogTWF0RGF0ZXBpY2tlcklucHV0PEQ+O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGF0ZXBpY2tlciBpbnB1dC4gKi9cbiAgICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAvKiogVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHRhcmdldCBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgIHZhbHVlOiBEIHwgbnVsbDtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBkYXRlcGlja2VyIGlucHV0IGNvbXBvbmVudCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHRhcmdldDogTWF0RGF0ZXBpY2tlcklucHV0PEQ+LCBcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGRhdGVwaWNrZXIgaW5wdXQuICovXG4gICAgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpO1xufVxuLyoqIERpcmVjdGl2ZSB1c2VkIHRvIGNvbm5lY3QgYW4gaW5wdXQgdG8gYSBNYXREYXRlcGlja2VyLiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0RGF0ZXBpY2tlcklucHV0PEQ+IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgVmFsaWRhdG9yIHtcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmO1xuICAgIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD47XG4gICAgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM7XG4gICAgcHJpdmF0ZSBfZm9ybUZpZWxkO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gICAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDtcbiAgICAvKiogVGhlIGRhdGVwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBzZXQgbWF0RGF0ZXBpY2tlcih2YWx1ZTogTWF0RGF0ZXBpY2tlcjxEPik7XG4gICAgX2RhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXI8RD47XG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gZmlsdGVyIG91dCBkYXRlcyB3aXRoaW4gdGhlIGRhdGVwaWNrZXIuICovXG4gICAgc2V0IG1hdERhdGVwaWNrZXJGaWx0ZXIodmFsdWU6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbik7XG4gICAgX2RhdGVGaWx0ZXI6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbjtcbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC4gKi9cbiAgICBnZXQgdmFsdWUoKTogRCB8IG51bGw7XG4gICAgc2V0IHZhbHVlKHZhbHVlOiBEIHwgbnVsbCk7XG4gICAgcHJpdmF0ZSBfdmFsdWU7XG4gICAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXG4gICAgZ2V0IG1pbigpOiBEIHwgbnVsbDtcbiAgICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCk7XG4gICAgcHJpdmF0ZSBfbWluO1xuICAgIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xuICAgIGdldCBtYXgoKTogRCB8IG51bGw7XG4gICAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpO1xuICAgIHByaXZhdGUgX21heDtcbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZXBpY2tlci1pbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKiBFbWl0cyB3aGVuIGEgYGNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgb24gdGhpcyBgPGlucHV0PmAuICovXG4gICAgcmVhZG9ubHkgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdERhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PjtcbiAgICAvKiogRW1pdHMgd2hlbiBhbiBgaW5wdXRgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLiAqL1xuICAgIHJlYWRvbmx5IGRhdGVJbnB1dDogRXZlbnRFbWl0dGVyPE1hdERhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PjtcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyAoZWl0aGVyIGR1ZSB0byB1c2VyIGlucHV0IG9yIHByb2dyYW1tYXRpYyBjaGFuZ2UpLiAqL1xuICAgIF92YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEQgfCBudWxsPjtcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgaGFzIGNoYW5nZWQgKi9cbiAgICBfZGlzYWJsZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgICBfb25Ub3VjaGVkOiAoKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgX2N2YU9uQ2hhbmdlO1xuICAgIHByaXZhdGUgX3ZhbGlkYXRvck9uQ2hhbmdlO1xuICAgIHByaXZhdGUgX2RhdGVwaWNrZXJTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfbG9jYWxlU3Vic2NyaXB0aW9uO1xuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3Igd2hldGhlciB0aGUgaW5wdXQgcGFyc2VzLiAqL1xuICAgIHByaXZhdGUgX3BhcnNlVmFsaWRhdG9yO1xuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1pbiBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21pblZhbGlkYXRvcjtcbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtYXggZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9tYXhWYWxpZGF0b3I7XG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXG4gICAgcHJpdmF0ZSBfZmlsdGVyVmFsaWRhdG9yO1xuICAgIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIF92YWxpZGF0b3I7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhc3QgdmFsdWUgc2V0IG9uIHRoZSBpbnB1dCB3YXMgdmFsaWQuICovXG4gICAgcHJpdmF0ZSBfbGFzdFZhbHVlVmFsaWQ7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsIF9mb3JtRmllbGQ6IE1hdEZvcm1GaWVsZCk7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGw7XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wIFVzZSBgZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbmAgaW5zdGVhZFxuICAgICAqL1xuICAgIGdldFBvcHVwQ29ubmVjdGlvbkVsZW1lbnRSZWYoKTogRWxlbWVudFJlZjtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBlbGVtZW50IHRoYXQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNvbm5lY3RlZCB0by5cbiAgICAgKiBAcmV0dXJuIFRoZSBlbGVtZW50IHRvIGNvbm5lY3QgdGhlIHBvcHVwIHRvLlxuICAgICAqL1xuICAgIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZjtcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBEKTogdm9pZDtcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQ7XG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQ7XG4gICAgX29uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQ7XG4gICAgX29uSW5wdXQodmFsdWU6IHN0cmluZyk6IHZvaWQ7XG4gICAgX29uQ2hhbmdlKCk6IHZvaWQ7XG4gICAgLyoqIFJldHVybnMgdGhlIHBhbGV0dGUgdXNlZCBieSB0aGUgaW5wdXQncyBmb3JtIGZpZWxkLCBpZiBhbnkuICovXG4gICAgX2dldFRoZW1lUGFsZXR0ZSgpOiBUaGVtZVBhbGV0dGU7XG4gICAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIGlucHV0LiAqL1xuICAgIF9vbkJsdXIoKTogdm9pZDtcbiAgICAvKiogRm9ybWF0cyBhIHZhbHVlIGFuZCBzZXRzIGl0IG9uIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICAgIHByaXZhdGUgX2Zvcm1hdFZhbHVlO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92YWx1ZTogYW55O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19