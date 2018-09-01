import { Button, Classes, InputGroup } from '@blueprintjs/core';
import * as React from 'react';
import { Box, Flex } from 'reflexbox';
import constants from '../../utils/constants';
import SelectFilter from '../common/SelectFilter';

interface ILocalProps {
  selected: {
    q: string,
    category: string;
    country: string;
  };
  onSearch: (obj: object) => void;
}
class TopHeadlinesFilters extends React.Component<ILocalProps, any> {
  constructor(props: ILocalProps) {
    super(props);
    this.state = {
      searchValue: props.selected.q,
      selectedCategory: {
        key: props.selected.category,
        value: constants.category[props.selected.category]
      },
      selectedCountry: {
        key: props.selected.country,
        value: constants.country[props.selected.country]
      }
    }
    this.onHandleFilterChange = this.onHandleFilterChange.bind(this);
    this.onCategoryValueChange = this.onCategoryValueChange.bind(this);
    this.onCountryValueChange = this.onCountryValueChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }
  public render() {
    return <Flex p={1} column={true}>
      <InputGroup
          leftIcon="search"
          onChange={this.onHandleFilterChange}
          placeholder="Search Top Headlines"
          value={this.state.searchValue}
      />
      <Flex py={1} justify="space-between">
        <Box>
          <SelectFilter
            selectedItem={this.state.selectedCategory}
            items={this.getKeyVal(constants.category)}
            onValueChange={this.onCategoryValueChange}
            defaultText="Select Category"
            icon="filter-list"
          />
          <SelectFilter
            selectedItem={this.state.selectedCountry}
            items={this.getKeyVal(constants.country)}
            onValueChange={this.onCountryValueChange}
            defaultText="Select Country"
            icon="flag"
          />
        </Box>
        <Button className={Classes.INTENT_PRIMARY} onClick={this.onSearchClick}>Search</Button>
      </Flex>
    </Flex>

  }
  private getKeyVal(items: any) {
    return Object.keys(items).map((key) => ({key, value: items[key]}))
  }
  private onCategoryValueChange(n: {key: string, value: string}) {
    this.setState({
      selectedCategory: n
    })
  }
  private onCountryValueChange(n: {key: string, value: string}) {
    this.setState({
      selectedCountry: n
    })
  }
  private onHandleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchValue: e.currentTarget.value
    });
  }
  private onSearchClick() {
    this.props.onSearch({
      category: this.state.selectedCategory.key,
      country: this.state.selectedCountry.key,
      q: this.state.searchValue,
    })
  }
}

export default TopHeadlinesFilters;