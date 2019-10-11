let form = document.getElementById('addToMongo');

if (form) {
    form.addEventListener('submit', function (event) {

            event.preventDefault();

            let data = {};
            let formData = new FormData(this);

            for (let [name, value] of formData) {

               if(typeof value === "object"){
                   formData.append('nameImg', value.name)
               }
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
               //window.location.href = '/';

            } else {
                fetch('/notes', {
                    method: 'POST',
                    body: formData,
                }).then(r => {
                    console.log(r);

                }).finally(() => {
                     window.location.href = '/';
                    console.log("Go to space!!!!!!");
                });

            }
       // document.getElementById("img").setAttribute("src", `image/'${data.nameImg}'`);

        }
    );
}


function onBtnDeleteClick(event, id, imageId) {
    event.preventDefault();

    if (document.getElementById(id)) {
        document.getElementById(id).remove();
    } else {
        window.location.href = '/';
    }

    console.log(imageId);

    fetch('/notes', {
        method: 'DELETE',
        body: JSON.stringify({id: id}),
        headers: {
            'Content-Type': 'application/json',
        }
    }).finally(() => {
        console.log("Go to space and delete!!!!!!");
    });

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


function onBtnChangeClick(e, id) {

   // e.preventDefault();

   let img = document.getElementById('fileChange');
    return img.click()
}


