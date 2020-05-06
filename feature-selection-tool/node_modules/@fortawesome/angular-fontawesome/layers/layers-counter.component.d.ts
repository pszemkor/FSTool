import { OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CounterParams, Styles } from '@fortawesome/fontawesome-svg-core';
import { FaLayersComponent } from './layers.component';
import * as ɵngcc0 from '@angular/core';
export declare class FaLayersCounterComponent implements OnChanges {
    private parent;
    private sanitizer;
    content: string;
    title?: string;
    styles?: Styles;
    classes?: string[];
    renderedHTML: SafeHtml;
    constructor(parent: FaLayersComponent, sanitizer: DomSanitizer);
    ngOnChanges(changes: SimpleChanges): void;
    protected buildParams(): CounterParams;
    private updateContent;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaLayersCounterComponent, [{ optional: true; }, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FaLayersCounterComponent, "fa-layers-counter", never, { "classes": "classes"; "content": "content"; "title": "title"; "styles": "styles"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLWNvdW50ZXIuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImxheWVycy1jb3VudGVyLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IENvdW50ZXJQYXJhbXMsIFN0eWxlcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBGYUxheWVyc0NvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXJzLmNvbXBvbmVudCc7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGYUxheWVyc0NvdW50ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIHByaXZhdGUgcGFyZW50O1xuICAgIHByaXZhdGUgc2FuaXRpemVyO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICBzdHlsZXM/OiBTdHlsZXM7XG4gICAgY2xhc3Nlcz86IHN0cmluZ1tdO1xuICAgIHJlbmRlcmVkSFRNTDogU2FmZUh0bWw7XG4gICAgY29uc3RydWN0b3IocGFyZW50OiBGYUxheWVyc0NvbXBvbmVudCwgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpO1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkO1xuICAgIHByb3RlY3RlZCBidWlsZFBhcmFtcygpOiBDb3VudGVyUGFyYW1zO1xuICAgIHByaXZhdGUgdXBkYXRlQ29udGVudDtcbn1cbiJdfQ==