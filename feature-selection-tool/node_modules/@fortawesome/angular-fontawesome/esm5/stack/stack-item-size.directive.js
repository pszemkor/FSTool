import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
var FaStackItemSizeDirective = /** @class */ (function () {
    function FaStackItemSizeDirective() {
        /**
         * Specify whether icon inside {@link FaStackComponent} should be rendered in
         * regular size (1x) or as a larger icon (2x).
         */
        this.stackItemSize = '1x';
    }
    FaStackItemSizeDirective.prototype.ngOnChanges = function (changes) {
        if ('size' in changes) {
            throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. ' +
                'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.');
        }
    };
    __decorate([
        Input()
    ], FaStackItemSizeDirective.prototype, "stackItemSize", void 0);
    __decorate([
        Input()
    ], FaStackItemSizeDirective.prototype, "size", void 0);
    FaStackItemSizeDirective = __decorate([
        Directive({
            // tslint:disable-next-line:directive-selector
            selector: 'fa-icon[stackItemSize],fa-duotone-icon[stackItemSize]',
        })
    ], FaStackItemSizeDirective);
    return FaStackItemSizeDirective;
}());
export { FaStackItemSizeDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2staXRlbS1zaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lLyIsInNvdXJjZXMiOlsic3RhY2svc3RhY2staXRlbS1zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBUTNFO0lBQUE7UUFDRTs7O1dBR0c7UUFDTSxrQkFBYSxHQUFnQixJQUFJLENBQUM7SUFlN0MsQ0FBQztJQVJDLDhDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FDYixzRUFBc0U7Z0JBQ3BFLGlGQUFpRixDQUNwRixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBZFE7UUFBUixLQUFLLEVBQUU7bUVBQW1DO0lBS2xDO1FBQVIsS0FBSyxFQUFFOzBEQUFpQjtJQVZkLHdCQUF3QjtRQUpwQyxTQUFTLENBQUM7WUFDVCw4Q0FBOEM7WUFDOUMsUUFBUSxFQUFFLHVEQUF1RDtTQUNsRSxDQUFDO09BQ1csd0JBQXdCLENBb0JwQztJQUFELCtCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaXplUHJvcCB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBGYVN0YWNrQ29tcG9uZW50IH0gZnJvbSAnLi9zdGFjay5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2ZhLWljb25bc3RhY2tJdGVtU2l6ZV0sZmEtZHVvdG9uZS1pY29uW3N0YWNrSXRlbVNpemVdJyxcbn0pXG5leHBvcnQgY2xhc3MgRmFTdGFja0l0ZW1TaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgd2hldGhlciBpY29uIGluc2lkZSB7QGxpbmsgRmFTdGFja0NvbXBvbmVudH0gc2hvdWxkIGJlIHJlbmRlcmVkIGluXG4gICAqIHJlZ3VsYXIgc2l6ZSAoMXgpIG9yIGFzIGEgbGFyZ2VyIGljb24gKDJ4KS5cbiAgICovXG4gIEBJbnB1dCgpIHN0YWNrSXRlbVNpemU6ICcxeCcgfCAnMngnID0gJzF4JztcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBASW5wdXQoKSBzaXplPzogU2l6ZVByb3A7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICgnc2l6ZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnZmEtaWNvbiBpcyBub3QgYWxsb3dlZCB0byBjdXN0b21pemUgc2l6ZSB3aGVuIHVzZWQgaW5zaWRlIGZhLXN0YWNrLiAnICtcbiAgICAgICAgICAnU2V0IHNpemUgb24gdGhlIGVuY2xvc2luZyBmYS1zdGFjayBpbnN0ZWFkOiA8ZmEtc3RhY2sgc2l6ZT1cIjR4XCI+Li4uPC9mYS1zdGFjaz4uJyxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=