import {
  Button,
  Classes,
  Dialog,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Signin from '../../components/auth/Signin';
import Signup from '../../components/auth/Signup';
import { IState } from "../../types/IState";
interface INavBarProps {
  session: string;
  user?: object;
}
class NavBar extends React.Component<INavBarProps, any> {
  constructor(props: INavBarProps) {
    super(props);
    this.state = {
      isAuthOverlayOpen: false,
      isSigninClicked: false,
    }
    this.onOverlayToggle = this.onOverlayToggle.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.onSigninClick = this.onSigninClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
  }
  public render() {
    const { session } = this.props;
    return (
      <div>
        <Navbar fixedToTop={true}>
          <NavbarGroup>
            <NavbarHeading>Hatchy News</NavbarHeading>
            <NavbarDivider />
            { session && <Button className={Classes.MINIMAL} icon="user" text="Nova" /> }
            { session && <Button className={Classes.MINIMAL} icon="log-out" text="Logout" /> }
            { !session && <Button className={Classes.MINIMAL} icon="new-person" text="Signup" onClick={this.onSignupClick}/> }
            { !session && <Button intent="danger" className={Classes.MINIMAL} icon="log-in" text="Signin" onClick={this.onSigninClick}/> }
          </NavbarGroup>
        </Navbar>
        <div>
          { this.renderOverlay() }
        </div>
      </div>
    );
  }
  private renderOverlay() {
    const { isAuthOverlayOpen, isSigninClicked } = this.state;
    const overlayState = {
      autoFocus: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: true,
      enforceFocus: true,
      hasBackdrop: true,
      isOpen: isAuthOverlayOpen,
      usePortal: true,
    };
    return (
      <Dialog
        onClose={this.onOverlayToggle}
        title={isSigninClicked ? 'Signin' : 'Create an account'}
        {...overlayState}>
        <div className={Classes.DIALOG_BODY}>
          {
            !this.props.session ? (
              isSigninClicked ? <Signin onSigninClick={this.onSigninClick} /> : <Signup onSigupClick={this.onSignupClick} />
            ) : <p>You are already signed in.</p>
          }
        </div>
      </Dialog>
    );
  }
  private onOverlayToggle() {
    this.setState({
      isAuthOverlayOpen: !this.state.isAuthOverlayOpen
    })
  }
  private onSignupClick() {
    this.setState({
      isAuthOverlayOpen: !this.state.isAuthOverlayOpen,
      isSigninClicked: false
    })
  }
  private onSigninClick() {
    this.setState({
      isAuthOverlayOpen: !this.state.isAuthOverlayOpen,
      isSigninClicked: true
    })
  }
}

const mapStateToProps = (state: IState) => ({
  session: ''
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(NavBar);
