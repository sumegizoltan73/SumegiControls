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

//waypoint
[assembly: WebResource("CustomExtenders.Collapsible.CollapsibleBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.Collapsible.CollapsibleBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.Collapsible.CollapsibleBehavior.js", "CustomExtenders.Collapsible.Collapsible", "CustomExtenders.Collapsible.Resource")]
[assembly: ScriptResource("CustomExtenders.Collapsible.CollapsibleBehavior.debug.js", "CustomExtenders.Collapsible.Collapsible", "CustomExtenders.Collapsible.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for CollapsibleExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(CustomCommonScripts))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.CollapsibleDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class CollapsibleExtender : ExtenderControlBase
    {
        public CollapsibleExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.Collapsible", targetControl.ClientID);
            ScriptDescriptor[] descriptors;

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("IsTriggerCollapseControlPostback", this.IsTriggerCollapseControlPostback);
            descriptor.AddProperty("IsInitCollapsed", this.IsInitCollapsed);
            descriptor.AddProperty("Collapsed", this.Collapsed);
            descriptor.AddProperty("CollapseControlID", this.CollapseControlID);
            descriptor.AddProperty("ImageControlID", this.ImageControlID);
            descriptor.AddProperty("TextLabelID", this.TextLabelID);
            descriptor.AddProperty("CollapsedText", this.CollapsedText);
            descriptor.AddProperty("ExpandedText", this.ExpandedText);
            descriptor.AddProperty("CollapsedImage", this.CollapsedImage);
            descriptor.AddProperty("ExpandedImage", this.ExpandedImage);

            descriptors = new ScriptDescriptor[] { descriptor };

            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.Collapsible.CollapsibleBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [IDReferenceProperty]
        [ExtenderControlProperty]
        public string CollapseControlID
        {
            get { return GetPropertyValue<string>("CollapseControlID", ""); }
            set { SetPropertyValue<string>("CollapseControlID", value); }
        }

        [IDReferenceProperty(typeof(System.Web.UI.WebControls.Image))]
        [ExtenderControlProperty]
        public string ImageControlID
        {
            get { return GetPropertyValue<string>("ImageControlID", ""); }
            set { SetPropertyValue<string>("ImageControlID", value); }
        }

        [IDReferenceProperty]
        [ExtenderControlProperty]
        public string TextLabelID
        {
            get { return GetPropertyValue<string>("TextLabelID", ""); }
            set { SetPropertyValue<string>("TextLabelID", value); }
        }

        [ExtenderControlProperty]
        public string CollapsedText
        {
            get { return GetPropertyValue<string>("CollapsedText", ""); }
            set { SetPropertyValue<string>("CollapsedText", value); }
        }

        [ExtenderControlProperty]
        public string ExpandedText
        {
            get { return GetPropertyValue<string>("ExpandedText", ""); }
            set { SetPropertyValue<string>("ExpandedText", value); }
        }

        [UrlProperty]
        [ExtenderControlProperty]
        public string CollapsedImage
        {
            get { return GetPropertyValue<string>("CollapsedImage", ""); }
            set { SetPropertyValue<string>("CollapsedImage", value); }
        }

        [UrlProperty]
        [ExtenderControlProperty]
        public string ExpandedImage
        {
            get { return GetPropertyValue<string>("ExpandedImage", ""); }
            set { SetPropertyValue<string>("ExpandedImage", value); }
        }

        [ExtenderControlProperty]
        public bool Collapsed
        {
            get { return GetPropertyValue<bool>("Collapsed", false); }
            set { SetPropertyValue<bool>("Collapsed", value); }
        }

        [ExtenderControlProperty]
        public bool IsTriggerCollapseControlPostback
        {
            get { return GetPropertyValue<bool>("IsTriggerCollapseControlPostback", false); }
            set { SetPropertyValue<bool>("IsTriggerCollapseControlPostback", value); }
        }

        [ExtenderControlProperty]
        public bool IsInitCollapsed
        {
            get { return GetPropertyValue<bool>("IsInitCollapsed", true); }
            set { SetPropertyValue<bool>("IsInitCollapsed", value); }
        }
        #endregion
    }
}