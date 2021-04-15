import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ToastAndroid, CameraRoll } from 'react-native';
import React from 'react'
import { AntDesign,MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';

import * as WebBrowser from 'expo-web-browser';

export default class FileScreen extends React.Component{

    state = {
        item:[],
    }

    componentDidMount(){
        var StorageRef = firebase.storage().ref().child("Files/");
        StorageRef.listAll().then((res) => {
            let item = [];
            res.prefixes.forEach((folderRef) => {
                folderRef.listAll().then((itemRef) => {
                    itemRef.items.forEach((items) => {
                        items.getMetadata().then((metaData) => {
                            item.push({...metaData});
                            this.setState({
                                item
                            })
                        })
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
            })
        })
        .catch((error) => {
            console.log(error);
        })

    }

    downloadFile = (item) => {
      
        var StorageRef = firebase.storage().ref().child(item.fullPath);
        StorageRef.getDownloadURL().then((data) => {
           
            WebBrowser.openBrowserAsync(data);
            
              
        })
    }

   renderList = (item,index) => {

    const date = new Date(item.timeCreated);
    const mdate = date.toString().split(" ");
    const uploadDate = mdate[1] + " " + mdate[2] + ", " + mdate[3];

    return(
        <TouchableOpacity style={{flexDirection:"row", padding:16, marginLeft:32}} onPress={() => this.downloadFile(item)}>
            <Image source={require('../assets/Images/google-docs.png')} style={{width:65, height:90, borderRadius:16}}/>
            <View>
                <Text style={{color:"#fff", fontFamily:"Montserrat-Medium", paddingHorizontal:16, paddingVertical:3}}> {item.name} </Text>
                <Text style={{color:"#fff", fontFamily:"Montserrat-Medium", paddingHorizontal:16, paddingVertical:3}}> {uploadDate} </Text>
                <Text style={{color:"#fff", fontFamily:"Montserrat-Medium", paddingHorizontal:16, paddingVertical:3}}> {Math.round(item.size/1000)} KB </Text>
            </View>
        </TouchableOpacity>
    )
   }

    render(){


        return(
            <View style={styles.container}>

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

                <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:32, alignSelf:"center", marginTop:84, paddingBottom:16}}>Files</Text>
                
                    <View style={{height:570}} >
                        <FlatList
                            data={this.state.item}
                            keyExtractor={item => item.fullPath}
                            renderItem={({item, index}) => this.renderList(item, index)}
                        />
                    </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"stretch",
        backgroundColor:"#262626",
    },
    
})