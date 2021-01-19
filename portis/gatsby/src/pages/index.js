import React from "react"
import LayoutView from "../components/tabs/layout";

const Page = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <LayoutView 
        bgColor="red"
        mainBgColor="gold"
      />
    </main>
  )
}

export default Page;
