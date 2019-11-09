/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "GMapCommon";

    if (Type._registerScript) {
        Type._registerScript("GMapCommonBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.GMapCommon = function (element) {
            Sys.Extended.UI.GMapCommon.initializeBase(this, [element]);

            this._GMapContentControlID = "";
            this._GMapContainerControlID = "";
            this._CollapsibleControlID = "";
            this._LoadingCSS = "";
            this._ProgressCSS = "";
            this._SetContentTimeout = 1500;
            this._ImageLoadingTimeout = 2500;
            this._InitStateSelector = "";
            this._LoadingProgressControlID = "";

            this._initCount = 0;

            this._delegates = {};
        }
        Sys.Extended.UI.GMapCommon.prototype = {
            initialize: function () {
                Sys.Extended.UI.GMapCommon.callBaseMethod(this, 'initialize');

                this._delegates.setgmap = Function.createDelegate(this, this._setGMap);
                this._delegates.setgmapinit = Function.createDelegate(this, this._setGMapInit);
                this._delegates.gmapdisplayloaded = Function.createDelegate(this, this._onGMapDisplayLoaded);
                this._delegates.directionchanged = Function.createDelegate(this, this._onGMapDirectionChanged);

                Sys.Extended.UI.GMap.add_event(this._delegates.directionchanged, 'directions_changed');

                var isInitGMap = true;
                var mapcontent = $get(this._GMapContentControlID);
                var mapcontainer = $get(this._GMapContainerControlID);

                if (!mapcontainer) {
                    mapcontainer = document.createElement("div");
                    if (this._GMapContainerControlID) {
                        mapcontainer.id = this._GMapContainerControlID;
                    }
                    else {
                        mapcontainer.id = "gmapcontainer";
                        this._GMapContainerControlID = mapcontainer.id;
                    }
                    mapcontainer.style.display = "none";
                    document.body.appendChild(mapcontainer);
                }
                else {
                    isInitGMap = !(0 in mapcontainer.children);
                }

                if (isInitGMap) {
                    if (this._LoadingCSS) {
                        var loadingdiv = document.createElement("div");
                        loadingdiv.id = "gmaploading";
                        loadingdiv.className = this._LoadingCSS;
                        mapcontent.appendChild(loadingdiv);
                    }

                    var setgmap = this._delegates.setgmap;
                    var timeout = this._SetContentTimeout;
                    $(document).ready(function () {
                        window.setTimeout(setgmap, timeout);
                    });
                }
                else {
                    this._setGMapContent();
                }
            },

            _setGMap: function () {
                if (this._LoadingProgressControlID && this._ProgressCSS) {
                    $("#" + this._LoadingProgressControlID).addClass(this._ProgressCSS).css({ backgroundRepeat: "no-repeat" });
                }
                if (this._InitStateSelector && this._LoadingCSS) {
                    $(this._InitStateSelector).addClass(this._LoadingCSS).css({ backgroundRepeat: "no-repeat" });
                }

                setTimeout(this._delegates.setgmapinit, 500);
            },

            _setGMapInit: function () {
                if (!Sys.Extended.UI.GMap.isMapInited) {
                    var pickup = Sys.Extended.UI.LocationCommon.location.pickup;
                    var dropoff = Sys.Extended.UI.LocationCommon.location.dropoff;

                    if (pickup.lat && pickup.lng) {
                        Sys.Extended.UI.GMap.setCenter(pickup, Sys.Extended.UI.LocationDataType.Pickup);
                    }
                    else if (dropoff.lat && dropoff.lng) {
                        Sys.Extended.UI.GMap.setCenter(dropoff, Sys.Extended.UI.LocationDataType.Dropoff);
                    }

                    this._initCount++;

                    if (this._initCount < 10) {
                        window.setTimeout(this._delegates.setgmap, 400);
                    }
                }
                else {
                    Sys.Extended.UI.GMap.calcRoute();
                }
            },

            dispose: function () {
                var mapcontent = $get(this._GMapContentControlID);
                var mapcontainer = $get(this._GMapContainerControlID);

                Sys.Extended.UI.GMap.remove_event(this._delegates.directionchanged, 'directions_changed');

                this._removeLoading(mapcontent);

                if (0 in mapcontent.children) {
                    mapcontainer.appendChild(mapcontent.removeChild(mapcontent.children[0]));
                }

                this._delegates.setgmap = null;
                this._delegates.setgmapinit = null;

                Sys.Extended.UI.GMapCommon.callBaseMethod(this, "dispose");
            },

            get_GMapContentControlID: function () { return this._GMapContentControlID; },
            set_GMapContentControlID: function (value) { this._GMapContentControlID = value; },
            get_GMapContainerControlID: function () { return this._GMapContainerControlID; },
            set_GMapContainerControlID: function (value) { this._GMapContainerControlID = value; },
            get_CollapsibleControlID: function () { return this._CollapsibleControlID; },
            set_CollapsibleControlID: function (value) { this._CollapsibleControlID = value; },
            get_SetContentTimeout: function () { return this._SetContentTimeout; },
            set_SetContentTimeout: function (value) { this._SetContentTimeout = value; },
            get_InitStateSelector: function () { return this._InitStateSelector; },
            set_InitStateSelector: function (value) { this._InitStateSelector = value; },
            get_LoadingCSS: function () { return this._LoadingCSS; },
            set_LoadingCSS: function (value) { this._LoadingCSS = value; },
            get_ProgressCSS: function () { return this._ProgressCSS; },
            set_ProgressCSS: function (value) { this._ProgressCSS = value; },
            get_ImageLoadingTimeout: function () { return this._ImageLoadingTimeout; },
            set_ImageLoadingTimeout: function (value) { this._ImageLoadingTimeout = value; },
            get_LoadingProgressControlID: function () { return this._LoadingProgressControlID; },
            set_LoadingProgressControlID: function (value) { this._LoadingProgressControlID = value; },

            _removeLoading: function (mapcontent) {
                if (this._LoadingCSS) {
                    var loadingdiv = $get("gmaploading");
                    if (loadingdiv) {
                        mapcontent.removeChild(loadingdiv);
                    }
                }
            },

            _setGMapContent: function () {
                var mapcontent = $get(this._GMapContentControlID);
                var mapcontainer = $get(this._GMapContainerControlID);

                if (mapcontent) {
                    this._removeLoading(mapcontent);

                    if (0 in mapcontainer.children) {
                        if (0 in mapcontent.children) {
                            mapcontent.removeChild(mapcontent.children[0]);
                        }
                        mapcontent.appendChild(mapcontainer.removeChild(mapcontainer.children[0]));
                    }

                    if (this._CollapsibleControlID) {
                        var collapsed = Sys.Extended.UI.GMap.isCollapsed;
                        var panel = $get(this._CollapsibleControlID);
                        if (panel) {
                            var collapsible = Sys.UI.Behavior.getBehaviorsByType(panel, Sys.Extended.UI.Collapsible);
                            if (0 in collapsible) {
                                collapsible[0].add_collapsed(Function.createDelegate(this, this._setCollapsibleState));
                                if (!collapsible[0].get_IsCollapsedInited()) {
                                    collapsible[0]._initCollapsed();
                                }
                                collapsible[0].set_Collapsed(collapsed);
                            }
                        }
                    }
                }
            },

            _setCollapsibleState: function (caller, args) {
                Sys.Extended.UI.GMap.isCollapsed = caller.get_Collapsed();
            },

            _onGMapDisplayLoaded: function () {
                $(this._InitStateSelector).removeClass(this._LoadingCSS);
                $("#" + this._LoadingProgressControlID).removeClass(this._ProgressCSS);
            },

            _onGMapDirectionChanged: function (caller, args) {
                window.setTimeout(this._delegates.gmapdisplayloaded, this._ImageLoadingTimeout);
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.GMapCommon.registerClass('Sys.Extended.UI.GMapCommon', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.GMapCommon.registerClass('Sys.Extended.UI.GMapCommon', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.GMapCommon, { name: "GMapCommon" }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);

    }
    else {
        execute();
    }
})();