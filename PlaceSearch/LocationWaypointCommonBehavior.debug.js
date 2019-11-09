/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "LocationWaypointCommon";

    if (Type._registerScript) {
        Type._registerScript("LocationWaypointCommonBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.LocationWaypointCommon = function (element) {
            Sys.Extended.UI.LocationWaypointCommon.initializeBase(this, [element]);

            this._AddStopControlID = "";
            this._ItemNextSiblingControlID = "";
            this._ServiceUrl = "";
            this._ServiceUrlPlaceSearch = "";
            this._ServiceUrlSaveData = "";
            this._ServiceUrlSaveDistance = "";
            this._ServiceUrlData = "";
            this._ServiceUrlRemove = "";
            this._RemoveStopCSS = "";
            this._InputFieldCSS = "";
            this._Waypoints = [];
            this._WaypointsJSON = "";
            this._WaypointsCount = 0;
            this._IsTriggerClick = false;

            this._IsDirty = false;

            this._delegates = {};
        }
        Sys.Extended.UI.LocationWaypointCommon.prototype = {
            initialize: function () {
                Sys.Extended.UI.LocationWaypointCommon.callBaseMethod(this, 'initialize');

                var handler = Function.createDelegate(this, this._onPropertyChanged);
                this.add_propertyChanged(handler);

                this._delegates.addstop = Function.createDelegate(this, this._addStop_OnClick);
                this._delegates.stopshanged = Function.createDelegate(this, this._onStopChanged);

                $addHandler($get(this._AddStopControlID), "click", this._delegates.addstop);

                Sys.Extended.UI.GMap.WaypointCommonId = this.get_element().id;

                for (var i = 0; i < this._Waypoints.length; i++) {
                    this._createWaypoint(true, i);
                }

                if (this._IsTriggerClick) {
                    this._addStop_OnClick();
                }
            },

            dispose: function () {
                $clearHandlers(this.get_element());
                $removeHandler($get(this._AddStopControlID), "click", this._delegates.addstop);

                Sys.Extended.UI.LocationWaypointCommon.callBaseMethod(this, "dispose");
            },

            _onPropertyChanged: function (caller, args) {
                if (args._propertyName == "isSendDataSuccess") {

                }
            },

            get_Waypoints: function () { return this._Waypoints; },
            set_Waypoints: function (value) {
                if (value) {
                    this._Waypoints = value;
                    this._WaypointsCount = value.length;
                }
            },
            get_WaypointsJSON: function () { return this._WaypointsJSON; },
            set_WaypointsJSON: function (value) {
                this._WaypointsJSON = value;
                if (value) {
                    var data = Sys.Serialization.JavaScriptSerializer.deserialize(value);
                    if (data) {
                        this.set_Waypoints(data);
                    }
                }
            },
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
            get_ServiceUrlRemove: function () { return this._ServiceUrlRemove; },
            set_ServiceUrlRemove: function (value) { this._ServiceUrlRemove = value; },
            get_AddStopControlID: function () { return this._AddStopControlID; },
            set_AddStopControlID: function (value) { this._AddStopControlID = value; },
            get_ItemNextSiblingControlID: function () { return this._ItemNextSiblingControlID; },
            set_ItemNextSiblingControlID: function (value) { this._ItemNextSiblingControlID = value; },
            get_RemoveStopCSS: function () { return this._RemoveStopCSS; },
            set_RemoveStopCSS: function (value) { this._RemoveStopCSS = value; },
            get_InputFieldCSS: function () { return this._InputFieldCSS; },
            set_InputFieldCSS: function (value) { this._InputFieldCSS = value; },
            get_IsTriggerClick: function () { return this._IsTriggerClick; },
            set_IsTriggerClick: function (value) { this._IsTriggerClick = value; },

            _onStopChanged: function () {
                this._IsDirty = true;
                Sys.Extended.UI.GMap.calcRoute();
            },

            get_GMapWaypoints: function () {
                if (this._IsDirty) {
                    this._setWaypoints();
                }

                return $.map(this._Waypoints, function (item) {
                    return { location: String.format("{0},{1}", item.Latitude, item.Longitude), stopover: true };
                });
            },

            _setWaypoints: function () {
                this._Waypoints = [];

                var i, fields = [];
                $("#" + this._ItemNextSiblingControlID).parent().find("tr.waypoint").each(function (i) {
                    fields.push($(this).find("input:text")[0]);
                });

                for (i = 0; i < fields.length; i++) {
                    var locationBehaviors = Sys.UI.Behavior.getBehaviorsByType(fields[i], Sys.Extended.UI.LocationPlaceSearch);
                    if (0 in locationBehaviors) {
                        var data = locationBehaviors[0].get_LocationData();
                        var address = (data.Address) ? data.Address.FormattedAddress : "";
                        this._Waypoints.push({ Latitude: data.Latitude, Longitude: data.Longitude, value: data.Value, FormattedAddress: address });
                    }
                }

                this._IsDirty = false;
            },

            _createWaypoint: function (isExistingItem, i) {
                var tr, data, acvalue, removeOnClick, waypoint;
                var nextsibling = $("#" + this._ItemNextSiblingControlID);

                if (0 in nextsibling) {
                    removeOnClick = Function.createDelegate(this, this._removeStop_OnClick);
                    acvalue = (isExistingItem) ? this._Waypoints[i].value : "";

                    tr = nextsibling.clone();
                    tr.attr("id", "trWaypoint" + this._WaypointsCount).addClass("waypoint");
                    data = tr.find(".data");
                    data.empty().append('<div><input id="txtWaypoint' + this._WaypointsCount + '" class="' + this._InputFieldCSS + '" type="text" value="' + acvalue + '"/>' +
                        '<input id="btnWaypoint' + this._WaypointsCount + '" class="buttonremove ' + this._RemoveStopCSS + '" type="button" value=" " />' +
                        '<span id="lblWaypoint' + this._WaypointsCount + '" class="infofield"></span>' +
                        '</div>');

                    tr.insertBefore(nextsibling);
                    tr.find("input:button").click(function () { removeOnClick(this); });

                    this._setLabels();

                    waypoint = {
                        DataType: Sys.Extended.UI.LocationDataType.Waypoint,
                        LocationResultControlID: "lblWaypoint" + this._WaypointsCount,
                        ServiceUrl: this._ServiceUrl,
                        ServiceUrlPlaceSearch: this._ServiceUrlPlaceSearch,
                        ServiceUrlSaveData: this._ServiceUrlSaveData,
                        ServiceUrlSaveDistance: this._ServiceUrlSaveDistance,
                        ServiceUrlData: this._ServiceUrlData
                    };
                    var placesearch = $create(Sys.Extended.UI.LocationPlaceSearch, waypoint, null, null, $get("txtWaypoint" + this._WaypointsCount));
                    placesearch.add_locationchanged(this._delegates.stopshanged);

                    if (isExistingItem) {
                        placesearch._setLatLng(this._Waypoints[i].lat, this._Waypoints[i].lng);
                    }

                    $("#txtWaypoint" + this._WaypointsCount).focus();

                    this._WaypointsCount++;
                }
            },

            _setLabels: function () {
                $("#" + this._ItemNextSiblingControlID).parent().find("tr.waypoint").each(function (i) {
                    var label = "Stop #" + (i + 1);
                    $(this).find(".label").html("<span>" + label + "</span>");
                });
            },

            _addStop_OnClick: function () {
                this._createWaypoint();
            },

            _removeStop_OnClick: function (button) {
                var location, lat, lng;
                var tr = $("#" + button.id.replace("btnWaypoint", "trWaypoint"));
                var acstop = $(tr).find("input.textbox");
                var behaviors = Sys.UI.Behavior.getBehaviorsByType(acstop[0], Sys.Extended.UI.LocationPlaceSearch);
                if (0 in behaviors) {
                    location = behaviors[0].get_LocationData();
                    lat = location.Latitude;
                    lng = location.Longitude;
                    behaviors[0].dispose();

                    if ((lat != 0) && (lng != 0)) {
                        $.ajax({
                            cache: false, type: "POST", contentType: "application/json", dataType: "json",
                            url: this._ServiceUrlRemove,
                            data: JSON.stringify({ latitude: lat, longitude: lng }),
                            success: function (data) {
                            },
                            error: function (xhr) {
                            }
                        });
                    }
                }

                if (0 in tr) {
                    tr[0].parentNode.removeChild(tr[0]);
                }
                this._setLabels();
                this._onStopChanged();
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.LocationWaypointCommon.registerClass('Sys.Extended.UI.LocationWaypointCommon', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.LocationWaypointCommon.registerClass('Sys.Extended.UI.LocationWaypointCommon', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.LocationWaypointCommon, { name: "LocationWaypointCommon" }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);

    }
    else {
        execute();
    }
})();