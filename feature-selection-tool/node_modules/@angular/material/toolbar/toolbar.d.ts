/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ElementRef, QueryList } from '@angular/core';
import { CanColor, CanColorCtor } from '@angular/material/core';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
declare class MatToolbarBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatToolbarMixinBase: CanColorCtor & typeof MatToolbarBase;
export declare class MatToolbarRow {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatToolbarRow, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatToolbarRow, "mat-toolbar-row", ["matToolbarRow"], {}, {}, never>;
}
export declare class MatToolbar extends _MatToolbarMixinBase implements CanColor, AfterViewInit {
    private _platform;
    private _document;
    /** Reference to all toolbar row elements that have been projected. */
    _toolbarRows: QueryList<MatToolbarRow>;
    constructor(elementRef: ElementRef, _platform: Platform, document?: any);
    ngAfterViewInit(): void;
    /**
     * Throws an exception when developers are attempting to combine the different toolbar row modes.
     */
    private _checkToolbarMixedModes;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatToolbar, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatToolbar, "mat-toolbar", ["matToolbar"], { "color": "color"; }, {}, ["_toolbarRows"], ["*", "mat-toolbar-row"]>;
}
/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
export declare function throwToolbarMixedModesError(): void;
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5kLnRzIiwic291cmNlcyI6WyJ0b29sYmFyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0VG9vbGJhckJhc2Uge1xuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKTtcbn1cbmRlY2xhcmUgY29uc3QgX01hdFRvb2xiYXJNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNYXRUb29sYmFyQmFzZTtcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFRvb2xiYXJSb3cge1xufVxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0VG9vbGJhciBleHRlbmRzIF9NYXRUb29sYmFyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuQ29sb3IsIEFmdGVyVmlld0luaXQge1xuICAgIHByaXZhdGUgX3BsYXRmb3JtO1xuICAgIHByaXZhdGUgX2RvY3VtZW50O1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gYWxsIHRvb2xiYXIgcm93IGVsZW1lbnRzIHRoYXQgaGF2ZSBiZWVuIHByb2plY3RlZC4gKi9cbiAgICBfdG9vbGJhclJvd3M6IFF1ZXJ5TGlzdDxNYXRUb29sYmFyUm93PjtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBfcGxhdGZvcm06IFBsYXRmb3JtLCBkb2N1bWVudD86IGFueSk7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIGRldmVsb3BlcnMgYXJlIGF0dGVtcHRpbmcgdG8gY29tYmluZSB0aGUgZGlmZmVyZW50IHRvb2xiYXIgcm93IG1vZGVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NoZWNrVG9vbGJhck1peGVkTW9kZXM7XG59XG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gd2hlbiBhdHRlbXB0aW5nIHRvIGNvbWJpbmUgdGhlIGRpZmZlcmVudCB0b29sYmFyIHJvdyBtb2Rlcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gdGhyb3dUb29sYmFyTWl4ZWRNb2Rlc0Vycm9yKCk6IHZvaWQ7XG5leHBvcnQge307XG4iXX0=