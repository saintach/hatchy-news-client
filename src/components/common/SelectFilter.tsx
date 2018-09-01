import { Button, MenuItem } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { ItemRenderer, Select } from "@blueprintjs/select";
import * as React from 'react';

interface IIdValue {
  key: string;
  value: string;
}

interface ILocalProps {
  selectedItem: IIdValue;
  items: IIdValue[];
  onValueChange: (n: IIdValue) => void;
  icon?: IconName;
  defaultText?: string;
}

const NSelect = Select.ofType<IIdValue>();

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(escapeRegExpChars);
  if (words.length === 0) {
      return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
      const match = regexp.exec(text);
      if (!match) {
          break;
      }
      const length = match[0].length;
      const before = text.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
          tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
      tokens.push(rest);
  }
  return tokens;
}

const renderItem: ItemRenderer<IIdValue> = (item, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
      return null;
  }
  const text = `${item.value}`;
  return (
      <MenuItem
          active={modifiers.active}
          key={item.key}
          onClick={handleClick}
          text={highlightText(text, query)}
      />
  );
};

class SelectCon extends React.Component<ILocalProps, any> {
  constructor(props: ILocalProps) {
    super(props);
    this.state = {
      selectedItem: props.selectedItem
    };
  }
  public render() {
    const { selectedItem } = this.state;
    return (
      <NSelect itemRenderer={renderItem} items={this.props.items} onItemSelect={this.handleValueChange}>
        <Button
          icon={this.props.icon || 'filter'}
          rightIcon="caret-down"
          text={selectedItem.value ? selectedItem.value : this.props.defaultText || '-- No selection --'}
        />
      </NSelect>
    );
  }
  private handleValueChange = (n: IIdValue) => {
    this.setState({
      selectedItem: n
    }, () => this.props.onValueChange(n))
  };
}

export default SelectCon;
