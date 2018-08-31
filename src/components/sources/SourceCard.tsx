import {
  Button,
  Card,
  Classes,
  H5,
  Tag
} from '@blueprintjs/core';
import * as React from 'react';
import { Box, Flex  } from 'reflexbox';
import { ISource } from '../../types/ISource';

interface ILocalProps extends ISource {
  bookmarked?: boolean;
  onClickAdd?: (e: React.MouseEvent<HTMLElement>) => void;
}

class SourceCard extends React.Component<ILocalProps, any> {
  public render() {
    const {id, name, description, url, category, language, country} = this.props;
    return (
      <Box w={1/5} p={1}>
        <Card id={id}
          interactive={true}
          className={`source-card__container ${Classes.ELEVATION_1}`}>
          <Flex justify="space-between">
            <Box><Button className={Classes.MINIMAL} icon="bookmark"/></Box>
          </Flex>
          <img height="60" src={`https://icon-locator.herokuapp.com/icon?url=${url}&size=70..120..200`} />
          <H5><a href={url}>{name}</a></H5>
          <p className="desc">{description}</p>
          <Flex justify="space-evenly">
            <Tag interactive={true}>{category}</Tag>
            <Tag interactive={true}>{language}</Tag>
            <Tag interactive={true}>{country}</Tag>
          </Flex>
        </Card>
      </Box>
    );
  }
}

export default SourceCard;
