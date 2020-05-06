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
import { MatCalendarBody, MatCalendarCell, MatCalendarCellCssClasses } from './calendar-body';
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatMonthView<D> implements AfterContentInit, OnDestroy {
    private _changeDetectorRef;
    private _dateFormats;
    _dateAdapter: DateAdapter<D>;
    private _dir?;
    private _rerenderSubscription;
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
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
    /** Function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Function that can be used to add custom CSS classes to dates. */
    dateClass: (date: D) => MatCalendarCellCssClasses;
    /** Emits when a new date is selected. */
    readonly selectedChange: EventEmitter<D | null>;
    /** Emits when any date is selected. */
    readonly _userSelection: EventEmitter<void>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    /** The body of calendar table */
    _matCalendarBody: MatCalendarBody;
    /** The label for this month (e.g. "January 2017"). */
    _monthLabel: string;
    /** Grid of calendar cells representing the dates of the month. */
    _weeks: MatCalendarCell[][];
    /** The number of blank cells in the first row before the 1st of the month. */
    _firstWeekOffset: number;
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     */
    _selectedDate: number | null;
    /** The date of the month that today falls on. Null if today is in another month. */
    _todayDate: number | null;
    /** The names of the weekdays. */
    _weekdays: {
        long: string;
        narrow: string;
    }[];
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateFormats: MatDateFormats, _dateAdapter: DateAdapter<D>, _dir?: Directionality | undefined);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Handles when a new date is selected. */
    _dateSelected(date: number): void;
    /** Handles keydown events on the calendar body when calendar is in month view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Initializes this month view. */
    _init(): void;
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(): void;
    /** Initializes the weekdays. */
    private _initWeekdays;
    /** Creates MatCalendarCells for the dates in this month. */
    private _createWeekCells;
    /** Date filter for the month */
    private _shouldEnableDate;
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    private _getDateInCurrentMonth;
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    private _hasSameMonthAndYear;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    /** Determines whether the user has the RTL layout direction. */
    private _isRtl;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatMonthView<any>, [null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatMonthView<any>, "mat-month-view", ["matMonthView"], { "activeDate": "activeDate"; "selected": "selected"; "minDate": "minDate"; "maxDate": "maxDate"; "dateFilter": "dateFilter"; "dateClass": "dateClass"; }, { "selectedChange": "selectedChange"; "_userSelection": "_userSelection"; "activeDateChange": "activeDateChange"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5kLnRzIiwic291cmNlcyI6WyJtb250aC12aWV3LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgTWF0Q2FsZW5kYXJCb2R5LCBNYXRDYWxlbmRhckNlbGwsIE1hdENhbGVuZGFyQ2VsbENzc0NsYXNzZXMgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGEgc2luZ2xlIG1vbnRoIGluIHRoZSBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRNb250aFZpZXc8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmO1xuICAgIHByaXZhdGUgX2RhdGVGb3JtYXRzO1xuICAgIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD47XG4gICAgcHJpdmF0ZSBfZGlyPztcbiAgICBwcml2YXRlIF9yZXJlbmRlclN1YnNjcmlwdGlvbjtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0ZSB0byBkaXNwbGF5IGluIHRoaXMgbW9udGggdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSBtb250aCBhbmQgeWVhciBpcyBpZ25vcmVkKS5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlRGF0ZSgpOiBEO1xuICAgIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKTtcbiAgICBwcml2YXRlIF9hY3RpdmVEYXRlO1xuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsO1xuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpO1xuICAgIHByaXZhdGUgX3NlbGVjdGVkO1xuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGw7XG4gICAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKTtcbiAgICBwcml2YXRlIF9taW5EYXRlO1xuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1heERhdGUoKTogRCB8IG51bGw7XG4gICAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKTtcbiAgICBwcml2YXRlIF9tYXhEYXRlO1xuICAgIC8qKiBGdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgICBkYXRlRmlsdGVyOiAoZGF0ZTogRCkgPT4gYm9vbGVhbjtcbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgY3VzdG9tIENTUyBjbGFzc2VzIHRvIGRhdGVzLiAqL1xuICAgIGRhdGVDbGFzczogKGRhdGU6IEQpID0+IE1hdENhbGVuZGFyQ2VsbENzc0NsYXNzZXM7XG4gICAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEQgfCBudWxsPjtcbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICByZWFkb25seSBfdXNlclNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgICByZWFkb25seSBhY3RpdmVEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD47XG4gICAgLyoqIFRoZSBib2R5IG9mIGNhbGVuZGFyIHRhYmxlICovXG4gICAgX21hdENhbGVuZGFyQm9keTogTWF0Q2FsZW5kYXJCb2R5O1xuICAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoaXMgbW9udGggKGUuZy4gXCJKYW51YXJ5IDIwMTdcIikuICovXG4gICAgX21vbnRoTGFiZWw6IHN0cmluZztcbiAgICAvKiogR3JpZCBvZiBjYWxlbmRhciBjZWxscyByZXByZXNlbnRpbmcgdGhlIGRhdGVzIG9mIHRoZSBtb250aC4gKi9cbiAgICBfd2Vla3M6IE1hdENhbGVuZGFyQ2VsbFtdW107XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgaW4gdGhlIGZpcnN0IHJvdyBiZWZvcmUgdGhlIDFzdCBvZiB0aGUgbW9udGguICovXG4gICAgX2ZpcnN0V2Vla09mZnNldDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRGF0ZSBmYWxscyBvbi5cbiAgICAgKiBOdWxsIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRGF0ZSBpcyBpbiBhbm90aGVyIG1vbnRoLlxuICAgICAqL1xuICAgIF9zZWxlY3RlZERhdGU6IG51bWJlciB8IG51bGw7XG4gICAgLyoqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRvZGF5IGZhbGxzIG9uLiBOdWxsIGlmIHRvZGF5IGlzIGluIGFub3RoZXIgbW9udGguICovXG4gICAgX3RvZGF5RGF0ZTogbnVtYmVyIHwgbnVsbDtcbiAgICAvKiogVGhlIG5hbWVzIG9mIHRoZSB3ZWVrZGF5cy4gKi9cbiAgICBfd2Vla2RheXM6IHtcbiAgICAgICAgbG9uZzogc3RyaW5nO1xuICAgICAgICBuYXJyb3c6IHN0cmluZztcbiAgICB9W107XG4gICAgY29uc3RydWN0b3IoX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cywgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPiwgX2Rpcj86IERpcmVjdGlvbmFsaXR5IHwgdW5kZWZpbmVkKTtcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBIYW5kbGVzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBfZGF0ZVNlbGVjdGVkKGRhdGU6IG51bWJlcik6IHZvaWQ7XG4gICAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xuICAgIF9oYW5kbGVDYWxlbmRhckJvZHlLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZDtcbiAgICAvKiogSW5pdGlhbGl6ZXMgdGhpcyBtb250aCB2aWV3LiAqL1xuICAgIF9pbml0KCk6IHZvaWQ7XG4gICAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXG4gICAgX2ZvY3VzQWN0aXZlQ2VsbCgpOiB2b2lkO1xuICAgIC8qKiBJbml0aWFsaXplcyB0aGUgd2Vla2RheXMuICovXG4gICAgcHJpdmF0ZSBfaW5pdFdlZWtkYXlzO1xuICAgIC8qKiBDcmVhdGVzIE1hdENhbGVuZGFyQ2VsbHMgZm9yIHRoZSBkYXRlcyBpbiB0aGlzIG1vbnRoLiAqL1xuICAgIHByaXZhdGUgX2NyZWF0ZVdlZWtDZWxscztcbiAgICAvKiogRGF0ZSBmaWx0ZXIgZm9yIHRoZSBtb250aCAqL1xuICAgIHByaXZhdGUgX3Nob3VsZEVuYWJsZURhdGU7XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0ZSBpbiB0aGlzIG1vbnRoIHRoYXQgdGhlIGdpdmVuIERhdGUgZmFsbHMgb24uXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSBnaXZlbiBEYXRlIGlzIGluIGFub3RoZXIgbW9udGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0RGF0ZUluQ3VycmVudE1vbnRoO1xuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgMiBkYXRlcyBhcmUgbm9uLW51bGwgYW5kIGZhbGwgd2l0aGluIHRoZSBzYW1lIG1vbnRoIG9mIHRoZSBzYW1lIHllYXIuICovXG4gICAgcHJpdmF0ZSBfaGFzU2FtZU1vbnRoQW5kWWVhcjtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbDtcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgUlRMIGxheW91dCBkaXJlY3Rpb24uICovXG4gICAgcHJpdmF0ZSBfaXNSdGw7XG59XG4iXX0=