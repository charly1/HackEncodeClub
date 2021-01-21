import React from "react"

import abi from '../../config/abi';
import * as func from '../utils';


async function load4sale(contract_sh, web3) {
  return func.SH_get_licenses_that_are_for_sale(contract_sh)
    .then(licenses => {
      return Promise.all(licenses.map((address) => {
        const contract = new web3.eth.Contract(abi.LICENSE_ABI, address);
        return func.L_get_informations(contract)
          .then((item) => ({ item, contract }))
          .catch(() => ({}));
      }));
    });
}

async function getSwName(web3, license) {
  const contract_s = new web3.eth.Contract(abi.SOFTWARE_ABI, license.item.software_address_linked);
  return func.S_get_software_info(contract_s)
    .then((result) => ({ ...license, item: { ...result, ...license.item }, contract_s }))
    .catch(() => license);
}

function forSaleProvider(WrappedComponent) {
  class LicensesForSale extends React.Component {
    constructor(props) {
      super(props);
      this.loadLicenseForSale = this.loadLicenseForSale.bind(this);

      let contractAddress = process.env.ROPSTEN_CONTRACT_HANDLER;
      if (this.props.network && this.props.network.includes('binance')) contractAddress = process.env.BINANCE_CONTRACT_HANDLER;
      this.state = {
        contractAddress,
        licensesForSale: [],
        handlerContract: null,
      };
    }

    componentDidMount() {
      const { contractAddress } = this.state;
      const { web3 } = this.props;
      const handlerContract = web3 ? new web3.eth.Contract(abi.HANDLER_ABI, contractAddress) : null;
      this.setState({ handlerContract }, this.loadLicenseForSale);
    }

    loadLicenseForSale() {
      const { handlerContract } = this.state;
      const { web3 } = this.props;
      load4sale(handlerContract, web3)
      .then((result) => {
        // this.setState({ licensesForSale: result })
        return Promise.all(result.map((license) => getSwName(web3, license)))
        .then((final) => this.setState({ licensesForSale: final }));
      })
      .catch((err) => console.error(err));
    }
  
    render() {
      const { licensesForSale } = this.state;
      console.log("🚀 ~ file: forSale.jsx ~ line 62 ~ LicensesForSale ~ render ~ licensesForSale", licensesForSale)
      return (
        <WrappedComponent
          loadLicenses={this.loadLicenseForSale}
          licenses={licensesForSale}
        />
      );
    }
  }
  forSaleProvider.displayName = `portisWrapper(${getDisplayName(WrappedComponent)})`;

  return LicensesForSale;
}

function getDisplayName(WrappedComponent) {
return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default forSaleProvider;