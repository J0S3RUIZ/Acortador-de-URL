import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ErrorModal from "./ErrorModal";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { parseApiError } from "../utils/parseApiError";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const toggleLoading = () => setLoading((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();

    toggleLoading();
    try {
      const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include"
      });

      if (!res.ok) {
        const msg = await parseApiError(res);
        throw new Error(msg || "Error al iniciar sesión");
      }

      else {
        navigate("/");
      }

    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      toggleLoading();
    }
  };

  return (
    <>
      <form
        className="w-full max-w-sm space-y-6 text-white"
        onSubmit={onSubmit}
      >
        <label className="block">
          <span className="text-base font-medium">Email o usuario</span>
          <input
            type="text"
            name="login"
            placeholder="tucorreo@ejemplo.com o usuario"
            value={userData.login}
            className="mt-2 block w-full rounded-lg border border-neutral-700 bg-neutral-900
                       px-4 py-3 text-base placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-neutral-600"
            onChange={onChange}
            required
          />
        </label>

        <label className="block">
          <span className="text-base font-medium">Contraseña</span>
          <div className="relative mt-2">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={userData.password}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900
                         px-4 py-3 pr-12 text-base placeholder-neutral-500
                         focus:outline-none focus:ring-2 focus:ring-neutral-600"
              onChange={onChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute inset-y-0 right-0 grid place-content-center px-4
                         text-neutral-400 hover:text-white"
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg py-3 h-12 text-base font-semibold mt-10 flex items-center justify-center
            ${loading ? "bg-neutral-600 cursor-not-allowed" : "bg-white text-neutral-800"}`}
        >
          {loading ? <Loading /> : "Iniciar sesión"}
        </button>
      </form>

      <ErrorModal message={errorMessage} onDone={() => setErrorMessage("")} />
    </>
  );
}