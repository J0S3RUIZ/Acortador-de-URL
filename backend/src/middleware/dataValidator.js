import { body, param, validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

export const validateUrlData = [
	body("original_url")
		.trim()
		.notEmpty()
		.withMessage("El campo original_url es obligatorio")
		.bail()
		.isURL({ require_protocol: true })
		.withMessage("La URL no es válida"),
	body("short_code")
		.trim()
		.notEmpty()
		.withMessage("El campo short_code es obligatorio")
		.bail()
		.isLength({ min: 3, max: 32 })
		.withMessage("short_code debe tener entre 3 y 32 caracteres")
		.matches(/^[A-Za-z0-9_-]+$/)
		.withMessage("short_code solo puede contener letras, números, '-' y '_'."),
	handleValidation,
];

export const validateIdParam = [
	param("id")
		.notEmpty()
		.withMessage("El id es obligatorio")
		.bail()
		.isInt({ gt: 0 })
		.withMessage("El id debe ser un entero positivo"),
	handleValidation,
];

export const validateUpdateUrl = [
	body("original_url")
		.optional()
		.isURL({ require_protocol: true })
		.withMessage("La URL no es válida"),
	body("short_code")
		.optional()
		.matches(/^[A-Za-z0-9_-]+$/)
		.withMessage("El shorter solo puede contener letras, números"),
	handleValidation,
];

export const validateRegister = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage("El username es obligatorio")
		.isLength({ min: 4, max: 30 })
		.withMessage("El username debe tener entre 3 y 30 caracteres"),
	body("email").trim().notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("email debe ser un correo válido"),
	body("password")
		.notEmpty()
		.withMessage("La contraseña es obligatoria")
		.isLength({ min: 8 })
		.withMessage("La contraseña debe tener al menos 8 caracteres"),
	handleValidation,
];

export const validateLogin = [
	body("login").trim().notEmpty().withMessage("El nombre de usario o el email son obligatorios"),
	body("password").notEmpty().withMessage("La contraseña es obligatoria"),
	handleValidation,
];

export default handleValidation;