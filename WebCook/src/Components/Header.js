//Header Screen displays Application name and menu bar
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.webcook}>WebCook</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="Settings" size={30} color="#660000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Comment")}>
          <Icon name="Comment" size={30} color="#660000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} color="#660000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: "#ffd966",
  },
  logo: {
    width: 40,
    height: 40,
  },
  webcook: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default Header;
