import React from "react"
import { ButtonGroup, Button, Paper, Grid, Typography } from '@material-ui/core';

import abi from '../config/abi';
import * as func from './utils';
import SoftwarePage from './tabs/software';
import LicensePage from './tabs/license';
import BuyPage from './tabs/buy';



class TabProvider extends React.Component {
  constructor(props) {
    super(props);
    this.initStates = this.initStates.bind(this);
    this.loadSoftwares = this.loadSoftwares.bind(this);
    this.getSWinfo = this.getSWinfo.bind(this);
    this.setLiForSale = this.setLiForSale.bind(this);
    this.setNewLiOwner = this.setNewLiOwner.bind(this);
    this.setLiExpiryDate = this.setLiExpiryDate.bind(this);

    this.state = {
      contractAddress: null,
      contract_sh: null,
      allSW: [],
      allLicenses: [],
      swToShow: [],
      liToShow: [],
    }
  }

  componentDidMount() {
    const { web3 } = this.props;
    console.log("🚀 ~ file: tabHandler.jsx ~ line 29 ~ TabProvider ~ componentDidMount ~ web3", this.props)
    let contractAddress = process.env.ROPSTEN_CONTRACT_HANDLER;
    if (this.props.network && this.props.network.includes('binance')) contractAddress = process.env.BINANCE_CONTRACT_HANDLER;
    this.setState({
      contractAddress,
      contract_sh: new web3.eth.Contract(abi.HANDLER_ABI, contractAddress),
    }, this.initStates);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.type !== this.props.type) {
      this.initStates();
    }
  }

  initStates() {
    const { type } = this.props;
    switch (type) {
      case 'software':
        this.loadSoftwares();
        break;
      case 'license':
        this.loadSoftwares();
        break;
      case 'buy':
        this.loadSoftwares();
        break;
    }
  }

  loadSoftwares(forceReload=false) {
    const { allSW, contract_sh } = this.state;
    const { address, web3 } = this.props;

    if (allSW && allSW.length && !forceReload) return;
    func.SH_get_softwares_with_admin(contract_sh, address)
      .then((softwares) => {
        if (softwares) {
          Promise.all(softwares.map((swAddress) => {
            const contract_s = new web3.eth.Contract(abi.SOFTWARE_ABI, swAddress);
            return func.S_get_software_info(contract_s)
              .then((swInfo) => (swInfo ? {
                ...swInfo,
                total: swInfo.nb_license,
                expiry: swInfo.license_time_default,
                address: swAddress,
                contract: contract_s,
              } : null))
          }))
            .then((result) => {
              this.setState({ allSW: result, swToShow: result });
            })
        }
      })
  }

  getSWinfo(software) {
    const { address, web3, switchTab } = this.props;
    func.S_get_info_software_and_all_licenses(software.contract, web3, address)
      .then((details) => {
        if (details) {
          this.setState((prevState) => {
            // prevState.allLicenses.filter()
            const newLicenses = details.licenses
              .map((li) => ({ name: software.name, version: software.version, ...li }));
            return { allLicenses: newLicenses, liToShow: newLicenses };
          }, () => switchTab('license'));
        } else {
          console.error('ERROR: could not query software');
        }
      });
  }

  setLiForSale({ license, priceETH }) {
    console.log("sell LICENSE", license, priceETH)
  }

  setNewLiOwner({ license, newOwner }) {
    console.log("set new owner LICENSE", license, newOwner)
  }

  setLiExpiryDate({ license, newDate }) {
    console.log("set new owner LICENSE", license, newDate)
  }

  render() {
    const { swToShow, liToShow } = this.state;
    const { type } = this.props;

    let content = null;
    switch (type) {
      case 'software':
        content = (
          <SoftwarePage
            softwares={swToShow}
            loadSoftwares={this.loadSoftwares}
            getSWinfo={(args) => {
              this.getSWinfo(args)
            }}
            {...this.props}
          />
        );
        break;
      case 'license':
        content = (
          <LicensePage
            licenses={liToShow}
            setForSale={this.setLiForSale}
            setNewOwner={this.setNewLiOwner}
            setExpiryDate={this.setLiExpiryDate}
            {...this.props}
          />
        );
        break;
      case 'buy':
        content = (
          <BuyPage
            licenses={liToShow.filter(li => li.forSale)}
            {...this.props}
          />
        );
        break;
      default:
        break;
    }

    return (
      <Grid>
        {content}
      </Grid>
    );
  }
}

export default TabProvider;
