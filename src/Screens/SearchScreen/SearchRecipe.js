import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import COLOURS from "../../Constants/Colors";
import styles from "./styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import RecipieCard from "../../Components/RecipieCard/RecipieCard";

const SearchRecpie = ({ navigation, isDarkTheme }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recpies, setRecpies] = useState([]);

  const backgroundColor = isDarkTheme ? "black" : "white";
  const textStyle = isDarkTheme ? styles.darkText : styles.lightText;

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      setRecpies(response.data.meals || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container} backgroundColor={backgroundColor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack("Home")}>
            <Entypo
              name="chevron-left"
              style={[styles.backButton, textStyle]}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.randomRecipeButton}
          onPress={() =>
            navigation.navigate("RecpieDetailScreen", { randomMeal: true })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo
              name="cycle"
              size={24}
              style={[{ marginRight: 8 }, textStyle]}
            />
            <Text style={[styles.randomRecipeButtonText, textStyle]}>
              Can't Decide What To Cook {"\n"} Let Us Help You!
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <TextInput
            style={{
              justifyContent: "flex-end",
              height: 40,
              borderColor: isDarkTheme ? COLOURS.white : COLOURS.gray,
              borderWidth: 1,
              borderRadius: 4,
              paddingLeft: 50,
              marginRight: 4,
              backgroundColor: isDarkTheme
                ? COLOURS.white
                : COLOURS.lightBackground,
              color: isDarkTheme ? COLOURS.lightText : COLOURS.darkText,
            }}
            placeholder="Search Recipe..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              style={[styles.search, textStyle]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.productCategoryContainer}>
          <View style={styles.productCardContainer}>
            {recpies.map((data) => (
              <RecipieCard
                data={data}
                key={data.idMeal}
                navigation={navigation}
                 searchMeal={true} 
                isDarkTheme={isDarkTheme}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchRecpie;
