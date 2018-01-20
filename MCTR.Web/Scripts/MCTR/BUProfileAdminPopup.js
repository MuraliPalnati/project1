$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
       // rowObject = $('#' + rowid).find('td[aria-describedby="jHDatesGrid_DATE_JOURNAL"]').attr('title');
        rowObject["LastName"] = $('#' + rowid).find('td[aria-describedby="mctrAdminGrid_LAST_NAME"]').attr('title');
        rowObject["BEMS"] = $('#' + rowid).find('td[aria-describedby="mctrAdminGrid_BEMS_ID"]').attr('title');
    };

    var columnNames = ['Last Name','First Name', 'BEMS','BU','Loc','Dept','Mail Code','Work Phone'];
    var colModel = [{ key: false, name: 'LAST_NAME', index: 'LAST_NAME', width:100, editable: false,search:true },
        { key: false, name: 'FIRST_NAME', index: 'FIRST_NAME', width: 100, editable: false },
        { key: false, name: 'BEMS_ID', index: 'BEMS_ID', width: 60, editable: false },
        { key: false, name: 'COMPONENT', index: 'COMPONENT', width:40, editable: false },
        { key: false, name: 'ACCTG_LOC_CDM', index: 'ACCTG_LOC_CDM', width: 40, editable: false },
        { key: false, name: 'DEPTNO', index: 'DEPTNO', width: 50, editable: false },
        { key: false, name: 'MAIL_CODE', index: 'MAIL_CODE', width: 80, editable: false },
        { key: false, name: 'WORK_PHONE', index: 'WORK_PHONE', width: 100, editable: false }];
    var data =  $('#Business_Unit').val();

    mctrObj.CreateJqGrid('mctrAdminGrid', '/BuProfile/getRgAdminLOVList', 'GET', { bUnit: $('#bUnit').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);

    //$("#mctrAdminGrid").jqGrid('setGridParam', { postData: data, });

    $("#mctrAdminGrid").navGrid('#pager', { add: false, edit: false, del: false, search: true, refresh: true },
                {
                    // search options

                    zIndex: 100,
                    url: getBaseUrl("/BuProfile/Search"),
                    closeOnEscape: true,
                    mtype: "POST"
                },
        {
        },
        {
        },
        { width: 350, multipleSearch: true }

        );

    $('#okBtn').click(function () {
        var rowId = $('#rowId').val();
        if ($('#bUnit').val() == "undefined") {
            $('#Bems_Admin').val(rowObject.BEMS);
            $('#LastName').val(rowObject.LastName);
        }
        else {
        $("#jGrid").jqGrid("setCell", rowId, "Bems_Admin", rowObject.BEMS);
            $("#jGrid").jqGrid("setCell", rowId, "LastName", rowObject.LastName);
        }
        $('#mctrModal').modal('hide');
    })
});