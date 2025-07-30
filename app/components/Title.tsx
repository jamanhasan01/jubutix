import React from 'react'


type TitleProps={
  title:string,
  subTitle:string
}

const Title = ({ title, subTitle }:TitleProps) => {
  return (
    <div className={`text-center`}>
      <h2 className='uppercase text-2xl md:text-3xl lg:text-5xl'>{title}</h2>
      <p className='mt-4'>{subTitle}</p>
    </div>
  )
}

export default Title
