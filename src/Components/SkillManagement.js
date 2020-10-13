import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { gql, useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

//import { createSkill } from '../graphql/mutations'

const ADD_SKILL = gql`
  mutation createEmployee($createskillinput: CreateSkillInput!) {
    createSkill(input: $createskillinput) {
      id
      name
    }
  }
`;

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

const DELETE_SKILL = gql`
  mutation createEmployee($deleteskillinput: DeleteSkillInput!) {
    deleteSkill(input: $deleteskillinput) {
      id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '72px',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default () => {
  const classes = useStyles();

  const [skillInput, setSkillInput] = useState('');

  const [addSkill] = useMutation(ADD_SKILL);
  const [deleteSkill] = useMutation(DELETE_SKILL);
  const getSkillsData = useQuery(GET_SKILLS);

  const addOnClick = async () => {

    if(getSkillsData.data.listSkills.items.find(x=> x.name.toLowerCase()===skillInput.toLowerCase())){
      return window.alert('Skill already exists');
    }

    await addSkill({
      variables: {
        createskillinput: {
          name: skillInput,
        },
      },
    });
    setSkillInput('');
    getSkillsData.refetch();
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      addOnClick();
    }
  };

  const deleteSkillButton = async (skill) => {
    await deleteSkill({
      variables: {
        deleteskillinput: {
          id: skill.id,
        },
      },
    });
    getSkillsData.refetch();
  };

  const renderSkillsList = () => {
    return (
      <React.Fragment>
        {getSkillsData.data && getSkillsData.data.listSkills.items.length ? (
          <List>
            {getSkillsData.data.listSkills.items.map((skill, index) => (
              <ListItem key={skill.id}>
                <ListItemText primary={skill.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteSkillButton(skill)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h5" component="h2">
            No Skills Added
          </Typography>
        )}
      </React.Fragment>
    );
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={'Skills'} />
      <CardContent>
        <Grid container justify="center">
          <Grid item>
            <IconButton aria-label="add skill" onClick={addOnClick}>
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs={9}>
            <InputLabel htmlFor="standard-adornment-amount">
              Add Skill
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              style={{ width: '100%' }}
              onKeyDown={keyPress}
            />
          </Grid>
        </Grid>
        <Divider style={{ margin: '24px' }} variant="middle" />
        <Grid container justify="center">
          <Grid item style={{ marginTop: '16px' }} xs={10}>
            {getSkillsData.loading ? (
              <div className={classes.spinner}>
                <CircularProgress />
              </div>
            ) : (
              renderSkillsList()
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
