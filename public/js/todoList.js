const listForm = document.getElementById('listForm')

if (listForm) {
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
            if (element.name === 'id') {
                data[element.name] = element.value
            }
        }
        console.log(data);

        if (data.id) {
            fetch('/lists', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                window.location.href = '/';
            })
                .finally(() => {
                    const formGroups = Array.from(form.querySelectorAll('.form-group'));
                    formGroups.forEach((item, index) => {
                        if (index > 1) {
                            console.log(item);
                            item.remove();
                        }
                    });
                    //form.reset();
                });
        } else {
            fetch('/lists', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                window.location.href = '/';
            })
                .finally(() => {
                    const formGroups = Array.from(form.querySelectorAll('.form-group'));

                    formGroups.forEach((item, index) => {
                        if (index > 1) {
                            item.remove();
                        }
                    });


                   // form.reset();
                });
        }


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
                // if (target.name === 'listItem1') {
                //     return;
                // }

                event.preventDefault()
                target.closest('.form-group').previousElementSibling.querySelector('input[type="text"]').focus();
                target.closest('.form-group').remove();
                return;
            }
        }

        addTodoItem(target);
    }

    function addTodoItem(target) {
        const id = Math.random().toFixed(7).toString().slice(2);

        // console.log(id)
        //
        const form = document.forms.listForm;

        const listItems = form.querySelectorAll('[data-input="listItem"]');

        const html = `
			<div class="form-group">
				<div class="form-check pl-3">
					<input 
              class="form-check-input list__checkbox" 
              type="checkbox" 
              value="" 
              name="check"
					>
					<input 
              class="form-control pt-2 pb-2 pl-1 pr-1 border-0 list__input" 
              type="text" 
              name="listItem-${id}" 
              value="" 
              data-input="listItem" 
              data-checked="false" 
              placeholder="Enter your note and click Enter"
					>
				</div>
			</div>
		`

        if (target.name === 'title' && listItems.length === 0) {
            target.closest('.form-group').insertAdjacentHTML('afterend', html);

            target.closest('.form-group').nextElementSibling.querySelector('[data-input="listItem"]').focus()

        } if (target.name === 'title' && listItems.length) {
            target.closest('.form-group').nextElementSibling.querySelector('[data-input="listItem"]').focus()
        }

        else if (target.dataset.input === 'listItem') {
            target.form.elements[target.form.elements.length - 1].closest('.btn-wrap').insertAdjacentHTML('beforebegin', html);
            target.closest('.form-group').nextElementSibling.querySelector('[data-input="listItem"]').focus()
        }
    }
}

function onBtnDeleteListClick(event, id) {
    event.preventDefault();
    console.log(id);
    if (id !== null && id !== undefined && id.length > 0) {

        fetch('/lists', {
            method: 'DELETE',
            body: JSON.stringify({id: id}),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            window.location.href = '/';
        }).finally(() => {
            console.log("Go to space and delete!!!!!!");
        });

    }
}

