import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let FaIconLibrary = class FaIconLibrary {
    constructor() {
        this.definitions = {};
    }
    addIcons(...icons) {
        for (const icon of icons) {
            if (!(icon.prefix in this.definitions)) {
                this.definitions[icon.prefix] = {};
            }
            this.definitions[icon.prefix][icon.iconName] = icon;
        }
    }
    addIconPacks(...packs) {
        for (const pack of packs) {
            const icons = Object.keys(pack).map((key) => pack[key]);
            this.addIcons(...icons);
        }
    }
    getIconDefinition(prefix, name) {
        if (prefix in this.definitions && name in this.definitions[prefix]) {
            return this.definitions[prefix][name];
        }
        return null;
    }
};
FaIconLibrary.ɵprov = i0.ɵɵdefineInjectable({ factory: function FaIconLibrary_Factory() { return new FaIconLibrary(); }, token: FaIconLibrary, providedIn: "root" });
FaIconLibrary = __decorate([
    Injectable({ providedIn: 'root' })
], FaIconLibrary);
export { FaIconLibrary };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1saWJyYXJ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJpY29uLWxpYnJhcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBVTNDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFBMUI7UUFDVSxnQkFBVyxHQUE2RCxFQUFFLENBQUM7S0F3QnBGO0lBdEJDLFFBQVEsQ0FBQyxHQUFHLEtBQXVCO1FBQ2pDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDcEM7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFHLEtBQWlCO1FBQy9CLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3hCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsTUFBa0IsRUFBRSxJQUFjO1FBQ2xELElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQTs7QUF6QlksYUFBYTtJQUR6QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDdEIsYUFBYSxDQXlCekI7U0F6QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uLCBJY29uTmFtZSwgSWNvblBhY2ssIEljb25QcmVmaXggfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhSWNvbkxpYnJhcnlJbnRlcmZhY2Uge1xuICBhZGRJY29ucyguLi5pY29uczogSWNvbkRlZmluaXRpb25bXSk6IHZvaWQ7XG4gIGFkZEljb25QYWNrcyguLi5wYWNrczogSWNvblBhY2tbXSk6IHZvaWQ7XG4gIGdldEljb25EZWZpbml0aW9uKHByZWZpeDogSWNvblByZWZpeCwgbmFtZTogSWNvbk5hbWUpOiBJY29uRGVmaW5pdGlvbiB8IG51bGw7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRmFJY29uTGlicmFyeSBpbXBsZW1lbnRzIEZhSWNvbkxpYnJhcnlJbnRlcmZhY2Uge1xuICBwcml2YXRlIGRlZmluaXRpb25zOiB7IFtwcmVmaXg6IHN0cmluZ106IHsgW25hbWU6IHN0cmluZ106IEljb25EZWZpbml0aW9uIH0gfSA9IHt9O1xuXG4gIGFkZEljb25zKC4uLmljb25zOiBJY29uRGVmaW5pdGlvbltdKSB7XG4gICAgZm9yIChjb25zdCBpY29uIG9mIGljb25zKSB7XG4gICAgICBpZiAoIShpY29uLnByZWZpeCBpbiB0aGlzLmRlZmluaXRpb25zKSkge1xuICAgICAgICB0aGlzLmRlZmluaXRpb25zW2ljb24ucHJlZml4XSA9IHt9O1xuICAgICAgfVxuICAgICAgdGhpcy5kZWZpbml0aW9uc1tpY29uLnByZWZpeF1baWNvbi5pY29uTmFtZV0gPSBpY29uO1xuICAgIH1cbiAgfVxuXG4gIGFkZEljb25QYWNrcyguLi5wYWNrczogSWNvblBhY2tbXSkge1xuICAgIGZvciAoY29uc3QgcGFjayBvZiBwYWNrcykge1xuICAgICAgY29uc3QgaWNvbnMgPSBPYmplY3Qua2V5cyhwYWNrKS5tYXAoKGtleSkgPT4gcGFja1trZXldKTtcbiAgICAgIHRoaXMuYWRkSWNvbnMoLi4uaWNvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb25EZWZpbml0aW9uKHByZWZpeDogSWNvblByZWZpeCwgbmFtZTogSWNvbk5hbWUpOiBJY29uRGVmaW5pdGlvbiB8IG51bGwge1xuICAgIGlmIChwcmVmaXggaW4gdGhpcy5kZWZpbml0aW9ucyAmJiBuYW1lIGluIHRoaXMuZGVmaW5pdGlvbnNbcHJlZml4XSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmaW5pdGlvbnNbcHJlZml4XVtuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==