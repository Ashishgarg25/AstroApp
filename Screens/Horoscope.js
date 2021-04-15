import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Picker, Image, Modal, AsyncStorage } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Ionicons} from '@expo/vector-icons';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as firebase from 'firebase';
import 'firebase/firestore';

import i18n from 'i18n-js';


// i18n.translations = {
//     en: { 
        
//     },
//     hi: { 
       
//     },
// };

export default class HoroscopeScreen extends React.Component{

    state={
        isModalVisible:false,
        Sign:"",
        date: null,
        isDatePickerVisible: false,
        month:null,
        day:null,
        year:null,
        language:"en",
    }

    componentDidMount(){
        firebase.firestore().collection("Users").get().then((snapshot) => {
            let users = [];
            snapshot.docs.forEach((doc) => {
                users.push({...doc.data()});
            })
            this.setState({users})
        })
       
        this.getData();
    }

    getData = async() => {
        const lang = await AsyncStorage.getItem("language");
        this.setState({
            language:lang,
        })
        console.log(lang);
    }

    showDatePicker = () => {
        this.setState({isDatePickerVisible: true})
      };
    
    hideDatePicker = () => {
        this.setState({isDatePickerVisible: false})
      };
    
    handleConfirm = (date) => {
        var mdate = new Date(date);
       
        var day = mdate.getDate();
        var month = mdate.getMonth()+1;
        var year = mdate.getFullYear();

        this.setState({
            day: day,
            month: month,
            year: year,
        })

        this.hideDatePicker();
      };


    getDailyHoroscope = async() => {
        
          let response = await fetch(
            "http://horoscope-api.herokuapp.com/horoscope/today/"+this.state.Sign,
          );

          let responseJson = await response.json();
          console.log(responseJson.horoscope);

        this.setState({isModalVisible: false});

          this.props.navigation.navigate("HoroscopeDetails", {
              dd: "Daily",
              Sign: this.state.Sign,
              Horoscope: responseJson.horoscope,
          })

    }

    getWeeklyHoroscope = async() => {
        
          let response = await fetch(
            "http://horoscope-api.herokuapp.com/horoscope/week/"+this.state.Sign,
          );
          let responseJson = await response.json();
          console.log(responseJson.horoscope);

          this.setState({isModalVisible: false});

          this.props.navigation.navigate("HoroscopeDetails", {
              dd:"Weekly",
              Sign: this.state.Sign,
              Horoscope: responseJson.horoscope,
          })
    }

    Aries = (D3) => {
        var D1 = new Date("03/21/"+this.state.year);
        var D2 = new Date("04/19/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                this.ToggleVisibility("Aries");
            }
    }

    Taurus = (D3) => {
        var D1 = new Date("04/20/"+this.state.year);
        var D2 = new Date("05/20/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                this.ToggleVisibility("Taurus");
            }
    }

    Gemini = (D3) => {
        var D1 = new Date("05/21/"+this.state.year);
        var D2 = new Date("06/20/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                this.ToggleVisibility("Gemini");
            }
    }

    Cancer = (D3) => {
        var D1 = new Date("06/21/"+this.state.year);
        var D2 = new Date("07/22/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Cancer");
            }
    }

    Leo = (D3) => {
        var D1 = new Date("07/23/"+this.state.year);
        var D2 = new Date("08/22/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Leo");
            }
    }

    Virgo = (D3) => {
        var D1 = new Date("08/23/"+this.state.year);
        var D2 = new Date("09/22/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                this.ToggleVisibility("Virgo");
            }
    }

    Libra = (D3) => {
        var D1 = new Date("09/23/"+this.state.year);
        var D2 = new Date("10/22/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Libra");
            }
    }

    Scorpio = (D3) => {
        var D1 = new Date("10/23/"+this.state.year);
        var D2 = new Date("11/21/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Scorpio");
            }
    }

    Sagittarius = (D3) => {
        var D1 = new Date("11/22/"+this.state.year);
        var D2 = new Date("12/21/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Sagittarius");
            }
    }

    Capricorn = (D3) => {
        var D1 = new Date("12/21/"+this.state.year);
        var D2 = new Date("01/10/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Capricorn");
            }
    }

    Aquarius = (D3) => {
        var D1 = new Date("01/20/"+this.state.year);
        var D2 = new Date("02/18/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Aquarius");
            }
    }

    Pisces = (D3) => {
        var D1 = new Date("02/19/"+this.state.year);
        var D2 = new Date("03/20/"+this.state.year);

            if (D3.getTime() <= D2.getTime() 
                && D3.getTime() >= D1.getTime()) { 
                    this.ToggleVisibility("Pisces");
            }
    }

    showHoroscopeByDOB = () => {

        if(this.state.day !== null || this.state.month !== null || this.state.year !== null){
            const D3 = new Date(this.state.month+"/"+this.state.day+"/"+this.state.year);

            this.Aries(D3);
            this.Taurus(D3);
            this.Gemini(D3);
            this.Cancer(D3);
            this.Leo(D3);
            this.Virgo(D3);
            this.Libra(D3);
            this.Scorpio(D3);
            this.Sagittarius(D3);
            this.Capricorn(D3);
            this.Aquarius(D3);
            this.Pisces(D3);    
        }
    }

    ToggleVisibility = (Sign) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            Sign: Sign,
        })
    }

   

    render(){

        i18n.locale = this.state.language;
        i18n.fallbacks = true;

        return(
            <ScrollView style={{flex:1}} contentContainerStyle={styles.container}>

            <LinearGradient
                colors={['#020027', '#3a1a3f']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 1500,
                }}
            />


                <Text style={{fontFamily: 'Nordik-Bold', fontSize:28, color:"#FFC367", fontWeight:"bold", marginTop:64, paddingLeft:16}}> {i18n.t('PickTitle')} </Text>
               
                <Image source={require('../assets/HoroscopeWheel.png')} style={{width:360, height:360, marginVertical:64, alignSelf:"center"}} />
               
                <TouchableOpacity style={{position:"absolute", top:185, left:170}}  onPress={() => this.ToggleVisibility(Sign="Capricorn")}>
                    <Image source={require('../assets/Signs/capri.png')} style={{width:60, height:60}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:195, left:235}}  onPress={() => this.ToggleVisibility(Sign="Sagittarius")}>
                    <Image source={require('../assets/Signs/Siga.png')} style={{width:70, height:70}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:248, left:282}}  onPress={() => this.ToggleVisibility(Sign="Scorpio")}>
                    <Image source={require('../assets/Signs/scorpio.png')} style={{width:65, height:65}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:315, left:300}}  onPress={() => this.ToggleVisibility(Sign="Libra")}>
                    <Image source={require('../assets/Signs/libra.png')} style={{width:65, height:65}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:385, left:285}}  onPress={() => this.ToggleVisibility(Sign="Virgo")}>
                    <Image source={require('../assets/Signs/virgo.png')} style={{width:65, height:65}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:425, left:235}}  onPress={() => this.ToggleVisibility(Sign="Leo")}>
                    <Image source={require('../assets/Signs/leo.png')} style={{width:65, height:65}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:450, left:160}}  onPress={() => this.ToggleVisibility(Sign="Cancer")}>
                    <Image source={require('../assets/Signs/cancer.png')} style={{width:65, height:65}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:425, left:95}}  onPress={() => this.ToggleVisibility(Sign="Gemini")}>
                    <Image source={require('../assets/Signs/gemini.png')} style={{width:68, height:68}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:385, left:45}}  onPress={() => this.ToggleVisibility(Sign="Taurus")}>
                    <Image source={require('../assets/Signs/taurus.png')} style={{width:65, height:65}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:315, left:27}}  onPress={() => this.ToggleVisibility(Sign="Aries")}>
                    <Image source={require('../assets/Signs/aries.png')} style={{width:63, height:63}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:240, left:45}}  onPress={() => this.ToggleVisibility(Sign="Pisces")}>
                    <Image source={require('../assets/Signs/pisces.png')} style={{width:65, height:65}} />
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute", top:195, left:90}}  onPress={() => this.ToggleVisibility(Sign="Aquarius")}>
                    <Image source={require('../assets/Signs/aquarius.png')} style={{width:70, height:70}} />
                </TouchableOpacity>
               

               <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
                    <Image source={require('../assets/Images/imgOr.png')} style={{width:140, height:1, alignSelf:"center"}} />
                    <Text style={{fontFamily:"Montserrat-Medium", color:"#fff"}}>OR</Text>
                    <Image source={require('../assets/Images/imgOr.png')} style={{width:140, height:1, alignSelf:"center"}} />
               </View>
               
                <Text style={{fontFamily: 'Nordik-Bold', fontSize:28, color:"#FFC367", fontWeight:"bold", marginTop:64, paddingLeft:16}}> {i18n.t('FindTitle')} </Text>

                <View style={styles.loginContainer}>

                    <Text style={{paddingTop:32, color:"#a2a2a2"}}>DOB*</Text>
                    <Text style={styles.input} onPress={this.showDatePicker} > {this.state.day!==null?this.state.day+"/"+this.state.month+"/"+this.state.year:""} </Text>
                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />

                </View>

                <TouchableOpacity onPress={() => this.showHoroscopeByDOB()} style={{backgroundColor:"#FFC367", marginHorizontal:64, borderRadius:30, elevation:6, marginVertical:16, marginBottom:80}}>
                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#000", fontSize:14, padding:16, textAlign:"center"}}> {i18n.t('Show')} </Text>
                </TouchableOpacity>


                <View>
                   <Modal
                       animationType="fade"
                       visible={this.state.isModalVisible}

                       onRequestClose={() => this.ToggleVisibility()}>

                       <View style={{flex:1, justifyContent:"center"}}>

                           <LinearGradient
                               colors={['#020027', '#3a1a3f']}
                               style={{
                                   position: 'absolute',
                                   left: 0,
                                   right: 0,
                                   top: 0,
                                   height: 1000,
                               }}
                           />

                           <AntDesign name="dingding" size={24} color="#FFC367" style={{paddingLeft:16}} />
                           <Text style={{ fontFamily: 'Nordik-Bold', fontSize:24, color:"#FFC367", fontWeight:"bold", paddingLeft:16, marginBottom:64}}> {i18n.t('Preference')} </Text>
              
                           <TouchableOpacity style={{marginVertical:32}} onPress={() => {this.getDailyHoroscope()}}>
                               <Text style={{borderWidth:1, borderColor:"#FFC367", padding:30, borderRadius:16, color:"#fff", marginHorizontal:60, fontFamily:"Montserrat-Medium", fontSize:22}}>{i18n.t('Daily')}</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{marginVertical:32}} onPress={() => {this.getWeeklyHoroscope()}}>
                               <Text style={{borderWidth:1, borderColor:"#FFC367", padding:30, borderRadius:16, color:"#fff", marginHorizontal:60, fontFamily:"Montserrat-Medium", fontSize:22}}>{i18n.t('Weekly')}</Text>
                           </TouchableOpacity>
                       </View>

                   </Modal>
               </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:"#262626",
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    loginContainer:{
        padding:30,
        width:380,
        elevation:6
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:"#a2a2a2",
        paddingTop:6,
        fontSize:14,
        color:"#fff",
        fontWeight:"bold"
    },
    errorMessage:{
        backgroundColor:"#FDF4F5", 
        alignSelf:"stretch", 
        textAlign:"center", 
        marginHorizontal:32, 
        borderRadius:6, 
        color:"#EA5165", 
        borderColor:"#EA5165", 
        borderWidth:1, 
        padding:6, 
        fontWeight:"bold",
    }
  });

