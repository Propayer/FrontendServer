const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin'); // Importamos Firebase Admin
const { getFirestore } = require('firebase-admin/firestore');

// Configuración de Firebase
const firebaseConfig = require('../config/firebase.js'); // Ajusta la ruta si es necesario
if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig); // Inicializamos Firebase solo una vez
}
const db = getFirestore();

// Directorio para almacenar los datos de manera persistente (Este código ya no es necesario, ya que Firebase se encarga del almacenamiento)
const dataDir = path.resolve('./data'); // Este código ya no se utiliza para almacenar localmente

// Asegúrate de que esta función sea asíncrona
module.exports = async (req, res) => {  // Aquí hemos añadido async
  const { method } = req;

  // Endpoint para guardar datos (POST)
  if (method === 'POST') {
    const { user, password, data } = req.body;

    if (!user || !password || !data) {
      return res.status(400).json({ error: 'Missing user, password, or data' });
    }

    try {
      console.log('Recibiendo datos:', { user, password, data });

      // Referencia al documento de usuario
      const docRef = db.collection('users').doc(`${user}_${password}`);
      const doc = await docRef.get();  // Este uso de await ahora es válido

      const existingData = doc.exists ? doc.data().data || [] : [];
      console.log('Datos existentes:', existingData);

      // Agregar los nuevos datos al existente
      existingData.push(data);
      console.log('Datos a guardar:', existingData);

      // Guardar los datos en Firestore
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

    // Verificar que se proporcionen usuario y contraseña
    if (!user || !password) {
      return res.status(400).json({ error: 'Missing user or password' });
    }

    try {
      // Crear referencia al documento del usuario
      const docRef = db.collection('users').doc(`${user}_${password}`);
      
      // Obtener documento
      const doc = await docRef.get();  // Este uso de await también es válido

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
