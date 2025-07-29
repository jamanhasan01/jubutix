import React from 'react'

type ButtonProps = {
  text: string
  classname?: string
  icon?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}
const Button: React.FC<ButtonProps> = ({ text, classname, icon, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      className={`
        px-3 py-2 
        bg-secondary
        text-primary
        flex 
        gap-2 items-center
        text-center
        justify-center
        rounded text-base font-semibold 
        cursor-pointer 
        transition duration-300 ease-in-out 
        hover:scale-95 
        active:scale-90
        uppercase
        ${classname}
      `}
      onClick={onClick}
    >
      {text} {icon}
    </button>
  )
}

export default Button
