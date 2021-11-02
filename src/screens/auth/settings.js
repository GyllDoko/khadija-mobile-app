import React, {Component, useState} from 'react';
import {
    View,
    Text, TextInput, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, Keyboard, ScrollView,
} from 'react-native';
import { globalStyles } from '../../styles/global'
import {Formik} from "formik";
import {AntDesign} from "@expo/vector-icons";
import * as yup from 'yup'
import axios from "axios";
import {connect} from "react-redux";

export  function Setting (props) {
    const [buttonDisable, setButtonDisable] = useState(false)
    const ValidationSchema= yup.object({
        email: yup.string().test('is-valid-email', 'email non valide', (val)=>{
            if (val){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(val).toLowerCase())
            }

        }),
        name : yup.string()
            .test('is-min-2', 'entrer un nom valide (3 caractéres au moins)', (val) => {
                if (val){
                    return val.length >0 && val.length > 3
                }

            }),
        adress : yup.string()
            .test('is-min-2', 'entrer une addresse valide (3 caractéres au moins)', (val) => {
                if (val){
                    return val.length >0 && val.length > 3
                }
            }),
        phone_number: yup.number()
    })
    React.useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={()=> props.navigation.goBack()}
                >
                    <AntDesign name="left" size={24} color="black" style={{paddingLeft: 10}}/>
                </TouchableOpacity>
            ),
        })
    })
    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                    <Formik
                        initialValues={{name: '', email: '', phone_number: '', adress: ''}}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions )=> {
                            setButtonDisable(true)
                             let data = {
                                ...values,
                            id : props.userInfo.id
                            }
                            console.log(data)
                            axios.put('https://khadija-backen.herokuapp.com/user/register/', data).then(res =>{
                                setButtonDisable(false)

                                if (res.data.status){
                                    props.updateUserInfo(res.data.user)
                                    props.navigation.goBack()
                                }

                            })
                        }} >
                        {(props)=>(
                            <ScrollView>
                                <Text style={globalStyles.authLabelText}>Nom et prénom</Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={props.handleChange('name')}
                                    onBlur={props.handleBlur('name')}
                                />
                                <Text style={globalStyles.authErrors}>{props.touched.name && props.errors.name}</Text>

                                <Text style={globalStyles.authLabelText}>Email</Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={props.handleChange('email')}
                                    onBlur={props.handleBlur('email')}
                                />
                                <Text style={globalStyles.authErrors}>{props.touched.email && props.errors.email}</Text>

                                <Text style={globalStyles.authLabelText}>Téléphone</Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={props.handleChange('phone_number')}
                                    onBlur={props.handleBlur('phone_number')}
                                />
                                <Text style={globalStyles.authErrors}>{props.touched.phone_number && props.errors.phone_number}</Text>

                                <Text style={globalStyles.authLabelText}>Addresse</Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={props.handleChange('adress')}
                                    onBlur={props.handleBlur('adress')}
                                />
                                <Text style={globalStyles.authErrors}>{props.touched.adress && props.errors.adress}</Text>

                                <View style={globalStyles.container}>
                                    <TouchableOpacity onPress={props.handleSubmit} disabled={buttonDisable}>
                                        <Text style={[globalStyles.welcomeButtonLogin, buttonDisable && globalStyles.welcomeButtonLoginDisable]}>Enregistrer</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        )}

                    </Formik>

            </View>
        </TouchableWithoutFeedback>
    );
}
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    updateUserInfo: userinfo =>dispatch({type : "USER_LOGIN", value: userinfo})
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(Setting)