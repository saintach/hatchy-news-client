import {
  Button,
  Card,
  Classes,
  H5
} from '@blueprintjs/core';
import * as React from 'react';
import { Box, Flex  } from 'reflexbox';
import { IArticle } from '../../types/IArticle';

interface ILocalProps extends IArticle {
  bookmarked?: boolean;
}

class HeadlineCard extends React.Component<ILocalProps, any> {
  public render() {
    const {author, title, url, publishedAt} = this.props;
    const readableDate = new Date(publishedAt);
    return (
      <Card className="headline-card__container">
        <Flex justify="space-between">
          <Box><H5><a href={url}>{title}</a></H5></Box>
          <Box><Button className={Classes.MINIMAL} icon="bookmark"/></Box>
        </Flex>
        <p>{readableDate.toLocaleString()} by {author}</p>
      </Card>
    );
  }
}

export default HeadlineCard;
