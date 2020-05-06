/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEvent } from '@angular/animations';
import { FocusMonitor, FocusOrigin, FocusTrapFactory } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { CdkScrollable, ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, QueryList } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/**
 * Throws an exception when two MatDrawer are matching the same position.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare function throwMatDuplicatedDrawerError(position: string): void;
/** Result of the toggle promise that indicates the state of the drawer. */
export declare type MatDrawerToggleResult = 'open' | 'close';
/** Drawer and SideNav display modes. */
export declare type MatDrawerMode = 'over' | 'push' | 'side';
/** Configures whether drawers should use auto sizing by default. */
export declare const MAT_DRAWER_DEFAULT_AUTOSIZE: InjectionToken<boolean>;
/**
 * Used to provide a drawer container to a drawer while avoiding circular references.
 * @docs-private
 */
export declare const MAT_DRAWER_CONTAINER: InjectionToken<unknown>;
/** @docs-private */
export declare function MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY(): boolean;
export declare class MatDrawerContent extends CdkScrollable implements AfterContentInit {
    private _changeDetectorRef;
    _container: MatDrawerContainer;
    constructor(_changeDetectorRef: ChangeDetectorRef, _container: MatDrawerContainer, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDrawerContent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatDrawerContent, "mat-drawer-content", never, {}, {}, never, ["*"]>;
}
/**
 * This component corresponds to a drawer that can be opened on the drawer container.
 */
export declare class MatDrawer implements AfterContentInit, AfterContentChecked, OnDestroy {
    private _elementRef;
    private _focusTrapFactory;
    private _focusMonitor;
    private _platform;
    private _ngZone;
    private _doc;
    /**
     * @deprecated `_container` parameter to be made required.
     * @breaking-change 10.0.0
     */
    _container?: MatDrawerContainer | undefined;
    private _focusTrap;
    private _elementFocusedBeforeDrawerWasOpened;
    /** Whether the drawer is initialized. Used for disabling the initial animation. */
    private _enableAnimations;
    /** The side that the drawer is attached to. */
    get position(): 'start' | 'end';
    set position(value: 'start' | 'end');
    private _position;
    /** Mode of the drawer; one of 'over', 'push' or 'side'. */
    get mode(): MatDrawerMode;
    set mode(value: MatDrawerMode);
    private _mode;
    /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
    get disableClose(): boolean;
    set disableClose(value: boolean);
    private _disableClose;
    /**
     * Whether the drawer should focus the first focusable element automatically when opened.
     * Defaults to false in when `mode` is set to `side`, otherwise defaults to `true`. If explicitly
     * enabled, focus will be moved into the sidenav in `side` mode as well.
     */
    get autoFocus(): boolean;
    set autoFocus(value: boolean);
    private _autoFocus;
    /**
     * Whether the drawer is opened. We overload this because we trigger an event when it
     * starts or end.
     */
    get opened(): boolean;
    set opened(value: boolean);
    private _opened;
    /** How the sidenav was opened (keypress, mouse click etc.) */
    private _openedVia;
    /** Emits whenever the drawer has started animating. */
    _animationStarted: Subject<AnimationEvent>;
    /** Emits whenever the drawer is done animating. */
    _animationEnd: Subject<AnimationEvent>;
    /** Current state of the sidenav animation. */
    _animationState: 'open-instant' | 'open' | 'void';
    /** Event emitted when the drawer open state is changed. */
    readonly openedChange: EventEmitter<boolean>;
    /** Event emitted when the drawer has been opened. */
    get _openedStream(): Observable<void>;
    /** Event emitted when the drawer has started opening. */
    get openedStart(): Observable<void>;
    /** Event emitted when the drawer has been closed. */
    get _closedStream(): Observable<void>;
    /** Event emitted when the drawer has started closing. */
    get closedStart(): Observable<void>;
    /** Emits when the component is destroyed. */
    private readonly _destroyed;
    /** Event emitted when the drawer's position changes. */
    onPositionChanged: EventEmitter<void>;
    /**
     * An observable that emits when the drawer mode changes. This is used by the drawer container to
     * to know when to when the mode changes so it can adapt the margins on the content.
     */
    readonly _modeChanged: Subject<void>;
    constructor(_elementRef: ElementRef<HTMLElement>, _focusTrapFactory: FocusTrapFactory, _focusMonitor: FocusMonitor, _platform: Platform, _ngZone: NgZone, _doc: any, 
    /**
     * @deprecated `_container` parameter to be made required.
     * @breaking-change 10.0.0
     */
    _container?: MatDrawerContainer | undefined);
    /**
     * Moves focus into the drawer. Note that this works even if
     * the focus trap is disabled in `side` mode.
     */
    private _takeFocus;
    /**
     * If focus is currently inside the drawer, restores it to where it was before the drawer
     * opened.
     */
    private _restoreFocus;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Open the drawer.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    open(openedVia?: FocusOrigin): Promise<MatDrawerToggleResult>;
    /** Close the drawer. */
    close(): Promise<MatDrawerToggleResult>;
    /**
     * Toggle this drawer.
     * @param isOpen Whether the drawer should be open.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    toggle(isOpen?: boolean, openedVia?: FocusOrigin): Promise<MatDrawerToggleResult>;
    get _width(): number;
    /** Updates the enabled state of the focus trap. */
    private _updateFocusTrapState;
    _animationStartListener(event: AnimationEvent): void;
    _animationDoneListener(event: AnimationEvent): void;
    static ngAcceptInputType_disableClose: BooleanInput;
    static ngAcceptInputType_autoFocus: BooleanInput;
    static ngAcceptInputType_opened: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDrawer, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatDrawer, "mat-drawer", ["matDrawer"], { "position": "position"; "mode": "mode"; "disableClose": "disableClose"; "autoFocus": "autoFocus"; "opened": "opened"; }, { "openedChange": "openedChange"; "onPositionChanged": "positionChanged"; "_openedStream": "opened"; "openedStart": "openedStart"; "_closedStream": "closed"; "closedStart": "closedStart"; }, never, ["*"]>;
}
/**
 * `<mat-drawer-container>` component.
 *
 * This is the parent component to one or two `<mat-drawer>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
export declare class MatDrawerContainer implements AfterContentInit, DoCheck, OnDestroy {
    private _dir;
    private _element;
    private _ngZone;
    private _changeDetectorRef;
    private _animationMode?;
    /** All drawers in the container. Includes drawers from inside nested containers. */
    _allDrawers: QueryList<MatDrawer>;
    /** Drawers that belong to this container. */
    _drawers: QueryList<MatDrawer>;
    _content: MatDrawerContent;
    _userContent: MatDrawerContent;
    /** The drawer child with the `start` position. */
    get start(): MatDrawer | null;
    /** The drawer child with the `end` position. */
    get end(): MatDrawer | null;
    /**
     * Whether to automatically resize the container whenever
     * the size of any of its drawers changes.
     *
     * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
     * the drawers on every change detection cycle. Can be configured globally via the
     * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
     */
    get autosize(): boolean;
    set autosize(value: boolean);
    private _autosize;
    /**
     * Whether the drawer container should have a backdrop while one of the sidenavs is open.
     * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
     * mode as well.
     */
    get hasBackdrop(): any;
    set hasBackdrop(value: any);
    _backdropOverride: boolean | null;
    /** Event emitted when the drawer backdrop is clicked. */
    readonly backdropClick: EventEmitter<void>;
    /** The drawer at the start/end position, independent of direction. */
    private _start;
    private _end;
    /**
     * The drawer at the left/right. When direction changes, these will change as well.
     * They're used as aliases for the above to set the left/right style properly.
     * In LTR, _left == _start and _right == _end.
     * In RTL, _left == _end and _right == _start.
     */
    private _left;
    private _right;
    /** Emits when the component is destroyed. */
    private readonly _destroyed;
    /** Emits on every ngDoCheck. Used for debouncing reflows. */
    private readonly _doCheckSubject;
    /**
     * Margins to be applied to the content. These are used to push / shrink the drawer content when a
     * drawer is open. We use margin rather than transform even for push mode because transform breaks
     * fixed position elements inside of the transformed element.
     */
    _contentMargins: {
        left: number | null;
        right: number | null;
    };
    readonly _contentMarginChanges: Subject<{
        left: number | null;
        right: number | null;
    }>;
    /** Reference to the CdkScrollable instance that wraps the scrollable content. */
    get scrollable(): CdkScrollable;
    constructor(_dir: Directionality, _element: ElementRef<HTMLElement>, _ngZone: NgZone, _changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, defaultAutosize?: boolean, _animationMode?: string | undefined);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Calls `open` of both start and end drawers */
    open(): void;
    /** Calls `close` of both start and end drawers */
    close(): void;
    /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     */
    updateContentMargins(): void;
    ngDoCheck(): void;
    /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     */
    private _watchDrawerToggle;
    /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     */
    private _watchDrawerPosition;
    /** Subscribes to changes in drawer mode so we can run change detection. */
    private _watchDrawerMode;
    /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
    private _setContainerClass;
    /** Validate the state of the drawer children components. */
    private _validateDrawers;
    /** Whether the container is being pushed to the side by one of the drawers. */
    private _isPushed;
    _onBackdropClicked(): void;
    _closeModalDrawer(): void;
    _isShowingBackdrop(): boolean;
    private _canHaveBackdrop;
    private _isDrawerOpen;
    static ngAcceptInputType_autosize: BooleanInput;
    static ngAcceptInputType_hasBackdrop: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDrawerContainer, [{ optional: true; }, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatDrawerContainer, "mat-drawer-container", ["matDrawerContainer"], { "autosize": "autosize"; "hasBackdrop": "hasBackdrop"; }, { "backdropClick": "backdropClick"; }, ["_content", "_allDrawers"], ["mat-drawer", "mat-drawer-content", "*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmQudHMiLCJzb3VyY2VzIjpbImRyYXdlci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4sIEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDZGtTY3JvbGxhYmxlLCBTY3JvbGxEaXNwYXRjaGVyLCBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgRG9DaGVjaywgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHdoZW4gdHdvIE1hdERyYXdlciBhcmUgbWF0Y2hpbmcgdGhlIHNhbWUgcG9zaXRpb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHRocm93TWF0RHVwbGljYXRlZERyYXdlckVycm9yKHBvc2l0aW9uOiBzdHJpbmcpOiB2b2lkO1xuLyoqIFJlc3VsdCBvZiB0aGUgdG9nZ2xlIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgdGhlIHN0YXRlIG9mIHRoZSBkcmF3ZXIuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIE1hdERyYXdlclRvZ2dsZVJlc3VsdCA9ICdvcGVuJyB8ICdjbG9zZSc7XG4vKiogRHJhd2VyIGFuZCBTaWRlTmF2IGRpc3BsYXkgbW9kZXMuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIE1hdERyYXdlck1vZGUgPSAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZSc7XG4vKiogQ29uZmlndXJlcyB3aGV0aGVyIGRyYXdlcnMgc2hvdWxkIHVzZSBhdXRvIHNpemluZyBieSBkZWZhdWx0LiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0RSQVdFUl9ERUZBVUxUX0FVVE9TSVpFOiBJbmplY3Rpb25Ub2tlbjxib29sZWFuPjtcbi8qKlxuICogVXNlZCB0byBwcm92aWRlIGEgZHJhd2VyIGNvbnRhaW5lciB0byBhIGRyYXdlciB3aGlsZSBhdm9pZGluZyBjaXJjdWxhciByZWZlcmVuY2VzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfRFJBV0VSX0NPTlRBSU5FUjogSW5qZWN0aW9uVG9rZW48dW5rbm93bj47XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gTUFUX0RSQVdFUl9ERUZBVUxUX0FVVE9TSVpFX0ZBQ1RPUlkoKTogYm9vbGVhbjtcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdERyYXdlckNvbnRlbnQgZXh0ZW5kcyBDZGtTY3JvbGxhYmxlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgX2NvbnRhaW5lcjogTWF0RHJhd2VyQ29udGFpbmVyO1xuICAgIGNvbnN0cnVjdG9yKF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIF9jb250YWluZXI6IE1hdERyYXdlckNvbnRhaW5lciwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsIG5nWm9uZTogTmdab25lKTtcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcbn1cbi8qKlxuICogVGhpcyBjb21wb25lbnQgY29ycmVzcG9uZHMgdG8gYSBkcmF3ZXIgdGhhdCBjYW4gYmUgb3BlbmVkIG9uIHRoZSBkcmF3ZXIgY29udGFpbmVyLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXREcmF3ZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfZm9jdXNUcmFwRmFjdG9yeTtcbiAgICBwcml2YXRlIF9mb2N1c01vbml0b3I7XG4gICAgcHJpdmF0ZSBfcGxhdGZvcm07XG4gICAgcHJpdmF0ZSBfbmdab25lO1xuICAgIHByaXZhdGUgX2RvYztcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBgX2NvbnRhaW5lcmAgcGFyYW1ldGVyIHRvIGJlIG1hZGUgcmVxdWlyZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxMC4wLjBcbiAgICAgKi9cbiAgICBfY29udGFpbmVyPzogTWF0RHJhd2VyQ29udGFpbmVyIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgX2ZvY3VzVHJhcDtcbiAgICBwcml2YXRlIF9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZDtcbiAgICAvKiogV2hldGhlciB0aGUgZHJhd2VyIGlzIGluaXRpYWxpemVkLiBVc2VkIGZvciBkaXNhYmxpbmcgdGhlIGluaXRpYWwgYW5pbWF0aW9uLiAqL1xuICAgIHByaXZhdGUgX2VuYWJsZUFuaW1hdGlvbnM7XG4gICAgLyoqIFRoZSBzaWRlIHRoYXQgdGhlIGRyYXdlciBpcyBhdHRhY2hlZCB0by4gKi9cbiAgICBnZXQgcG9zaXRpb24oKTogJ3N0YXJ0JyB8ICdlbmQnO1xuICAgIHNldCBwb3NpdGlvbih2YWx1ZTogJ3N0YXJ0JyB8ICdlbmQnKTtcbiAgICBwcml2YXRlIF9wb3NpdGlvbjtcbiAgICAvKiogTW9kZSBvZiB0aGUgZHJhd2VyOyBvbmUgb2YgJ292ZXInLCAncHVzaCcgb3IgJ3NpZGUnLiAqL1xuICAgIGdldCBtb2RlKCk6IE1hdERyYXdlck1vZGU7XG4gICAgc2V0IG1vZGUodmFsdWU6IE1hdERyYXdlck1vZGUpO1xuICAgIHByaXZhdGUgX21vZGU7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyYXdlciBjYW4gYmUgY2xvc2VkIHdpdGggdGhlIGVzY2FwZSBrZXkgb3IgYnkgY2xpY2tpbmcgb24gdGhlIGJhY2tkcm9wLiAqL1xuICAgIGdldCBkaXNhYmxlQ2xvc2UoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZUNsb3NlKHZhbHVlOiBib29sZWFuKTtcbiAgICBwcml2YXRlIF9kaXNhYmxlQ2xvc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZHJhd2VyIHNob3VsZCBmb2N1cyB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgYXV0b21hdGljYWxseSB3aGVuIG9wZW5lZC5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZSBpbiB3aGVuIGBtb2RlYCBpcyBzZXQgdG8gYHNpZGVgLCBvdGhlcndpc2UgZGVmYXVsdHMgdG8gYHRydWVgLiBJZiBleHBsaWNpdGx5XG4gICAgICogZW5hYmxlZCwgZm9jdXMgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBzaWRlbmF2IGluIGBzaWRlYCBtb2RlIGFzIHdlbGwuXG4gICAgICovXG4gICAgZ2V0IGF1dG9Gb2N1cygpOiBib29sZWFuO1xuICAgIHNldCBhdXRvRm9jdXModmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2F1dG9Gb2N1cztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBkcmF3ZXIgaXMgb3BlbmVkLiBXZSBvdmVybG9hZCB0aGlzIGJlY2F1c2Ugd2UgdHJpZ2dlciBhbiBldmVudCB3aGVuIGl0XG4gICAgICogc3RhcnRzIG9yIGVuZC5cbiAgICAgKi9cbiAgICBnZXQgb3BlbmVkKCk6IGJvb2xlYW47XG4gICAgc2V0IG9wZW5lZCh2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfb3BlbmVkO1xuICAgIC8qKiBIb3cgdGhlIHNpZGVuYXYgd2FzIG9wZW5lZCAoa2V5cHJlc3MsIG1vdXNlIGNsaWNrIGV0Yy4pICovXG4gICAgcHJpdmF0ZSBfb3BlbmVkVmlhO1xuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgZHJhd2VyIGhhcyBzdGFydGVkIGFuaW1hdGluZy4gKi9cbiAgICBfYW5pbWF0aW9uU3RhcnRlZDogU3ViamVjdDxBbmltYXRpb25FdmVudD47XG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBkcmF3ZXIgaXMgZG9uZSBhbmltYXRpbmcuICovXG4gICAgX2FuaW1hdGlvbkVuZDogU3ViamVjdDxBbmltYXRpb25FdmVudD47XG4gICAgLyoqIEN1cnJlbnQgc3RhdGUgb2YgdGhlIHNpZGVuYXYgYW5pbWF0aW9uLiAqL1xuICAgIF9hbmltYXRpb25TdGF0ZTogJ29wZW4taW5zdGFudCcgfCAnb3BlbicgfCAndm9pZCc7XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyIG9wZW4gc3RhdGUgaXMgY2hhbmdlZC4gKi9cbiAgICByZWFkb25seSBvcGVuZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAgIGdldCBfb3BlbmVkU3RyZWFtKCk6IE9ic2VydmFibGU8dm9pZD47XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyIGhhcyBzdGFydGVkIG9wZW5pbmcuICovXG4gICAgZ2V0IG9wZW5lZFN0YXJ0KCk6IE9ic2VydmFibGU8dm9pZD47XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyIGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgICBnZXQgX2Nsb3NlZFN0cmVhbSgpOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBoYXMgc3RhcnRlZCBjbG9zaW5nLiAqL1xuICAgIGdldCBjbG9zZWRTdGFydCgpOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3llZDtcbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIncyBwb3NpdGlvbiBjaGFuZ2VzLiAqL1xuICAgIG9uUG9zaXRpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqXG4gICAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIGRyYXdlciBtb2RlIGNoYW5nZXMuIFRoaXMgaXMgdXNlZCBieSB0aGUgZHJhd2VyIGNvbnRhaW5lciB0b1xuICAgICAqIHRvIGtub3cgd2hlbiB0byB3aGVuIHRoZSBtb2RlIGNoYW5nZXMgc28gaXQgY2FuIGFkYXB0IHRoZSBtYXJnaW5zIG9uIHRoZSBjb250ZW50LlxuICAgICAqL1xuICAgIHJlYWRvbmx5IF9tb2RlQ2hhbmdlZDogU3ViamVjdDx2b2lkPjtcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIF9mb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LCBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIF9wbGF0Zm9ybTogUGxhdGZvcm0sIF9uZ1pvbmU6IE5nWm9uZSwgX2RvYzogYW55LCBcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBgX2NvbnRhaW5lcmAgcGFyYW1ldGVyIHRvIGJlIG1hZGUgcmVxdWlyZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxMC4wLjBcbiAgICAgKi9cbiAgICBfY29udGFpbmVyPzogTWF0RHJhd2VyQ29udGFpbmVyIHwgdW5kZWZpbmVkKTtcbiAgICAvKipcbiAgICAgKiBNb3ZlcyBmb2N1cyBpbnRvIHRoZSBkcmF3ZXIuIE5vdGUgdGhhdCB0aGlzIHdvcmtzIGV2ZW4gaWZcbiAgICAgKiB0aGUgZm9jdXMgdHJhcCBpcyBkaXNhYmxlZCBpbiBgc2lkZWAgbW9kZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF90YWtlRm9jdXM7XG4gICAgLyoqXG4gICAgICogSWYgZm9jdXMgaXMgY3VycmVudGx5IGluc2lkZSB0aGUgZHJhd2VyLCByZXN0b3JlcyBpdCB0byB3aGVyZSBpdCB3YXMgYmVmb3JlIHRoZSBkcmF3ZXJcbiAgICAgKiBvcGVuZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfcmVzdG9yZUZvY3VzO1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogT3BlbiB0aGUgZHJhd2VyLlxuICAgICAqIEBwYXJhbSBvcGVuZWRWaWEgV2hldGhlciB0aGUgZHJhd2VyIHdhcyBvcGVuZWQgYnkgYSBrZXkgcHJlc3MsIG1vdXNlIGNsaWNrIG9yIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgICogVXNlZCBmb3IgZm9jdXMgbWFuYWdlbWVudCBhZnRlciB0aGUgc2lkZW5hdiBpcyBjbG9zZWQuXG4gICAgICovXG4gICAgb3BlbihvcGVuZWRWaWE/OiBGb2N1c09yaWdpbik6IFByb21pc2U8TWF0RHJhd2VyVG9nZ2xlUmVzdWx0PjtcbiAgICAvKiogQ2xvc2UgdGhlIGRyYXdlci4gKi9cbiAgICBjbG9zZSgpOiBQcm9taXNlPE1hdERyYXdlclRvZ2dsZVJlc3VsdD47XG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHRoaXMgZHJhd2VyLlxuICAgICAqIEBwYXJhbSBpc09wZW4gV2hldGhlciB0aGUgZHJhd2VyIHNob3VsZCBiZSBvcGVuLlxuICAgICAqIEBwYXJhbSBvcGVuZWRWaWEgV2hldGhlciB0aGUgZHJhd2VyIHdhcyBvcGVuZWQgYnkgYSBrZXkgcHJlc3MsIG1vdXNlIGNsaWNrIG9yIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgICogVXNlZCBmb3IgZm9jdXMgbWFuYWdlbWVudCBhZnRlciB0aGUgc2lkZW5hdiBpcyBjbG9zZWQuXG4gICAgICovXG4gICAgdG9nZ2xlKGlzT3Blbj86IGJvb2xlYW4sIG9wZW5lZFZpYT86IEZvY3VzT3JpZ2luKTogUHJvbWlzZTxNYXREcmF3ZXJUb2dnbGVSZXN1bHQ+O1xuICAgIGdldCBfd2lkdGgoKTogbnVtYmVyO1xuICAgIC8qKiBVcGRhdGVzIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBmb2N1cyB0cmFwLiAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZUZvY3VzVHJhcFN0YXRlO1xuICAgIF9hbmltYXRpb25TdGFydExpc3RlbmVyKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQ7XG4gICAgX2FuaW1hdGlvbkRvbmVMaXN0ZW5lcihldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlQ2xvc2U6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0ZvY3VzOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX29wZW5lZDogQm9vbGVhbklucHV0O1xufVxuLyoqXG4gKiBgPG1hdC1kcmF3ZXItY29udGFpbmVyPmAgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgaXMgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gb25lIG9yIHR3byBgPG1hdC1kcmF3ZXI+YHMgdGhhdCB2YWxpZGF0ZXMgdGhlIHN0YXRlIGludGVybmFsbHlcbiAqIGFuZCBjb29yZGluYXRlcyB0aGUgYmFja2Ryb3AgYW5kIGNvbnRlbnQgc3R5bGluZy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0RHJhd2VyQ29udGFpbmVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9kaXI7XG4gICAgcHJpdmF0ZSBfZWxlbWVudDtcbiAgICBwcml2YXRlIF9uZ1pvbmU7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uTW9kZT87XG4gICAgLyoqIEFsbCBkcmF3ZXJzIGluIHRoZSBjb250YWluZXIuIEluY2x1ZGVzIGRyYXdlcnMgZnJvbSBpbnNpZGUgbmVzdGVkIGNvbnRhaW5lcnMuICovXG4gICAgX2FsbERyYXdlcnM6IFF1ZXJ5TGlzdDxNYXREcmF3ZXI+O1xuICAgIC8qKiBEcmF3ZXJzIHRoYXQgYmVsb25nIHRvIHRoaXMgY29udGFpbmVyLiAqL1xuICAgIF9kcmF3ZXJzOiBRdWVyeUxpc3Q8TWF0RHJhd2VyPjtcbiAgICBfY29udGVudDogTWF0RHJhd2VyQ29udGVudDtcbiAgICBfdXNlckNvbnRlbnQ6IE1hdERyYXdlckNvbnRlbnQ7XG4gICAgLyoqIFRoZSBkcmF3ZXIgY2hpbGQgd2l0aCB0aGUgYHN0YXJ0YCBwb3NpdGlvbi4gKi9cbiAgICBnZXQgc3RhcnQoKTogTWF0RHJhd2VyIHwgbnVsbDtcbiAgICAvKiogVGhlIGRyYXdlciBjaGlsZCB3aXRoIHRoZSBgZW5kYCBwb3NpdGlvbi4gKi9cbiAgICBnZXQgZW5kKCk6IE1hdERyYXdlciB8IG51bGw7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB0aGUgY29udGFpbmVyIHdoZW5ldmVyXG4gICAgICogdGhlIHNpemUgb2YgYW55IG9mIGl0cyBkcmF3ZXJzIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiAqKlVzZSBhdCB5b3VyIG93biByaXNrISoqIEVuYWJsaW5nIHRoaXMgb3B0aW9uIGNhbiBjYXVzZSBsYXlvdXQgdGhyYXNoaW5nIGJ5IG1lYXN1cmluZ1xuICAgICAqIHRoZSBkcmF3ZXJzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuIENhbiBiZSBjb25maWd1cmVkIGdsb2JhbGx5IHZpYSB0aGVcbiAgICAgKiBgTUFUX0RSQVdFUl9ERUZBVUxUX0FVVE9TSVpFYCB0b2tlbi5cbiAgICAgKi9cbiAgICBnZXQgYXV0b3NpemUoKTogYm9vbGVhbjtcbiAgICBzZXQgYXV0b3NpemUodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2F1dG9zaXplO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGRyYXdlciBjb250YWluZXIgc2hvdWxkIGhhdmUgYSBiYWNrZHJvcCB3aGlsZSBvbmUgb2YgdGhlIHNpZGVuYXZzIGlzIG9wZW4uXG4gICAgICogSWYgZXhwbGljaXRseSBzZXQgdG8gYHRydWVgLCB0aGUgYmFja2Ryb3Agd2lsbCBiZSBlbmFibGVkIGZvciBkcmF3ZXJzIGluIHRoZSBgc2lkZWBcbiAgICAgKiBtb2RlIGFzIHdlbGwuXG4gICAgICovXG4gICAgZ2V0IGhhc0JhY2tkcm9wKCk6IGFueTtcbiAgICBzZXQgaGFzQmFja2Ryb3AodmFsdWU6IGFueSk7XG4gICAgX2JhY2tkcm9wT3ZlcnJpZGU6IGJvb2xlYW4gfCBudWxsO1xuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBiYWNrZHJvcCBpcyBjbGlja2VkLiAqL1xuICAgIHJlYWRvbmx5IGJhY2tkcm9wQ2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICAvKiogVGhlIGRyYXdlciBhdCB0aGUgc3RhcnQvZW5kIHBvc2l0aW9uLCBpbmRlcGVuZGVudCBvZiBkaXJlY3Rpb24uICovXG4gICAgcHJpdmF0ZSBfc3RhcnQ7XG4gICAgcHJpdmF0ZSBfZW5kO1xuICAgIC8qKlxuICAgICAqIFRoZSBkcmF3ZXIgYXQgdGhlIGxlZnQvcmlnaHQuIFdoZW4gZGlyZWN0aW9uIGNoYW5nZXMsIHRoZXNlIHdpbGwgY2hhbmdlIGFzIHdlbGwuXG4gICAgICogVGhleSdyZSB1c2VkIGFzIGFsaWFzZXMgZm9yIHRoZSBhYm92ZSB0byBzZXQgdGhlIGxlZnQvcmlnaHQgc3R5bGUgcHJvcGVybHkuXG4gICAgICogSW4gTFRSLCBfbGVmdCA9PSBfc3RhcnQgYW5kIF9yaWdodCA9PSBfZW5kLlxuICAgICAqIEluIFJUTCwgX2xlZnQgPT0gX2VuZCBhbmQgX3JpZ2h0ID09IF9zdGFydC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9sZWZ0O1xuICAgIHByaXZhdGUgX3JpZ2h0O1xuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3llZDtcbiAgICAvKiogRW1pdHMgb24gZXZlcnkgbmdEb0NoZWNrLiBVc2VkIGZvciBkZWJvdW5jaW5nIHJlZmxvd3MuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZG9DaGVja1N1YmplY3Q7XG4gICAgLyoqXG4gICAgICogTWFyZ2lucyB0byBiZSBhcHBsaWVkIHRvIHRoZSBjb250ZW50LiBUaGVzZSBhcmUgdXNlZCB0byBwdXNoIC8gc2hyaW5rIHRoZSBkcmF3ZXIgY29udGVudCB3aGVuIGFcbiAgICAgKiBkcmF3ZXIgaXMgb3Blbi4gV2UgdXNlIG1hcmdpbiByYXRoZXIgdGhhbiB0cmFuc2Zvcm0gZXZlbiBmb3IgcHVzaCBtb2RlIGJlY2F1c2UgdHJhbnNmb3JtIGJyZWFrc1xuICAgICAqIGZpeGVkIHBvc2l0aW9uIGVsZW1lbnRzIGluc2lkZSBvZiB0aGUgdHJhbnNmb3JtZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBfY29udGVudE1hcmdpbnM6IHtcbiAgICAgICAgbGVmdDogbnVtYmVyIHwgbnVsbDtcbiAgICAgICAgcmlnaHQ6IG51bWJlciB8IG51bGw7XG4gICAgfTtcbiAgICByZWFkb25seSBfY29udGVudE1hcmdpbkNoYW5nZXM6IFN1YmplY3Q8e1xuICAgICAgICBsZWZ0OiBudW1iZXIgfCBudWxsO1xuICAgICAgICByaWdodDogbnVtYmVyIHwgbnVsbDtcbiAgICB9PjtcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBDZGtTY3JvbGxhYmxlIGluc3RhbmNlIHRoYXQgd3JhcHMgdGhlIHNjcm9sbGFibGUgY29udGVudC4gKi9cbiAgICBnZXQgc2Nyb2xsYWJsZSgpOiBDZGtTY3JvbGxhYmxlO1xuICAgIGNvbnN0cnVjdG9yKF9kaXI6IERpcmVjdGlvbmFsaXR5LCBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIF9uZ1pvbmU6IE5nWm9uZSwgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlciwgZGVmYXVsdEF1dG9zaXplPzogYm9vbGVhbiwgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQpO1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgLyoqIENhbGxzIGBvcGVuYCBvZiBib3RoIHN0YXJ0IGFuZCBlbmQgZHJhd2VycyAqL1xuICAgIG9wZW4oKTogdm9pZDtcbiAgICAvKiogQ2FsbHMgYGNsb3NlYCBvZiBib3RoIHN0YXJ0IGFuZCBlbmQgZHJhd2VycyAqL1xuICAgIGNsb3NlKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogUmVjYWxjdWxhdGVzIGFuZCB1cGRhdGVzIHRoZSBpbmxpbmUgc3R5bGVzIGZvciB0aGUgY29udGVudC4gTm90ZSB0aGF0IHRoaXMgc2hvdWxkIGJlIHVzZWRcbiAgICAgKiBzcGFyaW5nbHksIGJlY2F1c2UgaXQgY2F1c2VzIGEgcmVmbG93LlxuICAgICAqL1xuICAgIHVwZGF0ZUNvbnRlbnRNYXJnaW5zKCk6IHZvaWQ7XG4gICAgbmdEb0NoZWNrKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byBkcmF3ZXIgZXZlbnRzIGluIG9yZGVyIHRvIHNldCBhIGNsYXNzIG9uIHRoZSBtYWluIGNvbnRhaW5lciBlbGVtZW50IHdoZW4gdGhlXG4gICAgICogZHJhd2VyIGlzIG9wZW4gYW5kIHRoZSBiYWNrZHJvcCBpcyB2aXNpYmxlLiBUaGlzIGVuc3VyZXMgYW55IG92ZXJmbG93IG9uIHRoZSBjb250YWluZXIgZWxlbWVudFxuICAgICAqIGlzIHByb3Blcmx5IGhpZGRlbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIF93YXRjaERyYXdlclRvZ2dsZTtcbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRvIGRyYXdlciBvblBvc2l0aW9uQ2hhbmdlZCBldmVudCBpbiBvcmRlciB0b1xuICAgICAqIHJlLXZhbGlkYXRlIGRyYXdlcnMgd2hlbiB0aGUgcG9zaXRpb24gY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIF93YXRjaERyYXdlclBvc2l0aW9uO1xuICAgIC8qKiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgaW4gZHJhd2VyIG1vZGUgc28gd2UgY2FuIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uLiAqL1xuICAgIHByaXZhdGUgX3dhdGNoRHJhd2VyTW9kZTtcbiAgICAvKiogVG9nZ2xlcyB0aGUgJ21hdC1kcmF3ZXItb3BlbmVkJyBjbGFzcyBvbiB0aGUgbWFpbiAnbWF0LWRyYXdlci1jb250YWluZXInIGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBfc2V0Q29udGFpbmVyQ2xhc3M7XG4gICAgLyoqIFZhbGlkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgZHJhd2VyIGNoaWxkcmVuIGNvbXBvbmVudHMuICovXG4gICAgcHJpdmF0ZSBfdmFsaWRhdGVEcmF3ZXJzO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250YWluZXIgaXMgYmVpbmcgcHVzaGVkIHRvIHRoZSBzaWRlIGJ5IG9uZSBvZiB0aGUgZHJhd2Vycy4gKi9cbiAgICBwcml2YXRlIF9pc1B1c2hlZDtcbiAgICBfb25CYWNrZHJvcENsaWNrZWQoKTogdm9pZDtcbiAgICBfY2xvc2VNb2RhbERyYXdlcigpOiB2b2lkO1xuICAgIF9pc1Nob3dpbmdCYWNrZHJvcCgpOiBib29sZWFuO1xuICAgIHByaXZhdGUgX2NhbkhhdmVCYWNrZHJvcDtcbiAgICBwcml2YXRlIF9pc0RyYXdlck9wZW47XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9zaXplOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hhc0JhY2tkcm9wOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=