import React from "react"
import Menu from "../components/display/menu";
import PortisDisplay from "../components/display/portis";

const IndexBinance = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu type="trade" />
      <PortisDisplay
        bgColor="mediumpurple"
        mainBgColor="orange"
        view="customer"
      />
    </main>
  )
}

export default IndexBinance;
