import React from "react"
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import SearchBar from '../display/searchbar';
import Kanban from '../display/kanban';
import CheckBox from '../display/checkFilters';

const softwares = [
  { title: 'Adobe', address: '0x12neo329239d0', total: 2 , date: new Date().toISOString(), info: 'you are owner' },
  { title: 'Office', address: '0x12neoas329239d0', total: 2 },
];

class Softwares extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.openKanban = this.openKanban.bind(this);
    this.state = {
      filters: {},
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
  }

  render() {
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
              buttonLabel="View licenses"
            />
          ))}
        </Grid>
      </Paper>
    );
  }
}

export default Softwares;
