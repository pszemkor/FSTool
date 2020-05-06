/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
/**
 * Directive to automatically resize a textarea to fit its content.
 * @deprecated Use `cdkTextareaAutosize` from `@angular/cdk/text-field` instead.
 * @breaking-change 8.0.0
 */
import * as ɵngcc0 from '@angular/core';
export declare class MatTextareaAutosize extends CdkTextareaAutosize {
    get matAutosizeMinRows(): number;
    set matAutosizeMinRows(value: number);
    get matAutosizeMaxRows(): number;
    set matAutosizeMaxRows(value: number);
    get matAutosize(): boolean;
    set matAutosize(value: boolean);
    get matTextareaAutosize(): boolean;
    set matTextareaAutosize(value: boolean);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatTextareaAutosize, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MatTextareaAutosize, "textarea[mat-autosize], textarea[matTextareaAutosize]", ["matTextareaAutosize"], { "cdkAutosizeMinRows": "cdkAutosizeMinRows"; "cdkAutosizeMaxRows": "cdkAutosizeMaxRows"; "matAutosizeMinRows": "matAutosizeMinRows"; "matAutosizeMaxRows": "matAutosizeMaxRows"; "matAutosize": "mat-autosize"; "matTextareaAutosize": "matTextareaAutosize"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemUuZC50cyIsInNvdXJjZXMiOlsiYXV0b3NpemUuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBDZGtUZXh0YXJlYUF1dG9zaXplIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RleHQtZmllbGQnO1xuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYXV0b21hdGljYWxseSByZXNpemUgYSB0ZXh0YXJlYSB0byBmaXQgaXRzIGNvbnRlbnQuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYGNka1RleHRhcmVhQXV0b3NpemVgIGZyb20gYEBhbmd1bGFyL2Nkay90ZXh0LWZpZWxkYCBpbnN0ZWFkLlxuICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNYXRUZXh0YXJlYUF1dG9zaXplIGV4dGVuZHMgQ2RrVGV4dGFyZWFBdXRvc2l6ZSB7XG4gICAgZ2V0IG1hdEF1dG9zaXplTWluUm93cygpOiBudW1iZXI7XG4gICAgc2V0IG1hdEF1dG9zaXplTWluUm93cyh2YWx1ZTogbnVtYmVyKTtcbiAgICBnZXQgbWF0QXV0b3NpemVNYXhSb3dzKCk6IG51bWJlcjtcbiAgICBzZXQgbWF0QXV0b3NpemVNYXhSb3dzKHZhbHVlOiBudW1iZXIpO1xuICAgIGdldCBtYXRBdXRvc2l6ZSgpOiBib29sZWFuO1xuICAgIHNldCBtYXRBdXRvc2l6ZSh2YWx1ZTogYm9vbGVhbik7XG4gICAgZ2V0IG1hdFRleHRhcmVhQXV0b3NpemUoKTogYm9vbGVhbjtcbiAgICBzZXQgbWF0VGV4dGFyZWFBdXRvc2l6ZSh2YWx1ZTogYm9vbGVhbik7XG59XG4iXX0=