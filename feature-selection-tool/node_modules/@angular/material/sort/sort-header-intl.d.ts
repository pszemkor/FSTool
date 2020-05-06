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
 * To modify the labels and text displayed, create a new instance of MatSortHeaderIntl and
 * include it in a custom provider.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatSortHeaderIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes: Subject<void>;
    /** ARIA label for the sorting button. */
    sortButtonLabel: (id: string) => string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSortHeaderIntl, never>;
}
/** @docs-private */
export declare function MAT_SORT_HEADER_INTL_PROVIDER_FACTORY(parentIntl: MatSortHeaderIntl): MatSortHeaderIntl;
/** @docs-private */
export declare const MAT_SORT_HEADER_INTL_PROVIDER: {
    provide: typeof MatSortHeaderIntl;
    deps: Optional[][];
    useFactory: typeof MAT_SORT_HEADER_INTL_PROVIDER_FACTORY;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1oZWFkZXItaW50bC5kLnRzIiwic291cmNlcyI6WyJzb3J0LWhlYWRlci1pbnRsLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG4vKipcbiAqIFRvIG1vZGlmeSB0aGUgbGFiZWxzIGFuZCB0ZXh0IGRpc3BsYXllZCwgY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIE1hdFNvcnRIZWFkZXJJbnRsIGFuZFxuICogaW5jbHVkZSBpdCBpbiBhIGN1c3RvbSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0U29ydEhlYWRlckludGwge1xuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBsYWJlbHMgaGVyZSBhcmUgY2hhbmdlZC4gVXNlIHRoaXMgdG8gbm90aWZ5XG4gICAgICogY29tcG9uZW50cyBpZiB0aGUgbGFiZWxzIGhhdmUgY2hhbmdlZCBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBjaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+O1xuICAgIC8qKiBBUklBIGxhYmVsIGZvciB0aGUgc29ydGluZyBidXR0b24uICovXG4gICAgc29ydEJ1dHRvbkxhYmVsOiAoaWQ6IHN0cmluZykgPT4gc3RyaW5nO1xufVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIE1BVF9TT1JUX0hFQURFUl9JTlRMX1BST1ZJREVSX0ZBQ1RPUlkocGFyZW50SW50bDogTWF0U29ydEhlYWRlckludGwpOiBNYXRTb3J0SGVhZGVySW50bDtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBNQVRfU09SVF9IRUFERVJfSU5UTF9QUk9WSURFUjoge1xuICAgIHByb3ZpZGU6IHR5cGVvZiBNYXRTb3J0SGVhZGVySW50bDtcbiAgICBkZXBzOiBPcHRpb25hbFtdW107XG4gICAgdXNlRmFjdG9yeTogdHlwZW9mIE1BVF9TT1JUX0hFQURFUl9JTlRMX1BST1ZJREVSX0ZBQ1RPUlk7XG59O1xuIl19