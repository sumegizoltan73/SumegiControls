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

[assembly: WebResource("CustomExtenders.GMap.images.ajax-loader-indicator.gif", "img/gif")]
[assembly: WebResource("CustomExtenders.GMap.GMapCommonBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.GMap.GMapCommonBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.GMap.GMapCommonBehavior.js", "CustomExtenders.GMap.GMapCommon", "CustomExtenders.GMapCommon.Resource")]
[assembly: ScriptResource("CustomExtenders.GMap.GMapCommonBehavior.debug.js", "CustomExtenders.GMap.GMapCommon", "CustomExtenders.GMapCommon.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for GMapCommonExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(CustomCommonScripts))]
    [RequiredScript(typeof(LocationGMap))]
    [RequiredScript(typeof(CollapsibleExtender))]
    [RequiredScript(typeof(LocationPlaceSearchExtender))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.GMapCommonDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class GMapCommonExtender : ExtenderControlBase
    {
        public GMapCommonExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.GMapCommon", targetControl.ClientID);
            ScriptDescriptor[] descriptors;

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("GMapContentControlID", this.GMapContentControlID);
            descriptor.AddProperty("GMapContainerControlID", this.GMapContainerControlID);
            descriptor.AddProperty("CollapsibleControlID", this.CollapsibleControlID);
            descriptor.AddProperty("LoadingCSS", this.LoadingCSS);
            descriptor.AddProperty("ProgressCSS", this.ProgressCSS);
            descriptor.AddProperty("SetContentTimeout", this.SetContentTimeout);
            descriptor.AddProperty("ImageLoadingTimeout", this.ImageLoadingTimeout);
            descriptor.AddProperty("InitStateSelector", this.InitStateSelector);
            descriptor.AddProperty("LoadingProgressControlID", this.LoadingProgressControlID);

            descriptors = new ScriptDescriptor[] { descriptor };

            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.GMap.GMapCommonBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        public string GMapContentControlID
        {
            get { return GetPropertyValue<string>("GMapContentControlID", ""); }
            set { SetPropertyValue<string>("GMapContentControlID", value); }
        }

        [ExtenderControlProperty]
        public string GMapContainerControlID
        {
            get { return GetPropertyValue<string>("GMapContainerControlID", ""); }
            set { SetPropertyValue<string>("GMapContainerControlID", value); }
        }

        [ExtenderControlProperty]
        public string CollapsibleControlID
        {
            get { return GetPropertyValue<string>("CollapsibleControlID", ""); }
            set { SetPropertyValue<string>("CollapsibleControlID", value); }
        }

        [ExtenderControlProperty]
        public string LoadingCSS
        {
            get { return GetPropertyValue<string>("LoadingCSS", "ui-gmap-loading"); }
            set { SetPropertyValue<string>("LoadingCSS", value); }
        }

        [ExtenderControlProperty]
        public string ProgressCSS
        {
            get { return GetPropertyValue<string>("ProgressCSS", "ui-gmap-progress"); }
            set { SetPropertyValue<string>("ProgressCSS", value); }
        }

        [ExtenderControlProperty]
        public string InitStateSelector
        {
            get { return GetPropertyValue<string>("InitStateSelector", ""); }
            set { SetPropertyValue<string>("InitStateSelector", value); }
        }

        [ExtenderControlProperty]
        public int SetContentTimeout
        {
            get { return GetPropertyValue<int>("SetContentTimeout", 1500); }
            set { SetPropertyValue<int>("SetContentTimeout", value); }
        }

        [ExtenderControlProperty]
        public int ImageLoadingTimeout
        {
            get { return GetPropertyValue<int>("ImageLoadingTimeout", 1500); }
            set { SetPropertyValue<int>("ImageLoadingTimeout", value); }
        }

        [IDReferenceProperty]
        [ExtenderControlProperty]
        public string LoadingProgressControlID
        {
            get { return GetPropertyValue<string>("LoadingProgressControlID", ""); }
            set { SetPropertyValue<string>("LoadingProgressControlID", value); }
        }
        #endregion
    }
}