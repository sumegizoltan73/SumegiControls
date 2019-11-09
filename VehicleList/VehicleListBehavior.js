/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "VehicleList";

    if (Type._registerScript) {
        Type._registerScript("VehicleListBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.VehicleList = function (element) {
            Sys.Extended.UI.VehicleList.initializeBase(this, [element]);

            this._ErrorText = "";
            this._ServiceUrl = "";
            this._BtnContinueSelector = "";
            this._IsBtnNextEnabled = false;
            this._ItemTableId = "";
            this._LoadingCSS = "";
            this._SeparatorCSS = "";
            this._LoadingProgressControlID = "";
            this._IsErrorInHtmlDom = false;
            this._MaxVehicleCount = 3;
            this._MoreControlID = "";
            this._MoreContainerControlID = "";
            this._MoreItemSelector = "";

            this._buttons = null;
            this._baseratehandler = null;
            this._selected = 0;
            this._retries = 0;
            this._isLoadSuccess = false;

            this._delegates = {};
        }
        Sys.Extended.UI.VehicleList.prototype = {
            initialize: function () {
                Sys.Extended.UI.VehicleList.callBaseMethod(this, 'initialize');

                if (this._MoreControlID) {
                    this._delegates.moreclick = Function.createDelegate(this, this._onMoreClick);
                    $addHandler($get(this._MoreControlID), "click", this._delegates.moreclick, true);
                }

                this._baseratehandler = Function.createDelegate(this, this._getBaseRate);
                this._buttons = $(this.get_element()).find(this._BtnContinueSelector);

                if (_setNavigationNext) { _setNavigationNext(this._IsBtnNextEnabled, false); }

                this._showProgress();

                if (Type.isClass(Sys.Extended.UI.ImageLoader)) {
                    var behaviors = Sys.UI.Behavior.getBehaviorsByType(this.get_element(), Sys.Extended.UI.ImageLoader);
                    if (0 in behaviors) {
                        behaviors[0].add_finished(this._baseratehandler);
                    }
                }
                else {
                    window.setTimeout(this._baseratehandler, 100);
                }
            },

            dispose: function () {

                Sys.Extended.UI.VehicleList.callBaseMethod(this, "dispose");
            },

            get_ErrorText: function () { return this._ErrorText; },
            set_ErrorText: function (value) { this._ErrorText = value; },
            get_ServiceUrl: function () { return this._ServiceUrl; },
            set_ServiceUrl: function (value) { this._ServiceUrl = value; },
            get_BtnContinueSelector: function () { return this._BtnContinueSelector; },
            set_BtnContinueSelector: function (value) { this._BtnContinueSelector = value; },
            get_IsBtnNextEnabled: function () { return this._IsBtnNextEnabled; },
            set_IsBtnNextEnabled: function (value) { this._IsBtnNextEnabled = value; },
            get_ItemTableId: function () { return this._ItemTableId; },
            set_ItemTableId: function (value) { this._ItemTableId = value; },
            get_LoadingCSS: function () { return this._LoadingCSS; },
            set_LoadingCSS: function (value) { this._LoadingCSS = value; },
            get_SeparatorCSS: function () { return this._SeparatorCSS; },
            set_SeparatorCSS: function (value) { this._SeparatorCSS = value; },
            get_MoreItemSelector: function () { return this._MoreItemSelector; },
            set_MoreItemSelector: function (value) { this._MoreItemSelector = value; },
            get_LoadingProgressControlID: function () { return this._LoadingProgressControlID; },
            set_LoadingProgressControlID: function (value) { this._LoadingProgressControlID = value; },
            get_MaxVehicleCount: function () { return this._MaxVehicleCount; },
            set_MaxVehicleCount: function (value) { this._MaxVehicleCount = value; },
            get_MoreControlID: function () { return this._MoreControlID; },
            set_MoreControlID: function (value) { this._MoreControlID = value; },
            get_MoreContainerControlID: function () { return this._MoreContainerControlID; },
            set_MoreContainerControlID: function (value) { this._MoreContainerControlID = value; },

            _getSelectedRate: function () {
                window.setTimeout(this._baseratehandler, 20);
            },

            _showError: function (msg) {
                if (this._IsErrorInHtmlDom) {
                    jQuery(msg).appendTo(document.body);
                }
            },

            _getBaseRate: function () {
                if ((this._selected in this._buttons) && (this._selected < this._MaxVehicleCount)) {
                    var button = this._buttons[this._selected];
                    var vehicleType = $(this._buttons[this._selected]).parent().attr("data-itemtype");
                    var vehicleId = $(this._buttons[this._selected]).parent().attr("data-itemid");
                    $.ajax({
                        cache: false, type: "POST", contentType: "application/json", dataType: "json",
                        url: this._ServiceUrl,
                        context: this,
                        data: JSON.stringify({ vehicleType: vehicleType, vehicleId: vehicleId }),
                        success: function (data) {
                            if (data.d) {
                                var table, id, idtags, isvisible, rate, baserate, btn = $(button);
                                baserate = (data.d[0]) ? data.d[0] : this._ErrorText;
                                rate = (data.d[1]) ? data.d[1] : this._ErrorText;
                                btn.parent().parent().parent().find('span[id$="lblBaseRate"]').html(baserate);
                                btn.parent().parent().parent().find('span[id$="lblRate"]').html(rate);
                                isvisible = (data.d[0] && data.d[1]);
                                if (isvisible) {
                                    _setButtonState(button, true, false);
                                }

                                if (2 in data.d) {
                                    if (data.d[2]) {
                                        this._showError(data.d[2]);
                                        this._retries++;
                                        if (this._retries < 10) {
                                            this._getBaseRate();
                                        }
                                    }
                                }

                                idtags = button.id.split("_");
                                id = button.id.replace(idtags[idtags.length - 1], this._ItemTableId);
                                table = $get(id);
                                if (table) {
                                    if (isvisible) {
                                        if (table.style.display == "none") {
                                            table.style.display = "";
                                        }
                                    }
                                    else {
                                        if (table.style.display == "none") {
                                            var separator = table.previousSibling;
                                            while (!("style" in separator)) {
                                                if (!separator.previousSibling) {
                                                    break;
                                                }
                                                separator = separator.previousSibling;
                                            }
                                            if (this._SeparatorCSS) {
                                                if (Sys.UI.DomElement.containsCssClass(separator, this._SeparatorCSS)) {
                                                    separator.style.display = "none";
                                                }
                                            }
                                            else {
                                                separator.style.display = "none";
                                            }
                                        }
                                    }
                                }
                            }
                            this._ajaxComplete();
                        },
                        error: function (xhr) {
                            this._showError("error");
                            this._retries++;
                            if (this._retries < 10) {
                                this._getBaseRate();
                            }
                            else {
                                this._ajaxComplete();
                            }
                        }
                    });
                }
                else {
                    this._isLoadSuccess = true;
                    this._hideProgress();
                }
            },

            _ajaxComplete: function () {
                this._selected++;
                this._retries = 0;
                if ((this._selected in this._buttons) && (this._selected < this._MaxVehicleCount)) {
                    this._getSelectedRate();
                }
                else {
                    this._isLoadSuccess = true;
                    this._hideProgress();
                }
            },

            _onMoreClick: function (e) {
                this._MaxVehicleCount = this._buttons.length;
                this._showProgress();

                if (this._MoreContainerControlID) {
                    $("#" + this._MoreContainerControlID).hide();
                }

                if (this._MoreItemSelector) {
                    $(this._MoreItemSelector).show();
                }

                if (this._isLoadSuccess) {
                    this._getSelectedRate();
                }
            },

            _showProgress: function () {
                if (this._LoadingCSS) {
                    var progress = $get(this._LoadingProgressControlID);
                    if (progress) {
                        Sys.UI.DomElement.addCssClass(progress, this._LoadingCSS);
                    }
                }
            },

            _hideProgress: function () {
                if (this._LoadingCSS) {
                    var progress = $get(this._LoadingProgressControlID);
                    if (progress) {
                        Sys.UI.DomElement.removeCssClass(progress, this._LoadingCSS);
                    }
                }
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.VehicleList.registerClass('Sys.Extended.UI.VehicleList', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.VehicleList.registerClass('Sys.Extended.UI.VehicleList', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.VehicleList, { name: 'VehicleList' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();