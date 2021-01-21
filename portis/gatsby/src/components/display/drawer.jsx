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
      </Drawer>
    </div>
  );
};

export default DrawerItem;
