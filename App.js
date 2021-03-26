import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
