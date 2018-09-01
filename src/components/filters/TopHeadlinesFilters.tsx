import { Button, Classes, InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import { Box, Flex } from 'reflexbox';
import constants from '../../utils/constants';
import SelectFilter from '../common/SelectFilter';

class TopHeadlinesFilters extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterValue: ''
    }
    this.onHandleFilterChange = this.onHandleFilterChange.bind(this);
    this.onCategoryValueChange = this.onCategoryValueChange.bind(this);
  }
  public render() {
    return <Flex p={1} column={true}>
      <InputGroup
          leftIcon="search"
          onChange={this.onHandleFilterChange}
          placeholder="Search Top Headlines"
          // rightElement={maybeSpinner}
          value={this.state.filterValue}
      />
      <Flex py={1} justify="space-between">
        <Box>
          <SelectFilter
            selectedItem={{key: '', value: ''}}
            items={this.getKeyVal(constants.category)}
            onValueChange={this.onCategoryValueChange}
            defaultText="Select Category"
            icon="filter-list"
          />
          <SelectFilter
            selectedItem={{key: '', value: ''}}
            items={this.getKeyVal(constants.country)}
            onValueChange={this.onCategoryValueChange}
            defaultText="Select Country"
            icon="flag"
          />
        </Box>
        <Button className={Classes.INTENT_PRIMARY}>Search</Button>
      </Flex>
    </Flex>

  }
  private getKeyVal(items: any) {
    return Object.keys(items).map((key) => ({key, value: items[key]}))
  }
  private onCategoryValueChange(n: {key: string, value: string}) {
    // tslint:disable-next-line:no-console
    console.log(n);
  }
  private onHandleFilterChange(e: React.ChangeEvent<HTMLElement>) {
    // tslint:disable-next-line:no-console
    console.log(e.currentTarget);
    this.setState({
      filterValue: e.currentTarget.nodeValue
    });
  }
}

export default TopHeadlinesFilters;