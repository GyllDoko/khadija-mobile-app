import React from 'react'
import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import {globalStyles }from '../../styles/global'

const Skip = ({...props})=>(
  <TouchableOpacity 
  {...props}
  > 
      <Text style={globalStyles.onboardSkipButton}>Sauter</Text>
  </TouchableOpacity>
)
const Next = ({...props})=>(
  <TouchableOpacity
  {...props}
  > 
      <Text style={globalStyles.onboardButton}>Suivant</Text>
  </TouchableOpacity>
)
const Done = ({...props})=>(
  <TouchableOpacity
  {...props}
  > 
      <Text style={globalStyles.onboardButton}>Commencer</Text>
  </TouchableOpacity>
)
const Dots = ({selected})=>{
let backgroundColor;
backgroundColor = selected ? 'rgb(255,170,0)' : 'rgba(255,170,0, 0.3)' 
return (
  <View style={{
    width: 8,
    backgroundColor,
    height: 8,
    marginHorizontal: 3,
    borderRadius: 50,
  }} />
)
}
  

const OnboardingScreen = ({navigation}) => {
  return (
      <>
          <StatusBar />
          <Onboarding

              bottomBarColor="#fff"
              SkipButtonComponent={Skip}
              NextButtonComponent={Next}
              DoneButtonComponent={Done}
              DotComponent={Dots}
              onSkip={()=> navigation.replace("Welcome")}
              onDone={()=> navigation.navigate("Welcome")}
              containerStyles ={{
                  flex: 1,
                  paddingBottom: 70,
              }}
              imageContainerStyles={{padding: 0}}
              subTitleStyles={{fontFamily: 'MontserratLight',}}
              titleStyles={{color : 'coral',
                  fontFamily: 'MontserratBold',
              }}
              pages={[
                  {
                      backgroundColor: '#fff',
                      image: <Image source={require('../../../assets/onboard/splash1.png')} />,
                      title: 'Commande tes plats',
                      subtitle: 'Nous livrerons ta commande aussi rapidement et efficacement que possible.',
                  },
                  {
                      backgroundColor: '#fff',
                      image: <Image source={require('../../../assets/onboard/splash2.png')} />,
                      title: 'Suis ta commande',
                      subtitle: 'Suis ta commande en temps réel',
                  },
                  {
                      backgroundColor: '#fff',
                      image: <Image source={require('../../../assets/onboard/splash3.png')} />,
                      title: 'Des paiements sans faille',
                      subtitle: 'Payez avec vos cartes de crédit, Apple Pay ou Android Pay, en un clic',
                  },

              ]}
          />
      </>

  )
}

export default OnboardingScreen
