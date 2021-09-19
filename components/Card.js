import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Pressable,
} from "react-native";
import { Text, Title } from "../components/Themed";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

function Card({
  title,
  caption,
  onPress,
  color = "primary",
  style,
  units,
  navigation,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => navigation.navigate("Modal")}
      {...otherProps}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title style={{ fontSize: 30 }}>{title} </Title>
          <Text style={{ fontSize: 12 }}>{units}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title style={{ fontSize: 18 }}>{caption} </Title>

          <Pressable
            onPress={() => navigation.navigate("Modal")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <FontAwesome
              name="info-circle"
              size={20}
              color={"black"}
              style={{ marginRight: 15 }}
            />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderColor: "rgba(179, 208, 198, 1)",
    borderWidth: 2,
    width: 0.92 * width,
    marginBottom: 15,
    height: 85,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    backgroundColor: "rgba(250, 250, 250, 1)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingLeft: 10,
    justifyContent: "center",
  },
  header: {
    marginTop: 0.01 * height,
    marginHorizontal: 0.01 * height,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Card;
