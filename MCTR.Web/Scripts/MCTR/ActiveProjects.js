﻿$(document).ready(function () {
    var fiscal_year = $('#fyear').val();
    var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
    var mctrObj = new MCTR();
    var rowObject = {};
    
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrActiveProjectsGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
   

    var columnNames = ['Contract Num', 'BU', 'Project Id', 'Activity Id', 'Account', 'BUM', 'CT', 'Activity Eff Dt','Project Eff Dt', 'Act Status', 'Proj Status', 'Direct Chrg'];
    var colModel = [{ key: false, name: 'CONTRACT_NUM', index: 'CONTRACT_NUM', width: 130, editable: true },
        { key: false, name: 'BUSINESS_UNIT_GL', index: 'business_unit', width: 55, editable: false },
        { key: false, name: 'PROJECT_ID', index: 'group_cd7', width: 80, editable: true },
        { key: false, name: 'ACTIVITY_ID', index: 'descr  ', width: 80, editable: true },
        { key: false, name: 'ACCOUNT', index: 'ACCOUNT', width: 80, editable: true },
        { key: false, name: 'BUS_UNIT_MGMT_CD7', index: 'BUS_UNIT_MGMT_CD7', width: 50, editable: true },
        { key: false, name: 'CUSTOMER_TYPE_CD7', index: 'CUSTOMER_TYPE_CD7', width: 40, editable: true },
        { key: false, name: 'ACC_EFF_DT', classes:'uppercase', index: 'ACC_EFF_DT', width: 100, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, editable: true },
        { key: false, name: 'PROJ_EFF_DT', classes: 'uppercase', index: 'PROJ_EFF_DT', width: 100, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, editable: true },
        { key: false, name: 'ACTIVITY_STATUS', index: 'ACTIVITY_STATUS', width: 90, editable: true },
        { key: false, name: 'PROJECT_STATUS', index: 'PROJECT_STATUS', width: 30, editable: true },
        { key: false, name: 'DIRECT_CHRG_FLG7', index: 'DIRECT_CHRG_FLG7', width: 30, editable: true }];
    mctrObj.CreateJqGrid('mctrActiveProjectsGrid', '/MctrCreateForm/getRgProjFromJson', 'GET', { activityIdFrom: $('#' + $('#activeProgFrom').val() + '_ACTIVITY_ID_FROM').val(), pycystatus: py_cy_status , periodTo:$('#PeriodTo').val(),cow:$('#COW').val()}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrActiveProjectsGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#activeProjokBtn').click(function () {
     
        var rowID = $('#rowId').val();
        var bum_cd7_to_orig = $('#' + rowID + '_BUM_CD7_TO_ORIG').val();
        var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
        var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
        var project_id_from = rowObject.PROJECT_ID;
        var account_from = rowObject.ACCOUNT;
        var bum_cd7_to = $('#' + rowID + '_BUM_CD7_TO').val();
        var bum_cd7_from = rowObject.BUS_UNIT_MGMT_CD7;
        //var $('#' + rowID + '_ACTIVITY_ID_FROM').attr('red-flag','') = '';
        var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();;
        if (rowObject == '') {
            mctrObj.showDialog($("#dialog-box"), 'a value was not selected from list.', "error");

        } else {
            $('#' + rowID + '_ACCOUNT_FROM').removeClass().addClass('white');
            $('#' + rowID + '_TTD_FLAG').removeClass().addClass('white');
            $('#' + rowID + '_PER_FLAG').removeClass().addClass('white');
            if (rowObject.ACTIVITY_STATUS == 'I' || rowObject.PROJECT_STATUS == 'I') {
                $('#' + rowID + '_ACTIVITY_ID_FROM').attr('red-flag', 'Y');
                if (rowObject.ACTIVITY_STATUS == 'I') {
                    $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass('orange');
                    $('#' + rowID + '_ACTIVITY_ID_FROM').attr('red-flag', 'Y');
                } else {
                    $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass('white');
                }
                if (rowObject.PROJECT_STATUS == 'I') {
                    $('#' + rowID + '_PROJECT_ID_FROM').removeClass().addClass('orange');
                } else {
                    $('#' + rowID + '_PROJECT_ID_FROM').removeClass('red');
                }
            }
            else {
                $('#' + rowID + '_ACTIVITY_ID_FROM').attr('red-flag', 'N');
                $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass('white');
                $('#' + rowID + '_PROJECT_ID_FROM').removeClass('red');
            }
            rowObject.ACTIVITY_STATUS = '';
            rowObject.PROJECT_STATUS = '';
            if (($('#py_cy_status').val() == 'PY' && account_from != '') && ((account_from.match('^6')) || (account_from.match('^7')) || (account_from.match('^8')))) {
                $('#' + rowID + '_ACCOUNT_FROM').removeClass().addClass('red');
                mctrObj.showDialog($("#dialog-box"), 'warning - accounts starting with 6, 7, 8 not allowed for prior year.',"error");
            }
            // check bum code to value in case activity id to was entered first.
            if (activity_id_to != '' && project_id_to != '' && bum_cd7_to == '') {
                if (activity_id_from != '' && project_id_from != '') {
                    if (bum_cd7_from != '' && bum_cd7_to_orig != '') {
                        // set bum_cd7_to field value here if missing.
                        $('#' + rowID + '_BUM_CD7_TO').val(bum_cd7_from);
                    }
                }
            }

        }
        $('#formOrToFlag').val('from');
        $('#' + rowID + '_ACCOUNT_FROM').val(rowObject.ACCOUNT);
        $('#' + rowID + '_ACCOUNT_FROM').attr('value',rowObject.ACCOUNT);
        $('#' + rowID + '_WORK_BUGL_FROM').val(rowObject.BUSINESS_UNIT_GL);
        $('#' + rowID + '_PROJECT_ID_FROM').val(rowObject.PROJECT_ID);
        $('#' + rowID + '_CONTRACT_NUM_FROM').val(rowObject.CONTRACT_NUM);
        $('#' + rowID + '_BUM_CD7_FROM').val(rowObject.BUS_UNIT_MGMT_CD7);
        $('#' + rowID + '_CUST_TYPE_CD7_FROM').val(rowObject.CUSTOMER_TYPE_CD7);
        $.each($('.bootbox'), function (i, obj) {
            $(obj).modal('hide');
        })
        $('.bootbox-close-button').click();
        });

    mctrObj.searchGrid('mctrActiveProjectsGrid', activeProjokBtn);
});