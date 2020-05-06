import { IconDefinition, IconName, IconPack, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import * as ɵngcc0 from '@angular/core';
export interface FaIconLibraryInterface {
    addIcons(...icons: IconDefinition[]): void;
    addIconPacks(...packs: IconPack[]): void;
    getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition | null;
}
export declare class FaIconLibrary implements FaIconLibraryInterface {
    private definitions;
    addIcons(...icons: IconDefinition[]): void;
    addIconPacks(...packs: IconPack[]): void;
    getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition | null;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FaIconLibrary, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1saWJyYXJ5LmQudHMiLCJzb3VyY2VzIjpbImljb24tbGlicmFyeS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSWNvbkRlZmluaXRpb24sIEljb25OYW1lLCBJY29uUGFjaywgSWNvblByZWZpeCB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIEZhSWNvbkxpYnJhcnlJbnRlcmZhY2Uge1xuICAgIGFkZEljb25zKC4uLmljb25zOiBJY29uRGVmaW5pdGlvbltdKTogdm9pZDtcbiAgICBhZGRJY29uUGFja3MoLi4ucGFja3M6IEljb25QYWNrW10pOiB2b2lkO1xuICAgIGdldEljb25EZWZpbml0aW9uKHByZWZpeDogSWNvblByZWZpeCwgbmFtZTogSWNvbk5hbWUpOiBJY29uRGVmaW5pdGlvbiB8IG51bGw7XG59XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGYUljb25MaWJyYXJ5IGltcGxlbWVudHMgRmFJY29uTGlicmFyeUludGVyZmFjZSB7XG4gICAgcHJpdmF0ZSBkZWZpbml0aW9ucztcbiAgICBhZGRJY29ucyguLi5pY29uczogSWNvbkRlZmluaXRpb25bXSk6IHZvaWQ7XG4gICAgYWRkSWNvblBhY2tzKC4uLnBhY2tzOiBJY29uUGFja1tdKTogdm9pZDtcbiAgICBnZXRJY29uRGVmaW5pdGlvbihwcmVmaXg6IEljb25QcmVmaXgsIG5hbWU6IEljb25OYW1lKTogSWNvbkRlZmluaXRpb24gfCBudWxsO1xufVxuIl19