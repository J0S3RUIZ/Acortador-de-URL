import 'dotenv/config';
import express, { json } from "express";

import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/urls.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifyToken } from "./middleware/auth.js";
import { PORT } from "./config/config.js";

const app = express();

// Configuracion de Express
app.set("PORT", PORT);

// Middlewares
app.use(json());
app.use(cookieParser());
app.use(cors({
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/api", statsRoutes);
app.use("/api", verifyToken, urlRoutes);

app.listen(app.get("PORT"), () => {
  console.log(`El servidor esta corriendo por el puerto ${app.get("PORT")}`);
});
