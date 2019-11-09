(function () {
    jQuery.fn.timefield = function (options) {
        var opt = jQuery.extend(true, {}, options);
        var divTimefield;
        var acsource = [];
        var now = ("MinutesOffset" in opt) ? new Date() : null;
        var shortTimePattern = Sys.CultureInfo.CurrentCulture.dateTimeFormat.ShortTimePattern;
        var patternmatch = shortTimePattern.match(/h/g);
        if (!(1 in patternmatch)) {
            shortTimePattern = shortTimePattern.replace("h", "hh");
        }

        if (this.length > 0) {
            for (var h = 0; h < 24; h++) {
                jQuery.each([0, 15, 30, 45], function (j, m) {
                    var time = new Date(0, 0, 0, h, m);
                    if (now) {
                        var minValue = (now.getHours() * 60) + (now.getMinutes()) + opt.MinutesOffset;
                        var timeValue = (h * 60) + m;
                        if (minValue <= timeValue) {
                            acsource.push(time._toFormattedString(shortTimePattern, Sys.CultureInfo.CurrentCulture));
                        }
                    }
                    else {
                        acsource.push(time._toFormattedString(shortTimePattern, Sys.CultureInfo.CurrentCulture));
                    }
                });
            }
            divTimefield = document.createElement("div");
            divTimefield.className = "timefield";
            document.body.appendChild(divTimefield);
        }

        this.each(function (i, n) {
            $(n).autocomplete({
                source: function (request, response) {
                    var hour;
                    var query = request.term.substr(0, 2).replace('_', '');
                    if (query.length > 1) { query = query.replace(/^0/, ''); }
                    if ((query != '0') && (query != '1') && (query.length < 2)) { query = '0' + query; }

                    if ((query.length > 1) && ((parseInt(query) > 12) || (query == '00'))) {
                        response(acsource);
                    }
                    else {
                        var list = jQuery.grep(acsource, function (n, i) {
                            if (query == '1') {
                                return (n.startsWith(query) || n.startsWith('0' + query));
                            }
                            else {
                                return n.startsWith(query);
                            }
                        });
                        response(list);
                    }
                },
                focus: function (event, ui) {
                    return false;
                },
                select: function (event, ui) {
                    this.value = ui.item.value;
                    $(this).keyup();

                    return false;
                },
                selectFirst: false, minLength: 0, appendTo: divTimefield
            }).data("autocomplete")._renderItem = function (ul, item) {
                var isAfternoon = false;
                if (/tt/.test(shortTimePattern)) {
                    var def = Sys.CultureInfo.CurrentCulture.dateTimeFormat.PMDesignator.toLowerCase() + "|" +
                                Sys.CultureInfo.CurrentCulture.dateTimeFormat.PMDesignator.toUpperCase();
                    var regex = new RegExp(def);
                    isAfternoon = regex.test(item.value);
                }
                var itemvalue = (isAfternoon) ? item.value.replace(" ", " <b>") + "</b>" : item.value;
                return $("<li></li>")
				        .data("item.autocomplete", item)
				        .append("<a>" + itemvalue + "</a>")
				        .appendTo(ul);
            };
        });

        var emptyField = shortTimePattern.replace(/[hmt]/g, "_");
        var validate = function (target) {
            var valid = (!target.value || Date._parseExact(target.value, shortTimePattern, Sys.CultureInfo.CurrentCulture));
            
            if (!valid) {
                Sys.UI.DomElement.removeCssClass(target, "ui-validator-valid");
                Sys.UI.DomElement.addCssClass(target, "ui-validator-invalid");
            }
            else {
                Sys.UI.DomElement.removeCssClass(target, "ui-validator-invalid");
                Sys.UI.DomElement.addCssClass(target, "ui-validator-valid");
            }
        };

        var maskDefinition;
        if (/tt/.test(shortTimePattern)) {
            var definition1 = '[aApP]';
            var definition2 = '[mxMX]';
            var designator1 = Sys.CultureInfo.CurrentCulture.dateTimeFormat.AMDesignator.split("");
            var designator2 = Sys.CultureInfo.CurrentCulture.dateTimeFormat.PMDesignator.split("");
            if (0 in designator1) {
                definition1 = definition1.replace("a", designator1[0].toLowerCase());
                definition1 = definition1.replace("A", designator1[0].toUpperCase());
            }
            if (0 in designator2) {
                definition1 = (designator1[0] != designator2[0]) ? definition1.replace("p", designator2[0].toLowerCase()) : definition1.replace("p", "");
                definition1 = (designator1[0] != designator2[0]) ? definition1.replace("P", designator2[0].toUpperCase()) : definition1.replace("P", "");
            }

            if (1 in designator1) {
                definition2 = definition2.replace("m", designator1[1].toLowerCase());
                definition2 = definition2.replace("M", designator1[1].toUpperCase());
            }
            if (1 in designator2) {
                definition2 = (designator1[1] != designator2[1]) ? definition2.replace("x", designator2[1].toLowerCase()) : definition2.replace("x", "");
                definition2 = (designator1[1] != designator2[1]) ? definition2.replace("X", designator2[1].toUpperCase()) : definition2.replace("X", "");
            }

            jQuery.mask.definitions['ˇ'] = definition1;
            jQuery.mask.definitions['^'] = definition2;
            maskDefinition = shortTimePattern.replace(/[hm]/g, "9").replace("tt", "ˇ^");
        }
        else {
            maskDefinition = shortTimePattern.replace(/[hm]/g, "9");
        }
        this.mask(maskDefinition);

        this.blur(function () {
            validate(this);
            if (Sys.UI.DomElement.containsCssClass(this, "ui-validator-invalid")) {
                this.focus();
            }
        });
        this.keyup(function () {
            validate(this);
            if (!Sys.UI.DomElement.containsCssClass(this, "ui-validator-invalid")
                || (!this.value) || (this.value == emptyField)) {
                if ("onvalidate" in opt) {
                    if (typeof (opt.onvalidate) == "function") {
                        opt.onvalidate(this.value.replace(emptyField, ""));
                    }
                }
            }
        });
    };
})();