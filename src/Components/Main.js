import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';

import EmployeeManagement from './EmployeeManagement';

export default () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <EmployeeManagement />
      </Container>
    </React.Fragment>
  );
};
