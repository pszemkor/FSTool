/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEvent } from '@angular/animations';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, ElementRef, InjectionToken, NgZone, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
/** Possible positions for a tooltip. */
import * as ɵngcc0 from '@angular/core';
export declare type TooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
/**
 * Options for how the tooltip trigger should handle touch gestures.
 * See `MatTooltip.touchGestures` for more information.
 */
export declare type TooltipTouchGestures = 'auto' | 'on' | 'off';
/** Possible visibility states of a tooltip. */
export declare type TooltipVisibility = 'initial' | 'visible' | 'hidden';
/** Time in ms to throttle repositioning after scroll events. */
export declare const SCROLL_THROTTLE_MS = 20;
/** CSS class that will be attached to the overlay panel. */
export declare const TOOLTIP_PANEL_CLASS = "mat-tooltip-panel";
/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @docs-private
 */
export declare function getMatTooltipInvalidPositionError(position: string): Error;
/** Injection token that determines the scroll handling while a tooltip is visible. */
export declare const MAT_TOOLTIP_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY;
};
/** Default `matTooltip` options that can be overridden. */
export interface MatTooltipDefaultOptions {
    showDelay: number;
    hideDelay: number;
    touchendHideDelay: number;
    touchGestures?: TooltipTouchGestures;
    position?: TooltipPosition;
}
/** Injection token to be used to override the default options for `matTooltip`. */
export declare const MAT_TOOLTIP_DEFAULT_OPTIONS: InjectionToken<MatTooltipDefaultOptions>;
/** @docs-private */
export declare function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY(): MatTooltipDefaultOptions;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
export declare class MatTooltip implements OnDestroy, OnInit {
    private _overlay;
    private _elementRef;
    private _scrollDispatcher;
    private _viewContainerRef;
    private _ngZone;
    private _platform;
    private _ariaDescriber;
    private _focusMonitor;
    private _dir;
    private _defaultOptions;
    _overlayRef: OverlayRef | null;
    _tooltipInstance: TooltipComponent | null;
    private _portal;
    private _position;
    private _disabled;
    private _tooltipClass;
    private _scrollStrategy;
    /** Allows the user to define the position of the tooltip relative to the parent element */
    get position(): TooltipPosition;
    set position(value: TooltipPosition);
    /** Disables the display of the tooltip. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** The default delay in ms before showing the tooltip after show is called */
    showDelay: number;
    /** The default delay in ms before hiding the tooltip after hide is called */
    hideDelay: number;
    /**
     * How touch gestures should be handled by the tooltip. On touch devices the tooltip directive
     * uses a long press gesture to show and hide, however it can conflict with the native browser
     * gestures. To work around the conflict, Angular Material disables native gestures on the
     * trigger, but that might not be desirable on particular elements (e.g. inputs and draggable
     * elements). The different values for this option configure the touch event handling as follows:
     * - `auto` - Enables touch gestures for all elements, but tries to avoid conflicts with native
     *   browser gestures on particular elements. In particular, it allows text selection on inputs
     *   and textareas, and preserves the native browser dragging on elements marked as `draggable`.
     * - `on` - Enables touch gestures for all elements and disables native
     *   browser gestures with no exceptions.
     * - `off` - Disables touch gestures. Note that this will prevent the tooltip from
     *   showing on touch devices.
     */
    touchGestures: TooltipTouchGestures;
    /** The message to be displayed in the tooltip */
    get message(): string;
    set message(value: string);
    private _message;
    /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
    get tooltipClass(): string | string[] | Set<string> | {
        [key: string]: any;
    };
    set tooltipClass(value: string | string[] | Set<string> | {
        [key: string]: any;
    });
    /** Manually-bound passive event listeners. */
    private _passiveListeners;
    /** Timer started at the last `touchstart` event. */
    private _touchstartTimeout;
    /** Emits when the component is destroyed. */
    private readonly _destroyed;
    constructor(_overlay: Overlay, _elementRef: ElementRef<HTMLElement>, _scrollDispatcher: ScrollDispatcher, _viewContainerRef: ViewContainerRef, _ngZone: NgZone, _platform: Platform, _ariaDescriber: AriaDescriber, _focusMonitor: FocusMonitor, scrollStrategy: any, _dir: Directionality, _defaultOptions: MatTooltipDefaultOptions, 
    /**
     * @deprecated _hammerLoader parameter to be removed.
     * @breaking-change 9.0.0
     */
    _hammerLoader?: any);
    /**
     * Setup styling-specific things
     */
    ngOnInit(): void;
    /**
     * Dispose the tooltip when destroyed.
     */
    ngOnDestroy(): void;
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    show(delay?: number): void;
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    hide(delay?: number): void;
    /** Shows/hides the tooltip */
    toggle(): void;
    /** Returns true if the tooltip is currently visible to the user */
    _isTooltipVisible(): boolean;
    /**
     * Handles the keydown events on the host element.
     * Needs to be an arrow function so that we can use it in addEventListener.
     */
    private _handleKeydown;
    /** Create the overlay config and position strategy */
    private _createOverlay;
    /** Detaches the currently-attached tooltip. */
    private _detach;
    /** Updates the position of the current tooltip. */
    private _updatePosition;
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    _getOrigin(): {
        main: OriginConnectionPosition;
        fallback: OriginConnectionPosition;
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    _getOverlayPosition(): {
        main: OverlayConnectionPosition;
        fallback: OverlayConnectionPosition;
    };
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    private _updateTooltipMessage;
    /** Updates the tooltip class */
    private _setTooltipClass;
    /** Inverts an overlay position. */
    private _invertPosition;
    /** Binds the pointer events to the tooltip trigger. */
    private _setupPointerEvents;
    /** Disables the native browser gestures, based on how the tooltip has been configured. */
    private _disableNativeGesturesIfNecessary;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_hideDelay: NumberInput;
    static ngAcceptInputType_showDelay: NumberInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatTooltip, [null, null, null, null, null, null, null, null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatTooltip, "[matTooltip]", ["matTooltip"], { "showDelay": "matTooltipShowDelay"; "hideDelay": "matTooltipHideDelay"; "touchGestures": "matTooltipTouchGestures"; "position": "matTooltipPosition"; "disabled": "matTooltipDisabled"; "message": "matTooltip"; "tooltipClass": "matTooltipClass"; }, {}, never>;
}
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export declare class TooltipComponent implements OnDestroy {
    private _changeDetectorRef;
    private _breakpointObserver;
    /** Message to display in the tooltip */
    message: string;
    /** Classes to be added to the tooltip. Supports the same syntax as `ngClass`. */
    tooltipClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /** The timeout ID of any current timer set to show the tooltip */
    _showTimeoutId: number | null;
    /** The timeout ID of any current timer set to hide the tooltip */
    _hideTimeoutId: number | null;
    /** Property watched by the animation framework to show or hide the tooltip */
    _visibility: TooltipVisibility;
    /** Whether interactions on the page should close the tooltip */
    private _closeOnInteraction;
    /** Subject for notifying that the tooltip has been hidden from the view */
    private readonly _onHide;
    /** Stream that emits whether the user has a handset-sized display.  */
    _isHandset: Observable<BreakpointState>;
    constructor(_changeDetectorRef: ChangeDetectorRef, _breakpointObserver: BreakpointObserver);
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    show(delay: number): void;
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    hide(delay: number): void;
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden(): Observable<void>;
    /** Whether the tooltip is being displayed. */
    isVisible(): boolean;
    ngOnDestroy(): void;
    _animationStart(): void;
    _animationDone(event: AnimationEvent): void;
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.io/design/components/tooltips.html#behavior
     */
    _handleBodyInteraction(): void;
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    _markForCheck(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TooltipComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TooltipComponent, "mat-tooltip-component", never, {}, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kLnRzIiwic291cmNlcyI6WyJ0b29sdGlwLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQXJpYURlc2NyaWJlciwgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciwgQnJlYWtwb2ludFN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sIE92ZXJsYXksIE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24sIE92ZXJsYXlSZWYsIFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG4vKiogUG9zc2libGUgcG9zaXRpb25zIGZvciBhIHRvb2x0aXAuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIFRvb2x0aXBQb3NpdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAnYWJvdmUnIHwgJ2JlbG93JyB8ICdiZWZvcmUnIHwgJ2FmdGVyJztcbi8qKlxuICogT3B0aW9ucyBmb3IgaG93IHRoZSB0b29sdGlwIHRyaWdnZXIgc2hvdWxkIGhhbmRsZSB0b3VjaCBnZXN0dXJlcy5cbiAqIFNlZSBgTWF0VG9vbHRpcC50b3VjaEdlc3R1cmVzYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgdHlwZSBUb29sdGlwVG91Y2hHZXN0dXJlcyA9ICdhdXRvJyB8ICdvbicgfCAnb2ZmJztcbi8qKiBQb3NzaWJsZSB2aXNpYmlsaXR5IHN0YXRlcyBvZiBhIHRvb2x0aXAuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIFRvb2x0aXBWaXNpYmlsaXR5ID0gJ2luaXRpYWwnIHwgJ3Zpc2libGUnIHwgJ2hpZGRlbic7XG4vKiogVGltZSBpbiBtcyB0byB0aHJvdHRsZSByZXBvc2l0aW9uaW5nIGFmdGVyIHNjcm9sbCBldmVudHMuICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBTQ1JPTExfVEhST1RUTEVfTVMgPSAyMDtcbi8qKiBDU1MgY2xhc3MgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgVE9PTFRJUF9QQU5FTF9DTEFTUyA9IFwibWF0LXRvb2x0aXAtcGFuZWxcIjtcbi8qKlxuICogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCB0b29sdGlwIHBvc2l0aW9uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBnZXRNYXRUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZyk6IEVycm9yO1xuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSBhIHRvb2x0aXAgaXMgdmlzaWJsZS4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWTogSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUjoge1xuICAgIHByb3ZpZGU6IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PjtcbiAgICBkZXBzOiAodHlwZW9mIE92ZXJsYXkpW107XG4gICAgdXNlRmFjdG9yeTogdHlwZW9mIE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZO1xufTtcbi8qKiBEZWZhdWx0IGBtYXRUb29sdGlwYCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucyB7XG4gICAgc2hvd0RlbGF5OiBudW1iZXI7XG4gICAgaGlkZURlbGF5OiBudW1iZXI7XG4gICAgdG91Y2hlbmRIaWRlRGVsYXk6IG51bWJlcjtcbiAgICB0b3VjaEdlc3R1cmVzPzogVG9vbHRpcFRvdWNoR2VzdHVyZXM7XG4gICAgcG9zaXRpb24/OiBUb29sdGlwUG9zaXRpb247XG59XG4vKiogSW5qZWN0aW9uIHRva2VuIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgYG1hdFRvb2x0aXBgLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnM+O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucztcbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYXR0YWNoZXMgYSBtYXRlcmlhbCBkZXNpZ24gdG9vbHRpcCB0byB0aGUgaG9zdCBlbGVtZW50LiBBbmltYXRlcyB0aGUgc2hvd2luZyBhbmRcbiAqIGhpZGluZyBvZiBhIHRvb2x0aXAgcHJvdmlkZWQgcG9zaXRpb24gKGRlZmF1bHRzIHRvIGJlbG93IHRoZSBlbGVtZW50KS5cbiAqXG4gKiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3Rvb2x0aXBzLmh0bWxcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0VG9vbHRpcCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgICBwcml2YXRlIF9vdmVybGF5O1xuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfc2Nyb2xsRGlzcGF0Y2hlcjtcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmO1xuICAgIHByaXZhdGUgX25nWm9uZTtcbiAgICBwcml2YXRlIF9wbGF0Zm9ybTtcbiAgICBwcml2YXRlIF9hcmlhRGVzY3JpYmVyO1xuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjtcbiAgICBwcml2YXRlIF9kaXI7XG4gICAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM7XG4gICAgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICAgIF90b29sdGlwSW5zdGFuY2U6IFRvb2x0aXBDb21wb25lbnQgfCBudWxsO1xuICAgIHByaXZhdGUgX3BvcnRhbDtcbiAgICBwcml2YXRlIF9wb3NpdGlvbjtcbiAgICBwcml2YXRlIF9kaXNhYmxlZDtcbiAgICBwcml2YXRlIF90b29sdGlwQ2xhc3M7XG4gICAgcHJpdmF0ZSBfc2Nyb2xsU3RyYXRlZ3k7XG4gICAgLyoqIEFsbG93cyB0aGUgdXNlciB0byBkZWZpbmUgdGhlIHBvc2l0aW9uIG9mIHRoZSB0b29sdGlwIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQgZWxlbWVudCAqL1xuICAgIGdldCBwb3NpdGlvbigpOiBUb29sdGlwUG9zaXRpb247XG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBUb29sdGlwUG9zaXRpb24pO1xuICAgIC8qKiBEaXNhYmxlcyB0aGUgZGlzcGxheSBvZiB0aGUgdG9vbHRpcC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIC8qKiBUaGUgZGVmYXVsdCBkZWxheSBpbiBtcyBiZWZvcmUgc2hvd2luZyB0aGUgdG9vbHRpcCBhZnRlciBzaG93IGlzIGNhbGxlZCAqL1xuICAgIHNob3dEZWxheTogbnVtYmVyO1xuICAgIC8qKiBUaGUgZGVmYXVsdCBkZWxheSBpbiBtcyBiZWZvcmUgaGlkaW5nIHRoZSB0b29sdGlwIGFmdGVyIGhpZGUgaXMgY2FsbGVkICovXG4gICAgaGlkZURlbGF5OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogSG93IHRvdWNoIGdlc3R1cmVzIHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoZSB0b29sdGlwLiBPbiB0b3VjaCBkZXZpY2VzIHRoZSB0b29sdGlwIGRpcmVjdGl2ZVxuICAgICAqIHVzZXMgYSBsb25nIHByZXNzIGdlc3R1cmUgdG8gc2hvdyBhbmQgaGlkZSwgaG93ZXZlciBpdCBjYW4gY29uZmxpY3Qgd2l0aCB0aGUgbmF0aXZlIGJyb3dzZXJcbiAgICAgKiBnZXN0dXJlcy4gVG8gd29yayBhcm91bmQgdGhlIGNvbmZsaWN0LCBBbmd1bGFyIE1hdGVyaWFsIGRpc2FibGVzIG5hdGl2ZSBnZXN0dXJlcyBvbiB0aGVcbiAgICAgKiB0cmlnZ2VyLCBidXQgdGhhdCBtaWdodCBub3QgYmUgZGVzaXJhYmxlIG9uIHBhcnRpY3VsYXIgZWxlbWVudHMgKGUuZy4gaW5wdXRzIGFuZCBkcmFnZ2FibGVcbiAgICAgKiBlbGVtZW50cykuIFRoZSBkaWZmZXJlbnQgdmFsdWVzIGZvciB0aGlzIG9wdGlvbiBjb25maWd1cmUgdGhlIHRvdWNoIGV2ZW50IGhhbmRsaW5nIGFzIGZvbGxvd3M6XG4gICAgICogLSBgYXV0b2AgLSBFbmFibGVzIHRvdWNoIGdlc3R1cmVzIGZvciBhbGwgZWxlbWVudHMsIGJ1dCB0cmllcyB0byBhdm9pZCBjb25mbGljdHMgd2l0aCBuYXRpdmVcbiAgICAgKiAgIGJyb3dzZXIgZ2VzdHVyZXMgb24gcGFydGljdWxhciBlbGVtZW50cy4gSW4gcGFydGljdWxhciwgaXQgYWxsb3dzIHRleHQgc2VsZWN0aW9uIG9uIGlucHV0c1xuICAgICAqICAgYW5kIHRleHRhcmVhcywgYW5kIHByZXNlcnZlcyB0aGUgbmF0aXZlIGJyb3dzZXIgZHJhZ2dpbmcgb24gZWxlbWVudHMgbWFya2VkIGFzIGBkcmFnZ2FibGVgLlxuICAgICAqIC0gYG9uYCAtIEVuYWJsZXMgdG91Y2ggZ2VzdHVyZXMgZm9yIGFsbCBlbGVtZW50cyBhbmQgZGlzYWJsZXMgbmF0aXZlXG4gICAgICogICBicm93c2VyIGdlc3R1cmVzIHdpdGggbm8gZXhjZXB0aW9ucy5cbiAgICAgKiAtIGBvZmZgIC0gRGlzYWJsZXMgdG91Y2ggZ2VzdHVyZXMuIE5vdGUgdGhhdCB0aGlzIHdpbGwgcHJldmVudCB0aGUgdG9vbHRpcCBmcm9tXG4gICAgICogICBzaG93aW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAgICovXG4gICAgdG91Y2hHZXN0dXJlczogVG9vbHRpcFRvdWNoR2VzdHVyZXM7XG4gICAgLyoqIFRoZSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdG9vbHRpcCAqL1xuICAgIGdldCBtZXNzYWdlKCk6IHN0cmluZztcbiAgICBzZXQgbWVzc2FnZSh2YWx1ZTogc3RyaW5nKTtcbiAgICBwcml2YXRlIF9tZXNzYWdlO1xuICAgIC8qKiBDbGFzc2VzIHRvIGJlIHBhc3NlZCB0byB0aGUgdG9vbHRpcC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgICBnZXQgdG9vbHRpcENsYXNzKCk6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgICB9O1xuICAgIHNldCB0b29sdGlwQ2xhc3ModmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgICB9KTtcbiAgICAvKiogTWFudWFsbHktYm91bmQgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMuICovXG4gICAgcHJpdmF0ZSBfcGFzc2l2ZUxpc3RlbmVycztcbiAgICAvKiogVGltZXIgc3RhcnRlZCBhdCB0aGUgbGFzdCBgdG91Y2hzdGFydGAgZXZlbnQuICovXG4gICAgcHJpdmF0ZSBfdG91Y2hzdGFydFRpbWVvdXQ7XG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVzdHJveWVkO1xuICAgIGNvbnN0cnVjdG9yKF9vdmVybGF5OiBPdmVybGF5LCBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIF9zY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLCBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgX25nWm9uZTogTmdab25lLCBfcGxhdGZvcm06IFBsYXRmb3JtLCBfYXJpYURlc2NyaWJlcjogQXJpYURlc2NyaWJlciwgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBzY3JvbGxTdHJhdGVneTogYW55LCBfZGlyOiBEaXJlY3Rpb25hbGl0eSwgX2RlZmF1bHRPcHRpb25zOiBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsIFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIF9oYW1tZXJMb2FkZXIgcGFyYW1ldGVyIHRvIGJlIHJlbW92ZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSA5LjAuMFxuICAgICAqL1xuICAgIF9oYW1tZXJMb2FkZXI/OiBhbnkpO1xuICAgIC8qKlxuICAgICAqIFNldHVwIHN0eWxpbmctc3BlY2lmaWMgdGhpbmdzXG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIHRoZSB0b29sdGlwIHdoZW4gZGVzdHJveWVkLlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgLyoqIFNob3dzIHRoZSB0b29sdGlwIGFmdGVyIHRoZSBkZWxheSBpbiBtcywgZGVmYXVsdHMgdG8gdG9vbHRpcC1kZWxheS1zaG93IG9yIDBtcyBpZiBubyBpbnB1dCAqL1xuICAgIHNob3coZGVsYXk/OiBudW1iZXIpOiB2b2lkO1xuICAgIC8qKiBIaWRlcyB0aGUgdG9vbHRpcCBhZnRlciB0aGUgZGVsYXkgaW4gbXMsIGRlZmF1bHRzIHRvIHRvb2x0aXAtZGVsYXktaGlkZSBvciAwbXMgaWYgbm8gaW5wdXQgKi9cbiAgICBoaWRlKGRlbGF5PzogbnVtYmVyKTogdm9pZDtcbiAgICAvKiogU2hvd3MvaGlkZXMgdGhlIHRvb2x0aXAgKi9cbiAgICB0b2dnbGUoKTogdm9pZDtcbiAgICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSB0b29sdGlwIGlzIGN1cnJlbnRseSB2aXNpYmxlIHRvIHRoZSB1c2VyICovXG4gICAgX2lzVG9vbHRpcFZpc2libGUoKTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBrZXlkb3duIGV2ZW50cyBvbiB0aGUgaG9zdCBlbGVtZW50LlxuICAgICAqIE5lZWRzIHRvIGJlIGFuIGFycm93IGZ1bmN0aW9uIHNvIHRoYXQgd2UgY2FuIHVzZSBpdCBpbiBhZGRFdmVudExpc3RlbmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2hhbmRsZUtleWRvd247XG4gICAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb25maWcgYW5kIHBvc2l0aW9uIHN0cmF0ZWd5ICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheTtcbiAgICAvKiogRGV0YWNoZXMgdGhlIGN1cnJlbnRseS1hdHRhY2hlZCB0b29sdGlwLiAqL1xuICAgIHByaXZhdGUgX2RldGFjaDtcbiAgICAvKiogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgdG9vbHRpcC4gKi9cbiAgICBwcml2YXRlIF91cGRhdGVQb3NpdGlvbjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvcmlnaW4gcG9zaXRpb24gYW5kIGEgZmFsbGJhY2sgcG9zaXRpb24gYmFzZWQgb24gdGhlIHVzZXIncyBwb3NpdGlvbiBwcmVmZXJlbmNlLlxuICAgICAqIFRoZSBmYWxsYmFjayBwb3NpdGlvbiBpcyB0aGUgaW52ZXJzZSBvZiB0aGUgb3JpZ2luIChlLmcuIGAnYmVsb3cnIC0+ICdhYm92ZSdgKS5cbiAgICAgKi9cbiAgICBfZ2V0T3JpZ2luKCk6IHtcbiAgICAgICAgbWFpbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uO1xuICAgICAgICBmYWxsYmFjazogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgdGhlIG92ZXJsYXkgcG9zaXRpb24gYW5kIGEgZmFsbGJhY2sgcG9zaXRpb24gYmFzZWQgb24gdGhlIHVzZXIncyBwcmVmZXJlbmNlICovXG4gICAgX2dldE92ZXJsYXlQb3NpdGlvbigpOiB7XG4gICAgICAgIG1haW46IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb247XG4gICAgICAgIGZhbGxiYWNrOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uO1xuICAgIH07XG4gICAgLyoqIFVwZGF0ZXMgdGhlIHRvb2x0aXAgbWVzc2FnZSBhbmQgcmVwb3NpdGlvbnMgdGhlIG92ZXJsYXkgYWNjb3JkaW5nIHRvIHRoZSBuZXcgbWVzc2FnZSBsZW5ndGggKi9cbiAgICBwcml2YXRlIF91cGRhdGVUb29sdGlwTWVzc2FnZTtcbiAgICAvKiogVXBkYXRlcyB0aGUgdG9vbHRpcCBjbGFzcyAqL1xuICAgIHByaXZhdGUgX3NldFRvb2x0aXBDbGFzcztcbiAgICAvKiogSW52ZXJ0cyBhbiBvdmVybGF5IHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgX2ludmVydFBvc2l0aW9uO1xuICAgIC8qKiBCaW5kcyB0aGUgcG9pbnRlciBldmVudHMgdG8gdGhlIHRvb2x0aXAgdHJpZ2dlci4gKi9cbiAgICBwcml2YXRlIF9zZXR1cFBvaW50ZXJFdmVudHM7XG4gICAgLyoqIERpc2FibGVzIHRoZSBuYXRpdmUgYnJvd3NlciBnZXN0dXJlcywgYmFzZWQgb24gaG93IHRoZSB0b29sdGlwIGhhcyBiZWVuIGNvbmZpZ3VyZWQuICovXG4gICAgcHJpdmF0ZSBfZGlzYWJsZU5hdGl2ZUdlc3R1cmVzSWZOZWNlc3Nhcnk7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZGVEZWxheTogTnVtYmVySW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3Nob3dEZWxheTogTnVtYmVySW5wdXQ7XG59XG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHRoZSB0b29sdGlwJ3MgY29udGVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgVG9vbHRpcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfYnJlYWtwb2ludE9ic2VydmVyO1xuICAgIC8qKiBNZXNzYWdlIHRvIGRpc3BsYXkgaW4gdGhlIHRvb2x0aXAgKi9cbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgLyoqIENsYXNzZXMgdG8gYmUgYWRkZWQgdG8gdGhlIHRvb2x0aXAuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gICAgdG9vbHRpcENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnk7XG4gICAgfTtcbiAgICAvKiogVGhlIHRpbWVvdXQgSUQgb2YgYW55IGN1cnJlbnQgdGltZXIgc2V0IHRvIHNob3cgdGhlIHRvb2x0aXAgKi9cbiAgICBfc2hvd1RpbWVvdXRJZDogbnVtYmVyIHwgbnVsbDtcbiAgICAvKiogVGhlIHRpbWVvdXQgSUQgb2YgYW55IGN1cnJlbnQgdGltZXIgc2V0IHRvIGhpZGUgdGhlIHRvb2x0aXAgKi9cbiAgICBfaGlkZVRpbWVvdXRJZDogbnVtYmVyIHwgbnVsbDtcbiAgICAvKiogUHJvcGVydHkgd2F0Y2hlZCBieSB0aGUgYW5pbWF0aW9uIGZyYW1ld29yayB0byBzaG93IG9yIGhpZGUgdGhlIHRvb2x0aXAgKi9cbiAgICBfdmlzaWJpbGl0eTogVG9vbHRpcFZpc2liaWxpdHk7XG4gICAgLyoqIFdoZXRoZXIgaW50ZXJhY3Rpb25zIG9uIHRoZSBwYWdlIHNob3VsZCBjbG9zZSB0aGUgdG9vbHRpcCAqL1xuICAgIHByaXZhdGUgX2Nsb3NlT25JbnRlcmFjdGlvbjtcbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdGhlIHZpZXcgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9vbkhpZGU7XG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIGEgaGFuZHNldC1zaXplZCBkaXNwbGF5LiAgKi9cbiAgICBfaXNIYW5kc2V0OiBPYnNlcnZhYmxlPEJyZWFrcG9pbnRTdGF0ZT47XG4gICAgY29uc3RydWN0b3IoX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgX2JyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyKTtcbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgdG9vbHRpcCB3aXRoIGFuIGFuaW1hdGlvbiBvcmlnaW5hdGluZyBmcm9tIHRoZSBwcm92aWRlZCBvcmlnaW5cbiAgICAgKiBAcGFyYW0gZGVsYXkgQW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byB0aGUgZGVsYXkgc2hvd2luZyB0aGUgdG9vbHRpcC5cbiAgICAgKi9cbiAgICBzaG93KGRlbGF5OiBudW1iZXIpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEJlZ2lucyB0aGUgYW5pbWF0aW9uIHRvIGhpZGUgdGhlIHRvb2x0aXAgYWZ0ZXIgdGhlIHByb3ZpZGVkIGRlbGF5IGluIG1zLlxuICAgICAqIEBwYXJhbSBkZWxheSBBbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IHNob3dpbmcgdGhlIHRvb2x0aXAuXG4gICAgICovXG4gICAgaGlkZShkZWxheTogbnVtYmVyKTogdm9pZDtcbiAgICAvKiogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3LiAqL1xuICAgIGFmdGVySGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD47XG4gICAgLyoqIFdoZXRoZXIgdGhlIHRvb2x0aXAgaXMgYmVpbmcgZGlzcGxheWVkLiAqL1xuICAgIGlzVmlzaWJsZSgpOiBib29sZWFuO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgX2FuaW1hdGlvblN0YXJ0KCk6IHZvaWQ7XG4gICAgX2FuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBJbnRlcmFjdGlvbnMgb24gdGhlIEhUTUwgYm9keSBzaG91bGQgY2xvc2UgdGhlIHRvb2x0aXAgaW1tZWRpYXRlbHkgYXMgZGVmaW5lZCBpbiB0aGVcbiAgICAgKiBtYXRlcmlhbCBkZXNpZ24gc3BlYy5cbiAgICAgKiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3Rvb2x0aXBzLmh0bWwjYmVoYXZpb3JcbiAgICAgKi9cbiAgICBfaGFuZGxlQm9keUludGVyYWN0aW9uKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogTWFya3MgdGhhdCB0aGUgdG9vbHRpcCBuZWVkcyB0byBiZSBjaGVja2VkIGluIHRoZSBuZXh0IGNoYW5nZSBkZXRlY3Rpb24gcnVuLlxuICAgICAqIE1haW5seSB1c2VkIGZvciByZW5kZXJpbmcgdGhlIGluaXRpYWwgdGV4dCBiZWZvcmUgcG9zaXRpb25pbmcgYSB0b29sdGlwLCB3aGljaFxuICAgICAqIGNhbiBiZSBwcm9ibGVtYXRpYyBpbiBjb21wb25lbnRzIHdpdGggT25QdXNoIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICovXG4gICAgX21hcmtGb3JDaGVjaygpOiB2b2lkO1xufVxuIl19