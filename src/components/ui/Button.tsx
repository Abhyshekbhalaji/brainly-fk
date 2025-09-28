import React, { type ReactElement } from 'react'

interface ButtonProps {
  text: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant: 'primary' | 'secondary',
  size: 'sm' | 'md' | 'lg',
  startIcon?: ReactElement,
  endIcon?: ReactElement,
}

const Button = (props: ButtonProps) => {

  const baseStyles = 'rounded-lg cursor-pointer transition-all duration-200 font-medium border'
  

  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white border-blue-500 hover:border-blue-400 shadow-sm',
    secondary: 'bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-500 border-blue-200 hover:border-blue-300 shadow-sm'
  }
  

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm', 
    lg: 'px-6 py-3 text-base'
  }
  

  const hasIcons = props.startIcon || props.endIcon
  const iconStyles = hasIcons ? 'flex items-center justify-center gap-2' : ''
  

  const finalStyles = `${baseStyles} ${variantStyles[props.variant]} ${sizeStyles[props.size]} ${iconStyles}`
  
  return (
    <button className={finalStyles} onClick={props.onClick}>
      {props.startIcon}
      <span>{props.text}</span>
      {props.endIcon}
    </button>
  )
}

export default Button