// import React from 'react'
// import { View, Text, Image, TouchableOpacity } from 'react-native'
// import { globalStyles } from '../../styles/global'
// import {NavigationContainer} from "@react-navigation/native";
// import {createDrawerNavigator} from "@react-navigation/drawer";
// import Profile from "../auth/profile";
// import HomeScreen from "./HomeScreen";
// import {createStackNavigator} from "@react-navigation/stack";
// import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
// import DetailsScreen from "./detailsScreen";
//
// const Drawer = createDrawerNavigator()
// const HomeStack = createStackNavigator()
// const ProfileStack = createStackNavigator()
//
// const HomeStackScreen = ({navigation})=>(
//         <HomeStack.Navigator>
//             <HomeStack.Screen name='Accueil' component={HomeScreen} options={{
//                 headerStyle :{
//                   elevation: 0
//                 },
//                 headerLeft: ()=>(
//                     <MaterialCommunityIcons style={{marginHorizontal: 20}} name="sort-variant" size={24} color="black" onPress={()=>{
//                         navigation.openDrawer()
//                     }} />
//                 )
//             }}/>
//             <HomeStack.Screen name="Details" component={DetailsScreen}/>
//         </HomeStack.Navigator>
//     )
// const Welcome = ({ navigation }) => {
//     return (
//        <NavigationContainer>
//            <Drawer.Navigator initialRouteName="Accueil" screenOptions={{
//
//            }}
//            >
//                <Drawer.Screen name="Accueil" component={HomeStackScreen} options={{
//                    title: '',
//                    headerShown: false,
//                    headerStyle: {
//                        elevation: 0,
//                    }
//                }} />
//                <Drawer.Screen name="Profile" component={Profile} />
//            </Drawer.Navigator>
//
//        </NavigationContainer>
//     )
// }
//
// export default Welcome
