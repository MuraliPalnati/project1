$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrAprvlRejectGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };

var columnNames = ['RejectCode', 'RejectReason'];
var colModel = [{ key: false, name: 'REJECT_CODE', index: 'REJECT_CODE', sortable: false, editable: false },
    { key: false, name: 'REJECT_REASON', index: 'REJECT_REASON', editable: false, sortable: false }
];
mctrObj.CreateJqGrid('mctrAprvlRejectGrid', '/MctrCreateForm/getRgLOVRejectjson', 'GET', { origBu: $("#OrigBu").val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);

$('#okApplBtn').click(function () {
    var id = $('#approverId').val();
    $('#' + id).parentsUntil('tr').siblings().find('input').addClass('invalid');
    $('#' + id).addClass('invalid');
    $('#RejectCode').val(rowObject.REJECT_CODE);
    $('.bootbox').modal("hide");
});
});