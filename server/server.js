require('./config/config');
//BD
const mongoose = require('mongoose');
//SERVIDOR
const express = require('express');
//BODY PARSER DE PPOST
const bodyParser = require('body-parser');
const colors = require('colors');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// importar rutas
app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE'.green);

});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto: ${process.env.PORT}`.yellow);
});