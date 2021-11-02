import React, {useEffect} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../styles/global'
import {connect} from "react-redux";


const Home = (props) => {
    useEffect(()=>{
        if (props.userInfo){
            console.log(props)
        }
    },[])

    return (
        <View style={globalStyles.container}>
            <Image
                source={require("../../../assets/welcome/khadja.png")}
                style={globalStyles.welcomeImage}
            />
            <View style={globalStyles.container}>
                <View style={{}}>
                    <Text style={globalStyles.welcomeText}>Bienvenue sur les</Text>
                    <Text style={globalStyles.welcomeText}>Délices de Lalla Khadija</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                        <Text style={globalStyles.welcomeButtonLogin}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
                        <Text style={globalStyles.welcomeButtonRegister}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Home)
