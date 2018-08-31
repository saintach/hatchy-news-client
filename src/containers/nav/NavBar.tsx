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
      <div className="NavBar">
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>Hatchy News</NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
                <Button className={Classes.MINIMAL} icon="log-in" text="Login" />
            </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({

});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(NavBar);
