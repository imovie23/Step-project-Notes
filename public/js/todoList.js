const todoForm = document.getElementById('todoForm')

todoForm.addEventListener('submit', onSubmitHandler);
todoForm.addEventListener('click', onClickHandler);
todoForm.addEventListener('keydown', onKeyDownHandler);

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
			} else if (element.dataset.input === 'todoItem' && element.value !== '') {
				data[element.name] = {
					value: element.value,
					checked: element.dataset.checked
				}
			}
		}
	}

	console.log(data);

	fetch('/todo', {
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
			if (target.name === 'todoItem1') {
				return;
			}

			event.preventDefault()
			target.closest('.form-group').previousElementSibling.querySelector('[data-input="todoItem"]').focus();
			target.closest('.form-group').remove();
			return;
		}
	}

	addTodoItem(target);
}

function addTodoItem(target) {
	const form = document.forms.todoForm;

	const todoItems = form.querySelectorAll('[data-input="todoItem"]');

	if (target.name === 'title') {

		const firstInput = form.todoItem1;
		firstInput.focus();

	} else if (target.dataset.input === 'todoItem') {
		const html = `
			<div class="form-group">
				<div class="form-check pl-4">
					<input class="form-check-input todo-list__checkbox" type="checkbox" value="" name="check">
					<input class="form-control p-2 border-0 todo-list__input" type="text" name="todoItem${todoItems.length + 1}" value="" data-input="todoItem" data-checked="false" placeholder="Заметка #${todoItems.length + 1}">
				</div>
			</div>
		`

		target.closest('.form-group').insertAdjacentHTML('afterend', html);
		target.closest('.form-group').nextElementSibling.querySelector('[data-input="todoItem"]').focus();
	}
}