import React, { useState } from "react";
import { StyleSheet, Button, View } from "react-native";

import Scanner from "../components/Scanner";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text } from "../components/Themed";

export default function TabTwoScreen(navigation) {
  const [scanner, toggleScanner] = useState(false);

  return (
    <View style={styles.container}>
      <Scanner navigation = {navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
