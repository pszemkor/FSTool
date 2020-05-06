/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, EventEmitter, OnChanges } from '@angular/core';
import { MatChipsDefaultOptions } from './chip-default-options';
import { MatChipList } from './chip-list';
import { MatChipTextControl } from './chip-text-control';
/** Represents an input event on a `matChipInput`. */
import * as ɵngcc0 from '@angular/core';
export interface MatChipInputEvent {
    /** The native `<input>` element that the event is being fired for. */
    input: HTMLInputElement;
    /** The value of the input. */
    value: string;
}
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of an `<mat-chip-list>`.
 */
export declare class MatChipInput implements MatChipTextControl, OnChanges {
    protected _elementRef: ElementRef<HTMLInputElement>;
    private _defaultOptions;
    /** Whether the control is focused. */
    focused: boolean;
    _chipList: MatChipList;
    /** Register input for chip list */
    set chipList(value: MatChipList);
    /**
     * Whether or not the chipEnd event will be emitted when the input is blurred.
     */
    get addOnBlur(): boolean;
    set addOnBlur(value: boolean);
    _addOnBlur: boolean;
    /**
     * The list of key codes that will trigger a chipEnd event.
     *
     * Defaults to `[ENTER]`.
     */
    separatorKeyCodes: number[] | Set<number>;
    /** Emitted when a chip is to be added. */
    chipEnd: EventEmitter<MatChipInputEvent>;
    /** The input's placeholder text. */
    placeholder: string;
    /** Unique id for the input. */
    id: string;
    /** Whether the input is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Whether the input is empty. */
    get empty(): boolean;
    /** The native input element to which this directive is attached. */
    protected _inputElement: HTMLInputElement;
    constructor(_elementRef: ElementRef<HTMLInputElement>, _defaultOptions: MatChipsDefaultOptions);
    ngOnChanges(): void;
    /** Utility method to make host definition/tests more clear. */
    _keydown(event?: KeyboardEvent): void;
    /** Checks to see if the blur should emit the (chipEnd) event. */
    _blur(): void;
    _focus(): void;
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    _emitChipEnd(event?: KeyboardEvent): void;
    _onInput(): void;
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    /** Checks whether a keycode is one of the configured separators. */
    private _isSeparatorKey;
    static ngAcceptInputType_addOnBlur: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatChipInput, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatChipInput, "input[matChipInputFor]", ["matChipInput", "matChipInputFor"], { "separatorKeyCodes": "matChipInputSeparatorKeyCodes"; "placeholder": "placeholder"; "id": "id"; "chipList": "matChipInputFor"; "addOnBlur": "matChipInputAddOnBlur"; "disabled": "disabled"; }, { "chipEnd": "matChipInputTokenEnd"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC5kLnRzIiwic291cmNlcyI6WyJjaGlwLWlucHV0LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRDaGlwc0RlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9jaGlwLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXRDaGlwTGlzdCB9IGZyb20gJy4vY2hpcC1saXN0JztcbmltcG9ydCB7IE1hdENoaXBUZXh0Q29udHJvbCB9IGZyb20gJy4vY2hpcC10ZXh0LWNvbnRyb2wnO1xuLyoqIFJlcHJlc2VudHMgYW4gaW5wdXQgZXZlbnQgb24gYSBgbWF0Q2hpcElucHV0YC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2hpcElucHV0RXZlbnQge1xuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC4gKi9cbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBhZGRzIGNoaXAtc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWF0LWZvcm0tZmllbGQ+YC5cbiAqIE1heSBiZSBwbGFjZWQgaW5zaWRlIG9yIG91dHNpZGUgb2YgYW4gYDxtYXQtY2hpcC1saXN0PmAuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENoaXBJbnB1dCBpbXBsZW1lbnRzIE1hdENoaXBUZXh0Q29udHJvbCwgT25DaGFuZ2VzIHtcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG4gICAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZm9jdXNlZC4gKi9cbiAgICBmb2N1c2VkOiBib29sZWFuO1xuICAgIF9jaGlwTGlzdDogTWF0Q2hpcExpc3Q7XG4gICAgLyoqIFJlZ2lzdGVyIGlucHV0IGZvciBjaGlwIGxpc3QgKi9cbiAgICBzZXQgY2hpcExpc3QodmFsdWU6IE1hdENoaXBMaXN0KTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcEVuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICAgKi9cbiAgICBnZXQgYWRkT25CbHVyKCk6IGJvb2xlYW47XG4gICAgc2V0IGFkZE9uQmx1cih2YWx1ZTogYm9vbGVhbik7XG4gICAgX2FkZE9uQmx1cjogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgbGlzdCBvZiBrZXkgY29kZXMgdGhhdCB3aWxsIHRyaWdnZXIgYSBjaGlwRW5kIGV2ZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYFtFTlRFUl1gLlxuICAgICAqL1xuICAgIHNlcGFyYXRvcktleUNvZGVzOiBudW1iZXJbXSB8IFNldDxudW1iZXI+O1xuICAgIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIGFkZGVkLiAqL1xuICAgIGNoaXBFbmQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwSW5wdXRFdmVudD47XG4gICAgLyoqIFRoZSBpbnB1dCdzIHBsYWNlaG9sZGVyIHRleHQuICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGUgaW5wdXQuICovXG4gICAgaWQ6IHN0cmluZztcbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW47XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKTtcbiAgICBwcml2YXRlIF9kaXNhYmxlZDtcbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW47XG4gICAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgICBwcm90ZWN0ZWQgX2lucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PiwgX2RlZmF1bHRPcHRpb25zOiBNYXRDaGlwc0RlZmF1bHRPcHRpb25zKTtcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkO1xuICAgIC8qKiBVdGlsaXR5IG1ldGhvZCB0byBtYWtlIGhvc3QgZGVmaW5pdGlvbi90ZXN0cyBtb3JlIGNsZWFyLiAqL1xuICAgIF9rZXlkb3duKGV2ZW50PzogS2V5Ym9hcmRFdmVudCk6IHZvaWQ7XG4gICAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIGJsdXIgc2hvdWxkIGVtaXQgdGhlIChjaGlwRW5kKSBldmVudC4gKi9cbiAgICBfYmx1cigpOiB2b2lkO1xuICAgIF9mb2N1cygpOiB2b2lkO1xuICAgIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSAoY2hpcEVuZCkgZXZlbnQgbmVlZHMgdG8gYmUgZW1pdHRlZC4gKi9cbiAgICBfZW1pdENoaXBFbmQoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KTogdm9pZDtcbiAgICBfb25JbnB1dCgpOiB2b2lkO1xuICAgIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZDtcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYSBrZXljb2RlIGlzIG9uZSBvZiB0aGUgY29uZmlndXJlZCBzZXBhcmF0b3JzLiAqL1xuICAgIHByaXZhdGUgX2lzU2VwYXJhdG9yS2V5O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hZGRPbkJsdXI6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==