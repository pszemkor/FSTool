/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentRef, EmbeddedViewRef, OnDestroy, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { BasePortalOutlet, ComponentPortal, TemplatePortal, CdkPortalOutlet, DomPortal } from '@angular/cdk/portal';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatBottomSheetConfig } from './bottom-sheet-config';
import { FocusTrapFactory } from '@angular/cdk/a11y';
/**
 * Internal component that wraps user-provided bottom sheet content.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatBottomSheetContainer extends BasePortalOutlet implements OnDestroy {
    private _elementRef;
    private _changeDetectorRef;
    private _focusTrapFactory;
    /** The bottom sheet configuration. */
    bottomSheetConfig: MatBottomSheetConfig;
    private _breakpointSubscription;
    /** The portal outlet inside of this container into which the content will be loaded. */
    _portalOutlet: CdkPortalOutlet;
    /** The state of the bottom sheet animations. */
    _animationState: 'void' | 'visible' | 'hidden';
    /** Emits whenever the state of the animation changes. */
    _animationStateChanged: EventEmitter<AnimationEvent>;
    /** The class that traps and manages focus within the bottom sheet. */
    private _focusTrap;
    /** Element that was focused before the bottom sheet was opened. */
    private _elementFocusedBeforeOpened;
    /** Server-side rendering-compatible reference to the global document object. */
    private _document;
    /** Whether the component has been destroyed. */
    private _destroyed;
    constructor(_elementRef: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, _focusTrapFactory: FocusTrapFactory, breakpointObserver: BreakpointObserver, document: any, 
    /** The bottom sheet configuration. */
    bottomSheetConfig: MatBottomSheetConfig);
    /** Attach a component portal as content to this bottom sheet container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /** Attach a template portal as content to this bottom sheet container. */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    /**
     * Attaches a DOM portal to the bottom sheet container.
     * @deprecated To be turned into a method.
     * @breaking-change 10.0.0
     */
    attachDomPortal: (portal: DomPortal<HTMLElement>) => void;
    /** Begin animation of bottom sheet entrance into view. */
    enter(): void;
    /** Begin animation of the bottom sheet exiting from view. */
    exit(): void;
    ngOnDestroy(): void;
    _onAnimationDone(event: AnimationEvent): void;
    _onAnimationStart(event: AnimationEvent): void;
    private _toggleClass;
    private _validatePortalAttached;
    private _setPanelClass;
    /** Moves the focus inside the focus trap. */
    private _trapFocus;
    /** Restores focus to the element that was focused before the bottom sheet was opened. */
    private _restoreFocus;
    /** Saves a reference to the element that was focused before the bottom sheet was opened. */
    private _savePreviouslyFocusedElement;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatBottomSheetContainer, [null, null, null, null, { optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatBottomSheetContainer, "mat-bottom-sheet-container", never, {}, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLXNoZWV0LWNvbnRhaW5lci5kLnRzIiwic291cmNlcyI6WyJib3R0b20tc2hlZXQtY29udGFpbmVyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsIE9uRGVzdHJveSwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEJhc2VQb3J0YWxPdXRsZXQsIENvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWwsIENka1BvcnRhbE91dGxldCwgRG9tUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBCcmVha3BvaW50T2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IE1hdEJvdHRvbVNoZWV0Q29uZmlnIH0gZnJvbSAnLi9ib3R0b20tc2hlZXQtY29uZmlnJztcbmltcG9ydCB7IEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHVzZXItcHJvdmlkZWQgYm90dG9tIHNoZWV0IGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEJvdHRvbVNoZWV0Q29udGFpbmVyIGV4dGVuZHMgQmFzZVBvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjtcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICBwcml2YXRlIF9mb2N1c1RyYXBGYWN0b3J5O1xuICAgIC8qKiBUaGUgYm90dG9tIHNoZWV0IGNvbmZpZ3VyYXRpb24uICovXG4gICAgYm90dG9tU2hlZXRDb25maWc6IE1hdEJvdHRvbVNoZWV0Q29uZmlnO1xuICAgIHByaXZhdGUgX2JyZWFrcG9pbnRTdWJzY3JpcHRpb247XG4gICAgLyoqIFRoZSBwb3J0YWwgb3V0bGV0IGluc2lkZSBvZiB0aGlzIGNvbnRhaW5lciBpbnRvIHdoaWNoIHRoZSBjb250ZW50IHdpbGwgYmUgbG9hZGVkLiAqL1xuICAgIF9wb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcbiAgICAvKiogVGhlIHN0YXRlIG9mIHRoZSBib3R0b20gc2hlZXQgYW5pbWF0aW9ucy4gKi9cbiAgICBfYW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICd2aXNpYmxlJyB8ICdoaWRkZW4nO1xuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbiBjaGFuZ2VzLiAqL1xuICAgIF9hbmltYXRpb25TdGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD47XG4gICAgLyoqIFRoZSBjbGFzcyB0aGF0IHRyYXBzIGFuZCBtYW5hZ2VzIGZvY3VzIHdpdGhpbiB0aGUgYm90dG9tIHNoZWV0LiAqL1xuICAgIHByaXZhdGUgX2ZvY3VzVHJhcDtcbiAgICAvKiogRWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgYm90dG9tIHNoZWV0IHdhcyBvcGVuZWQuICovXG4gICAgcHJpdmF0ZSBfZWxlbWVudEZvY3VzZWRCZWZvcmVPcGVuZWQ7XG4gICAgLyoqIFNlcnZlci1zaWRlIHJlbmRlcmluZy1jb21wYXRpYmxlIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIGRvY3VtZW50IG9iamVjdC4gKi9cbiAgICBwcml2YXRlIF9kb2N1bWVudDtcbiAgICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIF9kZXN0cm95ZWQ7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBfZm9jdXNUcmFwRmFjdG9yeTogRm9jdXNUcmFwRmFjdG9yeSwgYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIsIGRvY3VtZW50OiBhbnksIFxuICAgIC8qKiBUaGUgYm90dG9tIHNoZWV0IGNvbmZpZ3VyYXRpb24uICovXG4gICAgYm90dG9tU2hlZXRDb25maWc6IE1hdEJvdHRvbVNoZWV0Q29uZmlnKTtcbiAgICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgYm90dG9tIHNoZWV0IGNvbnRhaW5lci4gKi9cbiAgICBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4pOiBDb21wb25lbnRSZWY8VD47XG4gICAgLyoqIEF0dGFjaCBhIHRlbXBsYXRlIHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgYm90dG9tIHNoZWV0IGNvbnRhaW5lci4gKi9cbiAgICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPEM+KTogRW1iZWRkZWRWaWV3UmVmPEM+O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIGEgRE9NIHBvcnRhbCB0byB0aGUgYm90dG9tIHNoZWV0IGNvbnRhaW5lci5cbiAgICAgKiBAZGVwcmVjYXRlZCBUbyBiZSB0dXJuZWQgaW50byBhIG1ldGhvZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAqL1xuICAgIGF0dGFjaERvbVBvcnRhbDogKHBvcnRhbDogRG9tUG9ydGFsPEhUTUxFbGVtZW50PikgPT4gdm9pZDtcbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIGJvdHRvbSBzaGVldCBlbnRyYW5jZSBpbnRvIHZpZXcuICovXG4gICAgZW50ZXIoKTogdm9pZDtcbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBib3R0b20gc2hlZXQgZXhpdGluZyBmcm9tIHZpZXcuICovXG4gICAgZXhpdCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgX29uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkO1xuICAgIF9vbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQ7XG4gICAgcHJpdmF0ZSBfdG9nZ2xlQ2xhc3M7XG4gICAgcHJpdmF0ZSBfdmFsaWRhdGVQb3J0YWxBdHRhY2hlZDtcbiAgICBwcml2YXRlIF9zZXRQYW5lbENsYXNzO1xuICAgIC8qKiBNb3ZlcyB0aGUgZm9jdXMgaW5zaWRlIHRoZSBmb2N1cyB0cmFwLiAqL1xuICAgIHByaXZhdGUgX3RyYXBGb2N1cztcbiAgICAvKiogUmVzdG9yZXMgZm9jdXMgdG8gdGhlIGVsZW1lbnQgdGhhdCB3YXMgZm9jdXNlZCBiZWZvcmUgdGhlIGJvdHRvbSBzaGVldCB3YXMgb3BlbmVkLiAqL1xuICAgIHByaXZhdGUgX3Jlc3RvcmVGb2N1cztcbiAgICAvKiogU2F2ZXMgYSByZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgdGhhdCB3YXMgZm9jdXNlZCBiZWZvcmUgdGhlIGJvdHRvbSBzaGVldCB3YXMgb3BlbmVkLiAqL1xuICAgIHByaXZhdGUgX3NhdmVQcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQ7XG59XG4iXX0=