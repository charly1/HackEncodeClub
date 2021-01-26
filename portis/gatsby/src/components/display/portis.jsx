import React, { useState, useEffect } from "react"

export function PortisDisplay(props) {
  const {
    logged,
    network,
    balance,
    reputation,
    email,
    address,
    isLoggedIn,
    handleLogout,
    handleSubmit,
    getBalance,
    showPortis,
    title,
    mainBgColor,
    bgColor,
  } = props;

  const [wallet, setTextWallet] = useState(address);
  const [selection, setTextSelector] = useState(network);
  useEffect(() => { setTextWallet(address)}, [address] );
  useEffect(() => { setTextSelector(network)}, [network] );

  return (
    <div className="block-main">
      <h2>{title || 'Hackathon challenge !'}</h2>
      <div className="block-sub">
        <button onClick={() => showPortis()}>Show Portis</button>
        <button onClick={() => isLoggedIn()}>Logged: {logged ? '🔵' : '🔴'}</button>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      {logged ? (
        <>
          {/*<div className="block-sub">
            <form name="s_email" onSubmit={handleSubmit}>
              <label>
                <span className="description">Email:</span>
                <input type="text" value={email} name="f_email" onChange={handleChange} size="40"/>
              </label>
              <input type="submit" value="Set email" />
            </form>
          </div>*/}
          <div className="block-sub">
            <form onSubmit={(evt) => handleSubmit(evt, 'network', selection)}>
              <label>
                <span className="description">Network: 
                <select name="f_network" onBlur={(evt) => setTextSelector(evt.target.value)}>
                  <option value="ropsten">Ethereum Test-net (Ropsten)</option>
                  {/* <option value="mainnet">Ethereum Main-net</option> */}
                  <option value="binance-test">Binance Test-net</option>
                  {/* <option value="binance-main">Binance Main-net</option> */}
                </select>
                </span>
              </label>
              <input type="submit" value="Switch network" />
            </form>
          </div>
          {/* <div className="block-sub">
            <button onClick={() => portis.showBitcoinWallet()}>Bitcoin Wallet</button>
          </div> */}
          <div className="block-sub">
            <form onSubmit={(evt) => handleSubmit(evt, 'address', wallet)}>
              <label>
                <span className="description">Wallet:</span>
                <input
                  type="text"
                  value={wallet}
                  onChange={(evt) => setTextWallet(evt.target.value)}
                  size="50"
                />
              </label>
              <input type="submit" value="Change wallet" />
            </form>
          </div>
          {/* <div className="block-sub">
            <button onClick={() => portis.getExtendedPublicKey()}>Get PKey</button>
            {pkey ? <span className="description">{pkey}</span> : null}
          </div>
          <div className="block-sub">
            <form name="s_tosign" onSubmit={handleSubmit}>
              <label>
                <span className="description">Message to sign:</span>
                <input type="text" value={tosign} name="f_tosign" onChange={handleChange} size="50" />
              </label>
              <input type="submit" value="Sign message" />
            </form>
            {signed
              ? (
              <div className="block-sub">
                <span className="description">Signature: {signed}</span>
              </div>
              )
              : null}
          </div> */}
          {!Number.isNaN(balance)
            ? (
            <div className="block-sub">
              <span className="description">Balance: {balance}</span>
            </div>
            )
            : null}
          {reputation
            ? (
            <div className="block-sub">
              <span className="description">Reputation: {reputation}</span>
            </div>
            )
          : null}
        </>
      ) : null}
    </div>
  )
}

export default PortisDisplay;