export default function handler(req, res) {
    if (req.method === "POST") {
        const { user, password } = req.body;

        // Procesar los datos recibidos
        res.status(200).json({
            User: user,
            Password: password,
            Data: "Dato adicional procesado",
        });
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}
