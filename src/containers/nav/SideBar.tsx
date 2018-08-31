import {
  Menu, MenuDivider, MenuItem
} from "@blueprintjs/core";
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { ISelectHeadlineType, selectHeadlineType} from '../../actions-reducers/selected';
import { ISelected } from "../../types/ISelected";
import { IState } from "../../types/IState";
interface ILocalState {
  sidebarOpen: boolean;
}

interface ILocalProps {
  selected: ISelected;
  selectHeadlineType: ISelectHeadlineType;
}
class SideBar extends React.Component<ILocalProps, ILocalState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  public render() {
    const { selected } = this.props;
    return (
        <Sidebar
          sidebar={
            <Menu>
              <MenuDivider title="Headlines"/>
              <MenuItem id="top" text="Top" icon="star" active={selected.headlineType === 'top'} onClick={this.onMenuItemClick} />
              <MenuItem id="everything" text="Everything" icon="list-detail-view" active={selected.headlineType === 'everything'} onClick={this.onMenuItemClick} />
              <MenuItem id="yours" text="Yours" icon="book" active={selected.headlineType === 'yours'} onClick={this.onMenuItemClick} />
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

  private onMenuItemClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // tslint:disable-next-line:no-console
    console.log(e.currentTarget.id);
    this.props.selectHeadlineType(e.currentTarget.id);
  }
}

const mapStateToProps = (state: IState) => ({
  selected: state.selected
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    { selectHeadlineType },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
