import pool from "../config/db.js";
import { getBaseURL } from "../utils/baseURL.js"

export const getUrl = async (req, res) => {
  try {
    const userId = req.user.id;

    const [urls] = await pool.query(
      `SELECT id,
              user_id,
              original_url,
              short_code,
              clicks,
              icono,
              UNIX_TIMESTAMP(fecha)*1000 AS fecha
       FROM urls
       WHERE user_id = ?
       ORDER BY fecha DESC`,
      [userId]
    );

    res.status(200).json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al conectar con el servidor XD" });
  }
};

export const getUrlById = async (req, res) => {
  try {
    const userId = req.user.id;
    const urlId = req.params.id;

    const [url] = await pool.query(
      "SELECT * FROM urls WHERE id = ? AND user_id = ?",
      [urlId, userId]
    );

    if (url.length === 0)
      return res.status(404).send({ error: "URL no encontrada" });

    res.status(200).json(url[0]);
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};

export const addUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const { original_url, short_code } = req.body;

    const dominio = getBaseURL(original_url);

    const icono = `https://www.google.com/s2/favicons?domain=${dominio}&sz=256`;
  


    await pool.query(
      "INSERT INTO urls (user_id, original_url, short_code, icono) VALUES (?, ?, ?, ?)",
      [userId, original_url, short_code, icono]
    );

    res.status(201).send({ message: "URL agregada correctamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const urlId = req.params.id;

    const [url] = await pool.query(
      "SELECT * FROM urls WHERE id = ? AND user_id = ?",
      [urlId, userId]
    );
    

    if (url.length === 0)
      return res.status(404).send({ error: "URL no encontrada" });

    await pool.query("DELETE FROM urls WHERE id = ? AND user_id = ?", [
      urlId,
      userId,
    ]);

    res.status(200).send({ message: "URL eliminada correctamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};


export const deleteAllUrl = async (req, res) => {
  try {
    const userId = req.user.id;

    await pool.query("DELETE FROM urls WHERE user_id = ?", [userId]);

    res.status(200).send({ message: "Todas las URLs eliminadas correctamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
}

export const updateUrl = async (req, res) => {
  try {  
    res.status(200).send({ message: "En contruccion" });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};

export const patchUrlClick = async (req, res) => {
  try {  
    const urlId = req.params.id;
    const userId = req.user.id;

    await pool.query("UPDATE urls SET clicks = clicks + 1 WHERE id = ? AND user_id = ?", [
      urlId,
      userId,
    ]);

    console.log(`URL with ID ${urlId} click count incremented.`);

  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};
