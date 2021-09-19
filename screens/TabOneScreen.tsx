import React, { useState } from "react";
import { StyleSheet, Pressable, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, Title } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import Card from "../components/Card";
import CircularProgress from "../components/CircularProgress";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [progress, setProgress] = useState(95);

  return (
    <View style={styles.container}>
      <View elevation={5} style={styles.header}>
        <Title style={{ color: "#3F6C3E", padding: 10, textAlign: "center" }}>
          Nice! You just earned a point :~)
        </Title>
        <Image
          source={require("../assets/images/soil.png")}
          style={{ width: 120, height: 120, position: "absolute", bottom: 60 }}
        />
        <Text style={{ textAlign: "center", fontSize: 14 }}>
          Your composting makes a real difference. See on average how much
          you've helped the environment since you downloaded this app 108 days
          ago.
        </Text>
      </View>

      <Card
        navigation={navigation}
        title="21.8"
        units="pounds"
        caption="Food Waste"
      />
      <Card
        navigation={navigation}
        title="79,461"
        units="cubic inches"
        caption="Methane Reduced"
      />
      <Card
        navigation={navigation}
        title="36.33"
        units="gallons"
        caption="Water Conserved"
      />
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "column", width: 90, marginRight: 15 }}>
          <Title style={{ textAlign: "center" }}>9</Title>
          <Text style={{ textAlign: "center" }}> rewards claimed</Text>
        </View>
        <CircularProgress percent={100 - progress} />
        <View style={{ flexDirection: "column", width: 90, marginLeft: 25 }}>
          <Title style={{ textAlign: "center" }}>1</Title>
          <Text style={{ textAlign: "center" }}>compostIDs to reward</Text>
        </View>
      </View>
      {/*20 meals composted = one spin --> +5% per compost*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFEF4",
    alignItems: "center",
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#95C7A6",
    zIndex: 6,
    width: "100%",
    height: "37%",
    padding: 20,
    paddingTop: 50,
    marginBottom: 30,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
      width: 0,
    },
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
});
