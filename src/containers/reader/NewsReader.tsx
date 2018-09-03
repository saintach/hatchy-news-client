import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { ILoadReadableArticle, loadReadableArticle } from '../../actions-reducers/articleReader';
import NewsReader from '../../components/reader/NewsReader';
import { IArticleReader } from '../../types/IArticleReader';
import { ISelected } from "../../types/ISelected";
import { IState } from "../../types/IState";

interface ILocalProps {
  articleReader: IArticleReader;
  selected: ISelected;
  loadReadableArticle: ILoadReadableArticle;
}

class NewsReaderCon extends React.Component<ILocalProps, any> {
  constructor(props: any) {
    super(props);
  }
  public componentWillReceiveProps(nextProps: ILocalProps) {
    if (nextProps.selected.articleUrl && nextProps.selected.articleUrl !== this.props.selected.articleUrl) {
      this.props.loadReadableArticle([{
        name: 'src', value: nextProps.selected.articleUrl
      }])
    }
  }
  public componentDidMount() {
    if (this.props.selected.articleUrl) {
      this.props.loadReadableArticle([{
        name: 'src', value: this.props.selected.articleUrl
      }])
    }
  }
  public render() {
    const { selected, articleReader } = this.props;
    return (
        <NewsReader
          src={selected.articleUrl}
          embeddable={articleReader.embeddable}
          article={articleReader.article}
          loading={articleReader.isFetching}
        />
    );
  }
}

const mapStateToProps = (state: IState) => ({
  articleReader: state.articleReader,
  selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    { loadReadableArticle },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NewsReaderCon);
