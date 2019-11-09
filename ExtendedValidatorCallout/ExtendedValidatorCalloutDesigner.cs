using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using AjaxControlToolkit.Design;

namespace CSP.inc.cs.CustomExtenders
{
    [TargetControlType(typeof(IValidator))]
    class ExtendedValidatorCalloutDesigner : ExtenderControlBaseDesigner<ExtendedValidatorCalloutExtender>
    {
    }
}