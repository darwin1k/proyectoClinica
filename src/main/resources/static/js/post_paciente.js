window.addEventListener('load', function () {
    const formularioPaciente = document.querySelector('#add_new_paciente');

    formularioPaciente.addEventListener('submit', function (event) {
    event.preventDefault();

        const pacienteData = {
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            cedula: document.querySelector('#cedula').value,
            fechaIngreso: document.querySelector('#fechaIngreso').value,
            email: document.querySelector('#email').value,
            domicilio:{
                calle: document.querySelector('#calle').value,
                numero: document.querySelector('#numero').value,
                localidad: document.querySelector('#localidad').value,
                provincia: document.querySelector('#provincia').value,


            }
        };

        const url = '/paciente';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(pacienteData)
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
            let successAlert = `<div style="color: green;">¡Éxito! La operación fue completada correctamente.</div>`
                 document.getElementById('message').innerHTML  = successAlert;
                 resetUploadForm();


            })
            .catch(error => {
                document.getElementById('message').innerHTML = `<div style="color: red;">Error: Algo salió mal. Inténtalo de nuevo.</div>`;
            })
    });




    function resetUploadForm(){
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellido').value = "";
        document.querySelector('#cedula').value = "";
        document.querySelector('#fechaIngreso').value = "";
        document.querySelector('#email').value = "";
        document.querySelector('#calle').value = "";
        document.querySelector('#numero').value = "";
        document.querySelector('#localidad').value = "";
        document.querySelector('#provincia').value = "";

    }
});