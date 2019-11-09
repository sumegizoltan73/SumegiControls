using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using AjaxControlToolkit;

[assembly: WebResource("CustomExtenders.Plugins.Plugins.css", "text/css", PerformSubstitution = true)]
[assembly: WebResource("CustomExtenders.Plugins.jquery.datefield.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.datefield.debug.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.timefield.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.timefield.debug.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.hovertooltip.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.hovertooltip.debug.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.maskedinput-1.3.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.maskedinput-1.3.debug.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.fieldajaxchange.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.jquery.fieldajaxchange.debug.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.validationscripts.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Plugins.validationscripts.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.datefield.js", "CustomExtenders.Plugins.DateField", "CustomExtenders.DateField.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.datefield.debug.js", "CustomExtenders.Plugins.DateField", "CustomExtenders.DateField.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.timefield.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.TimeField.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.timefield.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.TimeField.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.hovertooltip.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.HoverTooltip.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.hovertooltip.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.HoverTooltip.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.maskedinput-1.3.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.MaskedInput.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.maskedinput-1.3.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.MaskedInput.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.fieldajaxchange.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.FieldAjaxChange.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.jquery.fieldajaxchange.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.FieldAjaxChange.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.validationscripts.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.Validation.Resource")]
[assembly: ScriptResource("CustomExtenders.Plugins.validationscripts.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.Validation.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    [RequiredScript(typeof(MaskedInput))]
    //[ClientCssResource("CustomExtenders.Plugins.Plugins.css")]
    [ClientCssResource("CustomExtenders.CustomExtenders.css")]
    [ClientScriptResource("", "CustomExtenders.Plugins.jquery.datefield.js")]
    public static class DateField
    {
    }

    [RequiredScript(typeof(MaskedInput))]
    //[ClientCssResource("CustomExtenders.Plugins.Plugins.css")]
    [ClientCssResource("CustomExtenders.CustomExtenders.css")]
    [ClientScriptResource("", "CustomExtenders.Plugins.jquery.timefield.js")]
    public static class TimeField
    {
    }

    [ClientScriptResource("", "CustomExtenders.Plugins.jquery.maskedinput-1.3.js")]
    public static class MaskedInput
    {
    }

    [ClientScriptResource("", "CustomExtenders.Plugins.jquery.hovertooltip.js")]
    public static class HoverTooltip
    {
    }

    [ClientScriptResource("", "CustomExtenders.Plugins.jquery.fieldajaxchange.js")]
    public static class FieldAjaxChange
    {
    }

    [ClientScriptResource("", "CustomExtenders.Plugins.validationscripts.js")]
    public static class ValidationScripts
    {
    }
}
