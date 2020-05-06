/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusOrigin } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, TemplateRef, QueryList, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatMenuContent } from './menu-content';
import { MenuPositionX, MenuPositionY } from './menu-positions';
import { MatMenuItem } from './menu-item';
import { MatMenuPanel } from './menu-panel';
import { AnimationEvent } from '@angular/animations';
/** Default `mat-menu` options that can be overridden. */
import * as ɵngcc0 from '@angular/core';
export interface MatMenuDefaultOptions {
    /** The x-axis position of the menu. */
    xPosition: MenuPositionX;
    /** The y-axis position of the menu. */
    yPosition: MenuPositionY;
    /** Whether the menu should overlap the menu trigger. */
    overlapTrigger: boolean;
    /** Class to be applied to the menu's backdrop. */
    backdropClass: string;
    /** Whether the menu has a backdrop. */
    hasBackdrop?: boolean;
}
/** Injection token to be used to override the default options for `mat-menu`. */
export declare const MAT_MENU_DEFAULT_OPTIONS: InjectionToken<MatMenuDefaultOptions>;
/** @docs-private */
export declare function MAT_MENU_DEFAULT_OPTIONS_FACTORY(): MatMenuDefaultOptions;
/** Base class with all of the `MatMenu` functionality. */
export declare class _MatMenuBase implements AfterContentInit, MatMenuPanel<MatMenuItem>, OnInit, OnDestroy {
    private _elementRef;
    private _ngZone;
    private _defaultOptions;
    private _keyManager;
    private _xPosition;
    private _yPosition;
    private _previousElevation;
    /** All items inside the menu. Includes items nested inside another menu. */
    _allItems: QueryList<MatMenuItem>;
    /** Only the direct descendant menu items. */
    private _directDescendantItems;
    /** Subscription to tab events on the menu panel */
    private _tabSubscription;
    /** Config object to be passed into the menu's ngClass */
    _classList: {
        [key: string]: boolean;
    };
    /** Current state of the panel animation. */
    _panelAnimationState: 'void' | 'enter';
    /** Emits whenever an animation on the menu completes. */
    _animationDone: Subject<AnimationEvent>;
    /** Whether the menu is animating. */
    _isAnimating: boolean;
    /** Parent menu of the current menu panel. */
    parentMenu: MatMenuPanel | undefined;
    /** Layout direction of the menu. */
    direction: Direction;
    /** Class to be added to the backdrop element. */
    backdropClass: string;
    /** aria-label for the menu panel. */
    ariaLabel: string;
    /** aria-labelledby for the menu panel. */
    ariaLabelledby: string;
    /** aria-describedby for the menu panel. */
    ariaDescribedby: string;
    /** Position of the menu in the X axis. */
    get xPosition(): MenuPositionX;
    set xPosition(value: MenuPositionX);
    /** Position of the menu in the Y axis. */
    get yPosition(): MenuPositionY;
    set yPosition(value: MenuPositionY);
    /** @docs-private */
    templateRef: TemplateRef<any>;
    /**
     * List of the items inside of a menu.
     * @deprecated
     * @breaking-change 8.0.0
     */
    items: QueryList<MatMenuItem>;
    /**
     * Menu content that will be rendered lazily.
     * @docs-private
     */
    lazyContent: MatMenuContent;
    /** Whether the menu should overlap its trigger. */
    get overlapTrigger(): boolean;
    set overlapTrigger(value: boolean);
    private _overlapTrigger;
    /** Whether the menu has a backdrop. */
    get hasBackdrop(): boolean | undefined;
    set hasBackdrop(value: boolean | undefined);
    private _hasBackdrop;
    /**
     * This method takes classes set on the host mat-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @param classes list of class names
     */
    set panelClass(classes: string);
    private _previousPanelClass;
    /**
     * This method takes classes set on the host mat-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @deprecated Use `panelClass` instead.
     * @breaking-change 8.0.0
     */
    get classList(): string;
    set classList(classes: string);
    /** Event emitted when the menu is closed. */
    readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
    /**
     * Event emitted when the menu is closed.
     * @deprecated Switch to `closed` instead
     * @breaking-change 8.0.0
     */
    close: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
    readonly panelId: string;
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _defaultOptions: MatMenuDefaultOptions);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Stream that emits whenever the hovered menu item changes. */
    _hovered(): Observable<MatMenuItem>;
    addItem(_item: MatMenuItem): void;
    /**
     * Removes an item from the menu.
     * @docs-private
     * @deprecated No longer being used. To be removed.
     * @breaking-change 9.0.0
     */
    removeItem(_item: MatMenuItem): void;
    /** Handle a keyboard event from the menu, delegating to the appropriate action. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Focus the first item in the menu.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    focusFirstItem(origin?: FocusOrigin): void;
    /**
     * Actual implementation that focuses the first item. Needs to be separated
     * out so we don't repeat the same logic in the public `focusFirstItem` method.
     */
    private _focusFirstItem;
    /**
     * Resets the active item in the menu. This is used when the menu is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    resetActiveItem(): void;
    /**
     * Sets the menu panel elevation.
     * @param depth Number of parent menus that come before the menu.
     */
    setElevation(depth: number): void;
    /**
     * Adds classes to the menu panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the menu along the x axis.
     * @param posY Position of the menu along the y axis.
     * @docs-private
     */
    setPositionClasses(posX?: MenuPositionX, posY?: MenuPositionY): void;
    /** Starts the enter animation. */
    _startAnimation(): void;
    /** Resets the panel animation to its initial state. */
    _resetAnimation(): void;
    /** Callback that is invoked when the panel animation completes. */
    _onAnimationDone(event: AnimationEvent): void;
    _onAnimationStart(event: AnimationEvent): void;
    /**
     * Sets up a stream that will keep track of any newly-added menu items and will update the list
     * of direct descendants. We collect the descendants this way, because `_allItems` can include
     * items that are part of child menus, and using a custom way of registering items is unreliable
     * when it comes to maintaining the item order.
     */
    private _updateDirectDescendants;
    static ngAcceptInputType_overlapTrigger: BooleanInput;
    static ngAcceptInputType_hasBackdrop: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<_MatMenuBase, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<_MatMenuBase, never, never, { "backdropClass": "backdropClass"; "xPosition": "xPosition"; "yPosition": "yPosition"; "overlapTrigger": "overlapTrigger"; "hasBackdrop": "hasBackdrop"; "panelClass": "class"; "classList": "classList"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "ariaDescribedby": "aria-describedby"; }, { "closed": "closed"; "close": "close"; }, ["lazyContent", "_allItems", "items"]>;
}
/** @docs-private We show the "_MatMenu" class as "MatMenu" in the docs. */
export declare class MatMenu extends _MatMenuBase {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatMenu, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatMenu, never, never, {}, {}, never>;
}
/** @docs-public MatMenu */
export declare class _MatMenu extends MatMenu {
    constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, defaultOptions: MatMenuDefaultOptions);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<_MatMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<_MatMenu, "mat-menu", ["matMenu"], {}, {}, never, ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kLnRzIiwic291cmNlcyI6WyJtZW51LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmLCBRdWVyeUxpc3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0TWVudUNvbnRlbnQgfSBmcm9tICcuL21lbnUtY29udGVudCc7XG5pbXBvcnQgeyBNZW51UG9zaXRpb25YLCBNZW51UG9zaXRpb25ZIH0gZnJvbSAnLi9tZW51LXBvc2l0aW9ucyc7XG5pbXBvcnQgeyBNYXRNZW51SXRlbSB9IGZyb20gJy4vbWVudS1pdGVtJztcbmltcG9ydCB7IE1hdE1lbnVQYW5lbCB9IGZyb20gJy4vbWVudS1wYW5lbCc7XG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuLyoqIERlZmF1bHQgYG1hdC1tZW51YCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdE1lbnVEZWZhdWx0T3B0aW9ucyB7XG4gICAgLyoqIFRoZSB4LWF4aXMgcG9zaXRpb24gb2YgdGhlIG1lbnUuICovXG4gICAgeFBvc2l0aW9uOiBNZW51UG9zaXRpb25YO1xuICAgIC8qKiBUaGUgeS1heGlzIHBvc2l0aW9uIG9mIHRoZSBtZW51LiAqL1xuICAgIHlQb3NpdGlvbjogTWVudVBvc2l0aW9uWTtcbiAgICAvKiogV2hldGhlciB0aGUgbWVudSBzaG91bGQgb3ZlcmxhcCB0aGUgbWVudSB0cmlnZ2VyLiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyOiBib29sZWFuO1xuICAgIC8qKiBDbGFzcyB0byBiZSBhcHBsaWVkIHRvIHRoZSBtZW51J3MgYmFja2Ryb3AuICovXG4gICAgYmFja2Ryb3BDbGFzczogc3RyaW5nO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBtZW51IGhhcyBhIGJhY2tkcm9wLiAqL1xuICAgIGhhc0JhY2tkcm9wPzogYm9vbGVhbjtcbn1cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWF0LW1lbnVgLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX01FTlVfREVGQVVMVF9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxNYXRNZW51RGVmYXVsdE9wdGlvbnM+O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIE1BVF9NRU5VX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1hdE1lbnVEZWZhdWx0T3B0aW9ucztcbi8qKiBCYXNlIGNsYXNzIHdpdGggYWxsIG9mIHRoZSBgTWF0TWVudWAgZnVuY3Rpb25hbGl0eS4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIF9NYXRNZW51QmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE1hdE1lbnVQYW5lbDxNYXRNZW51SXRlbT4sIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX25nWm9uZTtcbiAgICBwcml2YXRlIF9kZWZhdWx0T3B0aW9ucztcbiAgICBwcml2YXRlIF9rZXlNYW5hZ2VyO1xuICAgIHByaXZhdGUgX3hQb3NpdGlvbjtcbiAgICBwcml2YXRlIF95UG9zaXRpb247XG4gICAgcHJpdmF0ZSBfcHJldmlvdXNFbGV2YXRpb247XG4gICAgLyoqIEFsbCBpdGVtcyBpbnNpZGUgdGhlIG1lbnUuIEluY2x1ZGVzIGl0ZW1zIG5lc3RlZCBpbnNpZGUgYW5vdGhlciBtZW51LiAqL1xuICAgIF9hbGxJdGVtczogUXVlcnlMaXN0PE1hdE1lbnVJdGVtPjtcbiAgICAvKiogT25seSB0aGUgZGlyZWN0IGRlc2NlbmRhbnQgbWVudSBpdGVtcy4gKi9cbiAgICBwcml2YXRlIF9kaXJlY3REZXNjZW5kYW50SXRlbXM7XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWIgZXZlbnRzIG9uIHRoZSBtZW51IHBhbmVsICovXG4gICAgcHJpdmF0ZSBfdGFiU3Vic2NyaXB0aW9uO1xuICAgIC8qKiBDb25maWcgb2JqZWN0IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBtZW51J3MgbmdDbGFzcyAqL1xuICAgIF9jbGFzc0xpc3Q6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcbiAgICB9O1xuICAgIC8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBwYW5lbCBhbmltYXRpb24uICovXG4gICAgX3BhbmVsQW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICdlbnRlcic7XG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIGFuIGFuaW1hdGlvbiBvbiB0aGUgbWVudSBjb21wbGV0ZXMuICovXG4gICAgX2FuaW1hdGlvbkRvbmU6IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+O1xuICAgIC8qKiBXaGV0aGVyIHRoZSBtZW51IGlzIGFuaW1hdGluZy4gKi9cbiAgICBfaXNBbmltYXRpbmc6IGJvb2xlYW47XG4gICAgLyoqIFBhcmVudCBtZW51IG9mIHRoZSBjdXJyZW50IG1lbnUgcGFuZWwuICovXG4gICAgcGFyZW50TWVudTogTWF0TWVudVBhbmVsIHwgdW5kZWZpbmVkO1xuICAgIC8qKiBMYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBtZW51LiAqL1xuICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uO1xuICAgIC8qKiBDbGFzcyB0byBiZSBhZGRlZCB0byB0aGUgYmFja2Ryb3AgZWxlbWVudC4gKi9cbiAgICBiYWNrZHJvcENsYXNzOiBzdHJpbmc7XG4gICAgLyoqIGFyaWEtbGFiZWwgZm9yIHRoZSBtZW51IHBhbmVsLiAqL1xuICAgIGFyaWFMYWJlbDogc3RyaW5nO1xuICAgIC8qKiBhcmlhLWxhYmVsbGVkYnkgZm9yIHRoZSBtZW51IHBhbmVsLiAqL1xuICAgIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmc7XG4gICAgLyoqIGFyaWEtZGVzY3JpYmVkYnkgZm9yIHRoZSBtZW51IHBhbmVsLiAqL1xuICAgIGFyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgbWVudSBpbiB0aGUgWCBheGlzLiAqL1xuICAgIGdldCB4UG9zaXRpb24oKTogTWVudVBvc2l0aW9uWDtcbiAgICBzZXQgeFBvc2l0aW9uKHZhbHVlOiBNZW51UG9zaXRpb25YKTtcbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIG1lbnUgaW4gdGhlIFkgYXhpcy4gKi9cbiAgICBnZXQgeVBvc2l0aW9uKCk6IE1lbnVQb3NpdGlvblk7XG4gICAgc2V0IHlQb3NpdGlvbih2YWx1ZTogTWVudVBvc2l0aW9uWSk7XG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHRoZSBpdGVtcyBpbnNpZGUgb2YgYSBtZW51LlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuICAgICAqL1xuICAgIGl0ZW1zOiBRdWVyeUxpc3Q8TWF0TWVudUl0ZW0+O1xuICAgIC8qKlxuICAgICAqIE1lbnUgY29udGVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgbGF6aWx5LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBsYXp5Q29udGVudDogTWF0TWVudUNvbnRlbnQ7XG4gICAgLyoqIFdoZXRoZXIgdGhlIG1lbnUgc2hvdWxkIG92ZXJsYXAgaXRzIHRyaWdnZXIuICovXG4gICAgZ2V0IG92ZXJsYXBUcmlnZ2VyKCk6IGJvb2xlYW47XG4gICAgc2V0IG92ZXJsYXBUcmlnZ2VyKHZhbHVlOiBib29sZWFuKTtcbiAgICBwcml2YXRlIF9vdmVybGFwVHJpZ2dlcjtcbiAgICAvKiogV2hldGhlciB0aGUgbWVudSBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBnZXQgaGFzQmFja2Ryb3AoKTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICBzZXQgaGFzQmFja2Ryb3AodmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQpO1xuICAgIHByaXZhdGUgX2hhc0JhY2tkcm9wO1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHRha2VzIGNsYXNzZXMgc2V0IG9uIHRoZSBob3N0IG1hdC1tZW51IGVsZW1lbnQgYW5kIGFwcGxpZXMgdGhlbSBvbiB0aGVcbiAgICAgKiBtZW51IHRlbXBsYXRlIHRoYXQgZGlzcGxheXMgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLiAgT3RoZXJ3aXNlLCBpdCdzIGRpZmZpY3VsdFxuICAgICAqIHRvIHN0eWxlIHRoZSBjb250YWluaW5nIG1lbnUgZnJvbSBvdXRzaWRlIHRoZSBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIGNsYXNzZXMgbGlzdCBvZiBjbGFzcyBuYW1lc1xuICAgICAqL1xuICAgIHNldCBwYW5lbENsYXNzKGNsYXNzZXM6IHN0cmluZyk7XG4gICAgcHJpdmF0ZSBfcHJldmlvdXNQYW5lbENsYXNzO1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHRha2VzIGNsYXNzZXMgc2V0IG9uIHRoZSBob3N0IG1hdC1tZW51IGVsZW1lbnQgYW5kIGFwcGxpZXMgdGhlbSBvbiB0aGVcbiAgICAgKiBtZW51IHRlbXBsYXRlIHRoYXQgZGlzcGxheXMgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLiAgT3RoZXJ3aXNlLCBpdCdzIGRpZmZpY3VsdFxuICAgICAqIHRvIHN0eWxlIHRoZSBjb250YWluaW5nIG1lbnUgZnJvbSBvdXRzaWRlIHRoZSBjb21wb25lbnQuXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBwYW5lbENsYXNzYCBpbnN0ZWFkLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAgICAgKi9cbiAgICBnZXQgY2xhc3NMaXN0KCk6IHN0cmluZztcbiAgICBzZXQgY2xhc3NMaXN0KGNsYXNzZXM6IHN0cmluZyk7XG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWQuICovXG4gICAgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZCB8ICdjbGljaycgfCAna2V5ZG93bicgfCAndGFiJz47XG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZC5cbiAgICAgKiBAZGVwcmVjYXRlZCBTd2l0Y2ggdG8gYGNsb3NlZGAgaW5zdGVhZFxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAgICAgKi9cbiAgICBjbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+O1xuICAgIHJlYWRvbmx5IHBhbmVsSWQ6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIF9uZ1pvbmU6IE5nWm9uZSwgX2RlZmF1bHRPcHRpb25zOiBNYXRNZW51RGVmYXVsdE9wdGlvbnMpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGhvdmVyZWQgbWVudSBpdGVtIGNoYW5nZXMuICovXG4gICAgX2hvdmVyZWQoKTogT2JzZXJ2YWJsZTxNYXRNZW51SXRlbT47XG4gICAgYWRkSXRlbShfaXRlbTogTWF0TWVudUl0ZW0pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBtZW51LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKiBAZGVwcmVjYXRlZCBObyBsb25nZXIgYmVpbmcgdXNlZC4gVG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDkuMC4wXG4gICAgICovXG4gICAgcmVtb3ZlSXRlbShfaXRlbTogTWF0TWVudUl0ZW0pOiB2b2lkO1xuICAgIC8qKiBIYW5kbGUgYSBrZXlib2FyZCBldmVudCBmcm9tIHRoZSBtZW51LCBkZWxlZ2F0aW5nIHRvIHRoZSBhcHByb3ByaWF0ZSBhY3Rpb24uICovXG4gICAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEZvY3VzIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBtZW51LlxuICAgICAqIEBwYXJhbSBvcmlnaW4gQWN0aW9uIGZyb20gd2hpY2ggdGhlIGZvY3VzIG9yaWdpbmF0ZWQuIFVzZWQgdG8gc2V0IHRoZSBjb3JyZWN0IHN0eWxpbmcuXG4gICAgICovXG4gICAgZm9jdXNGaXJzdEl0ZW0ob3JpZ2luPzogRm9jdXNPcmlnaW4pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEFjdHVhbCBpbXBsZW1lbnRhdGlvbiB0aGF0IGZvY3VzZXMgdGhlIGZpcnN0IGl0ZW0uIE5lZWRzIHRvIGJlIHNlcGFyYXRlZFxuICAgICAqIG91dCBzbyB3ZSBkb24ndCByZXBlYXQgdGhlIHNhbWUgbG9naWMgaW4gdGhlIHB1YmxpYyBgZm9jdXNGaXJzdEl0ZW1gIG1ldGhvZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9mb2N1c0ZpcnN0SXRlbTtcbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGFjdGl2ZSBpdGVtIGluIHRoZSBtZW51LiBUaGlzIGlzIHVzZWQgd2hlbiB0aGUgbWVudSBpcyBvcGVuZWQsIGFsbG93aW5nXG4gICAgICogdGhlIHVzZXIgdG8gc3RhcnQgZnJvbSB0aGUgZmlyc3Qgb3B0aW9uIHdoZW4gcHJlc3NpbmcgdGhlIGRvd24gYXJyb3cuXG4gICAgICovXG4gICAgcmVzZXRBY3RpdmVJdGVtKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWVudSBwYW5lbCBlbGV2YXRpb24uXG4gICAgICogQHBhcmFtIGRlcHRoIE51bWJlciBvZiBwYXJlbnQgbWVudXMgdGhhdCBjb21lIGJlZm9yZSB0aGUgbWVudS5cbiAgICAgKi9cbiAgICBzZXRFbGV2YXRpb24oZGVwdGg6IG51bWJlcik6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogQWRkcyBjbGFzc2VzIHRvIHRoZSBtZW51IHBhbmVsIGJhc2VkIG9uIGl0cyBwb3NpdGlvbi4gQ2FuIGJlIHVzZWQgYnlcbiAgICAgKiBjb25zdW1lcnMgdG8gYWRkIHNwZWNpZmljIHN0eWxpbmcgYmFzZWQgb24gdGhlIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NYIFBvc2l0aW9uIG9mIHRoZSBtZW51IGFsb25nIHRoZSB4IGF4aXMuXG4gICAgICogQHBhcmFtIHBvc1kgUG9zaXRpb24gb2YgdGhlIG1lbnUgYWxvbmcgdGhlIHkgYXhpcy5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgc2V0UG9zaXRpb25DbGFzc2VzKHBvc1g/OiBNZW51UG9zaXRpb25YLCBwb3NZPzogTWVudVBvc2l0aW9uWSk6IHZvaWQ7XG4gICAgLyoqIFN0YXJ0cyB0aGUgZW50ZXIgYW5pbWF0aW9uLiAqL1xuICAgIF9zdGFydEFuaW1hdGlvbigpOiB2b2lkO1xuICAgIC8qKiBSZXNldHMgdGhlIHBhbmVsIGFuaW1hdGlvbiB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gKi9cbiAgICBfcmVzZXRBbmltYXRpb24oKTogdm9pZDtcbiAgICAvKiogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIHBhbmVsIGFuaW1hdGlvbiBjb21wbGV0ZXMuICovXG4gICAgX29uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkO1xuICAgIF9vbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHN0cmVhbSB0aGF0IHdpbGwga2VlcCB0cmFjayBvZiBhbnkgbmV3bHktYWRkZWQgbWVudSBpdGVtcyBhbmQgd2lsbCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgKiBvZiBkaXJlY3QgZGVzY2VuZGFudHMuIFdlIGNvbGxlY3QgdGhlIGRlc2NlbmRhbnRzIHRoaXMgd2F5LCBiZWNhdXNlIGBfYWxsSXRlbXNgIGNhbiBpbmNsdWRlXG4gICAgICogaXRlbXMgdGhhdCBhcmUgcGFydCBvZiBjaGlsZCBtZW51cywgYW5kIHVzaW5nIGEgY3VzdG9tIHdheSBvZiByZWdpc3RlcmluZyBpdGVtcyBpcyB1bnJlbGlhYmxlXG4gICAgICogd2hlbiBpdCBjb21lcyB0byBtYWludGFpbmluZyB0aGUgaXRlbSBvcmRlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIF91cGRhdGVEaXJlY3REZXNjZW5kYW50cztcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3ZlcmxhcFRyaWdnZXI6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGFzQmFja2Ryb3A6IEJvb2xlYW5JbnB1dDtcbn1cbi8qKiBAZG9jcy1wcml2YXRlIFdlIHNob3cgdGhlIFwiX01hdE1lbnVcIiBjbGFzcyBhcyBcIk1hdE1lbnVcIiBpbiB0aGUgZG9jcy4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdE1lbnUgZXh0ZW5kcyBfTWF0TWVudUJhc2Uge1xufVxuLyoqIEBkb2NzLXB1YmxpYyBNYXRNZW51ICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBfTWF0TWVudSBleHRlbmRzIE1hdE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBuZ1pvbmU6IE5nWm9uZSwgZGVmYXVsdE9wdGlvbnM6IE1hdE1lbnVEZWZhdWx0T3B0aW9ucyk7XG59XG4iXX0=