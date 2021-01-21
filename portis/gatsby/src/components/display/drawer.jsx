import React from "react"
import { Button, Paper, InputBase, Drawer } from '@material-ui/core';


const DrawerItem = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div>
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        {children}
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: '15px' }}
          onClick={onClose}
        >
          Close
        </Button>
      </Drawer>
    </div>
  );
};

export default DrawerItem;
