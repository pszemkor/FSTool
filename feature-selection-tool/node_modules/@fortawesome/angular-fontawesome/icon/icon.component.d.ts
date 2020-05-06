import { OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FaSymbol, FlipProp, IconDefinition, IconProp, PullProp, RotateProp, SizeProp, Styles, Transform } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { FaIconLibrary } from '../icon-library';
import { FaStackItemSizeDirective } from '../stack/stack-item-size.directive';
import * as ɵngcc0 from '@angular/core';
export declare class FaIconComponent implements OnChanges {
    private sanitizer;
    private config;
    private iconLibrary;
    private stackItem;
    icon: IconProp;
    /**
     * Specify a title for the icon.
     * This text will be displayed in a tooltip on hover and presented to the
     * screen readers.
     */
    title?: string;
    spin?: boolean;
    pulse?: boolean;
    mask?: IconProp;
    styles?: Styles;
    flip?: FlipProp;
    size?: SizeProp;
    pull?: PullProp;
    border?: boolean;
    inverse?: boolean;
    symbol?: FaSymbol;
    rotate?: RotateProp;
    fixedWidth?: boolean;
    classes?: string[];
    transform?: string | Transform;
    /**
     * Specify the `role` attribute for the rendered <svg> element.
     *
     * @default 'img'
     */
    a11yRole: string;
    renderedIconHTML: SafeHtml;
    constructor(sanitizer: DomSanitizer, config: FaConfig, iconLibrary: FaIconLibrary, stackItem: FaStackItemSizeDirective);
    ngOnChanges(changes: SimpleChanges): never;
    /**
     * Programmatically trigger rendering of the icon.
     *
     * This method is useful, when creating {@link FaIconComponent} dynamically or
     * changing its inputs programmatically as in these cases icon won't be
     * re-rendered automatically.
     */
    render(): void;
    protected findIconDefinition(i: IconProp | IconDefinition): IconDefinition | null;
    protected buildParams(): {
        title: string;
        transform: Transform;
        classes: string[];
        mask: IconDefinition;
        styles: Styles;
        symbol: string | boolean;
        attributes: {
            role: string;
        };
    };
    private renderIcon;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaIconComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FaIconComponent, "fa-icon", never, { "classes": "classes"; "icon": "icon"; "title": "title"; "spin": "spin"; "pulse": "pulse"; "mask": "mask"; "styles": "styles"; "flip": "flip"; "size": "size"; "pull": "pull"; "border": "border"; "inverse": "inverse"; "symbol": "symbol"; "rotate": "rotate"; "fixedWidth": "fixedWidth"; "transform": "transform"; "a11yRole": "a11yRole"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsiaWNvbi5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEZhU3ltYm9sLCBGbGlwUHJvcCwgSWNvbkRlZmluaXRpb24sIEljb25Qcm9wLCBQdWxsUHJvcCwgUm90YXRlUHJvcCwgU2l6ZVByb3AsIFN0eWxlcywgVHJhbnNmb3JtIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IEZhQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7IEZhSWNvbkxpYnJhcnkgfSBmcm9tICcuLi9pY29uLWxpYnJhcnknO1xuaW1wb3J0IHsgRmFTdGFja0l0ZW1TaXplRGlyZWN0aXZlIH0gZnJvbSAnLi4vc3RhY2svc3RhY2staXRlbS1zaXplLmRpcmVjdGl2ZSc7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGYUljb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIHByaXZhdGUgc2FuaXRpemVyO1xuICAgIHByaXZhdGUgY29uZmlnO1xuICAgIHByaXZhdGUgaWNvbkxpYnJhcnk7XG4gICAgcHJpdmF0ZSBzdGFja0l0ZW07XG4gICAgaWNvbjogSWNvblByb3A7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIHRpdGxlIGZvciB0aGUgaWNvbi5cbiAgICAgKiBUaGlzIHRleHQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gYSB0b29sdGlwIG9uIGhvdmVyIGFuZCBwcmVzZW50ZWQgdG8gdGhlXG4gICAgICogc2NyZWVuIHJlYWRlcnMuXG4gICAgICovXG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgc3Bpbj86IGJvb2xlYW47XG4gICAgcHVsc2U/OiBib29sZWFuO1xuICAgIG1hc2s/OiBJY29uUHJvcDtcbiAgICBzdHlsZXM/OiBTdHlsZXM7XG4gICAgZmxpcD86IEZsaXBQcm9wO1xuICAgIHNpemU/OiBTaXplUHJvcDtcbiAgICBwdWxsPzogUHVsbFByb3A7XG4gICAgYm9yZGVyPzogYm9vbGVhbjtcbiAgICBpbnZlcnNlPzogYm9vbGVhbjtcbiAgICBzeW1ib2w/OiBGYVN5bWJvbDtcbiAgICByb3RhdGU/OiBSb3RhdGVQcm9wO1xuICAgIGZpeGVkV2lkdGg/OiBib29sZWFuO1xuICAgIGNsYXNzZXM/OiBzdHJpbmdbXTtcbiAgICB0cmFuc2Zvcm0/OiBzdHJpbmcgfCBUcmFuc2Zvcm07XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgYHJvbGVgIGF0dHJpYnV0ZSBmb3IgdGhlIHJlbmRlcmVkIDxzdmc+IGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCAnaW1nJ1xuICAgICAqL1xuICAgIGExMXlSb2xlOiBzdHJpbmc7XG4gICAgcmVuZGVyZWRJY29uSFRNTDogU2FmZUh0bWw7XG4gICAgY29uc3RydWN0b3Ioc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIGNvbmZpZzogRmFDb25maWcsIGljb25MaWJyYXJ5OiBGYUljb25MaWJyYXJ5LCBzdGFja0l0ZW06IEZhU3RhY2tJdGVtU2l6ZURpcmVjdGl2ZSk7XG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IG5ldmVyO1xuICAgIC8qKlxuICAgICAqIFByb2dyYW1tYXRpY2FsbHkgdHJpZ2dlciByZW5kZXJpbmcgb2YgdGhlIGljb24uXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VmdWwsIHdoZW4gY3JlYXRpbmcge0BsaW5rIEZhSWNvbkNvbXBvbmVudH0gZHluYW1pY2FsbHkgb3JcbiAgICAgKiBjaGFuZ2luZyBpdHMgaW5wdXRzIHByb2dyYW1tYXRpY2FsbHkgYXMgaW4gdGhlc2UgY2FzZXMgaWNvbiB3b24ndCBiZVxuICAgICAqIHJlLXJlbmRlcmVkIGF1dG9tYXRpY2FsbHkuXG4gICAgICovXG4gICAgcmVuZGVyKCk6IHZvaWQ7XG4gICAgcHJvdGVjdGVkIGZpbmRJY29uRGVmaW5pdGlvbihpOiBJY29uUHJvcCB8IEljb25EZWZpbml0aW9uKTogSWNvbkRlZmluaXRpb24gfCBudWxsO1xuICAgIHByb3RlY3RlZCBidWlsZFBhcmFtcygpOiB7XG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtO1xuICAgICAgICBjbGFzc2VzOiBzdHJpbmdbXTtcbiAgICAgICAgbWFzazogSWNvbkRlZmluaXRpb247XG4gICAgICAgIHN0eWxlczogU3R5bGVzO1xuICAgICAgICBzeW1ib2w6IHN0cmluZyB8IGJvb2xlYW47XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIHJvbGU6IHN0cmluZztcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHByaXZhdGUgcmVuZGVySWNvbjtcbn1cbiJdfQ==