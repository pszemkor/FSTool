/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatCellDef extends CdkCellDef {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCellDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCellDef, "[matCellDef]", never, {}, {}, never>;
}
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
export declare class MatHeaderCellDef extends CdkHeaderCellDef {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatHeaderCellDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatHeaderCellDef, "[matHeaderCellDef]", never, {}, {}, never>;
}
/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
export declare class MatFooterCellDef extends CdkFooterCellDef {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatFooterCellDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatFooterCellDef, "[matFooterCellDef]", never, {}, {}, never>;
}
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
export declare class MatColumnDef extends CdkColumnDef {
    /** Unique name for this column. */
    name: string;
    static ngAcceptInputType_sticky: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatColumnDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatColumnDef, "[matColumnDef]", never, { "sticky": "sticky"; "name": "matColumnDef"; }, {}, never>;
}
/** Header cell template container that adds the right classes and role. */
export declare class MatHeaderCell extends CdkHeaderCell {
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatHeaderCell, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatHeaderCell, "mat-header-cell, th[mat-header-cell]", never, {}, {}, never>;
}
/** Footer cell template container that adds the right classes and role. */
export declare class MatFooterCell extends CdkFooterCell {
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatFooterCell, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatFooterCell, "mat-footer-cell, td[mat-footer-cell]", never, {}, {}, never>;
}
/** Cell template container that adds the right classes and role. */
export declare class MatCell extends CdkCell {
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCell, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCell, "mat-cell, td[mat-cell]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5kLnRzIiwic291cmNlcyI6WyJjZWxsLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtDZWxsLCBDZGtDZWxsRGVmLCBDZGtDb2x1bW5EZWYsIENka0Zvb3RlckNlbGwsIENka0Zvb3RlckNlbGxEZWYsIENka0hlYWRlckNlbGwsIENka0hlYWRlckNlbGxEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuLyoqXG4gKiBDZWxsIGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBkYXRhIHJvdyBjZWxsIGFzIHdlbGwgYXMgY2VsbC1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRDZWxsRGVmIGV4dGVuZHMgQ2RrQ2VsbERlZiB7XG59XG4vKipcbiAqIEhlYWRlciBjZWxsIGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBoZWFkZXIgY2VsbCBhbmQgYXMgd2VsbCBhcyBjZWxsLXNwZWNpZmljIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEhlYWRlckNlbGxEZWYgZXh0ZW5kcyBDZGtIZWFkZXJDZWxsRGVmIHtcbn1cbi8qKlxuICogRm9vdGVyIGNlbGwgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGZvb3RlciBjZWxsIGFuZCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Rm9vdGVyQ2VsbERlZiBleHRlbmRzIENka0Zvb3RlckNlbGxEZWYge1xufVxuLyoqXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q29sdW1uRGVmIGV4dGVuZHMgQ2RrQ29sdW1uRGVmIHtcbiAgICAvKiogVW5pcXVlIG5hbWUgZm9yIHRoaXMgY29sdW1uLiAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RpY2t5OiBCb29sZWFuSW5wdXQ7XG59XG4vKiogSGVhZGVyIGNlbGwgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgYWRkcyB0aGUgcmlnaHQgY2xhc3NlcyBhbmQgcm9sZS4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEhlYWRlckNlbGwgZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pO1xufVxuLyoqIEZvb3RlciBjZWxsIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGFkZHMgdGhlIHJpZ2h0IGNsYXNzZXMgYW5kIHJvbGUuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRGb290ZXJDZWxsIGV4dGVuZHMgQ2RrRm9vdGVyQ2VsbCB7XG4gICAgY29uc3RydWN0b3IoY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpO1xufVxuLyoqIENlbGwgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgYWRkcyB0aGUgcmlnaHQgY2xhc3NlcyBhbmQgcm9sZS4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENlbGwgZXh0ZW5kcyBDZGtDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pO1xufVxuIl19