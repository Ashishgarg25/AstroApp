import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import * as firebase from 'firebase';

import * as WebBrowser from 'expo-web-browser';

export default class VideoScreen extends React.Component{
      
  state = {
    item:[],
    videoURL:[],
    videoID:[],
}

componentDidMount(){
    var StorageRef = firebase.storage().ref().child("Videos/");
    StorageRef.listAll().then((res) => {
        let item = [];
        let videoURL=[];
        res.prefixes.forEach((folderRef) => {
            folderRef.listAll().then((itemRef) => {
                itemRef.items.forEach((items) => {

                  items.getDownloadURL().then((data) => {
                    videoURL.push({data});
                    this.setState({
                      videoURL
                    })
                  })

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

    fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyD-SdOCXoNByNfx6XpfBdEeJ2t-Zbj4ZL8&channelId=UCMvGj5ibhg4ICQHVhhnJFvA&part=snippet,id&order=date&maxResults=5", {
      method: 'GET'
      //Request Type 
  })
  .then((response) => response.json())
  //If response is in json then in success
  .then((responseJson) => {
      //Success 
      let videoID = [...this.state.videoID];
      responseJson.items.map(item => {
        videoID.push({
          id: item.id.videoId,
          title: item.snippet.title,
          src: item.snippet.thumbnails.medium.url
        })

        this.setState({
          videoID
        })
      })

  })
  //If response is not in json then in error
  .catch((error) => {
      //Error 
      console.error(error);
  });
   

}

playVideo = (videoLink) => {
    WebBrowser.openBrowserAsync("https://www.youtube.com/watch?v="+videoLink);
}


renderList = (item,index) => {

  const date = new Date(item.timeCreated);
  const mdate = date.toString().split(" ");
  const uploadDate = mdate[1] + " " + mdate[2] + ", " + mdate[3];

  return(
    <TouchableOpacity onPress={ () => this.playVideo(item.id) }>
      {/* {this.state.videoID.map(videoLink => ( */}
        <View style={{marginVertical:15}} >
          <Image source={{uri: item.src}} style={{ width: 380, height: 200 }}
          />
          <Text numberOfLines={2} ellipsizeMode="tail" style={{fontFamily:'Montserrat-Medium' ,color:"#fff", paddingTop:10, paddingHorizontal:16, fontSize:16, paddingBottom:10}}> {item.title} </Text>
      </View>
      {/* ))} */}
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

              <View style={{marginTop:32}}>
                <Text style={{fontFamily: 'Nordik-Bold' ,color:"#FFC367", fontSize:32, alignSelf:"center"}}>Videos</Text>
              </View>
              
                  <View style={{height:630}} >
                      <FlatList
                          data={this.state.videoID}
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