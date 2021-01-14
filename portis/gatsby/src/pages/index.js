import React from "react"
import Display from "../components/display/display";
import Menu from "../components/display/menu";

const IndexPortis = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu type="company" />
      <Display type="ethereum" />
    </main>
  )
}

export default IndexPortis;
