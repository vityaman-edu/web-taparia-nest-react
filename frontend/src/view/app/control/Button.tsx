import { ReactNode } from 'react'
import './Button.scss'

export const Button = (p: {
  id?: string
  content: ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => (
  <button 
    id={p.id}
    type="button" 
    className="Button"
    onClick={p.onClick}>{p.content}</button>
)

export default Button
