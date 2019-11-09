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

[assembly: WebResource("CustomExtenders.PlaceSearch.LocationAirportBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.PlaceSearch.LocationAirportBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.PlaceSearch.LocationAirportBehavior.js", "CustomExtenders.PlaceSearch.PlaceSearchAirport", "CustomExtenders.PlaceSearchAirport.Resource")]
[assembly: ScriptResource("CustomExtenders.PlaceSearch.LocationAirportBehavior.debug.js", "CustomExtenders.PlaceSearch.PlaceSearchAirport", "CustomExtenders.PlaceSearchAirport.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for LocationPlaceSearchExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(CommonToolkitScripts))]
    [RequiredScript(typeof(CustomCommonScripts))]
    [RequiredScript(typeof(ValidationScripts))]
    [RequiredScript(typeof(ReservationDateTimeExtender))]
    [RequiredScript(typeof(HoverTooltip))]
    [RequiredScript(typeof(FieldAjaxChange))]
    [ClientCssResource("CustomExtenders.CustomExtenders.css")]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.LocationAirportDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class LocationAirportExtender : ExtenderControlBase
    {
        public LocationAirportExtender()
        {
        }

        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.LocationAirport", targetControl.ClientID);
            ScriptDescriptor[] descriptors;

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("DataType", this.DataType);
            descriptor.AddProperty("isNotifyEnabled", this.IsNotifyEnabled);
            descriptor.AddProperty("LoadingProgressControlID", this.LoadingProgressControlID);
            descriptor.AddProperty("FlightListControlID", this.FlightListControlID);
            descriptor.AddProperty("AirlineFieldControlID", this.AirlineFieldControlID);
            descriptor.AddProperty("AirportOrigControlID", this.AirportOrigControlID);
            descriptor.AddProperty("LoadingCSS", this.LoadingCSS);
            descriptor.AddProperty("SearchControlID", this.SearchControlID);
            descriptor.AddProperty("ClearPanelControlID", this.ClearPanelControlID);
            descriptor.AddProperty("GMapControlID", this.GMapControlID);
            descriptor.AddProperty("PrimaryPanelSelector", this.PrimaryPanelSelector);
            descriptor.AddProperty("SearchValidationGroup", this.SearchValidationGroup);
            descriptor.AddProperty("MessageValidationError", this.MessageValidationError);
            descriptor.AddProperty("MessageDateTimeInfo", this.MessageDateTimeInfo);
            descriptor.AddProperty("ServiceUrlAirlines", this.ServiceUrlAirlines);
            descriptor.AddProperty("ServiceUrlAirports", this.ServiceUrlAirports);
            descriptor.AddProperty("ServiceUrlData", this.ServiceUrlData);
            descriptor.AddProperty("ServiceUrlHistory", this.ServiceUrlHistory);
            descriptor.AddProperty("ServiceUrlFlightInfo", this.ServiceUrlFlightInfo);
            descriptor.AddProperty("IATA", this.IATA);
            descriptor.AddProperty("IATAorig", this.IATAorig);
            descriptor.AddProperty("AirportNameOrig", this.AirportNameOrig);
            descriptor.AddProperty("AirportCity", this.AirportCity);
            descriptor.AddProperty("AirlineName", this.AirlineName);
            descriptor.AddProperty("AirlineCode", this.AirlineCode);
            descriptor.AddProperty("IsContinueNextStep", this.IsContinueNextStep);
            descriptor.AddProperty("isAirlineResultVisible", this.IsAirlineResultVisible);
            descriptor.AddProperty("SelectorFlightInfo", this.SelectorFlightInfo);
            descriptor.AddProperty("SelectorDateTimeField", this.SelectorDateTimeField);
            descriptor.AddProperty("ShowErrorClientFunction", this.ShowErrorClientFunction);
            descriptor.AddProperty("ShowInfoClientFunction", this.ShowInfoClientFunction);
            descriptor.AddProperty("ContinueClientFunction", this.ContinueClientFunction);
            descriptor.AddProperty("AirlineInfoImageUrl", this.AirlineInfoImageUrl);
            descriptor.AddProperty("TooltipInfo", this.TooltipInfo);
            descriptor.AddProperty("MessageFlightListError", this.MessageFlightListError);

            descriptors = new ScriptDescriptor[] { descriptor };    

            return descriptors;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.PlaceSearch.LocationAirportBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        public bool IsNotifyEnabled
        {
            get { return GetPropertyValue<bool>("IsNotifyEnabled", false); }
            set { SetPropertyValue<bool>("IsNotifyEnabled", value); }
        }

        [ExtenderControlProperty]
        [DefaultValue(LocationDataType.Waypoint)]
        public LocationDataType DataType
        {
            get { return GetPropertyValue<LocationDataType>("DataType", LocationDataType.Waypoint); }
            set { SetPropertyValue<LocationDataType>("DataType", value); }
        }
        
        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlAirports
        {
            get { return GetPropertyValue<string>("ServiceUrlAirports", ""); }
            set { SetPropertyValue<string>("ServiceUrlAirports", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlHistory
        {
            get { return GetPropertyValue<string>("ServiceUrlHistory", ""); }
            set { SetPropertyValue<string>("ServiceUrlHistory", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlFlightInfo
        {
            get { return GetPropertyValue<string>("ServiceUrlFlightInfo", ""); }
            set { SetPropertyValue<string>("ServiceUrlFlightInfo", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlAirlines
        {
            get { return GetPropertyValue<string>("ServiceUrlAirlines", ""); }
            set { SetPropertyValue<string>("ServiceUrlAirlines", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlData
        {
            get { return GetPropertyValue<string>("ServiceUrlData", ""); }
            set { SetPropertyValue<string>("ServiceUrlData", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string FlightListControlID
        {
            get { return GetPropertyValue<string>("FlightListControlID", ""); }
            set { SetPropertyValue<string>("FlightListControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string AirlineFieldControlID
        {
            get { return GetPropertyValue<string>("AirlineFieldControlID", ""); }
            set { SetPropertyValue<string>("AirlineFieldControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string AirportOrigControlID
        {
            get { return GetPropertyValue<string>("AirportOrigControlID", ""); }
            set { SetPropertyValue<string>("AirportOrigControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string SearchControlID
        {
            get { return GetPropertyValue<string>("SearchControlID", ""); }
            set { SetPropertyValue<string>("SearchControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string ClearPanelControlID
        {
            get { return GetPropertyValue<string>("ClearPanelControlID", ""); }
            set { SetPropertyValue<string>("ClearPanelControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string GMapControlID
        {
            get { return GetPropertyValue<string>("GMapControlID", ""); }
            set { SetPropertyValue<string>("GMapControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string PrimaryPanelSelector
        {
            get { return GetPropertyValue<string>("PrimaryPanelSelector", ""); }
            set { SetPropertyValue<string>("PrimaryPanelSelector", value); }
        }

        [ExtenderControlProperty]
        public string SearchValidationGroup
        {
            get { return GetPropertyValue<string>("SearchValidationGroup", ""); }
            set { SetPropertyValue<string>("SearchValidationGroup", value); }
        }

        [ExtenderControlProperty]
        public string MessageValidationError
        {
            get { return GetPropertyValue<string>("MessageValidationError", ""); }
            set { SetPropertyValue<string>("MessageValidationError", value); }
        }

        [ExtenderControlProperty]
        public string MessageDateTimeInfo
        {
            get { return GetPropertyValue<string>("MessageDateTimeInfo", ""); }
            set { SetPropertyValue<string>("MessageDateTimeInfo", value); }
        }

        [ExtenderControlProperty]
        public string ShowErrorClientFunction
        {
            get { return GetPropertyValue<string>("ShowErrorClientFunction", ""); }
            set { SetPropertyValue<string>("ShowErrorClientFunction", value); }
        }

        [ExtenderControlProperty]
        public string ShowInfoClientFunction
        {
            get { return GetPropertyValue<string>("ShowInfoClientFunction", ""); }
            set { SetPropertyValue<string>("ShowInfoClientFunction", value); }
        }

        [ExtenderControlProperty]
        public string ContinueClientFunction
        {
            get { return GetPropertyValue<string>("ContinueClientFunction", ""); }
            set { SetPropertyValue<string>("ContinueClientFunction", value); }
        }

        [IDReferenceProperty]
        [ExtenderControlProperty]
        public string LoadingProgressControlID
        {
            get { return GetPropertyValue<string>("LoadingProgressControlID", ""); }
            set { SetPropertyValue<string>("LoadingProgressControlID", value); }
        }

        [ExtenderControlProperty]
        public string LoadingCSS
        {
            get { return GetPropertyValue<string>("LoadingCSS", ""); }
            set { SetPropertyValue<string>("LoadingCSS", value); }
        }

        [ExtenderControlProperty]
        public string IATA
        {
            get { return GetPropertyValue<string>("IATA", ""); }
            set { SetPropertyValue<string>("IATA", value); }
        }

        [ExtenderControlProperty]
        public string IATAorig
        {
            get { return GetPropertyValue<string>("IATAorig", ""); }
            set { SetPropertyValue<string>("IATAorig", value); }
        }

        [ExtenderControlProperty]
        public string AirportNameOrig
        {
            get { return GetPropertyValue<string>("AirportNameOrig", ""); }
            set { SetPropertyValue<string>("AirportNameOrig", value); }
        }

        [ExtenderControlProperty]
        public string AirportCity
        {
            get { return GetPropertyValue<string>("AirportCity", ""); }
            set { SetPropertyValue<string>("AirportCity", value); }
        }

        [ExtenderControlProperty]
        public string AirlineCode
        {
            get { return GetPropertyValue<string>("AirlineCode", ""); }
            set { SetPropertyValue<string>("AirlineCode", value); }
        }

        [ExtenderControlProperty]
        public string AirlineName
        {
            get { return GetPropertyValue<string>("AirlineName", ""); }
            set { SetPropertyValue<string>("AirlineName", value); }
        }

        [ExtenderControlProperty]
        public bool IsContinueNextStep
        {
            get { return GetPropertyValue<bool>("IsContinueNextStep", true); }
            set { SetPropertyValue<bool>("IsContinueNextStep", value); }
        }

        [ExtenderControlProperty]
        public bool IsAirlineResultVisible
        {
            get { return GetPropertyValue<bool>("IsAirlineResultVisible", false); }
            set { SetPropertyValue<bool>("IsAirlineResultVisible", value); }
        }

        [ExtenderControlProperty]
        public string SelectorFlightInfo
        {
            get { return GetPropertyValue<string>("SelectorFlightInfo", ""); }
            set { SetPropertyValue<string>("SelectorFlightInfo", value); }
        }

        [ExtenderControlProperty]
        public string SelectorDateTimeField
        {
            get { return GetPropertyValue<string>("SelectorDateTimeField", ""); }
            set { SetPropertyValue<string>("SelectorDateTimeField", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string AirlineInfoImageUrl
        {
            get { return GetPropertyValue<string>("AirlineInfoImageUrl", ""); }
            set { SetPropertyValue<string>("AirlineInfoImageUrl", value); }
        }

        [ExtenderControlProperty]
        public string TooltipInfo
        {
            get { return GetPropertyValue<string>("TooltipInfo", ""); }
            set { SetPropertyValue<string>("TooltipInfo", value); }
        }

        [ExtenderControlProperty]
        public string MessageFlightListError
        {
            get { return GetPropertyValue<string>("MessageFlightListError", ""); }
            set { SetPropertyValue<string>("MessageFlightListError", value); }
        }
        #endregion
    }
}