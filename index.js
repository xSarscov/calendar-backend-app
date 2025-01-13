
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

dbConnection()

const app = express();

app.use( express.static('public') );

app.use( express.json() );

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 4000')
})