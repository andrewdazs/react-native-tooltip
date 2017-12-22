// @flow

import React, { Component } from 'react';
import {
  requireNativeComponent,
  TouchableHighlight,
  View,
  NativeModules,
  findNodeHandle,
} from 'react-native';
import PropTypes from 'prop-types';

const { ToolTipMenu } = NativeModules;
const RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

export class ViewClass extends Component {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      onPress: PropTypes.func,
    })),
    arrowDirection: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    longPress: PropTypes.bool,
    ...TouchableHighlight.propTypes,
  }

  getDefaultProps() {
    return {
      arrowDirection: 'down'
    };
  }

  showMenu() {
    ToolTipMenu.show(
      findNodeHandle(this.refs.toolTipText),
      this.getOptionTexts(),
      this.props.arrowDirection
    );
  }

  hideMenu() {
    ToolTipMenu.hide();
  }

  getOptionTexts() {
    return this.props.actions.map((option) => option.text);
  }

  getCallback(optionText) {
    const selectedOption = this.props.actions.find(
      (option) => option.text === optionText
    );

    return selectedOption ? selectedOption.onPress : null
  }

  getTouchableHighlightProps() {
    let props = {};

    Object.keys(TouchableHighlight.propTypes).forEach(
      (key) => props[key] = this.props[key]
    );

    if (this.props.longPress) {
      props.onLongPress = this.showMenu;
    } else {
      props.onPress = this.showMenu;
    }

    return props;
  }

  handleToolTipTextChange(event) {
    var callback = this.getCallback(event.nativeEvent.text);

    if (callback) {
      callback(event);
    }
  }

  render() {
    return (
      <RCTToolTipText ref='toolTipText' onChange={this.handleToolTipTextChange}>
        <TouchableHighlight
          {...this.getTouchableHighlightProps()}
        >
          <View>
            {this.props.children}
          </View>
        </TouchableHighlight>
      </RCTToolTipText>
    );
  }
}
