$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        rowObject.fullName = $('#' + rowid).find('td[aria-describedby="mctrApproversGrid_LAST_NAME"]').attr('title') + ', ' + $('#' + rowid).find('td[aria-describedby="mctrApproversGrid_FIRST_NAME"]').attr('title');
        if (rowObject.fullName == ",")
        {
            rowObject.fullName = "";
        }
        rowObject.bems = $('#' + rowid).find('td[aria-describedby="mctrApproversGrid_BEMS"]').attr('title');
    };

    var popUpFrom = $('#popUpFrom').val();
    var columnNames = ['Last Name', 'First Name', 'BEMS', 'BU', 'Loc', 'Dept', 'Mail Code', 'Phone'];
    var colModel = [{ key: false, name: 'LAST_NAME', index: 'LAST_NAME', width: 72, editable: false,search:true },
        { key: false, name: 'FIRST_NAME', index: 'FIRST_NAME', width: 72, editable: false },
        { key: false, name: 'BEMS', index: 'BEMS', width: 70, editable: false },
        { key: false, name: 'COMPONENT', index: 'BUS_UNIT', width: 70, editable: false },
        { key: false, name: 'ACCTG_LOC_CDM', index: 'LOCATION', width: 50, editable: false },
        { key: false, name: 'DEPTNO', index: 'DEPTNO', width: 70, editable: false },
        { key: false, name: 'MAIL_CODE', index: 'MAIL_CODE', width: 70, editable: false },
        { key: false, name: 'WORK_PHONE', index: 'WORK_PHONE', width: 90, editable: false }];
    switch (popUpFrom) {
        case "Supervisor":
            mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgSuperJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn); break;
            $("#mctrApproversGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
            break;
        case "FinControl":
            mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgFinCtlJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn); break;
            $("#mctrApproversGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
            break;
        case "Accountant":
            mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgAcctLOVJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn); break;
            $("#mctrApproversGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
            break;
        case "LaborAcctg":
            mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgLbrAcctLOVJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn); break;
            $("#mctrApproversGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
            break;
        case "MatlAcctg":
            mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgMatlAcctLOVJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn); break;
            $("#mctrApproversGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
            break;
        case "CostAcctg":
            mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgCostAcctLOVJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn); break;
            $("#mctrApproversGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
            break;
        case "SrAcctg":
            mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgSrAcctLOVJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn); break;
            $("#mctrApproversGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
            break;
        default:
            
    }
    //if (popUpFrom == "Supervisor") {
    //    mctrObj.CreateJqGrid('mctrApproversGrid', '/MctrCreateForm/getRgSuperJson', 'GET', { origBu: $('#OrigBu').val(), origGrp: $('#OrigGroup').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    //}
    $('#okBtn').click(function () {
        switch (popUpFrom) {
            case "Supervisor": $("#BemsSuper").val(rowObject.bems);
                if (rowObject.fullName == " ,  ")
                {
                    rowObject.fullName = "";
                }
                $('#SuprApprFullName').val(rowObject.fullName);
                var apprCdSuper = $('#ApprCdSuper').val();
                if ($("#BemsSuper").val() == "" || ($("#BemsSuper").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                $('#mctrModal').modal('hide');

                break;
            case "FinControl": $("#BemsFinCtl").val(rowObject.bems);
                if (rowObject.fullName == " ,  ") {
                    rowObject.fullName = "";
                }
                $('#FinApprFullName').val(rowObject.fullName);
                var apprCdFinCtl = $('#apprCdFinCtl').val();
                if ($("#BemsFinCtl").val() == "" || ($("#BemsFinCtl").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                if (apprCdFinCtl == "N") {
                    //set_item_property("mctr_header.appr_cd_fin_ctl",foreground_color,"r500g0b0")
                    //set_item_property("mctr_header.bems_fin_ctl",foreground_color,"r500g0b0")
                    //set_item_property("mctr_header.fin_cntl_name",foreground_color,"r500g0b0")
                    //set_item_property("mctr_header.date_appr_fin_ctl",foreground_color,"r500g0b0")
                }

                else {
                    //set_item_property("mctr_header.appr_cd_fin_ctl",foreground_color,"r25g25b25")
                    //set_item_property("mctr_header.bems_fin_ctl",foreground_color,"r25g25b25")
                    //set_item_property("mctr_header.fin_cntl_name",foreground_color,"r25g25b25")
                    //set_item_property("mctr_header.date_appr_fin_ctl",foreground_color,"r25g25b25")
                }
                break;
            case "Accountant": $("#BemsAcct").val(rowObject.bems);
                if (rowObject.fullName == " ,  ") {
                    rowObject.fullName = "";
                    $("#BemsAcct").val("");
                }
                $('#AccApprFullName').val(rowObject.fullName);
                if ($("#BemsAcct").val() == "" || ($("#BemsAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "LaborAcctg": $("#BemsLbrAcct").val(rowObject.bems);
                if (rowObject.fullName == " ,  ") {
                    rowObject.fullName = "";
                    $("#BemsLbrAcct").val("");
                }
                $('#LbrApprFullName').val(rowObject.fullName);
                if ($("#BemsLbrAcct").val() == "" || ($("#BemsLbrAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "MatlAcctg": $("#BemsMatlAcct").val(rowObject.bems);
                if (rowObject.fullName == " ,  ") {
                    rowObject.fullName = "";
                    $("#BemsMatlAcct").val("");
                }
                $('#MatApprFullName').val(rowObject.fullName);
                if ($("#BemsMatlAcct").val() == "" || ($("#BemsMatlAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "CostAcctg": $("#BemsCostAcct").val(rowObject.bems);
                if (rowObject.fullName == " ,  ") {
                    rowObject.fullName = "";
                    $("#BemsCostAcct").val("");
                }
                $('#CostAccApprFullName').val(rowObject.fullName);
                if ($("#BemsCostAcct").val() == "" || ($("#BemsCostAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "SrAcctg": $("#BemsSrAcct").val(rowObject.bems);
                if (rowObject.fullName == " ,  ") {
                    rowObject.fullName = "";
                    $("#BemsSrAcct").val("");
                }
                $('#JournApprFullName').val(rowObject.fullName);
                if ($("#BemsSrAcct").val() == "" || ($("#BemsSrAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;

        }
        $('#mctrModal').modal('hide');
    });
    $('#cancelBtn').click(function () {
        switch (popUpFrom) {
            case "Supervisor": 
                var apprCdSuper = $('#ApprCdSuper').val();
                if ($("#BemsSuper").val() == "" || ($("#BemsSuper").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                $('#mctrModal').modal('hide');

                break;
            case "FinControl": 
                var apprCdFinCtl = $('#apprCdFinCtl').val();
                if ($("#BemsFinCtl").val() == "" || ($("#BemsFinCtl").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                if (apprCdFinCtl == "N") {
                    //set_item_property("mctr_header.appr_cd_fin_ctl",foreground_color,"r500g0b0")
                    //set_item_property("mctr_header.bems_fin_ctl",foreground_color,"r500g0b0")
                    //set_item_property("mctr_header.fin_cntl_name",foreground_color,"r500g0b0")
                    //set_item_property("mctr_header.date_appr_fin_ctl",foreground_color,"r500g0b0")
                }

                else {
                    //set_item_property("mctr_header.appr_cd_fin_ctl",foreground_color,"r25g25b25")
                    //set_item_property("mctr_header.bems_fin_ctl",foreground_color,"r25g25b25")
                    //set_item_property("mctr_header.fin_cntl_name",foreground_color,"r25g25b25")
                    //set_item_property("mctr_header.date_appr_fin_ctl",foreground_color,"r25g25b25")
                }
                break;
            case "Accountant":
                if ($("#BemsAcct").val() == "" || ($("#BemsAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "LaborAcctg": 
                if ($("#BemsLbrAcct").val() == "" || ($("#BemsLbrAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "MatlAcctg": 
                if ($("#BemsMatlAcct").val() == "" || ($("#BemsMatlAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "CostAcctg":
                if ($("#BemsCostAcct").val() == "" || ($("#BemsCostAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;
            case "SrAcctg": 
                if ($("#BemsSrAcct").val() == "" || ($("#BemsSrAcct").val() == undefined)) {
                    mctrObj.showDialog($("#dialog-box"), "a value was not selected from lt.", "error");
                }
                break;

        }
        $('#mctrModal').modal('hide');



    });
});