import { useState, useEffect } from "react";
import URLCard from "./URLCard";
import URLForm from "./URLForm";
import ErrorModal from "./ErrorModal";

function URLSection({ reloadFlag }) {
    const [urls, setUrls] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchUrls = async () => {
        try {
            const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const res = await fetch(`${base}/api/url`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Error al cargar los enlaces");
            }
            const urlsData = await res.json();
            setUrls(urlsData);
        } catch (err) {
            setErrorMessage(err.message);
            console.error("Error fetching URLs:", err.message);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, [reloadFlag]);

    const handleDeleteUrl = (id) => {
        setUrls((prev) => prev.filter((url) => url.id !== id));
    };


    if (errorMessage) {
        return (
            <>
                <section className="bg-neutral-900 text-white p-6 rounded-xl shadow-lg">
                    <div className="text-red-500 bg-red-900/20 p-4 rounded-lg">
                        Error: {errorMessage}
                    </div>
                </section>
                <ErrorModal message={errorMessage} onDone={() => setErrorMessage("")} />
            </>
        );
    }

    if (urls.length === 0) {
        return (
            <section className=" border border-neutral-700/70 hover:border-white/50 hover:shadow-md rounded-xl relative overflow-hidden transition-all bg-black text-white">
                <div className="text-center py-8 text-neutral-400">
                    <p>No hay enlaces acortados todavía.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative z-10">
            <div className="flex justify-center p-4">
                <div className="flex flex-wrap justify-start gap-8">
                    {urls.map((url) => (
                        <URLCard
                            key={url.id}
                            url={url}
                            onDelete={handleDeleteUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default URLSection;
