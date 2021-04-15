import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Modal, FlatList, ActivityIndicator} from 'react-native';
import React from 'react'
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Event from '../Component/Event';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class EventScreen extends React.Component{

    state={
        isModalVisible:false,
        item:[],
        eventInfo:[],
        imageURL:[],
        index:null,
    }

    componentDidMount(){
        var StorageRef = firebase.storage().ref().child("EventImages/");
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
                        
                        items.getDownloadURL().then(data => {
                            let imageURL = [...this.state.imageURL];
                            imageURL.push({data})
                            this.setState({
                                imageURL
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

        firebase.firestore().collection("EventInfo").get().then((snapshot) => {
            let eventInfo = [];
            snapshot.docs.forEach((doc) => {
                eventInfo.push({id:doc.id, ...doc.data()});
                this.setState({eventInfo})
            })
        })
      }

      ToggleVisibility = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    openEventModal = (index) => {
        
        this.setState({index})
        this.ToggleVisibility();
    }


    renderList = (item, index) => {

        const event = this.state.eventInfo;
        const imageURL = this.state.imageURL;

        return(
            
            <TouchableOpacity style={{borderBottomWidth:10}} onPress={() => this.openEventModal(index)}>
                                
                    <View>
                        <ImageBackground source={{uri: imageURL[index] !== undefined ? imageURL[index].data : "" }} style={{width:400, height:200}}>
                        <View style={{padding:16, backgroundColor:"#FFC367", width:90, marginLeft:16}}>
                                <Text style={{fontSize:14, color:"#000", textAlign:"center", fontWeight:"bold"}}> {event[index].Date}  </Text>
                        </View>

                        <LinearGradient
                        colors={['transparent', 'rgba(1,1,1,0.5)']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 50,
                            height:150,
                        }} >
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:100, paddingHorizontal:16, fontSize:22}}> {item.name} </Text>
                        </LinearGradient>
                        
                        </ImageBackground>
                    </View>
               
            </TouchableOpacity>
           
        )
    }
      
      render(){
        return(
            <View style={styles.container} >

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

              <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:32, alignSelf:"center", marginTop:64, paddingBottom:16}}>Events</Text>
             
                <View style={{height:590}} >
                    <FlatList
                        data={this.state.item}
                        keyExtractor={item => item.fullPath}
                        renderItem={({item, index}) => this.renderList(item, index)}
                    />
                </View>


             <View>
                <Modal
                    animationType="slide"
                    visible={this.state.isModalVisible}
                    onRequestClose={() => this.ToggleVisibility()}
                    >
                    <Event closeModal={() => this.ToggleVisibility()} index={this.state.index} event={this.state.eventInfo} eventMetaData={this.state.item} imageURL = {this.state.imageURL} />

                </Modal>
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