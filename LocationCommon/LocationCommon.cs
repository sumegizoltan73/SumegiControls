using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AjaxControlToolkit;
using System.Web.UI;

[assembly: WebResource("CustomExtenders.LocationCommon.LocationCommon.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.LocationCommon.LocationCommon.debug.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Common.RegisterLoader.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.LocationCommon.LocationCommon.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.LocationCommon.Resource")]
[assembly: ScriptResource("CustomExtenders.LocationCommon.LocationCommon.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.LocationCommon.Resource")]
[assembly: ScriptResource("CustomExtenders.Common.RegisterLoader.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.Common.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    public enum LocationDataType
    {
        Pickup= 0,
        Dropoff= 1,
        Waypoint= 2,
    }

    public enum LocationAccountType
    {
        Account = 0,
        Profile = 1,
        Delegate = 2,
    }

    [RequiredScript(typeof(ConsoleDebugCommon))]
    //[ClientScriptResource("", "CustomExtenders.Common.RegisterLoader.js")]
    [ClientScriptResource("", "CustomExtenders.LocationCommon.LocationCommon.js")]
    public static class CustomCommonScripts
    {
    }
}
