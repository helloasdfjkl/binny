import React, { useState } from "react";
import {
  Clipboard,
  FlatList,
  Image,
  Share,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { Text, Title } from "../components/Themed";

import Button from "./Button";

import uuid from "uuid";
// import Environment from "./config/environment";
// import firebase from "./config/firebase.js";

import firebase from "firebase/app";
import "firebase/storage";

const OBJECTS = [
  {
    id: "79",
    title: "Bagged packaged goods",
  },
  {
    id: "73",
    title: "Food",
  },
];

const LABELS = [
  {
    id: "97%",
    title: "Food",
  },
  {
    id: "90%",
    title: "Ingredient",
  },
  {
    id: "87%",
    title: "Recipe",
  },
  {
    id: "82%",
    title: "Dishware",
  },
  {
    id: "77%",
    title: "Cuisine",
  },
];

const COMPOSTABLES = ["Food, Paper, Napkins, Box, Plants, Soil"];

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXrtDTnhaSQNS69QumAZ_TNjRAoPlivl4",
  authDomain: "binny-2455e.firebaseapp.com",
  projectId: "binny-2455e",
  storageBucket: "binny-2455e.appspot.com",
  messagingSenderId: "662081610083",
  appId: "1:662081610083:web:d22451202cc29d0a40f356",
  measurementId: "G-HM7DPNTVKN",
};

export default class Scanner extends React.Component {
  state = {
    image: null,
    uploading: false,
    uploaded: false,
    analyze: false,
    googleResponse: null,
    ex: 1,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Title>{item.id}</Title>
      </View>
    );

    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.helpContainer}>
          <Image source={require("../assets/images/picplaceholder.png")} />
          <Text style={{ fontSize: 18, color: "#3F6C3E" }}>
            Are you ready to compost your meal?
          </Text>
        </View>

        <View style={styles.picture}>
          <View style={{ flexDirection: "row" }}>
            <Button
              style={{ marginRight: 20 }}
              onPress={this._takePhoto}
              title="Meal Snap :-)"
            />
            <Button
              type={this.state.uploaded ? "enabled" : "disabled"}
              onPress={() =>
                setTimeout(() => {
                  this.setState({ image: null, analyze: true });
                }, 5000)
              }
              title="Analyze!"
            />
          </View>
          {/* {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )} */}
          {!image && !this.state.analyze && (
            <>
              <Text style={{ color: "#95C7A6", fontSize: 16, top: 200 }}>
                1 meal composted today! Great work!
              </Text>

              <Image
                source={require("../assets/images/eating.gif")}
                style={{
                  width: 400,
                  height: 230,
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </>
          )}
          {this.state.analyze && (
            <View style={{ alignItems: "center" }}>
              <Text style={{ padding: 25 }}>
                Wow! What a nice plate you got there! You should definitely
                compost that Food. Everything else seems a little risky. If your
                plate or cutlery is disposable, check to see if it can be
                recycled!
              </Text>

              <Title style={{ paddingLeft: 25 }}>WE DETECTED</Title>
              <View>
                <FlatList
                  style={{ flexGrow: 0 }}
                  data={LABELS}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
              <Button
                style={{ marginRight: 20 }}
                onPress={this.compostID}
                title="I CompostID!"
              />
            </View>
          )}
          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}
        </View>
      </View>
    );
  }

  compostID = () => {
    console.log('yes')
  }
  analyzeExample = () => {
    this.setState({ image: null, analyze: true });
  };

  organize = (array) => {
    return array.map(function (item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        ></View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, googleResponse } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 20,
          width: "100%",
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 360,
              height: 360,
              borderRadius: 10,
              shadowColor: "rgba(0, 0, 0, 0.25)",
              shadowOffset: {
                width: 3,
                height: 6,
              },
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
          />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />

        {/* <Text>Raw JSON:</Text>

        {googleResponse && (
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
            {JSON.stringify(googleResponse.responses)}
          </Text>
        )} */}
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = (item) => {
    <Text>response: {JSON.stringify(item)}</Text>;
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: "Check it out",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log("hi", pickerResult.uri);
    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false, uploaded: true });
    }
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;

      var string = "";
      // return await snapshot.ref.getDownloadURL();
      FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then((res) => {
          let body = JSON.stringify({
            requests: [
              {
                features: [
                  { type: "LABEL_DETECTION", maxResults: 10 },
                  { type: "LANDMARK_DETECTION", maxResults: 5 },
                  { type: "FACE_DETECTION", maxResults: 5 },
                  { type: "LOGO_DETECTION", maxResults: 5 },
                  { type: "TEXT_DETECTION", maxResults: 5 },
                  { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                  { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                  { type: "IMAGE_PROPERTIES", maxResults: 5 },
                  { type: "CROP_HINTS", maxResults: 5 },
                  { type: "WEB_DETECTION", maxResults: 5 },
                ],
                image: {
                  content: res,
                },
              },
            ],
          });
          fetch(
            "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDXrtDTnhaSQNS69QumAZ_TNjRAoPlivl4",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: body,
            }
          )
            .then((res) => res.json())
            .then(
              this.setState({
                googleResponse: res,
                uploading: false,
              })
            )
            .catch((error) => console.log("call error", error));
        })
        .catch((error) => console.log("string bad", error));
    } catch (error) {
      console.log("error", error);
    }
  };
}

async function uploadImageAsync(uri) {
  console.log("uploadImageAsync", uri);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const storageRef = firebase.storage().ref();

  // const ref = firebase
  // 	.storage()
  // 	.ref()
  // 	.child("")
  // const snapshot = await ref.put(blob);

  blob.close();
  return uri;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFEF4",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },

  helpContainer: {
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#95C7A6",
    zIndex: 6,
    width: "100%",
    padding: 20,
    paddingTop: 50,
    marginBottom: 10,
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
  picture: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  item: {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    paddingHorizontal: 25,
    margin: 10,
  },
  title: {
    fontSize: 18,
  },
});
