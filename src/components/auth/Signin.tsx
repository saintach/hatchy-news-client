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
    this.onSiginClick = this.onSiginClick.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
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
        <Button intent="primary" onClick={this.onSiginClick}>Signin</Button>
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
  private onSiginClick() {
    this.props.onSigninClick({
      password: this.state.password,
      username: this.state.username,
    })
  }
}

export default Signin;
