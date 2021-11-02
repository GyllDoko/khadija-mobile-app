import React, {useEffect, useRef, useState} from 'react';
import {
    Image,
    FlatList,
    View,
    StatusBar,
    Dimensions,
    StyleSheet,
    Text,
    Animated,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import BottomSheet from "react-native-gesture-bottom-sheet";
import {AntDesign} from "@expo/vector-icons";
import {globalStyles} from "../styles/global";
import axios from "axios";
import {connect} from "react-redux";
const {width, height} = Dimensions.get('window');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .75;
const DOT_SIZE= 8
const DOT_SPACING= 8
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING

const images = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wedding_cake_with_pillar_supports%2C_2009.jpg/1200px-Wedding_cake_with_pillar_supports%2C_2009.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLU3aJEtxW9cnTkmDF0OGlbi1ajimMqKjjKZ2qa90WfgN5dpDtZG3I6uQYC5BPh1AlgsU&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-lto3ppzFmS_S8whe_BJB_r2RJRFTp1RieUmKqcPlSktG_opwMwwrpX3zB70twwm4a8&usqp=CAU'
];

const product = {
    title: 'Gateau de mariage',
    description: [
        'le plus glamour de tous les dessert',
        'Chic décoration pour les mariages',
        'Taille : 50 cm',
    ],
    price: '25.000 FCFA'
}

const MyCarousel = (props) => {
    const [itemCount, setItemCount] = useState(1)
    const [images, setImages] = useState([])
    const [imagesLoad, setImagesLoad] = useState(false)
    const [descriptions, setDescriptions] = useState([])
    const bottomSheet = useRef();
    const  scrollY = React.useRef(new Animated.Value(0)).current
    useEffect(()=>{
        axios.get("product/descriptions/"+props.item.name).then(res =>{
            setDescriptions(res.data)
        })
        if (imagesLoad == false){
            axios.get("product/images/"+props.item.name).then(res =>{
                setImages(res.data)
            })
            setImagesLoad(true)
        }
    },[])
    const decrement =()=>{
        if(itemCount > 1){
            setItemCount(itemCount -1)
        }
    }
    const increment = ()=>{
        setItemCount(itemCount + 1)
    }
    const addProductToCard = ()=>{
        let val = {
            ...props.item,
            quantity: itemCount
        }
        let action = {
            type: "UPDATE_CART",
            value: val,
        }
        props.dispatch(action)
        props.navigation.navigate("Home")
    }
    return (
        <View >
            <View style={{height: ITEM_HEIGHT, overflow: 'hidden' }}>
                <Animated.FlatList
                    data={images}
                    keyExtractor={(_, index)=> index.toString()}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate='fast'
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true}
                    )}
                    renderItem={({item})=>(
                        <View>
                            <Image source={{uri: 'https://khadija-backen.herokuapp.com' +item.url}} style={styles.image}/>
                        </View>
                    )}
                />
                <View style={styles.pagination}>
                    {images.map((_, index)=> {
                        return <View key={index} style={styles.dot} />
                    })}
                    <Animated.View style={[styles.dotIndicator, {
                        transform: [{
                            translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                                inputRange: [0,1],
                                outputRange: [0, DOT_INDICATOR_SIZE]
                            })
                        }]
                    }]}/>
                </View>
            </View>

            <BottomSheet hasDraggableIcon ref={bottomSheet}  height={400} >
                <View
                    contentContainerStyle={{ justifyContent: "center"}}
                    scrollEventThrottle={1}
                >
                    <Text style={{fontFamily: "MontserratBold", fontSize:20, textAlign: "center", marginTop: 20}}>{props.item.name}</Text>
                    <View style={{flexDirection: 'row', justifyContent: "space-around", alignItems:"center"}} >
                        <View style={{flexDirection: 'row', borderWidth: 1, borderColor:"#ccc", padding: 3,borderRadius: 8, alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=> decrement()}>
                                <AntDesign name="minus" size={24} color="coral" style={{paddingRight: 5}}/>
                            </TouchableOpacity>
                            <Text style={{marginHorizontal: 5, fontSize: 24}}>{itemCount}</Text>
                            <TouchableOpacity onPress={()=> increment()}>
                                <AntDesign name="plus" size={24} color="coral" style={{paddingLeft: 5}} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{margin: 20, fontSize: 20}}>{props.item.price}</Text>
                    </View>

                    {descriptions.map((item, index)=>(
                        <Text style={{marginHorizontal: 20, fontFamily: "MontserratRegular", paddingVertical: 5}} key={index}>{props.item.name}: {props.item.value}</Text>
                    ))}
                    <TouchableOpacity onPress={() => addProductToCard()}>
                        <Text style={globalStyles.welcomeButtonLogin}>Ajouter au panier</Text>
                    </TouchableOpacity>

                </View>
            </BottomSheet>
          <View style={styles.container}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => bottomSheet.current.show()}
              ><Text style={styles.text}>Voir la description</Text>
              </TouchableOpacity>
          </View>


    </View>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(MyCarousel)
const styles = StyleSheet.create({
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
    },
    pagination: {
        position: 'absolute',
        top: ITEM_HEIGHT / 2,
        left: 20
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: "coral",
        marginBottom: DOT_SPACING,
    },
    dotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE,
        borderWidth: 1,
        borderColor: '#333',
        position: 'absolute',
        top: -DOT_SIZE /2,
        left: -DOT_SIZE /2
    },
    button: {
        height: 50,
        width: 150,
        backgroundColor: "coral",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.7,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        elevation: 6,
    },
    text: {
        color: "white",
        fontWeight: "600",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})