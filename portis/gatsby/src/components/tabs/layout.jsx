import React from "react"
import { ButtonGroup, Button, Paper, Grid, Typography } from '@material-ui/core';

import Loader from '../display/loader';
import SoftwarePage from './software';
import LicensePage from './license';
import BuyPage from './buy';
import Drawer from '../display/drawer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.state = {
      content: null,
      type: null,
      drawerOpen: false,
    }
  }

  componentDidMount() {
    // load portis
  }

  openDrawer() {
    this.setState({ drawerOpen: true });
  }

  onDrawerClose() {
    this.setState({ drawerOpen: false });
  }

  handleClick(type) {
    let content = null;
    switch (type) {
      case 'software':
        content = <SoftwarePage />
        break;
      case 'license':
        content = <LicensePage />
        break;
      case 'buy':
        content = <BuyPage />
        break;
      default:
        break;
    }
    this.setState({ content, type });
  }

  render() { // display tabs buttons
    const { drawerOpen, type } = this.state;
    const primColor = '#3f51b5';
    const primLight = '#757de8';
    const btnColor = "#3f51b552";
    return (
      <div>
        <Paper elevation={0}>
          <Grid container>
            {/* <Grid item xs style={{ alignSelf: 'center' }}>
              <Typography variant="h6" component="h1" style={{ borderRaduis: '5px', backgroundColor: primLight, padding: '3px', margin: '5px' }}>
                User: blabla
              </Typography>
            </Grid> */}
            <Grid item>
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button variant="contained" disabled onClick={() => null}>
                  User: blabla
                </Button>
                <Button variant="outlined" onClick={() => this.handleClick('software')} style={{ backgroundColor: type === 'software' ? btnColor : "inherit" }}>
                  My Softwares
                </Button>
                <Button variant="outlined" onClick={() => this.handleClick('license')} style={{ backgroundColor: type === 'license' ? btnColor : "inherit" }}>
                  My Licenses
                </Button>
                <Button variant="outlined" onClick={() => this.handleClick('buy')} style={{ backgroundColor: type === 'buy' ? btnColor : "inherit" }}>
                  Buy License
                </Button>
                <Button variant="outlined" onClick={() => this.openDrawer()}>
                  Portis
                </Button>
              </ButtonGroup>
            </Grid>
            {/* <Grid xs style={{ alignItems: 'right' }}>
              <Button variant="contained" style={{ margin: '5px 5px 5px 20px' }} size="large" onClick={() => this.openDrawer()}>Portis</Button>
            </Grid> */}
          </Grid>
        </Paper>
        <Grid container>
            {this.state.content ? this.state.content : <Loader />}
        </Grid>
        <Drawer isOpen={drawerOpen} onClose={this.onDrawerClose} />
      </div>
    );
  }
}

export default Layout;
