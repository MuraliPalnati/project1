$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject;
    var selectRowFn = function (rowid, status, obj) {
        rowObject = $('#' + rowid).find('td[aria-describedby="jHDatesGrid_DATE_JOURNAL"]').attr('title');
    };

    var columnNames = ['Journal Date', 'MCTR Count'];
    var colModel = [{ key: false, name: 'DATE_JOURNAL', index: 'DATE_JOURNAL', width: 360, editable: false, search: true, stype: 'text', formatter: utcDateFormatter },
                        { key: false, name: 'MCTR_COUNT', index: 'MCTR_COUNT', width: 200, editable: false }];
    var param = {}
    param['ORIG_BU'] = $('#bUGLFrom').val();
    param['BEMS_FIN_CTL'] = $('#finCntrlBEMS').val();
    param['BEMS_ORIG'] = $('#origBEMS').val();
    
    mctrObj.CreateJqGrid('jHDatesGrid', '/MctrJrnlByDateRptBl/getRgFromDateJson', 'POST', param, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, null, null, null, '');
    $('#jHDatesGrid').setGridParam('pager', null);
    $('#okBtn').click(function () {
        $('#fromDate').val(rowObject);
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