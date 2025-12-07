import pool from "../config/db.js";

export const getGlobalStats = async (req, res) => {
    try {
        const [stats] = await pool.query("SELECT COUNT(*) AS total_urls, SUM(clicks) AS total_clicks FROM urls;");
        res.status(200).json({ total_urls: stats[0].total_urls, total_clicks: stats[0].total_clicks || 0 });
    } catch (error) {
        res.status(500).send({ error: "Error al conectar con el servidor" });
    }
}