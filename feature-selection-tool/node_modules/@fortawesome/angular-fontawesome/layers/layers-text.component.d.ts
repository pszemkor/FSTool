import { OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FlipProp, PullProp, RotateProp, SizeProp, Styles, TextParams, Transform } from '@fortawesome/fontawesome-svg-core';
import { FaLayersComponent } from './layers.component';
import * as ɵngcc0 from '@angular/core';
export declare class FaLayersTextComponent implements OnChanges {
    private parent;
    private sanitizer;
    content: string;
    title?: string;
    styles?: Styles;
    classes?: string[];
    spin?: boolean;
    pulse?: boolean;
    flip?: FlipProp;
    size?: SizeProp;
    pull?: PullProp;
    border?: boolean;
    inverse?: boolean;
    rotate?: RotateProp;
    fixedWidth?: boolean;
    transform?: string | Transform;
    renderedHTML: SafeHtml;
    constructor(parent: FaLayersComponent, sanitizer: DomSanitizer);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Updating params by component props.
     */
    protected buildParams(): TextParams;
    private updateContent;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaLayersTextComponent, [{ optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FaLayersTextComponent, "fa-layers-text", never, { "classes": "classes"; "content": "content"; "title": "title"; "styles": "styles"; "spin": "spin"; "pulse": "pulse"; "flip": "flip"; "size": "size"; "pull": "pull"; "border": "border"; "inverse": "inverse"; "rotate": "rotate"; "fixedWidth": "fixedWidth"; "transform": "transform"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLXRleHQuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImxheWVycy10ZXh0LmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRmxpcFByb3AsIFB1bGxQcm9wLCBSb3RhdGVQcm9wLCBTaXplUHJvcCwgU3R5bGVzLCBUZXh0UGFyYW1zLCBUcmFuc2Zvcm0gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgRmFMYXllcnNDb21wb25lbnQgfSBmcm9tICcuL2xheWVycy5jb21wb25lbnQnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRmFMYXllcnNUZXh0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBwcml2YXRlIHBhcmVudDtcbiAgICBwcml2YXRlIHNhbml0aXplcjtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgc3R5bGVzPzogU3R5bGVzO1xuICAgIGNsYXNzZXM/OiBzdHJpbmdbXTtcbiAgICBzcGluPzogYm9vbGVhbjtcbiAgICBwdWxzZT86IGJvb2xlYW47XG4gICAgZmxpcD86IEZsaXBQcm9wO1xuICAgIHNpemU/OiBTaXplUHJvcDtcbiAgICBwdWxsPzogUHVsbFByb3A7XG4gICAgYm9yZGVyPzogYm9vbGVhbjtcbiAgICBpbnZlcnNlPzogYm9vbGVhbjtcbiAgICByb3RhdGU/OiBSb3RhdGVQcm9wO1xuICAgIGZpeGVkV2lkdGg/OiBib29sZWFuO1xuICAgIHRyYW5zZm9ybT86IHN0cmluZyB8IFRyYW5zZm9ybTtcbiAgICByZW5kZXJlZEhUTUw6IFNhZmVIdG1sO1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudDogRmFMYXllcnNDb21wb25lbnQsIHNhbml0aXplcjogRG9tU2FuaXRpemVyKTtcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBVcGRhdGluZyBwYXJhbXMgYnkgY29tcG9uZW50IHByb3BzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZFBhcmFtcygpOiBUZXh0UGFyYW1zO1xuICAgIHByaXZhdGUgdXBkYXRlQ29udGVudDtcbn1cbiJdfQ==