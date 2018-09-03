import { Button, Classes } from '@blueprintjs/core';
import * as React from 'react';
import { Flex } from 'reflexbox';

const IFrame = (props: any) => (
  <iframe id="reader" {...props} />
);

interface ILocalProps {
  src: string;
  article?: {
    length: number;
    title: string;
    content: string;
  };
  embeddable: boolean;
  loading?: boolean;
}

class NewsReader extends React.Component<ILocalProps, any> {
  constructor(props: ILocalProps) {
    super(props);
    this.state = {
      isReaderView: true
    }
    this.onOriginalViewClick = this.onOriginalViewClick.bind(this)
    this.onReaderViewClick = this.onReaderViewClick.bind(this)
    this.renderView = this.renderView.bind(this)
  }
  public render() {
    const { isReaderView } = this.state;
    return (
      <div className="news-reader__container">
        <Flex p={1} justify="center">
            <Button className={Classes.MINIMAL} active={isReaderView} onClick={this.onReaderViewClick}>Reader's View</Button>
            <Button className={Classes.MINIMAL} active={!isReaderView} onClick={this.onOriginalViewClick}>Original View</Button>
        </Flex>
        {this.renderView()}
      </div>
    );
  }
  private renderView() {
    const { isReaderView } = this.state;
    const { article, src, loading } = this.props;
    if (isReaderView) {
      if (article) {
        return loading ? <p>Preparing the article for Reader's View...</p> :
        <div className="readers-view">
          <h2>{article.title}</h2>
          <div dangerouslySetInnerHTML={{__html: article.content}} />
        </div>
      } else {
        return <p>Sorry, Reader's View isn't available for this article!</p>
      }

    } else {
      // TODO: returns something if iframe won't work
      return this.props.embeddable ?
        <IFrame
          frameBorder="0" border="0" cellSpacing="0"
          width="100%"
          src={src} /> :
        <p>Sorry, IFrame isn't supported for this website. <a href={src} target="__blank">View on next tab</a></p>
    }
  }
  private onReaderViewClick() {
    this.setState({
      isReaderView: true
    })
  }
  private onOriginalViewClick() {
    this.setState({
      isReaderView: false
    })
  }
}

export default NewsReader;
