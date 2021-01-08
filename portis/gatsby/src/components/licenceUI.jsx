import React, { useState } from "react"
import { showLogs } from '../utils';

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
        <form name="s_admin" onSubmit={() => setAdmin(license.addr)}>
          <label>
            <span className="description">Admin:</span>
            <input
              type="text"
              value={admin}
              onChange={(evt) => setTextAdmin(evt.target.value)}
              onChange={(evt) => setTextAdmin(evt.target.value)}
              size="50"
            />
          </label>
          <input type="submit" value="Set new admin" disabled />
        </form>
      </div>
      <div>
        <form name="s_owner" onSubmit={() => setOwner(license.addr)}>
          <label>
            <span className="description">Owner:</span>
            <input
              type="text"
              value={owner}
              onChange={(evt) => setTextOwner(evt.target.value)}
              onChange={(evt) => setTextOwner(evt.target.value)}
              size="50"
            />            </label>
          <input type="submit" value="Set new owner" disabled={!license.forSale} />
        </form>
      </div>
      <div>
        <form name="s_expiry" onSubmit={() => setDate(license.addr)}>
          <label>
            <span className="description">Expiry date:</span>
            <input
              type="text"
              value={date}
              onChange={(evt) => setTextDate(evt.target.value)}
              onChange={(evt) => setTextDate(evt.target.value)}
              size="50"
            />             </label>
          <input type="submit" value="Set new date" disabled={!license.forSale} />
        </form>
      </div>
      <div style={{ alignItems: 'center'}}>
        <button onClick={() => setForSale(license.addr)} style={{ width: '200px'  }}>
          For sale ?: {license.forSale ? 'yes 🔵' : 'no 🔴'}
        </button>
      </div>
    </div>
  )
}

export default LicenseDisplay;
