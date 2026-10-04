import { useRef, useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { uploadToCloudinary } from "@/lib/api";

interface ImageFieldProps {
  value: string;
  folder: string;
  onChange: (url: string, publicId: string) => void;
  onClear: () => void;
}

// File picker → signed direct-to-Cloudinary upload. Parent stores the
// returned secure_url (+ public_id for later deletion).
export function ImageField({ value, folder, onChange, onClear }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url, publicId } = await uploadToCloudinary(file, folder);
      onChange(url, publicId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="flex items-center gap-3">
          <img src={value} alt="Uploaded preview" className="w-20 h-20 rounded-lg object-cover border border-gray-200 dark:border-white/10" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 disabled:opacity-50"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={onClear}
              className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 text-sm text-[#64748B] dark:text-gray-300 hover:border-brand disabled:opacity-50"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Uploading…" : "Upload image"}
        </button>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
