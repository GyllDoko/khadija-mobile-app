import React, {Component, useState} from 'react';
import {
    View,
    Text, TextInput, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { globalStyles } from '../../styles/global'
import {Formik} from "formik";
import {Authcontext} from "../../../context";
import {AntDesign} from "@expo/vector-icons";
import * as yup from 'yup'
import axios from "axios";
import {connect} from "react-redux";

export  function Login (props) {
    const [buttonDisable, setButtonDisable] = useState(false)
    const ValidationSchema= yup.object({
        email: yup.string().test('is-valid-email', 'email non valide', (val)=>{
            if (val){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(val).toLowerCase())
            }

        }),
        password: yup.string().test('is-min-6','le mot de passe doit contenir au moins 6 caractères !', (val)=>{
            if (val){
                return val.length > 0
            }

        })
    })
    const {signIn} = React.useContext(Authcontext)
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
  return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
          <View style={globalStyles.container}>
          <Text style={globalStyles.authText} >Connexion</Text>
          <View style={globalStyles.container}>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={ValidationSchema}
                onSubmit={(values, actions )=> {
                    setButtonDisable(true)
                    axios.post('https://khadija-backen.herokuapp.com/user/login/', values).then(res =>{
                        if (res.data.status){
                            props.updateUserInfo(res.data.user)
                            signIn()
                        }else {
                            ToastAndroid.showWithGravityAndOffset("Identifiants incorrects !",ToastAndroid.SHORT, ToastAndroid.BOTTOM,20,50)
                            setButtonDisable(false)
                        }

                    })


            }} >
              {(props)=>(
                  <View style={globalStyles.container}>
                      <Text style={globalStyles.authLabelText}>Email</Text>
                      <TextInput
                          style={globalStyles.textInput}
                          onChangeText={props.handleChange('email')}
                          value={props.values.email}
                          onBlur={props.handleBlur('email')}
                      />
                      <Text style={globalStyles.authErrors}>{props.touched.email && props.errors.email}</Text>
                      <Text style={globalStyles.authLabelText}>Mot de passe</Text>
                      <TextInput
                          secureTextEntry={true}
                          style={globalStyles.textInput}
                          onChangeText={props.handleChange('password')}
                          value={props.values.password}
                          onBlur={props.handleBlur('password')}
                      />
                      <Text style={globalStyles.authErrors}>{props.touched.password && props.errors.password}</Text>
                      <View style={globalStyles.forgotPasswordView}>
                          <Text style={globalStyles.forgotPassword}>mot de passe oublié ?</Text>
                      </View>
                      <View style={globalStyles.container}>
                          <TouchableOpacity onPress={props.handleSubmit} disabled={buttonDisable}>
                              <Text style={[globalStyles.welcomeButtonLogin, buttonDisable && globalStyles.welcomeButtonLoginDisable]}>Se connecter</Text>
                          </TouchableOpacity>
                      </View>

                  </View>
              )}

            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
}
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    updateUserInfo: userinfo =>dispatch({type : "USER_LOGIN", value: userinfo})
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(Login)