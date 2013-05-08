

jQuery(document).ready(function($) {
	$(".collapse-alt").collapse();

	$('#demo').mobiscroll().date({
		theme : 'jqm',
		display : 'bubble',
		mode : 'scroller',
		dateOrder : 'ddMyyyy',
		dateFormat : 'yyyy-mm-dd',
	});

	$('#show_history_info').click(function() {
		if ($(this).hasClass('hide_history_info')) {
			$('.history .hiddeninfo').removeClass('hide');
			$(this).removeClass('hide_history_info');
		} else {
			$('.history .hiddeninfo').addClass('hide');
			$(this).addClass('hide_history_info');
		}
	});

	

});
