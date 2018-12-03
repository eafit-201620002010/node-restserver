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
    urldb = process.env.MONGO_URL;
}

process.env.URLDB = urldb;

// =====================
// Vencimiento del token
// =====================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =====================
// Seed Token
// =====================

process.env.SEED = process.env.SEED || 'seed-del-token-desarrollo';