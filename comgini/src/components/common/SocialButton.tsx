type Props = {
  icon: string
  text: string
  onClick?: () => void
}

export default function SocialButton({ icon, text, onClick }: Props) {

  return (
    <button
      className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
      onClick={onClick}
    >
      <img src={icon} alt={text} width={18} />
      <span className="small">{text}</span>
    </button>
  )
}
