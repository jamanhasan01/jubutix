import React from 'react'

type buttonprops={
    text:string,
    classname?:string
}

const Button:React.FC<buttonprops> = ({ text, classname }) => {
  return (
    <button
      className={`
        px-3 py-2 
        bg-primary text-white 
        rounded text-lg font-semibold 
        cursor-pointer 
        transition duration-300 ease-in-out 
        hover:scale-95 
        active:scale-90
        ${classname}
      `}
    >
      {text}
    </button>
  )
}

export default Button
