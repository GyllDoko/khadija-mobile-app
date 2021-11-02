import React from 'react'
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Authcontext} from "../../context";
import {connect} from "react-redux";
import {store} from "../../store/store";


 export  const DrawerCustomContent = (props)=>{

     const state = store.getState()

    const first_name = state.userInfo.user ? state.userInfo.user.first_name.split(' ') : "Utilisateur"
    const {signOut} = React.useContext(Authcontext)
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: "row", marginTop: 10, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Avatar.Image
                            source={require("../../assets/avatar.png")}
                            size={80}
                            />
                            <View style={{flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
                                <Caption style={styles.caption}>Bienvenue</Caption>
                                <Title style={styles.title}>{first_name[first_name.length -1]}</Title>
                            </View>
                            <TouchableOpacity onPress={()=> signOut()}>
                                <MaterialCommunityIcons name="exit-to-app" size={24} color={"red"} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <Drawer.Section style={[styles.drawerSection, {marginTop: 60}]}>
                        <DrawerItem
                            icon={({color, size})=>(
                                <MaterialCommunityIcons
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={()=>(
                                <View style={{flex:1 ,flexDirection: "row",alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 16}}>Accueil</Text>
                                    <MaterialIcons name="arrow-forward-ios" size={14}/>
                                </View>
                            )}
                            onPress={()=>{props.navigation.navigate('HomeTab')}}/>
                        <DrawerItem
                            icon={({color, size})=>(
                                <Ionicons
                                    name="person-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={()=>(
                                <View style={{flex:1 ,flexDirection: "row",alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 16}}>Profile</Text>
                                    <MaterialIcons name="arrow-forward-ios" size={14}/>
                                </View>
                            )}
                            onPress={()=>{props.navigation.navigate('Profile')}}/>
                        <DrawerItem
                            icon={({color, size})=>(
                                <MaterialCommunityIcons
                                    name="truck-delivery-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={()=>(
                            <View style={{flex:1 ,flexDirection: "row",alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 16}}>Historiques</Text>
                                <MaterialIcons name="arrow-forward-ios" size={14}/>
                            </View>
                        )}
                            onPress={()=>{props.navigation.navigate('History')}}/>
                        <DrawerItem
                            icon={({color, size})=>(
                                <Ionicons
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={()=>(
                                <View style={{flex:1 ,flexDirection: "row",alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 16}}>Paramètres</Text>
                                    <MaterialIcons name="arrow-forward-ios" size={14}/>
                                </View>
                            )}
                            onPress={()=>{props.navigation.navigate('Settings')}}/>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size})=>(
                        <MaterialCommunityIcons
                            name="exit-to-app"
                            color={color}
                            size={size}
                            />
                    )}
                    label="Déconnexion"
                    onPress={()=>{signOut()}}/>
            </Drawer.Section>
        </View>
    )
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 10,
    },
    title:{
        fontSize: 18,
        marginTop: 2,
        fontWeight: 'bold',
    },
    caption:{
        fontSize:16,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center',
    },
    section: {
        flexDirection: "row",
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection:{
        marginTop: 15,
    },
    bottomDrawerSection : {
        borderTopColor: 'coral',
        borderTopWidth: 2,
        borderBottomColor: "white",

    },
    preferences : {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16
    },
})