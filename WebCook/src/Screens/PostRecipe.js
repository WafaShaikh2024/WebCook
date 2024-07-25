import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import axios from "axios";

const PostRecipe = ({ navigation }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [message, setMessage] = useState("");

  const postRecipe = async () => {
    try {
      const response = await axios.post(
        "http://localhost/Capstone/WebCook/WebCook/backend/recipes_db.php",
        {
          name: recipeName,
          ingredients: ingredients,
          instructions: instructions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message || "Recipe posted successfully");
      setRecipeName("");
      setIngredients("");
      setInstructions("");
    } catch (error) {
      setMessage("Failed to post recipe");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={(text) => setRecipeName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        multiline
        value={ingredients}
        onChangeText={(text) => setIngredients(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        multiline
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
      />
      <TouchableOpacity style={styles.postButton} onPress={postRecipe}>
        <Text style={styles.buttonText}>Post Recipe</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
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
