import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Svg, Path } from "react-native-svg";
import * as Animatable from "react-native-animatable";
import { Audio } from "expo-av";
import HistoryContext from "../Context/HistoryContext";
import { useNavigation } from "@react-navigation/native";

import {
  VStack,
  HStack,
  Spacer,
  Text,
  NativeBaseProvider,
  Box,
  Flex,
  Heading,
} from "native-base";
import axios from "axios";
import {
  StyleSheet,
  Image,
  View,
  Modal,
  SafeAreaView,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [productData, setProductData] = useState(null);
  const [text, setText] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [sound, setSound] = React.useState();
  const { refreshHistory } = useContext(HistoryContext);
  const navigation = useNavigation();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/beep-07a.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  useEffect(() => {
    setTimeout(() => {
      setShowCheck(false);
    }, 2000);
  }, [showCheck]);
  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      playSound();
      setScanned(true);
      setShowCheck(true);
      setText(data);

      const response = await axios.get(
        `http://192.168.189.2:8000/api/products/scan/${data}`
      );
      setProductData(response.data);
      refreshHistory();
      setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Show modal after 1 second
    } catch (error) {
      console.error(error);
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Box mt="5" alignItems="center">
          <Flex alignItems="center" w="100%">
            <Heading
              style={{ fontSize: 40, color: "#A4BE7B" }}
              mx="3"
              pt="2"
              alignItems="center"
              flexDirection="row"
            >
              ScanEat
            </Heading>
            <Image
              style={{ height: 60, width: 60 }}
              source={require("../assets/barcode_scanner-removebg-preview.png")}
            />
          </Flex>
          <View>
            {showCheck && (
              <Animatable.View
                animation="bounceIn"
                easing="ease-out"
                iterationCount={1}
                fadeOutDuration={1000}
                fadeOutDelay={2000}
                style={styles.checkBubble}
              >
                <Svg width={36} height={36} viewBox="0 0 24 24">
                  <Path
                    d="M9 16.17l-3.59-3.58L4 14l5 5 10-10-1.41-1.42L9 16.17z"
                    fill="#fff"
                  />
                </Svg>
              </Animatable.View>
            )}
          </View>
        </Box>

        <View style={styles.container}>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
          </View>
          <Text style={styles.maintext}>{text}</Text>

          {scanned && (
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={styles.button}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      {productData && (
        <Modal visible={isOpen} animationType="slide" transparent={false}>
          <SafeAreaView
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Product detail", { productData });
                setIsOpen(false);
              }}
            >
              <Box style={{ width: 420 }}>
                <HStack
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  pl={["0", "4"]}
                  pr={["0", "5"]}
                  py="2"
                  space={[2, 3]}
                  justifyContent="space-between"
                >
                  <Image
                    source={{ uri: productData.photos }}
                    style={{ width: 80, height: 80 }}
                    alt={productData.productName}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {productData.productName}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {productData.categoryName}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Image
                    source={{ uri: productData?.classificationPhoto[0] }}
                    style={{
                      width: 40,
                      height: 40,
                      alignSelf: "center",
                      marginRight: 22,
                    }}
                    alt={productData.productName}
                  />
                </HStack>
              </Box>
            </TouchableOpacity>
          </SafeAreaView>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={styles.buttonStyle}
          >
            <Text style={{ color: "white" }}>Close</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Scanner />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef2e6",
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef2e6",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#A4BE7B",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
  },
  buttonStyle: {
    alignSelf: "center",
    marginBottom: 30,
    backgroundColor: "#A4BE7B",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10, // adjust this value to increase or decrease the curvature
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  checkBubble: {
    backgroundColor: "#0c8079",
    borderRadius: "50%",
  },
});
