using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AjaxControlToolkit;
using System.Web.UI;

[assembly: WebResource("CustomExtenders.ConsoleDebug.ConsoleDebug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.ConsoleDebug.ConsoleDebug.js", "CustomExtenders.ConsoleDebug.ConsoleDebug", "ConsoleDebug.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    [ClientScriptResource("", "CustomExtenders.ConsoleDebug.ConsoleDebug.js")]
    public static class ConsoleDebugCommon
    {
    }
}
