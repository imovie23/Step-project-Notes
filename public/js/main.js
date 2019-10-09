let form = document.getElementById('addToMongo');

if (form) {
    form.addEventListener('submit', function (event) {

        event.preventDefault();

        let data = {};
        let formElement = new FormData(this);

        for (let [name, value] of formElement) {
            data[name] = value;
        }

        if (data.id) {
            fetch('/notes', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).finally(() => {

                console.log("Go to space and Update!!!!!!");

            });
            window.location.href='/';

        } else {
            fetch('/notes', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).finally(() => {
                window.location.href='/';
                console.log("Go to space!!!!!!");
            });
        }

    });
}


function onBtnDeleteClick(event, id) {
    event.preventDefault();

    if(document.getElementById(id)){
        document.getElementById(id).remove();
    }else{
        window.location.href='/';
    }

    fetch('/notes', {
        method: 'DELETE',
        body: JSON.stringify({id: id}),
        headers: {
            'Content-Type': 'application/json',
        }
    }).finally(() => {
        console.log("Go to space and delete!!!!!!");
    });


}


