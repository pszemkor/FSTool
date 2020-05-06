/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Observable } from 'rxjs';
import { NgControl } from '@angular/forms';
/** An interface which allows a control to work inside of a `MatFormField`. */
import * as ɵngcc0 from '@angular/core';
export declare abstract class MatFormFieldControl<T> {
    /** The value of the control. */
    value: T | null;
    /**
     * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
     * needs to run change detection.
     */
    readonly stateChanges: Observable<void>;
    /** The element ID for this control. */
    readonly id: string;
    /** The placeholder for this control. */
    readonly placeholder: string;
    /** Gets the NgControl for this control. */
    readonly ngControl: NgControl | null;
    /** Whether the control is focused. */
    readonly focused: boolean;
    /** Whether the control is empty. */
    readonly empty: boolean;
    /** Whether the `MatFormField` label should try to float. */
    readonly shouldLabelFloat: boolean;
    /** Whether the control is required. */
    readonly required: boolean;
    /** Whether the control is disabled. */
    readonly disabled: boolean;
    /** Whether the control is in an error state. */
    readonly errorState: boolean;
    /**
     * An optional name for the control type that can be used to distinguish `mat-form-field` elements
     * based on their control type. The form field will add a class,
     * `mat-form-field-type-{{controlType}}` to its root element.
     */
    readonly controlType?: string;
    /**
     * Whether the input is currently in an autofilled state. If property is not present on the
     * control it is assumed to be false.
     */
    readonly autofilled?: boolean;
    /** Sets the list of element IDs that currently describe this control. */
    abstract setDescribedByIds(ids: string[]): void;
    /** Handles a click on the control's container. */
    abstract onContainerClick(event: MouseEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatFormFieldControl<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatFormFieldControl<any>, never, never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1jb250cm9sLmQudHMiLCJzb3VyY2VzIjpbImZvcm0tZmllbGQtY29udHJvbC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vKiogQW4gaW50ZXJmYWNlIHdoaWNoIGFsbG93cyBhIGNvbnRyb2wgdG8gd29yayBpbnNpZGUgb2YgYSBgTWF0Rm9ybUZpZWxkYC4gKi9cbmV4cG9ydCBkZWNsYXJlIGFic3RyYWN0IGNsYXNzIE1hdEZvcm1GaWVsZENvbnRyb2w8VD4ge1xuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wuICovXG4gICAgdmFsdWU6IFQgfCBudWxsO1xuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBzdGF0ZSBvZiB0aGUgY29udHJvbCBjaGFuZ2VzIHN1Y2ggdGhhdCB0aGUgcGFyZW50IGBNYXRGb3JtRmllbGRgXG4gICAgICogbmVlZHMgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAgIC8qKiBUaGUgZWxlbWVudCBJRCBmb3IgdGhpcyBjb250cm9sLiAqL1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG4gICAgLyoqIFRoZSBwbGFjZWhvbGRlciBmb3IgdGhpcyBjb250cm9sLiAqL1xuICAgIHJlYWRvbmx5IHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgLyoqIEdldHMgdGhlIE5nQ29udHJvbCBmb3IgdGhpcyBjb250cm9sLiAqL1xuICAgIHJlYWRvbmx5IG5nQ29udHJvbDogTmdDb250cm9sIHwgbnVsbDtcbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IGZvY3VzZWQ6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZW1wdHkuICovXG4gICAgcmVhZG9ubHkgZW1wdHk6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGBNYXRGb3JtRmllbGRgIGxhYmVsIHNob3VsZCB0cnkgdG8gZmxvYXQuICovXG4gICAgcmVhZG9ubHkgc2hvdWxkTGFiZWxGbG9hdDogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyByZXF1aXJlZC4gKi9cbiAgICByZWFkb25seSByZXF1aXJlZDogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBkaXNhYmxlZC4gKi9cbiAgICByZWFkb25seSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBpbiBhbiBlcnJvciBzdGF0ZS4gKi9cbiAgICByZWFkb25seSBlcnJvclN0YXRlOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEFuIG9wdGlvbmFsIG5hbWUgZm9yIHRoZSBjb250cm9sIHR5cGUgdGhhdCBjYW4gYmUgdXNlZCB0byBkaXN0aW5ndWlzaCBgbWF0LWZvcm0tZmllbGRgIGVsZW1lbnRzXG4gICAgICogYmFzZWQgb24gdGhlaXIgY29udHJvbCB0eXBlLiBUaGUgZm9ybSBmaWVsZCB3aWxsIGFkZCBhIGNsYXNzLFxuICAgICAqIGBtYXQtZm9ybS1maWVsZC10eXBlLXt7Y29udHJvbFR5cGV9fWAgdG8gaXRzIHJvb3QgZWxlbWVudC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250cm9sVHlwZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBjdXJyZW50bHkgaW4gYW4gYXV0b2ZpbGxlZCBzdGF0ZS4gSWYgcHJvcGVydHkgaXMgbm90IHByZXNlbnQgb24gdGhlXG4gICAgICogY29udHJvbCBpdCBpcyBhc3N1bWVkIHRvIGJlIGZhbHNlLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGF1dG9maWxsZWQ/OiBib29sZWFuO1xuICAgIC8qKiBTZXRzIHRoZSBsaXN0IG9mIGVsZW1lbnQgSURzIHRoYXQgY3VycmVudGx5IGRlc2NyaWJlIHRoaXMgY29udHJvbC4gKi9cbiAgICBhYnN0cmFjdCBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKTogdm9pZDtcbiAgICAvKiogSGFuZGxlcyBhIGNsaWNrIG9uIHRoZSBjb250cm9sJ3MgY29udGFpbmVyLiAqL1xuICAgIGFic3RyYWN0IG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkO1xufVxuIl19