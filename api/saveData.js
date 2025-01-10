const fs = require('fs');
const path = require('path');

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

    // Verificar que los datos necesarios estén presentes
    if (!user || !password || !data) {
      return res.status(400).json({ error: 'Missing user, password, or data' });
    }

    // Crear el nombre del archivo basado en el usuario y la contraseña
    const fileName = `${user}_${password}.json`;
    const filePath = path.join(dataDir, fileName);

    // Leer los datos existentes si el archivo ya existe
    let existingData = [];
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Añadir los nuevos datos al archivo
    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return res.status(200).json({ message: 'Data saved successfully' });
  }

  // Endpoint para obtener los datos de un usuario específico (GET)
  if (method === 'GET') {
    const { user, password } = req.query;

    // Verificar que se proporcionen usuario y contraseña
    if (!user || !password) {
      return res.status(400).json({ error: 'Missing user or password' });
    }

    // Crear el nombre del archivo basado en el usuario y la contraseña
    const fileName = `${user}_${password}.json`;
    const filePath = path.join(dataDir, fileName);

    // Verificar si el archivo del usuario existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'User or password not found' });
    }

    // Leer los datos del archivo y devolverlos
    const userData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return res.status(200).json(userData);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
