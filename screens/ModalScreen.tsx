import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text} from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Image source = {require("../assets/images/icons8-woodpecker-150.png")}/>
      <Text style = {{padding: 40}}> On average, composting a meal with leftovers prevents methane formation of about 729 cubic inches! That's a whole 9"x9"x9" plushie or two 4-packs of ramen from your weekly Chinatown run.</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
