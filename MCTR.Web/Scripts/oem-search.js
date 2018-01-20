$(function() {
	var pageString = getUrlVars();
	if (pageString.page == "OEM") {
		var target = $(document).find('.mode-change').eq(0);
		target.addClass('active').next('.mode-change').removeClass('active');
		loadModeTemplate(target);
	} else if (pageString.page == "Supplier") {
		var target = $(document).find('.mode-change').eq(1);
		target.addClass('active').prev('.mode-change').removeClass('active');;
		loadModeTemplate(target);
	} else {
		if ($('.mode-change').hasClass('active')) {
			var target = $(document).find('.mode-change.active')
			loadModeTemplate(target);
		}
	}
	$(document).ajaxStart(function(){
		$('.load-overlay').show();
	}).ajaxStop(function(){
		$('.load-overlay').hide();
	})
	$(document).on('click','.mode-change', function(){
		loadModeTemplate(this);
	})
	function loadModeTemplate(template) {
		var source = $(template).data('href');
		$.ajax({
			url: source,
			dataType : "html",
			cache: false,
			success : function(data) {
				$('.modes').empty().html(data);
			}
		})
	}
	
	function getUrlVars() {
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}

		return vars;

	}

});


