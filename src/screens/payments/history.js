import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, Image} from "react-native";
import {globalStyles} from "../../styles/global";

const tabs = [
    {
        name: "passées",
    },
    {
        name: "En cours",
    }
]
const RenderItem = ()=>{
    return <View style={styles.row}>
        <Image style={[styles.image, {flex: 1}]} source={{
        uri: "data:image/jpeg;base64,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"
        }
        } />
        <View style={{flex: 3}}>
            <Text style={{fontFamily: "MontserratRegular", padding: 5}}>Mini Pastilla Poisson</Text>
            <View style={[styles.row, {paddingBottom: 10}]}>
                <Text style={{fontSize: 15, fontFamily: 'MontserratBold'}}>2.15€</Text>
                <Text>x2</Text>
            </View>
            <View style={{backgroundColor: "#ccc", height: 1, marginHorizontal: 5}}></View>
        </View>
    </View>
}

const History = ({navigation})=>{
    const [tabClick, setTabClick] = useState("passées")
    const [commande, setCommande] = useState([])
    const statusFilter = (status)=>{
        setTabClick(status)
        setCommande([...commande.filter(e => e.status === tabClick)])
    }
    return <View style={globalStyles.container}>
        <View style={styles.listTab}>
            {tabs.map((e, i)=>(
                <TouchableOpacity onPress={()=> statusFilter(e.name)}>
                    <Text  style={[styles.text, tabClick === e.name && styles.activeText]}>{e.name}</Text>
                </TouchableOpacity>
            ))}

        </View>
        <View style={{flex:1}}>
            {/*FlatList a mettre ici*/}
            <View style={styles.ticket}>
                <View style={styles.row}>
                    <Text style={{fontSize: 20, marginVertical: 5}}>Commande Livrée</Text>
                    <Text style={{fontSize: 24, fontFamily: 'MontserratBold'}}>5.50€</Text>
                </View>
                <View style={styles.row}>
                    <Text>12/05/2021 18:45</Text>
                    <Text style={{color: 'green'}}>Payé avec succès</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{padding: 5, backgroundColor: '#ccc', marginVertical: 3, borderRadius: 3}}>Commandes #000012</Text>
                </View>
                <View style={{backgroundColor: "#ccc", height: 1, margin: 10, }}></View>
                {/*FlatList a mettre ici*/}
                    <RenderItem/>
            </View>

        </View>

    </View>
}
export default History
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