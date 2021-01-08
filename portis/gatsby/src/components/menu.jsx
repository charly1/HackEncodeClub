import React from "react"
import { Link } from "gatsby"

const Menu = ({ type }) => {
  return (
    <div className="menu flex-container block-menu">
      <Link to="/">
        <button className={`btn-menu ${type === 'ethereum' ? 'current' : ''}`} onClick={() => {}}>Portis</button>
      </Link>
      <Link to="/binance">
        <button className={`btn-menu ${type === 'binance' ? 'current' : ''}`} onClick={() => {}}>Binance</button>
      </Link>
    </div>
  )
}

export default Menu