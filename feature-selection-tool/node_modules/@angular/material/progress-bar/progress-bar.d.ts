/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NumberInput } from '@angular/cdk/coercion';
import { AfterViewInit, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy } from '@angular/core';
import { CanColor, CanColorCtor } from '@angular/material/core';
/** Last animation end data. */
import * as ɵngcc0 from '@angular/core';
export interface ProgressAnimationEnd {
    value: number;
}
/** @docs-private */
declare class MatProgressBarBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatProgressBarMixinBase: CanColorCtor & typeof MatProgressBarBase;
/**
 * Injection token used to provide the current location to `MatProgressBar`.
 * Used to handle server-side rendering and to stub out during unit tests.
 * @docs-private
 */
export declare const MAT_PROGRESS_BAR_LOCATION: InjectionToken<MatProgressBarLocation>;
/**
 * Stubbed out location for `MatProgressBar`.
 * @docs-private
 */
export interface MatProgressBarLocation {
    getPathname: () => string;
}
/** @docs-private */
export declare function MAT_PROGRESS_BAR_LOCATION_FACTORY(): MatProgressBarLocation;
export declare type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';
/**
 * `<mat-progress-bar>` component.
 */
export declare class MatProgressBar extends _MatProgressBarMixinBase implements CanColor, AfterViewInit, OnDestroy {
    _elementRef: ElementRef;
    private _ngZone;
    _animationMode?: string | undefined;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _animationMode?: string | undefined, 
    /**
     * @deprecated `location` parameter to be made required.
     * @breaking-change 8.0.0
     */
    location?: MatProgressBarLocation);
    /** Flag that indicates whether NoopAnimations mode is set to true. */
    _isNoopAnimation: boolean;
    /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
    get value(): number;
    set value(v: number);
    private _value;
    /** Buffer value of the progress bar. Defaults to zero. */
    get bufferValue(): number;
    set bufferValue(v: number);
    private _bufferValue;
    _primaryValueBar: ElementRef;
    /**
     * Event emitted when animation of the primary progress bar completes. This event will not
     * be emitted when animations are disabled, nor will it be emitted for modes with continuous
     * animations (indeterminate and query).
     */
    animationEnd: EventEmitter<ProgressAnimationEnd>;
    /** Reference to animation end subscription to be unsubscribed on destroy. */
    private _animationEndSubscription;
    /**
     * Mode of the progress bar.
     *
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
     * 'determinate'.
     * Mirrored to mode attribute.
     */
    mode: ProgressBarMode;
    /** ID of the progress bar. */
    progressbarId: string;
    /** Attribute to be used for the `fill` attribute on the internal `rect` element. */
    _rectangleFillValue: string;
    /** Gets the current transform value for the progress bar's primary indicator. */
    _primaryTransform(): {
        transform: string;
    };
    /**
     * Gets the current transform value for the progress bar's buffer indicator. Only used if the
     * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
     */
    _bufferTransform(): {
        transform: string;
    } | null;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_value: NumberInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatProgressBar, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatProgressBar, "mat-progress-bar", ["matProgressBar"], { "color": "color"; "mode": "mode"; "value": "value"; "bufferValue": "bufferValue"; }, { "animationEnd": "animationEnd"; }, never, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmQudHMiLCJzb3VyY2VzIjpbInByb2dyZXNzLWJhci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbi8qKiBMYXN0IGFuaW1hdGlvbiBlbmQgZGF0YS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3Jlc3NBbmltYXRpb25FbmQge1xuICAgIHZhbHVlOiBudW1iZXI7XG59XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZGVjbGFyZSBjbGFzcyBNYXRQcm9ncmVzc0JhckJhc2Uge1xuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKTtcbn1cbmRlY2xhcmUgY29uc3QgX01hdFByb2dyZXNzQmFyTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWF0UHJvZ3Jlc3NCYXJCYXNlO1xuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBjdXJyZW50IGxvY2F0aW9uIHRvIGBNYXRQcm9ncmVzc0JhcmAuXG4gKiBVc2VkIHRvIGhhbmRsZSBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgYW5kIHRvIHN0dWIgb3V0IGR1cmluZyB1bml0IHRlc3RzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfUFJPR1JFU1NfQkFSX0xPQ0FUSU9OOiBJbmplY3Rpb25Ub2tlbjxNYXRQcm9ncmVzc0JhckxvY2F0aW9uPjtcbi8qKlxuICogU3R1YmJlZCBvdXQgbG9jYXRpb24gZm9yIGBNYXRQcm9ncmVzc0JhcmAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0UHJvZ3Jlc3NCYXJMb2NhdGlvbiB7XG4gICAgZ2V0UGF0aG5hbWU6ICgpID0+IHN0cmluZztcbn1cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBNQVRfUFJPR1JFU1NfQkFSX0xPQ0FUSU9OX0ZBQ1RPUlkoKTogTWF0UHJvZ3Jlc3NCYXJMb2NhdGlvbjtcbmV4cG9ydCBkZWNsYXJlIHR5cGUgUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJyB8ICdidWZmZXInIHwgJ3F1ZXJ5Jztcbi8qKlxuICogYDxtYXQtcHJvZ3Jlc3MtYmFyPmAgY29tcG9uZW50LlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRQcm9ncmVzc0JhciBleHRlbmRzIF9NYXRQcm9ncmVzc0Jhck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX25nWm9uZTtcbiAgICBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgX25nWm9uZTogTmdab25lLCBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZCwgXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgYGxvY2F0aW9uYCBwYXJhbWV0ZXIgdG8gYmUgbWFkZSByZXF1aXJlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wXG4gICAgICovXG4gICAgbG9jYXRpb24/OiBNYXRQcm9ncmVzc0JhckxvY2F0aW9uKTtcbiAgICAvKiogRmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIE5vb3BBbmltYXRpb25zIG1vZGUgaXMgc2V0IHRvIHRydWUuICovXG4gICAgX2lzTm9vcEFuaW1hdGlvbjogYm9vbGVhbjtcbiAgICAvKiogVmFsdWUgb2YgdGhlIHByb2dyZXNzIGJhci4gRGVmYXVsdHMgdG8gemVyby4gTWlycm9yZWQgdG8gYXJpYS12YWx1ZW5vdy4gKi9cbiAgICBnZXQgdmFsdWUoKTogbnVtYmVyO1xuICAgIHNldCB2YWx1ZSh2OiBudW1iZXIpO1xuICAgIHByaXZhdGUgX3ZhbHVlO1xuICAgIC8qKiBCdWZmZXIgdmFsdWUgb2YgdGhlIHByb2dyZXNzIGJhci4gRGVmYXVsdHMgdG8gemVyby4gKi9cbiAgICBnZXQgYnVmZmVyVmFsdWUoKTogbnVtYmVyO1xuICAgIHNldCBidWZmZXJWYWx1ZSh2OiBudW1iZXIpO1xuICAgIHByaXZhdGUgX2J1ZmZlclZhbHVlO1xuICAgIF9wcmltYXJ5VmFsdWVCYXI6IEVsZW1lbnRSZWY7XG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGFuaW1hdGlvbiBvZiB0aGUgcHJpbWFyeSBwcm9ncmVzcyBiYXIgY29tcGxldGVzLiBUaGlzIGV2ZW50IHdpbGwgbm90XG4gICAgICogYmUgZW1pdHRlZCB3aGVuIGFuaW1hdGlvbnMgYXJlIGRpc2FibGVkLCBub3Igd2lsbCBpdCBiZSBlbWl0dGVkIGZvciBtb2RlcyB3aXRoIGNvbnRpbnVvdXNcbiAgICAgKiBhbmltYXRpb25zIChpbmRldGVybWluYXRlIGFuZCBxdWVyeSkuXG4gICAgICovXG4gICAgYW5pbWF0aW9uRW5kOiBFdmVudEVtaXR0ZXI8UHJvZ3Jlc3NBbmltYXRpb25FbmQ+O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gYW5pbWF0aW9uIGVuZCBzdWJzY3JpcHRpb24gdG8gYmUgdW5zdWJzY3JpYmVkIG9uIGRlc3Ryb3kuICovXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uO1xuICAgIC8qKlxuICAgICAqIE1vZGUgb2YgdGhlIHByb2dyZXNzIGJhci5cbiAgICAgKlxuICAgICAqIElucHV0IG11c3QgYmUgb25lIG9mIHRoZXNlIHZhbHVlczogZGV0ZXJtaW5hdGUsIGluZGV0ZXJtaW5hdGUsIGJ1ZmZlciwgcXVlcnksIGRlZmF1bHRzIHRvXG4gICAgICogJ2RldGVybWluYXRlJy5cbiAgICAgKiBNaXJyb3JlZCB0byBtb2RlIGF0dHJpYnV0ZS5cbiAgICAgKi9cbiAgICBtb2RlOiBQcm9ncmVzc0Jhck1vZGU7XG4gICAgLyoqIElEIG9mIHRoZSBwcm9ncmVzcyBiYXIuICovXG4gICAgcHJvZ3Jlc3NiYXJJZDogc3RyaW5nO1xuICAgIC8qKiBBdHRyaWJ1dGUgdG8gYmUgdXNlZCBmb3IgdGhlIGBmaWxsYCBhdHRyaWJ1dGUgb24gdGhlIGludGVybmFsIGByZWN0YCBlbGVtZW50LiAqL1xuICAgIF9yZWN0YW5nbGVGaWxsVmFsdWU6IHN0cmluZztcbiAgICAvKiogR2V0cyB0aGUgY3VycmVudCB0cmFuc2Zvcm0gdmFsdWUgZm9yIHRoZSBwcm9ncmVzcyBiYXIncyBwcmltYXJ5IGluZGljYXRvci4gKi9cbiAgICBfcHJpbWFyeVRyYW5zZm9ybSgpOiB7XG4gICAgICAgIHRyYW5zZm9ybTogc3RyaW5nO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB0cmFuc2Zvcm0gdmFsdWUgZm9yIHRoZSBwcm9ncmVzcyBiYXIncyBidWZmZXIgaW5kaWNhdG9yLiBPbmx5IHVzZWQgaWYgdGhlXG4gICAgICogcHJvZ3Jlc3MgbW9kZSBpcyBzZXQgdG8gYnVmZmVyLCBvdGhlcndpc2UgcmV0dXJucyBhbiB1bmRlZmluZWQsIGNhdXNpbmcgbm8gdHJhbnNmb3JtYXRpb24uXG4gICAgICovXG4gICAgX2J1ZmZlclRyYW5zZm9ybSgpOiB7XG4gICAgICAgIHRyYW5zZm9ybTogc3RyaW5nO1xuICAgIH0gfCBudWxsO1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZhbHVlOiBOdW1iZXJJbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==