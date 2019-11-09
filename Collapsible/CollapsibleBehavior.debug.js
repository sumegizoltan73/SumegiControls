/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "Collapsible";

    if (Type._registerScript) {
        Type._registerScript("CollapsibleBehavior.js");
    }

    function execute() {
        Sys.Extended.UI.Collapsible = function (element) {
            Sys.Extended.UI.Collapsible.initializeBase(this, [element]);

            this._IsTriggerCollapseControlPostback = false;
            this._IsInitCollapsed = true;
            this._Collapsed = false;
            this._CollapseControlID = "";
            this._ImageControlID = "";
            this._TextLabelID = "";
            this._CollapsedText = "";
            this._ExpandedText = "";
            this._CollapsedImage = "";
            this._ExpandedImage = "";

            this._IsCollapsedInited = false;

            this._delegates = {};
        }
        Sys.Extended.UI.Collapsible.prototype = {
            initialize: function () {
                Sys.Extended.UI.Collapsible.callBaseMethod(this, 'initialize');

                this._delegates.propertychanged = Function.createDelegate(this, this._onPropertyChanged);
                this._delegates.toggle = Function.createDelegate(this, this._onToggle);
                this._delegates.postback = Function.createDelegate(this, this._triggerPostback);

                this.add_propertyChanged(this._delegates.propertychanged);

                var collapseelement = $get(this._CollapseControlID);
                if (collapseelement) {
                    $addHandler(collapseelement, "click", this._delegates.toggle);
                }

                if (this._IsTriggerCollapseControlPostback) {
                    this.add_collapsed(this._delegates.postback);
                }

                if (this._IsInitCollapsed) {
                    this._initCollapsed();
                }
            },

            dispose: function () {
                var collapseelement = $get(this._CollapseControlID);
                if (collapseelement) {
                    $removeHandler(collapseelement, "click", this._delegates.toggle);
                }

                Sys.Extended.UI.Collapsible.callBaseMethod(this, "dispose");
            },

            get_IsTriggerCollapseControlPostback: function () { return this._IsTriggerCollapseControlPostback; },
            set_IsTriggerCollapseControlPostback: function (value) { this._IsTriggerCollapseControlPostback = value; },
            get_Collapsed: function () { return this._Collapsed; },
            set_Collapsed: function (value) {
                if (this._Collapsed != value) {
                    this._Collapsed = value;
                    this.raisePropertyChanged("Collapsed");
                }
            },
            get_CollapseControlID: function () { return this._CollapseControlID; },
            set_CollapseControlID: function (value) { this._CollapseControlID = value; },
            get_ImageControlID: function () { return this._ImageControlID; },
            set_ImageControlID: function (value) { this._ImageControlID = value; },
            get_TextLabelID: function () { return this._TextLabelID; },
            set_TextLabelID: function (value) { this._TextLabelID = value; },
            get_CollapsedText: function () { return this._CollapsedText; },
            set_CollapsedText: function (value) { this._CollapsedText = value; },
            get_ExpandedText: function () { return this._ExpandedText; },
            set_ExpandedText: function (value) { this._ExpandedText = value; },
            get_CollapsedImage: function () { return this._CollapsedImage; },
            set_CollapsedImage: function (value) { this._CollapsedImage = value; },
            get_ExpandedImage: function () { return this._ExpandedImage; },
            set_ExpandedImage: function (value) { this._ExpandedImage = value; },
            get_IsInitCollapsed: function () { return this._IsInitCollapsed; },
            set_IsInitCollapsed: function (value) { this._IsInitCollapsed = value; },
            get_IsCollapsedInited: function () { return this._IsCollapsedInited; },

            _onPropertyChanged: function (caller, args) {
                if (args._propertyName == "Collapsed") {
                    this.fire_collapsed();
                    this._setCollapseText();
                    this._setCollapseImage();
                    if (this._Collapsed) {
                        this._onHide();
                    }
                    else {
                        this._onShow();
                    }
                }
            },

            add_collapsed: function (handler) {
                this.get_events().addHandler("collapsed", handler);
            },
            remove_collapsed: function (handler) {
                this.get_events().removeHandler("collapsed", handler);
            },
            fire_collapsed: function (e) {
                var handler = this.get_events().getHandler("collapsed");
                if (handler) {
                    handler(this, Sys.EventArgs.Empty);
                }
            },

            _initCollapsed: function () {
                this._IsCollapsedInited = true;
                this._Collapsed = !this._Collapsed;
                this._onToggle();
            },

            _setCollapseText: function () {
                var label = $get(this._TextLabelID);
                if (label) {
                    label.innerHTML = (this._Collapsed) ? this._CollapsedText : this._ExpandedText;
                }
            },

            _setCollapseImage: function () {
                var img = $get(this._ImageControlID);
                if (img) {
                    img.src = (this._Collapsed) ? this._CollapsedImage : this._ExpandedImage;
                }
            },

            _triggerPostback: function (caller, args) {
                var collapseElement = $get(this.get_CollapseControlID());
                if (collapseElement) {
                    var name = collapseElement.id.replace(/_/g, "$");
                    __doPostBack(name, this.get_Collapsed());
                }
            },

            _onToggle: function (e) {
                if (this._Collapsed) {
                    this._doShow(e);
                }
                else {
                    this._doHide(e);
                }
            },

            _doShow: function (e) {
                this.set_Collapsed(false);
            },

            _doHide: function (e) {
                this.set_Collapsed(true);
            },

            _onShow: function () {
                jQuery(this.get_element()).show("slow");
            },

            _onHide: function () {
                jQuery(this.get_element()).hide("slow");
            }
        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.Collapsible.registerClass('Sys.Extended.UI.Collapsible', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.Collapsible.registerClass('Sys.Extended.UI.Collapsible', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.Collapsible, { name: "Collapsible" }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);

    }
    else {
        execute();
    }
})();