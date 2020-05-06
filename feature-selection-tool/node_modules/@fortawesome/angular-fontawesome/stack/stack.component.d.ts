import { ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import * as ɵngcc0 from '@angular/core';
export declare class FaStackComponent implements OnInit, OnChanges {
    private renderer;
    private elementRef;
    /**
     * Size of the stacked icon.
     * Note that stacked icon is by default 2 times bigger, than non-stacked icon.
     * You'll need to set size using custom CSS to align stacked icon with a
     * simple one. E.g. `fa-stack { font-size: 0.5em; }`.
     */
    size?: SizeProp;
    constructor(renderer: Renderer2, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaStackComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FaStackComponent, "fa-stack", never, { "size": "size"; }, {}, never, ["fa-icon[stackItemSize],fa-duotone-icon[stackItemSize]"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbInN0YWNrLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2l6ZVByb3AgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRmFTdGFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBwcml2YXRlIHJlbmRlcmVyO1xuICAgIHByaXZhdGUgZWxlbWVudFJlZjtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBzdGFja2VkIGljb24uXG4gICAgICogTm90ZSB0aGF0IHN0YWNrZWQgaWNvbiBpcyBieSBkZWZhdWx0IDIgdGltZXMgYmlnZ2VyLCB0aGFuIG5vbi1zdGFja2VkIGljb24uXG4gICAgICogWW91J2xsIG5lZWQgdG8gc2V0IHNpemUgdXNpbmcgY3VzdG9tIENTUyB0byBhbGlnbiBzdGFja2VkIGljb24gd2l0aCBhXG4gICAgICogc2ltcGxlIG9uZS4gRS5nLiBgZmEtc3RhY2sgeyBmb250LXNpemU6IDAuNWVtOyB9YC5cbiAgICAgKi9cbiAgICBzaXplPzogU2l6ZVByb3A7XG4gICAgY29uc3RydWN0b3IocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudFJlZjogRWxlbWVudFJlZik7XG4gICAgbmdPbkluaXQoKTogdm9pZDtcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZDtcbn1cbiJdfQ==