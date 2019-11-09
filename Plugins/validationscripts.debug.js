function _isValidationGroupValid(groupname, isValidateGroup) {
    var isValid = true;

    if (Page_ClientValidate) {
        if (isValidateGroup) {
            Page_ClientValidate(groupname);
        }

        if (Page_Validators) {
            for (var i = 0; i < Page_Validators.length; i++) {
                if (Page_Validators[i].validationGroup == groupname) {
                    if (!Page_Validators[i].isvalid) {
                        isValid = false;
                        break;
                    }
                }
            }
        } 
    }

    return isValid;
}

function _setValidatorCalloutEnabled(enabled) {
    if ("ExtendedValidatorCallout" in Sys.Extended.UI) {
        Sys.Extended.UI.ExtendedValidatorCallout._validatorMessageEnabled = enabled;
    }
}

function _initValidator(validationgroup) {
    $(document).ready(function () {
        _setValidatorCalloutEnabled(false);
        if (Page_ClientValidate) {
            Page_ClientValidate(validationgroup);
        }
    });
}

function _validateField(id) {
    if ("ValidatorValidate" in window) {
        var target = $get(id);

        if (target.Validators) {
            var i = target.Validators.length;
            while (i--) {
                ValidatorValidate(target.Validators[i], target.Validators[i].validationGroup, null);
            }
        }
    }
}

function _disablePageValidators() {
    if ("Page_Validators" in window) {
        window.Page_ValidationActive = false;
        var i = Page_Validators.length;
        if (i) {
            while (i--) {
                Page_Validators[i].isvalid = true;
                Page_Validators[i].enabled = false;
                if ("ValidatorCalloutBehavior" in Sys.Extended.UI) {
                    var callouts = Sys.UI.Behavior.getBehaviorsByType(Page_Validators[i], Sys.Extended.UI.ValidatorCalloutBehavior);
                    if (0 in callouts) {
                        var j = callouts.length;
                        while (j--) {
                            callouts[j].dispose();
                        }
                    }
                }
                ValidatorUpdateDisplay(Page_Validators[i]);
                ValidatorUpdateIsValid();
            }
        }
    }
}