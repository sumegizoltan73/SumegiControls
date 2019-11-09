using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using System.ComponentModel;
using AjaxControlToolkit;

[assembly: WebResource("CustomExtenders.ConsoleDebug.ConsoleDebugBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.ConsoleDebug.ConsoleDebugBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.ConsoleDebug.ConsoleDebugBehavior.js", "CustomExtenders.ConsoleDebug.ConsoleDebug", "CustomExtenders.ConsoleDebug.Resource")]
[assembly: ScriptResource("CustomExtenders.ConsoleDebug.ConsoleDebugBehavior.debug.js", "CustomExtenders.ConsoleDebug.ConsoleDebug", "CustomExtenders.ConsoleDebug.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    [RequiredScript(typeof(CustomCommonScripts))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.ConsoleDebugDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class ConsoleDebugExtender : ExtenderControlBase
    {
        public ConsoleDebugExtender()
        {
        }

        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.ConsoleDebug", targetControl.ClientID);
            ScriptDescriptor[] descriptors;

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("IsVisible", this.IsVisible);

            descriptors = new ScriptDescriptor[] { descriptor };

            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                new ScriptReference("CustomExtenders.ConsoleDebug.ConsoleDebugBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        public bool IsVisible
        {
            get { return GetPropertyValue<bool>("IsVisible", true); }
            set { SetPropertyValue<bool>("IsVisible", value); }
        }
        #endregion
    }
}
