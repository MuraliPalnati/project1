$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var rowId = $('#rowId').val();
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));
    var mctrLineItem = $.extend(grid1, grid2, grid3);
    var py_cy_status = parseInt($('#fyear').val().trim()) == (new Date).getFullYear() ? 'CY' : 'PY';
    if (py_cy_status == 'PY' && parseInt($('#fyear').val().trim()) > 2007 && $('#' + rowId + '_AFFILIATE_TO') != '') {
        mctrLineItem.SETID = $('#' + rowId + '_AFFILIATE_TO').val();
    }
    else {
        mctrLineItem.SETID = $('#OrigBu').val();
    }
    mctrLineItem.PERIOD_TO = $('#PeriodTo').val();
    mctrLineItem.COW = $('#COW').val();
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#ListWorkLocToGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Location', 'ABU'];
    var colModel =
        [
        { key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', width: 260, editable: true, search: true },
        { key: false, name: 'SETID', index: 'SETID', width: 300, editable: true }
        ];
    mctrObj.CreateJqGrid('ListWorkLocToGrid', '/MctrCreateForm/getRgListWorkLocToLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#ListWorkLocToGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#ListWorkLocToOkBtn').click(function () {
        var rowId = $('#rowId').val();
        var work_loc_to = $('#' + rowId + '_WORK_LOC_TO').val();
        var global_work_loc_to = $('#' + rowId + '_WORK_LOC_TO').attr('value');
        var global_work_dept_to = $('#' + rowId + '_WORK_DEPT_TO').attr('value');
        var work_dept_red_flg_from = ''
        var proj_trans_type_from = $('#' + rowId + '_PROJ_TRANS_TYPE_FROM').val();
        var proj_trans_code_from = $('#' + rowId + '_PROJ_TRANS_CODE_FROM').val();
        var amount_from = $('#' + rowId + '_AMOUNT_FROM').val();
        var amount_to = $('#' + rowId + '_AMOUNT_TO').val();
        var class_cd_from = $('#' + rowId + '_CLASS_CD_FROM').val();
        var global_class_cd_from = $('#' + rowId + '_CLASS_CD_FROM').attr('value');
        var rsc_to = $('#' + rowId + '_RSC_TO').val();
        var global_rsc_to = $('#' + rowId + '_RSC_TO').attr('value');
        var work_dept_to = $('#' + rowId + '_WORK_DEPT_TO').val();
        var work_loc_from = $('#' + rowId + '_WORK_LOC_FROM').val();
        var home_loc_from = $('#' + rowId + '_HOME_LOC_FROM').val();
        var work_pool_to = $('#' + rowId + '_WORK_POOL_TO').val();
        var home_pool_from = $('#' + rowId + '_HOME_POOL_FROM').val();
        var labor_rate_cd7_from = $('#' + rowId + 'LABOR_RATE_CD7_FROM').val();
        var dept_status = '';
        var closeFlag = false;
        if ((work_loc_to == '' && global_work_loc_to != '') || (!$.isEmptyObject(rowObject))) {
            $('#' + rowId + '_WORK_LOC_TO').removeClass().addClass("white");
            if ($('#' + rowId + '_WORK_DEPT_TO').val() != '') {
                //if (rowObject.EFF_STATUS == 'I' && work_dept_to != '') {
                //    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag',' Y');
                //    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass("orange");
                //}
                //else {
                //    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag',' N');
                //    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass("white");
                //}

                if (proj_trans_type_from != 'LBR') {
                    $('#' + rowId + '_RSC_TO').val(global_rsc_to);
                    $('#' + rowId + '_RSC_TO').attr('value', global_rsc_to);
                    closeFlag = true;
                }
                else {
                    if (global_rsc_to != '') {
                        if (global_rsc_to != $('#' + rowId + '_RSC_TO').val() || $('#' + rowId + '_RSC_TO').val() == '') {
                            bootbox.confirm("Do you want to accept LBR Work Dept RSC overriding LBR Home Dept RSC? Click YES button to accept.", function (result) {
                                if (!result) {
                                    $('#' + rowId + '_RSC_TO').val(global_rsc_to);
                                    $('#' + rowId + '_RSC_TO').attr('value', global_rsc_to);
                                    closeFlag = true;
                                }
     
                            });

                        }
                    }
                }
            }
            else {
                $('#' + rowId + '_WORK_POOL_TO').val("");
                $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', ' N');
                $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass("white");
                closeFlag = true;
            }
        }
        $('#' + rowId + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);

        if (closeFlag == true) {
            $('.bootbox').modal("hide");
        }
    });

    $('#ListWorkLoccancelBtn').click(function () {
        $('#' + rowId + '_WORK_LOC_TO').val($('#' + rowId + '_WORK_LOC_TO').attr('value'));
    });

    mctrObj.searchGrid('ListWorkLocToGrid');

});


