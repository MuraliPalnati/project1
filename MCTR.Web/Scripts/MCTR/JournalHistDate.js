$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject;
    var selectRowFn = function (rowid, status,obj) {
        rowObject = $('#' + rowid).find('td[aria-describedby="jHDatesGrid_DATE_JOURNAL"]').attr('title');
    };

    var columnNames = ['Date Journeyed', 'Jrnl Count'];
    var colModel = [{ key: false, name: 'DATE_JOURNAL', index: 'DATE_JOURNAL', width: 360, editable: false, search: true, stype: 'text', formatter: utcDateFormatter },//, formatoptions: { srcformat: 'd-m-Y', newformat: 'd-M-Y' }
                        { key: false, name: 'count', index: 'count', width: 200, editable: false }];
    mctrObj.CreateJqGrid('jHDatesGrid', '/JrnlHist/getRgJhistDates', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, null, null, null, 'pag');
    $('#jHDatesGrid').setGridParam('pager', null);
    $('#okBtn').click(function () {
        $('#selectedJrnlDate').val(rowObject);
        $('#mctrModal').modal('hide');
        $('#selectedJrnlDate').change();
    })

    function utcDateFormatter(cellvalue, options, rowObject) {
        if (cellvalue) {
            return moment(cellvalue).utc().format("DD-MMM-YYYY");
        } else {
            return '';
        }
    }
});
