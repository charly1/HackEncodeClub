import React from "react"
import { Link } from "gatsby"

const Menu = () => {
  return (
    <div className="menu flex-container block-menu">
      <Link to="/"><button className="btn-menu" onClick={() => {}}>Home</button></Link>
      <Link to="/portis"><button className="btn-menu" onClick={() => {}}>Portis</button></Link>
    </div>
  )
}

export default Menu