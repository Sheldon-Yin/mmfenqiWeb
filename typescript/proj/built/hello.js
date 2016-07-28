define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    var HelloViewModel = (function () {
        function HelloViewModel(language, framework) {
            this.language = ko.observable(language);
            this.framework = ko.observable(framework);
        }
        return HelloViewModel;
    }());
    ko.applyBindings(new HelloViewModel("TypeScript", "Knockout"));
});
//# sourceMappingURL=hello.js.map