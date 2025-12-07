import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { parseApiError } from "../utils/parseApiError";

function URLForm({ onClose, onAddUrl }) {
    const [formData, setFormData] = useState({
        original_url: "",
        short_code: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
                const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
                const res = await fetch(`${base}/api/url`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                    credentials: "include",
                });

                if (!res.ok) {
                    const msg = await parseApiError(res);
                    throw new Error(msg || "Error al crear la URL");
                }

                // Created successfully — backend returns { message: ... }
                onAddUrl && onAddUrl(); // trigger parent reload
                setFormData({ original_url: "", short_code: "" }); // Limpiamos formulario
            } catch (err) {
                console.error("Error al crear URL:", err.message);
                setErrorMessage(err.message);
            }
    };

    return (
        <div className="fixed inset-0 z-750 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <form
                onSubmit={onSubmit}
                className="bg-neutral-900 rounded-2xl p-6 relative w-140 text-center"
            >
                <h3 className="text-left text-2xl mb-6">Nueva URL</h3>
                <div className="flex flex-col gap-4 mb-4 ">
                    <input
                        type="text"
                        name="original_url"
                        placeholder="Acortar un enlace nuevo"
                        value={formData.original_url}
                        onChange={onChange}
                        required
                        className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 font-mono text-base focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <input
                        type="text"
                        name="short_code"
                        placeholder="Short Code"
                        value={formData.short_code}
                        onChange={onChange}
                        required
                        className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 font-mono text-base focus:outline-none focus:border-blue-500 transition-all"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="bg-black text-white font-mono px-6 py-3 rounded-lg shadow hover:bg-neutral-800 transition-colors font-bold cursor-pointer"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="bg-white text-black font-mono px-6 py-3 rounded-lg shadow hover:bg-neutral-200 transition-colors font-bold cursor-pointer"
                    >
                        Acortar
                    </button>
                </div>
            </form>
            <ErrorModal message={errorMessage} onDone={() => setErrorMessage("")} />
        </div>
    );
}

export default URLForm;
