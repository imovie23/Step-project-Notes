let form = document.getElementById('addToMongo');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let data = {};
    let formElement = new FormData(this);

    for (let [name, value] of formElement) {
        data[name] = value;
    }

    fetch('/notes', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }) .finally(() => {
        console.log("Go to space!!!!!!");
        form.reset();
    });


});


