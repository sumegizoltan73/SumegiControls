/// <reference name="MicrosoftAjax.js"/>

(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "ImageLoader";

    if (Type._registerScript) {
        Type._registerScript("ImageLoaderBehavior.js");
    }

    function execute() {

        Sys.Extended.UI.ImageLoader = function (element) {
            Sys.Extended.UI.ImageLoader.initializeBase(this, [element]);

            this._GroupSelector = "";
            this._ImagesSelector = "";
            this._ImagesData = "";
            this._ImagesInfo = "";
            this._LoadingCSS = "";
            this._LoadingProgressControlID = "";

            this.images = [];
            this.selected = -1;
            this.changed = 0;
            this.group = 0;
            this.changedgroup = 0;
            this.loadhandler = null;
            this.onloadhandler = null;
            this.timerhandler = null;
            this.timer = null;
            this.isFinished = false;

            this.events = null;
        }
        Sys.Extended.UI.ImageLoader.prototype = {
            initialize: function () {
                Sys.Extended.UI.ImageLoader.callBaseMethod(this, 'initialize');

                this.group = 0;
                this.selected = -1;
                this.images = [];

                this.events = new Sys.EventHandlerList();

                var element = this.get_element();
                if (this._LoadingCSS) {
                    var progress = $get(this._LoadingProgressControlID);
                    if (progress) {
                        Sys.UI.DomElement.addCssClass(progress, this._LoadingCSS);
                    }
                }

                var thumbimages = $(element).find(this._ImagesSelector);
                if (0 in thumbimages) {
                    this.loadhandler = Function.createDelegate(this, this.load);
                    this.onloadhandler = Function.createDelegate(this, this.onload);
                    this.timerhandler = Function.createDelegate(this, this.ontimer);

                    this.timer = $create(Sys.Timer, { enabled: false, interval: 500 }, null, null, null);
                    this.timer.add_tick(this.timerhandler);

                    if (this._GroupSelector) {
                        var images, i;
                        if (0 in this._GroupSelector) {
                            for (i = 0; i < this._GroupSelector.length; i++) {
                                images = thumbimages.filter(this._GroupSelector[i]);
                                this.images.push(images);
                                this.images[i].one("load", this.onloadhandler);
                            }
                        }
                    }
                    else {
                        this.images.push(thumbimages);
                        this.images[0].one("load", this.onloadhandler);
                    }
                    this.onload();
                }
            },

            dispose: function () {
                var element = this.get_element();
                $clearHandlers(element);

                if (this.timer) {
                    this.timer.set_enabled(false);
                    this.timer.dispose();
                }

                this.loadhandler = null;
                this.onloadhandler = null;
                this.timerhandler = null;
                this.timer = null;

                Sys.Extended.UI.ImageLoader.callBaseMethod(this, "dispose");
            },

            add_finished: function (handler) {
                this.events.addHandler("finished", handler);
            },
            fire_finished: function (e) {
                var handler = this.events.getHandler("finished");
                if (handler) {
                    handler(this, Sys.EventArgs.Empty);
                }
            },

            load: function () {
                this.selected++;
                this.changed = this.selected;

                if (this.selected in this.images[this.group]) {
                    var srcorig = this.images[this.group][this.selected].src;
                    var src = this.images[this.group][this.selected].getAttribute("data-img");
                    this.images[this.group][this.selected].removeAttribute("data-img");

                    this.timer.set_enabled(true);
                    if (srcorig != src) {
                        this.images[this.group][this.selected].src = src;
                    }
                }
                else if ((this.group + 1) in this.images) {
                    this.group++;
                    this.selected = -1;
                    this.changed = this.selected;
                    this.changedgroup = this.group;

                    this.timer.set_enabled(true);
                }
                else {
                    this.timer.set_enabled(false);
                    if (!this.isFinished) {
                        this.isFinished = true;

                        this._hideProgress();
                        this.fire_finished();
                    }
                }
            },
            ontimer: function (caller, args) {
                this.timer.set_enabled(false);
                if ((this.selected == this.changed) && (this.group == this.changedgroup)) {
                    this.onload();
                }
            },
            onload: function () {
                window.setTimeout(this.loadhandler, 0);
            },

            _hideProgress: function () {
                if (this._LoadingCSS) {
                    var progress = $get(this._LoadingProgressControlID);
                    if (progress) {
                        Sys.UI.DomElement.removeCssClass(progress, this._LoadingCSS);
                    }
                }
            },

            get_GroupSelector: function () { return this._GroupSelector; },
            set_GroupSelector: function (value) { this._GroupSelector = value; },
            get_ImagesSelector: function () { return this._ImagesSelector; },
            set_ImagesSelector: function (value) { this._ImagesSelector = value; },
            get_ImagesData: function () { return this._ImagesData; },
            set_ImagesData: function (value) { this._ImagesData = value; },
            get_ImagesInfo: function () { return this._ImagesInfo; },
            set_ImagesInfo: function (value) { this._ImagesInfo = value; },
            get_LoadingCSS: function () { return this._LoadingCSS; },
            set_LoadingCSS: function (value) { this._LoadingCSS = value; },
            get_LoadingProgressControlID: function () { return this._LoadingProgressControlID; },
            set_LoadingProgressControlID: function (value) { this._LoadingProgressControlID = value; }

        };

        if (Sys.Extended.UI.BehaviorBase) {
            Sys.Extended.UI.ImageLoader.registerClass('Sys.Extended.UI.ImageLoader', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.ImageLoader.registerClass('Sys.Extended.UI.ImageLoader', Sys.UI.Behavior);
        }
        if (Sys.registerComponent) { Sys.registerComponent(Sys.Extended.UI.ImageLoader, { name: 'ImageLoader' }); }


    } // execute

    if (window.Sys && Sys.loader) {
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();