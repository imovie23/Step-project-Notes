let form = document.getElementById('addToMongo');

if (form) {
    form.addEventListener('submit', onFormSubmit);


    function onFormSubmit(event) {
        let form = document.getElementById('addToMongo');
        event.preventDefault();

        let data = {};
        let formData = new FormData(form);

        for (let [name, value] of formData) {


            if (typeof value === "object") {
                formData.append('nameImg', value.name);

                if (value.name.length === 0 && data.id) {
                    let file = document.getElementById('imageChange');
                    if (file.value) {
                        data['imageId'] = file.value || '';
                        data['imageName'] = file.name || '';

        console.log(data);

        if (data.id) {
                fetch('/notes', {
                    method: 'PUT',

                    body: formData
                }).finally(() => {
                    }
                }
            }
            data[name] = value;
        }
        formData.append('data', JSON.stringify(data));

        if (data.id) {
            fetch('/notes', {
                method: 'PUT',
                body: formData
            }).then(res => {
               window.location.href = '/';
            }).finally(() => {

                console.log("Go to space and Update!!!!!!");
            });


        } else {
            fetch('/notes', {
                method: 'POST',
                body: formData,
            }).then(r => {
                console.log(r);
               window.location.href = '/';
            }).finally(() => {
                console.log("Go to space!!!!!!");
            });

        }
    }
}


function onBtnDeleteClick(event, id, imageId) {
    event.preventDefault();

    if (document.getElementById(id)) {
        document.getElementById(id).remove();
    } else {
       // window.location.href = '/';
    }

    if (id !== null && id !== undefined && id.length > 0) {
        fetch('/notes', {
            method: 'DELETE',
            body: JSON.stringify({id: id}),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
          // window.location.href = '/';
        }).finally(() => {
            console.log("Go to space and delete!!!!!!");
        });
    }

    if (imageId !== null && imageId !== undefined && imageId.length > 0) {
        }).finally(() => {
            console.log("Go to space and delete!!!!!!");
        });
    }

    if (imageId !== null && imageId !== undefined && imageId.length > 0) {
        fetch('/notes/image', {
            method: 'DELETE',
            body: JSON.stringify({imageId: imageId}),
            headers: {
                'Content-Type': 'application/json',
            }
        }).finally(() => {
            console.log("Go to space and delete!!!!!!");
        });

    }
}

function onBtnChangeClick(e) {


function onBtnChangeClick(e) {
    e.preventDefault();
    let changeImg = document.getElementById('fileChange');
    changeImg.click();
}

function onFileChange(e, id, imageId) {
    onBtnDeleteClick(e, id, imageId);
    onFormSubmit(e);
}

