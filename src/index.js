const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rutas = require('./routes/routes');

const app = express(); //inicializar express, app es el server
mongoose.connect('mongodb://localhost/servicioSocial')
    .then(db => console.log('DB connectada'))
    .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan('dev')); 
app.use(express.json()); //comunicacion json para APIrest
//routes
app.use('/parques', rutas);

//static files 
app.use(express.static(__dirname+'/public'));

//server listening
app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'));
})

