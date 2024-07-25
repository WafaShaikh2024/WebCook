import Header from "./src/Components/Header";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Screens/Home/Home";
import RecipeDetailScreen from "./src/Screens/RecpieDetailScreen/RecpieDetailScreen";
import SearchRecipe from "./src/Screens/SearchScreen/SearchRecipe";
import * as Notifications from "expo-notifications";
import NotificationScreen from "./src/Screens/NotificationScreen/NotificationScreen";
import Settings from "./src/Screens/Settings";
import PostRecipe from "./src/Screens/PostRecipe";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

export default function App() {
  const [recipes, setRecipe] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received: ", notification);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Tap response: ", response);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
      );
      setRecipe(response.data.meals);

      console.log(recipes);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log("change it");
  };

  const Stack = createStackNavigator();

  const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch("http://localhost:8000")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }, []);

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {data ? <Text>{data.message}</Text> : <Text>Loading...</Text>}
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true, header: () => <Header /> }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              prd={recipes}
              toggleTheme={toggleTheme}
              isDarkTheme={isDarkTheme}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RecpieDetailScreen">
          {(props) => (
            <RecipeDetailScreen {...props} isDarkTheme={isDarkTheme} />
          )}
        </Stack.Screen>

        <Stack.Screen name="SearchRecipe" component={SearchRecipe} />
        <Stack.Screen name="PostRecipe" component={PostRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
