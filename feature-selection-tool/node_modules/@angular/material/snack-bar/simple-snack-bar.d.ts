/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatSnackBarRef } from './snack-bar-ref';
/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
import * as ɵngcc0 from '@angular/core';
export declare class SimpleSnackBar {
    snackBarRef: MatSnackBarRef<SimpleSnackBar>;
    /** Data that was injected into the snack bar. */
    data: {
        message: string;
        action: string;
    };
    constructor(snackBarRef: MatSnackBarRef<SimpleSnackBar>, data: any);
    /** Performs the action on the snack bar. */
    action(): void;
    /** If the action button should be shown. */
    get hasAction(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SimpleSnackBar, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SimpleSnackBar, "simple-snack-bar", never, {}, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNuYWNrLWJhci5kLnRzIiwic291cmNlcyI6WyJzaW1wbGUtc25hY2stYmFyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE1hdFNuYWNrQmFyUmVmIH0gZnJvbSAnLi9zbmFjay1iYXItcmVmJztcbi8qKlxuICogQSBjb21wb25lbnQgdXNlZCB0byBvcGVuIGFzIHRoZSBkZWZhdWx0IHNuYWNrIGJhciwgbWF0Y2hpbmcgbWF0ZXJpYWwgc3BlYy5cbiAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzbmFjayBiYXIgc2VydmljZS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgU2ltcGxlU25hY2tCYXIge1xuICAgIHNuYWNrQmFyUmVmOiBNYXRTbmFja0JhclJlZjxTaW1wbGVTbmFja0Jhcj47XG4gICAgLyoqIERhdGEgdGhhdCB3YXMgaW5qZWN0ZWQgaW50byB0aGUgc25hY2sgYmFyLiAqL1xuICAgIGRhdGE6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICBhY3Rpb246IHN0cmluZztcbiAgICB9O1xuICAgIGNvbnN0cnVjdG9yKHNuYWNrQmFyUmVmOiBNYXRTbmFja0JhclJlZjxTaW1wbGVTbmFja0Jhcj4sIGRhdGE6IGFueSk7XG4gICAgLyoqIFBlcmZvcm1zIHRoZSBhY3Rpb24gb24gdGhlIHNuYWNrIGJhci4gKi9cbiAgICBhY3Rpb24oKTogdm9pZDtcbiAgICAvKiogSWYgdGhlIGFjdGlvbiBidXR0b24gc2hvdWxkIGJlIHNob3duLiAqL1xuICAgIGdldCBoYXNBY3Rpb24oKTogYm9vbGVhbjtcbn1cbiJdfQ==