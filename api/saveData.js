const fs = require('fs');
const path = require('path');

const dataDir = path.resolve('data');

// Asegúrate de que el directorio de datos exista
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

module.exports = async (req, res) => {
  const { method } = req;

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

  if (method === 'GET') {
    const files = fs.readdirSync(dataDir);
    const allData = files.map(file => {
      const [user, password] = file.replace('.json', '').split('_');
      const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
      return { user, data };
    });

    return res.status(200).json(allData);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
