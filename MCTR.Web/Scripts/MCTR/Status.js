$(document).ready(function () {
    var mctrObj = new MCTR();

    var columnNames = ['Status', 'Description'];
    var colModel = [{ name: 'STATUS_ID', index: 'STATUS_ID', classes: 'cell', stype: 'text', editable: false },
        { name: 'STATUS_DESCR', index: 'STATUS_DESCR', classes: 'cell', editable: false }];
    mctrObj.CreateJqGrid('tblJQGrid', '/Status/StatusGet', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', '', null, null, null, null, '#pager');
    $('#tblJQGrid').navGrid('#pager', { edit: false, add: false, del: false, search: true, refresh: true });
});
