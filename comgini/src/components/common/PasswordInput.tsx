import { useState } from "react"

type Props = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange
}: Props) {

  const [show, setShow] = useState(false)

  return (
    <div className="mb-3 position-relative">

      {label && (
        <label className="form-label small mb-1">
          {label}
        </label>
      )}

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e)=>onChange?.(e.target.value)}
        placeholder={placeholder}
        className="form-control"
        style={{
          height:46,
          borderRadius:8,
          paddingRight:40
        }}
      />

      <span
        onClick={()=>setShow(!show)}
        style={{
          position:"absolute",
          right:12,
          top: label ? 38 : 12,
          cursor:"pointer",
          opacity:0.6
        }}
      >
        👁
      </span>

    </div>
  )
}
