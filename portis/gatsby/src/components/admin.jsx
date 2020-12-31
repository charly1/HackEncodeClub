import React from "react"

class AdminUI extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLicenseId = this.handleLicenseId.bind(this);
    this.loadLicenses = this.loadLicenses.bind(this);
    this.changeAdmin = this.changeAdmin.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.changeDate = this.changeDate.bind(this);

    this.state = {
      inputAddress: props.address,
      licenses: [],
      currLicenseId: '',
      currAdmin: '',
      currOwner: '',
      currExpiry: '',
    };
  }

  loadLicenses(event) {
    event.preventDefault(); // avoid page reloading
    // const { portis, web3, email, network } = this.props;
    const licenses = [
      { id: '31msd930290adn90ind', admin: 'adobe', owner: 'yolo98', expiry: '2021-04-25'},
      { id: 'cdopwad9ud90wasnd90', admin: 'adobe', owner: 'gugus', expiry: '2021-01-24'},
      { id: 'mmdmewoasdpj9097asd', admin: 'office', owner: 'superman', expiry: '2021-11-18'},
    ]
    this.setState({
      licenses,
      currAdmin: licenses[0].admin,
      currOwner: licenses[0].owner,
      currExpiry: licenses[0].expiry,
    })
  }

  changeAdmin(event) {
    // event.persist() // uncomment to log event object
    event.preventDefault(); // avoid page reloading
    const { currAdmin } = this.state;
    // const { portis, web3, email, network } = this.props;
    console.log("sync currAdmin", currAdmin)
  }

  changeOwner(event) {
    // event.persist() // uncomment to log event object
    event.preventDefault(); // avoid page reloading
    const { currOwner } = this.state;
    // const { portis, web3, email, network } = this.props;
    console.log("sync currOwner", currOwner)
  }

  changeDate(event) {
    // event.persist() // uncomment to log event object
    event.preventDefault(); // avoid page reloading
    // const { portis, web3, email, network } = this.props;
    const { currExpiry } = this.state;
    console.log("sync currExpiry", currExpiry)
  }

  handleInputChange(event) {
    // event.persist() // uncomment to log event object
    if (event.target.name) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleLicenseId(event) {
    // event.persist() // uncomment to log event object
    const { licenses } = this.state;
    const selection = licenses.find(item => item.id === event.target.value)
    if (!selection) return;
    this.setState({
      currLicenseId: event.target.value,
      currAdmin: selection.admin,
      currOwner: selection.owner,
      currExpiry: selection.expiry,
    });
  }

  render() {
    const { inputAddress, licenses, currLicenseId, currOwner, currAdmin, currExpiry } = this.state;
    const bgcolor = '#9ab394';
    return (
      <div className="block-main" style={{ backgroundColor: '#267469' }}>
        <div className="block-sub" style={{ bgcolor }}>
          <form name="s_address" onSubmit={this.loadLicenses}>
            <label>
              <span className="description">Software contract address:</span>
              <input type="text" value={inputAddress} name="inputAddress" onChange={this.handleInputChange} size="50" />
            </label>
            <input type="submit" value="Load" />
          </form>
        </div>
        {licenses.length ? (
          <>
            <form name="f_license">
              <label>
                <span className="description">Licence id:
                <select name={`license_${currLicenseId}`} onChange={this.handleLicenseId}>
                  {licenses.map(item => (
                    <option key={item.id} value={item.id}>{item.id}</option>
                  ))}
                </select>
                </span>
              </label>
              {/* <input type="submit" value="Load details" /> */}
            </form>
            <div className="block-sub" style={{ bgcolor }}>
              <form name="s_admin" onSubmit={this.changeAdmin}>
                <label>
                  <span className="description">Admin:</span>
                  <input type="text" value={currAdmin} name="currAdmin" onChange={this.handleInputChange} size="50" />
                </label>
                <input type="submit" value="Set new admin" />
              </form>
            </div>
            <div className="block-sub" style={{ bgcolor }}>
              <form name="s_owner" onSubmit={this.changeOwner}>
                <label>
                  <span className="description">Owner:</span>
                  <input type="text" value={currOwner} name="currOwner" onChange={this.handleInputChange} size="50" />
                </label>
                <input type="submit" value="Set new owner" />
              </form>
            </div>
            <div className="block-sub" style={{ bgcolor }}>
              <form name="s_expiry" onSubmit={this.changeDate}>
                <label>
                  <span className="description">Expiry date:</span>
                  <input type="text" value={currExpiry} name="currExpiry" onChange={this.handleInputChange} size="50" />
                </label>
                <input type="submit" value="Set new date" />
              </form>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default AdminUI;
