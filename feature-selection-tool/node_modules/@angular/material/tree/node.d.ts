/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkNestedTreeNode, CdkTree, CdkTreeNode, CdkTreeNodeDef } from '@angular/cdk/tree';
import { AfterContentInit, ElementRef, IterableDiffers, OnDestroy } from '@angular/core';
import { CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@angular/material/core';
import { BooleanInput } from '@angular/cdk/coercion';
import * as ɵngcc0 from '@angular/core';
declare const _MatTreeNodeMixinBase: HasTabIndexCtor & CanDisableCtor & typeof CdkTreeNode;
/**
 * Wrapper for the CdkTree node with Material design styles.
 */
export declare class MatTreeNode<T> extends _MatTreeNodeMixinBase<T> implements CanDisable, HasTabIndex {
    protected _elementRef: ElementRef<HTMLElement>;
    protected _tree: CdkTree<T>;
    role: 'treeitem' | 'group';
    constructor(_elementRef: ElementRef<HTMLElement>, _tree: CdkTree<T>, tabIndex: string);
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatTreeNode<any>, [null, null, { attribute: "tabindex"; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatTreeNode<any>, "mat-tree-node", ["matTreeNode"], { "disabled": "disabled"; "tabIndex": "tabIndex"; "role": "role"; }, {}, never>;
}
/**
 * Wrapper for the CdkTree node definition with Material design styles.
 */
export declare class MatTreeNodeDef<T> extends CdkTreeNodeDef<T> {
    data: T;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatTreeNodeDef<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatTreeNodeDef<any>, "[matTreeNodeDef]", never, { "when": "matTreeNodeDefWhen"; "data": "matTreeNode"; }, {}, never>;
}
/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
export declare class MatNestedTreeNode<T> extends CdkNestedTreeNode<T> implements AfterContentInit, OnDestroy {
    protected _elementRef: ElementRef<HTMLElement>;
    protected _tree: CdkTree<T>;
    protected _differs: IterableDiffers;
    node: T;
    /** Whether the node is disabled. */
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    /** Tabindex for the node. */
    get tabIndex(): number;
    set tabIndex(value: number);
    private _tabIndex;
    constructor(_elementRef: ElementRef<HTMLElement>, _tree: CdkTree<T>, _differs: IterableDiffers, tabIndex: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatNestedTreeNode<any>, [null, null, null, { attribute: "tabindex"; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatNestedTreeNode<any>, "mat-nested-tree-node", ["matNestedTreeNode"], { "tabIndex": "tabIndex"; "disabled": "disabled"; "node": "matNestedTreeNode"; }, {}, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5kLnRzIiwic291cmNlcyI6WyJub2RlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IENka05lc3RlZFRyZWVOb2RlLCBDZGtUcmVlLCBDZGtUcmVlTm9kZSwgQ2RrVHJlZU5vZGVEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBJdGVyYWJsZURpZmZlcnMsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5kZWNsYXJlIGNvbnN0IF9NYXRUcmVlTm9kZU1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgQ2RrVHJlZU5vZGU7XG4vKipcbiAqIFdyYXBwZXIgZm9yIHRoZSBDZGtUcmVlIG5vZGUgd2l0aCBNYXRlcmlhbCBkZXNpZ24gc3R5bGVzLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRUcmVlTm9kZTxUPiBleHRlbmRzIF9NYXRUcmVlTm9kZU1peGluQmFzZTxUPiBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICAgIHByb3RlY3RlZCBfdHJlZTogQ2RrVHJlZTxUPjtcbiAgICByb2xlOiAndHJlZWl0ZW0nIHwgJ2dyb3VwJztcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIF90cmVlOiBDZGtUcmVlPFQ+LCB0YWJJbmRleDogc3RyaW5nKTtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIENka1RyZWUgbm9kZSBkZWZpbml0aW9uIHdpdGggTWF0ZXJpYWwgZGVzaWduIHN0eWxlcy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0VHJlZU5vZGVEZWY8VD4gZXh0ZW5kcyBDZGtUcmVlTm9kZURlZjxUPiB7XG4gICAgZGF0YTogVDtcbn1cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIENka1RyZWUgbmVzdGVkIG5vZGUgd2l0aCBNYXRlcmlhbCBkZXNpZ24gc3R5bGVzLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXROZXN0ZWRUcmVlTm9kZTxUPiBleHRlbmRzIENka05lc3RlZFRyZWVOb2RlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICAgIHByb3RlY3RlZCBfdHJlZTogQ2RrVHJlZTxUPjtcbiAgICBwcm90ZWN0ZWQgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycztcbiAgICBub2RlOiBUO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBub2RlIGlzIGRpc2FibGVkLiAqL1xuICAgIGdldCBkaXNhYmxlZCgpOiBhbnk7XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkO1xuICAgIC8qKiBUYWJpbmRleCBmb3IgdGhlIG5vZGUuICovXG4gICAgZ2V0IHRhYkluZGV4KCk6IG51bWJlcjtcbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcik7XG4gICAgcHJpdmF0ZSBfdGFiSW5kZXg7XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBfdHJlZTogQ2RrVHJlZTxUPiwgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgdGFiSW5kZXg6IHN0cmluZyk7XG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==