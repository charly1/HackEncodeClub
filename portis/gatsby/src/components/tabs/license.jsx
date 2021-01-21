import React from "react"
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';

const licenses = [
  { name: 'Adobe', swAddress: '0x12neo329239d0', liAddress: '0xgregc0eco329239d0', total: 2 , date: new Date(), info: 'you are owner' },
  { name: 'Office', swAddress: '0x12neoas329239d0', liAddress: '0xDAsx0eco329239d0', total: 2 },
];

class Licenses extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.openKanban = this.openKanban.bind(this);
    this.state = {
      filters: {},
    }
  }

  componentDidMount() {
    // load licenses
  }

  handleFilter(filters) {
    this.setState(prevState => ({
      filters: filters ? { ...prevState.filters, ...filters } : {},
    }));
  }

  openKanban(details) {
  console.log("🚀 ~ file: license.jsx ~ line 33 ~ Licenses ~ openKanban ~ details", details)
  }

  render() {
    return (
      <Paper elevation={0} style={{ backgroundColor: '#bec9e2', width: '100%' }}>
        <Grid>
          <CheckBox handleFilter={this.handleFilter}/>
          <SearchBar />
        </Grid>
        <Grid>
          {licenses && licenses.length ? licenses.map(el => (
            <Kanban
              key={el.liAddress}
              item={el}
              title={el.name}
              address={el.liAddress}
              openKanban={this.openKanban}
              buttonLabel="View details"
            />
          )) : null}
        </Grid>
      </Paper>
    );
  }
}

export default Licenses;
