import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const PostRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const postRecipe = async () => {
    try {
      const formData = new FormData();
      formData.append("name", recipeName);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      if (image) {
        formData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "recipe_image.jpg",
        });
      }

      const response = await axios.post(
        "http://your-backend-url/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Recipe posted successfully:", response.data);
      // Optionally, reset form fields after successful post
      setRecipeName("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
  };

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
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
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <AntDesign name="upload" size={24} color="black" />
        <Text style={styles.uploadButtonText}>Add Recipe Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
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
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    marginLeft: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
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
