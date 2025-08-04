import React from 'react'

type TitleProps = {
  title: string
  subTitle: string
  classname?: string
  h?: string
  p?: string
}

const Title = ({ title, subTitle, classname, h, p }: TitleProps) => {
  return (
    <div className={`text-center ${classname}`}>
      <h2 className={`uppercase text-2xl md:text-3xl lg:text-5xl ${h}`}>{title}</h2>
      <p className={`mt-4 ${p}`}>{subTitle}</p>
    </div>
  )
}

export default Title
