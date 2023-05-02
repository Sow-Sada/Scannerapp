import React from "react";
import {
  VStack,
  HStack,
  Input,
  Spacer,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingProduct, setMatchingProduct] = useState([]);
  const navigation = useNavigation();
  const InputRef = useRef(null);

  const handleSearch = () => {
    axios
      .get(`http://192.168.189.2:8000/api/products/search/${searchQuery}`)
      .then((response) => {
        const filteredProducts = response.data.filter(
          (product) =>
            product.productName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.categoryName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setMatchingProduct(filteredProducts);
        setSearchQuery("");
        InputRef.current.clear();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <VStack
        my="4"
        space={5}
        w="100%"
        maxW="300px"
        divider={
          <Box px="2">
            <Divider />
          </Box>
        }
        alignItems="center"
      >
        <VStack w="100%" space={5}>
          <Center />
          <Input
            placeholder="Search"
            ref={InputRef}
            variant="rounded"
            width="100%"
            borderRadius="20"
            py="2"
            px="2"
            InputLeftElement={
              <Icon
                ml="2"
                size="5"
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
        </VStack>
      </VStack>
      {matchingProduct && matchingProduct.length > 0 ? (
        <FlatList
          data={matchingProduct}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", { productData: item })
              }
            >
              <Box
                style={{ width: 420 }}
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
                    <Text
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
                    style={{
                      width: 40,
                      height: 40,
                      alignSelf: "center",
                      marginRight: 22,
                    }}
                    alt={item.productName}
                  />
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Image
          source={require("../assets/empty-home-page.png")}
          style={styles.image}
          alt="Empty Home Page"
        />
      )}
    </>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
        <Search />
      </SafeAreaView>
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
  image: {
    width: 260,
    height: 260,
    opacity: 0.7,
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchBackground: {
    backgroundColor: "#eef2e6",
  },
});
