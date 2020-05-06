/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ElementRef, InjectionToken, NgZone, OnDestroy, OnInit } from '@angular/core';
import { RippleRef } from './ripple-ref';
import { RippleAnimationConfig, RippleConfig, RippleTarget } from './ripple-renderer';
/** Configurable options for `matRipple`. */
import * as ɵngcc0 from '@angular/core';
export interface RippleGlobalOptions {
    /**
     * Whether ripples should be disabled. Ripples can be still launched manually by using
     * the `launch()` method. Therefore focus indicators will still show up.
     */
    disabled?: boolean;
    /**
     * Configuration for the animation duration of the ripples. There are two phases with different
     * durations for the ripples. The animation durations will be overwritten if the
     * `NoopAnimationsModule` is being used.
     */
    animation?: RippleAnimationConfig;
    /**
     * Whether ripples should start fading out immediately after the mouse or touch is released. By
     * default, ripples will wait for the enter animation to complete and for mouse or touch release.
     */
    terminateOnPointerUp?: boolean;
}
/** Injection token that can be used to specify the global ripple options. */
export declare const MAT_RIPPLE_GLOBAL_OPTIONS: InjectionToken<RippleGlobalOptions>;
export declare class MatRipple implements OnInit, OnDestroy, RippleTarget {
    private _elementRef;
    private _animationMode?;
    /** Custom color for all ripples. */
    color: string;
    /** Whether the ripples should be visible outside the component's bounds. */
    unbounded: boolean;
    /**
     * Whether the ripple always originates from the center of the host element's bounds, rather
     * than originating from the location of the click event.
     */
    centered: boolean;
    /**
     * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
     * will be the distance from the center of the ripple to the furthest corner of the host element's
     * bounding rectangle.
     */
    radius: number;
    /**
     * Configuration for the ripple animation. Allows modifying the enter and exit animation
     * duration of the ripples. The animation durations will be overwritten if the
     * `NoopAnimationsModule` is being used.
     */
    animation: RippleAnimationConfig;
    /**
     * Whether click events will not trigger the ripple. Ripples can be still launched manually
     * by using the `launch()` method.
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /**
     * The element that triggers the ripple when click events are received.
     * Defaults to the directive's host element.
     */
    get trigger(): HTMLElement;
    set trigger(trigger: HTMLElement);
    private _trigger;
    /** Renderer for the ripple DOM manipulations. */
    private _rippleRenderer;
    /** Options that are set globally for all ripples. */
    private _globalOptions;
    /** Whether ripple directive is initialized and the input bindings are set. */
    private _isInitialized;
    constructor(_elementRef: ElementRef<HTMLElement>, ngZone: NgZone, platform: Platform, globalOptions?: RippleGlobalOptions, _animationMode?: string | undefined);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Fades out all currently showing ripple elements. */
    fadeOutAll(): void;
    /**
     * Ripple configuration from the directive's input values.
     * @docs-private Implemented as part of RippleTarget
     */
    get rippleConfig(): RippleConfig;
    /**
     * Whether ripples on pointer-down are disabled or not.
     * @docs-private Implemented as part of RippleTarget
     */
    get rippleDisabled(): boolean;
    /** Sets up the trigger event listeners if ripples are enabled. */
    private _setupTriggerEventsIfEnabled;
    /**
     * Launches a manual ripple using the specified ripple configuration.
     * @param config Configuration for the manual ripple.
     */
    launch(config: RippleConfig): RippleRef;
    /**
     * Launches a manual ripple at the specified coordinates within the element.
     * @param x Coordinate within the element, along the X axis at which to fade-in the ripple.
     * @param y Coordinate within the element, along the Y axis at which to fade-in the ripple.
     * @param config Optional ripple configuration for the manual ripple.
     */
    launch(x: number, y: number, config?: RippleConfig): RippleRef;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatRipple, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatRipple, "[mat-ripple], [matRipple]", ["matRipple"], { "radius": "matRippleRadius"; "disabled": "matRippleDisabled"; "trigger": "matRippleTrigger"; "color": "matRippleColor"; "unbounded": "matRippleUnbounded"; "centered": "matRippleCentered"; "animation": "matRippleAnimation"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLmQudHMiLCJzb3VyY2VzIjpbInJpcHBsZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmlwcGxlUmVmIH0gZnJvbSAnLi9yaXBwbGUtcmVmJztcbmltcG9ydCB7IFJpcHBsZUFuaW1hdGlvbkNvbmZpZywgUmlwcGxlQ29uZmlnLCBSaXBwbGVUYXJnZXQgfSBmcm9tICcuL3JpcHBsZS1yZW5kZXJlcic7XG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIGBtYXRSaXBwbGVgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBSaXBwbGVHbG9iYWxPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJpcHBsZXMgc2hvdWxkIGJlIGRpc2FibGVkLiBSaXBwbGVzIGNhbiBiZSBzdGlsbCBsYXVuY2hlZCBtYW51YWxseSBieSB1c2luZ1xuICAgICAqIHRoZSBgbGF1bmNoKClgIG1ldGhvZC4gVGhlcmVmb3JlIGZvY3VzIGluZGljYXRvcnMgd2lsbCBzdGlsbCBzaG93IHVwLlxuICAgICAqL1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb25maWd1cmF0aW9uIGZvciB0aGUgYW5pbWF0aW9uIGR1cmF0aW9uIG9mIHRoZSByaXBwbGVzLiBUaGVyZSBhcmUgdHdvIHBoYXNlcyB3aXRoIGRpZmZlcmVudFxuICAgICAqIGR1cmF0aW9ucyBmb3IgdGhlIHJpcHBsZXMuIFRoZSBhbmltYXRpb24gZHVyYXRpb25zIHdpbGwgYmUgb3ZlcndyaXR0ZW4gaWYgdGhlXG4gICAgICogYE5vb3BBbmltYXRpb25zTW9kdWxlYCBpcyBiZWluZyB1c2VkLlxuICAgICAqL1xuICAgIGFuaW1hdGlvbj86IFJpcHBsZUFuaW1hdGlvbkNvbmZpZztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJpcHBsZXMgc2hvdWxkIHN0YXJ0IGZhZGluZyBvdXQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIG1vdXNlIG9yIHRvdWNoIGlzIHJlbGVhc2VkLiBCeVxuICAgICAqIGRlZmF1bHQsIHJpcHBsZXMgd2lsbCB3YWl0IGZvciB0aGUgZW50ZXIgYW5pbWF0aW9uIHRvIGNvbXBsZXRlIGFuZCBmb3IgbW91c2Ugb3IgdG91Y2ggcmVsZWFzZS5cbiAgICAgKi9cbiAgICB0ZXJtaW5hdGVPblBvaW50ZXJVcD86IGJvb2xlYW47XG59XG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSB0aGUgZ2xvYmFsIHJpcHBsZSBvcHRpb25zLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUzogSW5qZWN0aW9uVG9rZW48UmlwcGxlR2xvYmFsT3B0aW9ucz47XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRSaXBwbGUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUmlwcGxlVGFyZ2V0IHtcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX2FuaW1hdGlvbk1vZGU/O1xuICAgIC8qKiBDdXN0b20gY29sb3IgZm9yIGFsbCByaXBwbGVzLiAqL1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgLyoqIFdoZXRoZXIgdGhlIHJpcHBsZXMgc2hvdWxkIGJlIHZpc2libGUgb3V0c2lkZSB0aGUgY29tcG9uZW50J3MgYm91bmRzLiAqL1xuICAgIHVuYm91bmRlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSByaXBwbGUgYWx3YXlzIG9yaWdpbmF0ZXMgZnJvbSB0aGUgY2VudGVyIG9mIHRoZSBob3N0IGVsZW1lbnQncyBib3VuZHMsIHJhdGhlclxuICAgICAqIHRoYW4gb3JpZ2luYXRpbmcgZnJvbSB0aGUgbG9jYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxuICAgICAqL1xuICAgIGNlbnRlcmVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIElmIHNldCwgdGhlIHJhZGl1cyBpbiBwaXhlbHMgb2YgZm9yZWdyb3VuZCByaXBwbGVzIHdoZW4gZnVsbHkgZXhwYW5kZWQuIElmIHVuc2V0LCB0aGUgcmFkaXVzXG4gICAgICogd2lsbCBiZSB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgY2VudGVyIG9mIHRoZSByaXBwbGUgdG8gdGhlIGZ1cnRoZXN0IGNvcm5lciBvZiB0aGUgaG9zdCBlbGVtZW50J3NcbiAgICAgKiBib3VuZGluZyByZWN0YW5nbGUuXG4gICAgICovXG4gICAgcmFkaXVzOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uIEFsbG93cyBtb2RpZnlpbmcgdGhlIGVudGVyIGFuZCBleGl0IGFuaW1hdGlvblxuICAgICAqIGR1cmF0aW9uIG9mIHRoZSByaXBwbGVzLiBUaGUgYW5pbWF0aW9uIGR1cmF0aW9ucyB3aWxsIGJlIG92ZXJ3cml0dGVuIGlmIHRoZVxuICAgICAqIGBOb29wQW5pbWF0aW9uc01vZHVsZWAgaXMgYmVpbmcgdXNlZC5cbiAgICAgKi9cbiAgICBhbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGNsaWNrIGV2ZW50cyB3aWxsIG5vdCB0cmlnZ2VyIHRoZSByaXBwbGUuIFJpcHBsZXMgY2FuIGJlIHN0aWxsIGxhdW5jaGVkIG1hbnVhbGx5XG4gICAgICogYnkgdXNpbmcgdGhlIGBsYXVuY2goKWAgbWV0aG9kLlxuICAgICAqL1xuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuO1xuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIGVsZW1lbnQgdGhhdCB0cmlnZ2VycyB0aGUgcmlwcGxlIHdoZW4gY2xpY2sgZXZlbnRzIGFyZSByZWNlaXZlZC5cbiAgICAgKiBEZWZhdWx0cyB0byB0aGUgZGlyZWN0aXZlJ3MgaG9zdCBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCB0cmlnZ2VyKCk6IEhUTUxFbGVtZW50O1xuICAgIHNldCB0cmlnZ2VyKHRyaWdnZXI6IEhUTUxFbGVtZW50KTtcbiAgICBwcml2YXRlIF90cmlnZ2VyO1xuICAgIC8qKiBSZW5kZXJlciBmb3IgdGhlIHJpcHBsZSBET00gbWFuaXB1bGF0aW9ucy4gKi9cbiAgICBwcml2YXRlIF9yaXBwbGVSZW5kZXJlcjtcbiAgICAvKiogT3B0aW9ucyB0aGF0IGFyZSBzZXQgZ2xvYmFsbHkgZm9yIGFsbCByaXBwbGVzLiAqL1xuICAgIHByaXZhdGUgX2dsb2JhbE9wdGlvbnM7XG4gICAgLyoqIFdoZXRoZXIgcmlwcGxlIGRpcmVjdGl2ZSBpcyBpbml0aWFsaXplZCBhbmQgdGhlIGlucHV0IGJpbmRpbmdzIGFyZSBzZXQuICovXG4gICAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDtcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIG5nWm9uZTogTmdab25lLCBwbGF0Zm9ybTogUGxhdGZvcm0sIGdsb2JhbE9wdGlvbnM/OiBSaXBwbGVHbG9iYWxPcHRpb25zLCBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZCk7XG4gICAgbmdPbkluaXQoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBGYWRlcyBvdXQgYWxsIGN1cnJlbnRseSBzaG93aW5nIHJpcHBsZSBlbGVtZW50cy4gKi9cbiAgICBmYWRlT3V0QWxsKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogUmlwcGxlIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgZGlyZWN0aXZlJ3MgaW5wdXQgdmFsdWVzLlxuICAgICAqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBSaXBwbGVUYXJnZXRcbiAgICAgKi9cbiAgICBnZXQgcmlwcGxlQ29uZmlnKCk6IFJpcHBsZUNvbmZpZztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJpcHBsZXMgb24gcG9pbnRlci1kb3duIGFyZSBkaXNhYmxlZCBvciBub3QuXG4gICAgICogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIFJpcHBsZVRhcmdldFxuICAgICAqL1xuICAgIGdldCByaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuO1xuICAgIC8qKiBTZXRzIHVwIHRoZSB0cmlnZ2VyIGV2ZW50IGxpc3RlbmVycyBpZiByaXBwbGVzIGFyZSBlbmFibGVkLiAqL1xuICAgIHByaXZhdGUgX3NldHVwVHJpZ2dlckV2ZW50c0lmRW5hYmxlZDtcbiAgICAvKipcbiAgICAgKiBMYXVuY2hlcyBhIG1hbnVhbCByaXBwbGUgdXNpbmcgdGhlIHNwZWNpZmllZCByaXBwbGUgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBtYW51YWwgcmlwcGxlLlxuICAgICAqL1xuICAgIGxhdW5jaChjb25maWc6IFJpcHBsZUNvbmZpZyk6IFJpcHBsZVJlZjtcbiAgICAvKipcbiAgICAgKiBMYXVuY2hlcyBhIG1hbnVhbCByaXBwbGUgYXQgdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcyB3aXRoaW4gdGhlIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHggQ29vcmRpbmF0ZSB3aXRoaW4gdGhlIGVsZW1lbnQsIGFsb25nIHRoZSBYIGF4aXMgYXQgd2hpY2ggdG8gZmFkZS1pbiB0aGUgcmlwcGxlLlxuICAgICAqIEBwYXJhbSB5IENvb3JkaW5hdGUgd2l0aGluIHRoZSBlbGVtZW50LCBhbG9uZyB0aGUgWSBheGlzIGF0IHdoaWNoIHRvIGZhZGUtaW4gdGhlIHJpcHBsZS5cbiAgICAgKiBAcGFyYW0gY29uZmlnIE9wdGlvbmFsIHJpcHBsZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbWFudWFsIHJpcHBsZS5cbiAgICAgKi9cbiAgICBsYXVuY2goeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbmZpZz86IFJpcHBsZUNvbmZpZyk6IFJpcHBsZVJlZjtcbn1cbiJdfQ==