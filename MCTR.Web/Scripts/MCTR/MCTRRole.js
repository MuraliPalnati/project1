var editedRows = [];
$(document).ready(function () {
    $('#go-back').click(function () {
        window.history.back();
    });
    var mctrObj = new MCTR();
    var newRecordFlag = $('#newRecordFlag').val()
    if (newRecordFlag != '') {
        $('#processGrpBUbutton').attr('href', '').attr('disabled','disabled');
    }

    if ($('#last_logon').val()=='') {
        $('#last_logon_days').val('');
    }



    $('#add-button').on('click', function (e) {
        e.preventDefault();
        if ($('#bus_unit').val() != $('#last_bu').val()) {

            $('#last_bu').css({ 'background': '#b3b3b3', 'color': 'Red' });
            $('#bus_unit').css({ 'background': '#b3b3b3', 'color': 'Green' });

        }
        else {
            $('#last_bu').css({ 'background': '#b3b3b3', 'color': 'Black' });
            $('#bus_unit').css({ 'background': '#b3b3b3', 'color': 'Black' });

        }
        if ($('#acctg_loc_cdm').val() != $('#last_loc').val()) {
            $('#last_loc').css({ 'background': 'Grey', 'color': 'Red' });
            $('#acctg_loc_cdm').css({ 'background': 'Grey', 'color': 'Green' });

        }
        else {
            $('#last_loc').css({ 'background': '#b3b3b3', 'color': 'Black' });
            $('#acctg_loc_cdm').css({ 'background': '#b3b3b3', 'color': 'Black' });
        }

        if ($('#deptno').val() != $('#last_dept').val()) {
            $('#last_dept').css({ 'background': '#b3b3b3', 'color': 'Red' });
            $('#deptno').css({ 'background': '#b3b3b3', 'color': 'Green' });


        }
        else {
            $('#last_loc').css({ 'background': '#b3b3b3', 'color': 'Black' });
            $('#acctg_loc_cdm').css({ 'background': '#b3b3b3', 'color': 'Black' });
        }
         $('#last_bu').val($('#bus_unit').val());
         $('#last_loc').val( $('#acctg_loc_cdm').val());
         $('#last_dept').val($('#deptno').val());

    });

    var SessionBems = $('#SessionBems').val();
    var Bems = $('#bems').val();

    if (SessionBems == Bems) {
        $('#active1').attr("disabled", true);
        $('#admin_role1').attr("disabled", true);
        $('#fin_control_role1').attr("disabled", true);
        $('#accountant_role1').attr("disabled", true);
        $('#lbr_acct_role1').attr("disabled", true);
        $('#matl_acct_role1').attr("disabled", true);
        $('#cost_acct_role1').attr("disabled", true);
        $('#sr_acct_role1').attr("disabled", true);

        //$('#processGrpBUbutton').attr("disabled", true);
        $('#add-button').attr("disabled", true);
        $('#Save-button').attr("disabled", true);
        
    }

});