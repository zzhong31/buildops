import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: '12px 12px',
    width: '98%',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = ['Building', 'Grout', 'Gardening', 'Electrician', 'Plumbing'];

export default () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [employeeSkills, setEmployeeSkills] = React.useState([]);

  const handleChange = (event) => {
    setEmployeeSkills(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setEmployeeSkills(value);
  };

  const classes = useStyles();

  return (
    <form>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-amount">First Name</InputLabel>
        <Input
          id="standard-adornment-amount"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-amount">Last Name</InputLabel>
        <Input
          id="standard-adornment-amount"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="demo-mutiple-chip-label">Skills</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={employeeSkills}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {skills.map((skill) => (
            <MenuItem key={skill} value={skill}>
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ margin: '12px 6px' }}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
        <Button
          style={{ marginLeft: '6px' }}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
