import { useState, useEffect } from "react";
import Header from "../components/Header";
import URLSection from "../components/URLSection";
import URLForm from "../components/URLForm";
import { InteractiveBackground } from "../components/FondoInteractivo";
import LandingPage from "../components/LandingPage";

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showURLForm, setShowURLForm] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(0);

    const fetchUser = async () => {
        try {
            const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const res = await fetch(`${base}/auth/getMe`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Error al cargar el usuario");
            }
            const userData = await res.json();
            setUser(userData);
        } catch (err) {
            console.error("Error fetching user:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p>Cargando panel...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <LandingPage />;
    }

    return (
        <div className="min-h-screen text-white relative">
            <InteractiveBackground />
            <Header user={user} />
            <main className="container mx-auto p-6 relative z-10">
                <div className="flex justify-between items-center px-8 mb-4">
                    <h1 className="text-4xl font-bold">Mis enlaces</h1>
                    <button
                        className="mt-4 bg-white text-black px-6 py-3 rounded-lg shadow hover:bg-neutral-200 transition-colors font-bold cursor-pointer"
                        onClick={() => setShowURLForm(true)}
                    >
                        Nuevo enlace
                    </button>
                </div>

                {showURLForm && (
                    <URLForm
                        onClose={() => {
                            setShowURLForm(false);
                        }}
                        onAddUrl={() => {
                            setReloadFlag((p) => p + 1);
                            setShowURLForm(false);
                        }}
                    />
                )}
                <URLSection reloadFlag={reloadFlag} />
            </main>
        </div>
    );
}

export default Home;
