import React from "react"
import { Button, Paper, Grid, Typography, Dialog } from '@material-ui/core';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';
import BuyForm from "../modal/buyForm";

const softwares = [
  { title: 'Adobe', address: '0x12neo329239d0', total: 2 , date: new Date().toISOString(), info: 'you are owner' },
  { title: 'Office', address: '0x12neoas329239d0', total: 2 },
];

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

  componentDidMount() {
    // load softwares
  }

  handleFilter(filters) {
    this.setState(prevState => ({
      filters: filters ? { ...prevState.filters, ...filters } : {},
    }));
  }

  openKanban(details) {
    console.log("🚀 ~ file: softwares.jsx ~ line 33 ~ softwares ~ openKanban ~ details", details)
    // query item
    // then open modal
    this.setState({
      modalOpen: true,
      currentLicense: {
        name: 'LI1',
        swAddress: '0x3r290j0eiwjed',
        liAddress: '0x3r290j0eiwjed',
      },
    });
  }

  buyLicense(arg) {
  console.log("🚀 ~ file: buy.jsx ~ line 41 ~ Buy ~ buyLicense ~ arg", arg)
    this.setState({ modalOpen: false });
  }

  render() {
    const { currentLicense, filters, modalOpen } = this.state;
    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <CheckBox handleFilter={this.handleFilter}/>
          <SearchBar />
        </Grid>
        <Grid>
          {softwares.map(el => (
            <Kanban
              key={el.address}
              details={el}
              {...el}
              openKanban={this.openKanban}
              buttonLabel="Buy"
            />
          ))}
        </Grid>
        <Dialog
          aria-labelledby="simple-dialog-title"
          fullWidth
          onClose={() => this.setState({ modalOpen: false })}
          open={modalOpen}
        >
          <BuyForm
            license={currentLicense}
            buyFunction={this.buyLicense}
          />
        </Dialog>
      </Paper>
    );
  }
}

export default Buy;
