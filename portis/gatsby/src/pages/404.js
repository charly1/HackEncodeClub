import React from "react"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <main>
      <title>Dapp: Not found</title>
      <h1>Page not found</h1>
      <div>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        {process.env.NODE_ENV === "development" ? (
          <div>
            Visit home page at: <span className="code">/</span>
          </div>
        ) : null}
        <Link to="/"><button className="btn-menu" onClick={() => {}}>Home</button></Link>
      </div>
    </main>
  )
}

export default NotFoundPage
