/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, CanDisableRipple, CanDisableRippleCtor, HasTabIndex, HasTabIndexCtor, MatRipple } from '@angular/material/core';
import { MatCheckboxClickAction, MatCheckboxDefaultOptions } from './checkbox-config';
/**
 * Provider Expression that allows mat-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR: any;
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export declare const enum TransitionCheckState {
    /** The initial state of the component before any user interaction. */
    Init = 0,
    /** The state representing the component when it's becoming checked. */
    Checked = 1,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked = 2,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate = 3
}
/** Change event object emitted by MatCheckbox. */
export declare class MatCheckboxChange {
    /** The source MatCheckbox of the event. */
    source: MatCheckbox;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}
/** @docs-private */
declare class MatCheckboxBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatCheckboxMixinBase: HasTabIndexCtor & CanColorCtor & CanDisableRippleCtor & CanDisableCtor & typeof MatCheckboxBase;
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A MatCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://material.io/design/components/selection-controls.html
 */
export declare class MatCheckbox extends _MatCheckboxMixinBase implements ControlValueAccessor, AfterViewInit, AfterViewChecked, OnDestroy, CanColor, CanDisable, HasTabIndex, CanDisableRipple, FocusableOption {
    private _changeDetectorRef;
    private _focusMonitor;
    private _ngZone;
    /**
     * @deprecated `_clickAction` parameter to be removed, use
     * `MAT_CHECKBOX_DEFAULT_OPTIONS`
     * @breaking-change 10.0.0
     */
    private _clickAction;
    _animationMode?: string | undefined;
    private _options?;
    /**
     * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
     * take precedence so this may be omitted.
     */
    ariaLabel: string;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    ariaLabelledby: string | null;
    private _uniqueId;
    /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
    id: string;
    /** Returns the unique id for the visual hidden input. */
    get inputId(): string;
    /** Whether the checkbox is required. */
    get required(): boolean;
    set required(value: boolean);
    private _required;
    /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
    labelPosition: 'before' | 'after';
    /** Name value will be applied to the input element if present */
    name: string | null;
    /** Event emitted when the checkbox's `checked` value changes. */
    readonly change: EventEmitter<MatCheckboxChange>;
    /** Event emitted when the checkbox's `indeterminate` value changes. */
    readonly indeterminateChange: EventEmitter<boolean>;
    /** The value attribute of the native input element */
    value: string;
    /** The native `<input type="checkbox">` element */
    _inputElement: ElementRef<HTMLInputElement>;
    /** Reference to the ripple instance of the checkbox. */
    ripple: MatRipple;
    /**
     * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
     * @docs-private
     */
    _onTouched: () => any;
    private _currentAnimationClass;
    private _currentCheckState;
    private _controlValueAccessorChangeFn;
    constructor(elementRef: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, _focusMonitor: FocusMonitor, _ngZone: NgZone, tabIndex: string, 
    /**
     * @deprecated `_clickAction` parameter to be removed, use
     * `MAT_CHECKBOX_DEFAULT_OPTIONS`
     * @breaking-change 10.0.0
     */
    _clickAction: MatCheckboxClickAction, _animationMode?: string | undefined, _options?: MatCheckboxDefaultOptions | undefined);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * Whether the checkbox is checked.
     */
    get checked(): boolean;
    set checked(value: boolean);
    private _checked;
    /**
     * Whether the checkbox is disabled. This fully overrides the implementation provided by
     * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
     */
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     */
    get indeterminate(): boolean;
    set indeterminate(value: boolean);
    private _indeterminate;
    _isRippleDisabled(): any;
    /** Method being called whenever the label text changes. */
    _onLabelTextChange(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    _getAriaChecked(): 'true' | 'false' | 'mixed';
    private _transitionCheckState;
    private _emitChangeEvent;
    /** Toggles the `checked` state of the checkbox. */
    toggle(): void;
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    _onInputClick(event: Event): void;
    /** Focuses the checkbox. */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    _onInteractionEvent(event: Event): void;
    private _getAnimationClassForCheckStateTransition;
    /**
     * Syncs the indeterminate value with the checkbox DOM node.
     *
     * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
     * property is supported on an element boils down to `if (propName in element)`. Domino's
     * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
     * server-side rendering.
     */
    private _syncIndeterminate;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ngAcceptInputType_indeterminate: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCheckbox, [null, null, null, null, { attribute: "tabindex"; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatCheckbox, "mat-checkbox", ["matCheckbox"], { "disableRipple": "disableRipple"; "color": "color"; "tabIndex": "tabIndex"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "id": "id"; "labelPosition": "labelPosition"; "name": "name"; "required": "required"; "checked": "checked"; "disabled": "disabled"; "indeterminate": "indeterminate"; "value": "value"; }, { "change": "change"; "indeterminateChange": "indeterminateChange"; }, never, ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guZC50cyIsInNvdXJjZXMiOlsiY2hlY2tib3guZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEZvY3VzYWJsZU9wdGlvbiwgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3RvclJlZiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgQ2FuRGlzYWJsZVJpcHBsZSwgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsIE1hdFJpcHBsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hDbGlja0FjdGlvbiwgTWF0Q2hlY2tib3hEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vY2hlY2tib3gtY29uZmlnJztcbi8qKlxuICogUHJvdmlkZXIgRXhwcmVzc2lvbiB0aGF0IGFsbG93cyBtYXQtY2hlY2tib3ggdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9DSEVDS0JPWF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnk7XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpZmZlcmVudCBzdGF0ZXMgdGhhdCByZXF1aXJlIGN1c3RvbSB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZW0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IGVudW0gVHJhbnNpdGlvbkNoZWNrU3RhdGUge1xuICAgIC8qKiBUaGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29tcG9uZW50IGJlZm9yZSBhbnkgdXNlciBpbnRlcmFjdGlvbi4gKi9cbiAgICBJbml0ID0gMCxcbiAgICAvKiogVGhlIHN0YXRlIHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50IHdoZW4gaXQncyBiZWNvbWluZyBjaGVja2VkLiAqL1xuICAgIENoZWNrZWQgPSAxLFxuICAgIC8qKiBUaGUgc3RhdGUgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQgd2hlbiBpdCdzIGJlY29taW5nIHVuY2hlY2tlZC4gKi9cbiAgICBVbmNoZWNrZWQgPSAyLFxuICAgIC8qKiBUaGUgc3RhdGUgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQgd2hlbiBpdCdzIGJlY29taW5nIGluZGV0ZXJtaW5hdGUuICovXG4gICAgSW5kZXRlcm1pbmF0ZSA9IDNcbn1cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWF0Q2hlY2tib3guICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRDaGVja2JveENoYW5nZSB7XG4gICAgLyoqIFRoZSBzb3VyY2UgTWF0Q2hlY2tib3ggb2YgdGhlIGV2ZW50LiAqL1xuICAgIHNvdXJjZTogTWF0Q2hlY2tib3g7XG4gICAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgICBjaGVja2VkOiBib29sZWFuO1xufVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0Q2hlY2tib3hCYXNlIHtcbiAgICBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZik7XG59XG5kZWNsYXJlIGNvbnN0IF9NYXRDaGVja2JveE1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuQ29sb3JDdG9yICYgQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNYXRDaGVja2JveEJhc2U7XG4vKipcbiAqIEEgbWF0ZXJpYWwgZGVzaWduIGNoZWNrYm94IGNvbXBvbmVudC4gU3VwcG9ydHMgYWxsIG9mIHRoZSBmdW5jdGlvbmFsaXR5IG9mIGFuIEhUTUw1IGNoZWNrYm94LFxuICogYW5kIGV4cG9zZXMgYSBzaW1pbGFyIEFQSS4gQSBNYXRDaGVja2JveCBjYW4gYmUgZWl0aGVyIGNoZWNrZWQsIHVuY2hlY2tlZCwgaW5kZXRlcm1pbmF0ZSwgb3JcbiAqIGRpc2FibGVkLiBOb3RlIHRoYXQgYWxsIGFkZGl0aW9uYWwgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzIGFyZSB0YWtlbiBjYXJlIG9mIGJ5IHRoZSBjb21wb25lbnQsXG4gKiBzbyB0aGVyZSBpcyBubyBuZWVkIHRvIHByb3ZpZGUgdGhlbSB5b3Vyc2VsZi4gSG93ZXZlciwgaWYgeW91IHdhbnQgdG8gb21pdCBhIGxhYmVsIGFuZCBzdGlsbFxuICogaGF2ZSB0aGUgY2hlY2tib3ggYmUgYWNjZXNzaWJsZSwgeW91IG1heSBzdXBwbHkgYW4gW2FyaWEtbGFiZWxdIGlucHV0LlxuICogU2VlOiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3NlbGVjdGlvbi1jb250cm9scy5odG1sXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENoZWNrYm94IGV4dGVuZHMgX01hdENoZWNrYm94TWl4aW5CYXNlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgQ2FuQ29sb3IsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4LCBDYW5EaXNhYmxlUmlwcGxlLCBGb2N1c2FibGVPcHRpb24ge1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmO1xuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjtcbiAgICBwcml2YXRlIF9uZ1pvbmU7XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgYF9jbGlja0FjdGlvbmAgcGFyYW1ldGVyIHRvIGJlIHJlbW92ZWQsIHVzZVxuICAgICAqIGBNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TYFxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY2xpY2tBY3Rpb247XG4gICAgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBfb3B0aW9ucz87XG4gICAgLyoqXG4gICAgICogQXR0YWNoZWQgdG8gdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBob3N0IGVsZW1lbnQuIEluIG1vc3QgY2FzZXMsIGFyaWEtbGFiZWxsZWRieSB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAgICovXG4gICAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVXNlcnMgY2FuIHNwZWNpZnkgdGhlIGBhcmlhLWxhYmVsbGVkYnlgIGF0dHJpYnV0ZSB3aGljaCB3aWxsIGJlIGZvcndhcmRlZCB0byB0aGUgaW5wdXQgZWxlbWVudFxuICAgICAqL1xuICAgIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsO1xuICAgIHByaXZhdGUgX3VuaXF1ZUlkO1xuICAgIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGNoZWNrYm94IGlucHV0LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICAgIGlkOiBzdHJpbmc7XG4gICAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyByZXF1aXJlZC4gKi9cbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX3JlcXVpcmVkO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcicgKi9cbiAgICBsYWJlbFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG4gICAgLyoqIE5hbWUgdmFsdWUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGlmIHByZXNlbnQgKi9cbiAgICBuYW1lOiBzdHJpbmcgfCBudWxsO1xuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGNoZWNrZWRgIHZhbHVlIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0Q2hlY2tib3hDaGFuZ2U+O1xuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGluZGV0ZXJtaW5hdGVgIHZhbHVlIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgaW5kZXRlcm1pbmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICAgIC8qKiBUaGUgdmFsdWUgYXR0cmlidXRlIG9mIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgLyoqIFRoZSBuYXRpdmUgYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5gIGVsZW1lbnQgKi9cbiAgICBfaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHJpcHBsZSBpbnN0YW5jZSBvZiB0aGUgY2hlY2tib3guICovXG4gICAgcmlwcGxlOiBNYXRSaXBwbGU7XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGNoZWNrYm94IGlzIGJsdXJyZWQuIE5lZWRlZCB0byBwcm9wZXJseSBpbXBsZW1lbnQgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vblRvdWNoZWQ6ICgpID0+IGFueTtcbiAgICBwcml2YXRlIF9jdXJyZW50QW5pbWF0aW9uQ2xhc3M7XG4gICAgcHJpdmF0ZSBfY3VycmVudENoZWNrU3RhdGU7XG4gICAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBfbmdab25lOiBOZ1pvbmUsIHRhYkluZGV4OiBzdHJpbmcsIFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIGBfY2xpY2tBY3Rpb25gIHBhcmFtZXRlciB0byBiZSByZW1vdmVkLCB1c2VcbiAgICAgKiBgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU2BcbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAqL1xuICAgIF9jbGlja0FjdGlvbjogTWF0Q2hlY2tib3hDbGlja0FjdGlvbiwgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQsIF9vcHRpb25zPzogTWF0Q2hlY2tib3hEZWZhdWx0T3B0aW9ucyB8IHVuZGVmaW5lZCk7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLlxuICAgICAqL1xuICAgIGdldCBjaGVja2VkKCk6IGJvb2xlYW47XG4gICAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2NoZWNrZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgZGlzYWJsZWQuIFRoaXMgZnVsbHkgb3ZlcnJpZGVzIHRoZSBpbXBsZW1lbnRhdGlvbiBwcm92aWRlZCBieVxuICAgICAqIG1peGluRGlzYWJsZWQsIGJ1dCB0aGUgbWl4aW4gaXMgc3RpbGwgcmVxdWlyZWQgYmVjYXVzZSBtaXhpblRhYkluZGV4IHJlcXVpcmVzIGl0LlxuICAgICAqL1xuICAgIGdldCBkaXNhYmxlZCgpOiBhbnk7XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGluZGV0ZXJtaW5hdGUuIFRoaXMgaXMgYWxzbyBrbm93biBhcyBcIm1peGVkXCIgbW9kZSBhbmQgY2FuIGJlIHVzZWQgdG9cbiAgICAgKiByZXByZXNlbnQgYSBjaGVja2JveCB3aXRoIHRocmVlIHN0YXRlcywgZS5nLiBhIGNoZWNrYm94IHRoYXQgcmVwcmVzZW50cyBhIG5lc3RlZCBsaXN0IG9mXG4gICAgICogY2hlY2thYmxlIGl0ZW1zLiBOb3RlIHRoYXQgd2hlbmV2ZXIgY2hlY2tib3ggaXMgbWFudWFsbHkgY2xpY2tlZCwgaW5kZXRlcm1pbmF0ZSBpcyBpbW1lZGlhdGVseVxuICAgICAqIHNldCB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaW5kZXRlcm1pbmF0ZSgpOiBib29sZWFuO1xuICAgIHNldCBpbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKTtcbiAgICBwcml2YXRlIF9pbmRldGVybWluYXRlO1xuICAgIF9pc1JpcHBsZURpc2FibGVkKCk6IGFueTtcbiAgICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgbGFiZWwgdGV4dCBjaGFuZ2VzLiAqL1xuICAgIF9vbkxhYmVsVGV4dENoYW5nZSgpOiB2b2lkO1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQ7XG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkO1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkO1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQ7XG4gICAgX2dldEFyaWFDaGVja2VkKCk6ICd0cnVlJyB8ICdmYWxzZScgfCAnbWl4ZWQnO1xuICAgIHByaXZhdGUgX3RyYW5zaXRpb25DaGVja1N0YXRlO1xuICAgIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudDtcbiAgICAvKiogVG9nZ2xlcyB0aGUgYGNoZWNrZWRgIHN0YXRlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgICB0b2dnbGUoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBjaGVja2JveCBpbnB1dCBlbGVtZW50LlxuICAgICAqIFRvZ2dsZXMgY2hlY2tlZCBzdGF0ZSBpZiBlbGVtZW50IGlzIG5vdCBkaXNhYmxlZC5cbiAgICAgKiBEbyBub3QgdG9nZ2xlIG9uIChjaGFuZ2UpIGV2ZW50IHNpbmNlIElFIGRvZXNuJ3QgZmlyZSBjaGFuZ2UgZXZlbnQgd2hlblxuICAgICAqICAgaW5kZXRlcm1pbmF0ZSBjaGVja2JveCBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIF9vbklucHV0Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZDtcbiAgICAvKiogRm9jdXNlcyB0aGUgY2hlY2tib3guICovXG4gICAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkO1xuICAgIF9vbkludGVyYWN0aW9uRXZlbnQoZXZlbnQ6IEV2ZW50KTogdm9pZDtcbiAgICBwcml2YXRlIF9nZXRBbmltYXRpb25DbGFzc0ZvckNoZWNrU3RhdGVUcmFuc2l0aW9uO1xuICAgIC8qKlxuICAgICAqIFN5bmNzIHRoZSBpbmRldGVybWluYXRlIHZhbHVlIHdpdGggdGhlIGNoZWNrYm94IERPTSBub2RlLlxuICAgICAqXG4gICAgICogV2Ugc3luYyBgaW5kZXRlcm1pbmF0ZWAgZGlyZWN0bHkgb24gdGhlIERPTSBub2RlLCBiZWNhdXNlIGluIEl2eSB0aGUgY2hlY2sgZm9yIHdoZXRoZXIgYVxuICAgICAqIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBvbiBhbiBlbGVtZW50IGJvaWxzIGRvd24gdG8gYGlmIChwcm9wTmFtZSBpbiBlbGVtZW50KWAuIERvbWlubydzXG4gICAgICogSFRNTElucHV0RWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gYGluZGV0ZXJtaW5hdGVgIHByb3BlcnR5IHNvIEl2eSB3aWxsIHdhcm4gZHVyaW5nXG4gICAgICogc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3N5bmNJbmRldGVybWluYXRlO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luZGV0ZXJtaW5hdGU6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==