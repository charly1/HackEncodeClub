import React from "react"
import { Button, Paper, Grid, Typography, Dialog } from '@material-ui/core';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';
import LicenseForm from "../modal/licenseForm";

class Licenses extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.openKanban = this.openKanban.bind(this);
    this.state = {
      filters: {},
      modalOpen: false,
    }
  }

  handleFilter(filters) {
    this.setState(prevState => ({
      filters: filters ? { ...prevState.filters, ...filters } : {},
    }));
  }

  openKanban(item) {
  console.log("🚀 ~ file: license.jsx ~ line 33 ~ Licenses ~ openKanban ~ details", item)
    this.setState({
      modalOpen: true,
      currentLicense: item,
    });
  }

  render() {
    const { licenses, setForSale, setNewOwner, setExpiryDate } = this.props;
    const { modalOpen, currentLicense } = this.state;

    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <CheckBox handleFilter={this.handleFilter}/>
          <SearchBar />
        </Grid>
        <Grid>
          {licenses && licenses.length ? licenses.map(el => (
            <Kanban
              key={el.license_address}
              title={el.name}
              address={el.license_address}
              date={el.expiration_timestamp}
              dateLabel="Expiry: "
              version={el.version}
              forSale={el.license_for_sale}
              owner={el.owner}
              openKanban={() => this.openKanban(el)}
              buttonLabel="View details"
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
            <LicenseForm
              license={currentLicense}
              sellFunction={setForSale}
              changeOwner={setNewOwner}
              changeExpiryDate={setExpiryDate}
              closeFunction={() => this.setState({ modalOpen: false })}
            />
          </div>
        </Dialog>
      </Paper>
    );
  }
}

export default Licenses;
