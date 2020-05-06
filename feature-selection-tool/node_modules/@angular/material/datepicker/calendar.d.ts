/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentType, Portal } from '@angular/cdk/portal';
import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DateAdapter, MatDateFormats } from '@angular/material/core';
import { Subject } from 'rxjs';
import { MatCalendarCellCssClasses } from './calendar-body';
import { MatDatepickerIntl } from './datepicker-intl';
import { MatMonthView } from './month-view';
import { MatMultiYearView } from './multi-year-view';
import { MatYearView } from './year-view';
/**
 * Possible views for the calendar.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare type MatCalendarView = 'month' | 'year' | 'multi-year';
/** Default header for MatCalendar */
export declare class MatCalendarHeader<D> {
    private _intl;
    calendar: MatCalendar<D>;
    private _dateAdapter;
    private _dateFormats;
    constructor(_intl: MatDatepickerIntl, calendar: MatCalendar<D>, _dateAdapter: DateAdapter<D>, _dateFormats: MatDateFormats, changeDetectorRef: ChangeDetectorRef);
    /** The label for the current calendar view. */
    get periodButtonText(): string;
    get periodButtonLabel(): string;
    /** The label for the previous button. */
    get prevButtonLabel(): string;
    /** The label for the next button. */
    get nextButtonLabel(): string;
    /** Handles user clicks on the period label. */
    currentPeriodClicked(): void;
    /** Handles user clicks on the previous button. */
    previousClicked(): void;
    /** Handles user clicks on the next button. */
    nextClicked(): void;
    /** Whether the previous period button is enabled. */
    previousEnabled(): boolean;
    /** Whether the next period button is enabled. */
    nextEnabled(): boolean;
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    private _isSameView;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCalendarHeader<any>, [null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatCalendarHeader<any>, "mat-calendar-header", ["matCalendarHeader"], {}, {}, never, ["*"]>;
}
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export declare class MatCalendar<D> implements AfterContentInit, AfterViewChecked, OnDestroy, OnChanges {
    private _dateAdapter;
    private _dateFormats;
    private _changeDetectorRef;
    /** An input indicating the type of the header component, if set. */
    headerComponent: ComponentType<any>;
    /** A portal containing the header component type for this calendar. */
    _calendarHeaderPortal: Portal<any>;
    private _intlChanges;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     */
    private _moveFocusOnNextTick;
    /** A date representing the period (month or year) to start the calendar in. */
    get startAt(): D | null;
    set startAt(value: D | null);
    private _startAt;
    /** Whether the calendar should be started in month or year view. */
    startView: MatCalendarView;
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
    /** Emits when the currently selected date changes. */
    readonly selectedChange: EventEmitter<D>;
    /**
     * Emits the year chosen in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    readonly yearSelected: EventEmitter<D>;
    /**
     * Emits the month chosen in year view.
     * This doesn't imply a change on the selected date.
     */
    readonly monthSelected: EventEmitter<D>;
    /** Emits when any date is selected. */
    readonly _userSelection: EventEmitter<void>;
    /** Reference to the current month view component. */
    monthView: MatMonthView<D>;
    /** Reference to the current year view component. */
    yearView: MatYearView<D>;
    /** Reference to the current multi-year view component. */
    multiYearView: MatMultiYearView<D>;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    get activeDate(): D;
    set activeDate(value: D);
    private _clampedActiveDate;
    /** Whether the calendar is in month view. */
    get currentView(): MatCalendarView;
    set currentView(value: MatCalendarView);
    private _currentView;
    /**
     * Emits whenever there is a state change that the header may need to respond to.
     */
    stateChanges: Subject<void>;
    constructor(_intl: MatDatepickerIntl, _dateAdapter: DateAdapter<D>, _dateFormats: MatDateFormats, _changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    focusActiveCell(): void;
    /** Updates today's date after an update of the active date */
    updateTodaysDate(): void;
    /** Handles date selection in the month view. */
    _dateSelected(date: D | null): void;
    /** Handles year selection in the multiyear view. */
    _yearSelectedInMultiYearView(normalizedYear: D): void;
    /** Handles month selection in the year view. */
    _monthSelectedInYearView(normalizedMonth: D): void;
    _userSelected(): void;
    /** Handles year/month selection in the multi-year/year views. */
    _goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    /** Returns the component instance that corresponds to the current calendar view. */
    private _getCurrentViewComponent;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCalendar<any>, [null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatCalendar<any>, "mat-calendar", ["matCalendar"], { "startView": "startView"; "startAt": "startAt"; "selected": "selected"; "minDate": "minDate"; "maxDate": "maxDate"; "headerComponent": "headerComponent"; "dateFilter": "dateFilter"; "dateClass": "dateClass"; }, { "selectedChange": "selectedChange"; "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; "_userSelection": "_userSelection"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuZC50cyIsInNvdXJjZXMiOlsiY2FsZW5kYXIuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0Q2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcyB9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VySW50bCB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnRsJztcbmltcG9ydCB7IE1hdE1vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldyc7XG5pbXBvcnQgeyBNYXRNdWx0aVllYXJWaWV3IH0gZnJvbSAnLi9tdWx0aS15ZWFyLXZpZXcnO1xuaW1wb3J0IHsgTWF0WWVhclZpZXcgfSBmcm9tICcuL3llYXItdmlldyc7XG4vKipcbiAqIFBvc3NpYmxlIHZpZXdzIGZvciB0aGUgY2FsZW5kYXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIHR5cGUgTWF0Q2FsZW5kYXJWaWV3ID0gJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFyJztcbi8qKiBEZWZhdWx0IGhlYWRlciBmb3IgTWF0Q2FsZW5kYXIgKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENhbGVuZGFySGVhZGVyPEQ+IHtcbiAgICBwcml2YXRlIF9pbnRsO1xuICAgIGNhbGVuZGFyOiBNYXRDYWxlbmRhcjxEPjtcbiAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjtcbiAgICBwcml2YXRlIF9kYXRlRm9ybWF0cztcbiAgICBjb25zdHJ1Y3RvcihfaW50bDogTWF0RGF0ZXBpY2tlckludGwsIGNhbGVuZGFyOiBNYXRDYWxlbmRhcjxEPiwgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPiwgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cywgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKTtcbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xuICAgIGdldCBwZXJpb2RCdXR0b25UZXh0KCk6IHN0cmluZztcbiAgICBnZXQgcGVyaW9kQnV0dG9uTGFiZWwoKTogc3RyaW5nO1xuICAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyBidXR0b24uICovXG4gICAgZ2V0IHByZXZCdXR0b25MYWJlbCgpOiBzdHJpbmc7XG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIG5leHQgYnV0dG9uLiAqL1xuICAgIGdldCBuZXh0QnV0dG9uTGFiZWwoKTogc3RyaW5nO1xuICAgIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwZXJpb2QgbGFiZWwuICovXG4gICAgY3VycmVudFBlcmlvZENsaWNrZWQoKTogdm9pZDtcbiAgICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xuICAgIHByZXZpb3VzQ2xpY2tlZCgpOiB2b2lkO1xuICAgIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBuZXh0IGJ1dHRvbi4gKi9cbiAgICBuZXh0Q2xpY2tlZCgpOiB2b2lkO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gICAgcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgdGhlIG5leHQgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xuICAgIG5leHRFbmFibGVkKCk6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgdGhlIHR3byBkYXRlcyByZXByZXNlbnQgdGhlIHNhbWUgdmlldyBpbiB0aGUgY3VycmVudCB2aWV3IG1vZGUgKG1vbnRoIG9yIHllYXIpLiAqL1xuICAgIHByaXZhdGUgX2lzU2FtZVZpZXc7XG59XG4vKipcbiAqIEEgY2FsZW5kYXIgdGhhdCBpcyB1c2VkIGFzIHBhcnQgb2YgdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENhbGVuZGFyPEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAgIHByaXZhdGUgX2RhdGVBZGFwdGVyO1xuICAgIHByaXZhdGUgX2RhdGVGb3JtYXRzO1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmO1xuICAgIC8qKiBBbiBpbnB1dCBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIHRoZSBoZWFkZXIgY29tcG9uZW50LCBpZiBzZXQuICovXG4gICAgaGVhZGVyQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPGFueT47XG4gICAgLyoqIEEgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIGhlYWRlciBjb21wb25lbnQgdHlwZSBmb3IgdGhpcyBjYWxlbmRhci4gKi9cbiAgICBfY2FsZW5kYXJIZWFkZXJQb3J0YWw6IFBvcnRhbDxhbnk+O1xuICAgIHByaXZhdGUgX2ludGxDaGFuZ2VzO1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHNjaGVkdWxpbmcgdGhhdCBmb2N1cyBzaG91bGQgYmUgbW92ZWQgdG8gdGhlIGFjdGl2ZSBjZWxsIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgICogV2UgbmVlZCB0byBzY2hlZHVsZSBpdCwgcmF0aGVyIHRoYW4gZG8gaXQgaW1tZWRpYXRlbHksIGJlY2F1c2Ugd2UgaGF2ZSB0byB3YWl0XG4gICAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXG4gICAgICovXG4gICAgcHJpdmF0ZSBfbW92ZUZvY3VzT25OZXh0VGljaztcbiAgICAvKiogQSBkYXRlIHJlcHJlc2VudGluZyB0aGUgcGVyaW9kIChtb250aCBvciB5ZWFyKSB0byBzdGFydCB0aGUgY2FsZW5kYXIgaW4uICovXG4gICAgZ2V0IHN0YXJ0QXQoKTogRCB8IG51bGw7XG4gICAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKTtcbiAgICBwcml2YXRlIF9zdGFydEF0O1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBzaG91bGQgYmUgc3RhcnRlZCBpbiBtb250aCBvciB5ZWFyIHZpZXcuICovXG4gICAgc3RhcnRWaWV3OiBNYXRDYWxlbmRhclZpZXc7XG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGw7XG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCk7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ7XG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbDtcbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpO1xuICAgIHByaXZhdGUgX21pbkRhdGU7XG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbDtcbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpO1xuICAgIHByaXZhdGUgX21heERhdGU7XG4gICAgLyoqIEZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xuICAgIGRhdGVGaWx0ZXI6IChkYXRlOiBEKSA9PiBib29sZWFuO1xuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBjdXN0b20gQ1NTIGNsYXNzZXMgdG8gZGF0ZXMuICovXG4gICAgZGF0ZUNsYXNzOiAoZGF0ZTogRCkgPT4gTWF0Q2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcztcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEQ+O1xuICAgIC8qKlxuICAgICAqIEVtaXRzIHRoZSB5ZWFyIGNob3NlbiBpbiBtdWx0aXllYXIgdmlldy5cbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD47XG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIG1vbnRoIGNob3NlbiBpbiB5ZWFyIHZpZXcuXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPjtcbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICByZWFkb25seSBfdXNlclNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbW9udGggdmlldyBjb21wb25lbnQuICovXG4gICAgbW9udGhWaWV3OiBNYXRNb250aFZpZXc8RD47XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB5ZWFyIHZpZXcgY29tcG9uZW50LiAqL1xuICAgIHllYXJWaWV3OiBNYXRZZWFyVmlldzxEPjtcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IG11bHRpLXllYXIgdmlldyBjb21wb25lbnQuICovXG4gICAgbXVsdGlZZWFyVmlldzogTWF0TXVsdGlZZWFyVmlldzxEPjtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBhY3RpdmUgZGF0ZS4gVGhpcyBkZXRlcm1pbmVzIHdoaWNoIHRpbWUgcGVyaW9kIGlzIHNob3duIGFuZCB3aGljaCBkYXRlIGlzXG4gICAgICogaGlnaGxpZ2h0ZWQgd2hlbiB1c2luZyBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICAgICAqL1xuICAgIGdldCBhY3RpdmVEYXRlKCk6IEQ7XG4gICAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IEQpO1xuICAgIHByaXZhdGUgX2NsYW1wZWRBY3RpdmVEYXRlO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xuICAgIGdldCBjdXJyZW50VmlldygpOiBNYXRDYWxlbmRhclZpZXc7XG4gICAgc2V0IGN1cnJlbnRWaWV3KHZhbHVlOiBNYXRDYWxlbmRhclZpZXcpO1xuICAgIHByaXZhdGUgX2N1cnJlbnRWaWV3O1xuICAgIC8qKlxuICAgICAqIEVtaXRzIHdoZW5ldmVyIHRoZXJlIGlzIGEgc3RhdGUgY2hhbmdlIHRoYXQgdGhlIGhlYWRlciBtYXkgbmVlZCB0byByZXNwb25kIHRvLlxuICAgICAqL1xuICAgIHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPjtcbiAgICBjb25zdHJ1Y3RvcihfaW50bDogTWF0RGF0ZXBpY2tlckludGwsIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XG4gICAgZm9jdXNBY3RpdmVDZWxsKCk6IHZvaWQ7XG4gICAgLyoqIFVwZGF0ZXMgdG9kYXkncyBkYXRlIGFmdGVyIGFuIHVwZGF0ZSBvZiB0aGUgYWN0aXZlIGRhdGUgKi9cbiAgICB1cGRhdGVUb2RheXNEYXRlKCk6IHZvaWQ7XG4gICAgLyoqIEhhbmRsZXMgZGF0ZSBzZWxlY3Rpb24gaW4gdGhlIG1vbnRoIHZpZXcuICovXG4gICAgX2RhdGVTZWxlY3RlZChkYXRlOiBEIHwgbnVsbCk6IHZvaWQ7XG4gICAgLyoqIEhhbmRsZXMgeWVhciBzZWxlY3Rpb24gaW4gdGhlIG11bHRpeWVhciB2aWV3LiAqL1xuICAgIF95ZWFyU2VsZWN0ZWRJbk11bHRpWWVhclZpZXcobm9ybWFsaXplZFllYXI6IEQpOiB2b2lkO1xuICAgIC8qKiBIYW5kbGVzIG1vbnRoIHNlbGVjdGlvbiBpbiB0aGUgeWVhciB2aWV3LiAqL1xuICAgIF9tb250aFNlbGVjdGVkSW5ZZWFyVmlldyhub3JtYWxpemVkTW9udGg6IEQpOiB2b2lkO1xuICAgIF91c2VyU2VsZWN0ZWQoKTogdm9pZDtcbiAgICAvKiogSGFuZGxlcyB5ZWFyL21vbnRoIHNlbGVjdGlvbiBpbiB0aGUgbXVsdGkteWVhci95ZWFyIHZpZXdzLiAqL1xuICAgIF9nb1RvRGF0ZUluVmlldyhkYXRlOiBELCB2aWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXInKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbDtcbiAgICAvKiogUmV0dXJucyB0aGUgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cbiAgICBwcml2YXRlIF9nZXRDdXJyZW50Vmlld0NvbXBvbmVudDtcbn1cbiJdfQ==