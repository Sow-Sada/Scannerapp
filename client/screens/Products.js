import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  NativeBaseProvider,
  ScrollView,
  FlatList,
  VStack,
  Avatar,
  Spacer,
} from "native-base";
import axios from "axios";
import { StyleSheet, StatusBar } from "react-native";

const Products = () => {
  const [product, setProduct] = useState([]);

  const handleBarSearch = async () => {
    try {
      const response = await axios.get(
        `http://192.168.191.159:8000/api/products`
      );
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleBarSearch();
    console.log(product);
  }, []);

  return (
    <Box style={styles.AndroidSafeArea}>
      <FlatList
        data={product}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Image
                source={{ uri: item.photos }}
                style={{ width: 80, height: 80 }}
                alt={item.productName}
              />
              <VStack>
                <Text style={styles.productName}
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.productName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.categoryName}
                </Text>
              </VStack>
              <Spacer />
              <Image
                source={{ uri: item?.classificationPhoto[0] }}
                style={{ width: 50, height: 50 }}
                alt={item.productName}
              />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Products />
      </Center>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: "flex-end",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
