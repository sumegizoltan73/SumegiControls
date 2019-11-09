/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    Sys.Extended.UI.LocationDataType = function () { throw Error.invalidOperation(); }
    Sys.Extended.UI.LocationDataType.prototype = {
        Pickup: 0,
        Dropoff: 1,
        Waypoint: 2
    }
    Sys.Extended.UI.LocationDataType.registerEnum("Sys.Extended.UI.LocationDataType", false);

    Sys.Extended.UI.LocationAccountType = function () { throw Error.invalidOperation(); }
    Sys.Extended.UI.LocationAccountType.prototype = {
        Account: 0,
        Profile: 1,
        Delegate: 2
    }
    Sys.Extended.UI.LocationAccountType.registerEnum("Sys.Extended.UI.LocationAccountType", false);


    Sys.Extended.UI.LocationCommon = {
        events: new Sys.EventHandlerList(),
        delegates: {
            pickupDateValidated: null,
            pickupTimeValidated: null
        },
        placeDetail: {
            selectedElementControlID: ""
        },
        isLocationDataCompleted: false,
        set_isLocationDataCompleted: function (value) {
            if (this.isLocationDataCompleted != value) {
                this.isLocationDataCompleted = value;
                this.location._setNavig(value);
            }
        },
        data: {
            price: { distance: { text: '', value: 0 }, duration: { text: '', value: 0 }, units: null },
            profile: { selectedProfile: '', accountType: "profile" }
        },
        distance: {
            distance: 0,
            ridetime: 0,
            formattedDistance: "",
            formattedRideTime: "",
            set_distance: function (distance, ridetime) {
                if ((this.distance != distance) || (this.ridetime != ridetime)) {
                    this.distance = distance;
                    this.ridetime = ridetime;
                    Sys.Extended.UI.LocationCommon.fire_event("distancechanged");
                    this._sendDistance(distance, ridetime);
                }
            },
            _sendDistance: function (distance, ridetime) {
                $.ajax({
                    cache: false, type: "POST", contentType: "application/json", dataType: "json",
                    url: CustomExtenders.LocationCommon.Resource.ServiceUrlSaveDistance,
                    context: this,
                    data: JSON.stringify({ distance: distance, ridetime: ridetime }),
                    success: function (data) {
                        this.formattedDistance = data.d[0];
                        this.formattedRideTime = data.d[1];
                        this._showDistance();
                    },
                    error: function (xhr) {
                        this.formattedDistance = "";
                        this.formattedRideTime = "";
                        this._showDistance();
                    }
                });
            },
            _showDistance: function () {
                Sys.Extended.UI.LocationCommon.fire_event("distancesuccess");
                $('[id$="DataDistance"]').text(this.formattedDistance);
                $('[id$="DataRideTime"]').text(this.formattedRideTime);
            }
        },
        location: {
            pickupDate: "",
            pickupTime: "",
            pickup: { lat: "", lng: "", value: "", FormattedAddress: "" }, dropoff: { lat: "", lng: "", value: "", FormattedAddress: "" },
            _setLocation: function (dataType, location) {
                if (dataType == Sys.Extended.UI.LocationDataType.Pickup) {
                    this.pickup = location;
                }
                else if (dataType == Sys.Extended.UI.LocationDataType.Dropoff) {
                    this.dropoff = location;
                }
            },
            set_pickupDate: function (value) {
                if (this.pickupDate != value) {
                    this.pickupDate = value;
                    Sys.Extended.UI.LocationCommon.fire_event("pickupdatechanged");
                    this._sendPickupDateTime(value, CustomExtenders.LocationCommon.Resource.ServiceUrlSaveDate);
                }
            },
            set_pickupTime: function (value) {
                if (this.pickupTime != value) {
                    this.pickupTime = value;
                    Sys.Extended.UI.LocationCommon.fire_event("pickuptimechanged");
                    this._sendPickupDateTime(value, CustomExtenders.LocationCommon.Resource.ServiceUrlSaveTime);
                }
            },
            _sendPickupDateTime: function (value, serviceurl) {
                $.ajax({
                    cache: false, type: "POST", contentType: "application/json", dataType: "json",
                    url: serviceurl,
                    data: JSON.stringify({ value: value }),
                    success: function (data) {
                        Sys.Extended.UI.LocationCommon.fire_event("datetimesuccess");
                    },
                    error: function (xhr) {
                    }
                });
            },
            _setNavig: function (isCompleted) {
                if (_setNavigationNext) {
                    _setNavigationNext(isCompleted, false);
                }
            },
            isDataComplete: function () {
                var isComplete = (this.pickup.lat && this.pickup.lng);
                isComplete = isComplete && (this.dropoff.lat && this.dropoff.lng);
                return isComplete;
            },
            requestMatrix: function (dataType) {
                try {
                    var location;
                    if (dataType == Sys.Extended.UI.LocationDataType.Pickup) {
                        location = this.pickup;
                    }
                    else if (dataType == Sys.Extended.UI.LocationDataType.Dropoff) {
                        location = this.dropoff;
                    }

                    if (dataType != Sys.Extended.UI.LocationDataType.Waypoint) {
                        if (this.isDataComplete()) {
                            if (!Sys.Extended.UI.GMap.isMapInited) {
                                Sys.Extended.UI.GMap.setCenter(location);
                            }
                            Sys.Extended.UI.GMap.calcRoute();
                        }
                        else {
                            Sys.Extended.UI.GMap.setCenter(location);
                        }
                    }
                }
                catch (ex) {
                }
            }
        },

        add_event: function (handler, eventName) {
            this.events.addHandler(eventName, handler);
        },
        remove_event: function (handler, eventName) {
            this.events.removeHandler(eventName, handler);
        },
        fire_event: function (eventName) {
            var handler = this.events.getHandler(eventName);
            if (handler) {
                handler(this, Sys.EventArgs.Empty);
            }
        },

        add_changedetail: function (handler) {
            this.events.addHandler("changedetail", handler);
        },
        remove_changedetail: function (handler) {
            this.events.removeHandler("changedetail", handler);
        },
        fire_changedetail: function (e) {
            var handler = this.events.getHandler("changedetail");
            if (handler) {
                handler(this, Sys.EventArgs.Empty);
            }
        }
    };

    Sys.Extended.UI.LocationCommon.delegates.pickupDateValidated = Function.createDelegate(Sys.Extended.UI.LocationCommon.location, Sys.Extended.UI.LocationCommon.location.set_pickupDate);
    Sys.Extended.UI.LocationCommon.delegates.pickupTimeValidated = Function.createDelegate(Sys.Extended.UI.LocationCommon.location, Sys.Extended.UI.LocationCommon.location.set_pickupTime);
})();