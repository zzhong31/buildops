import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import EmployeeManagement from './EmployeeManagement';
import SkillManagement from './SkillManagement';
import Route from './Route';
import Splash from './Splash';

export default () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Route path="/employees">
          <EmployeeManagement />
        </Route>
        <Route path="/skills">
          <SkillManagement />
        </Route>
        <Route path="/">
          <Splash />
        </Route>
      </Container>
    </React.Fragment>
  );
};
