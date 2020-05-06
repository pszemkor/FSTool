/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentChecked, OnInit, QueryList, ElementRef } from '@angular/core';
import { MatGridTile } from './grid-tile';
import { Directionality } from '@angular/cdk/bidi';
import { NumberInput } from '@angular/cdk/coercion';
import { MatGridListBase } from './grid-list-base';
import * as ɵngcc0 from '@angular/core';
export declare class MatGridList implements MatGridListBase, OnInit, AfterContentChecked {
    private _element;
    private _dir;
    /** Number of columns being rendered. */
    private _cols;
    /** Used for determiningthe position of each tile in the grid. */
    private _tileCoordinator;
    /**
     * Row height value passed in by user. This can be one of three types:
     * - Number value (ex: "100px"):  sets a fixed row height to that value
     * - Ratio value (ex: "4:3"): sets the row height based on width:height ratio
     * - "Fit" mode (ex: "fit"): sets the row height to total height divided by number of rows
     */
    private _rowHeight;
    /** The amount of space between tiles. This will be something like '5px' or '2em'. */
    private _gutter;
    /** Sets position and size styles for a tile */
    private _tileStyler;
    /** Query list of tiles that are being rendered. */
    _tiles: QueryList<MatGridTile>;
    constructor(_element: ElementRef<HTMLElement>, _dir: Directionality);
    /** Amount of columns in the grid list. */
    get cols(): number;
    set cols(value: number);
    /** Size of the grid list's gutter in pixels. */
    get gutterSize(): string;
    set gutterSize(value: string);
    /** Set internal representation of row height from the user-provided value. */
    get rowHeight(): string | number;
    set rowHeight(value: string | number);
    ngOnInit(): void;
    /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     */
    ngAfterContentChecked(): void;
    /** Throw a friendly error if cols property is missing */
    private _checkCols;
    /** Default to equal width:height if rowHeight property is missing */
    private _checkRowHeight;
    /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
    private _setTileStyler;
    /** Computes and applies the size and position for all children grid tiles. */
    private _layoutTiles;
    /** Sets style on the main grid-list element, given the style name and value. */
    _setListStyle(style: [string, string | null] | null): void;
    static ngAcceptInputType_cols: NumberInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatGridList, [null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatGridList, "mat-grid-list", ["matGridList"], { "cols": "cols"; "gutterSize": "gutterSize"; "rowHeight": "rowHeight"; }, {}, ["_tiles"], ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1saXN0LmQudHMiLCJzb3VyY2VzIjpbImdyaWQtbGlzdC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25Jbml0LCBRdWVyeUxpc3QsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEdyaWRUaWxlIH0gZnJvbSAnLi9ncmlkLXRpbGUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBOdW1iZXJJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBNYXRHcmlkTGlzdEJhc2UgfSBmcm9tICcuL2dyaWQtbGlzdC1iYXNlJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEdyaWRMaXN0IGltcGxlbWVudHMgTWF0R3JpZExpc3RCYXNlLCBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuICAgIHByaXZhdGUgX2VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfZGlyO1xuICAgIC8qKiBOdW1iZXIgb2YgY29sdW1ucyBiZWluZyByZW5kZXJlZC4gKi9cbiAgICBwcml2YXRlIF9jb2xzO1xuICAgIC8qKiBVc2VkIGZvciBkZXRlcm1pbmluZ3RoZSBwb3NpdGlvbiBvZiBlYWNoIHRpbGUgaW4gdGhlIGdyaWQuICovXG4gICAgcHJpdmF0ZSBfdGlsZUNvb3JkaW5hdG9yO1xuICAgIC8qKlxuICAgICAqIFJvdyBoZWlnaHQgdmFsdWUgcGFzc2VkIGluIGJ5IHVzZXIuIFRoaXMgY2FuIGJlIG9uZSBvZiB0aHJlZSB0eXBlczpcbiAgICAgKiAtIE51bWJlciB2YWx1ZSAoZXg6IFwiMTAwcHhcIik6ICBzZXRzIGEgZml4ZWQgcm93IGhlaWdodCB0byB0aGF0IHZhbHVlXG4gICAgICogLSBSYXRpbyB2YWx1ZSAoZXg6IFwiNDozXCIpOiBzZXRzIHRoZSByb3cgaGVpZ2h0IGJhc2VkIG9uIHdpZHRoOmhlaWdodCByYXRpb1xuICAgICAqIC0gXCJGaXRcIiBtb2RlIChleDogXCJmaXRcIik6IHNldHMgdGhlIHJvdyBoZWlnaHQgdG8gdG90YWwgaGVpZ2h0IGRpdmlkZWQgYnkgbnVtYmVyIG9mIHJvd3NcbiAgICAgKi9cbiAgICBwcml2YXRlIF9yb3dIZWlnaHQ7XG4gICAgLyoqIFRoZSBhbW91bnQgb2Ygc3BhY2UgYmV0d2VlbiB0aWxlcy4gVGhpcyB3aWxsIGJlIHNvbWV0aGluZyBsaWtlICc1cHgnIG9yICcyZW0nLiAqL1xuICAgIHByaXZhdGUgX2d1dHRlcjtcbiAgICAvKiogU2V0cyBwb3NpdGlvbiBhbmQgc2l6ZSBzdHlsZXMgZm9yIGEgdGlsZSAqL1xuICAgIHByaXZhdGUgX3RpbGVTdHlsZXI7XG4gICAgLyoqIFF1ZXJ5IGxpc3Qgb2YgdGlsZXMgdGhhdCBhcmUgYmVpbmcgcmVuZGVyZWQuICovXG4gICAgX3RpbGVzOiBRdWVyeUxpc3Q8TWF0R3JpZFRpbGU+O1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgX2RpcjogRGlyZWN0aW9uYWxpdHkpO1xuICAgIC8qKiBBbW91bnQgb2YgY29sdW1ucyBpbiB0aGUgZ3JpZCBsaXN0LiAqL1xuICAgIGdldCBjb2xzKCk6IG51bWJlcjtcbiAgICBzZXQgY29scyh2YWx1ZTogbnVtYmVyKTtcbiAgICAvKiogU2l6ZSBvZiB0aGUgZ3JpZCBsaXN0J3MgZ3V0dGVyIGluIHBpeGVscy4gKi9cbiAgICBnZXQgZ3V0dGVyU2l6ZSgpOiBzdHJpbmc7XG4gICAgc2V0IGd1dHRlclNpemUodmFsdWU6IHN0cmluZyk7XG4gICAgLyoqIFNldCBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBvZiByb3cgaGVpZ2h0IGZyb20gdGhlIHVzZXItcHJvdmlkZWQgdmFsdWUuICovXG4gICAgZ2V0IHJvd0hlaWdodCgpOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgc2V0IHJvd0hlaWdodCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTtcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFRoZSBsYXlvdXQgY2FsY3VsYXRpb24gaXMgZmFpcmx5IGNoZWFwIGlmIG5vdGhpbmcgY2hhbmdlcywgc28gdGhlcmUncyBsaXR0bGUgY29zdFxuICAgICAqIHRvIHJ1biBpdCBmcmVxdWVudGx5LlxuICAgICAqL1xuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkO1xuICAgIC8qKiBUaHJvdyBhIGZyaWVuZGx5IGVycm9yIGlmIGNvbHMgcHJvcGVydHkgaXMgbWlzc2luZyAqL1xuICAgIHByaXZhdGUgX2NoZWNrQ29scztcbiAgICAvKiogRGVmYXVsdCB0byBlcXVhbCB3aWR0aDpoZWlnaHQgaWYgcm93SGVpZ2h0IHByb3BlcnR5IGlzIG1pc3NpbmcgKi9cbiAgICBwcml2YXRlIF9jaGVja1Jvd0hlaWdodDtcbiAgICAvKiogQ3JlYXRlcyBjb3JyZWN0IFRpbGUgU3R5bGVyIHN1YnR5cGUgYmFzZWQgb24gcm93SGVpZ2h0IHBhc3NlZCBpbiBieSB1c2VyICovXG4gICAgcHJpdmF0ZSBfc2V0VGlsZVN0eWxlcjtcbiAgICAvKiogQ29tcHV0ZXMgYW5kIGFwcGxpZXMgdGhlIHNpemUgYW5kIHBvc2l0aW9uIGZvciBhbGwgY2hpbGRyZW4gZ3JpZCB0aWxlcy4gKi9cbiAgICBwcml2YXRlIF9sYXlvdXRUaWxlcztcbiAgICAvKiogU2V0cyBzdHlsZSBvbiB0aGUgbWFpbiBncmlkLWxpc3QgZWxlbWVudCwgZ2l2ZW4gdGhlIHN0eWxlIG5hbWUgYW5kIHZhbHVlLiAqL1xuICAgIF9zZXRMaXN0U3R5bGUoc3R5bGU6IFtzdHJpbmcsIHN0cmluZyB8IG51bGxdIHwgbnVsbCk6IHZvaWQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NvbHM6IE51bWJlcklucHV0O1xufVxuIl19