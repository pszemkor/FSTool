/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ElementRef, InjectionToken, OnInit } from '@angular/core';
import { CanColor, CanColorCtor } from '@angular/material/core';
/** Possible mode for a progress spinner. */
import * as ɵngcc0 from '@angular/core';
export declare type ProgressSpinnerMode = 'determinate' | 'indeterminate';
/** @docs-private */
declare class MatProgressSpinnerBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatProgressSpinnerMixinBase: CanColorCtor & typeof MatProgressSpinnerBase;
/** Default `mat-progress-spinner` options that can be overridden. */
export interface MatProgressSpinnerDefaultOptions {
    /** Diameter of the spinner. */
    diameter?: number;
    /** Width of the spinner's stroke. */
    strokeWidth?: number;
    /**
     * Whether the animations should be force to be enabled, ignoring if the current environment is
     * using NoopAnimationsModule.
     */
    _forceAnimations?: boolean;
}
/** Injection token to be used to override the default options for `mat-progress-spinner`. */
export declare const MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS: InjectionToken<MatProgressSpinnerDefaultOptions>;
/** @docs-private */
export declare function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY(): MatProgressSpinnerDefaultOptions;
/**
 * `<mat-progress-spinner>` component.
 */
export declare class MatProgressSpinner extends _MatProgressSpinnerMixinBase implements OnInit, CanColor {
    _elementRef: ElementRef<HTMLElement>;
    private _document;
    private _diameter;
    private _value;
    private _strokeWidth;
    private _fallbackAnimation;
    /**
     * Element to which we should add the generated style tags for the indeterminate animation.
     * For most elements this is the document, but for the ones in the Shadow DOM we need to
     * use the shadow root.
     */
    private _styleRoot;
    /**
     * Tracks diameters of existing instances to de-dupe generated styles (default d = 100).
     * We need to keep track of which elements the diameters were attached to, because for
     * elements in the Shadow DOM the style tags are attached to the shadow root, rather
     * than the document head.
     */
    private static _diameters;
    /** Whether the _mat-animation-noopable class should be applied, disabling animations.  */
    _noopAnimations: boolean;
    /** The diameter of the progress spinner (will set width and height of svg). */
    get diameter(): number;
    set diameter(size: number);
    /** Stroke width of the progress spinner. */
    get strokeWidth(): number;
    set strokeWidth(value: number);
    /** Mode of the progress circle */
    mode: ProgressSpinnerMode;
    /** Value of the progress circle. */
    get value(): number;
    set value(newValue: number);
    constructor(_elementRef: ElementRef<HTMLElement>, platform: Platform, _document: any, animationMode: string, defaults?: MatProgressSpinnerDefaultOptions);
    ngOnInit(): void;
    /** The radius of the spinner, adjusted for stroke width. */
    get _circleRadius(): number;
    /** The view box of the spinner's svg element. */
    get _viewBox(): string;
    /** The stroke circumference of the svg circle. */
    get _strokeCircumference(): number;
    /** The dash offset of the svg circle. */
    get _strokeDashOffset(): number | null;
    /** Stroke width of the circle in percent. */
    get _circleStrokeWidth(): number;
    /** Dynamically generates a style tag containing the correct animation for this diameter. */
    private _attachStyleNode;
    /** Generates animation styles adjusted for the spinner's diameter. */
    private _getAnimationText;
    static ngAcceptInputType_diameter: NumberInput;
    static ngAcceptInputType_strokeWidth: NumberInput;
    static ngAcceptInputType_value: NumberInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatProgressSpinner, [null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatProgressSpinner, "mat-progress-spinner", ["matProgressSpinner"], { "color": "color"; "mode": "mode"; "diameter": "diameter"; "strokeWidth": "strokeWidth"; "value": "value"; }, {}, never, never>;
}
/**
 * `<mat-spinner>` component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate `<mat-progress-spinner>` instance.
 */
export declare class MatSpinner extends MatProgressSpinner {
    constructor(elementRef: ElementRef<HTMLElement>, platform: Platform, document: any, animationMode: string, defaults?: MatProgressSpinnerDefaultOptions);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSpinner, [null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSpinner, "mat-spinner", never, { "color": "color"; }, {}, never, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5kLnRzIiwic291cmNlcyI6WyJwcm9ncmVzcy1zcGlubmVyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBOdW1iZXJJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3Rpb25Ub2tlbiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG4vKiogUG9zc2libGUgbW9kZSBmb3IgYSBwcm9ncmVzcyBzcGlubmVyLiAqL1xuZXhwb3J0IGRlY2xhcmUgdHlwZSBQcm9ncmVzc1NwaW5uZXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcbi8qKiBAZG9jcy1wcml2YXRlICovXG5kZWNsYXJlIGNsYXNzIE1hdFByb2dyZXNzU3Bpbm5lckJhc2Uge1xuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKTtcbn1cbmRlY2xhcmUgY29uc3QgX01hdFByb2dyZXNzU3Bpbm5lck1peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1hdFByb2dyZXNzU3Bpbm5lckJhc2U7XG4vKiogRGVmYXVsdCBgbWF0LXByb2dyZXNzLXNwaW5uZXJgIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0UHJvZ3Jlc3NTcGlubmVyRGVmYXVsdE9wdGlvbnMge1xuICAgIC8qKiBEaWFtZXRlciBvZiB0aGUgc3Bpbm5lci4gKi9cbiAgICBkaWFtZXRlcj86IG51bWJlcjtcbiAgICAvKiogV2lkdGggb2YgdGhlIHNwaW5uZXIncyBzdHJva2UuICovXG4gICAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYW5pbWF0aW9ucyBzaG91bGQgYmUgZm9yY2UgdG8gYmUgZW5hYmxlZCwgaWdub3JpbmcgaWYgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgaXNcbiAgICAgKiB1c2luZyBOb29wQW5pbWF0aW9uc01vZHVsZS5cbiAgICAgKi9cbiAgICBfZm9yY2VBbmltYXRpb25zPzogYm9vbGVhbjtcbn1cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWF0LXByb2dyZXNzLXNwaW5uZXJgLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxNYXRQcm9ncmVzc1NwaW5uZXJEZWZhdWx0T3B0aW9ucz47XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlkoKTogTWF0UHJvZ3Jlc3NTcGlubmVyRGVmYXVsdE9wdGlvbnM7XG4vKipcbiAqIGA8bWF0LXByb2dyZXNzLXNwaW5uZXI+YCBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFByb2dyZXNzU3Bpbm5lciBleHRlbmRzIF9NYXRQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIENhbkNvbG9yIHtcbiAgICBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ7XG4gICAgcHJpdmF0ZSBfZGlhbWV0ZXI7XG4gICAgcHJpdmF0ZSBfdmFsdWU7XG4gICAgcHJpdmF0ZSBfc3Ryb2tlV2lkdGg7XG4gICAgcHJpdmF0ZSBfZmFsbGJhY2tBbmltYXRpb247XG4gICAgLyoqXG4gICAgICogRWxlbWVudCB0byB3aGljaCB3ZSBzaG91bGQgYWRkIHRoZSBnZW5lcmF0ZWQgc3R5bGUgdGFncyBmb3IgdGhlIGluZGV0ZXJtaW5hdGUgYW5pbWF0aW9uLlxuICAgICAqIEZvciBtb3N0IGVsZW1lbnRzIHRoaXMgaXMgdGhlIGRvY3VtZW50LCBidXQgZm9yIHRoZSBvbmVzIGluIHRoZSBTaGFkb3cgRE9NIHdlIG5lZWQgdG9cbiAgICAgKiB1c2UgdGhlIHNoYWRvdyByb290LlxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0eWxlUm9vdDtcbiAgICAvKipcbiAgICAgKiBUcmFja3MgZGlhbWV0ZXJzIG9mIGV4aXN0aW5nIGluc3RhbmNlcyB0byBkZS1kdXBlIGdlbmVyYXRlZCBzdHlsZXMgKGRlZmF1bHQgZCA9IDEwMCkuXG4gICAgICogV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIHdoaWNoIGVsZW1lbnRzIHRoZSBkaWFtZXRlcnMgd2VyZSBhdHRhY2hlZCB0bywgYmVjYXVzZSBmb3JcbiAgICAgKiBlbGVtZW50cyBpbiB0aGUgU2hhZG93IERPTSB0aGUgc3R5bGUgdGFncyBhcmUgYXR0YWNoZWQgdG8gdGhlIHNoYWRvdyByb290LCByYXRoZXJcbiAgICAgKiB0aGFuIHRoZSBkb2N1bWVudCBoZWFkLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9kaWFtZXRlcnM7XG4gICAgLyoqIFdoZXRoZXIgdGhlIF9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkLCBkaXNhYmxpbmcgYW5pbWF0aW9ucy4gICovXG4gICAgX25vb3BBbmltYXRpb25zOiBib29sZWFuO1xuICAgIC8qKiBUaGUgZGlhbWV0ZXIgb2YgdGhlIHByb2dyZXNzIHNwaW5uZXIgKHdpbGwgc2V0IHdpZHRoIGFuZCBoZWlnaHQgb2Ygc3ZnKS4gKi9cbiAgICBnZXQgZGlhbWV0ZXIoKTogbnVtYmVyO1xuICAgIHNldCBkaWFtZXRlcihzaXplOiBudW1iZXIpO1xuICAgIC8qKiBTdHJva2Ugd2lkdGggb2YgdGhlIHByb2dyZXNzIHNwaW5uZXIuICovXG4gICAgZ2V0IHN0cm9rZVdpZHRoKCk6IG51bWJlcjtcbiAgICBzZXQgc3Ryb2tlV2lkdGgodmFsdWU6IG51bWJlcik7XG4gICAgLyoqIE1vZGUgb2YgdGhlIHByb2dyZXNzIGNpcmNsZSAqL1xuICAgIG1vZGU6IFByb2dyZXNzU3Bpbm5lck1vZGU7XG4gICAgLyoqIFZhbHVlIG9mIHRoZSBwcm9ncmVzcyBjaXJjbGUuICovXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlcjtcbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcik7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwbGF0Zm9ybTogUGxhdGZvcm0sIF9kb2N1bWVudDogYW55LCBhbmltYXRpb25Nb2RlOiBzdHJpbmcsIGRlZmF1bHRzPzogTWF0UHJvZ3Jlc3NTcGlubmVyRGVmYXVsdE9wdGlvbnMpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgLyoqIFRoZSByYWRpdXMgb2YgdGhlIHNwaW5uZXIsIGFkanVzdGVkIGZvciBzdHJva2Ugd2lkdGguICovXG4gICAgZ2V0IF9jaXJjbGVSYWRpdXMoKTogbnVtYmVyO1xuICAgIC8qKiBUaGUgdmlldyBib3ggb2YgdGhlIHNwaW5uZXIncyBzdmcgZWxlbWVudC4gKi9cbiAgICBnZXQgX3ZpZXdCb3goKTogc3RyaW5nO1xuICAgIC8qKiBUaGUgc3Ryb2tlIGNpcmN1bWZlcmVuY2Ugb2YgdGhlIHN2ZyBjaXJjbGUuICovXG4gICAgZ2V0IF9zdHJva2VDaXJjdW1mZXJlbmNlKCk6IG51bWJlcjtcbiAgICAvKiogVGhlIGRhc2ggb2Zmc2V0IG9mIHRoZSBzdmcgY2lyY2xlLiAqL1xuICAgIGdldCBfc3Ryb2tlRGFzaE9mZnNldCgpOiBudW1iZXIgfCBudWxsO1xuICAgIC8qKiBTdHJva2Ugd2lkdGggb2YgdGhlIGNpcmNsZSBpbiBwZXJjZW50LiAqL1xuICAgIGdldCBfY2lyY2xlU3Ryb2tlV2lkdGgoKTogbnVtYmVyO1xuICAgIC8qKiBEeW5hbWljYWxseSBnZW5lcmF0ZXMgYSBzdHlsZSB0YWcgY29udGFpbmluZyB0aGUgY29ycmVjdCBhbmltYXRpb24gZm9yIHRoaXMgZGlhbWV0ZXIuICovXG4gICAgcHJpdmF0ZSBfYXR0YWNoU3R5bGVOb2RlO1xuICAgIC8qKiBHZW5lcmF0ZXMgYW5pbWF0aW9uIHN0eWxlcyBhZGp1c3RlZCBmb3IgdGhlIHNwaW5uZXIncyBkaWFtZXRlci4gKi9cbiAgICBwcml2YXRlIF9nZXRBbmltYXRpb25UZXh0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaWFtZXRlcjogTnVtYmVySW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0cm9rZVdpZHRoOiBOdW1iZXJJbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmFsdWU6IE51bWJlcklucHV0O1xufVxuLyoqXG4gKiBgPG1hdC1zcGlubmVyPmAgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgaXMgYSBjb21wb25lbnQgZGVmaW5pdGlvbiB0byBiZSB1c2VkIGFzIGEgY29udmVuaWVuY2UgcmVmZXJlbmNlIHRvIGNyZWF0ZSBhblxuICogaW5kZXRlcm1pbmF0ZSBgPG1hdC1wcm9ncmVzcy1zcGlubmVyPmAgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNwaW5uZXIgZXh0ZW5kcyBNYXRQcm9ncmVzc1NwaW5uZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwbGF0Zm9ybTogUGxhdGZvcm0sIGRvY3VtZW50OiBhbnksIGFuaW1hdGlvbk1vZGU6IHN0cmluZywgZGVmYXVsdHM/OiBNYXRQcm9ncmVzc1NwaW5uZXJEZWZhdWx0T3B0aW9ucyk7XG59XG5leHBvcnQge307XG4iXX0=