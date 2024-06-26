import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    marginTop: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: -30,
  },
  playButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 200,
    justifyContent: "center",
    marginTop: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playButtonText: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  navContainer: {
    flexDirection: "row",
    marginTop: 50,
  },
  navIcon: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  navImage: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: 300,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  slider: {
    width: "80%",
    marginTop: 20,
  },
});

export default styles;
