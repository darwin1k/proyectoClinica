document.addEventListener('DOMContentLoaded', function () {

    const botonVerOdontologos = document.querySelector('#ver_odontologos');



    botonVerOdontologos.addEventListener('click', function () {
        const url = '/odontologo/listarTodos';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let odontologosTable =
                `
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Matrícula</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                data.forEach(odontologo => {
                    odontologosTable +=
                        `
                            <tr>
                                <td>${odontologo.nombre}</td>
                                <td>${odontologo.apellido}</td>
                                <td>${odontologo.matricula}</td>
                            </tr>
                        `;
                });
                odontologosTable +=
                `
                        </tbody>
                    </table>
                `;
                document.getElementById('odontologos-list').innerHTML = odontologosTable;
            })
            .catch(error => {
                document.getElementById('odontologos-list').innerHTML = `<div style="color: red;">Error: No se pudo obtener la lista de odontólogos.</div>`;
            });
    });


    const formularioOdontologoMatricula = document.querySelector('#formBuscarMatricula');
    const resultDiv = document.getElementById('result');

    formularioOdontologoMatricula.addEventListener('submit', function (event) {
        event.preventDefault();

        const matriculaBuscado = document.getElementById('matriculaBuscado').value;
        const url = `/odontologo/buscarMatricula/${matriculaBuscado}`;

        fetch(url)
                .then(response => {
                if (!response.ok) {

                    if (response.status === 404) {
                        resultDiv.innerHTML = `<p style="color: blue;">Odontólogo con matrícula ${matriculaBuscado} no encontrado.</p>`;
                        resultDiv.style.display = 'block';
                        return ;

                    } else if (response.status === 500) {
                        resultDiv.innerHTML = `<p style="color: red;">Error: Hubo un error en el servidor.</p>`;
                        resultDiv.style.display = 'block';
                        return ;

                    }
                }
                // Si no hay errores, procesamos la respuesta en formato JSON
                return response.json();

                })
                .then(data => {
                if (!data) return;
                    console.log(data);
                    let odontologoTable =
                                `
                                <table>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Matrícula</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>${data.id}</td>
                                            <td>${data.nombre}</td>
                                            <td>${data.apellido}</td>
                                            <td>${data.matricula}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                `;
                    resultDiv.innerHTML = odontologoTable;
                    resultDiv.style.display = 'block';
                    resetUploadForm();
                })
                .catch(error => {
                    console.error('Error:', error);
                    resultDiv.innerHTML = `<p style="color: red;">Error: Hubo un error.</p>`;
                    resultDiv.style.display = 'block';
                });
    });

     const formularioOdontologoId = document.querySelector('#formBuscarId');
     const resultEliminarDiv = document.getElementById('result_eliminar');

     formularioOdontologoId.addEventListener('submit', function (event) {
             event.preventDefault();

             const idEliminar = document.getElementById('idEliminar').value;
             const url = `/odontologo/eliminar/${idEliminar}`;

             fetch(url, {
                         method: 'DELETE',
                     })
                     .then(response => {
                     console.log(response);
                         if (response.status === 204) {
                             resultEliminarDiv.innerHTML = `<p>Odontólogo con id ${idEliminar} eliminado exitosamente.</p>`;
                         } else if (response.status === 404) {
                             resultEliminarDiv.innerHTML = `<p style="color: red;">Odontólogo con id ${idEliminar} no encontrado.</p>`;
                         } else {
                             throw new Error('Error al eliminar el odontólogo.');
                         }
                         resetUploadForm();
                     })
                     .catch(error => {
                         resultEliminarDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
                     });
      });



      function resetUploadForm(){
              document.querySelector('#matriculaBuscado').value = "";
              document.querySelector('#idEliminar').value = "";
          }




});

