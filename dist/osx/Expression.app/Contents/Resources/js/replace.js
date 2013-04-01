timer = null;

function compileRegex() {
	var regex = $('#input_regex').val();
	var replacement = $('#input_replacement').val();
	var text = $('#textarea_text').val();

	console.log(regex + ' ' + replacement + ' ' + text);

	try {
		eval('text = text.replace(/'+regex+'/g, \''+replacement+'\');');
		minus = 100;

		$('#values').animate({
			height: $(window).height() - minus
		});

		$('#error').slideUp();
	} catch (e) {
		minus = 135;
		$('#error').slideDown();
		$('#values').animate({
			height: $(window).height() - minus
		});

		if (regex == '') {
			error = 'Empty regular expression';
		} else {
			error = e.toString();
		}

		$('#errorMessage').html(error);
		console.log(e);
	}

	text = text.replace(/\n/, '<br />');
	$('#replace').html(text);
}

$(document).ready(function() {
	$('input[type=text], textarea').keyup(function() {
		timer = setTimeout("compileRegex()", 700);
	});

	$('input[type=text], textarea').keydown(function() {
		clearTimeout(timer);
	});
});