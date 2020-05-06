/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, OnDestroy } from '@angular/core';
import { CanDisable, CanDisableCtor, CanDisableRipple, CanDisableRippleCtor } from '@angular/material/core';
import { Subject } from 'rxjs';
import { MatMenuPanel } from './menu-panel';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
declare class MatMenuItemBase {
}
declare const _MatMenuItemMixinBase: CanDisableRippleCtor & CanDisableCtor & typeof MatMenuItemBase;
/**
 * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
 */
export declare class MatMenuItem extends _MatMenuItemMixinBase implements FocusableOption, CanDisable, CanDisableRipple, OnDestroy {
    private _elementRef;
    private _focusMonitor?;
    _parentMenu?: MatMenuPanel<MatMenuItem> | undefined;
    /** ARIA role for the menu item. */
    role: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox';
    private _document;
    /** Stream that emits when the menu item is hovered. */
    readonly _hovered: Subject<MatMenuItem>;
    /** Stream that emits when the menu item is focused. */
    readonly _focused: Subject<MatMenuItem>;
    /** Whether the menu item is highlighted. */
    _highlighted: boolean;
    /** Whether the menu item acts as a trigger for a sub-menu. */
    _triggersSubmenu: boolean;
    constructor(_elementRef: ElementRef<HTMLElement>, document?: any, _focusMonitor?: FocusMonitor | undefined, _parentMenu?: MatMenuPanel<MatMenuItem> | undefined);
    /** Focuses the menu item. */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    ngOnDestroy(): void;
    /** Used to set the `tabindex`. */
    _getTabIndex(): string;
    /** Returns the host DOM element. */
    _getHostElement(): HTMLElement;
    /** Prevents the default element actions if it is disabled. */
    _checkDisabled(event: Event): void;
    /** Emits to the hover stream. */
    _handleMouseEnter(): void;
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatMenuItem, [null, null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatMenuItem, "[mat-menu-item]", ["matMenuItem"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "role": "role"; }, {}, never, ["*"]>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmQudHMiLCJzb3VyY2VzIjpbIm1lbnUtaXRlbS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEZvY3VzYWJsZU9wdGlvbiwgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBDYW5EaXNhYmxlUmlwcGxlLCBDYW5EaXNhYmxlUmlwcGxlQ3RvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0TWVudVBhbmVsIH0gZnJvbSAnLi9tZW51LXBhbmVsJztcbi8qKiBAZG9jcy1wcml2YXRlICovXG5kZWNsYXJlIGNsYXNzIE1hdE1lbnVJdGVtQmFzZSB7XG59XG5kZWNsYXJlIGNvbnN0IF9NYXRNZW51SXRlbU1peGluQmFzZTogQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNYXRNZW51SXRlbUJhc2U7XG4vKipcbiAqIFNpbmdsZSBpdGVtIGluc2lkZSBvZiBhIGBtYXQtbWVudWAuIFByb3ZpZGVzIHRoZSBtZW51IGl0ZW0gc3R5bGluZyBhbmQgYWNjZXNzaWJpbGl0eSB0cmVhdG1lbnQuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdE1lbnVJdGVtIGV4dGVuZHMgX01hdE1lbnVJdGVtTWl4aW5CYXNlIGltcGxlbWVudHMgRm9jdXNhYmxlT3B0aW9uLCBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlUmlwcGxlLCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yPztcbiAgICBfcGFyZW50TWVudT86IE1hdE1lbnVQYW5lbDxNYXRNZW51SXRlbT4gfCB1bmRlZmluZWQ7XG4gICAgLyoqIEFSSUEgcm9sZSBmb3IgdGhlIG1lbnUgaXRlbS4gKi9cbiAgICByb2xlOiAnbWVudWl0ZW0nIHwgJ21lbnVpdGVtcmFkaW8nIHwgJ21lbnVpdGVtY2hlY2tib3gnO1xuICAgIHByaXZhdGUgX2RvY3VtZW50O1xuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBtZW51IGl0ZW0gaXMgaG92ZXJlZC4gKi9cbiAgICByZWFkb25seSBfaG92ZXJlZDogU3ViamVjdDxNYXRNZW51SXRlbT47XG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIG1lbnUgaXRlbSBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IF9mb2N1c2VkOiBTdWJqZWN0PE1hdE1lbnVJdGVtPjtcbiAgICAvKiogV2hldGhlciB0aGUgbWVudSBpdGVtIGlzIGhpZ2hsaWdodGVkLiAqL1xuICAgIF9oaWdobGlnaHRlZDogYm9vbGVhbjtcbiAgICAvKiogV2hldGhlciB0aGUgbWVudSBpdGVtIGFjdHMgYXMgYSB0cmlnZ2VyIGZvciBhIHN1Yi1tZW51LiAqL1xuICAgIF90cmlnZ2Vyc1N1Ym1lbnU6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBkb2N1bWVudD86IGFueSwgX2ZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvciB8IHVuZGVmaW5lZCwgX3BhcmVudE1lbnU/OiBNYXRNZW51UGFuZWw8TWF0TWVudUl0ZW0+IHwgdW5kZWZpbmVkKTtcbiAgICAvKiogRm9jdXNlcyB0aGUgbWVudSBpdGVtLiAqL1xuICAgIGZvY3VzKG9yaWdpbj86IEZvY3VzT3JpZ2luLCBvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKiBVc2VkIHRvIHNldCB0aGUgYHRhYmluZGV4YC4gKi9cbiAgICBfZ2V0VGFiSW5kZXgoKTogc3RyaW5nO1xuICAgIC8qKiBSZXR1cm5zIHRoZSBob3N0IERPTSBlbGVtZW50LiAqL1xuICAgIF9nZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudDtcbiAgICAvKiogUHJldmVudHMgdGhlIGRlZmF1bHQgZWxlbWVudCBhY3Rpb25zIGlmIGl0IGlzIGRpc2FibGVkLiAqL1xuICAgIF9jaGVja0Rpc2FibGVkKGV2ZW50OiBFdmVudCk6IHZvaWQ7XG4gICAgLyoqIEVtaXRzIHRvIHRoZSBob3ZlciBzdHJlYW0uICovXG4gICAgX2hhbmRsZU1vdXNlRW50ZXIoKTogdm9pZDtcbiAgICAvKiogR2V0cyB0aGUgbGFiZWwgdG8gYmUgdXNlZCB3aGVuIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG9wdGlvbiBzaG91bGQgYmUgZm9jdXNlZC4gKi9cbiAgICBnZXRMYWJlbCgpOiBzdHJpbmc7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gICAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==