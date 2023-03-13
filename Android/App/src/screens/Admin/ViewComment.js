import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { auth, firestore } from "../../config/firebase";

export default class ViewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
      car: null,
      user: null,
    };
  }

  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.replace("Home");
        console.log("Logout Successfully")
      })
      .catch(error => alert(error.message))
  }


  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerFav}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image style={styles.fav} source={require("../../../assets/menu.png")}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerSpac} />
          <View style={styles.headerLogout}>
            <TouchableOpacity onPress={this.handleSignOut}>
                <Image style={styles.fav} source={require("../../../assets/logout.png")}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputBox}>
            <TextInput 
                style={styles.textbox} 
                placeholder= 'Search...'
            />
        </View>
        <View style={styles.favorite}>
          <Text style={styles.title}>Comments</Text>
        </View>
        <View style={styles.viewContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/male.png")}/>
              </View>
              <View style={styles.box2}>
                <View style={styles.colBox}>
                  <View><Text style={styles.carID}>C0001</Text></View>
                  <View><Text style={styles.text}>Jason Jing</Text></View>
                  <View><Text style={styles.text}>Ferrari 458</Text></View>
                  <View><Text style={styles.text}>The Car is ...</Text></View>
                </View>
              </View>
              <View style={styles.box3}>
                <View style={styles.colBox}>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>VIEW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>HIDE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/female.png")}/>
              </View>
              <View style={styles.box2}>
              <View style={styles.colBox}>
                  <View><Text style={styles.carID}>C0001</Text></View>
                  <View><Text style={styles.text}>Jason Jing</Text></View>
                  <View><Text style={styles.text}>Ferrari 458</Text></View>
                  <View><Text style={styles.text}>The Car is ...</Text></View>
                </View>
              </View>
              <View style={styles.box3}>
                <View style={styles.colBox}>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>VIEW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>HIDE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/male.png")}/>
              </View>
              <View style={styles.box2}>
              <View style={styles.colBox}>
                  <View><Text style={styles.carID}>C0001</Text></View>
                  <View><Text style={styles.text}>Jason Jing</Text></View>
                  <View><Text style={styles.text}>Ferrari 458</Text></View>
                  <View><Text style={styles.text}>The Car is ...</Text></View>
                </View>
              </View>
              <View style={styles.box3}>
                <View style={styles.colBox}>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>VIEW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>HIDE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/female.png")}/>
              </View>
              <View style={styles.box2}>
              <View style={styles.colBox}>
                  <View><Text style={styles.carID}>C0001</Text></View>
                  <View><Text style={styles.text}>Jason Jing</Text></View>
                  <View><Text style={styles.text}>Ferrari 458</Text></View>
                  <View><Text style={styles.text}>The Car is ...</Text></View>
                </View>
              </View>
              <View style={styles.box3}>
                <View style={styles.colBox}>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>VIEW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>HIDE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/male.png")}/>
              </View>
              <View style={styles.box2}>
              <View style={styles.colBox}>
                  <View><Text style={styles.carID}>C0001</Text></View>
                  <View><Text style={styles.text}>Jason Jing</Text></View>
                  <View><Text style={styles.text}>Ferrari 458</Text></View>
                  <View><Text style={styles.text}>The Car is ...</Text></View>
                </View>
              </View>
              <View style={styles.box3}>
                <View style={styles.colBox}>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>VIEW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={this.Login}>
                    <Text style={styles.login}>HIDE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE0B',
    fontSize: 20
  },
  header: {
    flex: 1,
    flexDirection:'row'
  },
  headerFav: {
    flex: 1,
    flexDirection:'row'
  },
  headerSpac: {
    flex: 2
  },
  headerLogout: {
    flex: 1,
    flexDirection:'row'
  },
  fav: {
    marginLeft: 30,
    marginTop: 40,
    height: 35,
    width: 35
  },
  favorite: {
    marginLeft: 25,
    marginBottom: 15
  },
  viewContainer: {
    flex: 7,
  },
  title: {
    fontSize: 32
  },
  box: {
    backgroundColor: '#E9E1E1',
    flexDirection:'row',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 120,
    borderRadius: 10
  },
  box1: {
    flexDirection:'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box2: {
    flexDirection:'row',
    flex: 3,
    alignItems: 'center',
  },
  box3: {
    flexDirection:'row',
    flex: 1.5
  },
  img: {
    maxWidth: 140,
    maxHeight:100,
    borderRadius: 5
  },
  favIcon: {
    margin: 10,
    maxHeight: 30,
    maxWeigth: 30,
  },
  inputBox: {
    marginLeft: 25,
    marginRight: 25
  },
  textbox: {
    backgroundColor: '#DFDEDE',
    borderRadius: 6,
    height: 45,
    marginBottom: 20,
    padding: 5,
    font: 24
  },
  text: {
    fontSize: 22,
  },
  carID: {
    fontSize: 20,
    color: "#5E5C5C"
  },
  colBox: {
    flexDirection:'column',    
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#DEB27C',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10
  },  
  login: {
    fontSize: 20,
    color: '#FFFEFE'
  }
});
