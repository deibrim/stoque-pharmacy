import { Dimensions, StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cxlxrs.white,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 20,
    minHeight: 80,
    backgroundColor: cxlxrs.white,
    justifyContent: "space-between",
  },
  routeTitle: {
    color: cxlxrs.black,
    fontSize: 14,
    letterSpacing: 1,
  },
  overview: {
    backgroundColor: cxlxrs.white,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingTop: 0,
  },
  overviewMainTextsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  overviewMainTextLabel: {
    fontSize: 12,
    color: cxlxrs.textColor,
    marginBottom: 2,
    fontFamily: FontFamily.FiraBold,
    textAlign: "center",
  },
  overviewMainTextBold: {
    color: cxlxrs.black,
    fontSize: 25,
    fontFamily: FontFamily.FiraSemiBold,
    textAlign: "center",
  },
  navButtons: {
    flexDirection: "row",
    marginTop: "auto",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  navBtn: {
    height: 35,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: Dimensions.get("screen").width / 3 - 20,
    elevation: 0,
    backgroundColor: cxlxrs.white,
  },
  navBtnText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 11,
    color: cxlxrs.textColor,
  },
  noData: {
    alignItems: "center",
    minHeight: 100,
    marginVertical: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 13,
    color: "#97989A",
    marginVertical: 20,
    fontFamily: "FiraCode-Regular",
    letterSpacing: 0.5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
  },
  button: {
    flexDirection: "row",
    backgroundColor: cxlxrs.black,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
