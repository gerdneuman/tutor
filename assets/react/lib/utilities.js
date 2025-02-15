window.jQuery(document).ready(function($) {
	const { __ } = wp.i18n;

	// Copy text
	$(document).on('click', '.tutor-copy-text', function(e) {
		// Prevent default action
		e.stopImmediatePropagation();
		e.preventDefault();

		// Get the text
		let text = $(this).data('text');

		// Create input to place texts in
		var $temp = $('<input>');
		$('body').append($temp);

		$temp.val(text).select();

		document.execCommand('copy');
		$temp.remove();

		tutor_toast(__('Copied!', 'tutor'), text, 'success');
	});

	// Ajax action
	$(document).on('click', '.tutor-list-ajax-action', function (e) {
		if (!e.detail || e.detail == 1) {
			let $that = $(this);
			let prompt = $(this).data('prompt');
			let del = $(this).data('delete_element_id');
			let redirect = $(this).data('redirect_to');
			var data = $(this).data('request_data') || {};
			typeof data == 'string' ? (data = JSON.parse(data)) : 0;

			if (prompt && !window.confirm(prompt)) {
				return;
			}

			e.preventDefault();

			const btnInnerHtml = $that.html().trim();
			const { width: btnWidth, height: btnHeight } = $that.get(0).getBoundingClientRect();
			const btnStyles = { width: `${btnWidth}px`, height: `${btnHeight}px` };

			$.ajax({
				url: _tutorobject.ajaxurl,
				type: 'POST',
				data: data,
				beforeSend: function () {
					$that.css(btnStyles);
					$that.html(`<div class="tutor-loading-spinner" style="--size: 20px"></div>`);
				},
				success: function (data) {
					if (data.success) {
						if (del) {
							$('#' + del).fadeOut(function () {
								$(this).remove();
							});
						}

						if (redirect) {
							window.location.assign(redirect);
						}
						return;
					}

					let { message = __('Something Went Wrong!', 'tutor') } = data.data || {};
					tutor_toast('Error!', message, 'error');
				},
				error: function () {
					tutor_toast('Error!', __('Something Went Wrong!', 'tutor'), 'error');
				},
				complete: function () {
					$that.html(btnInnerHtml);
				},
			});
		}
	});

	// Textarea auto height
	$(document).on('input', '.tutor-textarea-auto-height', function() {
		this.style.height = 'auto';
		this.style.height = this.scrollHeight + 'px';
	});
	$('.tutor-textarea-auto-height').trigger('input');

	// Prevent number input out of range
	$(document).on(
		'input',
		'input.tutor-form-control[type="number"], input.tutor-form-number-verify[type="number"]',
		function() {
			if ($(this).val() == '') {
				$(this).val('');
				return;
			}

			let min = $(this).attr('min');
			let max = $(this).attr('max');

			let val = $(this)
				.val()
				.toString();
			/\D/.test(val) ? (val = '') : 0;
			val = parseInt(val || 0);

			$(this).val(Math.abs($(this).val()));

			// Prevent number smaller than min
			if (!(min === undefined)) {
				val < parseInt(min) ? $(this).val(min) : 0;
			}

			// Prevent numbers greater than max
			if (!(max === undefined)) {
				val > max ? $(this).val(max) : 0;
			}
		},
	);

	// Open location on dropdoqn change
	$(document).on('change', '.tutor-select-redirector', function() {
		let url = $(this).val();
		window.location.assign(url);
	});
});
