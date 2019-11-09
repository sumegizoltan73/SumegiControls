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

[assembly: WebResource("CustomExtenders.ImageLoader.images.ajax-loader-indicator.gif", "img/gif")]
[assembly: WebResource("CustomExtenders.ImageLoader.ImageLoaderBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.ImageLoader.ImageLoaderBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.ImageLoader.ImageLoaderBehavior.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ImageLoader.Resource")]
[assembly: ScriptResource("CustomExtenders.ImageLoader.ImageLoaderBehavior.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ImageLoader.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for ImageLoaderExtender
    /// </summary>
    /// 
    [RequiredScript(typeof(CustomCommonScripts))]
    [RequiredScript(typeof(TimerScript))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.ImageLoaderDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class ImageLoaderExtender : ExtenderControlBase
    {
        public ImageLoaderExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.ImageLoader", targetControl.ClientID);

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("ImagesData", this.ImagesData);
            descriptor.AddProperty("ImagesInfo", this.ImagesInfo);
            descriptor.AddProperty("ImagesSelector", this.ImagesSelector);
            descriptor.AddProperty("GroupSelector", this.GroupSelector);
            descriptor.AddProperty("LoadingCSS", this.LoadingCSS);
            descriptor.AddProperty("LoadingProgressControlID", this.LoadingProgressControlID);

            return new ScriptDescriptor[] { descriptor };
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.ImageLoader.ImageLoaderBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        #region properties
        [ExtenderControlProperty]
        public string ImagesData
        {
            get { return GetPropertyValue<string>("ImagesData", "img.data"); }
            set { SetPropertyValue<string>("ImagesData", value); }
        }

        [ExtenderControlProperty]
        public string ImagesInfo
        {
            get { return GetPropertyValue<string>("ImagesInfo", "img.info"); }
            set { SetPropertyValue<string>("ImagesInfo", value); }
        }

        [ExtenderControlProperty]
        public string ImagesSelector
        {
            get { return GetPropertyValue<string>("ImagesSelector", "img.thumb"); }
            set { SetPropertyValue<string>("ImagesSelector", value); }
        }

        [ExtenderControlProperty]
        public string[] GroupSelector
        {
            get { return GetPropertyValue<string[]>("GroupSelector", null); }
            set { SetPropertyValue<string[]>("GroupSelector", value); }
        }

        [ExtenderControlProperty]
        public string LoadingCSS
        {
            get { return GetPropertyValue<string>("LoadingCSS", "ui-images-loading"); }
            set { SetPropertyValue<string>("LoadingCSS", value); }
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