import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
const statusBarHeight =
  Platform.OS === "android" ? StatusBar.currentHeight : 70;
const { height, width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import CartUncative from "../../../assets/icons/cart_unactive.svg";

const colors = ["orange", "gray", "purple", "black"];

const ColorsSelector = () => {
  const [selected, setSelected] = useState(0);

  return (
    <View>
      <Text>Colors</Text>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {colors.map((_, i) => (
          <View
            key={i}
            style={[
              styles.outerCircle,
              { borderColor: selected == i ? _ : "transparent" },
            ]}
          >
            <TouchableOpacity
              onPress={() => setSelected(i)}
              style={[styles.colorBtn, { backgroundColor: _ }]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <View style={styles.quantity}>
      <TouchableOpacity
        style={styles.qtBtn}
        onPress={() =>
          setQuantity((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else {
              return prev;
            }
          })
        }
      >
        <Ionicons name="remove" />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity
        style={styles.qtBtn}
        onPress={() => setQuantity((prev) => prev + 1)}
      >
        <Ionicons name="add" />
      </TouchableOpacity>
    </View>
  );
};

const SizeSelector = () => {
  return (
    <View>
      <Text>Size</Text>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
        12 cm
      </Text>
    </View>
  );
};

export default function ProductDetailsScreen({ navigation, route }) {
  const { item } = route.params;
  return (
    <>
    <SafeAreaView style={[styles.container, { backgroundColor: "#f5f5f5" }]}>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.smallText}>{item.subtitle}</Text>
          <Text style={styles.bigText}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.smallText}>Price</Text>
          <Text style={styles.bigText}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.variants}>
          <ColorsSelector />
          <View style={{ width: 70 }}></View>
          <SizeSelector />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>
            Description
          </Text>
          <Text>{item.description}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Quantity />
          <TouchableOpacity style={styles.favoriteBtn}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.cartBtn}>
            <CartUncative width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "black" }]}>
            <Text style={styles.btnText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    <SafeAreaView style={{ backgroundColor: 'white' }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  topContainer: {
    height: height / 3,
    padding: 16,
    justifyContent: "space-between",
  },
  bottomContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 100,
  },
  bigText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  smallText: {},
  image: {
    width: width / 1.5,
    height: height / 3,
  },
  imageContainer: {
    position: "absolute",
    zIndex: 10,
    top: -200,
    alignSelf: "flex-end",
    padding: 10,
  },
  colorBtn: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  outerCircle: {
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  variants: {
    flexDirection: "row",
    marginVertical: 20,
    // justifyContent: 'space-between',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  qtBtn: {
    borderWidth: 1,
    borderColor: "darkGray",
    borderRadius: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  favoriteBtn: {
    borderRadius: 17,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBtn: {
    borderRadius: 10,
    width: 50,
    height: 45,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  btn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
