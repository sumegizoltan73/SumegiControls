/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "ReservationDateUpdater";

    if (Type._registerScript) {
        Type._registerScript("ReservationDateUpdaterBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.ReservationDateUpdater = function (element) {
            Sys.Extended.UI.ReservationDateUpdater.initializeBase(this, [element]);

            this._SelectorDate = "";
            this._SelectorTime = "";

            this._delegates = {};
        }
        Sys.Extended.UI.ReservationDateUpdater.prototype = {
            initialize: function () {
                Sys.Extended.UI.ReservationDateUpdater.callBaseMethod(this, 'initialize');

                this._delegates.datechanged = Function.createDelegate(this, this._onDateChanged);
                this._delegates.timechanged = Function.createDelegate(this, this._onTimeChanged);

                Sys.Extended.UI.LocationCommon.add_event(this._delegates.datechanged, "pickupdatechanged");
                Sys.Extended.UI.LocationCommon.add_event(this._delegates.timechanged, "pickuptimechanged");
            },

            dispose: function () {
                Sys.Extended.UI.LocationCommon.remove_event(this._delegates.datechanged, "pickupdatechanged");
                Sys.Extended.UI.LocationCommon.remove_event(this._delegates.timechanged, "pickuptimechanged");

                Sys.Extended.UI.ReservationDateUpdater.callBaseMethod(this, "dispose");
            },

            get_SelectorDate: function () { return this._SelectorDate; },
            set_SelectorDate: function (value) { this._SelectorDate = value; },
            get_SelectorTime: function () { return this._SelectorTime; },
            set_SelectorTime: function (value) { this._SelectorTime = value; },

            _onDateChanged: function (caller, args) {
                var datefields = $(this._SelectorDate);
                datefields.filter("input").val(Sys.Extended.UI.LocationCommon.location.pickupDate);
                datefields.filter("span, label").text(Sys.Extended.UI.LocationCommon.location.pickupDate);
            },

            _onTimeChanged: function (caller, args) {
                var timefields = $(this._SelectorTime);
                timefields.filter("input").val(Sys.Extended.UI.LocationCommon.location.pickupTime);
                timefields.filter("span, label").text(Sys.Extended.UI.LocationCommon.location.pickupTime);
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.ReservationDateUpdater.registerClass('Sys.Extended.UI.ReservationDateUpdater', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.ReservationDateUpdater.registerClass('Sys.Extended.UI.ReservationDateUpdater', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.ReservationDateUpdater, { name: 'ReservationDateUpdater' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();