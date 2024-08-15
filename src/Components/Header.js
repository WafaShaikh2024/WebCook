//Header Screen displays Application name and menu bar
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SearchRecipe")}>
          <Icon name="search" size={30} color="#660000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.webcook}>WebCook</Text>
      
      <View style={{
  flexDirection: 'row',
  gap:25
}}>

<View style={styles.iconContainer}>
  
        <TouchableOpacity onPress={() => navigation.navigate("PostRecipe")}>
          <Icon name="message" size={30} color="#660000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("FavouriteScreen")}>
          <MaterialIcons name="favorite" size={30} color="#660000" />
        </TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
<Ionicons name="notifications" size={30} color="#660000" />
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
    backgroundColor: "#79AC78",
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
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
