import React from "react"
import { Button, Paper, Grid, Typography, Dialog } from '@material-ui/core';

import withLicenseForSale from '../provider/forSale';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';
import BuyForm from "../modal/buyForm";

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.openKanban = this.openKanban.bind(this);
    this.buyLicense = this.buyLicense.bind(this);
    this.state = {
      filters: {},
      currentLicense: null,
      modalOpen: false,
    }
  }

  handleFilter(filters) {
    this.setState(prevState => ({
      filters: filters ? { ...prevState.filters, ...filters } : {},
    }));
  }

  openKanban(item, contract) {
    this.setState({
      modalOpen: true,
      currentLicense: item,
      currentContract: contract,
    });
  }

  buyLicense() {
    const { currentLicense, currentContract } = this.state;
  console.log("🚀 ~ file: ~ arg", currentLicense)
    this.setState({ modalOpen: false });
  }

  render() {
    const { currentLicense, filters, modalOpen } = this.state;
    const { licenses } = this.props;
    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <CheckBox handleFilter={this.handleFilter}/>
          <SearchBar />
        </Grid>
        <Grid>
          {licenses && licenses.length ? licenses.map(el => (
            <Kanban
              key={el.item.license_address}
              title={el.item.name}
              date={el.item.expiration_timestamp}
              dateLabel="Expiry date"
              price={el.item.selling_price_ETH}
              adress={el.item.software_address_linked}
              openKanban={() => this.openKanban(el.item, el.contract)}
              buttonLabel="Buy"
            />
          )) : null}
        </Grid>
        <Dialog
          aria-labelledby="simple-dialog-title"
          fullScreen={visualViewport.width < 500}
          onClose={() => this.setState({ modalOpen: false })}
          open={modalOpen}
        >
          <div style={{ minHeight: '95vh', minWidth: '600px', maxWidth: '100vw' }}>
            <BuyForm
              license={currentLicense}
              buyFunction={this.buyLicense}
              closeFunction={() => this.setState({ modalOpen: false })}
            />
          </div>
        </Dialog>
      </Paper>
    );
  }
}

export default withLicenseForSale(Buy);
