export default function handler(req, res) {
    if (req.method === "POST") {
        console.log("Datos recibidos:", req.body); // Registrar los datos recibidos
        const { user, password, data } = req.body;

        if (!user || !password) {
            res.status(400).json({ error: "Faltan datos obligatorios" });
            return;
        }

        res.status(200).json({
            User: user,
            Password: password,
            Data: data || "Sin dato adicional",
        });
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}
