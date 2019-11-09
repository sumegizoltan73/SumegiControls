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

[assembly: WebResource("CustomExtenders.FieldAjaxChange.FieldAjaxChangeBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.FieldAjaxChange.FieldAjaxChangeBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.FieldAjaxChange.FieldAjaxChangeBehavior.js", "CustomExtenders.FieldAjaxChange.FieldAjaxChange", "CustomExtenders.FieldAjaxChange.Resource")]
[assembly: ScriptResource("CustomExtenders.FieldAjaxChange.FieldAjaxChangeBehavior.debug.js", "CustomExtenders.FieldAjaxChange.FieldAjaxChange", "CustomExtenders.FieldAjaxChange.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for FieldAjaxChangeExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(FieldAjaxChange))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.FieldAjaxChangeDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class FieldAjaxChangeExtender : ExtenderControlBase
    {
        public FieldAjaxChangeExtender()
        {
        }

        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.FieldAjaxChange", targetControl.ClientID);
            ScriptDescriptor[] descriptors;

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("ServiceUrl", this.ServiceUrl);
            descriptor.AddProperty("ServiceUrlCheckbox", this.ServiceUrlCheckbox);
            descriptor.AddProperty("FieldSelector", this.FieldSelector);
            descriptor.AddProperty("FieldFilterSelector", this.FieldFilterSelector);
            descriptor.AddProperty("FieldKeyupDelay", this.FieldKeyupDelay);
            descriptor.AddProperty("IsInitSelectableFields", this.IsInitSelectableFields);

            descriptors = new ScriptDescriptor[] { descriptor };

            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.FieldAjaxChange.FieldAjaxChangeBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrl
        {
            get { return GetPropertyValue<string>("ServiceUrl", ""); }
            set { SetPropertyValue<string>("ServiceUrl", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlCheckbox
        {
            get { return GetPropertyValue<string>("ServiceUrlCheckbox", ""); }
            set { SetPropertyValue<string>("ServiceUrlCheckbox", value); }
        }

        [ExtenderControlProperty]
        public string FieldSelector
        {
            get { return GetPropertyValue<string>("FieldSelector", ""); }
            set { SetPropertyValue<string>("FieldSelector", value); }
        }

        [ExtenderControlProperty]
        public string FieldFilterSelector
        {
            get { return GetPropertyValue<string>("FieldFilterSelector", ""); }
            set { SetPropertyValue<string>("FieldFilterSelector", value); }
        }

        [ExtenderControlProperty]
        public int FieldKeyupDelay
        {
            get { return GetPropertyValue<int>("FieldKeyupDelay", 1000); }
            set { SetPropertyValue<int>("FieldKeyupDelay", value); }
        }

        [ExtenderControlProperty]
        public bool IsInitSelectableFields
        {
            get { return GetPropertyValue<bool>("IsInitSelectableFields", true); }
            set { SetPropertyValue<bool>("IsInitSelectableFields", value); }
        }
        #endregion
    }
}