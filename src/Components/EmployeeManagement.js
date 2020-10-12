import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CreateEmployee from './CreateEmployee';

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
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="add employee">
            <PersonAddIcon />
          </IconButton>
        }
        title="Employees"
      />
      <CardContent>
        {/*<List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary="Employee 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Employee 2" />
          </ListItem>
      </List>*/}
        <CreateEmployee />
      </CardContent>
    </Card>
  );
};
