const jwtSecret = process.env.JWT_SECRET_KEY;
if (!jwtSecret) {
	console.error("FATAL: JWT_SECRET_KEY not set. Create backend/.env from backend/.env.example and set JWT_SECRET_KEY.");
	process.exit(1);
}
export const JWT_SECRET_KEY = jwtSecret;

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
