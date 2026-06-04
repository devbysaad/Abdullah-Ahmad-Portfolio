import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/api';
import { resolveMediaUrl } from '../../lib/mediaUrl';

export default function CloudinaryImageUpload({
  label = 'Image',
  value = '',
  onChange,
  folder = 'profile',
  hint = 'Uploads to Cloudinary (requires CLOUDINARY_* in server/.env)',
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const preview = resolveMediaUrl(value);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await adminApi.upload.image(file, folder);
      onChange(url);
      toast.success('Uploaded to Cloudinary');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Upload failed — check Cloudinary env on the server';
      toast.error(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-white/80">{label}</p>
      {preview ? (
        <img
          src={preview}
          alt=""
          className="h-24 w-24 rounded-xl object-cover border border-white/10"
        />
      ) : (
        <div className="h-24 w-24 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-xs text-white/40">
          No image
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="btn-outline !py-2 !px-4 text-xs disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Upload to Cloudinary'}
        </button>
        {value ? (
          <button
            type="button"
            className="text-xs px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white"
            onClick={() => onChange('')}
          >
            Clear
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFile}
      />
      <input
        type="text"
        readOnly
        value={value}
        placeholder="Cloudinary URL appears after upload"
        className="w-full bg-transparent border rounded-lg px-3 py-2 text-xs text-white/50 outline-none"
        style={{ borderColor: 'var(--color-border)' }}
      />
      <p className="text-xs text-white/40 m-0">{hint}</p>
    </div>
  );
}
