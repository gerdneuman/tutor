window.addEventListener('DOMContentLoaded', function() {
	const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
	const comparer = (idx, asc) => (a, b) =>
		((v1, v2) => (v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)))(
			getCellValue(asc ? a : b, idx),
			getCellValue(asc ? b : a, idx)
		);

	document.querySelectorAll('.tutor-table-rows-sorting').forEach((th) =>
		th.addEventListener('click', (e) => {
			const table = th.closest('table');
			const tbody = table.querySelector('tbody');

			const currentTarget = e.currentTarget;
			const icon = currentTarget.querySelector('.a-to-z-sort-icon');
			// If a-to-z icon
			if (icon) {
				// swap class name to change icon
				if (icon.classList.contains('tutor-icon-ordering-a-to-z-filled')) {
					icon.classList.remove('tutor-icon-ordering-a-to-z-filled');
					icon.classList.add('tutor-icon-ordering-z-to-a-filled');
				} else {
					icon.classList.remove('tutor-icon-ordering-z-to-a-filled');
					icon.classList.add('tutor-icon-ordering-a-to-z-filled');
				}
			} else {
				// swap class name to change icon
				// Order up-down-icon
				const icon = currentTarget.querySelector('.up-down-icon');
				if (icon.classList.contains('tutor-icon-order-down-filled')) {
					icon.classList.remove('tutor-icon-order-down-filled');
					icon.classList.add('tutor-icon-order-up-filled');
				} else {
					icon.classList.remove('tutor-icon-order-up-filled');
					icon.classList.add('tutor-icon-order-down-filled');
				}
			}
			Array.from(tbody.querySelectorAll('tr:not(.tutor-do-not-sort)'))
				.sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
				.forEach((tr) => tbody.appendChild(tr));
		})
	);
});
