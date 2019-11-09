(function () {
    jQuery.fn.hoverTooltip = function (options) {
        var _options = { offsetY: 20, offsetX: 10, tooltipElement: null, info: "", css: null, classname: "" };
        var opt = jQuery.extend(true, _options, options);
        if (!opt.tooltipElement) { opt.tooltipElement = $("hovertooltip") };

        if (opt.tooltipElement.length < 1) {
            opt.tooltipElement = $("<div id='hovertooltip' class='ui-widget-content ui-corner-all' style='display:none;position:absolute;'></div>");
            opt.tooltipElement.appendTo($(document.body));
        }
        if (opt.css) { opt.tooltipElement.css(opt.css); }
        if (opt.classname) { opt.tooltipElement.addClass(opt.classname); }

        this.hover(
            function (e) {
                var positionTop = e.pageY;
                var info;
                if ((typeof opt.info) == "string") {
                    info = (/^</.test(opt.info)) ? opt.info : "<div>" + opt.info + "</div>";
                }
                else if ((typeof opt.info) == "function") {
                    info = opt.info.call(e, this);
                }
                else {
                    info = (opt.info) ? opt.info : "";
                }
                opt.tooltipElement
                    .empty()
                    .html(info)
			        .css("top", (positionTop + opt.offsetY) + "px")
			        .css("left", (e.pageX + opt.offsetX) + "px")
			        .fadeIn("fast");
            },
            function () { opt.tooltipElement.hide(); }
        );
    };
})();