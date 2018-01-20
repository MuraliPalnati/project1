function ValidaitonsCreateForm() {

    this.mctrLineItemactivityIdFromPostTextItem = function (data, id) {
        var formdata = $("#form").serializeArray();
        var mctrCreateForm = {};
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        var activity_id_from = data.ACTIVITY_ID_FROM;
        var Origactivity_id_from = $('#' + id + '_ACTIVITY_ID_FROM').attr('value');
       // Origactivity_id_from = $('#' + id + '_ACTIVITY_ID_FROM').attr('value') == "" ? $('#' + id + '_ACTIVITY_ID_FROM').val() : $('#' + id + '_ACTIVITY_ID_FROM').attr('value');
        var bems_orig = mctrCreateForm.BemsOrig;
        var orig_bu = mctrCreateForm.OrigBu;
        var proj_trans_code_from = data.PROJ_TRANS_CODE_FROM;
        var fiscal_year = mctrCreateForm.fyear;
        var BemsOrig = $('#BemsOrig').val();
        var Session_bems = $('#SessionBems').val();//Nedd to get session values
        var Origperiodfrom = $('#PeriodFrom').val();
        var Origperiodto = $('#PeriodTo').val();
        //if (orig_bu == "" || fiscal_year == "" || (Origperiodfrom == "" || Origperiodto == "")) { // || (Origperiodfrom == "" || Origperiodto == "")) {
        //    return "please save mctr selecting grp bu && year values before continuing to line items.";
        //}


        if ((activity_id_from != Origactivity_id_from) ||
           (activity_id_from == "" && Origactivity_id_from != "") ||
           (activity_id_from != "" && Origactivity_id_from == "") || $('#' + id + '_ACTIVITY_ID_FROM').attr("class") == 'red')
        {
            if (mctrCreateForm.StatusId == 'OA' && bems_orig == Session_bems) {// &&(proj_trans_code_from != 'frg' || proj_trans_code_from == "")) {GEt session value
                if (orig_bu == "" || fiscal_year == "" || (Origperiodfrom == "" || Origperiodto == "")) { // || (Origperiodfrom == "" || Origperiodto == "")) {
                    return "please save mctr selecting grp bu && year values before continuing to line items.";
                }
                else if (activity_id_from == "" && Origactivity_id_from != "") {
                    $('#' + id + '_ACTIVITY_ID_FROM').attr('value', Origactivity_id_from);
                    $('#' + id + '_ACTIVITY_ID_FROM').val(Origactivity_id_from);
                    return "activity id (from) is a required field.";
                }
                else {
                    $('#' + id + '_HOME_BUGL_FROM').val(orig_bu);

                    if (data.HOME_BUGL_TO == "") {
                        $('#' + id + '_HOME_BUGL_TO').val(orig_bu);
                        $('#' + id + '_HOME_BUGL_TO').attr('value',orig_bu);
                    }
                    // $('input[id*=PERIOD_FROM]').val(Origperiod_from);
                    //  $('input[id*=PERIOD_TO]').val(Origperiod_to);
                    $('#' + id + '_OH_BASE_YR_FROM').val(mctrCreateForm.fyear);
                    $('#' + id + '_OH_BASE_YR_TO').val(mctrCreateForm.fyear);
                    if ((activity_id_from != Origactivity_id_from) ||
                       (activity_id_from == "" && Origactivity_id_from != "") ||
                       (activity_id_from != "" && Origactivity_id_from == "")) {
                        //  activity_status = "";
                        //  project_status = "";
                        $('#' + id + '_WORK_BUGL_FROM').val("");
                        $('#' + id + '_CONTRACT_NUM_FROM').val("");
                        $('#' + id + '_BUM_CD7_FROM').val("");
                        $('#' + id + '_CUST_TYPE_CD7_FROM').val("");
                        $('#' + id + '_PROJECT_ID_FROM').val("");
                        $('#' + id + '_ACCOUNT_FROM').val("");
                        $('#' + id + '_ACTIVITY_ID_FROM').removeClass().addClass("white");
                        // set_item_instance_property('account_from', current_record, visual_attribute, 'field_white');
                        $('#' + id + '_ACCOUNT_FROM').addClass('white');
                        if (activity_id_from != null && activity_id_from != 'REQUIRED') {//&& period_to != null 
                            // set_item_instance_property('activity_id_from', current_record, visual_attribute, 'field_white');
                            $('#' + id + '_ACTIVITY_ID_FROM').addClass('white');
                        }
                    }

                    //set_item_instance_property('ttd_flag', current_record, visual_attribute, 'field_white');
                    // set_item_instance_property('per_flag', current_record, visual_attribute, 'field_white');
                    $('#' + id + '_ttdValue').addClass('white');
                    $('#' + id + '_yearValue').addClass('white');
                }
            }

            else {       
                 $('#' + id + '_ACTIVITY_ID_FROM').val(Origactivity_id_from);
                return "You either do not have the proper role or proper status setting to change this field.";
            }
        }
    };

    this.mctrLineItemactivityIdToPostTextItem = function (grid, id) {
        var mctrCreateForm = {};
        var formdata = $("#form").serializeArray();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        var origActivityIdTo = $('#' + id + '_ACTIVITY_ID_TO').attr('value');

        //origActivityIdTo = $('#' + id + '_ACTIVITY_ID_TO').attr('value') == "" ? $('#' + id + '_ACTIVITY_ID_TO').val() : $('#' + id + '_ACTIVITY_ID_TO').attr('value');
        var sessionBems = mctrCreateForm.BemsOrig;

        if ((grid.ACTIVITY_ID_TO != origActivityIdTo) ||
            (grid.ACTIVITY_ID_TO == "" && origActivityIdTo != "") ||
            (grid.ACTIVITY_ID_TO != "" && origActivityIdTo == "")) {
            if ((mctrCreateForm.StatusId = "OA" && mctrCreateForm.BemsOrig == sessionBems) &&
               (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                $('#' + id + '_ACTIVITY_STATUS').val("");
                $('#' + id + '_PROJECT_STATUS').val("");
                $('#' + id + '_WORK_BUGL_TO').val("");
                $('#' + id + '_PROJECT_ID_TO').val("");
                $('#' + id + '_CONTRACT_NUM_TO').val("");
                $('#' + id + '_BUM_CD7_TO').val("");
                $('#' + id + '_CUST_TYPE_CD7_TO').val("");
                $('#' + id + '_BUM_CD7_TO_ORIG').val("");
                $('#' + id + '_ACCOUNT_TO').val("");
                $('#' + id + '_ACCOUNT_TO').removeClass().addClass("white");
                if (grid.ACTIVITY_ID_TO != "" && grid.PERIOD_FROM != "" && grid.ACTIVITY_ID_TO != "REQUIRED") {

                    $('#' + id + '_ACTIVITY_ID_TO').removeClass().addClass("white");
                }
               
            }
            else {
                $('#' + id + '_ACTIVITY_ID_TO').val(origActivityIdTo)
                return "you either do not have the proper role || proper status setting to change th field.";
            }
            //rae f||m_trigger_failure;
        }
    };


    this.mctrLineItemcausalIdFromPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origCasualIdFrom = $('#' + id + '_CAUSAL_ID_FROM').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_from = $('#PeriodFrom').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.CASUAL_ID_FROM != origCasualIdFrom) ||
            (grid.CASUAL_ID_FROM != "" && origCasualIdFrom == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
                ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
                (mctrCreateForm.StatusId == "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
            && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_from == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_CAUSAL_ID_FROM').val(origCasualIdFrom);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_CAUSAL_ID_FROM').val(origCasualIdFrom);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_CAUSAL_ID_FROM').val(origCasualIdFrom);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_CAUSAL_ID_FROM').val(origCasualIdFrom);
                    return "project trans type (from) value must be entered first.";
                }
                else {
                    //return "any value for a material field entered  accepted";
                    //==""
                }
            }
            else {
                $('#' + id + '_CAUSAL_ID_FROM').val(origCasualIdFrom);
                return "you either do not have the proper role || proper status setting to change thE field.";
            }
            return true;
        }
    };


    this.mctrLineItempoIdFromPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origPoIdFrom = $('#' + id + '_PO_ID_FROM').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_from = $('#PeriodFrom').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.PO_ID_FROM != origPoIdFrom) ||
            (grid.PO_ID_FROM != "" && origPoIdFrom == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
                ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
                ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
                (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
                && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_from == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_ID_FROM').val(origPoIdFrom);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_ID_FROM').val(origPoIdFrom);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_PO_ID_FROM').val(origPoIdFrom);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_PO_ID_FROM').val(origPoIdFrom);
                    return "project trans type (from) value must be entered first.";
                }
                else {
                    // any value f|| a material field entered  accepted
                }
            }
            else {
                $('#' + id + '_PO_ID_FROM').val(origPoIdFrom);
                return "you either do not have the proper role || proper status setting to change th field.";
            }
            return true;
        }
    };


    this.mctrLineItempoLineFromPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origPoLineFrom = $('#' + id + '_PO_LINE_FROM').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_from = $('#PeriodFrom').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.PO_LINE_FROM != origPoLineFrom) ||
            (grid.PO_LINE_FROM != "" && origPoLineFrom == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
             ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
             ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
             (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
             && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_from == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_LINE_FROM').val(origPoLineFrom);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_LINE_FROM').val(origPoLineFrom);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_PO_LINE_FROM').val(origPoLineFrom);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_PO_LINE_FROM').val(origPoLineFrom);
                    return "project trans type (from) value must be entered first.";
                }
                else {
                    //"any value for a material field entered  accepted";
                }
            }
            else {
                $('#' + id + '_PO_LINE_FROM').val(origPoLineFrom);
                return "you either do not have the proper role || proper status setting to change th field.";
            }
            return true;
        }
    };


    this.mctrLineItempartNoFromPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origPartNoFrom = $('#' + id + '_PART_NO_FROM').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_from = $('#PeriodFrom').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.PART_NO_FROM != origPartNoFrom) ||
            (grid.PART_NO_FROM != "" && origPartNoFrom == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
              ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
              ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
              (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
              && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_from == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PART_NO_FROM').val(origPartNoFrom);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PART_NO_FROM').val(origPartNoFrom);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_PART_NO_FROM').val(origPartNoFrom);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_PART_NO_FROM').val(origPartNoFrom);
                    return "project trans type (from) value must be entered first.";
                }
                else {
                    // "any value f|| a material field entered  accepted";
                    // =="";
                }
            }
            else {
                $('#' + id + '_PART_NO_FROM').val(origPartNoFrom);
                return "you either do not have the proper role || proper status setting to change the field.";
            }
        }
        return true;
    };


    this.mctrLineItemepacsCttFromPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origEpacsCttFrom = $('#' + id + '_EPACS_CTT_FROM').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_from = $('#PeriodFrom').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.EPACS_CTT_FROM != origEpacsCttFrom) ||
            (grid.EPACS_CTT_FROM != "" && origEpacsCttFrom == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
              ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
              ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
              (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
              && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_from == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_EPACS_CTT_FROM').val(origEpacsCttFrom);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_EPACS_CTT_FROM').val(origEpacsCttFrom);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_EPACS_CTT_FROM').val(origEpacsCttFrom);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_EPACS_CTT_FROM').val(origEpacsCttFrom);
                    return "project trans type (from) value must be entered first.";
                }
                else {
                    // "any value f|| a material field entered  accepted";
                }
            }
            else {
                $('#' + id + '_EPACS_CTT_FROM').val(origEpacsCttFrom);
                return "you either do not have the proper role || proper status setting to change the field.";
            } 
        }
        return true;
    };


    this.mctrLineItemshoporderFromPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origShopOrderFrom = $('#' + id + '_SHOP_ORDER_FROM').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_from = $('#PeriodFrom').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.SHOP_ORDER_FROM != origShopOrderFrom) ||
            (grid.SHOP_ORDER_FROM != "" && origShopOrderFrom == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
             ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
             ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
             (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
             && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_from == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_SHOP_ORDER_FROM').val(origShopOrderFrom);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_SHOP_ORDER_FROM').val(origShopOrderFrom);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_SHOP_ORDER_FROM').val(origShopOrderFrom);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_SHOP_ORDER_FROM').val(origShopOrderFrom);
                    return "project trans type (from) value must be entered first.";
                }
                else {
                    // "any value for a material field entered  accepted";
                }
            }
            else {
                $('#' + id + '_SHOP_ORDER_FROM').val(origShopOrderFrom);
                return "you either do not have the proper role || proper status setting to change the field.";
            }
        }
        return true;
    };


    this.mctrLineItemmtlQtyFromPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origMtlQtyFrom = $('#' + id + '_MATERIAL_QUANTITY_FROM').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_from = $('#PeriodFrom').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if (!isNaN(grid.MATERIAL_QUANTITY_FROM)) {
            if ((grid.MATERIAL_QUANTITY_FROM != origMtlQtyFrom) ||
                (grid.MATERIAL_QUANTITY_FROM != "" && origMtlQtyFrom == "")) {
                if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
                 ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
                 (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
                 && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                    if (grid.ACTIVITY_ID_FROM == "" || period_from == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                        $('#' + id + '_MATERIAL_QUANTITY_FROM').val(origMtlQtyFrom);
                        return "please enter the activity id (from) first.";
                    }
                    else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                        $('#' + id + '_MATERIAL_QUANTITY_FROM').val(origMtlQtyFrom);
                        return "please enter the project id (from) first.";
                    }
                    else if (grid.ACCOUNT_FROM == "") {
                        $('#' + id + '_MATERIAL_QUANTITY_FROM').val(origMtlQtyFrom);
                        return "please enter the account (from) first.";
                    }
                    else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                        $('#' + id + '_MATERIAL_QUANTITY_FROM').val(origMtlQtyFrom);
                        return "project trans type (from) value must be entered first.";
                    }
                    else {

                        if (grid.PROJ_TRANS_TYPE_FROM == "LBR") {
                            $('#' + id + '_MATERIAL_QUANTITY_FROM').val(origMtlQtyFrom);
                            return "you cannot enter material quantity when project tran type  lbr.";
                        }

                        else if ((grid.MATERIAL_QUANTITY_FROM).trim() != "") {
                            $('#' + id + '_MATERIAL_QUANTITY_FROM').val((parseFloat($('#' + id + '_MATERIAL_QUANTITY_FROM').val())).toFixed(2))
                            $('#' + id + '_MATERIAL_QUANTITY_TO').val((parseFloat($('#' + id + '_MATERIAL_QUANTITY_FROM').val() * -1)).toFixed(2));

                        }
                        else {
                            $('#' + id + '_MATERIAL_QUANTITY_TO').val(grid.MATERIAL_QUANTITY_FROM);
                        }
                    }

                }
                else {
                    $('#' + id + '_MATERIAL_QUANTITY_FROM').val(origMtlQtyFrom);
                    return "you either do not have the proper role or proper status setting to change the field.";
                }
            }
            return true;
        }
        else
        {
            $('#' + id + '_MATERIAL_QUANTITY_FROM').val(origMtlQtyFrom);
            return "Field must be of form 9,999,999,999.99";
        }

    };

    this.mctrLineItemcausalIdToPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origCausalIdTo = $('#' + id + '_CAUSAL_ID_TO').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_to = $('#PeriodTo').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.CAUSAL_ID_TO != origCausalIdTo) ||
            (grid.CAUSAL_ID_TO != "" && origCausalIdTo == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
              ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
              ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
              (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
              && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_to == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                    return "project trans type (from) value must be entered first.";
                }
                else if (grid.ACTIVITY_ID_TO == "" || grid.ACTIVITY_ID_TO == "REQUIRED") {
                    $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                    return "please enter the activity id (to) first.";
                }
                else if (grid.PROJECT_ID_TO == "" || grid.PROJECT_ID_TO == "REQUIRED") {
                    $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                    return "please enter the project id (to) first.";
                }
                else if (grid.ACCOUNT_TO == "" && grid.PROJ_TRANS_TYPE_TO == "LBR") {
                    $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                    return "please enter the account (to) first.";
                }

                else {
                    // any value f|| a material field entered  accepted
                    // =="";
                }
            }
            else {
                $('#' + id + '_CAUSAL_ID_TO').val(origCausalIdTo);
                return "you either do not have the proper role || proper status setting to change th field.";
            }
        }
        return true;
    };

    this.mctrLineItempoIdToPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origPoIdTo = $('#' + id + '_PO_ID_TO').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_to = $('#PeriodTo').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.PO_ID_TO != origPoIdTo) ||
            (grid.PO_ID_TO != "" && origPoIdTo == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
             ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
             ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
             (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
             && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_to == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                    return "project trans type (from) value must be entered first.";
                }
                else if (grid.ACTIVITY_ID_TO == "" || grid.ACTIVITY_ID_TO == "REQUIRED") {
                    $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                    return "please enter the activity id (to) first.";
                }
                else if (grid.PROJECT_ID_TO == "" || grid.PROJECT_ID_TO == "REQUIRED") {
                    $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                    return "please enter the project id (to) first.";
                }
                else if (grid.ACCOUNT_TO == "" && grid.PROJ_TRANS_TYPE_TO == "LBR") {
                    $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                    return "please enter the account (to) first.";
                }
                else {
                    // any value f|| a material field entered  accepted
                    //=="";
                }
            }
            else {
                $('#' + id + '_PO_ID_TO').val(origPoIdTo);
                return "you either do not have the proper role || proper status setting to change th field.";
            }
        }
        
        //rae f||m_trigger_failure;
    };

    this.mctrLineItempoLineToPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origPoLineTo = $('#' + id + '_PO_LINE_TO').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_to = $('#PeriodTo').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.PO_LINE_TO != origPoLineTo) ||
            (grid.PO_LINE_TO != "" && origPoLineTo == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
                ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
               ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "LM") && grid.BemsMatlAcct == sessionBems) ||
                (mctrCreateForm.StatusId == "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
                && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_to == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                    return "project trans type (from) value must be entered first.";
                }
                else if (grid.ACTIVITY_ID_TO == "" || grid.ACTIVITY_ID_TO == "REQUIRED") {
                    $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                    return "please enter the activity id (to) first.";
                }
                else if (grid.PROJECT_ID_TO == "" || grid.PROJECT_ID_TO == "REQUIRED") {
                    $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                    return "please enter the project id (to) first.";
                }
                else if (grid.ACCOUNT_TO == "" && grid.PROJ_TRANS_TYPE_TO == "LBR") {
                    $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                    return "please enter the account (to) first.";
                }
                else {
                    // any value f|| a material field entered  accepted
                    // =="";
                }
            }
            else {
                $('#' + id + '_PO_LINE_TO').val(origPoLineTo);
                return "you either do not have the proper role || proper status setting to change th field.";
            }

            return true;
        }
    };

    this.mctrLineItempartNoToPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origPartNoTo = $('#' + id + '_PART_NO_TO').attr('value');
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        var period_to = $('#PeriodTo').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.PART_NO_TO != origPartNoTo) ||
            (grid.PART_NO_TO != "" && origPartNoTo == "")) {
            if ((((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
                ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
                ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "OR") && grid.BemsMatlAcct === sessionBems) ||
                (mctrCreateForm.StatusId == "CA" && mctrCreateForm.BemsCostAcct == sessionBems))
                && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_to == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                    return "project trans type (from) value must be entered first.";
                }
                else if (grid.ACTIVITY_ID_TO == "" || grid.ACTIVITY_ID_TO == "REQUIRED") {
                    $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                    return "please enter the activity id (to) first.";
                }
                else if (grid.PROJECT_ID_TO == "" || grid.PROJECT_ID_TO == "REQUIRED") {
                    $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                    return "please enter the project id (to) first.";
                }
                else if (grid.ACCOUNT_TO == "" && grid.PROJ_TRANS_TYPE_TO == "LBR") {
                    $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                    return "please enter the account (to) first.";
                }
                else {
                    // any value f|| a material field entered  accepted
                    //=="";
                }
            }
            else {
                $('#' + id + '_PART_NO_TO').val(origPartNoTo);
                return "You either do not have the proper role OR proper status setting to change the field.";
            }
           
        }
        //rae f||m_trigger_failure;
        return true;
    };

    this.mctrLineItemepacsCttToPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var origEpacsCttTo = $('#' + id + '_EPACS_CTT_TO').attr('value');
        var period_to = $('#PeriodTo').val();
        var mctrCreateForm = {};
        var sessionBems = $('#SessionBems').val();
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        if ((grid.EPACS_CTT_TO != origEpacsCttTo) ||
            (grid.EPACS_CTT_TO != "" && origEpacsCttTo == "")) {
            if ((((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
                ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
                ((mctrCreateForm.StatusId == "MA" || mctrCreateForm.StatusId == "OR") && grid.BemsMatlAcct === sessionBems) ||
                (mctrCreateForm.StatusId == "CA" && mctrCreateForm.BemsCostAcct == sessionBems))
                && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_to == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                    return "project trans type (from) value must be entered first.";
                }
                else if (grid.ACTIVITY_ID_TO == "" || grid.ACTIVITY_ID_TO == "REQUIRED") {
                    $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                    return "please enter the activity id (to) first.";
                }
                else if (grid.PROJECT_ID_TO == "" || grid.PROJECT_ID_TO == "REQUIRED") {
                    $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                    return "please enter the project id (to) first.";
                }
                else if (grid.ACCOUNT_TO == "" && grid.PROJ_TRANS_TYPE_TO == "LBR") {
                    $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                    return "please enter the account (to) first.";
                }
                else {
                    // =="";
                }
            }
            else {
                $('#' + id + '_EPACS_CTT_TO').val(origEpacsCttTo);
                return "you either do not have the proper role || proper status setting to change th field.";
            }
        }
        return true;
        //rae f||m_trigger_failure;
    };

    this.mctrLineItemshoporderToPostTextItem = function (grid, id) {
        var formdata = $('#form').serializeArray();
        var mctrCreateForm = {};
        $(formdata).each(function (index, obj) {
            mctrCreateForm[obj.name] = obj.value;
        });
        var origShopOrderTo = $('#' + id + '_SHOP_ORDER_TO').attr('value');
        var sessionBems = $('#SessionBems').val();
        var period_to = $('#PeriodTo').val();
        if ((grid.SHOP_ORDER_TO != origShopOrderTo) ||
            (grid.SHOP_ORDER_TO != "" && origShopOrderTo == "")) {
            if (((mctrCreateForm.StatusId == "OA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsOrig == sessionBems) ||
                ((mctrCreateForm.StatusId == "AA" || mctrCreateForm.StatusId == "OR") && mctrCreateForm.BemsAcct == sessionBems) ||
                (mctrCreateForm.StatusId = "CA" && mctrCreateForm.BemsCostAcct == sessionBems)
                && (grid.Proj_TRANS_CODE_FROM != "FRG" || grid.Proj_TRANS_CODE_FROM == "")) {
                if (grid.ACTIVITY_ID_FROM == "" || period_to == "" || grid.ACTIVITY_ID_FROM == "REQUIRED") {
                    $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                    return "please enter the activity id (from) first.";
                }
                else if (grid.PROJECT_ID_FROM == "" || grid.PROJECT_ID_FROM == "REQUIRED") {
                    $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                    return "please enter the project id (from) first.";
                }
                else if (grid.ACCOUNT_FROM == "") {
                    $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                    return "please enter the account (from) first.";
                }
                else if (grid.PROJ_TRANS_TYPE_FROM == "" || grid.PROJ_TRANS_TYPE_FROM == "REQ") {
                    $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                    return "project trans type (from) value must be entered first.";
                }
                else if (grid.ACTIVITY_ID_TO == "" || grid.ACTIVITY_ID_TO == "REQUIRED") {
                    $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                    return "please enter the activity id (to) first.";
                }
                else if (grid.PROJECT_ID_TO == "" || grid.PROJECT_ID_TO == "REQUIRED") {
                    $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                    return "please enter the project id (to) first.";
                }
                else if (grid.ACCOUNT_TO == "" && grid.PROJ_TRANS_TYPE_TO == "LBR") {
                    $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                    return "please enter the account (to) first.";
                }
                else {
                    // any value for a material field entered  accepted

                }
            }
            else {
                $('#' + id + '_SHOP_ORDER_TO').val(origShopOrderTo);
                return "you either do not have the proper role || proper status setting to change the field.";
            }
        }
        //rae f||m_trigger_failure;
    };


}