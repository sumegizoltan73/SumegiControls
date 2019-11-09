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

[assembly: WebResource("CustomExtenders.ReservationDateTime.ReservationDateTimeBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.ReservationDateTime.ReservationDateTimeBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.ReservationDateTime.ReservationDateTimeBehavior.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ReservationDateTime.Resource")]
[assembly: ScriptResource("CustomExtenders.ReservationDateTime.ReservationDateTimeBehavior.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ReservationDateTime.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for ReservationDateTimeExtender
    /// </summary>
    /// 

    [RequiredScript(typeof(CustomCommonScripts))]
    [RequiredScript(typeof(ValidationScripts))]
    [RequiredScript(typeof(DateField))]
    [RequiredScript(typeof(TimeField))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.ReservationDateTimeDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class ReservationDateTimeExtender : ExtenderControlBase
    {
        public ReservationDateTimeExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.ReservationDateTime", targetControl.ClientID);

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("DataType", this.DataType);
            descriptor.AddProperty("DateFieldControlID", this.DateFieldControlID);
            descriptor.AddProperty("TimeFieldControlID", this.TimeFieldControlID);
            descriptor.AddProperty("DateFieldValue", this.DateFieldValue);
            descriptor.AddProperty("TimeFieldValue", this.TimeFieldValue);
            descriptor.AddProperty("ServiceUrlSaveDate", this.ServiceUrlSaveDate);
            descriptor.AddProperty("ServiceUrlSaveTime", this.ServiceUrlSaveTime);
            descriptor.AddProperty("ImageUrl", this.ImageUrl);
            descriptor.AddProperty("ImageCSS", this.ImageCSS);
            descriptor.AddProperty("MinDate", this.MinDate);
            descriptor.AddProperty("DateFieldOptionsJSON", this.DateFieldOptionsJSON);
            descriptor.AddProperty("TimeFieldOptionsJSON", this.TimeFieldOptionsJSON);

            return new ScriptDescriptor[] { descriptor };
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.ReservationDateTime.ReservationDateTimeBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        [ExtenderControlProperty]
        [DefaultValue(LocationDataType.Pickup)]
        public LocationDataType DataType
        {
            get { return GetPropertyValue<LocationDataType>("DataType", LocationDataType.Pickup); }
            set { SetPropertyValue<LocationDataType>("DataType", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string DateFieldControlID
        {
            get { return GetPropertyValue<string>("DateFieldControlID", ""); }
            set { SetPropertyValue<string>("DateFieldControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string TimeFieldControlID
        {
            get { return GetPropertyValue<string>("TimeFieldControlID", ""); }
            set { SetPropertyValue<string>("TimeFieldControlID", value); }
        }

        [ExtenderControlProperty]
        public string DateFieldValue
        {
            get { return GetPropertyValue<string>("DateFieldValue", ""); }
            set { SetPropertyValue<string>("DateFieldValue", value); }
        }

        [ExtenderControlProperty]
        public string TimeFieldValue
        {
            get { return GetPropertyValue<string>("TimeFieldValue", ""); }
            set { SetPropertyValue<string>("TimeFieldValue", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlSaveTime
        {
            get { return GetPropertyValue<string>("ServiceUrlSaveTime", ""); }
            set { SetPropertyValue<string>("ServiceUrlSaveTime", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ServiceUrlSaveDate
        {
            get { return GetPropertyValue<string>("ServiceUrlSaveDate", ""); }
            set { SetPropertyValue<string>("ServiceUrlSaveDate", value); }
        }

        [ExtenderControlProperty]
        [UrlProperty]
        public string ImageUrl
        {
            get { return GetPropertyValue<string>("ImageUrl", ""); }
            set { SetPropertyValue<string>("ImageUrl", value); }
        }

        [ExtenderControlProperty]
        public string ImageCSS
        {
            get { return GetPropertyValue<string>("ImageCSS", ""); }
            set { SetPropertyValue<string>("ImageCSS", value); }
        }

        [ExtenderControlProperty]
        public string MinDate
        {
            get { return GetPropertyValue<string>("MinDate", "0"); }
            set { SetPropertyValue<string>("MinDate", value); }
        }

        [ExtenderControlProperty]
        public string DateFieldOptionsJSON
        {
            get { return GetPropertyValue<string>("DateFieldOptionsJSON", ""); }
            set { SetPropertyValue<string>("DateFieldOptionsJSON", value); }
        }

        [ExtenderControlProperty]
        public string TimeFieldOptionsJSON
        {
            get { return GetPropertyValue<string>("TimeFieldOptionsJSON", ""); }
            set { SetPropertyValue<string>("TimeFieldOptionsJSON", value); }
        }
    }
}
