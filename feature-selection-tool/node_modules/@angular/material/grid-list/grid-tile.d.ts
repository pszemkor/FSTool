/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, QueryList, AfterContentInit } from '@angular/core';
import { MatLine } from '@angular/material/core';
import { NumberInput } from '@angular/cdk/coercion';
import { MatGridListBase } from './grid-list-base';
import * as ɵngcc0 from '@angular/core';
export declare class MatGridTile {
    private _element;
    _gridList?: MatGridListBase | undefined;
    _rowspan: number;
    _colspan: number;
    constructor(_element: ElementRef<HTMLElement>, _gridList?: MatGridListBase | undefined);
    /** Amount of rows that the grid tile takes up. */
    get rowspan(): number;
    set rowspan(value: number);
    /** Amount of columns that the grid tile takes up. */
    get colspan(): number;
    set colspan(value: number);
    /**
     * Sets the style of the grid-tile element.  Needs to be set manually to avoid
     * "Changed after checked" errors that would occur with HostBinding.
     */
    _setStyle(property: string, value: any): void;
    static ngAcceptInputType_rowspan: NumberInput;
    static ngAcceptInputType_colspan: NumberInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatGridTile, [null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatGridTile, "mat-grid-tile", ["matGridTile"], { "rowspan": "rowspan"; "colspan": "colspan"; }, {}, never, ["*"]>;
}
export declare class MatGridTileText implements AfterContentInit {
    private _element;
    _lines: QueryList<MatLine>;
    constructor(_element: ElementRef<HTMLElement>);
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatGridTileText, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatGridTileText, "mat-grid-tile-header, mat-grid-tile-footer", never, {}, {}, ["_lines"], ["[mat-grid-avatar], [matGridAvatar]", "[mat-line], [matLine]", "*"]>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatGridAvatarCssMatStyler {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatGridAvatarCssMatStyler, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatGridAvatarCssMatStyler, "[mat-grid-avatar], [matGridAvatar]", never, {}, {}, never>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatGridTileHeaderCssMatStyler {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatGridTileHeaderCssMatStyler, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatGridTileHeaderCssMatStyler, "mat-grid-tile-header", never, {}, {}, never>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatGridTileFooterCssMatStyler {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatGridTileFooterCssMatStyler, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatGridTileFooterCssMatStyler, "mat-grid-tile-footer", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC10aWxlLmQudHMiLCJzb3VyY2VzIjpbImdyaWQtdGlsZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCwgQWZ0ZXJDb250ZW50SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0TGluZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTWF0R3JpZExpc3RCYXNlIH0gZnJvbSAnLi9ncmlkLWxpc3QtYmFzZSc7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRHcmlkVGlsZSB7XG4gICAgcHJpdmF0ZSBfZWxlbWVudDtcbiAgICBfZ3JpZExpc3Q/OiBNYXRHcmlkTGlzdEJhc2UgfCB1bmRlZmluZWQ7XG4gICAgX3Jvd3NwYW46IG51bWJlcjtcbiAgICBfY29sc3BhbjogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgX2dyaWRMaXN0PzogTWF0R3JpZExpc3RCYXNlIHwgdW5kZWZpbmVkKTtcbiAgICAvKiogQW1vdW50IG9mIHJvd3MgdGhhdCB0aGUgZ3JpZCB0aWxlIHRha2VzIHVwLiAqL1xuICAgIGdldCByb3dzcGFuKCk6IG51bWJlcjtcbiAgICBzZXQgcm93c3Bhbih2YWx1ZTogbnVtYmVyKTtcbiAgICAvKiogQW1vdW50IG9mIGNvbHVtbnMgdGhhdCB0aGUgZ3JpZCB0aWxlIHRha2VzIHVwLiAqL1xuICAgIGdldCBjb2xzcGFuKCk6IG51bWJlcjtcbiAgICBzZXQgY29sc3Bhbih2YWx1ZTogbnVtYmVyKTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzdHlsZSBvZiB0aGUgZ3JpZC10aWxlIGVsZW1lbnQuICBOZWVkcyB0byBiZSBzZXQgbWFudWFsbHkgdG8gYXZvaWRcbiAgICAgKiBcIkNoYW5nZWQgYWZ0ZXIgY2hlY2tlZFwiIGVycm9ycyB0aGF0IHdvdWxkIG9jY3VyIHdpdGggSG9zdEJpbmRpbmcuXG4gICAgICovXG4gICAgX3NldFN0eWxlKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yb3dzcGFuOiBOdW1iZXJJbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY29sc3BhbjogTnVtYmVySW5wdXQ7XG59XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRHcmlkVGlsZVRleHQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBwcml2YXRlIF9lbGVtZW50O1xuICAgIF9saW5lczogUXVlcnlMaXN0PE1hdExpbmU+O1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pik7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG59XG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRHcmlkQXZhdGFyQ3NzTWF0U3R5bGVyIHtcbn1cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEdyaWRUaWxlSGVhZGVyQ3NzTWF0U3R5bGVyIHtcbn1cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEdyaWRUaWxlRm9vdGVyQ3NzTWF0U3R5bGVyIHtcbn1cbiJdfQ==