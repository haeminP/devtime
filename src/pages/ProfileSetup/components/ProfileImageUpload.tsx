import { useRef, useState } from 'react'
import { Camera } from 'lucide-react'
import { profileApi } from '@/api/profile'

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg']

interface ProfileImageUploadProps {
  onChange: (key: string) => void
}

function ProfileImageUpload({ onChange }: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ref to the hidden <input type="file"> — lets us trigger the file picker
  // from our custom UI without showing the ugly default browser button
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleBoxClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate before uploading
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only .png or .jpg files are allowed.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('File size must be under 5MB.')
      return
    }

    setError(null)
    setIsUploading(true)

    // Show a local preview immediately — no need to wait for S3
    // URL.createObjectURL creates a temporary URL pointing to the local file
    setPreview(URL.createObjectURL(file))

    try {
      // Step 1: get a presigned URL from our API
      const { presignedUrl, key } = await profileApi.getPresignedUrl(file.name, file.type)

      // Step 2: upload the file directly to S3
      // Notice: no Authorization header — the presigned URL itself is the auth
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })

      // Step 3: tell the form about the key (not the file, not the URL — just the key)
      onChange(key)
    } catch {
      setError('Upload failed. Please try again.')
      setPreview(null)
    } finally {
      setIsUploading(false)
      // Reset input so the same file can be re-selected if needed
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">Profile Image</label>

      <div className="flex items-end gap-3">
        {/* Custom upload box */}
        <button
          type="button"
          onClick={handleBoxClick}
          disabled={isUploading}
          className="w-[120px] h-[120px] rounded-[8px] border border-primary flex items-center justify-center bg-gray-50 hover:bg-primary/5 transition-colors overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {preview ? (
            <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
          ) : (
            <Camera size={28} className="text-primary" />
          )}
        </button>

        {/* Hint text */}
        <p className="text-sm text-gray-400">Under 5MB — .png or .jpg only</p>
      </div>

      {/* Hidden real file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleFileChange}
        className="hidden"
      />

      {isUploading && <p className="text-xs text-gray-400">Uploading...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default ProfileImageUpload
