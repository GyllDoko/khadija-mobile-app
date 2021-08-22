import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../styles/global'


const Home = ({ navigation }) => {
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
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={globalStyles.welcomeButtonLogin}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={globalStyles.welcomeButtonRegister}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Home
