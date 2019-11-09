/// <reference name="MicrosoftAjax.js"/>

(function ($) {
    var methods = {
        options: {
            serviceurl: "",
            serviceurlCheckbox: "",
            onsucces: null,
            keyupDelay: 1000,
            isInitSelectableFields: true,
            optionTextPostTag: "Text",
            lastfield: { typecode: "", timeout: null },
            delegates: {}
        },
        initialize: function (target, options) {
            var opt = jQuery.extend(true, this.options, options);
            if (!opt.serviceurl) {
                return;
            }

            opt.delegates.fieldkeyup = Function.createDelegate(this, this._onFieldKeyUp);
            opt.delegates.fieldchanged = Function.createDelegate(this, this._onFieldChanged);
            opt.delegates.checkchanged = Function.createDelegate(this, this._onFieldCheckedChanged);
            opt.delegates.optionchanged = Function.createDelegate(this, this._onFieldOptionChanged);

            var select = target.filter("select");
            select.change(function () { opt.delegates.optionchanged(this); });

            var checkbox = target.filter("input:radio, input:checkbox");
            checkbox.change(function () { opt.delegates.checkchanged(this); });

            var textbox = target.filter("input:text");
            textbox.blur(function (e) { opt.delegates.fieldchanged(this); });
            textbox.keyup(function (e) { opt.delegates.fieldkeyup(this); });

            if (this.options.isInitSelectableFields) {
                this._initOptionData(select);
                this._initCheckboxData(checkbox);
            }
        },
        _getTypeCode: function (e) {
            var id = e.id.split('_');
            return id[id.length - 1];
        },
        _onFieldKeyUp: function (e) {
            var typecode = this._getTypeCode(e);
            if (this.options.lastfield.typecode == typecode) {
                clearTimeout(this.options.lastfield.timeout);
            }
            this.options.lastfield.typecode = typecode;
            var ontimeout = Function.createDelegate(this, function () { this._onFieldChanged(e); });
            this.options.lastfield.timeout = window.setTimeout(ontimeout, this.options.keyupDelay);
        },
        _onFieldChanged: function (e) {
            this._sendData(e, this._getTypeCode(e), e.value);
        },
        _onFieldCheckedChanged: function (e) {
            this._sendData(e, this._getTypeCode(e), e.checked, this.options.serviceurlCheckbox);
        },
        _onFieldOptionChanged: function (e) {
            this._initOptionData($(e));
        },
        _initOptionData: function (select) {
            var servicedata = [];
            if (0 in select) {
                for (i = 0; i < select.length; i++) {
                    var typecode = this._getTypeCode(select[i]);
                    var value = $(select[i]).find("option:selected").val();
                    var text = $(select[i]).find("option:selected").text();
                    servicedata.push({ Key: typecode + this.options.optionTextPostTag, Value: text });
                    servicedata.push({ Key: typecode, Value: value });
                }
                this._fireRequest(null, { data: servicedata });
            }
        },
        _initCheckboxData: function (field) {
            var servicedata = [];
            if (0 in field) {
                for (i = 0; i < field.length; i++) {
                    var typecode = this._getTypeCode(field[i]);
                    var value = field[i].checked;
                    servicedata.push({ Key: typecode, Value: value });
                }
                this._fireRequest(null, { data: servicedata });
            }
        },
        _sendData: function (e, typecode, value, serviceurl) {
            this._fireRequest(e, { data: [{ Key: typecode, Value: value}] }, serviceurl);
        },
        _fireRequest: function (e, servicedata, serviceurl) {
            var serviceUrl = (serviceurl) ? serviceurl : this.options.serviceurl;
            $.ajax({
                cache: false, type: "POST", contentType: "application/json", dataType: "json",
                url: serviceUrl,
                context: this,
                data: JSON.stringify(servicedata),
                success: function (data) {
                    this._ajaxComplete(e, true, data.d);
                },
                error: function (xhr) {
                    this._ajaxComplete(e, false);
                }
            });
        },
        _ajaxComplete: function (e, state, returnvalue) {
            if (this.options.onsuccess) {
                if (state) {
                    if (typeof (this.options.onsuccess) == "function") {
                        this.options.onsuccess(e, returnvalue);
                    }
                }
            }
        }
    };

    jQuery.fn.fieldajaxchange = function (options) {
        var fieldajax = jQuery.extend(true, {}, methods);
        fieldajax.initialize(this, options);
    };
})(jQuery);