import React from "react"
import { Button, Paper, Grid, Typography, Dialog } from '@material-ui/core';

import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';
import CreateForm from "../modal/createSoftware";

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

  openKanban(software) {
    const { getSWinfo } = this.props;
    getSWinfo(software);
  // console.log("🚀 ~ file: softwares.jsx ~ line 33 ~ softwares ~ openKanban ~ details", software)
  //   this.setState({
  //     // modalOpen: true,
  //     // currentLicense: item,
  //     // currentContract: contract,
  //   });
  }

  render() {
    const { currentLicense, filters, modalOpen } = this.state;
    const { softwares, loadSoftwares, createSoftware } = this.props;
    console.log("🚀 ~ file: software.jsx ~ line 41 ~ Softwares ~ render ~ softwares", softwares)
    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <SearchBar items={softwares} searchFor="name" searchResult={(res) => console.log(res)} />
          <Button
            variant="contained"
            color="primary"
            style={{ width: '180px', margin: '5px 5px 18px 5px' }}
            onClick={() => this.setState({ modalOpen: true })}
          >
            Create software
          </Button>
        </Grid>
        <Grid>
          {softwares && softwares.length ? softwares.map(el => (
            <Kanban
              key={el.address}
              title={el.name}
              address={el.address}
              date={el.license_time_default}
              dateLabel="Expiry: "
              total={el.nb_license}
              totalLabel="Number of licenses "
              version={el.version}
              openKanban={() => this.openKanban(el)}
              buttonLabel="View Licenses"
            />
          )) : null}
        </Grid>
        <Dialog
          aria-labelledby="simple-dialog-title"
          fullWidth
          onClose={() => this.setState({ modalOpen: false })}
          open={modalOpen}
        >
          <CreateForm
            createSoftware={createSoftware}
            closeFunction={() => this.setState({ modalOpen: false })}
          />
        </Dialog>
      </Paper>
    );
  }
}

export default Softwares;
