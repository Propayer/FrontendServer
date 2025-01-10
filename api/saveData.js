const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin'); // Importamos Firebase Admin
const { getFirestore } = require('firebase-admin/firestore');

// Configuración de Firebase
const firebaseConfig = require('../config/firebase'); // Ajusta la ruta si es necesario
admin.initializeApp(firebaseConfig);
const db = getFirestore();

// Directorio para almacenar los datos de manera persistente
const dataDir = path.resolve('./data'); // Usamos './data' para almacenar los datos de manera persistente

// Asegúrate de que el directorio de datos exista
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
      const docRef = db.collection('users').doc(`${user}_${password}`);
      const doc = await docRef.get();

      const existingData = doc.exists ? doc.data().data || [] : [];
      existingData.push(data);

      await docRef.set({ data: existingData });
      return res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ error: 'Failed to save data' });
    }
  }

  // Endpoint para obtener los datos de un usuario específico (GET)
  if (method === 'GET') {
    const { user, password } = req.query;

    if (!user || !password) {
      return res.status(400).json({ error: 'Missing user or password' });
    }

    try {
      const docRef = db.collection('users').doc(`${user}_${password}`);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'User or password not found' });
      }

      return res.status(200).json(doc.data().data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
