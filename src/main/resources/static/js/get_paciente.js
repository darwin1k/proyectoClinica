document.addEventListener('DOMContentLoaded', function () {

const botonVerPaciente= document.querySelector('#ver_pacientes');

        botonVerPaciente.addEventListener('click', function () {
            const url = '/paciente/listarTodos';

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let pacientesTable = `
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Cédula</th>
                                    <th>Fecha Ingreso</th>
                                    <th>Email</th>
                                    <th>Calle</th>
                                    <th>Número</th>
                                    <th>Localidad</th>
                                    <th>Provincia</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;
                    data.forEach(paciente => {
                        pacientesTable += `
                                <tr>
                                    <td>${paciente.nombre}</td>
                                    <td>${paciente.apellido}</td>
                                    <td>${paciente.cedula}</td>
                                    <td>${paciente.fechaIngreso}</td>
                                    <td>${paciente.email}</td>
                                    <td>${paciente.domicilio.calle}</td>
                                    <td>${paciente.domicilio.numero}</td>
                                    <td>${paciente.domicilio.localidad}</td>
                                    <td>${paciente.domicilio.provincia}</td>
                                </tr>
                            `;
                        });

                    pacientesTable += `
                            </tbody>
                        </table>
                    `;
                    document.getElementById('pacientes-list').innerHTML = pacientesTable;


                })
                .catch(error => {
                    document.getElementById('pacientes-list').innerHTML = `<div style="color: red;">Error: No se pudo obtener la lista de pacientes.</div>`;

                });
        });

        const formularioPacienteEmail = document.querySelector('#formBuscarEmail');
        const resultDivBusquedaEmail = document.getElementById('result_busqueda_email');

            formularioPacienteEmail.addEventListener('submit', function (event) {
            event.preventDefault();

                const emailBuscado = document.getElementById('emailBuscado').value;
                const url = `/paciente/buscarEmail/${emailBuscado}`;
                fetch(url)
                            .then(response => {
                            if (!response.ok) {

                                if (response.status === 404) {
                                    resultDivBusquedaEmail.innerHTML = `<p style="color: blue;">Paciente con email ${emailBuscado} no encontrado.</p>`;
                                    resultDivBusquedaEmail.style.display = 'block';
                                    return ;

                                } else if (response.status === 500) {
                                    resultDivBusquedaEmail.innerHTML = `<p style="color: red;">Error: Hubo un error en el servidor.</p>`;
                                    resultDivBusquedaEmail.style.display = 'block';
                                    return ;

                                }
                            }
                            return response.json();
                            })
                            .then(data => {
                            if (!data) return;
                            console.log(data);
                            let pacienteTable =
                                `
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Cédula</th>
                                            <th>Fecha Ingreso</th>
                                            <th>Email</th>
                                            <th>Calle</th>
                                            <th>Número</th>
                                            <th>Localidad</th>
                                            <th>Provincia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${data.nombre}</td>
                                            <td>${data.apellido}</td>
                                            <td>${data.cedula}</td>
                                            <td>${data.fechaIngreso}</td>
                                            <td>${data.email}</td>
                                            <td>${data.domicilio.calle}</td>
                                            <td>${data.domicilio.numero}</td>
                                            <td>${data.domicilio.localidad}</td>
                                            <td>${data.domicilio.provincia}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `;
                            resultDivBusquedaEmail.innerHTML = pacienteTable;
                            resultDivBusquedaEmail.style.display = 'block';
                            resetUploadForm();
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                resultDivBusquedaEmail.innerHTML = `<p style="color: red;">Error: Hubo un error.</p>`;
                                resultDivBusquedaEmail.style.display = 'block';
                            });
             });

            const formularioPacienteId = document.querySelector('#formBuscarId');
            const resultEliminarDiv = document.getElementById('result_eliminar');

             formularioPacienteId.addEventListener('submit', function (event) {
                         event.preventDefault();

                         const idEliminar = document.getElementById('idEliminar').value;
                         const url = `/paciente/eliminar/${idEliminar}`;

                         fetch(url, {
                                     method: 'DELETE',
                                 })
                                 .then(response => {
                                 console.log(response);
                                     if (response.status === 204) {
                                         resultEliminarDiv.innerHTML = `<p>Paciente con id ${idEliminar} eliminado exitosamente.</p>`;
                                     } else if (response.status === 404) {
                                         resultEliminarDiv.innerHTML = `<p style="color: red;"> Paciente con id ${idEliminar} no encontrado.</p>`;
                                     } else {
                                         throw new Error('Error al eliminar el paciente.');
                                     }
                                     resetUploadForm();
                                 })
                                 .catch(error => {
                                     resultEliminarDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
                                 });
                  });


             function resetUploadForm(){
                           document.querySelector('#emailBuscado').value = "";
                           document.querySelector('#idEliminar').value = "";
                       }
});