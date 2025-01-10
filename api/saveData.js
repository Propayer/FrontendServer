const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin'); // Importamos Firebase Admin
const { getFirestore } = require('firebase-admin/firestore');

// Configuración de Firebase
const firebaseConfig = require('../config/firebase'); // Ajusta la ruta si es necesario
admin.initializeApp(firebaseConfig);  // Inicializamos Firebase con la configuración
const db = getFirestore(); // Inicializamos la base de datos

// Directorio para almacenar los datos de manera persistente (Este código ya no es necesario, ya que Firebase se encarga del almacenamiento)
const dataDir = path.resolve('./data'); // Usamos './data' para almacenar los datos de manera persistente

// Asegúrate de que el directorio de datos exista (No será necesario usarlo si no almacenamos localmente)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

module.exports = async (req, res) => {
  const { method } = req;

  // Endpoint para guardar datos (POST)
  if (method === 'POST') {
    const { user, password, data } = req.body;

    if (!user || !password || !data) {
      return res.status(400).json({ error: 'Missing user, password, or data' });
    }

    try {
      console.log('Recibiendo datos:', { user, password, data });

      const docRef = db.collection('users').doc(`${user}_${password}`);
      const doc = await docRef.get();

      const existingData = doc.exists ? doc.data().data || [] : [];
      console.log('Datos existentes:', existingData);

      existingData.push(data);
      console.log('Datos a guardar:', existingData);

      await docRef.set({ data: existingData }, { merge: true });  // Usamos merge para no sobrescribir todo el documento
      console.log('Datos guardados correctamente');

      return res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ error: 'Failed to save data' });
    }
  }

  // Endpoint para obtener los datos de un usuario específico (GET)
  if (method === 'GET') {
    const { user, password } = req.query;

    // Verificar que se proporcionen usuario y contraseña
    if (!user || !password) {
      return res.status(400).json({ error: 'Missing user or password' });
    }

    try {
      // Crear referencia al documento del usuario
      const docRef = db.collection('users').doc(`${user}_${password}`);
      
      // Obtener documento
      const doc = await docRef.get();

      // Si el documento no existe, devolver error
      if (!doc.exists) {
        return res.status(404).json({ error: 'User or password not found' });
      }

      // Devolver los datos del usuario (si existen)
      return res.status(200).json(doc.data().data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
