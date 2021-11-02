import React, {Component, useState} from 'react';
import {
    View,
    Text, TextInput, Button, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { globalStyles } from '../../styles/global'
import {Formik} from "formik";
import {Authcontext} from "../../../context";
import * as yup from "yup";
import axios from "axios";
import {AntDesign} from "@expo/vector-icons";

export default function Register (props) {
    React.useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={()=> props.navigation.goBack()}
                >
                    <AntDesign name="left" size={24} color="coral" style={{paddingLeft: 10}}/>
                </TouchableOpacity>
            ),
        })
    })
    const {signUp} = React.useContext(Authcontext)
    const [buttonDisable, setButtonDisable] = useState(false)
    const ValidationSchema= yup.object({
        email: yup.string().test('is-valid-email', 'email non valide', (val)=>{
            if (val){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(val.toString().toLowerCase())
            }

        }),
        password: yup.string()
            .test('is-min-6','le mot de passe doit contenir au moins 6 caractères !', (pwd) => {
                if (pwd){
                    return pwd.length > 0 && pwd.length >= 6
                }

        }),
        name: yup.string()
            .test('is-min-2', 'entrer un nom valide (3 caractéres au moins)', (val) => {
                if (val){
                    return val.length >0 && val.length >= 3
                }

        })
    })

  return (
      <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.authText} >Inscription</Text>
        <View style={globalStyles.registerForm}>
          <Formik initialValues={{email: '', password: '', name: ''}} validationSchema={ValidationSchema} onSubmit={(values, actions )=> {
             setButtonDisable(true)
              axios.post("https://khadija-backen.herokuapp.com/user/register/",values).then(res => {
                 props.navigation.navigate('Login')
             })

          }} >
            {(props)=>(
                <View style={globalStyles.container}>
                  <Text style={globalStyles.authLabelText}>Nom et Prénom</Text>
                  <TextInput style={globalStyles.textInput}
                             onChangeText={props.handleChange('name')}
                             value={props.values.name}
                             onBlur={props.handleBlur('name')}
                  />
                    <Text style={globalStyles.authErrors}>{props.touched.name && props.errors.name}</Text>
                  <Text style={globalStyles.authLabelText}>Email</Text>
                  <TextInput style={globalStyles.textInput}
                             onChangeText={props.handleChange('email')}
                             value={props.values.email}
                             onBlur={props.handleBlur('email')}
                  />
                    <Text style={globalStyles.authErrors}>{props.touched.email && props.errors.email}</Text>
                  <Text style={globalStyles.authLabelText}>Mot de passe</Text>
                  <TextInput style={globalStyles.textInput}
                             secureTextEntry={true}
                             onChangeText={props.handleChange('password')}
                             value={props.values.password}
                             onBlur={props.handleBlur('password')}
                  />
                    <Text style={globalStyles.authErrors}>{props.touched.password && props.errors.password}</Text>
                  <View style={{marginTop: 10}}>
                    <TouchableOpacity onPress={props.handleSubmit}>
                      <Text style={[globalStyles.welcomeButtonLogin, buttonDisable && globalStyles.welcomeButtonLoginDisable]}>S' inscrire</Text>
                    </TouchableOpacity>
                  </View>

                </View>
            )}

          </Formik>
        </View>
      </SafeAreaView>

  );
}

