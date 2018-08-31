import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import NewsReader from '../../components/reader/NewsReader';
import { ISelected } from "../../types/ISelected";
import { IState } from "../../types/IState";

interface ILocalProps {
  selected: ISelected;
}

class NewsReaderCon extends React.Component<ILocalProps, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { selected } = this.props;
    return (
        <NewsReader src={selected.articleUrl} />
    );
  }
}

const mapStateToProps = (state: IState) => ({
  selected: state.selected
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    {},
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NewsReaderCon);
