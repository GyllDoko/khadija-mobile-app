import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {connect} from "react-redux";

const CartCard = (props)=>{
    console.log(props.cart)
    const [itemCount, setItemCount] = useState(props.item.quantity)
    useEffect(()=>{
        setItemCount(
            props.item.quantity
        )
    },[props.item.quantity])
    useEffect(()=>{
        let action = {
            type: 'UPDATE_QUANTITY',
            value: {
                item : props.item,
                quantity : itemCount
            },
        }
        props.dispatch(action)
    },[itemCount])
    const decrement =()=>{
        if(itemCount > 1){
            setItemCount(itemCount -1)
        }
    }
    const increment = ()=>{
        setItemCount(itemCount + 1)
    }
    return( <View style={styles.cardView}>
        <Image style={styles.image} source={{
            uri: 'https://khadija-backen.herokuapp.com'+ props.item.default_image  }}/>
        <View style={styles.description}>
            <Text style={styles.name}>{props.item.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 24, }}>{props.item.price} €</Text>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor:"coral",borderRadius: 8, alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=> decrement()}>
                        <AntDesign name="minus" size={15} color="black" style={{paddingHorizontal: 5}}/>
                    </TouchableOpacity>
                    <Text style={{marginHorizontal: 5, fontSize: 24}}>{itemCount}</Text>
                    <TouchableOpacity onPress={()=> increment()}>
                        <AntDesign name="plus" size={15} color="black" style={{paddingHorizontal: 5}} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </View>)
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(CartCard)
const styles = StyleSheet.create({
    image:{
        flex: 2,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 10,

    },
    description: {
        flex:3,
        padding: 10,
        justifyContent: "space-between"
    },
    cardView: {
        marginBottom: 10,
        height: 100,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius:10,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    name: {
        fontSize: 20,
        fontFamily: "MontserratRegular",
    }
})