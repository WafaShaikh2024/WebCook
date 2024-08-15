import {
    View,
    Text,
    ScrollView,
  } from "react-native";
  import styles from "./styles";
  import RecipieCard from "../../Components/RecipieCard/RecipieCard";
  import Colors from "../../Constants/Colors";
  import { useNavigation } from "@react-navigation/native";
import React from 'react'

const FavouriteScreen = ({ navigation, prd, isDarkTheme }) => {
    const backgroundColor = isDarkTheme ? Colors.black : Colors.bgGreen;
  const { navigate } = useNavigation();

  const handlePostClick = () => {
    navigate("PostRecipe");
  };
  const textStyle = isDarkTheme ? styles.darkText : styles.lightText;
  return (
    <View style={styles.container} backgroundColor={backgroundColor}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.productCategoryContainer}>
    <View style={styles.productCategoryHeader}>
      <View style={styles.productCategoryTitle}>
        <Text style={[{ fontSize: 20 }, textStyle]}>
          Favourite recipies
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
  </ScrollView>
  </View>
  )
}

export default FavouriteScreen

