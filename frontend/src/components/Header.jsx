import { useNavigate } from "react-router-dom";
// no local state needed for menu
// UserMenu removed — show logout button directly in header

function Header({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    // Redirige inmediatamente al landing y hace logout en background
    navigate("/");
    const base = process.env.API_URL || "http://localhost:3000";
    fetch(`${base}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("Error al cerrar sesión (backend):", data.error || res.statusText);
        }
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error de red al cerrar sesión:", err);
      });
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-b-neutral-700 bg-black/80 backdrop-blur px-14">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-8 flex-1">
          <span className="font-bold text-xl tracking-tight text-white font-mono">
            ShortLink
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="user w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold text-sm">
            {user?.username?.slice(0, 2)?.toUpperCase()}
          </div>
          <button
            onClick={logout}
            className="ml-2 px-3 py-2 rounded-md bg-transparent text-white border border-neutral-700 hover:bg-neutral-800 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
