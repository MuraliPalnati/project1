$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        rowObject["ReasonCode"] = $('#mctrReasonCodeGrid').find('#' + rowid).find('td[aria-describedby="mctrReasonCodeGrid_REASON_CODE"]').attr('title');
    };
    var columnNames = ['Code','Reason Description'];
    var colModel = [{ key: false, name: 'REASON_CODE', index: 'REASON_CODE', editable: false,width:165 ,search :true},
    { key: false, name: 'REASON_DESCR', index: 'REASON_DESCR', editable: false, width: 400 }];

    mctrObj.CreateJqGrid('mctrReasonCodeGrid', '/MctrCreateForm/getRgReasonLOVJson', 'GET', { origBu: $("#OrigBu").val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrReasonCodeGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#ReasonCodeokBtn').click(function () {
        $("#ReasonCode").val(rowObject.ReasonCode);
        $("#dialog-box").hide();
        if ($('#ReasonCode').val() == "") {
            mctrObj.showDialog($("#dialog-box"), "A value was not selected from list.","error");
        }
        $('#mctrModal').modal('hide');
    })
});