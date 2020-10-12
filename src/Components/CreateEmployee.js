import React, { useState, useEffect } from 'react';
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

const skills = [
  { id: 1, name: 'Building' },
  { id: 2, name: 'Electrician' },
  { id: 3, name: 'Plumbing' },
  { id: 4, name: 'Gardening' },
  { id: 5, name: 'Landscaping' },
];

export default (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [employeeSkills, setEmployeeSkills] = React.useState([]);

  const handleChange = (event) => {
    setEmployeeSkills(event.target.value);
  };

  useEffect(() => {
    if (props.selectedUser.id) {
      const employee = props.selectedUser;
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmployeeSkills(employee.employeeSkills);
    }
  }, [props.selectedUser]);

  const submitOnClick = () => {
    let employeeId = null;
    if (props.selectedUser.id) {
      employeeId = props.selectedUser.id;
    }
    const employeeToSubmit = {
      id: employeeId,
      firstName,
      lastName,
      employeeSkills,
    };
    props.onSubmit(employeeToSubmit);
    props.onCancel();
  };

  const classes = useStyles();

  return (
    <form onSubmit={props.onSubmit}>
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
              {selected.map((value) => {
                return (
                  <Chip
                    key={value.id}
                    label={value.name}
                    className={classes.chip}
                  />
                );
              })}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {skills.map((skill) => (
            <MenuItem key={skill.id} value={skill}>
              {skill.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ margin: '12px 6px' }}>
        <Button variant="contained" color="primary" onClick={submitOnClick}>
          Submit
        </Button>
        <Button
          style={{ marginLeft: '6px' }}
          variant="contained"
          color="secondary"
          onClick={props.onCancel}
        >
          Cancel
        </Button>
        {props.selectedUser.id ? (
          <Button
            style={{ float: 'right' }}
            variant="outlined"
            color="secondary"
            onClick={props.onDelete}
          >
            Delete
          </Button>
        ) : null}
      </div>
    </form>
  );
};
