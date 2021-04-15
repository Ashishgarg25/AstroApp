import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import * as MailComposer from 'expo-mail-composer';

export default class contactUs extends React.Component{
    render(){

        state={
            name:"",
            email:"",
            subject:"",
            message:""
        }

        sendEmail = () => {
            if(this.state.name !== null && this.state.email !== null && this.state.message !== null){
                MailComposer.composeAsync({
                    recipients: ["arbamola@divyadishadarshan.com"],
                    subject: this.state.subject,
                    body: this.state.message,
                })
                .then(res => {
                    console.log("Contact Form Submitted");
                })
            }
        }

        return(
            <ScrollView style={{flex:1}} contentContainerStyle={styles.container}>

                <LinearGradient
                    colors={['#020027', '#3a1a3f']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 1400,
                    }}
                />

                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FontAwesome5 name="arrow-left" size={24} color="#fff" style={{marginTop:64, marginLeft:32}}/>
                </TouchableOpacity>

                <Text style={{textAlign:"center",fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:32}}>Contact Us</Text>

                <View style={styles.loginContainer}>
                    
                    <Text style={{paddingTop:32, color:"#a2a2a2"}}>NAME*</Text>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({name: text})}/>

                    {/* <Text style={{paddingTop:32, color:"#a2a2a2"}}>EMAIL*</Text>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({email: text})}/> */}

                    <Text style={{paddingTop:32, color:"#a2a2a2"}}>SUBJECT</Text>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({subject: text})}/>

                    <Text style={{paddingVertical:32, color:"#a2a2a2"}}>MESSAGE*</Text>
                    <TextInput multiline={true} numberOfLines={8} textAlignVertical="top" style={styles.textarea} onChangeText={(text) => this.setState({message: text})}/>
                
                </View>

                <TouchableOpacity onPress={() => sendEmail()} style={{backgroundColor:"#FFC367", marginHorizontal:64, borderRadius:30, elevation:6, marginVertical:16, marginBottom:150}}>
                    <Text style={{fontFamily:'Montserrat-Medium' ,color:"#000", fontSize:14, paddingVertical:16, paddingHorizontal:64, textAlign:"center"}}>Send</Text>
                </TouchableOpacity>


            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"stretch",
        backgroundColor:"#262626",
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
    textarea:{
        borderWidth:1,
        borderColor:"#a2a2a2",
        padding:10,
        fontSize:14,
        color:"#fff",
        fontWeight:"bold"
    }
    
})