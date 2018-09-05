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
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createUser, ICreateUser, ISignin, signin } from '../../actions-reducers/user/auth';
import Signin from '../../components/auth/Signin';
import Signup from '../../components/auth/Signup';
import { IState } from "../../types/IState";
import { IAuth } from "../../types/user/IAuth";
interface INavBarProps {
  session: string;
  user?: object;
  createUser: ICreateUser;
  signin: ISignin;
  auth: IAuth;
}

interface INavBarState {
  isAuthOverlayOpen: boolean;
  isSigninClicked: boolean;
  username: string;
  password: string;
}
class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props: INavBarProps) {
    super(props);
    this.state = {
      isAuthOverlayOpen: false,
      isSigninClicked: false,
      password: '',
      username: '',
    }
    this.onOverlayToggle = this.onOverlayToggle.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.onSigninClick = this.onSigninClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.onSignin = this.onSignin.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
  }
  public render() {
    const { auth } = this.props;
    const token = auth.token;
    return (
      <div>
        <Navbar fixedToTop={true}>
          <NavbarGroup>
            <NavbarHeading>HATCHY | NEWS</NavbarHeading>
            <NavbarDivider />
            { token && <Button className={Classes.MINIMAL} icon="user" text="Nova" /> }
            { token && <Button className={Classes.MINIMAL} icon="log-out" text="Logout" /> }
            { !token && <Button className={Classes.MINIMAL} icon="new-person" text="Signup" onClick={this.onSignupClick}/> }
            { !token && <Button intent="danger" className={Classes.MINIMAL} icon="log-in" text="Signin" onClick={this.onSigninClick}/> }
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
            !this.props.auth.token ? (
              isSigninClicked ? <Signin onSigninClick={this.onSignin} /> : <Signup onSigupClick={this.onCreateUser} />
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
  private onSignin(obj: {username: string, password: string}) {
    this.setState(obj, () => this.props.signin({user: obj}));
  }
  private onCreateUser(obj: {username: string, password: string}) {
    this.setState(obj, () => this.props.createUser({user: obj}));
  }
}

const mapStateToProps = (state: IState) => ({
  auth: state.user.auth
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    { createUser, signin },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);
