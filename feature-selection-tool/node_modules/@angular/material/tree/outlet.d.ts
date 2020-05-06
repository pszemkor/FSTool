/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { ViewContainerRef } from '@angular/core';
/**
 * Outlet for nested CdkNode. Put `[matTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatTreeNodeOutlet implements CdkTreeNodeOutlet {
    viewContainer: ViewContainerRef;
    _node?: any;
    constructor(viewContainer: ViewContainerRef, _node?: any);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatTreeNodeOutlet, [null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatTreeNodeOutlet, "[matTreeNodeOutlet]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LmQudHMiLCJzb3VyY2VzIjpbIm91dGxldC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKipcbiAqIE91dGxldCBmb3IgbmVzdGVkIENka05vZGUuIFB1dCBgW21hdFRyZWVOb2RlT3V0bGV0XWAgb24gYSB0YWcgdG8gcGxhY2UgY2hpbGRyZW4gZGF0YU5vZGVzXG4gKiBpbnNpZGUgdGhlIG91dGxldC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0VHJlZU5vZGVPdXRsZXQgaW1wbGVtZW50cyBDZGtUcmVlTm9kZU91dGxldCB7XG4gICAgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgICBfbm9kZT86IGFueTtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBfbm9kZT86IGFueSk7XG59XG4iXX0=