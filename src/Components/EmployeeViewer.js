import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export default (props) => {
  return (
    <React.Fragment>
      {props.employeeList.length ? (
        <List component="nav" aria-label="main">
          {props.employeeList.map((employee) => (
            <ListItem
              button
              key={employee.id}
              onClick={() => props.existingEmployeeSelected(employee)}
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${employee.firstname} ${employee.lastname}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="h5" component="h2">
          No Employees
        </Typography>
      )}
    </React.Fragment>
  );
};
