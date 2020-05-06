/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { DateAdapter } from './date-adapter';
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
import * as ɵngcc0 from '@angular/core';
export declare class NativeDateAdapter extends DateAdapter<Date> {
    /** Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors. */
    private readonly _clampDate;
    /**
     * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
     * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
     * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
     * will produce `'8/13/1800'`.
     *
     * TODO(mmalerba): drop this variable. It's not being used in the code right now. We're now
     * getting the string representation of a Date object from its utc representation. We're keeping
     * it here for sometime, just for precaution, in case we decide to revert some of these changes
     * though.
     */
    useUtcForDisplay: boolean;
    constructor(matDateLocale: string, platform: Platform);
    getYear(date: Date): number;
    getMonth(date: Date): number;
    getDate(date: Date): number;
    getDayOfWeek(date: Date): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Date): string;
    getFirstDayOfWeek(): number;
    getNumDaysInMonth(date: Date): number;
    clone(date: Date): Date;
    createDate(year: number, month: number, date: number): Date;
    today(): Date;
    parse(value: any): Date | null;
    format(date: Date, displayFormat: Object): string;
    addCalendarYears(date: Date, years: number): Date;
    addCalendarMonths(date: Date, months: number): Date;
    addCalendarDays(date: Date, days: number): Date;
    toIso8601(date: Date): string;
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    deserialize(value: any): Date | null;
    isDateInstance(obj: any): boolean;
    isValid(date: Date): boolean;
    invalid(): Date;
    /** Creates a date but allows the month and date to overflow. */
    private _createDateWithOverflow;
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    private _2digit;
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    private _stripDirectionalityCharacters;
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param date Date from which we want to get the string representation according to dtf
     * @returns A Date object with its UTC representation based on the passed in date info
     */
    private _format;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NativeDateAdapter, [{ optional: true; }, null]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NativeDateAdapter>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtYWRhcHRlci5kLnRzIiwic291cmNlcyI6WyJuYXRpdmUtZGF0ZS1hZGFwdGVyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2RhdGUtYWRhcHRlcic7XG4vKiogQWRhcHRzIHRoZSBuYXRpdmUgSlMgRGF0ZSBmb3IgdXNlIHdpdGggY2RrLWJhc2VkIGNvbXBvbmVudHMgdGhhdCB3b3JrIHdpdGggZGF0ZXMuICovXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBOYXRpdmVEYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPERhdGU+IHtcbiAgICAvKiogV2hldGhlciB0byBjbGFtcCB0aGUgZGF0ZSBiZXR3ZWVuIDEgYW5kIDk5OTkgdG8gYXZvaWQgSUUgYW5kIEVkZ2UgZXJyb3JzLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NsYW1wRGF0ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBgdGltZVpvbmU6ICd1dGMnYCB3aXRoIGBJbnRsLkRhdGVUaW1lRm9ybWF0YCB3aGVuIGZvcm1hdHRpbmcgZGF0ZXMuXG4gICAgICogV2l0aG91dCB0aGlzIGBJbnRsLkRhdGVUaW1lRm9ybWF0YCBzb21ldGltZXMgY2hvb3NlcyB0aGUgd3JvbmcgdGltZVpvbmUsIHdoaWNoIGNhbiB0aHJvdyBvZmZcbiAgICAgKiB0aGUgcmVzdWx0LiAoZS5nLiBpbiB0aGUgZW4tVVMgbG9jYWxlIGBuZXcgRGF0ZSgxODAwLCA3LCAxNCkudG9Mb2NhbGVEYXRlU3RyaW5nKClgXG4gICAgICogd2lsbCBwcm9kdWNlIGAnOC8xMy8xODAwJ2AuXG4gICAgICpcbiAgICAgKiBUT0RPKG1tYWxlcmJhKTogZHJvcCB0aGlzIHZhcmlhYmxlLiBJdCdzIG5vdCBiZWluZyB1c2VkIGluIHRoZSBjb2RlIHJpZ2h0IG5vdy4gV2UncmUgbm93XG4gICAgICogZ2V0dGluZyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgRGF0ZSBvYmplY3QgZnJvbSBpdHMgdXRjIHJlcHJlc2VudGF0aW9uLiBXZSdyZSBrZWVwaW5nXG4gICAgICogaXQgaGVyZSBmb3Igc29tZXRpbWUsIGp1c3QgZm9yIHByZWNhdXRpb24sIGluIGNhc2Ugd2UgZGVjaWRlIHRvIHJldmVydCBzb21lIG9mIHRoZXNlIGNoYW5nZXNcbiAgICAgKiB0aG91Z2guXG4gICAgICovXG4gICAgdXNlVXRjRm9yRGlzcGxheTogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3RvcihtYXREYXRlTG9jYWxlOiBzdHJpbmcsIHBsYXRmb3JtOiBQbGF0Zm9ybSk7XG4gICAgZ2V0WWVhcihkYXRlOiBEYXRlKTogbnVtYmVyO1xuICAgIGdldE1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXI7XG4gICAgZ2V0RGF0ZShkYXRlOiBEYXRlKTogbnVtYmVyO1xuICAgIGdldERheU9mV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyO1xuICAgIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xuICAgIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXTtcbiAgICBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG4gICAgZ2V0WWVhck5hbWUoZGF0ZTogRGF0ZSk6IHN0cmluZztcbiAgICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXI7XG4gICAgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlcjtcbiAgICBjbG9uZShkYXRlOiBEYXRlKTogRGF0ZTtcbiAgICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogRGF0ZTtcbiAgICB0b2RheSgpOiBEYXRlO1xuICAgIHBhcnNlKHZhbHVlOiBhbnkpOiBEYXRlIHwgbnVsbDtcbiAgICBmb3JtYXQoZGF0ZTogRGF0ZSwgZGlzcGxheUZvcm1hdDogT2JqZWN0KTogc3RyaW5nO1xuICAgIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogRGF0ZSwgeWVhcnM6IG51bWJlcik6IERhdGU7XG4gICAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRGF0ZSwgbW9udGhzOiBudW1iZXIpOiBEYXRlO1xuICAgIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlO1xuICAgIHRvSXNvODYwMShkYXRlOiBEYXRlKTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgRGF0ZSBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xuICAgICAqIChodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQpIGludG8gdmFsaWQgRGF0ZXMgYW5kIGVtcHR5IHN0cmluZyBpbnRvIG51bGwuIFJldHVybnMgYW5cbiAgICAgKiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXG4gICAgICovXG4gICAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IERhdGUgfCBudWxsO1xuICAgIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbjtcbiAgICBpc1ZhbGlkKGRhdGU6IERhdGUpOiBib29sZWFuO1xuICAgIGludmFsaWQoKTogRGF0ZTtcbiAgICAvKiogQ3JlYXRlcyBhIGRhdGUgYnV0IGFsbG93cyB0aGUgbW9udGggYW5kIGRhdGUgdG8gb3ZlcmZsb3cuICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdztcbiAgICAvKipcbiAgICAgKiBQYWRzIGEgbnVtYmVyIHRvIG1ha2UgaXQgdHdvIGRpZ2l0cy5cbiAgICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIHRvIHBhZC5cbiAgICAgKiBAcmV0dXJucyBUaGUgcGFkZGVkIG51bWJlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIF8yZGlnaXQ7XG4gICAgLyoqXG4gICAgICogU3RyaXAgb3V0IHVuaWNvZGUgTFRSIGFuZCBSVEwgY2hhcmFjdGVycy4gRWRnZSBhbmQgSUUgaW5zZXJ0IHRoZXNlIGludG8gZm9ybWF0dGVkIGRhdGVzIHdoaWxlXG4gICAgICogb3RoZXIgYnJvd3NlcnMgZG8gbm90LiBXZSByZW1vdmUgdGhlbSB0byBtYWtlIG91dHB1dCBjb25zaXN0ZW50IGFuZCBiZWNhdXNlIHRoZXkgaW50ZXJmZXJlIHdpdGhcbiAgICAgKiBkYXRlIHBhcnNpbmcuXG4gICAgICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHN0cmlwIGRpcmVjdGlvbiBjaGFyYWN0ZXJzIGZyb20uXG4gICAgICogQHJldHVybnMgVGhlIHN0cmlwcGVkIHN0cmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycztcbiAgICAvKipcbiAgICAgKiBXaGVuIGNvbnZlcnRpbmcgRGF0ZSBvYmplY3QgdG8gc3RyaW5nLCBqYXZhc2NyaXB0IGJ1aWx0LWluIGZ1bmN0aW9ucyBtYXkgcmV0dXJuIHdyb25nXG4gICAgICogcmVzdWx0cyBiZWNhdXNlIGl0IGFwcGxpZXMgaXRzIGludGVybmFsIERTVCBydWxlcy4gVGhlIERTVCBydWxlcyBhcm91bmQgdGhlIHdvcmxkIGNoYW5nZVxuICAgICAqIHZlcnkgZnJlcXVlbnRseSwgYW5kIHRoZSBjdXJyZW50IHZhbGlkIHJ1bGUgaXMgbm90IGFsd2F5cyB2YWxpZCBpbiBwcmV2aW91cyB5ZWFycyB0aG91Z2guXG4gICAgICogV2Ugd29yayBhcm91bmQgdGhpcyBwcm9ibGVtIGJ1aWxkaW5nIGEgbmV3IERhdGUgb2JqZWN0IHdoaWNoIGhhcyBpdHMgaW50ZXJuYWwgVVRDXG4gICAgICogcmVwcmVzZW50YXRpb24gd2l0aCB0aGUgbG9jYWwgZGF0ZSBhbmQgdGltZS5cbiAgICAgKiBAcGFyYW0gZHRmIEludGwuRGF0ZVRpbWVGb3JtYXQgb2JqZWN0LCBjb250YWluZyB0aGUgZGVzaXJlZCBzdHJpbmcgZm9ybWF0LiBJdCBtdXN0IGhhdmVcbiAgICAgKiAgICB0aW1lWm9uZSBzZXQgdG8gJ3V0YycgdG8gd29yayBmaW5lLlxuICAgICAqIEBwYXJhbSBkYXRlIERhdGUgZnJvbSB3aGljaCB3ZSB3YW50IHRvIGdldCB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGFjY29yZGluZyB0byBkdGZcbiAgICAgKiBAcmV0dXJucyBBIERhdGUgb2JqZWN0IHdpdGggaXRzIFVUQyByZXByZXNlbnRhdGlvbiBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGRhdGUgaW5mb1xuICAgICAqL1xuICAgIHByaXZhdGUgX2Zvcm1hdDtcbn1cbiJdfQ==