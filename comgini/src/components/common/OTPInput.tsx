import { useState } from "react"

type Props = {
  length?: number
  onChange?: (otp: string) => void
}

export default function OTPInput({ length = 6, onChange }: Props) {

  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))

  const handleChange = (value: string, index: number) => {

    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    onChange?.(newOtp.join(""))
  }

  return (
    <div className="d-flex justify-content-center gap-2">

      {otp.map((digit, index) => (
        <input
          key={index}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          className="form-control text-center"
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            fontSize: 18
          }}
        />
      ))}

    </div>
  )
}
