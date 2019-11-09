using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using AjaxControlToolkit;

[assembly: WebResource("CustomExtenders.GMap.images.logo_powered_by_bing.png", "img/png")]
[assembly: WebResource("CustomExtenders.GMap.images.powered-by-google-on-white.png", "img/png")]
[assembly: WebResource("CustomExtenders.GMap.GMap.css", "text/css", PerformSubstitution = true)]
[assembly: WebResource("CustomExtenders.GMap.LocationGMap.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.GMap.LocationGMap.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.GMap.LocationGMap.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.GMap.Resource")]
[assembly: ScriptResource("CustomExtenders.GMap.LocationGMap.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.GMap.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    [RequiredScript(typeof(CustomCommonScripts))]
    //[ClientCssResource("CustomExtenders.GMap.GMap.css")]
    [ClientCssResource("CustomExtenders.CustomExtenders.css")]
    [ClientScriptResource("", "CustomExtenders.GMap.LocationGMap.js")]
    public static class LocationGMap
    {
    }
}
