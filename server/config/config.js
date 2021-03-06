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

process.env.CADUCIDAD_TOKEN = '48h';

// =====================
// Seed Token
// =====================

process.env.SEED = process.env.SEED || 'seed-del-token-desarrollo';

// =====================
// Google Client ID
// =====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '778717547008-ps13ac5q4b9vevosjk3m6gnob8hcnmf6.apps.googleusercontent.com';