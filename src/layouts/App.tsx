import * as React from 'react';
import { Route } from 'react-router-dom';
import { Box, Flex  } from 'reflexbox';
import '../assets/styles/App.css';
import NewsReader from '../components/reader/NewsReader';
import HeadlinesList from '../containers/headlines/HeadlinesList';
import NavBar from '../containers/nav/NavBar';
import SideBar from '../containers/nav/SideBar';

const Default = () => (
  <Flex>
    <Box w={2/5}>
      <HeadlinesList />
    </Box>
    <Box w={3/5}>
      <NewsReader/>
    </Box>
  </Flex>
)

const Sources = () => (
  <div>Sources view: list of sources</div>
)

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavBar />
        <SideBar>
          <Route path="/" exact={true} component={Default} />
          <Route path="/sources" exact={true} component={Sources} />
        </SideBar>
      </div>
    );
  }
}

export default App;