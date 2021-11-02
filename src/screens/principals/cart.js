import React, {useEffect, useState} from "react"
import {Image, Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {globalStyles} from "../../styles/global";
import {AntDesign} from "@expo/vector-icons";
import {connect} from "react-redux";
import CartCard from  '../../components/cartCart'
import axios from "axios";

const Cart = (props)=>{
    const [cartTab, setCartTab] =useState([])
    let totPrice = 0.0
    for (let i of cartTab){
        totPrice += parseFloat(i.price) * i.quantity
    }
   useEffect(()=>{
       setCartTab(props.cart)
   },[props.cart])
    const getQuantity = (val) => {
      const indexOfProd = props.cart.findIndex(product => product.id === val.id)
        return props.cart[indexOfProd].quantity
    }
    const sendOrder = () => {
        let data = {
            products : props.cart,
            total_price  : totPrice.toFixed(2),
            user: props.userInfo,
        }
        axios.post("order/save_order/", data).then(res => {
            console.log(res.data)
        })
    }

    return <View style={globalStyles.container}>
        <View style={{flex: 4}}>
            <FlatList
                data={cartTab}
                // extraData={props.cart}
                keyExtractor={(_, i)=> i}
                renderItem={({item})=>(
                    <CartCard  item={item} quantity={getQuantity(item)} />
                )}
            />
        </View>
        <View style={{flex: 1,}}>
            <View style={{backgroundColor: "#ccc", height: 1, marginHorizontal: 10}}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginHorizontal: 10, marginVertical: 10}}>
                <Text>Total :</Text>
                <Text style={{fontFamily: "MontserratBold", fontSize: 25}}>{totPrice.toFixed(2)} €</Text>
            </View>
            <TouchableOpacity onPress={() => sendOrder()}>
                <Text style={globalStyles.welcomeButtonLogin}>Valider</Text>
            </TouchableOpacity>
        </View>


    </View>
}
const mapStateToProps = state => {
    return {
        cart: state.cart,
        userInfo: state.userInfo,
    }
}
export default connect(mapStateToProps)(Cart)

