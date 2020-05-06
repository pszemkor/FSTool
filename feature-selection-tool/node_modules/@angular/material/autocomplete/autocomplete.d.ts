/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, QueryList, TemplateRef, OnDestroy } from '@angular/core';
import { CanDisableRipple, CanDisableRippleCtor, MatOptgroup, MatOption } from '@angular/material/core';
/** Event object that is emitted when an autocomplete option is selected. */
import * as ɵngcc0 from '@angular/core';
export declare class MatAutocompleteSelectedEvent {
    /** Reference to the autocomplete panel that emitted the event. */
    source: MatAutocomplete;
    /** Option that was selected. */
    option: MatOption;
    constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    source: MatAutocomplete, 
    /** Option that was selected. */
    option: MatOption);
}
/** Event object that is emitted when an autocomplete option is activated. */
export interface MatAutocompleteActivatedEvent {
    /** Reference to the autocomplete panel that emitted the event. */
    source: MatAutocomplete;
    /** Option that was selected. */
    option: MatOption | null;
}
/** @docs-private */
declare class MatAutocompleteBase {
}
declare const _MatAutocompleteMixinBase: CanDisableRippleCtor & typeof MatAutocompleteBase;
/** Default `mat-autocomplete` options that can be overridden. */
export interface MatAutocompleteDefaultOptions {
    /** Whether the first option should be highlighted when an autocomplete panel is opened. */
    autoActiveFirstOption?: boolean;
}
/** Injection token to be used to override the default options for `mat-autocomplete`. */
export declare const MAT_AUTOCOMPLETE_DEFAULT_OPTIONS: InjectionToken<MatAutocompleteDefaultOptions>;
/** @docs-private */
export declare function MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY(): MatAutocompleteDefaultOptions;
export declare class MatAutocomplete extends _MatAutocompleteMixinBase implements AfterContentInit, CanDisableRipple, OnDestroy {
    private _changeDetectorRef;
    private _elementRef;
    private _activeOptionChanges;
    /** Manages active item in option list based on key events. */
    _keyManager: ActiveDescendantKeyManager<MatOption>;
    /** Whether the autocomplete panel should be visible, depending on option length. */
    showPanel: boolean;
    /** Whether the autocomplete panel is open. */
    get isOpen(): boolean;
    _isOpen: boolean;
    /** @docs-private */
    template: TemplateRef<any>;
    /** Element for the panel containing the autocomplete options. */
    panel: ElementRef;
    /** @docs-private */
    options: QueryList<MatOption>;
    /** @docs-private */
    optionGroups: QueryList<MatOptgroup>;
    /** Function that maps an option's control value to its display value in the trigger. */
    displayWith: ((value: any) => string) | null;
    /**
     * Whether the first option should be highlighted when the autocomplete panel is opened.
     * Can be configured globally through the `MAT_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
     */
    get autoActiveFirstOption(): boolean;
    set autoActiveFirstOption(value: boolean);
    private _autoActiveFirstOption;
    /**
     * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
     * match the width of its host.
     */
    panelWidth: string | number;
    /** Event that is emitted whenever an option from the list is selected. */
    readonly optionSelected: EventEmitter<MatAutocompleteSelectedEvent>;
    /** Event that is emitted when the autocomplete panel is opened. */
    readonly opened: EventEmitter<void>;
    /** Event that is emitted when the autocomplete panel is closed. */
    readonly closed: EventEmitter<void>;
    /** Emits whenever an option is activated using the keyboard. */
    readonly optionActivated: EventEmitter<MatAutocompleteActivatedEvent>;
    /**
     * Takes classes set on the host mat-autocomplete element and applies them to the panel
     * inside the overlay container to allow for easy styling.
     */
    set classList(value: string);
    _classList: {
        [key: string]: boolean;
    };
    /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
    id: string;
    constructor(_changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef<HTMLElement>, defaults: MatAutocompleteDefaultOptions);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     */
    _setScrollTop(scrollTop: number): void;
    /** Returns the panel's scrollTop. */
    _getScrollTop(): number;
    /** Panel should hide itself when the option list is empty. */
    _setVisibility(): void;
    /** Emits the `select` event. */
    _emitSelectEvent(option: MatOption): void;
    /** Sets the autocomplete visibility classes on a classlist based on the panel is visible. */
    private _setVisibilityClasses;
    static ngAcceptInputType_autoActiveFirstOption: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatAutocomplete, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatAutocomplete, "mat-autocomplete", ["matAutocomplete"], { "disableRipple": "disableRipple"; "displayWith": "displayWith"; "autoActiveFirstOption": "autoActiveFirstOption"; "classList": "class"; "panelWidth": "panelWidth"; }, { "optionSelected": "optionSelected"; "opened": "opened"; "closed": "closed"; "optionActivated": "optionActivated"; }, ["options", "optionGroups"], ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmQudHMiLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0aW9uVG9rZW4sIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZVJpcHBsZSwgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsIE1hdE9wdGdyb3VwLCBNYXRPcHRpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbi8qKiBFdmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gYW4gYXV0b2NvbXBsZXRlIG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQge1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHNvdXJjZTogTWF0QXV0b2NvbXBsZXRlO1xuICAgIC8qKiBPcHRpb24gdGhhdCB3YXMgc2VsZWN0ZWQuICovXG4gICAgb3B0aW9uOiBNYXRPcHRpb247XG4gICAgY29uc3RydWN0b3IoXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgc291cmNlOiBNYXRBdXRvY29tcGxldGUsIFxuICAgIC8qKiBPcHRpb24gdGhhdCB3YXMgc2VsZWN0ZWQuICovXG4gICAgb3B0aW9uOiBNYXRPcHRpb24pO1xufVxuLyoqIEV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiBhbiBhdXRvY29tcGxldGUgb3B0aW9uIGlzIGFjdGl2YXRlZC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0QXV0b2NvbXBsZXRlQWN0aXZhdGVkRXZlbnQge1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHNvdXJjZTogTWF0QXV0b2NvbXBsZXRlO1xuICAgIC8qKiBPcHRpb24gdGhhdCB3YXMgc2VsZWN0ZWQuICovXG4gICAgb3B0aW9uOiBNYXRPcHRpb24gfCBudWxsO1xufVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0QXV0b2NvbXBsZXRlQmFzZSB7XG59XG5kZWNsYXJlIGNvbnN0IF9NYXRBdXRvY29tcGxldGVNaXhpbkJhc2U6IENhbkRpc2FibGVSaXBwbGVDdG9yICYgdHlwZW9mIE1hdEF1dG9jb21wbGV0ZUJhc2U7XG4vKiogRGVmYXVsdCBgbWF0LWF1dG9jb21wbGV0ZWAgb3B0aW9ucyB0aGF0IGNhbiBiZSBvdmVycmlkZGVuLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRBdXRvY29tcGxldGVEZWZhdWx0T3B0aW9ucyB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGZpcnN0IG9wdGlvbiBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgd2hlbiBhbiBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLiAqL1xuICAgIGF1dG9BY3RpdmVGaXJzdE9wdGlvbj86IGJvb2xlYW47XG59XG4vKiogSW5qZWN0aW9uIHRva2VuIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgYG1hdC1hdXRvY29tcGxldGVgLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlM6IEluamVjdGlvblRva2VuPE1hdEF1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zPjtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBNQVRfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1hdEF1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0QXV0b2NvbXBsZXRlIGV4dGVuZHMgX01hdEF1dG9jb21wbGV0ZU1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENhbkRpc2FibGVSaXBwbGUsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjtcbiAgICBwcml2YXRlIF9hY3RpdmVPcHRpb25DaGFuZ2VzO1xuICAgIC8qKiBNYW5hZ2VzIGFjdGl2ZSBpdGVtIGluIG9wdGlvbiBsaXN0IGJhc2VkIG9uIGtleSBldmVudHMuICovXG4gICAgX2tleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1hdE9wdGlvbj47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBzaG91bGQgYmUgdmlzaWJsZSwgZGVwZW5kaW5nIG9uIG9wdGlvbiBsZW5ndGguICovXG4gICAgc2hvd1BhbmVsOiBib29sZWFuO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3Blbi4gKi9cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW47XG4gICAgX2lzT3BlbjogYm9vbGVhbjtcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gICAgcGFuZWw6IEVsZW1lbnRSZWY7XG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBvcHRpb25zOiBRdWVyeUxpc3Q8TWF0T3B0aW9uPjtcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1hdE9wdGdyb3VwPjtcbiAgICAvKiogRnVuY3Rpb24gdGhhdCBtYXBzIGFuIG9wdGlvbidzIGNvbnRyb2wgdmFsdWUgdG8gaXRzIGRpc3BsYXkgdmFsdWUgaW4gdGhlIHRyaWdnZXIuICovXG4gICAgZGlzcGxheVdpdGg6ICgodmFsdWU6IGFueSkgPT4gc3RyaW5nKSB8IG51bGw7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZmlyc3Qgb3B0aW9uIHNob3VsZCBiZSBoaWdobGlnaHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLlxuICAgICAqIENhbiBiZSBjb25maWd1cmVkIGdsb2JhbGx5IHRocm91Z2ggdGhlIGBNQVRfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OU2AgdG9rZW4uXG4gICAgICovXG4gICAgZ2V0IGF1dG9BY3RpdmVGaXJzdE9wdGlvbigpOiBib29sZWFuO1xuICAgIHNldCBhdXRvQWN0aXZlRmlyc3RPcHRpb24odmFsdWU6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2F1dG9BY3RpdmVGaXJzdE9wdGlvbjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSB3aWR0aCBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLiAgQ2FuIGJlIGFueSBDU1Mgc2l6aW5nIHZhbHVlLCBvdGhlcndpc2UgaXQgd2lsbFxuICAgICAqIG1hdGNoIHRoZSB3aWR0aCBvZiBpdHMgaG9zdC5cbiAgICAgKi9cbiAgICBwYW5lbFdpZHRoOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBvcHRpb24gZnJvbSB0aGUgbGlzdCBpcyBzZWxlY3RlZC4gKi9cbiAgICByZWFkb25seSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQ+O1xuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW5lZC4gKi9cbiAgICByZWFkb25seSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBjbG9zZWQuICovXG4gICAgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIGFuIG9wdGlvbiBpcyBhY3RpdmF0ZWQgdXNpbmcgdGhlIGtleWJvYXJkLiAqL1xuICAgIHJlYWRvbmx5IG9wdGlvbkFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPE1hdEF1dG9jb21wbGV0ZUFjdGl2YXRlZEV2ZW50PjtcbiAgICAvKipcbiAgICAgKiBUYWtlcyBjbGFzc2VzIHNldCBvbiB0aGUgaG9zdCBtYXQtYXV0b2NvbXBsZXRlIGVsZW1lbnQgYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgcGFuZWxcbiAgICAgKiBpbnNpZGUgdGhlIG92ZXJsYXkgY29udGFpbmVyIHRvIGFsbG93IGZvciBlYXN5IHN0eWxpbmcuXG4gICAgICovXG4gICAgc2V0IGNsYXNzTGlzdCh2YWx1ZTogc3RyaW5nKTtcbiAgICBfY2xhc3NMaXN0OiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW47XG4gICAgfTtcbiAgICAvKiogVW5pcXVlIElEIHRvIGJlIHVzZWQgYnkgYXV0b2NvbXBsZXRlIHRyaWdnZXIncyBcImFyaWEtb3duc1wiIHByb3BlcnR5LiAqL1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IoX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBkZWZhdWx0czogTWF0QXV0b2NvbXBsZXRlRGVmYXVsdE9wdGlvbnMpO1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcGFuZWwgc2Nyb2xsVG9wLiBUaGlzIGFsbG93cyB1cyB0byBtYW51YWxseSBzY3JvbGwgdG8gZGlzcGxheSBvcHRpb25zXG4gICAgICogYWJvdmUgb3IgYmVsb3cgdGhlIGZvbGQsIGFzIHRoZXkgYXJlIG5vdCBhY3R1YWxseSBiZWluZyBmb2N1c2VkIHdoZW4gYWN0aXZlLlxuICAgICAqL1xuICAgIF9zZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIpOiB2b2lkO1xuICAgIC8qKiBSZXR1cm5zIHRoZSBwYW5lbCdzIHNjcm9sbFRvcC4gKi9cbiAgICBfZ2V0U2Nyb2xsVG9wKCk6IG51bWJlcjtcbiAgICAvKiogUGFuZWwgc2hvdWxkIGhpZGUgaXRzZWxmIHdoZW4gdGhlIG9wdGlvbiBsaXN0IGlzIGVtcHR5LiAqL1xuICAgIF9zZXRWaXNpYmlsaXR5KCk6IHZvaWQ7XG4gICAgLyoqIEVtaXRzIHRoZSBgc2VsZWN0YCBldmVudC4gKi9cbiAgICBfZW1pdFNlbGVjdEV2ZW50KG9wdGlvbjogTWF0T3B0aW9uKTogdm9pZDtcbiAgICAvKiogU2V0cyB0aGUgYXV0b2NvbXBsZXRlIHZpc2liaWxpdHkgY2xhc3NlcyBvbiBhIGNsYXNzbGlzdCBiYXNlZCBvbiB0aGUgcGFuZWwgaXMgdmlzaWJsZS4gKi9cbiAgICBwcml2YXRlIF9zZXRWaXNpYmlsaXR5Q2xhc3NlcztcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0FjdGl2ZUZpcnN0T3B0aW9uOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==