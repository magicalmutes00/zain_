import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy text-navy dark:text-white placeholder:text-gray-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25";

export function Field({ label, error, children, required }: { label: string; error?: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy dark:text-white mb-1.5">
        {label} {required && <span className="text-brand-ember dark:text-brand-soft" aria-hidden="true">*</span>}
      </span>
      {children}
      {error && (
        <span className="block mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlCls, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(controlCls, "resize-y min-h-28", props.className)} />;
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(controlCls, props.className)}>
      {children}
    </select>
  );
}
