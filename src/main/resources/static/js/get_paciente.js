document.addEventListener('DOMContentLoaded', function () {

const botonVerPaciente= document.querySelector('#ver_pacientes');

        botonVerPaciente.addEventListener('click', function () {
            const url = '/paciente/listarTodos';

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let pacientesList = "<ul>";
                    data.forEach(paciente => {
                        pacientesList += `<li>Nombre: ${paciente.nombre},
                        Apellido: ${paciente.apellido},
                        Cedula: ${paciente.cedula},
                        Fecha Ingreso: ${paciente.fechaIngreso},
                        Email: ${paciente.email},
                        calle: ${paciente.domicilio.calle},
                        numero: ${paciente.domicilio.numero},
                        localidad: ${paciente.domicilio.localidad},
                        provincia: ${paciente.domicilio.provincia},


                             </li>`;
                    });
                    pacientesList += "</ul>";
                    document.getElementById('pacientes-list').innerHTML = pacientesList;
                })
                .catch(error => {
                    document.getElementById('message').innerHTML = `<div style="color: red;">Error: No se pudo obtener la lista de paciente.</div>`;
                });
        });

        const formularioOdontologoEmail = document.querySelector('#formBuscarEmail');
            const resultDivBusquedaEmail = document.getElementById('result_busqueda_email');

            formularioOdontologoEmail.addEventListener('submit', function (event) {
            event.preventDefault();

                const emailBuscado = document.getElementById('emailBuscado').value;
                const url = `/paciente/buscarEmail/${emailBuscado}`;
                fetch(url)
                            .then(response => response.json())
                            .then(data => {
                            console.log(data);
                            resultDivBusquedaEmail.innerHTML = `<p>Id:${data.id}, Nombre: ${data.nombre},Apellido: ${data.apellido},Cedula:${data.cedula},Fecha Ingreso:${data.fechaIngreso}, Email: ${data.email}  </p>
                            <h4>Domicilio</h4>
                            <p>calle: ${paciente.domicilio.calle},numero: ${paciente.domicilio.numero}, localidad: ${paciente.domicilio.localidad},provincia: ${paciente.domicilio.provincia}</p>`;

                            })
                            .catch(error => {
                            resultDivBusquedaEmail.innerHTML = `<p style="color: red;">Error: Hubo un error.</p>`;
                            })
             });
});