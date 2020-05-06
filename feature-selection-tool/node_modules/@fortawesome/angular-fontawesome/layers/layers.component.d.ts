import { ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
/**
 * Fontawesome layers.
 */
import * as ɵngcc0 from '@angular/core';
export declare class FaLayersComponent implements OnInit, OnChanges {
    private renderer;
    private elementRef;
    private config;
    size?: SizeProp;
    fixedWidth?: boolean;
    constructor(renderer: Renderer2, elementRef: ElementRef, config: FaConfig);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaLayersComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FaLayersComponent, "fa-layers", never, { "fixedWidth": "fixedWidth"; "size": "size"; }, {}, never, ["fa-icon, fa-duotone-icon, fa-layers-text, fa-layers-counter"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJsYXllcnMuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIE9uSW5pdCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaXplUHJvcCB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBGYUNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG4vKipcbiAqIEZvbnRhd2Vzb21lIGxheWVycy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRmFMYXllcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBjb25maWc7XG4gICAgc2l6ZT86IFNpemVQcm9wO1xuICAgIGZpeGVkV2lkdGg/OiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGNvbmZpZzogRmFDb25maWcpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XG59XG4iXX0=