﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.239
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CSP.inc.cs.CustomExtenders.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Resources_Common {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources_Common() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("CSP.inc.cs.CustomExtenders.Properties.Resources.Common", typeof(Resources_Common).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to /// &lt;reference name=&quot;MicrosoftAjax.js&quot;/&gt;
        ///
        ///(function () {
        ///    Type.registerNamespace(&quot;Sys&quot;);
        ///    Type.registerNamespace(&quot;Sys.Extended&quot;);
        ///    Type.registerNamespace(&quot;Sys.Extended.UI&quot;);
        ///
        ///    Sys.Extended.UI.LocationDataType = function () { throw Error.invalidOperation(); }
        ///    Sys.Extended.UI.LocationDataType.prototype = {
        ///        Pickup: 0,
        ///        Dropoff: 1,
        ///        Waypoint: 2
        ///    }
        ///    Sys.Extended.UI.LocationDataType.registerEnum(&quot;Sys.Extended.UI.LocationDataType&quot;, false);
        ///
        ///
        ///    Sys.Exten [rest of string was truncated]&quot;;.
        /// </summary>
        public static string LocationCommon {
            get {
                return ResourceManager.GetString("LocationCommon", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Sys.loader.defineScripts({
        ///    releaseUrl: &quot;%/../MyClientControls/&quot; + &quot;{0}.js&quot;,
        ///    debugUrl: &quot;%/../MyClientControls/&quot; + &quot;{0}.js&quot;
        ///},
        ///    [
        ///        { name: &quot;ImageView&quot;,
        ///            executionDependencies: [&quot;Templates&quot;],
        ///            behaviors: [&quot;My.Controls.ImageView&quot;],
        ///            isLoaded: !!(window.My &amp;&amp; My.Controls &amp;&amp; My.Controls.ImageView)
        ///        }
        ///    ]
        ///);.
        /// </summary>
        public static string RegisterLoader {
            get {
                return ResourceManager.GetString("RegisterLoader", resourceCulture);
            }
        }
    }
}
