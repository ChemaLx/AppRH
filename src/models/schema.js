const mongoose = require('mongoose');
const {Schema} = mongoose;

const Empleados = new Schema({
    nombre: String,
    apellidoP: String,
    apellidoM: String,
    puesto: String,
    area: String,
    jefe: String,
    horaEntrada: String,
    horaComida: String,
    horaSalida: String
}); 

module.exports = mongoose.model('Empleado', Empleados);

