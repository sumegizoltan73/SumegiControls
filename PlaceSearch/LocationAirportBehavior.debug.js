/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "LocationAirport";

    if (Type._registerScript) {
        Type._registerScript("LocationAirportBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.LocationAirport = function (element) {
            Sys.Extended.UI.LocationAirport.initializeBase(this, [element]);

            this._AirportPanelControlID = "";
            this._AirlineFieldControlID = "";
            this._AirportOrigControlID = "";
            this._LoadingProgressControlID = "";
            this._FlightListControlID = "";
            this._SearchControlID = "";
            this._ClearPanelControlID = "";
            this._GMapControlID = "";
            this._PrimaryPanelSelector = "";
            this._SearchValidationGroup = "";
            this._MessageValidationError = "";
            this._MessageDateTimeInfo = "";
            this._ShowErrorClientFunction = "";
            this._ShowInfoClientFunction = "";
            this._ContinueClientFunction = "";
            this._ServiceUrlHistory = "";
            this._ServiceUrlFlightInfo = "";
            this._ServiceUrlAirlines = "";
            this._ServiceUrlAirports = "";
            this._ServiceUrlData = "";
            this._LoadingCSS = "";
            this._IsContinueNextStep = false;
            this._SelectorDateTimeField = "";
            this._AirlineInfoImageUrl = "";
            this._TooltipInfo = "";
            this._MessageFlightListError = "";

            this._DataType;

            this._AirportCity = "";
            this._AirlineCode = "";
            this._AirlineName = "";
            this._IATA = "";
            this._IATAorig = "";
            this._AirportNameOrig = "";
            this._options = {
                airportdataOpenedCSS: "ui-airportdata-opened",
                datefieldCSS: "datefield",
                timefieldCSS: "timefield",
                imgAirlineInfo: "",
                selector: {
                    airlineresult: ".airlineresult",
                    trContactPoint: "tr.flightContactPoint",
                    airlineInfoCSS: "airlineicon",
                    panelCSS: "contentWizardStep",
                    editModeCSS: "editmode",
                    infoModeCSS: "infomode",
                    flightinfo: ""
                }
            };

            this._isAirlineResultVisible = false;
            this._isInited = false;
            this._isNotifyEnabled = false;
            this._isAirlineSelected = false;

            this._savedPickupDate = "";
            this._savedPickupTime = "";
            this._savedDropdown = [];

            this._delegates = {};
            this._element$delegates = {};
        }
        Sys.Extended.UI.LocationAirport.prototype = {
            initialize: function () {
                Sys.Extended.UI.LocationAirport.callBaseMethod(this, 'initialize');

                this._isNotifyEnabled = true;
                this._options.imgAirlineInfo = (this._AirlineInfoImageUrl) ? this._AirlineInfoImageUrl : CustomExtenders.PlaceSearchAirport.Resource.AirlineInfoImageUrl;
                this._AirportPanelControlID = this.get_element().id;

                var airportpanel = $("#" + this._AirportPanelControlID);

                //handlers
                this._delegates.searchclick = Function.createDelegate(this, this._invokeFlightHistory);
                this._delegates.flighthistory = Function.createDelegate(this, this._getFlightHistory);
                this._delegates.clearinfo = Function.createDelegate(this, this._clearInformation);
                this._delegates.setflightinfo = Function.createDelegate(this, this._setFlightInfo);
                this._delegates.flightitemcontinue = Function.createDelegate(this, this._onFlightItemContinue);
                this._delegates.continueclick = Function.createDelegate(this, this._onContinueClick);
                this._delegates.showerror = Function.createDelegate(this, this._showError);
                this._delegates.showinfo = Function.createDelegate(this, this._showInfo);
                this._delegates.showdatetime = Function.createDelegate(this, this._showDateTimeInfo);
                if (this._ShowErrorClientFunction) {
                    var clienterrorfunc = (this._ShowErrorClientFunction in window) ? window[this._ShowErrorClientFunction] : eval(this._ShowErrorClientFunction);
                    this._delegates.showerrorfunction = Function.createDelegate(window, clienterrorfunc);
                }
                if (this._ShowInfoClientFunction) {
                    var clientinfofunc = (this._ShowInfoClientFunction in window) ? window[this._ShowInfoClientFunction] : eval(this._ShowInfoClientFunction);
                    this._delegates.showinfofunction = Function.createDelegate(window, clientinfofunc);
                }
                if (this._ContinueClientFunction) {
                    var continuefunc = (this._ContinueClientFunction in window) ? window[this._ContinueClientFunction] : eval(this._ContinueClientFunction);
                    this._delegates.continuefunction = Function.createDelegate(window, continuefunc);
                }

                if (this._SearchControlID) {
                    $addHandler($get(this._SearchControlID), "click", this._delegates.searchclick, false);
                }

                if (this._SelectorDateTimeField && this._isPickup()) {
                    $(this._SelectorDateTimeField).bind("keyup", this._delegates.showdatetime);
                    $(this._SelectorDateTimeField).bind("blur", this._delegates.showdatetime);
                }

                //set defaults
                airportpanel.find("#" + this._ClearPanelControlID).click(this._delegates.clearinfo);

                //show validators, set validatorcallout
                this._setValidators();

                //flightlist continue
                this._setFlightList();

                // result
                if (!this._isAirlineResultVisible) {
                    var trresult = airportpanel.find("tr." + this._options.selector.airlineresult);
                    if (0 in trresult) {
                        this._isAirlineResultVisible = (trresult[0].style.display != "none");
                        this.set_isAirlineResultVisible(false);
                    }
                }

                // airline,airport autocomplete
                this._setAirlineAutocomplete();
                if (this._isPickup()) {
                    this._setAirportAutocomplete();
                }

                this._setAirlineField();
                this._setAirportOrigField();
                if (this._isPickup()) {
                    this._setSavedPickupDateTime();
                }
                this._setSavedDropdowns();

                this._isInited = true;
            },

            dispose: function () {
                var element = this.get_element();
                $clearHandlers(element);

                if (this._delegates.propertychanged) {
                    this.remove_propertyChanged(this._delegates.propertychanged);
                }

                Sys.Extended.UI.LocationAirport.callBaseMethod(this, "dispose");
            },

            _notifyPropertyChanged: function (propertyName) {
                if (!("propertychanged" in this._delegates)) {
                    this._delegates.propertychanged = Function.createDelegate(this, this._onPropertyChanged);
                    this.add_propertyChanged(this._delegates.propertychanged);
                }

                if (this._isNotifyEnabled) {
                    this.raisePropertyChanged(propertyName);
                }
            },

            get_isNotifyEnabled: function () { return this._isNotifyEnabled; },
            set_isNotifyEnabled: function (value) { this._isNotifyEnabled = value; },
            get_AirportPanelControlID: function () { return this._AirportPanelControlID; },
            set_AirportPanelControlID: function (value) { this._AirportPanelControlID = value; },
            get_AirlineFieldControlID: function () { return this._AirlineFieldControlID; },
            set_AirlineFieldControlID: function (value) { this._AirlineFieldControlID = value; },
            get_AirportOrigControlID: function () { return this._AirportOrigControlID; },
            set_AirportOrigControlID: function (value) { this._AirportOrigControlID = value; },
            get_AirportCity: function () { return this._AirportCity; },
            set_AirportCity: function (value) { this._AirportCity = value; },
            get_SearchControlID: function () { return this._SearchControlID; },
            set_SearchControlID: function (value) { this._SearchControlID = value; },
            get_ClearPanelControlID: function () { return this._ClearPanelControlID; },
            set_ClearPanelControlID: function (value) { this._ClearPanelControlID = value; },
            get_GMapControlID: function () { return this._GMapControlID; },
            set_GMapControlID: function (value) { this._GMapControlID = value; },
            get_PrimaryPanelSelector: function () { return this._PrimaryPanelSelector; },
            set_PrimaryPanelSelector: function (value) { this._PrimaryPanelSelector = value; },
            get_SearchValidationGroup: function () { return this._SearchValidationGroup; },
            set_SearchValidationGroup: function (value) { this._SearchValidationGroup = value; },
            get_ShowErrorClientFunction: function () { return this._ShowErrorClientFunction; },
            set_ShowErrorClientFunction: function (value) { this._ShowErrorClientFunction = value; },
            get_ShowInfoClientFunction: function () { return this._ShowInfoClientFunction; },
            set_ShowInfoClientFunction: function (value) { this._ShowInfoClientFunction = value; },
            get_MessageValidationError: function () { return this._MessageValidationError; },
            set_MessageValidationError: function (value) { this._MessageValidationError = value; },
            get_MessageDateTimeInfo: function () { return this._MessageDateTimeInfo; },
            set_MessageDateTimeInfo: function (value) { this._MessageDateTimeInfo = value; },
            get_ServiceUrlHistory: function () { return this._ServiceUrlHistory; },
            set_ServiceUrlHistory: function (value) { this._ServiceUrlHistory = value; },
            get_ServiceUrlFlightInfo: function () { return this._ServiceUrlFlightInfo; },
            set_ServiceUrlFlightInfo: function (value) { this._ServiceUrlFlightInfo = value; },
            get_ServiceUrlAirlines: function () { return this._ServiceUrlAirlines; },
            set_ServiceUrlAirlines: function (value) { this._ServiceUrlAirlines = value; },
            get_ServiceUrlAirports: function () { return this._ServiceUrlAirports; },
            set_ServiceUrlAirports: function (value) { this._ServiceUrlAirports = value; },
            get_ServiceUrlData: function () { return this._ServiceUrlData; },
            set_ServiceUrlData: function (value) { this._ServiceUrlData = value; },
            get_PickupDateControlID: function () { return this._PickupDateControlID; },
            set_PickupDateControlID: function (value) { this._PickupDateControlID = value; },
            get_PickupTimeControlID: function () { return this._PickupTimeControlID; },
            set_PickupTimeControlID: function (value) { this._PickupTimeControlID = value; },
            get_DataType: function () { return this._DataType; },
            set_DataType: function (value) { this._DataType = value; },
            get_FlightListControlID: function () { return this._FlightListControlID; },
            set_FlightListControlID: function (value) { this._FlightListControlID = value; },
            get_LoadingProgressControlID: function () { return this._LoadingProgressControlID; },
            set_LoadingProgressControlID: function (value) { this._LoadingProgressControlID = value; },
            get_LoadingCSS: function () { return this._LoadingCSS; },
            set_LoadingCSS: function (value) { this._LoadingCSS = value; },
            get_SelectorFlightInfo: function () { return this._options.selector.flightinfo; },
            set_SelectorFlightInfo: function (value) { this._options.selector.flightinfo = value; },
            get_SelectorDateTimeField: function () { return this._SelectorDateTimeField; },
            set_SelectorDateTimeField: function (value) { this._SelectorDateTimeField = value; },
            get_IsContinueNextStep: function () { return this._IsContinueNextStep; },
            set_IsContinueNextStep: function (value) { this._IsContinueNextStep = value; },
            get_AirlineInfoImageUrl: function () { return this._AirlineInfoImageUrl; },
            set_AirlineInfoImageUrl: function (value) { this._AirlineInfoImageUrl = value; },
            get_TooltipInfo: function () { return this._TooltipInfo; },
            set_TooltipInfo: function (value) { this._TooltipInfo = value; },
            get_MessageFlightListError: function () { return this._MessageFlightListError; },
            set_MessageFlightListError: function (value) { this._MessageFlightListError = value; },
            get_isAirlineResultVisible: function () { return this._isAirlineResultVisible; },
            set_isAirlineResultVisible: function (value) {
                if (this._isAirlineResultVisible != value) {
                    this._isAirlineResultVisible = value;
                    this._notifyPropertyChanged('isAirlineResultVisible');
                }
            },
            get_isResultVisible: function () { return this._isResultVisible; },
            set_isResultVisible: function (value) {
                if (this._isResultVisible != value) {
                    this._isResultVisible = value;
                    this._notifyPropertyChanged('isResultVisible');
                }
            },
            get_AirlineCode: function () { return this._AirlineCode; },
            set_AirlineCode: function (value) {
                if (this._AirlineCode != value) {
                    this._AirlineCode = value;
                    if (this._isInited) {
                        this._setAirlineField();
                    }
                    this._notifyPropertyChanged('AirlineCode');
                }
            },
            get_AirlineName: function () { return this._AirlineName; },
            set_AirlineName: function (value) { this._AirlineName = value; },
            get_IATA: function () { return this._IATA; },
            set_IATA: function (value) {
                if (this._IATA != value) {
                    this._IATA = value;
                    this._notifyPropertyChanged('IATA');
                }
            },
            get_IATAorig: function () { return this._IATAorig; },
            set_IATAorig: function (value) {
                if (this._IATAorig != value) {
                    this._IATAorig = value;
                    if (this._isInited) {
                        this._setAirportOrigField();
                    }
                    this._notifyPropertyChanged('IATAorig');
                }
            },
            get_AirportNameOrig: function () { return this._AirportNameOrig; },
            set_AirportNameOrig: function (value) {
                if (this._AirportNameOrig != value) {
                    this._AirportNameOrig = value;
                    this._notifyPropertyChanged('AirportNameOrig');
                }
            },
            get_options: function () { return this._options; },
            set_options: function (value) {
                if (value) {
                    jQuery.extend(true, this._options, value);
                }
            },

            _isPickup: function () {
                return (this._DataType == Sys.Extended.UI.LocationDataType.Pickup);
            },

            _setAirlineField: function () {
                var fieldvalue = (this._AirlineCode) ? this._AirlineName + " (" + this._AirlineCode + ")" : "";
                if ($("#" + this._AirlineFieldControlID).val() != fieldvalue) {
                    $("#" + this._AirlineFieldControlID).val(fieldvalue);
                }
            },

            _setAirportOrigField: function () {
                var fieldvalue = (this._IATAorig) ? this._AirportNameOrig + " (" + this._IATAorig + ")" : "";
                if ($("#" + this._AirportOrigControlID).val() != fieldvalue) {
                    $("#" + this._AirportOrigControlID).val(fieldvalue);
                }
            },

            _setAirlineResultPanel: function () {
                var result = $("#" + this._AirportPanelControlID).find("tr." + this._options.selector.airlineresult);
                if (this._isAirlineResultVisible) {
                    result.show();
                }
                else {
                    result.hide();
                }
            },

            _setValidators: function () {
                if (this._SearchValidationGroup) {
                    _initValidator(this._SearchValidationGroup);
                }
            },

            _setDefaults: function () {
                this.set_isAirlineResultVisible(false);
                this._setValidators();

                $("#" + this._AirlineFieldControlID).focus();
            },

            _getPickupDate: function () {
                var pickupdate = "";

                if (Type.isClass(Sys.Extended.UI.ReservationDateUpdater)) {
                    var updatebehaviors = Sys.UI.Behavior.getBehaviorsByType($get(this._AirportPanelControlID), Sys.Extended.UI.ReservationDateUpdater);

                    if (0 in updatebehaviors) {
                        var airportfields = $("#" + this._AirportPanelControlID).find(this._SelectorDateTimeField);
                        var datefields = $(updatebehaviors[0].get_SelectorDate()).not(airportfields).filter("input");

                        pickupdate = (0 in datefields) ? datefields[0].value : "";
                    }
                }

                return pickupdate;
            },

            _getPickupTime: function () {
                var pickuptime = "";

                if (Type.isClass(Sys.Extended.UI.ReservationDateUpdater)) {
                    var updatebehaviors = Sys.UI.Behavior.getBehaviorsByType($get(this._AirportPanelControlID), Sys.Extended.UI.ReservationDateUpdater);

                    if (0 in updatebehaviors) {
                        var airportfields = $("#" + this._AirportPanelControlID).find(this._SelectorDateTimeField);
                        var timefields = $(updatebehaviors[0].get_SelectorTime()).not(airportfields).filter("input");

                        pickuptime = (0 in timefields) ? timefields[0].value : "";
                    }
                }

                return pickuptime;
            },

            _setSavedPickupDateTime: function () {
                this._savedPickupDate = this._getPickupDate();
                this._savedPickupTime = this._getPickupTime();
            },

            _setSavedDropdowns: function () {
                var dropdowns = $("#" + this._AirportPanelControlID).find("select");
                var i = dropdowns.length;

                this._savedDropdown = [];

                while (i--) {
                    this._savedDropdown[i] = dropdowns[i].value;
                }
            },

            _clearInformation: function () {
                this._isNotifyEnabled = false;

                this.set_AirlineName("");
                this.set_AirlineCode("");
                this.set_AirportNameOrig("");
                this.set_IATAorig("");

                var datetimefields = $("#" + this._AirportPanelControlID).find(this._SelectorDateTimeField);

                $("#" + this._AirportPanelControlID).find("input:text").val("");

                if (this._isPickup()) {
                    datetimefields.filter(".datefield").val(this._savedPickupDate).keyup();
                    datetimefields.filter(".timefield").val(this._savedPickupTime).keyup();
                }

                var data = [];
                data.push({ Key: "AirportNameOrig", Value: "" });
                data.push({ Key: "IATAorig", Value: "" });
                data.push({ Key: "FlightNumber", Value: "" });
                data.push({ Key: "Notes", Value: "" });
                if (this._isPickup()) {
                    data.push({ Key: "SavedDate", Value: datetimefields.filter(".datefield").val() });
                    data.push({ Key: "SavedTime", Value: datetimefields.filter(".timefield").val() });
                }

                var dropdowns = $("#" + this._AirportPanelControlID).find("select");
                var i = dropdowns.length;
                while (i--) {
                    var id = dropdowns[i].id.split('_');
                    dropdowns[i].value = this._savedDropdown[i];
                    data.push({ Key: id[id.length - 1] + "Text", Value: dropdowns[i][dropdowns[i].selectedIndex].innerText });
                    data.push({ Key: id[id.length - 1], Value: dropdowns[i].value });
                }

                this._isNotifyEnabled = true;
                this._setDefaults();
                this._sendLocationData({ Code: "", Name: "" }, data, -1, this._delegates.setflightinfo, true);
            },

            _changeAirport: function () {
                this.set_isAirlineResultVisible(false);
                this._setDefaults();
            },

            _onPropertyChanged: function (caller, args) {
                if (args._propertyName == "isAirlineResultVisible") {
                    this._setAirlineResultPanel();
                }
                else if (args._propertyName == "IATA") {
                    this._changeAirport();
                }
                else if (args._propertyName == "IATAorig") {
                    this._sendLocationData(null, { "IATAorig": this._IATAorig });
                }
                else if (args._propertyName == "AirportNameOrig") {
                    this._sendLocationData(null, { "AirportNameOrig": this._AirportNameOrig });
                }
                else if (args._propertyName == "AirlineCode") {
                    this._sendLocationData({ Code: this._AirlineCode, Name: this._AirlineName }, null);
                }
            },

            _sendLocationData: function (airlinedata, location, index, onsuccess, isCleared) {
                if (!this._isInited) { return; }

                var locationdata = (location) ? location : null;
                var i = (!isNaN(index)) ? index : -1;
                var iscleared = (isCleared) ? true : false;

                $.ajax({
                    cache: false, type: "POST", contentType: "application/json", dataType: "json",
                    url: this._ServiceUrlData,
                    data: JSON.stringify({ airline: airlinedata, location: locationdata, selectedIndex: i, isClearIndex: iscleared }),
                    success: function (data) {
                        Sys.Extended.UI.LocationCommon.set_isLocationDataCompleted(data.d);
                        if (typeof (onsuccess) == "function") {
                            onsuccess();
                        }
                    },
                    error: function (xhr) {
                        Sys.Extended.UI.LocationCommon.set_isLocationDataCompleted(false);
                    }
                });
            },

            _onAirportChanged: function (caller, args) {
                var airport;
                var iata = caller.get_LocationData().IATA.trim();

                this._AirportCity = (caller.get_LocationData().Address) ? caller.get_LocationData().Address.City : "";
                if (caller.get_LocationData().Address) {
                    airport = caller.get_LocationData().Address.FormattedAddress;
                }
                else {
                    airport = caller.get_LocationData().Value;
                    if (this._AirportCity) { airport += " - " + this._AirportCity; }
                }
                $("#" + this._AirportPanelControlID).find("td.airport").html("<span>" + airport + "</span>");

                this.set_IATA(iata);
                this.set_isResultVisible(true);
            },

            _invokeFlightHistory: function () {
                if (this._SearchValidationGroup) {
                    _setValidatorCalloutEnabled(true);
                    if (!_isValidationGroupValid(this._SearchValidationGroup, true)) {
                        return;
                    }
                }

                this._setSearchState(true);
                setTimeout(this._delegates.flighthistory, 500);
            },

            _setSearchState: function (isDisabled) {
                this._setButtonState($("#" + this._SearchControlID), isDisabled);
            },

            _setButtonState: function (button, isDisabled) {
                if (isDisabled) {
                    button.attr("disabled", true).removeClass("ui-state-default").addClass("ui-state-disabled");
                    $("#" + this._LoadingProgressControlID).addClass(this._LoadingCSS).css({ backgroundRepeat: "no-repeat" });
                }
                else {
                    button.attr("disabled", false).removeClass("ui-state-disabled").addClass("ui-state-default");
                    $("#" + this._LoadingProgressControlID).removeClass(this._LoadingCSS);
                }
            },

            _onFlightItemContinue: function (index, srcE) {
                this._sendLocationData(null, null, index, this._delegates.continueclick);

                var datetime = $(srcE).parent().parent().find("span.datetime").text().split(' ');
                var flightnumber = $(srcE).parent().parent().find('span[id$="FlightNumber"]').text();
                var date = datetime[0];
                var time = datetime[1] + " " + datetime[2];
                var datetimefields = $(this._SelectorDateTimeField);
                if (0 in datetimefields) {
                    datetimefields.filter(".datefield").val(date).keyup();
                    datetimefields.filter(".timefield").val(time).keyup();
                    $("#" + this._AirportPanelControlID).find("input.FlightNumber").val(flightnumber);
                    this._showDateTimeInfo();
                }
            },

            _onContinueClick: function () {
                var primarypanelcss = "activeStep " + this._options.selector.editModeCSS;
                var panel = this.get_element();
                while (!Sys.UI.DomElement.containsCssClass(panel, this._options.selector.panelCSS)) {
                    panel = panel.parentNode;
                }
                panel.style.display = "none";

                $("#" + this._GMapControlID).show;
                $(this._PrimaryPanelSelector).removeClass("inactiveStep").removeClass(this._options.selector.infoModeCSS).addClass(primarypanelcss).show();

                if ("continuefunction" in this._delegates) {
                    this._delegates.continuefunction();
                }

                this._setFlightInfo();

                if (this._IsContinueNextStep) {
                    _setNavigationNext(true, true);
                }
                else {
                    _setNavigationNext(true, false);
                }
            },

            _setFlightInfo: function () {
                var flightinfo = $(this._options.selector.flightinfo);
                flightinfo.empty();

                $.ajax({
                    cache: true, type: "POST", contentType: "application/json", dataType: "json",
                    url: this._ServiceUrlFlightInfo, data: JSON.stringify({ isPickup: this._isPickup() }),
                    context: this,
                    success: function (data) {
                        if (data.d) {
                            flightinfo.html(data.d);
                        }
                    },
                    error: function (xhr) {
                    }
                });
            },

            _setFlightList: function () {
                var continuehandler = this._delegates.flightitemcontinue;
                var flightlist = $("#" + this._FlightListControlID);

                flightlist.find("input:button").click(function (e) {
                    var thead, tr = this, index = 0;
                    while (tr.tagName != "TR") {
                        tr = tr.parentNode;
                    }
                    index += tr.rowIndex;

                    thead = flightlist.find("thead");
                    if (0 in thead) {
                        index -= thead[0].children.length;
                    }

                    continuehandler(index, this);
                });
            },

            _showFlightListError: function () {
                if (this._MessageFlightListError) {
                    this._showError(this._MessageFlightListError);
                }
            },

            _getFlightHistory: function () {
                var query = {};
                var panel = $("#" + this._AirportPanelControlID);
                var flightpanel = $("#" + this._FlightListControlID);
                var input = panel.find("input:text");

                flightpanel.empty();

                query.airportCode = this._IATA;
                query.airportCodeOrig = this._IATAorig;
                query.airportCity = this._AirportCity;
                query.airlineCode = this._AirlineCode;
                query.flightNumber = input.filter(".FlightNumber").val();
                query.date = input.filter(".Date").val();
                query.time = input.filter(".Time").val();
                query.airlineType = parseInt(panel.find("select.FlightType").prop("selectedIndex"));
                query.flightType = (this._isPickup()) ? 0 : 1;

                $.ajax({
                    cache: true, type: "POST", contentType: "application/json", dataType: "json",
                    url: this._ServiceUrlHistory, data: JSON.stringify(query),
                    context: this,
                    success: function (data) {
                        if (data.d) {
                            $(data.d).appendTo(flightpanel);
                            this.set_isAirlineResultVisible(true);
                            this._setFlightList();
                        }
                        else {
                            this._showFlightListError();
                        }

                        this._setSearchState(false);
                    },
                    error: function (xhr) {
                        this._showFlightListError();
                        this._setSearchState(false);
                    }
                });
            },

            _setAirportAutocomplete: function () {
                var serviceUrl = this._ServiceUrlAirports;
                var base = this._getBase(["set_IATAorig", "set_AirportNameOrig"]);
                var input = $("#" + this._AirportOrigControlID);
                if (0 in input) {
                    input.autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                cache: true, type: "POST", contentType: "application/json", dataType: "json",
                                url: serviceUrl, data: JSON.stringify({ airport: request.term }),
                                success: function (data) {
                                    if (0 in data.d) {
                                        response($.map(data.d, function (item) {
                                            return item;
                                        }));
                                    }
                                    else {
                                        base.set_IATAorig("");
                                        base.set_AirportNameOrig("");
                                        response(null);
                                    }
                                },
                                error: function (xhr) {
                                    base.set_IATAorig("");
                                    base.set_AirportNameOrig("");
                                    response(null);
                                }
                            });
                        },
                        focus: function (event, ui) {
                            return false;
                        },
                        select: function (event, ui) {
                            this.value = ui.item.Name + " (" + ui.item.IATA + ")";

                            base.set_IATAorig(ui.item.IATA);
                            base.set_AirportNameOrig(ui.item.Name);

                            return false;
                        },
                        selectFirst: false, minLength: 1
                    }).data("autocomplete")._renderItem = function (ul, item) {
                        return $("<li class='airline'></li>")
				        .data("item.autocomplete", item)
				        .append("<a>" + item.Name + " (" + item.IATA + ")</a>")
				        .appendTo(ul);
                    };
                }

                input.keyup(function () {
                    if (!this.value) {
                        base.set_IATAorig("");
                    }
                });
            },

            _setAirlineAutocomplete: function () {
                var serviceUrlAirlines = this._ServiceUrlAirlines;
                var base = this._getBase(["set_AirlineCode", "set_AirlineName"]);
                $("#" + this._AirlineFieldControlID).autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            cache: true, type: "POST", contentType: "application/json", dataType: "json",
                            url: serviceUrlAirlines,
                            data: JSON.stringify({ airlineName: request.term }),
                            contextElement: this.element.context,
                            success: function (data) {
                                if (0 in data.d) {
                                    response($.map(data.d, function (item) {
                                        return item;
                                    }));
                                }
                                else {
                                    base.set_AirlineName("");
                                    base.set_AirlineCode("");
                                    response(null);
                                }
                            },
                            error: function (xhr) {
                                response(null);
                            }
                        });
                    },
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (event, ui) {
                        this.value = ui.item.Name + " (" + ui.item.Code + ")";

                        base.set_AirlineName(ui.item.Name);
                        base.set_AirlineCode(ui.item.Code);

                        return false;
                    },
                    selectFirst: false, minLength: 1
                }).data("autocomplete")._renderItem = function (ul, item) {
                    return $("<li class='airline'></li>")
				        .data("item.autocomplete", item)
				        .append("<a>" + item.Name + " (" + item.Code + ")</a>")
				        .appendTo(ul);
                };
            },

            _getBaseProperty: function (property) {
                var prop;
                if (Object.getType(this[property]).__typeName == "Function") {
                    prop = Function.createDelegate(this, this[property]);
                }
                else {
                    prop = this[property];
                }
                return prop;
            },

            _getBase: function (properties) {
                var base = {};
                if (properties) {
                    if (Object.getType(properties).__typeName == "Array") {
                        for (var i = 0; i < properties.length; i++) {
                            base[properties[i]] = this._getBaseProperty(properties[i]);
                        }
                    }
                    else {
                        base[properties] = this._getBaseProperty(properties);
                    }
                }
                return base;
            },

            _showDateTimeInfo: function () {
                if (this._MessageDateTimeInfo) {
                    this._showInfo(this._MessageDateTimeInfo);
                }
            },

            _showError: function (message) {
                if (this._delegates.showerrorfunction) {
                    this._delegates.showerrorfunction(message);
                }
            },
            _showInfo: function (message) {
                if (this._delegates.showinfofunction) {
                    this._delegates.showinfofunction(message);
                }
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.LocationAirport.registerClass('Sys.Extended.UI.LocationAirport', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.LocationAirport.registerClass('Sys.Extended.UI.LocationAirport', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.LocationAirport, { name: 'LocationAirport' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon", "LocationPlaceSearch"], execute);
    }
    else {
        execute();
    }
})();