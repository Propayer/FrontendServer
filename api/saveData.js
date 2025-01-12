const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin'); // Importamos Firebase Admin
const { getFirestore } = require('firebase-admin/firestore');

// Configuración de Firebase directamente en el archivo
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "backend-database-44031",
    private_key_id: "7141e923925da8ac728ab78ff521d63b3d12c50e",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/NOsN9OlR/qiH\n75S68Y1+ePWGMJr4/bW7mMxx1m3z52cN/QemdOLrBYPhfCKBFKhPsdupcefGX6zB\nyD5L4Ndv5phPqab/lW0DHTH4YKe5qxgSUJk+o5TqVnCosh2Md9lypokWaF1yTods\nJsr6ky9oGk4dh/WEvLZEChOWzF6HYddgGP6HVJYpPx6LhKZNLcLxXbz9UkxxolF4\ntFJ4IXMJL5HtUU8nFzuQKvGO+d+1wBji1cGMGrdorMF6DB88PGuf9S318bXPGcHi\nMDp5M9YqSgdW/YduiC2QteyvXvHCvVlRZq5MJc17lg06Fu+mOp/NEBy6yn4tCNuN\nzYRpgfrbAgMBAAECggEAFFbxQClS3o2L6PXz6NUEO7VrTMyD18PJXrzY1q08QgtW\nG5dUhoD9mImcJ1LYqsmDRAMD/mjnAmOwEWcXNWQkFru9bQ/7e0mucHvdEnJZtTb9\nlwkq3A5zq1/pmRBlc0lWgMs1XwRYGG5BGqCfy/r3Oog90gdh9y5J5z/5KHvx/E2d\nkppzlluIc6nmNeRV364zhJmKJFB6wzNJI5a1I7WBp/YzPr0j+H/UqOg8biFVM41o\nrWs+vv4TLtpSHndw7A+0RDcG/QIpgST6L6p7+yrPw/ZRrwuTZpCQtEkEGHPAu75z\nTq/O1qIL/u9rnWTmFkV2/POnap2IuTDn9RyeycY47QKBgQDhwO93XgHaS7BDwTUN\ngaQF+Q1x6OOzzdyTEMuWobFLWE/djBteOGyZ8H2GJ0jsSZxBt4N2lnw3XuA9UlFJ\ne6DUbMlE8jPJXev6G+THCdXJUEjwfLwtVPeg60HesYDGBE14BCblcb5PUvB4GBJM\n2p+Can7tYcMVhwCi6JvRfaHa3QKBgQDY0xD9y6ATPFcZOTmN9jku+jiUv1Oom1Mp\neGu6MDJzUaABKlqUuIwS3MQ6rmf0sYncdp7eRm4dJsWFnQ0OpsBo4SBMhuwCBdNq\nlwdUA8Oo1QHRfd/OBc9eeafRM4qDhoEZroTIRIzjatuUL1jpQa4gb5kMTl0C3kP1\n9Zwxe+UFFwKBgQC/VL2f9VSspqllQ0Krh8x0I3h5qmAR68+d9QYXTELvEJHfuvcX\nC8s/TMuV/4WWfWypZddNko0EgKycTEAIf3b3kpuii4PIjomJGEr1RiiiziCDcbQq\n13BoOftBuj7hlJPzu9EbdSNOJ4UWw4//AutdpNSea9TjUeAAMhSdoFSlIQKBgQDV\nfwblEGKfbjPJF2rPmRn3YtThyn7Cr6a0V+mjXJ/gowfs/dpRRGJQlGb37RFZhJNd\nrMOD1E/KjonBpcHcol8lJj9aeyPaXggtlWbW2BoJnSv8Lnh38Yqd2SZgPOLv3Toz\non8Gf1FHAMoTYIeork6Zi6lkz6iQEXFTt7NDml4IowKBgQCbNR2c8Ll56p+5heQ1\n1nzsgL4oDMXBFkU7c0Qts7XZ512xtO/5BdX0ioglfyih/z7/N16UVBG0L5cY8DXk\nX3MvHJGw6Q/TzyOstEkMpwFfJdi8KZPd5/qCbE8wrVDgJa9J51F/z2jVlYUYGgcG\nQV3qBkk+Nk2cqIkQD/uHjjmrUQ==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-nfaqx@backend-database-44031.iam.gserviceaccount.com",
    client_id: "104560485061901446017",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nfaqx%40backend-database-44031.iam.gserviceaccount.com",
  }),
});

const db = getFirestore();

// Lógica para guardar y recuperar datos
module.exports = async (req, res) => {
  const { method } = req;

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

// Función para probar la IA
testIaButton.addEventListener("click", async () => {
  try {
    const response = await fetch("https://nodejs-serverless-function-express-82331fdxj-propayers-projects.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: "Funciona?" }), // Enviar la pregunta en el formato esperado
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta de la IA: ${response.statusText}`);
    }

    const data = await response.json();

    // Verificar el prefijo [IA]
    if (data.answer && data.answer.startsWith("[IA]")) {
      responseMessage.textContent = data.answer; // Mostrar la respuesta con prefijo
      responseMessage.classList.remove("hidden");
    } else {
      responseMessage.textContent = "No se recibió mensaje válido.";
      responseMessage.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error al contactar con la IA:", error);
    responseMessage.textContent = `Error al contactar con la IA: ${error.message}`;
    responseMessage.classList.remove("hidden");
  }
});
  return res.status(405).json({ error: 'Method not allowed' });
};
