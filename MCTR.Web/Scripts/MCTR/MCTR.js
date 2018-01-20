
function MCTR() {
    this.CreateJqGrid = function (id, url, mtype, data, columnNames, colModel, cellEdit, sortName, rowlist, rowNum, gridHeight, sortOrder, onSelRowFn, gridCompleteFn, resizeStop, afterInsertRow, pager) {
        var setSelection = function () {
            return function () {
                 $('input').change(function() {
                if (!$(this).parents('form').hasClass('dirty')) {
                    $(this).parents('form').addClass('dirty')
                }
            });
                var gridId = $(this).attr('id');
                var selectedRow = $('#' + gridId).getGridParam('selrow');
                if (selectedRow == null) {
                    $('#' + gridId).setSelection(1, true);
                    $('#' + gridId).find('tr[id=1]').trigger('click');
                    $('#' + gridId).find('tr[id=1]').focus();
                }

                $(document).keydown(function (e) {
                    var modalGridId = $(this).find('.modal').find('.ui-jqgrid-btable').last().attr('id');
                    if (!modalGridId) {
                        modalGridId = $(this).find('.ui-jqgrid-btable').attr('id');
                    }
                    if (e.which == 40) {
                        var selRowId = $('#' + modalGridId).getGridParam('selrow');
                        $('#' + modalGridId).setSelection(parseInt(selRowId) + 1, true);
                        $('#' + modalGridId).find('tr[id=' + selRowId + ']').focus();
                        var rowCount = $('#' + modalGridId).find('tr').not('.jqgfirstrow').length;
                        var recordCount = $('#' + modalGridId).getGridParam('records');
                        if (rowCount == rowNum && recordCount > rowNum && parseInt(selRowId) == rowNum) {
                            $('#next_' + $('.ui-jqgrid-pager ').attr('id')).click();
                            $(this).parentsUntil('.modal').find('button').blur();
                            $('#' + modalGridId).setSelection(parseInt(selRowId) + 1, true);
                            $('#' + gridId).find("tr").not('.jqgfirstrow').first().trigger('click');
                            $('#' + modalGridId).find('tr[id=' + String(parseInt(selRowId) + 1) + ']').focus();
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                    }
                    if (e.which == 38) {
                        var selRowId = $('#' + modalGridId).getGridParam('selrow');
                        if (selRowId != 1) {
                            var currentPage = $('#' + modalGridId).getGridParam('page');
                            $('#' + modalGridId).setSelection(parseInt(selRowId) - 1, true);
                            $('#' + modalGridId).find('tr[id=' + String(parseInt(selRowId) - 1) + ']').focus();
                            var rowCount = $('#' + modalGridId).find('tr').not('.jqgfirstrow').length;
                            var recordCount = $('#' + modalGridId).getGridParam('records');
                            if (parseInt(selRowId) == (rowNum * currentPage) - (rowNum - 1)) {
                                $('#prev_' + $('.ui-jqgrid-pager ').attr('id')).click();
                                $('#' + modalGridId).setSelection(parseInt(selRowId) - 1, true);
                                $('#' + modalGridId).find('tr[id=' + String(parseInt(selRowId) - 1) + ']').focus();
                                $(this).parentsUntil('.modal').find('button').blur();
                                $('#' + modalGridId).setSelection(parseInt(selRowId) - 1, true);
                            }
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                    }
                });
                if (typeof gridCompleteFn === "function") {
                    gridCompleteFn();
                }
            }

        };
        $("#" + id).jqGrid({
            url: encodeURI(getBaseUrl(url)),
            datatype: "json",
            mtype: mtype,
            postData: data,
            ignoreCase: true,
            colNames: columnNames,
            colModel: colModel,
            rowNum: rowNum,
            rowlist: rowlist,
            sortname: sortName,
            viewrecords: true,
            sortorder: sortOrder,
            autowidth: true,
            height: gridHeight,
            gridview: true,
            cellEdit: cellEdit,
            cellsubmit: 'clientArray',
            pager: pager != '' && pager ? pager : '#pager',
            inlineNav: true,
            pgtext: null,
            onSelectRow: onSelRowFn,
            loadonce: true,
            jsonReader: {
                page: "page",
                total: "total",
                records: "records",
                rows: "rows",
                Id: "0"
            },
            gridComplete: setSelection(),
            resizeStop: resizeStop,
            afterInsertRow: afterInsertRow
        });
    };
    this.ajaxOptions = function (url, method, parameters, successFn, errorFn) {
        $.ajax({
            url: encodeURI(getBaseUrl(url)),
            type: method,
            data: parameters,
            contentType: 'application/json',
            success: successFn,
            error: errorFn,
            cache: false
        });
    };
    this.radioFormatter = function () {
        function radio(value, options, rowObject) {
            var radioHtml = '<input name="radioBtn" type = "radio" id = "radioButton' + options.rowId + '" />';
            $("#radioButton" + options.rowId).rowObject = rowObject;
            return radioHtml;
        }
    };
    this.showDialog = function (parentDiv, message, type) {
        $('#dialog-content').remove();
        var div = $("<section>", { id: "dialog-content" });;
        switch (type) {
            case "success":
                div.addClass("alert alert-success fade in");
                break;
            case "error":
                div.addClass("alert alert-danger fade in");
                break;
            case "warning":
                div.addClass("alert alert-warning fade in");
                break;
            default:
        }
        div.append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
        div.append(message);
        parentDiv.append(div);
        parentDiv.show();
        parentDiv.focus();
    };

    this.actionButtonFormatter = function (cellvalue, options, rowObject) {
        return '<a id=' + options.rowId + '_goTobtn class="btn btn-primary btn-xs" href="/Role/RoleOnLoad?bems=' + rowObject.bems + '">GoTo</a>';

    }

    this.actionButtonFormatter2 = function (cellvalue, options, rowObject) {

        return '<a id=' + options.rowId + '_goTobtn class="btn btn-primary btn-xs" onclick="javascript:onClickHandler(' + options.rowId + ',' + rowObject.BEMS_ID + ')">GoTo</a>';
    }
    this.popUpButtonFormatter = function (cellvalue, options, rowObject) {
        return '<a href="/Role/Index" id=' + options.rowId + '_popUpbtn class="btn btn-default btn-xs">	&gt;</a>';

    }

    this.getRowDatawithFormatter = function (gridName, rowData) {
        var colObject = {};
        var colModel = $("#" + gridName).jqGrid("getGridParam", "colModel");
        colModel.forEach(function (model, index) {
            var elem = $(rowData[model.name]).not('a,br,button,label');
            elem.each(function (i, obj) {
                if (obj.type == 'checkbox') {
                    colObject[obj.id.slice(obj.id.indexOf('_') + 1)] = obj.checked;
                }
                else {
                    colObject[obj.id.slice(obj.id.indexOf('_') + 1)] = $('#' + obj.id).val().toUpperCase();
                }
            })
        });
        return colObject;
    };

    this.searchJqGridbyData = function (colModel, gridData, searchValue) {   
        return $.grep(gridData, function (obj) {
            var searchFlag = false;
            colModel.forEach(function (model, index) {
                if (!searchFlag) {
                    if (model.formatter == 'date') {
                        searchFlag = new Date(parseInt(obj[model.name] == null ? "" : obj[model.name].substr(6))).toDateString().slice(4).toUpperCase().search(searchValue.toUpperCase()) != -1;
                    }
                    else {
                        searchFlag = String(obj[model.name] == null ? "": String(obj[model.name]).toUpperCase()).search(searchValue.toUpperCase()) != -1;
                    }
                }
          });
            return searchFlag;
        });
    };

    this.searchGrid = function (gridId, okBtn) {
        $(okBtn).on('click',function (e) {
            $('.jQGridRow').find('input[focus=true],a[focus=true]').focus();
        });
        $('#findBtn').on('click', function (e) {
            var searchValue = $('#searchValue').val();
            var searchableColModel = $.grep($('#' +gridId).getGridParam('colModel'), function (obj) {
                return obj.search;
        });

            var filteredObjs = new MCTR().searchJqGridbyData($('#' +gridId).getGridParam('colModel'), $('#' +gridId).getGridParam('userData'), searchValue);
            $('#' +gridId).clearGridData(true);
            $('#' +gridId).setGridParam({ data: filteredObjs
    });
            $('#' +gridId).trigger('reloadGrid');
    });
    };
};

$(document).ready(function () {
    //Dirty Check
    $('#breadCrumb').find('a').first().click(function (e) {
        if($('form').hasClass('dirty')) {
            e.preventDefault();
            bootbox.confirm("There are outstanding changes in the form. Are you sure you want to continue?", function (result) {
                if (result) {
                    window.location = $('#breadCrumb').find('a').first().attr('href');
                }
            });
        };
    });
    $('input').change(function () {
        if(!$(this).parents('form').hasClass('dirty')){
            $(this).parents('form').addClass('dirty');
        }
   });

var searchJqGrid = function (modal) {
    var gridId = modal.find('.ui-jqgrid-btable').attr('id');
    new MCTR().searchGrid(gridId, modal);
    };
    $('#mctrModal').on('hidden.bs.modal', function (e) {
        $('#mctrModal').removeData();
        $('#mctrModal').find('.modal-content').children().remove();
    });
    $('#mctrModalJustification').on('hidden.bs.modal', function (e) {
        $('#mctrModalJustification').removeData();
        $('#mctrModalJustification').find('.modal-content').children().remove();
    });
    $('#mctrModalSmall').on('hidden.bs.modal', function (e) {
        $('#mctrModalSmall').removeData();
        $('#mctrModalSmall').find('.modal-content').children().remove();
});

$('#mctrModalLarge').on('hidden.bs.modal', function (e) {
    $('#mctrModalLarge').removeData();
    $('#mctrModalLarge').find('.modal-content').children().remove();
    });
    $('#mctrModalXtraLarge').on('hidden.bs.modal', function (e) {
        $('#mctrModalXtraLarge').removeData();
        $('#mctrModalXtraLarge').find('.modal-content').children().remove();
    });
    $('#cbox').hide();

    $('[data-toggle="tooltip"]').tooltip({ trigger: 'click', container: 'body' });

$('nav a').on('mouseleave', function () {
    $('[data-toggle="tooltip"]').tooltip('hide');
});

$('#mctrModalSmall').on('shown.bs.modal', function (e) {
    searchJqGrid($(this));
    });
    $('#mctrModal').on('shown.bs.modal', function (e) {
        searchJqGrid($(this));
    });
    $('#mctrModalLarge').on('shown.bs.modal', function (e) {
        searchJqGrid($(this));
    });

    var envValue = $('#envId').val();
    if (envValue == 'DEVELOPMENT') {
        $('#envId').addClass('pink');
    }
    else if (envValue == 'INTEGRATED') {
        $('#envId').addClass('light-blue');
    }

});