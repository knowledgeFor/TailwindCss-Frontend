import React, { useRef, useState } from 'react'
import { TimeSquareIcon } from './SvgIconComponent/IconsList'

interface AttachButtonProps {
  label?: string
  icon: React.ReactNode
  onClick?: (file: File | null) => void
  iconSize?: string
  fileType?: string // Specify accepted file types (e.g., "image/*")
}

const AttachButton: React.FC<AttachButtonProps> = ({
  label,
  icon,
  onClick,
  iconSize,
  fileType = 'image/*' // Default to only accepting images
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null) // State to store the image preview

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click() // Trigger the file input dialog
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null

    // Validate file type
    if (
      file &&
      fileType.startsWith('image/') &&
      !file.type.startsWith('image/')
    ) {
      console.warn('Invalid file type. Only images are allowed.')
      return // Ignore non-image files
    }

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

    if (onClick) {
      onClick(file)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDeleteImage = () => {
    setImagePreview(null)
    if (onClick) {
      onClick(null)
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {label && !imagePreview && (
        <label className="w-full font-medium text-gray-700">{label}</label>
      )}
      {!imagePreview ? (
        <button
          onClick={handleButtonClick}
          className={`flex items-center bg-gray border border-white-300 rounded-xl justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none ${iconSize}`}
        >
          {icon}
        </button>
      ) : (
        <div className="relative w-40 h-40">
          <img
            src={imagePreview}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg border border-gray-300"
          />
          {/* Delete button */}
          <button
            onClick={handleDeleteImage}
            className="absolute top-2 right-2 bg-gray text-white rounded-full w-[30px] h-[30px] p-1 hover:scale-110 focus:outline-none"
          >
            <TimeSquareIcon />
          </button>
        </div>
      )}
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept={fileType} // Restrict file types
        onChange={handleFileChange}
      />
    </div>
  )
}

export default AttachButton
