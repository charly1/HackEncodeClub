import React, { useState } from "react"
import { Grid, Button, Typography, TextField } from '@material-ui/core';

export function BuyForm({ license, buyFunction, closeFunction }) {
  const [price, setPrice] = useState(0);
  if (!license) return <h>No licence to display</h>;

  const {
    name='',
    version='',
    admin,
    expiration_timestamp,
    selling_price_ETH,
    license_address,
    license_for_sale,
    software_address_linked,
    owner,
    selling_price_wei,
  } = license;

    const date = expiration_timestamp && expiration_timestamp !== '0' ? new Date(expiration_timestamp) : null;
    const inputSizes = { minWidth: '400px', maxWidth: '70vw' };

    return (
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item style={{ marginTop: '25px', marginBottom: '30px' }}>
          <Typography variant="h5" component="h1" style={{ maxWidth: '95vw',  overflowWrap: 'break-word' }}>
            {`Purchasing license of: ${name}`}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="filled-read-only-input"
            label="Software address"
            defaultValue={software_address_linked}
            InputProps={{ readOnly: true }}
            variant="filled"
            style={inputSizes}
          />
        </Grid>
        {version ? (
          <Grid item>
            <TextField
              id="filled-read-only-input"
              label="Version"
              defaultValue={version}
              InputProps={{ readOnly: true }}
              type="text"
              variant="filled"
            />
          </Grid>
        ) : null}
        <Grid item>
          <TextField
            id="filled-read-only-input"
            label="License address"
            defaultValue={license_address}
            InputProps={{ readOnly: true }}
            variant="filled"
            style={inputSizes}
          />
        </Grid>
        <Grid item>
          <TextField
            id="filled-read-only-input"
            label="Current owner address"
            defaultValue={owner}
            InputProps={{ readOnly: true }}
            variant="filled"
            style={inputSizes}
          />
        </Grid>
        <Grid item>
          {date ? (
            <TextField
              id="filled-read-only-input"
              label="Expiry date"
              type="datetime-local"
              defaultValue={date.toISOString().split('.')[0]}
              InputProps={{ readOnly: true }}
              variant="filled"
              style={inputSizes}
            />
          ) : (
            <TextField
              id="filled-read-only-input"
              label="Expiry date"
              defaultValue="Never"
              InputProps={{ readOnly: true }}
              variant="filled"
              style={inputSizes}
            />
          )}
        </Grid>
        <Grid item>
          <TextField
            id="standard-number"
            label="Price ETH"
            defaultValue={selling_price_ETH}
            InputProps={{ readOnly: true }}
            type="number"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '15px' }}
            onClick={buyFunction}
          >
            BUY
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginBottom: '15px' }}
            onClick={closeFunction}
          >
            Cancel
          </Button>
        </Grid>
        {/* <Grid style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
          <div>
            <TextField
              id="standard-number"
              label="Price"
              type="number"
              variant="outlined"
              onChange={(evt) => setPrice(evt.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '15px' }}
              onClick={(evt) => buyFunction({ action: 'buy', name, swAddress, liAddress, price, token })}
            >
              BUY
            </Button>
          </div>
        </Grid> */}
      </Grid>
    );
}

export default BuyForm;