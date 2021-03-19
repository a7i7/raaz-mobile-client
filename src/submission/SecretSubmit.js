import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import { getDeviceId } from "../identity/DeviceId";

const BACKGROUND_COLOR = "#DEE5E5";
const BUTTON_COLOR = "#17B890";
const BUTTON_TEXT_COLOR = "#DEE5E5";
const MAX_LENGTH = 240;
class SecretSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChars: 0,
      submissionState: "INITIAL",
      text: "",
    };
  }

  submit(text) {
    this.setState({
      submissionState: "SUBMITTING",
    });
    getDeviceId()
      .then((deviceId) => {
        const secret = {
          secret: text,
          deviceId: deviceId,
        };
        return axios.post("http://3.138.202.134:3000/api/createSecret", secret);
      })
      .then(
        (response) => {
          this.setState({
            submissionState: "SUBMITTED",
          });
        },

        (err) => {
          this.setState({
            submissionState: "FAILED",
          });
        }
      );
  }
  render() {
    if (this.state.submissionState == "SUBMITTED") {
      const loadingLottie = require("./success.json");

      return (
        <LottieView
          source={loadingLottie}
          autoPlay={true}
          loop={false}
          speed={1.5}
          onAnimationFinish={() => {
            this.props.navigation.goBack(null);
          }}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButtonStyle}
            onPress={() => this.props.navigation.goBack(null)}
          >
            <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.submit(this.state.text)}
          >
            <Text style={styles.buttonTextStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.characterCountStyle}>
          {this.state.numChars}/{MAX_LENGTH}
        </Text>
        <View style={styles.submissionContainer}>
          <TextInput
            style={styles.textBox}
            multiline={true}
            maxLength={MAX_LENGTH}
            autoFocus={true}
            editable={
              this.state.submissionState == "INITIAL" ||
              this.state.submissionState == "SUBMITTED"
            }
            onChangeText={(text) =>
              this.setState({
                numChars: text.length,
                text: text,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: BUTTON_TEXT_COLOR,
    fontSize: 12,
  },
  cancelButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonTextStyle: {
    color: BUTTON_COLOR,
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: BUTTON_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  characterCountStyle: {
    marginLeft: 20,
    marginTop: 20,
  },
  textBoxBackground: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    textAlignVertical: "top",
    borderColor: "gray",
    fontSize: 24,
    marginTop: 20,
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    backgroundColor: BACKGROUND_COLOR,
  },
  submissionContainer: {
    backgroundColor: BACKGROUND_COLOR,
  },
});
export default SecretSubmit;
