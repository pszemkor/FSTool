/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, InjectionToken } from '@angular/core';
import { MatPaginatorIntl } from './paginator-intl';
import { HasInitialized, HasInitializedCtor, ThemePalette, CanDisableCtor, CanDisable } from '@angular/material/core';
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
import * as ɵngcc0 from '@angular/core';
export declare class PageEvent {
    /** The current page index. */
    pageIndex: number;
    /**
     * Index of the page that was selected previously.
     * @breaking-change 8.0.0 To be made into a required property.
     */
    previousPageIndex?: number;
    /** The current page size */
    pageSize: number;
    /** The current total number of items being paged */
    length: number;
}
/** Object that can be used to configure the default options for the paginator module. */
export interface MatPaginatorDefaultOptions {
    /** Number of items to display on a page. By default set to 50. */
    pageSize?: number;
    /** The set of provided page size options to display to the user. */
    pageSizeOptions?: number[];
    /** Whether to hide the page size selection UI from the user. */
    hidePageSize?: boolean;
    /** Whether to show the first/last buttons UI to the user. */
    showFirstLastButtons?: boolean;
}
/** Injection token that can be used to provide the default options for the paginator module. */
export declare const MAT_PAGINATOR_DEFAULT_OPTIONS: InjectionToken<MatPaginatorDefaultOptions>;
/** @docs-private */
declare class MatPaginatorBase {
}
declare const _MatPaginatorBase: CanDisableCtor & HasInitializedCtor & typeof MatPaginatorBase;
/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
export declare class MatPaginator extends _MatPaginatorBase implements OnInit, OnDestroy, CanDisable, HasInitialized {
    _intl: MatPaginatorIntl;
    private _changeDetectorRef;
    private _initialized;
    private _intlChanges;
    /** Theme color to be used for the underlying form controls. */
    color: ThemePalette;
    /** The zero-based page index of the displayed list of items. Defaulted to 0. */
    get pageIndex(): number;
    set pageIndex(value: number);
    private _pageIndex;
    /** The length of the total number of items that are being paginated. Defaulted to 0. */
    get length(): number;
    set length(value: number);
    private _length;
    /** Number of items to display on a page. By default set to 50. */
    get pageSize(): number;
    set pageSize(value: number);
    private _pageSize;
    /** The set of provided page size options to display to the user. */
    get pageSizeOptions(): number[];
    set pageSizeOptions(value: number[]);
    private _pageSizeOptions;
    /** Whether to hide the page size selection UI from the user. */
    get hidePageSize(): boolean;
    set hidePageSize(value: boolean);
    private _hidePageSize;
    /** Whether to show the first/last buttons UI to the user. */
    get showFirstLastButtons(): boolean;
    set showFirstLastButtons(value: boolean);
    private _showFirstLastButtons;
    /** Event emitted when the paginator changes the page size or page index. */
    readonly page: EventEmitter<PageEvent>;
    /** Displayed set of page size options. Will be sorted and include current page size. */
    _displayedPageSizeOptions: number[];
    constructor(_intl: MatPaginatorIntl, _changeDetectorRef: ChangeDetectorRef, defaults?: MatPaginatorDefaultOptions);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Advances to the next page if it exists. */
    nextPage(): void;
    /** Move back to the previous page if it exists. */
    previousPage(): void;
    /** Move to the first page if not already there. */
    firstPage(): void;
    /** Move to the last page if not already there. */
    lastPage(): void;
    /** Whether there is a previous page. */
    hasPreviousPage(): boolean;
    /** Whether there is a next page. */
    hasNextPage(): boolean;
    /** Calculate the number of pages */
    getNumberOfPages(): number;
    /**
     * Changes the page size so that the first item displayed on the page will still be
     * displayed using the new page size.
     *
     * For example, if the page size is 10 and on the second page (items indexed 10-19) then
     * switching so that the page size is 5 will set the third page as the current page so
     * that the 10th item will still be displayed.
     */
    _changePageSize(pageSize: number): void;
    /** Checks whether the buttons for going forwards should be disabled. */
    _nextButtonsDisabled(): boolean;
    /** Checks whether the buttons for going backwards should be disabled. */
    _previousButtonsDisabled(): boolean;
    /**
     * Updates the list of page size options to display to the user. Includes making sure that
     * the page size is an option and that the list is sorted.
     */
    private _updateDisplayedPageSizeOptions;
    /** Emits an event notifying that a change of the paginator's properties has been triggered. */
    private _emitPageEvent;
    static ngAcceptInputType_pageIndex: NumberInput;
    static ngAcceptInputType_length: NumberInput;
    static ngAcceptInputType_pageSize: NumberInput;
    static ngAcceptInputType_hidePageSize: BooleanInput;
    static ngAcceptInputType_showFirstLastButtons: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatPaginator, [null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatPaginator, "mat-paginator", ["matPaginator"], { "disabled": "disabled"; "pageIndex": "pageIndex"; "length": "length"; "pageSize": "pageSize"; "pageSizeOptions": "pageSizeOptions"; "hidePageSize": "hidePageSize"; "showFirstLastButtons": "showFirstLastButtons"; "color": "color"; }, { "page": "page"; }, never, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmQudHMiLCJzb3VyY2VzIjpbInBhZ2luYXRvci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0LCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9ySW50bCB9IGZyb20gJy4vcGFnaW5hdG9yLWludGwnO1xuaW1wb3J0IHsgSGFzSW5pdGlhbGl6ZWQsIEhhc0luaXRpYWxpemVkQ3RvciwgVGhlbWVQYWxldHRlLCBDYW5EaXNhYmxlQ3RvciwgQ2FuRGlzYWJsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuLyoqXG4gKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYVxuICogZGlmZmVyZW50IHBhZ2Ugc2l6ZSBvciBuYXZpZ2F0ZXMgdG8gYW5vdGhlciBwYWdlLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYWdlRXZlbnQge1xuICAgIC8qKiBUaGUgY3VycmVudCBwYWdlIGluZGV4LiAqL1xuICAgIHBhZ2VJbmRleDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBwYWdlIHRoYXQgd2FzIHNlbGVjdGVkIHByZXZpb3VzbHkuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBUbyBiZSBtYWRlIGludG8gYSByZXF1aXJlZCBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBwcmV2aW91c1BhZ2VJbmRleD86IG51bWJlcjtcbiAgICAvKiogVGhlIGN1cnJlbnQgcGFnZSBzaXplICovXG4gICAgcGFnZVNpemU6IG51bWJlcjtcbiAgICAvKiogVGhlIGN1cnJlbnQgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIGJlaW5nIHBhZ2VkICovXG4gICAgbGVuZ3RoOiBudW1iZXI7XG59XG4vKiogT2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBwYWdpbmF0b3IgbW9kdWxlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRQYWdpbmF0b3JEZWZhdWx0T3B0aW9ucyB7XG4gICAgLyoqIE51bWJlciBvZiBpdGVtcyB0byBkaXNwbGF5IG9uIGEgcGFnZS4gQnkgZGVmYXVsdCBzZXQgdG8gNTAuICovXG4gICAgcGFnZVNpemU/OiBudW1iZXI7XG4gICAgLyoqIFRoZSBzZXQgb2YgcHJvdmlkZWQgcGFnZSBzaXplIG9wdGlvbnMgdG8gZGlzcGxheSB0byB0aGUgdXNlci4gKi9cbiAgICBwYWdlU2l6ZU9wdGlvbnM/OiBudW1iZXJbXTtcbiAgICAvKiogV2hldGhlciB0byBoaWRlIHRoZSBwYWdlIHNpemUgc2VsZWN0aW9uIFVJIGZyb20gdGhlIHVzZXIuICovXG4gICAgaGlkZVBhZ2VTaXplPzogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0byBzaG93IHRoZSBmaXJzdC9sYXN0IGJ1dHRvbnMgVUkgdG8gdGhlIHVzZXIuICovXG4gICAgc2hvd0ZpcnN0TGFzdEJ1dHRvbnM/OiBib29sZWFuO1xufVxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHBhZ2luYXRvciBtb2R1bGUuICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfUEFHSU5BVE9SX0RFRkFVTFRfT1BUSU9OUzogSW5qZWN0aW9uVG9rZW48TWF0UGFnaW5hdG9yRGVmYXVsdE9wdGlvbnM+O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0UGFnaW5hdG9yQmFzZSB7XG59XG5kZWNsYXJlIGNvbnN0IF9NYXRQYWdpbmF0b3JCYXNlOiBDYW5EaXNhYmxlQ3RvciAmIEhhc0luaXRpYWxpemVkQ3RvciAmIHR5cGVvZiBNYXRQYWdpbmF0b3JCYXNlO1xuLyoqXG4gKiBDb21wb25lbnQgdG8gcHJvdmlkZSBuYXZpZ2F0aW9uIGJldHdlZW4gcGFnZWQgaW5mb3JtYXRpb24uIERpc3BsYXlzIHRoZSBzaXplIG9mIHRoZSBjdXJyZW50XG4gKiBwYWdlLCB1c2VyLXNlbGVjdGFibGUgb3B0aW9ucyB0byBjaGFuZ2UgdGhhdCBzaXplLCB3aGF0IGl0ZW1zIGFyZSBiZWluZyBzaG93biwgYW5kXG4gKiBuYXZpZ2F0aW9uYWwgYnV0dG9uIHRvIGdvIHRvIHRoZSBwcmV2aW91cyBvciBuZXh0IHBhZ2UuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFBhZ2luYXRvciBleHRlbmRzIF9NYXRQYWdpbmF0b3JCYXNlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIEhhc0luaXRpYWxpemVkIHtcbiAgICBfaW50bDogTWF0UGFnaW5hdG9ySW50bDtcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICBwcml2YXRlIF9pbml0aWFsaXplZDtcbiAgICBwcml2YXRlIF9pbnRsQ2hhbmdlcztcbiAgICAvKiogVGhlbWUgY29sb3IgdG8gYmUgdXNlZCBmb3IgdGhlIHVuZGVybHlpbmcgZm9ybSBjb250cm9scy4gKi9cbiAgICBjb2xvcjogVGhlbWVQYWxldHRlO1xuICAgIC8qKiBUaGUgemVyby1iYXNlZCBwYWdlIGluZGV4IG9mIHRoZSBkaXNwbGF5ZWQgbGlzdCBvZiBpdGVtcy4gRGVmYXVsdGVkIHRvIDAuICovXG4gICAgZ2V0IHBhZ2VJbmRleCgpOiBudW1iZXI7XG4gICAgc2V0IHBhZ2VJbmRleCh2YWx1ZTogbnVtYmVyKTtcbiAgICBwcml2YXRlIF9wYWdlSW5kZXg7XG4gICAgLyoqIFRoZSBsZW5ndGggb2YgdGhlIHRvdGFsIG51bWJlciBvZiBpdGVtcyB0aGF0IGFyZSBiZWluZyBwYWdpbmF0ZWQuIERlZmF1bHRlZCB0byAwLiAqL1xuICAgIGdldCBsZW5ndGgoKTogbnVtYmVyO1xuICAgIHNldCBsZW5ndGgodmFsdWU6IG51bWJlcik7XG4gICAgcHJpdmF0ZSBfbGVuZ3RoO1xuICAgIC8qKiBOdW1iZXIgb2YgaXRlbXMgdG8gZGlzcGxheSBvbiBhIHBhZ2UuIEJ5IGRlZmF1bHQgc2V0IHRvIDUwLiAqL1xuICAgIGdldCBwYWdlU2l6ZSgpOiBudW1iZXI7XG4gICAgc2V0IHBhZ2VTaXplKHZhbHVlOiBudW1iZXIpO1xuICAgIHByaXZhdGUgX3BhZ2VTaXplO1xuICAgIC8qKiBUaGUgc2V0IG9mIHByb3ZpZGVkIHBhZ2Ugc2l6ZSBvcHRpb25zIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXIuICovXG4gICAgZ2V0IHBhZ2VTaXplT3B0aW9ucygpOiBudW1iZXJbXTtcbiAgICBzZXQgcGFnZVNpemVPcHRpb25zKHZhbHVlOiBudW1iZXJbXSk7XG4gICAgcHJpdmF0ZSBfcGFnZVNpemVPcHRpb25zO1xuICAgIC8qKiBXaGV0aGVyIHRvIGhpZGUgdGhlIHBhZ2Ugc2l6ZSBzZWxlY3Rpb24gVUkgZnJvbSB0aGUgdXNlci4gKi9cbiAgICBnZXQgaGlkZVBhZ2VTaXplKCk6IGJvb2xlYW47XG4gICAgc2V0IGhpZGVQYWdlU2l6ZSh2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfaGlkZVBhZ2VTaXplO1xuICAgIC8qKiBXaGV0aGVyIHRvIHNob3cgdGhlIGZpcnN0L2xhc3QgYnV0dG9ucyBVSSB0byB0aGUgdXNlci4gKi9cbiAgICBnZXQgc2hvd0ZpcnN0TGFzdEJ1dHRvbnMoKTogYm9vbGVhbjtcbiAgICBzZXQgc2hvd0ZpcnN0TGFzdEJ1dHRvbnModmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX3Nob3dGaXJzdExhc3RCdXR0b25zO1xuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHBhZ2luYXRvciBjaGFuZ2VzIHRoZSBwYWdlIHNpemUgb3IgcGFnZSBpbmRleC4gKi9cbiAgICByZWFkb25seSBwYWdlOiBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50PjtcbiAgICAvKiogRGlzcGxheWVkIHNldCBvZiBwYWdlIHNpemUgb3B0aW9ucy4gV2lsbCBiZSBzb3J0ZWQgYW5kIGluY2x1ZGUgY3VycmVudCBwYWdlIHNpemUuICovXG4gICAgX2Rpc3BsYXllZFBhZ2VTaXplT3B0aW9uczogbnVtYmVyW107XG4gICAgY29uc3RydWN0b3IoX2ludGw6IE1hdFBhZ2luYXRvckludGwsIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGRlZmF1bHRzPzogTWF0UGFnaW5hdG9yRGVmYXVsdE9wdGlvbnMpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogQWR2YW5jZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHMuICovXG4gICAgbmV4dFBhZ2UoKTogdm9pZDtcbiAgICAvKiogTW92ZSBiYWNrIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0cy4gKi9cbiAgICBwcmV2aW91c1BhZ2UoKTogdm9pZDtcbiAgICAvKiogTW92ZSB0byB0aGUgZmlyc3QgcGFnZSBpZiBub3QgYWxyZWFkeSB0aGVyZS4gKi9cbiAgICBmaXJzdFBhZ2UoKTogdm9pZDtcbiAgICAvKiogTW92ZSB0byB0aGUgbGFzdCBwYWdlIGlmIG5vdCBhbHJlYWR5IHRoZXJlLiAqL1xuICAgIGxhc3RQYWdlKCk6IHZvaWQ7XG4gICAgLyoqIFdoZXRoZXIgdGhlcmUgaXMgYSBwcmV2aW91cyBwYWdlLiAqL1xuICAgIGhhc1ByZXZpb3VzUGFnZSgpOiBib29sZWFuO1xuICAgIC8qKiBXaGV0aGVyIHRoZXJlIGlzIGEgbmV4dCBwYWdlLiAqL1xuICAgIGhhc05leHRQYWdlKCk6IGJvb2xlYW47XG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHBhZ2VzICovXG4gICAgZ2V0TnVtYmVyT2ZQYWdlcygpOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgcGFnZSBzaXplIHNvIHRoYXQgdGhlIGZpcnN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBwYWdlIHdpbGwgc3RpbGwgYmVcbiAgICAgKiBkaXNwbGF5ZWQgdXNpbmcgdGhlIG5ldyBwYWdlIHNpemUuXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSwgaWYgdGhlIHBhZ2Ugc2l6ZSBpcyAxMCBhbmQgb24gdGhlIHNlY29uZCBwYWdlIChpdGVtcyBpbmRleGVkIDEwLTE5KSB0aGVuXG4gICAgICogc3dpdGNoaW5nIHNvIHRoYXQgdGhlIHBhZ2Ugc2l6ZSBpcyA1IHdpbGwgc2V0IHRoZSB0aGlyZCBwYWdlIGFzIHRoZSBjdXJyZW50IHBhZ2Ugc29cbiAgICAgKiB0aGF0IHRoZSAxMHRoIGl0ZW0gd2lsbCBzdGlsbCBiZSBkaXNwbGF5ZWQuXG4gICAgICovXG4gICAgX2NoYW5nZVBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpOiB2b2lkO1xuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgYnV0dG9ucyBmb3IgZ29pbmcgZm9yd2FyZHMgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICAgIF9uZXh0QnV0dG9uc0Rpc2FibGVkKCk6IGJvb2xlYW47XG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBidXR0b25zIGZvciBnb2luZyBiYWNrd2FyZHMgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICAgIF9wcmV2aW91c0J1dHRvbnNEaXNhYmxlZCgpOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGxpc3Qgb2YgcGFnZSBzaXplIG9wdGlvbnMgdG8gZGlzcGxheSB0byB0aGUgdXNlci4gSW5jbHVkZXMgbWFraW5nIHN1cmUgdGhhdFxuICAgICAqIHRoZSBwYWdlIHNpemUgaXMgYW4gb3B0aW9uIGFuZCB0aGF0IHRoZSBsaXN0IGlzIHNvcnRlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF91cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnM7XG4gICAgLyoqIEVtaXRzIGFuIGV2ZW50IG5vdGlmeWluZyB0aGF0IGEgY2hhbmdlIG9mIHRoZSBwYWdpbmF0b3IncyBwcm9wZXJ0aWVzIGhhcyBiZWVuIHRyaWdnZXJlZC4gKi9cbiAgICBwcml2YXRlIF9lbWl0UGFnZUV2ZW50O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9wYWdlSW5kZXg6IE51bWJlcklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9sZW5ndGg6IE51bWJlcklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9wYWdlU2l6ZTogTnVtYmVySW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZGVQYWdlU2l6ZTogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaG93Rmlyc3RMYXN0QnV0dG9uczogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuZXhwb3J0IHt9O1xuIl19