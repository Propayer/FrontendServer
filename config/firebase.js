// Importa Firebase Admin SDK
const admin = require('firebase-admin');

// Ruta al archivo JSON de las credenciales
const serviceAccount = require('config/firebase-credentials.json');  // Ajusta la ruta según el nombre y la ubicación del archivo

// Inicializa Firebase Admin con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Obtén acceso a Firestore (si lo necesitas)
const db = admin.firestore();

// Exporta db para usarlo en otras partes del proyecto
module.exports = db;
