import React, {useEffect, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, Image} from "react-native";
import {globalStyles} from "../../styles/global";
import axios from "axios";
import {connect} from "react-redux";
import moment from "moment";
import "moment/locale/fr"
moment.locale("fr")

const tabs = [
    {
        name: "passées",
        status: "all"
    },
    {
        name: "En cours",
        status: "pending"
    }
]
const RenderItem = ({ticket})=>{
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get("order/get_order_products/"+ ticket +"/").then(res =>{
            setProducts(res.data)
        })
    },[ticket])
    return (
        <View style={{marginBottom: 10}}>
            {products.map((item, index)=>(
                <View key={index} style={[styles.row, {marginBottom: 10}]}>
                    <Image style={[styles.image, {flex: 1}]} source={{
                        uri: "https://khadija-backen.herokuapp.com" + item.default_image,
                    }
                    }/>
                    <View style={{flex: 3}}>
                        <Text style={{fontFamily: "MontserratRegular", padding: 5}}>{item.name}</Text>
                        <View style={[styles.row, {paddingBottom: 10}]}>
                            <Text style={{fontSize: 15, fontFamily: 'MontserratBold'}}>{item.price}</Text>
                            <Text>x{item.quantity}</Text>
                        </View>
                        <View style={{backgroundColor: "#ccc", height: 1, marginHorizontal: 5}}></View>
                    </View>
                </View>
            ))}
        </View>

    )

}

const History = (props)=>{
    const user = props.userInfo.id
    const [tabClick, setTabClick] = useState("all")

    const [order, setOrder ]= useState([])
    useEffect(()=>{
        axios.get("order/get_order/"+ user+"/").then(res =>{
            setOrder(res.data)
        })
    },[user])
    const statusFilter = (status)=>{
        setTabClick(status)
        axios.post("order/get_order/"+ user +"/", {status : status}).then(res =>{
            setOrder(res.data)
        })
    }

    return <View style={globalStyles.container}>
        <View style={styles.listTab}>
            {tabs.map((e, i)=>(
                <TouchableOpacity key={i} onPress={()=> statusFilter(e.status)}>
                    <Text  style={[styles.text, tabClick === e.status && styles.activeText]}>{e.name}</Text>
                </TouchableOpacity>
            ))}

        </View>
        <View style={{flex:1}}>
            {/*FlatList a mettre ici*/}
            <FlatList
                data={order}
                keyExtractor={(item, index)=> index}
                renderItem={({item})=>(
                <View style={styles.ticket}>
                    <View style={styles.row}>
                        {item.status ? <Text style={{fontSize: 20, marginVertical: 5, color : "green"}}>Commande Livrée</Text> : <Text style={{fontSize: 20, marginVertical: 5, color: 'blue'}}>En préparation</Text>}
                        <Text style={{fontSize: 24, fontFamily: 'MontserratBold'}}>{item.total_price}€</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>{moment(item.timestamp).calendar()}</Text>
                        {item.status ? <Text style={{color: 'green'}}>Payé avec succès</Text> : <Text style={{color: 'orange'}}>suivre la commande</Text>}
                    </View>
                    <View style={styles.row}>
                        <Text style={{padding: 5, backgroundColor: '#ccc', marginVertical: 3, borderRadius: 3}}>Commandes #{item.ticket}</Text>
                    </View>
                    <View style={{backgroundColor: "#ccc", height: 1, margin: 10, }}></View>

                    <RenderItem ticket={item.ticket}/>
                </View>
            )}/>
        </View>

    </View>
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(History)

const {width, height}=  Dimensions.get('screen')
const styles = StyleSheet.create({
    listTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text : {
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 12,
        marginHorizontal: 5,
        padding: 12,
        paddingHorizontal: width /8,
        fontFamily: 'MontserratBold',
        borderRadius: 10,
        textTransform: "uppercase",
        color: "black"
    },
    activeText :{
        backgroundColor: 'coral',
        borderColor: 'coral',
        color: "white",
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 10,
    },
    ticket:{
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        flex: 1,
        marginBottom : 20
    },
    image:{
        width: null,
        height: "100%",
        resizeMode: 'cover',
        margin :2,
        borderRadius: 5
    }
})