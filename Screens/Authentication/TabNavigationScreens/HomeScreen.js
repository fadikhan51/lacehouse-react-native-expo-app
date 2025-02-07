import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { bagsList } from "../../../Constants/dummyProducts";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const statusBarHeight =
  Platform.OS === "android" ? StatusBar.currentHeight : 80;

const ListItem = ({ item, navigation }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity 
      onPress={() => {
        navigation.navigate("ProductDetails", { item });
      }}
      style={styles.imageContainer}>
        <Image style={styles.image} source={item.image} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: "darkgray" }]}>{item.title}</Text>
        <Text style={styles.text}>{item.price}</Text>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.subtitle}>Your own LaceHouse</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="gray"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="gray"
            />
          </View>
          <Ionicons
            name="filter"
            size={24}
            color="black"
            style={styles.filterIcon}
          />
        </View>
      </View>
      <FlatList
        data={bagsList}
        numColumns={2}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item }) => (
          <ListItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: statusBarHeight,
  },
  header: {
    marginLeft: 16,
    marginRight: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
  },
  filterIcon: {
    marginLeft: 12,
  },
  item: {
    width: width / 2 - 24,
    marginLeft: 16,
    marginBottom: 16,
  },
  imageContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
  },
  image: {
    height: 140,
    width: 140,
    resizeMode: "center",
  },
  textContainer: {
    marginVertical: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    paddingBottom: 16,
  },
});

export default HomeScreen;
