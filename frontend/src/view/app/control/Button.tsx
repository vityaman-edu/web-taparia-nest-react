import { ReactNode } from 'react'
import './Button.scss'

export const Button = (p: {
  id: string
  content: ReactNode
}) => (
  <button 
    id={p.id} 
    type="button" 
    className="Button">{p.content}</button>
)

export default Button
