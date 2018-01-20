
$(document).ready(function () {
    var mctrObj = new MCTR();
    var btnFormatter = function (cellvalue, options, rowObject) {
        //return '<a id=' + options.rowId + '_selectbtn class="btn btn-primary btn-xs" data-toggle="modal" data-target="#stackedModal" href="/Role/roleOnLoad?bemsID=' + options.bems + '" data-backdrop="static">Go To</a>';
        return '<a id=' + options.rowId + '_selectbtn class="btn btn-primary btn-xs" href="'+getBaseUrl("/Role/roleOnLoad")+'?bemsID=' + rowObject.bems + '">Go To</a>';
    }
    function colorformatter(cellvalue, options, rowObject) {
        var color = (cellvalue > 80) ? "red" : (cellvalue > 60)? "blue":"black" ;
        var cellHtml = "<span style='color:" + color + "' originalValue='" +
                                    cellvalue + "'>" + cellvalue + "</span>";

        return cellHtml;
    }
    $("#find-button").on("click", function () {
        var filteredObjs = filterGrid();
        $("#jGrid").clearGridData(true);
        $("#jGrid").jqGrid('setGridParam', {
            datatype: 'local',
            data: filteredObjs
        }).trigger("reloadGrid");   
    });

  


    $("#jGrid").jqGrid({
        url: getBaseUrl("/RoleList/roleListDataonLoad"),    
        datatype: 'json',
        mtype: 'Get',
        colNames: ['Id', 'BEMS', 'Last Name', 'First Name', 'BU', 'Loc', 'Dept', 'Last Logon', 'Days Since Last Logon', 'Actv', 'Admin', 'Fincl', 'Acct', 'Labr', 'Matl', 'Cost', 'Jrnl', ''],
        colModel: [{ key: true, hidden: true, name: 'Id', index: 'Id',      editable: false },
        { key: false, name: 'bems',  index: 'bems',  editable: false, search: true },
        { key: false, name: 'last_name', index: 'last_name', editable: false, search: true },
        { key: false, name: 'first_name', index: 'first_name', editable: false },
        { key: false, name: 'component', index: 'component', editable: false, search: true },
        { key: false, name: 'acctg_loc_cdm', index: 'acctg_loc_cdm', editable: false },
        { key: false, name: 'deptno', index: 'deptno', editable: false, search: true },
        { key: false, name: 'last_logon', index: 'last_logon', formatter: 'date', formatoptions: { srcformat: 'd-m-Y', newformat: 'd-M-Y' }, editable: false, },
        { key: false, name: 'last_logon_days',  index: 'last_logon_days',  editable: false,formatter:colorformatter },
        { key: false, name: 'active', index: 'active', width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true}},
        { key: false, name: 'admin_role', index: 'admin_role',  width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true } },
        { key: false, name: 'fin_control_role', index: 'fin_control_role', editable: false, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true } },
        { key: false, name: 'accountant_role', index: 'accountant_role', editable: false, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true } },
        { key: false, name: 'lbr_acct_role', index: 'lbr_acct_role', editable: false, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true } },
        { key: false, name: 'matl_acct_role', index: 'matl_acct_role', editable: false, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true } },
        { key: false, name: 'cost_acct_role', index: 'cost_acct_role', editable: false, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true } },
        { key: false, name: 'sr_acct_role', index: 'sr_acct_role', editable: false, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true } },
        {
            name: 'bems', index: 'GoTo', resizable: false, search: false, align: 'center', sortable: false, editable: true, formatter: btnFormatter}],
        pager: jQuery('#pager'),                          
        rowNum: 10,
        height: '100%',
        emptyrecords: 'No records to display',
        jsonReader: {
            page: "page",
            total: "total",
            records: "records",
            rows: "rows",
            Id: "0"
        },
        pgtext: null,
        loadonce: true
    })

    var filterGrid = function () {
        var searchRowData = { bems: $('#BemsId').val(), last_name: $('#LastName').val(), deptno: $('#Depart').val(), component: $('#BuUnit').val() };
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
