(function () {
    jQuery.fn.datefield = function (options) {

        var opt = jQuery.extend(true, {}, options);
        var dateFormat = "mm\/dd\/yyyy";
        var emptyField = dateFormat.replace(/[mdy]/g, "_");

        var validate = function (target) {
            var valid, date, datestr, dateformat;
            if (!/_/.test(target.value) && target.value) {
                dateformat = dateFormat.replace("yyyy", "yy");
                try {
                    date = $.datepicker.parseDate(dateformat, target.value);
                    datestr = $.datepicker.formatDate(dateformat, date);
                    valid = (datestr == target.value);
                }
                catch (ex) {
                    valid = false;
                }
                if (!valid) {
                    Sys.UI.DomElement.removeCssClass(target, "ui-validator-valid");
                    Sys.UI.DomElement.addCssClass(target, "ui-validator-invalid");
                }
                else {
                    Sys.UI.DomElement.removeCssClass(target, "ui-validator-invalid");
                    Sys.UI.DomElement.addCssClass(target, "ui-validator-valid");
                }
            }
        };

        this.mask(dateFormat.replace(/[mdy]/g, "9"));

        var datepickeropt = {};
        datepickeropt.onSelect = function (dateText, inst) {
            if ("onvalidate" in opt) {
                if (typeof (opt.onvalidate) == "function") {
                    opt.onvalidate(dateText);
                }
            }
        };

        if ("Datepicker" in opt) {
            jQuery.extend(true, datepickeropt, opt.Datepicker);
        }

        this.datepicker(datepickeropt);

        this.blur(function () {
            validate(this);
            if (Sys.UI.DomElement.containsCssClass(this, "ui-validator-invalid")) {
                this.focus();
            }
        });
        this.keyup(function () {
            validate(this);
            if ((!Sys.UI.DomElement.containsCssClass(this, "ui-validator-invalid") && (!/_/.test(this.value)))
                || (!this.value) || (this.value == emptyField)) {
                if ("onvalidate" in opt) {
                    if (typeof (opt.onvalidate) == "function") {
                        opt.onvalidate(this.value.replace(emptyField, ""));
                    }
                }
            }
        });
        this.each(function () {
            var datefield = this;
            var src = ("ImageUrl" in opt) ? opt.ImageUrl : CustomExtenders.DateField.Resource.ImageUrl;
            var css = ("ImageCSS" in opt) ? opt.ImageCSS : CustomExtenders.DateField.Resource.ImageCSS;
            var img = $("<img src='" + src + "' class='" + CustomExtenders.DateField.Resource.ImageCSS + "' alt=''/>")
            $(this).after(img);
            img.click(function () { $(datefield).focus(); });
        });
    };
})();