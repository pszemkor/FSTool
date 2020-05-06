/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OnChanges, OnInit, SimpleChanges, ElementRef } from '@angular/core';
import { MatDialog } from './dialog';
import { MatDialogRef } from './dialog-ref';
/**
 * Button that will close the current dialog.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatDialogClose implements OnInit, OnChanges {
    dialogRef: MatDialogRef<any>;
    private _elementRef;
    private _dialog;
    /** Screenreader label for the button. */
    ariaLabel: string;
    /** Default to "button" to prevents accidental form submits. */
    type: 'submit' | 'button' | 'reset';
    /** Dialog close input. */
    dialogResult: any;
    _matDialogClose: any;
    constructor(dialogRef: MatDialogRef<any>, _elementRef: ElementRef<HTMLElement>, _dialog: MatDialog);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDialogClose, [{ optional: true; }, null, null]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatDialogClose, "[mat-dialog-close], [matDialogClose]", ["matDialogClose"], { "type": "type"; "dialogResult": "mat-dialog-close"; "ariaLabel": "aria-label"; "_matDialogClose": "matDialogClose"; }, {}, never>;
}
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
export declare class MatDialogTitle implements OnInit {
    private _dialogRef;
    private _elementRef;
    private _dialog;
    id: string;
    constructor(_dialogRef: MatDialogRef<any>, _elementRef: ElementRef<HTMLElement>, _dialog: MatDialog);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDialogTitle, [{ optional: true; }, null, null]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatDialogTitle, "[mat-dialog-title], [matDialogTitle]", ["matDialogTitle"], { "id": "id"; }, {}, never>;
}
/**
 * Scrollable content container of a dialog.
 */
export declare class MatDialogContent {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDialogContent, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatDialogContent, "[mat-dialog-content], mat-dialog-content, [matDialogContent]", never, {}, {}, never>;
}
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export declare class MatDialogActions {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDialogActions, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatDialogActions, "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQtZGlyZWN0aXZlcy5kLnRzIiwic291cmNlcyI6WyJkaWFsb2ctY29udGVudC1kaXJlY3RpdmVzLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJy4vZGlhbG9nJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJy4vZGlhbG9nLXJlZic7XG4vKipcbiAqIEJ1dHRvbiB0aGF0IHdpbGwgY2xvc2UgdGhlIGN1cnJlbnQgZGlhbG9nLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXREaWFsb2dDbG9zZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxhbnk+O1xuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfZGlhbG9nO1xuICAgIC8qKiBTY3JlZW5yZWFkZXIgbGFiZWwgZm9yIHRoZSBidXR0b24uICovXG4gICAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgLyoqIERlZmF1bHQgdG8gXCJidXR0b25cIiB0byBwcmV2ZW50cyBhY2NpZGVudGFsIGZvcm0gc3VibWl0cy4gKi9cbiAgICB0eXBlOiAnc3VibWl0JyB8ICdidXR0b24nIHwgJ3Jlc2V0JztcbiAgICAvKiogRGlhbG9nIGNsb3NlIGlucHV0LiAqL1xuICAgIGRpYWxvZ1Jlc3VsdDogYW55O1xuICAgIF9tYXREaWFsb2dDbG9zZTogYW55O1xuICAgIGNvbnN0cnVjdG9yKGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPGFueT4sIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgX2RpYWxvZzogTWF0RGlhbG9nKTtcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkO1xufVxuLyoqXG4gKiBUaXRsZSBvZiBhIGRpYWxvZyBlbGVtZW50LiBTdGF5cyBmaXhlZCB0byB0aGUgdG9wIG9mIHRoZSBkaWFsb2cgd2hlbiBzY3JvbGxpbmcuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdERpYWxvZ1RpdGxlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIF9kaWFsb2dSZWY7XG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjtcbiAgICBwcml2YXRlIF9kaWFsb2c7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihfZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8YW55PiwgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBfZGlhbG9nOiBNYXREaWFsb2cpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG59XG4vKipcbiAqIFNjcm9sbGFibGUgY29udGVudCBjb250YWluZXIgb2YgYSBkaWFsb2cuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdERpYWxvZ0NvbnRlbnQge1xufVxuLyoqXG4gKiBDb250YWluZXIgZm9yIHRoZSBib3R0b20gYWN0aW9uIGJ1dHRvbnMgaW4gYSBkaWFsb2cuXG4gKiBTdGF5cyBmaXhlZCB0byB0aGUgYm90dG9tIHdoZW4gc2Nyb2xsaW5nLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXREaWFsb2dBY3Rpb25zIHtcbn1cbiJdfQ==