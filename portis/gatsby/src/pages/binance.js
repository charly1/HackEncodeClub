import React from "react"
import Display from "../components/display";
import Menu from "../components/menu";

const IndexBinance = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu />
      {process.env.BINANCE_NODE ? (
        <Display
          type="binance"
          title="Binance challenge !"
          node={{
            nodeUrl: process.env.BINANCE_NODE,
            chainId: 97,
          }}
        />
      ) : <h3>Sorry, Binance smart chain not yet configured...</h3>}

    </main>
  )
}

export default IndexBinance;
