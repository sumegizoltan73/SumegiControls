/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "ReservationDateTime";

    if (Type._registerScript) {
        Type._registerScript("ReservationDateTimeBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.ReservationDateTime = function (element) {
            Sys.Extended.UI.ReservationDateTime.initializeBase(this, [element]);

            this._DateFieldControlID = "";
            this._TimeFieldControlID = "";
            this._DateFieldValue = "";
            this._TimeFieldValue = "";
            this._ServiceUrlSaveDate = "";
            this._ServiceUrlSaveTime = "";
            this._DataType;
            this._ImageUrl;
            this._ImageCSS;
            this._MinDate = "";
            this._DateFieldOptionsJSON = "";
            this._TimeFieldOptionsJSON = "";

            this._timeValidationEnabled = true;

            this._delegates = {};
        }
        Sys.Extended.UI.ReservationDateTime.prototype = {
            initialize: function () {
                Sys.Extended.UI.ReservationDateTime.callBaseMethod(this, 'initialize');

                var options = {};
                var optionsTimeField = {};

                if (this._ImageUrl) { options.ImageUrl = this._ImageUrl; }
                if (this._ImageCSS) { options.ImageCSS = this._ImageCSS; }
                if (this._MinDate) { options.Datepicker = { minDate: this._MinDate }; }

                if (this._DateFieldOptionsJSON) {
                    var datefieldopt = Sys.Serialization.JavaScriptSerializer.deserialize(this._DateFieldOptionsJSON);
                    jQuery.extend(true, options, datefieldopt);
                }

                if (this._TimeFieldOptionsJSON) {
                    var timefieldopt = Sys.Serialization.JavaScriptSerializer.deserialize(this._TimeFieldOptionsJSON);
                    jQuery.extend(true, optionsTimeField, timefieldopt);
                }

                if (this._isPickup()) {
                    if (this._DateFieldControlID) {
                        options.onvalidate = Sys.Extended.UI.LocationCommon.delegates.pickupDateValidated;

                        this._delegates.validateDate = Function.createDelegate(this, this._validateDate);
                        Sys.Extended.UI.LocationCommon.add_event(this._delegates.validateDate, "pickupdatechanged");

                        $("#" + this._DateFieldControlID).val(this._DateFieldValue).datefield(options);
                    }

                    if (this._TimeFieldControlID) {
                        optionsTimeField.onvalidate = Sys.Extended.UI.LocationCommon.delegates.pickupTimeValidated;

                        this._delegates.validateTime = Function.createDelegate(this, this._validateTime);
                        Sys.Extended.UI.LocationCommon.add_event(this._delegates.validateTime, "datetimesuccess");

                        $("#" + this._TimeFieldControlID).val(this._TimeFieldValue).timefield(optionsTimeField);
                    }
                    else if (this._DateFieldControlID) {
                        this._delegates.datetimesuccess = Function.createDelegate(this, this._onDateTimeSucces);
                        Sys.Extended.UI.LocationCommon.add_event(this._delegates.datetimesuccess, "datetimesuccess");
                    }

                    if (this._ServiceUrlSaveDate) {
                        CustomExtenders.LocationCommon.Resource.ServiceUrlSaveDate = this._ServiceUrlSaveDate;
                    }

                    if (this._ServiceUrlSaveTime) {
                        CustomExtenders.LocationCommon.Resource.ServiceUrlSaveTime = this._ServiceUrlSaveTime;
                    }
                }
                else {
                    if (this._DateFieldControlID) {
                        options.onvalidate = Function.createDelegate(this, this._validateDate);
                        $("#" + this._DateFieldControlID).val(this._DateFieldValue).datefield(options);
                    }

                    if (this._TimeFieldControlID) {
                        optionsTimeField.onvalidate = Function.createDelegate(this, this._validateTimeField);
                        $("#" + this._TimeFieldControlID).val(this._TimeFieldValue).timefield(optionsTimeField);
                    }
                }
            },

            dispose: function () {
                if ("validateTime" in this._delegates) {
                    Sys.Extended.UI.LocationCommon.remove_event(this._delegates.validateTime, "datetimesuccess");
                }
                if ("validateDate" in this._delegates) {
                    Sys.Extended.UI.LocationCommon.remove_event(this._delegates.validateDate, "pickupdatechanged");
                }
                if ("datetimesuccess" in this._delegates) {
                    Sys.Extended.UI.LocationCommon.remove_event(this._delegates.datetimesuccess, "datetimesuccess");
                }

                Sys.Extended.UI.ReservationDateTime.callBaseMethod(this, "dispose");
            },

            _isPickup: function () {
                return (this._DataType == Sys.Extended.UI.LocationDataType.Pickup);
            },

            _validateDate: function () {
                this._timeValidationEnabled = false;
                this._validateDateTime(this._DateFieldControlID);
            },

            _validateTime: function () {
                this._validateDateTime(this._TimeFieldControlID);
                this._timeValidationEnabled = true;
            },

            _validateTimeField: function () {
                this._timeValidationEnabled = true;
                this._validateDateTime(this._TimeFieldControlID);
            },

            _onDateTimeSucces: function () {
                this._timeValidationEnabled = true;
            },

            _validateDateTime: function (controlID) {
                var target = $get(controlID);

                if (!this._timeValidationEnabled && (controlID == this._TimeFieldControlID)) {
                    if (!target.value) {
                        return;
                    }
                }

                _validateField(controlID);
            },

            get_DateFieldControlID: function () { return this._DateFieldControlID; },
            set_DateFieldControlID: function (value) { this._DateFieldControlID = value; },
            get_TimeFieldControlID: function () { return this._TimeFieldControlID; },
            set_TimeFieldControlID: function (value) { this._TimeFieldControlID = value; },
            get_DateFieldValue: function () { return this._DateFieldValue; },
            set_DateFieldValue: function (value) { this._DateFieldValue = value; },
            get_TimeFieldValue: function () { return this._TimeFieldValue; },
            set_TimeFieldValue: function (value) { this._TimeFieldValue = value; },
            get_DataType: function () { return this._DataType; },
            set_DataType: function (value) { this._DataType = value; },
            get_ImageUrl: function () { return this._ImageUrl; },
            set_ImageUrl: function (value) { this._ImageUrl = value; },
            get_ImageCSS: function () { return this._ImageCSS; },
            set_ImageCSS: function (value) { this._ImageCSS = value; },
            get_MinDate: function () { return this._MinDate; },
            set_MinDate: function (value) { this._MinDate = value; },
            get_DateFieldOptionsJSON: function () { return this._DateFieldOptionsJSON; },
            set_DateFieldOptionsJSON: function (value) { this._DateFieldOptionsJSON = value; },
            get_TimeFieldOptionsJSON: function () { return this._TimeFieldOptionsJSON; },
            set_TimeFieldOptionsJSON: function (value) { this._TimeFieldOptionsJSON = value; },
            get_ServiceUrlSaveDate: function () { return this._ServiceUrlSaveDate; },
            set_ServiceUrlSaveDate: function (value) { this._ServiceUrlSaveDate = value; },
            get_ServiceUrlSaveTime: function () { return this._ServiceUrlSaveTime; },
            set_ServiceUrlSaveTime: function (value) { this._ServiceUrlSaveTime = value; }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.ReservationDateTime.registerClass('Sys.Extended.UI.ReservationDateTime', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.ReservationDateTime.registerClass('Sys.Extended.UI.ReservationDateTime', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.ReservationDateTime, { name: 'ReservationDateTime' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();