const listForm = document.getElementById('listForm')

listForm.addEventListener('submit', onSubmitHandler);
listForm.addEventListener('click', onClickHandler);
listForm.addEventListener('keydown', onKeyDownHandler);

function onSubmitHandler(event) {
	event.preventDefault();
}

function onClickHandler(event) {
	const target = event.target;

	if (target.name !== 'submit' && target.name !== 'check') {
		return;
	}

	if (target.name === 'check') {
		if (target.checked === true) {
			target.nextElementSibling.classList.add('js-done');
			target.nextElementSibling.dataset.checked = "true";
		} else {
			target.nextElementSibling.classList.remove('js-done');
			target.nextElementSibling.dataset.checked = "false";
		}
		return;
	}

	const form = target.form;
	const data = {};

	for (let element of form) {
		if ('text'.includes(element.type)) {
			if (element.name === 'title' && element.value !== '') {
				data[element.name] = element.value;
			} else if (element.dataset.input === 'listItem' && element.value !== '') {
				data[element.name] = {
					value: element.value,
					checked: element.dataset.checked
				}
			}
		}
	}

	console.log(data);

	fetch('/lists', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.finally(() => {
			const formGroups = Array.from(form.querySelectorAll('.form-group'));

			formGroups.forEach((item, index) => {
				if (index > 1) {
					item.remove();
				}
			});

			form.reset();
		});
}

function onKeyDownHandler(event) {
	const target = event.target;

	if (target.tagName !== 'INPUT' || (event.key !== "Enter" && event.key !== "Backspace")) {
		return
	}

	if (event.key === "Backspace" && target.tagName === 'INPUT') {

		if (target.value || target.name === 'title') {
			return;
		}

		if (!target.value && target.name !== 'title') {
			if (target.name === 'listItem1') {
				return;
			}

			event.preventDefault()
			target.closest('.form-group').previousElementSibling.querySelector('[data-input="listItem"]').focus();
			target.closest('.form-group').remove();
			return;
		}
	}

	addTodoItem(target);
}

function addTodoItem(target) {
	const form = document.forms.listForm;

	const listItems = form.querySelectorAll('[data-input="listItem"]');

	if (target.name === 'title') {

		const firstInput = form.listItem1;
		firstInput.focus();

	} else if (target.dataset.input === 'listItem') {
		const html = `
			<div class="form-group">
				<div class="form-check pl-3">
					<input class="form-check-input list__checkbox" type="checkbox" value="" name="check">
					<input class="form-control pt-2 pb-2 pl-1 pr-1 border-0 list__input" type="text" name="listItem${listItems.length + 1}" value="" data-input="listItem" data-checked="false" placeholder="Заметка #${listItems.length + 1}">
				</div>
			</div>
		`

		target.closest('.form-group').insertAdjacentHTML('afterend', html);
		target.closest('.form-group').nextElementSibling.querySelector('[data-input="listItem"]').focus();
	}
}