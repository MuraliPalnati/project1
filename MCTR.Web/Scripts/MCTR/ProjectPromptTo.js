$(document).ready(function () {
   
    var mctrObj = new MCTR();
    var rowObject = {};
    var rowId = $('#rowId').val();
    var createmctrlov1 = new Object();
    cowVal = $('#COW').val();
    pyVal = $('#py_cy_status').val();
    projToPromptVal = $('#ProjectToPrompt').val();
    activityVal = $('#' + rowId + '_ACTIVITY_ID_TO').val();
    projectVal = $('#PeriodTo').val();
    var createmctrlov2 = {
        cow: cowVal,
        py_cy_status: pyVal,
        PROJECT_ID: projToPromptVal == '_' ? '%' : projToPromptVal,
        ACTIVITY_ID: activityVal,
        EFFDT: projectVal
    };
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrActiveProjectsToPromptGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Contract Num', 'BU', 'Project Id', 'Activity Id', 'Account', 'BUM', 'CT', 'Eff Dt', 'Act Status', 'Proj Status', 'Direct Chrg'];
    var colModel = [{ key: false, name: 'CONTRACT_NUM', index: 'CONTRACT_NUM', width: 150, editable: true },
        { key: false, name: 'BUSINESS_UNIT_GL', index: 'business_unit', width: 55, editable: false },
        { key: false, name: 'PROJECT_ID', index: 'group_cd7', width: 100, editable: true },
        { key: false, name: 'ACTIVITY_ID', index: 'descr  ', width: 100, editable: true },
        { key: false, name: 'ACCOUNT', index: 'ACCOUNT', width: 80, editable: true },
        { key: false, name: 'BUS_UNIT_MGMT_CD7', index: 'BUS_UNIT_MGMT_CD7', width: 50, editable: true },
        { key: false, name: 'CUSTOMER_TYPE_CD7', index: 'CUSTOMER_TYPE_CD7', width: 40, editable: true },
        { key: false, name: 'ACC_EFF_DT', classes: 'uppercase', index: 'ACC_EFF_DT', width: 95, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, editable: true },
        { key: false, name: 'ACTIVITY_STATUS', index: 'ACTIVITY_STATUS', width: 90, editable: true },
        { key: false, name: 'PROJECT_STATUS', index: 'PROJECT_STATUS', width: 30, editable: true },
        { key: false, name: 'DIRECT_CHRG_FLG7', index: 'DIRECT_CHRG_FLG7', width: 75, editable: true }];
    mctrObj.CreateJqGrid('mctrActiveProjectsToPromptGrid', '/MctrCreateForm/getRgProjToPromptLOV', 'GET', createmctrlov2, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrActiveProjectsToPromptGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#activeProjToPromptokBtn').click(function () {
        var rowID = $('#rowId').val();
        var py_cy_status = $('#py_cy_status').val();
        var account_to = rowObject.ACCOUNT;
        var bum_cd7_to = rowObject.BUS_UNIT_MGMT_CD7;
        var global_account_to = $('#' + rowID + '_ACCOUNT_TO').attr('value');
        var period_to = new Date($('#PeriodTo').val());
        var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val();
        var wpd_to = $('#' + rowID + '_WPD_TO').val();
        var param = [];
        if (rowObject == '') {
            mctrObj.showDialog($("#dialog-box"), 'a value was not selected from list.', "error");

        }
        else {
            if (global_account_to != '' && account_to != '' && account_to != '1200000') {
                //supports copy button feature where account was overriden.
                if (global_account_to == account_to) {
                    $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass('white');
                }
                else {
                    $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass('red');
                    $('#' + rowID + '_ACCOUNT_TO').val(global_account_to);

                }
            } else {
                $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass('white');
            }
            if (rowObject.ACTIVITY_STATUS == 'I' || rowObject.PROJECT_STATUS == 'I') {
                $('#' + rowID + '_ACTIVITY_ID_TO').attr('red-flag', 'Y');
                if (rowObject.ACTIVITY_STATUS == 'I') {
                    $('#' + rowID + '_ACTIVITY_ID_TO').removeClass().addClass('orange');
                    $('#' + rowID + '_ACTIVITY_ID_TO').attr('red-flag', 'Y');

                } else {
                    $('#' + rowID + '_ACTIVITY_ID_TO').removeClass().addClass('white');
                }

                if (rowObject.PROJECT_STATUS == 'I') {
                    $('#' + rowID + '_PROJECT_ID_TO').removeClass().addClass('orange');
                }
                else {
                    $('#' + rowID + '_PROJECT_ID_TO').removeClass();
                }
            }
            else {
                $('#' + rowID + '_ACTIVITY_ID_TO').attr('red-flag', 'N');
                $('#' + rowID + '_ACTIVITY_ID_TO').removeClass().addClass('white');
                $('#' + rowID + '_PROJECT_ID_TO').removeClass();
                if (rowObject.ACC_EFF_DT > period_to || rowObject.PROJ_EFF_DT > period_to) {
                    mctrObj.showDialog($("#dialog-box"), 'warning activity and/or project date is greater than oh base year. pick earlier entry if available.', "warning");
                }
            }
            //activity_status = null;
            // project_status  = null;

            if (account_to != '') {
                if ((py_cy_status == 'PY' && account_to != '') && ((account_to.match('^6')) || (account_to.match('^7')) || (account_to.match('^8')))) {
                    $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass('red');
                    mctrObj.showDialog($("#dialog-box"), 'warning - accounts starting with 6, 7, 8 not allowed for prior year', "warning");
                }
                //set bum_cd7_to_orig field value here.
                $('#' + rowID + '_BUM_CD7_TO_ORIG').val(rowObject.BUS_UNIT_MGMT_CD7);

                var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));
                var mctrLineItem = $.extend(grid1, grid2, grid3);
                param.push(mctrLineItem);
                mctrLineItem.BUM_CD7_TO = rowObject.BUS_UNIT_MGMT_CD7;
                var mctrCreateFormq = $('#form').serialize();
                var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                var mctrCreateForm = $.extend({ mctrLineItem: param }, mctrCreateFromJson);
                mctrCreateForm.fyear = $('#fyear').val();
                $.ajax({
                    url: getBaseUrl('/MctrCreateForm/mctrLineItembutProjToWhenButtonPressedOpenLOV'),
                    type: 'POST',
                    data: mctrCreateForm,
                    success: function (data) {
                        if (data != '') {
                            if (data.V_Count['bumcount'] > 0) {
                                //bum_cd7_to = bum_cd7_from;
                                $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_FROM').val());
                            }
                            if (proj_trans_type_to == 'LBR') {
                                if (data.V_Count['wpdcount'] > 0) {
                                    $('#' + rowID + '_WPD_TO').val('IN');
                                    $('#' + rowID + '_WPD_TO').removeClass();
                                }
                                else if ($('#' + rowID + '_WPD_TO').val() != '' && $('#' + rowID + '_WPD_TO').val() == 'IN') {
                                    $('#' + rowID + '_WPD_TO').val('')
                                    $('#' + rowID + '_WPD_TO').removeClass();
                                }

                            }

                            else {
                                if (wpd_to != '' && (proj_trans_type_to != 'REQ')) {
                                    $('#' + rowID + '_WPD_TO').val('')
                                    $('#' + rowID + '_WPD_TO').removeClass();
                                }
                            }
                        }
                    }
                });
            }
            //}
            //till here ajax call
            if (rowObject.CONTRACT_NUM != $('#' + rowID + '_CONTRACT_NUM_FROM').val()) {
                $('#' + rowID + '_CONTRACT_NUM_TO').removeClass().addClass('blue_on_gray');
            }
            else {
                $('#' + rowID + '_CONTRACT_NUM_TO').removeClass();
            }
            if ($('#' + rowID + '_BUM_CD7_TO').val() != $('#' + rowID + '_BUM_CD7_TO_ORIG').val()) {
                $('#' + rowID + '_BUM_CD7_TO').removeClass().addClass('blue_on_white');
                $('#' + rowID + '_BUM_CD7_TO_ORIG').removeClass().addClass('blue_on_gray');
            }
            else {
                $('#' + rowID + '_BUM_CD7_TO').removeClass();//.addClass('black_on_white');
                $('#' + rowID + '_BUM_CD7_TO_ORIG').removeClass();
            }

        }

        $('#formOrToFlag').val('To');
        $('#' + rowID + '_ACCOUNT_TO').val(rowObject.ACCOUNT);
        $('#' + rowID + '_WORK_BUGL_TO').val(rowObject.BUSINESS_UNIT_GL);
        $('#' + rowID + '_PROJECT_ID_TO').val(rowObject.PROJECT_ID);
        $('#' + rowID + '_CONTRACT_NUM_TO').val(rowObject.CONTRACT_NUM);
        $('#' + rowID + '_BUM_CD7_TO').val(rowObject.BUS_UNIT_MGMT_CD7);
        $('#' + rowID + '_CUST_TYPE_CD7_TO').val(rowObject.CUSTOMER_TYPE_CD7);
        $('#mctrModalLarge').modal("hide");
        $.each($('.bootbox'), function (i, obj) {
            $(obj).modal('hide');
        })
        $('.bootbox-close-button').click();

    })
});