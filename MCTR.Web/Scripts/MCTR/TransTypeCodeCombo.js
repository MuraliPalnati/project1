$(document).ready(function () {
    $('#searchValue').val($('#OrigBu').val());
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrTransTypeGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Trans Type', 'Trans Code', 'Stat Code', 'UOM'];
    var colModel = [{ key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', editable: false ,search:true},
        { key: false, name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', editable: false },
        { key: false, name: 'STATISTICS_CODE', index: 'STATISTICS_CODE', width: 115, editable: false },
       { key: false, name: 'UNIT_OF_MEASURE', index: 'UNIT_OF_MEASURE', editable: false },
   ];
    mctrObj.CreateJqGrid('mctrTransTypeGrid', '/MctrCreateForm/getRgTransFromJson', 'GET', {origBu : $('#OrigBu').val()}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);

    $('#mctrTransTypeokBtn').click(function () {
        
        var rowID = $('#rowId').val();
        
        var proj_trans_type_from =rowObject.PROJ_TRANS_TYPE ;
        var proj_trans_code_from = rowObject.PROJ_TRANS_CODE;
        var proj_trans_type_to=rowObject.PROJ_TRANS_TYPE;
        var v_hold_ptt_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
        var v_hold_ptc_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
        if (rowObject == '' && v_hold_ptt_from=='') {
            mctrObj.showDialog($("#dialog-box"), 'a value was not selected from list.', 'error');
        }
        else {
            $('#' + rowID + '_ttdValue').addClass('white');
            $('#' + rowID + '_yearValue').addClass('white');
            $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').removeClass();
            $('#' + rowID + '_PROJ_TRANS_TYPE_TO ').val(proj_trans_type_from);
            $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val(proj_trans_code_from);
            $('#' + rowID + '_STAT_CODE_TO').val($('#' + rowID + '_STAT_CODE_FROM').val());
            $('#' + rowID + '_UOM_TO').val($('#' + rowID + '_UOM_FROM').val());
            if (proj_trans_type_from == 'LBR' && (v_hold_ptt_from != 'LBR' || v_hold_ptt_from == '')) {
                //force user to review class code selection
                $('#' + rowID + '_CLASS_CD_FROM').val('');
                $('#' + rowID + '_CLASS_CD_TO').val('');

                if ($('#' + rowID + '_HOME_DEPT_FROM').val() != '') {
                    $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_HOME_DEPT_TO').val() != '') {
                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_BULK_FROM').val() != '') {
                    $('#' + rowID + '_BULK_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_BULK_TO').val() != '') {
                    $('#' + rowID + '_BULK_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_QUANTITY_FROM').val() != 0) {
                    $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('red');
                }
                else if ($('#' + rowID + '_AMOUNT_FROM').val() != 0) {
                    $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('red');
                }
                else if ($('#' + rowID + '_AMOUNT_TO').val() != 0) {
                    $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('red');
                }
                //set wpd_to if indirect accounting
                if ($('#' + rowID + '_ACCOUNT_TO').val() != '') {

                    var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
                    $.ajax({
                        url: '/MctrCreateForm/mctrLineItembutTransFromWhenButtonPressedOpenLOV',
                        type: 'POST',
                        data: {
                            account_to: account_to,
                            ptt: proj_trans_type_to
                        },
                        success: function (data) {
                            if (data != '') {
                                $('#' + rowID + '_WPD_TO').val(data.WPD_TO);
                            }
                        }
                    });
                }
                else if ($('#' + rowID + '_WPD_TO').val() != '' && $('#' + rowID + '_WPD_TO').val() == 'IN') {
                    $('#' + rowID + '_WPD_TO').val('');
                }
                $('#' + rowID + '_WPD_TO').removeClass();
            }
            else if (proj_trans_type_from == 'LBR' && v_hold_ptt_from == 'LBR') {
                //no further action taking when ptc = swapped between str && ots
                if (proj_trans_type_from == 'PRM' && (v_hold_ptc_from == 'STR' || v_hold_ptc_from == 'OTS')) {
                    $('#' + rowID + '_LABOR_RATE_CD7_FROM').val('00');
                    $('#' + rowID + '_LABOR_RATE_CD7_TO').val('00');
                    $('#' + rowID + '_QUANTITY_FROM').val('0');
                    $('#' + rowID + '_QUANTITY_TO').val('0');
                    if ($('#' + rowID + '_AMOUNT_FROM').val() != 0) {
                        $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('red');
                    }
                    else if ($('#' + rowID + '_AMOUNT_TO').val() != 0) {
                        $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('red');
                    }
                }
                else if ((proj_trans_type_from == 'STR' || proj_trans_type_from == 'OTS') && v_hold_ptc_from == 'PRM') {
                    $('#' + rowID + '_LABOR_RATE_CD7_FROM').val('');
                    $('#' + rowID + '_LABOR_RATE_CD7_TO').val('');
                    $('#' + rowID + '_QUANTITY_FROM').val('0');
                    $('#' + rowID + '_QUANTITY_TO').val('0');
                    $('#' + rowID + '_AMOUNT_FROM').val('0');
                    $('#' + rowID + '_AMOUNT_TO').val('0');
                    if ($('#' + rowID + '_HOME_DEPT_FROM').val() != '') {
                        $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass('red');
                    }
                    if ($('#' + rowID + '_HOME_DEPT_TO').val() != '') {
                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass('red');
                    }
                }
            }
            else if (v_hold_ptt_from == '' || v_hold_ptt_from == 'REQ') {
                if ($('#' + rowID + '_HOME_DEPT_FROM').val() != '') {
                    $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_HOME_LOC_FROM').val() != '') {
                    $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_WORK_DEPT_FROM').val() != '') {
                    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_WORK_LOC_FROM').val() != '') {
                    $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_CLASS_CD_FROM').val() != '') {
                    $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_RSC_FROM').val() != '') {
                    $('#' + rowID + '_RSC_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_WPD_FROM').val() != '') {
                    $('#' + rowID + '_WPD_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_BULK_FROM').val() != '') {
                    $('#' + rowID + '_BULK_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_HOME_DEPT_TO').val() != '') {
                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_HOME_LOC_TO').val() != '') {
                    $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_WORK_DEPT_TO').val() != '') {
                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_WORK_LOC_TO').val() != '') {
                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_CLASS_CD_TO').val() != '') {
                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_RSC_TO').val() != '') {
                    $('#' + rowID + '_RSC_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_WPD_TO').val() != '') {
                    $('#' + rowID + '_WPD_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_BULK_TO').val() != '') {
                    $('#' + rowID + '_BULK_TO').removeClass().addClass('red');
                }
            }
            else if (v_hold_ptt_from != proj_trans_type_from) {
                if ($('#' + rowID + '_CLASS_CD_FROM').val() != '') {
                    $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_RSC_FROM').val() != '') {
                    $('#' + rowID + '_RSC_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_WPD_FROM').val() != '') {
                    $('#' + rowID + '_WPD_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_BULK_FROM').val() != '') {
                    $('#' + rowID + '_BULK_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_CLASS_CD_TO').val() != '') {
                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('red');
                }
                if ($('#' + rowID + '_RSC_TO').val() != '') {
                    $('#' + rowID + '_RSC_TO').removeClass().addClass('red');
                }
                $('#' + rowID + '_WPD_TO').val('');
                $('#' + rowID + '_WPD_TO').removeClass();
                if ($('#' + rowID + '_BULK_TO').val() != '') {
                    $('#' + rowID + '_BULK_TO').removeClass().addClass('red');
                }
            }
            if (proj_trans_type_from != 'LBR' && $('#' + rowID + '_QUANTITY_FROM').val() != 0) {
                $('#' + rowID + '_QUANTITY_FROM').val('0');
                $('#' + rowID + '_QUANTITY_TO').val('0');
                if ($('#' + rowID + '_AMOUNT_FROM').val() != '') {
                    $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('red');
                }
            }
        }
        $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val(rowObject.PROJ_TRANS_TYPE);
        $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val(rowObject.PROJ_TRANS_CODE);
        $('#' + rowID + '_STAT_CODE_FROM').val(rowObject.STATISTICS_CODE);
        $('#' + rowID + '_UOM_FROM').val(rowObject.UNIT_OF_MEASURE);
        $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val(rowObject.PROJ_TRANS_TYPE);
        $('#' + rowID + '_PROJ_TRANS_CODE_TO').val(rowObject.PROJ_TRANS_CODE);
        $('#' + rowID + '_STAT_CODE_TO').val(rowObject.STATISTICS_CODE);
        $('#' + rowID + '_UOM_TO').val(rowObject.UNIT_OF_MEASURE);
       
        $('.bootbox').modal("hide");
    })
});