/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay, OverlayContainer, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { InjectionToken, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialogConfig } from './dialog-config';
import { MatDialogRef } from './dialog-ref';
/** Injection token that can be used to access the data that was passed in to a dialog. */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_DIALOG_DATA: InjectionToken<any>;
/** Injection token that can be used to specify default dialog options. */
export declare const MAT_DIALOG_DEFAULT_OPTIONS: InjectionToken<MatDialogConfig<any>>;
/** Injection token that determines the scroll handling while the dialog is open. */
export declare const MAT_DIALOG_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MAT_DIALOG_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
};
/**
 * Service to open Material Design modal dialogs.
 */
export declare class MatDialog implements OnDestroy {
    private _overlay;
    private _injector;
    private _defaultOptions;
    private _parentDialog;
    private _overlayContainer;
    private _openDialogsAtThisLevel;
    private readonly _afterAllClosedAtThisLevel;
    private readonly _afterOpenedAtThisLevel;
    private _ariaHiddenElements;
    private _scrollStrategy;
    /** Keeps track of the currently-open dialogs. */
    get openDialogs(): MatDialogRef<any>[];
    /** Stream that emits when a dialog has been opened. */
    get afterOpened(): Subject<MatDialogRef<any>>;
    get _afterAllClosed(): Subject<void>;
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     */
    readonly afterAllClosed: Observable<void>;
    constructor(_overlay: Overlay, _injector: Injector, 
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    _location: Location, _defaultOptions: MatDialogConfig, scrollStrategy: any, _parentDialog: MatDialog, _overlayContainer: OverlayContainer);
    /**
     * Opens a modal dialog containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>;
    /**
     * Closes all of the currently-open dialogs.
     */
    closeAll(): void;
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    getDialogById(id: string): MatDialogRef<any> | undefined;
    ngOnDestroy(): void;
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param config The dialog configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    private _createOverlay;
    /**
     * Creates an overlay config from a dialog config.
     * @param dialogConfig The dialog configuration.
     * @returns The overlay configuration.
     */
    private _getOverlayConfig;
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    private _attachDialogContainer;
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    private _attachDialogContent;
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the dialog.
     * @param dialogRef Reference to the dialog.
     * @param container Dialog container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the dialog.
     */
    private _createInjector;
    /**
     * Removes a dialog from the array of open dialogs.
     * @param dialogRef Dialog to be removed.
     */
    private _removeOpenDialog;
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     */
    private _hideNonDialogContentFromAssistiveTechnology;
    /** Closes all of the dialogs in an array. */
    private _closeDialogs;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatDialog, [null, null, { optional: true; }, { optional: true; }, null, { optional: true; skipSelf: true; }, null]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MatDialog>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmQudHMiLCJzb3VyY2VzIjpbImRpYWxvZy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb250YWluZXIsIFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcgfSBmcm9tICcuL2RpYWxvZy1jb25maWcnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnLi9kaWFsb2ctcmVmJztcbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgdGhlIGRhdGEgdGhhdCB3YXMgcGFzc2VkIGluIHRvIGEgZGlhbG9nLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0RJQUxPR19EQVRBOiBJbmplY3Rpb25Ub2tlbjxhbnk+O1xuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgZGVmYXVsdCBkaWFsb2cgb3B0aW9ucy4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxNYXREaWFsb2dDb25maWc8YW55Pj47XG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkaWFsb2cgaXMgb3Blbi4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9ESUFMT0dfU0NST0xMX1NUUkFURUdZOiBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT47XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVI6IHtcbiAgICBwcm92aWRlOiBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT47XG4gICAgZGVwczogKHR5cGVvZiBPdmVybGF5KVtdO1xuICAgIHVzZUZhY3Rvcnk6IHR5cGVvZiBNQVRfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZO1xufTtcbi8qKlxuICogU2VydmljZSB0byBvcGVuIE1hdGVyaWFsIERlc2lnbiBtb2RhbCBkaWFsb2dzLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXREaWFsb2cgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgX292ZXJsYXk7XG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I7XG4gICAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM7XG4gICAgcHJpdmF0ZSBfcGFyZW50RGlhbG9nO1xuICAgIHByaXZhdGUgX292ZXJsYXlDb250YWluZXI7XG4gICAgcHJpdmF0ZSBfb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hZnRlckFsbENsb3NlZEF0VGhpc0xldmVsO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FmdGVyT3BlbmVkQXRUaGlzTGV2ZWw7XG4gICAgcHJpdmF0ZSBfYXJpYUhpZGRlbkVsZW1lbnRzO1xuICAgIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5O1xuICAgIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9ncy4gKi9cbiAgICBnZXQgb3BlbkRpYWxvZ3MoKTogTWF0RGlhbG9nUmVmPGFueT5bXTtcbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIGRpYWxvZyBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgZ2V0IGFmdGVyT3BlbmVkKCk6IFN1YmplY3Q8TWF0RGlhbG9nUmVmPGFueT4+O1xuICAgIGdldCBfYWZ0ZXJBbGxDbG9zZWQoKTogU3ViamVjdDx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGFsbCBvcGVuIGRpYWxvZyBoYXZlIGZpbmlzaGVkIGNsb3NpbmcuXG4gICAgICogV2lsbCBlbWl0IG9uIHN1YnNjcmliZSBpZiB0aGVyZSBhcmUgbm8gb3BlbiBkaWFsb2dzIHRvIGJlZ2luIHdpdGguXG4gICAgICovXG4gICAgcmVhZG9ubHkgYWZ0ZXJBbGxDbG9zZWQ6IE9ic2VydmFibGU8dm9pZD47XG4gICAgY29uc3RydWN0b3IoX292ZXJsYXk6IE92ZXJsYXksIF9pbmplY3RvcjogSW5qZWN0b3IsIFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIGBfbG9jYXRpb25gIHBhcmFtZXRlciB0byBiZSByZW1vdmVkLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gICAgICovXG4gICAgX2xvY2F0aW9uOiBMb2NhdGlvbiwgX2RlZmF1bHRPcHRpb25zOiBNYXREaWFsb2dDb25maWcsIHNjcm9sbFN0cmF0ZWd5OiBhbnksIF9wYXJlbnREaWFsb2c6IE1hdERpYWxvZywgX292ZXJsYXlDb250YWluZXI6IE92ZXJsYXlDb250YWluZXIpO1xuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgbW9kYWwgZGlhbG9nIGNvbnRhaW5pbmcgdGhlIGdpdmVuIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0gY29tcG9uZW50T3JUZW1wbGF0ZVJlZiBUeXBlIG9mIHRoZSBjb21wb25lbnQgdG8gbG9hZCBpbnRvIHRoZSBkaWFsb2csXG4gICAgICogICAgIG9yIGEgVGVtcGxhdGVSZWYgdG8gaW5zdGFudGlhdGUgYXMgdGhlIGRpYWxvZyBjb250ZW50LlxuICAgICAqIEBwYXJhbSBjb25maWcgRXh0cmEgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICAgICAqIEByZXR1cm5zIFJlZmVyZW5jZSB0byB0aGUgbmV3bHktb3BlbmVkIGRpYWxvZy5cbiAgICAgKi9cbiAgICBvcGVuPFQsIEQgPSBhbnksIFIgPSBhbnk+KGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPiwgY29uZmlnPzogTWF0RGlhbG9nQ29uZmlnPEQ+KTogTWF0RGlhbG9nUmVmPFQsIFI+O1xuICAgIC8qKlxuICAgICAqIENsb3NlcyBhbGwgb2YgdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3MuXG4gICAgICovXG4gICAgY2xvc2VBbGwoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbiBvcGVuIGRpYWxvZyBieSBpdHMgaWQuXG4gICAgICogQHBhcmFtIGlkIElEIHRvIHVzZSB3aGVuIGxvb2tpbmcgdXAgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICBnZXREaWFsb2dCeUlkKGlkOiBzdHJpbmcpOiBNYXREaWFsb2dSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIG92ZXJsYXkgaW50byB3aGljaCB0aGUgZGlhbG9nIHdpbGwgYmUgbG9hZGVkLlxuICAgICAqIEBwYXJhbSBjb25maWcgVGhlIGRpYWxvZyBjb25maWd1cmF0aW9uLlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIE92ZXJsYXlSZWYgZm9yIHRoZSBjcmVhdGVkIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkgY29uZmlnIGZyb20gYSBkaWFsb2cgY29uZmlnLlxuICAgICAqIEBwYXJhbSBkaWFsb2dDb25maWcgVGhlIGRpYWxvZyBjb25maWd1cmF0aW9uLlxuICAgICAqIEByZXR1cm5zIFRoZSBvdmVybGF5IGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZztcbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyBhbiBNYXREaWFsb2dDb250YWluZXIgdG8gYSBkaWFsb2cncyBhbHJlYWR5LWNyZWF0ZWQgb3ZlcmxheS5cbiAgICAgKiBAcGFyYW0gb3ZlcmxheSBSZWZlcmVuY2UgdG8gdGhlIGRpYWxvZydzIHVuZGVybHlpbmcgb3ZlcmxheS5cbiAgICAgKiBAcGFyYW0gY29uZmlnIFRoZSBkaWFsb2cgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVzb2x2aW5nIHRvIGEgQ29tcG9uZW50UmVmIGZvciB0aGUgYXR0YWNoZWQgY29udGFpbmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2F0dGFjaERpYWxvZ0NvbnRhaW5lcjtcbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgdXNlci1wcm92aWRlZCBjb21wb25lbnQgdG8gdGhlIGFscmVhZHktY3JlYXRlZCBNYXREaWFsb2dDb250YWluZXIuXG4gICAgICogQHBhcmFtIGNvbXBvbmVudE9yVGVtcGxhdGVSZWYgVGhlIHR5cGUgb2YgY29tcG9uZW50IGJlaW5nIGxvYWRlZCBpbnRvIHRoZSBkaWFsb2csXG4gICAgICogICAgIG9yIGEgVGVtcGxhdGVSZWYgdG8gaW5zdGFudGlhdGUgYXMgdGhlIGNvbnRlbnQuXG4gICAgICogQHBhcmFtIGRpYWxvZ0NvbnRhaW5lciBSZWZlcmVuY2UgdG8gdGhlIHdyYXBwaW5nIE1hdERpYWxvZ0NvbnRhaW5lci5cbiAgICAgKiBAcGFyYW0gb3ZlcmxheVJlZiBSZWZlcmVuY2UgdG8gdGhlIG92ZXJsYXkgaW4gd2hpY2ggdGhlIGRpYWxvZyByZXNpZGVzLlxuICAgICAqIEBwYXJhbSBjb25maWcgVGhlIGRpYWxvZyBjb25maWd1cmF0aW9uLlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIE1hdERpYWxvZ1JlZiB0aGF0IHNob3VsZCBiZSByZXR1cm5lZCB0byB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9hdHRhY2hEaWFsb2dDb250ZW50O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjdXN0b20gaW5qZWN0b3IgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIGRpYWxvZy4gVGhpcyBhbGxvd3MgYSBjb21wb25lbnQgbG9hZGVkIGluc2lkZVxuICAgICAqIG9mIGEgZGlhbG9nIHRvIGNsb3NlIGl0c2VsZiBhbmQsIG9wdGlvbmFsbHksIHRvIHJldHVybiBhIHZhbHVlLlxuICAgICAqIEBwYXJhbSBjb25maWcgQ29uZmlnIG9iamVjdCB0aGF0IGlzIHVzZWQgdG8gY29uc3RydWN0IHRoZSBkaWFsb2cuXG4gICAgICogQHBhcmFtIGRpYWxvZ1JlZiBSZWZlcmVuY2UgdG8gdGhlIGRpYWxvZy5cbiAgICAgKiBAcGFyYW0gY29udGFpbmVyIERpYWxvZyBjb250YWluZXIgZWxlbWVudCB0aGF0IHdyYXBzIGFsbCBvZiB0aGUgY29udGVudHMuXG4gICAgICogQHJldHVybnMgVGhlIGN1c3RvbSBpbmplY3RvciB0aGF0IGNhbiBiZSB1c2VkIGluc2lkZSB0aGUgZGlhbG9nLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NyZWF0ZUluamVjdG9yO1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBkaWFsb2cgZnJvbSB0aGUgYXJyYXkgb2Ygb3BlbiBkaWFsb2dzLlxuICAgICAqIEBwYXJhbSBkaWFsb2dSZWYgRGlhbG9nIHRvIGJlIHJlbW92ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfcmVtb3ZlT3BlbkRpYWxvZztcbiAgICAvKipcbiAgICAgKiBIaWRlcyBhbGwgb2YgdGhlIGNvbnRlbnQgdGhhdCBpc24ndCBhbiBvdmVybGF5IGZyb20gYXNzaXN0aXZlIHRlY2hub2xvZ3kuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaGlkZU5vbkRpYWxvZ0NvbnRlbnRGcm9tQXNzaXN0aXZlVGVjaG5vbG9neTtcbiAgICAvKiogQ2xvc2VzIGFsbCBvZiB0aGUgZGlhbG9ncyBpbiBhbiBhcnJheS4gKi9cbiAgICBwcml2YXRlIF9jbG9zZURpYWxvZ3M7XG59XG4iXX0=