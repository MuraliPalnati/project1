$(document).ready(function () {
    $("#find-button").on("click", function () {
        var bemsID = $('#BemsId').val();
        var buUnit = $('#BuUnit').val();
        var deptNo = $('#Depart').val();
        var lastName = $('#LastName').val();
        var url = "/RoleListNewuser/emplListbutFindWhenButtonPressed?lastName=" + lastName + "&bemsId=" + bemsID + "&deprtId=" + deptNo + "&buUnit=" + buUnit;
        $("#jGrid").jqGrid('setGridParam', { url: url });
        $("#jGrid").trigger("reloadGrid");
    });

    function actionButtonFormatter(cellvalue, options, rowObject) {
        return '<button>Goto</button>';
    }


    $("#jGrid").jqGrid({
        url: "/RoleList/roleListDataonLoad",
        datatype: 'json',
        mtype: 'Get',
        colNames: ['Id', 'bems', 'LastName', 'FirstName', 'BU', 'AcctgLocCdm', 'deptno', 'LastLogon', 'LastLogonDays', 'active', 'AdminRole', 'FinControlRole', 'AccountantRole', 'LbrAcctRole', 'MatlAcctRole', 'CostAcctRole', 'SrAcctRole', 'GoTo'],
        colModel: [{ key: true, hidden: true, name: 'Id', index: 'Id',      editable: true },
        { key: false, name: 'bems',  index: 'bems',  editable: true, search: true },
        { key: false, name: 'last_name',   index: 'last_name',   editable: true, search: false },
        { key: false, name: 'first_name', index: 'first_name', editable: true },
        { key: false, name: 'bus_unit', index: 'bus_unit', editable: true },
        { key: false, name: 'acctg_loc_cdm', index: 'acctg_loc_cdm', editable: true },
        { key: false, name: 'deptno',   index: 'deptno',   editable: true },
        { key: false, name: 'last_logon',  index: 'last_logon', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, editable: true, },
        { key: false, name: 'last_logon_days',  index: 'last_logon_days',  editable: false },
        { key: false, name: 'active' , index: 'active' ,  editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { key: false, name: 'admin_role',   index: 'admin_role',   editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { key: false, name: 'accountant_role', index: 'accountant_role', editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { key: false, name: 'fin_control_role', index: 'fin_control_role', editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { key: false, name: 'matl_acct_role', index: 'matl_acct_role', editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { key: false, name: 'lbr_acct_role', index: 'lbr_acct_role', editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { key: false, name: 'cost_acct_role',   index: 'cost_acct_role',   editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { key: false, name: 'sr_acct_role', index: 'sr_acct_role', editable: true, width: 70, align: "center", formatter: "checkbox", formatoptions: { disabled: false } },
        { name: 'GoTo', index: 'GoTo', resizable: false, search: false, align: 'center', sortable: false, formatter: actionButtonFormatter }],
        pager: jQuery('#pager'),                          
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        height: '100%',
        viewrecords: true,
        caption: 'EmployeeList',
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
        multiselect: false,
    }).navGrid('#pager', { edit: true, add: true, del: true, search: false, refresh: false },
       {
           // edit options
           zIndex: 100,
           url: "/RoleListNewuser/RoleNewUserList",
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
           url: "/RoleListNewuser/roleListNewuserWhenNewFormInstance",
           closeOnEscape: true,
           closeAfterAdd: true,
           afterComplete: function (response) {
               if (response.responseText) {
                   //alert(response.responseText);
               }
           }
       },
       {
           // delete options
           zIndex: 100,
           url: "/RoleListNewuser/RoleNewUserList",
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


    
});
