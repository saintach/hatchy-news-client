import { Button, Classes, InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import { Box, Flex } from 'reflexbox';
import constants from '../../utils/constants';
import SelectFilter from '../common/SelectFilter';

interface ILocalProps {
  selected: {
    q: string,
    language: string;
  };
  onSearch: (obj: object) => void;
}

class TopHeadlinesFilters extends React.Component<ILocalProps, any> {
  constructor(props: ILocalProps) {
    super(props);
    this.state = {
      searchValue: props.selected.q,
      selectedLanguage: {
        key: props.selected.language,
        value: constants.language[props.selected.language]
      }
    }
    this.onHandleSearchChange = this.onHandleSearchChange.bind(this);
    this.onLanguageValueChange = this.onLanguageValueChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }
  public render() {
    return <Flex p={1} column={true}>
      <InputGroup
          leftIcon="search"
          onChange={this.onHandleSearchChange}
          placeholder="Search..."
          value={this.state.searchValue}
      />
      <Flex py={1} justify="space-between">
        <Box>
          <SelectFilter
            selectedItem={this.state.selectedLanguage}
            items={this.getKeyVal(constants.language)}
            onValueChange={this.onLanguageValueChange}
            defaultText="Select Language"
            icon="filter-list"
          />
        </Box>
        <Button className={Classes.INTENT_PRIMARY} onClick={this.onSearchClick}>Search</Button>
      </Flex>
    </Flex>

  }
  private getKeyVal(items: any) {
    return Object.keys(items).map((key) => ({key, value: items[key]}))
  }
  private onLanguageValueChange(n: {key: string, value: string}) {
    this.setState({
      selectedLanguage: n
    })
  }
  private onHandleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchValue: e.currentTarget.value
    });
  }
  private onSearchClick() {
    this.props.onSearch({
      language: this.state.selectedLanguage.key,
      q: this.state.searchValue,
    })
  }
}

export default TopHeadlinesFilters;