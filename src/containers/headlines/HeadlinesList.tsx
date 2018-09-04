// tslint:disable-next-line:no-var-requires
const isEqual = require('lodash.isequal');
import { Button, Classes } from '@blueprintjs/core';
import * as React from 'react';
import { connect} from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { Flex } from 'reflexbox';
import { ILoadEverything, loadEverything } from '../../actions-reducers/everything';
import { IResetCurrentPage, ISelectArticleUrl,
ISelectCurrentPage, ISelectEverythingParams,
ISelectHeadlineType, ISelectSource, ISelectSourceAndHeadline,
ISelectTopHeadlinesParams, resetCurrentPage,
selectArticleUrl, selectCurrentPage,
selectEverythingParams, selectHeadlineType, selectSource, selectSourceAndHeadline, selectTopHeadlinesParams } from '../../actions-reducers/selected';
import { ILoadTopHeadlines, loadTopHeadlines } from '../../actions-reducers/topHeadlines';
import EverythingFilters from '../../components/filters/EverythingFilters';
import TopHeadlinesFilters from '../../components/filters/TopHeadlinesFilters';
import HeadlineCard from '../../components/headlines/HeadlineCard';
import { IArticle } from '../../types/IArticle';
import { ISelected } from '../../types/ISelected';
import { IState } from '../../types/IState';

interface ILocalProps extends RouteComponentProps<ILocalProps> {
  articles: IArticle[];
  everything: IArticle[];
  loadTopHeadlines: ILoadTopHeadlines;
  loadEverything: ILoadEverything;
  isFetchingEverything: boolean;
  isFetchingTop: boolean;
  selectArticleUrl: ISelectArticleUrl;
  selectEverythingParams: ISelectEverythingParams;
  selectTopHeadlinesParams: ISelectTopHeadlinesParams;
  selectCurrentPage: ISelectCurrentPage;
  selectHeadlineType: ISelectHeadlineType;
  resetCurrentPage: IResetCurrentPage;
  selected: ISelected;
  sourceId: string;
  selectSource: ISelectSource;
  selectSourceAndHeadline: ISelectSourceAndHeadline;
}

class SideBar extends React.Component<ILocalProps, any> {
  constructor(props: any) {
    super(props);
    this.loadSelectedType = this.loadSelectedType.bind(this);
    this.loadSelectedSource = this.loadSelectedSource.bind(this);
    this.onClickArticle = this.onClickArticle.bind(this);
    this.onTopHeadlinesSearch = this.onTopHeadlinesSearch.bind(this);
    this.onEverythingSearch = this.onEverythingSearch.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }
  public render() {
    const { isFetchingEverything, isFetchingTop, articles, everything, selected } = this.props;

    let articlesToShow: IArticle[] = [];

    if ((selected.headlineType === 'top' && isFetchingTop) ||
      (selected.headlineType === 'everything' && isFetchingEverything)) {
      return <div>Loading...</div>
    }

    if (selected.headlineType === 'top') {
      articlesToShow = articles;
    } else {
      articlesToShow = everything;
    }

    if (articlesToShow.length) {
      return <div>
        { this.renderFilters() }
        <hr />
        <div style={{
          height: '100vh',
          overflow: 'scroll',
        }}>
        {
          articlesToShow.map((article, index) => (
            <HeadlineCard
              key={index}
              onClick={this.onClickArticle}
              selected={article.url === selected.articleUrl}
              {...article} />
          ))
        }
        {
          this.renderPagination()
        }
        </div>
      </div>
    }

    return (
        <div>
          { this.renderFilters() }
          <hr />
          <p>Sorry we couldn't seem to find what you were looking for.</p>
          <hr />
          { this.renderPagination() }
        </div>
    );
  }
  public componentDidMount() {
    const sourceId = this.props.match.params.sourceId;
    if (sourceId) {
      this.props.selectSourceAndHeadline(sourceId, 'everything');
    } else {
      this.loadSelectedType(this.props.selected);
    }
  }
  public componentWillReceiveProps(nextProps: ILocalProps) {
    const nSelected = nextProps.selected;
    const tSelected = this.props.selected;

    if (nSelected.headlineType !== tSelected.headlineType || // when new type is selected
      !isEqual(nSelected.everythingParams,tSelected.everythingParams) || // when filters change
      !isEqual(nSelected.topHeadlinesParams,tSelected.topHeadlinesParams) || // when filters change
      nSelected.currentPage !== tSelected.currentPage || // when pagination changes
      nSelected.sourceId !== tSelected.sourceId
    ) {
      this.loadSelectedType(nSelected);
    }


    const isTopNews = nSelected.headlineType === 'top' &&
    !isEqual(nextProps.articles, this.props.articles) && nextProps.articles.length;
    const isEverything = nSelected.headlineType === 'everything' &&
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
      default: return (
        <EverythingFilters
          selected={selected.everythingParams}
          onSearch={this.onEverythingSearch}
        />
      );
    }
  }
  private renderPagination() {
    return (
      <Flex p={1} justify="space-between">
        <Button className={Classes.MINIMAL} icon="chevron-left" onClick={this.onPrevClick}>Prev</Button>
        <Button className={Classes.MINIMAL}>Page {this.props.selected.currentPage}</Button>
        <Button className={Classes.MINIMAL} rightIcon="chevron-right" onClick={this.onNextClick}>Next</Button>
      </Flex>
    )
  }
  private onNextClick() {
    this.props.selectCurrentPage(this.props.selected.currentPage + 1)
  }
  private onPrevClick() {
    const setTo = this.props.selected.currentPage <= 2 ? 1 : this.props.selected.currentPage - 1;
    this.props.selectCurrentPage(setTo)
  }
  private loadSelectedType(selected: ISelected) {
    switch(selected.headlineType) {
      case 'top':
        this.props.loadTopHeadlines(
          this.getNameVal({
            page: selected.currentPage,
            sources: selected.sourceId,
            ...selected.topHeadlinesParams,
          }
        ));
        return;
      case 'everything':
        this.props.loadEverything(
          this.getNameVal({
            page: selected.currentPage,
            sources: selected.sourceId,
            ...selected.everythingParams
          }
        ));
        return;
      case 'yours':
        return;
      default: return;
    }
  }
  private loadSelectedSource(selected: ISelected) {
    return this.props.loadEverything(this.getNameVal({sources: selected.sourceId}));
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
    { loadEverything, loadTopHeadlines, resetCurrentPage, selectArticleUrl,
      selectCurrentPage, selectEverythingParams, selectHeadlineType, selectSource, selectSourceAndHeadline,
      selectTopHeadlinesParams },
    dispatch,
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
