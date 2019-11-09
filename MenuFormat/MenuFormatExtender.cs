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

[assembly: WebResource("CustomExtenders.MenuFormat.MenuFormat.css", "text/css", PerformSubstitution = true)]
[assembly: WebResource("CustomExtenders.MenuFormat.images.menuitem_out_3d499f.png", "img/png")]
[assembly: WebResource("CustomExtenders.MenuFormat.images.menuitem_out_85bbf9.png", "img/png")]
[assembly: WebResource("CustomExtenders.MenuFormat.images.menuitem_out_8591eb.png", "img/png")]
[assembly: WebResource("CustomExtenders.MenuFormat.MenuFormatBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.MenuFormat.MenuFormatBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.MenuFormat.MenuFormatBehavior.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.MenuFormat.Resource")]
[assembly: ScriptResource("CustomExtenders.MenuFormat.MenuFormatBehavior.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.MenuFormat.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for MenuFormatExtender
    /// </summary>
    /// 

    [RequiredScript(typeof(CustomCommonScripts))]
    [RequiredScript(typeof(TimerScript))]
    //[ClientCssResource("CustomExtenders.MenuFormat.MenuFormat.css")]
    [ClientCssResource("CustomExtenders.CustomExtenders.css")]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.MenuFormatDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(Menu))]
    public class MenuFormatExtender : ExtenderControlBase
    {
        public MenuFormatExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.MenuFormat", targetControl.ClientID);

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("ExtraCellCSS", this.ExtraCellCSS);
            descriptor.AddProperty("MenuWidth", this.MenuWidth);
            descriptor.AddProperty("MenuOutWidth", this.MenuOutWidth);
            descriptor.AddProperty("zIndex", this.zIndex);
            descriptor.AddProperty("SelectedColor", this.SelectedColor);
            descriptor.AddProperty("SelectedBackGroundColor", this.SelectedBackGroundColor);
            descriptor.AddProperty("HoveredColor", this.HoveredColor);
            descriptor.AddProperty("HoveredBackGroundColor", this.HoveredBackGroundColor);
            descriptor.AddProperty("MenuContainerControlID", this.MenuContainerControlID);
            descriptor.AddProperty("ContentPanelControlID", this.ContentPanelControlID);
            descriptor.AddProperty("MenuCSS", this.MenuCSS);
            descriptor.AddProperty("ContentCSS", this.ContentCSS);
            descriptor.AddProperty("IsContentPaddingEnabled", this.IsContentPaddingEnabled);
            descriptor.AddProperty("IsMenuURLBased", this.IsMenuURLBased);
            descriptor.AddProperty("MenuItemClientFunction", this.MenuItemClientFunction);
            descriptor.AddProperty("IsDisableValidatorsBeforeNavigate", this.IsDisableValidatorsBeforeNavigate);

            return new ScriptDescriptor[] { descriptor };
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.MenuFormat.MenuFormatBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        [ExtenderControlProperty]
        public string MenuItemClientFunction
        {
            get { return GetPropertyValue<string>("MenuItemClientFunction", ""); }
            set { SetPropertyValue<string>("MenuItemClientFunction", value); }
        }

        [ExtenderControlProperty]
        public string ExtraCellCSS
        {
            get { return GetPropertyValue<string>("ExtraCellCSS", "menuitemout_bg"); }
            set { SetPropertyValue<string>("ExtraCellCSS", value); }
        }

        [ExtenderControlProperty]
        public string MenuCSS
        {
            get { return GetPropertyValue<string>("MenuCSS", "cspbookmenu"); }
            set { SetPropertyValue<string>("MenuCSS", value); }
        }

        [ExtenderControlProperty]
        public string ContentCSS
        {
            get { return GetPropertyValue<string>("ContentCSS", "cspbookcontent"); }
            set { SetPropertyValue<string>("ContentCSS", value); }
        }

        [ExtenderControlProperty]
        public bool IsContentPaddingEnabled
        {
            get { return GetPropertyValue<bool>("IsContentPaddingEnabled", true); }
            set { SetPropertyValue<bool>("IsContentPaddingEnabled", value); }
        }

        [ExtenderControlProperty]
        public bool IsMenuURLBased
        {
            get { return GetPropertyValue<bool>("IsMenuURLBased", false); }
            set { SetPropertyValue<bool>("IsMenuURLBased", value); }
        }

        [ExtenderControlProperty]
        public bool IsDisableValidatorsBeforeNavigate
        {
            get { return GetPropertyValue<bool>("IsDisableValidatorsBeforeNavigate", true); }
            set { SetPropertyValue<bool>("IsDisableValidatorsBeforeNavigate", value); }
        }

        [ExtenderControlProperty]
        public int MenuWidth
        {
            get { return GetPropertyValue<int>("MenuWidth", 215); }
            set { SetPropertyValue<int>("MenuWidth", value); }
        }

        [ExtenderControlProperty]
        public int MenuOutWidth
        {
            get { return GetPropertyValue<int>("MenuOutWidth", 12); }
            set { SetPropertyValue<int>("MenuOutWidth", value); }
        }

        [ExtenderControlProperty]
        public int zIndex
        {
            get { return GetPropertyValue<int>("zIndex", 3); }
            set { SetPropertyValue<int>("zIndex", value); }
        }

        [ExtenderControlProperty]
        public string SelectedColor
        {
            get { return GetPropertyValue<string>("SelectedColor", "#ffffff"); }
            set { SetPropertyValue<string>("SelectedColor", value); }
        }

        [ExtenderControlProperty]
        public string SelectedBackGroundColor
        {
            get { return GetPropertyValue<string>("SelectedBackGroundColor", "#85bbf9"); }
            set { SetPropertyValue<string>("SelectedBackGroundColor", value); }
        }

        [ExtenderControlProperty]
        public string HoveredColor
        {
            get { return GetPropertyValue<string>("HoveredColor", "#ffffff"); }
            set { SetPropertyValue<string>("HoveredColor", value); }
        }

        [ExtenderControlProperty]
        public string HoveredBackGroundColor
        {
            get { return GetPropertyValue<string>("HoveredBackGroundColor", "#85bbf9"); }
            set { SetPropertyValue<string>("HoveredBackGroundColor", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string MenuContainerControlID
        {
            get { return GetPropertyValue<string>("MenuContainerControlID", ""); }
            set { SetPropertyValue<string>("MenuContainerControlID", value); }
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string ContentPanelControlID
        {
            get { return GetPropertyValue<string>("ContentPanelControlID", ""); }
            set { SetPropertyValue<string>("ContentPanelControlID", value); }
        }
    }
}