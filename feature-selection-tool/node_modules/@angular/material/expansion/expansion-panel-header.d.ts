/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelDefaultOptions } from './expansion-panel';
import { MatAccordionTogglePosition } from './accordion-base';
/**
 * `<mat-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<mat-expansion-panel>`.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatExpansionPanelHeader implements OnDestroy, FocusableOption {
    panel: MatExpansionPanel;
    private _element;
    private _focusMonitor;
    private _changeDetectorRef;
    private _parentChangeSubscription;
    /** Whether Angular animations in the panel header should be disabled. */
    _animationsDisabled: boolean;
    constructor(panel: MatExpansionPanel, _element: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef, defaultOptions?: MatExpansionPanelDefaultOptions);
    _animationStarted(): void;
    /** Height of the header while the panel is expanded. */
    expandedHeight: string;
    /** Height of the header while the panel is collapsed. */
    collapsedHeight: string;
    /**
     * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
     * @docs-private
     */
    get disabled(): any;
    /** Toggles the expanded state of the panel. */
    _toggle(): void;
    /** Gets whether the panel is expanded. */
    _isExpanded(): boolean;
    /** Gets the expanded state string of the panel. */
    _getExpandedState(): string;
    /** Gets the panel id. */
    _getPanelId(): string;
    /** Gets the toggle position for the header. */
    _getTogglePosition(): MatAccordionTogglePosition;
    /** Gets whether the expand indicator should be shown. */
    _showToggle(): boolean;
    /** Handle keydown event calling to toggle() if appropriate. */
    _keydown(event: KeyboardEvent): void;
    /**
     * Focuses the panel header. Implemented as a part of `FocusableOption`.
     * @param origin Origin of the action that triggered the focus.
     * @docs-private
     */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatExpansionPanelHeader, [{ host: true; }, null, null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatExpansionPanelHeader, "mat-expansion-panel-header", never, { "expandedHeight": "expandedHeight"; "collapsedHeight": "collapsedHeight"; }, {}, never, ["mat-panel-title", "mat-panel-description", "*"]>;
}
/**
 * `<mat-panel-description>`
 *
 * This directive is to be used inside of the MatExpansionPanelHeader component.
 */
export declare class MatExpansionPanelDescription {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatExpansionPanelDescription, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatExpansionPanelDescription, "mat-panel-description", never, {}, {}, never>;
}
/**
 * `<mat-panel-title>`
 *
 * This directive is to be used inside of the MatExpansionPanelHeader component.
 */
export declare class MatExpansionPanelTitle {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatExpansionPanelTitle, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatExpansionPanelTitle, "mat-panel-title", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5kLnRzIiwic291cmNlcyI6WyJleHBhbnNpb24tcGFuZWwtaGVhZGVyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNhYmxlT3B0aW9uLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvblBhbmVsLCBNYXRFeHBhbnNpb25QYW5lbERlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwnO1xuaW1wb3J0IHsgTWF0QWNjb3JkaW9uVG9nZ2xlUG9zaXRpb24gfSBmcm9tICcuL2FjY29yZGlvbi1iYXNlJztcbi8qKlxuICogYDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5gXG4gKlxuICogVGhpcyBjb21wb25lbnQgY29ycmVzcG9uZHMgdG8gdGhlIGhlYWRlciBlbGVtZW50IG9mIGFuIGA8bWF0LWV4cGFuc2lvbi1wYW5lbD5gLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRFeHBhbnNpb25QYW5lbEhlYWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgRm9jdXNhYmxlT3B0aW9uIHtcbiAgICBwYW5lbDogTWF0RXhwYW5zaW9uUGFuZWw7XG4gICAgcHJpdmF0ZSBfZWxlbWVudDtcbiAgICBwcml2YXRlIF9mb2N1c01vbml0b3I7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgcHJpdmF0ZSBfcGFyZW50Q2hhbmdlU3Vic2NyaXB0aW9uO1xuICAgIC8qKiBXaGV0aGVyIEFuZ3VsYXIgYW5pbWF0aW9ucyBpbiB0aGUgcGFuZWwgaGVhZGVyIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKHBhbmVsOiBNYXRFeHBhbnNpb25QYW5lbCwgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgZGVmYXVsdE9wdGlvbnM/OiBNYXRFeHBhbnNpb25QYW5lbERlZmF1bHRPcHRpb25zKTtcbiAgICBfYW5pbWF0aW9uU3RhcnRlZCgpOiB2b2lkO1xuICAgIC8qKiBIZWlnaHQgb2YgdGhlIGhlYWRlciB3aGlsZSB0aGUgcGFuZWwgaXMgZXhwYW5kZWQuICovXG4gICAgZXhwYW5kZWRIZWlnaHQ6IHN0cmluZztcbiAgICAvKiogSGVpZ2h0IG9mIHRoZSBoZWFkZXIgd2hpbGUgdGhlIHBhbmVsIGlzIGNvbGxhcHNlZC4gKi9cbiAgICBjb2xsYXBzZWRIZWlnaHQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBhc3NvY2lhdGVkIHBhbmVsIGlzIGRpc2FibGVkLiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgYEZvY3VzYWJsZU9wdGlvbmAuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBkaXNhYmxlZCgpOiBhbnk7XG4gICAgLyoqIFRvZ2dsZXMgdGhlIGV4cGFuZGVkIHN0YXRlIG9mIHRoZSBwYW5lbC4gKi9cbiAgICBfdG9nZ2xlKCk6IHZvaWQ7XG4gICAgLyoqIEdldHMgd2hldGhlciB0aGUgcGFuZWwgaXMgZXhwYW5kZWQuICovXG4gICAgX2lzRXhwYW5kZWQoKTogYm9vbGVhbjtcbiAgICAvKiogR2V0cyB0aGUgZXhwYW5kZWQgc3RhdGUgc3RyaW5nIG9mIHRoZSBwYW5lbC4gKi9cbiAgICBfZ2V0RXhwYW5kZWRTdGF0ZSgpOiBzdHJpbmc7XG4gICAgLyoqIEdldHMgdGhlIHBhbmVsIGlkLiAqL1xuICAgIF9nZXRQYW5lbElkKCk6IHN0cmluZztcbiAgICAvKiogR2V0cyB0aGUgdG9nZ2xlIHBvc2l0aW9uIGZvciB0aGUgaGVhZGVyLiAqL1xuICAgIF9nZXRUb2dnbGVQb3NpdGlvbigpOiBNYXRBY2NvcmRpb25Ub2dnbGVQb3NpdGlvbjtcbiAgICAvKiogR2V0cyB3aGV0aGVyIHRoZSBleHBhbmQgaW5kaWNhdG9yIHNob3VsZCBiZSBzaG93bi4gKi9cbiAgICBfc2hvd1RvZ2dsZSgpOiBib29sZWFuO1xuICAgIC8qKiBIYW5kbGUga2V5ZG93biBldmVudCBjYWxsaW5nIHRvIHRvZ2dsZSgpIGlmIGFwcHJvcHJpYXRlLiAqL1xuICAgIF9rZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBGb2N1c2VzIHRoZSBwYW5lbCBoZWFkZXIuIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBgRm9jdXNhYmxlT3B0aW9uYC5cbiAgICAgKiBAcGFyYW0gb3JpZ2luIE9yaWdpbiBvZiB0aGUgYWN0aW9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBmb2N1cy5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG59XG4vKipcbiAqIGA8bWF0LXBhbmVsLWRlc2NyaXB0aW9uPmBcbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyB0byBiZSB1c2VkIGluc2lkZSBvZiB0aGUgTWF0RXhwYW5zaW9uUGFuZWxIZWFkZXIgY29tcG9uZW50LlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRFeHBhbnNpb25QYW5lbERlc2NyaXB0aW9uIHtcbn1cbi8qKlxuICogYDxtYXQtcGFuZWwtdGl0bGU+YFxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIHRvIGJlIHVzZWQgaW5zaWRlIG9mIHRoZSBNYXRFeHBhbnNpb25QYW5lbEhlYWRlciBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEV4cGFuc2lvblBhbmVsVGl0bGUge1xufVxuIl19