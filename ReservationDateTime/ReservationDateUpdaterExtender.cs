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

[assembly: WebResource("CustomExtenders.ReservationDateTime.ReservationDateUpdaterBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.ReservationDateTime.ReservationDateUpdaterBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.ReservationDateTime.ReservationDateUpdaterBehavior.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ReservationDateUpdater.Resource")]
[assembly: ScriptResource("CustomExtenders.ReservationDateTime.ReservationDateUpdaterBehavior.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ReservationDateUpdater.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for ReservationDateUpdaterExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(CommonToolkitScripts))]
    [RequiredScript(typeof(CustomCommonScripts))]
    [ToolboxItem(false)]
    [Designer("CustomExtenders.ReservationDateUpdaterDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class ReservationDateUpdaterExtender : ExtenderControlBase
    {
        public ReservationDateUpdaterExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.ReservationDateUpdater", targetControl.ClientID);
            ScriptDescriptor[] descriptors;

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("SelectorDate", this.SelectorDate);
            descriptor.AddProperty("SelectorTime", this.SelectorTime);

            descriptors = new ScriptDescriptor[] { descriptor };

            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                new ScriptReference("CustomExtenders.ReservationDateTime.ReservationDateUpdaterBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        public string SelectorDate
        {
            get { return GetPropertyValue<string>("SelectorDate", ""); }
            set { SetPropertyValue<string>("SelectorDate", value); }
        }

        [ExtenderControlProperty]
        public string SelectorTime
        {
            get { return GetPropertyValue<string>("SelectorTime", ""); }
            set { SetPropertyValue<string>("SelectorTime", value); }
        }
        #endregion
    }
}