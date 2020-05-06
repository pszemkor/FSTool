import { __decorate, __extends } from "tslib";
import { Component, Input } from '@angular/core';
import { FaIconComponent } from './icon.component';
var FaDuotoneIconComponent = /** @class */ (function (_super) {
    __extends(FaDuotoneIconComponent, _super);
    function FaDuotoneIconComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaDuotoneIconComponent.prototype.findIconDefinition = function (i) {
        var lookup = _super.prototype.findIconDefinition.call(this, i);
        if (lookup != null && lookup.prefix !== 'fad') {
            throw new Error('The specified icon does not appear to be a Duotone icon. ' +
                'Check that you specified the correct style: ' +
                ("<fa-duotone-icon [icon]=\"['fab', '" + lookup.iconName + "']\"></fa-duotone-icon> ") +
                ("or use: <fa-icon icon=\"" + lookup.iconName + "\"></fa-icon> instead."));
        }
        return lookup;
    };
    FaDuotoneIconComponent.prototype.buildParams = function () {
        var params = _super.prototype.buildParams.call(this);
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
            template: ""
        })
    ], FaDuotoneIconComponent);
    return FaDuotoneIconComponent;
}(FaIconComponent));
export { FaDuotoneIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVvdG9uZS1pY29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lLyIsInNvdXJjZXMiOlsiaWNvbi9kdW90b25lLWljb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNbkQ7SUFBNEMsMENBQWU7SUFBM0Q7O0lBOEVBLENBQUM7SUFwQ1csbURBQWtCLEdBQTVCLFVBQTZCLENBQTRCO1FBQ3ZELElBQU0sTUFBTSxHQUFHLGlCQUFNLGtCQUFrQixZQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUM3QyxNQUFNLElBQUksS0FBSyxDQUNiLDJEQUEyRDtnQkFDekQsOENBQThDO2lCQUM5Qyx3Q0FBcUMsTUFBTSxDQUFDLFFBQVEsNkJBQXlCLENBQUE7aUJBQzdFLDZCQUEwQixNQUFNLENBQUMsUUFBUSwyQkFBdUIsQ0FBQSxDQUNuRSxDQUFDO1NBQ0g7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRVMsNENBQVcsR0FBckI7UUFDRSxJQUFNLE1BQU0sR0FBRyxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUVuQyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxFQUFFO1lBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFFO1lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDNUU7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksRUFBRTtZQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM3RDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFyRVE7UUFBUixLQUFLLEVBQUU7K0RBQTBDO0lBUXpDO1FBQVIsS0FBSyxFQUFFO2tFQUFrQztJQVFqQztRQUFSLEtBQUssRUFBRTtvRUFBb0M7SUFRbkM7UUFBUixLQUFLLEVBQUU7Z0VBQXVCO0lBUXRCO1FBQVIsS0FBSyxFQUFFO2tFQUF5QjtJQXhDdEIsc0JBQXNCO1FBSmxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO09BQ1csc0JBQXNCLENBOEVsQztJQUFELDZCQUFDO0NBQUEsQUE5RUQsQ0FBNEMsZUFBZSxHQThFMUQ7U0E5RVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24sIEljb25Qcm9wIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IEZhSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vaWNvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYS1kdW90b25lLWljb24nLFxuICB0ZW1wbGF0ZTogYGAsXG59KVxuZXhwb3J0IGNsYXNzIEZhRHVvdG9uZUljb25Db21wb25lbnQgZXh0ZW5kcyBGYUljb25Db21wb25lbnQge1xuICAvKipcbiAgICogU3dhcCB0aGUgZGVmYXVsdCBvcGFjaXR5IG9mIGVhY2ggZHVvdG9uZSBpY29u4oCZcyBsYXllcnMuIFRoaXMgd2lsbCBtYWtlIGFuXG4gICAqIGljb27igJlzIHByaW1hcnkgbGF5ZXIgaGF2ZSB0aGUgZGVmYXVsdCBvcGFjaXR5IG9mIDQwJSByYXRoZXIgdGhhbiBpdHNcbiAgICogc2Vjb25kYXJ5IGxheWVyLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgQElucHV0KCkgc3dhcE9wYWNpdHk/OiAndHJ1ZScgfCAnZmFsc2UnIHwgYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3VzdG9taXplIHRoZSBvcGFjaXR5IG9mIHRoZSBwcmltYXJ5IGljb24gbGF5ZXIuXG4gICAqIFZhbGlkIHZhbHVlcyBhcmUgaW4gcmFuZ2UgWzAsIDEuMF0uXG4gICAqXG4gICAqIEBkZWZhdWx0IDEuMFxuICAgKi9cbiAgQElucHV0KCkgcHJpbWFyeU9wYWNpdHk/OiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEN1c3RvbWl6ZSB0aGUgb3BhY2l0eSBvZiB0aGUgc2Vjb25kYXJ5IGljb24gbGF5ZXIuXG4gICAqIFZhbGlkIHZhbHVlcyBhcmUgaW4gcmFuZ2UgWzAsIDEuMF0uXG4gICAqXG4gICAqIEBkZWZhdWx0IDAuNFxuICAgKi9cbiAgQElucHV0KCkgc2Vjb25kYXJ5T3BhY2l0eT86IHN0cmluZyB8IG51bWJlcjtcblxuICAvKipcbiAgICogQ3VzdG9taXplIHRoZSBjb2xvciBvZiB0aGUgcHJpbWFyeSBpY29uIGxheWVyLlxuICAgKiBBY2NlcHRzIGFueSB2YWxpZCBDU1MgY29sb3IgdmFsdWUuXG4gICAqXG4gICAqIEBkZWZhdWx0IENTUyBpbmhlcml0ZWQgY29sb3JcbiAgICovXG4gIEBJbnB1dCgpIHByaW1hcnlDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogQ3VzdG9taXplIHRoZSBjb2xvciBvZiB0aGUgc2Vjb25kYXJ5IGljb24gbGF5ZXIuXG4gICAqIEFjY2VwdHMgYW55IHZhbGlkIENTUyBjb2xvciB2YWx1ZS5cbiAgICpcbiAgICogQGRlZmF1bHQgQ1NTIGluaGVyaXRlZCBjb2xvclxuICAgKi9cbiAgQElucHV0KCkgc2Vjb25kYXJ5Q29sb3I/OiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGZpbmRJY29uRGVmaW5pdGlvbihpOiBJY29uUHJvcCB8IEljb25EZWZpbml0aW9uKTogSWNvbkRlZmluaXRpb24gfCBudWxsIHtcbiAgICBjb25zdCBsb29rdXAgPSBzdXBlci5maW5kSWNvbkRlZmluaXRpb24oaSk7XG5cbiAgICBpZiAobG9va3VwICE9IG51bGwgJiYgbG9va3VwLnByZWZpeCAhPT0gJ2ZhZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBzcGVjaWZpZWQgaWNvbiBkb2VzIG5vdCBhcHBlYXIgdG8gYmUgYSBEdW90b25lIGljb24uICcgK1xuICAgICAgICAgICdDaGVjayB0aGF0IHlvdSBzcGVjaWZpZWQgdGhlIGNvcnJlY3Qgc3R5bGU6ICcgK1xuICAgICAgICAgIGA8ZmEtZHVvdG9uZS1pY29uIFtpY29uXT1cIlsnZmFiJywgJyR7bG9va3VwLmljb25OYW1lfSddXCI+PC9mYS1kdW90b25lLWljb24+IGAgK1xuICAgICAgICAgIGBvciB1c2U6IDxmYS1pY29uIGljb249XCIke2xvb2t1cC5pY29uTmFtZX1cIj48L2ZhLWljb24+IGluc3RlYWQuYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2t1cDtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZFBhcmFtcygpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzdXBlci5idWlsZFBhcmFtcygpO1xuXG4gICAgaWYgKHRoaXMuc3dhcE9wYWNpdHkgPT09IHRydWUgfHwgdGhpcy5zd2FwT3BhY2l0eSA9PT0gJ3RydWUnKSB7XG4gICAgICBwYXJhbXMuY2xhc3Nlcy5wdXNoKCdmYS1zd2FwLW9wYWNpdHknKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJpbWFyeU9wYWNpdHkgIT0gbnVsbCkge1xuICAgICAgcGFyYW1zLnN0eWxlc1snLS1mYS1wcmltYXJ5LW9wYWNpdHknXSA9IHRoaXMucHJpbWFyeU9wYWNpdHkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vjb25kYXJ5T3BhY2l0eSAhPSBudWxsKSB7XG4gICAgICBwYXJhbXMuc3R5bGVzWyctLWZhLXNlY29uZGFyeS1vcGFjaXR5J10gPSB0aGlzLnNlY29uZGFyeU9wYWNpdHkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJpbWFyeUNvbG9yICE9IG51bGwpIHtcbiAgICAgIHBhcmFtcy5zdHlsZXNbJy0tZmEtcHJpbWFyeS1jb2xvciddID0gdGhpcy5wcmltYXJ5Q29sb3I7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlY29uZGFyeUNvbG9yICE9IG51bGwpIHtcbiAgICAgIHBhcmFtcy5zdHlsZXNbJy0tZmEtc2Vjb25kYXJ5LWNvbG9yJ10gPSB0aGlzLnNlY29uZGFyeUNvbG9yO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cbn1cbiJdfQ==