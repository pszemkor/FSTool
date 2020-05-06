/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanDisableRipple, CanDisableRippleCtor, HasTabIndex, HasTabIndexCtor, ThemePalette } from '@angular/material/core';
import * as ɵngcc0 from '@angular/core';
export interface MatRadioDefaultOptions {
    color: ThemePalette;
}
export declare const MAT_RADIO_DEFAULT_OPTIONS: InjectionToken<MatRadioDefaultOptions>;
export declare function MAT_RADIO_DEFAULT_OPTIONS_FACTORY(): MatRadioDefaultOptions;
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export declare const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any;
/** Change event object emitted by MatRadio and MatRadioGroup. */
export declare class MatRadioChange {
    /** The MatRadioButton that emits the change event. */
    source: MatRadioButton;
    /** The value of the MatRadioButton. */
    value: any;
    constructor(
    /** The MatRadioButton that emits the change event. */
    source: MatRadioButton, 
    /** The value of the MatRadioButton. */
    value: any);
}
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
export declare class MatRadioGroup implements AfterContentInit, ControlValueAccessor {
    private _changeDetector;
    /** Selected value for the radio group. */
    private _value;
    /** The HTML name attribute applied to radio buttons in this group. */
    private _name;
    /** The currently selected radio button. Should match value. */
    private _selected;
    /** Whether the `value` has been set to its initial value. */
    private _isInitialized;
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    private _labelPosition;
    /** Whether the radio group is disabled. */
    private _disabled;
    /** Whether the radio group is required. */
    private _required;
    /** The method to be called in order to update ngModel */
    _controlValueAccessorChangeFn: (value: any) => void;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @docs-private
     */
    onTouched: () => any;
    /**
     * Event emitted when the group value changes.
     * Change events are only emitted when the value changes due to user interaction with
     * a radio button (the same behavior as `<input type-"radio">`).
     */
    readonly change: EventEmitter<MatRadioChange>;
    /** Child radio buttons. */
    _radios: QueryList<MatRadioButton>;
    /** Theme color for all of the radio buttons in the group. */
    color: ThemePalette;
    /** Name of the radio button group. All radio buttons inside this group will use this name. */
    get name(): string;
    set name(value: string);
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    get labelPosition(): 'before' | 'after';
    set labelPosition(v: 'before' | 'after');
    /**
     * Value for the radio-group. Should equal the value of the selected radio button if there is
     * a corresponding radio button with a matching value. If there is not such a corresponding
     * radio button, this value persists to be applied in case a new radio button is added with a
     * matching value.
     */
    get value(): any;
    set value(newValue: any);
    _checkSelectedRadioButton(): void;
    /**
     * The currently selected radio button. If set to a new radio button, the radio group value
     * will be updated to match the new selected button.
     */
    get selected(): MatRadioButton | null;
    set selected(selected: MatRadioButton | null);
    /** Whether the radio group is disabled */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Whether the radio group is required */
    get required(): boolean;
    set required(value: boolean);
    constructor(_changeDetector: ChangeDetectorRef);
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    ngAfterContentInit(): void;
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    _touch(): void;
    private _updateRadioButtonNames;
    /** Updates the `selected` radio button from the internal _value state. */
    private _updateSelectedRadioFromValue;
    /** Dispatch change event with current selection and group value. */
    _emitChangeEvent(): void;
    _markRadiosForCheck(): void;
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    writeValue(value: any): void;
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    setDisabledState(isDisabled: boolean): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatRadioGroup, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatRadioGroup, "mat-radio-group", ["matRadioGroup"], { "name": "name"; "labelPosition": "labelPosition"; "value": "value"; "selected": "selected"; "disabled": "disabled"; "required": "required"; "color": "color"; }, { "change": "change"; }, ["_radios"]>;
}
/** @docs-private */
declare class MatRadioButtonBase {
    _elementRef: ElementRef;
    disabled: boolean;
    constructor(_elementRef: ElementRef);
}
declare const _MatRadioButtonMixinBase: CanDisableRippleCtor & HasTabIndexCtor & typeof MatRadioButtonBase;
/**
 * Base class with all of the `MatRadioButton` functionality.
 * @docs-private
 */
export declare abstract class _MatRadioButtonBase extends _MatRadioButtonMixinBase implements OnInit, AfterViewInit, OnDestroy, CanDisableRipple, HasTabIndex {
    protected _changeDetector: ChangeDetectorRef;
    private _focusMonitor;
    private _radioDispatcher;
    _animationMode?: string | undefined;
    private _providerOverride?;
    private _uniqueId;
    /** The unique ID for the radio button. */
    id: string;
    /** Analog to HTML 'name' attribute used to group radios for unique selection. */
    name: string;
    /** Used to set the 'aria-label' attribute on the underlying input element. */
    ariaLabel: string;
    /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
    ariaLabelledby: string;
    /** The 'aria-describedby' attribute is read after the element's label and field type. */
    ariaDescribedby: string;
    /** Whether this radio button is checked. */
    get checked(): boolean;
    set checked(value: boolean);
    /** The value of this radio button. */
    get value(): any;
    set value(value: any);
    /** Whether the label should appear after or before the radio button. Defaults to 'after' */
    get labelPosition(): 'before' | 'after';
    set labelPosition(value: 'before' | 'after');
    private _labelPosition;
    /** Whether the radio button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Whether the radio button is required. */
    get required(): boolean;
    set required(value: boolean);
    /** Theme color of the radio button. */
    get color(): ThemePalette;
    set color(newValue: ThemePalette);
    private _color;
    /**
     * Event emitted when the checked state of this radio button changes.
     * Change events are only emitted when the value changes due to user interaction with
     * the radio button (the same behavior as `<input type-"radio">`).
     */
    readonly change: EventEmitter<MatRadioChange>;
    /** The parent radio group. May or may not be present. */
    radioGroup: MatRadioGroup;
    /** ID of the native input element inside `<mat-radio-button>` */
    get inputId(): string;
    /** Whether this radio is checked. */
    private _checked;
    /** Whether this radio is disabled. */
    private _disabled;
    /** Whether this radio is required. */
    private _required;
    /** Value assigned to this radio. */
    private _value;
    /** Unregister function for _radioDispatcher */
    private _removeUniqueSelectionListener;
    /** The native `<input type=radio>` element */
    _inputElement: ElementRef<HTMLInputElement>;
    constructor(radioGroup: MatRadioGroup, elementRef: ElementRef, _changeDetector: ChangeDetectorRef, _focusMonitor: FocusMonitor, _radioDispatcher: UniqueSelectionDispatcher, _animationMode?: string | undefined, _providerOverride?: MatRadioDefaultOptions | undefined);
    /** Focuses the radio button. */
    focus(options?: FocusOptions): void;
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    _markForCheck(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Dispatch change event with current value. */
    private _emitChangeEvent;
    _isRippleDisabled(): boolean;
    _onInputClick(event: Event): void;
    /**
     * Triggered when the radio button received a click or the input recognized any change.
     * Clicking on a label element, will trigger a change event on the associated input.
     */
    _onInputChange(event: Event): void;
    /** Sets the disabled state and marks for check if a change occurred. */
    protected _setDisabled(value: boolean): void;
    static ngAcceptInputType_checked: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<_MatRadioButtonBase, [{ optional: true; }, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<_MatRadioButtonBase, never, never, { "id": "id"; "checked": "checked"; "value": "value"; "labelPosition": "labelPosition"; "disabled": "disabled"; "required": "required"; "color": "color"; "name": "name"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "ariaDescribedby": "aria-describedby"; }, { "change": "change"; }, never>;
}
/**
 * A Material design radio-button. Typically placed inside of `<mat-radio-group>` elements.
 */
export declare class MatRadioButton extends _MatRadioButtonBase {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatRadioButton, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatRadioButton, "mat-radio-button", ["matRadioButton"], { "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; }, {}, never, ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uZC50cyIsInNvdXJjZXMiOlsicmFkaW8uZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0aW9uVG9rZW4sIE9uRGVzdHJveSwgT25Jbml0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZVJpcHBsZSwgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBNYXRSYWRpb0RlZmF1bHRPcHRpb25zIHtcbiAgICBjb2xvcjogVGhlbWVQYWxldHRlO1xufVxuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OUzogSW5qZWN0aW9uVG9rZW48TWF0UmFkaW9EZWZhdWx0T3B0aW9ucz47XG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlkoKTogTWF0UmFkaW9EZWZhdWx0T3B0aW9ucztcbi8qKlxuICogUHJvdmlkZXIgRXhwcmVzc2lvbiB0aGF0IGFsbG93cyBtYXQtcmFkaW8tZ3JvdXAgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci4gVGhpc1xuICogYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0gYW5kIG5nQ29udHJvbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX1JBRElPX0dST1VQX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueTtcbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWF0UmFkaW8gYW5kIE1hdFJhZGlvR3JvdXAuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRSYWRpb0NoYW5nZSB7XG4gICAgLyoqIFRoZSBNYXRSYWRpb0J1dHRvbiB0aGF0IGVtaXRzIHRoZSBjaGFuZ2UgZXZlbnQuICovXG4gICAgc291cmNlOiBNYXRSYWRpb0J1dHRvbjtcbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBNYXRSYWRpb0J1dHRvbi4gKi9cbiAgICB2YWx1ZTogYW55O1xuICAgIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBUaGUgTWF0UmFkaW9CdXR0b24gdGhhdCBlbWl0cyB0aGUgY2hhbmdlIGV2ZW50LiAqL1xuICAgIHNvdXJjZTogTWF0UmFkaW9CdXR0b24sIFxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIE1hdFJhZGlvQnV0dG9uLiAqL1xuICAgIHZhbHVlOiBhbnkpO1xufVxuLyoqXG4gKiBBIGdyb3VwIG9mIHJhZGlvIGJ1dHRvbnMuIE1heSBjb250YWluIG9uZSBvciBtb3JlIGA8bWF0LXJhZGlvLWJ1dHRvbj5gIGVsZW1lbnRzLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRSYWRpb0dyb3VwIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yO1xuICAgIC8qKiBTZWxlY3RlZCB2YWx1ZSBmb3IgdGhlIHJhZGlvIGdyb3VwLiAqL1xuICAgIHByaXZhdGUgX3ZhbHVlO1xuICAgIC8qKiBUaGUgSFRNTCBuYW1lIGF0dHJpYnV0ZSBhcHBsaWVkIHRvIHJhZGlvIGJ1dHRvbnMgaW4gdGhpcyBncm91cC4gKi9cbiAgICBwcml2YXRlIF9uYW1lO1xuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIHJhZGlvIGJ1dHRvbi4gU2hvdWxkIG1hdGNoIHZhbHVlLiAqL1xuICAgIHByaXZhdGUgX3NlbGVjdGVkO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBgdmFsdWVgIGhhcyBiZWVuIHNldCB0byBpdHMgaW5pdGlhbCB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIF9pc0luaXRpYWxpemVkO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbHMgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHJhZGlvLWJ1dHRvbnMuIERlZmF1bHRzIHRvICdhZnRlcicgKi9cbiAgICBwcml2YXRlIF9sYWJlbFBvc2l0aW9uO1xuICAgIC8qKiBXaGV0aGVyIHRoZSByYWRpbyBncm91cCBpcyBkaXNhYmxlZC4gKi9cbiAgICBwcml2YXRlIF9kaXNhYmxlZDtcbiAgICAvKiogV2hldGhlciB0aGUgcmFkaW8gZ3JvdXAgaXMgcmVxdWlyZWQuICovXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ7XG4gICAgLyoqIFRoZSBtZXRob2QgdG8gYmUgY2FsbGVkIGluIG9yZGVyIHRvIHVwZGF0ZSBuZ01vZGVsICovXG4gICAgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICAgIC8qKlxuICAgICAqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uVG91Y2hlZDogKCkgPT4gYW55O1xuICAgIC8qKlxuICAgICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAgdmFsdWUgY2hhbmdlcy5cbiAgICAgKiBDaGFuZ2UgZXZlbnRzIGFyZSBvbmx5IGVtaXR0ZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyBkdWUgdG8gdXNlciBpbnRlcmFjdGlvbiB3aXRoXG4gICAgICogYSByYWRpbyBidXR0b24gKHRoZSBzYW1lIGJlaGF2aW9yIGFzIGA8aW5wdXQgdHlwZS1cInJhZGlvXCI+YCkuXG4gICAgICovXG4gICAgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0UmFkaW9DaGFuZ2U+O1xuICAgIC8qKiBDaGlsZCByYWRpbyBidXR0b25zLiAqL1xuICAgIF9yYWRpb3M6IFF1ZXJ5TGlzdDxNYXRSYWRpb0J1dHRvbj47XG4gICAgLyoqIFRoZW1lIGNvbG9yIGZvciBhbGwgb2YgdGhlIHJhZGlvIGJ1dHRvbnMgaW4gdGhlIGdyb3VwLiAqL1xuICAgIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG4gICAgLyoqIE5hbWUgb2YgdGhlIHJhZGlvIGJ1dHRvbiBncm91cC4gQWxsIHJhZGlvIGJ1dHRvbnMgaW5zaWRlIHRoaXMgZ3JvdXAgd2lsbCB1c2UgdGhpcyBuYW1lLiAqL1xuICAgIGdldCBuYW1lKCk6IHN0cmluZztcbiAgICBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKTtcbiAgICAvKiogV2hldGhlciB0aGUgbGFiZWxzIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSByYWRpby1idXR0b25zLiBEZWZhdWx0cyB0byAnYWZ0ZXInICovXG4gICAgZ2V0IGxhYmVsUG9zaXRpb24oKTogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuICAgIHNldCBsYWJlbFBvc2l0aW9uKHY6ICdiZWZvcmUnIHwgJ2FmdGVyJyk7XG4gICAgLyoqXG4gICAgICogVmFsdWUgZm9yIHRoZSByYWRpby1ncm91cC4gU2hvdWxkIGVxdWFsIHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgcmFkaW8gYnV0dG9uIGlmIHRoZXJlIGlzXG4gICAgICogYSBjb3JyZXNwb25kaW5nIHJhZGlvIGJ1dHRvbiB3aXRoIGEgbWF0Y2hpbmcgdmFsdWUuIElmIHRoZXJlIGlzIG5vdCBzdWNoIGEgY29ycmVzcG9uZGluZ1xuICAgICAqIHJhZGlvIGJ1dHRvbiwgdGhpcyB2YWx1ZSBwZXJzaXN0cyB0byBiZSBhcHBsaWVkIGluIGNhc2UgYSBuZXcgcmFkaW8gYnV0dG9uIGlzIGFkZGVkIHdpdGggYVxuICAgICAqIG1hdGNoaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpOiBhbnk7XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpO1xuICAgIF9jaGVja1NlbGVjdGVkUmFkaW9CdXR0b24oKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIHJhZGlvIGJ1dHRvbi4gSWYgc2V0IHRvIGEgbmV3IHJhZGlvIGJ1dHRvbiwgdGhlIHJhZGlvIGdyb3VwIHZhbHVlXG4gICAgICogd2lsbCBiZSB1cGRhdGVkIHRvIG1hdGNoIHRoZSBuZXcgc2VsZWN0ZWQgYnV0dG9uLlxuICAgICAqL1xuICAgIGdldCBzZWxlY3RlZCgpOiBNYXRSYWRpb0J1dHRvbiB8IG51bGw7XG4gICAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBNYXRSYWRpb0J1dHRvbiB8IG51bGwpO1xuICAgIC8qKiBXaGV0aGVyIHRoZSByYWRpbyBncm91cCBpcyBkaXNhYmxlZCAqL1xuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuO1xuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbik7XG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGdyb3VwIGlzIHJlcXVpcmVkICovXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW47XG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKTtcbiAgICBjb25zdHJ1Y3RvcihfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHByb3BlcnRpZXMgb25jZSBjb250ZW50IGNoaWxkcmVuIGFyZSBhdmFpbGFibGUuXG4gICAgICogVGhpcyBhbGxvd3MgdXMgdG8gcHJvcGFnYXRlIHJlbGV2YW50IGF0dHJpYnV0ZXMgdG8gYXNzb2NpYXRlZCBidXR0b25zLlxuICAgICAqL1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIE1hcmsgdGhpcyBncm91cCBhcyBiZWluZyBcInRvdWNoZWRcIiAoZm9yIG5nTW9kZWwpLiBNZWFudCB0byBiZSBjYWxsZWQgYnkgdGhlIGNvbnRhaW5lZFxuICAgICAqIHJhZGlvIGJ1dHRvbnMgdXBvbiB0aGVpciBibHVyLlxuICAgICAqL1xuICAgIF90b3VjaCgpOiB2b2lkO1xuICAgIHByaXZhdGUgX3VwZGF0ZVJhZGlvQnV0dG9uTmFtZXM7XG4gICAgLyoqIFVwZGF0ZXMgdGhlIGBzZWxlY3RlZGAgcmFkaW8gYnV0dG9uIGZyb20gdGhlIGludGVybmFsIF92YWx1ZSBzdGF0ZS4gKi9cbiAgICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZFJhZGlvRnJvbVZhbHVlO1xuICAgIC8qKiBEaXNwYXRjaCBjaGFuZ2UgZXZlbnQgd2l0aCBjdXJyZW50IHNlbGVjdGlvbiBhbmQgZ3JvdXAgdmFsdWUuICovXG4gICAgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkO1xuICAgIF9tYXJrUmFkaW9zRm9yQ2hlY2soKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBtb2RlbCB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb250cm9sIGlzIHRvdWNoZWQuXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgY29udHJvbC4gSW1wbGVtZW50ZWQgYXMgYSBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSBpc0Rpc2FibGVkIFdoZXRoZXIgdGhlIGNvbnRyb2wgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlcXVpcmVkOiBCb29sZWFuSW5wdXQ7XG59XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZGVjbGFyZSBjbGFzcyBNYXRSYWRpb0J1dHRvbkJhc2Uge1xuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIGRpc2FibGVkOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKTtcbn1cbmRlY2xhcmUgY29uc3QgX01hdFJhZGlvQnV0dG9uTWl4aW5CYXNlOiBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIHR5cGVvZiBNYXRSYWRpb0J1dHRvbkJhc2U7XG4vKipcbiAqIEJhc2UgY2xhc3Mgd2l0aCBhbGwgb2YgdGhlIGBNYXRSYWRpb0J1dHRvbmAgZnVuY3Rpb25hbGl0eS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgYWJzdHJhY3QgY2xhc3MgX01hdFJhZGlvQnV0dG9uQmFzZSBleHRlbmRzIF9NYXRSYWRpb0J1dHRvbk1peGluQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDYW5EaXNhYmxlUmlwcGxlLCBIYXNUYWJJbmRleCB7XG4gICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yO1xuICAgIHByaXZhdGUgX3JhZGlvRGlzcGF0Y2hlcjtcbiAgICBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9wcm92aWRlck92ZXJyaWRlPztcbiAgICBwcml2YXRlIF91bmlxdWVJZDtcbiAgICAvKiogVGhlIHVuaXF1ZSBJRCBmb3IgdGhlIHJhZGlvIGJ1dHRvbi4gKi9cbiAgICBpZDogc3RyaW5nO1xuICAgIC8qKiBBbmFsb2cgdG8gSFRNTCAnbmFtZScgYXR0cmlidXRlIHVzZWQgdG8gZ3JvdXAgcmFkaW9zIGZvciB1bmlxdWUgc2VsZWN0aW9uLiAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKiogVXNlZCB0byBzZXQgdGhlICdhcmlhLWxhYmVsJyBhdHRyaWJ1dGUgb24gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudC4gKi9cbiAgICBhcmlhTGFiZWw6IHN0cmluZztcbiAgICAvKiogVGhlICdhcmlhLWxhYmVsbGVkYnknIGF0dHJpYnV0ZSB0YWtlcyBwcmVjZWRlbmNlIGFzIHRoZSBlbGVtZW50J3MgdGV4dCBhbHRlcm5hdGl2ZS4gKi9cbiAgICBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuICAgIC8qKiBUaGUgJ2FyaWEtZGVzY3JpYmVkYnknIGF0dHJpYnV0ZSBpcyByZWFkIGFmdGVyIHRoZSBlbGVtZW50J3MgbGFiZWwgYW5kIGZpZWxkIHR5cGUuICovXG4gICAgYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG4gICAgLyoqIFdoZXRoZXIgdGhpcyByYWRpbyBidXR0b24gaXMgY2hlY2tlZC4gKi9cbiAgICBnZXQgY2hlY2tlZCgpOiBib29sZWFuO1xuICAgIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKTtcbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoaXMgcmFkaW8gYnV0dG9uLiAqL1xuICAgIGdldCB2YWx1ZSgpOiBhbnk7XG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgcmFkaW8gYnV0dG9uLiBEZWZhdWx0cyB0byAnYWZ0ZXInICovXG4gICAgZ2V0IGxhYmVsUG9zaXRpb24oKTogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuICAgIHNldCBsYWJlbFBvc2l0aW9uKHZhbHVlOiAnYmVmb3JlJyB8ICdhZnRlcicpO1xuICAgIHByaXZhdGUgX2xhYmVsUG9zaXRpb247XG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIC8qKiBXaGV0aGVyIHRoZSByYWRpbyBidXR0b24gaXMgcmVxdWlyZWQuICovXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW47XG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKTtcbiAgICAvKiogVGhlbWUgY29sb3Igb2YgdGhlIHJhZGlvIGJ1dHRvbi4gKi9cbiAgICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlO1xuICAgIHNldCBjb2xvcihuZXdWYWx1ZTogVGhlbWVQYWxldHRlKTtcbiAgICBwcml2YXRlIF9jb2xvcjtcbiAgICAvKipcbiAgICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhpcyByYWRpbyBidXR0b24gY2hhbmdlcy5cbiAgICAgKiBDaGFuZ2UgZXZlbnRzIGFyZSBvbmx5IGVtaXR0ZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyBkdWUgdG8gdXNlciBpbnRlcmFjdGlvbiB3aXRoXG4gICAgICogdGhlIHJhZGlvIGJ1dHRvbiAodGhlIHNhbWUgYmVoYXZpb3IgYXMgYDxpbnB1dCB0eXBlLVwicmFkaW9cIj5gKS5cbiAgICAgKi9cbiAgICByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRSYWRpb0NoYW5nZT47XG4gICAgLyoqIFRoZSBwYXJlbnQgcmFkaW8gZ3JvdXAuIE1heSBvciBtYXkgbm90IGJlIHByZXNlbnQuICovXG4gICAgcmFkaW9Hcm91cDogTWF0UmFkaW9Hcm91cDtcbiAgICAvKiogSUQgb2YgdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1yYWRpby1idXR0b24+YCAqL1xuICAgIGdldCBpbnB1dElkKCk6IHN0cmluZztcbiAgICAvKiogV2hldGhlciB0aGlzIHJhZGlvIGlzIGNoZWNrZWQuICovXG4gICAgcHJpdmF0ZSBfY2hlY2tlZDtcbiAgICAvKiogV2hldGhlciB0aGlzIHJhZGlvIGlzIGRpc2FibGVkLiAqL1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gaXMgcmVxdWlyZWQuICovXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ7XG4gICAgLyoqIFZhbHVlIGFzc2lnbmVkIHRvIHRoaXMgcmFkaW8uICovXG4gICAgcHJpdmF0ZSBfdmFsdWU7XG4gICAgLyoqIFVucmVnaXN0ZXIgZnVuY3Rpb24gZm9yIF9yYWRpb0Rpc3BhdGNoZXIgKi9cbiAgICBwcml2YXRlIF9yZW1vdmVVbmlxdWVTZWxlY3Rpb25MaXN0ZW5lcjtcbiAgICAvKiogVGhlIG5hdGl2ZSBgPGlucHV0IHR5cGU9cmFkaW8+YCBlbGVtZW50ICovXG4gICAgX2lucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgICBjb25zdHJ1Y3RvcihyYWRpb0dyb3VwOiBNYXRSYWRpb0dyb3VwLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIF9yYWRpb0Rpc3BhdGNoZXI6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nIHwgdW5kZWZpbmVkLCBfcHJvdmlkZXJPdmVycmlkZT86IE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMgfCB1bmRlZmluZWQpO1xuICAgIC8qKiBGb2N1c2VzIHRoZSByYWRpbyBidXR0b24uICovXG4gICAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogTWFya3MgdGhlIHJhZGlvIGJ1dHRvbiBhcyBuZWVkaW5nIGNoZWNraW5nIGZvciBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgYmVjYXVzZSB0aGUgcGFyZW50IHJhZGlvIGdyb3VwIHdpbGwgZGlyZWN0bHlcbiAgICAgKiB1cGRhdGUgYm91bmQgcHJvcGVydGllcyBvZiB0aGUgcmFkaW8gYnV0dG9uLlxuICAgICAqL1xuICAgIF9tYXJrRm9yQ2hlY2soKTogdm9pZDtcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgdmFsdWUuICovXG4gICAgcHJpdmF0ZSBfZW1pdENoYW5nZUV2ZW50O1xuICAgIF9pc1JpcHBsZURpc2FibGVkKCk6IGJvb2xlYW47XG4gICAgX29uSW5wdXRDbGljayhldmVudDogRXZlbnQpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCB3aGVuIHRoZSByYWRpbyBidXR0b24gcmVjZWl2ZWQgYSBjbGljayBvciB0aGUgaW5wdXQgcmVjb2duaXplZCBhbnkgY2hhbmdlLlxuICAgICAqIENsaWNraW5nIG9uIGEgbGFiZWwgZWxlbWVudCwgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50IG9uIHRoZSBhc3NvY2lhdGVkIGlucHV0LlxuICAgICAqL1xuICAgIF9vbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQ7XG4gICAgLyoqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIGFuZCBtYXJrcyBmb3IgY2hlY2sgaWYgYSBjaGFuZ2Ugb2NjdXJyZWQuICovXG4gICAgcHJvdGVjdGVkIF9zZXREaXNhYmxlZCh2YWx1ZTogYm9vbGVhbik6IHZvaWQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuLyoqXG4gKiBBIE1hdGVyaWFsIGRlc2lnbiByYWRpby1idXR0b24uIFR5cGljYWxseSBwbGFjZWQgaW5zaWRlIG9mIGA8bWF0LXJhZGlvLWdyb3VwPmAgZWxlbWVudHMuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFJhZGlvQnV0dG9uIGV4dGVuZHMgX01hdFJhZGlvQnV0dG9uQmFzZSB7XG59XG5leHBvcnQge307XG4iXX0=