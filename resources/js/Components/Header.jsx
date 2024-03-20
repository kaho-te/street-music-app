import { Link } from '@inertiajs/react'
import React from 'react'

const Header = (props) => {
  return (
    <div className="fixed z-10 py-3 w-full flex items-center justify-center bg-pink-200">

      <div className="">{props.header}</div>
    </div>
  )
}

export default Header