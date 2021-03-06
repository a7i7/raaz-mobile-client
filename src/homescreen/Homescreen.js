import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { getDeviceId } from "../identity/DeviceId";
import SecretView from "./SecretView";
import LottieView from "lottie-react-native";
import Stripe from "./StripeModule";
import Button from "./Button";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import Payment from "../payment/Payment";
const BACKGROUND_COLOR = "#DEE5E5";
const BUTTON_COLOR = "#17B890";

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
        this.setState({ deviceId: deviceId });
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
    // Stripe.show();
    const loading = this.state.loading;
    if (loading) {
      const loadingLottie = require("./loading.json");
      return <LottieView source={loadingLottie} autoPlay loop />;
    }
    if (false) {
      return (
        <Button
          style={{
            backgroundColor: BACKGROUND_COLOR,
            width: "100%",
            height: "100%",
            paddingTop: 30,
          }}
        />
      );
    }
    if (true) {
      return <Payment />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate("Submit")}
        >
          <Text style={styles.buttonTextStyle}>Share your secret</Text>
        </TouchableOpacity>

        <FlatList
          style={{
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
          }}
          data={this.state.secrets.map((s) => {
            return { ...s, key: s.secretId };
          })}
          renderItem={({ item }) => <SecretView item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: BACKGROUND_COLOR,
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: BUTTON_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 6,
    paddingLeft: 6,
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
});

export default Homescreen;
