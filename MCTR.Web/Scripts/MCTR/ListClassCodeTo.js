$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var rowId = $('#rowId').val();

    var param = [];
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));
    mctrLineItem = $.extend(grid1, grid2, grid3);
    param.push(mctrLineItem);
    var mctrCreateFormq = $('#form').serialize();
    var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
    var mctrCreateForm = $.extend({
        mctrLineItem: param
    }, mctrCreateFromJson);
    mctrCreateForm.py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
    mctrCreateForm.OrigBu = $('#OrigBu').val();
    if (mctrCreateForm.py_cy_status == 'PY' && parseInt($('#fyear').val().trim()) > 2007 && $('#' + rowId + '_AFFILIATE_TO') != '') {
        mctrLineItem.SETID = $('#' + rowId + '_AFFILIATE_TO').val();
    }
    else {
        mctrLineItem.SETID = $('#OrigBu').val();
    }

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#ListclasscodetoGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Class', 'PTT', 'ABU', 'RSC', 'Eff Status', 'Eff Date', 'Description'];
    var colModel = [{ key: false, name: 'CLASS_CD7', index: 'CLASS_CD7', width: 55, editable: false, search: true },
        { key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', width: 65, editable: true },
        { key: false, name: 'SETID', index: 'SETID', width: 100, editable: true },
        { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', width: 150, editable: true },
    { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 50, editable: true },
        { key: false, name: 'EFFDT', index: 'EFFDT', width: 50, editable: true, classes: 'uppercase',formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' } },
        { key: false, name: 'DESCR', index: 'DESCR  ', width: 100, editable: true },
    ];
    mctrObj.CreateJqGrid('ListclasscodetoGrid', '/MctrCreateForm/getRgListClassCodeToLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#ListclasscodetoGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#ListclasscodetoOkBtn').click(function () {
        var rowId = $('#rowId').val();
        var global_hold_class_cd_to = $('#' + rowId + '_CLASS_CD_TO').attr('value');
        if (($.isEmptyObject(rowObject))){
            $('#' + rowId + '_CLASS_CD_TO').val(global_hold_class_cd_to);

        }
        else {
            $('#' + rowId + '_CLASS_CD_TO').val(rowObject.CLASS_CD7);
            $('#' + rowId + '_CLASS_CD_TO').attr('value',rowObject.CLASS_CD7);
            $('#' + rowId + '_CLASS_CD_TO').removeClass().addClass("white");
            if ($('#' + rowId + '_CLASS_CD_TO').val() != "" && $('#' + rowId + '_PROJ_TRANS_TYPE_TO').val() != "LBR") {
                mctrLineItem.CLASS_CD_TO = rowObject.CLASS_CD7;
                param.push(mctrLineItem);
                var mctrCreateFormq = $('#form').serialize();
                var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                var mctrCreateForm = $.extend({ mctrLineItem: param }, mctrCreateFromJson);
                mctrCreateForm.py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
                mctrCreateForm.OrigBu = $('#OrigBu').val();

                $.ajax({
                    url: getBaseUrl('/MctrCreateForm/mctrLineItemclassCdToPostTextItemOpenLOV'),
                    type: 'POST',
                    data: mctrCreateForm,
                    success: function (data) {
                        if (data != '') {
                            $('#' + rowId + '_RSC_TO').val(data.V_Countstring['rscto']);
                            $('#' + rowId + '_RSC_TO').attr('value', data.V_Countstring['rscto']);

                        }
                    },
                    error: function () { }
                });
            }

            $(this).parents('.bootbox').modal('hide');
        }

    });

    $('#ListclasscodecancelBtn').click(function () {

        $('#' + rowId + '_CLASS_CD_TO').val($('#' + rowId + '_CLASS_CD_TO').attr('value'));
    });
    mctrObj.searchGrid('ListclasscodetoGrid');
});