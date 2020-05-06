/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { QueryList, AfterContentInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { CdkAccordion } from '@angular/cdk/accordion';
import { MatAccordionBase, MatAccordionDisplayMode, MatAccordionTogglePosition } from './accordion-base';
import { MatExpansionPanelHeader } from './expansion-panel-header';
/**
 * Directive for a Material Design Accordion.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatAccordion extends CdkAccordion implements MatAccordionBase, AfterContentInit {
    private _keyManager;
    /** Headers belonging to this accordion. */
    private _ownHeaders;
    /** All headers inside the accordion. Includes headers inside nested accordions. */
    _headers: QueryList<MatExpansionPanelHeader>;
    /** Whether the expansion indicator should be hidden. */
    get hideToggle(): boolean;
    set hideToggle(show: boolean);
    private _hideToggle;
    /**
     * Display mode used for all expansion panels in the accordion. Currently two display
     * modes exist:
     *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
     *     panel at a different elevation from the rest of the accordion.
     *  flat - no spacing is placed around expanded panels, showing all panels at the same
     *     elevation.
     */
    displayMode: MatAccordionDisplayMode;
    /** The position of the expansion indicator. */
    togglePosition: MatAccordionTogglePosition;
    ngAfterContentInit(): void;
    /** Handles keyboard events coming in from the panel headers. */
    _handleHeaderKeydown(event: KeyboardEvent): void;
    _handleHeaderFocus(header: MatExpansionPanelHeader): void;
    static ngAcceptInputType_hideToggle: BooleanInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatAccordion, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatAccordion, "mat-accordion", ["matAccordion"], { "multi": "multi"; "displayMode": "displayMode"; "togglePosition": "togglePosition"; "hideToggle": "hideToggle"; }, {}, ["_headers"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmQudHMiLCJzb3VyY2VzIjpbImFjY29yZGlvbi5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgUXVlcnlMaXN0LCBBZnRlckNvbnRlbnRJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrQWNjb3JkaW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2FjY29yZGlvbic7XG5pbXBvcnQgeyBNYXRBY2NvcmRpb25CYXNlLCBNYXRBY2NvcmRpb25EaXNwbGF5TW9kZSwgTWF0QWNjb3JkaW9uVG9nZ2xlUG9zaXRpb24gfSBmcm9tICcuL2FjY29yZGlvbi1iYXNlJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvblBhbmVsSGVhZGVyIH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwtaGVhZGVyJztcbi8qKlxuICogRGlyZWN0aXZlIGZvciBhIE1hdGVyaWFsIERlc2lnbiBBY2NvcmRpb24uXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEFjY29yZGlvbiBleHRlbmRzIENka0FjY29yZGlvbiBpbXBsZW1lbnRzIE1hdEFjY29yZGlvbkJhc2UsIEFmdGVyQ29udGVudEluaXQge1xuICAgIHByaXZhdGUgX2tleU1hbmFnZXI7XG4gICAgLyoqIEhlYWRlcnMgYmVsb25naW5nIHRvIHRoaXMgYWNjb3JkaW9uLiAqL1xuICAgIHByaXZhdGUgX293bkhlYWRlcnM7XG4gICAgLyoqIEFsbCBoZWFkZXJzIGluc2lkZSB0aGUgYWNjb3JkaW9uLiBJbmNsdWRlcyBoZWFkZXJzIGluc2lkZSBuZXN0ZWQgYWNjb3JkaW9ucy4gKi9cbiAgICBfaGVhZGVyczogUXVlcnlMaXN0PE1hdEV4cGFuc2lvblBhbmVsSGVhZGVyPjtcbiAgICAvKiogV2hldGhlciB0aGUgZXhwYW5zaW9uIGluZGljYXRvciBzaG91bGQgYmUgaGlkZGVuLiAqL1xuICAgIGdldCBoaWRlVG9nZ2xlKCk6IGJvb2xlYW47XG4gICAgc2V0IGhpZGVUb2dnbGUoc2hvdzogYm9vbGVhbik7XG4gICAgcHJpdmF0ZSBfaGlkZVRvZ2dsZTtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IG1vZGUgdXNlZCBmb3IgYWxsIGV4cGFuc2lvbiBwYW5lbHMgaW4gdGhlIGFjY29yZGlvbi4gQ3VycmVudGx5IHR3byBkaXNwbGF5XG4gICAgICogbW9kZXMgZXhpc3Q6XG4gICAgICogIGRlZmF1bHQgLSBhIGd1dHRlci1saWtlIHNwYWNpbmcgaXMgcGxhY2VkIGFyb3VuZCBhbnkgZXhwYW5kZWQgcGFuZWwsIHBsYWNpbmcgdGhlIGV4cGFuZGVkXG4gICAgICogICAgIHBhbmVsIGF0IGEgZGlmZmVyZW50IGVsZXZhdGlvbiBmcm9tIHRoZSByZXN0IG9mIHRoZSBhY2NvcmRpb24uXG4gICAgICogIGZsYXQgLSBubyBzcGFjaW5nIGlzIHBsYWNlZCBhcm91bmQgZXhwYW5kZWQgcGFuZWxzLCBzaG93aW5nIGFsbCBwYW5lbHMgYXQgdGhlIHNhbWVcbiAgICAgKiAgICAgZWxldmF0aW9uLlxuICAgICAqL1xuICAgIGRpc3BsYXlNb2RlOiBNYXRBY2NvcmRpb25EaXNwbGF5TW9kZTtcbiAgICAvKiogVGhlIHBvc2l0aW9uIG9mIHRoZSBleHBhbnNpb24gaW5kaWNhdG9yLiAqL1xuICAgIHRvZ2dsZVBvc2l0aW9uOiBNYXRBY2NvcmRpb25Ub2dnbGVQb3NpdGlvbjtcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcbiAgICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgY29taW5nIGluIGZyb20gdGhlIHBhbmVsIGhlYWRlcnMuICovXG4gICAgX2hhbmRsZUhlYWRlcktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkO1xuICAgIF9oYW5kbGVIZWFkZXJGb2N1cyhoZWFkZXI6IE1hdEV4cGFuc2lvblBhbmVsSGVhZGVyKTogdm9pZDtcbiAgICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlkZVRvZ2dsZTogQm9vbGVhbklucHV0O1xufVxuIl19