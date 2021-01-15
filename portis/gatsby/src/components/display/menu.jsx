import React from "react"
import { Link } from "gatsby"

const Menu = ({ type }) => {
  return (
    <div className="menu flex-container block-menu">
      <Link to="/">
        <button className={`btn-menu ${type === 'company' ? 'current' : ''}`} onClick={() => {}}>Business</button>
      </Link>
      <Link to="/trade">
        <button className={`btn-menu ${type === 'trade' ? 'current' : ''}`} onClick={() => {}}>Customer</button>
      </Link>
      <Link to="/admin">
        <button className={`btn-menu ${type === 'admin' ? 'current' : ''}`} onClick={() => {}}>Admin</button>
      </Link>
    </div>
  )
}

export default Menu