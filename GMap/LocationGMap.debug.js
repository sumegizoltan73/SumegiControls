/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");
    Type.registerNamespace("Sys.Extended.UI.GMap");

    Sys.Extended.UI.GMap = {
        DistanceUnitId: { METRIC: 'metric', IMPERIAL: 'imperial' },
        MarkerIconSrcId: {
            greenA: 'http://maps.gstatic.com/intl/en_ALL/mapfiles/marker_greenA.png',
            greenB: 'http://maps.gstatic.com/intl/en_ALL/mapfiles/marker_greenB.png'
        },
        WaypointCommonId: "",
        directionsService: null,
        directionsDisplay: null,
        marker: null,
        isMapInited: false,
        isCollapsed: true,
        events: new Sys.EventHandlerList(),
        delegates: {},
        CalcRouteCallback: null,
        mapOptions: {
            zoom: 7,
            mapTypeId: null,
            center: null
        },
        initialize: function () {
            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.marker = new google.maps.Marker({ map: null, draggable: false });
            this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;

            this.delegates.directionchanged = Function.createDelegate(this, this._directionChanged);

            google.maps.event.addListener(this.directionsDisplay, 'directions_changed', this.delegates.directionchanged);

            Sys.Extended.UI.LocationCommon.data.price.units = Sys.Extended.UI.GMap.DistanceUnitId.METRIC;
        },
        dispose: function () {
            if (this.marker) {
                this.marker.unbindAll();
                this.marker.setMap(null);
            }
            if (this.directionsDisplay) {
                google.maps.event.clearListener(this.directionsDisplay, 'directions_changed');
                this.directionsDisplay.unbindAll();
                this.directionsDisplay.setMap(null);
            }

            this.isMapInited = false;
        },

        _directionChanged: function () {
            this.fire_event("directions_changed");
        },

        calcRoute: function () {
            try {
                var waypoints = this.getWayPoints();
                var request = {
                    origin: this.getOrigin(),
                    destination: this.getDestination(),
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                if (0 in waypoints) {
                    request.waypoints = waypoints;
                }
                this.directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        Sys.Extended.UI.GMap.marker.setPosition(null);
                        Sys.Extended.UI.GMap.marker.setIcon(null);
                        Sys.Extended.UI.GMap.marker.setTitle(null);
                        if (0 in response.routes) {
                            if (0 in response.routes[0].legs) {
                                var distance = 0;
                                var duration = 0;
                                var item = response.routes[0].legs.length;

                                response.routes[0].legs[0].start_address = Sys.Extended.UI.GMap.getInfoContent(Sys.Extended.UI.LocationCommon.location.pickup);
                                response.routes[0].legs[item - 1].end_address = Sys.Extended.UI.GMap.getInfoContent(Sys.Extended.UI.LocationCommon.location.dropoff);

                                while (item--) {
                                    if (item) {
                                        response.routes[0].legs[item].start_address = Sys.Extended.UI.GMap.getWayPointInfoContent(item - 1);
                                    }

                                    distance += response.routes[0].legs[item].distance.value;
                                    duration += response.routes[0].legs[item].duration.value;
                                }

                                Sys.Extended.UI.LocationCommon.distance.set_distance(distance, duration);
                            }
                        }
                        Sys.Extended.UI.GMap.directionsDisplay.setDirections(response);

                        if (Sys.Extended.UI.GMap.CalcRouteCallback) {
                            Sys.Extended.UI.GMap.CalcRouteCallback();
                        }
                    }
                });
            }
            catch (ex) {
                ConsoleDebug.Show("calcRoute() error - message: " + ex.message);
            }
        },
        getOrigin: function () {
            return String.format("{0},{1}", Sys.Extended.UI.LocationCommon.location.pickup.lat, Sys.Extended.UI.LocationCommon.location.pickup.lng);
        },
        getDestination: function () {
            return String.format("{0},{1}", Sys.Extended.UI.LocationCommon.location.dropoff.lat, Sys.Extended.UI.LocationCommon.location.dropoff.lng);
        },
        getWayPointBehavior: function () {
            var waypointbehavior;

            if (this.WaypointCommonId) {
                if (Type.isClass(Sys.Extended.UI.LocationWaypointCommon)) {
                    var waypointBehaviors = Sys.UI.Behavior.getBehaviorsByType($get(this.WaypointCommonId), Sys.Extended.UI.LocationWaypointCommon);
                    if (0 in waypointBehaviors) {
                        waypointbehavior = waypointBehaviors[0];
                    }
                }
            }

            return waypointbehavior;
        },
        getWayPoints: function () {
            var waypoints = [];
            var waypointbehavior = this.getWayPointBehavior();
            if (waypointbehavior) {
                waypoints = waypointbehavior.get_GMapWaypoints();
            }

            return waypoints;
        },
        getInfoContent: function (location) {
            return "<div class='gmapinfo'><b>" + location.value + "</b><br />" + location.FormattedAddress + "</div>";
        },
        getWayPointInfoContent: function (item) {
            var location, waypoints, infocontent = "";
            var waypointbehavior = this.getWayPointBehavior();
            if (waypointbehavior) {
                waypoints = waypointbehavior.get_Waypoints();
                if (item in waypoints) {
                    infocontent = this.getInfoContent(waypoints[item]);
                }
            }

            return infocontent;
        },
        setCenter: function (location, dataType) {
            var icon;
            if (dataType == Sys.Extended.UI.LocationDataType.Pickup) {
                icon = Sys.Extended.UI.GMap.MarkerIconSrcId.greenA;
            }
            else if (dataType == Sys.Extended.UI.LocationDataType.Dropoff) {
                icon = Sys.Extended.UI.GMap.MarkerIconSrcId.greenB;
            }
            this.gmap_ini(location.lat, location.lng, location.value, icon);
        },
        gmap_ini: function (lat, lng, value, icon) {
            if (lat && lng) {
                ConsoleDebug.Show(String.format("gmap_ini() - lat:{0}, lng:{1}", lat, lng));
                this.isMapInited = true;
                this.mapOptions.center = new google.maps.LatLng(lat, lng);
                var map = new google.maps.Map($get("map_canvas"), this.mapOptions);
                this.marker.setMap(map);
                this.marker.setPosition(this.mapOptions.center);
                this.marker.setIcon(icon);
                this.marker.setTitle(value);
                this.directionsDisplay.setMap(map);
            }

            if (this.CalcRouteCallback) {
                this.CalcRouteCallback();
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
        }
    };
})();


$(document).ready(function () {

    Sys.Extended.UI.GMap.initialize();

});