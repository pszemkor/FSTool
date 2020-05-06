/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEvent } from '@angular/animations';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal, DomPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, EmbeddedViewRef, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBarConfig } from './snack-bar-config';
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatSnackBarContainer extends BasePortalOutlet implements OnDestroy {
    private _ngZone;
    private _elementRef;
    private _changeDetectorRef;
    /** The snack bar configuration. */
    snackBarConfig: MatSnackBarConfig;
    /** Whether the component has been destroyed. */
    private _destroyed;
    /** The portal outlet inside of this container into which the snack bar content will be loaded. */
    _portalOutlet: CdkPortalOutlet;
    /** Subject for notifying that the snack bar has exited from view. */
    readonly _onExit: Subject<any>;
    /** Subject for notifying that the snack bar has finished entering the view. */
    readonly _onEnter: Subject<any>;
    /** The state of the snack bar animations. */
    _animationState: string;
    /** ARIA role for the snack bar container. */
    _role: 'alert' | 'status' | null;
    constructor(_ngZone: NgZone, _elementRef: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, 
    /** The snack bar configuration. */
    snackBarConfig: MatSnackBarConfig);
    /** Attach a component portal as content to this snack bar container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /** Attach a template portal as content to this snack bar container. */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    /**
     * Attaches a DOM portal to the snack bar container.
     * @deprecated To be turned into a method.
     * @breaking-change 10.0.0
     */
    attachDomPortal: (portal: DomPortal<HTMLElement>) => void;
    /** Handle end of animations, updating the state of the snackbar. */
    onAnimationEnd(event: AnimationEvent): void;
    /** Begin animation of snack bar entrance into view. */
    enter(): void;
    /** Begin animation of the snack bar exiting from view. */
    exit(): Observable<void>;
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    ngOnDestroy(): void;
    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    private _completeExit;
    /** Applies the various positioning and user-configured CSS classes to the snack bar. */
    private _applySnackBarClasses;
    /** Asserts that no content is already attached to the container. */
    private _assertNotAttached;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSnackBarContainer, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSnackBarContainer, "snack-bar-container", never, {}, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5kLnRzIiwic291cmNlcyI6WyJzbmFjay1iYXItY29udGFpbmVyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEJhc2VQb3J0YWxPdXRsZXQsIENka1BvcnRhbE91dGxldCwgQ29tcG9uZW50UG9ydGFsLCBUZW1wbGF0ZVBvcnRhbCwgRG9tUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50UmVmLCBFbGVtZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXRTbmFja0JhckNvbmZpZyB9IGZyb20gJy4vc25hY2stYmFyLWNvbmZpZyc7XG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHVzZXItcHJvdmlkZWQgc25hY2sgYmFyIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNuYWNrQmFyQ29udGFpbmVyIGV4dGVuZHMgQmFzZVBvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfbmdab25lO1xuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgLyoqIFRoZSBzbmFjayBiYXIgY29uZmlndXJhdGlvbi4gKi9cbiAgICBzbmFja0JhckNvbmZpZzogTWF0U25hY2tCYXJDb25maWc7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkO1xuICAgIC8qKiBUaGUgcG9ydGFsIG91dGxldCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgc25hY2sgYmFyIGNvbnRlbnQgd2lsbCBiZSBsb2FkZWQuICovXG4gICAgX3BvcnRhbE91dGxldDogQ2RrUG9ydGFsT3V0bGV0O1xuICAgIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgc25hY2sgYmFyIGhhcyBleGl0ZWQgZnJvbSB2aWV3LiAqL1xuICAgIHJlYWRvbmx5IF9vbkV4aXQ6IFN1YmplY3Q8YW55PjtcbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgZmluaXNoZWQgZW50ZXJpbmcgdGhlIHZpZXcuICovXG4gICAgcmVhZG9ubHkgX29uRW50ZXI6IFN1YmplY3Q8YW55PjtcbiAgICAvKiogVGhlIHN0YXRlIG9mIHRoZSBzbmFjayBiYXIgYW5pbWF0aW9ucy4gKi9cbiAgICBfYW5pbWF0aW9uU3RhdGU6IHN0cmluZztcbiAgICAvKiogQVJJQSByb2xlIGZvciB0aGUgc25hY2sgYmFyIGNvbnRhaW5lci4gKi9cbiAgICBfcm9sZTogJ2FsZXJ0JyB8ICdzdGF0dXMnIHwgbnVsbDtcbiAgICBjb25zdHJ1Y3Rvcihfbmdab25lOiBOZ1pvbmUsIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgXG4gICAgLyoqIFRoZSBzbmFjayBiYXIgY29uZmlndXJhdGlvbi4gKi9cbiAgICBzbmFja0JhckNvbmZpZzogTWF0U25hY2tCYXJDb25maWcpO1xuICAgIC8qKiBBdHRhY2ggYSBjb21wb25lbnQgcG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBzbmFjayBiYXIgY29udGFpbmVyLiAqL1xuICAgIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPik6IENvbXBvbmVudFJlZjxUPjtcbiAgICAvKiogQXR0YWNoIGEgdGVtcGxhdGUgcG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBzbmFjayBiYXIgY29udGFpbmVyLiAqL1xuICAgIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz47XG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYSBET00gcG9ydGFsIHRvIHRoZSBzbmFjayBiYXIgY29udGFpbmVyLlxuICAgICAqIEBkZXByZWNhdGVkIFRvIGJlIHR1cm5lZCBpbnRvIGEgbWV0aG9kLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gICAgICovXG4gICAgYXR0YWNoRG9tUG9ydGFsOiAocG9ydGFsOiBEb21Qb3J0YWw8SFRNTEVsZW1lbnQ+KSA9PiB2b2lkO1xuICAgIC8qKiBIYW5kbGUgZW5kIG9mIGFuaW1hdGlvbnMsIHVwZGF0aW5nIHRoZSBzdGF0ZSBvZiB0aGUgc25hY2tiYXIuICovXG4gICAgb25BbmltYXRpb25FbmQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZDtcbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHNuYWNrIGJhciBlbnRyYW5jZSBpbnRvIHZpZXcuICovXG4gICAgZW50ZXIoKTogdm9pZDtcbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzbmFjayBiYXIgZXhpdGluZyBmcm9tIHZpZXcuICovXG4gICAgZXhpdCgpOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAgIC8qKiBNYWtlcyBzdXJlIHRoZSBleGl0IGNhbGxiYWNrcyBoYXZlIGJlZW4gaW52b2tlZCB3aGVuIHRoZSBlbGVtZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFdhaXRzIGZvciB0aGUgem9uZSB0byBzZXR0bGUgYmVmb3JlIHJlbW92aW5nIHRoZSBlbGVtZW50LiBIZWxwcyBwcmV2ZW50XG4gICAgICogZXJyb3JzIHdoZXJlIHdlIGVuZCB1cCByZW1vdmluZyBhbiBlbGVtZW50IHdoaWNoIGlzIGluIHRoZSBtaWRkbGUgb2YgYW4gYW5pbWF0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NvbXBsZXRlRXhpdDtcbiAgICAvKiogQXBwbGllcyB0aGUgdmFyaW91cyBwb3NpdGlvbmluZyBhbmQgdXNlci1jb25maWd1cmVkIENTUyBjbGFzc2VzIHRvIHRoZSBzbmFjayBiYXIuICovXG4gICAgcHJpdmF0ZSBfYXBwbHlTbmFja0JhckNsYXNzZXM7XG4gICAgLyoqIEFzc2VydHMgdGhhdCBubyBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQgdG8gdGhlIGNvbnRhaW5lci4gKi9cbiAgICBwcml2YXRlIF9hc3NlcnROb3RBdHRhY2hlZDtcbn1cbiJdfQ==