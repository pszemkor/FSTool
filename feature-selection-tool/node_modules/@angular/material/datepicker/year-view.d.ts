/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { DateAdapter, MatDateFormats } from '@angular/material/core';
import { Directionality } from '@angular/cdk/bidi';
import { MatCalendarBody, MatCalendarCell } from './calendar-body';
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatYearView<D> implements AfterContentInit, OnDestroy {
    private _changeDetectorRef;
    private _dateFormats;
    _dateAdapter: DateAdapter<D>;
    private _dir?;
    private _rerenderSubscription;
    /** The date to display in this year view (everything other than the year is ignored). */
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
    /** Emits when a new month is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** Emits the selected month. This doesn't imply a change on the selected date */
    readonly monthSelected: EventEmitter<D>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    /** The body of calendar table */
    _matCalendarBody: MatCalendarBody;
    /** Grid of calendar cells representing the months of the year. */
    _months: MatCalendarCell[][];
    /** The label for this year (e.g. "2017"). */
    _yearLabel: string;
    /** The month in this year that today falls on. Null if today is in a different year. */
    _todayMonth: number | null;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     */
    _selectedMonth: number | null;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateFormats: MatDateFormats, _dateAdapter: DateAdapter<D>, _dir?: Directionality | undefined);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Handles when a new month is selected. */
    _monthSelected(month: number): void;
    /** Handles keydown events on the calendar body when calendar is in year view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Initializes this year view. */
    _init(): void;
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(): void;
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private _getMonthInCurrentYear;
    /** Creates an MatCalendarCell for the given month. */
    private _createCellForMonth;
    /** Whether the given month is enabled. */
    private _shouldEnableMonth;
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    private _isYearAndMonthAfterMaxDate;
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    private _isYearAndMonthBeforeMinDate;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    /** Determines whether the user has the RTL layout direction. */
    private _isRtl;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatYearView<any>, [null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatYearView<any>, "mat-year-view", ["matYearView"], { "activeDate": "activeDate"; "selected": "selected"; "minDate": "minDate"; "maxDate": "maxDate"; "dateFilter": "dateFilter"; }, { "selectedChange": "selectedChange"; "monthSelected": "monthSelected"; "activeDateChange": "activeDateChange"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmQudHMiLCJzb3VyY2VzIjpbInllYXItdmlldy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgTWF0Q2FsZW5kYXJCb2R5LCBNYXRDYWxlbmRhckNlbGwgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGEgc2luZ2xlIHllYXIgaW4gdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFllYXJWaWV3PEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICBwcml2YXRlIF9kYXRlRm9ybWF0cztcbiAgICBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+O1xuICAgIHByaXZhdGUgX2Rpcj87XG4gICAgcHJpdmF0ZSBfcmVyZW5kZXJTdWJzY3JpcHRpb247XG4gICAgLyoqIFRoZSBkYXRlIHRvIGRpc3BsYXkgaW4gdGhpcyB5ZWFyIHZpZXcgKGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiB0aGUgeWVhciBpcyBpZ25vcmVkKS4gKi9cbiAgICBnZXQgYWN0aXZlRGF0ZSgpOiBEO1xuICAgIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKTtcbiAgICBwcml2YXRlIF9hY3RpdmVEYXRlO1xuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsO1xuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpO1xuICAgIHByaXZhdGUgX3NlbGVjdGVkO1xuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGw7XG4gICAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKTtcbiAgICBwcml2YXRlIF9taW5EYXRlO1xuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1heERhdGUoKTogRCB8IG51bGw7XG4gICAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKTtcbiAgICBwcml2YXRlIF9tYXhEYXRlO1xuICAgIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xuICAgIGRhdGVGaWx0ZXI6IChkYXRlOiBEKSA9PiBib29sZWFuO1xuICAgIC8qKiBFbWl0cyB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkLiAqL1xuICAgIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD47XG4gICAgLyoqIEVtaXRzIHRoZSBzZWxlY3RlZCBtb250aC4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlICovXG4gICAgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+O1xuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgICByZWFkb25seSBhY3RpdmVEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD47XG4gICAgLyoqIFRoZSBib2R5IG9mIGNhbGVuZGFyIHRhYmxlICovXG4gICAgX21hdENhbGVuZGFyQm9keTogTWF0Q2FsZW5kYXJCb2R5O1xuICAgIC8qKiBHcmlkIG9mIGNhbGVuZGFyIGNlbGxzIHJlcHJlc2VudGluZyB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLiAqL1xuICAgIF9tb250aHM6IE1hdENhbGVuZGFyQ2VsbFtdW107XG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhpcyB5ZWFyIChlLmcuIFwiMjAxN1wiKS4gKi9cbiAgICBfeWVhckxhYmVsOiBzdHJpbmc7XG4gICAgLyoqIFRoZSBtb250aCBpbiB0aGlzIHllYXIgdGhhdCB0b2RheSBmYWxscyBvbi4gTnVsbCBpZiB0b2RheSBpcyBpbiBhIGRpZmZlcmVudCB5ZWFyLiAqL1xuICAgIF90b2RheU1vbnRoOiBudW1iZXIgfCBudWxsO1xuICAgIC8qKlxuICAgICAqIFRoZSBtb250aCBpbiB0aGlzIHllYXIgdGhhdCB0aGUgc2VsZWN0ZWQgRGF0ZSBmYWxscyBvbi5cbiAgICAgKiBOdWxsIGlmIHRoZSBzZWxlY3RlZCBEYXRlIGlzIGluIGEgZGlmZmVyZW50IHllYXIuXG4gICAgICovXG4gICAgX3NlbGVjdGVkTW9udGg6IG51bWJlciB8IG51bGw7XG4gICAgY29uc3RydWN0b3IoX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cywgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPiwgX2Rpcj86IERpcmVjdGlvbmFsaXR5IHwgdW5kZWZpbmVkKTtcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBIYW5kbGVzIHdoZW4gYSBuZXcgbW9udGggaXMgc2VsZWN0ZWQuICovXG4gICAgX21vbnRoU2VsZWN0ZWQobW9udGg6IG51bWJlcik6IHZvaWQ7XG4gICAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiB5ZWFyIHZpZXcuICovXG4gICAgX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkO1xuICAgIC8qKiBJbml0aWFsaXplcyB0aGlzIHllYXIgdmlldy4gKi9cbiAgICBfaW5pdCgpOiB2b2lkO1xuICAgIC8qKiBGb2N1c2VzIHRoZSBhY3RpdmUgY2VsbCBhZnRlciB0aGUgbWljcm90YXNrIHF1ZXVlIGlzIGVtcHR5LiAqL1xuICAgIF9mb2N1c0FjdGl2ZUNlbGwoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtb250aCBpbiB0aGlzIHllYXIgdGhhdCB0aGUgZ2l2ZW4gRGF0ZSBmYWxscyBvbi5cbiAgICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIERhdGUgaXMgaW4gYW5vdGhlciB5ZWFyLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2dldE1vbnRoSW5DdXJyZW50WWVhcjtcbiAgICAvKiogQ3JlYXRlcyBhbiBNYXRDYWxlbmRhckNlbGwgZm9yIHRoZSBnaXZlbiBtb250aC4gKi9cbiAgICBwcml2YXRlIF9jcmVhdGVDZWxsRm9yTW9udGg7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIG1vbnRoIGlzIGVuYWJsZWQuICovXG4gICAgcHJpdmF0ZSBfc2hvdWxkRW5hYmxlTW9udGg7XG4gICAgLyoqXG4gICAgICogVGVzdHMgd2hldGhlciB0aGUgY29tYmluYXRpb24gbW9udGgveWVhciBpcyBhZnRlciB0aGlzLm1heERhdGUsIGNvbnNpZGVyaW5nXG4gICAgICoganVzdCB0aGUgbW9udGggYW5kIHllYXIgb2YgdGhpcy5tYXhEYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaXNZZWFyQW5kTW9udGhBZnRlck1heERhdGU7XG4gICAgLyoqXG4gICAgICogVGVzdHMgd2hldGhlciB0aGUgY29tYmluYXRpb24gbW9udGgveWVhciBpcyBiZWZvcmUgdGhpcy5taW5EYXRlLCBjb25zaWRlcmluZ1xuICAgICAqIGp1c3QgdGhlIG1vbnRoIGFuZCB5ZWFyIG9mIHRoaXMubWluRGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2lzWWVhckFuZE1vbnRoQmVmb3JlTWluRGF0ZTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbDtcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgUlRMIGxheW91dCBkaXJlY3Rpb24uICovXG4gICAgcHJpdmF0ZSBfaXNSdGw7XG59XG4iXX0=