import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import COLOURS from "../../Constants/Colors";
import styles from "./styles";

const RecipieCard = ({ navigation, data, isDarkTheme, onPressPost }) => {
  const textStyle = isDarkTheme ? styles.darkText : styles.lightText;
  const btnBgStyle = isDarkTheme ? styles.bgDark : styles.bgLight;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.strMealThumb }} style={styles.image} />
      </View>
      <Text style={[styles.productName, textStyle]}>{data.strMeal}</Text>

      <View style={styles.detailCartButton}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RecpieDetailScreen", {
              productID: data.idMeal,
            })
          }
          style={[styles.detailCartButton, btnBgStyle]}
        >
          <Text style={[styles.detailCartButtonText, btnBgStyle]}>
            Read More
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPressPost}>
        <View>
          <Text>{data.recipeName}</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default RecipieCard;
