import React, { useState } from "react"
import { Grid, Button, Typography, TextField } from '@material-ui/core';

export function BuyForm({ license, buyFunction }) {
  const [price, setPrice] = useState(0);
  if (!license) return <h>No licence to display</h>;

  const {
    name,
    swAddress,
    liAddress,
    expiry,
    token,
  } = license;

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '95vh', minWidth: '600px' }}
    >
      <Grid item style={{ marginBottom: '30px' }}>
        <Typography variant="h5" component="h1">
          {`Purchasing license of: ${name}`}
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          id="filled-read-only-input"
          label="Software address"
          defaultValue={swAddress}
          InputProps={{ readOnly: true }}
          variant="filled"
          style={{ minWidth: '400px', maxWidth: '70vw' }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="filled-read-only-input"
          label="License address"
          defaultValue={liAddress}
          InputProps={{ readOnly: true }}
          variant="filled"
          style={{ minWidth: '400px', maxWidth: '70vw' }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="filled-read-only-input"
          label="Expiry date"
          type="datetime-local"
          defaultValue={expiry}
          InputProps={{ readOnly: true }}
          variant="filled"
          style={{ minWidth: '400px', maxWidth: '70vw' }}
        />
      </Grid>
      <Grid style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
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
      </Grid>
    </Grid>
  )
}

export default BuyForm;