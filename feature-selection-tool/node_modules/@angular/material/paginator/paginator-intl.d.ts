/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Optional } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * To modify the labels and text displayed, create a new instance of MatPaginatorIntl and
 * include it in a custom provider
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatPaginatorIntl {
    /**
     * Stream to emit from when labels are changed. Use this to notify components when the labels have
     * changed after initialization.
     */
    readonly changes: Subject<void>;
    /** A label for the page size selector. */
    itemsPerPageLabel: string;
    /** A label for the button that increments the current page. */
    nextPageLabel: string;
    /** A label for the button that decrements the current page. */
    previousPageLabel: string;
    /** A label for the button that moves to the first page. */
    firstPageLabel: string;
    /** A label for the button that moves to the last page. */
    lastPageLabel: string;
    /** A label for the range of items within the current page and the length of the whole list. */
    getRangeLabel: (page: number, pageSize: number, length: number) => string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatPaginatorIntl, never>;
}
/** @docs-private */
export declare function MAT_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl: MatPaginatorIntl): MatPaginatorIntl;
/** @docs-private */
export declare const MAT_PAGINATOR_INTL_PROVIDER: {
    provide: typeof MatPaginatorIntl;
    deps: Optional[][];
    useFactory: typeof MAT_PAGINATOR_INTL_PROVIDER_FACTORY;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLWludGwuZC50cyIsInNvdXJjZXMiOlsicGFnaW5hdG9yLWludGwuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLyoqXG4gKiBUbyBtb2RpZnkgdGhlIGxhYmVscyBhbmQgdGV4dCBkaXNwbGF5ZWQsIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBNYXRQYWdpbmF0b3JJbnRsIGFuZFxuICogaW5jbHVkZSBpdCBpbiBhIGN1c3RvbSBwcm92aWRlclxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRQYWdpbmF0b3JJbnRsIHtcbiAgICAvKipcbiAgICAgKiBTdHJlYW0gdG8gZW1pdCBmcm9tIHdoZW4gbGFiZWxzIGFyZSBjaGFuZ2VkLiBVc2UgdGhpcyB0byBub3RpZnkgY29tcG9uZW50cyB3aGVuIHRoZSBsYWJlbHMgaGF2ZVxuICAgICAqIGNoYW5nZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgY2hhbmdlczogU3ViamVjdDx2b2lkPjtcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHBhZ2Ugc2l6ZSBzZWxlY3Rvci4gKi9cbiAgICBpdGVtc1BlclBhZ2VMYWJlbDogc3RyaW5nO1xuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgYnV0dG9uIHRoYXQgaW5jcmVtZW50cyB0aGUgY3VycmVudCBwYWdlLiAqL1xuICAgIG5leHRQYWdlTGFiZWw6IHN0cmluZztcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGJ1dHRvbiB0aGF0IGRlY3JlbWVudHMgdGhlIGN1cnJlbnQgcGFnZS4gKi9cbiAgICBwcmV2aW91c1BhZ2VMYWJlbDogc3RyaW5nO1xuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgYnV0dG9uIHRoYXQgbW92ZXMgdG8gdGhlIGZpcnN0IHBhZ2UuICovXG4gICAgZmlyc3RQYWdlTGFiZWw6IHN0cmluZztcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGJ1dHRvbiB0aGF0IG1vdmVzIHRvIHRoZSBsYXN0IHBhZ2UuICovXG4gICAgbGFzdFBhZ2VMYWJlbDogc3RyaW5nO1xuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcmFuZ2Ugb2YgaXRlbXMgd2l0aGluIHRoZSBjdXJyZW50IHBhZ2UgYW5kIHRoZSBsZW5ndGggb2YgdGhlIHdob2xlIGxpc3QuICovXG4gICAgZ2V0UmFuZ2VMYWJlbDogKHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpID0+IHN0cmluZztcbn1cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVJfRkFDVE9SWShwYXJlbnRJbnRsOiBNYXRQYWdpbmF0b3JJbnRsKTogTWF0UGFnaW5hdG9ySW50bDtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVI6IHtcbiAgICBwcm92aWRlOiB0eXBlb2YgTWF0UGFnaW5hdG9ySW50bDtcbiAgICBkZXBzOiBPcHRpb25hbFtdW107XG4gICAgdXNlRmFjdG9yeTogdHlwZW9mIE1BVF9QQUdJTkFUT1JfSU5UTF9QUk9WSURFUl9GQUNUT1JZO1xufTtcbiJdfQ==