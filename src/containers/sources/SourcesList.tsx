import * as React from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { Flex } from 'reflexbox';
import { ILoadSources, loadSources } from '../../actions-reducers/sources';
import SourceCard from '../../components/sources/SourceCard';
import { ISelected } from '../../types/ISelected';
import { ISource } from '../../types/ISource';
import { IState } from '../../types/IState';

interface ILocalProps {
  sources: ISource[];
  isFetching: boolean;
  selected: ISelected;
  loadSources: ILoadSources;
}

class SideBar extends React.Component<ILocalProps, any> {
  constructor(props: any) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
  }
  public render() {
    const { isFetching, sources } = this.props;

    if (isFetching) {
      return <div>Loading...</div>
    }


    if (sources && sources.length) {
      return <Flex justify="space-between" wrap={true} >
        {
          sources.map((source, index) => (
            <SourceCard
              key={index}
              onClickAdd={this.onClickAdd}
              {...source} />
          ))
        }
      </Flex>

    }

    return (
        <div><p>No results this time.</p></div>
    );
  }
  public componentDidMount() {
    this.props.loadSources();
  }
  private onClickAdd(e: React.MouseEvent<HTMLElement>) {
    // add to user's source list
  }
}

const mapStateToProps = (state: IState) => ({
  isFetching: state.sources.isFetching,
  selected: state.selected,
  sources: state.sources.sources,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    { loadSources },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
