import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
    Link,
    QrCode,
    Copy,
    CopyCheck,
    Trash2,
    MousePointer2,
    Calendar,
} from "lucide-react";
import ModalQR from "./ModalQR";
import ErrorModal from "./ErrorModal";
import { parseApiError } from "../utils/parseApiError";

function URLCard({ url, onDelete }) {
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /* clicks en tiempo real */
    const [clickCount, setClickCount] = useState(url.clicks || 0);

    /* copiar al portapapeles */
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url.original_url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Error al copiar:", err);
        }
    };

    /* eliminar */
    const deleteURL = async () => {
        try {
            const base = process.env.API_URL || "http://localhost:3000";
            const res = await fetch(`${base}/api/url/${url.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!res.ok) {
                const msg = await parseApiError(res);
                throw new Error(msg || "Error al eliminar");
            }
            onDelete(url.id);
        } catch (err) {
            console.error("Error al eliminar:", err.message);
            setErrorMessage(err.message);
        }
    };

    /* contador de clicks */
    const onClick = async () => {
        try {
            const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const res = await fetch(`${base}/api/url/${url.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!res.ok) {
                const msg = await parseApiError(res);
                throw new Error(msg || "Error al registrar click");
            }

            setClickCount((prev) => prev + 1);
        } catch (err) {
            console.error("Error al actualizar click:", err.message);
            setErrorMessage(err.message);
        }
    };

    /* formato de fecha (ahora sí funciona) */
    const timeAgo = (ts) =>
        formatDistanceToNow(new Date(ts), { addSuffix: true, locale: es })
            .replace("en alrededor de", "Hace");

    return (
        <>
            {/* CARD */}
            <div className="w-full max-w-sm min-w-[450px] border border-neutral-700/70 hover:border-white/50 hover:shadow-md rounded-xl relative overflow-hidden transition-all bg-black text-white">
                {/* Header */}
                <div className="flex flex-row p-6 items-center gap-4">
                    {/* icono */}
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden">
                        {url.icono ? (
                            <img
                                src={url.icono}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center bg-neutral-800 rounded-full h-12 w-12">
                                <Link size={22} className="text-white" />
                            </div>
                        )}
                    </div>

                    {/* texto */}
                    <div className="min-w-0 flex-1">
                        <a
                            href={url.original_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl text-blue-500 hover:underline"
                            onClick={onClick}
                        >
                            {url.short_code}
                        </a>
                        <p className="text-neutral-500/90 truncate">
                            {url.original_url}
                        </p>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="flex px-6 mb-6 gap-8">
                    <div className="flex items-center justify-center text-neutral-500/90">
                        <MousePointer2 size={15} className="mr-2" />
                        {clickCount} Clics
                    </div>
                    <div className="flex items-center justify-center text-neutral-500/90">
                        <Calendar size={15} className="mr-2" />
                        {url.fecha ? timeAgo(url.fecha).replace("hace alrededor de", "Hace") : ""}
                    </div>
                </div>

                {/* Opciones */}
                <div className="bg-neutral-900 flex items-center justify-between p-6">
                    <div className="flex gap-6">
                        <button
                            onClick={copyToClipboard}
                            className="flex gap-2 items-center cursor-pointer w-25"
                        >
                            {copied ? (
                                <>
                                    <CopyCheck /> Copiado
                                </>
                            ) : (
                                <>
                                    <Copy /> Copiar
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => setShowQR(true)}
                            className="flex gap-2 items-center cursor-pointer"
                        >
                            <QrCode /> QR
                        </button>
                    </div>
                    <button onClick={deleteURL} className="cursor-pointer">
                        <Trash2 className="hover:text-[#fe4848]" />
                    </button>
                </div>
                <div className="h-6" />
            </div>

            {/* MODAL QR */}
            {showQR && (
                <ModalQR
                    original_url={url.original_url}
                    short_code={url.short_code}
                    onClose={() => setShowQR(false)}
                />
            )}
            <ErrorModal message={errorMessage} onDone={() => setErrorMessage("")} />
        </>
    );
}

export default URLCard;