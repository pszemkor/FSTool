import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
let FaStackItemSizeDirective = class FaStackItemSizeDirective {
    constructor() {
        /**
         * Specify whether icon inside {@link FaStackComponent} should be rendered in
         * regular size (1x) or as a larger icon (2x).
         */
        this.stackItemSize = '1x';
    }
    ngOnChanges(changes) {
        if ('size' in changes) {
            throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. ' +
                'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.');
        }
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
export { FaStackItemSizeDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2staXRlbS1zaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lLyIsInNvdXJjZXMiOlsic3RhY2svc3RhY2staXRlbS1zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBUTNFLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBQXJDO1FBQ0U7OztXQUdHO1FBQ00sa0JBQWEsR0FBZ0IsSUFBSSxDQUFDO0lBZTdDLENBQUM7SUFSQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0VBQXNFO2dCQUNwRSxpRkFBaUYsQ0FDcEYsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFmVTtJQUFSLEtBQUssRUFBRTsrREFBbUM7QUFLbEM7SUFBUixLQUFLLEVBQUU7c0RBQWlCO0FBVmQsd0JBQXdCO0lBSnBDLFNBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsdURBQXVEO0tBQ2xFLENBQUM7R0FDVyx3QkFBd0IsQ0FvQnBDO1NBcEJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2l6ZVByb3AgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgRmFTdGFja0NvbXBvbmVudCB9IGZyb20gJy4vc3RhY2suY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdmYS1pY29uW3N0YWNrSXRlbVNpemVdLGZhLWR1b3RvbmUtaWNvbltzdGFja0l0ZW1TaXplXScsXG59KVxuZXhwb3J0IGNsYXNzIEZhU3RhY2tJdGVtU2l6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHdoZXRoZXIgaWNvbiBpbnNpZGUge0BsaW5rIEZhU3RhY2tDb21wb25lbnR9IHNob3VsZCBiZSByZW5kZXJlZCBpblxuICAgKiByZWd1bGFyIHNpemUgKDF4KSBvciBhcyBhIGxhcmdlciBpY29uICgyeCkuXG4gICAqL1xuICBASW5wdXQoKSBzdGFja0l0ZW1TaXplOiAnMXgnIHwgJzJ4JyA9ICcxeCc7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgQElucHV0KCkgc2l6ZT86IFNpemVQcm9wO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoJ3NpemUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2ZhLWljb24gaXMgbm90IGFsbG93ZWQgdG8gY3VzdG9taXplIHNpemUgd2hlbiB1c2VkIGluc2lkZSBmYS1zdGFjay4gJyArXG4gICAgICAgICAgJ1NldCBzaXplIG9uIHRoZSBlbmNsb3NpbmcgZmEtc3RhY2sgaW5zdGVhZDogPGZhLXN0YWNrIHNpemU9XCI0eFwiPi4uLjwvZmEtc3RhY2s+LicsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19