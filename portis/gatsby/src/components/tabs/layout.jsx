import React from "react"
import { ButtonGroup, Button, Paper, Grid, Typography } from '@material-ui/core';

import withPortisProvider from '../provider/portis';
import PortisDisplay from '../display/portis';
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
    const {
      portis, web3, logged, email, address, network, reputation, balance,
      getBalance, handleSubmit, handleLogout, isLoggedIn,
    } = this.props;
    const primColor = '#3f51b5';
    const primLight = '#757de8';
    const btnColor = "#3f51b552";
    return (
      <div>
        <Paper elevation={0}>
          <Grid container>
            <Grid item xs={12}>
              <Button variant="contained" size="large" style={{ width: '350px', margin: '5px' }} onClick={() => this.openDrawer()}>
                {email || 'Portis'}
              </Button>
            </Grid>
            <Grid item>
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button variant="outlined" onClick={() => this.handleClick('software')} style={{ backgroundColor: type === 'software' ? btnColor : "inherit" }}>
                  My Softwares
                </Button>
                <Button variant="outlined" onClick={() => this.handleClick('license')} style={{ backgroundColor: type === 'license' ? btnColor : "inherit" }}>
                  My Licenses
                </Button>
                <Button variant="outlined" onClick={() => this.handleClick('buy')} style={{ backgroundColor: type === 'buy' ? btnColor : "inherit" }}>
                  Buy License
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
        <Grid container>
            {this.state.content ? this.state.content : <Loader />}
        </Grid>
        <Drawer isOpen={drawerOpen} onClose={this.onDrawerClose} >
          {portis ? (
            <PortisDisplay
            email={email}
            network={network}
            address={address}
            logged={logged}
            balance={balance}
            reputation={reputation}
            getBalance={getBalance}
            handleSubmit={handleSubmit}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            showPortis={() => portis.showPortis()}
            title="Portis"
            mainBgColor={primColor}
            bgColor={primLight}
          />
          ) : (
            <>
              <Typography variant="h6" component="h1">
                Portis
              </Typography>
              <Typography variant="body1" component="h4">
                Could not load module...
              </Typography>
            </>
          )}
        </Drawer>
      </div>
    );
  }
}

export default withPortisProvider(Layout);
