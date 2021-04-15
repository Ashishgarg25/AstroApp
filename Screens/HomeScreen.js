import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Picker, AsyncStorage } from 'react-native';
import React from 'react'
import { AntDesign,MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView } from 'react-native-gesture-handler';
import ParallaxScrollView from 'react-native-parallax-scrollview';
import { LinearGradient } from 'expo-linear-gradient';

import { StatusBar } from 'expo-status-bar';
import { Video } from 'expo-av';

import i18n from 'i18n-js';

i18n.translations = {
    en: { 
        userName: "Welcome To The World Of Astrology", 
        userTitle: "Accurate future predictions and professional advice to help you solve any problem and make the right decision",
        who: "Who We Are ?",
        abt: `Mrs. Asha Bamola  is a qualified Astrovastu Advisor in Delhi.\n\nShe has a vast experience .  and she still aspires to learn deeper meanings of this magnificent world of Astrology, Vastu Shashtra and roots Palmistry.\n\nMrs. Bamola had a keen interest in this splendid world of Astrology sine her childhood. She finds herself blessed to be born in the land of God ‘Uttarakhand’ where Astrology has its roots. She also is blessed to be born in the family of renowned astrologers from whom she had got her inspiration and motivation. She took up studying astrology when she was in class 10...`
    },
    hi: { 
        userName: "ज्योतिष की दुनिया में आपका स्वागत है", 
        userTitle: "किसी भी समस्या को हल करने और सही निर्णय लेने में आपकी मदद करने के लिए भविष्य की सटीक भविष्यवाणी और पेशेवर सलाह",
        who: "हम कौन हैं ?",
        abt:`श्रीमती आशा बमोला दिल्ली में एक योग्य एस्ट्रोवासु सलाहकार हैं।\n\nउसे एक बहुत बड़ा अनुभव है। और वह अभी भी ज्योतिष, वास्तु शास्त्र और जड़ हस्तरेखा विज्ञान की इस शानदार दुनिया के गहरे अर्थ जानने की इच्छा रखता है।\n\nज्योतिष की इस शानदार दुनिया में बचपन से ही श्रीमती बामोला की गहरी दिलचस्पी थी। वह खुद को धन्य मानती है कि वह भगवान 'उत्तराखंड' की धरती पर पैदा हुआ है जहाँ ज्योतिष की जड़ें हैं। वह प्रसिद्ध ज्योतिषियों के परिवार में पैदा होने के लिए भी धन्य हैं, जिनसे उन्हें प्रेरणा और प्रेरणा मिली थी। जब वह 10 वीं कक्षा में थी, उसने ज्योतिष का अध्ययन किया ...`
    },
    
};

export default class HomeScreen extends React.Component{

    state={
        isModalVisible:false,
        item:[],
        src:null,
        language:"en",
    }

      ToggleVisibility = (src) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            src,
        })
    }

    openLink = () => {
        WebBrowser.openBrowserAsync("http://www.anthemitsol.com");
    }

    storeData = async() => {
        await AsyncStorage.setItem("language", this.state.language);
    }

    render(){

        i18n.locale= this.state.language;
        i18n.fallbacks = true;
        this.storeData();

        return(

            <View style={{flex:1}}>
                <ParallaxScrollView windowHeight={1100 * 0.5} 
                userName= {i18n.t('userName')}
                userTitle={i18n.t('userTitle')}
                backgroundSource={require('../assets/home-slider-2.jpg')}>

                <StatusBar style="light" />
                <ScrollView style={{flex:1}} contentContainerStyle={styles.container}>

                    <LinearGradient
                        colors={['#020027', '#3a1a3f']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: 1600,
                        }}
                    />
                
                <View style={{padding:16}}>
                    <AntDesign name="dingding" size={24} color="#FFC367" />
                    <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:32}}>{i18n.t('who') !== undefined ? i18n.t('who') : "Who We Are ?" }</Text>
                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", paddingTop:10}}>
                        {i18n.t('abt')}
                    </Text>
                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#FFC367", paddingRight:10, paddingTop:10, textAlign:"right"}} onPress={() => this.props.navigation.navigate("AboutUs")}>Read More</Text>
                </View>
                <View style={{padding:16, marginTop:32, flex:1}}>
                    <AntDesign name="dingding" size={24} color="#FFC367" />
                    <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:32}}>Certificates</Text>

                   <ScrollView horizontal={true} style={{paddingTop:10}}>
                       
                       <TouchableOpacity onPress={() => this.ToggleVisibility(src=require('../assets/certificates/cert1_1.jpeg'))}>
                            <Image source={require('../assets/certificates/cert1_1.jpeg')} style={styles.cert} />
                       </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.ToggleVisibility(src=require('../assets/certificates/cert2_2.jpeg'))}>
                            <Image source={require('../assets/certificates/cert2_2.jpeg')} style={styles.cert} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.ToggleVisibility(src=require('../assets/certificates/cert3_3.jpeg'))}>
                        <Image source={require('../assets/certificates/cert3_3.jpeg')} style={styles.cert} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.ToggleVisibility(src=require('../assets/certificates/cert4_4.jpeg'))}>
                        <Image source={require('../assets/certificates/cert4_4.jpeg')} style={styles.cert} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.ToggleVisibility(src=require('../assets/certificates/cert5_5.jpeg'))}>
                        <Image source={require('../assets/certificates/cert5_5.jpeg')} style={styles.cert} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.ToggleVisibility(src=require('../assets/certificates/cert6_6.jpeg'))}>
                        <Image source={require('../assets/certificates/cert6_6.jpeg')} style={styles.cert} /> 
                        </TouchableOpacity>
     
                   </ScrollView>

                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("ContactUs")} style={{backgroundColor:"#FFC367", paddingHorizontal:16, paddingVertical:10, width:60, position:"absolute", left:335,top:750}}>
                    <Ionicons name="ios-mail" size={30} color="#262626" />
                </TouchableOpacity>

                <Picker
                    selectedValue={this.state.language}
                    mode="dropdown"
                    style={{height: 50, width: 100,fontFamily:"Montserrat-Medium", color:"#262626", position:"absolute", top:0,right:-20, backgroundColor:"#FFC367",}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="Hindi" value="hi" />
                </Picker>

                <View style={{padding:16, marginTop:32, flex:1}}>
                    <AntDesign name="dingding" size={24} color="#FFC367" />
                    <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:32}}>Clients</Text>
                    <ScrollView horizontal={true} style={{paddingTop:10}}>
                       
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            
                            <View style={{padding:16, width:350, height:400, marginRight:16}}>
                                <LinearGradient
                                    colors={['#020027', '#3a1a3f']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 500,
                                        borderRadius:16,
                                    }}
                                />
                                
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", paddingTop:10, paddingHorizontal:20}}>
                                    <MaterialCommunityIcons name="format-quote-open" size={24} color="#FFC367" />
                                    I wish to inform that I have been interacting with Ms. Arsha Bamola in regard to my astrological queries (VASTU) for self, my general family life and day to-day issues.
                                    {"\n"}{"\n"}
                                    I must say that she is extremely accurate in predicting the future incidences and the remedies, which she suggests are useful and very effective.
                                    {"\n"}{"\n"}
                                    I strongly recommend all of you to consult with Ms. Arsha Bamola for your astrological queries.
                                    <MaterialCommunityIcons name="format-quote-close" size={24} color="#FFC367" />
                                </Text>
                                

                                <View style={{flexDirection:"row"}}>
                                    <Image source={require('../assets/OurClients/client1.png')} style={{width:50, height:50, marginTop:20}} />
                                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:30, paddingHorizontal:15}}>Sharad Rajvanshi</Text>
                                </View>
                            </View>

                            <View style={{padding:16, width:350, height:400, marginRight:16}}>
                                <LinearGradient
                                    colors={['#020027', '#3a1a3f']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 500,
                                        borderRadius:16,
                                    }}
                                />
                                
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", paddingTop:10, paddingHorizontal:20}}>
                                    <MaterialCommunityIcons name="format-quote-open" size={24} color="#FFC367" />
                                    I have known Asha ji for the last 3/4 years, and these years have been very tremendously helpful because with out the help/ guidance of Asha ji my life wouldn't be like this as it is now. 
                                    {"\n"}{"\n"}
                                    I am very lucky to got a great connection with this beautiful lady who showed me the right path to choose the right decision. 
                                    {"\n"}{"\n"}
                                    I wish her all the very best for her bright future as she is helping and securing the future of others.
                                    <MaterialCommunityIcons name="format-quote-close" size={24} color="#FFC367" />
                                </Text>
                                

                                <View style={{flexDirection:"row"}}>
                                    <Image source={require('../assets/OurClients/client2.png')} style={{width:50, height:50, marginTop:20}} />
                                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:30, paddingHorizontal:15}}>Ashok Kumar Soni</Text>
                                </View>
                            </View>

                            <View style={{padding:16, width:350, height:400, marginRight:16}}>
                                <LinearGradient
                                    colors={['#020027', '#3a1a3f']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 500,
                                        borderRadius:16,
                                    }}
                                />
                                
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", paddingTop:10, paddingHorizontal:20}}>
                                    <MaterialCommunityIcons name="format-quote-open" size={24} color="#FFC367" />
                                    She is best astrologer whom I met in my life. I know her from last 8 years. She changed my life completely. 
                                    {"\n"}{"\n"}
                                    Her predictions are absolutely correct and her remedies are very simple and easy. I always refer my family and friend those are in need. 
                                    {"\n"}{"\n"}
                                    She is very helpful and admirable. Thanks for being in my life Ma'am.
                                    <MaterialCommunityIcons name="format-quote-close" size={24} color="#FFC367" />
                                </Text>
                                

                                <View style={{flexDirection:"row"}}>
                                    <Image source={require('../assets/OurClients/client3.png')} style={{width:50, height:50, marginTop:20}} />
                                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:30, paddingHorizontal:15}}>Nehha</Text>
                                </View>
                            </View>

                            <View style={{padding:16, width:350, height:400, marginRight:16}}>
                                <LinearGradient
                                    colors={['#020027', '#3a1a3f']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 500,
                                        borderRadius:16,
                                    }}
                                />
                                
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", paddingTop:10, paddingHorizontal:20}}>
                                    <MaterialCommunityIcons name="format-quote-open" size={24} color="#FFC367" />
                                    Dear aashaji{"\n"}
                                    I really admire and respect you so much as it can't be explain in words
                                    These are such kind of feelings that sometimes I look up to you as my mentor and in another minute as a friend like I can share anything with you.
                                    {"\n"}{"\n"}
                                    I am in your contact as in 5 or 6 years and I totally did all those remedies as you said and clearly I can see the difference and betterment in our lives.
                                    {"\n"}{"\n"}
                                    Thanks for being there everytime for us🙏🙏🙏🙏🙏
                                    <MaterialCommunityIcons name="format-quote-close" size={24} color="#FFC367" />
                                </Text>
                                

                                <View style={{flexDirection:"row"}}>
                                    <Image source={require('../assets/OurClients/client4.png')} style={{width:50, height:50, marginTop:20}} />
                                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:30, paddingHorizontal:15}}>Mr. Kamlesh</Text>
                                </View>
                            </View>

                            <View style={{padding:16, width:350, height:400, marginRight:16}}>
                                <LinearGradient
                                    colors={['#020027', '#3a1a3f']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 500,
                                        borderRadius:16,
                                    }}
                                />
                                
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", paddingTop:10, paddingHorizontal:20}}>
                                    <MaterialCommunityIcons name="format-quote-open" size={24} color="#FFC367" />
                                    I feel delighted to recommend Asha ji as an astrolger of par excellence in her field.It has been 4 years since I know Ashaji.
                                    {"\n"}{"\n"}
                                    She has a thorough knowledge about astrology and her remedies are really very effective. All I can say is she is one of the most reliable, consistent and accurate astrologer. 
                                    {"\n"}{"\n"}
                                    She is a very optimistic and happy person as well. She is down to earth and pious soul..
                                    <MaterialCommunityIcons name="format-quote-close" size={24} color="#FFC367" />
                                </Text>
                                

                                <View style={{flexDirection:"row"}}>
                                    <Image source={require('../assets/OurClients/client5.png')} style={{width:50, height:50, marginTop:20}} />
                                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:30, paddingHorizontal:15}}>Ms. Dimple</Text>
                                </View>
                            </View>

                            <View style={{padding:16, width:350, height:400, marginRight:16}}>
                                <LinearGradient
                                    colors={['#020027', '#3a1a3f']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 500,
                                        borderRadius:16,
                                    }}
                                />
                                
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", paddingTop:10, paddingHorizontal:20}}>
                                    <MaterialCommunityIcons name="format-quote-open" size={24} color="#FFC367" />
                                    Hello myself Latest Sharma from Ahmedabad. I have been in contact with Asha ji for past 4 years.  For quite sometime we were facing some problems. 
                                    {"\n"}{"\n"}
                                    But after contacting Asha ji and following her guidelines, me and my family have seen quite positive changes. I am filled with so many positive thoughts and energy.
                                    {"\n"}{"\n"}
                                    My family and I really appreciate her and are really thankfull to Asha ji 🙏🏻
                                    <MaterialCommunityIcons name="format-quote-close" size={24} color="#FFC367" />
                                </Text>
                                

                                <View style={{flexDirection:"row"}}>
                                    <Image source={require('../assets/OurClients/client6.png')} style={{width:50, height:50, marginTop:20}} />
                                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:30, paddingHorizontal:15}}>Mr. Ashok</Text>
                                </View>
                            </View>

                            <View style={{padding:16, width:350, height:500, marginRight:16}}>
                                <Video
                                    source={{uri: "https://firebasestorage.googleapis.com/v0/b/horoscopeapp-68c2b.appspot.com/o/Videos%2FclientVid1.mp4?alt=media&token=00752b0a-8f00-4df1-955a-f1f7ad601c22"}}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    useNativeControls
                                    style={{ width: 350, height: 450 }}
                                />
                            </View>

                            <View style={{padding:16, width:350, height:500, marginRight:16}}>
                                <Video
                                    source={{uri: "https://firebasestorage.googleapis.com/v0/b/horoscopeapp-68c2b.appspot.com/o/Videos%2FclientVid2.mp4?alt=media&token=5ca00713-f5a4-4d07-ab9a-8a4f310014b2"}}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    useNativeControls
                                    style={{ width: 350, height: 450 }}
                                />
                            </View>

                            <View style={{padding:16, width:400, height:300, marginRight:16}}>
                                <Video
                                    source={{uri: "https://firebasestorage.googleapis.com/v0/b/horoscopeapp-68c2b.appspot.com/o/Videos%2FclientVid3.mp4?alt=media&token=c9f95561-9cc5-4ab8-b112-c7d0a7696738"}}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    useNativeControls
                                    style={{ width: 400, height: 250 }}
                                />
                            </View>
                        </View>                        
                       
                   </ScrollView>
                </View>

                <View style={{backgroundColor:"#3c1b41", paddingVertical:6, elevation:6}}>
                    <Text onPress={() => this.openLink()} style={{fontFamily:'Montserrat-Medium', textAlign:"center", color:"#FFC367", fontSize:12}}>Anthem IT Solutions</Text>
                </View>
    
                </ScrollView>

                </ParallaxScrollView>

                <View>
                <Modal
                    animationType="fade"
                    visible={this.state.isModalVisible}
                    onRequestClose={() => this.ToggleVisibility()}
                    transparent>

                    <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#212121"}}>
                        <AntDesign name="close" size={24} color="#fff" style={{position:"absolute", top:20, right:20}} onPress={() => this.ToggleVisibility()} />
                        <Image source={this.state.src} style={{resizeMode:"contain",width:380, 
                            height:600,}} />
                    </View>
                    
                </Modal>
            </View>

        </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"stretch",
        backgroundColor:"#262626",
    },
    cert:{
        width:300, 
        height:200, 
        marginRight:15, 
        borderRadius:14
    }
    
})