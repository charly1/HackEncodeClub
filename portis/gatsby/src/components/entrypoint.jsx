import React from "react"
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';

import withPortisProvider from './provider/portis';
import TabStateProvider from './tabHandler';
import PortisDisplay from './display/portis';
import Drawer from './display/drawer';
import { LoaderBar } from './display/loader';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      type: 'software',
      drawerOpen: false,
    }
  }

  openDrawer() {
    const { portis } = this.props;
    portis.showPortis()
    this.setState({ drawerOpen: true });
  }

  onDrawerClose() {
    this.setState({ drawerOpen: false });
  }

  handleClick(type) {
    this.setState({ type });
  }

  render() { // display tabs buttons
    const { drawerOpen, type } = this.state;
    const {
      portis, web3, logged, email, address, network, reputation, balance,
      getBalance, handleSubmit, handleLogout, isLoggedIn,
      primColor, primLight, btnColor,
    } = this.props;
    console.log("🚀 ~ file: entrypoint.jsx ~ line 36 ~ Layout ~ render ~ type", network, type, btnColor, logged, !!web3)

    return (
      <div>
        <Grid container justify="center">
          <Grid item>
            <Button
              variant="contained"
              size="large"
              style={{ width: '350px', margin: '5px', alignSelf: 'center' }}
              onClick={() => this.openDrawer()}
            >
              {email || 'Portis'}
            </Button>
          </Grid>
          <Grid item style={{ margin: '5px' }}>
            <ButtonGroup key={type} color="primary" aria-label="outlined primary button group" disabled={!logged}>
              <Button
                variant="outlined"
                onClick={() => this.handleClick('software')}
                style={{ backgroundColor: type === 'software' ? btnColor : "inherit" }}
              >
                My Softwares
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.handleClick('license')}
                style={{ backgroundColor: type === 'license' ? btnColor : "inherit" }}
              >
                My Licenses
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.handleClick('buy')}
                style={{ backgroundColor: type === 'buy' ? btnColor : "inherit" }}
              >
                Buy License
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container justify="center">
          {logged && web3 ? (
            <TabStateProvider type={type} switchTab={this.handleClick} {...this.props} />
          ) : (
            <Grid item style={{ marginTop: '30px', width: '80vw' }}>
              <LoaderBar />
            </Grid>
          )}
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
