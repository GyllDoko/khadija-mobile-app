import {Platform, StyleSheet} from 'react-native'
import {rgbaColor} from "react-native-reanimated/src/reanimated2/Colors";

export const globalStyles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
    onboardSkipButton: {
        padding: 10,
        color: 'black',
        fontFamily: 'MontserratRegular',
    },
      onboardButton: {
        padding: 10,
        color: 'coral',
        fontFamily: 'MontserratRegular',
    },
    welcomeImage: {
      flex: 1,
     width: null,
     height: null,
     resizeMode: 'contain'
   },
   welcomeButtonLogin : {
     textAlign: 'center',
     backgroundColor: 'coral',
     marginHorizontal: 30,
     marginVertical: 12,
     padding: 12,
     borderRadius: 10,
     color: 'white',
     fontFamily: 'MontserratBold',
       textTransform: "uppercase"
   },
    welcomeButtonLoginDisable: {
      backgroundColor: "#D3D3D3",
        color: "white",
    },
   welcomeButtonRegister : {
     textAlign: 'center',
     borderWidth: 1,
     borderColor: 'coral',
     marginHorizontal: 30,
     marginVertical: 12,
     padding: 12,
     fontFamily: 'MontserratBold',
     borderRadius: 10,
     color: 'coral',
       textTransform: "uppercase"
   },
   welcomeText : {
     paddingHorizontal: 5,
     fontSize: 32,
     textAlign: 'center',
     fontFamily: 'MontserratRegular',
     letterSpacing: 0,
   },
   authText :{
     fontSize: 32,
     fontFamily: 'MontserratLight',
     paddingLeft: 15,
     color: 'coral',
     fontWeight: '700',
       letterSpacing: 2,
   },
    textInput: {
      backgroundColor: 'rgb(248,248,248)',
        borderRadius : 8,
        padding: 7,
        fontSize: 15,
        marginVertical:5,
        marginHorizontal: 30,
    },
    authLabelText :{
        paddingBottom: 10,
        fontSize: 15,
        marginHorizontal: 30,
        color: 'grey',
        fontFamily: 'MontserratRegular'
    },
    authErrors: {
        paddingBottom: 5,
        fontSize: 12,
        marginHorizontal: 30,
        color: 'red',
        fontFamily: 'MontserratLight',
        textAlign: 'center'
    },
    forgotPassword:{
        right: 10,
        color: 'coral',
        fontFamily: 'MontserratRegular',
        paddingBottom: 15,
    },
    forgotPasswordView: {
      alignItems: 'flex-end',
        paddingRight: 15,
    },
    registerForm:{
      flex: 2,
    },
    chipScrollView: {
      position: 'absolute',
        top: Platform.OS=="ios" ? 15 : 10,
        paddingHorizontal: 10,
        marginRight: Platform.OS =="android" ? 20 : 0,
    },
    chipItemView :{
      flexDirection: 'row',
        backgroundColor: 'coral',
        borderRadius: 10,
        padding: 8,
        paddingHorizontal:20,
        marginHorizontal :10,
        height: 40,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    productCategory: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'MontserratRegular',
        textTransform: 'capitalize',
    },
    productCategoryActive: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'MontserratRegular',
        textTransform: 'capitalize',
    },
    productCategoryActiveBackground :{
        backgroundColor: "white",
        borderColor: "coral",
        borderWidth: 2,

    }
})
