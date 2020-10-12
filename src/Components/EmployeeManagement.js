import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

import CreateEmployee from './CreateEmployee';
import EmployeeViewer from './EmployeeViewer';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '72px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default () => {
  const classes = useStyles();

  const [employeeList, setEmployeeList] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [currentEditingEmployee, setCurrentEditingEmployee] = useState({});

  const onSubmit = (employee) => {
    let tempEmployeeList = [...employeeList];
    if (employee.id) {
      let foundIndex = tempEmployeeList.findIndex(
        ({ id }) => id === employee.id
      );
      tempEmployeeList[foundIndex].firstName = employee.firstName;
      tempEmployeeList[foundIndex].lastName = employee.lastName;
      tempEmployeeList[foundIndex].employeeSkills = employee.employeeSkills;
      setEmployeeList(tempEmployeeList);
    } else {
      employee.id = employeeList.length + 1;
      setEmployeeList([...tempEmployeeList, employee]);
    }
  };

  const createEmployeeButton = () => {
    setCreateMode(!createMode);
    if (!createMode) {
      setCurrentEditingEmployee({});
    }
  };

  const existingEmployeeSelected = (employee) => {
    setCurrentEditingEmployee(employee);
    setCreateMode(true);
  };

  const deleteEmployee = () => {
    let tempEmployeeList = [...employeeList];
    tempEmployeeList.splice(
      tempEmployeeList.findIndex(({ id }) => id === currentEditingEmployee.id),
      1
    );
    console.log(tempEmployeeList);
    setEmployeeList(tempEmployeeList);
    createEmployeeButton();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            disabled={createMode ? true : false}
            aria-label="add employee"
            onClick={createEmployeeButton}
          >
            <PersonAddIcon />
          </IconButton>
        }
        title={createMode ? 'Create Employee' : 'Employees'}
      />
      <CardContent>
        {createMode ? (
          <CreateEmployee
            onSubmit={onSubmit}
            onCancel={createEmployeeButton}
            selectedUser={currentEditingEmployee}
            onDelete={deleteEmployee}
          />
        ) : (
          <EmployeeViewer
            employeeList={employeeList}
            existingEmployeeSelected={existingEmployeeSelected}
          ></EmployeeViewer>
        )}
      </CardContent>
    </Card>
  );
};
