import React from "react"
import Display from "../components/display";
import Menu from "../components/menu";

const IndexPortis = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu type="ethereum" />
      <Display type="ethereum" title="Portis challenge !" />
    </main>
  )
}

export default IndexPortis;
