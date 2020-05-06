/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, QueryList } from '@angular/core';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MatLine) query, then
 * counted by checking the query list's length.
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '../common-behaviors/common-module';
export declare class MatLine {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatLine, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatLine, "[mat-line], [matLine]", never, {}, {}, never>;
}
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
export declare function setLines(lines: QueryList<unknown>, element: ElementRef<HTMLElement>, prefix?: string): void;
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 * @deprecated Use `setLines` instead.
 * @breaking-change 8.0.0
 */
export declare class MatLineSetter {
    constructor(lines: QueryList<MatLine>, element: ElementRef<HTMLElement>);
}
export declare class MatLineModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<MatLineModule, [typeof MatLine], [typeof ɵngcc1.MatCommonModule], [typeof MatLine, typeof ɵngcc1.MatCommonModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<MatLineModule>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5kLnRzIiwic291cmNlcyI6WyJsaW5lLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4gKiBTaGFyZWQgZGlyZWN0aXZlIHRvIGNvdW50IGxpbmVzIGluc2lkZSBhIHRleHQgYXJlYSwgc3VjaCBhcyBhIGxpc3QgaXRlbS5cbiAqIExpbmUgZWxlbWVudHMgY2FuIGJlIGV4dHJhY3RlZCB3aXRoIGEgQENvbnRlbnRDaGlsZHJlbihNYXRMaW5lKSBxdWVyeSwgdGhlblxuICogY291bnRlZCBieSBjaGVja2luZyB0aGUgcXVlcnkgbGlzdCdzIGxlbmd0aC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0TGluZSB7XG59XG4vKipcbiAqIEhlbHBlciB0aGF0IHRha2VzIGEgcXVlcnkgbGlzdCBvZiBsaW5lcyBhbmQgc2V0cyB0aGUgY29ycmVjdCBjbGFzcyBvbiB0aGUgaG9zdC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gc2V0TGluZXMobGluZXM6IFF1ZXJ5TGlzdDx1bmtub3duPiwgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByZWZpeD86IHN0cmluZyk6IHZvaWQ7XG4vKipcbiAqIEhlbHBlciB0aGF0IHRha2VzIGEgcXVlcnkgbGlzdCBvZiBsaW5lcyBhbmQgc2V0cyB0aGUgY29ycmVjdCBjbGFzcyBvbiB0aGUgaG9zdC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgc2V0TGluZXNgIGluc3RlYWQuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdExpbmVTZXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGxpbmVzOiBRdWVyeUxpc3Q8TWF0TGluZT4sIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KTtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdExpbmVNb2R1bGUge1xufVxuIl19