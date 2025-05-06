import { useRef } from 'react';

interface UploadBoxProps {
  label: string;
  accept: string;
  required?: boolean;
  value: File | null;
  onFileChange: (file: File | null) => void;
}

export default function UploadBox({ label, accept, required, value, onFileChange }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center border-2 border-dashed rounded-lg p-4 w-full max-w-xs bg-gray-50">
      <label className="mb-2 font-semibold">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        required={required}
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0] || null;
          onFileChange(file);
        }}
      />
      <button
        type="button"
        className="mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => inputRef.current?.click()}
      >
        {value ? 'Change File' : 'Select File'}
      </button>
      {value && (
        <div className="flex flex-col items-center mt-2">
          <img
            src={URL.createObjectURL(value)}
            alt="preview"
            className="w-24 h-16 object-cover rounded border mb-1"
          />
          <span className="text-xs text-gray-600 truncate max-w-[120px]">{value.name}</span>
        </div>
      )}
    </div>
  );
} 