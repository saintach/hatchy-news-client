import * as React from 'react';
import { Route } from 'react-router-dom';
import { Box, Flex  } from 'reflexbox';
import '../assets/styles/App.css';
import NavBar from '../containers/nav/NavBar';
import SideBar from '../containers/nav/SideBar';

const Default = () => (
  <div>Home view: list of news + reader</div>
)

const Sources = () => (
  <div>Sources view: list of sources</div>
)

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavBar />
        <Flex align='center'>
          <Box w={1/4}>
            <SideBar />
          </Box>
          <Box px={2} >
            <Route path="/" exact={true} component={Default} />
            <Route path="/sources" exact={true} component={Sources} />
          </Box>
        </Flex>
      </div>
    );
  }
}

export default App;