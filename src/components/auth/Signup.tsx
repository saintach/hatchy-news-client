import {
  Button,
  InputGroup
} from '@blueprintjs/core';
import * as React from 'react';
import { Flex  } from 'reflexbox';

interface ILocalProps {
  onSigupClick: (obj: {username: string; password: string;}) => void;
}

class Signup extends React.Component<ILocalProps, any> {
  constructor(props: ILocalProps) {
    super(props);
    this.state = {
      password: '',
      username: '',
    }
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
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
          onChange={this.onUsernameChange}
        />
        <br />
        <InputGroup
          placeholder="Enter your password"
          leftIcon="lock"
          type="password"
          value={password}
          onChange={this.onPasswordChange}
        />
        <br />
        <Button intent="primary" onClick={this.onSigupClick}>Signup</Button>
      </Flex>
    );
  }
  private onUsernameChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      username: e.currentTarget.value
    })
  }
  private onPasswordChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      password: e.currentTarget.value
    })
  }
  private onSigupClick() {
    this.props.onSigupClick({
      password: this.state.password,
      username: this.state.username,
    })
  }
}

export default Signup;
