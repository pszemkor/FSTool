import { __decorate, __param } from "tslib";
import { Component, HostBinding, Input, Optional } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { parse, text, } from '@fortawesome/fontawesome-svg-core';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { faClassList } from '../shared/utils/classlist.util';
import { FaLayersComponent } from './layers.component';
let FaLayersTextComponent = class FaLayersTextComponent {
    constructor(parent, sanitizer) {
        this.parent = parent;
        this.sanitizer = sanitizer;
        this.classes = [];
        faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
    }
    ngOnChanges(changes) {
        if (changes) {
            const params = this.buildParams();
            this.updateContent(params);
        }
    }
    /**
     * Updating params by component props.
     */
    buildParams() {
        const classOpts = {
            flip: this.flip,
            spin: this.spin,
            pulse: this.pulse,
            border: this.border,
            inverse: this.inverse,
            size: this.size || null,
            pull: this.pull || null,
            rotate: this.rotate || null,
            fixedWidth: this.fixedWidth,
        };
        const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;
        return {
            transform: parsedTransform,
            classes: [...faClassList(classOpts), ...this.classes],
            title: this.title,
            styles: this.styles,
        };
    }
    updateContent(params) {
        this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(text(this.content || '', params).html.join('\n'));
    }
};
FaLayersTextComponent.ctorParameters = () => [
    { type: FaLayersComponent, decorators: [{ type: Optional }] },
    { type: DomSanitizer }
];
__decorate([
    Input()
], FaLayersTextComponent.prototype, "content", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "title", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "styles", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "classes", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "spin", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "pulse", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "flip", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "size", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "pull", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "border", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "inverse", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "rotate", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "fixedWidth", void 0);
__decorate([
    Input()
], FaLayersTextComponent.prototype, "transform", void 0);
__decorate([
    HostBinding('innerHTML')
], FaLayersTextComponent.prototype, "renderedHTML", void 0);
FaLayersTextComponent = __decorate([
    Component({
        selector: 'fa-layers-text',
        template: '',
        host: {
            class: 'ng-fa-layers-text',
        }
    }),
    __param(0, Optional())
], FaLayersTextComponent);
export { FaLayersTextComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJzLXRleHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJsYXllcnMvbGF5ZXJzLXRleHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFFTCxLQUFLLEVBS0wsSUFBSSxHQUdMLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBU3ZELElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBa0JoQyxZQUFnQyxNQUF5QixFQUFVLFNBQXVCO1FBQTFELFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQWRqRixZQUFPLEdBQWMsRUFBRSxDQUFDO1FBZS9CLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxXQUFXO1FBQ25CLE1BQU0sU0FBUyxHQUFZO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUk7WUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSTtZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUM1QixDQUFDO1FBRUYsTUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFOUcsT0FBTztZQUNMLFNBQVMsRUFBRSxlQUFlO1lBQzFCLE9BQU8sRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNyRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQWtCO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9HLENBQUM7Q0FDRixDQUFBOztZQXhDeUMsaUJBQWlCLHVCQUE1QyxRQUFRO1lBQXlELFlBQVk7O0FBakJqRjtJQUFSLEtBQUssRUFBRTtzREFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7b0RBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7cURBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFO3NEQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTttREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTtvREFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7bURBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFO21EQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTttREFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7cURBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFO3NEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTtxREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7eURBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFO3dEQUFnQztBQUVkO0lBQXpCLFdBQVcsQ0FBQyxXQUFXLENBQUM7MkRBQXdCO0FBaEJ0QyxxQkFBcUI7SUFQakMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxtQkFBbUI7U0FDM0I7S0FDRixDQUFDO0lBbUJhLFdBQUEsUUFBUSxFQUFFLENBQUE7R0FsQloscUJBQXFCLENBMERqQztTQTFEWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPcHRpb25hbCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgRmxpcFByb3AsXG4gIHBhcnNlLFxuICBQdWxsUHJvcCxcbiAgUm90YXRlUHJvcCxcbiAgU2l6ZVByb3AsXG4gIFN0eWxlcyxcbiAgdGV4dCxcbiAgVGV4dFBhcmFtcyxcbiAgVHJhbnNmb3JtLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFXYXJuSWZQYXJlbnROb3RFeGlzdCB9IGZyb20gJy4uL3NoYXJlZC9lcnJvcnMvd2Fybi1pZi1wYXJlbnQtbm90LWV4aXN0JztcbmltcG9ydCB7IEZhUHJvcHMgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL3Byb3BzLm1vZGVsJztcbmltcG9ydCB7IGZhQ2xhc3NMaXN0IH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzL2NsYXNzbGlzdC51dGlsJztcbmltcG9ydCB7IEZhTGF5ZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllcnMuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmEtbGF5ZXJzLXRleHQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25nLWZhLWxheWVycy10ZXh0JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgRmFMYXllcnNUZXh0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY29udGVudDogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZztcbiAgQElucHV0KCkgc3R5bGVzPzogU3R5bGVzO1xuICBASW5wdXQoKSBjbGFzc2VzPzogc3RyaW5nW10gPSBbXTtcbiAgQElucHV0KCkgc3Bpbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1bHNlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmxpcD86IEZsaXBQcm9wO1xuICBASW5wdXQoKSBzaXplPzogU2l6ZVByb3A7XG4gIEBJbnB1dCgpIHB1bGw/OiBQdWxsUHJvcDtcbiAgQElucHV0KCkgYm9yZGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaW52ZXJzZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJvdGF0ZT86IFJvdGF0ZVByb3A7XG4gIEBJbnB1dCgpIGZpeGVkV2lkdGg/OiBib29sZWFuO1xuICBASW5wdXQoKSB0cmFuc2Zvcm0/OiBzdHJpbmcgfCBUcmFuc2Zvcm07XG5cbiAgQEhvc3RCaW5kaW5nKCdpbm5lckhUTUwnKSByZW5kZXJlZEhUTUw6IFNhZmVIdG1sO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgcGFyZW50OiBGYUxheWVyc0NvbXBvbmVudCwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIGZhV2FybklmUGFyZW50Tm90RXhpc3QodGhpcy5wYXJlbnQsICdGYUxheWVyc0NvbXBvbmVudCcsIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuYnVpbGRQYXJhbXMoKTtcbiAgICAgIHRoaXMudXBkYXRlQ29udGVudChwYXJhbXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGluZyBwYXJhbXMgYnkgY29tcG9uZW50IHByb3BzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkUGFyYW1zKCk6IFRleHRQYXJhbXMge1xuICAgIGNvbnN0IGNsYXNzT3B0czogRmFQcm9wcyA9IHtcbiAgICAgIGZsaXA6IHRoaXMuZmxpcCxcbiAgICAgIHNwaW46IHRoaXMuc3BpbixcbiAgICAgIHB1bHNlOiB0aGlzLnB1bHNlLFxuICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcixcbiAgICAgIGludmVyc2U6IHRoaXMuaW52ZXJzZSxcbiAgICAgIHNpemU6IHRoaXMuc2l6ZSB8fCBudWxsLFxuICAgICAgcHVsbDogdGhpcy5wdWxsIHx8IG51bGwsXG4gICAgICByb3RhdGU6IHRoaXMucm90YXRlIHx8IG51bGwsXG4gICAgICBmaXhlZFdpZHRoOiB0aGlzLmZpeGVkV2lkdGgsXG4gICAgfTtcblxuICAgIGNvbnN0IHBhcnNlZFRyYW5zZm9ybSA9IHR5cGVvZiB0aGlzLnRyYW5zZm9ybSA9PT0gJ3N0cmluZycgPyBwYXJzZS50cmFuc2Zvcm0odGhpcy50cmFuc2Zvcm0pIDogdGhpcy50cmFuc2Zvcm07XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHJhbnNmb3JtOiBwYXJzZWRUcmFuc2Zvcm0sXG4gICAgICBjbGFzc2VzOiBbLi4uZmFDbGFzc0xpc3QoY2xhc3NPcHRzKSwgLi4udGhpcy5jbGFzc2VzXSxcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50KHBhcmFtczogVGV4dFBhcmFtcykge1xuICAgIHRoaXMucmVuZGVyZWRIVE1MID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGV4dCh0aGlzLmNvbnRlbnQgfHwgJycsIHBhcmFtcykuaHRtbC5qb2luKCdcXG4nKSk7XG4gIH1cbn1cbiJdfQ==