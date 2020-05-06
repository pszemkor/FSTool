/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
import { MatCommonModule } from '../common-behaviors/common-module';
import { HammerInstance, HammerOptions } from './gesture-annotations';
/**
 * Injection token that can be used to provide options to the Hammerjs instance.
 * More info at http://hammerjs.github.io/api/.
 * @deprecated No longer being used. To be removed.
 * @breaking-change 10.0.0
 */
import * as ɵngcc0 from '@angular/core';
export declare const MAT_HAMMER_OPTIONS: InjectionToken<HammerOptions>;
/**
 * Adjusts configuration of our gesture library, Hammer.
 * @deprecated No longer being used. To be removed.
 * @breaking-change 10.0.0
 */
export declare class GestureConfig extends HammerGestureConfig {
    private _hammerOptions?;
    /** List of new event names to add to the gesture support list */
    events: string[];
    constructor(_hammerOptions?: HammerOptions | undefined, _commonModule?: MatCommonModule);
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://material.io/design/#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param element Element to which to assign the new HammerJS gestures.
     * @returns Newly-created HammerJS instance.
     */
    buildHammer(element: HTMLElement): HammerInstance;
    /** Creates a new recognizer, without affecting the default recognizers of HammerJS */
    private _createRecognizer;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GestureConfig, [{ optional: true; }, { optional: true; }]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<GestureConfig>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1jb25maWcuZC50cyIsInNvdXJjZXMiOlsiZ2VzdHVyZS1jb25maWcuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIYW1tZXJHZXN0dXJlQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBNYXRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24tYmVoYXZpb3JzL2NvbW1vbi1tb2R1bGUnO1xuaW1wb3J0IHsgSGFtbWVySW5zdGFuY2UsIEhhbW1lck9wdGlvbnMgfSBmcm9tICcuL2dlc3R1cmUtYW5ub3RhdGlvbnMnO1xuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIG9wdGlvbnMgdG8gdGhlIEhhbW1lcmpzIGluc3RhbmNlLlxuICogTW9yZSBpbmZvIGF0IGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vYXBpLy5cbiAqIEBkZXByZWNhdGVkIE5vIGxvbmdlciBiZWluZyB1c2VkLiBUbyBiZSByZW1vdmVkLlxuICogQGJyZWFraW5nLWNoYW5nZSAxMC4wLjBcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY29uc3QgTUFUX0hBTU1FUl9PUFRJT05TOiBJbmplY3Rpb25Ub2tlbjxIYW1tZXJPcHRpb25zPjtcbi8qKlxuICogQWRqdXN0cyBjb25maWd1cmF0aW9uIG9mIG91ciBnZXN0dXJlIGxpYnJhcnksIEhhbW1lci5cbiAqIEBkZXByZWNhdGVkIE5vIGxvbmdlciBiZWluZyB1c2VkLiBUbyBiZSByZW1vdmVkLlxuICogQGJyZWFraW5nLWNoYW5nZSAxMC4wLjBcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgR2VzdHVyZUNvbmZpZyBleHRlbmRzIEhhbW1lckdlc3R1cmVDb25maWcge1xuICAgIHByaXZhdGUgX2hhbW1lck9wdGlvbnM/O1xuICAgIC8qKiBMaXN0IG9mIG5ldyBldmVudCBuYW1lcyB0byBhZGQgdG8gdGhlIGdlc3R1cmUgc3VwcG9ydCBsaXN0ICovXG4gICAgZXZlbnRzOiBzdHJpbmdbXTtcbiAgICBjb25zdHJ1Y3RvcihfaGFtbWVyT3B0aW9ucz86IEhhbW1lck9wdGlvbnMgfCB1bmRlZmluZWQsIF9jb21tb25Nb2R1bGU/OiBNYXRDb21tb25Nb2R1bGUpO1xuICAgIC8qKlxuICAgICAqIEJ1aWxkcyBIYW1tZXIgaW5zdGFuY2UgbWFudWFsbHkgdG8gYWRkIGN1c3RvbSByZWNvZ25pemVycyB0aGF0IG1hdGNoIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlYy5cbiAgICAgKlxuICAgICAqIE91ciBnZXN0dXJlIG5hbWVzIGNvbWUgZnJvbSB0aGUgTWF0ZXJpYWwgRGVzaWduIGdlc3R1cmVzIHNwZWM6XG4gICAgICogaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vI2dlc3R1cmVzLXRvdWNoLW1lY2hhbmljc1xuICAgICAqXG4gICAgICogTW9yZSBpbmZvcm1hdGlvbiBvbiBkZWZhdWx0IHJlY29nbml6ZXJzIGNhbiBiZSBmb3VuZCBpbiBIYW1tZXIgZG9jczpcbiAgICAgKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL3JlY29nbml6ZXItcGFuL1xuICAgICAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vcmVjb2duaXplci1wcmVzcy9cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gd2hpY2ggdG8gYXNzaWduIHRoZSBuZXcgSGFtbWVySlMgZ2VzdHVyZXMuXG4gICAgICogQHJldHVybnMgTmV3bHktY3JlYXRlZCBIYW1tZXJKUyBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBidWlsZEhhbW1lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhhbW1lckluc3RhbmNlO1xuICAgIC8qKiBDcmVhdGVzIGEgbmV3IHJlY29nbml6ZXIsIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBkZWZhdWx0IHJlY29nbml6ZXJzIG9mIEhhbW1lckpTICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlUmVjb2duaXplcjtcbn1cbiJdfQ==