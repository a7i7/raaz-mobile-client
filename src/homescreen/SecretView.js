import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Text, ImageBackground } from "react-native";

import Heart from "./Heart";

class SecretView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      numLikes: 101,
    };
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          height: 240,
          resize: "both",
          backgroundColor: "#FFF",
          marginTop: 36,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "black",
            flex: 1,
            padding: 20,
          }}
        >
          {this.props.item["secret"]}
        </Text>
        <View
          style={{
            width: 40,
            height: 40,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              paddingLeft: 14,
              paddingRight: 4,
            }}
            onPress={() => {
              return this.setState({ liked: !this.state.liked });
            }}
          >
            <Heart filled={this.state.liked} />
          </TouchableOpacity>
          <Text
            style={{
              alignItems: "center",
              paddingTop: 6,
              paddingLeft: 4,
            }}
          >
            {this.state.numLikes}
          </Text>
        </View>
      </View>
    );
  }
}

export default SecretView;
