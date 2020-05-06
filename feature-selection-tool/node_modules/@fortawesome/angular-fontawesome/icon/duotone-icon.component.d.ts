import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from './icon.component';
import * as ɵngcc0 from '@angular/core';
export declare class FaDuotoneIconComponent extends FaIconComponent {
    /**
     * Swap the default opacity of each duotone icon’s layers. This will make an
     * icon’s primary layer have the default opacity of 40% rather than its
     * secondary layer.
     *
     * @default false
     */
    swapOpacity?: 'true' | 'false' | boolean;
    /**
     * Customize the opacity of the primary icon layer.
     * Valid values are in range [0, 1.0].
     *
     * @default 1.0
     */
    primaryOpacity?: string | number;
    /**
     * Customize the opacity of the secondary icon layer.
     * Valid values are in range [0, 1.0].
     *
     * @default 0.4
     */
    secondaryOpacity?: string | number;
    /**
     * Customize the color of the primary icon layer.
     * Accepts any valid CSS color value.
     *
     * @default CSS inherited color
     */
    primaryColor?: string;
    /**
     * Customize the color of the secondary icon layer.
     * Accepts any valid CSS color value.
     *
     * @default CSS inherited color
     */
    secondaryColor?: string;
    protected findIconDefinition(i: IconProp | IconDefinition): IconDefinition | null;
    protected buildParams(): {
        title: string;
        transform: import("@fortawesome/fontawesome-svg-core").Transform;
        classes: string[];
        mask: IconDefinition;
        styles: import("@fortawesome/fontawesome-svg-core").Styles;
        symbol: string | boolean;
        attributes: {
            role: string;
        };
    };
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaDuotoneIconComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FaDuotoneIconComponent, "fa-duotone-icon", never, { "swapOpacity": "swapOpacity"; "primaryOpacity": "primaryOpacity"; "secondaryOpacity": "secondaryOpacity"; "primaryColor": "primaryColor"; "secondaryColor": "secondaryColor"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVvdG9uZS1pY29uLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJkdW90b25lLWljb24uY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJY29uRGVmaW5pdGlvbiwgSWNvblByb3AgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgRmFJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29uLmNvbXBvbmVudCc7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGYUR1b3RvbmVJY29uQ29tcG9uZW50IGV4dGVuZHMgRmFJY29uQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBTd2FwIHRoZSBkZWZhdWx0IG9wYWNpdHkgb2YgZWFjaCBkdW90b25lIGljb27igJlzIGxheWVycy4gVGhpcyB3aWxsIG1ha2UgYW5cbiAgICAgKiBpY29u4oCZcyBwcmltYXJ5IGxheWVyIGhhdmUgdGhlIGRlZmF1bHQgb3BhY2l0eSBvZiA0MCUgcmF0aGVyIHRoYW4gaXRzXG4gICAgICogc2Vjb25kYXJ5IGxheWVyLlxuICAgICAqXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBzd2FwT3BhY2l0eT86ICd0cnVlJyB8ICdmYWxzZScgfCBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEN1c3RvbWl6ZSB0aGUgb3BhY2l0eSBvZiB0aGUgcHJpbWFyeSBpY29uIGxheWVyLlxuICAgICAqIFZhbGlkIHZhbHVlcyBhcmUgaW4gcmFuZ2UgWzAsIDEuMF0uXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCAxLjBcbiAgICAgKi9cbiAgICBwcmltYXJ5T3BhY2l0eT86IHN0cmluZyB8IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBDdXN0b21pemUgdGhlIG9wYWNpdHkgb2YgdGhlIHNlY29uZGFyeSBpY29uIGxheWVyLlxuICAgICAqIFZhbGlkIHZhbHVlcyBhcmUgaW4gcmFuZ2UgWzAsIDEuMF0uXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCAwLjRcbiAgICAgKi9cbiAgICBzZWNvbmRhcnlPcGFjaXR5Pzogc3RyaW5nIHwgbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEN1c3RvbWl6ZSB0aGUgY29sb3Igb2YgdGhlIHByaW1hcnkgaWNvbiBsYXllci5cbiAgICAgKiBBY2NlcHRzIGFueSB2YWxpZCBDU1MgY29sb3IgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCBDU1MgaW5oZXJpdGVkIGNvbG9yXG4gICAgICovXG4gICAgcHJpbWFyeUNvbG9yPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEN1c3RvbWl6ZSB0aGUgY29sb3Igb2YgdGhlIHNlY29uZGFyeSBpY29uIGxheWVyLlxuICAgICAqIEFjY2VwdHMgYW55IHZhbGlkIENTUyBjb2xvciB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0IENTUyBpbmhlcml0ZWQgY29sb3JcbiAgICAgKi9cbiAgICBzZWNvbmRhcnlDb2xvcj86IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgZmluZEljb25EZWZpbml0aW9uKGk6IEljb25Qcm9wIHwgSWNvbkRlZmluaXRpb24pOiBJY29uRGVmaW5pdGlvbiB8IG51bGw7XG4gICAgcHJvdGVjdGVkIGJ1aWxkUGFyYW1zKCk6IHtcbiAgICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgICAgdHJhbnNmb3JtOiBpbXBvcnQoXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIikuVHJhbnNmb3JtO1xuICAgICAgICBjbGFzc2VzOiBzdHJpbmdbXTtcbiAgICAgICAgbWFzazogSWNvbkRlZmluaXRpb247XG4gICAgICAgIHN0eWxlczogaW1wb3J0KFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIpLlN0eWxlcztcbiAgICAgICAgc3ltYm9sOiBzdHJpbmcgfCBib29sZWFuO1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICByb2xlOiBzdHJpbmc7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbiJdfQ==