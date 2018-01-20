

$(document).ready(function () {
    var mctrObj = new MCTR();
    var btnFormatter = function (cellvalue, options, rowObject) {
        return '<a  row-id="' +options.rowId + '" id=' +options.rowId + '_selectbtn class="btn btn-primary btn-xs">Go To</a>';
    }

    var gridCompleteFunction = function () {
        $('a[id*=_selectbtn]').click(function (e, obj, options) {

            var rowID = $(this).attr('row-id');
            var bemsID = $('#' + rowID).children('[aria-describedby=jGrid_BEMS_ID]').attr('title');
            if (bemsID.length == 7) {
                location.href = getBaseUrl('/Role/roleOnLoad') + '?bemsID=' + bemsID + '&&newUser=true';

            }
            else {

                $('#jGrid').jqGrid('delRowData', rowID);
            }
        });
    };

    $("#find-button").on("click", function () {
        var filteredObjs = filterGrid();
        $("#jGrid").clearGridData(true);
        $("#jGrid").jqGrid('setGridParam', {
            datatype: 'local',
            data: filteredObjs
        }).trigger("reloadGrid");
    });

    $("#jGrid").jqGrid({
        url:getBaseUrl("/RoleListNewuser/RoleNewUserList"),
        datatype: 'json',
        mtype: 'Get',
        colNames: ['Id', 'BEMS', 'LastName', 'FirstName', 'BU', 'Loc', 'Dept', ''],
        colModel: [{ key: true, hidden: true, name: 'Id', index: 'Id', editable: true },
        { key: false, name: 'BEMS_ID', index: 'BEMS_ID', editable: true, search: true },
        { key: false, name: 'LAST_NAME', index: 'LAST_NAME', editable: true, search: false },
        { key: false, name: 'FIRST_NAME', index: 'FIRST_NAME', editable: true },
        { key: false, name: 'COMPONENT', index: 'COMPONENT', editable: true },
        { key: false, name: 'ACCTG_LOC_CDM', index: 'ACCTG_LOC_CDM', editable: true },
        { key: false, name: 'DEPTNO', index: 'DEPTNO', editable: true },
        { name: 'GoTo', index: 'GoTo', resizable: false, search: false, align: 'center', width: 50, sortable: false, formatter: btnFormatter }],
        pager: jQuery('#pager'),
        rowNum: 10,
        height: '100%',
        viewrecords: true,
        gridComplete: gridCompleteFunction,
        pgtext: null,
        //caption: 'EmployeeList',
        //cellEdit:true,
        emptyrecords: 'No records to display',
        jsonReader: {
            page: "page",
            total: "total",
            records: "records",
            rows: "rows",
            Id: "0"
        },
        autowidth: true,
        multiselect: false
    }).navGrid('#pager', { edit: false, add: false, del: false, search: false, refresh: true },
       {
           // edit options
           zIndex: 100,
           url: getBaseUrl("/RoleListNewuser/RoleNewUserList"),
           closeOnEscape: true,
           closeAfterEdit: true,
           recreateForm: true,
           afterComplete: function (response) {
               if (response.responseText) {


               }
           }
       },
       {
           // add options
           zIndex: 100,
           url: getBaseUrl("/RoleListNewuser/roleListNewuserWhenNewFormInstance"),
           closeOnEscape: true,
           closeAfterAdd: true,
           afterComplete: function (response) {
               if (response.responseText) {
                  // alert(response.responseText);
               }
           }
       },
       {
           // delete options
           zIndex: 100,
           url: getBaseUrl("/RoleListNewuser/RoleNewUserList"),
           closeOnEscape: true,
           closeAfterDelete: true,
           recreateForm: true,
           msg: "Are you sure you want to delete this task?",
           afterComplete: function (response) {
               if (response.responseText) {
                   //alert(response.responseText);
               }
           }
       });

    var filterGrid = function () {
        var searchRowData = { BEMS_ID: $('#BemsId').val(), LAST_NAME: $('#LastName').val(), DEPTNO: $('#Depart').val(), COMPONENT: $('#BuUnit').val() };
        var filteredObj = $('#jGrid').getGridParam('userData');
        var filter = function (i, o) {
            filteredObj = $.grep(filteredObj, function (obj) {
                return String(obj[i]).toUpperCase().search(o.toUpperCase()) != -1;
            });
        };

        $.each(searchRowData, function (i, o) {
            if (o != '') {
                filter(i, o);
            }
        });
        return filteredObj;
    };

});
