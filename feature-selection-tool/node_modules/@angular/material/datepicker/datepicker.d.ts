/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { CanColor, CanColorCtor, DateAdapter, ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MatCalendar } from './calendar';
import { MatDatepickerInput } from './datepicker-input';
import { MatCalendarCellCssClasses } from './calendar-body';
/** Injection token that determines the scroll handling while the calendar is open. */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_DATEPICKER_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY;
};
/** @docs-private */
declare class MatDatepickerContentBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatDatepickerContentMixinBase: CanColorCtor & typeof MatDatepickerContentBase;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
export declare class MatDatepickerContent<D> extends _MatDatepickerContentMixinBase implements AfterViewInit, OnDestroy, CanColor {
    /**
     * @deprecated `_changeDetectorRef` parameter to become required.
     * @breaking-change 11.0.0
     */
    private _changeDetectorRef?;
    /** Reference to the internal calendar component. */
    _calendar: MatCalendar<D>;
    /** Reference to the datepicker that created the overlay. */
    datepicker: MatDatepicker<D>;
    /** Whether the datepicker is above or below the input. */
    _isAbove: boolean;
    /** Current state of the animation. */
    _animationState: 'enter' | 'void';
    /** Emits when an animation has finished. */
    _animationDone: Subject<void>;
    constructor(elementRef: ElementRef, 
    /**
     * @deprecated `_changeDetectorRef` parameter to become required.
     * @breaking-change 11.0.0
     */
    _changeDetectorRef?: ChangeDetectorRef | undefined);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _startExitAnimation(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDatepickerContent<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatDatepickerContent<any>, "mat-datepicker-content", ["matDatepickerContent"], { "color": "color"; }, {}, never, never>;
}
/** Component responsible for managing the datepicker popup/dialog. */
export declare class MatDatepicker<D> implements OnDestroy, CanColor {
    private _dialog;
    private _overlay;
    private _ngZone;
    private _viewContainerRef;
    private _dateAdapter;
    private _dir;
    private _document;
    private _scrollStrategy;
    /** An input indicating the type of the custom header component for the calendar, if set. */
    calendarHeaderComponent: ComponentType<any>;
    /** The date to open the calendar to initially. */
    get startAt(): D | null;
    set startAt(value: D | null);
    private _startAt;
    /** The view that the calendar should start in. */
    startView: 'month' | 'year' | 'multi-year';
    /** Color palette to use on the datepicker's calendar. */
    get color(): ThemePalette;
    set color(value: ThemePalette);
    _color: ThemePalette;
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     */
    get touchUi(): boolean;
    set touchUi(value: boolean);
    private _touchUi;
    /** Whether the datepicker pop-up should be disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    readonly yearSelected: EventEmitter<D>;
    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     */
    readonly monthSelected: EventEmitter<D>;
    /** Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`. */
    panelClass: string | string[];
    /** Function that can be used to add custom CSS classes to dates. */
    dateClass: (date: D) => MatCalendarCellCssClasses;
    /** Emits when the datepicker has been opened. */
    openedStream: EventEmitter<void>;
    /** Emits when the datepicker has been closed. */
    closedStream: EventEmitter<void>;
    /** Whether the calendar is open. */
    get opened(): boolean;
    set opened(value: boolean);
    private _opened;
    /** The id for the datepicker calendar. */
    id: string;
    /** The currently selected date. */
    get _selected(): D | null;
    set _selected(value: D | null);
    private _validSelected;
    /** The minimum selectable date. */
    get _minDate(): D | null;
    /** The maximum selectable date. */
    get _maxDate(): D | null;
    get _dateFilter(): (date: D | null) => boolean;
    /** A reference to the overlay when the calendar is opened as a popup. */
    private _popupRef;
    /** A reference to the dialog when the calendar is opened as a dialog. */
    private _dialogRef;
    /** Reference to the component instantiated in popup mode. */
    private _popupComponentRef;
    /** The element that was focused before the datepicker was opened. */
    private _focusedElementBeforeOpen;
    /** Subscription to value changes in the associated input element. */
    private _inputSubscription;
    /** The input element this datepicker is associated with. */
    _datepickerInput: MatDatepickerInput<D>;
    /** Emits when the datepicker is disabled. */
    readonly _disabledChange: Subject<boolean>;
    /** Emits new selected date when selected date changes. */
    readonly _selectedChanged: Subject<D>;
    constructor(_dialog: MatDialog, _overlay: Overlay, _ngZone: NgZone, _viewContainerRef: ViewContainerRef, scrollStrategy: any, _dateAdapter: DateAdapter<D>, _dir: Directionality, _document: any);
    ngOnDestroy(): void;
    /** Selects the given date */
    select(date: D): void;
    /** Emits the selected year in multiyear view */
    _selectYear(normalizedYear: D): void;
    /** Emits selected month in year view */
    _selectMonth(normalizedMonth: D): void;
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    _registerInput(input: MatDatepickerInput<D>): void;
    /** Open the calendar. */
    open(): void;
    /** Close the calendar. */
    close(): void;
    /** Open the calendar as a dialog. */
    private _openAsDialog;
    /** Open the calendar as a popup. */
    private _openAsPopup;
    /** Create the popup. */
    private _createPopup;
    /** Destroys the current popup overlay. */
    private _destroyPopup;
    /** Create the popup PositionStrategy. */
    private _createPopupPositionStrategy;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_touchUi: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDatepicker<any>, [null, null, null, null, null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatDatepicker<any>, "mat-datepicker", ["matDatepicker"], { "startView": "startView"; "startAt": "startAt"; "color": "color"; "touchUi": "touchUi"; "disabled": "disabled"; "opened": "opened"; "calendarHeaderComponent": "calendarHeaderComponent"; "panelClass": "panelClass"; "dateClass": "dateClass"; }, { "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; "openedStream": "opened"; "closedStream": "closed"; }, never, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5kLnRzIiwic291cmNlcyI6WyJkYXRlcGlja2VyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBPdmVybGF5LCBTY3JvbGxTdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25EZXN0cm95LCBWaWV3Q29udGFpbmVyUmVmLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgRGF0ZUFkYXB0ZXIsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdENhbGVuZGFyIH0gZnJvbSAnLi9jYWxlbmRhcic7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VySW5wdXQgfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xuaW1wb3J0IHsgTWF0Q2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcyB9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBjYWxlbmRhciBpcyBvcGVuLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZOiBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT47XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSOiB7XG4gICAgcHJvdmlkZTogSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+O1xuICAgIGRlcHM6ICh0eXBlb2YgT3ZlcmxheSlbXTtcbiAgICB1c2VGYWN0b3J5OiB0eXBlb2YgTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlk7XG59O1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0RGF0ZXBpY2tlckNvbnRlbnRCYXNlIHtcbiAgICBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZik7XG59XG5kZWNsYXJlIGNvbnN0IF9NYXREYXRlcGlja2VyQ29udGVudE1peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1hdERhdGVwaWNrZXJDb250ZW50QmFzZTtcbi8qKlxuICogQ29tcG9uZW50IHVzZWQgYXMgdGhlIGNvbnRlbnQgZm9yIHRoZSBkYXRlcGlja2VyIGRpYWxvZyBhbmQgcG9wdXAuIFdlIHVzZSB0aGlzIGluc3RlYWQgb2YgdXNpbmdcbiAqIE1hdENhbGVuZGFyIGRpcmVjdGx5IGFzIHRoZSBjb250ZW50IHNvIHdlIGNhbiBjb250cm9sIHRoZSBpbml0aWFsIGZvY3VzLiBUaGlzIGFsc28gZ2l2ZXMgdXMgYVxuICogcGxhY2UgdG8gcHV0IGFkZGl0aW9uYWwgZmVhdHVyZXMgb2YgdGhlIHBvcHVwIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHRoZSBjYWxlbmRhciBpdHNlbGYgaW4gdGhlXG4gKiBmdXR1cmUuIChlLmcuIGNvbmZpcm1hdGlvbiBidXR0b25zKS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0RGF0ZXBpY2tlckNvbnRlbnQ8RD4gZXh0ZW5kcyBfTWF0RGF0ZXBpY2tlckNvbnRlbnRNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENhbkNvbG9yIHtcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBgX2NoYW5nZURldGVjdG9yUmVmYCBwYXJhbWV0ZXIgdG8gYmVjb21lIHJlcXVpcmVkLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTEuMC4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY/O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGludGVybmFsIGNhbGVuZGFyIGNvbXBvbmVudC4gKi9cbiAgICBfY2FsZW5kYXI6IE1hdENhbGVuZGFyPEQ+O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGRhdGVwaWNrZXIgdGhhdCBjcmVhdGVkIHRoZSBvdmVybGF5LiAqL1xuICAgIGRhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXI8RD47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgaXMgYWJvdmUgb3IgYmVsb3cgdGhlIGlucHV0LiAqL1xuICAgIF9pc0Fib3ZlOiBib29sZWFuO1xuICAgIC8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBhbmltYXRpb24uICovXG4gICAgX2FuaW1hdGlvblN0YXRlOiAnZW50ZXInIHwgJ3ZvaWQnO1xuICAgIC8qKiBFbWl0cyB3aGVuIGFuIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQuICovXG4gICAgX2FuaW1hdGlvbkRvbmU6IFN1YmplY3Q8dm9pZD47XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgYF9jaGFuZ2VEZXRlY3RvclJlZmAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDExLjAuMFxuICAgICAqL1xuICAgIF9jaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmIHwgdW5kZWZpbmVkKTtcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIF9zdGFydEV4aXRBbmltYXRpb24oKTogdm9pZDtcbn1cbi8qKiBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIHRoZSBkYXRlcGlja2VyIHBvcHVwL2RpYWxvZy4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdERhdGVwaWNrZXI8RD4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENhbkNvbG9yIHtcbiAgICBwcml2YXRlIF9kaWFsb2c7XG4gICAgcHJpdmF0ZSBfb3ZlcmxheTtcbiAgICBwcml2YXRlIF9uZ1pvbmU7XG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjtcbiAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjtcbiAgICBwcml2YXRlIF9kaXI7XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ7XG4gICAgcHJpdmF0ZSBfc2Nyb2xsU3RyYXRlZ3k7XG4gICAgLyoqIEFuIGlucHV0IGluZGljYXRpbmcgdGhlIHR5cGUgb2YgdGhlIGN1c3RvbSBoZWFkZXIgY29tcG9uZW50IGZvciB0aGUgY2FsZW5kYXIsIGlmIHNldC4gKi9cbiAgICBjYWxlbmRhckhlYWRlckNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+O1xuICAgIC8qKiBUaGUgZGF0ZSB0byBvcGVuIHRoZSBjYWxlbmRhciB0byBpbml0aWFsbHkuICovXG4gICAgZ2V0IHN0YXJ0QXQoKTogRCB8IG51bGw7XG4gICAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKTtcbiAgICBwcml2YXRlIF9zdGFydEF0O1xuICAgIC8qKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uICovXG4gICAgc3RhcnRWaWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXInO1xuICAgIC8qKiBDb2xvciBwYWxldHRlIHRvIHVzZSBvbiB0aGUgZGF0ZXBpY2tlcidzIGNhbGVuZGFyLiAqL1xuICAgIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGU7XG4gICAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpO1xuICAgIF9jb2xvcjogVGhlbWVQYWxldHRlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIFVJIGlzIGluIHRvdWNoIG1vZGUuIEluIHRvdWNoIG1vZGUgdGhlIGNhbGVuZGFyIG9wZW5zIGluIGEgZGlhbG9nIHJhdGhlclxuICAgICAqIHRoYW4gYSBwb3B1cCBhbmQgZWxlbWVudHMgaGF2ZSBtb3JlIHBhZGRpbmcgdG8gYWxsb3cgZm9yIGJpZ2dlciB0b3VjaCB0YXJnZXRzLlxuICAgICAqL1xuICAgIGdldCB0b3VjaFVpKCk6IGJvb2xlYW47XG4gICAgc2V0IHRvdWNoVWkodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX3RvdWNoVWk7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wLXVwIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIHllYXIgaW4gbXVsdGl5ZWFyIHZpZXcuXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+O1xuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlldy5cbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+O1xuICAgIC8qKiBDbGFzc2VzIHRvIGJlIHBhc3NlZCB0byB0aGUgZGF0ZSBwaWNrZXIgcGFuZWwuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gICAgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW107XG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlcy4gKi9cbiAgICBkYXRlQ2xhc3M6IChkYXRlOiBEKSA9PiBNYXRDYWxlbmRhckNlbGxDc3NDbGFzc2VzO1xuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkYXRlcGlja2VyIGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgICBvcGVuZWRTdHJlYW06IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgZGF0ZXBpY2tlciBoYXMgYmVlbiBjbG9zZWQuICovXG4gICAgY2xvc2VkU3RyZWFtOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuO1xuICAgIHNldCBvcGVuZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX29wZW5lZDtcbiAgICAvKiogVGhlIGlkIGZvciB0aGUgZGF0ZXBpY2tlciBjYWxlbmRhci4gKi9cbiAgICBpZDogc3RyaW5nO1xuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgZ2V0IF9zZWxlY3RlZCgpOiBEIHwgbnVsbDtcbiAgICBzZXQgX3NlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCk7XG4gICAgcHJpdmF0ZSBfdmFsaWRTZWxlY3RlZDtcbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIGdldCBfbWluRGF0ZSgpOiBEIHwgbnVsbDtcbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIGdldCBfbWF4RGF0ZSgpOiBEIHwgbnVsbDtcbiAgICBnZXQgX2RhdGVGaWx0ZXIoKTogKGRhdGU6IEQgfCBudWxsKSA9PiBib29sZWFuO1xuICAgIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgb3ZlcmxheSB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQgYXMgYSBwb3B1cC4gKi9cbiAgICBwcml2YXRlIF9wb3B1cFJlZjtcbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIGRpYWxvZyB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQgYXMgYSBkaWFsb2cuICovXG4gICAgcHJpdmF0ZSBfZGlhbG9nUmVmO1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGNvbXBvbmVudCBpbnN0YW50aWF0ZWQgaW4gcG9wdXAgbW9kZS4gKi9cbiAgICBwcml2YXRlIF9wb3B1cENvbXBvbmVudFJlZjtcbiAgICAvKiogVGhlIGVsZW1lbnQgdGhhdCB3YXMgZm9jdXNlZCBiZWZvcmUgdGhlIGRhdGVwaWNrZXIgd2FzIG9wZW5lZC4gKi9cbiAgICBwcml2YXRlIF9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW47XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB2YWx1ZSBjaGFuZ2VzIGluIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBfaW5wdXRTdWJzY3JpcHRpb247XG4gICAgLyoqIFRoZSBpbnB1dCBlbGVtZW50IHRoaXMgZGF0ZXBpY2tlciBpcyBhc3NvY2lhdGVkIHdpdGguICovXG4gICAgX2RhdGVwaWNrZXJJbnB1dDogTWF0RGF0ZXBpY2tlcklucHV0PEQ+O1xuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkYXRlcGlja2VyIGlzIGRpc2FibGVkLiAqL1xuICAgIHJlYWRvbmx5IF9kaXNhYmxlZENoYW5nZTogU3ViamVjdDxib29sZWFuPjtcbiAgICAvKiogRW1pdHMgbmV3IHNlbGVjdGVkIGRhdGUgd2hlbiBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgX3NlbGVjdGVkQ2hhbmdlZDogU3ViamVjdDxEPjtcbiAgICBjb25zdHJ1Y3RvcihfZGlhbG9nOiBNYXREaWFsb2csIF9vdmVybGF5OiBPdmVybGF5LCBfbmdab25lOiBOZ1pvbmUsIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBzY3JvbGxTdHJhdGVneTogYW55LCBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LCBfZGlyOiBEaXJlY3Rpb25hbGl0eSwgX2RvY3VtZW50OiBhbnkpO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgLyoqIFNlbGVjdHMgdGhlIGdpdmVuIGRhdGUgKi9cbiAgICBzZWxlY3QoZGF0ZTogRCk6IHZvaWQ7XG4gICAgLyoqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyIGluIG11bHRpeWVhciB2aWV3ICovXG4gICAgX3NlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IEQpOiB2b2lkO1xuICAgIC8qKiBFbWl0cyBzZWxlY3RlZCBtb250aCBpbiB5ZWFyIHZpZXcgKi9cbiAgICBfc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBEKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgZGF0ZXBpY2tlci5cbiAgICAgKiBAcGFyYW0gaW5wdXQgVGhlIGRhdGVwaWNrZXIgaW5wdXQgdG8gcmVnaXN0ZXIgd2l0aCB0aGlzIGRhdGVwaWNrZXIuXG4gICAgICovXG4gICAgX3JlZ2lzdGVySW5wdXQoaW5wdXQ6IE1hdERhdGVwaWNrZXJJbnB1dDxEPik6IHZvaWQ7XG4gICAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyLiAqL1xuICAgIG9wZW4oKTogdm9pZDtcbiAgICAvKiogQ2xvc2UgdGhlIGNhbGVuZGFyLiAqL1xuICAgIGNsb3NlKCk6IHZvaWQ7XG4gICAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyIGFzIGEgZGlhbG9nLiAqL1xuICAgIHByaXZhdGUgX29wZW5Bc0RpYWxvZztcbiAgICAvKiogT3BlbiB0aGUgY2FsZW5kYXIgYXMgYSBwb3B1cC4gKi9cbiAgICBwcml2YXRlIF9vcGVuQXNQb3B1cDtcbiAgICAvKiogQ3JlYXRlIHRoZSBwb3B1cC4gKi9cbiAgICBwcml2YXRlIF9jcmVhdGVQb3B1cDtcbiAgICAvKiogRGVzdHJveXMgdGhlIGN1cnJlbnQgcG9wdXAgb3ZlcmxheS4gKi9cbiAgICBwcml2YXRlIF9kZXN0cm95UG9wdXA7XG4gICAgLyoqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS4gKi9cbiAgICBwcml2YXRlIF9jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9nZXRWYWxpZERhdGVPck51bGw7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RvdWNoVWk6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==