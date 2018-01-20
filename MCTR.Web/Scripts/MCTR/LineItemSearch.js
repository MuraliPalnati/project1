$(document).ready(function () {

    $('.menu-collapse-button').click(function () {
        setTimeout(function() {
            $('#pager').removeAttr('style');
            $('#pager').width($('.lineItemInner').width() + $('.lineItemFirst').width() +$('.lineItemCover').width());
            }, 50)
    });

    var afterInsertRow = function (rowid, rowdata, rowelem) {
        $("#" + rowid).addClass('fade-in');
        setTimeout(function () {
            $("#" + rowid).removeClass('fade-in').addClass('fade-out');
        }, 200);
        setTimeout(function () {
            $(".fade-out").removeClass('fade-out');
        }, 5000);
    };

    //Grid View
    var mctrObj = new MCTR();
    var inputObj = {};
    var mctrLineItems = [];

    
    var projectinputFormatter = function (columnName, readonly) {

        readonly = readonly ? readonly : '';
        return function (cellvalue, options, rowObject) {
            var fromOrTo = $('#formOrToFlag').val();
            var bClass = "white";
            cellvalue = cellvalue ? cellvalue : "";

            var oldFromValue = $('#' + options.rowId + '_' + columnName + '_FROM').val();
            if (!oldFromValue) { oldFromValue = ""; }
            var fromValueInsert = fromOrTo == "from" ? cellvalue : oldFromValue;

            if ((oldFromValue != "" && oldFromValue) && (fromValueInsert == "" || fromValueInsert) && (oldFromValue == fromValueInsert)) {
                fromValueInsert = oldFromValue;
            }
            var oldToValue = $('#' + options.rowId + '_' + columnName + '_TO').val();
            var toValueInsert = fromOrTo == "from" ? oldToValue : cellvalue;

            if ((oldToValue != "" && oldToValue) && (toValueInsert == "" || toValueInsert) && (oldToValue == toValueInsert)) {
                toValueInsert = oldToValue;
            }
            var fromValue = rowObject[columnName + '_FROM'] ? rowObject[columnName + '_FROM'] : fromValueInsert;
            var toValue = rowObject[columnName + '_TO'] ? rowObject[columnName + '_TO'] : toValueInsert;
            
            if (columnName == 'QUANTITY') {
                fromValue = fromValue == "" ? ".0" : fromValue;
                toValue = toValue == "" ? ".0" : toValue;
                if (rowObject.MTL_JRNL == "Y") {
                    bClass = "black";
                }
            }
            if (columnName == 'AMOUNT') {
                fromValue = fromValue == "" ? ".00" : fromValue;
                toValue = toValue == "" ? ".00" : toValue;
                if (rowObject.MTL_JRNL == "Y") {
                    bClass = "black";
                }
            }
            if (columnName == 'ADJUSTMENT') {
                fromValue = fromValue == "" ? ".00" : fromValue;
                toValue = toValue == "" ? ".00" : toValue;
                if (rowObject.MTL_JRNL == "Y") {
                    bClass = "black";
                }
            }
          
            return '<input id="' + options.rowId + '_' + columnName + '_FROM" value="' + fromValue + '" class="' + bClass + '"></br><input id="' + options.rowId + '_' + columnName + '_TO" value="' + toValue + '" class="' + bClass + '">';
        };
    }

    //Inner Grid Components
    var GLPCFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        if (options.rowId != 'searchRow') {
            var colorClass = '';
            switch (cellvalue) {
                case ('G'): colorClass = 'green'; break;
                case ('B'): colorClass = 'black'; break;
                case ('R'): colorClass = 'red'; break;
                case ('Y'): colorClass = 'yellow'; break;
                default: colorClass = 'white';
                    break;
            }
            return '<a id="' + options.rowId + '_TTD_FLAG" class="btn btn-default btn-xs mr-3 ' + colorClass + '" data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href ="'+getBaseUrl('/MctrCreateForm/TTDFlagLegend')+'">' + cellvalue + '</a>';
        }
        else {
            return '<input id="' + options.rowId + '_TTD_FLAG" />';
        }
    }

    var bckUpFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        if (options.rowId != 'searchRow') {
        var colorClass ='';
        switch(cellvalue){
            case('G'): colorClass = 'green';break;
            case('B'): colorClass = 'black';break;
            case('R'): colorClass = 'red';break;
            case('W'): colorClass = 'white';break;
            case ('Y'): colorClass = 'yellow'; break;
            default: colorClass = 'white';
                break;
        }
        return '<a id="' + options.rowId + '_PER_FLAG" class="btn btn-default btn-xs mr-3 ' + colorClass + '" data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href ="'+getBaseUrl('/MctrCreateForm/TTDFlagLegend')+'">' + cellvalue + '</a>';
        }
        else {
            return '<input id="' + options.rowId + '_PER_FLAG" />';
        }
    }

    var gridComplete = function () {
        
        if ($('#searchRow').length != 0) {
            $("#lineItemInner").find('#searchRow').find('input').keypress(function (event) {

                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    var filteredObjs = filterGrid();

                    $("#lineItemFirst").clearGridData(true);
                    $("#lineItemFirst").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");

                    $("#lineItemCover").clearGridData(true);
                    $("#lineItemCover").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");

                    $("#lineItemInner").clearGridData(true);
                    $("#lineItemInner").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");
                }
            });
        }
    };

    var columnNames1 = ['Hours', 'Amount', 'Adj', 'GLPC TTD', 'BkUp PER', 'Related Overhead Amt'];
    var colModel1 = [
{ key: false, name: 'QUANTITY', index: 'QUANTITY', classes: 'align-right-input', sortable: false, width: 50, editable: false,  search: true, formatter: projectinputFormatter("QUANTITY") },
          { key: false, name: 'AMOUNT', index: 'AMOUNT', classes: 'align-right-input', sortable: false, width: 50,   editable: false, search: true, formatter: projectinputFormatter("AMOUNT") },
        { key: false, name: 'ADJUSTMENT', index: 'ADJUSTMENT', classes: 'align-right-input', sortable: false, width: 50, editable: false, search: true, formatter: projectinputFormatter("ADJUSTMENT") },
        { key: false, name: 'TTD_FLAG', index: 'TTD_FLAG', sortable: false, editable: false, width: 30, search: false, formatter: GLPCFormatter },
        { key: false, name: 'PER_FLAG', index: 'PER_FLAG', sortable: false, editable: false, width: 30  , search: false, formatter: bckUpFormatter },
        { key: false, name: 'OVH_AMOUNT', index: 'OVH_AMOUNT', sortable: false, editable: false, width: 100, search: true, formatter: projectinputFormatter("OVH_AMOUNT") }];
    mctrObj.CreateJqGrid('lineItemInner', '/LineItem/mctrLineItemMctrLineItemOnLoad', 'POST', { mctrNo: $('#MctrNo').val() }, columnNames1, colModel1, true, 'SETID', [], 10, '100%', 'desc', false, gridComplete, null, afterInsertRow);

    //OverLay Grid Components
    var bumOrigFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<input id="' + options.rowId + '_BUM_CD7_TO_ORIG" value="' + cellvalue + '" disabled>';
    }

    var wpdBtnFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<input id="' + options.rowId + '_wpdValue" value="' + cellvalue + '" disabled></br><a data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href="/MctrCreateForm/getRgWpdToLOV?rowId=' + options.rowId + '" id=' + options.rowId + '_wpdTopopUpbtn class="btn btn-default btn-xs">&gt;</a>';
    }

    var wpdInputFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<input value="' + cellvalue + '" ></br><input value="' + cellvalue + '" >';
    }

    var homeLocFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<input id="' + options.rowId + '_homeLocFrom" value="' + cellvalue + '" ></br><input id="' + options.rowId + '_homeLocTo" value="' + cellvalue + '">';
    }
    var BulkBtnFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<input id="' + options.rowId + '_wpdValue" value="' + cellvalue + '" disabled></br><a data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href="/MctrCreateForm/getRgBulkToLOV?rowId=' + options.rowId + '" id=' + options.rowId + '_BulkpopUpBtn class="btn btn-default btn-xs">&gt;</a>';
    }

    var gridCompleteFnFirstGrid = function () {       
        if ($('#searchRow').length != 0) {
          
            $("#lineItemFirst").find($('#searchRow')).find('input').keypress(function (event) {

                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    var filteredObjs = filterGrid();

                    $("#lineItemFirst").clearGridData(true);
                    $("#lineItemFirst").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");

                    $("#lineItemCover").clearGridData(true);
                    $("#lineItemCover").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");

                    $("#lineItemInner").clearGridData(true);
                    $("#lineItemInner").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");
                }

            });
        }
        else
        {
            mctrObj.showDialog($("#dialog-box"), "Please Click on Search to Begin searching the Line Items", "success");
        }
    };

    var gridCompleteFn = function () {

        if ($('#searchRow').length != 0) {
            $("#lineItemCover").find('#searchRow').find('input').keypress(function (event) {

                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    var filteredObjs = filterGrid();

                    $("#lineItemFirst").clearGridData(true);
                    $("#lineItemFirst").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");

                    $("#lineItemCover").clearGridData(true);
                    $("#lineItemCover").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");

                    $("#lineItemInner").clearGridData(true);
                    $("#lineItemInner").jqGrid('setGridParam', {
                        datatype: 'local',
                        data: filteredObjs
                    }).trigger("reloadGrid");
                }

            });
        }

        setTimeout(function () {
            $('#pager').removeAttr('style');
            $('#pager').width($('.lineItemInner').width() + $('.lineItemFirst').width() + $('.lineItemCover').width()+6);
        }, 50)
    }

    var columnNames2 = ['BUGL', 'Project ID', 'Contract Number', 'Account', 'BUM CD ', 'CT CD', 'Trn TYP', 'Trn CD', 'Stat Cd', 'UOM Cd', 'AFF Cd', 'Home Dept',  'Hm LOC',  'BUFr', 'HmOH', 'LbrCd', 'Cls Cd','Work Dept', 'Wrk LOC', 'Wrk OH', 'RSC Cd','WPD (BTU)',  'Bulk Alctn',  'Base Year'];
    var colModel2 = [
        { key: false, name: 'BUSINESS_UNIT_GL', index: 'BUSINESS_UNIT_GL', editable: false, sortable: false, formatter: projectinputFormatter("WORK_BUGL") },
        { key: false, name: 'PROJECT_ID', index: 'PROJECT_ID', editable: false, sortable: false, search: true, formatter: projectinputFormatter("PROJECT_ID") },
        { key: false, name: 'CONTRACT_NUM', index: 'CONTRACT_NUM', editable: false, sortable: false, search: false, formatter: projectinputFormatter("CONTRACT_NUM") },
        { key: false, name: 'ACCOUNT', index: 'ACCOUNT', sortable: false, editable: false, formatter: projectinputFormatter("ACCOUNT") },
        { key: false, name: 'BUS_UNIT_MGMT_CD7', index: 'BUS_UNIT_MGMT_CD7', sortable: false, editable: false, search: true, formatter: projectinputFormatter("BUM_CD7") },
        { key: false, name: 'CUSTOMER_TYPE_CD7', index: 'CUSTOMER_TYPE_CD7', sortable: false, editable: false, search: false, formatter: projectinputFormatter("CUST_TYPE_CD7") },
        { key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', sortable: false, editable: false, formatter: projectinputFormatter("PROJ_TRANS_TYPE") },
        { key: false, name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', sortable: false, editable: false, search: true, formatter: projectinputFormatter("PROJ_TRANS_CODE") },
        { key: false, name: 'STATISTICS_CODE', index: 'STATISTICS_CODE', sortable: false, editable: false, search: false, formatter: projectinputFormatter("STAT_CODE") },
        { key: false, name: 'UNIT_OF_MEASURE', index: 'UNIT_OF_MEASURE', sortable: false, editable: false, formatter: projectinputFormatter("UOM") },
        { key: false, name: 'AFFILATE', index: 'AFFILATE', editable: false, sortable: false, search: true, formatter: projectinputFormatter("AFFILATE") },
        { key: false, name: 'HOME_DEPT', index: 'DEPTID', editable: false, sortable: false, search: false, formatter: projectinputFormatter("HOME_DEPT") },
        { key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', sortable: false, editable: false, search: true, formatter: projectinputFormatter("HOME_LOC") },
        { key: false, name: 'HOME_BUGL', index: 'HOME_BUGL', sortable: false, editable: false, search: true, formatter: projectinputFormatter("HOME_BUGL") },
        { key: false, name: 'ALLOW_POOL_CD7', index: 'ALLOW_POOL_CD7', sortable: false, editable: false, formatter: projectinputFormatter("HOME_POOL") },
        { key: false, name: 'LABOR_RATE_CD7', index: 'LABOR_RATE_CD7', sortable: false, editable: false, search: true, formatter: projectinputFormatter("LABOR_RATE_CD7") },
        { key: false, name: 'CLASS_CD', index: 'CLASS_CD', sortable: false, editable: false, search: false, formatter: projectinputFormatter("CLASS_CD") },
        { key: false, name: 'WORK_DEPT', index: 'WORK_DEPT', sortable: false, editable: false, formatter: projectinputFormatter("WORK_DEPT") },
        { key: false, name: 'WORK_LOC', index: 'WORK_LOC', sortable: false, editable: false, search: true, formatter: projectinputFormatter("WORK_LOC") },
        { key: false, name: 'WORK_POOL', index: 'WORK_POOL', sortable: false, editable: false, search: false, formatter: projectinputFormatter("WORK_POOL") },
        { key: false, name: 'RSC', index: 'RSC', sortable: false, editable: false, search: true, formatter: projectinputFormatter("RSC") },
        { key: false, name: 'WPD', index: 'WPD', editable: false, search: true, formatter: projectinputFormatter("WPD") },
        { key: false, name: 'BULK_ALCTN_CD7', index: 'BULK_ALCTN_CD7', editable: false, search: true, formatter: projectinputFormatter("BULK_ALCTN_CD7") },
        { key: false, name: 'OH_BASE_YR', index: 'OH_BASE_YR', editable: false, search: true, formatter: projectinputFormatter("OH_BASE_YR") }];
    mctrObj.CreateJqGrid('lineItemCover', '/LineItem/mctrLineItemMctrLineItemOnLoad', 'POST', { mctrNo: $('#MctrNo').val() }, columnNames2, colModel2, true, 'SETID', [], 10, '100%', 'desc', false, gridCompleteFn, null, afterInsertRow);//

    //First Grid Components
    var mctrLineFormatter = function (cellvalue, options, rowObject) {
        if (options.rowId != 'searchRow') {
            cellvalue = cellvalue ? cellvalue : "";
            return '<input id="' + options.rowId + '_MCTR_NO" value="' + cellvalue + '" ></br><a href="' + getBaseUrl('/LineItem/OpenMctr') + '?lineItemMctrNo=' + cellvalue + '" id=' + options.rowId + '_mctrOpenBtn class="btn btn-default btn-xs">Open</a><input id="' + options.rowId + '_LINE_NO" value="' + rowObject.LINE_NO + '">';
        }
        else {
            return '<input id="search_MCTR_NO" /><input id="' + options.rowId + '_LINE_NO" />';
        }
    }

    var firstGridFormatter = function (cellvalue, options, rowObject) {
        if (options.rowId != 'searchRow') {
            var checked = cellvalue ? 'checked' : '';
            if (rowObject.MTL_JRNL == "Y") {
                return '<input type="checkbox" id ="' + options.rowId + '_MTL_JRNL" checked="checked" value="n" offval="no" />';
            }
            else {
                return '<input type="checkbox" id ="' + options.rowId + '_MTL_JRNL" value="n" offval="no" />';
            }
        }
        else {
            return '';
        }
    };

    var activityFormatter = function (cellvalue, options, rowObject) {
        if (options.rowId != 'searchRow') {
            cellvalue = cellvalue ? cellvalue : "";
            return '<label id="' + options.rowId + '_activityFromLbl">Fr </label><input id="' + options.rowId + '_ACTIVITY_ID_FROM" value="' + rowObject.ACTIVITY_ID_FROM + '" ></br><label id="' + options.rowId + '_activityToLbl">To</label><input id="' + options.rowId + '_ACTIVITY_ID_TO" value="' + rowObject.ACTIVITY_ID_TO + '">';
        }
        else {
            return '<label id="search_activityFromLbl">Fr </label><input id="search_ACTIVITY_ID_FROM" /></br><label id="search_activityToLbl">To</label><input id="search_ACTIVITY_ID_TO" />';
        }
    }

    var columnNames3 = ['MCTR Line', 'Alternate Jrnl', 'Activity ID'];
    var colModel3 = [{ name: 'MCTR_NO', index: 'MCTR_NO', sortable: false, resizable: false, search: false, width:200, sortable: false, formatter: mctrLineFormatter },
        { key: false, name: 'LINE_NO', index: 'LINE_NO', sortable: false, width:50, editable: false, formatter: firstGridFormatter },
         { key: false, name: 'ACTIVITY_ID', index: 'ACTIVITY_ID', sortable: false, editable: false, width: 300, formatter: activityFormatter },
    ];
    mctrObj.CreateJqGrid('lineItemFirst', '/LineItem/mctrLineItemMctrLineItemOnLoad', 'POST', { mctrNo: $('#MctrNo').val() }, columnNames3, colModel3, false, 'SETID', [], 10, '100%', 'desc', null, gridCompleteFnFirstGrid, null, afterInsertRow);

    var filterGrid = function () {
        var searchRowDataFirst = mctrObj.getRowDatawithFormatter('lineItemFirst', $('#lineItemFirst').getRowData('searchRow'));
        var searchRowDataInner = mctrObj.getRowDatawithFormatter('lineItemInner', $('#lineItemInner').getRowData('searchRow'));
        var searchRowDataCover = mctrObj.getRowDatawithFormatter('lineItemCover', $('#lineItemCover').getRowData('searchRow'));
        var searchRowData = $.extend(searchRowDataFirst, searchRowDataInner, searchRowDataCover);
        var filteredObj = $('#lineItemFirst').getGridParam('userData');
        var filter = function (i, o) {
            filteredObj =  $.grep(filteredObj, function (obj) {
                return obj[i] == o;
            });
        };

        $.each(searchRowData, function (i, o) {
            if (o != '' && o != '.00' && o != '.0') {                
                filter(i,o);
            }
        });
        return filteredObj;
    };

//Paging Data Manipulation
    $('#lineItemFirst').setGridParam({
        onPaging: function (pg) {
            var searchGridLength = $('#lineItemCover').getGridParam('data').length;
            var gridLength = $('#lineItemFirst').getGridParam('userData').length;
            if (searchGridLength != gridLength) {
                var filteredObjs = $('#lineItemCover').getGridParam('data');
                $('#lineItemCover').setGridParam({ data: filteredObjs });
            }
            else {
                $('#lineItemFirst').setGridParam({ data: $('#lineItemFirst').getGridParam('userData') });
            }
        }
    });

    $('#lineItemCover').setGridParam({
        onPaging: function (pg) {
            var searchGridLength = $('#lineItemCover').getGridParam('data').length;
            var gridLength = $('#lineItemFirst').getGridParam('userData').length;
            if (searchGridLength != gridLength) {
                var filteredObjs = $('#lineItemCover').getGridParam('data');
                $('#lineItemCover').setGridParam({ data: filteredObjs });
            }
            else {
                $('#lineItemCover').setGridParam({ data: $('#lineItemFirst').getGridParam('userData') });
            }
        }
    });

//Search function
    $('#searchBtn').click(function (e) {
        $('#dialog-content').hide();
        if ($('#searchRow').length == 0) {
            var parameters =
                {
                    rowID: "searchRow",
                    position: "first",
                    useDefValues: false,
                    useFormatter: true,
                    addRowParams: { extraparam: {} }
                };

            $("#lineItemFirst").addRow(parameters);
            $('#lineItemInner').addRow(parameters);
            $('#lineItemCover').addRow(parameters);
        }
        else {
            var filteredObjs = filterGrid();
            $("#lineItemFirst").clearGridData(true);
            $("#lineItemFirst").jqGrid('setGridParam', {
                datatype: 'local',
                data: filteredObjs
            }).trigger("reloadGrid");

            $("#lineItemCover").clearGridData(true);
            $("#lineItemCover").jqGrid('setGridParam', {
                datatype: 'local',
                data: filteredObjs
            }).trigger("reloadGrid");

            $("#lineItemInner").clearGridData(true);
            $("#lineItemInner").jqGrid('setGridParam', {
                datatype: 'local',
                data: filteredObjs
            }).trigger("reloadGrid");
        }
    });

});
