/**
 * On click add filter value on the url
 * and refresh page
 *
 * Handle bulk action
 *
 * @package Filter / sorting
 * @since v2.0.0
 */
const { __, _x, _n, _nx } = wp.i18n;

document.addEventListener('DOMContentLoaded', function() {
	const commonConfirmModal = document.getElementById('tutor-common-confirmation-modal');
	const commonConfirmForm = document.getElementById('tutor-common-confirmation-form');
	const commonConfirmContent = document.getElementById('tutor-common-confirmation-modal-content');

	const filterCourse = document.getElementById('tutor-backend-filter-course');
	if (filterCourse) {
		filterCourse.addEventListener(
			'change',
			(e) => {
				window.location = urlPrams('course-id', e.target.value);
			},
			{ once: true },
		);
	}
	const filterCategory = document.getElementById('tutor-backend-filter-category');
	if (filterCategory) {
		filterCategory.addEventListener(
			'change',
			(e) => {
				window.location = urlPrams('category', e.target.value);
			},
			{ once: true },
		);
	}
	const filterOrder = document.getElementById('tutor-backend-filter-order');
	if (filterOrder) {
		filterOrder.addEventListener(
			'change',
			(e) => {
				window.location = urlPrams('order', e.target.value);
			},
			{ once: true },
		);
	}

	const filterSearch = document.getElementById('tutor-admin-search-filter-form');
	if (filterSearch) {
		filterSearch.onsubmit = (e) => {
			e.preventDefault();
			const search = document.getElementById('tutor-backend-filter-search').value;
			window.location = urlPrams('search', search);
		};
	}

	/**
	 * onclick apply button show checkbox select message
	 * if not selected
	 */
	const applyButton = document.getElementById('tutor-admin-bulk-action-btn');
	const modal = document.querySelector('.tutor-bulk-modal-disabled');
	if (applyButton) {
		applyButton.onclick = () => {
			const bulkIds = [];
			const bulkFields = document.querySelectorAll('.tutor-bulk-checkbox');
			for (let field of bulkFields) {
				if (field.checked) {
					bulkIds.push(field.value);
				}
			}
			if (bulkIds.length) {
				modal.setAttribute('id', 'tutor-bulk-confirm-popup');
			} else {
				tutor_toast(__('Warning', 'tutor'), __('Nothing was selected for bulk action.', 'tutor'), 'error');
				if (modal.hasAttribute('id')) {
					modal.removeAttribute('id');
				}
			}
		};
	}
	/**
	 * Onsubmit bulk form handle ajax request then reload page
	 */
	const bulkForm = document.getElementById('tutor-admin-bulk-action-form');
	if (bulkForm) {
		bulkForm.onsubmit = async (e) => {
			e.preventDefault();
			const formData = new FormData(bulkForm);
			const bulkIds = [];
			const bulkFields = document.querySelectorAll('.tutor-bulk-checkbox');
			for (let field of bulkFields) {
				if (field.checked) {
					bulkIds.push(field.value);
				}
			}
			if (!bulkIds.length) {
				alert(__('Select checkbox for action', 'tutor'));
				return;
			}
			formData.set('bulk-ids', bulkIds);
			formData.set(window.tutor_get_nonce_data(true).key, window.tutor_get_nonce_data(true).value);
			try {
				const loadingButton = document.querySelector('#tutor-confirm-bulk-action.tutor-btn-loading');
				const prevHtml = loadingButton.innerHTML;
				loadingButton.innerHTML = `<div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>`;
				const post = await fetch(window._tutorobject.ajaxurl, {
					method: 'POST',
					body: formData,
				});
				loadingButton.innerHTML = prevHtml;
				if (post.ok) {
					const response = await post.json();
					if (response.success) {
						location.reload();
					} else {
						let { message = __('Something went wrong, please try again ', 'tutor') } = response.data || {};
						tutor_toast(__('Failed', 'tutor'), message, 'error');
					}
				}
			} catch (error) {
				alert(error);
			}
		};
	}

	/**
	 * onclick bulk action button show confirm popup
	 * on click confirm button submit bulk form
	 */
	const bulkActionButton = document.getElementById('tutor-confirm-bulk-action');
	if (bulkActionButton) {
		bulkActionButton.onclick = () => {
			const input = document.createElement('input');
			input.type = 'submit';
			bulkForm.appendChild(input);
			input.click();
			input.remove();
		};
	}

	function urlPrams(type, val) {
		const url = new URL(window.location.href);
		const params = url.searchParams;
		params.set(type, val);
		params.set('paged', 1);
		return url;
	}

	/**
	 * Select all bulk checkboxes
	 *
	 * @since v2.0.0
	 */
	const selectAll = document.querySelector('#tutor-bulk-checkbox-all');
	if (selectAll) {
		selectAll.addEventListener('click', () => {
			const checkboxes = document.querySelectorAll('.tutor-bulk-checkbox');
			checkboxes.forEach((item) => {
				if (selectAll.checked) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			});
		});
	}

	/**
	 * Delete course delete
	 */
	const deleteCourse = document.querySelectorAll('.tutor-admin-course-delete');
	for (let course of deleteCourse) {
		course.onclick = (e) => {
			const id = e.currentTarget.dataset.id;
			if (commonConfirmForm) {
				commonConfirmForm.elements.action.value = 'tutor_course_delete';
				commonConfirmForm.elements.id.value = id;
			}
			if (commonConfirmContent) {
				commonConfirmContent.innerHTML = `
          <div class="tutor-modal-icon">
          <img src="https://i.imgur.com/Nx6U2u7.png" alt=""/>
          </div>
          <div class="tutor-modal-text-wrap">
          <h3 class="tutor-modal-title">
           ${__('Wait!', 'tutor')}
          </h3>
          <p>
            ${__('Are you sure you would like perform this action? We suggest you proceed with caution.', 'tutor')}
          </p>
          </div>
        `;
			}
		};
	}
	/**
	 * Handle common confirmation form
	 *
	 * @since v.2.0.0
	 */
	if (commonConfirmForm) {
		commonConfirmForm.onsubmit = async (e) => {
			e.preventDefault();
			const formData = new FormData(commonConfirmForm);
			//show loading
			const loadingButton = commonConfirmForm.querySelector('.tutor-btn-loading');
			const prevHtml = loadingButton.innerHTML;
			loadingButton.innerHTML = `<div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>`;

			const post = await ajaxHandler(formData);
			//after post back button text
			loadingButton.innerHTML = prevHtml;
			//hide modal
			if (commonConfirmModal.classList.contains('tutor-is-active')) {
				commonConfirmModal.classList.remove('tutor-is-active');
			}
			if (post.ok) {
				const response = await post.json();
				if (response) {
					tutor_toast(__('Delete', 'tutor'), __('Course has been deleted ', 'tutor'), 'success');
					location.reload();
				} else {
					tutor_toast(__('Failed', 'tutor'), __('Course delete failed ', 'tutor'), 'error');
				}
			}
		};
	}
	/**
	 * Handle ajax request show toast message on success | failure
	 *
	 * @param {*} formData including action and all form fields
	 */
	async function ajaxHandler(formData) {
		try {
			const post = await fetch(window._tutorobject.ajaxurl, {
				method: 'POST',
				body: formData,
			});
			return post;
		} catch (error) {
			tutor_toast(__('Operation failed', 'tutor'), error, 'error');
		}
	}
});

export default async function ajaxHandler(formData) {
	try {
		const post = await fetch(window._tutorobject.ajaxurl, {
			method: 'POST',
			body: formData,
		});
		return post;
	} catch (error) {
		tutor_toast(__('Operation failed', 'tutor'), error, 'error');
	}
}
