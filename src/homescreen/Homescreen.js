import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { getDeviceId } from "../identity/DeviceId";
import SecretView from "./SecretView";

class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      deviceId: "",
      secrets: [],
    };
  }

  componentDidMount() {
    getDeviceId()
      .then((deviceId) => {
        this.setState({ deviceId: deviceId, loading: false });
        return axios.get("http://3.138.202.134:3000/api/listSecrets");
      })
      .then((response) => {
        this.setState({
          loading: false,
          secrets: response.data,
        });
      });
  }

  render() {
    const loading = this.state.loading;
    if (loading) {
      text = (
        <Text onPress={() => this.setState({ deviceId: "bbbbb" })}>
          Loading
        </Text>
      );
    } else {
      text = (
        <Text onPress={() => this.setState({ deviceId: "bbbbb" })}>
          {this.state.deviceId}
        </Text>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate("Submit")}
        >
          <Text style={styles.buttonTextStyle}>Share your secret</Text>
        </TouchableOpacity>
        <FlatList
          style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}
          data={this.state.secrets.map((s) => {
            return { ...s, key: s.secretId };
          })}
          renderItem={({ item }) => <SecretView item={item} />}
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#C51E3A",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Homescreen;
