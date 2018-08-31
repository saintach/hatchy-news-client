import {
  Menu, MenuDivider, MenuItem
} from "@blueprintjs/core";
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { compose } from 'redux';
import { IState } from "../../types/IState";

interface ILocalState {
  sidebarOpen: boolean;
}
class SideBar extends React.Component<any, ILocalState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  public render() {
    return (
        <Sidebar
          sidebar={
            <Menu>
              <MenuDivider title="Headlines"/>
              <MenuItem text="Top" icon="star"/>
              <MenuItem text="Everything" icon="list-detail-view"/>
              <MenuItem text="Yours" icon="book"/>
              <MenuDivider title="Sources"/>
              <MenuItem text="TechCrunch" icon={<img height="16px" src="https://seeklogo.com/images/T/techcrunch-logo-5E626AD86C-seeklogo.com.gif"/>}/>
              <MenuItem text="Add" icon="insert"/>
              <MenuDivider />
              <MenuItem icon="cog" text="Settings" />
              <MenuDivider />
              <MenuItem text="Collapse" icon="double-chevron-left"/>
          </Menu>
          }
          open={true}
          docked={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={
            { root: {
              marginTop: '50px',
            }}
          }
        >{this.props.children}</Sidebar>

    );
  }

  private onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }
}

const mapStateToProps = (state: IState) => ({

});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(SideBar);
