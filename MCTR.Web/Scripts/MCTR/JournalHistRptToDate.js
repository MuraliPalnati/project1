$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject;
    var selectRowFn = function (rowid, status, obj) {
        rowObject = $('#' + rowid).find('td[aria-describedby="jHDatesGrid_DATE_JOURNAL"]').attr('title');
    };

    var columnNames = ['Date Journal', 'MCTR Count'];
    var colModel = [{ key: false, name: 'DATE_JOURNAL', index: 'DATE_JOURNAL', width: 360, editable: false, stype: 'text', formatter: utcDateFormatter},
                        { key: false, name: 'MCTR_COUNT', index: 'MCTR_COUNT', width: 200, editable: false }];
    var param = {}
    param['ORIG_BU'] = $('#bUGLFrom').val();
    param['BEMS_FIN_CTL'] = $('#finCntrlBEMS').val();
    param['BEMS_ORIG'] = $('#origBEMS').val();
    //var dateVar = $('#fromDate').val();
    //var dsplit = dateVar.split("/");
    //var date = new Date(dsplit[0], dsplit[1] - 1, dsplit[2]);
    param['date'] = $('#fromDate').val();

    mctrObj.CreateJqGrid('jHDatesGrid', '/MctrJrnlByDateRptBl/getRgToDateJSON', 'POST', param, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, null, null, null, '');
    $('#jHDatesGrid').setGridParam('pager', null);
    $('#okBtn').click(function () {
        $('#toDate').val(rowObject);
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