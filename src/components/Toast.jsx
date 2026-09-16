import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, Sparkles, X, AlertCircle } from 'lucide-react';

const STYLES = {
  success: {
    icon: <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-success-500" />,
    accent: 'bg-success-500',
    border: 'border-cream-300',
  },
  promo: {
    icon: <Sparkles className="h-[18px] w-[18px] shrink-0 text-caramel-500" />,
    accent: 'bg-caramel-500',
    border: 'border-caramel-400/50',
  },
  info: {
    icon: <Info className="h-[18px] w-[18px] shrink-0 text-cocoa-500" />,
    accent: 'bg-cocoa-500',
    border: 'border-cream-300',
  },
  error: {
    icon: <AlertCircle className="h-[18px] w-[18px] shrink-0 text-ember-500" />,
    accent: 'bg-ember-500',
    border: 'border-ember-500/35',
  },
};

/**
 * Toast notifications — top-right, white cards, gentle slide-in.
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
            className={`pointer-events-auto relative flex animate-toast-in items-start gap-3 overflow-hidden rounded-2xl border ${s.border} bg-white p-3.5 pl-4 shadow-float`}
            role="status"
          >
            <span className={`absolute bottom-0 left-0 top-0 w-[3px] ${s.accent}`} aria-hidden="true" />
            <div className="mt-px">{s.icon}</div>
            <div className="min-w-0 flex-1">
              {toast.title && (
                <h4 className="text-[13px] font-extrabold tracking-wide text-cocoa-900">
                  {toast.title}
                </h4>
              )}
              <p className="mt-0.5 text-xs leading-relaxed text-cocoa-500">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-cocoa-400 transition-colors hover:text-cocoa-900"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
