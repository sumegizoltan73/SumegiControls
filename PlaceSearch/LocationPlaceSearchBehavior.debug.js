/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "LocationPlaceSearch";

    if (Type._registerScript) {
        Type._registerScript("LocationPlaceSearchBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.LocationPlaceSearch = function (element) {
            Sys.Extended.UI.LocationPlaceSearch.initializeBase(this, [element]);

            this._LocationIconControlID = "";
            this._DetailsControlID = "";
            this._DetailsPanelControlID = "";
            this._DetailsSubmitControlID = "";
            this._AirportPanelControlID = "";
            this._ResultControlID = "";
            this._LocationResultControlID = "";
            this._AccountTypeControlID = "";
            this._ProfileIDControlID = "";
            this._ServiceUrl = "";
            this._ServiceUrlPlaceSearch = "";
            this._ServiceUrlSaveData = "";
            this._ServiceUrlSaveDistance = "";
            this._ServiceUrlData = "";
            this._LocationDataJSON = "";
            this._TransparentImageUrl = "";

            this._DataType;

            this._LocationData = {};
            this._options = {
                imgTransparent: "", imgLoad: "", tooltip: "", imgTooltip: "",
                resultCSS: { location: "", airport: "", data: "" },
                keywordsProperties: "Address,IATA,Latitude,Longitude,query,Types,Value",
                ACsearchTypes: ["dbprofile", "autocompletion", "detailsLocation"],
                details: {},
                airportInit: {},
                airport: {},
                isLocationAirportInited: false
            };
            this._isInited = false;
            this._isNotifyEnabled = false;
            this._isSendDataSuccess = false;
            this._isLocationFromList = false;

            this._delegates = {};
            this._element$delegates = {};
        }
        Sys.Extended.UI.LocationPlaceSearch.prototype = {
            initialize: function () {
                Sys.Extended.UI.LocationPlaceSearch.callBaseMethod(this, 'initialize');

                this._isNotifyEnabled = true;

                this._options.imgTransparent = (this._TransparentImageUrl) ? this._TransparentImageUrl : CustomExtenders.PlaceSearch.Resource.TransparentImageUrl;
                if (this._ServiceUrlSaveDistance) {
                    CustomExtenders.LocationCommon.Resource.ServiceUrlSaveDistance = this._ServiceUrlSaveDistance;
                }

                if ("Value" in this._LocationData) {
                    if (!("query" in this._LocationData)) {
                        this._LocationData.query = '';
                    }
                    this.fillResult();
                }
                else {
                    this._LocationData = {
                        Value: '', Latitude: 0, Longitude: 0, Types: [], Reference: '',
                        Address: { State: '', City: '', Street: '', ZIP: '' },
                        query: ''
                    };
                }

                if ("Address" in this._LocationData) {
                    if (this._LocationData.Address) {
                        if (this._LocationData.Address.FormattedAddress) {
                            this.get_element().value = this._LocationData.Address.FormattedAddress;
                        }
                    }
                }
                this._setGMapLocation();

                this._setLocationAutocomplete();

                this._delegates.onblur = Function.createDelegate(this, this._onBlur);
                $(this.get_element()).blur(this._delegates.onblur);

                this._isInited = true;
            },

            dispose: function () {
                if (this._delegates.propertychanged) {
                    this.remove_propertyChanged(this._delegates.propertychanged);
                }

                Sys.Extended.UI.LocationPlaceSearch.callBaseMethod(this, "dispose");
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

            add_airportchanged: function (handler) {
                this.get_events().addHandler("airportchanged", handler);
            },
            remove_airportchanged: function (handler) {
                this.get_events().removeHandler("airportchanged", handler);
            },
            fire_airportchanged: function (e) {
                var handler = this.get_events().getHandler("airportchanged");
                if (handler) {
                    handler(this, Sys.EventArgs.Empty);
                }
            },

            add_locationchanged: function (handler) {
                this.get_events().addHandler("locationchanged", handler);
            },
            fire_locationchanged: function (e) {
                var handler = this.get_events().getHandler("locationchanged");
                if (handler) {
                    handler(this, Sys.EventArgs.Empty);
                }
            },

            _onPropertyChanged: function (caller, args) {
                if (args._propertyName == "IATA") {
                    this.fire_airportchanged();
                }
                else if (args._propertyName == "LocationData") {
                    this.fire_locationchanged();
                    this._sendLocationData();
                }
            },

            _airportInitCompleted: function () {
                this._options.isLocationAirportInited = true;

                if ("IATA" in this._options.airportInit) {
                    this._notifyPropertyChanged('IATA');
                }

                delete this._options.airport;
                delete this._options.airportInit;
            },

            get_IsNotifyEnabled: function () { return this._isNotifyEnabled; },
            set_IsNotifyEnabled: function (value) { this._isNotifyEnabled = value; },
            get_IsLocationFromList: function () { return this._isLocationFromList; },
            set_IsLocationFromList: function (value) { this._isLocationFromList = value; },
            get_LocationIconControlID: function () { return this._LocationIconControlID; },
            set_LocationIconControlID: function (value) { this._LocationIconControlID = value; },
            get_DetailsControlID: function () { return this._DetailsControlID; },
            set_DetailsControlID: function (value) { this._DetailsControlID = value; },
            get_DetailsPanelControlID: function () { return this._DetailsPanelControlID; },
            set_DetailsPanelControlID: function (value) { this._DetailsPanelControlID = value; },
            get_DetailsSubmitControlID: function () { return this._DetailsSubmitControlID; },
            set_DetailsSubmitControlID: function (value) { this._DetailsSubmitControlID = value; },
            get_AirportPanelControlID: function () { return this._AirportPanelControlID; },
            set_AirportPanelControlID: function (value) { this._AirportPanelControlID = value; },
            get_ResultControlID: function () { return this._ResultControlID; },
            set_ResultControlID: function (value) { this._ResultControlID = value; },
            get_LocationResultControlID: function () { return this._LocationResultControlID; },
            set_LocationResultControlID: function (value) { this._LocationResultControlID = value; },
            get_AccountTypeControlID: function () { return this._AccountTypeControlID; },
            set_AccountTypeControlID: function (value) { this._AccountTypeControlID = value; },
            get_ProfileIDControlID: function () { return this._ProfileIDControlID; },
            set_ProfileIDControlID: function (value) { this._ProfileIDControlID = value; },
            get_ServiceUrl: function () { return this._ServiceUrl; },
            set_ServiceUrl: function (value) { this._ServiceUrl = value; },
            get_ServiceUrlPlaceSearch: function () { return this._ServiceUrlPlaceSearch; },
            set_ServiceUrlPlaceSearch: function (value) { this._ServiceUrlPlaceSearch = value; },
            get_ServiceUrlSaveData: function () { return this._ServiceUrlSaveData; },
            set_ServiceUrlSaveData: function (value) { this._ServiceUrlSaveData = value; },
            get_ServiceUrlSaveDistance: function () { return this._ServiceUrlSaveDistance; },
            set_ServiceUrlSaveDistance: function (value) { this._ServiceUrlSaveDistance = value; },
            get_ServiceUrlData: function () { return this._ServiceUrlData; },
            set_ServiceUrlData: function (value) { this._ServiceUrlData = value; },
            get_DataType: function () { return this._DataType; },
            set_DataType: function (value) { this._DataType = value; },
            get_TransparentImageUrl: function () { return this._TransparentImageUrl; },
            set_TransparentImageUrl: function (value) { this._TransparentImageUrl = value; },
            get_LocationData: function () { return this._LocationData; },
            set_LocationData: function (value) {
                if (value) {
                    var iataField = ("IATA" in this._LocationData) ? this._LocationData.IATA : "";
                    var data = JSON.stringify(this._LocationData);
                    jQuery.extend(true, this._LocationData, value);
                    var newdata = JSON.stringify(this._LocationData);

                    if ((iataField != this._LocationData.IATA) && this._options.isLocationAirportInited) {
                        this._notifyPropertyChanged('IATA');
                    }

                    if (data != newdata) {
                        this._notifyPropertyChanged('LocationData');
                    }
                }
            },
            get_LocationDataJSON: function () { return this._LocationDataJSON; },
            set_LocationDataJSON: function (value) {
                this._LocationDataJSON = value;
                if (value) {
                    var data = Sys.Serialization.JavaScriptSerializer.deserialize(value);
                    if (data) {
                        this.set_LocationData(data);
                    }
                }
            },
            get_LocationDetails: function () {
                if (!Type.isClass(Sys.Extended.UI.LocationDetails)) { return null; }
                var detailsBehaviors = Sys.UI.Behavior.getBehaviorsByType(this.get_element(), Sys.Extended.UI.LocationDetails);
                if (0 in detailsBehaviors) {
                    return detailsBehaviors[0].get_LocationDetails();
                }
                else {
                    return null;
                }
            },
            set_LocationDetails: function (value) {
                if (!Type.isClass(Sys.Extended.UI.LocationDetails)) { return; }
                if (value) {
                    var detailsBehaviors = Sys.UI.Behavior.getBehaviorsByType(this.get_element(), Sys.Extended.UI.LocationDetails);
                    if (0 in detailsBehaviors) {
                        detailsBehaviors[0].set_LocationDetails(value);
                    }
                }
            },
            get_options: function () { return this._options; },
            set_options: function (value) {
                if (value) {
                    jQuery.extend(true, this._options, value);
                }
            },

            _setLatLng: function (lat, lng) {
                this._LocationData.Latitude = lat;
                this._LocationData.Longitude = lng;
            },

            _isPickup: function () {
                return (this._DataType == Sys.Extended.UI.LocationDataType.Pickup);
            },

            _isWaypoint: function () {
                return (this._DataType == Sys.Extended.UI.LocationDataType.Waypoint);
            },

            getTypes: function () { return this._LocationData.Types; },
            getTypesHtml: function (src, types) {
                return "<img src='" + src + "' /><span>" + types.join(', ').replace(/\_/g, " ") + "</span>";
            },
            fillResult: function () {
                var result = $("#" + this._ResultControlID).find("td." + this._options.resultCSS.location).find("td." + this._options.resultCSS.data);
                var location = this._LocationData;
                result.each(function (n, i) {
                    var valuetype = this.className.split(' ')[1];
                    if (valuetype == 'coord') {
                        this.innerHTML = String.format("{0}, {1}", location.Latitude, location.Longitude);
                    }
                    else {
                        if (location.Address) {
                            this.innerHTML = location.Address[valuetype];
                        }
                    }
                });
            },

            _setGMapLocation: function () {
                try {
                    Sys.Extended.UI.LocationCommon.location._setLocation(this._DataType,
                        { lat: this._LocationData.Latitude, lng: this._LocationData.Longitude, value: this._LocationData.Value,
                            FormattedAddress: this._LocationData.Address.FormattedAddress
                        }
                    );
                }
                catch (ex) {
                }
            },

            onACselect: function () {
                this.fillResult();
                this._setGMapLocation();
                Sys.Extended.UI.LocationCommon.location.requestMatrix(this._DataType);
                this.selectedToProfile();
            },

            _sendDataSuccess: function (eventArgs) {
                this._isSendDataSuccess = eventArgs;
                var handler = this.get_events().getHandler("sendDataSuccess");
                if (handler) {
                    handler(this, eventArgs);
                }
                this.raisePropertyChanged('isSendDataSuccess');
            },

            _sendLocationData: function () {
                if (!this._isInited) { return; }

                var base = this._getBase(["_sendDataSuccess"]);
                var iswaypoint = this._isWaypoint();
                var serviceUrlData = this._ServiceUrlData;
                var locationdata = jQuery.extend(true, {}, this._LocationData);
                delete locationdata.query;
                delete locationdata.TypesDB;
                delete locationdata.__type;
                if (locationdata.Address) { delete locationdata.Address.__type; }

                $.ajax({
                    cache: false, type: "POST", contentType: "application/json", dataType: "json",
                    url: serviceUrlData,
                    data: JSON.stringify({ location: locationdata }),
                    success: function (data) {
                        base._sendDataSuccess(data.d);
                        if (!iswaypoint) {
                            Sys.Extended.UI.LocationCommon.set_isLocationDataCompleted(data.d);
                        }
                    },
                    error: function (xhr) {
                        Sys.Extended.UI.LocationCommon.set_isLocationDataCompleted(false);
                    }
                });
            },

            selectedToProfile: function () {
                var accountType, account, details, location, keywordData, props, query, i;
                var serviceUrlSaveData = this._ServiceUrlSaveData;
                account = Sys.Extended.UI.LocationCommon.data.profile.selectedProfile;
                accountType = (account) ? Sys.Extended.UI.LocationCommon.data.profile.accountType : "";
                details = this.get_LocationDetails();
                query = this._LocationData.query;

                location = {};
                props = this._options.keywordsProperties.split(",");
                for (i in props) {
                    location[props[i]] = this._LocationData[props[i]];
                }
                if (location.Address) {
                    if ("__type" in location.Address) { delete location.Address.__type; }
                }
                $.ajax({
                    cache: false, type: "POST", contentType: "application/json", dataType: "json",
                    url: serviceUrlSaveData,
                    data: JSON.stringify({
                        location: location,
                        query: query,
                        account: account,
                        accountType: accountType,
                        locationDetails: details
                    }),
                    success: function (data) {
                    },
                    error: function (xhr) {
                        var x = 0;
                    }
                });
            },
            getPlaceSearch: function () {
                var serviceUrlPlaceSearch = this._ServiceUrlPlaceSearch;
                var location = this._LocationData;
                var base = this._getBase(["set_LocationData", "onACselect"]);
                $.ajax({
                    cache: true, type: "POST", contentType: "application/json", dataType: "json",
                    url: serviceUrlPlaceSearch,
                    data: JSON.stringify({ address: location.Value, reference: location.Reference }),
                    success: function (data) {
                        if (data.d) {
                            var address = (data.d.Address) ? data.d.Address : location.Address;
                            base.set_LocationData({ Latitude: data.d.Latitude, Longitude: data.d.Longitude, Address: address, IsItemComplete: true });
                            base.onACselect();
                        }
                    },
                    error: function (xhr) {
                    }
                });
            },
            setLocationData: function (id, data, imgSrc) {
                $("#" + id.replace("txt", "img")).attr("src", imgSrc);
                this.set_LocationData(data);
            },
            getSelectedProfile: function () {
                var txtProfile = $get(this._ProfileIDControlID);
                if (txtProfile) {
                    if (txtProfile.value) {
                        return Sys.Extended.UI.LocationCommon.data.profile.selectedProfile;
                    }
                    else if (Sys.Extended.UI.LocationCommon.data.profile.selectedProfile) {
                        Sys.Extended.UI.LocationCommon.data.profile.selectedProfile = "";
                    }
                }
                return "";
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

            _onBlur: function () {
                if (this._isLocationFromList) {
                    if (this.get_element().value != this._LocationData.Value) {
                        this.get_element().value = "";
                    } 
                }
            },

            _setLocationAutocomplete: function () {
                var base = this._getBase(["onACselect", "_onBlur", "setLocationData", "getPlaceSearch", "get_ServiceUrl", "get_LocationDetails", "getSelectedProfile", "get_options", "getTypesHtml", "getTypes"]);
                var infoimgcont = $("#" + this.get_element().id.replace("txt", "img")).parent();
                var infoimg = infoimgcont.children(":first");
                var locationResultControlID = this._LocationResultControlID;

                infoimgcont.hoverTooltip({ info: this.getTypesHtml(infoimg.attr("src"), this.getTypes(infoimg.attr("id"))), classname: "actooltip", css: { zIndex: 20, width: "250px"} });

                $(this.get_element()).autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            cache: true,
                            type: "POST",
                            contentType: "application/json",
                            url: base.get_ServiceUrl(),
                            data: JSON.stringify({
                                query: request.term,
                                accountType: Sys.Extended.UI.LocationCommon.data.profile.accountType,
                                profileID: base.getSelectedProfile(),
                                searchTypes: base.get_options().ACsearchTypes,
                                locationDetails: base.get_LocationDetails(),
                                isSubQueryEnabled: false,
                                minSubQueryLength: 3
                            }),
                            dataType: "json",
                            contextID: this.element.context.id,
                            menu: this.menu.element,
                            success: function (data) {
                                if (0 in data.d) {
                                    response($.map(data.d, function (item) {
                                        return item;
                                    }));
                                }
                                else {
                                    base.setLocationData(this.contextID, { Value: '', Latitude: 0, Longitude: 0, Types: [], Reference: '' }, base.get_options().imgTransparent);
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
                        base.setLocationData(this.id, jQuery.extend(ui.item, { query: this.value }), ui.item.Icon);
                        this.value = ui.item.Value;

                        if (locationResultControlID) {
                            $("#" + locationResultControlID).text(ui.item.Value);
                        }

                        if (ui.item.IsItemComplete) {
                            base.onACselect();
                        }
                        else {
                            base.getPlaceSearch();
                        }

                        return false;
                    },
                    close: function (event, ui) {
                        base._onBlur();
                    },
                    selectFirst: false, minLength: 3
                }).data("autocomplete")._renderItem = function (ul, item) {
                    var itemElement = jQuery("<a class='acItem'><img src='" + item.Icon + "' />&nbsp;" + item.Value + "</a>");
                    itemElement.children(":first").hoverTooltip({ info: base.getTypesHtml(item.Icon, item.Types), classname: "actooltip", css: { zIndex: 20, width: "250px"} });
                    return $("<li></li>")
				                    .data("item.autocomplete", item)
				                    .append(itemElement)
				                    .appendTo(ul);
                };
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.LocationPlaceSearch.registerClass('Sys.Extended.UI.LocationPlaceSearch', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.LocationPlaceSearch.registerClass('Sys.Extended.UI.LocationPlaceSearch', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.LocationPlaceSearch, { name: "LocationPlaceSearch" }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);

    }
    else {
        execute();
    }
})();