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


export const DrawerCustomContent = (props)=>{
    const {signOut} = React.useContext(Authcontext)
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: "row", marginTop: 10, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Avatar.Image
                            source={{
                                uri: "data:image/jpeg;base64,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",

                            }}
                            size={80}
                            />
                            <View style={{flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
                                <Caption style={styles.caption}>Bienvenue</Caption>
                                <Title style={styles.title}>Gyll-christ</Title>
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
                                <Text style={{fontSize: 14}}>Historiques</Text>
                                <MaterialIcons name="arrow-forward-ios" size={14}/>
                            </View>
                        )}
                            onPress={()=>{}}/>
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
                            onPress={()=>{}}/>
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
                    onPress={()=>{}}/>
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
        fontSize: 26,
        marginTop: 3,
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