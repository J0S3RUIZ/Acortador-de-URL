import { useRef, useEffect } from "react";
import {LogOut } from "lucide-react"

export default function UserMenu({ onLogout, onDeleteAll, onDeleteAccount, open, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={menuRef} className="absolute right-0 top-12 z-500 w-56 bg-neutral-900 rounded-xl shadow-lg ring-1 ring-neutral-700 py-2 animate-fade-in">
      <button
        className="w-full text-left px-5 py-3 text-sm text-neutral-200 hover:bg-neutral-800 transition-colors"
        onClick={onDeleteAll}
      >
        Eliminar enlaces
      </button>

      <button
        className="w-full text-left px-5 py-3 text-sm hover:bg-neutral-800 transition-colors border-t border-neutral-800 text-[#fe4848]"
        onClick={onLogout}
      >
        <LogOut className="inline-block mr-2" />
        Cerrar sesión
      </button>
    </div>
  );
}
