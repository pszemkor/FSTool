/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { InjectionToken } from '@angular/core';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/cdk/bidi';
export declare function MATERIAL_SANITY_CHECKS_FACTORY(): SanityChecks;
/** Injection token that configures whether the Material sanity checks are enabled. */
export declare const MATERIAL_SANITY_CHECKS: InjectionToken<SanityChecks>;
/**
 * Possible sanity checks that can be enabled. If set to
 * true/false, all checks will be enabled/disabled.
 */
export declare type SanityChecks = boolean | GranularSanityChecks;
/** Object that can be used to configure the sanity checks granularly. */
export interface GranularSanityChecks {
    doctype: boolean;
    theme: boolean;
    version: boolean;
    /**
     * @deprecated No longer being used.
     * @breaking-change 10.0.0
     */
    hammer: boolean;
}
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
export declare class MatCommonModule {
    /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
    private _hasDoneGlobalChecks;
    /** Configured sanity checks. */
    private _sanityChecks;
    /** Used to reference correct document/window */
    protected _document?: Document;
    constructor(highContrastModeDetector: HighContrastModeDetector, sanityChecks: any, 
    /** @breaking-change 11.0.0 make document required */
    document?: any);
    /** Access injected document if available or fallback to global document reference */
    private _getDocument;
    /** Use defaultView of injected document if available or fallback to global window reference */
    private _getWindow;
    /** Whether any sanity checks are enabled. */
    private _checksAreEnabled;
    /** Whether the code is running in tests. */
    private _isTestEnv;
    private _checkDoctypeIsDefined;
    private _checkThemeIsPresent;
    /** Checks whether the material version matches the cdk version */
    private _checkCdkVersionMatch;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<MatCommonModule, never, [typeof ɵngcc1.BidiModule], [typeof ɵngcc1.BidiModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<MatCommonModule>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5kLnRzIiwic291cmNlcyI6WyJjb21tb24tbW9kdWxlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBIaWdoQ29udHJhc3RNb2RlRGV0ZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIE1BVEVSSUFMX1NBTklUWV9DSEVDS1NfRkFDVE9SWSgpOiBTYW5pdHlDaGVja3M7XG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY29uZmlndXJlcyB3aGV0aGVyIHRoZSBNYXRlcmlhbCBzYW5pdHkgY2hlY2tzIGFyZSBlbmFibGVkLiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFURVJJQUxfU0FOSVRZX0NIRUNLUzogSW5qZWN0aW9uVG9rZW48U2FuaXR5Q2hlY2tzPjtcbi8qKlxuICogUG9zc2libGUgc2FuaXR5IGNoZWNrcyB0aGF0IGNhbiBiZSBlbmFibGVkLiBJZiBzZXQgdG9cbiAqIHRydWUvZmFsc2UsIGFsbCBjaGVja3Mgd2lsbCBiZSBlbmFibGVkL2Rpc2FibGVkLlxuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIFNhbml0eUNoZWNrcyA9IGJvb2xlYW4gfCBHcmFudWxhclNhbml0eUNoZWNrcztcbi8qKiBPYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlIHNhbml0eSBjaGVja3MgZ3JhbnVsYXJseS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JhbnVsYXJTYW5pdHlDaGVja3Mge1xuICAgIGRvY3R5cGU6IGJvb2xlYW47XG4gICAgdGhlbWU6IGJvb2xlYW47XG4gICAgdmVyc2lvbjogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBObyBsb25nZXIgYmVpbmcgdXNlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAqL1xuICAgIGhhbW1lcjogYm9vbGVhbjtcbn1cbi8qKlxuICogTW9kdWxlIHRoYXQgY2FwdHVyZXMgYW55dGhpbmcgdGhhdCBzaG91bGQgYmUgbG9hZGVkIGFuZC9vciBydW4gZm9yICphbGwqIEFuZ3VsYXIgTWF0ZXJpYWxcbiAqIGNvbXBvbmVudHMuIFRoaXMgaW5jbHVkZXMgQmlkaSwgZXRjLlxuICpcbiAqIFRoaXMgbW9kdWxlIHNob3VsZCBiZSBpbXBvcnRlZCB0byBlYWNoIHRvcC1sZXZlbCBjb21wb25lbnQgbW9kdWxlIChlLmcuLCBNYXRUYWJzTW9kdWxlKS5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0Q29tbW9uTW9kdWxlIHtcbiAgICAvKiogV2hldGhlciB3ZSd2ZSBkb25lIHRoZSBnbG9iYWwgc2FuaXR5IGNoZWNrcyAoZS5nLiBhIHRoZW1lIGlzIGxvYWRlZCwgdGhlcmUgaXMgYSBkb2N0eXBlKS4gKi9cbiAgICBwcml2YXRlIF9oYXNEb25lR2xvYmFsQ2hlY2tzO1xuICAgIC8qKiBDb25maWd1cmVkIHNhbml0eSBjaGVja3MuICovXG4gICAgcHJpdmF0ZSBfc2FuaXR5Q2hlY2tzO1xuICAgIC8qKiBVc2VkIHRvIHJlZmVyZW5jZSBjb3JyZWN0IGRvY3VtZW50L3dpbmRvdyAqL1xuICAgIHByb3RlY3RlZCBfZG9jdW1lbnQ/OiBEb2N1bWVudDtcbiAgICBjb25zdHJ1Y3RvcihoaWdoQ29udHJhc3RNb2RlRGV0ZWN0b3I6IEhpZ2hDb250cmFzdE1vZGVEZXRlY3Rvciwgc2FuaXR5Q2hlY2tzOiBhbnksIFxuICAgIC8qKiBAYnJlYWtpbmctY2hhbmdlIDExLjAuMCBtYWtlIGRvY3VtZW50IHJlcXVpcmVkICovXG4gICAgZG9jdW1lbnQ/OiBhbnkpO1xuICAgIC8qKiBBY2Nlc3MgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIGdsb2JhbCBkb2N1bWVudCByZWZlcmVuY2UgKi9cbiAgICBwcml2YXRlIF9nZXREb2N1bWVudDtcbiAgICAvKiogVXNlIGRlZmF1bHRWaWV3IG9mIGluamVjdGVkIGRvY3VtZW50IGlmIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byBnbG9iYWwgd2luZG93IHJlZmVyZW5jZSAqL1xuICAgIHByaXZhdGUgX2dldFdpbmRvdztcbiAgICAvKiogV2hldGhlciBhbnkgc2FuaXR5IGNoZWNrcyBhcmUgZW5hYmxlZC4gKi9cbiAgICBwcml2YXRlIF9jaGVja3NBcmVFbmFibGVkO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb2RlIGlzIHJ1bm5pbmcgaW4gdGVzdHMuICovXG4gICAgcHJpdmF0ZSBfaXNUZXN0RW52O1xuICAgIHByaXZhdGUgX2NoZWNrRG9jdHlwZUlzRGVmaW5lZDtcbiAgICBwcml2YXRlIF9jaGVja1RoZW1lSXNQcmVzZW50O1xuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgbWF0ZXJpYWwgdmVyc2lvbiBtYXRjaGVzIHRoZSBjZGsgdmVyc2lvbiAqL1xuICAgIHByaXZhdGUgX2NoZWNrQ2RrVmVyc2lvbk1hdGNoO1xufVxuIl19