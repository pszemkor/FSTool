/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { EmbeddedViewRef, InjectionToken, Injector, TemplateRef, OnDestroy } from '@angular/core';
import { SimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarConfig } from './snack-bar-config';
import { MatSnackBarRef } from './snack-bar-ref';
/** Injection token that can be used to specify default snack bar. */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_SNACK_BAR_DEFAULT_OPTIONS: InjectionToken<MatSnackBarConfig<any>>;
/** @docs-private */
export declare function MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY(): MatSnackBarConfig;
/**
 * Service to dispatch Material Design snack bar messages.
 */
export declare class MatSnackBar implements OnDestroy {
    private _overlay;
    private _live;
    private _injector;
    private _breakpointObserver;
    private _parentSnackBar;
    private _defaultConfig;
    /**
     * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
     * If there is a parent snack-bar service, all operations should delegate to that parent
     * via `_openedSnackBarRef`.
     */
    private _snackBarRefAtThisLevel;
    /** Reference to the currently opened snackbar at *any* level. */
    get _openedSnackBarRef(): MatSnackBarRef<any> | null;
    set _openedSnackBarRef(value: MatSnackBarRef<any> | null);
    constructor(_overlay: Overlay, _live: LiveAnnouncer, _injector: Injector, _breakpointObserver: BreakpointObserver, _parentSnackBar: MatSnackBar, _defaultConfig: MatSnackBarConfig);
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @param component Component to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    openFromComponent<T>(component: ComponentType<T>, config?: MatSnackBarConfig): MatSnackBarRef<T>;
    /**
     * Creates and dispatches a snack bar with a custom template for the content, removing any
     * currently opened snack bars.
     *
     * @param template Template to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    openFromTemplate(template: TemplateRef<any>, config?: MatSnackBarConfig): MatSnackBarRef<EmbeddedViewRef<any>>;
    /**
     * Opens a snackbar with a message and an optional action.
     * @param message The message to show in the snackbar.
     * @param action The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
    open(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar>;
    /**
     * Dismisses the currently-visible snack bar.
     */
    dismiss(): void;
    ngOnDestroy(): void;
    /**
     * Attaches the snack bar container component to the overlay.
     */
    private _attachSnackBarContainer;
    /**
     * Places a new component or a template as the content of the snack bar container.
     */
    private _attach;
    /** Animates the old snack bar out and the new one in. */
    private _animateSnackBar;
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified snack bar config.
     */
    private _createOverlay;
    /**
     * Creates an injector to be used inside of a snack bar component.
     * @param config Config that was used to create the snack bar.
     * @param snackBarRef Reference to the snack bar.
     */
    private _createInjector;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSnackBar, [null, null, null, null, { optional: true; skipSelf: true; }, null]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmQudHMiLCJzb3VyY2VzIjpbInNuYWNrLWJhci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBUZW1wbGF0ZVJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaW1wbGVTbmFja0JhciB9IGZyb20gJy4vc2ltcGxlLXNuYWNrLWJhcic7XG5pbXBvcnQgeyBNYXRTbmFja0JhckNvbmZpZyB9IGZyb20gJy4vc25hY2stYmFyLWNvbmZpZyc7XG5pbXBvcnQgeyBNYXRTbmFja0JhclJlZiB9IGZyb20gJy4vc25hY2stYmFyLXJlZic7XG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBkZWZhdWx0IHNuYWNrIGJhci4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9TTkFDS19CQVJfREVGQVVMVF9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxNYXRTbmFja0JhckNvbmZpZzxhbnk+Pjtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1hdFNuYWNrQmFyQ29uZmlnO1xuLyoqXG4gKiBTZXJ2aWNlIHRvIGRpc3BhdGNoIE1hdGVyaWFsIERlc2lnbiBzbmFjayBiYXIgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNuYWNrQmFyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9vdmVybGF5O1xuICAgIHByaXZhdGUgX2xpdmU7XG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I7XG4gICAgcHJpdmF0ZSBfYnJlYWtwb2ludE9ic2VydmVyO1xuICAgIHByaXZhdGUgX3BhcmVudFNuYWNrQmFyO1xuICAgIHByaXZhdGUgX2RlZmF1bHRDb25maWc7XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHNuYWNrIGJhciBpbiB0aGUgdmlldyAqYXQgdGhpcyBsZXZlbCogKGluIHRoZSBBbmd1bGFyIGluamVjdG9yIHRyZWUpLlxuICAgICAqIElmIHRoZXJlIGlzIGEgcGFyZW50IHNuYWNrLWJhciBzZXJ2aWNlLCBhbGwgb3BlcmF0aW9ucyBzaG91bGQgZGVsZWdhdGUgdG8gdGhhdCBwYXJlbnRcbiAgICAgKiB2aWEgYF9vcGVuZWRTbmFja0JhclJlZmAuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc25hY2tCYXJSZWZBdFRoaXNMZXZlbDtcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50bHkgb3BlbmVkIHNuYWNrYmFyIGF0ICphbnkqIGxldmVsLiAqL1xuICAgIGdldCBfb3BlbmVkU25hY2tCYXJSZWYoKTogTWF0U25hY2tCYXJSZWY8YW55PiB8IG51bGw7XG4gICAgc2V0IF9vcGVuZWRTbmFja0JhclJlZih2YWx1ZTogTWF0U25hY2tCYXJSZWY8YW55PiB8IG51bGwpO1xuICAgIGNvbnN0cnVjdG9yKF9vdmVybGF5OiBPdmVybGF5LCBfbGl2ZTogTGl2ZUFubm91bmNlciwgX2luamVjdG9yOiBJbmplY3RvciwgX2JyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLCBfcGFyZW50U25hY2tCYXI6IE1hdFNuYWNrQmFyLCBfZGVmYXVsdENvbmZpZzogTWF0U25hY2tCYXJDb25maWcpO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIGRpc3BhdGNoZXMgYSBzbmFjayBiYXIgd2l0aCBhIGN1c3RvbSBjb21wb25lbnQgZm9yIHRoZSBjb250ZW50LCByZW1vdmluZyBhbnlcbiAgICAgKiBjdXJyZW50bHkgb3BlbmVkIHNuYWNrIGJhcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50IENvbXBvbmVudCB0byBiZSBpbnN0YW50aWF0ZWQuXG4gICAgICogQHBhcmFtIGNvbmZpZyBFeHRyYSBjb25maWd1cmF0aW9uIGZvciB0aGUgc25hY2sgYmFyLlxuICAgICAqL1xuICAgIG9wZW5Gcm9tQ29tcG9uZW50PFQ+KGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxUPiwgY29uZmlnPzogTWF0U25hY2tCYXJDb25maWcpOiBNYXRTbmFja0JhclJlZjxUPjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCBkaXNwYXRjaGVzIGEgc25hY2sgYmFyIHdpdGggYSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBjb250ZW50LCByZW1vdmluZyBhbnlcbiAgICAgKiBjdXJyZW50bHkgb3BlbmVkIHNuYWNrIGJhcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgVGVtcGxhdGUgdG8gYmUgaW5zdGFudGlhdGVkLlxuICAgICAqIEBwYXJhbSBjb25maWcgRXh0cmEgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNuYWNrIGJhci5cbiAgICAgKi9cbiAgICBvcGVuRnJvbVRlbXBsYXRlKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LCBjb25maWc/OiBNYXRTbmFja0JhckNvbmZpZyk6IE1hdFNuYWNrQmFyUmVmPEVtYmVkZGVkVmlld1JlZjxhbnk+PjtcbiAgICAvKipcbiAgICAgKiBPcGVucyBhIHNuYWNrYmFyIHdpdGggYSBtZXNzYWdlIGFuZCBhbiBvcHRpb25hbCBhY3Rpb24uXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgc25hY2tiYXIuXG4gICAgICogQHBhcmFtIGFjdGlvbiBUaGUgbGFiZWwgZm9yIHRoZSBzbmFja2JhciBhY3Rpb24uXG4gICAgICogQHBhcmFtIGNvbmZpZyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIHNuYWNrYmFyLlxuICAgICAqL1xuICAgIG9wZW4obWVzc2FnZTogc3RyaW5nLCBhY3Rpb24/OiBzdHJpbmcsIGNvbmZpZz86IE1hdFNuYWNrQmFyQ29uZmlnKTogTWF0U25hY2tCYXJSZWY8U2ltcGxlU25hY2tCYXI+O1xuICAgIC8qKlxuICAgICAqIERpc21pc3NlcyB0aGUgY3VycmVudGx5LXZpc2libGUgc25hY2sgYmFyLlxuICAgICAqL1xuICAgIGRpc21pc3MoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHRoZSBzbmFjayBiYXIgY29udGFpbmVyIGNvbXBvbmVudCB0byB0aGUgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9hdHRhY2hTbmFja0JhckNvbnRhaW5lcjtcbiAgICAvKipcbiAgICAgKiBQbGFjZXMgYSBuZXcgY29tcG9uZW50IG9yIGEgdGVtcGxhdGUgYXMgdGhlIGNvbnRlbnQgb2YgdGhlIHNuYWNrIGJhciBjb250YWluZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfYXR0YWNoO1xuICAgIC8qKiBBbmltYXRlcyB0aGUgb2xkIHNuYWNrIGJhciBvdXQgYW5kIHRoZSBuZXcgb25lIGluLiAqL1xuICAgIHByaXZhdGUgX2FuaW1hdGVTbmFja0JhcjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG92ZXJsYXkgYW5kIHBsYWNlcyBpdCBpbiB0aGUgY29ycmVjdCBsb2NhdGlvbi5cbiAgICAgKiBAcGFyYW0gY29uZmlnIFRoZSB1c2VyLXNwZWNpZmllZCBzbmFjayBiYXIgY29uZmlnLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXk7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbmplY3RvciB0byBiZSB1c2VkIGluc2lkZSBvZiBhIHNuYWNrIGJhciBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgdGhhdCB3YXMgdXNlZCB0byBjcmVhdGUgdGhlIHNuYWNrIGJhci5cbiAgICAgKiBAcGFyYW0gc25hY2tCYXJSZWYgUmVmZXJlbmNlIHRvIHRoZSBzbmFjayBiYXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlSW5qZWN0b3I7XG59XG4iXX0=