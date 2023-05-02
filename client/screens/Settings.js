import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from "native-base";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserAvatar from "react-native-user-avatar";
//import { useLogin } from '../Context/LoginProvider';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const navigation = useNavigation();
  const [users, setUsers] = useState({ name: "" });
  const [showModal, setShowModal] = useState(false);
  // const { setIsLoggedIn,  user } = useLogin();

  useEffect(() => {
    axios
      .get(`http://192.168.189.2:8000/auth/loggedin-user`)

      .then((res) => {
        setUsers(res.data);
        console.log(res.data.name);
        //setIsLoggedin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (name, value) => {
    setUsers({ ...users, [name]: value });
  };

  const handleSubmit = (e) => {
    axios
      .put(`http://192.168.189.2:8000/api/users/${users._id}`, {
        name: users.name,
      })
      .then((res) => console.log("Success"))
      .catch((e) => console.log(e));
  };

  return (
    <NativeBaseProvider>
      <View style={styles.AndroidSafeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 10,
              width: "100%",
              backgroundColor: "#0c8079",
              height: 150,
            }}
          ></View>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <UserAvatar
              size={100}
              name={users.name}
              style={{
                width: 140,
                height: 140,
                borderRadius: 100,
                marginTop: -70,
                backgroundColor: "#A4BE7B",
              }}
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", padding: 10 }}>
              {users.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "grey",
                marginBottom: 15,
              }}
            >
              {users.email}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonIcons}
            onPress={() => setShowModal(true)}
          >
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Edit Username</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>New Username</FormControl.Label>
                    <Input
                      name="name"
                      value={users.name}
                      onChangeText={(text) => handleChange("name", text)}
                    />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        handleSubmit();
                        setShowModal(false);
                      }}
                    >
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <Text style={{ padding: 5 }}>Change username</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonIcons}>
            <MaterialIcons name="alternate-email" size={25} color="#0c8079" />
            <Text style={{ padding: 5 }}>Change email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonIcons}>
            <IconSimpleLineIcons
              name="user-following"
              size={25}
              color="#0c8079"
            />
            <Text style={{ padding: 5 }}>Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttonIcons: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginBottom: 15,
  },
});
