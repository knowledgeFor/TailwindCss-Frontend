import React from 'react'
import SvgIconComponent from './SvgIconComponent'

interface InputFieldProps {
  label?: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value: string | undefined
  onChange: (value: string) => void
  textarea?: boolean
  rows?: number
  disabled?: boolean
  required?: boolean
  classname?: string
  error?: boolean
  icon?: string
  align?: 'center' | 'left' | 'right'
  iconString?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconString = '',
  align = 'left',
  type = 'text',
  placeholder,
  value,
  onChange,
  textarea = false,
  rows = 3,
  disabled = false,
  required = false,
  error,
  classname = '',
  icon
}) => {
  return (
    <div className={`w-full flex flex-col gap-2`}>
      {label && (
        <label className="w-full font-base text-gray-700 mt-5">{label}</label>
      )}
      {textarea ? (
        <div className="flex flex-col">
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            disabled={disabled}
            required={required}
            className={`w-full text-sm font-circularBook placeholder-white-400 px-3 py-2 border border-white-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-white-400 resize-none bg-black ${classname} ${
              disabled ? 'bg-gray-200 cursor-not-allowed' : ''
            } ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">This field is required</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col relative">
          <div className="flex items-center relative">
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              required={required}
              style={{ textAlign: align }}
              className={`w-full text-sm font-circularBook placeholder-white-400 px-2 py-3 ${(icon || iconString) && 'pr-12'} border border-white-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-white-400 bg-black ${classname} ${
                disabled ? 'bg-gray-200 cursor-not-allowed' : ''
              } ${error ? 'border-red-500' : ''}`}
            />
            {icon && (
              <span className="absolute right-2 text-gray-500">
                <SvgIconComponent name="search" size="20px" />
              </span>
            )}
            {iconString && (
              <span className="absolute right-2 text-gray-500">
                <div>{iconString}</div>
              </span>
            )}
          </div>
          {error && value === '' ? (
            <p className="text-sm text-red-500 mt-1">This field is required</p>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default InputField
