import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FaIconComponent } from './icon.component';
let FaDuotoneIconComponent = class FaDuotoneIconComponent extends FaIconComponent {
    findIconDefinition(i) {
        const lookup = super.findIconDefinition(i);
        if (lookup != null && lookup.prefix !== 'fad') {
            throw new Error('The specified icon does not appear to be a Duotone icon. ' +
                'Check that you specified the correct style: ' +
                `<fa-duotone-icon [icon]="['fab', '${lookup.iconName}']"></fa-duotone-icon> ` +
                `or use: <fa-icon icon="${lookup.iconName}"></fa-icon> instead.`);
        }
        return lookup;
    }
    buildParams() {
        const params = super.buildParams();
        if (this.swapOpacity === true || this.swapOpacity === 'true') {
            params.classes.push('fa-swap-opacity');
        }
        if (this.primaryOpacity != null) {
            params.styles['--fa-primary-opacity'] = this.primaryOpacity.toString();
        }
        if (this.secondaryOpacity != null) {
            params.styles['--fa-secondary-opacity'] = this.secondaryOpacity.toString();
        }
        if (this.primaryColor != null) {
            params.styles['--fa-primary-color'] = this.primaryColor;
        }
        if (this.secondaryColor != null) {
            params.styles['--fa-secondary-color'] = this.secondaryColor;
        }
        return params;
    }
};
__decorate([
    Input()
], FaDuotoneIconComponent.prototype, "swapOpacity", void 0);
__decorate([
    Input()
], FaDuotoneIconComponent.prototype, "primaryOpacity", void 0);
__decorate([
    Input()
], FaDuotoneIconComponent.prototype, "secondaryOpacity", void 0);
__decorate([
    Input()
], FaDuotoneIconComponent.prototype, "primaryColor", void 0);
__decorate([
    Input()
], FaDuotoneIconComponent.prototype, "secondaryColor", void 0);
FaDuotoneIconComponent = __decorate([
    Component({
        selector: 'fa-duotone-icon',
        template: ``
    })
], FaDuotoneIconComponent);
export { FaDuotoneIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVvdG9uZS1pY29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lLyIsInNvdXJjZXMiOlsiaWNvbi9kdW90b25lLWljb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNbkQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxlQUFlO0lBMEMvQyxrQkFBa0IsQ0FBQyxDQUE0QjtRQUN2RCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMkRBQTJEO2dCQUN6RCw4Q0FBOEM7Z0JBQzlDLHFDQUFxQyxNQUFNLENBQUMsUUFBUSx5QkFBeUI7Z0JBQzdFLDBCQUEwQixNQUFNLENBQUMsUUFBUSx1QkFBdUIsQ0FDbkUsQ0FBQztTQUNIO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVTLFdBQVc7UUFDbkIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7WUFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUU7WUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDeEU7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7WUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM1RTtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDekQ7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFFO1lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQzdEO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUE7QUF0RVU7SUFBUixLQUFLLEVBQUU7MkRBQTBDO0FBUXpDO0lBQVIsS0FBSyxFQUFFOzhEQUFrQztBQVFqQztJQUFSLEtBQUssRUFBRTtnRUFBb0M7QUFRbkM7SUFBUixLQUFLLEVBQUU7NERBQXVCO0FBUXRCO0lBQVIsS0FBSyxFQUFFOzhEQUF5QjtBQXhDdEIsc0JBQXNCO0lBSmxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFDO0dBQ1csc0JBQXNCLENBOEVsQztTQTlFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJY29uRGVmaW5pdGlvbiwgSWNvblByb3AgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgRmFJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZhLWR1b3RvbmUtaWNvbicsXG4gIHRlbXBsYXRlOiBgYCxcbn0pXG5leHBvcnQgY2xhc3MgRmFEdW90b25lSWNvbkNvbXBvbmVudCBleHRlbmRzIEZhSWNvbkNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBTd2FwIHRoZSBkZWZhdWx0IG9wYWNpdHkgb2YgZWFjaCBkdW90b25lIGljb27igJlzIGxheWVycy4gVGhpcyB3aWxsIG1ha2UgYW5cbiAgICogaWNvbuKAmXMgcHJpbWFyeSBsYXllciBoYXZlIHRoZSBkZWZhdWx0IG9wYWNpdHkgb2YgNDAlIHJhdGhlciB0aGFuIGl0c1xuICAgKiBzZWNvbmRhcnkgbGF5ZXIuXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBASW5wdXQoKSBzd2FwT3BhY2l0eT86ICd0cnVlJyB8ICdmYWxzZScgfCBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDdXN0b21pemUgdGhlIG9wYWNpdHkgb2YgdGhlIHByaW1hcnkgaWNvbiBsYXllci5cbiAgICogVmFsaWQgdmFsdWVzIGFyZSBpbiByYW5nZSBbMCwgMS4wXS5cbiAgICpcbiAgICogQGRlZmF1bHQgMS4wXG4gICAqL1xuICBASW5wdXQoKSBwcmltYXJ5T3BhY2l0eT86IHN0cmluZyB8IG51bWJlcjtcblxuICAvKipcbiAgICogQ3VzdG9taXplIHRoZSBvcGFjaXR5IG9mIHRoZSBzZWNvbmRhcnkgaWNvbiBsYXllci5cbiAgICogVmFsaWQgdmFsdWVzIGFyZSBpbiByYW5nZSBbMCwgMS4wXS5cbiAgICpcbiAgICogQGRlZmF1bHQgMC40XG4gICAqL1xuICBASW5wdXQoKSBzZWNvbmRhcnlPcGFjaXR5Pzogc3RyaW5nIHwgbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDdXN0b21pemUgdGhlIGNvbG9yIG9mIHRoZSBwcmltYXJ5IGljb24gbGF5ZXIuXG4gICAqIEFjY2VwdHMgYW55IHZhbGlkIENTUyBjb2xvciB2YWx1ZS5cbiAgICpcbiAgICogQGRlZmF1bHQgQ1NTIGluaGVyaXRlZCBjb2xvclxuICAgKi9cbiAgQElucHV0KCkgcHJpbWFyeUNvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDdXN0b21pemUgdGhlIGNvbG9yIG9mIHRoZSBzZWNvbmRhcnkgaWNvbiBsYXllci5cbiAgICogQWNjZXB0cyBhbnkgdmFsaWQgQ1NTIGNvbG9yIHZhbHVlLlxuICAgKlxuICAgKiBAZGVmYXVsdCBDU1MgaW5oZXJpdGVkIGNvbG9yXG4gICAqL1xuICBASW5wdXQoKSBzZWNvbmRhcnlDb2xvcj86IHN0cmluZztcblxuICBwcm90ZWN0ZWQgZmluZEljb25EZWZpbml0aW9uKGk6IEljb25Qcm9wIHwgSWNvbkRlZmluaXRpb24pOiBJY29uRGVmaW5pdGlvbiB8IG51bGwge1xuICAgIGNvbnN0IGxvb2t1cCA9IHN1cGVyLmZpbmRJY29uRGVmaW5pdGlvbihpKTtcblxuICAgIGlmIChsb29rdXAgIT0gbnVsbCAmJiBsb29rdXAucHJlZml4ICE9PSAnZmFkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIHNwZWNpZmllZCBpY29uIGRvZXMgbm90IGFwcGVhciB0byBiZSBhIER1b3RvbmUgaWNvbi4gJyArXG4gICAgICAgICAgJ0NoZWNrIHRoYXQgeW91IHNwZWNpZmllZCB0aGUgY29ycmVjdCBzdHlsZTogJyArXG4gICAgICAgICAgYDxmYS1kdW90b25lLWljb24gW2ljb25dPVwiWydmYWInLCAnJHtsb29rdXAuaWNvbk5hbWV9J11cIj48L2ZhLWR1b3RvbmUtaWNvbj4gYCArXG4gICAgICAgICAgYG9yIHVzZTogPGZhLWljb24gaWNvbj1cIiR7bG9va3VwLmljb25OYW1lfVwiPjwvZmEtaWNvbj4gaW5zdGVhZC5gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9va3VwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkUGFyYW1zKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN1cGVyLmJ1aWxkUGFyYW1zKCk7XG5cbiAgICBpZiAodGhpcy5zd2FwT3BhY2l0eSA9PT0gdHJ1ZSB8fCB0aGlzLnN3YXBPcGFjaXR5ID09PSAndHJ1ZScpIHtcbiAgICAgIHBhcmFtcy5jbGFzc2VzLnB1c2goJ2ZhLXN3YXAtb3BhY2l0eScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmltYXJ5T3BhY2l0eSAhPSBudWxsKSB7XG4gICAgICBwYXJhbXMuc3R5bGVzWyctLWZhLXByaW1hcnktb3BhY2l0eSddID0gdGhpcy5wcmltYXJ5T3BhY2l0eS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWNvbmRhcnlPcGFjaXR5ICE9IG51bGwpIHtcbiAgICAgIHBhcmFtcy5zdHlsZXNbJy0tZmEtc2Vjb25kYXJ5LW9wYWNpdHknXSA9IHRoaXMuc2Vjb25kYXJ5T3BhY2l0eS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmltYXJ5Q29sb3IgIT0gbnVsbCkge1xuICAgICAgcGFyYW1zLnN0eWxlc1snLS1mYS1wcmltYXJ5LWNvbG9yJ10gPSB0aGlzLnByaW1hcnlDb2xvcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vjb25kYXJ5Q29sb3IgIT0gbnVsbCkge1xuICAgICAgcGFyYW1zLnN0eWxlc1snLS1mYS1zZWNvbmRhcnktY29sb3InXSA9IHRoaXMuc2Vjb25kYXJ5Q29sb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxufVxuIl19