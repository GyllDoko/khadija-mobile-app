import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext, useMemo} from 'react';
import  AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./src/screens/principals/HomeScreen";
import Profile from "./src/screens/auth/profile";

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import DetailsScreen from "./src/screens/principals/detailsScreen";
import Home from "./src/screens/principals/home";
import {Text, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";
import Login from "./src/screens/auth/signIn";
import Register from "./src/screens/auth/signUp";
import {Authcontext} from "./context";
import OnboardingScreen from "./src/screens/onboardScreen/onboardingScreen";
import {DrawerCustomContent} from "./src/components/DrawerContent";
import History from "./src/screens/payments/history";
import Cart from "./src/screens/principals/cart";
import {Provider} from "react-redux";
import {Store} from "./Store";
import axios from "axios";


axios.defaults.baseURL ="https://khadija-backen.herokuapp.com/"

const HomeStack =createStackNavigator()
const ProfileStack = createStackNavigator()
const HistoryStack =createStackNavigator()
const CartStack =createStackNavigator()
const Tabs = createBottomTabNavigator()
const AuthStack = createStackNavigator()
const Drawer =createDrawerNavigator()

const HomeStackScreen = ({navigation})=>(
    <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
        headerStyle: {
            elevation: 0,
        },
    }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
          // headerShown: false,
          headerStyle: {
              elevation: 0,
          },
          headerLeft: () => (
              <TouchableOpacity
                 onPress={()=>navigation.toggleDrawer()}
              >
                  <MaterialCommunityIcons name="sort-variant" size={24} color="coral" style={{paddingLeft: 10}}/>
              </TouchableOpacity>
          ),
          headerRight: ()=>(
              <Ionicons style={{marginHorizontal: 20}} name="ios-search" size={24} color="black" onPress={()=>{

              }} />
          )
      }}/>
      <HomeStack.Screen
          name="Details"
          component={DetailsScreen}
          options={({route})=>({
        title: route.params.data.name,
          headerLeft: () => (
              <TouchableOpacity
                  onPress={()=>navigation.goBack()}
              >
                  <Ionicons name="chevron-back-outline" size={24} color="black" style={{padding: 5}} />
              </TouchableOpacity>
          ),
      })}/>
    </HomeStack.Navigator>
)
const ProfileStackScreen = ({navigation})=>(
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
        elevation: 0,
    },
        headerLeft: () => (
        <TouchableOpacity
        onPress={()=>navigation.toggleDrawer()}
        >
        <MaterialCommunityIcons name="sort-variant" size={24} color="coral" style={{paddingLeft: 10}}/>
        </TouchableOpacity>
        ),

        headerRight: () => (
            <TouchableOpacity
                onPress={()=>navigation.toggleDrawer()}
            >
                <Ionicons name="settings-outline" size={24} color="black" style={{paddingRight: 10}}/>
            </TouchableOpacity>
        ),

    }}>
      <ProfileStack.Screen name="Profile" component={Profile}/>
    </ProfileStack.Navigator>
)
const HistoryStackScreen = ({navigation})=>(
    <HistoryStack.Navigator screenOptions={{
        title: "Commandes",
        headerStyle: {
            elevation: 0,
        },
        headerLeft: () => (
            <TouchableOpacity
                onPress={()=>navigation.toggleDrawer()}
            >
                <MaterialCommunityIcons name="sort-variant" size={24} color="coral" style={{paddingLeft: 10}}/>
            </TouchableOpacity>
        ),
        headerRight: ()=>(
            <Ionicons style={{marginHorizontal: 20}} name="ios-search" size={24} color="black" onPress={()=>{

            }} />
        )

    }}>
        <HistoryStack.Screen name="History" component={History}/>
    </HistoryStack.Navigator>
)
const CartStackScreen = ({navigation})=>(
    <CartStack.Navigator screenOptions={{
        headerStyle: {
            elevation: 0,
        },
        headerLeft: () => (
            <TouchableOpacity
                onPress={()=>navigation.toggleDrawer()}
            >
                <MaterialCommunityIcons name="sort-variant" size={24} color="coral" style={{paddingLeft: 10}}/>
            </TouchableOpacity>
        ),
        headerRight: ()=>(
            <Ionicons style={{marginHorizontal: 20}} name="ios-search" size={24} color="black" onPress={()=>{

            }} />
        )

    }}>
        <CartStack.Screen name="Cart" component={Cart} options={{
            title: 'Votre Panier',
        }}/>
    </CartStack.Navigator>
)

const TabsScreen= ()=>(
    <Tabs.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
            tabBarActiveTintColor: 'coral',
            tabBarStyle: {
                paddingBottom: 5,
                height: 55,
            },

        }}
    >
        <Tabs.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Accueil',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),

        }} />
        <Tabs.Screen name="Profile" component={ProfileStackScreen}  options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
            ),
        }} />
        <Tabs.Screen
            name="History"
            component={HistoryStackScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Commandes',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="reorder-horizontal" color={color} size={size} />
                ),
            }} />
        <Tabs.Screen
            name="Cart"
            component={CartStackScreen}
            options={{

                headerShown: false,
                tabBarLabel: 'Panier',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cart" color={color} size={size} />
                ),
            }} />
    </Tabs.Navigator>
)



const getFonts = () =>{
  return Font.loadAsync({
    // Load a font `Montserrat` from a static resource
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratItalic: require('./assets/fonts/Montserrat-Light.ttf'),
})}
export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false)
    const [isFirstLauch, setIsFirstLauch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const authContext = useMemo(()=>{
        return {
            signIn: ()=>{
                setIsLoading(false)
                setUserToken('logged')
            },
            signUp: ()=>{
                setIsLoading(false)
                setUserToken('logged')
            },
            signOut: ()=>{
                setIsLoading(false)
                setUserToken(null)
            },
        }
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    }, [])

  useEffect(() => {
    AsyncStorage.getItem("AlreadyLauch").then(value => {
      if (value == null) {
        AsyncStorage.setItem("AlreadyLauch", 'true')
        setIsFirstLauch(true)
      }else{
        setIsFirstLauch(false)
      }
    })
  }, [])



  if (isFirstLauch ==null) {
    return null
  }
  else if (isFirstLauch == true) {
    if (fontLoaded) {
     return (
         <Provider store={Store}>
             <Authcontext.Provider value={authContext}>
                 <NavigationContainer>

                     {userToken ?
                         (<Drawer.Navigator drawerContent={props => <DrawerCustomContent {...props} />} >
                             <Drawer.Screen name="HomeDrawer" component={TabsScreen} options={{
                                 headerShown: false
                             }}/>
                         </Drawer.Navigator>)
                         :
                         (
                             <AuthStack.Navigator>
                                 <AuthStack.Screen name="Onboard" component={OnboardingScreen} options={{
                                     headerShown: false ,
                                 }} />
                                 <AuthStack.Screen name="Welcome" component={Home} options={{
                                     headerShown: false ,
                                 }}/>
                                 <AuthStack.Screen name="Login" component={Login} options={{
                                     title: "",
                                     headerStyle: {
                                         elevation: 0,
                                         shadowOpacity: 0,
                                     },

                                 }}/>
                                 <AuthStack.Screen name="Register" component={Register} options={{
                                     title: "",
                                     headerStyle: {
                                         elevation: 0,
                                         shadowOpacity: 0,
                                     },
                                     headerLeft: ({...props}) => (
                                         <TouchableOpacity
                                             {...props}
                                         >
                                             <AntDesign name="left" size={24} color="coral" style={{paddingLeft: 10}}/>
                                         </TouchableOpacity>
                                     ),
                                 }}/>
                             </AuthStack.Navigator>
                         )
                     }


                 </NavigationContainer>
             </Authcontext.Provider>
         </Provider>
        )
  }
  else{
    return (
      <AppLoading
      startAsync={getFonts}
      onFinish={()=> setFontLoaded(true)}
      onError={console.warn}/>
    )
  }
  }
  else{
      if (fontLoaded) {
          if (isLoading){
              return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                  <Text>Chargement...</Text>
              </View>
          }
    return (
        <Provider store={Store}>
        <Authcontext.Provider value={authContext}>
              <NavigationContainer>

                  {userToken ?
                      (<Drawer.Navigator drawerContent={props => <DrawerCustomContent {...props} />}>
                          <Drawer.Screen name="HomeScreen" component={TabsScreen} options={{
                              headerShown: false
                          }}/>
                      </Drawer.Navigator>)
                  :
                      (
                          <AuthStack.Navigator>
                              <AuthStack.Screen name="Welcome" component={Home} options={{
                                  headerShown: false ,
                              }}/>
                              <AuthStack.Screen name="Login" component={Login} options={{
                                  title: "",
                                  headerStyle: {
                                      elevation: 0,
                                      shadowOpacity: 0,
                                  },
                                  headerLeft: ({...props}) => (
                                      <TouchableOpacity
                                          {...props}
                                      >
                                          <AntDesign name="left" size={24} color="coral" style={{paddingLeft: 10}}/>
                                      </TouchableOpacity>
                                  ),
                              }}/>
                              <AuthStack.Screen name="Register" component={Register} options={{
                                  title: "",
                                  headerStyle: {
                                      elevation: 0,
                                      shadowOpacity: 0,
                                  },
                                  headerLeft: ({...props}) => (
                                      <TouchableOpacity
                                          {...props}
                                      >
                                          <AntDesign name="left" size={24} color="coral" style={{paddingLeft: 10}}/>
                                      </TouchableOpacity>
                                  ),
                              }}/>
                          </AuthStack.Navigator>
                      )
                  }


              </NavigationContainer>
        </Authcontext.Provider>
        </Provider>
    )
  }
    else{
      return (
       <AppLoading
            startAsync={getFonts}
            onFinish={()=> setFontLoaded(true)}
            onError={console.warn}/>
          )
        }
  }

}
