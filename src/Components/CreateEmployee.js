import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { gql, useMutation, useQuery } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: '12px 12px',
    width: '98%',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
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

const GET_SKILLS = gql`
  query listEmployees {
    listSkills {
      items {
        id
        name
      }
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation createEmployee($createemployeeinput: CreateEmployeeInput!) {
    createEmployee(input: $createemployeeinput) {
      firstname
      lastname
      skills
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation createEmployee($updateemployeeinput: UpdateEmployeeInput!) {
    updateEmployee(input: $updateemployeeinput) {
      id
      firstname
      lastname
      skills
    }
  }
`;

export default (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [employeeSkills, setEmployeeSkills] = React.useState([]);

  const [addEmployee] = useMutation(CREATE_EMPLOYEE);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const getSkillsData = useQuery(GET_SKILLS);

  const handleChange = (event) => {
    setEmployeeSkills(event.target.value);
  };

  useEffect(() => {
    if (props.selectedUser.id) {
      const employee = props.selectedUser;
      setFirstName(employee.firstname);
      setLastName(employee.lastname);
      const parsedSkills = JSON.parse(employee.skills);
      let validSkills = [];
      if(getSkillsData.data){
        for(let i=0; i < parsedSkills.length; i++){
          if(getSkillsData.data.listSkills.items.find(x=> x.id===parsedSkills[i].id)){
            validSkills=[...validSkills, parsedSkills[i].id]
          }
        }
      }      
      setEmployeeSkills(validSkills);
     
    }
    
  }, [getSkillsData.data,props.selectedUser]);

  const submitOnClick = async () => {
    if (!firstName || !lastName) {
      return window.alert('Please enter a first and last name');
    }

    setSubmitting(true);
    let employeeId = null;

    let employeeSkillsObjects = employeeSkills.map(skill=>{
      
      return getSkillsData.data.listSkills.items.find(x=> x.id===skill)
    })
    if (props.selectedUser.id) {
      employeeId = props.selectedUser.id;

      await updateEmployee({
        variables: {
          updateemployeeinput: {
            id: employeeId,
            firstname: firstName,
            lastname: lastName,
            skills: JSON.stringify(employeeSkillsObjects),
          },
        },
      });
    } else {
      console.log('creating');
      await addEmployee({
        variables: {
          createemployeeinput: {
            firstname: firstName,
            lastname: lastName,
            skills: JSON.stringify(employeeSkillsObjects),
          },
        },
      });
    }

    setSubmitting(false);
    props.onCancel();
  };

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      {getSkillsData.loading || submitting ? (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">
              First Name
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">
              Last Name
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          {getSkillsData.data.listSkills.items.length ? (
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
                      let lookupName;
                      if(getSkillsData.data){
                        lookupName=getSkillsData.data.listSkills.items.find(x=> x.id===value);
                      }
                      return (
                        <Chip
                          key={value}
                          label={lookupName.name}
                          className={classes.chip}
                        />
                      );
                    })}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {getSkillsData.data.listSkills.items.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography
              variant="h5"
              component="h2"
              style={{ marginTop: '12px', marginLeft: '12px' }}
            >
              No skills available, please add skills in the skills section.
            </Typography>
          )}

          <div style={{ margin: '12px 12px' }}>
            <Button variant="contained" color="primary" onClick={submitOnClick}>
              Save
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
      )}
    </React.Fragment>
  );
};
