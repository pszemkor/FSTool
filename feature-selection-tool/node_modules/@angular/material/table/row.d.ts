/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef } from '@angular/cdk/table';
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatHeaderRowDef extends CdkHeaderRowDef {
    static ngAcceptInputType_sticky: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatHeaderRowDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatHeaderRowDef, "[matHeaderRowDef]", never, { "columns": "matHeaderRowDef"; "sticky": "matHeaderRowDefSticky"; }, {}, never>;
}
/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
export declare class MatFooterRowDef extends CdkFooterRowDef {
    static ngAcceptInputType_sticky: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatFooterRowDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatFooterRowDef, "[matFooterRowDef]", never, { "columns": "matFooterRowDef"; "sticky": "matFooterRowDefSticky"; }, {}, never>;
}
/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
export declare class MatRowDef<T> extends CdkRowDef<T> {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatRowDef<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatRowDef<any>, "[matRowDef]", never, { "columns": "matRowDefColumns"; "when": "matRowDefWhen"; }, {}, never>;
}
/** Header template container that contains the cell outlet. Adds the right class and role. */
export declare class MatHeaderRow extends CdkHeaderRow {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatHeaderRow, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatHeaderRow, "mat-header-row, tr[mat-header-row]", ["matHeaderRow"], {}, {}, never, never>;
}
/** Footer template container that contains the cell outlet. Adds the right class and role. */
export declare class MatFooterRow extends CdkFooterRow {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatFooterRow, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatFooterRow, "mat-footer-row, tr[mat-footer-row]", ["matFooterRow"], {}, {}, never, never>;
}
/** Data row template container that contains the cell outlet. Adds the right class and role. */
export declare class MatRow extends CdkRow {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatRow, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatRow, "mat-row, tr[mat-row]", ["matRow"], {}, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmQudHMiLCJzb3VyY2VzIjpbInJvdy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtGb290ZXJSb3csIENka0Zvb3RlclJvd0RlZiwgQ2RrSGVhZGVyUm93LCBDZGtIZWFkZXJSb3dEZWYsIENka1JvdywgQ2RrUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbi8qKlxuICogSGVhZGVyIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGhlYWRlciByb3cncyB0ZW1wbGF0ZSBhbmQgb3RoZXIgaGVhZGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5LlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRIZWFkZXJSb3dEZWYgZXh0ZW5kcyBDZGtIZWFkZXJSb3dEZWYge1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGlja3k6IEJvb2xlYW5JbnB1dDtcbn1cbi8qKlxuICogRm9vdGVyIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGZvb3RlciByb3cncyB0ZW1wbGF0ZSBhbmQgb3RoZXIgZm9vdGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5LlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRGb290ZXJSb3dEZWYgZXh0ZW5kcyBDZGtGb290ZXJSb3dEZWYge1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGlja3k6IEJvb2xlYW5JbnB1dDtcbn1cbi8qKlxuICogRGF0YSByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBkYXRhIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheSBhbmRcbiAqIGEgd2hlbiBwcmVkaWNhdGUgdGhhdCBkZXNjcmliZXMgd2hlbiB0aGlzIHJvdyBzaG91bGQgYmUgdXNlZC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Um93RGVmPFQ+IGV4dGVuZHMgQ2RrUm93RGVmPFQ+IHtcbn1cbi8qKiBIZWFkZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEhlYWRlclJvdyBleHRlbmRzIENka0hlYWRlclJvdyB7XG59XG4vKiogRm9vdGVyIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGNvbnRhaW5zIHRoZSBjZWxsIG91dGxldC4gQWRkcyB0aGUgcmlnaHQgY2xhc3MgYW5kIHJvbGUuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRGb290ZXJSb3cgZXh0ZW5kcyBDZGtGb290ZXJSb3cge1xufVxuLyoqIERhdGEgcm93IHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGNvbnRhaW5zIHRoZSBjZWxsIG91dGxldC4gQWRkcyB0aGUgcmlnaHQgY2xhc3MgYW5kIHJvbGUuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRSb3cgZXh0ZW5kcyBDZGtSb3cge1xufVxuIl19