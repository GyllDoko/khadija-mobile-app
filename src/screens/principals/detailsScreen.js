import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Image, Dimensions, FlatList,Animated} from "react-native";
import MyCarousel from "../../components/Carousel";




const DetailsScreen = ({route, navigation})=>{
    const itemData = route.params.data
    return(
        <View>
        <MyCarousel navigation={navigation} item={itemData} />
        </View>
    )
}
export default DetailsScreen
const styles= StyleSheet.create({

})