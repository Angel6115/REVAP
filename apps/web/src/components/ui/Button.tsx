<<<<<<< HEAD
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
=======
import React from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'success' | 'outline' | 'danger'
  className?: string
  disabled?: boolean
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  className = '',
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    'px-4 py-2 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants: Record<string, string> = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
      disabled={disabled}
>>>>>>> mvp-supabase
    >
      {children}
    </button>
  )
}
