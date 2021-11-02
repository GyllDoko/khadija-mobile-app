import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import { globalStyles } from '../../styles/global'
import {Authcontext} from "../../../context";
import {Avatar} from "react-native-paper";
import {connect} from "react-redux";

const Tabs =[
    {
        name: "Mon compte"
    },
    {
        name: "Paiement"
    },
]
const Profile = (props) => {
    const [status, setStatus] = useState(Tabs[0].name)
    const StatusFilter = (new_status) => {
        setStatus(new_status)
    }
    return (
        <View style={globalStyles.container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Avatar.Image source={require('../../../assets/avatar.png')}
                              size={80}/>
                <Text style={{
                    fontFamily: 'MontserratBold',
                    fontSize: 20,
                    marginVertical: 10
                }}>{props.userInfo.user.last_name ? props.userInfo.user.last_name : "Utilisateur"} {props.userInfo.user.first_name}</Text>
                <Text style={{fontFamily: 'MontserratItalic', fontSize: 15}}>{props.userInfo.user.email}</Text>

            </View>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    {Tabs.map((e, index) => (
                        <TouchableOpacity key={index} onPress={() => StatusFilter(e.name)}>
                            <Text style={[styles.text, status === e.name && styles.activeText]}>{e.name}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
                {status === "Mon compte" && <View style={globalStyles.container}>
                    <View>
                        <View style={globalStyles.row}>
                            <Text style={{fontFamily: "MontserratLight", fontSize: 15}}>Nom et Prénoms : </Text>
                            <Text
                                style={{fontFamily: "MontserratBold"}}> {props.userInfo.user.last_name} {props.userInfo.user.first_name}</Text>
                        </View>
                        <View style={globalStyles.separator}></View>
                    </View>
                    <View>
                        <View style={globalStyles.row}>
                            <Text style={{fontFamily: "MontserratLight", fontSize: 15}}>Email : </Text>
                            <Text style={{fontFamily: "MontserratBold"}}> {props.userInfo.user.email} </Text>
                        </View>
                        <View style={globalStyles.separator}></View>
                    </View>
                    <View>
                        <View style={globalStyles.row}>
                            <Text style={{fontFamily: "MontserratLight", fontSize: 15}}>Téléphone: </Text>
                            <Text style={{fontFamily: "MontserratBold"}}> {props.userInfo.phone_number}</Text>
                        </View>
                        <View style={globalStyles.separator}></View>
                    </View>
                    <View>
                        <View style={globalStyles.row}>
                            <Text style={{fontFamily: "MontserratLight", fontSize: 15}}>Adresse: </Text>
                            <Text style={{fontFamily: "MontserratBold"}}>{props.userInfo.address}</Text>
                        </View>
                        <View style={globalStyles.separator}></View>
                    </View>

                </View>}
                {status === "Paiement" &&
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                    <Text style={{marginVertical: 20, fontFamily: "MontserratBold", fontSize: 18}}>Mes cartes</Text>
                    <TouchableOpacity style={{width: 125}}>
                        <Text style={styles.cardContainer}>+ Ajouter</Text>
                    </TouchableOpacity>
                </View>
                    }

            </View>
        </View>
    )
}
const mapStateToProps = state =>state
export default connect(mapStateToProps)(Profile)

const styles = StyleSheet.create({
    text:{
        paddingHorizontal: Dimensions.get('window').width /8,
        paddingBottom: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    activeText:{
        borderBottomColor: "coral",
    },
    cardContainer : {
        padding : 30,
        borderWidth : 1,
        borderStyle: "dashed",
        borderRadius: 10,

    }
})
