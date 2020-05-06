/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectorRef, ElementRef, InjectionToken, NgZone, OnDestroy, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { MatAutocomplete } from './autocomplete';
import { MatAutocompleteOrigin } from './autocomplete-origin';
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the scrollTop of the panel. Because we are not
 * actually focusing the active item, scroll must be handled manually.
 */
/** The height of each autocomplete option. */
import * as ɵngcc0 from '@angular/core';
export declare const AUTOCOMPLETE_OPTION_HEIGHT = 48;
/** The total height of the autocomplete panel. */
export declare const AUTOCOMPLETE_PANEL_HEIGHT = 256;
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export declare const MAT_AUTOCOMPLETE_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY;
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export declare const MAT_AUTOCOMPLETE_VALUE_ACCESSOR: any;
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * @docs-private
 */
export declare function getMatAutocompleteMissingPanelError(): Error;
export declare class MatAutocompleteTrigger implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
    private _element;
    private _overlay;
    private _viewContainerRef;
    private _zone;
    private _changeDetectorRef;
    private _dir;
    private _formField;
    private _document;
    private _viewportRuler?;
    private _overlayRef;
    private _portal;
    private _componentDestroyed;
    private _autocompleteDisabled;
    private _scrollStrategy;
    /** Old value of the native input. Used to work around issues with the `input` event on IE. */
    private _previousValue;
    /** Strategy that is used to position the panel. */
    private _positionStrategy;
    /** Whether or not the label state is being overridden. */
    private _manuallyFloatingLabel;
    /** The subscription for closing actions (some are bound to document). */
    private _closingActionsSubscription;
    /** Subscription to viewport size changes. */
    private _viewportSubscription;
    /**
     * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
     * closed autocomplete from being reopened if the user switches to another browser tab and then
     * comes back.
     */
    private _canOpenOnNextFocus;
    /** Whether the element is inside of a ShadowRoot component. */
    private _isInsideShadowRoot;
    /** Stream of keyboard events that can close the panel. */
    private readonly _closeKeyEventStream;
    /**
     * Event handler for when the window is blurred. Needs to be an
     * arrow function in order to preserve the context.
     */
    private _windowBlurHandler;
    /** `View -> model callback called when value changes` */
    _onChange: (value: any) => void;
    /** `View -> model callback called when autocomplete has been touched` */
    _onTouched: () => void;
    /** The autocomplete panel to be attached to this trigger. */
    autocomplete: MatAutocomplete;
    /**
     * Position of the autocomplete panel relative to the trigger element. A position of `auto`
     * will render the panel underneath the trigger if there is enough space for it to fit in
     * the viewport, otherwise the panel will be shown above it. If the position is set to
     * `above` or `below`, the panel will always be shown above or below the trigger. no matter
     * whether it fits completely in the viewport.
     */
    position: 'auto' | 'above' | 'below';
    /**
     * Reference relative to which to position the autocomplete panel.
     * Defaults to the autocomplete trigger element.
     */
    connectedTo: MatAutocompleteOrigin;
    /**
     * `autocomplete` attribute to be set on the input element.
     * @docs-private
     */
    autocompleteAttribute: string;
    /**
     * Whether the autocomplete is disabled. When disabled, the element will
     * act as a regular input and the user won't be able to open the panel.
     */
    get autocompleteDisabled(): boolean;
    set autocompleteDisabled(value: boolean);
    constructor(_element: ElementRef<HTMLInputElement>, _overlay: Overlay, _viewContainerRef: ViewContainerRef, _zone: NgZone, _changeDetectorRef: ChangeDetectorRef, scrollStrategy: any, _dir: Directionality, _formField: MatFormField, _document: any, _viewportRuler?: ViewportRuler | undefined);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Whether or not the autocomplete panel is open. */
    get panelOpen(): boolean;
    private _overlayAttached;
    /** Opens the autocomplete suggestion panel. */
    openPanel(): void;
    /** Closes the autocomplete suggestion panel. */
    closePanel(): void;
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     */
    updatePosition(): void;
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<MatOptionSelectionChange | null>;
    /** Stream of autocomplete option selections. */
    readonly optionSelections: Observable<MatOptionSelectionChange>;
    /** The currently active option, coerced to MatOption type. */
    get activeOption(): MatOption | null;
    /** Stream of clicks outside of the autocomplete panel. */
    private _getOutsideClickStream;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    _handleFocus(): void;
    /**
     * In "auto" mode, the label will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the label until the panel can be closed.
     * @param shouldAnimate Whether the label should be animated when it is floated.
     */
    private _floatLabel;
    /** If the label has been manually elevated, return it to its normal state. */
    private _resetLabel;
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
    private _scrollToOption;
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    private _subscribeToClosingActions;
    /** Destroys the autocomplete suggestion panel. */
    private _destroyPanel;
    private _setTriggerValue;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    private _setValueAndClose;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    private _clearPreviousSelectedOption;
    private _attachOverlay;
    private _getOverlayConfig;
    private _getOverlayPosition;
    /** Sets the positions on a position strategy based on the directive's input state. */
    private _setStrategyPositions;
    private _getConnectedElement;
    private _getPanelWidth;
    /** Returns the width of the input element, so the panel width can match it. */
    private _getHostWidth;
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    private _resetActiveItem;
    /** Determines whether the panel can be opened. */
    private _canOpen;
    /** Use defaultView of injected document if available or fallback to global window reference */
    private _getWindow;
    static ngAcceptInputType_autocompleteDisabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatAutocompleteTrigger, [null, null, null, null, null, null, { optional: true; }, { optional: true; host: true; }, { optional: true; }, null]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatAutocompleteTrigger, "input[matAutocomplete], textarea[matAutocomplete]", ["matAutocompleteTrigger"], { "position": "matAutocompletePosition"; "autocompleteAttribute": "autocomplete"; "autocompleteDisabled": "matAutocompleteDisabled"; "autocomplete": "matAutocomplete"; "connectedTo": "matAutocompleteConnectedTo"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZC50cyIsInNvdXJjZXMiOlsiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgT3ZlcmxheSwgU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgRWxlbWVudFJlZiwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25EZXN0cm95LCBWaWV3Q29udGFpbmVyUmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0T3B0aW9uLCBNYXRPcHRpb25TZWxlY3Rpb25DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlIH0gZnJvbSAnLi9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlT3JpZ2luIH0gZnJvbSAnLi9hdXRvY29tcGxldGUtb3JpZ2luJztcbi8qKlxuICogVGhlIGZvbGxvd2luZyBzdHlsZSBjb25zdGFudHMgYXJlIG5lY2Vzc2FyeSB0byBzYXZlIGhlcmUgaW4gb3JkZXJcbiAqIHRvIHByb3Blcmx5IGNhbGN1bGF0ZSB0aGUgc2Nyb2xsVG9wIG9mIHRoZSBwYW5lbC4gQmVjYXVzZSB3ZSBhcmUgbm90XG4gKiBhY3R1YWxseSBmb2N1c2luZyB0aGUgYWN0aXZlIGl0ZW0sIHNjcm9sbCBtdXN0IGJlIGhhbmRsZWQgbWFudWFsbHkuXG4gKi9cbi8qKiBUaGUgaGVpZ2h0IG9mIGVhY2ggYXV0b2NvbXBsZXRlIG9wdGlvbi4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IEFVVE9DT01QTEVURV9PUFRJT05fSEVJR0hUID0gNDg7XG4vKiogVGhlIHRvdGFsIGhlaWdodCBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgQVVUT0NPTVBMRVRFX1BBTkVMX0hFSUdIVCA9IDI1Njtcbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1k6IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5Pjtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSOiB7XG4gICAgcHJvdmlkZTogSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+O1xuICAgIGRlcHM6ICh0eXBlb2YgT3ZlcmxheSlbXTtcbiAgICB1c2VGYWN0b3J5OiB0eXBlb2YgTUFUX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWTtcbn07XG4vKipcbiAqIFByb3ZpZGVyIHRoYXQgYWxsb3dzIHRoZSBhdXRvY29tcGxldGUgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUjogYW55O1xuLyoqXG4gKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biB3aGVuIGF0dGVtcHRpbmcgdG8gdXNlIGFuIGF1dG9jb21wbGV0ZSB0cmlnZ2VyIHdpdGhvdXQgYSBwYW5lbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZ2V0TWF0QXV0b2NvbXBsZXRlTWlzc2luZ1BhbmVsRXJyb3IoKTogRXJyb3I7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9lbGVtZW50O1xuICAgIHByaXZhdGUgX292ZXJsYXk7XG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjtcbiAgICBwcml2YXRlIF96b25lO1xuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmO1xuICAgIHByaXZhdGUgX2RpcjtcbiAgICBwcml2YXRlIF9mb3JtRmllbGQ7XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ7XG4gICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcj87XG4gICAgcHJpdmF0ZSBfb3ZlcmxheVJlZjtcbiAgICBwcml2YXRlIF9wb3J0YWw7XG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RGVzdHJveWVkO1xuICAgIHByaXZhdGUgX2F1dG9jb21wbGV0ZURpc2FibGVkO1xuICAgIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5O1xuICAgIC8qKiBPbGQgdmFsdWUgb2YgdGhlIG5hdGl2ZSBpbnB1dC4gVXNlZCB0byB3b3JrIGFyb3VuZCBpc3N1ZXMgd2l0aCB0aGUgYGlucHV0YCBldmVudCBvbiBJRS4gKi9cbiAgICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlO1xuICAgIC8qKiBTdHJhdGVneSB0aGF0IGlzIHVzZWQgdG8gcG9zaXRpb24gdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgX3Bvc2l0aW9uU3RyYXRlZ3k7XG4gICAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBsYWJlbCBzdGF0ZSBpcyBiZWluZyBvdmVycmlkZGVuLiAqL1xuICAgIHByaXZhdGUgX21hbnVhbGx5RmxvYXRpbmdMYWJlbDtcbiAgICAvKiogVGhlIHN1YnNjcmlwdGlvbiBmb3IgY2xvc2luZyBhY3Rpb25zIChzb21lIGFyZSBib3VuZCB0byBkb2N1bWVudCkuICovXG4gICAgcHJpdmF0ZSBfY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb247XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB2aWV3cG9ydCBzaXplIGNoYW5nZXMuICovXG4gICAgcHJpdmF0ZSBfdmlld3BvcnRTdWJzY3JpcHRpb247XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIGNhbiBvcGVuIHRoZSBuZXh0IHRpbWUgaXQgaXMgZm9jdXNlZC4gVXNlZCB0byBwcmV2ZW50IGEgZm9jdXNlZCxcbiAgICAgKiBjbG9zZWQgYXV0b2NvbXBsZXRlIGZyb20gYmVpbmcgcmVvcGVuZWQgaWYgdGhlIHVzZXIgc3dpdGNoZXMgdG8gYW5vdGhlciBicm93c2VyIHRhYiBhbmQgdGhlblxuICAgICAqIGNvbWVzIGJhY2suXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY2FuT3Blbk9uTmV4dEZvY3VzO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIGluc2lkZSBvZiBhIFNoYWRvd1Jvb3QgY29tcG9uZW50LiAqL1xuICAgIHByaXZhdGUgX2lzSW5zaWRlU2hhZG93Um9vdDtcbiAgICAvKiogU3RyZWFtIG9mIGtleWJvYXJkIGV2ZW50cyB0aGF0IGNhbiBjbG9zZSB0aGUgcGFuZWwuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2xvc2VLZXlFdmVudFN0cmVhbTtcbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciB3aGVuIHRoZSB3aW5kb3cgaXMgYmx1cnJlZC4gTmVlZHMgdG8gYmUgYW5cbiAgICAgKiBhcnJvdyBmdW5jdGlvbiBpbiBvcmRlciB0byBwcmVzZXJ2ZSB0aGUgY29udGV4dC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF93aW5kb3dCbHVySGFuZGxlcjtcbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICBfb25Ub3VjaGVkOiAoKSA9PiB2b2lkO1xuICAgIC8qKiBUaGUgYXV0b2NvbXBsZXRlIHBhbmVsIHRvIGJlIGF0dGFjaGVkIHRvIHRoaXMgdHJpZ2dlci4gKi9cbiAgICBhdXRvY29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZTtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIHJlbGF0aXZlIHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnQuIEEgcG9zaXRpb24gb2YgYGF1dG9gXG4gICAgICogd2lsbCByZW5kZXIgdGhlIHBhbmVsIHVuZGVybmVhdGggdGhlIHRyaWdnZXIgaWYgdGhlcmUgaXMgZW5vdWdoIHNwYWNlIGZvciBpdCB0byBmaXQgaW5cbiAgICAgKiB0aGUgdmlld3BvcnQsIG90aGVyd2lzZSB0aGUgcGFuZWwgd2lsbCBiZSBzaG93biBhYm92ZSBpdC4gSWYgdGhlIHBvc2l0aW9uIGlzIHNldCB0b1xuICAgICAqIGBhYm92ZWAgb3IgYGJlbG93YCwgdGhlIHBhbmVsIHdpbGwgYWx3YXlzIGJlIHNob3duIGFib3ZlIG9yIGJlbG93IHRoZSB0cmlnZ2VyLiBubyBtYXR0ZXJcbiAgICAgKiB3aGV0aGVyIGl0IGZpdHMgY29tcGxldGVseSBpbiB0aGUgdmlld3BvcnQuXG4gICAgICovXG4gICAgcG9zaXRpb246ICdhdXRvJyB8ICdhYm92ZScgfCAnYmVsb3cnO1xuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSByZWxhdGl2ZSB0byB3aGljaCB0byBwb3NpdGlvbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLlxuICAgICAqIERlZmF1bHRzIHRvIHRoZSBhdXRvY29tcGxldGUgdHJpZ2dlciBlbGVtZW50LlxuICAgICAqL1xuICAgIGNvbm5lY3RlZFRvOiBNYXRBdXRvY29tcGxldGVPcmlnaW47XG4gICAgLyoqXG4gICAgICogYGF1dG9jb21wbGV0ZWAgYXR0cmlidXRlIHRvIGJlIHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgYXV0b2NvbXBsZXRlQXR0cmlidXRlOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIGlzIGRpc2FibGVkLiBXaGVuIGRpc2FibGVkLCB0aGUgZWxlbWVudCB3aWxsXG4gICAgICogYWN0IGFzIGEgcmVndWxhciBpbnB1dCBhbmQgdGhlIHVzZXIgd29uJ3QgYmUgYWJsZSB0byBvcGVuIHRoZSBwYW5lbC5cbiAgICAgKi9cbiAgICBnZXQgYXV0b2NvbXBsZXRlRGlzYWJsZWQoKTogYm9vbGVhbjtcbiAgICBzZXQgYXV0b2NvbXBsZXRlRGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pO1xuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LCBfb3ZlcmxheTogT3ZlcmxheSwgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIF96b25lOiBOZ1pvbmUsIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNjcm9sbFN0cmF0ZWd5OiBhbnksIF9kaXI6IERpcmVjdGlvbmFsaXR5LCBfZm9ybUZpZWxkOiBNYXRGb3JtRmllbGQsIF9kb2N1bWVudDogYW55LCBfdmlld3BvcnRSdWxlcj86IFZpZXdwb3J0UnVsZXIgfCB1bmRlZmluZWQpO1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3Blbi4gKi9cbiAgICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfb3ZlcmxheUF0dGFjaGVkO1xuICAgIC8qKiBPcGVucyB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gcGFuZWwuICovXG4gICAgb3BlblBhbmVsKCk6IHZvaWQ7XG4gICAgLyoqIENsb3NlcyB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gcGFuZWwuICovXG4gICAgY2xvc2VQYW5lbCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbCB0byBlbnN1cmUgdGhhdCBpdCBmaXRzIGFsbCBvcHRpb25zXG4gICAgICogd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKi9cbiAgICB1cGRhdGVQb3NpdGlvbigpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEEgc3RyZWFtIG9mIGFjdGlvbnMgdGhhdCBzaG91bGQgY2xvc2UgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCwgaW5jbHVkaW5nXG4gICAgICogd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWQsIG9uIGJsdXIsIGFuZCB3aGVuIFRBQiBpcyBwcmVzc2VkLlxuICAgICAqL1xuICAgIGdldCBwYW5lbENsb3NpbmdBY3Rpb25zKCk6IE9ic2VydmFibGU8TWF0T3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHwgbnVsbD47XG4gICAgLyoqIFN0cmVhbSBvZiBhdXRvY29tcGxldGUgb3B0aW9uIHNlbGVjdGlvbnMuICovXG4gICAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uczogT2JzZXJ2YWJsZTxNYXRPcHRpb25TZWxlY3Rpb25DaGFuZ2U+O1xuICAgIC8qKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBvcHRpb24sIGNvZXJjZWQgdG8gTWF0T3B0aW9uIHR5cGUuICovXG4gICAgZ2V0IGFjdGl2ZU9wdGlvbigpOiBNYXRPcHRpb24gfCBudWxsO1xuICAgIC8qKiBTdHJlYW0gb2YgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIF9nZXRPdXRzaWRlQ2xpY2tTdHJlYW07XG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZDtcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkO1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQ7XG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZDtcbiAgICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQ7XG4gICAgX2hhbmRsZUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZDtcbiAgICBfaGFuZGxlRm9jdXMoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBJbiBcImF1dG9cIiBtb2RlLCB0aGUgbGFiZWwgd2lsbCBhbmltYXRlIGRvd24gYXMgc29vbiBhcyBmb2N1cyBpcyBsb3N0LlxuICAgICAqIFRoaXMgY2F1c2VzIHRoZSB2YWx1ZSB0byBqdW1wIHdoZW4gc2VsZWN0aW5nIGFuIG9wdGlvbiB3aXRoIHRoZSBtb3VzZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBtYW51YWxseSBmbG9hdHMgdGhlIGxhYmVsIHVudGlsIHRoZSBwYW5lbCBjYW4gYmUgY2xvc2VkLlxuICAgICAqIEBwYXJhbSBzaG91bGRBbmltYXRlIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBiZSBhbmltYXRlZCB3aGVuIGl0IGlzIGZsb2F0ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZmxvYXRMYWJlbDtcbiAgICAvKiogSWYgdGhlIGxhYmVsIGhhcyBiZWVuIG1hbnVhbGx5IGVsZXZhdGVkLCByZXR1cm4gaXQgdG8gaXRzIG5vcm1hbCBzdGF0ZS4gKi9cbiAgICBwcml2YXRlIF9yZXNldExhYmVsO1xuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoYXQgd2UgYXJlIG5vdCBhY3R1YWxseSBmb2N1c2luZyBhY3RpdmUgb3B0aW9ucywgd2UgbXVzdCBtYW51YWxseSBhZGp1c3Qgc2Nyb2xsXG4gICAgICogdG8gcmV2ZWFsIG9wdGlvbnMgYmVsb3cgdGhlIGZvbGQuIEZpcnN0LCB3ZSBmaW5kIHRoZSBvZmZzZXQgb2YgdGhlIG9wdGlvbiBmcm9tIHRoZSB0b3BcbiAgICAgKiBvZiB0aGUgcGFuZWwuIElmIHRoYXQgb2Zmc2V0IGlzIGJlbG93IHRoZSBmb2xkLCB0aGUgbmV3IHNjcm9sbFRvcCB3aWxsIGJlIHRoZSBvZmZzZXQgLVxuICAgICAqIHRoZSBwYW5lbCBoZWlnaHQgKyB0aGUgb3B0aW9uIGhlaWdodCwgc28gdGhlIGFjdGl2ZSBvcHRpb24gd2lsbCBiZSBqdXN0IHZpc2libGUgYXQgdGhlXG4gICAgICogYm90dG9tIG9mIHRoZSBwYW5lbC4gSWYgdGhhdCBvZmZzZXQgaXMgYWJvdmUgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYW5lbCwgdGhlIG5ldyBzY3JvbGxUb3BcbiAgICAgKiB3aWxsIGJlY29tZSB0aGUgb2Zmc2V0LiBJZiB0aGF0IG9mZnNldCBpcyB2aXNpYmxlIHdpdGhpbiB0aGUgcGFuZWwgYWxyZWFkeSwgdGhlIHNjcm9sbFRvcCBpc1xuICAgICAqIG5vdCBhZGp1c3RlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9zY3JvbGxUb09wdGlvbjtcbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBsaXN0ZW5zIHRvIGEgc3RyZWFtIG9mIHBhbmVsIGNsb3NpbmcgYWN0aW9ucyBhbmQgcmVzZXRzIHRoZVxuICAgICAqIHN0cmVhbSBldmVyeSB0aW1lIHRoZSBvcHRpb24gbGlzdCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3N1YnNjcmliZVRvQ2xvc2luZ0FjdGlvbnM7XG4gICAgLyoqIERlc3Ryb3lzIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbC4gKi9cbiAgICBwcml2YXRlIF9kZXN0cm95UGFuZWw7XG4gICAgcHJpdmF0ZSBfc2V0VHJpZ2dlclZhbHVlO1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAgICogc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3NldFZhbHVlQW5kQ2xvc2U7XG4gICAgLyoqXG4gICAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uO1xuICAgIHByaXZhdGUgX2F0dGFjaE92ZXJsYXk7XG4gICAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZztcbiAgICBwcml2YXRlIF9nZXRPdmVybGF5UG9zaXRpb247XG4gICAgLyoqIFNldHMgdGhlIHBvc2l0aW9ucyBvbiBhIHBvc2l0aW9uIHN0cmF0ZWd5IGJhc2VkIG9uIHRoZSBkaXJlY3RpdmUncyBpbnB1dCBzdGF0ZS4gKi9cbiAgICBwcml2YXRlIF9zZXRTdHJhdGVneVBvc2l0aW9ucztcbiAgICBwcml2YXRlIF9nZXRDb25uZWN0ZWRFbGVtZW50O1xuICAgIHByaXZhdGUgX2dldFBhbmVsV2lkdGg7XG4gICAgLyoqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBpbnB1dCBlbGVtZW50LCBzbyB0aGUgcGFuZWwgd2lkdGggY2FuIG1hdGNoIGl0LiAqL1xuICAgIHByaXZhdGUgX2dldEhvc3RXaWR0aDtcbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIC0xIHNvIGFycm93IGV2ZW50cyB3aWxsIGFjdGl2YXRlIHRoZVxuICAgICAqIGNvcnJlY3Qgb3B0aW9ucywgb3IgdG8gMCBpZiB0aGUgY29uc3VtZXIgb3B0ZWQgaW50byBpdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9yZXNldEFjdGl2ZUl0ZW07XG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciB0aGUgcGFuZWwgY2FuIGJlIG9wZW5lZC4gKi9cbiAgICBwcml2YXRlIF9jYW5PcGVuO1xuICAgIC8qKiBVc2UgZGVmYXVsdFZpZXcgb2YgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIGdsb2JhbCB3aW5kb3cgcmVmZXJlbmNlICovXG4gICAgcHJpdmF0ZSBfZ2V0V2luZG93O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hdXRvY29tcGxldGVEaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19