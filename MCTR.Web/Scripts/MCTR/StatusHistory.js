$(document).ready(function () {
    var mctrObj = new MCTR();
    var columnNames = ['Date Time Entered', 'Date Time Left', 'Prior Status', 'Next Status', 'Description'];
    var colModel = [{ key: false, name: 'Date_Time_Entered', index: 'Date_Time_Entered', classes: 'uppercase', width: 130, editable: true, formatter: 'date', formatoptions: { srcformat: "d/m/Y", newformat: "d-M-Y H:i:s" } },
        { key: false, name: 'Date_Time_Left', index: 'Date_Time_Left', editable: false,classes: 'uppercase', width: 130, align: "center", formatter: 'date', formatoptions: { srcformat: "d/m/Y", newformat: "d-M-Y H:i:s" } },
        { key: false, name: 'Prior_Status', index: 'Prior_Status',classes: 'uppercase', editable: false, width: 80, align: "center" },
        { key: false, name: 'Next_Status', index: 'Next_Status',classes: 'uppercase', editable: false, width: 80, align: "center" },
        { key: false, name: 'Status_Descr', index: 'Status_Descr', editable: false, width: 150, align: "left" }
    ];
    
    mctrObj.CreateJqGrid('jQGrid', '/StatHistBl/mctrStatusHistMctrStatusHistOnLoad', 'GET', { mctrNo: $('#MctrNo').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', null, null, null, null,  '#statusHistPager');


    $('.stat-hist-modal-body').append('<iframe id="downloadFrame" style="display:none"></iframe>');
    $('#dwnloadBtn').click(function () {
            // mctrObj.ajaxOptions('/MctrAttachBl/mctrAttachattachViewFileWhenButtonPressed?mctrNo=' + $('#MCTR_NO').val() + '&attachNo=' + $('#' + $(event.target).attr('rowID') + '_ATTACH_NO').val() + '&fileName=' + $('#' + $(event.target).attr('rowID') + '_ATTACH_FILENAME').val(), 'POST', null, successFn, null)
        $('#downloadFrame').attr('src', getBaseUrl('/StatHistBl/mctrDownload') + '?mctrNo=' + $('#Mctr_No').val());

    });
       // mctrObj.ajaxOptions('/StatHistBl/mctrDownload', 'Get', null, null, null);
    
});