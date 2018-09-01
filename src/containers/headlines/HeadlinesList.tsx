// tslint:disable-next-line:no-var-requires
const isEqual = require('lodash.isequal');
import * as React from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { ILoadEverything, loadEverything } from '../../actions-reducers/everything';
import { ISelectArticleUrl, ISelectEverythingParams,
ISelectTopHeadlinesParams, selectArticleUrl,
selectEverythingParams, selectTopHeadlinesParams } from '../../actions-reducers/selected';
import { ILoadTopHeadlines, loadTopHeadlines } from '../../actions-reducers/topHeadlines';
import EverythingFilters from '../../components/filters/EverythingFilters';
import TopHeadlinesFilters from '../../components/filters/TopHeadlinesFilters';
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
  selectEverythingParams: ISelectEverythingParams;
  selectTopHeadlinesParams: ISelectTopHeadlinesParams;
  selected: ISelected;
}

class SideBar extends React.Component<ILocalProps, any> {
  constructor(props: any) {
    super(props);
    this.onClickArticle = this.onClickArticle.bind(this);
    this.loadSelectedType = this.loadSelectedType.bind(this);
    this.onTopHeadlinesSearch = this.onTopHeadlinesSearch.bind(this);
    this.onEverythingSearch = this.onEverythingSearch.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
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
      return <div style={{
          height: '100vh',
          overflow: 'scroll',
        }}>
        { this.renderFilters() }
        {
          articlesToShow.map((article, index) => (
            <HeadlineCard
              key={index}
              onClick={this.onClickArticle}
              selected={article.url === selected.articleUrl}
              {...article} />
          ))
        }
      </div>
    }

    return (
        <div>
          { this.renderFilters() }
          <p>No results this time.</p>
        </div>
    );
  }
  public componentDidMount() {
    this.props.loadTopHeadlines(this.getNameVal(this.props.selected.topHeadlinesParams));
  }
  public componentWillReceiveProps(nextProps: ILocalProps) {
    // Load new type when selected
    if (nextProps.selected.headlineType !== this.props.selected.headlineType) {
      this.loadSelectedType(nextProps.selected.headlineType, nextProps.selected);
    }

    // Load again when selected filters changed
    if (!isEqual(nextProps.selected.everythingParams,this.props.selected.everythingParams)) {
      this.loadSelectedType(nextProps.selected.headlineType, nextProps.selected);
    } else if (!isEqual(nextProps.selected.topHeadlinesParams,this.props.selected.topHeadlinesParams)) {
      this.loadSelectedType(nextProps.selected.headlineType, nextProps.selected);
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
  private renderFilters() {
    const {selected} = this.props
    switch(selected.headlineType) {
      case 'top': return (
        <TopHeadlinesFilters
          selected={selected.topHeadlinesParams}
          onSearch={this.onTopHeadlinesSearch}
        />
      );
      case 'everything': return (
        <EverythingFilters
          selected={selected.everythingParams}
          onSearch={this.onEverythingSearch}
        />
      );
      default: return;
    }
  }
  private loadSelectedType(type: string, selected: ISelected) {
    switch(type) {
      case 'top':
        this.props.loadTopHeadlines(this.getNameVal(selected.topHeadlinesParams));
        return;
      case 'everything':
        this.props.loadEverything(this.getNameVal(selected.everythingParams));
        return;
      case 'yours':
        return;
      default: return;
    }
  }
  private onClickArticle(e: React.MouseEvent<HTMLElement>) {
    this.props.selectArticleUrl(e.currentTarget.id);
  }
  private getNameVal(items: any) {
    return Object.keys(items).map((name) => ({name, value: items[name]}))
  }
  private onEverythingSearch(searchObj: object) {
    this.props.selectEverythingParams(searchObj);
  }
  private onTopHeadlinesSearch(searchObj: object) {
    this.props.selectTopHeadlinesParams(searchObj);
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
    { loadTopHeadlines, loadEverything, selectArticleUrl, selectEverythingParams, selectTopHeadlinesParams },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
