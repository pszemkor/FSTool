/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, QueryList, ElementRef, NgZone } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from './drawer';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import * as ɵngcc0 from '@angular/core';
export declare class MatSidenavContent extends MatDrawerContent {
    constructor(changeDetectorRef: ChangeDetectorRef, container: MatSidenavContainer, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSidenavContent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSidenavContent, "mat-sidenav-content", never, {}, {}, never, ["*"]>;
}
export declare class MatSidenav extends MatDrawer {
    /** Whether the sidenav is fixed in the viewport. */
    get fixedInViewport(): boolean;
    set fixedInViewport(value: boolean);
    private _fixedInViewport;
    /**
     * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
     * mode.
     */
    get fixedTopGap(): number;
    set fixedTopGap(value: number);
    private _fixedTopGap;
    /**
     * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
     * fixed mode.
     */
    get fixedBottomGap(): number;
    set fixedBottomGap(value: number);
    private _fixedBottomGap;
    static ngAcceptInputType_fixedInViewport: BooleanInput;
    static ngAcceptInputType_fixedTopGap: NumberInput;
    static ngAcceptInputType_fixedBottomGap: NumberInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSidenav, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSidenav, "mat-sidenav", ["matSidenav"], { "fixedInViewport": "fixedInViewport"; "fixedTopGap": "fixedTopGap"; "fixedBottomGap": "fixedBottomGap"; }, {}, never, ["*"]>;
}
export declare class MatSidenavContainer extends MatDrawerContainer {
    _allDrawers: QueryList<MatSidenav>;
    _content: MatSidenavContent;
    static ngAcceptInputType_hasBackdrop: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSidenavContainer, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatSidenavContainer, "mat-sidenav-container", ["matSidenavContainer"], {}, {}, ["_content", "_allDrawers"], ["mat-sidenav", "mat-sidenav-content", "*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5kLnRzIiwic291cmNlcyI6WyJzaWRlbmF2LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIFF1ZXJ5TGlzdCwgRWxlbWVudFJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREcmF3ZXIsIE1hdERyYXdlckNvbnRhaW5lciwgTWF0RHJhd2VyQ29udGVudCB9IGZyb20gJy4vZHJhd2VyJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0U2lkZW5hdkNvbnRlbnQgZXh0ZW5kcyBNYXREcmF3ZXJDb250ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbnRhaW5lcjogTWF0U2lkZW5hdkNvbnRhaW5lciwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsIG5nWm9uZTogTmdab25lKTtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNpZGVuYXYgZXh0ZW5kcyBNYXREcmF3ZXIge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBzaWRlbmF2IGlzIGZpeGVkIGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgICBnZXQgZml4ZWRJblZpZXdwb3J0KCk6IGJvb2xlYW47XG4gICAgc2V0IGZpeGVkSW5WaWV3cG9ydCh2YWx1ZTogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfZml4ZWRJblZpZXdwb3J0O1xuICAgIC8qKlxuICAgICAqIFRoZSBnYXAgYmV0d2VlbiB0aGUgdG9wIG9mIHRoZSBzaWRlbmF2IGFuZCB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydCB3aGVuIHRoZSBzaWRlbmF2IGlzIGluIGZpeGVkXG4gICAgICogbW9kZS5cbiAgICAgKi9cbiAgICBnZXQgZml4ZWRUb3BHYXAoKTogbnVtYmVyO1xuICAgIHNldCBmaXhlZFRvcEdhcCh2YWx1ZTogbnVtYmVyKTtcbiAgICBwcml2YXRlIF9maXhlZFRvcEdhcDtcbiAgICAvKipcbiAgICAgKiBUaGUgZ2FwIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgc2lkZW5hdiBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgd2hlbiB0aGUgc2lkZW5hdiBpcyBpblxuICAgICAqIGZpeGVkIG1vZGUuXG4gICAgICovXG4gICAgZ2V0IGZpeGVkQm90dG9tR2FwKCk6IG51bWJlcjtcbiAgICBzZXQgZml4ZWRCb3R0b21HYXAodmFsdWU6IG51bWJlcik7XG4gICAgcHJpdmF0ZSBfZml4ZWRCb3R0b21HYXA7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkSW5WaWV3cG9ydDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZFRvcEdhcDogTnVtYmVySW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkQm90dG9tR2FwOiBOdW1iZXJJbnB1dDtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNpZGVuYXZDb250YWluZXIgZXh0ZW5kcyBNYXREcmF3ZXJDb250YWluZXIge1xuICAgIF9hbGxEcmF3ZXJzOiBRdWVyeUxpc3Q8TWF0U2lkZW5hdj47XG4gICAgX2NvbnRlbnQ6IE1hdFNpZGVuYXZDb250ZW50O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oYXNCYWNrZHJvcDogQm9vbGVhbklucHV0O1xufVxuIl19