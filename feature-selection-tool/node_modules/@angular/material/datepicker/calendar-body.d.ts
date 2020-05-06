/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, EventEmitter, NgZone, OnChanges, SimpleChanges } from '@angular/core';
/**
 * Extra CSS classes that can be associated with a calendar cell.
 */
import * as ɵngcc0 from '@angular/core';
export declare type MatCalendarCellCssClasses = string | string[] | Set<string> | {
    [key: string]: any;
};
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
export declare class MatCalendarCell {
    value: number;
    displayValue: string;
    ariaLabel: string;
    enabled: boolean;
    cssClasses: MatCalendarCellCssClasses;
    constructor(value: number, displayValue: string, ariaLabel: string, enabled: boolean, cssClasses?: MatCalendarCellCssClasses);
}
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
export declare class MatCalendarBody implements OnChanges {
    private _elementRef;
    private _ngZone;
    /** The label for the table. (e.g. "Jan 2017"). */
    label: string;
    /** The cells to display in the table. */
    rows: MatCalendarCell[][];
    /** The value in the table that corresponds to today. */
    todayValue: number;
    /** The value in the table that is currently selected. */
    selectedValue: number;
    /** The minimum number of free cells needed to fit the label in the first row. */
    labelMinRequiredCells: number;
    /** The number of columns in the table. */
    numCols: number;
    /** The cell number of the active cell in the table. */
    activeCell: number;
    /**
     * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
     * maintained even as the table resizes.
     */
    cellAspectRatio: number;
    /** Emits when a new value is selected. */
    readonly selectedValueChange: EventEmitter<number>;
    /** The number of blank cells to put at the beginning for the first row. */
    _firstRowOffset: number;
    /** Padding for the individual date cells. */
    _cellPadding: string;
    /** Width of an individual cell. */
    _cellWidth: string;
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone);
    _cellClicked(cell: MatCalendarCell): void;
    ngOnChanges(changes: SimpleChanges): void;
    _isActiveCell(rowIndex: number, colIndex: number): boolean;
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCalendarBody, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatCalendarBody, "[mat-calendar-body]", ["matCalendarBody"], { "numCols": "numCols"; "activeCell": "activeCell"; "cellAspectRatio": "cellAspectRatio"; "label": "label"; "rows": "rows"; "todayValue": "todayValue"; "selectedValue": "selectedValue"; "labelMinRequiredCells": "labelMinRequiredCells"; }, { "selectedValueChange": "selectedValueChange"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5kLnRzIiwic291cmNlcyI6WyJjYWxlbmRhci1ib2R5LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgTmdab25lLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogRXh0cmEgQ1NTIGNsYXNzZXMgdGhhdCBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIGEgY2FsZW5kYXIgY2VsbC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgdHlwZSBNYXRDYWxlbmRhckNlbGxDc3NDbGFzc2VzID0gc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuLyoqXG4gKiBBbiBpbnRlcm5hbCBjbGFzcyB0aGF0IHJlcHJlc2VudHMgdGhlIGRhdGEgY29ycmVzcG9uZGluZyB0byBhIHNpbmdsZSBjYWxlbmRhciBjZWxsLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRDYWxlbmRhckNlbGwge1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgZGlzcGxheVZhbHVlOiBzdHJpbmc7XG4gICAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICBjc3NDbGFzc2VzOiBNYXRDYWxlbmRhckNlbGxDc3NDbGFzc2VzO1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIsIGRpc3BsYXlWYWx1ZTogc3RyaW5nLCBhcmlhTGFiZWw6IHN0cmluZywgZW5hYmxlZDogYm9vbGVhbiwgY3NzQ2xhc3Nlcz86IE1hdENhbGVuZGFyQ2VsbENzc0NsYXNzZXMpO1xufVxuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGNhbGVuZGFyIGRhdGEgaW4gYSB0YWJsZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q2FsZW5kYXJCb2R5IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX25nWm9uZTtcbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGUgdGFibGUuIChlLmcuIFwiSmFuIDIwMTdcIikuICovXG4gICAgbGFiZWw6IHN0cmluZztcbiAgICAvKiogVGhlIGNlbGxzIHRvIGRpc3BsYXkgaW4gdGhlIHRhYmxlLiAqL1xuICAgIHJvd3M6IE1hdENhbGVuZGFyQ2VsbFtdW107XG4gICAgLyoqIFRoZSB2YWx1ZSBpbiB0aGUgdGFibGUgdGhhdCBjb3JyZXNwb25kcyB0byB0b2RheS4gKi9cbiAgICB0b2RheVZhbHVlOiBudW1iZXI7XG4gICAgLyoqIFRoZSB2YWx1ZSBpbiB0aGUgdGFibGUgdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuICovXG4gICAgc2VsZWN0ZWRWYWx1ZTogbnVtYmVyO1xuICAgIC8qKiBUaGUgbWluaW11bSBudW1iZXIgb2YgZnJlZSBjZWxscyBuZWVkZWQgdG8gZml0IHRoZSBsYWJlbCBpbiB0aGUgZmlyc3Qgcm93LiAqL1xuICAgIGxhYmVsTWluUmVxdWlyZWRDZWxsczogbnVtYmVyO1xuICAgIC8qKiBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIHRhYmxlLiAqL1xuICAgIG51bUNvbHM6IG51bWJlcjtcbiAgICAvKiogVGhlIGNlbGwgbnVtYmVyIG9mIHRoZSBhY3RpdmUgY2VsbCBpbiB0aGUgdGFibGUuICovXG4gICAgYWN0aXZlQ2VsbDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBhc3BlY3QgcmF0aW8gKHdpZHRoIC8gaGVpZ2h0KSB0byB1c2UgZm9yIHRoZSBjZWxscyBpbiB0aGUgdGFibGUuIFRoaXMgYXNwZWN0IHJhdGlvIHdpbGwgYmVcbiAgICAgKiBtYWludGFpbmVkIGV2ZW4gYXMgdGhlIHRhYmxlIHJlc2l6ZXMuXG4gICAgICovXG4gICAgY2VsbEFzcGVjdFJhdGlvOiBudW1iZXI7XG4gICAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgdmFsdWUgaXMgc2VsZWN0ZWQuICovXG4gICAgcmVhZG9ubHkgc2VsZWN0ZWRWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgdG8gcHV0IGF0IHRoZSBiZWdpbm5pbmcgZm9yIHRoZSBmaXJzdCByb3cuICovXG4gICAgX2ZpcnN0Um93T2Zmc2V0OiBudW1iZXI7XG4gICAgLyoqIFBhZGRpbmcgZm9yIHRoZSBpbmRpdmlkdWFsIGRhdGUgY2VsbHMuICovXG4gICAgX2NlbGxQYWRkaW5nOiBzdHJpbmc7XG4gICAgLyoqIFdpZHRoIG9mIGFuIGluZGl2aWR1YWwgY2VsbC4gKi9cbiAgICBfY2VsbFdpZHRoOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBfbmdab25lOiBOZ1pvbmUpO1xuICAgIF9jZWxsQ2xpY2tlZChjZWxsOiBNYXRDYWxlbmRhckNlbGwpOiB2b2lkO1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkO1xuICAgIF9pc0FjdGl2ZUNlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IGJvb2xlYW47XG4gICAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXG4gICAgX2ZvY3VzQWN0aXZlQ2VsbCgpOiB2b2lkO1xufVxuIl19