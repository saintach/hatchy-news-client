import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IState } from "../../types/IState";

class SideBar extends React.Component {
  public render() {
    return (
      <div className="NavBar">
        <p>Sidebar</p>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({

});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(SideBar);
