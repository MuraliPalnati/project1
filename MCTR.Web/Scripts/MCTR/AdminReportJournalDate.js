$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrWeeklyJrnlsGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Date Journeyed', 'ALL', 'EO&T'];
    var colModel = [{ key: false, name: 'date_journal', index: 'date_journal', width: 110, formatter: utcDateFormatter, classes: 'uppercase', editable: false, search: true },
        { key: false, name: 'mctr_ttl_count', index: 'mctr_ttl_count', width: 110, editable: false },
        { key: false, name: 'mctr_eot_count', index: 'mctr_eot_count', width: 110, editable: false }];

    mctrObj.CreateJqGrid('mctrWeeklyJrnlsGrid', '/MctrRptsAdmnBl/selectionbutToDateWhenButtonPressedOpenLOV', 'POST', {}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);

    $('#okBtn').click(function () {
        $('#JournalDate').val(rowObject.date_journal);
        //$('#BusinessUnit').val(rowObject.business_unit);
        $('#mctrModal').modal('hide');
    });
    function utcDateFormatter(cellvalue, options, rowObject) {
        if (cellvalue) {
            return moment(cellvalue).utc().format("DD-MMM-YYYY");
        } else {
            return '';
        }
    }
});