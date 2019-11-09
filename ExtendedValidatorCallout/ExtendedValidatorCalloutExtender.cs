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

[assembly: WebResource("CustomExtenders.ExtendedValidatorCallout.ExtendedValidatorCalloutBehavior.js", "application/x-javascript")]
[assembly: WebResource("CustomExtenders.ExtendedValidatorCallout.ExtendedValidatorCalloutBehavior.debug.js", "application/x-javascript")]
[assembly: ScriptResource("CustomExtenders.ExtendedValidatorCallout.ExtendedValidatorCalloutBehavior.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ExtendedValidatorCallout.Resource")]
[assembly: ScriptResource("CustomExtenders.ExtendedValidatorCallout.ExtendedValidatorCalloutBehavior.debug.js", "CustomExtenders.ClientBehaviors", "CustomExtenders.ExtendedValidatorCallout.Resource")]

namespace CSP.inc.cs.CustomExtenders
{
    /// <summary>
    /// Summary description for ExtendedValidatorCalloutExtender
    /// </summary>
    /// 

    [ToolboxItem(false)]
    [Designer("CSP.inc.cs.CustomExtenders.ExtendedValidatorCalloutDesigner, AjaxControlToolkit")]
    [TargetControlType(typeof(IValidator))]
    public class ExtendedValidatorCalloutExtender : ValidatorCalloutExtender
    {
        public ExtendedValidatorCalloutExtender()
        {
        }


        protected override IEnumerable<ScriptDescriptor>
                GetScriptDescriptors(System.Web.UI.Control targetControl)
        {
            IEnumerable<ScriptDescriptor> basedescriptor = base.GetScriptDescriptors(targetControl);

            foreach (ScriptBehaviorDescriptor d in basedescriptor)
            {
                if (d.Type == "Sys.Extended.UI.ValidatorCalloutBehavior")
                {
                    d.Type = "Sys.Extended.UI.ExtendedValidatorCallout";

                    //d.AddProperty("ExtraCellCSS", this.ExtraCellCSS);
                }
            }

            return basedescriptor;
        }

        protected override IEnumerable<ScriptReference>
                GetScriptReferences()
        {
            IEnumerable<ScriptReference> basescripts = base.GetScriptReferences();
            ScriptReference[] scripts = new ScriptReference[] 
            { 
                 new ScriptReference("CustomExtenders.ExtendedValidatorCallout.ExtendedValidatorCalloutBehavior.js", this.GetType().Assembly.FullName)
            };
            return basescripts.Union(scripts);
        }
    }
}