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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '72px',
  },
}));

export default () => {
  const classes = useStyles();

  const [skillInput, setSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState([]);

  const addOnClick = () => {
    setSkillsList([
      ...skillsList,
      { name: skillInput, id: skillsList.length + 1 },
    ]);
    setSkillInput('');
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      addOnClick();
      // put the login here
    }
  };

  const deleteSkill = (index) => {
    let tempSkillList = [...skillsList];
    tempSkillList.splice(index, 1);
    setSkillsList(tempSkillList);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={'Skills'} />
      <CardContent>
        <Grid container justify="center">
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
          <Grid item>
            <IconButton aria-label="add skill" onClick={addOnClick}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider style={{ margin: '24px' }} variant="middle" />
        <Grid container justify="center">
          <Grid item style={{ marginTop: '16px' }} xs={10}>
            {skillsList.length ? (
              <List>
                {skillsList.map((skill, index) => (
                  <ListItem key={skill.id}>
                    <ListItemText primary={skill.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteSkill(index)}
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
