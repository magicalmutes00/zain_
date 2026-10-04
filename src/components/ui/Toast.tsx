import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastKind = "success" | "error" | "info";

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

const ToastContext = createContext<(message: string, kind?: ToastKind) => void>(() => {});

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, kind: ToastKind = "info") => {
    const id = nextId++;
    setToasts((prev) => [...prev.slice(-3), { id, kind, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons = { success: CheckCircle2, error: AlertCircle, info: Info };
  const styles = {
    success: "border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-300",
    error: "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300",
    info: "border-navy/15 dark:border-white/15 bg-white dark:bg-navy-deep text-navy dark:text-white",
  };

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 w-full max-w-md px-4" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.kind];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lift ${styles[t.kind]}`}
                role="status"
              >
                <Icon size={18} className="flex-shrink-0" aria-hidden="true" />
                <p className="text-sm font-medium flex-1">{t.message}</p>
                <button onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="opacity-60 hover:opacity-100">
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
