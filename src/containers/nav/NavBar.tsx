import {
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IState } from "../../types/IState";

class NavBar extends React.Component {
  public render() {
    return (
      <Navbar fixedToTop={true}>
          <NavbarGroup>
              <NavbarHeading>Hatchy News</NavbarHeading>
              <NavbarDivider />
              <Button className={Classes.MINIMAL} icon="user" text="Nova" />
              <Button className={Classes.MINIMAL} icon="log-in" text="Login" />
          </NavbarGroup>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: IState) => ({

});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(NavBar);
