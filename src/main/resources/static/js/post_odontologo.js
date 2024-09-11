window.addEventListener('load', function () {


    const formulario = document.querySelector('#add_new_odontologo');

    formulario.addEventListener('submit', function (event) {
    event.preventDefault();


        const formData = {
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            matricula: document.querySelector('#matricula').value,

        };

        const url = '/odontologo';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response =>{
                console.log(response);
                return response.json();
            })
            .then(data => {

                let successAlert = `<p style="color: blue;">¡Éxito! La operación fue completada correctamente.</p>`;
                document.getElementById('message').innerHTML  = successAlert;
                 document.getElementById('message').style.display = 'block';
                resetUploadForm();


            })
            .catch(error => {
                document.getElementById('message').innerHTML = `<p style="color: red;">Error: Algo salió mal. Inténtalo de nuevo.</p>`;
                document.getElementById('message').style.display = 'block';
            })
    });




    function resetUploadForm(){
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellido').value = "";
         document.querySelector('#matricula').value = "";

    }




});