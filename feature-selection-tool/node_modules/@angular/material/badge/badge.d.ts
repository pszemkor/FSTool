/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AriaDescriber } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { CanDisable, CanDisableCtor, ThemePalette } from '@angular/material/core';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
declare class MatBadgeBase {
}
declare const _MatBadgeMixinBase: CanDisableCtor & typeof MatBadgeBase;
/** Allowed position options for matBadgePosition */
export declare type MatBadgePosition = 'above after' | 'above before' | 'below before' | 'below after' | 'before' | 'after' | 'above' | 'below';
/** Allowed size options for matBadgeSize */
export declare type MatBadgeSize = 'small' | 'medium' | 'large';
/** Directive to display a text badge. */
export declare class MatBadge extends _MatBadgeMixinBase implements OnDestroy, OnChanges, CanDisable {
    private _ngZone;
    private _elementRef;
    private _ariaDescriber;
    private _renderer;
    private _animationMode?;
    /** Whether the badge has any content. */
    _hasContent: boolean;
    /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
    get color(): ThemePalette;
    set color(value: ThemePalette);
    private _color;
    /** Whether the badge should overlap its contents or not */
    get overlap(): boolean;
    set overlap(val: boolean);
    private _overlap;
    /**
     * Position the badge should reside.
     * Accepts any combination of 'above'|'below' and 'before'|'after'
     */
    position: MatBadgePosition;
    /** The content for the badge */
    content: string;
    /** Message used to describe the decorated element via aria-describedby */
    get description(): string;
    set description(newDescription: string);
    private _description;
    /** Size of the badge. Can be 'small', 'medium', or 'large'. */
    size: MatBadgeSize;
    /** Whether the badge is hidden. */
    get hidden(): boolean;
    set hidden(val: boolean);
    private _hidden;
    /** Unique id for the badge */
    _id: number;
    private _badgeElement;
    constructor(_ngZone: NgZone, _elementRef: ElementRef<HTMLElement>, _ariaDescriber: AriaDescriber, _renderer: Renderer2, _animationMode?: string | undefined);
    /** Whether the badge is above the host or not */
    isAbove(): boolean;
    /** Whether the badge is after the host or not */
    isAfter(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Gets the element into which the badge's content is being rendered.
     * Undefined if the element hasn't been created (e.g. if the badge doesn't have content).
     */
    getBadgeElement(): HTMLElement | undefined;
    /** Injects a span element into the DOM with the content. */
    private _updateTextContent;
    /** Creates the badge element */
    private _createBadgeElement;
    /** Sets the aria-label property on the element */
    private _updateHostAriaDescription;
    /** Adds css theme class given the color to the component host */
    private _setColor;
    /** Clears any existing badges that might be left over from server-side rendering. */
    private _clearExistingBadges;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_hidden: BooleanInput;
    static ngAcceptInputType_overlap: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatBadge, [null, null, null, null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatBadge, "[matBadge]", never, { "disabled": "matBadgeDisabled"; "position": "matBadgePosition"; "size": "matBadgeSize"; "color": "matBadgeColor"; "overlap": "matBadgeOverlap"; "description": "matBadgeDescription"; "hidden": "matBadgeHidden"; "content": "matBadge"; }, {}, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuZC50cyIsInNvdXJjZXMiOlsiYmFkZ2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBBcmlhRGVzY3JpYmVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmRlY2xhcmUgY2xhc3MgTWF0QmFkZ2VCYXNlIHtcbn1cbmRlY2xhcmUgY29uc3QgX01hdEJhZGdlTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNYXRCYWRnZUJhc2U7XG4vKiogQWxsb3dlZCBwb3NpdGlvbiBvcHRpb25zIGZvciBtYXRCYWRnZVBvc2l0aW9uICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIE1hdEJhZGdlUG9zaXRpb24gPSAnYWJvdmUgYWZ0ZXInIHwgJ2Fib3ZlIGJlZm9yZScgfCAnYmVsb3cgYmVmb3JlJyB8ICdiZWxvdyBhZnRlcicgfCAnYmVmb3JlJyB8ICdhZnRlcicgfCAnYWJvdmUnIHwgJ2JlbG93Jztcbi8qKiBBbGxvd2VkIHNpemUgb3B0aW9ucyBmb3IgbWF0QmFkZ2VTaXplICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIE1hdEJhZGdlU2l6ZSA9ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG4vKiogRGlyZWN0aXZlIHRvIGRpc3BsYXkgYSB0ZXh0IGJhZGdlLiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0QmFkZ2UgZXh0ZW5kcyBfTWF0QmFkZ2VNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQ2FuRGlzYWJsZSB7XG4gICAgcHJpdmF0ZSBfbmdab25lO1xuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfYXJpYURlc2NyaWJlcjtcbiAgICBwcml2YXRlIF9yZW5kZXJlcjtcbiAgICBwcml2YXRlIF9hbmltYXRpb25Nb2RlPztcbiAgICAvKiogV2hldGhlciB0aGUgYmFkZ2UgaGFzIGFueSBjb250ZW50LiAqL1xuICAgIF9oYXNDb250ZW50OiBib29sZWFuO1xuICAgIC8qKiBUaGUgY29sb3Igb2YgdGhlIGJhZGdlLiBDYW4gYmUgYHByaW1hcnlgLCBgYWNjZW50YCwgb3IgYHdhcm5gLiAqL1xuICAgIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGU7XG4gICAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpO1xuICAgIHByaXZhdGUgX2NvbG9yO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBiYWRnZSBzaG91bGQgb3ZlcmxhcCBpdHMgY29udGVudHMgb3Igbm90ICovXG4gICAgZ2V0IG92ZXJsYXAoKTogYm9vbGVhbjtcbiAgICBzZXQgb3ZlcmxhcCh2YWw6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX292ZXJsYXA7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gdGhlIGJhZGdlIHNob3VsZCByZXNpZGUuXG4gICAgICogQWNjZXB0cyBhbnkgY29tYmluYXRpb24gb2YgJ2Fib3ZlJ3wnYmVsb3cnIGFuZCAnYmVmb3JlJ3wnYWZ0ZXInXG4gICAgICovXG4gICAgcG9zaXRpb246IE1hdEJhZGdlUG9zaXRpb247XG4gICAgLyoqIFRoZSBjb250ZW50IGZvciB0aGUgYmFkZ2UgKi9cbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgLyoqIE1lc3NhZ2UgdXNlZCB0byBkZXNjcmliZSB0aGUgZGVjb3JhdGVkIGVsZW1lbnQgdmlhIGFyaWEtZGVzY3JpYmVkYnkgKi9cbiAgICBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nO1xuICAgIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbjogc3RyaW5nKTtcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvbjtcbiAgICAvKiogU2l6ZSBvZiB0aGUgYmFkZ2UuIENhbiBiZSAnc21hbGwnLCAnbWVkaXVtJywgb3IgJ2xhcmdlJy4gKi9cbiAgICBzaXplOiBNYXRCYWRnZVNpemU7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGJhZGdlIGlzIGhpZGRlbi4gKi9cbiAgICBnZXQgaGlkZGVuKCk6IGJvb2xlYW47XG4gICAgc2V0IGhpZGRlbih2YWw6IGJvb2xlYW4pO1xuICAgIHByaXZhdGUgX2hpZGRlbjtcbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGUgYmFkZ2UgKi9cbiAgICBfaWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9iYWRnZUVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IoX25nWm9uZTogTmdab25lLCBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIF9hcmlhRGVzY3JpYmVyOiBBcmlhRGVzY3JpYmVyLCBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQpO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBiYWRnZSBpcyBhYm92ZSB0aGUgaG9zdCBvciBub3QgKi9cbiAgICBpc0Fib3ZlKCk6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgdGhlIGJhZGdlIGlzIGFmdGVyIHRoZSBob3N0IG9yIG5vdCAqL1xuICAgIGlzQWZ0ZXIoKTogYm9vbGVhbjtcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZDtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGVsZW1lbnQgaW50byB3aGljaCB0aGUgYmFkZ2UncyBjb250ZW50IGlzIGJlaW5nIHJlbmRlcmVkLlxuICAgICAqIFVuZGVmaW5lZCBpZiB0aGUgZWxlbWVudCBoYXNuJ3QgYmVlbiBjcmVhdGVkIChlLmcuIGlmIHRoZSBiYWRnZSBkb2Vzbid0IGhhdmUgY29udGVudCkuXG4gICAgICovXG4gICAgZ2V0QmFkZ2VFbGVtZW50KCk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIC8qKiBJbmplY3RzIGEgc3BhbiBlbGVtZW50IGludG8gdGhlIERPTSB3aXRoIHRoZSBjb250ZW50LiAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZVRleHRDb250ZW50O1xuICAgIC8qKiBDcmVhdGVzIHRoZSBiYWRnZSBlbGVtZW50ICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlQmFkZ2VFbGVtZW50O1xuICAgIC8qKiBTZXRzIHRoZSBhcmlhLWxhYmVsIHByb3BlcnR5IG9uIHRoZSBlbGVtZW50ICovXG4gICAgcHJpdmF0ZSBfdXBkYXRlSG9zdEFyaWFEZXNjcmlwdGlvbjtcbiAgICAvKiogQWRkcyBjc3MgdGhlbWUgY2xhc3MgZ2l2ZW4gdGhlIGNvbG9yIHRvIHRoZSBjb21wb25lbnQgaG9zdCAqL1xuICAgIHByaXZhdGUgX3NldENvbG9yO1xuICAgIC8qKiBDbGVhcnMgYW55IGV4aXN0aW5nIGJhZGdlcyB0aGF0IG1pZ2h0IGJlIGxlZnQgb3ZlciBmcm9tIHNlcnZlci1zaWRlIHJlbmRlcmluZy4gKi9cbiAgICBwcml2YXRlIF9jbGVhckV4aXN0aW5nQmFkZ2VzO1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICAgIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWRkZW46IEJvb2xlYW5JbnB1dDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3ZlcmxhcDogQm9vbGVhbklucHV0O1xufVxuZXhwb3J0IHt9O1xuIl19