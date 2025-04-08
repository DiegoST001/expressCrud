const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;


app.use(bodyParser.json());

let usuarios = [
    { id: 1, nombre: "Juan", edad: 30 },
    { id: 2, nombre: "Ana", edad: 12 },
    { id: 3, nombre: "Alex", edad: 43 },
    { id: 4, nombre: "Arturo", edad: 12 },
    { id: 5, nombre: "Berta", edad: 45 },
    { id: 6, nombre: "Anita", edad: 12 },
    { id: 7, nombre: "Juan", edad: 65 },
    { id: 8, nombre: "Lucero", edad: 4 },
];


app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    nuevoUsuario.id = usuarios.length + 1;
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

// Obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (usuario) {
        res.status(200).json(usuario);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});

// Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (usuario) {
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.edad = req.body.edad || usuario.edad;
        res.status(200).json(usuario);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        usuarios.splice(index, 1);
        res.status(200).json({ message: "Usuario eliminado" });
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
