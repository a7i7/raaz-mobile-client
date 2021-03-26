import React, { useState, Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Stripe from "./StripeModule";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import axios from "axios";
import Button from "../homescreen/Button";

const BACKGROUND_COLOR = "#DEE5E5";
const BUTTON_COLOR = "#444444";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: "",
      expiry: "",
      cvc: "",
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange(form) {
    this.setState({
      pan: form.values.number,
      expiry: form.values.expiry,
      cvc: form.values.cvc,
      valid: form.valid,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CreditCardInput
          onChange={this._onChange}
          allowScroll={true}
          inputStyle={{ width: "100%" }}
        />
        {/* <Button
          style={{
            backgroundColor: BACKGROUND_COLOR,
            width: "100%",
            height: "100%",
            paddingTop: 30,
          }}
        /> */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            axios
              .get("http://3.138.202.134:3000/api/createPaymentIntent")
              .then((response) => {
                // Stripe.show(
                //   "4000002500003155",
                //   "07/23",
                //   "666",
                //   response.data.client_secret
                // );

                Stripe.show(
                  this.state.pan,
                  this.state.expiry,
                  this.state.cvc,
                  response.data.client_secret
                );
              });
          }}
        >
          <Text style={styles.buttonTextStyle}>Pay</Text>
        </TouchableOpacity>
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
    borderRadius: 20,
    borderWidth: 1,
  },
  container: {
    flex: 0.7,
    backgroundColor: BACKGROUND_COLOR,
    paddingTop: 60,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Payment;
