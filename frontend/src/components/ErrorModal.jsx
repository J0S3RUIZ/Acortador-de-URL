import { useEffect, useState } from "react";
import { X, TriangleAlert } from "lucide-react";

export default function ErrorModal({ message, duration = 2000, onDone }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!message) return;
    setWidth(0);

    let start = performance.now();
    let frame = () => {
      let elapsed = performance.now() - start;
      let pct = Math.min(elapsed / duration, 1);
      setWidth(pct * 100);
      if (pct < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    const t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [message, duration, onDone]);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 z-200 w-full max-w-sm -translate-x-1/2 overflow-hidden rounded-xl">
      <div className="relative rounded-lg bg-neutral-900 text-white shadow-2xl ring-1 ring-neutral-700">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-md flex flex-row"><TriangleAlert color="#fe4848" className="mr-3"/> {message}</span>
          <button
            onClick={onDone}
            className="ml-4 text-neutral-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Barra de progreso roja */}
        <div className="h-1 w-full bg-neutral-800">
          <div
            className="h-full bg-[#fe4848]"
            style={{ width: `${width}%`, transition: "width 0s" }}
          />
        </div>
      </div>
    </div>
  );
}