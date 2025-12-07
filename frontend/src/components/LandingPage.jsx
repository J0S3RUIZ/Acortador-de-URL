import {
    SquareArrowOutUpRight,
    QrCode,
    Globe,
    Link as LinkIcon,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "./FeatureCard";
import { InteractiveBackground } from "./FondoInteractivo";
import { useState, useEffect } from "react";
import { se } from "date-fns/locale";

export default function LandingPage() {

    const [stats, setSatats] = useState({ total_urls: 0 });

    const fetchStats = async () => {
        try {
            const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const res = await fetch(`${base}/api/stats`);
            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Error al cargar estadísticas");
            }
            setSatats(await res.json());
        } catch (err) {
            console.error("Error fetching stats:", err.message);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen text-white">
            <InteractiveBackground />
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-neutral-700 bg-black/80 backdrop-blur px-28">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white">
                            <SquareArrowOutUpRight className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold">ShortLink</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <button className="bg-transparent border-white text-white px-4 py-1 rounded-lg hover:bg-neutral-800  transition-colors cursor-pointer">
                                Iniciar sesión
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="bg-white text-black px-4 py-1 rounded-lg transition-colors cursor-pointer">
                                Registrarse
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main>
                <section className="container mx-auto px-4 py-24 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                        </span>
                        <span className="text-neutral-400">Código abierto</span>
                    </div>
                    <h1 className="mb-6 text-8xl font-bold tracking-tight">
                        Acortador de URL
                    </h1>
                    <h2 className="mb-6 text-4xl font-bold tracking-tight">
                        Código abierto
                    </h2>
                    <p className="mb-12 text-lg text-neutral-400">
                        Crea enlaces cortos y memorables en segundos. Obtén
                        analíticas, dominios personalizados y control total.
                    </p>
                    {/* Stats */}
                    <div className="grid max-w-3xl mx-auto grid-cols-3 gap-8 rounded-xl border border-neutral-700 bg-neutral-900 p-8">
                        <div>
                            <div className="mb-1 text-3xl font-bold">{stats.total_urls}</div>
                            <div className="text-sm text-neutral-400">
                                Enlaces creados
                            </div>
                        </div>
                        <div className="border-x border-neutral-700 px-4">
                            <div className="mb-1 text-3xl font-bold">{stats.total_clicks}</div>
                            <div className="text-sm text-neutral-400">
                                Clics
                            </div>
                        </div>
                        <div>
                            <div className="mb-1 text-3xl font-bold">100%</div>
                            <div className="text-sm text-neutral-400">
                                Gratis
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="  py-24 px-28">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-5xl font-bold text-center">
                            Todo lo que necesitas para tus enlaces
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 px-20">
                            <FeatureCard
                                icon={<QrCode />}
                                title="Códigos QR"
                                desc="Genera QR personalizables para cada enlace."
                            />
                            <FeatureCard
                                icon={<Globe />}
                                title="Dominios personalizados"
                                desc="Usa tu propio dominio para enlaces cortos y confiables."
                            />
                            <FeatureCard
                                icon={<LinkIcon />}
                                title="Gestión de enlaces"
                                desc="Organiza, edita y actualiza tus enlaces fácilmente."
                            />
                            <FeatureCard
                                icon={<Zap />}
                                title="API"
                                desc="Integra y automatiza con nuestra API RESTful."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-4 text-5xl font-bold">
                            ¿Listo para empezar?
                        </h2>
                        <p className="mb-8 text-lg text-neutral-400">
                            Únete a  ShortLink
                        </p>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                            <Link to="/register">
                                <button className="bg-white text-black px-8 py-3 rounded-lg text-lg transition-colors">
                                    Crear cuenta gratis
                                </button>
                            </Link>
                            <Link to="/dashboard">
                                <button className="border border-white text-white px-8 py-3 rounded-lg text-lg bg-transparent hover:bg-white hover:text-black transition-colors">
                                    Iniciar sesión
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
