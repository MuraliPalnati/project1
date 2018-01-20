$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var mctrLineItem = {};
    var rowID = $('#rowId').val();
    //var rowData = $('#ClassCodeFromGrid').jqGrid('getRowData', rowid);
    var param = [];
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));
    mctrLineItem = $.extend(grid1, grid2, grid3);
    param.push(mctrLineItem);
    var mctrCreateFormq = $('#form').serialize();
    var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
    var mctrCreateForm = $.extend({ mctrLineItem: param }, mctrCreateFromJson);
    mctrCreateForm.py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
    mctrCreateForm.OrigBu = $('#OrigBu').val();
    mctrCreateForm.py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
    mctrCreateForm.OrigBu = $('#OrigBu').val();
    if (mctrCreateForm.py_cy_status == 'PY' && parseInt($('#fyear').val().trim()) > 2007 && $('#' + rowID + '_AFFILIATE_FROM') != '') {
        mctrLineItem.SETID = $('#' + rowID + '_AFFILIATE_FROM').val();
    }
    else {
        mctrLineItem.SETID = $('#OrigBu').val();
    }


    var selectRowFn = function (rowid, status, obj) {

        var rowData = $('#listClassCodeFromGrid').jqGrid('getRowData', rowid);
        //rowObject['#' + rowId + '_CLASS_CD_FROM'] = $('#rowid').find('td[aria-describedby="listClassCodeFromGrid_CLASS_CD7"]').attr('title');
        rowObject = rowData;

    };
    var columnNames = ['Class', 'PTT', 'ABU', 'RSC', 'Eff Date', 'Eff Status', 'Description'];
    var colModel = [
        { key: false, name: 'CLASS_CD7', index: 'CLASS_CD7', width: 50, editable: true,search:true },
        { key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', width: 50, editable: true },
        { key: false, name: 'SETID', index: 'SETID', width: 50, editable: true },
        { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', width: 50, editable: true },
        { key: false, name: 'EFFDT', index: 'EFFDT', width: 100, editable: true, classes: 'uppercase',formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' } },
        { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 50, editable: true },
        { key: false, name: 'DESCR', index: 'DESCR', width: 180 , editable: true }
    ];
    mctrObj.CreateJqGrid('listClassCodeFromGrid', '/MctrCreateForm/getRgListClassCodeFromLOVJson', 'POST', mctrCreateForm, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#listClassCodeFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#listClassCodeFromOkBtn').click(function () {
        var rowID = $('#rowId').val();
        $('#' + rowID + '_CLASS_CD_FROM').val(rowObject.CLASS_CD7);
        $('#' + rowID + '_CLASS_CD_FROM').attr('value',rowObject.CLASS_CD7);
        mctrLineItem.CLASS_CD_FROM = rowObject.CLASS_CD7;
        param.push(mctrLineItem);
        var mctrCreateFormq = $('#form').serialize();
        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
        var mctrCreateForm = $.extend({ mctrLineItem: param }, mctrCreateFromJson);
        mctrCreateForm.py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
        mctrCreateForm.OrigBu = $('#OrigBu').val();
        //if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
        //    v_setid = $('#' + rowID + '_AFFILIATE_FROM').val();
        //} else {
        //    v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();
        //}
        if ($('#' + rowID + '_CLASS_CD_FROM').val() != "" && $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() != "LBR") {

            $.ajax({
                url: getBaseUrl('/MctrCreateForm/mctrLineItemClassCditemOpenLOV'),
                type: 'POST',
                data: mctrCreateForm,
                success: function (data) {
                    if (data != '') {
                        $('#' + rowID + '_RSC_FROM').val(data.V_Countstring['rscfrom']);
                        $('#' + rowID + '_RSC_FROM').attr('value',data.V_Countstring['rscfrom']);

                    }
                },
                error: function () { }
            });
        }
        $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('white');
        mctrObj.searchGrid('listClassCodeFromGrid');

        $(this).parents('.bootbox').modal('hide');
    });
    $('#listClassCodecancelBtn').click(function () {
        $('#' + rowID + '_CLASS_CD_FROM').val($('#' + rowID + '_CLASS_CD_FROM').attr('value'));
    });
    mctrObj.searchGrid('listClassCodeFromGrid');
});