$(document).ready(function () {
    var mctrObj = new MCTR();
    $("#jGrid").jqGrid({
        url: getBaseUrl("/CustType/custTypeLists"),
        datatype: 'json',
        mtype: 'Get',
        ignoreCase: true,
        colNames: ['Id', 'Fiscal Year', 'Cust Type Cd', 'Cust Grp'],
        colModel: [{ key: false, hidden: true, name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', width: 300, editable: false },
        { key: false, name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', width: 300, editable: false },
        { key: false, name: 'CUSTOMER_TYPE_CD7', index: 'CUSTOMER_TYPE_CD7', width: 300, editable: false },
        { key: false, name: 'CUSTOMER_GRP', index: 'CUSTOMER_GRP', width: 300, editable: false }],
        pager: jQuery('#pager'),
        rowNum: 10,
        height: '100%',
        viewrecords: true,
        pgtext: null,
        loadonce: true,
        //cellEdit:true,
        emptyrecords: 'No records to display',
        jsonReader: {
            page: "page",
            total: "total",
            records: "records",
            rows: "rows",
            Id: "0"
        },
        multiselect: false
    }).navGrid('#pager', { edit: false, add: false, del: false, search: true, refresh: true },
         {
             // search options

             zIndex: 100,
             url:getBaseUrl( "/BuProfile/Search"),
             closeOnEscape: true,
             mtype: "POST"
         },
        {
            
        },


        {
            

        },
        { width: 350, multipleSearch: true },
        {
            // edit options
            zIndex: 100,
            url: getBaseUrl("/CustType/EditCustType"),
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: true,
            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), "The record has been saved successfully!", "success");
                }
                else {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            }
        },
        {
            // add options
            zIndex: 100,
            url: getBaseUrl("/CustType/custTypeWhenNewFormInstance"),
            closeOnEscape: true,
            mtype: "POST",
            closeAfterAdd: true,
            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), "The record has been added successfully!", "success");
                }
                else {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            }

        },
        {
            // delete options
            zIndex: 100,
            url: getBaseUrl("/CustType/DeleteCustType"),
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            datatype: "json",
            msg: "Are you sure you want to delete this task?",
            mtype: "POST", reloadAfterSubmit: false,
            onclickSubmit: function (rp_ge, postdata) {
                var rowData = $("#" + postdata).children();
                var json = {};
                json["custType"] = {};
                json.custType.FISCAL_YEAR = rowData[1]["title"];
                json.custType.CUSTOMER_TYPE_CD7 = rowData[2]["title"];
                json.custType.CUSTOMER_GRP = rowData[3]["title"];
                return json;
            },
            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), "The record has been deleted successfully!", "success");
                }
                else {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            },
            serializeDelData: function (postdata) {
                return { "custType": postdata.custType };
            }
        });
});
