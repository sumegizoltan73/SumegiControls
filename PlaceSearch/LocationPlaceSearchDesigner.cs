using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using AjaxControlToolkit.Design;

namespace CSP.inc.cs.CustomExtenders
{
    [TargetControlType(typeof(WebControl))]
    class LocationPlaceSearchDesigner : ExtenderControlBaseDesigner<LocationPlaceSearchExtender>
    {
        /// <summary>
        /// Signature of the page method for DynamicPopulateExtenderControlBase's web
        /// service that is used to support adding/navigating to the page method from
        /// the designer
        /// </summary>
        /// <param name="contextKey">User specific context</param>
        /// <returns>Dynamically generated content</returns>
        //[PageMethodSignature("Dynamic Populate", "DynamicServicePath", "DynamicServiceMethod")]
        //private delegate string GetDynamicContent(string contextKey);

    }
}
