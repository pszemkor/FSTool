import { __decorate, __read, __spread, __values } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var FaIconLibrary = /** @class */ (function () {
    function FaIconLibrary() {
        this.definitions = {};
    }
    FaIconLibrary.prototype.addIcons = function () {
        var e_1, _a;
        var icons = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            icons[_i] = arguments[_i];
        }
        try {
            for (var icons_1 = __values(icons), icons_1_1 = icons_1.next(); !icons_1_1.done; icons_1_1 = icons_1.next()) {
                var icon = icons_1_1.value;
                if (!(icon.prefix in this.definitions)) {
                    this.definitions[icon.prefix] = {};
                }
                this.definitions[icon.prefix][icon.iconName] = icon;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (icons_1_1 && !icons_1_1.done && (_a = icons_1.return)) _a.call(icons_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    FaIconLibrary.prototype.addIconPacks = function () {
        var e_2, _a;
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        var _loop_1 = function (pack) {
            var icons = Object.keys(pack).map(function (key) { return pack[key]; });
            this_1.addIcons.apply(this_1, __spread(icons));
        };
        var this_1 = this;
        try {
            for (var packs_1 = __values(packs), packs_1_1 = packs_1.next(); !packs_1_1.done; packs_1_1 = packs_1.next()) {
                var pack = packs_1_1.value;
                _loop_1(pack);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (packs_1_1 && !packs_1_1.done && (_a = packs_1.return)) _a.call(packs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    FaIconLibrary.prototype.getIconDefinition = function (prefix, name) {
        if (prefix in this.definitions && name in this.definitions[prefix]) {
            return this.definitions[prefix][name];
        }
        return null;
    };
    FaIconLibrary.ɵprov = i0.ɵɵdefineInjectable({ factory: function FaIconLibrary_Factory() { return new FaIconLibrary(); }, token: FaIconLibrary, providedIn: "root" });
    FaIconLibrary = __decorate([
        Injectable({ providedIn: 'root' })
    ], FaIconLibrary);
    return FaIconLibrary;
}());
export { FaIconLibrary };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1saWJyYXJ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUvIiwic291cmNlcyI6WyJpY29uLWxpYnJhcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBVTNDO0lBQUE7UUFDVSxnQkFBVyxHQUE2RCxFQUFFLENBQUM7S0F3QnBGO0lBdEJDLGdDQUFRLEdBQVI7O1FBQVMsZUFBMEI7YUFBMUIsVUFBMEIsRUFBMUIscUJBQTBCLEVBQTFCLElBQTBCO1lBQTFCLDBCQUEwQjs7O1lBQ2pDLEtBQW1CLElBQUEsVUFBQSxTQUFBLEtBQUssQ0FBQSw0QkFBQSwrQ0FBRTtnQkFBckIsSUFBTSxJQUFJLGtCQUFBO2dCQUNiLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ3BDO2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDckQ7Ozs7Ozs7OztJQUNILENBQUM7SUFFRCxvQ0FBWSxHQUFaOztRQUFhLGVBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiwwQkFBb0I7O2dDQUNwQixJQUFJO1lBQ2IsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUM7WUFDeEQsT0FBSyxRQUFRLHdCQUFJLEtBQUssR0FBRTs7OztZQUYxQixLQUFtQixJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUE7Z0JBQW5CLElBQU0sSUFBSSxrQkFBQTt3QkFBSixJQUFJO2FBR2Q7Ozs7Ozs7OztJQUNILENBQUM7SUFFRCx5Q0FBaUIsR0FBakIsVUFBa0IsTUFBa0IsRUFBRSxJQUFjO1FBQ2xELElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztJQXhCVSxhQUFhO1FBRHpCLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUN0QixhQUFhLENBeUJ6Qjt3QkFuQ0Q7Q0FtQ0MsQUF6QkQsSUF5QkM7U0F6QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uLCBJY29uTmFtZSwgSWNvblBhY2ssIEljb25QcmVmaXggfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhSWNvbkxpYnJhcnlJbnRlcmZhY2Uge1xuICBhZGRJY29ucyguLi5pY29uczogSWNvbkRlZmluaXRpb25bXSk6IHZvaWQ7XG4gIGFkZEljb25QYWNrcyguLi5wYWNrczogSWNvblBhY2tbXSk6IHZvaWQ7XG4gIGdldEljb25EZWZpbml0aW9uKHByZWZpeDogSWNvblByZWZpeCwgbmFtZTogSWNvbk5hbWUpOiBJY29uRGVmaW5pdGlvbiB8IG51bGw7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRmFJY29uTGlicmFyeSBpbXBsZW1lbnRzIEZhSWNvbkxpYnJhcnlJbnRlcmZhY2Uge1xuICBwcml2YXRlIGRlZmluaXRpb25zOiB7IFtwcmVmaXg6IHN0cmluZ106IHsgW25hbWU6IHN0cmluZ106IEljb25EZWZpbml0aW9uIH0gfSA9IHt9O1xuXG4gIGFkZEljb25zKC4uLmljb25zOiBJY29uRGVmaW5pdGlvbltdKSB7XG4gICAgZm9yIChjb25zdCBpY29uIG9mIGljb25zKSB7XG4gICAgICBpZiAoIShpY29uLnByZWZpeCBpbiB0aGlzLmRlZmluaXRpb25zKSkge1xuICAgICAgICB0aGlzLmRlZmluaXRpb25zW2ljb24ucHJlZml4XSA9IHt9O1xuICAgICAgfVxuICAgICAgdGhpcy5kZWZpbml0aW9uc1tpY29uLnByZWZpeF1baWNvbi5pY29uTmFtZV0gPSBpY29uO1xuICAgIH1cbiAgfVxuXG4gIGFkZEljb25QYWNrcyguLi5wYWNrczogSWNvblBhY2tbXSkge1xuICAgIGZvciAoY29uc3QgcGFjayBvZiBwYWNrcykge1xuICAgICAgY29uc3QgaWNvbnMgPSBPYmplY3Qua2V5cyhwYWNrKS5tYXAoKGtleSkgPT4gcGFja1trZXldKTtcbiAgICAgIHRoaXMuYWRkSWNvbnMoLi4uaWNvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb25EZWZpbml0aW9uKHByZWZpeDogSWNvblByZWZpeCwgbmFtZTogSWNvbk5hbWUpOiBJY29uRGVmaW5pdGlvbiB8IG51bGwge1xuICAgIGlmIChwcmVmaXggaW4gdGhpcy5kZWZpbml0aW9ucyAmJiBuYW1lIGluIHRoaXMuZGVmaW5pdGlvbnNbcHJlZml4XSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmaW5pdGlvbnNbcHJlZml4XVtuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==