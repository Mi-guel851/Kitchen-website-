import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, Sparkles, X, AlertCircle } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        let borderClass = 'border-emerald-500/30';
        let bgClass = 'bg-[#121620]/95';

        if (toast.type === 'promo') {
          icon = <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = 'border-amber-500/40';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
          borderClass = 'border-blue-500/30';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          borderClass = 'border-rose-500/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl ${bgClass} border ${borderClass} shadow-2xl backdrop-blur-xl transition-all duration-300 animate-slide-in`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1">
              {toast.title && (
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
