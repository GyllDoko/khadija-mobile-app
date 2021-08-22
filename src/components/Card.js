import React from "react";
import {View, StyleSheet, TouchableOpacity, Image, Text} from "react-native";
import { AntDesign } from '@expo/vector-icons';
const Card=(props)=>{
    return (
        <TouchableOpacity style={styles.container} onPress={()=> props.navigation.push("Details", {data: props.item})}>
            <Image style={styles.imageStyle} source={{
                uri: 'https://khadija-backen.herokuapp.com' +props.image,
            }} />
            {/*<Image style={styles.imageStyle} source={require("../../assets/images/gateau.jpg")}/>*/}
            <View style={{flex:1, paddingHorizontal: 10}}>

                <Text style={styles.name} >{props.name}</Text>
                <View style={styles.price}>
                    <Text style={{fontFamily: "MontserratRegular", fontSize: 28}} >{props.price} €</Text>
                    <TouchableOpacity onPress={()=>{}}>
                        <AntDesign name="pluscircle" size={44} color="coral" />
                    </TouchableOpacity>

                </View>

            </View>

        </TouchableOpacity>
    )
}
export default Card
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:0,
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        height: 300,
        backgroundColor: 'aliceblue',

        shadowColor: '#ccc',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.7,
        shadowRadius:5,
        elevation: 9,
    },
    imageStyle: {
        flex: 2,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderRadius: 20
    },
    name: {
        fontSize: 20,
        fontFamily: "MontserratRegular"
    },
    price: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        fontFamily: "MontserratBold",
        justifyContent: "space-between"

    }
})