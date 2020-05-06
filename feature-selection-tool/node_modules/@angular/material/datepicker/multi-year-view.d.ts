/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Directionality } from '@angular/cdk/bidi';
import { MatCalendarBody, MatCalendarCell } from './calendar-body';
import * as ɵngcc0 from '@angular/core';
export declare const yearsPerPage = 24;
export declare const yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
export declare class MatMultiYearView<D> implements AfterContentInit, OnDestroy {
    private _changeDetectorRef;
    _dateAdapter: DateAdapter<D>;
    private _dir?;
    private _rerenderSubscription;
    /** The date to display in this multi-year view (everything other than the year is ignored). */
    get activeDate(): D;
    set activeDate(value: D);
    private _activeDate;
    /** The currently selected date. */
    get selected(): D | null;
    set selected(value: D | null);
    private _selected;
    /** The minimum selectable date. */
    get minDate(): D | null;
    set minDate(value: D | null);
    private _minDate;
    /** The maximum selectable date. */
    get maxDate(): D | null;
    set maxDate(value: D | null);
    private _maxDate;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when a new year is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** Emits the selected year. This doesn't imply a change on the selected date */
    readonly yearSelected: EventEmitter<D>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    /** The body of calendar table */
    _matCalendarBody: MatCalendarBody;
    /** Grid of calendar cells representing the currently displayed years. */
    _years: MatCalendarCell[][];
    /** The year that today falls on. */
    _todayYear: number;
    /** The year of the selected date. Null if the selected date is null. */
    _selectedYear: number | null;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateAdapter: DateAdapter<D>, _dir?: Directionality | undefined);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Initializes this multi-year view. */
    _init(): void;
    /** Handles when a new year is selected. */
    _yearSelected(year: number): void;
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    _getActiveCell(): number;
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(): void;
    /** Creates an MatCalendarCell for the given year. */
    private _createCellForYear;
    /** Whether the given year is enabled. */
    private _shouldEnableYear;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    /** Determines whether the user has the RTL layout direction. */
    private _isRtl;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatMultiYearView<any>, [null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatMultiYearView<any>, "mat-multi-year-view", ["matMultiYearView"], { "activeDate": "activeDate"; "selected": "selected"; "minDate": "minDate"; "maxDate": "maxDate"; "dateFilter": "dateFilter"; }, { "selectedChange": "selectedChange"; "yearSelected": "yearSelected"; "activeDateChange": "activeDateChange"; }, never, never>;
}
export declare function isSameMultiYearView<D>(dateAdapter: DateAdapter<D>, date1: D, date2: D, minDate: D | null, maxDate: D | null): boolean;
/**
 * When the multi-year view is first opened, the active year will be in view.
 * So we compute how many years are between the active year and the *slot* where our
 * "startingYear" will render when paged into view.
 */
export declare function getActiveOffset<D>(dateAdapter: DateAdapter<D>, activeDate: D, minDate: D | null, maxDate: D | null): number;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGkteWVhci12aWV3LmQudHMiLCJzb3VyY2VzIjpbIm11bHRpLXllYXItdmlldy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE1hdENhbGVuZGFyQm9keSwgTWF0Q2FsZW5kYXJDZWxsIH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IHllYXJzUGVyUGFnZSA9IDI0O1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgeWVhcnNQZXJSb3cgPSA0O1xuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGEgeWVhciBzZWxlY3RvciBpbiB0aGUgZGF0ZXBpY2tlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0TXVsdGlZZWFyVmlldzxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPjtcbiAgICBwcml2YXRlIF9kaXI/O1xuICAgIHByaXZhdGUgX3JlcmVuZGVyU3Vic2NyaXB0aW9uO1xuICAgIC8qKiBUaGUgZGF0ZSB0byBkaXNwbGF5IGluIHRoaXMgbXVsdGkteWVhciB2aWV3IChldmVyeXRoaW5nIG90aGVyIHRoYW4gdGhlIHllYXIgaXMgaWdub3JlZCkuICovXG4gICAgZ2V0IGFjdGl2ZURhdGUoKTogRDtcbiAgICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCk7XG4gICAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTtcbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICAgIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbDtcbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKTtcbiAgICBwcml2YXRlIF9zZWxlY3RlZDtcbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsO1xuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCk7XG4gICAgcHJpdmF0ZSBfbWluRGF0ZTtcbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsO1xuICAgIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCk7XG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTtcbiAgICAvKiogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgICBkYXRlRmlsdGVyOiAoZGF0ZTogRCkgPT4gYm9vbGVhbjtcbiAgICAvKiogRW1pdHMgd2hlbiBhIG5ldyB5ZWFyIGlzIHNlbGVjdGVkLiAqL1xuICAgIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD47XG4gICAgLyoqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUgKi9cbiAgICByZWFkb25seSB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPjtcbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gICAgcmVhZG9ubHkgYWN0aXZlRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEQ+O1xuICAgIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xuICAgIF9tYXRDYWxlbmRhckJvZHk6IE1hdENhbGVuZGFyQm9keTtcbiAgICAvKiogR3JpZCBvZiBjYWxlbmRhciBjZWxscyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgeWVhcnMuICovXG4gICAgX3llYXJzOiBNYXRDYWxlbmRhckNlbGxbXVtdO1xuICAgIC8qKiBUaGUgeWVhciB0aGF0IHRvZGF5IGZhbGxzIG9uLiAqL1xuICAgIF90b2RheVllYXI6IG51bWJlcjtcbiAgICAvKiogVGhlIHllYXIgb2YgdGhlIHNlbGVjdGVkIGRhdGUuIE51bGwgaWYgdGhlIHNlbGVjdGVkIGRhdGUgaXMgbnVsbC4gKi9cbiAgICBfc2VsZWN0ZWRZZWFyOiBudW1iZXIgfCBudWxsO1xuICAgIGNvbnN0cnVjdG9yKF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sIF9kaXI/OiBEaXJlY3Rpb25hbGl0eSB8IHVuZGVmaW5lZCk7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogSW5pdGlhbGl6ZXMgdGhpcyBtdWx0aS15ZWFyIHZpZXcuICovXG4gICAgX2luaXQoKTogdm9pZDtcbiAgICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IHllYXIgaXMgc2VsZWN0ZWQuICovXG4gICAgX3llYXJTZWxlY3RlZCh5ZWFyOiBudW1iZXIpOiB2b2lkO1xuICAgIC8qKiBIYW5kbGVzIGtleWRvd24gZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbXVsdGkteWVhciB2aWV3LiAqL1xuICAgIF9oYW5kbGVDYWxlbmRhckJvZHlLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZDtcbiAgICBfZ2V0QWN0aXZlQ2VsbCgpOiBudW1iZXI7XG4gICAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXG4gICAgX2ZvY3VzQWN0aXZlQ2VsbCgpOiB2b2lkO1xuICAgIC8qKiBDcmVhdGVzIGFuIE1hdENhbGVuZGFyQ2VsbCBmb3IgdGhlIGdpdmVuIHllYXIuICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlQ2VsbEZvclllYXI7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHllYXIgaXMgZW5hYmxlZC4gKi9cbiAgICBwcml2YXRlIF9zaG91bGRFbmFibGVZZWFyO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsO1xuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBSVEwgbGF5b3V0IGRpcmVjdGlvbi4gKi9cbiAgICBwcml2YXRlIF9pc1J0bDtcbn1cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGlzU2FtZU11bHRpWWVhclZpZXc8RD4oZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LCBkYXRlMTogRCwgZGF0ZTI6IEQsIG1pbkRhdGU6IEQgfCBudWxsLCBtYXhEYXRlOiBEIHwgbnVsbCk6IGJvb2xlYW47XG4vKipcbiAqIFdoZW4gdGhlIG11bHRpLXllYXIgdmlldyBpcyBmaXJzdCBvcGVuZWQsIHRoZSBhY3RpdmUgeWVhciB3aWxsIGJlIGluIHZpZXcuXG4gKiBTbyB3ZSBjb21wdXRlIGhvdyBtYW55IHllYXJzIGFyZSBiZXR3ZWVuIHRoZSBhY3RpdmUgeWVhciBhbmQgdGhlICpzbG90KiB3aGVyZSBvdXJcbiAqIFwic3RhcnRpbmdZZWFyXCIgd2lsbCByZW5kZXIgd2hlbiBwYWdlZCBpbnRvIHZpZXcuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGdldEFjdGl2ZU9mZnNldDxEPihkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sIGFjdGl2ZURhdGU6IEQsIG1pbkRhdGU6IEQgfCBudWxsLCBtYXhEYXRlOiBEIHwgbnVsbCk6IG51bWJlcjtcbiJdfQ==