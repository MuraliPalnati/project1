$(document).ready(function () {
    var mctrObj = new MCTR();
    var fiscal_year = $('#fyear').val();
    var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        rowObject = $('#mctrappljrnlsidGrid').jqGrid('getRowData', rowid);
    };
    var columnNames = ['Appl_Jrnl_Id','Descr'];
    var colModel = [{ key: false, name: 'APPL_JRNL_ID', index: 'APPL_JRNL_ID',width:100, editable: false },
    { key: false, name: 'DESCR', index: 'DESCR', editable: false,width:165 }];

    mctrObj.CreateJqGrid('mctrappljrnlsidGrid', '/MctrCreateForm/getRgApplJson' , 'GET', { pycystatus :py_cy_status}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrappljrnlsidGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, { }, { }, { }, {});
    $('#okApplBtn').click(function () {
        $("#ApplJrnlId").val(rowObject.APPL_JRNL_ID);
        $('.bootbox').modal('hide');
    })

});
