import React from "react"
import { Button, Paper, Grid, Dialog } from '@material-ui/core';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';
import LicenseForm from "../modal/licenseForm";
import CreateForm from "../modal/createLicense";


class Licenses extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      filters: [{ tag: 'offers', state: false, label: 'My offers' }],
      modalOpen: false,
      modalContent: null,
    }
  }

  handleSearch(filtered) {
    this.setState({
      toShow: filtered,
    });
  }

  handleFilter(filter) {
    const { licenses, address } =this.props;
    if (!filter) {
      return;
    }
    this.setState({
      filters: [{ tag: 'offers', state: !filter.state, label: 'My offers' }],
      toShow: filter.state ? licenses : licenses.filter(el => el.owner !== address),
    });
  }

  openModal(action, item) {
    const {
      setForSale, setNewOwner, setExpiryDate, createLicense, softwares,
    } = this.props;
    let modalContent = null;
    switch(action) {
      case 'edit':
        modalContent = (
          <LicenseForm
            license={item}
            sellFunction={setForSale}
            changeOwner={setNewOwner}
            changeExpiryDate={setExpiryDate}
            closeFunction={() => this.setState({ modalOpen: false })}
          />
        );
        break;
      case 'create':
        modalContent = (
          <CreateForm
            softwares={softwares}
            createLicense={createLicense}
            closeFunction={() => this.setState({ modalOpen: false })}
          />
        );
        break;
      default:
        break;
    }
    this.setState({
      modalOpen: true,
      modalContent,
    });
  }

  render() {
    const { licenses, softwares, address } = this.props;
    const { modalOpen, modalContent, filters } = this.state;


    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <CheckBox
            filters={filters}
            handleFilter={this.handleSearch}
          />
          <SearchBar items={softwares} searchField="name" handleSearch={this.handleSearch} />
          <Button
            disabled={!softwares.length}
            variant="contained"
            color="primary"
            style={{ width: '180px', margin: '5px 5px 18px 5px' }}
            onClick={() => this.openModal('create')}
          >
            Create license
          </Button>
        </Grid>
        <Grid>
          {licenses && licenses.length ? licenses.map(el => (
            <Kanban
              key={el.license_address}
              wallet={address}
              title={el.name}
              admin={el.admin}
              address={el.license_address}
              date={el.expiration_timestamp}
              dateLabel="Expiry: "
              version={el.version}
              forSale={el.license_for_sale}
              owner={el.owner}
              openKanban={() => this.openModal('edit', el)}
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
            {modalContent}
          </div>
        </Dialog>
      </Paper>
    );
  }
}

export default Licenses;
