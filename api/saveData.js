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

  // Endpoint para guardar datos
  if (method === 'POST') {
    const { user, password, data } = req.body;

    if (!user || !password || !data) {
      return res.status(400).json({ error: 'Missing user, password, or data' });
    }

    const fileName = `${user}_${password}.json`;
    const filePath = path.join(dataDir, fileName);

    let existingData = [];
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return res.status(200).json({ message: 'Data saved successfully' });
  }

  // Endpoint para obtener todos los datos
  if (method === 'GET') {
    const files = fs.readdirSync(dataDir);
    const allData = files.map(file => {
      const [user, password] = file.replace('.json', '').split('_');
      const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
      return { user, data };
    });

    return res.status(200).json(allData);
  }

  // Endpoint para obtener los datos específicos de un usuario
  if (method === 'POST' && req.url === '/api/getData') {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ error: 'Missing user or password' });
    }

    const fileName = `${user}_${password}.json`;
    const filePath = path.join(dataDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'User or password not found' });
    }

    const userData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return res.status(200).json(userData);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
