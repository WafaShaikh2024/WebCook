import { StyleSheet } from "react-native";
import COLOURS from "../../Constants/Colors";

export default StyleSheet.create({
  container: {
    width: "48%",
    marginVertical: 14,
  },
  imageContainer: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: COLOURS.backgroundLight,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 100,
  },
  productName: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
  },
  productPrice: {
    fontSize: 12,
  },

  detailCartButtonContainer: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  detailCartButton: {
    width: "86%",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOURS.maroon,
  },
  detailCartButtonText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    color: COLOURS.yellow,
    textTransform: "uppercase",
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
    backgroundColor: "transparent",
    color: COLOURS.black,
  },
});
