import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import i18n from 'i18n-js';

export default class AboutUs extends React.Component{

    state = {
        language:"en",
    }

    componentDidMount(){
        this.getData();
    }

    getData = async() => {
        const lang = await AsyncStorage.getItem("language");
        this.setState({
            language:lang,
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
                        height: 2300,
                    }}
                />

                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FontAwesome5 name="arrow-left" size={24} color="#fff" style={{marginTop:64, marginLeft:32}}/>
                </TouchableOpacity>

                <Image source={require('../assets/userImage.jpg')} style={{width:200, height:200, marginTop:32, justifyContent:"center", alignSelf:"center", borderRadius:16}} />

                <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:24, paddingTop:48, paddingLeft:16}}>About</Text>
                
                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", fontSize:14, padding:16}}>
                    {i18n.t('Desc')}
                </Text>

                <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:24, paddingTop:48, paddingLeft:16}}>Qualifications</Text>
        
                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", fontSize:14, padding:16, marginBottom:32}}>
                    {i18n.t('Qual')}
                </Text>

            </ScrollView>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        justifyContent:"flex-start",
        alignItems:"stretch",
        backgroundColor:"#262626",
    },
    
})