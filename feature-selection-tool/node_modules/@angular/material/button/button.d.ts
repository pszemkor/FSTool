/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, OnDestroy } from '@angular/core';
import { CanColor, CanDisable, CanDisableRipple, CanColorCtor, CanDisableCtor, CanDisableRippleCtor, MatRipple } from '@angular/material/core';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
declare class MatButtonBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatButtonMixinBase: CanDisableRippleCtor & CanDisableCtor & CanColorCtor & typeof MatButtonBase;
/**
 * Material design button.
 */
export declare class MatButton extends _MatButtonMixinBase implements OnDestroy, CanDisable, CanColor, CanDisableRipple, FocusableOption {
    private _focusMonitor;
    _animationMode: string;
    /** Whether the button is round. */
    readonly isRoundButton: boolean;
    /** Whether the button is icon button. */
    readonly isIconButton: boolean;
    /** Reference to the MatRipple instance of the button. */
    ripple: MatRipple;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor, _animationMode: string);
    ngOnDestroy(): void;
    /** Focuses the button. */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    _getHostElement(): any;
    _isRippleDisabled(): boolean;
    /** Gets whether the button has one of the given attributes. */
    _hasHostAttributes(...attributes: string[]): boolean;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatButton, [null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatButton, "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", ["matButton"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "color": "color"; }, {}, never, ["*"]>;
}
/**
 * Material design anchor button.
 */
export declare class MatAnchor extends MatButton {
    /** Tabindex of the button. */
    tabIndex: number;
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef, animationMode: string);
    _haltDisabledEvents(event: Event): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatAnchor, [null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatAnchor, "a[mat-button], a[mat-raised-button], a[mat-icon-button], a[mat-fab],             a[mat-mini-fab], a[mat-stroked-button], a[mat-flat-button]", ["matButton", "matAnchor"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "color": "color"; "tabIndex": "tabIndex"; }, {}, never, ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmQudHMiLCJzb3VyY2VzIjpbImJ1dHRvbi5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRm9jdXNNb25pdG9yLCBGb2N1c2FibGVPcHRpb24sIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkRpc2FibGUsIENhbkRpc2FibGVSaXBwbGUsIENhbkNvbG9yQ3RvciwgQ2FuRGlzYWJsZUN0b3IsIENhbkRpc2FibGVSaXBwbGVDdG9yLCBNYXRSaXBwbGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbi8qKiBAZG9jcy1wcml2YXRlICovXG5kZWNsYXJlIGNsYXNzIE1hdEJ1dHRvbkJhc2Uge1xuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKTtcbn1cbmRlY2xhcmUgY29uc3QgX01hdEJ1dHRvbk1peGluQmFzZTogQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNYXRCdXR0b25CYXNlO1xuLyoqXG4gKiBNYXRlcmlhbCBkZXNpZ24gYnV0dG9uLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRCdXR0b24gZXh0ZW5kcyBfTWF0QnV0dG9uTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSwgRm9jdXNhYmxlT3B0aW9uIHtcbiAgICBwcml2YXRlIF9mb2N1c01vbml0b3I7XG4gICAgX2FuaW1hdGlvbk1vZGU6IHN0cmluZztcbiAgICAvKiogV2hldGhlciB0aGUgYnV0dG9uIGlzIHJvdW5kLiAqL1xuICAgIHJlYWRvbmx5IGlzUm91bmRCdXR0b246IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGJ1dHRvbiBpcyBpY29uIGJ1dHRvbi4gKi9cbiAgICByZWFkb25seSBpc0ljb25CdXR0b246IGJvb2xlYW47XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBidXR0b24uICovXG4gICAgcmlwcGxlOiBNYXRSaXBwbGU7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBfYW5pbWF0aW9uTW9kZTogc3RyaW5nKTtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gICAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkO1xuICAgIF9nZXRIb3N0RWxlbWVudCgpOiBhbnk7XG4gICAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICAvKiogR2V0cyB3aGV0aGVyIHRoZSBidXR0b24gaGFzIG9uZSBvZiB0aGUgZ2l2ZW4gYXR0cmlidXRlcy4gKi9cbiAgICBfaGFzSG9zdEF0dHJpYnV0ZXMoLi4uYXR0cmlidXRlczogc3RyaW5nW10pOiBib29sZWFuO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG4vKipcbiAqIE1hdGVyaWFsIGRlc2lnbiBhbmNob3IgYnV0dG9uLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRBbmNob3IgZXh0ZW5kcyBNYXRCdXR0b24ge1xuICAgIC8qKiBUYWJpbmRleCBvZiB0aGUgYnV0dG9uLiAqL1xuICAgIHRhYkluZGV4OiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IoZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGFuaW1hdGlvbk1vZGU6IHN0cmluZyk7XG4gICAgX2hhbHREaXNhYmxlZEV2ZW50cyhldmVudDogRXZlbnQpOiB2b2lkO1xufVxuZXhwb3J0IHt9O1xuIl19