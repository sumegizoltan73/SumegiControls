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

[assembly: WebResource("CustomExtenders.VehicleList.images.ajax-loader-indicator.gif", "img/gif")]
[assembly: WebResource("CustomExtenders.VehicleList.VehicleListBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.VehicleList.VehicleListBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.VehicleList.VehicleListBehavior.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.VehicleList.Resource")]
[assembly: ScriptResource("CustomExtenders.VehicleList.VehicleListBehavior.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.VehicleList.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for VehicleListExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(CustomCommonScripts))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.VehicleListDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class VehicleListExtender : ExtenderControlBase
    {
        public VehicleListExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.VehicleList", targetControl.ClientID);

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("ErrorText", this.ErrorText);
            descriptor.AddProperty("ServiceUrl", this.ServiceUrl);
            descriptor.AddProperty("BtnContinueSelector", this.BtnContinueSelector);
            descriptor.AddProperty("IsBtnNextEnabled", this.IsBtnNextEnabled);
            descriptor.AddProperty("ItemTableId", this.ItemTableId);
            descriptor.AddProperty("LoadingCSS", this.LoadingCSS);
            descriptor.AddProperty("SeparatorCSS", this.SeparatorCSS);
            descriptor.AddProperty("LoadingProgressControlID", this.LoadingProgressControlID);
            descriptor.AddProperty("IsErrorInHtmlDom", this.IsErrorInHtmlDom);
            descriptor.AddProperty("MaxVehicleCount", this.MaxVehicleCount);
            descriptor.AddProperty("MoreControlID", this.MoreControlID);
            descriptor.AddProperty("MoreContainerControlID", this.MoreContainerControlID);
            descriptor.AddProperty("MoreItemSelector", this.MoreItemSelector);

            return new ScriptDescriptor[] { descriptor };
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.VehicleList.VehicleListBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        public string ErrorText
        {
            get { return GetPropertyValue<string>("ErrorText", "Contact"); }
            set { SetPropertyValue<string>("ErrorText", value); }
        }

        [ExtenderControlProperty]
        public string BtnContinueSelector
        {
            get { return GetPropertyValue<string>("BtnContinueSelector", ""); }
            set { SetPropertyValue<string>("BtnContinueSelector", value); }
        }

        [ExtenderControlProperty]
        public bool IsBtnNextEnabled
        {
            get { return GetPropertyValue<bool>("IsBtnNextEnabled", false); }
            set { SetPropertyValue<bool>("IsBtnNextEnabled", value); }
        }

        [ExtenderControlProperty]
        public string ItemTableId
        {
            get { return GetPropertyValue<string>("ItemTableId", ""); }
            set { SetPropertyValue<string>("ItemTableId", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrl
        {
            get { return GetPropertyValue<string>("ServiceUrl", ""); }
            set { SetPropertyValue<string>("ServiceUrl", value); }
        }

        [ExtenderControlProperty]
        public string LoadingCSS
        {
            get { return GetPropertyValue<string>("LoadingCSS", "ui-vehicles-loading"); }
            set { SetPropertyValue<string>("LoadingCSS", value); }
        }

        [ExtenderControlProperty]
        public string SeparatorCSS
        {
            get { return GetPropertyValue<string>("SeparatorCSS", "separator"); }
            set { SetPropertyValue<string>("SeparatorCSS", value); }
        }

        [IDReferenceProperty]
        [ExtenderControlProperty]
        public string LoadingProgressControlID
        {
            get { return GetPropertyValue<string>("LoadingProgressControlID", ""); }
            set { SetPropertyValue<string>("LoadingProgressControlID", value); }
        }

        [ExtenderControlProperty]
        public bool IsErrorInHtmlDom
        {
            get { return GetPropertyValue<bool>("IsErrorInHtmlDom", false); }
            set { SetPropertyValue<bool>("IsErrorInHtmlDom", value); }
        }

        [ExtenderControlProperty]
        public int MaxVehicleCount
        {
            get { return GetPropertyValue<int>("MaxVehicleCount", 3); }
            set { SetPropertyValue<int>("MaxVehicleCount", value); }
        }

        [IDReferenceProperty]
        [ExtenderControlProperty]
        public string MoreControlID
        {
            get { return GetPropertyValue<string>("MoreControlID", ""); }
            set { SetPropertyValue<string>("MoreControlID", value); }
        }

        [IDReferenceProperty]
        [ExtenderControlProperty]
        public string MoreContainerControlID
        {
            get { return GetPropertyValue<string>("MoreContainerControlID", ""); }
            set { SetPropertyValue<string>("MoreContainerControlID", value); }
        }

        [ExtenderControlProperty]
        public string MoreItemSelector
        {
            get { return GetPropertyValue<string>("MoreItemSelector", ""); }
            set { SetPropertyValue<string>("MoreItemSelector", value); }
        }
        #endregion
    }
}
