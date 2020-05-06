/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Optional, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
/**
 * Returns an exception to be thrown in the case when attempting to
 * load an icon with a name that cannot be found.
 * @docs-private
 */
import * as ɵngcc0 from '@angular/core';
export declare function getMatIconNameNotFoundError(iconName: string): Error;
/**
 * Returns an exception to be thrown when the consumer attempts to use
 * `<mat-icon>` without including @angular/common/http.
 * @docs-private
 */
export declare function getMatIconNoHttpProviderError(): Error;
/**
 * Returns an exception to be thrown when a URL couldn't be sanitized.
 * @param url URL that was attempted to be sanitized.
 * @docs-private
 */
export declare function getMatIconFailedToSanitizeUrlError(url: SafeResourceUrl): Error;
/**
 * Returns an exception to be thrown when a HTML string couldn't be sanitized.
 * @param literal HTML that was attempted to be sanitized.
 * @docs-private
 */
export declare function getMatIconFailedToSanitizeLiteralError(literal: SafeHtml): Error;
/** Options that can be used to configure how an icon or the icons in an icon set are presented. */
export interface IconOptions {
    /** View box to set on the icon. */
    viewBox?: string;
}
/**
 * Service to register and display icons used by the `<mat-icon>` component.
 * - Registers icon URLs by namespace and name.
 * - Registers icon set URLs by namespace.
 * - Registers aliases for CSS classes, for use with icon fonts.
 * - Loads icons from URLs and extracts individual icons from icon sets.
 */
export declare class MatIconRegistry implements OnDestroy {
    private _httpClient;
    private _sanitizer;
    private readonly _errorHandler?;
    private _document;
    /**
     * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
     */
    private _svgIconConfigs;
    /**
     * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
     * Multiple icon sets can be registered under the same namespace.
     */
    private _iconSetConfigs;
    /** Cache for icons loaded by direct URLs. */
    private _cachedIconsByUrl;
    /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
    private _inProgressUrlFetches;
    /** Map from font identifiers to their CSS class names. Used for icon fonts. */
    private _fontCssClassesByAlias;
    /**
     * The CSS class to apply when an `<mat-icon>` component has no icon name, url, or font specified.
     * The default 'material-icons' value assumes that the material icon font has been loaded as
     * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
     */
    private _defaultFontSetClass;
    constructor(_httpClient: HttpClient, _sanitizer: DomSanitizer, document: any, _errorHandler?: ErrorHandler | undefined);
    /**
     * Registers an icon by URL in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    addSvgIcon(iconName: string, url: SafeResourceUrl, options?: IconOptions): this;
    /**
     * Registers an icon using an HTML string in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    addSvgIconLiteral(iconName: string, literal: SafeHtml, options?: IconOptions): this;
    /**
     * Registers an icon by URL in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    addSvgIconInNamespace(namespace: string, iconName: string, url: SafeResourceUrl, options?: IconOptions): this;
    /**
     * Registers an icon using an HTML string in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    addSvgIconLiteralInNamespace(namespace: string, iconName: string, literal: SafeHtml, options?: IconOptions): this;
    /**
     * Registers an icon set by URL in the default namespace.
     * @param url
     */
    addSvgIconSet(url: SafeResourceUrl, options?: IconOptions): this;
    /**
     * Registers an icon set using an HTML string in the default namespace.
     * @param literal SVG source of the icon set.
     */
    addSvgIconSetLiteral(literal: SafeHtml, options?: IconOptions): this;
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param url
     */
    addSvgIconSetInNamespace(namespace: string, url: SafeResourceUrl, options?: IconOptions): this;
    /**
     * Registers an icon set using an HTML string in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param literal SVG source of the icon set.
     */
    addSvgIconSetLiteralInNamespace(namespace: string, literal: SafeHtml, options?: IconOptions): this;
    /**
     * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the `<mat-icon>` element.
     *
     * @param alias Alias for the font.
     * @param className Class name override to be used instead of the alias.
     */
    registerFontClassAlias(alias: string, className?: string): this;
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     */
    classNameForFontAlias(alias: string): string;
    /**
     * Sets the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     *
     * @param className
     */
    setDefaultFontSetClass(className: string): this;
    /**
     * Returns the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    getDefaultFontSetClass(): string;
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param safeUrl URL from which to fetch the SVG icon.
     */
    getSvgIconFromUrl(safeUrl: SafeResourceUrl): Observable<SVGElement>;
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param name Name of the icon to be retrieved.
     * @param namespace Namespace in which to look for the icon.
     */
    getNamedSvgIcon(name: string, namespace?: string): Observable<SVGElement>;
    ngOnDestroy(): void;
    /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     */
    private _getSvgFromConfig;
    /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new `<svg>` element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * an error if no icon with the specified name can be found.
     */
    private _getSvgFromIconSetConfigs;
    /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    private _extractIconWithNameFromAnySet;
    /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    private _loadSvgIconFromConfig;
    /**
     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    private _loadSvgIconSetFromConfig;
    /**
     * Creates a DOM element from the given SVG string, and adds default attributes.
     */
    private _createSvgElementForSingleIcon;
    /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    private _extractSvgIconFromSet;
    /**
     * Creates a DOM element from the given SVG string.
     */
    private _svgElementFromString;
    /**
     * Converts an element into an SVG node by cloning all of its children.
     */
    private _toSvgElement;
    /**
     * Sets the default attributes for an SVG element to be used as an icon.
     */
    private _setSvgAttributes;
    /**
     * Returns an Observable which produces the string contents of the given URL. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     */
    private _fetchUrl;
    /**
     * Registers an icon config by name in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param iconName Name under which to register the config.
     * @param config Config to be registered.
     */
    private _addSvgIconConfig;
    /**
     * Registers an icon set config in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param config Config to be registered.
     */
    private _addSvgIconSetConfig;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatIconRegistry, [{ optional: true; }, null, { optional: true; }, { optional: true; }]>;
}
/** @docs-private */
export declare function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry: MatIconRegistry, httpClient: HttpClient, sanitizer: DomSanitizer, document?: any, errorHandler?: ErrorHandler): MatIconRegistry;
/** @docs-private */
export declare const ICON_REGISTRY_PROVIDER: {
    provide: typeof MatIconRegistry;
    deps: (Optional[] | typeof DomSanitizer)[];
    useFactory: typeof ICON_REGISTRY_PROVIDER_FACTORY;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1yZWdpc3RyeS5kLnRzIiwic291cmNlcyI6WyJpY29uLXJlZ2lzdHJ5LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBPcHRpb25hbCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbi8qKlxuICogUmV0dXJucyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duIGluIHRoZSBjYXNlIHdoZW4gYXR0ZW1wdGluZyB0b1xuICogbG9hZCBhbiBpY29uIHdpdGggYSBuYW1lIHRoYXQgY2Fubm90IGJlIGZvdW5kLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBnZXRNYXRJY29uTmFtZU5vdEZvdW5kRXJyb3IoaWNvbk5hbWU6IHN0cmluZyk6IEVycm9yO1xuLyoqXG4gKiBSZXR1cm5zIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gd2hlbiB0aGUgY29uc3VtZXIgYXR0ZW1wdHMgdG8gdXNlXG4gKiBgPG1hdC1pY29uPmAgd2l0aG91dCBpbmNsdWRpbmcgQGFuZ3VsYXIvY29tbW9uL2h0dHAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGdldE1hdEljb25Ob0h0dHBQcm92aWRlckVycm9yKCk6IEVycm9yO1xuLyoqXG4gKiBSZXR1cm5zIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gd2hlbiBhIFVSTCBjb3VsZG4ndCBiZSBzYW5pdGl6ZWQuXG4gKiBAcGFyYW0gdXJsIFVSTCB0aGF0IHdhcyBhdHRlbXB0ZWQgdG8gYmUgc2FuaXRpemVkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBnZXRNYXRJY29uRmFpbGVkVG9TYW5pdGl6ZVVybEVycm9yKHVybDogU2FmZVJlc291cmNlVXJsKTogRXJyb3I7XG4vKipcbiAqIFJldHVybnMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biB3aGVuIGEgSFRNTCBzdHJpbmcgY291bGRuJ3QgYmUgc2FuaXRpemVkLlxuICogQHBhcmFtIGxpdGVyYWwgSFRNTCB0aGF0IHdhcyBhdHRlbXB0ZWQgdG8gYmUgc2FuaXRpemVkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBnZXRNYXRJY29uRmFpbGVkVG9TYW5pdGl6ZUxpdGVyYWxFcnJvcihsaXRlcmFsOiBTYWZlSHRtbCk6IEVycm9yO1xuLyoqIE9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgaG93IGFuIGljb24gb3IgdGhlIGljb25zIGluIGFuIGljb24gc2V0IGFyZSBwcmVzZW50ZWQuICovXG5leHBvcnQgaW50ZXJmYWNlIEljb25PcHRpb25zIHtcbiAgICAvKiogVmlldyBib3ggdG8gc2V0IG9uIHRoZSBpY29uLiAqL1xuICAgIHZpZXdCb3g/OiBzdHJpbmc7XG59XG4vKipcbiAqIFNlcnZpY2UgdG8gcmVnaXN0ZXIgYW5kIGRpc3BsYXkgaWNvbnMgdXNlZCBieSB0aGUgYDxtYXQtaWNvbj5gIGNvbXBvbmVudC5cbiAqIC0gUmVnaXN0ZXJzIGljb24gVVJMcyBieSBuYW1lc3BhY2UgYW5kIG5hbWUuXG4gKiAtIFJlZ2lzdGVycyBpY29uIHNldCBVUkxzIGJ5IG5hbWVzcGFjZS5cbiAqIC0gUmVnaXN0ZXJzIGFsaWFzZXMgZm9yIENTUyBjbGFzc2VzLCBmb3IgdXNlIHdpdGggaWNvbiBmb250cy5cbiAqIC0gTG9hZHMgaWNvbnMgZnJvbSBVUkxzIGFuZCBleHRyYWN0cyBpbmRpdmlkdWFsIGljb25zIGZyb20gaWNvbiBzZXRzLlxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRJY29uUmVnaXN0cnkgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgX2h0dHBDbGllbnQ7XG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2Vycm9ySGFuZGxlcj87XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ7XG4gICAgLyoqXG4gICAgICogVVJMcyBhbmQgY2FjaGVkIFNWRyBlbGVtZW50cyBmb3IgaW5kaXZpZHVhbCBpY29ucy4gS2V5cyBhcmUgb2YgdGhlIGZvcm1hdCBcIltuYW1lc3BhY2VdOltpY29uXVwiLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3N2Z0ljb25Db25maWdzO1xuICAgIC8qKlxuICAgICAqIFN2Z0ljb25Db25maWcgb2JqZWN0cyBhbmQgY2FjaGVkIFNWRyBlbGVtZW50cyBmb3IgaWNvbiBzZXRzLCBrZXllZCBieSBuYW1lc3BhY2UuXG4gICAgICogTXVsdGlwbGUgaWNvbiBzZXRzIGNhbiBiZSByZWdpc3RlcmVkIHVuZGVyIHRoZSBzYW1lIG5hbWVzcGFjZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9pY29uU2V0Q29uZmlncztcbiAgICAvKiogQ2FjaGUgZm9yIGljb25zIGxvYWRlZCBieSBkaXJlY3QgVVJMcy4gKi9cbiAgICBwcml2YXRlIF9jYWNoZWRJY29uc0J5VXJsO1xuICAgIC8qKiBJbi1wcm9ncmVzcyBpY29uIGZldGNoZXMuIFVzZWQgdG8gY29hbGVzY2UgbXVsdGlwbGUgcmVxdWVzdHMgdG8gdGhlIHNhbWUgVVJMLiAqL1xuICAgIHByaXZhdGUgX2luUHJvZ3Jlc3NVcmxGZXRjaGVzO1xuICAgIC8qKiBNYXAgZnJvbSBmb250IGlkZW50aWZpZXJzIHRvIHRoZWlyIENTUyBjbGFzcyBuYW1lcy4gVXNlZCBmb3IgaWNvbiBmb250cy4gKi9cbiAgICBwcml2YXRlIF9mb250Q3NzQ2xhc3Nlc0J5QWxpYXM7XG4gICAgLyoqXG4gICAgICogVGhlIENTUyBjbGFzcyB0byBhcHBseSB3aGVuIGFuIGA8bWF0LWljb24+YCBjb21wb25lbnQgaGFzIG5vIGljb24gbmFtZSwgdXJsLCBvciBmb250IHNwZWNpZmllZC5cbiAgICAgKiBUaGUgZGVmYXVsdCAnbWF0ZXJpYWwtaWNvbnMnIHZhbHVlIGFzc3VtZXMgdGhhdCB0aGUgbWF0ZXJpYWwgaWNvbiBmb250IGhhcyBiZWVuIGxvYWRlZCBhc1xuICAgICAqIGRlc2NyaWJlZCBhdCBodHRwOi8vZ29vZ2xlLmdpdGh1Yi5pby9tYXRlcmlhbC1kZXNpZ24taWNvbnMvI2ljb24tZm9udC1mb3ItdGhlLXdlYlxuICAgICAqL1xuICAgIHByaXZhdGUgX2RlZmF1bHRGb250U2V0Q2xhc3M7XG4gICAgY29uc3RydWN0b3IoX2h0dHBDbGllbnQ6IEh0dHBDbGllbnQsIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplciwgZG9jdW1lbnQ6IGFueSwgX2Vycm9ySGFuZGxlcj86IEVycm9ySGFuZGxlciB8IHVuZGVmaW5lZCk7XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGFuIGljb24gYnkgVVJMIGluIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS5cbiAgICAgKiBAcGFyYW0gaWNvbk5hbWUgTmFtZSB1bmRlciB3aGljaCB0aGUgaWNvbiBzaG91bGQgYmUgcmVnaXN0ZXJlZC5cbiAgICAgKiBAcGFyYW0gdXJsXG4gICAgICovXG4gICAgYWRkU3ZnSWNvbihpY29uTmFtZTogc3RyaW5nLCB1cmw6IFNhZmVSZXNvdXJjZVVybCwgb3B0aW9ucz86IEljb25PcHRpb25zKTogdGhpcztcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gaWNvbiB1c2luZyBhbiBIVE1MIHN0cmluZyBpbiB0aGUgZGVmYXVsdCBuYW1lc3BhY2UuXG4gICAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAgICogQHBhcmFtIGxpdGVyYWwgU1ZHIHNvdXJjZSBvZiB0aGUgaWNvbi5cbiAgICAgKi9cbiAgICBhZGRTdmdJY29uTGl0ZXJhbChpY29uTmFtZTogc3RyaW5nLCBsaXRlcmFsOiBTYWZlSHRtbCwgb3B0aW9ucz86IEljb25PcHRpb25zKTogdGhpcztcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gaWNvbiBieSBVUkwgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuXG4gICAgICogQHBhcmFtIG5hbWVzcGFjZSBOYW1lc3BhY2UgaW4gd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAgICogQHBhcmFtIHVybFxuICAgICAqL1xuICAgIGFkZFN2Z0ljb25Jbk5hbWVzcGFjZShuYW1lc3BhY2U6IHN0cmluZywgaWNvbk5hbWU6IHN0cmluZywgdXJsOiBTYWZlUmVzb3VyY2VVcmwsIG9wdGlvbnM/OiBJY29uT3B0aW9ucyk6IHRoaXM7XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGFuIGljb24gdXNpbmcgYW4gSFRNTCBzdHJpbmcgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuXG4gICAgICogQHBhcmFtIG5hbWVzcGFjZSBOYW1lc3BhY2UgaW4gd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAgICogQHBhcmFtIGxpdGVyYWwgU1ZHIHNvdXJjZSBvZiB0aGUgaWNvbi5cbiAgICAgKi9cbiAgICBhZGRTdmdJY29uTGl0ZXJhbEluTmFtZXNwYWNlKG5hbWVzcGFjZTogc3RyaW5nLCBpY29uTmFtZTogc3RyaW5nLCBsaXRlcmFsOiBTYWZlSHRtbCwgb3B0aW9ucz86IEljb25PcHRpb25zKTogdGhpcztcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gaWNvbiBzZXQgYnkgVVJMIGluIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS5cbiAgICAgKiBAcGFyYW0gdXJsXG4gICAgICovXG4gICAgYWRkU3ZnSWNvblNldCh1cmw6IFNhZmVSZXNvdXJjZVVybCwgb3B0aW9ucz86IEljb25PcHRpb25zKTogdGhpcztcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gaWNvbiBzZXQgdXNpbmcgYW4gSFRNTCBzdHJpbmcgaW4gdGhlIGRlZmF1bHQgbmFtZXNwYWNlLlxuICAgICAqIEBwYXJhbSBsaXRlcmFsIFNWRyBzb3VyY2Ugb2YgdGhlIGljb24gc2V0LlxuICAgICAqL1xuICAgIGFkZFN2Z0ljb25TZXRMaXRlcmFsKGxpdGVyYWw6IFNhZmVIdG1sLCBvcHRpb25zPzogSWNvbk9wdGlvbnMpOiB0aGlzO1xuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhbiBpY29uIHNldCBieSBVUkwgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuXG4gICAgICogQHBhcmFtIG5hbWVzcGFjZSBOYW1lc3BhY2UgaW4gd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGljb24gc2V0LlxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKi9cbiAgICBhZGRTdmdJY29uU2V0SW5OYW1lc3BhY2UobmFtZXNwYWNlOiBzdHJpbmcsIHVybDogU2FmZVJlc291cmNlVXJsLCBvcHRpb25zPzogSWNvbk9wdGlvbnMpOiB0aGlzO1xuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhbiBpY29uIHNldCB1c2luZyBhbiBIVE1MIHN0cmluZyBpbiB0aGUgc3BlY2lmaWVkIG5hbWVzcGFjZS5cbiAgICAgKiBAcGFyYW0gbmFtZXNwYWNlIE5hbWVzcGFjZSBpbiB3aGljaCB0byByZWdpc3RlciB0aGUgaWNvbiBzZXQuXG4gICAgICogQHBhcmFtIGxpdGVyYWwgU1ZHIHNvdXJjZSBvZiB0aGUgaWNvbiBzZXQuXG4gICAgICovXG4gICAgYWRkU3ZnSWNvblNldExpdGVyYWxJbk5hbWVzcGFjZShuYW1lc3BhY2U6IHN0cmluZywgbGl0ZXJhbDogU2FmZUh0bWwsIG9wdGlvbnM/OiBJY29uT3B0aW9ucyk6IHRoaXM7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBhbGlhcyBmb3IgYSBDU1MgY2xhc3MgbmFtZSB0byBiZSB1c2VkIGZvciBpY29uIGZvbnRzLiBDcmVhdGluZyBhbiBtYXRJY29uXG4gICAgICogY29tcG9uZW50IHdpdGggdGhlIGFsaWFzIGFzIHRoZSBmb250U2V0IGlucHV0IHdpbGwgY2F1c2UgdGhlIGNsYXNzIG5hbWUgdG8gYmUgYXBwbGllZFxuICAgICAqIHRvIHRoZSBgPG1hdC1pY29uPmAgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhbGlhcyBBbGlhcyBmb3IgdGhlIGZvbnQuXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZSBDbGFzcyBuYW1lIG92ZXJyaWRlIHRvIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGUgYWxpYXMuXG4gICAgICovXG4gICAgcmVnaXN0ZXJGb250Q2xhc3NBbGlhcyhhbGlhczogc3RyaW5nLCBjbGFzc05hbWU/OiBzdHJpbmcpOiB0aGlzO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIENTUyBjbGFzcyBuYW1lIGFzc29jaWF0ZWQgd2l0aCB0aGUgYWxpYXMgYnkgYSBwcmV2aW91cyBjYWxsIHRvXG4gICAgICogcmVnaXN0ZXJGb250Q2xhc3NBbGlhcy4gSWYgbm8gQ1NTIGNsYXNzIGhhcyBiZWVuIGFzc29jaWF0ZWQsIHJldHVybnMgdGhlIGFsaWFzIHVubW9kaWZpZWQuXG4gICAgICovXG4gICAgY2xhc3NOYW1lRm9yRm9udEFsaWFzKGFsaWFzOiBzdHJpbmcpOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgQ1NTIGNsYXNzIG5hbWUgdG8gYmUgdXNlZCBmb3IgaWNvbiBmb250cyB3aGVuIGFuIGA8bWF0LWljb24+YCBjb21wb25lbnQgZG9lcyBub3RcbiAgICAgKiBoYXZlIGEgZm9udFNldCBpbnB1dCB2YWx1ZSwgYW5kIGlzIG5vdCBsb2FkaW5nIGFuIGljb24gYnkgbmFtZSBvciBVUkwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG4gICAgc2V0RGVmYXVsdEZvbnRTZXRDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IHRoaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgQ1NTIGNsYXNzIG5hbWUgdG8gYmUgdXNlZCBmb3IgaWNvbiBmb250cyB3aGVuIGFuIGA8bWF0LWljb24+YCBjb21wb25lbnQgZG9lcyBub3RcbiAgICAgKiBoYXZlIGEgZm9udFNldCBpbnB1dCB2YWx1ZSwgYW5kIGlzIG5vdCBsb2FkaW5nIGFuIGljb24gYnkgbmFtZSBvciBVUkwuXG4gICAgICovXG4gICAgZ2V0RGVmYXVsdEZvbnRTZXRDbGFzcygpOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgcHJvZHVjZXMgdGhlIGljb24gKGFzIGFuIGA8c3ZnPmAgRE9NIGVsZW1lbnQpIGZyb20gdGhlIGdpdmVuIFVSTC5cbiAgICAgKiBUaGUgcmVzcG9uc2UgZnJvbSB0aGUgVVJMIG1heSBiZSBjYWNoZWQgc28gdGhpcyB3aWxsIG5vdCBhbHdheXMgY2F1c2UgYW4gSFRUUCByZXF1ZXN0LCBidXRcbiAgICAgKiB0aGUgcHJvZHVjZWQgZWxlbWVudCB3aWxsIGFsd2F5cyBiZSBhIG5ldyBjb3B5IG9mIHRoZSBvcmlnaW5hbGx5IGZldGNoZWQgaWNvbi4gKFRoYXQgaXMsXG4gICAgICogaXQgd2lsbCBub3QgY29udGFpbiBhbnkgbW9kaWZpY2F0aW9ucyBtYWRlIHRvIGVsZW1lbnRzIHByZXZpb3VzbHkgcmV0dXJuZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNhZmVVcmwgVVJMIGZyb20gd2hpY2ggdG8gZmV0Y2ggdGhlIFNWRyBpY29uLlxuICAgICAqL1xuICAgIGdldFN2Z0ljb25Gcm9tVXJsKHNhZmVVcmw6IFNhZmVSZXNvdXJjZVVybCk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgcHJvZHVjZXMgdGhlIGljb24gKGFzIGFuIGA8c3ZnPmAgRE9NIGVsZW1lbnQpIHdpdGggdGhlIGdpdmVuIG5hbWVcbiAgICAgKiBhbmQgbmFtZXNwYWNlLiBUaGUgaWNvbiBtdXN0IGhhdmUgYmVlbiBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCBhZGRJY29uIG9yIGFkZEljb25TZXQ7XG4gICAgICogaWYgbm90LCB0aGUgT2JzZXJ2YWJsZSB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgaWNvbiB0byBiZSByZXRyaWV2ZWQuXG4gICAgICogQHBhcmFtIG5hbWVzcGFjZSBOYW1lc3BhY2UgaW4gd2hpY2ggdG8gbG9vayBmb3IgdGhlIGljb24uXG4gICAgICovXG4gICAgZ2V0TmFtZWRTdmdJY29uKG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxTVkdFbGVtZW50PjtcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhY2hlZCBpY29uIGZvciBhIFN2Z0ljb25Db25maWcgaWYgYXZhaWxhYmxlLCBvciBmZXRjaGVzIGl0IGZyb20gaXRzIFVSTCBpZiBub3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0U3ZnRnJvbUNvbmZpZztcbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBmaW5kIGFuIGljb24gd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgaW4gYW55IG9mIHRoZSBTVkcgaWNvbiBzZXRzLlxuICAgICAqIEZpcnN0IHNlYXJjaGVzIHRoZSBhdmFpbGFibGUgY2FjaGVkIGljb25zIGZvciBhIG5lc3RlZCBlbGVtZW50IHdpdGggYSBtYXRjaGluZyBuYW1lLCBhbmRcbiAgICAgKiBpZiBmb3VuZCBjb3BpZXMgdGhlIGVsZW1lbnQgdG8gYSBuZXcgYDxzdmc+YCBlbGVtZW50LiBJZiBub3QgZm91bmQsIGZldGNoZXMgYWxsIGljb24gc2V0c1xuICAgICAqIHRoYXQgaGF2ZSBub3QgYmVlbiBjYWNoZWQsIGFuZCBzZWFyY2hlcyBhZ2FpbiBhZnRlciBhbGwgZmV0Y2hlcyBhcmUgY29tcGxldGVkLlxuICAgICAqIFRoZSByZXR1cm5lZCBPYnNlcnZhYmxlIHByb2R1Y2VzIHRoZSBTVkcgZWxlbWVudCBpZiBwb3NzaWJsZSwgYW5kIHRocm93c1xuICAgICAqIGFuIGVycm9yIGlmIG5vIGljb24gd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgY2FuIGJlIGZvdW5kLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2dldFN2Z0Zyb21JY29uU2V0Q29uZmlncztcbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyB0aGUgY2FjaGVkIFNWRyBlbGVtZW50cyBmb3IgdGhlIGdpdmVuIGljb24gc2V0cyBmb3IgYSBuZXN0ZWQgaWNvbiBlbGVtZW50IHdob3NlIFwiaWRcIlxuICAgICAqIHRhZyBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgbmFtZS4gSWYgZm91bmQsIGNvcGllcyB0aGUgbmVzdGVkIGVsZW1lbnQgdG8gYSBuZXcgU1ZHIGVsZW1lbnQgYW5kXG4gICAgICogcmV0dXJucyBpdC4gUmV0dXJucyBudWxsIGlmIG5vIG1hdGNoaW5nIGVsZW1lbnQgaXMgZm91bmQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZXh0cmFjdEljb25XaXRoTmFtZUZyb21BbnlTZXQ7XG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGNvbnRlbnQgb2YgdGhlIGljb24gVVJMIHNwZWNpZmllZCBpbiB0aGUgU3ZnSWNvbkNvbmZpZyBhbmQgY3JlYXRlcyBhbiBTVkcgZWxlbWVudFxuICAgICAqIGZyb20gaXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfbG9hZFN2Z0ljb25Gcm9tQ29uZmlnO1xuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBjb250ZW50IG9mIHRoZSBpY29uIHNldCBVUkwgc3BlY2lmaWVkIGluIHRoZSBTdmdJY29uQ29uZmlnIGFuZCBjcmVhdGVzIGFuIFNWRyBlbGVtZW50XG4gICAgICogZnJvbSBpdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9sb2FkU3ZnSWNvblNldEZyb21Db25maWc7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IGZyb20gdGhlIGdpdmVuIFNWRyBzdHJpbmcsIGFuZCBhZGRzIGRlZmF1bHQgYXR0cmlidXRlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9jcmVhdGVTdmdFbGVtZW50Rm9yU2luZ2xlSWNvbjtcbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyB0aGUgY2FjaGVkIGVsZW1lbnQgb2YgdGhlIGdpdmVuIFN2Z0ljb25Db25maWcgZm9yIGEgbmVzdGVkIGljb24gZWxlbWVudCB3aG9zZSBcImlkXCJcbiAgICAgKiB0YWcgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIG5hbWUuIElmIGZvdW5kLCBjb3BpZXMgdGhlIG5lc3RlZCBlbGVtZW50IHRvIGEgbmV3IFNWRyBlbGVtZW50IGFuZFxuICAgICAqIHJldHVybnMgaXQuIFJldHVybnMgbnVsbCBpZiBubyBtYXRjaGluZyBlbGVtZW50IGlzIGZvdW5kLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2V4dHJhY3RTdmdJY29uRnJvbVNldDtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgZnJvbSB0aGUgZ2l2ZW4gU1ZHIHN0cmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9zdmdFbGVtZW50RnJvbVN0cmluZztcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbiBlbGVtZW50IGludG8gYW4gU1ZHIG5vZGUgYnkgY2xvbmluZyBhbGwgb2YgaXRzIGNoaWxkcmVuLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3RvU3ZnRWxlbWVudDtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIGFuIFNWRyBlbGVtZW50IHRvIGJlIHVzZWQgYXMgYW4gaWNvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9zZXRTdmdBdHRyaWJ1dGVzO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB3aGljaCBwcm9kdWNlcyB0aGUgc3RyaW5nIGNvbnRlbnRzIG9mIHRoZSBnaXZlbiBVUkwuIFJlc3VsdHMgbWF5IGJlXG4gICAgICogY2FjaGVkLCBzbyBmdXR1cmUgY2FsbHMgd2l0aCB0aGUgc2FtZSBVUkwgbWF5IG5vdCBjYXVzZSBhbm90aGVyIEhUVFAgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9mZXRjaFVybDtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gaWNvbiBjb25maWcgYnkgbmFtZSBpbiB0aGUgc3BlY2lmaWVkIG5hbWVzcGFjZS5cbiAgICAgKiBAcGFyYW0gbmFtZXNwYWNlIE5hbWVzcGFjZSBpbiB3aGljaCB0byByZWdpc3RlciB0aGUgaWNvbiBjb25maWcuXG4gICAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGNvbmZpZy5cbiAgICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZyB0byBiZSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2FkZFN2Z0ljb25Db25maWc7XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGFuIGljb24gc2V0IGNvbmZpZyBpbiB0aGUgc3BlY2lmaWVkIG5hbWVzcGFjZS5cbiAgICAgKiBAcGFyYW0gbmFtZXNwYWNlIE5hbWVzcGFjZSBpbiB3aGljaCB0byByZWdpc3RlciB0aGUgaWNvbiBjb25maWcuXG4gICAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9hZGRTdmdJY29uU2V0Q29uZmlnO1xufVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIElDT05fUkVHSVNUUllfUFJPVklERVJfRkFDVE9SWShwYXJlbnRSZWdpc3RyeTogTWF0SWNvblJlZ2lzdHJ5LCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgZG9jdW1lbnQ/OiBhbnksIGVycm9ySGFuZGxlcj86IEVycm9ySGFuZGxlcik6IE1hdEljb25SZWdpc3RyeTtcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZGVjbGFyZSBjb25zdCBJQ09OX1JFR0lTVFJZX1BST1ZJREVSOiB7XG4gICAgcHJvdmlkZTogdHlwZW9mIE1hdEljb25SZWdpc3RyeTtcbiAgICBkZXBzOiAoT3B0aW9uYWxbXSB8IHR5cGVvZiBEb21TYW5pdGl6ZXIpW107XG4gICAgdXNlRmFjdG9yeTogdHlwZW9mIElDT05fUkVHSVNUUllfUFJPVklERVJfRkFDVE9SWTtcbn07XG4iXX0=