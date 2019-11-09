/// <reference name="MicrosoftAjax.js"/>

function _void() { return; }

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "MenuFormat";

    if (Type._registerScript) {
        Type._registerScript("MenuFormatBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.MenuFormat = function (element) {
            Sys.Extended.UI.MenuFormat.initializeBase(this, [element]);

            this._ExtraCellCSS = "";
            this._MenuCSS = "";
            this._ContentCSS = "";
            this._MenuWidth = 215;
            this._MenuOutWidth = 12;
            this._zIndex = 3;
            this._SelectedColor = "#ffffff";
            this._SelectedBackGroundColor = "#85bbf9";
            this._HoveredColor = "#ffffff";
            this._HoveredBackGroundColor = "#85bbf9";
            this._MenuContainerControlID = "";
            this._ContentPanelControlID = "";
            this._IsContentPaddingEnabled = true;
            this._IsMenuURLBased = false;
            this._IsDisableValidatorsBeforeNavigate = true;
            this._MenuItemClientFunction = "";

            this._inlineCSS = "<style type='text/css'>" +
                    "#[ID] a:hover {color:[HOVER];text-decoration:none;} " +
                    "#[ID] a.menuhovered {color:[HOVER];background-color:[HOVERBG];} " +
                    "#[ID] a.menuselected {color:[SEL];background-color:[SELBG];} " +
                    "#[ID] .menuhovered td {color:[HOVER];background-color:[HOVERBG];} " +
                    "#[ID] .menuselected td {color:[SEL];background-color:[SELBG];} " +
                    "#[ID] .menuhovered a {color:[HOVER];background-color:[HOVERBG];} " +
                    "#[ID] .menuselected a {color:[SEL];background-color:[SELBG];} " +
                    "#[ID] table td.menuitemout {background-color:transparent;} " +
                    "#[ID] td.tdmenuitem {padding:0px;} " +
                    "#[ID] td.tdmenuitem a {padding:0px 10px 0px 10px; display:block;} " +
                    ".cspbookmenu {z-index: [ZINDEX];}" +
                    "[ZINDEXCSS]" +
                    "[ITEMSCSS]" +
                "</style>";

            this._delegates = {};
        }
        Sys.Extended.UI.MenuFormat.prototype = {
            initialize: function () {
                Sys.Extended.UI.MenuFormat.callBaseMethod(this, 'initialize');

                var inithandler = Function.createDelegate(this, this._init);

                this._delegates.click = Function.createDelegate(this, this._onItemClick);
                this._delegates.navigate = Function.createDelegate(this, this._onItemNavigate);

                $(document).ready(function () {
                    inithandler();
                });
            },

            dispose: function () {
                try {
                    var menuitems = $(this.get_element()).find("td.tdmenuitem");
                    if (0 in menuitems) {
                        var i = menuitems.length;
                        while (i--) {
                            if ("click" in this._delegates) {
                                $removeHandler(menuitems[i], "click", this._delegates.click);
                            }
                            if ("navigate" in this._delegates) {
                                $removeHandler(menuitems[i], "click", this._delegates.navigate);
                            }
                        }
                    }
                }
                catch (ex){
                }

                Sys.Extended.UI.MenuFormat.callBaseMethod(this, "dispose");
            },

            _init: function(){
                var tr, tr2, td, tdmenu, link, params, menucontainer, contentpanel, paddingcontent = 0, itemoffset, itemscss = "";
                var element = this.get_element();
                menucontainer = (this._MenuContainerControlID) ? $get(this._MenuContainerControlID) : null;
                contentpanel = (this._ContentPanelControlID) ? $get(this._ContentPanelControlID) : null;

                element.style.zIndex = this._zIndex;
                if (element.children[0].children) {
                    for (var i = 0; i < element.children[0].children.length; i++) {
                        tr = element.children[0].children[i];
                        tr2 = tr.children[0].children[0].children[0].children[0];
                        tdmenu = tr2.children[0];
                        tdmenu.style.width = this._MenuWidth + "px";
                        Sys.UI.DomElement.addCssClass(tdmenu, "tdmenuitem");
                        link = tdmenu.children[0];
                        link.style.width = this._MenuWidth + "px";
                        if (/javascript/.test(link.href)) {
                            params = link.href.split("'");
                            tdmenu.setAttribute("name", params[1]);
                            tdmenu.setAttribute("menudata", params[3]);

                            if ("navigate" in this._delegates) {
                                delete this._delegates.navigate;
                            }
                            $addHandler(tdmenu, "click", this._delegates.click);
                            if (this._IsMenuURLBased) {
                                link.href = location.href.replace(location.search, "") + "?menu=" + i;
                            }
                            else {
                                link.href = "javascript:_void();";
                            }
                        }
                        else {
                            if ("click" in this._delegates) {
                                delete this._delegates.click;
                            }
                            $addHandler(tdmenu, "click", this._delegates.navigate);
                        }

                        td = document.createElement("td");
                        td.className = "menuitemout";
                        if (this._ExtraCellCSS) {
                            Sys.UI.DomElement.addCssClass(td, this._ExtraCellCSS);
                        }

                        var cheight = tdmenu.offsetHeight;
                        var cwidth = parseInt((cheight * 0.25));

                        td.style.width = cwidth + "px";
                        tr2.appendChild(td);
                        if ((typeof HTMLCanvasElement) != "undefined") {
                            var canvaselement, grid;
                            var chalfheight = parseInt((cheight / 2));
                            canvaselement = document.createElement("canvas");
                            canvaselement.className = "menuout";
                            canvaselement.setAttribute("width", "" + cwidth);
                            canvaselement.setAttribute("height", "" + cheight);
                            td.appendChild(canvaselement);
                            if (canvaselement.getContext) {
                                grid = canvaselement.getContext("2d");
                                grid.fillStyle = this._SelectedBackGroundColor;
                                grid.beginPath();
                                grid.moveTo(0, 0);
                                grid.lineTo(cwidth, chalfheight);
                                grid.lineTo(0, cheight);
                                grid.lineTo(0, 0);
                                grid.fill();
                                grid.closePath();
                            }
                            else {
                                td.innerHTML = "&nbsp;";
                            }
                        }
                        else {
                            if (this._MenuOutWidth){
                                td.style.width = this._MenuOutWidth + "px";
                            }
                            if (this._SelectedBackGroundColor) {
                                var iecss = "menuitemout_" + this._SelectedBackGroundColor.replace("#", "");
                                Sys.UI.DomElement.addCssClass(td, iecss);
                            }
                            td.innerHTML = "&nbsp;";
                        }

                        paddingcontent = (tdmenu.offsetWidth > paddingcontent) ? tdmenu.offsetWidth : paddingcontent;
                        itemoffset = element.children[0].children[i].offsetTop + 1;
                        itemscss += ".cspbookcontent .menucontent" + i + " {margin-top:" + itemoffset + "px;}";
                        itemscss += ".cspbookcontent .menucontentheight" + i + " {height:" + tdmenu.offsetHeight + "px;}";
                        if (this._ContentCSS) {
                            itemscss += "." + this._ContentCSS + " .menucontent" + i + " {margin-top:" + itemoffset + "px;}";
                            itemscss += "." + this._ContentCSS + " .menucontentheight" + i + " {height:" + tdmenu.offsetHeight + "px;}";
                        }
                    }

                    if (menucontainer && this._MenuCSS) {
                        Sys.UI.DomElement.addCssClass(menucontainer, this._MenuCSS);
                    }
                    if (contentpanel) {
                        if (this._ContentCSS) {
                            Sys.UI.DomElement.addCssClass(contentpanel, this._ContentCSS);
                        }
                        if (this._IsContentPaddingEnabled) {
                            contentpanel.style.paddingLeft = paddingcontent + "px";
                        }
                    }

                    var zindexcss = (this._MenuCSS) ? "." + this._MenuCSS + " {z-index: [ZINDEX];}" : "";
                    var css = this._inlineCSS.replace(/\[ID\]/g, element.id);
                    css = css.replace(/\[HOVER\]/g, this._HoveredColor);
                    css = css.replace(/\[HOVERBG\]/g, this._HoveredBackGroundColor);
                    css = css.replace(/\[SEL\]/g, this._SelectedColor);
                    css = css.replace(/\[SELBG\]/g, this._SelectedBackGroundColor);
                    css = css.replace(/\[ZINDEXCSS\]/g, zindexcss);
                    css = css.replace(/\[ZINDEX\]/g, this._zIndex);
                    css = css.replace(/\[ITEMSCSS\]/g, itemscss);
                    $("head").append(css);
                }
            },

            _onItemClick: function (e) {
                var srcE = (e.target.tagName == "A") ? e.target.parentNode : e.target;
                var name = srcE.getAttribute("name");
                var menudata = srcE.getAttribute("menudata");
                if (this._MenuItemClientFunction){
                    if (this._MenuItemClientFunction in window){
                        window[this._MenuItemClientFunction]();
                    }
                }
                if (this._IsDisableValidatorsBeforeNavigate){
                    _disablePageValidators();
                }
                __doPostBack(name, menudata);
            },

            _onItemNavigate: function (e) {
                var link = (e.target.tagName == "A") ? e.target : e.target.children[0];
                window.location.href = link.href;
            },

            get_ExtraCellCSS: function () { return this._ExtraCellCSS; },
            set_ExtraCellCSS: function (value) { this._ExtraCellCSS = value; },
            get_MenuCSS: function () { return this._MenuCSS; },
            set_MenuCSS: function (value) { this._MenuCSS = value; },
            get_ContentCSS: function () { return this._ContentCSS; },
            set_ContentCSS: function (value) { this._ContentCSS = value; },
            get_IsContentPaddingEnabled: function () { return this._IsContentPaddingEnabled; },
            set_IsContentPaddingEnabled: function (value) { this._IsContentPaddingEnabled = value; },
            get_IsMenuURLBased: function () { return this._IsMenuURLBased; },
            set_IsMenuURLBased: function (value) { this._IsMenuURLBased = value; },
            get_MenuWidth: function () { return this._MenuWidth; },
            set_MenuWidth: function (value) { this._MenuWidth = value; },
            get_MenuOutWidth: function () { return this._MenuOutWidth; },
            set_MenuOutWidth: function (value) { this._MenuOutWidth = value; },
            get_zIndex: function () { return this._zIndex; },
            set_zIndex: function (value) { this._zIndex = value; },
            get_SelectedColor: function () { return this._SelectedColor; },
            set_SelectedColor: function (value) { this._SelectedColor = value; },
            get_SelectedBackGroundColor: function () { return this._SelectedBackGroundColor; },
            set_SelectedBackGroundColor: function (value) { this._SelectedBackGroundColor = value; },
            get_HoveredColor: function () { return this._HoveredColor; },
            set_HoveredColor: function (value) { this._HoveredColor = value; },
            get_HoveredBackGroundColor: function () { return this._HoveredBackGroundColor; },
            set_HoveredBackGroundColor: function (value) { this._HoveredBackGroundColor = value; },
            get_MenuContainerControlID: function () { return this._MenuContainerControlID; },
            set_MenuContainerControlID: function (value) { this._MenuContainerControlID = value; },
            get_ContentPanelControlID: function () { return this._ContentPanelControlID; },
            set_ContentPanelControlID: function (value) { this._ContentPanelControlID = value; },
            get_MenuItemClientFunction: function () { return this._MenuItemClientFunction; },
            set_MenuItemClientFunction: function (value) { this._MenuItemClientFunction = value; },
            get_IsDisableValidatorsBeforeNavigate: function () { return this._IsDisableValidatorsBeforeNavigate; },
            set_IsDisableValidatorsBeforeNavigate: function (value) { this._IsDisableValidatorsBeforeNavigate = value; }

        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.MenuFormat.registerClass('Sys.Extended.UI.MenuFormat', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.MenuFormat.registerClass('Sys.Extended.UI.MenuFormat', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.MenuFormat, { name: 'MenuFormat' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();