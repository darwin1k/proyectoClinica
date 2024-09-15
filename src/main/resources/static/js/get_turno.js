/ Listar todos los turnos
    document.getElementById('ver_turno').addEventListener('click', function () {
        fetch('http://localhost:8080/turnos', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            let turnoList = document.getElementById('turno-list');
            turnoList.innerHTML = '';
            data.forEach(turno => {
                turnoList.innerHTML += `<div>Turno ID: ${turno.id}, Paciente: ${turno.paciente}, Odontólogo: ${turno.odontologo}, Fecha: ${turno.fecha}</div>`;
            });
        });
    });

    // Eliminar turno
    document.getElementById('formEliminarTurno').addEventListener('submit', function (e) {
        e.preventDefault();
        const idEliminar = document.getElementById('idEliminar').value;

        fetch('http://localhost:8080/turnos/eliminar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idEliminar })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result_eliminar').innerHTML = 'Turno eliminado correctamente';
        });
    });

    // Modificar turno
    document.getElementById('formModificarTurno').addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            id: document.getElementById('idModificar').value,
            paciente: document.getElementById('nuevoPaciente').value,
            odontologo: document.getElementById('nuevoOdontologo').value,
            fecha: document.getElementById('nuevaFecha').value
        };

        fetch('http://localhost:8080/turnos/modificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body