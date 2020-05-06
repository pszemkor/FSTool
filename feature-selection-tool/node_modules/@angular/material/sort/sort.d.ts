/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { EventEmitter, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CanDisable, CanDisableCtor, HasInitialized, HasInitializedCtor } from '@angular/material/core';
import { Subject } from 'rxjs';
import { SortDirection } from './sort-direction';
/** Interface for a directive that holds sorting state consumed by `MatSortHeader`. */
import * as ɵngcc0 from '@angular/core';
export interface MatSortable {
    /** The id of the column being sorted. */
    id: string;
    /** Starting sort direction. */
    start: 'asc' | 'desc';
    /** Whether to disable clearing the sorting state. */
    disableClear: boolean;
}
/** The current sort state. */
export interface Sort {
    /** The id of the column being sorted. */
    active: string;
    /** The sort direction. */
    direction: SortDirection;
}
/** @docs-private */
declare class MatSortBase {
}
declare const _MatSortMixinBase: HasInitializedCtor & CanDisableCtor & typeof MatSortBase;
/** Container for MatSortables to manage the sort state and provide default sort parameters. */
export declare class MatSort extends _MatSortMixinBase implements CanDisable, HasInitialized, OnChanges, OnDestroy, OnInit {
    /** Collection of all registered sortables that this directive manages. */
    sortables: Map<string, MatSortable>;
    /** Used to notify any child components listening to state changes. */
    readonly _stateChanges: Subject<void>;
    /** The id of the most recently sorted MatSortable. */
    active: string;
    /**
     * The direction to set when an MatSortable is initially sorted.
     * May be overriden by the MatSortable's sort start.
     */
    start: 'asc' | 'desc';
    /** The sort direction of the currently active MatSortable. */
    get direction(): SortDirection;
    set direction(direction: SortDirection);
    private _direction;
    /**
     * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
     * May be overriden by the MatSortable's disable clear input.
     */
    get disableClear(): boolean;
    set disableClear(v: boolean);
    private _disableClear;
    /** Event emitted when the user changes either the active sort or sort direction. */
    readonly sortChange: EventEmitter<Sort>;
    /**
     * Register function to be used by the contained MatSortables. Adds the MatSortable to the
     * collection of MatSortables.
     */
    register(sortable: MatSortable): void;
    /**
     * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
     * collection of contained MatSortables.
     */
    deregister(sortable: MatSortable): void;
    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable: MatSortable): void;
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable: MatSortable): SortDirection;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_disableClear: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatSort, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatSort, "[matSort]", ["matSort"], { "disabled": "matSortDisabled"; "start": "matSortStart"; "direction": "matSortDirection"; "disableClear": "matSortDisableClear"; "active": "matSortActive"; }, { "sortChange": "matSortChange"; }, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5kLnRzIiwic291cmNlcyI6WyJzb3J0LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBIYXNJbml0aWFsaXplZCwgSGFzSW5pdGlhbGl6ZWRDdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi9zb3J0LWRpcmVjdGlvbic7XG4vKiogSW50ZXJmYWNlIGZvciBhIGRpcmVjdGl2ZSB0aGF0IGhvbGRzIHNvcnRpbmcgc3RhdGUgY29uc3VtZWQgYnkgYE1hdFNvcnRIZWFkZXJgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRTb3J0YWJsZSB7XG4gICAgLyoqIFRoZSBpZCBvZiB0aGUgY29sdW1uIGJlaW5nIHNvcnRlZC4gKi9cbiAgICBpZDogc3RyaW5nO1xuICAgIC8qKiBTdGFydGluZyBzb3J0IGRpcmVjdGlvbi4gKi9cbiAgICBzdGFydDogJ2FzYycgfCAnZGVzYyc7XG4gICAgLyoqIFdoZXRoZXIgdG8gZGlzYWJsZSBjbGVhcmluZyB0aGUgc29ydGluZyBzdGF0ZS4gKi9cbiAgICBkaXNhYmxlQ2xlYXI6IGJvb2xlYW47XG59XG4vKiogVGhlIGN1cnJlbnQgc29ydCBzdGF0ZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU29ydCB7XG4gICAgLyoqIFRoZSBpZCBvZiB0aGUgY29sdW1uIGJlaW5nIHNvcnRlZC4gKi9cbiAgICBhY3RpdmU6IHN0cmluZztcbiAgICAvKiogVGhlIHNvcnQgZGlyZWN0aW9uLiAqL1xuICAgIGRpcmVjdGlvbjogU29ydERpcmVjdGlvbjtcbn1cbi8qKiBAZG9jcy1wcml2YXRlICovXG5kZWNsYXJlIGNsYXNzIE1hdFNvcnRCYXNlIHtcbn1cbmRlY2xhcmUgY29uc3QgX01hdFNvcnRNaXhpbkJhc2U6IEhhc0luaXRpYWxpemVkQ3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1hdFNvcnRCYXNlO1xuLyoqIENvbnRhaW5lciBmb3IgTWF0U29ydGFibGVzIHRvIG1hbmFnZSB0aGUgc29ydCBzdGF0ZSBhbmQgcHJvdmlkZSBkZWZhdWx0IHNvcnQgcGFyYW1ldGVycy4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdFNvcnQgZXh0ZW5kcyBfTWF0U29ydE1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc0luaXRpYWxpemVkLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgICAvKiogQ29sbGVjdGlvbiBvZiBhbGwgcmVnaXN0ZXJlZCBzb3J0YWJsZXMgdGhhdCB0aGlzIGRpcmVjdGl2ZSBtYW5hZ2VzLiAqL1xuICAgIHNvcnRhYmxlczogTWFwPHN0cmluZywgTWF0U29ydGFibGU+O1xuICAgIC8qKiBVc2VkIHRvIG5vdGlmeSBhbnkgY2hpbGQgY29tcG9uZW50cyBsaXN0ZW5pbmcgdG8gc3RhdGUgY2hhbmdlcy4gKi9cbiAgICByZWFkb25seSBfc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+O1xuICAgIC8qKiBUaGUgaWQgb2YgdGhlIG1vc3QgcmVjZW50bHkgc29ydGVkIE1hdFNvcnRhYmxlLiAqL1xuICAgIGFjdGl2ZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBkaXJlY3Rpb24gdG8gc2V0IHdoZW4gYW4gTWF0U29ydGFibGUgaXMgaW5pdGlhbGx5IHNvcnRlZC5cbiAgICAgKiBNYXkgYmUgb3ZlcnJpZGVuIGJ5IHRoZSBNYXRTb3J0YWJsZSdzIHNvcnQgc3RhcnQuXG4gICAgICovXG4gICAgc3RhcnQ6ICdhc2MnIHwgJ2Rlc2MnO1xuICAgIC8qKiBUaGUgc29ydCBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgTWF0U29ydGFibGUuICovXG4gICAgZ2V0IGRpcmVjdGlvbigpOiBTb3J0RGlyZWN0aW9uO1xuICAgIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uKTtcbiAgICBwcml2YXRlIF9kaXJlY3Rpb247XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNhYmxlIHRoZSB1c2VyIGZyb20gY2xlYXJpbmcgdGhlIHNvcnQgYnkgZmluaXNoaW5nIHRoZSBzb3J0IGRpcmVjdGlvbiBjeWNsZS5cbiAgICAgKiBNYXkgYmUgb3ZlcnJpZGVuIGJ5IHRoZSBNYXRTb3J0YWJsZSdzIGRpc2FibGUgY2xlYXIgaW5wdXQuXG4gICAgICovXG4gICAgZ2V0IGRpc2FibGVDbGVhcigpOiBib29sZWFuO1xuICAgIHNldCBkaXNhYmxlQ2xlYXIodjogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZUNsZWFyO1xuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyBlaXRoZXIgdGhlIGFjdGl2ZSBzb3J0IG9yIHNvcnQgZGlyZWN0aW9uLiAqL1xuICAgIHJlYWRvbmx5IHNvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTb3J0PjtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBmdW5jdGlvbiB0byBiZSB1c2VkIGJ5IHRoZSBjb250YWluZWQgTWF0U29ydGFibGVzLiBBZGRzIHRoZSBNYXRTb3J0YWJsZSB0byB0aGVcbiAgICAgKiBjb2xsZWN0aW9uIG9mIE1hdFNvcnRhYmxlcy5cbiAgICAgKi9cbiAgICByZWdpc3Rlcihzb3J0YWJsZTogTWF0U29ydGFibGUpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFVucmVnaXN0ZXIgZnVuY3Rpb24gdG8gYmUgdXNlZCBieSB0aGUgY29udGFpbmVkIE1hdFNvcnRhYmxlcy4gUmVtb3ZlcyB0aGUgTWF0U29ydGFibGUgZnJvbSB0aGVcbiAgICAgKiBjb2xsZWN0aW9uIG9mIGNvbnRhaW5lZCBNYXRTb3J0YWJsZXMuXG4gICAgICovXG4gICAgZGVyZWdpc3Rlcihzb3J0YWJsZTogTWF0U29ydGFibGUpOiB2b2lkO1xuICAgIC8qKiBTZXRzIHRoZSBhY3RpdmUgc29ydCBpZCBhbmQgZGV0ZXJtaW5lcyB0aGUgbmV3IHNvcnQgZGlyZWN0aW9uLiAqL1xuICAgIHNvcnQoc29ydGFibGU6IE1hdFNvcnRhYmxlKTogdm9pZDtcbiAgICAvKiogUmV0dXJucyB0aGUgbmV4dCBzb3J0IGRpcmVjdGlvbiBvZiB0aGUgYWN0aXZlIHNvcnRhYmxlLCBjaGVja2luZyBmb3IgcG90ZW50aWFsIG92ZXJyaWRlcy4gKi9cbiAgICBnZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZTogTWF0U29ydGFibGUpOiBTb3J0RGlyZWN0aW9uO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlQ2xlYXI6IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==