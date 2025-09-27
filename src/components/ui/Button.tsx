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
  // Base styles
  const baseStyles = 'rounded-lg cursor-pointer transition-all duration-200 font-medium border'
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white border-purple-600 hover:border-purple-700 shadow-sm',
    secondary: 'bg-gray-200 hover:bg-purple-200 active:bg-purple-200 text-purple-700 border-purple-200 hover:border-purple-300'
  }
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm', 
    lg: 'px-6 py-3 text-base'
  }
  
  // Icon styles
  const hasIcons = props.startIcon || props.endIcon
  const iconStyles = hasIcons ? 'flex items-center justify-center gap-2' : ''
  
  // Combine all styles
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