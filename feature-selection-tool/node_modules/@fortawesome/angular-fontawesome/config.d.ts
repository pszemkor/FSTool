import { IconDefinition, IconPrefix } from '@fortawesome/fontawesome-common-types';
import * as ɵngcc0 from '@angular/core';
export declare class FaConfig {
    /**
     * Default prefix to use, when one is not provided with the icon name.
     *
     * @default 'fas'
     */
    defaultPrefix: IconPrefix;
    /**
     * Provides a fallback icon to use whilst main icon is being loaded asynchronously.
     * When value is null, then fa-icon component will throw an error if icon input is missing.
     * When value is not null, then the provided icon will be used as a fallback icon if icon input is missing.
     *
     * @default null
     */
    fallbackIcon: IconDefinition;
    /**
     * Set icons to the same fixed width.
     * @see {@link: https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons}
     * @default false
     */
    fixedWidth?: boolean;
    /**
     * Whether components should lookup icon definitions in the global icon
     * library (the one available from
     * `import { library } from '@fortawesome/fontawesome-svg-core')`.
     *
     * See https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/icon-library.md
     * for detailed description of library modes.
     *
     * - 'unset' - Components should lookup icon definitions in the global library
     * and emit warning if they find a definition there. This option is a default
     * to assist existing applications with a migration. Applications are expected
     * to switch to using {@link FaIconLibrary}.
     * - true - Components should lookup icon definitions in the global library.
     * Note that global icon library is deprecated and support for it will be
     * removed. This option can be used to temporarily suppress warnings.
     * - false - Components should not lookup icon definitions in the global
     * library. Library will throw an error if missing icon is found in the global
     * library.
     *
     * @deprecated This option is deprecated since 0.5.0. In 0.6.0 default will
     * be changed to false. In 0.7.0 the option will be removed together with the
     * support for the global icon library.
     *
     * @default false
     */
    globalLibrary: boolean | 'unset';
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaConfig, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmQudHMiLCJzb3VyY2VzIjpbImNvbmZpZy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJY29uRGVmaW5pdGlvbiwgSWNvblByZWZpeCB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1jb21tb24tdHlwZXMnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRmFDb25maWcge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcHJlZml4IHRvIHVzZSwgd2hlbiBvbmUgaXMgbm90IHByb3ZpZGVkIHdpdGggdGhlIGljb24gbmFtZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0ICdmYXMnXG4gICAgICovXG4gICAgZGVmYXVsdFByZWZpeDogSWNvblByZWZpeDtcbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGZhbGxiYWNrIGljb24gdG8gdXNlIHdoaWxzdCBtYWluIGljb24gaXMgYmVpbmcgbG9hZGVkIGFzeW5jaHJvbm91c2x5LlxuICAgICAqIFdoZW4gdmFsdWUgaXMgbnVsbCwgdGhlbiBmYS1pY29uIGNvbXBvbmVudCB3aWxsIHRocm93IGFuIGVycm9yIGlmIGljb24gaW5wdXQgaXMgbWlzc2luZy5cbiAgICAgKiBXaGVuIHZhbHVlIGlzIG5vdCBudWxsLCB0aGVuIHRoZSBwcm92aWRlZCBpY29uIHdpbGwgYmUgdXNlZCBhcyBhIGZhbGxiYWNrIGljb24gaWYgaWNvbiBpbnB1dCBpcyBtaXNzaW5nLlxuICAgICAqXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGZhbGxiYWNrSWNvbjogSWNvbkRlZmluaXRpb247XG4gICAgLyoqXG4gICAgICogU2V0IGljb25zIHRvIHRoZSBzYW1lIGZpeGVkIHdpZHRoLlxuICAgICAqIEBzZWUge0BsaW5rOiBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9ob3ctdG8tdXNlL29uLXRoZS13ZWIvc3R5bGluZy9maXhlZC13aWR0aC1pY29uc31cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGZpeGVkV2lkdGg/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgY29tcG9uZW50cyBzaG91bGQgbG9va3VwIGljb24gZGVmaW5pdGlvbnMgaW4gdGhlIGdsb2JhbCBpY29uXG4gICAgICogbGlicmFyeSAodGhlIG9uZSBhdmFpbGFibGUgZnJvbVxuICAgICAqIGBpbXBvcnQgeyBsaWJyYXJ5IH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJylgLlxuICAgICAqXG4gICAgICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Gb3J0QXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lL2Jsb2IvbWFzdGVyL2RvY3MvdXNhZ2UvaWNvbi1saWJyYXJ5Lm1kXG4gICAgICogZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGxpYnJhcnkgbW9kZXMuXG4gICAgICpcbiAgICAgKiAtICd1bnNldCcgLSBDb21wb25lbnRzIHNob3VsZCBsb29rdXAgaWNvbiBkZWZpbml0aW9ucyBpbiB0aGUgZ2xvYmFsIGxpYnJhcnlcbiAgICAgKiBhbmQgZW1pdCB3YXJuaW5nIGlmIHRoZXkgZmluZCBhIGRlZmluaXRpb24gdGhlcmUuIFRoaXMgb3B0aW9uIGlzIGEgZGVmYXVsdFxuICAgICAqIHRvIGFzc2lzdCBleGlzdGluZyBhcHBsaWNhdGlvbnMgd2l0aCBhIG1pZ3JhdGlvbi4gQXBwbGljYXRpb25zIGFyZSBleHBlY3RlZFxuICAgICAqIHRvIHN3aXRjaCB0byB1c2luZyB7QGxpbmsgRmFJY29uTGlicmFyeX0uXG4gICAgICogLSB0cnVlIC0gQ29tcG9uZW50cyBzaG91bGQgbG9va3VwIGljb24gZGVmaW5pdGlvbnMgaW4gdGhlIGdsb2JhbCBsaWJyYXJ5LlxuICAgICAqIE5vdGUgdGhhdCBnbG9iYWwgaWNvbiBsaWJyYXJ5IGlzIGRlcHJlY2F0ZWQgYW5kIHN1cHBvcnQgZm9yIGl0IHdpbGwgYmVcbiAgICAgKiByZW1vdmVkLiBUaGlzIG9wdGlvbiBjYW4gYmUgdXNlZCB0byB0ZW1wb3JhcmlseSBzdXBwcmVzcyB3YXJuaW5ncy5cbiAgICAgKiAtIGZhbHNlIC0gQ29tcG9uZW50cyBzaG91bGQgbm90IGxvb2t1cCBpY29uIGRlZmluaXRpb25zIGluIHRoZSBnbG9iYWxcbiAgICAgKiBsaWJyYXJ5LiBMaWJyYXJ5IHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgbWlzc2luZyBpY29uIGlzIGZvdW5kIGluIHRoZSBnbG9iYWxcbiAgICAgKiBsaWJyYXJ5LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVGhpcyBvcHRpb24gaXMgZGVwcmVjYXRlZCBzaW5jZSAwLjUuMC4gSW4gMC42LjAgZGVmYXVsdCB3aWxsXG4gICAgICogYmUgY2hhbmdlZCB0byBmYWxzZS4gSW4gMC43LjAgdGhlIG9wdGlvbiB3aWxsIGJlIHJlbW92ZWQgdG9nZXRoZXIgd2l0aCB0aGVcbiAgICAgKiBzdXBwb3J0IGZvciB0aGUgZ2xvYmFsIGljb24gbGlicmFyeS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZ2xvYmFsTGlicmFyeTogYm9vbGVhbiB8ICd1bnNldCc7XG59XG4iXX0=