/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, InjectionToken, NgZone, QueryList, OnDestroy } from '@angular/core';
import { CanColor, CanColorCtor, LabelOptions } from '@angular/material/core';
import { MatError } from './error';
import { MatFormFieldControl } from './form-field-control';
import { MatHint } from './hint';
import { MatLabel } from './label';
import { MatPlaceholder } from './placeholder';
import { MatPrefix } from './prefix';
import { MatSuffix } from './suffix';
import { Platform } from '@angular/cdk/platform';
import { NgControl } from '@angular/forms';
/**
 * Boilerplate for applying mixins to MatFormField.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
declare class MatFormFieldBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
/**
 * Base class to which we're applying the form field mixins.
 * @docs-private
 */
declare const _MatFormFieldMixinBase: CanColorCtor & typeof MatFormFieldBase;
/** Possible appearance styles for the form field. */
export declare type MatFormFieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline';
/** Possible values for the "floatLabel" form-field input. */
export declare type FloatLabelType = 'always' | 'never' | 'auto';
/**
 * Represents the default options for the form field that can be configured
 * using the `MAT_FORM_FIELD_DEFAULT_OPTIONS` injection token.
 */
export interface MatFormFieldDefaultOptions {
    appearance?: MatFormFieldAppearance;
    hideRequiredMarker?: boolean;
    /**
     * Whether the label for form-fields should by default float `always`,
     * `never`, or `auto` (only when necessary).
     */
    floatLabel?: FloatLabelType;
}
/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
export declare const MAT_FORM_FIELD_DEFAULT_OPTIONS: InjectionToken<MatFormFieldDefaultOptions>;
/**
 * Injection token that can be used to inject an instances of `MatFormField`. It serves
 * as alternative token to the actual `MatFormField` class which would cause unnecessary
 * retention of the `MatFormField` class and its component metadata.
 */
export declare const MAT_FORM_FIELD: InjectionToken<MatFormField>;
/** Container for form controls that applies Material Design styling and behavior. */
export declare class MatFormField extends _MatFormFieldMixinBase implements AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy, CanColor {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    private _dir;
    private _defaults;
    private _platform;
    private _ngZone;
    private _labelOptions;
    /**
     * Whether the outline gap needs to be calculated
     * immediately on the next change detection run.
     */
    private _outlineGapCalculationNeededImmediately;
    /** Whether the outline gap needs to be calculated next time the zone has stabilized. */
    private _outlineGapCalculationNeededOnStable;
    private _destroyed;
    /** The form-field appearance style. */
    get appearance(): MatFormFieldAppearance;
    set appearance(value: MatFormFieldAppearance);
    _appearance: MatFormFieldAppearance;
    /** Whether the required marker should be hidden. */
    get hideRequiredMarker(): boolean;
    set hideRequiredMarker(value: boolean);
    private _hideRequiredMarker;
    /** Override for the logic that disables the label animation in certain cases. */
    private _showAlwaysAnimate;
    /** Whether the floating label should always float or not. */
    get _shouldAlwaysFloat(): boolean;
    /** Whether the label can float or not. */
    get _canLabelFloat(): boolean;
    /** State of the mat-hint and mat-error animations. */
    _subscriptAnimationState: string;
    /** Text for the form field hint. */
    get hintLabel(): string;
    set hintLabel(value: string);
    private _hintLabel;
    _hintLabelId: string;
    _labelId: string;
    /**
     * Whether the label should always float, never float or float as the user types.
     *
     * Note: only the legacy appearance supports the `never` option. `never` was originally added as a
     * way to make the floating label emulate the behavior of a standard input placeholder. However
     * the form field now supports both floating labels and placeholders. Therefore in the non-legacy
     * appearances the `never` option has been disabled in favor of just using the placeholder.
     */
    get floatLabel(): FloatLabelType;
    set floatLabel(value: FloatLabelType);
    private _floatLabel;
    /** Whether the Angular animations are enabled. */
    _animationsEnabled: boolean;
    /**
     * @deprecated
     * @breaking-change 8.0.0
     */
    underlineRef: ElementRef;
    _connectionContainerRef: ElementRef;
    _inputContainerRef: ElementRef;
    private _label;
    _controlNonStatic: MatFormFieldControl<any>;
    _controlStatic: MatFormFieldControl<any>;
    get _control(): MatFormFieldControl<any>;
    set _control(value: MatFormFieldControl<any>);
    private _explicitFormFieldControl;
    _labelChildNonStatic: MatLabel;
    _labelChildStatic: MatLabel;
    get _labelChild(): MatLabel;
    _placeholderChild: MatPlaceholder;
    _errorChildren: QueryList<MatError>;
    _hintChildren: QueryList<MatHint>;
    _prefixChildren: QueryList<MatPrefix>;
    _suffixChildren: QueryList<MatSuffix>;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef, labelOptions: LabelOptions, _dir: Directionality, _defaults: MatFormFieldDefaultOptions, _platform: Platform, _ngZone: NgZone, _animationMode: string);
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin(): ElementRef;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: keyof NgControl): boolean;
    _hasPlaceholder(): boolean;
    _hasLabel(): boolean;
    _shouldLabelFloat(): boolean;
    _hideControlPlaceholder(): boolean;
    _hasFloatingLabel(): boolean;
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages(): 'error' | 'hint';
    /** Animates the placeholder up and locks it in position. */
    _animateAndLockLabel(): void;
    /**
     * Ensure that there is only one placeholder (either `placeholder` attribute on the child control
     * or child element with the `mat-placeholder` directive).
     */
    private _validatePlaceholders;
    /** Does any extra processing that is required when handling the hints. */
    private _processHints;
    /**
     * Ensure that there is a maximum of one of each `<mat-hint>` alignment specified, with the
     * attribute being considered as `align="start"`.
     */
    private _validateHints;
    /** Gets the default float label state. */
    private _getDefaultFloatLabelState;
    /**
     * Sets the list of element IDs that describe the child control. This allows the control to update
     * its `aria-describedby` attribute accordingly.
     */
    private _syncDescribedByIds;
    /** Throws an error if the form field's control is missing. */
    protected _validateControlChild(): void;
    /**
     * Updates the width and position of the gap in the outline. Only relevant for the outline
     * appearance.
     */
    updateOutlineGap(): void;
    /** Gets the start end of the rect considering the current directionality. */
    private _getStartEnd;
    /** Checks whether the form field is attached to the DOM. */
    private _isAttachedToDOM;
    static ngAcceptInputType_hideRequiredMarker: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatFormField, [null, null, { optional: true; }, { optional: true; }, { optional: true; }, null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatFormField, "mat-form-field", ["matFormField"], { "color": "color"; "floatLabel": "floatLabel"; "appearance": "appearance"; "hideRequiredMarker": "hideRequiredMarker"; "hintLabel": "hintLabel"; }, {}, ["_controlNonStatic", "_controlStatic", "_labelChildNonStatic", "_labelChildStatic", "_placeholderChild", "_errorChildren", "_hintChildren", "_prefixChildren", "_suffixChildren"], ["[matPrefix]", "*", "mat-placeholder", "mat-label", "[matSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5kLnRzIiwic291cmNlcyI6WyJmb3JtLWZpZWxkLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIFF1ZXJ5TGlzdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBMYWJlbE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdEVycm9yIH0gZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnLi9mb3JtLWZpZWxkLWNvbnRyb2wnO1xuaW1wb3J0IHsgTWF0SGludCB9IGZyb20gJy4vaGludCc7XG5pbXBvcnQgeyBNYXRMYWJlbCB9IGZyb20gJy4vbGFiZWwnO1xuaW1wb3J0IHsgTWF0UGxhY2Vob2xkZXIgfSBmcm9tICcuL3BsYWNlaG9sZGVyJztcbmltcG9ydCB7IE1hdFByZWZpeCB9IGZyb20gJy4vcHJlZml4JztcbmltcG9ydCB7IE1hdFN1ZmZpeCB9IGZyb20gJy4vc3VmZml4JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8qKlxuICogQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRGb3JtRmllbGQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmRlY2xhcmUgY2xhc3MgTWF0Rm9ybUZpZWxkQmFzZSB7XG4gICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpO1xufVxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIHdoaWNoIHdlJ3JlIGFwcGx5aW5nIHRoZSBmb3JtIGZpZWxkIG1peGlucy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZGVjbGFyZSBjb25zdCBfTWF0Rm9ybUZpZWxkTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWF0Rm9ybUZpZWxkQmFzZTtcbi8qKiBQb3NzaWJsZSBhcHBlYXJhbmNlIHN0eWxlcyBmb3IgdGhlIGZvcm0gZmllbGQuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIE1hdEZvcm1GaWVsZEFwcGVhcmFuY2UgPSAnbGVnYWN5JyB8ICdzdGFuZGFyZCcgfCAnZmlsbCcgfCAnb3V0bGluZSc7XG4vKiogUG9zc2libGUgdmFsdWVzIGZvciB0aGUgXCJmbG9hdExhYmVsXCIgZm9ybS1maWVsZCBpbnB1dC4gKi9cbmV4cG9ydCBkZWNsYXJlIHR5cGUgRmxvYXRMYWJlbFR5cGUgPSAnYWx3YXlzJyB8ICduZXZlcicgfCAnYXV0byc7XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIGZvcm0gZmllbGQgdGhhdCBjYW4gYmUgY29uZmlndXJlZFxuICogdXNpbmcgdGhlIGBNQVRfRk9STV9GSUVMRF9ERUZBVUxUX09QVElPTlNgIGluamVjdGlvbiB0b2tlbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRGb3JtRmllbGREZWZhdWx0T3B0aW9ucyB7XG4gICAgYXBwZWFyYW5jZT86IE1hdEZvcm1GaWVsZEFwcGVhcmFuY2U7XG4gICAgaGlkZVJlcXVpcmVkTWFya2VyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBsYWJlbCBmb3IgZm9ybS1maWVsZHMgc2hvdWxkIGJ5IGRlZmF1bHQgZmxvYXQgYGFsd2F5c2AsXG4gICAgICogYG5ldmVyYCwgb3IgYGF1dG9gIChvbmx5IHdoZW4gbmVjZXNzYXJ5KS5cbiAgICAgKi9cbiAgICBmbG9hdExhYmVsPzogRmxvYXRMYWJlbFR5cGU7XG59XG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGVcbiAqIGRlZmF1bHQgb3B0aW9ucyBmb3IgYWxsIGZvcm0gZmllbGQgd2l0aGluIGFuIGFwcC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0ZPUk1fRklFTERfREVGQVVMVF9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxNYXRGb3JtRmllbGREZWZhdWx0T3B0aW9ucz47XG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluamVjdCBhbiBpbnN0YW5jZXMgb2YgYE1hdEZvcm1GaWVsZGAuIEl0IHNlcnZlc1xuICogYXMgYWx0ZXJuYXRpdmUgdG9rZW4gdG8gdGhlIGFjdHVhbCBgTWF0Rm9ybUZpZWxkYCBjbGFzcyB3aGljaCB3b3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBgTWF0Rm9ybUZpZWxkYCBjbGFzcyBhbmQgaXRzIGNvbXBvbmVudCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0ZPUk1fRklFTEQ6IEluamVjdGlvblRva2VuPE1hdEZvcm1GaWVsZD47XG4vKiogQ29udGFpbmVyIGZvciBmb3JtIGNvbnRyb2xzIHRoYXQgYXBwbGllcyBNYXRlcmlhbCBEZXNpZ24gc3R5bGluZyBhbmQgYmVoYXZpb3IuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRGb3JtRmllbGQgZXh0ZW5kcyBfTWF0Rm9ybUZpZWxkTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDYW5Db2xvciB7XG4gICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfZGlyO1xuICAgIHByaXZhdGUgX2RlZmF1bHRzO1xuICAgIHByaXZhdGUgX3BsYXRmb3JtO1xuICAgIHByaXZhdGUgX25nWm9uZTtcbiAgICBwcml2YXRlIF9sYWJlbE9wdGlvbnM7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgb3V0bGluZSBnYXAgbmVlZHMgdG8gYmUgY2FsY3VsYXRlZFxuICAgICAqIGltbWVkaWF0ZWx5IG9uIHRoZSBuZXh0IGNoYW5nZSBkZXRlY3Rpb24gcnVuLlxuICAgICAqL1xuICAgIHByaXZhdGUgX291dGxpbmVHYXBDYWxjdWxhdGlvbk5lZWRlZEltbWVkaWF0ZWx5O1xuICAgIC8qKiBXaGV0aGVyIHRoZSBvdXRsaW5lIGdhcCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIG5leHQgdGltZSB0aGUgem9uZSBoYXMgc3RhYmlsaXplZC4gKi9cbiAgICBwcml2YXRlIF9vdXRsaW5lR2FwQ2FsY3VsYXRpb25OZWVkZWRPblN0YWJsZTtcbiAgICBwcml2YXRlIF9kZXN0cm95ZWQ7XG4gICAgLyoqIFRoZSBmb3JtLWZpZWxkIGFwcGVhcmFuY2Ugc3R5bGUuICovXG4gICAgZ2V0IGFwcGVhcmFuY2UoKTogTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZTtcbiAgICBzZXQgYXBwZWFyYW5jZSh2YWx1ZTogTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZSk7XG4gICAgX2FwcGVhcmFuY2U6IE1hdEZvcm1GaWVsZEFwcGVhcmFuY2U7XG4gICAgLyoqIFdoZXRoZXIgdGhlIHJlcXVpcmVkIG1hcmtlciBzaG91bGQgYmUgaGlkZGVuLiAqL1xuICAgIGdldCBoaWRlUmVxdWlyZWRNYXJrZXIoKTogYm9vbGVhbjtcbiAgICBzZXQgaGlkZVJlcXVpcmVkTWFya2VyKHZhbHVlOiBib29sZWFuKTtcbiAgICBwcml2YXRlIF9oaWRlUmVxdWlyZWRNYXJrZXI7XG4gICAgLyoqIE92ZXJyaWRlIGZvciB0aGUgbG9naWMgdGhhdCBkaXNhYmxlcyB0aGUgbGFiZWwgYW5pbWF0aW9uIGluIGNlcnRhaW4gY2FzZXMuICovXG4gICAgcHJpdmF0ZSBfc2hvd0Fsd2F5c0FuaW1hdGU7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGZsb2F0aW5nIGxhYmVsIHNob3VsZCBhbHdheXMgZmxvYXQgb3Igbm90LiAqL1xuICAgIGdldCBfc2hvdWxkQWx3YXlzRmxvYXQoKTogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgbGFiZWwgY2FuIGZsb2F0IG9yIG5vdC4gKi9cbiAgICBnZXQgX2NhbkxhYmVsRmxvYXQoKTogYm9vbGVhbjtcbiAgICAvKiogU3RhdGUgb2YgdGhlIG1hdC1oaW50IGFuZCBtYXQtZXJyb3IgYW5pbWF0aW9ucy4gKi9cbiAgICBfc3Vic2NyaXB0QW5pbWF0aW9uU3RhdGU6IHN0cmluZztcbiAgICAvKiogVGV4dCBmb3IgdGhlIGZvcm0gZmllbGQgaGludC4gKi9cbiAgICBnZXQgaGludExhYmVsKCk6IHN0cmluZztcbiAgICBzZXQgaGludExhYmVsKHZhbHVlOiBzdHJpbmcpO1xuICAgIHByaXZhdGUgX2hpbnRMYWJlbDtcbiAgICBfaGludExhYmVsSWQ6IHN0cmluZztcbiAgICBfbGFiZWxJZDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhbHdheXMgZmxvYXQsIG5ldmVyIGZsb2F0IG9yIGZsb2F0IGFzIHRoZSB1c2VyIHR5cGVzLlxuICAgICAqXG4gICAgICogTm90ZTogb25seSB0aGUgbGVnYWN5IGFwcGVhcmFuY2Ugc3VwcG9ydHMgdGhlIGBuZXZlcmAgb3B0aW9uLiBgbmV2ZXJgIHdhcyBvcmlnaW5hbGx5IGFkZGVkIGFzIGFcbiAgICAgKiB3YXkgdG8gbWFrZSB0aGUgZmxvYXRpbmcgbGFiZWwgZW11bGF0ZSB0aGUgYmVoYXZpb3Igb2YgYSBzdGFuZGFyZCBpbnB1dCBwbGFjZWhvbGRlci4gSG93ZXZlclxuICAgICAqIHRoZSBmb3JtIGZpZWxkIG5vdyBzdXBwb3J0cyBib3RoIGZsb2F0aW5nIGxhYmVscyBhbmQgcGxhY2Vob2xkZXJzLiBUaGVyZWZvcmUgaW4gdGhlIG5vbi1sZWdhY3lcbiAgICAgKiBhcHBlYXJhbmNlcyB0aGUgYG5ldmVyYCBvcHRpb24gaGFzIGJlZW4gZGlzYWJsZWQgaW4gZmF2b3Igb2YganVzdCB1c2luZyB0aGUgcGxhY2Vob2xkZXIuXG4gICAgICovXG4gICAgZ2V0IGZsb2F0TGFiZWwoKTogRmxvYXRMYWJlbFR5cGU7XG4gICAgc2V0IGZsb2F0TGFiZWwodmFsdWU6IEZsb2F0TGFiZWxUeXBlKTtcbiAgICBwcml2YXRlIF9mbG9hdExhYmVsO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBBbmd1bGFyIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQuICovXG4gICAgX2FuaW1hdGlvbnNFbmFibGVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuICAgICAqL1xuICAgIHVuZGVybGluZVJlZjogRWxlbWVudFJlZjtcbiAgICBfY29ubmVjdGlvbkNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcbiAgICBfaW5wdXRDb250YWluZXJSZWY6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfbGFiZWw7XG4gICAgX2NvbnRyb2xOb25TdGF0aWM6IE1hdEZvcm1GaWVsZENvbnRyb2w8YW55PjtcbiAgICBfY29udHJvbFN0YXRpYzogTWF0Rm9ybUZpZWxkQ29udHJvbDxhbnk+O1xuICAgIGdldCBfY29udHJvbCgpOiBNYXRGb3JtRmllbGRDb250cm9sPGFueT47XG4gICAgc2V0IF9jb250cm9sKHZhbHVlOiBNYXRGb3JtRmllbGRDb250cm9sPGFueT4pO1xuICAgIHByaXZhdGUgX2V4cGxpY2l0Rm9ybUZpZWxkQ29udHJvbDtcbiAgICBfbGFiZWxDaGlsZE5vblN0YXRpYzogTWF0TGFiZWw7XG4gICAgX2xhYmVsQ2hpbGRTdGF0aWM6IE1hdExhYmVsO1xuICAgIGdldCBfbGFiZWxDaGlsZCgpOiBNYXRMYWJlbDtcbiAgICBfcGxhY2Vob2xkZXJDaGlsZDogTWF0UGxhY2Vob2xkZXI7XG4gICAgX2Vycm9yQ2hpbGRyZW46IFF1ZXJ5TGlzdDxNYXRFcnJvcj47XG4gICAgX2hpbnRDaGlsZHJlbjogUXVlcnlMaXN0PE1hdEhpbnQ+O1xuICAgIF9wcmVmaXhDaGlsZHJlbjogUXVlcnlMaXN0PE1hdFByZWZpeD47XG4gICAgX3N1ZmZpeENoaWxkcmVuOiBRdWVyeUxpc3Q8TWF0U3VmZml4PjtcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgbGFiZWxPcHRpb25zOiBMYWJlbE9wdGlvbnMsIF9kaXI6IERpcmVjdGlvbmFsaXR5LCBfZGVmYXVsdHM6IE1hdEZvcm1GaWVsZERlZmF1bHRPcHRpb25zLCBfcGxhdGZvcm06IFBsYXRmb3JtLCBfbmdab25lOiBOZ1pvbmUsIF9hbmltYXRpb25Nb2RlOiBzdHJpbmcpO1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gRWxlbWVudFJlZiBmb3IgdGhlIGVsZW1lbnQgdGhhdCBhIG92ZXJsYXkgYXR0YWNoZWQgdG8gdGhlIGZvcm0tZmllbGQgc2hvdWxkIGJlXG4gICAgICogcG9zaXRpb25lZCByZWxhdGl2ZSB0by5cbiAgICAgKi9cbiAgICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWY7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQ7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY2xhc3MgZnJvbSB0aGUgTmdDb250cm9sIHNob3VsZCBiZSBmb3J3YXJkZWQgdG8gdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBfc2hvdWxkRm9yd2FyZChwcm9wOiBrZXlvZiBOZ0NvbnRyb2wpOiBib29sZWFuO1xuICAgIF9oYXNQbGFjZWhvbGRlcigpOiBib29sZWFuO1xuICAgIF9oYXNMYWJlbCgpOiBib29sZWFuO1xuICAgIF9zaG91bGRMYWJlbEZsb2F0KCk6IGJvb2xlYW47XG4gICAgX2hpZGVDb250cm9sUGxhY2Vob2xkZXIoKTogYm9vbGVhbjtcbiAgICBfaGFzRmxvYXRpbmdMYWJlbCgpOiBib29sZWFuO1xuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gZGlzcGxheSBoaW50cyBvciBlcnJvcnMuICovXG4gICAgX2dldERpc3BsYXllZE1lc3NhZ2VzKCk6ICdlcnJvcicgfCAnaGludCc7XG4gICAgLyoqIEFuaW1hdGVzIHRoZSBwbGFjZWhvbGRlciB1cCBhbmQgbG9ja3MgaXQgaW4gcG9zaXRpb24uICovXG4gICAgX2FuaW1hdGVBbmRMb2NrTGFiZWwoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBFbnN1cmUgdGhhdCB0aGVyZSBpcyBvbmx5IG9uZSBwbGFjZWhvbGRlciAoZWl0aGVyIGBwbGFjZWhvbGRlcmAgYXR0cmlidXRlIG9uIHRoZSBjaGlsZCBjb250cm9sXG4gICAgICogb3IgY2hpbGQgZWxlbWVudCB3aXRoIHRoZSBgbWF0LXBsYWNlaG9sZGVyYCBkaXJlY3RpdmUpLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3ZhbGlkYXRlUGxhY2Vob2xkZXJzO1xuICAgIC8qKiBEb2VzIGFueSBleHRyYSBwcm9jZXNzaW5nIHRoYXQgaXMgcmVxdWlyZWQgd2hlbiBoYW5kbGluZyB0aGUgaGludHMuICovXG4gICAgcHJpdmF0ZSBfcHJvY2Vzc0hpbnRzO1xuICAgIC8qKlxuICAgICAqIEVuc3VyZSB0aGF0IHRoZXJlIGlzIGEgbWF4aW11bSBvZiBvbmUgb2YgZWFjaCBgPG1hdC1oaW50PmAgYWxpZ25tZW50IHNwZWNpZmllZCwgd2l0aCB0aGVcbiAgICAgKiBhdHRyaWJ1dGUgYmVpbmcgY29uc2lkZXJlZCBhcyBgYWxpZ249XCJzdGFydFwiYC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF92YWxpZGF0ZUhpbnRzO1xuICAgIC8qKiBHZXRzIHRoZSBkZWZhdWx0IGZsb2F0IGxhYmVsIHN0YXRlLiAqL1xuICAgIHByaXZhdGUgX2dldERlZmF1bHRGbG9hdExhYmVsU3RhdGU7XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbGlzdCBvZiBlbGVtZW50IElEcyB0aGF0IGRlc2NyaWJlIHRoZSBjaGlsZCBjb250cm9sLiBUaGlzIGFsbG93cyB0aGUgY29udHJvbCB0byB1cGRhdGVcbiAgICAgKiBpdHMgYGFyaWEtZGVzY3JpYmVkYnlgIGF0dHJpYnV0ZSBhY2NvcmRpbmdseS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9zeW5jRGVzY3JpYmVkQnlJZHM7XG4gICAgLyoqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgZm9ybSBmaWVsZCdzIGNvbnRyb2wgaXMgbWlzc2luZy4gKi9cbiAgICBwcm90ZWN0ZWQgX3ZhbGlkYXRlQ29udHJvbENoaWxkKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgd2lkdGggYW5kIHBvc2l0aW9uIG9mIHRoZSBnYXAgaW4gdGhlIG91dGxpbmUuIE9ubHkgcmVsZXZhbnQgZm9yIHRoZSBvdXRsaW5lXG4gICAgICogYXBwZWFyYW5jZS5cbiAgICAgKi9cbiAgICB1cGRhdGVPdXRsaW5lR2FwKCk6IHZvaWQ7XG4gICAgLyoqIEdldHMgdGhlIHN0YXJ0IGVuZCBvZiB0aGUgcmVjdCBjb25zaWRlcmluZyB0aGUgY3VycmVudCBkaXJlY3Rpb25hbGl0eS4gKi9cbiAgICBwcml2YXRlIF9nZXRTdGFydEVuZDtcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGZvcm0gZmllbGQgaXMgYXR0YWNoZWQgdG8gdGhlIERPTS4gKi9cbiAgICBwcml2YXRlIF9pc0F0dGFjaGVkVG9ET007XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZGVSZXF1aXJlZE1hcmtlcjogQm9vbGVhbklucHV0O1xufVxuZXhwb3J0IHt9O1xuIl19