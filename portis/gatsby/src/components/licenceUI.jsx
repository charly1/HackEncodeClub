import React, { useState } from "react"

const LicenseDisplay = ({
  license,
  setAdmin,
  setOwner,
  setDate,
  setForSale,
  bgColor,
}) => {
  const [admin, setTextAdmin] = useState(license.admin || '');
  const [owner, setTextOwner] = useState(license.owner || '');
  const [date, setTextDate] = useState(license.expiry || '');

  return (
    <div className="block-sub" style={{ backgroundColor: bgColor || 'lightgrey' }}>
      <h3>License Adress: {license.addr}</h3>
      <div>
        <form name="s_admin" onSubmit={
          (evt) => {
            evt.preventDefault(); // avoid page reloading
            setAdmin(license.addr, admin)
          }}
        >
          <label>
            <span className="description">Admin:</span>
            <input
              type="text"
              value={admin}
              onChange={(evt) => setTextAdmin(evt.target.value)}
              size="50"
            />
          </label>
          <input type="submit" value="Set new admin" />
        </form>
      </div>
      <div>
        <form name="s_owner" onSubmit={
          (evt) => {
            evt.preventDefault(); // avoid page reloading
            setOwner(license.addr, owner)
          }}
        >
          <label>
            <span className="description">Owner:</span>
            <input
              type="text"
              value={owner}
              onChange={(evt) => setTextOwner(evt.target.value)}
              size="50"
            />            </label>
          <input type="submit" value="Set new owner" />
        </form>
      </div>
      <div>
        <form name="s_expiry" onSubmit={
          (evt) => {
            evt.preventDefault(); // avoid page reloading
            setDate(license.addr, date)
          }}
        >
          <label>
            <span className="description">Expiry date:</span>
            <input
              type="date"
              value={date}
              onChange={(evt) => setTextDate(evt.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </label>
          <input type="submit" value="Set new date" />
          <button onClick={() => setDate(license.addr, 0)} style={{ width: '100px', padding: '5px' }}>
            Set never
          </button>
        </form>
      </div>
      <div style={{ alignItems: 'center'}}>
        <button onClick={() => setForSale(license.addr, license.forSale)} style={{ width: '200px' }}>
          For sale ?: {license.forSale ? 'yes 🔵' : 'no 🔴'}
        </button>
      </div>
    </div>
  )
}

export default LicenseDisplay;
