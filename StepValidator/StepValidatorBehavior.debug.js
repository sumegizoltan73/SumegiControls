/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "StepValidator";

    if (Type._registerScript) {
        Type._registerScript("StepValidatorBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.StepValidator = function (element) {
            Sys.Extended.UI.StepValidator.initializeBase(this, [element]);

            this._NextButtonControlID = "";

        }
        Sys.Extended.UI.StepValidator.prototype = {
            initialize: function () {
                Sys.Extended.UI.StepValidator.callBaseMethod(this, 'initialize');

            },

            dispose: function () {

                Sys.Extended.UI.StepValidator.callBaseMethod(this, "dispose");
            },

            get_NextButtonControlID: function () { return this._NextButtonControlID; },
            set_NextButtonControlID: function (value) { this._NextButtonControlID = value; }

        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.StepValidator.registerClass('Sys.Extended.UI.StepValidator', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.StepValidator.registerClass('Sys.Extended.UI.StepValidator', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.StepValidator, { name: 'StepValidator' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();