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

    const formularioBuscarOdontologo = document.querySelector('#formBuscarOdontologoPorMatricula');
    const messageModificarDiv = document.getElementById('messageModificar');

    formularioBuscarOdontologo.addEventListener('submit', function (event) {
        event.preventDefault();

        const matriculaBuscada = document.getElementById('matriculaBuscada').value;
        const url = `/odontologo/buscarMatricula/${matriculaBuscada}`;


            fetch(url)
             .then(response => {
             if (!response.ok) {

                 if (response.status === 404) {
                     messageModificarDiv.innerHTML = `<p style="color: blue;">Odontólogo con matrícula ${matriculaBuscada} no encontrado.</p>`;
                     messageModificarDiv.style.display = 'block';
                     return ;
                 } else if (response.status === 500) {
                     messageModificarDiv.innerHTML = `<p style="color: red;">Error: Hubo un error en el servidor.</p>`;
                     resumessageModificarDivltDiv.style.display = 'block';
                     return ;
                 }
             }
             // Si no hay errores, procesamos la respuesta en formato JSON
             return response.json();

             })
             .then(data => {
                 if (!data) return;
                     console.log(data);
                     document.getElementById('idEncontrado').value = data.id;
                     document.getElementById('nombreEncontrado').value = data.nombre;
                     document.getElementById('apellidoEncontrado').value = data.apellido;
                     document.getElementById('matriculaEncontrado').value = data.matricula;
             })
             .catch(error => {
                 console.error('Error:', error);
                 resumessageModificarDivltDiv.innerHTML = `<p style="color: red;">Error: Hubo un error.</p>`;
                 resumessageModificarDivltDiv.style.display = 'block';
             });
     });



    const formularioModificarOdontologo = document.querySelector('#modificar_odontologo');
    formularioModificarOdontologo.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
                    nombre: document.querySelector('#nombreEncontrado').value,
                    apellido: document.querySelector('#apellidoEncontrado').value,
                    matricula: document.querySelector('#matriculaEncontrado').value,

                };

                const idEncontrado = document.querySelector('#idEncontrado').value;
                const url = `/odontologo/actualizar/${idEncontrado}`;
                const settings = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                    },
                    body: JSON.stringify(formData)
                }
                console.log("FormData enviado:", JSON.stringify(formData));
                console.log("URL:", url);
                fetch(url, settings)
                    .then(response =>{
                        if (response.ok) {
                            return response.json(); // Si la respuesta es exitosa, obtenemos el JSON
                        } else {
                            throw new Error('Error al actualizar el odontólogo');
                        }
                    })
                    .then(data => {

                        let successAlert = `<p style="color: blue;">¡Éxito! la modicación se realizó correctamente.</p>`;
                        messageModificarDiv.innerHTML  = successAlert;
                        messageModificarDiv.style.display = 'block';
                        resetUploadForm();


                    })
                    .catch(error => {
                        messageModificarDiv.innerHTML = `<p style="color: red;">Error: Algo salió mal. Inténtalo de nuevo.</p>`;
                        messageModificarDiv.style.display = 'block';
                    });
    });






    function resetUploadForm(){
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellido').value = "";
        document.querySelector('#matricula').value = "";

    }




});