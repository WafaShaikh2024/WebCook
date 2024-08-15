import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ref, push } from 'firebase/database';
import { db } from '../../firebase'; // Update the path as necessary

const PostRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [measures, setMeasures] = useState("");
  const [instructions, setInstructions] = useState("");
  const [mealThumb, setMealThumb] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const postRecipe = async () => {
    try {
      const ingredientsArray = ingredients.split(",");
      const measuresArray = measures.split(",");
      const recipeData = {
        strMeal: recipeName,
        strCategory: category,
        strArea: cuisine,
        strInstructions: instructions,
        strMealThumb: mealThumb,
        strYoutube: youtubeLink,
        idMeal: (Math.random() * 100).toString(),
      };

      ingredientsArray.forEach((ingredient, index) => {
        recipeData[`strIngredient${index + 1}`] = ingredient.trim();
      });

      measuresArray.forEach((measure, index) => {
        recipeData[`strMeasure${index + 1}`] = measure.trim();
      });

      const dbRef = ref(db, "/");
      await push(dbRef, recipeData);

      console.log("Recipe posted successfully");
      // Optionally, reset form fields after successful post
      setRecipeName("");
      setCategory("");
      setCuisine("");
      setIngredients("");
      setMeasures("");
      setInstructions("");
      setMealThumb("");
      setYoutubeLink("");
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={recipeName}
        onChangeText={(text) => setRecipeName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cuisine"
        value={cuisine}
        onChangeText={(text) => setCuisine(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients (comma-separated)"
        multiline
        value={ingredients}
        onChangeText={(text) => setIngredients(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Measures (comma-separated)"
        multiline
        value={measures}
        onChangeText={(text) => setMeasures(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        multiline
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Meal Thumbnail URL"
        value={mealThumb}
        onChangeText={(text) => setMealThumb(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="YouTube Link"
        value={youtubeLink}
        onChangeText={(text) => setYoutubeLink(text)}
      />
      <TouchableOpacity style={styles.postButton} onPress={postRecipe}>
        <Text style={styles.buttonText}>Post Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PostRecipe;
