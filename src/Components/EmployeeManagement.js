import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { gql, useQuery, useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

import CreateEmployee from './CreateEmployee';
import EmployeeViewer from './EmployeeViewer';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '72px',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const GET_EMPLOYEES = gql`
  query listEmployees {
    listEmployees {
      items {
        firstname
        id
        lastname
        skills
      }
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation createEmployee($deleteemployeeinput: DeleteEmployeeInput!) {
    deleteEmployee(input: $deleteemployeeinput) {
      id
    }
  }
`;

export default () => {
  const classes = useStyles();

  const [createMode, setCreateMode] = useState(false);
  const [currentEditingEmployee, setCurrentEditingEmployee] = useState({});
  const [ headerText, setHeaderText] = useState('Create Employee')

  const [operationOccurring, setOperationOccurring] = useState(false);

  const getEmployeesData = useQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const createEmployeeButton = () => {
    getEmployeesData.refetch();
    setCreateMode(!createMode);
    if (!createMode) {
      setCurrentEditingEmployee({});
    }
  };

  const existingEmployeeSelected = (employee) => {
    setCurrentEditingEmployee(employee);
    setCreateMode(true);
  };

  const deleteEmployeeButton = async () => {
    console.log(currentEditingEmployee.id);
    setOperationOccurring(true);

    await deleteEmployee({
      variables: {
        deleteemployeeinput: {
          id: currentEditingEmployee.id,
        },
      },
    });
    createEmployeeButton();
    setCurrentEditingEmployee({});
    setOperationOccurring(false);
  };

  
  useEffect(()=>{
    if(createMode && currentEditingEmployee.id){
      setHeaderText('Edit Employee');
    }
    else{
      setHeaderText('Create Employee');
    }
  },[currentEditingEmployee,createMode])

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
        title={createMode ? headerText : 'Employees'}
      />
      <CardContent>
        {createMode ? (
          <CreateEmployee
            onCancel={createEmployeeButton}
            selectedUser={currentEditingEmployee}
            onDelete={deleteEmployeeButton}
          />
        ) : (
          <React.Fragment>
            {getEmployeesData.loading || operationOccurring ? (
              <div className={classes.spinner}>
                <CircularProgress />
              </div>
            ) : (
              <EmployeeViewer
                employeeList={getEmployeesData.data.listEmployees.items}
                existingEmployeeSelected={existingEmployeeSelected}
              ></EmployeeViewer>
            )}
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
};
