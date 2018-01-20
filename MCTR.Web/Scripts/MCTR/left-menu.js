$(function () {
    //Main off canvas menu
    $('.menu-collapse-button').on('click', function () {
        var $_this = $(this);
        var $_target = $_this.data("target");
        var $_rtraget = $_this.data("content");
        $_this.toggleClass('move-left');
        $_this.find('.glyphicon').toggleClass('glyphicon-chevron-right')
        $("." + $_target).toggleClass('move-left');
        $("." + $_rtraget).toggleClass('move-left col-md-12 col-md-10 col-xs-12 col-xs-8 col-sm-9 col-sm-12');
        //set width for grid while menu offseting
        setJqGridWidth();
        if ($(document).find(".myAffix").length > 0) {
            checkStickyTab();
        }
    })
    //left menu height change
    //adjustMenu();
    //checkStickyTab();
    $(window).on('resize', function () {
        //function has to call every window resize event
        adjustMenu();
       // setJqGridWidth();
    });
    $(window).on('load', function () {
        //function has to call every window resize event
        adjustMenu();
        // setJqGridWidth();
    });
})
//adjustmenu as per the header and data list area in the window
function adjustMenu() {
    var $_windowHeight = $(window).height();
    var $_feleoffset = $('.brand-header').outerHeight() + $('.stripe').outerHeight() + $('footer.footer').outerHeight();
    var $_leftMenuHeight = $_windowHeight - $_feleoffset -15;
    //    var $_leftMenuHeight = $('.sidebar')[0].scrollHeight;
    setJqGridWidth();
    $('.right-section, .sidebar').css({ "max-height": $_leftMenuHeight, "min-height": $_leftMenuHeight });
}
//Set grid width while window resize and vertical menu toggling
function setJqGridWidth() {
    var grid, gridParentWidth, gridId;
    if (grid = $('.ui-jqgrid-btable:visible')) {
        grid.each(function (index) {
            gridId = $(this).attr('id');
            gridParentWidth = $('#gbox_' + gridId).parent().width();
            $('#' + gridId).setGridWidth(gridParentWidth);
        });
    }
  // window.setTimeout("setJqGridWidth();", 100);
}
//side menu collapse icon changes
function toggleChevron(e) {
    $(e.target).parent().find('[data-toggle] span').toggleClass('arrow-up arrow-down');
}
//Checks it was Sticky tab while left menu toogling
function checkStickyTab() {
    $(".myAffix").width($('.right-section').width());
    if ($('.right-section').hasScrollBar()) {
        $(".myAffix").width($('.right-section').width() - 15);
    }
}
//calls icon changes while toggle collapse menu
$('#mainMenu-collapse').on('hidden.bs.collapse', toggleChevron);
$('#mainMenu-collapse').on('shown.bs.collapse', toggleChevron);

(function ($) {
    $.fn.hasScrollBar = function () {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);