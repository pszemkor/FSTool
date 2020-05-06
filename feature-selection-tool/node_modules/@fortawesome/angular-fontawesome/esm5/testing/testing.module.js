import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockFaIconLibrary } from './icon/mock-icon-library.service';
var FontAwesomeTestingModule = /** @class */ (function () {
    function FontAwesomeTestingModule() {
    }
    FontAwesomeTestingModule = __decorate([
        NgModule({
            exports: [FontAwesomeModule],
            providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }],
        })
    ], FontAwesomeTestingModule);
    return FontAwesomeTestingModule;
}());
export { FontAwesomeTestingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZS90ZXN0aW5nLyIsInNvdXJjZXMiOlsidGVzdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBTXJFO0lBQUE7SUFBdUMsQ0FBQztJQUEzQix3QkFBd0I7UUFKcEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDNUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO1NBQ3hFLENBQUM7T0FDVyx3QkFBd0IsQ0FBRztJQUFELCtCQUFDO0NBQUEsQUFBeEMsSUFBd0M7U0FBM0Isd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZhSWNvbkxpYnJhcnksIEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgTW9ja0ZhSWNvbkxpYnJhcnkgfSBmcm9tICcuL2ljb24vbW9jay1pY29uLWxpYnJhcnkuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtGb250QXdlc29tZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogRmFJY29uTGlicmFyeSwgdXNlRXhpc3Rpbmc6IE1vY2tGYUljb25MaWJyYXJ5IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBGb250QXdlc29tZVRlc3RpbmdNb2R1bGUge31cbiJdfQ==