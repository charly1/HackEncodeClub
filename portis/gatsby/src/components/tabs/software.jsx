import React from "react"
import { Button, Paper } from '@material-ui/core';
import SearchBar from '../display/searchbar';

const Softwares = ({
  bgColor,
  mainBgColor,
}) => {
  return (
    <Paper>
      <h1>Softwares</h1>
      <SearchBar />
    </Paper>
  );
}

export default Softwares;
