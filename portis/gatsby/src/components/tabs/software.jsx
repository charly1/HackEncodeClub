import React from "react"
import { Button, Paper, Grid, Typography } from '@material-ui/core';

import withSoftwareProvider from '../provider/softwares';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';

// const softwares = [
//   { name: 'Adobe', swAddress: '0x12neo329239d0', liAddress: '0xgregc0eco329239d0', total: 2 , date: new Date(), info: 'you are owner' },
//   { name: 'Office', swAddress: '0x12neoas329239d0', liAddress: '0xDAsx0eco329239d0', total: 2 },
// ];

class Softwares extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.openKanban = this.openKanban.bind(this);
    this.state = {
      filters: {},
    }
  }

  handleFilter(filters) {
    this.setState(prevState => ({
      filters: filters ? { ...prevState.filters, ...filters } : {},
    }));
  }

  openKanban(details) {
  console.log("🚀 ~ file: softwares.jsx ~ line 33 ~ softwares ~ openKanban ~ details", details)
  }

  render() {
    const { currentLicense, filters, modalOpen } = this.state;
    const { softwares, loadSoftwares } = this.props;
    console.log("🚀 ~ file: software.jsx ~ line 41 ~ Softwares ~ render ~ softwares", softwares)
    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <CheckBox handleFilter={this.handleFilter}/>
          <SearchBar />
          {/* <Button
            variant="outlined"
            onClick={() => loadSoftwares()}
          >
            Load
          </Button> */}
        </Grid>
        <Grid>
          {softwares && softwares.length ? softwares.map(el => (
            <Kanban
              key={el.swAddress}
              item={el}
              title={el.name}
              address={el.swAddress}
              openKanban={this.openKanban}
              buttonLabel="View Licenses"
            />
          )) : null}
        </Grid>
        {/* <Dialog
          aria-labelledby="simple-dialog-title"
          fullWidth
          onClose={() => this.setState({ modalOpen: false })}
          open={modalOpen}
        >
          <BuyForm
            license={currentLicense}
            buyFunction={this.buyLicense}
          />
        </Dialog> */}
      </Paper>
    );
  }
}

export default withSoftwareProvider(Softwares);
