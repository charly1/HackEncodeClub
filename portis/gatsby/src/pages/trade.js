import React from "react"
import Menu from "../components/display/menu";
import CustomerView from "../components/display/customer";

const IndexBinance = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu type="trade" />
      <CustomerView
        bgColor="#b2bf97"
        mainBgColor="purple"
      />
    </main>
  )
}

export default IndexBinance;
