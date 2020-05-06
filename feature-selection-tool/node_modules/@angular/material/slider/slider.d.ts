/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@angular/material/core';
/**
 * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_SLIDER_VALUE_ACCESSOR: any;
/** A simple change event emitted by the MatSlider component. */
export declare class MatSliderChange {
    /** The MatSlider that changed. */
    source: MatSlider;
    /** The new value of the source slider. */
    value: number | null;
}
/** @docs-private */
declare class MatSliderBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatSliderMixinBase: HasTabIndexCtor & CanColorCtor & CanDisableCtor & typeof MatSliderBase;
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
export declare class MatSlider extends _MatSliderMixinBase implements ControlValueAccessor, OnDestroy, CanDisable, CanColor, OnInit, HasTabIndex {
    private _focusMonitor;
    private _changeDetectorRef;
    private _dir;
    _animationMode?: string | undefined;
    private _ngZone?;
    /** Whether the slider is inverted. */
    get invert(): boolean;
    set invert(value: boolean);
    private _invert;
    /** The maximum value that the slider can have. */
    get max(): number;
    set max(v: number);
    private _max;
    /** The minimum value that the slider can have. */
    get min(): number;
    set min(v: number);
    private _min;
    /** The values at which the thumb will snap. */
    get step(): number;
    set step(v: number);
    private _step;
    /** Whether or not to show the thumb label. */
    get thumbLabel(): boolean;
    set thumbLabel(value: boolean);
    private _thumbLabel;
    /**
     * How often to show ticks. Relative to the step so that a tick always appears on a step.
     * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
     */
    get tickInterval(): 'auto' | number;
    set tickInterval(value: 'auto' | number);
    private _tickInterval;
    /** Value of the slider. */
    get value(): number | null;
    set value(v: number | null);
    private _value;
    /**
     * Function that will be used to format the value before it is displayed
     * in the thumb label. Can be used to format very large number in order
     * for them to fit into the slider thumb.
     */
    displayWith: (value: number) => string | number;
    /** Whether the slider is vertical. */
    get vertical(): boolean;
    set vertical(value: boolean);
    private _vertical;
    /** Event emitted when the slider value has changed. */
    readonly change: EventEmitter<MatSliderChange>;
    /** Event emitted when the slider thumb moves. */
    readonly input: EventEmitter<MatSliderChange>;
    /**
     * Emits when the raw value of the slider changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<number | null>;
    /** The value to be used for display purposes. */
    get displayValue(): string | number;
    /** set focus to the host element */
    focus(options?: FocusOptions): void;
    /** blur the host element */
    blur(): void;
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    onTouched: () => any;
    /** The percentage of the slider that coincides with the value. */
    get percent(): number;
    private _percent;
    /**
     * Whether or not the thumb is sliding.
     * Used to determine if there should be a transition for the thumb and fill track.
     */
    _isSliding: boolean;
    /**
     * Whether or not the slider is active (clicked or sliding).
     * Used to shrink and grow the thumb as according to the Material Design spec.
     */
    _isActive: boolean;
    /**
     * Whether the axis of the slider is inverted.
     * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
     */
    get _invertAxis(): boolean;
    /** Whether the slider is at its minimum value. */
    get _isMinValue(): boolean;
    /**
     * The amount of space to leave between the slider thumb and the track fill & track background
     * elements.
     */
    get _thumbGap(): 7 | 10 | 0;
    /** CSS styles for the track background element. */
    get _trackBackgroundStyles(): {
        [key: string]: string;
    };
    /** CSS styles for the track fill element. */
    get _trackFillStyles(): {
        [key: string]: string;
    };
    /** CSS styles for the ticks container element. */
    get _ticksContainerStyles(): {
        [key: string]: string;
    };
    /** CSS styles for the ticks element. */
    get _ticksStyles(): {
        [key: string]: string;
    };
    get _thumbContainerStyles(): {
        [key: string]: string;
    };
    /** The size of a tick interval as a percentage of the size of the track. */
    private _tickIntervalPercent;
    /** The dimensions of the slider. */
    private _sliderDimensions;
    private _controlValueAccessorChangeFn;
    /** Decimal places to round to, based on the step amount. */
    private _roundToDecimal;
    /** Subscription to the Directionality change EventEmitter. */
    private _dirChangeSubscription;
    /** The value of the slider when the slide start event fires. */
    private _valueOnSlideStart;
    /** Position of the pointer when the dragging started. */
    private _pointerPositionOnStart;
    /** Reference to the inner slider wrapper element. */
    private _sliderWrapper;
    /**
     * Whether mouse events should be converted to a slider position by calculating their distance
     * from the right or bottom edge of the slider as opposed to the top or left.
     */
    _shouldInvertMouseCoords(): boolean;
    /** The language direction for this slider element. */
    private _getDirection;
    /** Keeps track of the last pointer event that was captured by the slider. */
    private _lastPointerEvent;
    /** Used to subscribe to global move and end events */
    protected _document?: Document;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef, _dir: Directionality, tabIndex: string, _animationMode?: string | undefined, _ngZone?: NgZone | undefined, 
    /** @breaking-change 11.0.0 make document required */
    document?: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    _onMouseenter(): void;
    _onFocus(): void;
    _onBlur(): void;
    _onKeydown(event: KeyboardEvent): void;
    _onKeyup(): void;
    /** Called when the user has put their pointer down on the slider. */
    private _pointerDown;
    /**
     * Called when the user has moved their pointer after
     * starting to drag. Bound on the document level.
     */
    private _pointerMove;
    /** Called when the user has lifted their pointer. Bound on the document level. */
    private _pointerUp;
    /** Called when the window has lost focus. */
    private _windowBlur;
    /** Use defaultView of injected document if available or fallback to global window reference */
    private _getWindow;
    /**
     * Binds our global move and end events. They're bound at the document level and only while
     * dragging so that the user doesn't have to keep their pointer exactly over the slider
     * as they're swiping across the screen.
     */
    private _bindGlobalEvents;
    /** Removes any global event listeners that we may have added. */
    private _removeGlobalEvents;
    /** Increments the slider by the given number of steps (negative number decrements). */
    private _increment;
    /** Calculate the new value from the new physical location. The value will always be snapped. */
    private _updateValueFromPosition;
    /** Emits a change event if the current value is different from the last emitted value. */
    private _emitChangeEvent;
    /** Emits an input event when the current value is different from the last emitted value. */
    private _emitInputEvent;
    /** Updates the amount of space between ticks as a percentage of the width of the slider. */
    private _updateTickIntervalPercent;
    /** Creates a slider change object from the specified value. */
    private _createChangeEvent;
    /** Calculates the percentage of the slider that a value is. */
    private _calculatePercentage;
    /** Calculates the value a percentage of the slider corresponds to. */
    private _calculateValue;
    /** Return a number between two numbers. */
    private _clamp;
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     */
    private _getSliderDimensions;
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     */
    private _focusHostElement;
    /** Blurs the native element. */
    private _blurHostElement;
    /** Runs a callback inside of the NgZone, if possible. */
    private _runInsideZone;
    /** Runs a callback outside of the NgZone, if possible. */
    private _runOutsizeZone;
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    writeValue(value: any): void;
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    static ngAcceptInputType_invert: BooleanInput;
    static ngAcceptInputType_max: NumberInput;
    static ngAcceptInputType_min: NumberInput;
    static ngAcceptInputType_step: NumberInput;
    static ngAcceptInputType_thumbLabel: BooleanInput;
    static ngAcceptInputType_tickInterval: NumberInput;
    static ngAcceptInputType_value: NumberInput;
    static ngAcceptInputType_vertical: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSlider, [null, null, null, { optional: true; }, { attribute: "tabindex"; }, { optional: true; }, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSlider, "mat-slider", ["matSlider"], { "disabled": "disabled"; "color": "color"; "tabIndex": "tabIndex"; "invert": "invert"; "max": "max"; "min": "min"; "value": "value"; "step": "step"; "thumbLabel": "thumbLabel"; "tickInterval": "tickInterval"; "vertical": "vertical"; "displayWith": "displayWith"; }, { "change": "change"; "input": "input"; "valueChange": "valueChange"; }, never, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmQudHMiLCJzb3VyY2VzIjpbInNsaWRlci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgSGFzVGFiSW5kZXgsIEhhc1RhYkluZGV4Q3RvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1hdC1zbGlkZXIgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0gYW5kIFtmb3JtQ29udHJvbF0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9TTElERVJfVkFMVUVfQUNDRVNTT1I6IGFueTtcbi8qKiBBIHNpbXBsZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCBieSB0aGUgTWF0U2xpZGVyIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNsaWRlckNoYW5nZSB7XG4gICAgLyoqIFRoZSBNYXRTbGlkZXIgdGhhdCBjaGFuZ2VkLiAqL1xuICAgIHNvdXJjZTogTWF0U2xpZGVyO1xuICAgIC8qKiBUaGUgbmV3IHZhbHVlIG9mIHRoZSBzb3VyY2Ugc2xpZGVyLiAqL1xuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xufVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0U2xpZGVyQmFzZSB7XG4gICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpO1xufVxuZGVjbGFyZSBjb25zdCBfTWF0U2xpZGVyTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5Db2xvckN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNYXRTbGlkZXJCYXNlO1xuLyoqXG4gKiBBbGxvd3MgdXNlcnMgdG8gc2VsZWN0IGZyb20gYSByYW5nZSBvZiB2YWx1ZXMgYnkgbW92aW5nIHRoZSBzbGlkZXIgdGh1bWIuIEl0IGlzIHNpbWlsYXIgaW5cbiAqIGJlaGF2aW9yIHRvIHRoZSBuYXRpdmUgYDxpbnB1dCB0eXBlPVwicmFuZ2VcIj5gIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNsaWRlciBleHRlbmRzIF9NYXRTbGlkZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBDYW5Db2xvciwgT25Jbml0LCBIYXNUYWJJbmRleCB7XG4gICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yO1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmO1xuICAgIHByaXZhdGUgX2RpcjtcbiAgICBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9uZ1pvbmU/O1xuICAgIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgaW52ZXJ0ZWQuICovXG4gICAgZ2V0IGludmVydCgpOiBib29sZWFuO1xuICAgIHNldCBpbnZlcnQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2ludmVydDtcbiAgICAvKiogVGhlIG1heGltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICAgIGdldCBtYXgoKTogbnVtYmVyO1xuICAgIHNldCBtYXgodjogbnVtYmVyKTtcbiAgICBwcml2YXRlIF9tYXg7XG4gICAgLyoqIFRoZSBtaW5pbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgICBnZXQgbWluKCk6IG51bWJlcjtcbiAgICBzZXQgbWluKHY6IG51bWJlcik7XG4gICAgcHJpdmF0ZSBfbWluO1xuICAgIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gICAgZ2V0IHN0ZXAoKTogbnVtYmVyO1xuICAgIHNldCBzdGVwKHY6IG51bWJlcik7XG4gICAgcHJpdmF0ZSBfc3RlcDtcbiAgICAvKiogV2hldGhlciBvciBub3QgdG8gc2hvdyB0aGUgdGh1bWIgbGFiZWwuICovXG4gICAgZ2V0IHRodW1iTGFiZWwoKTogYm9vbGVhbjtcbiAgICBzZXQgdGh1bWJMYWJlbCh2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfdGh1bWJMYWJlbDtcbiAgICAvKipcbiAgICAgKiBIb3cgb2Z0ZW4gdG8gc2hvdyB0aWNrcy4gUmVsYXRpdmUgdG8gdGhlIHN0ZXAgc28gdGhhdCBhIHRpY2sgYWx3YXlzIGFwcGVhcnMgb24gYSBzdGVwLlxuICAgICAqIEV4OiBUaWNrIGludGVydmFsIG9mIDQgd2l0aCBhIHN0ZXAgb2YgMyB3aWxsIGRyYXcgYSB0aWNrIGV2ZXJ5IDQgc3RlcHMgKGV2ZXJ5IDEyIHZhbHVlcykuXG4gICAgICovXG4gICAgZ2V0IHRpY2tJbnRlcnZhbCgpOiAnYXV0bycgfCBudW1iZXI7XG4gICAgc2V0IHRpY2tJbnRlcnZhbCh2YWx1ZTogJ2F1dG8nIHwgbnVtYmVyKTtcbiAgICBwcml2YXRlIF90aWNrSW50ZXJ2YWw7XG4gICAgLyoqIFZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB8IG51bGw7XG4gICAgc2V0IHZhbHVlKHY6IG51bWJlciB8IG51bGwpO1xuICAgIHByaXZhdGUgX3ZhbHVlO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGZvcm1hdCB0aGUgdmFsdWUgYmVmb3JlIGl0IGlzIGRpc3BsYXllZFxuICAgICAqIGluIHRoZSB0aHVtYiBsYWJlbC4gQ2FuIGJlIHVzZWQgdG8gZm9ybWF0IHZlcnkgbGFyZ2UgbnVtYmVyIGluIG9yZGVyXG4gICAgICogZm9yIHRoZW0gdG8gZml0IGludG8gdGhlIHNsaWRlciB0aHVtYi5cbiAgICAgKi9cbiAgICBkaXNwbGF5V2l0aDogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlcjtcbiAgICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIHZlcnRpY2FsLiAqL1xuICAgIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuO1xuICAgIHNldCB2ZXJ0aWNhbCh2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfdmVydGljYWw7XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuICAgIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT47XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHRodW1iIG1vdmVzLiAqL1xuICAgIHJlYWRvbmx5IGlucHV0OiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPjtcbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNsaWRlciBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXIgfCBudWxsPjtcbiAgICAvKiogVGhlIHZhbHVlIHRvIGJlIHVzZWQgZm9yIGRpc3BsYXkgcHVycG9zZXMuICovXG4gICAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgLyoqIHNldCBmb2N1cyB0byB0aGUgaG9zdCBlbGVtZW50ICovXG4gICAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQ7XG4gICAgLyoqIGJsdXIgdGhlIGhvc3QgZWxlbWVudCAqL1xuICAgIGJsdXIoKTogdm9pZDtcbiAgICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgICBvblRvdWNoZWQ6ICgpID0+IGFueTtcbiAgICAvKiogVGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHNsaWRlciB0aGF0IGNvaW5jaWRlcyB3aXRoIHRoZSB2YWx1ZS4gKi9cbiAgICBnZXQgcGVyY2VudCgpOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfcGVyY2VudDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdGh1bWIgaXMgc2xpZGluZy5cbiAgICAgKiBVc2VkIHRvIGRldGVybWluZSBpZiB0aGVyZSBzaG91bGQgYmUgYSB0cmFuc2l0aW9uIGZvciB0aGUgdGh1bWIgYW5kIGZpbGwgdHJhY2suXG4gICAgICovXG4gICAgX2lzU2xpZGluZzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgc2xpZGVyIGlzIGFjdGl2ZSAoY2xpY2tlZCBvciBzbGlkaW5nKS5cbiAgICAgKiBVc2VkIHRvIHNocmluayBhbmQgZ3JvdyB0aGUgdGh1bWIgYXMgYWNjb3JkaW5nIHRvIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlYy5cbiAgICAgKi9cbiAgICBfaXNBY3RpdmU6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXhpcyBvZiB0aGUgc2xpZGVyIGlzIGludmVydGVkLlxuICAgICAqIChpLmUuIHdoZXRoZXIgbW92aW5nIHRoZSB0aHVtYiBpbiB0aGUgcG9zaXRpdmUgeCBvciB5IGRpcmVjdGlvbiBkZWNyZWFzZXMgdGhlIHNsaWRlcidzIHZhbHVlKS5cbiAgICAgKi9cbiAgICBnZXQgX2ludmVydEF4aXMoKTogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIGF0IGl0cyBtaW5pbXVtIHZhbHVlLiAqL1xuICAgIGdldCBfaXNNaW5WYWx1ZSgpOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFRoZSBhbW91bnQgb2Ygc3BhY2UgdG8gbGVhdmUgYmV0d2VlbiB0aGUgc2xpZGVyIHRodW1iIGFuZCB0aGUgdHJhY2sgZmlsbCAmIHRyYWNrIGJhY2tncm91bmRcbiAgICAgKiBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBnZXQgX3RodW1iR2FwKCk6IDcgfCAxMCB8IDA7XG4gICAgLyoqIENTUyBzdHlsZXMgZm9yIHRoZSB0cmFjayBiYWNrZ3JvdW5kIGVsZW1lbnQuICovXG4gICAgZ2V0IF90cmFja0JhY2tncm91bmRTdHlsZXMoKToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICAvKiogQ1NTIHN0eWxlcyBmb3IgdGhlIHRyYWNrIGZpbGwgZWxlbWVudC4gKi9cbiAgICBnZXQgX3RyYWNrRmlsbFN0eWxlcygpOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIC8qKiBDU1Mgc3R5bGVzIGZvciB0aGUgdGlja3MgY29udGFpbmVyIGVsZW1lbnQuICovXG4gICAgZ2V0IF90aWNrc0NvbnRhaW5lclN0eWxlcygpOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIC8qKiBDU1Mgc3R5bGVzIGZvciB0aGUgdGlja3MgZWxlbWVudC4gKi9cbiAgICBnZXQgX3RpY2tzU3R5bGVzKCk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH07XG4gICAgZ2V0IF90aHVtYkNvbnRhaW5lclN0eWxlcygpOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIC8qKiBUaGUgc2l6ZSBvZiBhIHRpY2sgaW50ZXJ2YWwgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSBzaXplIG9mIHRoZSB0cmFjay4gKi9cbiAgICBwcml2YXRlIF90aWNrSW50ZXJ2YWxQZXJjZW50O1xuICAgIC8qKiBUaGUgZGltZW5zaW9ucyBvZiB0aGUgc2xpZGVyLiAqL1xuICAgIHByaXZhdGUgX3NsaWRlckRpbWVuc2lvbnM7XG4gICAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjtcbiAgICAvKiogRGVjaW1hbCBwbGFjZXMgdG8gcm91bmQgdG8sIGJhc2VkIG9uIHRoZSBzdGVwIGFtb3VudC4gKi9cbiAgICBwcml2YXRlIF9yb3VuZFRvRGVjaW1hbDtcbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRoZSBEaXJlY3Rpb25hbGl0eSBjaGFuZ2UgRXZlbnRFbWl0dGVyLiAqL1xuICAgIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbjtcbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBzbGlkZXIgd2hlbiB0aGUgc2xpZGUgc3RhcnQgZXZlbnQgZmlyZXMuICovXG4gICAgcHJpdmF0ZSBfdmFsdWVPblNsaWRlU3RhcnQ7XG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBwb2ludGVyIHdoZW4gdGhlIGRyYWdnaW5nIHN0YXJ0ZWQuICovXG4gICAgcHJpdmF0ZSBfcG9pbnRlclBvc2l0aW9uT25TdGFydDtcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBpbm5lciBzbGlkZXIgd3JhcHBlciBlbGVtZW50LiAqL1xuICAgIHByaXZhdGUgX3NsaWRlcldyYXBwZXI7XG4gICAgLyoqXG4gICAgICogV2hldGhlciBtb3VzZSBldmVudHMgc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBhIHNsaWRlciBwb3NpdGlvbiBieSBjYWxjdWxhdGluZyB0aGVpciBkaXN0YW5jZVxuICAgICAqIGZyb20gdGhlIHJpZ2h0IG9yIGJvdHRvbSBlZGdlIG9mIHRoZSBzbGlkZXIgYXMgb3Bwb3NlZCB0byB0aGUgdG9wIG9yIGxlZnQuXG4gICAgICovXG4gICAgX3Nob3VsZEludmVydE1vdXNlQ29vcmRzKCk6IGJvb2xlYW47XG4gICAgLyoqIFRoZSBsYW5ndWFnZSBkaXJlY3Rpb24gZm9yIHRoaXMgc2xpZGVyIGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBfZ2V0RGlyZWN0aW9uO1xuICAgIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgbGFzdCBwb2ludGVyIGV2ZW50IHRoYXQgd2FzIGNhcHR1cmVkIGJ5IHRoZSBzbGlkZXIuICovXG4gICAgcHJpdmF0ZSBfbGFzdFBvaW50ZXJFdmVudDtcbiAgICAvKiogVXNlZCB0byBzdWJzY3JpYmUgdG8gZ2xvYmFsIG1vdmUgYW5kIGVuZCBldmVudHMgKi9cbiAgICBwcm90ZWN0ZWQgX2RvY3VtZW50PzogRG9jdW1lbnQ7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBfZGlyOiBEaXJlY3Rpb25hbGl0eSwgdGFiSW5kZXg6IHN0cmluZywgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQsIF9uZ1pvbmU/OiBOZ1pvbmUgfCB1bmRlZmluZWQsIFxuICAgIC8qKiBAYnJlYWtpbmctY2hhbmdlIDExLjAuMCBtYWtlIGRvY3VtZW50IHJlcXVpcmVkICovXG4gICAgZG9jdW1lbnQ/OiBhbnkpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICBfb25Nb3VzZWVudGVyKCk6IHZvaWQ7XG4gICAgX29uRm9jdXMoKTogdm9pZDtcbiAgICBfb25CbHVyKCk6IHZvaWQ7XG4gICAgX29uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQ7XG4gICAgX29uS2V5dXAoKTogdm9pZDtcbiAgICAvKiogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHB1dCB0aGVpciBwb2ludGVyIGRvd24gb24gdGhlIHNsaWRlci4gKi9cbiAgICBwcml2YXRlIF9wb2ludGVyRG93bjtcbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgbW92ZWQgdGhlaXIgcG9pbnRlciBhZnRlclxuICAgICAqIHN0YXJ0aW5nIHRvIGRyYWcuIEJvdW5kIG9uIHRoZSBkb2N1bWVudCBsZXZlbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9wb2ludGVyTW92ZTtcbiAgICAvKiogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIGxpZnRlZCB0aGVpciBwb2ludGVyLiBCb3VuZCBvbiB0aGUgZG9jdW1lbnQgbGV2ZWwuICovXG4gICAgcHJpdmF0ZSBfcG9pbnRlclVwO1xuICAgIC8qKiBDYWxsZWQgd2hlbiB0aGUgd2luZG93IGhhcyBsb3N0IGZvY3VzLiAqL1xuICAgIHByaXZhdGUgX3dpbmRvd0JsdXI7XG4gICAgLyoqIFVzZSBkZWZhdWx0VmlldyBvZiBpbmplY3RlZCBkb2N1bWVudCBpZiBhdmFpbGFibGUgb3IgZmFsbGJhY2sgdG8gZ2xvYmFsIHdpbmRvdyByZWZlcmVuY2UgKi9cbiAgICBwcml2YXRlIF9nZXRXaW5kb3c7XG4gICAgLyoqXG4gICAgICogQmluZHMgb3VyIGdsb2JhbCBtb3ZlIGFuZCBlbmQgZXZlbnRzLiBUaGV5J3JlIGJvdW5kIGF0IHRoZSBkb2N1bWVudCBsZXZlbCBhbmQgb25seSB3aGlsZVxuICAgICAqIGRyYWdnaW5nIHNvIHRoYXQgdGhlIHVzZXIgZG9lc24ndCBoYXZlIHRvIGtlZXAgdGhlaXIgcG9pbnRlciBleGFjdGx5IG92ZXIgdGhlIHNsaWRlclxuICAgICAqIGFzIHRoZXkncmUgc3dpcGluZyBhY3Jvc3MgdGhlIHNjcmVlbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9iaW5kR2xvYmFsRXZlbnRzO1xuICAgIC8qKiBSZW1vdmVzIGFueSBnbG9iYWwgZXZlbnQgbGlzdGVuZXJzIHRoYXQgd2UgbWF5IGhhdmUgYWRkZWQuICovXG4gICAgcHJpdmF0ZSBfcmVtb3ZlR2xvYmFsRXZlbnRzO1xuICAgIC8qKiBJbmNyZW1lbnRzIHRoZSBzbGlkZXIgYnkgdGhlIGdpdmVuIG51bWJlciBvZiBzdGVwcyAobmVnYXRpdmUgbnVtYmVyIGRlY3JlbWVudHMpLiAqL1xuICAgIHByaXZhdGUgX2luY3JlbWVudDtcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBuZXcgdmFsdWUgZnJvbSB0aGUgbmV3IHBoeXNpY2FsIGxvY2F0aW9uLiBUaGUgdmFsdWUgd2lsbCBhbHdheXMgYmUgc25hcHBlZC4gKi9cbiAgICBwcml2YXRlIF91cGRhdGVWYWx1ZUZyb21Qb3NpdGlvbjtcbiAgICAvKiogRW1pdHMgYSBjaGFuZ2UgZXZlbnQgaWYgdGhlIGN1cnJlbnQgdmFsdWUgaXMgZGlmZmVyZW50IGZyb20gdGhlIGxhc3QgZW1pdHRlZCB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQ7XG4gICAgLyoqIEVtaXRzIGFuIGlucHV0IGV2ZW50IHdoZW4gdGhlIGN1cnJlbnQgdmFsdWUgaXMgZGlmZmVyZW50IGZyb20gdGhlIGxhc3QgZW1pdHRlZCB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIF9lbWl0SW5wdXRFdmVudDtcbiAgICAvKiogVXBkYXRlcyB0aGUgYW1vdW50IG9mIHNwYWNlIGJldHdlZW4gdGlja3MgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB3aWR0aCBvZiB0aGUgc2xpZGVyLiAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZVRpY2tJbnRlcnZhbFBlcmNlbnQ7XG4gICAgLyoqIENyZWF0ZXMgYSBzbGlkZXIgY2hhbmdlIG9iamVjdCBmcm9tIHRoZSBzcGVjaWZpZWQgdmFsdWUuICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlQ2hhbmdlRXZlbnQ7XG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHNsaWRlciB0aGF0IGEgdmFsdWUgaXMuICovXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlUGVyY2VudGFnZTtcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgdmFsdWUgYSBwZXJjZW50YWdlIG9mIHRoZSBzbGlkZXIgY29ycmVzcG9uZHMgdG8uICovXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlVmFsdWU7XG4gICAgLyoqIFJldHVybiBhIG51bWJlciBiZXR3ZWVuIHR3byBudW1iZXJzLiAqL1xuICAgIHByaXZhdGUgX2NsYW1wO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgdGhlIHNsaWRlciB0cmFjayBlbGVtZW50LlxuICAgICAqIFRoZSB0cmFjayBpcyB1c2VkIHJhdGhlciB0aGFuIHRoZSBuYXRpdmUgZWxlbWVudCB0byBpZ25vcmUgdGhlIGV4dHJhIHNwYWNlIHRoYXQgdGhlIHRodW1iIGNhblxuICAgICAqIHRha2UgdXAuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0U2xpZGVyRGltZW5zaW9ucztcbiAgICAvKipcbiAgICAgKiBGb2N1c2VzIHRoZSBuYXRpdmUgZWxlbWVudC5cbiAgICAgKiBDdXJyZW50bHkgb25seSB1c2VkIHRvIGFsbG93IGEgYmx1ciBldmVudCB0byBmaXJlIGJ1dCB3aWxsIGJlIHVzZWQgd2l0aCBrZXlib2FyZCBpbnB1dCBsYXRlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9mb2N1c0hvc3RFbGVtZW50O1xuICAgIC8qKiBCbHVycyB0aGUgbmF0aXZlIGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBfYmx1ckhvc3RFbGVtZW50O1xuICAgIC8qKiBSdW5zIGEgY2FsbGJhY2sgaW5zaWRlIG9mIHRoZSBOZ1pvbmUsIGlmIHBvc3NpYmxlLiAqL1xuICAgIHByaXZhdGUgX3J1bkluc2lkZVpvbmU7XG4gICAgLyoqIFJ1bnMgYSBjYWxsYmFjayBvdXRzaWRlIG9mIHRoZSBOZ1pvbmUsIGlmIHBvc3NpYmxlLiAqL1xuICAgIHByaXZhdGUgX3J1bk91dHNpemVab25lO1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgdG91Y2hlZC5cbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW52ZXJ0OiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21pbjogTnVtYmVySW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0ZXA6IE51bWJlcklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90aHVtYkxhYmVsOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RpY2tJbnRlcnZhbDogTnVtYmVySW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZhbHVlOiBOdW1iZXJJbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==