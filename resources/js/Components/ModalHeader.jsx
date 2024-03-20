import { Link } from '@inertiajs/react'
import React from 'react'

const Header = (props) => {
  return (
    <div className="py-3 w-full flex items-center justify-center bg-pink-200">
      <Link className="px-6 absolute left-0" href="/posts">
        戻る
      </Link>
      <div className="">{props.header}</div>
    </div>
  )
}

export default Header