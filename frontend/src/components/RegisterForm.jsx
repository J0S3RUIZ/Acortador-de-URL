import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ErrorModal from "./ErrorModal";
import Loading from "./Loading";
import { parseApiError } from "../utils/parseApiError";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const toggleLoading = () => setLoading((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirm) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    toggleLoading();
    try {
      const base = process.env.API_URL || "http://localhost:3000";
      const res = await fetch(`${base}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const msg = await parseApiError(res);
        throw new Error(msg || "Error al registrarse");
      }
      else {
        navigate("/login");
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
          <span className="text-base font-medium">Correo electrónico</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={userData.email}
            className="mt-2 block w-full rounded-lg border border-neutral-700 bg-neutral-900
                       px-4 py-3 text-base placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-neutral-600"
            onChange={onChange}
            required
          />
        </label>

        <label className="block">
          <span className="text-base font-medium">Usuario</span>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={userData.username}
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

        <label className="block">
          <span className="text-base font-medium">Confirmar contraseña</span>
          <div className="relative mt-2">
            <input
              type={showPwd2 ? "text" : "password"}
              name="confirm"
              placeholder="••••••••"
              value={userData.confirm}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900
                         px-4 py-3 pr-12 text-base placeholder-neutral-500
                         focus:outline-none focus:ring-2 focus:ring-neutral-600"
              onChange={onChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd2((s) => !s)}
              className="absolute inset-y-0 right-0 grid place-content-center px-4
                         text-neutral-400 hover:text-white"
            >
              {showPwd2 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg py-3 h-12 text-base font-semibold mt-10 flex items-center justify-center
            ${loading ? "bg-neutral-600 cursor-not-allowed" : "bg-white text-neutral-800"}`}
        >
          {loading ? <Loading /> : "Registrarse"}
        </button>
      </form>

      <ErrorModal message={errorMessage} onDone={() => setErrorMessage("")} />
    </>
  );
}