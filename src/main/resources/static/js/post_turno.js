document.getElementById('turnoForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            paciente: document.getElementById('paciente').value,
            odontologo: document.getElementById('odontologo').value,
            fecha: document.getElementById('fecha').value
        };

        fetch('http://localhost:8080/turnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById('message').innerHTML = "Turno agregado exitosamente!";
            document.getElementById('message').style.display = 'block';
        })
        .catch(error => {
            document.getElementById('message').innerHTML = "Error al agregar turno.";
            document.getElementById('message').style.display = 'block';
        });
    });