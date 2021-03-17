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

class SecretSubmit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Submit")}
          >
            <Text style={styles.buttonTextStyle}>Share your secret</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submissionContainer}>
          <ImageBackground
            source={{
              uri:
                "https://picsum.photos/480/640" +
                "?random_number=" +
                Math.floor(Math.random() * 1000000),
            }}
            style={styles.textBoxBackground}
          >
            <TextInput style={styles.textBox} />
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBoxBackground: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    width: "100%",
    height: "100%",
    borderColor: "gray",
    fontSize: 36,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 50,
    paddingRight: 50,
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: "green",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 6,
    paddingLeft: 6,
    marginTop: 20,
    width: 200,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  submissionContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
export default SecretSubmit;
