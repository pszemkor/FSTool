/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Injector, TemplateRef, InjectionToken, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatBottomSheetConfig } from './bottom-sheet-config';
import { MatBottomSheetRef } from './bottom-sheet-ref';
/** Injection token that can be used to specify default bottom sheet options. */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_BOTTOM_SHEET_DEFAULT_OPTIONS: InjectionToken<MatBottomSheetConfig<any>>;
/**
 * Service to trigger Material Design bottom sheets.
 */
export declare class MatBottomSheet implements OnDestroy {
    private _overlay;
    private _injector;
    private _parentBottomSheet;
    private _location?;
    private _defaultOptions?;
    private _bottomSheetRefAtThisLevel;
    /** Reference to the currently opened bottom sheet. */
    get _openedBottomSheetRef(): MatBottomSheetRef<any> | null;
    set _openedBottomSheetRef(value: MatBottomSheetRef<any> | null);
    constructor(_overlay: Overlay, _injector: Injector, _parentBottomSheet: MatBottomSheet, _location?: Location | undefined, _defaultOptions?: MatBottomSheetConfig<any> | undefined);
    open<T, D = any, R = any>(component: ComponentType<T>, config?: MatBottomSheetConfig<D>): MatBottomSheetRef<T, R>;
    open<T, D = any, R = any>(template: TemplateRef<T>, config?: MatBottomSheetConfig<D>): MatBottomSheetRef<T, R>;
    /**
     * Dismisses the currently-visible bottom sheet.
     * @param result Data to pass to the bottom sheet instance.
     */
    dismiss<R = any>(result?: R): void;
    ngOnDestroy(): void;
    /**
     * Attaches the bottom sheet container component to the overlay.
     */
    private _attachContainer;
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified bottom sheet config.
     */
    private _createOverlay;
    /**
     * Creates an injector to be used inside of a bottom sheet component.
     * @param config Config that was used to create the bottom sheet.
     * @param bottomSheetRef Reference to the bottom sheet.
     */
    private _createInjector;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatBottomSheet, [null, null, { optional: true; skipSelf: true; }, { optional: true; }, { optional: true; }]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLXNoZWV0LmQudHMiLCJzb3VyY2VzIjpbImJvdHRvbS1zaGVldC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IEluamVjdG9yLCBUZW1wbGF0ZVJlZiwgSW5qZWN0aW9uVG9rZW4sIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0Qm90dG9tU2hlZXRDb25maWcgfSBmcm9tICcuL2JvdHRvbS1zaGVldC1jb25maWcnO1xuaW1wb3J0IHsgTWF0Qm90dG9tU2hlZXRSZWYgfSBmcm9tICcuL2JvdHRvbS1zaGVldC1yZWYnO1xuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgZGVmYXVsdCBib3R0b20gc2hlZXQgb3B0aW9ucy4gKi9cbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE1BVF9CT1RUT01fU0hFRVRfREVGQVVMVF9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxNYXRCb3R0b21TaGVldENvbmZpZzxhbnk+Pjtcbi8qKlxuICogU2VydmljZSB0byB0cmlnZ2VyIE1hdGVyaWFsIERlc2lnbiBib3R0b20gc2hlZXRzLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRCb3R0b21TaGVldCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfb3ZlcmxheTtcbiAgICBwcml2YXRlIF9pbmplY3RvcjtcbiAgICBwcml2YXRlIF9wYXJlbnRCb3R0b21TaGVldDtcbiAgICBwcml2YXRlIF9sb2NhdGlvbj87XG4gICAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM/O1xuICAgIHByaXZhdGUgX2JvdHRvbVNoZWV0UmVmQXRUaGlzTGV2ZWw7XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IG9wZW5lZCBib3R0b20gc2hlZXQuICovXG4gICAgZ2V0IF9vcGVuZWRCb3R0b21TaGVldFJlZigpOiBNYXRCb3R0b21TaGVldFJlZjxhbnk+IHwgbnVsbDtcbiAgICBzZXQgX29wZW5lZEJvdHRvbVNoZWV0UmVmKHZhbHVlOiBNYXRCb3R0b21TaGVldFJlZjxhbnk+IHwgbnVsbCk7XG4gICAgY29uc3RydWN0b3IoX292ZXJsYXk6IE92ZXJsYXksIF9pbmplY3RvcjogSW5qZWN0b3IsIF9wYXJlbnRCb3R0b21TaGVldDogTWF0Qm90dG9tU2hlZXQsIF9sb2NhdGlvbj86IExvY2F0aW9uIHwgdW5kZWZpbmVkLCBfZGVmYXVsdE9wdGlvbnM/OiBNYXRCb3R0b21TaGVldENvbmZpZzxhbnk+IHwgdW5kZWZpbmVkKTtcbiAgICBvcGVuPFQsIEQgPSBhbnksIFIgPSBhbnk+KGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxUPiwgY29uZmlnPzogTWF0Qm90dG9tU2hlZXRDb25maWc8RD4pOiBNYXRCb3R0b21TaGVldFJlZjxULCBSPjtcbiAgICBvcGVuPFQsIEQgPSBhbnksIFIgPSBhbnk+KHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxUPiwgY29uZmlnPzogTWF0Qm90dG9tU2hlZXRDb25maWc8RD4pOiBNYXRCb3R0b21TaGVldFJlZjxULCBSPjtcbiAgICAvKipcbiAgICAgKiBEaXNtaXNzZXMgdGhlIGN1cnJlbnRseS12aXNpYmxlIGJvdHRvbSBzaGVldC5cbiAgICAgKiBAcGFyYW0gcmVzdWx0IERhdGEgdG8gcGFzcyB0byB0aGUgYm90dG9tIHNoZWV0IGluc3RhbmNlLlxuICAgICAqL1xuICAgIGRpc21pc3M8UiA9IGFueT4ocmVzdWx0PzogUik6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgYm90dG9tIHNoZWV0IGNvbnRhaW5lciBjb21wb25lbnQgdG8gdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfYXR0YWNoQ29udGFpbmVyO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgb3ZlcmxheSBhbmQgcGxhY2VzIGl0IGluIHRoZSBjb3JyZWN0IGxvY2F0aW9uLlxuICAgICAqIEBwYXJhbSBjb25maWcgVGhlIHVzZXItc3BlY2lmaWVkIGJvdHRvbSBzaGVldCBjb25maWcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluamVjdG9yIHRvIGJlIHVzZWQgaW5zaWRlIG9mIGEgYm90dG9tIHNoZWV0IGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZyB0aGF0IHdhcyB1c2VkIHRvIGNyZWF0ZSB0aGUgYm90dG9tIHNoZWV0LlxuICAgICAqIEBwYXJhbSBib3R0b21TaGVldFJlZiBSZWZlcmVuY2UgdG8gdGhlIGJvdHRvbSBzaGVldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9jcmVhdGVJbmplY3Rvcjtcbn1cbiJdfQ==