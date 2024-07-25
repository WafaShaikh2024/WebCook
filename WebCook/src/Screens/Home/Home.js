// Home.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "./style";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import RecipieCard from "../../Components/RecipieCard/RecipieCard";
import Colors from "../../Constants/Colors";
import axios from "axios";
import bannerImageLight from "../../../assets/adaptive-icon-light.png";
import bannerImage from "../../../assets/adaptive-icon.png";

const Home = ({ navigation, prd, toggleTheme, isDarkTheme }) => {
  const [recipe, setRecipe] = useState([]);
  const backgroundColor = isDarkTheme ? Colors.black : Colors.bgGreen;
  const textStyle = isDarkTheme ? styles.darkText : styles.lightText;
  const Banner_Image = Image.resolveAssetSource(bannerImage).uri;
  const Banner_Image_Light = Image.resolveAssetSource(bannerImageLight).uri;
  const BannerImageChange = isDarkTheme ? Banner_Image_Light : Banner_Image;

  const { navigate } = useNavigation();
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Capstone/WebCook/WebCook/backend/recipes_db.php"
      );
      setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handlePostClick = () => {
    navigate("PostRecipe");
  };

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
              <MaterialIcons
                name={isDarkTheme ? "light-mode" : "mode-night"}
                size={24}
                style={textStyle}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shopInfoContainer}>
          <View
            style={[
              {
                justifyContent: "center",
                margin: "0 auto",
                alignItems: "center",
              },
            ]}
          >
            <Image
              source={{ uri: BannerImageChange }}
              style={styles.shopImage}
            />
            <Text style={[styles.shopDescription, textStyle]}>
              Every recipe has it's own story and it's own way of presenting.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("SearchRecipe")}
          ></TouchableOpacity>

          <View style={styles.productCategoryContainer}>
            <View style={styles.productCategoryHeader}>
              <View style={styles.productCategoryTitle}>
                <Text style={[{ fontSize: 20 }, textStyle]}>
                  Featured recipies
                </Text>
                <Text
                  style={[
                    { paddingLeft: 8, fontSize: 16, fontWeight: "bold" },
                    textStyle,
                  ]}
                >
                  ({prd.length})
                </Text>
              </View>
            </View>

            <View style={styles.productCardContainer}>
              {prd.map((data) => (
                <RecipieCard
                  data={data}
                  key={data.idMeal}
                  navigation={navigation}
                  isDarkTheme={isDarkTheme}
                  onPressPost={handlePostClick}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
