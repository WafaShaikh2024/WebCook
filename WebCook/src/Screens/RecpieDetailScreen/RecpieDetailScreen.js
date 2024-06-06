import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  Linking,Share
} from 'react-native';
import COLOURS from '../../Constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import  styles  from './styles';
import axios from 'axios';




const RecipeDetailScreen= ({ route, navigation,isDarkTheme}) => {
  

  const [recipe, setRecipe] = useState({});

  const backgroundColor = isDarkTheme ? "black" : 'white';
  const textStyle=isDarkTheme?styles.darkText:styles.lightText
  
  const openYouTube = () => {
   
      // Logic to open youtube videos
     const url = recipe.strYoutube;
     Linking.canOpenURL(url)
       .then((supported) => {
         if (supported) {
           Linking.openURL(url);
         } else {
           console.log("Don't know how to open this URL: " + url);
         }
       })
       .catch((err) => console.error('An error occurred', err));
  
  };
  const shareRecipeVideo = () => {
    const url = recipe.strYoutube; // Assuming this is the YouTube link to share
    const message = `Check out this amazing recipe video: ${url}`;
    
    Share.share({
      message: message,
      url: url, // Optional: if you want the link to be clickable (depending on the platform)
      title: 'Amazing Recipe Video' // Optional: title of the content to be shared
    }).then((result) => {
      console.log(result); // You can handle the result of the share action here
    }).catch((error) => {
      console.error('Error sharing', error);
    });
  };
  
  useEffect(() => {
    const { randomMeal } = route.params;
     
    if (randomMeal){
     fetchRandomRecipe()
    }else{
      fetchRecipe()
    }
  }, []);
 const fetchRecipe = async () => {
    try {
      const { productID } = route.params;
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productID}`);
      setRecipe(response.data.meals[0]);
   
    
    } catch (error) {
      console.error(error);
    }
  };
  const fetchRandomRecipe = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
      setRecipe(response.data.meals[0]);
   
    
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea} backgroundColor={backgroundColor}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}> 
      <View style={styles.imageContainer}>
          <View style={styles.headerContainer} backgroundColor={backgroundColor} >
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={styles.backButton}
              />
            </TouchableOpacity>
          </View>
          </View>
        
        <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
        <View style={styles.detailContainer}>
          <Text style={[styles.title,textStyle]}>{recipe.strMeal}</Text>

          <View style={styles.infoContainer}>
            <Text style={[styles.infoTitle,textStyle]}>Category:</Text>
            <Text style={[styles.infoContent,textStyle]}>{recipe.strCategory}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.infoTitle,textStyle]}>Cuisine:</Text>
            <Text style={[styles.infoContent,textStyle]}>{recipe.strArea}</Text>
          </View>

          <Text style={[styles.subTitle,textStyle]}>Ingredients</Text>
          {Object.keys(recipe).map((key) => {
            if (key.startsWith('strIngredient') && recipe[key]) {
              const measureKey = `strMeasure${key.slice('strIngredient'.length)}`;
              return (
                <Text key={key} style={[styles.ingredient,textStyle]}>
                  - {recipe[key]}: {recipe[measureKey]}
                </Text>
              );
            }
          })}

          <Text style={[styles.subTitle,textStyle]}>Instructions</Text>
          <Text style={[styles.instructions,textStyle]}>{recipe.strInstructions}</Text>

          <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={openYouTube} style={[styles.button, styles.watchButton]}>
  <FontAwesome name="youtube-play" size={18} color="#ffffff" style={styles.icon} />
  <Text style={styles.buttonText}>Watch Video</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={shareRecipeVideo} style={[styles.button, styles.shareButton]}>
  <FontAwesome name="share" size={18} color="#ffffff" style={styles.icon} />
  <Text style={styles.buttonText}>Share</Text>
  </TouchableOpacity>
</View>
        </View>
      </ScrollView>
    </SafeAreaView>
    );
  };
  
  
  export default RecipeDetailScreen; 



