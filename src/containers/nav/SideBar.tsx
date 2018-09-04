import {
  Menu, MenuDivider, MenuItem
} from "@blueprintjs/core";
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { ISelectHeadlineType, ISelectSourceAndHeadline, selectHeadlineType, selectSourceAndHeadline} from '../../actions-reducers/selected';
import { ISelected } from "../../types/ISelected";
import { IState } from "../../types/IState";
interface ILocalState {
  sidebarOpen: boolean;
  selectedRoute?: string;
}

interface ILocalProps extends RouteComponentProps<ILocalProps>{
  selected: ISelected;
  selectHeadlineType: ISelectHeadlineType;
  selectSourceAndHeadline: ISelectSourceAndHeadline;
  sourceId?: string;
}

class SideBar extends React.Component<ILocalProps, ILocalState> {
  constructor(props: ILocalProps) {
    super(props);
    this.state = {
      selectedRoute: props.location.pathname === '/sources' ? 'sources' :
        (props.location.pathname.includes('/sources/') ? props.location.pathname.split('/sources/')[1] : 'top'),
      sidebarOpen: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onSourceItemClick = this.onSourceItemClick.bind(this);
  }

  public componentDidMount() {
    if (this.props.match.params.sourceId) {
      this.setState({
        selectedRoute: this.props.match.params.sourceId
      })
    }
  }

  public render() {
    const { selectedRoute } = this.state;
    const sourcesTemp = [{
      id: 'abc-news',
      name: 'ABC News',
      url: 'https://abcnews.go.com'
    }, {
      id: 'bbc-news',
      name: 'BBC News',
      url: 'https://bbc.co.uk'
    }]
    return (
        <Sidebar
          sidebar={
            <Menu>
              <MenuDivider title="Headlines"/>
              <MenuItem id="top" text="Top" icon="star" active={selectedRoute === 'top'} onClick={this.onMenuItemClick} />
              <MenuItem id="everything" text="Everything" icon="list-detail-view" active={selectedRoute === 'everything'} onClick={this.onMenuItemClick} />
              <MenuItem id="yours" text="Yours" icon="book" active={selectedRoute === 'yours'} onClick={this.onMenuItemClick} />
              <MenuDivider title="Your Sources"/>
              {
                sourcesTemp.map((s) => (
                  <MenuItem
                    key={s.id}
                    id={s.id}
                    active={selectedRoute === s.id}
                    text={s.name}
                    icon={<img height="16px" src={`https://icon-locator.herokuapp.com/icon?url=${s.url}&size=70..120..200`}/>}
                    onClick={this.onSourceItemClick}
                  />
                ))
              }
              <MenuItem id="sources" text="Add" icon="insert" active={selectedRoute === 'sources'} onClick={this.onMenuItemClick} />
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

  private onSourceItemClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const id = e.currentTarget.id;
    this.setState({
      selectedRoute: id
    }, () => {
      this.props.history.push(`/sources/${id}`);
      this.props.selectSourceAndHeadline(id, 'everything');
    })
  }

  private onMenuItemClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const id = e.currentTarget.id;
    this.setState({
      selectedRoute: id
    })
    if (id !== 'sources') {
      this.props.selectHeadlineType(e.currentTarget.id);
      this.props.history.push('/');
    } else {
      this.props.history.push('/sources')
    }
  }
}

const mapStateToProps = (state: IState) => ({
  selected: state.selected
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    { selectHeadlineType, selectSourceAndHeadline },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
