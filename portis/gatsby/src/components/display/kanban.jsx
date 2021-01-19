
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        <Button size="small" onClick={() => openKanban(details)}>View more</Button>
      </CardActions>
    </Card>
  );
}


export default Kanban;
