# Protis API

## Install

With package.json, install packages locally and test demo with:  

`npm install`  

### Build Demo

`npm run build`

### Run Demo

`npm run start`

## Use package

- DAPP_ID: your DappId
- NETWORK: blockchain network

```js
const wrapper = require('portis-wrp');
const portis = new PortisWRP(DAPP_ID, NETWORK, options = { scope: ['email', 'reputation'] }, debug = false)

// use with web3
const web3 = new Web3(portis.provider);
```

## Demo

A demonstration with simple HTML UI

## Portiswrp

Portis wrapper packaged to port code in other environments

## Gatsby

Admin UI to interract with Smart contract
