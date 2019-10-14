const todoForm = document.getElementById('todoForm')

todoForm.addEventListener('submit', onSubmitHandler);
todoForm.addEventListener('click', onClickHandler);
todoForm.addEventListener('keydown', onKeyDownHandler);

function onSubmitHandler(event) {
	event.preventDefault();
}

function onClickHandler(event) {
	if (event.target.name !== 'submit') {
		return;
	}

	const form = event.target.form;
	const data = {};

	for (let element of form) {
		if ('text'.includes(element.type)) {
				data[element.name] = element.value;
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

			target.closest('.form-group').previousElementSibling.querySelector('input').focus();
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
				<label>
					<input class="form-control p-2 border-0" type="text" name="todoItem${todoItems.length + 1}" value="" data-input="todoItem" placeholder="Заметка #${todoItems.length + 1}">
				</label>
			</div>
		`

		target.closest('.form-group').insertAdjacentHTML('afterend', html);
		target.closest('.form-group').nextElementSibling.querySelector('[data-input="todoItem"]').focus();
	}
}