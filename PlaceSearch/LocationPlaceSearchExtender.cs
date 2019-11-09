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

[assembly: WebResource("CustomExtenders.PlaceSearch.images.ajax-loader.gif", "img/gif")]
[assembly: WebResource("CustomExtenders.PlaceSearch.images.transparent-16.jpg", "image/jpeg")]
[assembly: WebResource("CustomExtenders.PlaceSearch.images.ui-bg_highlight-soft_75_ffe45c_1x100.png", "img/png")]
[assembly: WebResource("CustomExtenders.PlaceSearch.Location.css", "text/css", PerformSubstitution = true)]

[assembly: WebResource("CustomExtenders.PlaceSearch.LocationPlaceSearchBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.PlaceSearch.LocationPlaceSearchBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.PlaceSearch.LocationPlaceSearchBehavior.js", "CustomExtenders.PlaceSearch.PlaceSearch", "CustomExtenders.PlaceSearch.Resource")]
[assembly: ScriptResource("CustomExtenders.PlaceSearch.LocationPlaceSearchBehavior.debug.js", "CustomExtenders.PlaceSearch.PlaceSearch", "CustomExtenders.PlaceSearch.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for LocationPlaceSearchExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(CommonToolkitScripts))]
    [RequiredScript(typeof(CustomCommonScripts))]
    [RequiredScript(typeof(ReservationDateTimeExtender))]
    [RequiredScript(typeof(LocationGMap))]
    [RequiredScript(typeof(HoverTooltip))]
    [ClientCssResource("CustomExtenders.CustomExtenders.css")]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.LocationPlaceSearchDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl)) ]
    public class LocationPlaceSearchExtender : ExtenderControlBase
    {
        public LocationPlaceSearchExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.LocationPlaceSearch", targetControl.ClientID);
            ScriptDescriptor[] descriptors;
            
            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("AccountTypeControlID", this.AccountTypeControlID);
            descriptor.AddProperty("DataType", this.DataType);
            descriptor.AddProperty("DetailsControlID", this.DetailsControlID);
            descriptor.AddProperty("DetailsPanelControlID", this.DetailsPanelControlID);
            descriptor.AddProperty("DetailsSubmitControlID", this.DetailsSubmitControlID);
            descriptor.AddProperty("IsNotifyEnabled", this.IsNotifyEnabled);
            descriptor.AddProperty("IsLocationFromList", this.IsLocationFromList);
            descriptor.AddProperty("LocationIconControlID", this.LocationIconControlID);
            descriptor.AddProperty("ProfileIDControlID", this.ProfileIDControlID);
            descriptor.AddProperty("ResultControlID", this.ResultControlID);
            descriptor.AddProperty("LocationResultControlID", this.LocationResultControlID);
            descriptor.AddProperty("ServiceUrl", this.ServiceUrl);
            descriptor.AddProperty("ServiceUrlData", this.ServiceUrlData);
            descriptor.AddProperty("ServiceUrlPlaceSearch", this.ServiceUrlPlaceSearch);
            descriptor.AddProperty("ServiceUrlSaveData", this.ServiceUrlSaveData);
            descriptor.AddProperty("ServiceUrlSaveDistance", this.ServiceUrlSaveDistance);
            descriptor.AddProperty("LocationDataJSON", this.LocationDataJSON);
            descriptor.AddProperty("TransparentImageUrl", this.TransparentImageUrl);

            descriptors = new ScriptDescriptor[] { descriptor };
            
            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.PlaceSearch.LocationPlaceSearchBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        [DefaultValue("")]
        [IDReferenceProperty]
        public string LocationIconControlID
        {
            get { return GetPropertyValue<string>("LocationIconControlID", ""); }
            set { SetPropertyValue<string>("LocationIconControlID", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [IDReferenceProperty]
        public string DetailsControlID
        {
            get { return GetPropertyValue<string>("DetailsControlID", ""); }
            set { SetPropertyValue<string>("DetailsControlID", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [IDReferenceProperty]
        public string DetailsPanelControlID
        {
            get { return GetPropertyValue<string>("DetailsPanelControlID", ""); }
            set { SetPropertyValue<string>("DetailsPanelControlID", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [IDReferenceProperty]
        public string DetailsSubmitControlID
        {
            get { return GetPropertyValue<string>("DetailsSubmitControlID", ""); }
            set { SetPropertyValue<string>("DetailsSubmitControlID", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [IDReferenceProperty]
        public string ResultControlID
        {
            get { return GetPropertyValue<string>("ResultControlID", ""); }
            set { SetPropertyValue<string>("ResultControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string LocationResultControlID
        {
            get { return GetPropertyValue<string>("LocationResultControlID", ""); }
            set { SetPropertyValue<string>("LocationResultControlID", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [IDReferenceProperty]
        public string AccountTypeControlID
        {
            get { return GetPropertyValue<string>("AccountTypeControlID", ""); }
            set { SetPropertyValue<string>("AccountTypeControlID", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [IDReferenceProperty]
        public string ProfileIDControlID
        {
            get { return GetPropertyValue<string>("ProfileIDControlID", ""); }
            set { SetPropertyValue<string>("ProfileIDControlID", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [UrlProperty]
        public string ServiceUrl
        {
            get { return GetPropertyValue<string>("ServiceUrl", ""); }
            set { SetPropertyValue<string>("ServiceUrl", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [UrlProperty]
        public string ServiceUrlPlaceSearch
        {
            get { return GetPropertyValue<string>("ServiceUrlPlaceSearch", ""); }
            set { SetPropertyValue<string>("ServiceUrlPlaceSearch", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [UrlProperty]
        public string ServiceUrlSaveData
        {
            get { return GetPropertyValue<string>("ServiceUrlSaveData", ""); }
            set { SetPropertyValue<string>("ServiceUrlSaveData", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue("")]
        [UrlProperty]
        public string ServiceUrlData
        {
            get { return GetPropertyValue<string>("ServiceUrlData", ""); }
            set { SetPropertyValue<string>("ServiceUrlData", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlSaveDistance
        {
            get { return GetPropertyValue<string>("ServiceUrlSaveDistance", ""); }
            set { SetPropertyValue<string>("ServiceUrlSaveDistance", value); }
        }

        [ExtenderControlProperty]
        public bool IsNotifyEnabled
        {
            get { return GetPropertyValue<bool>("IsNotifyEnabled", false); }
            set { SetPropertyValue<bool>("IsNotifyEnabled", value); }
        }

        [ExtenderControlProperty]
        public bool IsLocationFromList
        {
            get { return GetPropertyValue<bool>("IsLocationFromList", false); }
            set { SetPropertyValue<bool>("IsLocationFromList", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue(LocationDataType.Waypoint)]
        public LocationDataType DataType
        {
            get { return GetPropertyValue<LocationDataType>("DataType", LocationDataType.Waypoint); }
            set { SetPropertyValue<LocationDataType>("DataType", value); }
        }

        [ExtenderControlProperty]
        public string LocationDataJSON
        {
            get { return GetPropertyValue<string>("LocationDataJSON", ""); }
            set { SetPropertyValue<string>("LocationDataJSON", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string TransparentImageUrl
        {
            get { return GetPropertyValue<string>("TransparentImageUrl", ""); }
            set { SetPropertyValue<string>("TransparentImageUrl", value); }
        }
        #endregion
    }
}