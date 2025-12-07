import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Comprobar que el usuario no existe

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0)
      return res.status(409).send({ error: "Este username ya esta en uso" });

    // Comprobar que el correo no esta en uso

    const [existingEmail] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingEmail.length > 0)
      return res.status(409).send({ error: "Este correo ya esta en uso" });

    // Cifrar la password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // Comprobamos que el suaurio existe

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [login, login]
    );

    if (existingUser.length === 0)
      return res.status(400).send({ error: "Credenciales Invalidas" });

    // Comprobar que las passwords coincidan

    const user = existingUser[0];

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res.status(400).send({ error: "Credenciales Invalidas" });

    // Crear Token

    const sesionToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("sesionToken", sesionToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .send({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("sesionToken");
    res.status(200).send({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};

export const getMe = async (req, res) => {
  try {
    const { id, username, email } = req.user;
    res.status(200).send({ id, username, email });
  } catch (error) {
    res.status(500).send({ error: "Error al conectar con el servidor" });
  }
};
