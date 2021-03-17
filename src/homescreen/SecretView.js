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
    };
  }

  render() {
    return (
      <View
        // source={{
        //   uri:
        //     "https://picsum.photos/1600" +
        //     "?random_number=" +
        //     Math.floor(Math.random() * 34567),
        // }}
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
          {this.props.item["secret"]}y
        </Text>
        <TouchableOpacity
          style={{
            // borderWidth: 1,
            // borderColor: "green",
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            return this.setState({ liked: !this.state.liked });
          }}
        >
          <Heart filled={this.state.liked} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SecretView;
