//Home Screen with Recipe's name and images
import React from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "./style";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";

import RecipieCard from "../../Components/RecipieCard/RecipieCard";

const Home = ({ navigation, prd, toggleTheme, isDarkTheme }) => {
  const backgroundColor = isDarkTheme ? "black" : "pink";
  const textStyle = isDarkTheme ? styles.darkText : styles.lightText;
  return (
    <View style={styles.container} backgroundColor={backgroundColor}>
      <StatusBar backgroundColor={backgroundColor} barStyle="#6a51ae" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              gap: 25,
            }}
          >
            <TouchableOpacity onPress={toggleTheme}>
              <MaterialIcons name="mode-night" size={24} style={textStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.shopInfoContainer}>
          <Text style={[styles.shopName, textStyle]}>
            Welcome to WebCook Recipes Application.
          </Text>
          <Text style={[styles.shopDescription, textStyle]}>
            {" "}
            Every recipe has it's own story and it's own way of presenting.
          </Text>

          <View style={styles.productCardContainer}>
            {prd.map((data) => (
              <RecipieCard
                data={data}
                key={data.idMeal}
                navigation={navigation}
                isDarkTheme={isDarkTheme}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
