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

[assembly: WebResource("CustomExtenders.StepValidator.StepValidatorBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.StepValidator.StepValidatorBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.StepValidator.StepValidatorBehavior.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.StepValidator.Resource")]
[assembly: ScriptResource("CustomExtenders.StepValidator.StepValidatorBehavior.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.StepValidator.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for StepValidatorExtender
    /// </summary>
    /// 

    [RequiredScript(typeof(CustomCommonScripts))]
    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.StepValidatorDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(WebControl))]
    public class StepValidatorExtender : ExtenderControlBase
    {
        public StepValidatorExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            ScriptBehaviorDescriptor descriptor = new ScriptBehaviorDescriptor("Sys.Extended.UI.StepValidator", targetControl.ClientID);

            if (!String.IsNullOrEmpty(this.ID)) descriptor.AddProperty("id", this.ID);
            descriptor.AddProperty("NextButtonControlID", this.NextButtonControlID);

            return new ScriptDescriptor[] { descriptor };
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.StepValidator.StepValidatorBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }

        [ExtenderControlProperty]
        [IDReferenceProperty]
        public string NextButtonControlID
        {
            get { return GetPropertyValue<string>("NextButtonControlID", ""); }
            set { SetPropertyValue<string>("NextButtonControlID", value); }
        }
    }
}
