"use strict";
exports.__esModule = true;
exports.ScrollIntoViewTrigger = void 0;
var ScrollIntoViewTrigger = /** @class */ (function () {
    function ScrollIntoViewTrigger(props) {
        var _this = this;
        var _a, _b;
        this.checkIfElementInView = function (entries) {
            var _loop_1 = function (entry) {
                if (entry.isIntersecting) {
                    _this.intersectionCallback(entry);
                    // Remove item from list if triggering only once
                    if (_this.triggerOncePerItem) {
                        _this.targetElements = _this.targetElements.filter(function (element) { return element !== entry.target; });
                    }
                }
            };
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                _loop_1(entry);
            }
            _this.intersectionObserver.disconnect();
            _this.checkIfAllItemsViewed();
        };
        this.onScroll = function () {
            // Debounce previous scroll events
            if (_this.scrollTimeout) {
                clearTimeout(_this.scrollTimeout);
            }
            // set timeout for image loading
            _this.scrollTimeout = setTimeout(_this.check, _this.delay);
        };
        this.check = function () {
            _this.intersectionObserver = new IntersectionObserver(_this.checkIfElementInView, { root: _this.rootElement });
            for (var _i = 0, _a = _this.targetElements; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.intersectionObserver.observe(item);
            }
        };
        this.destroy = function () {
            clearTimeout(_this.scrollTimeout);
            _this.rootElement.removeEventListener("scroll", _this.onScroll);
        };
        this.rootElement = props.rootEl;
        this.targetElements = props.targetElements;
        this.intersectionCallback = props.intersectionCallback;
        this.delay = (_a = props.delay) !== null && _a !== void 0 ? _a : 200;
        this.triggerOncePerItem = (_b = props.triggerOncePerItem) !== null && _b !== void 0 ? _b : true;
        this.rootElement.addEventListener("scroll", this.onScroll);
    }
    ScrollIntoViewTrigger.prototype.checkIfAllItemsViewed = function () {
        if (this.triggerOncePerItem && this.targetElements.length === 0) {
            this.destroy();
        }
    };
    return ScrollIntoViewTrigger;
}());
exports.ScrollIntoViewTrigger = ScrollIntoViewTrigger;
