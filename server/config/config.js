// =====================
// Puerto
// =====================
process.env.PORT = process.env.PORT || 3000;


// =====================
// Entorno
// =====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =====================
// Base de datos
// =====================
let urldb;

if (process.env.NODE_ENV === 'dev') {
    urldb = 'mongodb://localhost:27017/cafe';
} else {
    urldb = 'mongodb://cafe_user:a123456@ds123454.mlab.com:23454/cafe'
}

process.env.URLDB = urldb;