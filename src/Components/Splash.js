import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '72px',
  },
}));

export default () => {
  const classes = useStyles();

  const onClickNav = (e, href) => {
    
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    e.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item>
            <img
              alt="logo"
              src={'./logo.jpeg'}
              style={{ width: '100%', height: '100%' }}
            ></img>
          </Grid>
          <Grid item xs={5} style={{ marginLeft: '6px' }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ marginTop: '12px' }}
                >
                  Employee Management
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '12px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => onClickNav(e, '/employees')}
                  style={{ marginTop: '6px' }}
                >
                  Employees
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '12px', marginTop: '6px' }}
                  onClick={(e) => onClickNav(e, '/skills')}
                >
                  Skills
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
