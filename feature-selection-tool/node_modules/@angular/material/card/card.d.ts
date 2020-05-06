/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Content of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatCardContent {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardContent, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardContent, "mat-card-content, [mat-card-content], [matCardContent]", never, {}, {}, never>;
}
/**
 * Title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class MatCardTitle {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardTitle, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardTitle, "mat-card-title, [mat-card-title], [matCardTitle]", never, {}, {}, never>;
}
/**
 * Sub-title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class MatCardSubtitle {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardSubtitle, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardSubtitle, "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]", never, {}, {}, never>;
}
/**
 * Action section of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class MatCardActions {
    /** Position of the actions inside the card. */
    align: 'start' | 'end';
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardActions, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardActions, "mat-card-actions", ["matCardActions"], { "align": "align"; }, {}, never>;
}
/**
 * Footer of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
export declare class MatCardFooter {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardFooter, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardFooter, "mat-card-footer", never, {}, {}, never>;
}
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
export declare class MatCardImage {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardImage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardImage, "[mat-card-image], [matCardImage]", never, {}, {}, never>;
}
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
export declare class MatCardSmImage {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardSmImage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardSmImage, "[mat-card-sm-image], [matCardImageSmall]", never, {}, {}, never>;
}
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
export declare class MatCardMdImage {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardMdImage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardMdImage, "[mat-card-md-image], [matCardImageMedium]", never, {}, {}, never>;
}
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
export declare class MatCardLgImage {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardLgImage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardLgImage, "[mat-card-lg-image], [matCardImageLarge]", never, {}, {}, never>;
}
/**
 * Large image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
export declare class MatCardXlImage {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardXlImage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardXlImage, "[mat-card-xl-image], [matCardImageXLarge]", never, {}, {}, never>;
}
/**
 * Avatar image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
export declare class MatCardAvatar {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardAvatar, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatCardAvatar, "[mat-card-avatar], [matCardAvatar]", never, {}, {}, never>;
}
/**
 * A basic content container component that adds the styles of a Material design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * - mat-card-title
 * - mat-card-subtitle
 * - mat-card-content
 * - mat-card-actions
 * - mat-card-footer
 */
export declare class MatCard {
    _animationMode?: string | undefined;
    constructor(_animationMode?: string | undefined);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCard, [{ optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatCard, "mat-card", ["matCard"], {}, {}, never, ["*", "mat-card-footer"]>;
}
/**
 * Component intended to be used within the `<mat-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 * @docs-private
 */
export declare class MatCardHeader {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardHeader, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatCardHeader, "mat-card-header", never, {}, {}, never, ["[mat-card-avatar], [matCardAvatar]", "mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "*"]>;
}
/**
 * Component intended to be used within the `<mat-card>` component. It adds styles for a preset
 * layout that groups an image with a title section.
 * @docs-private
 */
export declare class MatCardTitleGroup {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatCardTitleGroup, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatCardTitleGroup, "mat-card-title-group", never, {}, {}, never, ["mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "img", "*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5kLnRzIiwic291cmNlcyI6WyJjYXJkLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIENvbnRlbnQgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q2FyZENvbnRlbnQge1xufVxuLyoqXG4gKiBUaXRsZSBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRDYXJkVGl0bGUge1xufVxuLyoqXG4gKiBTdWItdGl0bGUgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q2FyZFN1YnRpdGxlIHtcbn1cbi8qKlxuICogQWN0aW9uIHNlY3Rpb24gb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q2FyZEFjdGlvbnMge1xuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgYWN0aW9ucyBpbnNpZGUgdGhlIGNhcmQuICovXG4gICAgYWxpZ246ICdzdGFydCcgfCAnZW5kJztcbn1cbi8qKlxuICogRm9vdGVyIG9mIGEgY2FyZCwgbmVlZGVkIGFzIGl0J3MgdXNlZCBhcyBhIHNlbGVjdG9yIGluIHRoZSBBUEkuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENhcmRGb290ZXIge1xufVxuLyoqXG4gKiBJbWFnZSB1c2VkIGluIGEgY2FyZCwgbmVlZGVkIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q2FyZEltYWdlIHtcbn1cbi8qKlxuICogSW1hZ2UgdXNlZCBpbiBhIGNhcmQsIG5lZWRlZCB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENhcmRTbUltYWdlIHtcbn1cbi8qKlxuICogSW1hZ2UgdXNlZCBpbiBhIGNhcmQsIG5lZWRlZCB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENhcmRNZEltYWdlIHtcbn1cbi8qKlxuICogSW1hZ2UgdXNlZCBpbiBhIGNhcmQsIG5lZWRlZCB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENhcmRMZ0ltYWdlIHtcbn1cbi8qKlxuICogTGFyZ2UgaW1hZ2UgdXNlZCBpbiBhIGNhcmQsIG5lZWRlZCB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdENhcmRYbEltYWdlIHtcbn1cbi8qKlxuICogQXZhdGFyIGltYWdlIHVzZWQgaW4gYSBjYXJkLCBuZWVkZWQgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRDYXJkQXZhdGFyIHtcbn1cbi8qKlxuICogQSBiYXNpYyBjb250ZW50IGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBhZGRzIHRoZSBzdHlsZXMgb2YgYSBNYXRlcmlhbCBkZXNpZ24gY2FyZC5cbiAqXG4gKiBXaGlsZSB0aGlzIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBhbG9uZSwgaXQgYWxzbyBwcm92aWRlcyBhIG51bWJlclxuICogb2YgcHJlc2V0IHN0eWxlcyBmb3IgY29tbW9uIGNhcmQgc2VjdGlvbnMsIGluY2x1ZGluZzpcbiAqIC0gbWF0LWNhcmQtdGl0bGVcbiAqIC0gbWF0LWNhcmQtc3VidGl0bGVcbiAqIC0gbWF0LWNhcmQtY29udGVudFxuICogLSBtYXQtY2FyZC1hY3Rpb25zXG4gKiAtIG1hdC1jYXJkLWZvb3RlclxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRDYXJkIHtcbiAgICBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjb25zdHJ1Y3RvcihfYW5pbWF0aW9uTW9kZT86IHN0cmluZyB8IHVuZGVmaW5lZCk7XG59XG4vKipcbiAqIENvbXBvbmVudCBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiB0aGUgYDxtYXQtY2FyZD5gIGNvbXBvbmVudC4gSXQgYWRkcyBzdHlsZXMgZm9yIGFcbiAqIHByZXNldCBoZWFkZXIgc2VjdGlvbiAoaS5lLiBhIHRpdGxlLCBzdWJ0aXRsZSwgYW5kIGF2YXRhciBsYXlvdXQpLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRDYXJkSGVhZGVyIHtcbn1cbi8qKlxuICogQ29tcG9uZW50IGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aGluIHRoZSBgPG1hdC1jYXJkPmAgY29tcG9uZW50LiBJdCBhZGRzIHN0eWxlcyBmb3IgYSBwcmVzZXRcbiAqIGxheW91dCB0aGF0IGdyb3VwcyBhbiBpbWFnZSB3aXRoIGEgdGl0bGUgc2VjdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q2FyZFRpdGxlR3JvdXAge1xufVxuIl19