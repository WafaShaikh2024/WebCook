import Header from "./src/Components/Header";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Screens/Home/Home";
import RecipeDetailScreen from "./src/Screens/RecpieDetailScreen/RecpieDetailScreen";
import SearchRecipe from "./src/Screens/SearchScreen/SearchRecipe";
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import * as Notifications from 'expo-notifications';
import PostRecipe from "./src/Screens/PostRecipe";
import NotificationScreen from "./src/Screens/NotificationScreen/NotificationScreen";
import FavouriteScreen from "./src/Screens/FavouriteScreen/FavouriteScreen";
// import firebase from './firebase'
export default function App() {
  const [recipes, setRecipes] = useState([]);
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
      // const response = await axios.get(
      //   "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
      // );
      // setRecipes(response.data.meals);
      const recipesRef = ref(db, '/');
    const unsubscribe = onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
     let d=Object.values(data)
     for (const i in d) {
     d[i].key=Object.keys(data)[i]
     }
      console.log(d);

      setRecipes(d);
      
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log("change it");
  };

  const Stack = createStackNavigator();

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
        <Stack.Screen name="FavouriteScreen">
          {(props) => (


            <FavouriteScreen
              {...props}
              prd={recipes.filter(i=>i.isFavourite)}
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
        <Stack.Screen name="NotificationScreen">
          {(props) => (
            <NotificationScreen {...props} isDarkTheme={isDarkTheme} />
          )}
        </Stack.Screen>

        <Stack.Screen name="SearchRecipe" component={SearchRecipe} />
        <Stack.Screen name="PostRecipe" component={PostRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
