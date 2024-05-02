import React from 'react'

const Header = (props) => {
  return (
    <div className="fixed z-10 py-3 w-full flex items-center justify-center bg-[#FFF9F6]">
      <img src={`../storage/image/withmelody_logo.jpeg`} alt="" className="w-10 mr-2"/>
      <div className="text-[#9B1414] font-bold text-xl font-serif">{props.header}</div>
    </div>
  )
}

export default Header