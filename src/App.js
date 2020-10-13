import React from 'react';

import Header from './Components/Header';
import Main from './Components/Main';

export default () => {
  //const { loading, error, data } = useQuery(GET_EMPLOYEES);
  //console.log(data);
  return (
    <React.Fragment>
      <Header />
      <Main />
    </React.Fragment>
  );
};
