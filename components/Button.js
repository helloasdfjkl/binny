import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Title } from "../components/Themed";

function Button({ title, onPress, style, type, ...otherProps }) {
  return (
    <TouchableOpacity
      activeOpacity={type == "disabled" ? 1 : 0}
      style={[type == "disabled" ? styles.button : styles.button2, style]}
      onPress={type == "disabled" ? null : onPress}
      {...otherProps}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Title style={[type == "disabled" ? styles.color : styles.color2]}>
          {title}{" "}
        </Title>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button2: {
    borderRadius: 8,
    backgroundColor: "#95C7A6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 15,
    width: "40%",
    height: 60,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  button: {
    borderRadius: 8,
    borderColor: "#95C7A6",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 15,
    width: "40%",
    height: 60,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  color: {
    color: "#95C7A6",
  },
  color2: {
    color: "#FFFEF4",
  },
});

export default Button;
