// ¡asegúrate de que el fichero se llame exactamente Button.tsx!
import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        `px-4 py-2 rounded-lg font-medium
         bg-primary text-white hover:bg-primary/90
         focus:ring-2 focus:ring-primary/50
         transition-all ` + className
      }
    >
      {children}
    </button>
  )
}
