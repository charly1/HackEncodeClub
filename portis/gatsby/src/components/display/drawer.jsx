import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, InputBase, Drawer } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const DrawerItem = ({
  isOpen,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <h>DRAWER</h>
      </Drawer>
    </div>
  );
};

export default DrawerItem;
