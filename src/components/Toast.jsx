import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, Sparkles, X, AlertCircle } from 'lucide-react';

const STYLES = {
  success: {
    icon: <CheckCircle2 className="w-[18px] h-[18px] text-emerald-400 shrink-0" />,
    accent: 'bg-emerald-400',
    border: 'border-emerald-400/25',
  },
  promo: {
    icon: <Sparkles className="w-[18px] h-[18px] text-gold-400 shrink-0" />,
    accent: 'bg-gold-400',
    border: 'border-gold-400/30',
  },
  info: {
    icon: <Info className="w-[18px] h-[18px] text-cream-300 shrink-0" />,
    accent: 'bg-cream-300',
    border: 'border-white/15',
  },
  error: {
    icon: <AlertCircle className="w-[18px] h-[18px] text-rose-400 shrink-0" />,
    accent: 'bg-rose-500',
    border: 'border-rose-500/35',
  },
};

/**
 * Toast notifications — top-right, clear type colors, gentle slide-in.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed right-4 top-20 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2.5 sm:right-6"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => {
        const s = STYLES[toast.type] || STYLES.success;
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-xl border ${s.border} bg-ink-800/95 p-3.5 pl-4 shadow-glow-soft backdrop-blur-xl animate-toast-in`}
            role="status"
          >
            <span className={`absolute bottom-0 left-0 top-0 w-[3px] ${s.accent}`} aria-hidden="true" />
            <div className="mt-px">{s.icon}</div>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-[13px] font-bold tracking-wide text-cream-50">
                  {toast.title}
                </h4>
              )}
              <p className="mt-0.5 text-xs leading-relaxed text-cream-400">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-cream-600 transition-colors hover:text-cream-100"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
