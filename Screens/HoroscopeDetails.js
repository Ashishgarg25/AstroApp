import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default class HoroscopeDetails extends React.Component{
    render(){

        const {Sign} = this.props.route.params;
        const {Horoscope} = this.props.route.params;
        const {dd} = this.props.route.params;;

        return(
            <ScrollView style={{flex:1}} contentContainerStyle={styles.container}>

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
                
                <ImageBackground source={require('../assets/Images/sagittariuseps-zodiac-sign.jpg')} style={{width:389, height:300}} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-round-back" size={24} color="#fff" style={{marginTop:60, marginLeft:24}} />
                    </TouchableOpacity>
                </ImageBackground>


                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", padding:16, fontSize:22}}> {Sign} </Text>

                <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:24, paddingTop:48, paddingLeft:16}}>My {dd} Horoscope</Text>
                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", fontSize:14, paddingHorizontal:16, paddingTop:16, paddingBottom:300}}>
                    {Horoscope}
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