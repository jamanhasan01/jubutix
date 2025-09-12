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
      <h2 className={`capitalize text-3xl font-bold leading-tight text-primary md:text-4xl  ${h}`}>
        {title}
      </h2>
      <p className={`mt-4 text-lg leading-relaxed text-gray-600 mb-12 max-w-2xl mx-auto ${p} `}>
        {subTitle}
      </p>
    </div>
  )
}

export default Title
