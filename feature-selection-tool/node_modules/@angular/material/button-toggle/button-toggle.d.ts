/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList, InjectionToken } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanDisableRipple, CanDisableRippleCtor } from '@angular/material/core';
/** Acceptable types for a button toggle. */
import * as ɵngcc0 from '@angular/core';
export declare type ToggleType = 'checkbox' | 'radio';
/** Possible appearance styles for the button toggle. */
export declare type MatButtonToggleAppearance = 'legacy' | 'standard';
/**
 * Represents the default options for the button toggle that can be configured
 * using the `MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS` injection token.
 */
export interface MatButtonToggleDefaultOptions {
    appearance?: MatButtonToggleAppearance;
}
/**
 * Injection token that can be used to configure the
 * default options for all button toggles within an app.
 */
export declare const MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS: InjectionToken<MatButtonToggleDefaultOptions>;
/**
 * Provider Expression that allows mat-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export declare const MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any;
/**
 * @deprecated Use `MatButtonToggleGroup` instead.
 * @breaking-change 8.0.0
 */
export declare class MatButtonToggleGroupMultiple {
}
/** Change event object emitted by MatButtonToggle. */
export declare class MatButtonToggleChange {
    /** The MatButtonToggle that emits the event. */
    source: MatButtonToggle;
    /** The value assigned to the MatButtonToggle. */
    value: any;
    constructor(
    /** The MatButtonToggle that emits the event. */
    source: MatButtonToggle, 
    /** The value assigned to the MatButtonToggle. */
    value: any);
}
/** Exclusive selection button toggle group that behaves like a radio-button group. */
export declare class MatButtonToggleGroup implements ControlValueAccessor, OnInit, AfterContentInit {
    private _changeDetector;
    private _vertical;
    private _multiple;
    private _disabled;
    private _selectionModel;
    /**
     * Reference to the raw value that the consumer tried to assign. The real
     * value will exclude any values from this one that don't correspond to a
     * toggle. Useful for the cases where the value is assigned before the toggles
     * have been initialized or at the same that they're being swapped out.
     */
    private _rawValue;
    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    _controlValueAccessorChangeFn: (value: any) => void;
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    _onTouched: () => any;
    /** Child button toggle buttons. */
    _buttonToggles: QueryList<MatButtonToggle>;
    /** The appearance for all the buttons in the group. */
    appearance: MatButtonToggleAppearance;
    /** `name` attribute for the underlying `input` element. */
    get name(): string;
    set name(value: string);
    private _name;
    /** Whether the toggle group is vertical. */
    get vertical(): boolean;
    set vertical(value: boolean);
    /** Value of the toggle group. */
    get value(): any;
    set value(newValue: any);
    /**
     * Event that emits whenever the value of the group changes.
     * Used to facilitate two-way data binding.
     * @docs-private
     */
    readonly valueChange: EventEmitter<any>;
    /** Selected button toggles in the group. */
    get selected(): MatButtonToggle | MatButtonToggle[];
    /** Whether multiple button toggles can be selected. */
    get multiple(): boolean;
    set multiple(value: boolean);
    /** Whether multiple button toggle group is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Event emitted when the group's value changes. */
    readonly change: EventEmitter<MatButtonToggleChange>;
    constructor(_changeDetector: ChangeDetectorRef, defaultOptions?: MatButtonToggleDefaultOptions);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    /** Dispatch change event with current selection and group value. */
    _emitChangeEvent(): void;
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param toggle Toggle to be synced.
     * @param select Whether the toggle should be selected.
     * @param isUserInput Whether the change was a result of a user interaction.
     * @param deferEvents Whether to defer emitting the change events.
     */
    _syncButtonToggle(toggle: MatButtonToggle, select: boolean, isUserInput?: boolean, deferEvents?: boolean): void;
    /** Checks whether a button toggle is selected. */
    _isSelected(toggle: MatButtonToggle): boolean;
    /** Determines whether a button toggle should be checked on init. */
    _isPrechecked(toggle: MatButtonToggle): boolean;
    /** Updates the selection state of the toggles in the group based on a value. */
    private _setSelectionByValue;
    /** Clears the selected toggles. */
    private _clearSelection;
    /** Selects a value if there's a toggle that corresponds to it. */
    private _selectValue;
    /** Syncs up the group's value with the model and emits the change event. */
    private _updateModelValue;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_multiple: BooleanInput;
    static ngAcceptInputType_vertical: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatButtonToggleGroup, [null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatButtonToggleGroup, "mat-button-toggle-group", ["matButtonToggleGroup"], { "appearance": "appearance"; "name": "name"; "vertical": "vertical"; "value": "value"; "multiple": "multiple"; "disabled": "disabled"; }, { "valueChange": "valueChange"; "change": "change"; }, ["_buttonToggles"]>;
}
/** @docs-private */
declare class MatButtonToggleBase {
}
declare const _MatButtonToggleMixinBase: CanDisableRippleCtor & typeof MatButtonToggleBase;
/** Single button inside of a toggle group. */
export declare class MatButtonToggle extends _MatButtonToggleMixinBase implements OnInit, CanDisableRipple, OnDestroy {
    private _changeDetectorRef;
    private _elementRef;
    private _focusMonitor;
    private _isSingleSelector;
    private _checked;
    /**
     * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
     * take precedence so this may be omitted.
     */
    ariaLabel: string;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    ariaLabelledby: string | null;
    /** Type of the button toggle. Either 'radio' or 'checkbox'. */
    _type: ToggleType;
    _buttonElement: ElementRef<HTMLButtonElement>;
    /** The parent button toggle group (exclusive selection). Optional. */
    buttonToggleGroup: MatButtonToggleGroup;
    /** Unique ID for the underlying `button` element. */
    get buttonId(): string;
    /** The unique ID for this button toggle. */
    id: string;
    /** HTML's 'name' attribute used to group radios for unique selection. */
    name: string;
    /** MatButtonToggleGroup reads this to assign its own value. */
    value: any;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** The appearance style of the button. */
    get appearance(): MatButtonToggleAppearance;
    set appearance(value: MatButtonToggleAppearance);
    private _appearance;
    /** Whether the button is checked. */
    get checked(): boolean;
    set checked(value: boolean);
    /** Whether the button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Event emitted when the group value changes. */
    readonly change: EventEmitter<MatButtonToggleChange>;
    constructor(toggleGroup: MatButtonToggleGroup, _changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef<HTMLElement>, _focusMonitor: FocusMonitor, defaultTabIndex: string, defaultOptions?: MatButtonToggleDefaultOptions);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Focuses the button. */
    focus(options?: FocusOptions): void;
    /** Checks the button toggle due to an interaction with the underlying native button. */
    _onButtonClick(): void;
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     */
    _markForCheck(): void;
    static ngAcceptInputType_checked: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_vertical: BooleanInput;
    static ngAcceptInputType_multiple: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatButtonToggle, [{ optional: true; }, null, null, null, { attribute: "tabindex"; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatButtonToggle, "mat-button-toggle", ["matButtonToggle"], { "disableRipple": "disableRipple"; "ariaLabelledby": "aria-labelledby"; "tabIndex": "tabIndex"; "appearance": "appearance"; "checked": "checked"; "disabled": "disabled"; "id": "id"; "name": "name"; "ariaLabel": "aria-label"; "value": "value"; }, { "change": "change"; }, never, ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXRvZ2dsZS5kLnRzIiwic291cmNlcyI6WyJidXR0b24tdG9nZ2xlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0LCBRdWVyeUxpc3QsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENhbkRpc2FibGVSaXBwbGUsIENhbkRpc2FibGVSaXBwbGVDdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG4vKiogQWNjZXB0YWJsZSB0eXBlcyBmb3IgYSBidXR0b24gdG9nZ2xlLiAqL1xuZXhwb3J0IGRlY2xhcmUgdHlwZSBUb2dnbGVUeXBlID0gJ2NoZWNrYm94JyB8ICdyYWRpbyc7XG4vKiogUG9zc2libGUgYXBwZWFyYW5jZSBzdHlsZXMgZm9yIHRoZSBidXR0b24gdG9nZ2xlLiAqL1xuZXhwb3J0IGRlY2xhcmUgdHlwZSBNYXRCdXR0b25Ub2dnbGVBcHBlYXJhbmNlID0gJ2xlZ2FjeScgfCAnc3RhbmRhcmQnO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBidXR0b24gdG9nZ2xlIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWRcbiAqIHVzaW5nIHRoZSBgTUFUX0JVVFRPTl9UT0dHTEVfREVGQVVMVF9PUFRJT05TYCBpbmplY3Rpb24gdG9rZW4uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0QnV0dG9uVG9nZ2xlRGVmYXVsdE9wdGlvbnMge1xuICAgIGFwcGVhcmFuY2U/OiBNYXRCdXR0b25Ub2dnbGVBcHBlYXJhbmNlO1xufVxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlXG4gKiBkZWZhdWx0IG9wdGlvbnMgZm9yIGFsbCBidXR0b24gdG9nZ2xlcyB3aXRoaW4gYW4gYXBwLlxuICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfQlVUVE9OX1RPR0dMRV9ERUZBVUxUX09QVElPTlM6IEluamVjdGlvblRva2VuPE1hdEJ1dHRvblRvZ2dsZURlZmF1bHRPcHRpb25zPjtcbi8qKlxuICogUHJvdmlkZXIgRXhwcmVzc2lvbiB0aGF0IGFsbG93cyBtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogVGhpcyBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0JVVFRPTl9UT0dHTEVfR1JPVVBfVkFMVUVfQUNDRVNTT1I6IGFueTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRCdXR0b25Ub2dnbGVHcm91cGAgaW5zdGVhZC5cbiAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0QnV0dG9uVG9nZ2xlR3JvdXBNdWx0aXBsZSB7XG59XG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1hdEJ1dHRvblRvZ2dsZS4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEJ1dHRvblRvZ2dsZUNoYW5nZSB7XG4gICAgLyoqIFRoZSBNYXRCdXR0b25Ub2dnbGUgdGhhdCBlbWl0cyB0aGUgZXZlbnQuICovXG4gICAgc291cmNlOiBNYXRCdXR0b25Ub2dnbGU7XG4gICAgLyoqIFRoZSB2YWx1ZSBhc3NpZ25lZCB0byB0aGUgTWF0QnV0dG9uVG9nZ2xlLiAqL1xuICAgIHZhbHVlOiBhbnk7XG4gICAgY29uc3RydWN0b3IoXG4gICAgLyoqIFRoZSBNYXRCdXR0b25Ub2dnbGUgdGhhdCBlbWl0cyB0aGUgZXZlbnQuICovXG4gICAgc291cmNlOiBNYXRCdXR0b25Ub2dnbGUsIFxuICAgIC8qKiBUaGUgdmFsdWUgYXNzaWduZWQgdG8gdGhlIE1hdEJ1dHRvblRvZ2dsZS4gKi9cbiAgICB2YWx1ZTogYW55KTtcbn1cbi8qKiBFeGNsdXNpdmUgc2VsZWN0aW9uIGJ1dHRvbiB0b2dnbGUgZ3JvdXAgdGhhdCBiZWhhdmVzIGxpa2UgYSByYWRpby1idXR0b24gZ3JvdXAuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRCdXR0b25Ub2dnbGVHcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yO1xuICAgIHByaXZhdGUgX3ZlcnRpY2FsO1xuICAgIHByaXZhdGUgX211bHRpcGxlO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIHByaXZhdGUgX3NlbGVjdGlvbk1vZGVsO1xuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgcmF3IHZhbHVlIHRoYXQgdGhlIGNvbnN1bWVyIHRyaWVkIHRvIGFzc2lnbi4gVGhlIHJlYWxcbiAgICAgKiB2YWx1ZSB3aWxsIGV4Y2x1ZGUgYW55IHZhbHVlcyBmcm9tIHRoaXMgb25lIHRoYXQgZG9uJ3QgY29ycmVzcG9uZCB0byBhXG4gICAgICogdG9nZ2xlLiBVc2VmdWwgZm9yIHRoZSBjYXNlcyB3aGVyZSB0aGUgdmFsdWUgaXMgYXNzaWduZWQgYmVmb3JlIHRoZSB0b2dnbGVzXG4gICAgICogaGF2ZSBiZWVuIGluaXRpYWxpemVkIG9yIGF0IHRoZSBzYW1lIHRoYXQgdGhleSdyZSBiZWluZyBzd2FwcGVkIG91dC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9yYXdWYWx1ZTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC5cbiAgICAgKiBOb3cgYG5nTW9kZWxgIGJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKi9cbiAgICBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gICAgX29uVG91Y2hlZDogKCkgPT4gYW55O1xuICAgIC8qKiBDaGlsZCBidXR0b24gdG9nZ2xlIGJ1dHRvbnMuICovXG4gICAgX2J1dHRvblRvZ2dsZXM6IFF1ZXJ5TGlzdDxNYXRCdXR0b25Ub2dnbGU+O1xuICAgIC8qKiBUaGUgYXBwZWFyYW5jZSBmb3IgYWxsIHRoZSBidXR0b25zIGluIHRoZSBncm91cC4gKi9cbiAgICBhcHBlYXJhbmNlOiBNYXRCdXR0b25Ub2dnbGVBcHBlYXJhbmNlO1xuICAgIC8qKiBgbmFtZWAgYXR0cmlidXRlIGZvciB0aGUgdW5kZXJseWluZyBgaW5wdXRgIGVsZW1lbnQuICovXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nO1xuICAgIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpO1xuICAgIHByaXZhdGUgX25hbWU7XG4gICAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBncm91cCBpcyB2ZXJ0aWNhbC4gKi9cbiAgICBnZXQgdmVydGljYWwoKTogYm9vbGVhbjtcbiAgICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pO1xuICAgIC8qKiBWYWx1ZSBvZiB0aGUgdG9nZ2xlIGdyb3VwLiAqL1xuICAgIGdldCB2YWx1ZSgpOiBhbnk7XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpO1xuICAgIC8qKlxuICAgICAqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHZhbHVlIG9mIHRoZSBncm91cCBjaGFuZ2VzLlxuICAgICAqIFVzZWQgdG8gZmFjaWxpdGF0ZSB0d28td2F5IGRhdGEgYmluZGluZy5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAgIC8qKiBTZWxlY3RlZCBidXR0b24gdG9nZ2xlcyBpbiB0aGUgZ3JvdXAuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IE1hdEJ1dHRvblRvZ2dsZSB8IE1hdEJ1dHRvblRvZ2dsZVtdO1xuICAgIC8qKiBXaGV0aGVyIG11bHRpcGxlIGJ1dHRvbiB0b2dnbGVzIGNhbiBiZSBzZWxlY3RlZC4gKi9cbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbjtcbiAgICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pO1xuICAgIC8qKiBXaGV0aGVyIG11bHRpcGxlIGJ1dHRvbiB0b2dnbGUgZ3JvdXAgaXMgZGlzYWJsZWQuICovXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW47XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKTtcbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCdzIHZhbHVlIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0QnV0dG9uVG9nZ2xlQ2hhbmdlPjtcbiAgICBjb25zdHJ1Y3RvcihfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBkZWZhdWx0T3B0aW9ucz86IE1hdEJ1dHRvblRvZ2dsZURlZmF1bHRPcHRpb25zKTtcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBiZSBzZXQgdG8gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQ7XG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkO1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkO1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQ7XG4gICAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBncm91cCB2YWx1ZS4gKi9cbiAgICBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU3luY3MgYSBidXR0b24gdG9nZ2xlJ3Mgc2VsZWN0ZWQgc3RhdGUgd2l0aCB0aGUgbW9kZWwgdmFsdWUuXG4gICAgICogQHBhcmFtIHRvZ2dsZSBUb2dnbGUgdG8gYmUgc3luY2VkLlxuICAgICAqIEBwYXJhbSBzZWxlY3QgV2hldGhlciB0aGUgdG9nZ2xlIHNob3VsZCBiZSBzZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0gaXNVc2VySW5wdXQgV2hldGhlciB0aGUgY2hhbmdlIHdhcyBhIHJlc3VsdCBvZiBhIHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICogQHBhcmFtIGRlZmVyRXZlbnRzIFdoZXRoZXIgdG8gZGVmZXIgZW1pdHRpbmcgdGhlIGNoYW5nZSBldmVudHMuXG4gICAgICovXG4gICAgX3N5bmNCdXR0b25Ub2dnbGUodG9nZ2xlOiBNYXRCdXR0b25Ub2dnbGUsIHNlbGVjdDogYm9vbGVhbiwgaXNVc2VySW5wdXQ/OiBib29sZWFuLCBkZWZlckV2ZW50cz86IGJvb2xlYW4pOiB2b2lkO1xuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhIGJ1dHRvbiB0b2dnbGUgaXMgc2VsZWN0ZWQuICovXG4gICAgX2lzU2VsZWN0ZWQodG9nZ2xlOiBNYXRCdXR0b25Ub2dnbGUpOiBib29sZWFuO1xuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBidXR0b24gdG9nZ2xlIHNob3VsZCBiZSBjaGVja2VkIG9uIGluaXQuICovXG4gICAgX2lzUHJlY2hlY2tlZCh0b2dnbGU6IE1hdEJ1dHRvblRvZ2dsZSk6IGJvb2xlYW47XG4gICAgLyoqIFVwZGF0ZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgdG9nZ2xlcyBpbiB0aGUgZ3JvdXAgYmFzZWQgb24gYSB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIF9zZXRTZWxlY3Rpb25CeVZhbHVlO1xuICAgIC8qKiBDbGVhcnMgdGhlIHNlbGVjdGVkIHRvZ2dsZXMuICovXG4gICAgcHJpdmF0ZSBfY2xlYXJTZWxlY3Rpb247XG4gICAgLyoqIFNlbGVjdHMgYSB2YWx1ZSBpZiB0aGVyZSdzIGEgdG9nZ2xlIHRoYXQgY29ycmVzcG9uZHMgdG8gaXQuICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0VmFsdWU7XG4gICAgLyoqIFN5bmNzIHVwIHRoZSBncm91cCdzIHZhbHVlIHdpdGggdGhlIG1vZGVsIGFuZCBlbWl0cyB0aGUgY2hhbmdlIGV2ZW50LiAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZU1vZGVsVmFsdWU7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX211bHRpcGxlOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZlcnRpY2FsOiBCb29sZWFuSW5wdXQ7XG59XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZGVjbGFyZSBjbGFzcyBNYXRCdXR0b25Ub2dnbGVCYXNlIHtcbn1cbmRlY2xhcmUgY29uc3QgX01hdEJ1dHRvblRvZ2dsZU1peGluQmFzZTogQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJiB0eXBlb2YgTWF0QnV0dG9uVG9nZ2xlQmFzZTtcbi8qKiBTaW5nbGUgYnV0dG9uIGluc2lkZSBvZiBhIHRvZ2dsZSBncm91cC4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEJ1dHRvblRvZ2dsZSBleHRlbmRzIF9NYXRCdXR0b25Ub2dnbGVNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIENhbkRpc2FibGVSaXBwbGUsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjtcbiAgICBwcml2YXRlIF9mb2N1c01vbml0b3I7XG4gICAgcHJpdmF0ZSBfaXNTaW5nbGVTZWxlY3RvcjtcbiAgICBwcml2YXRlIF9jaGVja2VkO1xuICAgIC8qKlxuICAgICAqIEF0dGFjaGVkIHRvIHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBlbGVtZW50LiBJbiBtb3N0IGNhc2VzLCBhcmlhLWxhYmVsbGVkYnkgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgICAqL1xuICAgIGFyaWFMYWJlbDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFVzZXJzIGNhbiBzcGVjaWZ5IHRoZSBgYXJpYS1sYWJlbGxlZGJ5YCBhdHRyaWJ1dGUgd2hpY2ggd2lsbCBiZSBmb3J3YXJkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAgKi9cbiAgICBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgbnVsbDtcbiAgICAvKiogVHlwZSBvZiB0aGUgYnV0dG9uIHRvZ2dsZS4gRWl0aGVyICdyYWRpbycgb3IgJ2NoZWNrYm94Jy4gKi9cbiAgICBfdHlwZTogVG9nZ2xlVHlwZTtcbiAgICBfYnV0dG9uRWxlbWVudDogRWxlbWVudFJlZjxIVE1MQnV0dG9uRWxlbWVudD47XG4gICAgLyoqIFRoZSBwYXJlbnQgYnV0dG9uIHRvZ2dsZSBncm91cCAoZXhjbHVzaXZlIHNlbGVjdGlvbikuIE9wdGlvbmFsLiAqL1xuICAgIGJ1dHRvblRvZ2dsZUdyb3VwOiBNYXRCdXR0b25Ub2dnbGVHcm91cDtcbiAgICAvKiogVW5pcXVlIElEIGZvciB0aGUgdW5kZXJseWluZyBgYnV0dG9uYCBlbGVtZW50LiAqL1xuICAgIGdldCBidXR0b25JZCgpOiBzdHJpbmc7XG4gICAgLyoqIFRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgICBpZDogc3RyaW5nO1xuICAgIC8qKiBIVE1MJ3MgJ25hbWUnIGF0dHJpYnV0ZSB1c2VkIHRvIGdyb3VwIHJhZGlvcyBmb3IgdW5pcXVlIHNlbGVjdGlvbi4gKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqIE1hdEJ1dHRvblRvZ2dsZUdyb3VwIHJlYWRzIHRoaXMgdG8gYXNzaWduIGl0cyBvd24gdmFsdWUuICovXG4gICAgdmFsdWU6IGFueTtcbiAgICAvKiogVGFiaW5kZXggZm9yIHRoZSB0b2dnbGUuICovXG4gICAgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG4gICAgLyoqIFRoZSBhcHBlYXJhbmNlIHN0eWxlIG9mIHRoZSBidXR0b24uICovXG4gICAgZ2V0IGFwcGVhcmFuY2UoKTogTWF0QnV0dG9uVG9nZ2xlQXBwZWFyYW5jZTtcbiAgICBzZXQgYXBwZWFyYW5jZSh2YWx1ZTogTWF0QnV0dG9uVG9nZ2xlQXBwZWFyYW5jZSk7XG4gICAgcHJpdmF0ZSBfYXBwZWFyYW5jZTtcbiAgICAvKiogV2hldGhlciB0aGUgYnV0dG9uIGlzIGNoZWNrZWQuICovXG4gICAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbik7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0QnV0dG9uVG9nZ2xlQ2hhbmdlPjtcbiAgICBjb25zdHJ1Y3Rvcih0b2dnbGVHcm91cDogTWF0QnV0dG9uVG9nZ2xlR3JvdXAsIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZywgZGVmYXVsdE9wdGlvbnM/OiBNYXRCdXR0b25Ub2dnbGVEZWZhdWx0T3B0aW9ucyk7XG4gICAgbmdPbkluaXQoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gICAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQ7XG4gICAgLyoqIENoZWNrcyB0aGUgYnV0dG9uIHRvZ2dsZSBkdWUgdG8gYW4gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdW5kZXJseWluZyBuYXRpdmUgYnV0dG9uLiAqL1xuICAgIF9vbkJ1dHRvbkNsaWNrKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogTWFya3MgdGhlIGJ1dHRvbiB0b2dnbGUgYXMgbmVlZGluZyBjaGVja2luZyBmb3IgY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBleHBvc2VkIGJlY2F1c2UgdGhlIHBhcmVudCBidXR0b24gdG9nZ2xlIGdyb3VwIHdpbGwgZGlyZWN0bHlcbiAgICAgKiB1cGRhdGUgYm91bmQgcHJvcGVydGllcyBvZiB0aGUgcmFkaW8gYnV0dG9uLlxuICAgICAqL1xuICAgIF9tYXJrRm9yQ2hlY2soKTogdm9pZDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY2hlY2tlZDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92ZXJ0aWNhbDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG5leHBvcnQge307XG4iXX0=