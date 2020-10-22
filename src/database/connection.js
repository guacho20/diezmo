const { Pool } = require('pg');
require('dotenv').config();

var pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => {
        console.log('Base de datos: ', '\x1b[32m%s\x1b[0m ', 'conectado');
    })
    .catch(err => {
        console.log('Eror al conectar la data' + err);
    });

module.exports = { pool };