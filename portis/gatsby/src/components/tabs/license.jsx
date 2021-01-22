import React from "react"
import { Button, Paper, Grid, Typography, Dialog } from '@material-ui/core';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';
import LicenseForm from "../modal/licenseForm";
import CreateForm from "../modal/createLicense";


class Licenses extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      filters: {},
      modalOpen: false,
      modalContent: null,
    }
  }

  handleFilter(filters) {
    this.setState(prevState => ({
      filters: filters ? { ...prevState.filters, ...filters } : {},
    }));
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
    const { licenses, softwares } = this.props;
    const { modalOpen, modalContent } = this.state;


    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <CheckBox handleFilter={this.handleFilter}/>
          <SearchBar items={softwares} searchFor="name" />
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
              title={el.name}
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
