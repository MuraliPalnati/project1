$(document).ready(function ()
{
    var mctrObj = new MCTR();
    $('#authBUDwnldBtn').click(function () {
        var succesFn = function (data) {

        };
        var errorFn = function (data) {

        };
        $('#authbuDownloadFrame').attr('src',getBaseUrl('/Reports/selectionbutactiverolebulistwhenbuttonpressed')+'?BusinessGroup=' + $("#BusinessGroup").val() + '&&BusinessUnit=' + $("#BusinessUnit").val());

    });
    $('#roleaccessDwnldBtn').click(function () {
        var succesFn = function (data) {

        };
        var errorFn = function (data) {

        };

        $('#roleaccessDownloadFrame').attr('src', getBaseUrl('/Reports/selectionbutactiveuserlistwhenbuttonpressed')+'?roleAccess=' + $("input[name='roleaccess']:checked").val() + '&&fDays=' + $("#f_days").val());


    });
    $('#metricsDwnldBtn').click(function () {
        var succesFn = function (data) {

        };
        var errorFn = function (data) {

        };
        $('#metricsDownloadFrame').attr('src', getBaseUrl('/Reports/selectionbutexceleotwhenbuttonpressed')+'?JournalDate=' + $('#JournalDate').val());

    });
    $('#userAccessDwnldBtn').click(function () {

        var succesFn = function (data) {

        };
        var errorFn = function (data) {

        };

        $('#userAccessDownloadFrame').attr('src', getBaseUrl('/Reports/selectionbutqtrlyrolelistwhenbuttonpressed')+'?userAccess=' + $("input[name='useraccess']:checked").val());
    });
});