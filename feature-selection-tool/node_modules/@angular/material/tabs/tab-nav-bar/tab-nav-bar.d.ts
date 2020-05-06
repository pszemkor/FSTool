/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
import { CanDisable, CanDisableCtor, CanDisableRipple, CanDisableRippleCtor, HasTabIndex, HasTabIndexCtor, RippleConfig, RippleGlobalOptions, RippleTarget, ThemePalette } from '@angular/material/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { FocusMonitor, FocusableOption } from '@angular/cdk/a11y';
import { MatInkBar } from '../ink-bar';
import { MatPaginatedTabHeader, MatPaginatedTabHeaderItem } from '../paginated-tab-header';
/**
 * Base class with all of the `MatTabNav` functionality.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare abstract class _MatTabNavBase extends MatPaginatedTabHeader implements AfterContentChecked, AfterContentInit, OnDestroy {
    /** Query list of all tab links of the tab navigation. */
    abstract _items: QueryList<MatPaginatedTabHeaderItem & {
        active: boolean;
    }>;
    /** Background color of the tab nav. */
    get backgroundColor(): ThemePalette;
    set backgroundColor(value: ThemePalette);
    private _backgroundColor;
    /** Whether the ripple effect is disabled or not. */
    get disableRipple(): any;
    set disableRipple(value: any);
    private _disableRipple;
    /** Theme color of the nav bar. */
    color: ThemePalette;
    constructor(elementRef: ElementRef, dir: Directionality, ngZone: NgZone, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, 
    /**
     * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
     */
    platform?: Platform, animationMode?: string);
    protected _itemSelected(): void;
    ngAfterContentInit(): void;
    /**
     * Notifies the component that the active link has been changed.
     * @breaking-change 8.0.0 `element` parameter to be removed.
     */
    updateActiveLink(_element?: ElementRef): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<_MatTabNavBase, [null, { optional: true; }, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<_MatTabNavBase, never, never, { "color": "color"; "backgroundColor": "backgroundColor"; "disableRipple": "disableRipple"; }, {}, never>;
}
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export declare class MatTabNav extends _MatTabNavBase {
    _items: QueryList<MatTabLink>;
    _inkBar: MatInkBar;
    _tabListContainer: ElementRef;
    _tabList: ElementRef;
    _nextPaginator: ElementRef<HTMLElement>;
    _previousPaginator: ElementRef<HTMLElement>;
    constructor(elementRef: ElementRef, dir: Directionality, ngZone: NgZone, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, 
    /**
     * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
     */
    platform?: Platform, animationMode?: string);
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatTabNav, [null, { optional: true; }, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatTabNav, "[mat-tab-nav-bar]", ["matTabNavBar", "matTabNav"], { "color": "color"; }, {}, ["_items"], ["*"]>;
}
declare class MatTabLinkMixinBase {
}
declare const _MatTabLinkMixinBase: HasTabIndexCtor & CanDisableRippleCtor & CanDisableCtor & typeof MatTabLinkMixinBase;
/** Base class with all of the `MatTabLink` functionality. */
export declare class _MatTabLinkBase extends _MatTabLinkMixinBase implements OnDestroy, CanDisable, CanDisableRipple, HasTabIndex, RippleTarget, FocusableOption {
    private _tabNavBar;
    elementRef: ElementRef;
    private _focusMonitor;
    /** Whether the tab link is active or not. */
    protected _isActive: boolean;
    /** Whether the link is active. */
    get active(): boolean;
    set active(value: boolean);
    /**
     * Ripple configuration for ripples that are launched on pointer down. The ripple config
     * is set to the global ripple options since we don't have any configurable options for
     * the tab link ripples.
     * @docs-private
     */
    rippleConfig: RippleConfig & RippleGlobalOptions;
    /**
     * Whether ripples are disabled on interaction.
     * @docs-private
     */
    get rippleDisabled(): boolean;
    constructor(_tabNavBar: _MatTabNavBase, elementRef: ElementRef, globalRippleOptions: RippleGlobalOptions | null, tabIndex: string, _focusMonitor: FocusMonitor, animationMode?: string);
    focus(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<_MatTabLinkBase, [null, null, { optional: true; }, { attribute: "tabindex"; }, null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<_MatTabLinkBase, never, never, { "active": "active"; }, {}, never>;
}
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
export declare class MatTabLink extends _MatTabLinkBase implements OnDestroy {
    /** Reference to the RippleRenderer for the tab-link. */
    private _tabLinkRipple;
    constructor(tabNavBar: MatTabNav, elementRef: ElementRef, ngZone: NgZone, platform: Platform, globalRippleOptions: RippleGlobalOptions | null, tabIndex: string, focusMonitor: FocusMonitor, animationMode?: string);
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatTabLink, [null, null, null, null, { optional: true; }, { attribute: "tabindex"; }, null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatTabLink, "[mat-tab-link], [matTabLink]", ["matTabLink"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; }, {}, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuZC50cyIsInNvdXJjZXMiOlsidGFiLW5hdi1iYXIuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgQ2FuRGlzYWJsZVJpcHBsZSwgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsIFJpcHBsZUNvbmZpZywgUmlwcGxlR2xvYmFsT3B0aW9ucywgUmlwcGxlVGFyZ2V0LCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE1hdElua0JhciB9IGZyb20gJy4uL2luay1iYXInO1xuaW1wb3J0IHsgTWF0UGFnaW5hdGVkVGFiSGVhZGVyLCBNYXRQYWdpbmF0ZWRUYWJIZWFkZXJJdGVtIH0gZnJvbSAnLi4vcGFnaW5hdGVkLXRhYi1oZWFkZXInO1xuLyoqXG4gKiBCYXNlIGNsYXNzIHdpdGggYWxsIG9mIHRoZSBgTWF0VGFiTmF2YCBmdW5jdGlvbmFsaXR5LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBhYnN0cmFjdCBjbGFzcyBfTWF0VGFiTmF2QmFzZSBleHRlbmRzIE1hdFBhZ2luYXRlZFRhYkhlYWRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqIFF1ZXJ5IGxpc3Qgb2YgYWxsIHRhYiBsaW5rcyBvZiB0aGUgdGFiIG5hdmlnYXRpb24uICovXG4gICAgYWJzdHJhY3QgX2l0ZW1zOiBRdWVyeUxpc3Q8TWF0UGFnaW5hdGVkVGFiSGVhZGVySXRlbSAmIHtcbiAgICAgICAgYWN0aXZlOiBib29sZWFuO1xuICAgIH0+O1xuICAgIC8qKiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSB0YWIgbmF2LiAqL1xuICAgIGdldCBiYWNrZ3JvdW5kQ29sb3IoKTogVGhlbWVQYWxldHRlO1xuICAgIHNldCBiYWNrZ3JvdW5kQ29sb3IodmFsdWU6IFRoZW1lUGFsZXR0ZSk7XG4gICAgcHJpdmF0ZSBfYmFja2dyb3VuZENvbG9yO1xuICAgIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgZWZmZWN0IGlzIGRpc2FibGVkIG9yIG5vdC4gKi9cbiAgICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBhbnk7XG4gICAgc2V0IGRpc2FibGVSaXBwbGUodmFsdWU6IGFueSk7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTtcbiAgICAvKiogVGhlbWUgY29sb3Igb2YgdGhlIG5hdiBiYXIuICovXG4gICAgY29sb3I6IFRoZW1lUGFsZXR0ZTtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBkaXI6IERpcmVjdGlvbmFsaXR5LCBuZ1pvbmU6IE5nWm9uZSwgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLCBcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBAYnJlYWtpbmctY2hhbmdlIDkuMC4wIGBwbGF0Zm9ybWAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBwbGF0Zm9ybT86IFBsYXRmb3JtLCBhbmltYXRpb25Nb2RlPzogc3RyaW5nKTtcbiAgICBwcm90ZWN0ZWQgX2l0ZW1TZWxlY3RlZCgpOiB2b2lkO1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIE5vdGlmaWVzIHRoZSBjb21wb25lbnQgdGhhdCB0aGUgYWN0aXZlIGxpbmsgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wIGBlbGVtZW50YCBwYXJhbWV0ZXIgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICB1cGRhdGVBY3RpdmVMaW5rKF9lbGVtZW50PzogRWxlbWVudFJlZik6IHZvaWQ7XG59XG4vKipcbiAqIE5hdmlnYXRpb24gY29tcG9uZW50IG1hdGNoaW5nIHRoZSBzdHlsZXMgb2YgdGhlIHRhYiBncm91cCBoZWFkZXIuXG4gKiBQcm92aWRlcyBhbmNob3JlZCBuYXZpZ2F0aW9uIHdpdGggYW5pbWF0ZWQgaW5rIGJhci5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0VGFiTmF2IGV4dGVuZHMgX01hdFRhYk5hdkJhc2Uge1xuICAgIF9pdGVtczogUXVlcnlMaXN0PE1hdFRhYkxpbms+O1xuICAgIF9pbmtCYXI6IE1hdElua0JhcjtcbiAgICBfdGFiTGlzdENvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBfdGFiTGlzdDogRWxlbWVudFJlZjtcbiAgICBfbmV4dFBhZ2luYXRvcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gICAgX3ByZXZpb3VzUGFnaW5hdG9yOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBkaXI6IERpcmVjdGlvbmFsaXR5LCBuZ1pvbmU6IE5nWm9uZSwgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLCBcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBAYnJlYWtpbmctY2hhbmdlIDkuMC4wIGBwbGF0Zm9ybWAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBwbGF0Zm9ybT86IFBsYXRmb3JtLCBhbmltYXRpb25Nb2RlPzogc3RyaW5nKTtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuZGVjbGFyZSBjbGFzcyBNYXRUYWJMaW5rTWl4aW5CYXNlIHtcbn1cbmRlY2xhcmUgY29uc3QgX01hdFRhYkxpbmtNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVSaXBwbGVDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWF0VGFiTGlua01peGluQmFzZTtcbi8qKiBCYXNlIGNsYXNzIHdpdGggYWxsIG9mIHRoZSBgTWF0VGFiTGlua2AgZnVuY3Rpb25hbGl0eS4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIF9NYXRUYWJMaW5rQmFzZSBleHRlbmRzIF9NYXRUYWJMaW5rTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlUmlwcGxlLCBIYXNUYWJJbmRleCwgUmlwcGxlVGFyZ2V0LCBGb2N1c2FibGVPcHRpb24ge1xuICAgIHByaXZhdGUgX3RhYk5hdkJhcjtcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjtcbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGxpbmsgaXMgYWN0aXZlIG9yIG5vdC4gKi9cbiAgICBwcm90ZWN0ZWQgX2lzQWN0aXZlOiBib29sZWFuO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBsaW5rIGlzIGFjdGl2ZS4gKi9cbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW47XG4gICAgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbik7XG4gICAgLyoqXG4gICAgICogUmlwcGxlIGNvbmZpZ3VyYXRpb24gZm9yIHJpcHBsZXMgdGhhdCBhcmUgbGF1bmNoZWQgb24gcG9pbnRlciBkb3duLiBUaGUgcmlwcGxlIGNvbmZpZ1xuICAgICAqIGlzIHNldCB0byB0aGUgZ2xvYmFsIHJpcHBsZSBvcHRpb25zIHNpbmNlIHdlIGRvbid0IGhhdmUgYW55IGNvbmZpZ3VyYWJsZSBvcHRpb25zIGZvclxuICAgICAqIHRoZSB0YWIgbGluayByaXBwbGVzLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByaXBwbGVDb25maWc6IFJpcHBsZUNvbmZpZyAmIFJpcHBsZUdsb2JhbE9wdGlvbnM7XG4gICAgLyoqXG4gICAgICogV2hldGhlciByaXBwbGVzIGFyZSBkaXNhYmxlZCBvbiBpbnRlcmFjdGlvbi5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IHJpcHBsZURpc2FibGVkKCk6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IoX3RhYk5hdkJhcjogX01hdFRhYk5hdkJhc2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGdsb2JhbFJpcHBsZU9wdGlvbnM6IFJpcHBsZUdsb2JhbE9wdGlvbnMgfCBudWxsLCB0YWJJbmRleDogc3RyaW5nLCBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpO1xuICAgIGZvY3VzKCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuLyoqXG4gKiBMaW5rIGluc2lkZSBvZiBhIGBtYXQtdGFiLW5hdi1iYXJgLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRUYWJMaW5rIGV4dGVuZHMgX01hdFRhYkxpbmtCYXNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBSaXBwbGVSZW5kZXJlciBmb3IgdGhlIHRhYi1saW5rLiAqL1xuICAgIHByaXZhdGUgX3RhYkxpbmtSaXBwbGU7XG4gICAgY29uc3RydWN0b3IodGFiTmF2QmFyOiBNYXRUYWJOYXYsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lLCBwbGF0Zm9ybTogUGxhdGZvcm0sIGdsb2JhbFJpcHBsZU9wdGlvbnM6IFJpcHBsZUdsb2JhbE9wdGlvbnMgfCBudWxsLCB0YWJJbmRleDogc3RyaW5nLCBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgYW5pbWF0aW9uTW9kZT86IHN0cmluZyk7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==