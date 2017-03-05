webpackHotUpdate(0,{

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var emailinput_1 = __webpack_require__(9);
var numberinput_1 = __webpack_require__(10);
var genericinput_1 = __webpack_require__(2);
var submitinput_1 = __webpack_require__(11);
var isEmail = __webpack_require__(17);
var isAlpha = __webpack_require__(15);
var Anmelden = (function (_super) {
    __extends(Anmelden, _super);
    function Anmelden() {
        var _this = _super.call(this) || this;
        _this.state = { email: "", vorname: "", nachname: "", numGuests: "0",
            emValid: false, vnValid: false, nnValid: false, isFormValid: false, ngValid: true
        };
        return _this;
    }
    Anmelden.prototype.validateForm = function () {
        this.setState({
            emValid: isEmail(this.state.email),
            vnValid: this.state.vorname.length > 0
                && isAlpha(this.state.vorname),
            nnValid: this.state.nachname.length > 0
                && isAlpha(this.state.nachname),
            ngValid: (function (numGuests) {
                var i = parseInt(numGuests);
                if (i === NaN) {
                    return false;
                }
                else {
                    return i >= 0 && i <= 10;
                }
            })(this.state.numGuests)
        }, function afterUpdate() {
            this.setState({ isFormValid: this.state.emValid
                    && this.state.vnValid
                    && this.state.ngValid
                    && this.state.nnValid });
        });
    };
    Anmelden.prototype.update = function (partialState) {
        this.setState(partialState, this.validateForm);
    };
    Anmelden.prototype.onSubmitForm = function (click) {
        console.log("test");
        click.preventDefault();
        click.stopPropagation();
    };
    Anmelden.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", { target: "#" },
            React.createElement(emailinput_1.EmailInput, { isValid: this.state.emValid, name: "email", hint: "E-Mail Adresse", onChange: function (newEmail) { return _this.update({ email: newEmail }); } }),
            React.createElement(genericinput_1.GenericInput, { isValid: this.state.vnValid, name: "vorname", hint: "Vorname", onChange: function (newText) { return _this.update({ vorname: newText }); } }),
            React.createElement(genericinput_1.GenericInput, { isValid: this.state.nnValid, name: "nachname", hint: "Nachname", onChange: function (newText) { return _this.update({ nachname: newText }); } }),
            React.createElement("div", { className: "number" },
                React.createElement("span", null, "Ich komme mit"),
                React.createElement(numberinput_1.NumberInput, { isValid: this.state.ngValid, name: "numguests", hint: "", onChange: function (newNumber) { return _this.update({ numGuests: newNumber }); } }),
                React.createElement("span", null, "Personen.")),
            React.createElement(submitinput_1.SubmitInput, { disabled: !this.state.isFormValid, onClick: function (e) { return _this.onSubmitForm(e); } })));
    };
    return Anmelden;
}(React.Component));
exports.Anmelden = Anmelden;


/***/ })

})
//# sourceMappingURL=0.c822cd82b8fb66107c26.hot-update.js.map