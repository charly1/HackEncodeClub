import React from "react"
import { Grid } from '@material-ui/core';

import abi from '../config/abi';
import * as func from './utils';
import SoftwarePage from './tabs/software';
import LicensePage from './tabs/license';
import BuyPage from './tabs/buy';
import { LoaderBar } from './display/loader';

class TabProvider extends React.Component {
  constructor(props) {
    super(props);
    this.initStates = this.initStates.bind(this);
    this.loadSoftwares = this.loadSoftwares.bind(this);
    this.getSWinfo = this.getSWinfo.bind(this);
    this.loadForSale = this.loadForSale.bind(this);
    this.setLiForSale = this.setLiForSale.bind(this);
    this.setNewLiOwner = this.setNewLiOwner.bind(this);
    this.setLiExpiryDate = this.setLiExpiryDate.bind(this);
    this.createLicense = this.createLicense.bind(this);
    this.createSoftware = this.createSoftware.bind(this);
    this.buyLicense = this.buyLicense.bind(this);

    this.onEvent = this.onEvent.bind(this);

    this.state = {
      contractAddress: null,
      contract_sh: null,
      allSW: [],
      allLicenses: [],
      swToShow: [],
      liToShow: [],
      liForSale: [],
      refresh: true,
      loader: false,
    }
  }

  componentDidMount() {
    const { web3 } = this.props;
    let contractAddress = process.env.ROPSTEN_CONTRACT_HANDLER;
    if (this.props.network && this.props.network.includes('binance')) contractAddress = process.env.BINANCE_CONTRACT_HANDLER;
    const contract_sh = new web3.eth.Contract(abi.HANDLER_ABI, contractAddress)
    func.subscribe_SH_software_added(contract_sh, this.onEvent)
    this.setState({
      contractAddress,
      contract_sh,
    }, this.initStates);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.type !== this.props.type) {
      this.initStates();
    }
  }

  onEvent(event, args) {
  console.log("🚀 NEW EVENT! !!bProvider ~ onEvent ~ args", args)
    let text = '';
    switch(event) {
      case 'sw_added':
        text = `New software added (name: ${args.name}`;
        break;
      default:
        break;
    }
    alert(text);
    window.location.reload();
  }

  initStates() {
    const { type } = this.props;
    switch (type) {
      case 'software':
        this.loadSoftwares();
        break;
      case 'license':
        this.loadLicenses();
        break;
      case 'buy':
        this.loadForSale();
        break;
    }
    this.setState(prevState => ({ refresh: !prevState.refresh }))
  }

  loadSoftwares(forceReload=true) {
    const { allSW, contract_sh, swToShow } = this.state;
    const { address, web3 } = this.props;

    if (allSW && allSW.length && !forceReload) {
      this.setState(prevState => ({ refresh: !prevState.refresh }));
      return;
    }
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
            const newLicenses = details.licenses
              .map((li) => ({ name: software.name, version: software.version, ...li }));
            return { allLicenses: newLicenses, liToShow: newLicenses };
          }, () => switchTab('license'));
        } else {
          console.error('ERROR: could not query software');
        }
      });
  }

  loadLicenses() {
    const { address, web3 } = this.props;
    const { allSW } = this.state;
    Promise.all(allSW.map((sw) => {
      const contract_s = new web3.eth.Contract(abi.SOFTWARE_ABI, sw.address);
      return func.S_get_license_with_admin(contract_s, address)
        .then((asAdmin) => func.S_get_license_with_owner(contract_s, address)
          .then((asOwner) => {
            if (!asOwner && !asAdmin) return [];
            if (!asOwner) return asAdmin;
            if (!asAdmin) return asOwner;
            return [...new Set([...asOwner, ...asAdmin])];
          }))
      }))
        .then(loaded => {
          if (loaded && loaded.length) {
            Promise.all(loaded.flat().map((lice) => {
              const contract_l = new web3.eth.Contract(abi.LICENSE_ABI, lice);
              return func.L_get_informations(contract_l);
            }))
              .then(liWithInfo => this.setState({ liToShow: liWithInfo.flat() }));
          }
        });
  }

  loadForSale() {
    const { contract_sh } = this.state;
    const { web3 } = this.props;
    return func.SH_get_licenses_that_are_for_sale(contract_sh)
      .then(licenses => {
        return Promise.all(licenses.map((address) => {
          const contract = new web3.eth.Contract(abi.LICENSE_ABI, address);
          return func.L_get_informations(contract)
            .then((item) => ({ contract, ...item }))
            .catch(() => ({}));
        }));
      })
      .then((allForSale) => {
        return Promise.all(allForSale.map((license) => {
          const contract_s = new web3.eth.Contract(abi.SOFTWARE_ABI, license.software_address_linked);
          return func.S_get_software_info(contract_s)
            .then((result) => {
              console.log('GET SW NAME', result)
              return { ...result, ...license, contract_s }
            })
            .catch(() => license);
        }))
        .then((forSale) => {
          this.setState({ liForSale: forSale })
        });
      })
      .catch((err) => console.error(err));
  }

  createSoftware({ date, name, version }) {
    console.log("create new SWOFTWARE", date, version, name)
    const { contract_sh } = this.state;
    const { web3, address } = this.props;
    this.setState({ loader: true })
    func.SH_addSoftware(contract_sh, web3, address, name, version, date, address)
      .then((res) => (res ? alert('SUCESS creating software!') : null))
      .finally(() => this.setState({ loader: false }))
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

  createLicense({ price, date, software }) {
    console.log("create new LICENSE", software, date)
  }

  buyLicense({ toBuy }) {
  console.log("🚀 ~ file: tabHandler.jsx ~ line 165 ~ TabProvider ~ buyLicense ~ args", toBuy)
  }

  render() {
    const { allSW, swToShow, liToShow, liForSale, refresh, loader } = this.state;
    const { type, address } = this.props;

    let content = null;
    switch (type) {
      case 'software':
        content = (
          <SoftwarePage
            key={`key${String(refresh)}`}
            softwares={allSW}
            loadSoftwares={this.loadSoftwares}
            getSWinfo={(args) => {
              this.getSWinfo(args)
            }}
            createSoftware={this.createSoftware}
            {...this.props}
          />
        );
        break;
      case 'license':
        content = (
          <LicensePage
            key={`key${String(refresh)}`}
            licenses={liToShow}
            softwares={swToShow.filter(sw => sw.admin === address)}
            setForSale={this.setLiForSale}
            setNewOwner={this.setNewLiOwner}
            setExpiryDate={this.setLiExpiryDate}
            createLicense={this.createLicense}
            {...this.props}
          />
        );
        break;
      case 'buy':
        content = (
          <BuyPage
            key={`key${String(refresh)}`}
            licenses={liForSale}
            buyLicense={this.buyLicense}
            {...this.props}
          />
        );
        break;
      default:
        break;
    }
    console.log("🚀 ~ file: tabHandler.jsx ~ line 224 ~ TabProvider ~ render ~ content", content)

    return (
      <Grid>
        {content}
        {loader ? (
          <Grid item style={{ marginTop: '20px', width: '60vw' }}>
            <LoaderBar />
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

export default TabProvider;
