import React from "react"
import { Button, Paper, Grid, Dialog } from '@material-ui/core';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';
import LicenseForm from "../modal/licenseForm";
import CreateForm from "../modal/createLicense";


function comapreTag(a, b) {
  if ( a.tag < b.tag ) {
    return -1;
  }
  if ( a.tag > b.tag ) {
    return 1;
  }
  return 0;
}

class Licenses extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      filters: [
        { tag: 'admin', state: false, label: 'Adminisatrated' },
        { tag: 'own', state: false, label: 'Owned' },
        { tag: 'offers', state: false, label: 'My offers' },
      ].sort(comapreTag),
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
    this.setState(prevState => {
      const update = prevState.filters.find(flt => flt.tag === filter.tag);
      return {
        filters: [
          ...prevState.filters.filter(el => el.tag !== filter.tag),
          { ...update, state: !filter.state },
        ].sort(comapreTag),
        toShow: filter.state ? licenses : licenses.filter(el => el.owner !== address),
      };
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
            createLicense={(args) => {
              this.setState({ modalOpen: false })
              createLicense(args)
            }}
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
            handleFilter={this.handleFilter}
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
