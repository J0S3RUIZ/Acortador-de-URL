import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { JWT_SECRET_KEY } from "../config/config.js";

export const verifyToken = async (req, res, next) => {
  try {
    const sesionToken = req.cookies.sesionToken;

    if (!sesionToken) return res.status(401).send({ error: "No autorizado" });

    const dataToken = jwt.verify(sesionToken, JWT_SECRET_KEY);

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [dataToken.id]);
    if (!rows.length) return res.status(401).send({ error: "No autorizado" });

    req.user = rows[0];
    next();

  } catch (err) {
    return res.status(401).json({ error: "No autenticado" });
  }
};
