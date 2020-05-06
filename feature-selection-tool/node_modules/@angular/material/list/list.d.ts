/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ElementRef, QueryList, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CanDisable, CanDisableCtor, CanDisableRipple, CanDisableRippleCtor, MatLine } from '@angular/material/core';
import { Subject } from 'rxjs';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
declare class MatListBase {
}
declare const _MatListMixinBase: CanDisableRippleCtor & CanDisableCtor & typeof MatListBase;
/** @docs-private */
declare class MatListItemBase {
}
declare const _MatListItemMixinBase: CanDisableRippleCtor & typeof MatListItemBase;
export declare class MatNavList extends _MatListMixinBase implements CanDisable, CanDisableRipple, OnChanges, OnDestroy {
    /** Emits when the state of the list changes. */
    _stateChanges: Subject<void>;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatNavList, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatNavList, "mat-nav-list", ["matNavList"], { "disableRipple": "disableRipple"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
export declare class MatList extends _MatListMixinBase implements CanDisable, CanDisableRipple, OnChanges, OnDestroy {
    private _elementRef;
    /** Emits when the state of the list changes. */
    _stateChanges: Subject<void>;
    constructor(_elementRef: ElementRef<HTMLElement>);
    _getListType(): 'list' | 'action-list' | null;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatList, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatList, "mat-list, mat-action-list", ["matList"], { "disableRipple": "disableRipple"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListAvatarCssMatStyler {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatListAvatarCssMatStyler, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatListAvatarCssMatStyler, "[mat-list-avatar], [matListAvatar]", never, {}, {}, never>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListIconCssMatStyler {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatListIconCssMatStyler, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatListIconCssMatStyler, "[mat-list-icon], [matListIcon]", never, {}, {}, never>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListSubheaderCssMatStyler {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatListSubheaderCssMatStyler, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatListSubheaderCssMatStyler, "[mat-subheader], [matSubheader]", never, {}, {}, never>;
}
/** An item within a Material Design list. */
export declare class MatListItem extends _MatListItemMixinBase implements AfterContentInit, CanDisableRipple, OnDestroy {
    private _element;
    private _isInteractiveList;
    private _list?;
    private _destroyed;
    _lines: QueryList<MatLine>;
    _avatar: MatListAvatarCssMatStyler;
    _icon: MatListIconCssMatStyler;
    constructor(_element: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, navList?: MatNavList, list?: MatList);
    /** Whether the option is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Whether this list item should show a ripple effect when clicked. */
    _isRippleDisabled(): boolean;
    /** Retrieves the DOM element of the component host. */
    _getHostElement(): HTMLElement;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatListItem, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatListItem, "mat-list-item, a[mat-list-item], button[mat-list-item]", ["matListItem"], { "disableRipple": "disableRipple"; "disabled": "disabled"; }, {}, ["_avatar", "_icon", "_lines"], ["[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]", "[mat-line], [matLine]", "*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5kLnRzIiwic291cmNlcyI6WyJsaXN0LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIENhbkRpc2FibGVSaXBwbGUsIENhbkRpc2FibGVSaXBwbGVDdG9yLCBNYXRMaW5lIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZGVjbGFyZSBjbGFzcyBNYXRMaXN0QmFzZSB7XG59XG5kZWNsYXJlIGNvbnN0IF9NYXRMaXN0TWl4aW5CYXNlOiBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1hdExpc3RCYXNlO1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0TGlzdEl0ZW1CYXNlIHtcbn1cbmRlY2xhcmUgY29uc3QgX01hdExpc3RJdGVtTWl4aW5CYXNlOiBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIHR5cGVvZiBNYXRMaXN0SXRlbUJhc2U7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXROYXZMaXN0IGV4dGVuZHMgX01hdExpc3RNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlUmlwcGxlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBsaXN0IGNoYW5nZXMuICovXG4gICAgX3N0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPjtcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdExpc3QgZXh0ZW5kcyBfTWF0TGlzdE1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIENhbkRpc2FibGVSaXBwbGUsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmO1xuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgbGlzdCBjaGFuZ2VzLiAqL1xuICAgIF9zdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD47XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KTtcbiAgICBfZ2V0TGlzdFR5cGUoKTogJ2xpc3QnIHwgJ2FjdGlvbi1saXN0JyB8IG51bGw7XG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyIHtcbn1cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyIHtcbn1cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIge1xufVxuLyoqIEFuIGl0ZW0gd2l0aGluIGEgTWF0ZXJpYWwgRGVzaWduIGxpc3QuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRMaXN0SXRlbSBleHRlbmRzIF9NYXRMaXN0SXRlbU1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENhbkRpc2FibGVSaXBwbGUsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfZWxlbWVudDtcbiAgICBwcml2YXRlIF9pc0ludGVyYWN0aXZlTGlzdDtcbiAgICBwcml2YXRlIF9saXN0PztcbiAgICBwcml2YXRlIF9kZXN0cm95ZWQ7XG4gICAgX2xpbmVzOiBRdWVyeUxpc3Q8TWF0TGluZT47XG4gICAgX2F2YXRhcjogTWF0TGlzdEF2YXRhckNzc01hdFN0eWxlcjtcbiAgICBfaWNvbjogTWF0TGlzdEljb25Dc3NNYXRTdHlsZXI7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBuYXZMaXN0PzogTWF0TmF2TGlzdCwgbGlzdD86IE1hdExpc3QpO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBvcHRpb24gaXMgZGlzYWJsZWQuICovXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW47XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKTtcbiAgICBwcml2YXRlIF9kaXNhYmxlZDtcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBXaGV0aGVyIHRoaXMgbGlzdCBpdGVtIHNob3VsZCBzaG93IGEgcmlwcGxlIGVmZmVjdCB3aGVuIGNsaWNrZWQuICovXG4gICAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICAvKiogUmV0cmlldmVzIHRoZSBET00gZWxlbWVudCBvZiB0aGUgY29tcG9uZW50IGhvc3QuICovXG4gICAgX2dldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG5leHBvcnQge307XG4iXX0=