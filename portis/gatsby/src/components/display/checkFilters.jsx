import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckboxLabels = ({ disabled=false, handleFilter=() => null }) => {
  const [state, setState] = React.useState({
    mine: false,
    offers: true,
    clear: false,
  });

  const handleChange = (event) => {
    if (event.target.name === 'clear') {
      setState({
        mine: false,
        offers: false,
        clear: true,
      })
      handleFilter();
    } else {
      setState({ ...state, [event.target.name]: event.target.checked, clear: false });
      handleFilter({ [event.target.name]: event.target.checked });
    }
  };

  return (
    <FormGroup row>
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            name="mine"
            checked={state.mine}
            onChange={handleChange}
            color="primary"
          />
        }
        label="My items"
      />
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            name='offers'
            checked={state.offers}
            onChange={handleChange}
            color="primary"
          />
        }
        label="For sale"
      />
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            name='clear'
            checked={state.clear}
            onChange={handleChange}
            color="primary"
          />
        }
        label="Clear"
      />
    </FormGroup>
  );
}

export default CheckboxLabels;