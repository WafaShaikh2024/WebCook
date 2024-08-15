import { StyleSheet } from "react-native";
import COLOURS from "../../Constants/Colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOURS.bgGreen,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  shopInfoContainer: {
    marginBottom: 10,
    padding: 12,
  },
  shopImage: {
    height: 90,
    width: 90,
    justifyContent: "center",
  },
  shopDescription: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: "400",
    letterSpacing: 1,
    lineHeight: 24,
  },
  productCategoryContainer: {
    padding: 16,
  },
  productCategoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productCategoryTitle: {
    flexDirection: "row",
    alignItems: "center",
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
  bgDark: {
    backgroundColor: COLOURS.white,
    color: COLOURS.black,
  },
  bgLight: {
    backgroundColor: COLOURS.black,
    color: COLOURS.white,
  },
});
