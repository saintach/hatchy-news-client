// tslint:disable-next-line:no-var-requires
const isEqual = require('lodash.isequal');
import * as React from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { ISelectArticleUrl, selectArticleUrl } from '../../actions-reducers/selected';
import { ILoadTopHeadlines, loadTopHeadlines } from '../../actions-reducers/topHeadlines';
import HeadlineCard from '../../components/headlines/HeadlineCard';
import { IArticle } from '../../types/IArticle';
import { IState } from '../../types/IState';

interface ILocalProps {
  articles: IArticle[];
  loadTopHeadlines: ILoadTopHeadlines
  isFetching: boolean;
  selectArticleUrl: ISelectArticleUrl;
}

class SideBar extends React.Component<ILocalProps, any> {
  public render() {
    const { isFetching, articles } = this.props;

    if (isFetching) {
      return <div>Loading...</div>
    }

    if (articles && articles.length) {
      return articles.map((article, index) => (
        <HeadlineCard key={index} {...article}/>
      ))
    }

    return (
        <div><p>No results this time.</p></div>
    );
  }
  public componentDidMount() {
    this.props.loadTopHeadlines([
      {name: 'category', value: 'general'},
      {name: 'country', value: 'us'}
    ]);
  }
  public componentWillReceiveProps(nextProps: ILocalProps) {
    if (!isEqual(nextProps.articles, this.props.articles) && nextProps.articles.length) {
      // Select the first url
      this.props.selectArticleUrl(nextProps.articles[0].url)
    }
  }
}

const mapStateToProps = (state: IState) => ({
  articles: state.topHeadlines.articles,
  isFetching: state.topHeadlines.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    { loadTopHeadlines, selectArticleUrl },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
