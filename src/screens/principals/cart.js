import React, {useState} from "react"
import {Image, Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {globalStyles} from "../../styles/global";
import {AntDesign} from "@expo/vector-icons";

const CartElements = [
    {
        name: 1
    },
    {
        name: 1
    },
]
const Cart = ({navigation})=>{
    return <View style={globalStyles.container}>
        <View style={{flex: 4}}>
            <FlatList
                data={CartElements}
                keyExtractor={(_, i)=> i}
                renderItem={()=>(
                    <CartCard  />
                )}
            />
        </View>
        <View style={{flex: 1,}}>
            <View style={{backgroundColor: "#ccc", height: 1, marginHorizontal: 10}}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginHorizontal: 10, marginVertical: 10}}>
                <Text>Total :</Text>
                <Text style={{fontFamily: "MontserratBold", fontSize: 25}}>5.50 €</Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
                <Text style={globalStyles.welcomeButtonLogin}>Valider</Text>
            </TouchableOpacity>
        </View>


    </View>
}
export default Cart

const CartCard = ()=>{
    const [itemCount, setItemCount] = useState(1)
    return <View style={styles.cardView}>
        <Image style={styles.image} source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg'  }}/>
        <View style={styles.description}>
            <Text style={styles.name}>Mini Pastilla poulet</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 24, }}>2.5 €</Text>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor:"coral",borderRadius: 8, alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=> setItemCount(itemCount -1)}>
                        <AntDesign name="minus" size={15} color="black" style={{paddingHorizontal: 5}}/>
                    </TouchableOpacity>
                    <Text style={{marginHorizontal: 5, fontSize: 24}}>{itemCount}</Text>
                    <TouchableOpacity onPress={()=> setItemCount(itemCount +1)}>
                        <AntDesign name="plus" size={15} color="black" style={{paddingHorizontal: 5}} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </View>
}


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