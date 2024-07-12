// HomeStyles.js

import { StyleSheet } from "react-native";
import COLOURS from "../../Constants/Colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOURS.white,
    paddingTop: 25,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    fontSize: 18,
    color: "#660000",
    padding: 12,
    backgroundColor: "#f27d03",
    borderRadius: 10,
  },
  shopInfoContainer: {
    marginBottom: 10,
    padding: 16,
  },
  shopName: {
    fontSize: 26,
    color: COLOURS.black,
    fontWeight: "500",
    letterSpacing: 1,
    marginBottom: 10,
  },
  shopDescription: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: "400",
    letterSpacing: 1,
    lineHeight: 24,
  },
  seeAllText: {
    fontSize: 14,
    color: COLOURS.blue,
    fontWeight: "400",
  },
  productCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  accessoryContainer: {
    padding: 16,
  },
  accessoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accessoryTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  accessoryText: {
    fontSize: 18,
    color: COLOURS.black,
    fontWeight: "500",
    letterSpacing: 1,
  },
  accessoryCount: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: "400",
    opacity: 0.5,
    marginLeft: 10,
  },
  accessoryCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  darkText: {
    color: COLOURS.white,
  },
  lightText: {
    color: COLOURS.black,
  },
  randomRecipeButton: {
    marginTop: 0, // Adjust spacing as needed
    backgroundColor: COLOURS.backgroundMedium,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    alignSelf: "center", // Center the button within its container
  },
  randomRecipeButtonText: {
    // Text color that contrasts with the button background
    fontSize: 20,
    fontWeight: "700",
  },
});
