import React from 'react';
import { ActivityIndicator, AsyncStorage } from "react-native";
import HomeScreen from './Screens/HomeScreen';
import Videos from './Screens/Videos';
import Files from './Screens/Files';
import Horoscope from './Screens/Horoscope';
import Events from './Screens/EventScreen';
import HoroscopeDetails from './Screens/HoroscopeDetails';
import AboutUs from './Screens/aboutUs';
import ContactUs from './Screens/contactUs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { AntDesign, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import * as firebase from 'firebase';
import 'firebase/firestore';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const firebaseConfig = {
  apiKey: "AIzaSyBmWAKcW4xifkTITELku_xghH-lSEUOQ2U",
  authDomain: "horoscopeapp-68c2b.firebaseapp.com",
  databaseURL: "https://horoscopeapp-68c2b.firebaseio.com",
  projectId: "horoscopeapp-68c2b",
  storageBucket: "horoscopeapp-68c2b.appspot.com",
  messagingSenderId: "671141464057",
  appId: "1:671141464057:web:e15477ee960f2135559f28"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);  
}

console.disableYellowBox = true;

i18n.translations = {
    en: { 
        Desc:  `Mrs. Asha Bamola  is a qualified Astrovastu Advisor in Delhi.
        \n\nShe is a master and experienced astrologer in different stream of Occult Science viz \n\n
        ❖ Vedic Jyotish \n\n
        ❖ Numerology \n\n
        ❖ Vastu Shastra \n\n
        ❖ Bhrigu Nandi Nadi \n\n
        \n\nShe has a vast experience .  and she still aspires to learn deeper meanings of this magnificent world of Astrology, Vastu Shashtra and roots Palmistry.
        \n\nMrs. Bamola had a keen interest in this splendid world of Astrology sine her childhood. She finds herself blessed to be born in the land of God ‘Uttarakhand’ where Astrology has its roots. She also is blessed to be born in the family of renowned astrologers from whom she had got her inspiration and motivation. She took up studying astrology when she was in class 10th with the blessings of her elders.
        \n\nShe states “That Astrology is not a tale to be heard of. It is a science which needs a rational mind to understand and decipher it. If interpreted well it can lead to great results.”
        \n\nMrs. Asha Bamola acknowledges the fact that astrology is one of the most important components of Hindu folk faith in the contemporary India. She is an expert on astrological concepts of the organization of the calendars in many areas of life, like making assessments about marriage, starting a new business, moving into a new home, and also making the jyotis charts of the newborns. Mrs. Bamola helps you understand and value the planetary influences on human life. She will assist you with various products and poojas to lead a healthy as well as a happy life.
        \n\nMrs. Bamola who is a specialist as a vastu consultant recognizes that vastu shashtra depends upon various energies which initiates from the environment like solar energy from sun, cosmic energy, light energy and wind energy. Mrs. Bamola is a skilled advisor, who can regulate these energies to improve peace, prosperity and achievements.
        \n\nMrs. Asha Bamola states that “Home is a house to humans as well as home to God. Our house should boost our mental peace where success in terms of health and wealth should be in abundant. For this vastu shashtra is an important aspect.”`,
        Qual: "Mrs. Asha Bamola has completed her M.A, B.Ed , Fashion designing and after that  Astrology .",
        PickTitle: "Pick Your Zodiac Sign", 
        FindTitle: "Find Your Zodiac Sign",
        Show: "Show Horoscope",
        Preference:"Choose Your Preference",
        Daily:"Show My Daily Horoscope",
        Weekly:"Show My Weekly Horoscope",
        userName: "Welcome To The World Of Astrology", 
        userTitle: "Accurate future predictions and professional advice to help you solve any problem and make the right decision",
        who: "Who We Are ?",
        abt: `Mrs. Asha Bamola  is a qualified Astrovastu Advisor in Delhi.\n\nShe has a vast experience .  and she still aspires to learn deeper meanings of this magnificent world of Astrology, Vastu Shashtra and roots Palmistry.\n\nMrs. Bamola had a keen interest in this splendid world of Astrology sine her childhood. She finds herself blessed to be born in the land of God ‘Uttarakhand’ where Astrology has its roots. She also is blessed to be born in the family of renowned astrologers from whom she had got her inspiration and motivation. She took up studying astrology when she was in class 10...`
    },
    hi: { 
        Desc: `श्रीमती आशा बमोला दिल्ली में एक योग्य एस्ट्रोवासु सलाहकार हैं।\n\nवह भोग विज्ञान की विभिन्न धारा में एक मास्टर और अनुभवी ज्योतिषी है\n\nY वैदिक ज्योतिष \n\n
        न्यूमरोलॉजी \n\n
        Sha वास्तु शास्त्र \n\n
        Nand भृगु नंदी नाडी \n \n
        \n\n
        उसे एक विशाल अनुभव है। और वह अभी भी ज्योतिष, वास्तु शस्त्र और जड़ हस्तरेखा विज्ञान की इस शानदार दुनिया के गहरे अर्थ जानने की इच्छा रखता है।\n\n
        श्रीमती बामोला की ज्योतिष की इस शानदार दुनिया में गहरी दिलचस्पी थी। वह खुद को धन्य मानती है कि वह भगवान 'उत्तराखंड' की धरती पर पैदा हुआ है जहाँ ज्योतिष की जड़ें हैं। वह प्रसिद्ध ज्योतिषियों के परिवार में पैदा होने के लिए भी धन्य है, जिनसे उन्हें प्रेरणा और प्रेरणा मिली थी। उसने ज्योतिष का अध्ययन तब किया जब वह अपने बड़ों के आशीर्वाद से 10 वीं कक्षा में थी।
        \n\n वह कहती हैं, "यह ज्योतिष के बारे में सुनाई जाने वाली कोई कहानी नहीं है। यह एक विज्ञान है जिसे समझने और इसे समझने के लिए एक तर्कसंगत दिमाग की आवश्यकता है। यदि अच्छी तरह से व्याख्या की जाती है तो यह शानदार परिणाम दे सकता है।
        \n\nश्रीमती आशा बामोला इस तथ्य को स्वीकार करती हैं कि ज्योतिष समकालीन भारत में हिंदू लोक विश्वास के सबसे महत्वपूर्ण घटकों में से एक है। वह जीवन के कई क्षेत्रों में कैलेंडर के संगठन की ज्योतिषीय अवधारणाओं पर एक विशेषज्ञ है, जैसे कि शादी के बारे में आकलन करना, एक नया व्यवसाय शुरू करना, एक नए घर में जाना और नवजात शिशुओं के ज्योतिष चार्ट भी बनाना। श्रीमती बामोला आपको मानव जीवन पर ग्रहों के प्रभावों को समझने और उन्हें महत्व देने में मदद करती हैं। वह आपको स्वस्थ बनाने के साथ-साथ एक खुशहाल जीवन जीने के लिए विभिन्न उत्पादों और पूजाओं में आपकी सहायता करेगी।
        \n\nश्रीमती बमोला, जो एक विशाल सलाहकार के रूप में एक विशेषज्ञ हैं, का मानना ​​है कि विशाल शश्ट्रा विभिन्न ऊर्जाओं पर निर्भर करता है जो सूर्य, ब्रह्मांडीय ऊर्जा, प्रकाश ऊर्जा और पवन ऊर्जा से सौर ऊर्जा जैसे पर्यावरण से शुरू होती हैं। श्रीमती बामोला एक कुशल सलाहकार हैं, जो शांति, समृद्धि और उपलब्धियों को बेहतर बनाने के लिए इन ऊर्जाओं को विनियमित कर सकती हैं।
        \n\nश्रीमती आशा बमोला बताती हैं कि “घर मनुष्यों के साथ-साथ भगवान का भी घर है। हमारे घर को हमारी मानसिक शांति को बढ़ावा देना चाहिए जहां स्वास्थ्य और धन के मामले में सफलता प्रचुर मात्रा में होनी चाहिए। इसके लिए विशाल शश्ट्र एक महत्वपूर्ण पहलू है।`,
        Qual: "श्रीमती आशा बमोला ने एम.ए., बी.एड, फैशन डिजाइनिंग और उसके बाद एस्ट्रोलॉजी में पढ़ाई पूरी की।",
    
        PickTitle: "अपनी राशि चुनें", 
        FindTitle: "अपनी राशि खोजें",
        Show: "कुंडली दिखाओ",
        Preference:"अपनी पसंद चुनें",
        Daily:"मेरी दैनिक कुंडली दिखाएँ",
        Weekly:"मेरा साप्ताहिक राशिफल दिखाएं",
        userName: "ज्योतिष की दुनिया में आपका स्वागत है", 
        userTitle: "किसी भी समस्या को हल करने और सही निर्णय लेने में आपकी मदद करने के लिए भविष्य की सटीक भविष्यवाणी और पेशेवर सलाह",
        who: "हम कौन हैं ?",
        abt:`श्रीमती आशा बमोला दिल्ली में एक योग्य एस्ट्रोवासु सलाहकार हैं।\n\nउसे एक बहुत बड़ा अनुभव है। और वह अभी भी ज्योतिष, वास्तु शास्त्र और जड़ हस्तरेखा विज्ञान की इस शानदार दुनिया के गहरे अर्थ जानने की इच्छा रखता है।\n\nज्योतिष की इस शानदार दुनिया में बचपन से ही श्रीमती बामोला की गहरी दिलचस्पी थी। वह खुद को धन्य मानती है कि वह भगवान 'उत्तराखंड' की धरती पर पैदा हुआ है जहाँ ज्योतिष की जड़ें हैं। वह प्रसिद्ध ज्योतिषियों के परिवार में पैदा होने के लिए भी धन्य हैं, जिनसे उन्हें प्रेरणा और प्रेरणा मिली थी। जब वह 10 वीं कक्षा में थी, उसने ज्योतिष का अध्ययन किया ...`
    },
    
};

        i18n.locale= Localization.locale;
        i18n.fallbacks = true;

export default class App extends React.Component{

  state = {
    loaded: false,
  }

  componentDidMount(){

    console.disableYellowBox = true;

    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async() => {
    await Font.loadAsync({
      'Nordik-Bold': require('./assets/fonts/Nordik-Bold.otf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    });

   

    this.setState({ loaded: true });
  }

  BottomTabNavigation = () => {
    return(
      <Tab.Navigator shifting={false} barStyle={{backgroundColor:"#3f3f3f", paddingTop:10}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarLabel:""
        }}/>
        <Tab.Screen name="Video" component={Videos} options={{
          tabBarIcon: ({ color }) => (
            <Feather name="video" size={24} color={color} />
          ),
          tabBarLabel:""
        }} />
        <Tab.Screen name="Horoscope" component={Horoscope} options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="antdesign" size={24} color="#FFC367" />
          ),
          tabBarLabel:""
        }} />
        <Tab.Screen name="Events" component={Events} options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={24} color={color} />
          ),
          tabBarLabel:""
        }} />
        <Tab.Screen name="Files" component={Files} options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-document" size={24} color={color} />
          ),
          tabBarLabel:""
        }} />
      </Tab.Navigator>
    )
  }

  render(){

    if (!this.state.loaded) {
      return <ActivityIndicator size="large" color="#000" />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" children={this.BottomTabNavigation} />
          <Stack.Screen name="HoroscopeDetails" component={HoroscopeDetails} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
