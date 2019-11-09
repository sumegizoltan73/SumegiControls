/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "ExtendedValidatorCallout";

    if (Type._registerScript) {
        Type._registerScript("ExtendedValidatorCalloutBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.ExtendedValidatorCallout = function (element) {
            Sys.Extended.UI.ExtendedValidatorCallout.initializeBase(this, [element]);

        }
        Sys.Extended.UI.ExtendedValidatorCallout.prototype = {
            initialize: function () {
                if (!("_validatorMessageEnabled" in Sys.Extended.UI.ExtendedValidatorCallout)) {
                    Sys.Extended.UI.ExtendedValidatorCallout._validatorMessageEnabled = false;
                }

                Sys.Extended.UI.ExtendedValidatorCallout.callBaseMethod(this, 'initialize');
            },

            dispose: function () {
                Sys.Extended.UI.ExtendedValidatorCallout.callBaseMethod(this, "dispose");
            },

            show: function (force) {
                if (force || !this.get_isOpen()) {
                    if (force && Sys.Extended.UI.ValidatorCalloutBehavior._currentCallout) {
                        Sys.Extended.UI.ValidatorCalloutBehavior._currentCallout.hide();
                    }
                    if (Sys.Extended.UI.ValidatorCalloutBehavior._currentCallout != null) {
                        return;
                    }

                    if (Sys.Extended.UI.ExtendedValidatorCallout._validatorMessageEnabled) {
                        Sys.Extended.UI.ValidatorCalloutBehavior._currentCallout = this;
                        this._errorMessageCell.innerHTML = this._getErrorMessage();

                        this._popupBehavior.show();
                    }
                }
            }
        };

        Sys.Extended.UI.ExtendedValidatorCallout.registerClass('Sys.Extended.UI.ExtendedValidatorCallout', Sys.Extended.UI.ValidatorCalloutBehavior);
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.ExtendedValidatorCallout, { name: 'ExtendedValidatorCallout' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();