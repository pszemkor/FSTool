/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { AfterContentInit, ElementRef, EventEmitter, InjectionToken, OnDestroy, ViewContainerRef } from '@angular/core';
import { MatMenu } from './menu';
import { MatMenuItem } from './menu-item';
import { MatMenuPanel } from './menu-panel';
/** Injection token that determines the scroll handling while the menu is open. */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_MENU_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_MENU_SCROLL_STRATEGY_FACTORY;
};
/** Default top padding of the menu panel. */
export declare const MENU_PANEL_TOP_PADDING = 8;
/** Directive applied to an element that should trigger a `mat-menu`. */
export declare class MatMenuTrigger implements AfterContentInit, OnDestroy {
    private _overlay;
    private _element;
    private _viewContainerRef;
    private _parentMenu;
    private _menuItemInstance;
    private _dir;
    private _focusMonitor?;
    private _portal;
    private _overlayRef;
    private _menuOpen;
    private _closingActionsSubscription;
    private _hoverSubscription;
    private _menuCloseSubscription;
    private _scrollStrategy;
    /**
     * Handles touch start events on the trigger.
     * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
     */
    private _handleTouchStart;
    _openedBy: 'mouse' | 'touch' | null;
    /**
     * @deprecated
     * @breaking-change 8.0.0
     */
    get _deprecatedMatMenuTriggerFor(): MatMenuPanel;
    set _deprecatedMatMenuTriggerFor(v: MatMenuPanel);
    /** References the menu instance that the trigger is associated with. */
    get menu(): MatMenuPanel;
    set menu(menu: MatMenuPanel);
    private _menu;
    /** Data to be passed along to any lazily-rendered content. */
    menuData: any;
    /**
     * Whether focus should be restored when the menu is closed.
     * Note that disabling this option can have accessibility implications
     * and it's up to you to manage focus, if you decide to turn it off.
     */
    restoreFocus: boolean;
    /** Event emitted when the associated menu is opened. */
    readonly menuOpened: EventEmitter<void>;
    /**
     * Event emitted when the associated menu is opened.
     * @deprecated Switch to `menuOpened` instead
     * @breaking-change 8.0.0
     */
    readonly onMenuOpen: EventEmitter<void>;
    /** Event emitted when the associated menu is closed. */
    readonly menuClosed: EventEmitter<void>;
    /**
     * Event emitted when the associated menu is closed.
     * @deprecated Switch to `menuClosed` instead
     * @breaking-change 8.0.0
     */
    readonly onMenuClose: EventEmitter<void>;
    constructor(_overlay: Overlay, _element: ElementRef<HTMLElement>, _viewContainerRef: ViewContainerRef, scrollStrategy: any, _parentMenu: MatMenu, _menuItemInstance: MatMenuItem, _dir: Directionality, _focusMonitor?: FocusMonitor | undefined);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Whether the menu is open. */
    get menuOpen(): boolean;
    /** The text direction of the containing app. */
    get dir(): Direction;
    /** Whether the menu triggers a sub-menu or a top-level one. */
    triggersSubmenu(): boolean;
    /** Toggles the menu between the open and closed states. */
    toggleMenu(): void;
    /** Opens the menu. */
    openMenu(): void;
    /** Closes the menu. */
    closeMenu(): void;
    /**
     * Focuses the menu trigger.
     * @param origin Source of the menu trigger's focus.
     */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    /** Closes the menu and does the necessary cleanup. */
    private _destroyMenu;
    /**
     * This method sets the menu state to open and focuses the first item if
     * the menu was opened via the keyboard.
     */
    private _initMenu;
    /** Updates the menu elevation based on the amount of parent menus that it has. */
    private _setMenuElevation;
    /** Restores focus to the element that was focused before the menu was open. */
    private _restoreFocus;
    private _setIsMenuOpen;
    /**
     * This method checks that a valid instance of MatMenu has been passed into
     * matMenuTriggerFor. If not, an exception is thrown.
     */
    private _checkMenu;
    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    private _createOverlay;
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    private _getOverlayConfig;
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the menu based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    private _subscribeToPositions;
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    private _setPosition;
    /** Returns a stream that emits whenever an action that should close the menu occurs. */
    private _menuClosingActions;
    /** Handles mouse presses on the trigger. */
    _handleMousedown(event: MouseEvent): void;
    /** Handles key presses on the trigger. */
    _handleKeydown(event: KeyboardEvent): void;
    /** Handles click events on the trigger. */
    _handleClick(event: MouseEvent): void;
    /** Handles the cases where the user hovers over the trigger. */
    private _handleHover;
    /** Gets the portal that should be attached to the overlay. */
    private _getPortal;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatMenuTrigger, [null, null, null, null, { optional: true; }, { optional: true; self: true; }, { optional: true; }, null]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatMenuTrigger, "[mat-menu-trigger-for], [matMenuTriggerFor]", ["matMenuTrigger"], { "restoreFocus": "matMenuTriggerRestoreFocus"; "_deprecatedMatMenuTriggerFor": "mat-menu-trigger-for"; "menu": "matMenuTriggerFor"; "menuData": "matMenuTriggerData"; }, { "menuOpened": "menuOpened"; "onMenuOpen": "onMenuOpen"; "menuClosed": "menuClosed"; "onMenuClose": "onMenuClose"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS10cmlnZ2VyLmQudHMiLCJzb3VyY2VzIjpbIm1lbnUtdHJpZ2dlci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXksIFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3Rpb25Ub2tlbiwgT25EZXN0cm95LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51IH0gZnJvbSAnLi9tZW51JztcbmltcG9ydCB7IE1hdE1lbnVJdGVtIH0gZnJvbSAnLi9tZW51LWl0ZW0nO1xuaW1wb3J0IHsgTWF0TWVudVBhbmVsIH0gZnJvbSAnLi9tZW51LXBhbmVsJztcbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIG1lbnUgaXMgb3Blbi4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWTogSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUjoge1xuICAgIHByb3ZpZGU6IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PjtcbiAgICBkZXBzOiAodHlwZW9mIE92ZXJsYXkpW107XG4gICAgdXNlRmFjdG9yeTogdHlwZW9mIE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZO1xufTtcbi8qKiBEZWZhdWx0IHRvcCBwYWRkaW5nIG9mIHRoZSBtZW51IHBhbmVsLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUVOVV9QQU5FTF9UT1BfUEFERElORyA9IDg7XG4vKiogRGlyZWN0aXZlIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB0aGF0IHNob3VsZCB0cmlnZ2VyIGEgYG1hdC1tZW51YC4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdE1lbnVUcmlnZ2VyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9vdmVybGF5O1xuICAgIHByaXZhdGUgX2VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjtcbiAgICBwcml2YXRlIF9wYXJlbnRNZW51O1xuICAgIHByaXZhdGUgX21lbnVJdGVtSW5zdGFuY2U7XG4gICAgcHJpdmF0ZSBfZGlyO1xuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcj87XG4gICAgcHJpdmF0ZSBfcG9ydGFsO1xuICAgIHByaXZhdGUgX292ZXJsYXlSZWY7XG4gICAgcHJpdmF0ZSBfbWVudU9wZW47XG4gICAgcHJpdmF0ZSBfY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfaG92ZXJTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfbWVudUNsb3NlU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdG91Y2ggc3RhcnQgZXZlbnRzIG9uIHRoZSB0cmlnZ2VyLlxuICAgICAqIE5lZWRzIHRvIGJlIGFuIGFycm93IGZ1bmN0aW9uIHNvIHdlIGNhbiBlYXNpbHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIgYW5kIHJlbW92ZUV2ZW50TGlzdGVuZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaGFuZGxlVG91Y2hTdGFydDtcbiAgICBfb3BlbmVkQnk6ICdtb3VzZScgfCAndG91Y2gnIHwgbnVsbDtcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAgICAgKi9cbiAgICBnZXQgX2RlcHJlY2F0ZWRNYXRNZW51VHJpZ2dlckZvcigpOiBNYXRNZW51UGFuZWw7XG4gICAgc2V0IF9kZXByZWNhdGVkTWF0TWVudVRyaWdnZXJGb3IodjogTWF0TWVudVBhbmVsKTtcbiAgICAvKiogUmVmZXJlbmNlcyB0aGUgbWVudSBpbnN0YW5jZSB0aGF0IHRoZSB0cmlnZ2VyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBnZXQgbWVudSgpOiBNYXRNZW51UGFuZWw7XG4gICAgc2V0IG1lbnUobWVudTogTWF0TWVudVBhbmVsKTtcbiAgICBwcml2YXRlIF9tZW51O1xuICAgIC8qKiBEYXRhIHRvIGJlIHBhc3NlZCBhbG9uZyB0byBhbnkgbGF6aWx5LXJlbmRlcmVkIGNvbnRlbnQuICovXG4gICAgbWVudURhdGE6IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGZvY3VzIHNob3VsZCBiZSByZXN0b3JlZCB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZC5cbiAgICAgKiBOb3RlIHRoYXQgZGlzYWJsaW5nIHRoaXMgb3B0aW9uIGNhbiBoYXZlIGFjY2Vzc2liaWxpdHkgaW1wbGljYXRpb25zXG4gICAgICogYW5kIGl0J3MgdXAgdG8geW91IHRvIG1hbmFnZSBmb2N1cywgaWYgeW91IGRlY2lkZSB0byB0dXJuIGl0IG9mZi5cbiAgICAgKi9cbiAgICByZXN0b3JlRm9jdXM6IGJvb2xlYW47XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBtZW51IGlzIG9wZW5lZC4gKi9cbiAgICByZWFkb25seSBtZW51T3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhc3NvY2lhdGVkIG1lbnUgaXMgb3BlbmVkLlxuICAgICAqIEBkZXByZWNhdGVkIFN3aXRjaCB0byBgbWVudU9wZW5lZGAgaW5zdGVhZFxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAgICAgKi9cbiAgICByZWFkb25seSBvbk1lbnVPcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBtZW51IGlzIGNsb3NlZC4gKi9cbiAgICByZWFkb25seSBtZW51Q2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhc3NvY2lhdGVkIG1lbnUgaXMgY2xvc2VkLlxuICAgICAqIEBkZXByZWNhdGVkIFN3aXRjaCB0byBgbWVudUNsb3NlZGAgaW5zdGVhZFxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAgICAgKi9cbiAgICByZWFkb25seSBvbk1lbnVDbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIGNvbnN0cnVjdG9yKF9vdmVybGF5OiBPdmVybGF5LCBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBzY3JvbGxTdHJhdGVneTogYW55LCBfcGFyZW50TWVudTogTWF0TWVudSwgX21lbnVJdGVtSW5zdGFuY2U6IE1hdE1lbnVJdGVtLCBfZGlyOiBEaXJlY3Rpb25hbGl0eSwgX2ZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvciB8IHVuZGVmaW5lZCk7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogV2hldGhlciB0aGUgbWVudSBpcyBvcGVuLiAqL1xuICAgIGdldCBtZW51T3BlbigpOiBib29sZWFuO1xuICAgIC8qKiBUaGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICAgIGdldCBkaXIoKTogRGlyZWN0aW9uO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBtZW51IHRyaWdnZXJzIGEgc3ViLW1lbnUgb3IgYSB0b3AtbGV2ZWwgb25lLiAqL1xuICAgIHRyaWdnZXJzU3VibWVudSgpOiBib29sZWFuO1xuICAgIC8qKiBUb2dnbGVzIHRoZSBtZW51IGJldHdlZW4gdGhlIG9wZW4gYW5kIGNsb3NlZCBzdGF0ZXMuICovXG4gICAgdG9nZ2xlTWVudSgpOiB2b2lkO1xuICAgIC8qKiBPcGVucyB0aGUgbWVudS4gKi9cbiAgICBvcGVuTWVudSgpOiB2b2lkO1xuICAgIC8qKiBDbG9zZXMgdGhlIG1lbnUuICovXG4gICAgY2xvc2VNZW51KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogRm9jdXNlcyB0aGUgbWVudSB0cmlnZ2VyLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gU291cmNlIG9mIHRoZSBtZW51IHRyaWdnZXIncyBmb2N1cy5cbiAgICAgKi9cbiAgICBmb2N1cyhvcmlnaW4/OiBGb2N1c09yaWdpbiwgb3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQ7XG4gICAgLyoqIENsb3NlcyB0aGUgbWVudSBhbmQgZG9lcyB0aGUgbmVjZXNzYXJ5IGNsZWFudXAuICovXG4gICAgcHJpdmF0ZSBfZGVzdHJveU1lbnU7XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgbWVudSBzdGF0ZSB0byBvcGVuIGFuZCBmb2N1c2VzIHRoZSBmaXJzdCBpdGVtIGlmXG4gICAgICogdGhlIG1lbnUgd2FzIG9wZW5lZCB2aWEgdGhlIGtleWJvYXJkLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2luaXRNZW51O1xuICAgIC8qKiBVcGRhdGVzIHRoZSBtZW51IGVsZXZhdGlvbiBiYXNlZCBvbiB0aGUgYW1vdW50IG9mIHBhcmVudCBtZW51cyB0aGF0IGl0IGhhcy4gKi9cbiAgICBwcml2YXRlIF9zZXRNZW51RWxldmF0aW9uO1xuICAgIC8qKiBSZXN0b3JlcyBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgbWVudSB3YXMgb3Blbi4gKi9cbiAgICBwcml2YXRlIF9yZXN0b3JlRm9jdXM7XG4gICAgcHJpdmF0ZSBfc2V0SXNNZW51T3BlbjtcbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGVja3MgdGhhdCBhIHZhbGlkIGluc3RhbmNlIG9mIE1hdE1lbnUgaGFzIGJlZW4gcGFzc2VkIGludG9cbiAgICAgKiBtYXRNZW51VHJpZ2dlckZvci4gSWYgbm90LCBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NoZWNrTWVudTtcbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIHRoZSBvdmVybGF5IGZyb20gdGhlIHByb3ZpZGVkIG1lbnUncyB0ZW1wbGF0ZSBhbmQgc2F2ZXMgaXRzXG4gICAgICogT3ZlcmxheVJlZiBzbyB0aGF0IGl0IGNhbiBiZSBhdHRhY2hlZCB0byB0aGUgRE9NIHdoZW4gb3Blbk1lbnUgaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXk7XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgYnVpbGRzIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBuZWVkZWQgdG8gY3JlYXRlIHRoZSBvdmVybGF5LCB0aGUgT3ZlcmxheVN0YXRlLlxuICAgICAqIEByZXR1cm5zIE92ZXJsYXlDb25maWdcbiAgICAgKi9cbiAgICBwcml2YXRlIF9nZXRPdmVybGF5Q29uZmlnO1xuICAgIC8qKlxuICAgICAqIExpc3RlbnMgdG8gY2hhbmdlcyBpbiB0aGUgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Nlc1xuICAgICAqIG9uIHRoZSBtZW51IGJhc2VkIG9uIHRoZSBuZXcgcG9zaXRpb24uIFRoaXMgZW5zdXJlcyB0aGUgYW5pbWF0aW9uIG9yaWdpbiBpcyBhbHdheXNcbiAgICAgKiBjb3JyZWN0LCBldmVuIGlmIGEgZmFsbGJhY2sgcG9zaXRpb24gaXMgdXNlZCBmb3IgdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9Qb3NpdGlvbnM7XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYXBwcm9wcmlhdGUgcG9zaXRpb25zIG9uIGEgcG9zaXRpb24gc3RyYXRlZ3lcbiAgICAgKiBzbyB0aGUgb3ZlcmxheSBjb25uZWN0cyB3aXRoIHRoZSB0cmlnZ2VyIGNvcnJlY3RseS5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb25TdHJhdGVneSBTdHJhdGVneSB3aG9zZSBwb3NpdGlvbiB0byB1cGRhdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2V0UG9zaXRpb247XG4gICAgLyoqIFJldHVybnMgYSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciBhbiBhY3Rpb24gdGhhdCBzaG91bGQgY2xvc2UgdGhlIG1lbnUgb2NjdXJzLiAqL1xuICAgIHByaXZhdGUgX21lbnVDbG9zaW5nQWN0aW9ucztcbiAgICAvKiogSGFuZGxlcyBtb3VzZSBwcmVzc2VzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIF9oYW5kbGVNb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkO1xuICAgIC8qKiBIYW5kbGVzIGtleSBwcmVzc2VzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZDtcbiAgICAvKiogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIHRyaWdnZXIuICovXG4gICAgX2hhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZDtcbiAgICAvKiogSGFuZGxlcyB0aGUgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIHRyaWdnZXIuICovXG4gICAgcHJpdmF0ZSBfaGFuZGxlSG92ZXI7XG4gICAgLyoqIEdldHMgdGhlIHBvcnRhbCB0aGF0IHNob3VsZCBiZSBhdHRhY2hlZCB0byB0aGUgb3ZlcmxheS4gKi9cbiAgICBwcml2YXRlIF9nZXRQb3J0YWw7XG59XG4iXX0=