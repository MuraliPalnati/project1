$(function () {
    //adds vertical scrollbar to tabs
    //$(".myAffix").width($('.right-section').width() - 15);
    if ($(document).find('.search-tabs').length > 0) {
        onTabScroll();
    }
    //Fix the tab header area while scroll
    //$('.right-section').on('scroll', function () {
    //    var scroll = $(this).scrollTop();
    //    (scroll > 5) ? $(".myAffix").width($('.right-section').width()-15).addClass("stickTop") : $(".myAffix").removeClass("stickTop").css("width", "auto");
    //});
    
    var t = -1;
    //Set tab height evertime when the window resized
    $(window).on('resize', function () {
        clearTimeout(t);
        t = setTimeout(onTabScroll, 100);
    })
})

function onTabScroll() {
    var ContentPaneHeight = $('.right-section').outerHeight();
    $(".sub-affix").css("padding-bottom", "5px");
    var subAffixHeight = $('.myAffix').outerHeight() + $('.search-tabs').outerHeight() + $(".sub-affix").outerHeight() + 18;
    totalHeight = ContentPaneHeight - subAffixHeight;
    $('.tab-scroll').css({ "max-height": totalHeight + "px", "overflow-y": "auto", "overflow-x": "hidden" })
}
//triggers after the select section activated
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
    onTabScroll();
})