!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("@angular/core"),require("@fortawesome/angular-fontawesome")):"function"==typeof define&&define.amd?define("@fortawesome/angular-fontawesome/testing",["exports","@angular/core","@fortawesome/angular-fontawesome"],o):o(((e=e||self).fortawesome=e.fortawesome||{},e.fortawesome["angular-fontawesome"]=e.fortawesome["angular-fontawesome"]||{},e.fortawesome["angular-fontawesome"].testing={}),e.ng.core,e.fortawesome["angular-fontawesome"])}(this,(function(e,o,t){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */function n(e,o,t,n){var r,a=arguments.length,f=a<3?o:null===n?n=Object.getOwnPropertyDescriptor(o,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)f=Reflect.decorate(e,o,t,n);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(f=(a<3?r(f):a>3?r(o,t,f):r(o,t))||f);return a>3&&f&&Object.defineProperty(o,t,f),f}var r={prefix:"fad",iconName:"dummy",icon:[512,512,[],"f030","M50 50 H462 V462 H50 Z"]},a=function(){function e(){}return e.prototype.addIcons=function(){throw new Error("Attempt to add an icon to the MockFaIconLibrary.")},e.prototype.addIconPacks=function(){throw new Error("Attempt to add an icon pack to the MockFaIconLibrary.")},e.prototype.getIconDefinition=function(e,o){return r},e.ɵprov=o["ɵɵdefineInjectable"]({factory:function(){return new e},token:e,providedIn:"root"}),e=n([o.Injectable({providedIn:"root"})],e)}(),f=function(){function e(){}return e=n([o.NgModule({exports:[t.FontAwesomeModule],providers:[{provide:t.FaIconLibrary,useExisting:a}]})],e)}();e.FontAwesomeTestingModule=f,e.ɵa=a,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=fortawesome-angular-fontawesome-testing.umd.min.js.map