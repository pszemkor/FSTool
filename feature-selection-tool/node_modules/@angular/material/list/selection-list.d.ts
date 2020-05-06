/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanDisableRipple, CanDisableRippleCtor, MatLine, ThemePalette } from '@angular/material/core';
import { MatListAvatarCssMatStyler, MatListIconCssMatStyler } from './list';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
declare class MatSelectionListBase {
}
declare const _MatSelectionListMixinBase: CanDisableRippleCtor & typeof MatSelectionListBase;
/** @docs-private */
declare class MatListOptionBase {
}
declare const _MatListOptionMixinBase: CanDisableRippleCtor & typeof MatListOptionBase;
/** @docs-private */
export declare const MAT_SELECTION_LIST_VALUE_ACCESSOR: any;
/** Change event that is being fired whenever the selected state of an option changes. */
export declare class MatSelectionListChange {
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList;
    /** Reference to the option that has been changed. */
    option: MatListOption;
    constructor(
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList, 
    /** Reference to the option that has been changed. */
    option: MatListOption);
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export declare class MatListOption extends _MatListOptionMixinBase implements AfterContentInit, OnDestroy, OnInit, FocusableOption, CanDisableRipple {
    private _element;
    private _changeDetector;
    /** @docs-private */
    selectionList: MatSelectionList;
    private _selected;
    private _disabled;
    private _hasFocus;
    _avatar: MatListAvatarCssMatStyler;
    _icon: MatListIconCssMatStyler;
    _lines: QueryList<MatLine>;
    /** DOM element containing the item's text. */
    _text: ElementRef;
    /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
    checkboxPosition: 'before' | 'after';
    /** Theme color of the list option. This sets the color of the checkbox. */
    get color(): ThemePalette;
    set color(newValue: ThemePalette);
    private _color;
    /**
     * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
     * in the first cycle.
     */
    private _inputsInitialized;
    /** Value of the option */
    get value(): any;
    set value(newValue: any);
    private _value;
    /** Whether the option is disabled. */
    get disabled(): any;
    set disabled(value: any);
    /** Whether the option is selected. */
    get selected(): boolean;
    set selected(value: boolean);
    constructor(_element: ElementRef<HTMLElement>, _changeDetector: ChangeDetectorRef, 
    /** @docs-private */
    selectionList: MatSelectionList);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Toggles the selection state of the option. */
    toggle(): void;
    /** Allows for programmatic focusing of the option. */
    focus(): void;
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    getLabel(): any;
    /** Whether this list item should show a ripple effect when clicked. */
    _isRippleDisabled(): any;
    _handleClick(): void;
    _handleFocus(): void;
    _handleBlur(): void;
    /** Retrieves the DOM element of the component host. */
    _getHostElement(): HTMLElement;
    /** Sets the selected state of the option. Returns whether the value has changed. */
    _setSelected(selected: boolean): boolean;
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
     * used to trigger an update of the list option if the disabled state of the selection list
     * changed.
     */
    _markForCheck(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_selected: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatListOption, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatListOption, "mat-list-option", ["matListOption"], { "disableRipple": "disableRipple"; "checkboxPosition": "checkboxPosition"; "color": "color"; "value": "value"; "selected": "selected"; "disabled": "disabled"; }, {}, ["_avatar", "_icon", "_lines"], ["*", "[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]"]>;
}
/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 */
export declare class MatSelectionList extends _MatSelectionListMixinBase implements CanDisableRipple, AfterContentInit, ControlValueAccessor, OnDestroy, OnChanges {
    private _element;
    private _changeDetector;
    private _multiple;
    private _contentInitialized;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager<MatListOption>;
    /** The option components contained within this selection-list. */
    options: QueryList<MatListOption>;
    /** Emits a change event whenever the selected state of an option changes. */
    readonly selectionChange: EventEmitter<MatSelectionListChange>;
    /**
     * Tabindex of the selection list.
     * @breaking-change 11.0.0 Remove `tabIndex` input.
     */
    tabIndex: number;
    /** Theme color of the selection list. This sets the checkbox color for all list options. */
    color: ThemePalette;
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     */
    compareWith: (o1: any, o2: any) => boolean;
    /** Whether the selection list is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Whether selection is limited to one or multiple items (default multiple). */
    get multiple(): boolean;
    set multiple(value: boolean);
    /** The currently selected options. */
    selectedOptions: SelectionModel<MatListOption>;
    /** The tabindex of the selection list. */
    _tabIndex: number;
    /** View to model callback that should be called whenever the selected options change. */
    private _onChange;
    /** Keeps track of the currently-selected value. */
    _value: string[] | null;
    /** Emits when the list has been destroyed. */
    private _destroyed;
    /** View to model callback that should be called if the list or its options lost focus. */
    _onTouched: () => void;
    /** Whether the list has been destroyed. */
    private _isDestroyed;
    constructor(_element: ElementRef<HTMLElement>, tabIndex: string, _changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Focuses the selection list. */
    focus(options?: FocusOptions): void;
    /** Selects all of the options. */
    selectAll(): void;
    /** Deselects all of the options. */
    deselectAll(): void;
    /** Sets the focused option of the selection-list. */
    _setFocusedOption(option: MatListOption): void;
    /**
     * Removes an option from the selection list and updates the active item.
     * @returns Currently-active item.
     */
    _removeOptionFromList(option: MatListOption): MatListOption | null;
    /** Passes relevant key presses to our key manager. */
    _keydown(event: KeyboardEvent): void;
    /** Reports a value change to the ControlValueAccessor */
    _reportValueChange(): void;
    /** Emits a change event if the selected state of an option changed. */
    _emitChangeEvent(option: MatListOption): void;
    /**
     * When the selection list is focused, we want to move focus to an option within the list. Do this
     * by setting the appropriate option to be active.
     */
    _onFocus(): void;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(values: string[]): void;
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled: boolean): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: (value: any) => void): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: () => void): void;
    /** Sets the selected options based on the specified values. */
    private _setOptionsFromValues;
    /** Returns the values of the selected options. */
    private _getSelectedOptionValues;
    /** Toggles the state of the currently focused option if enabled. */
    private _toggleFocusedOption;
    /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     */
    private _setAllOptionsSelected;
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    private _isValidIndex;
    /** Returns the index of the specified list option. */
    private _getOptionIndex;
    /** Marks all the options to be checked in the next change detection run. */
    private _markOptionsForCheck;
    /**
     * Removes the tabindex from the selection list and resets it back afterwards, allowing the user
     * to tab out of it. This prevents the list from capturing focus and redirecting it back within
     * the list, creating a focus trap if it user tries to tab away.
     */
    private _allowFocusEscape;
    /** Updates the tabindex based upon if the selection list is empty. */
    private _updateTabIndex;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ngAcceptInputType_multiple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSelectionList, [null, { attribute: "tabindex"; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSelectionList, "mat-selection-list", ["matSelectionList"], { "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; "color": "color"; "compareWith": "compareWith"; "disabled": "disabled"; "multiple": "multiple"; }, { "selectionChange": "selectionChange"; }, ["options"], ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QuZC50cyIsInNvdXJjZXMiOlsic2VsZWN0aW9uLWxpc3QuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEZvY3VzYWJsZU9wdGlvbiwgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlUmlwcGxlLCBDYW5EaXNhYmxlUmlwcGxlQ3RvciwgTWF0TGluZSwgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLCBNYXRMaXN0SWNvbkNzc01hdFN0eWxlciB9IGZyb20gJy4vbGlzdCc7XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZGVjbGFyZSBjbGFzcyBNYXRTZWxlY3Rpb25MaXN0QmFzZSB7XG59XG5kZWNsYXJlIGNvbnN0IF9NYXRTZWxlY3Rpb25MaXN0TWl4aW5CYXNlOiBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIHR5cGVvZiBNYXRTZWxlY3Rpb25MaXN0QmFzZTtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5kZWNsYXJlIGNsYXNzIE1hdExpc3RPcHRpb25CYXNlIHtcbn1cbmRlY2xhcmUgY29uc3QgX01hdExpc3RPcHRpb25NaXhpbkJhc2U6IENhbkRpc2FibGVSaXBwbGVDdG9yICYgdHlwZW9mIE1hdExpc3RPcHRpb25CYXNlO1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUjogYW55O1xuLyoqIENoYW5nZSBldmVudCB0aGF0IGlzIGJlaW5nIGZpcmVkIHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlcy4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNlbGVjdGlvbkxpc3RDaGFuZ2Uge1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlbGVjdGlvbiBsaXN0IHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgc291cmNlOiBNYXRTZWxlY3Rpb25MaXN0O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIG9wdGlvbiB0aGF0IGhhcyBiZWVuIGNoYW5nZWQuICovXG4gICAgb3B0aW9uOiBNYXRMaXN0T3B0aW9uO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlbGVjdGlvbiBsaXN0IHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgc291cmNlOiBNYXRTZWxlY3Rpb25MaXN0LCBcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBvcHRpb24gdGhhdCBoYXMgYmVlbiBjaGFuZ2VkLiAqL1xuICAgIG9wdGlvbjogTWF0TGlzdE9wdGlvbik7XG59XG4vKipcbiAqIENvbXBvbmVudCBmb3IgbGlzdC1vcHRpb25zIG9mIHNlbGVjdGlvbi1saXN0LiBFYWNoIGxpc3Qtb3B0aW9uIGNhbiBhdXRvbWF0aWNhbGx5XG4gKiBnZW5lcmF0ZSBhIGNoZWNrYm94IGFuZCBjYW4gcHV0IGN1cnJlbnQgaXRlbSBpbnRvIHRoZSBzZWxlY3Rpb25Nb2RlbCBvZiBzZWxlY3Rpb24tbGlzdFxuICogaWYgdGhlIGN1cnJlbnQgaXRlbSBpcyBzZWxlY3RlZC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0TGlzdE9wdGlvbiBleHRlbmRzIF9NYXRMaXN0T3B0aW9uTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIEZvY3VzYWJsZU9wdGlvbiwgQ2FuRGlzYWJsZVJpcHBsZSB7XG4gICAgcHJpdmF0ZSBfZWxlbWVudDtcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjtcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHNlbGVjdGlvbkxpc3Q6IE1hdFNlbGVjdGlvbkxpc3Q7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ7XG4gICAgcHJpdmF0ZSBfaGFzRm9jdXM7XG4gICAgX2F2YXRhcjogTWF0TGlzdEF2YXRhckNzc01hdFN0eWxlcjtcbiAgICBfaWNvbjogTWF0TGlzdEljb25Dc3NNYXRTdHlsZXI7XG4gICAgX2xpbmVzOiBRdWVyeUxpc3Q8TWF0TGluZT47XG4gICAgLyoqIERPTSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGl0ZW0ncyB0ZXh0LiAqL1xuICAgIF90ZXh0OiBFbGVtZW50UmVmO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGJlZm9yZSBvciBhZnRlciB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcicgKi9cbiAgICBjaGVja2JveFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG4gICAgLyoqIFRoZW1lIGNvbG9yIG9mIHRoZSBsaXN0IG9wdGlvbi4gVGhpcyBzZXRzIHRoZSBjb2xvciBvZiB0aGUgY2hlY2tib3guICovXG4gICAgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZTtcbiAgICBzZXQgY29sb3IobmV3VmFsdWU6IFRoZW1lUGFsZXR0ZSk7XG4gICAgcHJpdmF0ZSBfY29sb3I7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzZXQgdG8gdHJ1ZSBhZnRlciB0aGUgZmlyc3QgT25DaGFuZ2VzIGN5Y2xlIHNvIHdlIGRvbid0IGNsZWFyIHRoZSB2YWx1ZSBvZiBgc2VsZWN0ZWRgXG4gICAgICogaW4gdGhlIGZpcnN0IGN5Y2xlLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2lucHV0c0luaXRpYWxpemVkO1xuICAgIC8qKiBWYWx1ZSBvZiB0aGUgb3B0aW9uICovXG4gICAgZ2V0IHZhbHVlKCk6IGFueTtcbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSk7XG4gICAgcHJpdmF0ZSBfdmFsdWU7XG4gICAgLyoqIFdoZXRoZXIgdGhlIG9wdGlvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYW55O1xuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KTtcbiAgICAvKiogV2hldGhlciB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkLiAqL1xuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuO1xuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbik7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHNlbGVjdGlvbkxpc3Q6IE1hdFNlbGVjdGlvbkxpc3QpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogVG9nZ2xlcyB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSBvcHRpb24uICovXG4gICAgdG9nZ2xlKCk6IHZvaWQ7XG4gICAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBvcHRpb24uICovXG4gICAgZm9jdXMoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IGl0ZW0ncyB0ZXh0IGxhYmVsLiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgdGhlIEZvY3VzS2V5TWFuYWdlci5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0TGFiZWwoKTogYW55O1xuICAgIC8qKiBXaGV0aGVyIHRoaXMgbGlzdCBpdGVtIHNob3VsZCBzaG93IGEgcmlwcGxlIGVmZmVjdCB3aGVuIGNsaWNrZWQuICovXG4gICAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYW55O1xuICAgIF9oYW5kbGVDbGljaygpOiB2b2lkO1xuICAgIF9oYW5kbGVGb2N1cygpOiB2b2lkO1xuICAgIF9oYW5kbGVCbHVyKCk6IHZvaWQ7XG4gICAgLyoqIFJldHJpZXZlcyB0aGUgRE9NIGVsZW1lbnQgb2YgdGhlIGNvbXBvbmVudCBob3N0LiAqL1xuICAgIF9nZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudDtcbiAgICAvKiogU2V0cyB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIG9wdGlvbi4gUmV0dXJucyB3aGV0aGVyIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbiAgICBfc2V0U2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE5vdGlmaWVzIEFuZ3VsYXIgdGhhdCB0aGUgb3B0aW9uIG5lZWRzIHRvIGJlIGNoZWNrZWQgaW4gdGhlIG5leHQgY2hhbmdlIGRldGVjdGlvbiBydW4uIE1haW5seVxuICAgICAqIHVzZWQgdG8gdHJpZ2dlciBhbiB1cGRhdGUgb2YgdGhlIGxpc3Qgb3B0aW9uIGlmIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0aW9uIGxpc3RcbiAgICAgKiBjaGFuZ2VkLlxuICAgICAqL1xuICAgIF9tYXJrRm9yQ2hlY2soKTogdm9pZDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuLyoqXG4gKiBNYXRlcmlhbCBEZXNpZ24gbGlzdCBjb21wb25lbnQgd2hlcmUgZWFjaCBpdGVtIGlzIGEgc2VsZWN0YWJsZSBvcHRpb24uIEJlaGF2ZXMgYXMgYSBsaXN0Ym94LlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRTZWxlY3Rpb25MaXN0IGV4dGVuZHMgX01hdFNlbGVjdGlvbkxpc3RNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlUmlwcGxlLCBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAgIHByaXZhdGUgX2VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I7XG4gICAgcHJpdmF0ZSBfbXVsdGlwbGU7XG4gICAgcHJpdmF0ZSBfY29udGVudEluaXRpYWxpemVkO1xuICAgIC8qKiBUaGUgRm9jdXNLZXlNYW5hZ2VyIHdoaWNoIGhhbmRsZXMgZm9jdXMuICovXG4gICAgX2tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNYXRMaXN0T3B0aW9uPjtcbiAgICAvKiogVGhlIG9wdGlvbiBjb21wb25lbnRzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBzZWxlY3Rpb24tbGlzdC4gKi9cbiAgICBvcHRpb25zOiBRdWVyeUxpc3Q8TWF0TGlzdE9wdGlvbj47XG4gICAgLyoqIEVtaXRzIGEgY2hhbmdlIGV2ZW50IHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlcy4gKi9cbiAgICByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRTZWxlY3Rpb25MaXN0Q2hhbmdlPjtcbiAgICAvKipcbiAgICAgKiBUYWJpbmRleCBvZiB0aGUgc2VsZWN0aW9uIGxpc3QuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxMS4wLjAgUmVtb3ZlIGB0YWJJbmRleGAgaW5wdXQuXG4gICAgICovXG4gICAgdGFiSW5kZXg6IG51bWJlcjtcbiAgICAvKiogVGhlbWUgY29sb3Igb2YgdGhlIHNlbGVjdGlvbiBsaXN0LiBUaGlzIHNldHMgdGhlIGNoZWNrYm94IGNvbG9yIGZvciBhbGwgbGlzdCBvcHRpb25zLiAqL1xuICAgIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCBmb3IgY29tcGFyaW5nIGFuIG9wdGlvbiBhZ2FpbnN0IHRoZSBzZWxlY3RlZCB2YWx1ZSB3aGVuIGRldGVybWluaW5nIHdoaWNoXG4gICAgICogb3B0aW9ucyBzaG91bGQgYXBwZWFyIGFzIHNlbGVjdGVkLiBUaGUgZmlyc3QgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIGFuIG9wdGlvbnMuIFRoZSBzZWNvbmRcbiAgICAgKiBvbmUgaXMgYSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3RlZCB2YWx1ZS4gQSBib29sZWFuIG11c3QgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgY29tcGFyZVdpdGg6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3Rpb24gbGlzdCBpcyBkaXNhYmxlZC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKiBXaGV0aGVyIHNlbGVjdGlvbiBpcyBsaW1pdGVkIHRvIG9uZSBvciBtdWx0aXBsZSBpdGVtcyAoZGVmYXVsdCBtdWx0aXBsZSkuICovXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW47XG4gICAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKTtcbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb25zLiAqL1xuICAgIHNlbGVjdGVkT3B0aW9uczogU2VsZWN0aW9uTW9kZWw8TWF0TGlzdE9wdGlvbj47XG4gICAgLyoqIFRoZSB0YWJpbmRleCBvZiB0aGUgc2VsZWN0aW9uIGxpc3QuICovXG4gICAgX3RhYkluZGV4OiBudW1iZXI7XG4gICAgLyoqIFZpZXcgdG8gbW9kZWwgY2FsbGJhY2sgdGhhdCBzaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBvcHRpb25zIGNoYW5nZS4gKi9cbiAgICBwcml2YXRlIF9vbkNoYW5nZTtcbiAgICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnRseS1zZWxlY3RlZCB2YWx1ZS4gKi9cbiAgICBfdmFsdWU6IHN0cmluZ1tdIHwgbnVsbDtcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgbGlzdCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkO1xuICAgIC8qKiBWaWV3IHRvIG1vZGVsIGNhbGxiYWNrIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCBpZiB0aGUgbGlzdCBvciBpdHMgb3B0aW9ucyBsb3N0IGZvY3VzLiAqL1xuICAgIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQ7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGxpc3QgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgX2lzRGVzdHJveWVkO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgdGFiSW5kZXg6IHN0cmluZywgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogRm9jdXNlcyB0aGUgc2VsZWN0aW9uIGxpc3QuICovXG4gICAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQ7XG4gICAgLyoqIFNlbGVjdHMgYWxsIG9mIHRoZSBvcHRpb25zLiAqL1xuICAgIHNlbGVjdEFsbCgpOiB2b2lkO1xuICAgIC8qKiBEZXNlbGVjdHMgYWxsIG9mIHRoZSBvcHRpb25zLiAqL1xuICAgIGRlc2VsZWN0QWxsKCk6IHZvaWQ7XG4gICAgLyoqIFNldHMgdGhlIGZvY3VzZWQgb3B0aW9uIG9mIHRoZSBzZWxlY3Rpb24tbGlzdC4gKi9cbiAgICBfc2V0Rm9jdXNlZE9wdGlvbihvcHRpb246IE1hdExpc3RPcHRpb24pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gb3B0aW9uIGZyb20gdGhlIHNlbGVjdGlvbiBsaXN0IGFuZCB1cGRhdGVzIHRoZSBhY3RpdmUgaXRlbS5cbiAgICAgKiBAcmV0dXJucyBDdXJyZW50bHktYWN0aXZlIGl0ZW0uXG4gICAgICovXG4gICAgX3JlbW92ZU9wdGlvbkZyb21MaXN0KG9wdGlvbjogTWF0TGlzdE9wdGlvbik6IE1hdExpc3RPcHRpb24gfCBudWxsO1xuICAgIC8qKiBQYXNzZXMgcmVsZXZhbnQga2V5IHByZXNzZXMgdG8gb3VyIGtleSBtYW5hZ2VyLiAqL1xuICAgIF9rZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZDtcbiAgICAvKiogUmVwb3J0cyBhIHZhbHVlIGNoYW5nZSB0byB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgKi9cbiAgICBfcmVwb3J0VmFsdWVDaGFuZ2UoKTogdm9pZDtcbiAgICAvKiogRW1pdHMgYSBjaGFuZ2UgZXZlbnQgaWYgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFuIG9wdGlvbiBjaGFuZ2VkLiAqL1xuICAgIF9lbWl0Q2hhbmdlRXZlbnQob3B0aW9uOiBNYXRMaXN0T3B0aW9uKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBzZWxlY3Rpb24gbGlzdCBpcyBmb2N1c2VkLCB3ZSB3YW50IHRvIG1vdmUgZm9jdXMgdG8gYW4gb3B0aW9uIHdpdGhpbiB0aGUgbGlzdC4gRG8gdGhpc1xuICAgICAqIGJ5IHNldHRpbmcgdGhlIGFwcHJvcHJpYXRlIG9wdGlvbiB0byBiZSBhY3RpdmUuXG4gICAgICovXG4gICAgX29uRm9jdXMoKTogdm9pZDtcbiAgICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlczogc3RyaW5nW10pOiB2b2lkO1xuICAgIC8qKiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZDtcbiAgICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQ7XG4gICAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xuICAgIC8qKiBTZXRzIHRoZSBzZWxlY3RlZCBvcHRpb25zIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgdmFsdWVzLiAqL1xuICAgIHByaXZhdGUgX3NldE9wdGlvbnNGcm9tVmFsdWVzO1xuICAgIC8qKiBSZXR1cm5zIHRoZSB2YWx1ZXMgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbnMuICovXG4gICAgcHJpdmF0ZSBfZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZXM7XG4gICAgLyoqIFRvZ2dsZXMgdGhlIHN0YXRlIG9mIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBvcHRpb24gaWYgZW5hYmxlZC4gKi9cbiAgICBwcml2YXRlIF90b2dnbGVGb2N1c2VkT3B0aW9uO1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlbGVjdGVkIHN0YXRlIG9uIGFsbCBvZiB0aGUgb3B0aW9uc1xuICAgICAqIGFuZCBlbWl0cyBhbiBldmVudCBpZiBhbnl0aGluZyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3NldEFsbE9wdGlvbnNTZWxlY3RlZDtcbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiBvcHRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2lzVmFsaWRJbmRleDtcbiAgICAvKiogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIHNwZWNpZmllZCBsaXN0IG9wdGlvbi4gKi9cbiAgICBwcml2YXRlIF9nZXRPcHRpb25JbmRleDtcbiAgICAvKiogTWFya3MgYWxsIHRoZSBvcHRpb25zIHRvIGJlIGNoZWNrZWQgaW4gdGhlIG5leHQgY2hhbmdlIGRldGVjdGlvbiBydW4uICovXG4gICAgcHJpdmF0ZSBfbWFya09wdGlvbnNGb3JDaGVjaztcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSB0YWJpbmRleCBmcm9tIHRoZSBzZWxlY3Rpb24gbGlzdCBhbmQgcmVzZXRzIGl0IGJhY2sgYWZ0ZXJ3YXJkcywgYWxsb3dpbmcgdGhlIHVzZXJcbiAgICAgKiB0byB0YWIgb3V0IG9mIGl0LiBUaGlzIHByZXZlbnRzIHRoZSBsaXN0IGZyb20gY2FwdHVyaW5nIGZvY3VzIGFuZCByZWRpcmVjdGluZyBpdCBiYWNrIHdpdGhpblxuICAgICAqIHRoZSBsaXN0LCBjcmVhdGluZyBhIGZvY3VzIHRyYXAgaWYgaXQgdXNlciB0cmllcyB0byB0YWIgYXdheS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9hbGxvd0ZvY3VzRXNjYXBlO1xuICAgIC8qKiBVcGRhdGVzIHRoZSB0YWJpbmRleCBiYXNlZCB1cG9uIGlmIHRoZSBzZWxlY3Rpb24gbGlzdCBpcyBlbXB0eS4gKi9cbiAgICBwcml2YXRlIF91cGRhdGVUYWJJbmRleDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogQm9vbGVhbklucHV0O1xufVxuZXhwb3J0IHt9O1xuIl19