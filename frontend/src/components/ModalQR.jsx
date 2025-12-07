import { X } from "lucide-react";
import QRCode from "react-qr-code";

export default function ModalQR({ original_url, shortCode, onClose }) {

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-neutral-900 rounded-2xl p-6 relative w-72 text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-white mb-3">Código QR</h3>
        <div className="flex justify-center bg-white p-3 rounded-lg">
          <QRCode value={original_url} size={180} level="H" />
        </div>
        <p className="text-neutral-400 text-xs mt-3 break-all">{shortCode}</p>
      </div>
    </div>
  );
}