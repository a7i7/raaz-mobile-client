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
// import { Card, ListItem, Icon } from "react-native-elements";
import { Card, Title, Paragraph, Image } from "react-native-paper";
import { getDeviceId } from "./src/identity/DeviceId";
import SecretView from "./src/homescreen/SecretView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SecretSubmit from "./src/submission/SecretSubmit";
import Homescreen from "./src/homescreen/Homescreen";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Homescreen}
            options={{ title: "Overview" }}
          />
          <Stack.Screen name="Submit" component={SecretSubmit} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
