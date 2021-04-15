import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialIcons,MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Event extends React.Component{

    state={
        isModalVisible:false,
        name:"",
        email:"",
        address:"",
        phone:"",
        users:[],
    }

    componentDidMount(){
        firebase.firestore().collection("Users").get().then((snapshot) => {
            let users = [];
            snapshot.docs.forEach((doc) => {
                users.push({id:doc.id, ...doc.data()});
            })
            this.setState({users})
        })
    }

    ToggleVisibility = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
        })
    }

    join = () => {
        if(this.state.name !== null && this.state.email !== null && this.state.address !== null && this.state.phone !== null){
            firebase.firestore().collection("Users").add({
                Name: this.state.name,
                Email: this.state.email,
                Address: this.state.address,
                Phone: this.state.phone,
                hasJoined: true,
            })
            alert("You have Joined this Event!");
        }else{
            alert("PleaseEnter the fields correctly");
        }
    }

    render(){

        const event = this.props.event;
        const imageURL = this.props.imageURL;
        const index = this.props.index;

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

                        <ScrollView>
                           
                            <ImageBackground source={{uri: imageURL[index].data }} style={{width:380, height:250}} >
                   
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <View style={{padding:16, backgroundColor:"#FFC367", width:80, marginLeft:16}}>
                                        <Text style={{fontSize:14, color:"#000", textAlign:"center", fontWeight:"bold"}}> {event[index].Date} </Text>
                                        {/* <Text style={{fontSize:12, color:"#000", textAlign:"center", fontWeight:"bold"}}>{arr1[1]+", "+arr1[2]}</Text> */}
                                    </View>

                                    <TouchableOpacity onPress={this.props.closeModal} style={{paddingRight:32, paddingTop:16,}}>
                                        <AntDesign name="close" size={24} color="#fff" />
                                    </TouchableOpacity>

                                </View>

                            </ImageBackground>

                            <Text style={{fontFamily:'Montserrat-Medium' ,color:"#fff", padding:16, fontSize:22}}> {event[index].Title} </Text>

                            <View style={{flexDirection:"row", paddingVertical:10, marginHorizontal:16}}>
                                <MaterialIcons name="location-on" size={20} color="#FFC367" />
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", fontSize:14, paddingLeft:16}}> {event[index].Loc} </Text>
                            </View>
                            <View style={{flexDirection:"row", paddingVertical:10, marginHorizontal:16}}>
                                <MaterialCommunityIcons name="calendar-check" size={20} color="#FFC367" />
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", fontSize:14, paddingLeft:16}}> {event[index].Date} </Text>
                            </View>
                            <View style={{flexDirection:"row", paddingVertical:16, marginHorizontal:16}}>
                                <MaterialCommunityIcons name="update" size={20} color="#FFC367" />
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", fontSize:14, paddingLeft:16}}> {event[index].Time} </Text>
                            </View>

                            <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:24, paddingTop:48, paddingLeft:16}}>About</Text>
                            <Text style={{fontFamily:'Montserrat-Medium' ,color:"#9C9C9C", fontSize:14, padding:16}}> {event[index].Desc} </Text>
                        

                                <View>
                                    <TouchableOpacity style={{backgroundColor:"#FFC367", 
                                        marginHorizontal:64, 
                                        borderRadius:30, 
                                        elevation:6, 
                                        marginTop:16,
                                        marginBottom:150
                                        }} onPress={this.ToggleVisibility}>
                                        <Text style={{fontFamily:'Montserrat-Medium' ,color:"#000", fontSize:14, padding:16, textAlign:"center"}}>Join</Text>
                                    </TouchableOpacity>
                                </View>  
                        
                        </ScrollView>
                       
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

                            <View style={styles.loginContainer}>
                                
                                <Text style={{paddingTop:32, color:"#a2a2a2"}}>NAME*</Text>
                                <TextInput style={styles.input} onChangeText={(text) => this.setState({name: text})}/>

                                <Text style={{paddingTop:32, color:"#a2a2a2"}}>EMAIL*</Text>
                                <TextInput style={styles.input} onChangeText={(text) => this.setState({email: text})}/>

                                <Text style={{paddingTop:32, color:"#a2a2a2"}}>ADDRESS</Text>
                                <TextInput style={styles.input} onChangeText={(text) => this.setState({address: text})}/>

                                <Text style={{paddingTop:32, color:"#a2a2a2"}}>PHONE NO.</Text>
                                <TextInput style={styles.input} onChangeText={(text) => this.setState({phone: text})}/>
                            
                            </View>

                            <TouchableOpacity onPress={() => this.join} style={{backgroundColor:"#FFC367", marginHorizontal:64, borderRadius:30, elevation:6, marginVertical:16, marginBottom:80}}>
                                <Text style={{fontFamily:'Montserrat-Medium' ,color:"#000", fontSize:14, padding:16, textAlign:"center"}}>Join Event</Text>
                            </TouchableOpacity>


                       </View>

                   </Modal>
               </View>

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
    
})