import React from "react"
import { Button, Paper } from '@material-ui/core';
import SearchBar from '../display/searchbar';

const Buy = ({
  bgColor,
  mainBgColor,
}) => {
  return (
    <Paper>
      <h1>Buy</h1>
      <SearchBar />
    </Paper>
  );
}

export default Buy;
