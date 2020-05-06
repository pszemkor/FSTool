/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, CanDisableRipple, CanDisableRippleCtor, HasTabIndex, HasTabIndexCtor } from '@angular/material/core';
import { MatSlideToggleDefaultOptions } from './slide-toggle-config';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_SLIDE_TOGGLE_VALUE_ACCESSOR: any;
/** Change event object emitted by a MatSlideToggle. */
export declare class MatSlideToggleChange {
    /** The source MatSlideToggle of the event. */
    source: MatSlideToggle;
    /** The new `checked` value of the MatSlideToggle. */
    checked: boolean;
    constructor(
    /** The source MatSlideToggle of the event. */
    source: MatSlideToggle, 
    /** The new `checked` value of the MatSlideToggle. */
    checked: boolean);
}
/** @docs-private */
declare class MatSlideToggleBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatSlideToggleMixinBase: HasTabIndexCtor & CanColorCtor & CanDisableRippleCtor & CanDisableCtor & typeof MatSlideToggleBase;
/** Represents a slidable "switch" toggle that can be moved between on and off. */
export declare class MatSlideToggle extends _MatSlideToggleMixinBase implements OnDestroy, AfterContentInit, ControlValueAccessor, CanDisable, CanColor, HasTabIndex, CanDisableRipple {
    private _focusMonitor;
    private _changeDetectorRef;
    defaults: MatSlideToggleDefaultOptions;
    _animationMode?: string | undefined;
    private _onChange;
    private _onTouched;
    private _uniqueId;
    private _required;
    private _checked;
    /** Reference to the thumb HTMLElement. */
    _thumbEl: ElementRef;
    /** Reference to the thumb bar HTMLElement. */
    _thumbBarEl: ElementRef;
    /** Name value will be applied to the input element if present. */
    name: string | null;
    /** A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
    id: string;
    /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
    labelPosition: 'before' | 'after';
    /** Used to set the aria-label attribute on the underlying input element. */
    ariaLabel: string | null;
    /** Used to set the aria-labelledby attribute on the underlying input element. */
    ariaLabelledby: string | null;
    /** Whether the slide-toggle is required. */
    get required(): boolean;
    set required(value: boolean);
    /** Whether the slide-toggle element is checked or not. */
    get checked(): boolean;
    set checked(value: boolean);
    /** An event will be dispatched each time the slide-toggle changes its value. */
    readonly change: EventEmitter<MatSlideToggleChange>;
    /**
     * An event will be dispatched each time the slide-toggle input is toggled.
     * This event is always emitted when the user toggles the slide toggle, but this does not mean
     * the slide toggle's value has changed.
     */
    readonly toggleChange: EventEmitter<void>;
    /**
     * An event will be dispatched each time the slide-toggle is dragged.
     * This event is always emitted when the user drags the slide toggle to make a change greater
     * than 50%. It does not mean the slide toggle's value is changed. The event is not emitted when
     * the user toggles the slide toggle to change its value.
     * @deprecated No longer being used. To be removed.
     * @breaking-change 10.0.0
     */
    readonly dragChange: EventEmitter<void>;
    /** Returns the unique id for the visual hidden input. */
    get inputId(): string;
    /** Reference to the underlying input element. */
    _inputElement: ElementRef<HTMLInputElement>;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef, tabIndex: string, 
    /**
     * @deprecated `_ngZone` and `_dir` parameters to be removed.
     * @breaking-change 10.0.0
     */
    _ngZone: NgZone, defaults: MatSlideToggleDefaultOptions, _animationMode?: string | undefined, _dir?: Directionality);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Method being called whenever the underlying input emits a change event. */
    _onChangeEvent(event: Event): void;
    /** Method being called whenever the slide-toggle has been clicked. */
    _onInputClick(event: Event): void;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(value: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: any): void;
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled: boolean): void;
    /** Focuses the slide-toggle. */
    focus(options?: FocusOptions): void;
    /** Toggles the checked state of the slide-toggle. */
    toggle(): void;
    /**
     * Emits a change event on the `change` output. Also notifies the FormControl about the change.
     */
    private _emitChangeEvent;
    /** Method being called whenever the label text changes. */
    _onLabelTextChange(): void;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_checked: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSlideToggle, [null, null, null, { attribute: "tabindex"; }, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSlideToggle, "mat-slide-toggle", ["matSlideToggle"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "color": "color"; "tabIndex": "tabIndex"; "name": "name"; "id": "id"; "labelPosition": "labelPosition"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "required": "required"; "checked": "checked"; }, { "change": "change"; "toggleChange": "toggleChange"; "dragChange": "dragChange"; }, never, ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmQudHMiLCJzb3VyY2VzIjpbInNsaWRlLXRvZ2dsZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBDYW5EaXNhYmxlUmlwcGxlLCBDYW5EaXNhYmxlUmlwcGxlQ3RvciwgSGFzVGFiSW5kZXgsIEhhc1RhYkluZGV4Q3RvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTWF0U2xpZGVUb2dnbGVEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vc2xpZGUtdG9nZ2xlLWNvbmZpZyc7XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX1NMSURFX1RPR0dMRV9WQUxVRV9BQ0NFU1NPUjogYW55O1xuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBhIE1hdFNsaWRlVG9nZ2xlLiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0U2xpZGVUb2dnbGVDaGFuZ2Uge1xuICAgIC8qKiBUaGUgc291cmNlIE1hdFNsaWRlVG9nZ2xlIG9mIHRoZSBldmVudC4gKi9cbiAgICBzb3VyY2U6IE1hdFNsaWRlVG9nZ2xlO1xuICAgIC8qKiBUaGUgbmV3IGBjaGVja2VkYCB2YWx1ZSBvZiB0aGUgTWF0U2xpZGVUb2dnbGUuICovXG4gICAgY2hlY2tlZDogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAvKiogVGhlIHNvdXJjZSBNYXRTbGlkZVRvZ2dsZSBvZiB0aGUgZXZlbnQuICovXG4gICAgc291cmNlOiBNYXRTbGlkZVRvZ2dsZSwgXG4gICAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBNYXRTbGlkZVRvZ2dsZS4gKi9cbiAgICBjaGVja2VkOiBib29sZWFuKTtcbn1cbi8qKiBAZG9jcy1wcml2YXRlICovXG5kZWNsYXJlIGNsYXNzIE1hdFNsaWRlVG9nZ2xlQmFzZSB7XG4gICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpO1xufVxuZGVjbGFyZSBjb25zdCBfTWF0U2xpZGVUb2dnbGVNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkNvbG9yQ3RvciAmIENhbkRpc2FibGVSaXBwbGVDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWF0U2xpZGVUb2dnbGVCYXNlO1xuLyoqIFJlcHJlc2VudHMgYSBzbGlkYWJsZSBcInN3aXRjaFwiIHRvZ2dsZSB0aGF0IGNhbiBiZSBtb3ZlZCBiZXR3ZWVuIG9uIGFuZCBvZmYuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRTbGlkZVRvZ2dsZSBleHRlbmRzIF9NYXRTbGlkZVRvZ2dsZU1peGluQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIENhbkRpc2FibGUsIENhbkNvbG9yLCBIYXNUYWJJbmRleCwgQ2FuRGlzYWJsZVJpcHBsZSB7XG4gICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yO1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmO1xuICAgIGRlZmF1bHRzOiBNYXRTbGlkZVRvZ2dsZURlZmF1bHRPcHRpb25zO1xuICAgIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgX29uQ2hhbmdlO1xuICAgIHByaXZhdGUgX29uVG91Y2hlZDtcbiAgICBwcml2YXRlIF91bmlxdWVJZDtcbiAgICBwcml2YXRlIF9yZXF1aXJlZDtcbiAgICBwcml2YXRlIF9jaGVja2VkO1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHRodW1iIEhUTUxFbGVtZW50LiAqL1xuICAgIF90aHVtYkVsOiBFbGVtZW50UmVmO1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHRodW1iIGJhciBIVE1MRWxlbWVudC4gKi9cbiAgICBfdGh1bWJCYXJFbDogRWxlbWVudFJlZjtcbiAgICAvKiogTmFtZSB2YWx1ZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgaWYgcHJlc2VudC4gKi9cbiAgICBuYW1lOiBzdHJpbmcgfCBudWxsO1xuICAgIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIHNsaWRlLXRvZ2dsZSBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgICBpZDogc3RyaW5nO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgc2xpZGUtdG9nZ2xlLiBEZWZhdWx0cyB0byAnYWZ0ZXInLiAqL1xuICAgIGxhYmVsUG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJztcbiAgICAvKiogVXNlZCB0byBzZXQgdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9uIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gICAgYXJpYUxhYmVsOiBzdHJpbmcgfCBudWxsO1xuICAgIC8qKiBVc2VkIHRvIHNldCB0aGUgYXJpYS1sYWJlbGxlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICAgIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBzbGlkZS10b2dnbGUgaXMgcmVxdWlyZWQuICovXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW47XG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKTtcbiAgICAvKiogV2hldGhlciB0aGUgc2xpZGUtdG9nZ2xlIGVsZW1lbnQgaXMgY2hlY2tlZCBvciBub3QuICovXG4gICAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbik7XG4gICAgLyoqIEFuIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBlYWNoIHRpbWUgdGhlIHNsaWRlLXRvZ2dsZSBjaGFuZ2VzIGl0cyB2YWx1ZS4gKi9cbiAgICByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZVRvZ2dsZUNoYW5nZT47XG4gICAgLyoqXG4gICAgICogQW4gZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIGVhY2ggdGltZSB0aGUgc2xpZGUtdG9nZ2xlIGlucHV0IGlzIHRvZ2dsZWQuXG4gICAgICogVGhpcyBldmVudCBpcyBhbHdheXMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHRvZ2dsZXMgdGhlIHNsaWRlIHRvZ2dsZSwgYnV0IHRoaXMgZG9lcyBub3QgbWVhblxuICAgICAqIHRoZSBzbGlkZSB0b2dnbGUncyB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICAgKi9cbiAgICByZWFkb25seSB0b2dnbGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBBbiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgZWFjaCB0aW1lIHRoZSBzbGlkZS10b2dnbGUgaXMgZHJhZ2dlZC5cbiAgICAgKiBUaGlzIGV2ZW50IGlzIGFsd2F5cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZHJhZ3MgdGhlIHNsaWRlIHRvZ2dsZSB0byBtYWtlIGEgY2hhbmdlIGdyZWF0ZXJcbiAgICAgKiB0aGFuIDUwJS4gSXQgZG9lcyBub3QgbWVhbiB0aGUgc2xpZGUgdG9nZ2xlJ3MgdmFsdWUgaXMgY2hhbmdlZC4gVGhlIGV2ZW50IGlzIG5vdCBlbWl0dGVkIHdoZW5cbiAgICAgKiB0aGUgdXNlciB0b2dnbGVzIHRoZSBzbGlkZSB0b2dnbGUgdG8gY2hhbmdlIGl0cyB2YWx1ZS5cbiAgICAgKiBAZGVwcmVjYXRlZCBObyBsb25nZXIgYmVpbmcgdXNlZC4gVG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRyYWdDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICAvKiogUmV0dXJucyB0aGUgdW5pcXVlIGlkIGZvciB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dC4gKi9cbiAgICBnZXQgaW5wdXRJZCgpOiBzdHJpbmc7XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICAgIF9pbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCB0YWJJbmRleDogc3RyaW5nLCBcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBgX25nWm9uZWAgYW5kIGBfZGlyYCBwYXJhbWV0ZXJzIHRvIGJlIHJlbW92ZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxMC4wLjBcbiAgICAgKi9cbiAgICBfbmdab25lOiBOZ1pvbmUsIGRlZmF1bHRzOiBNYXRTbGlkZVRvZ2dsZURlZmF1bHRPcHRpb25zLCBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZCwgX2Rpcj86IERpcmVjdGlvbmFsaXR5KTtcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBNZXRob2QgYmVpbmcgY2FsbGVkIHdoZW5ldmVyIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVtaXRzIGEgY2hhbmdlIGV2ZW50LiAqL1xuICAgIF9vbkNoYW5nZUV2ZW50KGV2ZW50OiBFdmVudCk6IHZvaWQ7XG4gICAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHNsaWRlLXRvZ2dsZSBoYXMgYmVlbiBjbGlja2VkLiAqL1xuICAgIF9vbklucHV0Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZDtcbiAgICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkO1xuICAgIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQ7XG4gICAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQ7XG4gICAgLyoqIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkO1xuICAgIC8qKiBGb2N1c2VzIHRoZSBzbGlkZS10b2dnbGUuICovXG4gICAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQ7XG4gICAgLyoqIFRvZ2dsZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHNsaWRlLXRvZ2dsZS4gKi9cbiAgICB0b2dnbGUoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBFbWl0cyBhIGNoYW5nZSBldmVudCBvbiB0aGUgYGNoYW5nZWAgb3V0cHV0LiBBbHNvIG5vdGlmaWVzIHRoZSBGb3JtQ29udHJvbCBhYm91dCB0aGUgY2hhbmdlLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudDtcbiAgICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgbGFiZWwgdGV4dCBjaGFuZ2VzLiAqL1xuICAgIF9vbkxhYmVsVGV4dENoYW5nZSgpOiB2b2lkO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jaGVja2VkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==