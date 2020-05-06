/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { CanDisable, CanDisableCtor } from '../common-behaviors/disabled';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
declare class MatOptgroupBase {
}
declare const _MatOptgroupMixinBase: CanDisableCtor & typeof MatOptgroupBase;
/**
 * Component that is used to group instances of `mat-option`.
 */
export declare class MatOptgroup extends _MatOptgroupMixinBase implements CanDisable {
    /** Label for the option group. */
    label: string;
    /** Unique id for the underlying label. */
    _labelId: string;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatOptgroup, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatOptgroup, "mat-optgroup", ["matOptgroup"], { "disabled": "disabled"; "label": "label"; }, {}, never, ["*", "mat-option, ng-container"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuZC50cyIsInNvdXJjZXMiOlsib3B0Z3JvdXAuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciB9IGZyb20gJy4uL2NvbW1vbi1iZWhhdmlvcnMvZGlzYWJsZWQnO1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0T3B0Z3JvdXBCYXNlIHtcbn1cbmRlY2xhcmUgY29uc3QgX01hdE9wdGdyb3VwTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNYXRPcHRncm91cEJhc2U7XG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGlzIHVzZWQgdG8gZ3JvdXAgaW5zdGFuY2VzIG9mIGBtYXQtb3B0aW9uYC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0T3B0Z3JvdXAgZXh0ZW5kcyBfTWF0T3B0Z3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgICAvKiogTGFiZWwgZm9yIHRoZSBvcHRpb24gZ3JvdXAuICovXG4gICAgbGFiZWw6IHN0cmluZztcbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGUgdW5kZXJseWluZyBsYWJlbC4gKi9cbiAgICBfbGFiZWxJZDogc3RyaW5nO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuZXhwb3J0IHt9O1xuIl19