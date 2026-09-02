"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.96A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.335 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.97-7.824-6.804-8.064-7.118-.23-.314-1.932-2.574-1.932-4.908s1.222-3.48 1.656-3.956c.434-.476.948-.596 1.264-.596.314 0 .63.002.904.016.29.014.68-.11 1.064.812.39.948 1.326 3.24 1.44 3.474.116.234.194.508.04.82-.156.314-.234.51-.468.784-.234.274-.49.612-.702.822-.234.234-.476.488-.204.96.274.47 1.216 2.006 2.612 3.25 1.794 1.598 3.306 2.094 3.776 2.328.47.234.744.196 1.018-.118.274-.314 1.176-1.372 1.49-1.844.314-.474.63-.39 1.064-.234.434.156 2.724 1.284 3.194 1.518.468.234.782.352.898.546.114.196.114 1.126-.278 2.226z" />
  </svg>
);

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "2347065095024"; // HOK WhatsApp number
  const defaultMessage = "Hi HOK! I'd like to know more about your Korean skincare products.";

  // Hide widget on product detail pages (/shop/[product])
  const isProductPage = pathname?.startsWith("/shop/") && pathname !== "/shop";

  useEffect(() => {
    // Show the widget after a short delay for a nice entrance
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const text = message.trim() || defaultMessage;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}>
      {/* Chat Popup */}
      <div className={`absolute bottom-16 left-0 w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-hok-mist/60 transition-all duration-300 origin-bottom-left ${isOpen
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-90 pointer-events-none"
        }`}>
        {/* Header */}
        <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <WhatsAppIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-outfit font-bold text-sm">HOK Beauty</h4>
            <p className="text-white/70 text-xs font-outfit">Typically replies within minutes</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="bg-[#ECE5DD] p-4 min-h-[120px]">
          {/* Simulated message bubble */}
          <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%]">
            <p className="text-sm text-gray-800 font-manrope leading-relaxed">
              Hello! 👋 Welcome to <span className="font-semibold">Home of Korean Beauty</span>. How can we help you today?
            </p>
            <span className="text-[10px] text-gray-400 block text-right mt-1 font-manrope">
              Just now
            </span>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white px-3 py-3 flex items-center gap-2 border-t border-hok-mist/40">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-hok-linen/50 rounded-full px-4 py-2.5 text-sm font-manrope text-hok-espresso placeholder:text-hok-stone/50 outline-none focus:ring-1 focus:ring-[#25D366]/30 transition-all"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center shrink-0 transition-colors active:scale-90"
            aria-label="Send message on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-[1px]">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className={`group w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen
          ? "bg-hok-walnut hover:bg-hok-espresso border border-white/20"
          : "bg-[#25D366] hover:bg-[#128C7E]"
          }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <WhatsAppIcon className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Pulse ring when closed */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
      )}
    </div>
  );
}
