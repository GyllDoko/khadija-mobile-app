import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import { globalStyles } from '../../styles/global'
import Card from "../../components/Card";
import axios from "axios";
import {connect} from "react-redux";



const HomeScreen = (props) => {
    const [categories, setCategories] = useState([])
    const [initialCategory, setInitialCategory  ]= useState('Pastilla')
    const [products, setProduct] = useState([])

   useEffect(()=>{
       axios.get("product/categories/").then(res => {
           setCategories(res.data)
           axios.get(`product/products/${initialCategory}`).then(res => {
               setProduct(res.data)
           })
       })

   }, [initialCategory])
    return (
       <View style={globalStyles.container}>
       <ScrollView
       horizontal
       scrollEventThrottle={1}
       showsHorizontalScrollIndicator={false}
       height={50}
       style={globalStyles.chipScrollView}>
           {categories.map((item, index)=>(
               <TouchableOpacity onPress={()=> setInitialCategory(item.name)} key={index} style={[globalStyles.chipItemView, item.name === initialCategory && globalStyles.productCategoryActiveBackground]}>
                   <Text style={[globalStyles.productCategory, item.name === initialCategory && globalStyles.productCategoryActive]}>{item.name} </Text>
               </TouchableOpacity>
           ))}
       </ScrollView>

       <FlatList
           style={{marginTop: 30}}
           keyExtractor={(item, index)=> index}
            data={products}
            renderItem={({item})=>(
                <Card image={item.default_image} item={item} name={item.name} price={item.price} navigation={props.navigation}/>
            ) }
       />

       </View>
    )
}
const mapStateToProps = state => state
const connectComponent = connect(mapStateToProps)
export default connectComponent(HomeScreen)