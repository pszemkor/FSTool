import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let FaConfig = class FaConfig {
    constructor() {
        /**
         * Default prefix to use, when one is not provided with the icon name.
         *
         * @default 'fas'
         */
        this.defaultPrefix = 'fas';
        /**
         * Provides a fallback icon to use whilst main icon is being loaded asynchronously.
         * When value is null, then fa-icon component will throw an error if icon input is missing.
         * When value is not null, then the provided icon will be used as a fallback icon if icon input is missing.
         *
         * @default null
         */
        this.fallbackIcon = null;
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
        this.globalLibrary = false;
    }
};
FaConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function FaConfig_Factory() { return new FaConfig(); }, token: FaConfig, providedIn: "root" });
FaConfig = __decorate([
    Injectable({ providedIn: 'root' })
], FaConfig);
export { FaConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJjb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFBckI7UUFDRTs7OztXQUlHO1FBQ0gsa0JBQWEsR0FBZSxLQUFLLENBQUM7UUFFbEM7Ozs7OztXQU1HO1FBQ0gsaUJBQVksR0FBbUIsSUFBSSxDQUFDO1FBU3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F3Qkc7UUFDSCxrQkFBYSxHQUFzQixLQUFLLENBQUM7S0FDMUM7Q0FBQSxDQUFBOztBQWxEWSxRQUFRO0lBRHBCLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztHQUN0QixRQUFRLENBa0RwQjtTQWxEWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24sIEljb25QcmVmaXggfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtY29tbW9uLXR5cGVzJztcbmltcG9ydCB7IEZhSWNvbkxpYnJhcnkgfSBmcm9tICcuL2ljb24tbGlicmFyeSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRmFDb25maWcge1xuICAvKipcbiAgICogRGVmYXVsdCBwcmVmaXggdG8gdXNlLCB3aGVuIG9uZSBpcyBub3QgcHJvdmlkZWQgd2l0aCB0aGUgaWNvbiBuYW1lLlxuICAgKlxuICAgKiBAZGVmYXVsdCAnZmFzJ1xuICAgKi9cbiAgZGVmYXVsdFByZWZpeDogSWNvblByZWZpeCA9ICdmYXMnO1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIGZhbGxiYWNrIGljb24gdG8gdXNlIHdoaWxzdCBtYWluIGljb24gaXMgYmVpbmcgbG9hZGVkIGFzeW5jaHJvbm91c2x5LlxuICAgKiBXaGVuIHZhbHVlIGlzIG51bGwsIHRoZW4gZmEtaWNvbiBjb21wb25lbnQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiBpY29uIGlucHV0IGlzIG1pc3NpbmcuXG4gICAqIFdoZW4gdmFsdWUgaXMgbm90IG51bGwsIHRoZW4gdGhlIHByb3ZpZGVkIGljb24gd2lsbCBiZSB1c2VkIGFzIGEgZmFsbGJhY2sgaWNvbiBpZiBpY29uIGlucHV0IGlzIG1pc3NpbmcuXG4gICAqXG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGZhbGxiYWNrSWNvbjogSWNvbkRlZmluaXRpb24gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTZXQgaWNvbnMgdG8gdGhlIHNhbWUgZml4ZWQgd2lkdGguXG4gICAqIEBzZWUge0BsaW5rOiBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9ob3ctdG8tdXNlL29uLXRoZS13ZWIvc3R5bGluZy9maXhlZC13aWR0aC1pY29uc31cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGZpeGVkV2lkdGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGNvbXBvbmVudHMgc2hvdWxkIGxvb2t1cCBpY29uIGRlZmluaXRpb25zIGluIHRoZSBnbG9iYWwgaWNvblxuICAgKiBsaWJyYXJ5ICh0aGUgb25lIGF2YWlsYWJsZSBmcm9tXG4gICAqIGBpbXBvcnQgeyBsaWJyYXJ5IH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJylgLlxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0ZvcnRBd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvYmxvYi9tYXN0ZXIvZG9jcy91c2FnZS9pY29uLWxpYnJhcnkubWRcbiAgICogZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGxpYnJhcnkgbW9kZXMuXG4gICAqXG4gICAqIC0gJ3Vuc2V0JyAtIENvbXBvbmVudHMgc2hvdWxkIGxvb2t1cCBpY29uIGRlZmluaXRpb25zIGluIHRoZSBnbG9iYWwgbGlicmFyeVxuICAgKiBhbmQgZW1pdCB3YXJuaW5nIGlmIHRoZXkgZmluZCBhIGRlZmluaXRpb24gdGhlcmUuIFRoaXMgb3B0aW9uIGlzIGEgZGVmYXVsdFxuICAgKiB0byBhc3Npc3QgZXhpc3RpbmcgYXBwbGljYXRpb25zIHdpdGggYSBtaWdyYXRpb24uIEFwcGxpY2F0aW9ucyBhcmUgZXhwZWN0ZWRcbiAgICogdG8gc3dpdGNoIHRvIHVzaW5nIHtAbGluayBGYUljb25MaWJyYXJ5fS5cbiAgICogLSB0cnVlIC0gQ29tcG9uZW50cyBzaG91bGQgbG9va3VwIGljb24gZGVmaW5pdGlvbnMgaW4gdGhlIGdsb2JhbCBsaWJyYXJ5LlxuICAgKiBOb3RlIHRoYXQgZ2xvYmFsIGljb24gbGlicmFyeSBpcyBkZXByZWNhdGVkIGFuZCBzdXBwb3J0IGZvciBpdCB3aWxsIGJlXG4gICAqIHJlbW92ZWQuIFRoaXMgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHRlbXBvcmFyaWx5IHN1cHByZXNzIHdhcm5pbmdzLlxuICAgKiAtIGZhbHNlIC0gQ29tcG9uZW50cyBzaG91bGQgbm90IGxvb2t1cCBpY29uIGRlZmluaXRpb25zIGluIHRoZSBnbG9iYWxcbiAgICogbGlicmFyeS4gTGlicmFyeSB3aWxsIHRocm93IGFuIGVycm9yIGlmIG1pc3NpbmcgaWNvbiBpcyBmb3VuZCBpbiB0aGUgZ2xvYmFsXG4gICAqIGxpYnJhcnkuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgb3B0aW9uIGlzIGRlcHJlY2F0ZWQgc2luY2UgMC41LjAuIEluIDAuNi4wIGRlZmF1bHQgd2lsbFxuICAgKiBiZSBjaGFuZ2VkIHRvIGZhbHNlLiBJbiAwLjcuMCB0aGUgb3B0aW9uIHdpbGwgYmUgcmVtb3ZlZCB0b2dldGhlciB3aXRoIHRoZVxuICAgKiBzdXBwb3J0IGZvciB0aGUgZ2xvYmFsIGljb24gbGlicmFyeS5cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGdsb2JhbExpYnJhcnk6IGJvb2xlYW4gfCAndW5zZXQnID0gZmFsc2U7XG59XG4iXX0=