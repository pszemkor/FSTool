/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, ChangeDetectorRef, ComponentFactoryResolver, Injector, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Menu content that will be rendered lazily once the menu is opened.
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatMenuContent implements OnDestroy {
    private _template;
    private _componentFactoryResolver;
    private _appRef;
    private _injector;
    private _viewContainerRef;
    private _document;
    private _changeDetectorRef?;
    private _portal;
    private _outlet;
    /** Emits when the menu content has been attached. */
    _attached: Subject<void>;
    constructor(_template: TemplateRef<any>, _componentFactoryResolver: ComponentFactoryResolver, _appRef: ApplicationRef, _injector: Injector, _viewContainerRef: ViewContainerRef, _document: any, _changeDetectorRef?: ChangeDetectorRef | undefined);
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    attach(context?: any): void;
    /**
     * Detaches the content.
     * @docs-private
     */
    detach(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatMenuContent, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatMenuContent, "ng-template[matMenuContent]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb250ZW50LmQudHMiLCJzb3VyY2VzIjpbIm1lbnUtY29udGVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0b3IsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbi8qKlxuICogTWVudSBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkgb25jZSB0aGUgbWVudSBpcyBvcGVuZWQuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdE1lbnVDb250ZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF90ZW1wbGF0ZTtcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI7XG4gICAgcHJpdmF0ZSBfYXBwUmVmO1xuICAgIHByaXZhdGUgX2luamVjdG9yO1xuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY7XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ7XG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY/O1xuICAgIHByaXZhdGUgX3BvcnRhbDtcbiAgICBwcml2YXRlIF9vdXRsZXQ7XG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIG1lbnUgY29udGVudCBoYXMgYmVlbiBhdHRhY2hlZC4gKi9cbiAgICBfYXR0YWNoZWQ6IFN1YmplY3Q8dm9pZD47XG4gICAgY29uc3RydWN0b3IoX3RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LCBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIF9hcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBfaW5qZWN0b3I6IEluamVjdG9yLCBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgX2RvY3VtZW50OiBhbnksIF9jaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmIHwgdW5kZWZpbmVkKTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgY29udGVudCB3aXRoIGEgcGFydGljdWxhciBjb250ZXh0LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2goY29udGV4dD86IGFueSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgdGhlIGNvbnRlbnQuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGRldGFjaCgpOiB2b2lkO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG59XG4iXX0=