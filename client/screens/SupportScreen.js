import React from "react";
import {
  VStack,
  Button,
  FormControl,
  Input,
  NativeBaseProvider,
  Center,
  TextArea,
} from "native-base";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
function ContactForm() {
  const [formData, setData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState({});
  const navigation = useNavigation();
  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate()
      ? Alert.alert("Sucess", "Thank you for your contact", [
          {
            text: "OK",
            onPress: () => {
              setData({
                name: "",
                email: "",
                message: "",
              });
              navigation.navigate("Profile");
            },
          },
        ])
      : alert("Message failed");
  };

  return (
    <VStack width="90%" mx="3" maxW="300px">
      <FormControl isRequired isInvalid={"name" in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Name
        </FormControl.Label>
        <Input
          placeholder="John"
          onChangeText={(value) => setData({ ...formData, name: value })}
        />

        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Email
        </FormControl.Label>
        <Input
          placeholder="John@hotmail.com"
          onChangeText={(value) => setData({ ...formData, name: value })}
        />

        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Message
        </FormControl.Label>
        <TextArea
          h={20}
          placeholder="Write your message here"
          w="75%"
          maxW="300"
          onChangeText={(value) => setData({ ...formData, name: value })}
        />

        {"name" in errors ? (
          <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>
            Name should contain atleast 3 character.
          </FormControl.HelperText>
        )}
      </FormControl>
      <Button onPress={onSubmit} mt="5" style={{ backgroundColor: "#0c8079" }}>
        Submit
      </Button>
    </VStack>
  );
}

function SupportScreen() {
  return (
    <Center flex={1}>
      <ContactForm />
    </Center>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center style={{ backgroundColor: "#eef2e6" }} flex={1} px="3">
        <SupportScreen />
      </Center>
    </NativeBaseProvider>
  );
};
