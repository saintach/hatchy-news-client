// tslint:disable-next-line:no-var-requires
const isEqual = require('lodash.isequal');
import * as React from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { ILoadEverything, loadEverything } from '../../actions-reducers/everything';
import { ISelectArticleUrl, selectArticleUrl } from '../../actions-reducers/selected';
import { ILoadTopHeadlines, loadTopHeadlines } from '../../actions-reducers/topHeadlines';
import HeadlineCard from '../../components/headlines/HeadlineCard';
import { IArticle } from '../../types/IArticle';
import { ISelected } from '../../types/ISelected';
import { IState } from '../../types/IState';

interface ILocalProps {
  articles: IArticle[];
  everything: IArticle[];
  loadTopHeadlines: ILoadTopHeadlines;
  loadEverything: ILoadEverything;
  isFetchingEverything: boolean;
  isFetchingTop: boolean;
  selectArticleUrl: ISelectArticleUrl;
  selected: ISelected;
}

class SideBar extends React.Component<ILocalProps, any> {
  constructor(props: any) {
    super(props);
    this.onClickArticle = this.onClickArticle.bind(this);
    this.loadSelectedType = this.loadSelectedType.bind(this);
  }
  public render() {
    const { isFetchingEverything, isFetchingTop, articles, everything, selected } = this.props;

    let articlesToShow: IArticle[] = [];

    if ((selected.headlineType === 'top' && isFetchingTop) ||
      (selected.headlineType === 'everything' && isFetchingEverything)) {
      return <div>Loading...</div>
    }

    if (selected.headlineType === 'everything') {
      articlesToShow = everything;
    } else if (selected.headlineType === 'top') {
      articlesToShow = articles;
    }

    if (articlesToShow.length) {
      return articlesToShow.map((article, index) => (
        <HeadlineCard
          key={index}
          onClick={this.onClickArticle}
          selected={article.url === selected.articleUrl}
          {...article} />
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
    // Load new type when selected
    if (nextProps.selected.headlineType !== this.props.selected.headlineType) {
      this.loadSelectedType(nextProps.selected.headlineType);
    }

    const isTopNews = nextProps.selected.headlineType === 'top' &&
    !isEqual(nextProps.articles, this.props.articles) && nextProps.articles.length;
    const isEverything = nextProps.selected.headlineType === 'everything' &&
    !isEqual(nextProps.everything, this.props.everything) && nextProps.everything.length;
    // Select the first url
    if (isTopNews) {
      this.props.selectArticleUrl(nextProps.articles[0].url);
    }
    if (isEverything) {
      this.props.selectArticleUrl(nextProps.everything[0].url);
    }
  }
  private loadSelectedType(type: string) {
    switch(type) {
      case 'top':
        this.props.loadTopHeadlines([
          {name: 'category', value: 'general'},
          {name: 'country', value: 'us'}
        ]);
        return;
      case 'everything':
        this.props.loadEverything([
          {name: 'language', value: 'en'},
          {name: 'q', value: 'technology'}
        ]);
        return;
      case 'yours':
        return;
      default: return;
    }
  }
  private onClickArticle(e: React.MouseEvent<HTMLElement>) {
    this.props.selectArticleUrl(e.currentTarget.id);
  }
}

const mapStateToProps = (state: IState) => ({
  articles: state.topHeadlines.articles,
  everything: state.everything.articles,
  isFetchingEverything: state.everything.isFetching,
  isFetchingTop: state.topHeadlines.isFetching,
  selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
    { loadTopHeadlines, loadEverything, selectArticleUrl },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
