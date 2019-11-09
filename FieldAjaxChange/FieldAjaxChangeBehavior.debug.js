/// <reference name="MicrosoftAjax.js"/>

(function () {
    if (!window.Sys) { window.Sys = {}; }
    if (!Sys.Extended) { Sys.Extended = {}; }
    if (!Sys.Extended.UI) { Sys.Extended.UI = {}; }

    var scriptName = "FieldAjaxChange";

    if (Type._registerScript) {
        Type._registerScript("FieldAjaxChangeBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.FieldAjaxChange = function (element) {
            Sys.Extended.UI.FieldAjaxChange.initializeBase(this, [element]);

            this._ServiceUrl = "";
            this._ServiceUrlCheckbox = "";
            this._FieldSelector = "";
            this._FieldFilterSelector = "";
            this._FieldKeyupDelay = 1000;
            this._IsInitSelectableFields = true;
        }
        Sys.Extended.UI.FieldAjaxChange.prototype = {
            initialize: function () {
                Sys.Extended.UI.FieldAjaxChange.callBaseMethod(this, 'initialize');

                var fields = $(this.get_element()).find(this._FieldSelector);
                if (this._FieldFilterSelector) {
                    fields = fields.filter(this._FieldFilterSelector);
                }
                fields.fieldajaxchange({
                    serviceurl: this._ServiceUrl,
                    serviceurlCheckbox: this._ServiceUrlCheckbox,
                    keyupDelay: this._FieldKeyupDelay,
                    isInitSelectableFields: this._IsInitSelectableFields 
                });
            },

            dispose: function () {

                Sys.Extended.UI.FieldAjaxChange.callBaseMethod(this, "dispose");
            },

            get_ServiceUrl: function () { return this._ServiceUrl; },
            set_ServiceUrl: function (value) { this._ServiceUrl = value; },
            get_ServiceUrlCheckbox: function () { return this._ServiceUrlCheckbox; },
            set_ServiceUrlCheckbox: function (value) { this._ServiceUrlCheckbox = value; },
            get_FieldSelector: function () { return this._FieldSelector; },
            set_FieldSelector: function (value) { this._FieldSelector = value; },
            get_FieldFilterSelector: function () { return this._FieldFilterSelector; },
            set_FieldFilterSelector: function (value) { this._FieldFilterSelector = value; },
            get_FieldKeyupDelay: function () { return this._FieldKeyupDelay; },
            set_FieldKeyupDelay: function (value) { this._FieldKeyupDelay = value; },
            get_IsInitSelectableFields: function () { return this._IsInitSelectableFields; },
            set_IsInitSelectableFields: function (value) { this._IsInitSelectableFields = value; }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.FieldAjaxChange.registerClass('Sys.Extended.UI.FieldAjaxChange', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.FieldAjaxChange.registerClass('Sys.Extended.UI.FieldAjaxChange', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.FieldAjaxChange, { name: "FieldAjaxChange" }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon", "LocationPlaceSearch"], execute);

    }
    else {
        execute();
    }
})();