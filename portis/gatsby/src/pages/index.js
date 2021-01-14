import React from "react"
import Menu from "../components/display/menu";
import CompanyView from "../components/display/company";

const IndexPortis = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu type="company" />
      <CompanyView 
        bgColor="red"
        mainBgColor="gold"
      />
    </main>
  )
}

export default IndexPortis;
