
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Button, Typography }  from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    minWidth: 275,
    maxWidth: 320,
    margin: '6px',
  },
  pos: {
    marginBottom: 12,
  },
});


const Kanban = ({
  title,
  address,
  total,
  date,
  info,
  details,
  openKanban,
  buttonLabel,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {address}
        </Typography>
        {date ? (
          <Typography variant="body2" component="p">
            {date}
          </Typography>
        ) : null}
        {total ? (
          <Typography variant="body2" component="p">
            Number: {total}
          </Typography>
        ) : null}
        {info ? (
          <Typography variant="body1" component="p">
            {info}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={() => openKanban(details)}>{buttonLabel || 'View more'}</Button>
      </CardActions>
    </Card>
  );
}


export default Kanban;
