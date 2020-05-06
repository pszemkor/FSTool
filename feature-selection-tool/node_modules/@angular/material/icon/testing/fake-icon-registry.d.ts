/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
declare type PublicApi<T> = {
    [K in keyof T]: T[K] extends (...x: any[]) => T ? (...x: any[]) => PublicApi<T> : T[K];
};
/**
 * A null icon registry that must be imported to allow disabling of custom
 * icons.
 */
export declare class FakeMatIconRegistry implements PublicApi<MatIconRegistry>, OnDestroy {
    addSvgIcon(): this;
    addSvgIconLiteral(): this;
    addSvgIconInNamespace(): this;
    addSvgIconLiteralInNamespace(): this;
    addSvgIconSet(): this;
    addSvgIconSetLiteral(): this;
    addSvgIconSetInNamespace(): this;
    addSvgIconSetLiteralInNamespace(): this;
    registerFontClassAlias(): this;
    classNameForFontAlias(alias: string): string;
    getDefaultFontSetClass(): string;
    getSvgIconFromUrl(): Observable<SVGElement>;
    getNamedSvgIcon(): Observable<SVGElement>;
    setDefaultFontSetClass(): this;
    ngOnDestroy(): void;
    private _generateEmptySvg;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FakeMatIconRegistry, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<FakeMatIconRegistry>;
}
/** Import this module in tests to install the null icon registry. */
export declare class MatIconTestingModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<MatIconTestingModule, never, never, never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<MatIconTestingModule>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1pY29uLXJlZ2lzdHJ5LmQudHMiLCJzb3VyY2VzIjpbImZha2UtaWNvbi1yZWdpc3RyeS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuZGVjbGFyZSB0eXBlIFB1YmxpY0FwaTxUPiA9IHtcbiAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzICguLi54OiBhbnlbXSkgPT4gVCA/ICguLi54OiBhbnlbXSkgPT4gUHVibGljQXBpPFQ+IDogVFtLXTtcbn07XG4vKipcbiAqIEEgbnVsbCBpY29uIHJlZ2lzdHJ5IHRoYXQgbXVzdCBiZSBpbXBvcnRlZCB0byBhbGxvdyBkaXNhYmxpbmcgb2YgY3VzdG9tXG4gKiBpY29ucy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRmFrZU1hdEljb25SZWdpc3RyeSBpbXBsZW1lbnRzIFB1YmxpY0FwaTxNYXRJY29uUmVnaXN0cnk+LCBPbkRlc3Ryb3kge1xuICAgIGFkZFN2Z0ljb24oKTogdGhpcztcbiAgICBhZGRTdmdJY29uTGl0ZXJhbCgpOiB0aGlzO1xuICAgIGFkZFN2Z0ljb25Jbk5hbWVzcGFjZSgpOiB0aGlzO1xuICAgIGFkZFN2Z0ljb25MaXRlcmFsSW5OYW1lc3BhY2UoKTogdGhpcztcbiAgICBhZGRTdmdJY29uU2V0KCk6IHRoaXM7XG4gICAgYWRkU3ZnSWNvblNldExpdGVyYWwoKTogdGhpcztcbiAgICBhZGRTdmdJY29uU2V0SW5OYW1lc3BhY2UoKTogdGhpcztcbiAgICBhZGRTdmdJY29uU2V0TGl0ZXJhbEluTmFtZXNwYWNlKCk6IHRoaXM7XG4gICAgcmVnaXN0ZXJGb250Q2xhc3NBbGlhcygpOiB0aGlzO1xuICAgIGNsYXNzTmFtZUZvckZvbnRBbGlhcyhhbGlhczogc3RyaW5nKTogc3RyaW5nO1xuICAgIGdldERlZmF1bHRGb250U2V0Q2xhc3MoKTogc3RyaW5nO1xuICAgIGdldFN2Z0ljb25Gcm9tVXJsKCk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD47XG4gICAgZ2V0TmFtZWRTdmdJY29uKCk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD47XG4gICAgc2V0RGVmYXVsdEZvbnRTZXRDbGFzcygpOiB0aGlzO1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XG4gICAgcHJpdmF0ZSBfZ2VuZXJhdGVFbXB0eVN2Zztcbn1cbi8qKiBJbXBvcnQgdGhpcyBtb2R1bGUgaW4gdGVzdHMgdG8gaW5zdGFsbCB0aGUgbnVsbCBpY29uIHJlZ2lzdHJ5LiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0SWNvblRlc3RpbmdNb2R1bGUge1xufVxuZXhwb3J0IHt9O1xuIl19