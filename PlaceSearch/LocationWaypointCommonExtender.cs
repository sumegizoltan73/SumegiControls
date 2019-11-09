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
[assembly: WebResource("CustomExtenders.PlaceSearch.LocationWaypointCommonBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.PlaceSearch.LocationWaypointCommonBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.PlaceSearch.LocationWaypointCommonBehavior.js", "CustomExtenders.PlaceSearch.PlaceSearchWaypointCommon", "CustomExtenders.PlaceSearchWaypointCommon.Resource")]
[assembly: ScriptResource("CustomExtenders.PlaceSearch.LocationWaypointCommonBehavior.debug.js", "CustomExtenders.PlaceSearch.PlaceSearchWaypointCommon", "CustomExtenders.PlaceSearchWaypointCommon.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for LocationWaypointCommonExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(LocationPlaceSearchExtender))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.LocationWaypointCommonDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class LocationWaypointCommonExtender : ExtenderControlBase
    {
        public LocationWaypointCommonExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.LocationWaypointCommon", targetControl.ClientID);
            ScriptDescriptor[] descriptors;

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("AddStopControlID", this.AddStopControlID);
            descriptor.AddProperty("ItemNextSiblingControlID", this.ItemNextSiblingControlID);
            descriptor.AddProperty("ServiceUrl", this.ServiceUrl);
            descriptor.AddProperty("ServiceUrlData", this.ServiceUrlData);
            descriptor.AddProperty("ServiceUrlPlaceSearch", this.ServiceUrlPlaceSearch);
            descriptor.AddProperty("ServiceUrlSaveData", this.ServiceUrlSaveData);
            descriptor.AddProperty("ServiceUrlSaveDistance", this.ServiceUrlSaveDistance);
            descriptor.AddProperty("ServiceUrlRemove", this.ServiceUrlRemove);
            descriptor.AddProperty("WaypointsJSON", this.WaypointsJSON);
            descriptor.AddProperty("RemoveStopCSS", this.RemoveStopCSS);
            descriptor.AddProperty("InputFieldCSS", this.InputFieldCSS);
            descriptor.AddProperty("IsTriggerClick", this.IsTriggerClick);

            descriptors = new ScriptDescriptor[] { descriptor };

            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                new ScriptReference("CustomExtenders.PlaceSearch.LocationPlaceSearchBehavior.js", this.GetType().Assembly.FullName),
                new ScriptReference("CustomExtenders.PlaceSearch.LocationWaypointCommonBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string AddStopControlID
        {
            get { return GetPropertyValue<string>("AddStopControlID", ""); }
            set { SetPropertyValue<string>("AddStopControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string ItemNextSiblingControlID
        {
            get { return GetPropertyValue<string>("ItemNextSiblingControlID", ""); }
            set { SetPropertyValue<string>("ItemNextSiblingControlID", value); }
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
        [UrlProperty]
        public string ServiceUrlRemove
        {
            get { return GetPropertyValue<string>("ServiceUrlRemove", ""); }
            set { SetPropertyValue<string>("ServiceUrlRemove", value); }
        }

        [ExtenderControlProperty]
        public string WaypointsJSON
        {
            get { return GetPropertyValue<string>("WaypointsJSON", ""); }
            set { SetPropertyValue<string>("WaypointsJSON", value); }
        }

        [ExtenderControlProperty]
        public string RemoveStopCSS
        {
            get { return GetPropertyValue<string>("RemoveStopCSS", ""); }
            set { SetPropertyValue<string>("RemoveStopCSS", value); }
        }

        [ExtenderControlProperty]
        public string InputFieldCSS
        {
            get { return GetPropertyValue<string>("InputFieldCSS", ""); }
            set { SetPropertyValue<string>("InputFieldCSS", value); }
        }

        [ExtenderControlProperty]
        public bool IsTriggerClick
        {
            get { return GetPropertyValue<bool>("IsTriggerClick", false); }
            set { SetPropertyValue<bool>("IsTriggerClick", value); }
        }
        #endregion
    }
}