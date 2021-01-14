import React from "react"
import Menu from "../components/display/menu";
import Admin from "../components/display/admin";

const IndexBinance = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu type="admin" />
      <Admin
        bgColor="#b2bf97"
      />
    </main>
  )
}

export default IndexBinance;
