import React from 'react';
import { Dimensions, StyleSheet, View, Text, Platform, Image } from 'react-native';
const statusBarHeight =
  Platform.OS === "android" ? StatusBar.currentHeight : 70;
const {height, width} = Dimensions.get('window');

export default function ProductDetailsScreen({navigation, route}) {
    const {item} = route.params;
    return (
        <View style={[styles.container, {backgroundColor: '#f5f5f5'}]}>
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
                    <Image />
                </View>
                <View style={styles.variants}></View>
                <View style={styles.descriptionContainer}></View>
                <View style={{}}></View>
                <View style={{}}></View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: statusBarHeight
    },
    topContainer: {
        height: height/3,
        padding: 16,
        justifyContent: 'space-between'
    },
    bottomContainer: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 100
    },
    bigText: {
        fontSize: 28,
        fontWeight: 'bold',

    },
    smallText: {},
})