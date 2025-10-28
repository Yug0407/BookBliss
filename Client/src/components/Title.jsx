import React from 'react'

const Title = ({ title, subTitle, align = 'center', font }) => {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      <h2 className={`font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${font}`}>
        {title}
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed">
        {subTitle}
      </p> 
    </div>  
  )
}

export default Title