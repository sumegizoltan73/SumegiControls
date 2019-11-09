/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "ConsoleDebug";

    if (Type._registerScript) {
        Type._registerScript("ConsoleDebugBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.ConsoleDebug = function (element) {
            Sys.Extended.UI.ConsoleDebug.initializeBase(this, [element]);

            this._IsVisible = "";

            this._isConsole = false;
        }
        Sys.Extended.UI.ConsoleDebug.prototype = {
            initialize: function () {
                Sys.Extended.UI.ConsoleDebug.callBaseMethod(this, 'initialize');

                ConsoleDebug.ShowMethod = Function.createDelegate(this, this._onShow);

                this._isConsole = ("console" in window);

                if (this._isConsole) {
                    this._IsVisible = false;
                }
                if (!this._IsVisible) {
                    this.get_element().style.display = "none";
                }
            },

            dispose: function () {
                ConsoleDebug.ShowMethod = null;

                Sys.Extended.UI.ConsoleDebug.callBaseMethod(this, "dispose");
            },

            get_IsVisible: function () { return this._IsVisible; },
            set_IsVisible: function (value) { this._IsVisible = value; },

            _onShow: function (message) {
                if (!this._isConsole) {
                    $("<div>" + message + "</div>").appendTo(this.get_element());
                }
                else {
                    console.log(message);
                }
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.ConsoleDebug.registerClass('Sys.Extended.UI.ConsoleDebug', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.ConsoleDebug.registerClass('Sys.Extended.UI.ConsoleDebug', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.ConsoleDebug, { name: "ConsoleDebug" }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);

    }
    else {
        execute();
    }
})();