import {
  Button,
  InputGroup
} from '@blueprintjs/core';
import * as React from 'react';
import { Flex  } from 'reflexbox';

interface ILocalProps {
  onSigninClick: (obj: {username: string; password: string;}) => void;
}

class Signin extends React.Component<ILocalProps, any> {
  constructor(props: ILocalProps) {
    super(props);
    this.state = {
      password: '',
      username: '',
    }
    this.onSigupClick = this.onSigupClick.bind(this)
  }
  public render() {
    const {username, password} = this.state;
    return (
      <Flex column={true} justify="center">
        <InputGroup
          placeholder="Enter your username"
          leftIcon="user"
          type="text"
          value={username}
        />
        <br />
        <InputGroup
          placeholder="Enter your password"
          leftIcon="lock"
          type="password"
          value={password}
        />
        <br />
        <Button intent="primary" onClick={this.onSigupClick}>Signin</Button>
      </Flex>
    );
  }
  private onSigupClick() {
    this.props.onSigninClick({
      password: this.state.password,
      username: this.state.username,
    })
  }
}

export default Signin;
