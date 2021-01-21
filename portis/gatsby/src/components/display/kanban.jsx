
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Button, Typography }  from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    width: 270,
    maxWidth: 320,
    margin: '6px',
  },
  pos: {
    marginBottom: 12,
  },
});


const Kanban = ({
  title,
  adress,
  date,
  dateLabel='',
  price,
  total,
  version,
  openKanban,
  buttonLabel,
}) => {
  const classes = useStyles();
  let displayDate = null;
  if (date && date !== '0') displayDate = new Date(date).toISOString().split('.')[0].split('T');

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        {adress ? (
          <Typography className={classes.pos} color="textSecondary" style={{ overflowWrap: "break-word" }}>
            {adress}
          </Typography>
        ) : null}
        {price ? (
          <Typography variant="body2" component="p">
            {`Price: ${price} ETH`}
          </Typography>
        ) : null}
        {date ? (
          <Typography variant="body2" component="p">
            {`${dateLabel} ${displayDate || ': Never'}`}
          </Typography>
        ) : null}
        {total ? (
          <Typography variant="body2" component="p">
            Number: {total}
          </Typography>
        ) : null}
        {version ? (
          <Typography variant="body1" component="p">
            {`version: ${version}`}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={openKanban}>{buttonLabel || 'View more'}</Button>
      </CardActions>
    </Card>
  );
}


export default Kanban;
