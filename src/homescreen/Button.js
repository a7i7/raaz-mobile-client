import React, { Component } from "react";
import { requireNativeComponent, View } from "react-native";

export default class Button extends Component {
  // onChange = (event) => {
  //     if(this.props)
  // }

  render() {
    return <ButtonView {...this.props} />;
  }
}

var ButtonView = requireNativeComponent("ButtonView", Button);
