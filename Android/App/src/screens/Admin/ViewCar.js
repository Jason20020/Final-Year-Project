import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { auth, firestore } from "../../config/firebase";

export default class ViewCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [],
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

  async componentDidMount() {
    await this.fetchCarData();
  }

  fetchCarData = () => {
    firestore.collection("cars").get()
    .then((querySnapshot) => {
      const cars = [];
      querySnapshot.forEach((doc) => {
        const {carID, pname, brand, fuel, model, name, price, speed, imgUri} = doc.data();
        cars.push({
          carID,
          pname,
          brand,
          fuel,
          model,
          name,
          price,
          speed,
          imgUri
        })
      })
      this.setState({cars: cars});
    })
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
          <Text style={styles.title}>Cars</Text>
        </View>
        <View style={styles.viewContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.state.cars.map((item, key) => {
                return (
                  <TouchableOpacity style={styles.box}>
                    <View style={styles.box1}>
                      <Image style={styles.img} source={{uri: item.imgUri,}}/>
                    </View>
                    <View style={styles.box2}>
                      <View style={styles.colBox}>
                        <View><Text style={styles.carID}>{item.carID}</Text></View>
                        <View><Text style={styles.text}>{item.model}</Text></View>
                        <View><Text style={styles.text}>{item.name}</Text></View>
                      </View>
                    </View>
                    <View style={styles.box3}>
                      <View style={styles.colBox}>
                        <TouchableOpacity style={styles.button} onPress={this.Login}>
                          <Text style={styles.login}>VIEW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.Login}>
                          <Text style={styles.login}>EDIT</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }       
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box2: {
    flexDirection:'row',
    flex: 2.5,
    alignItems: 'center',
  },
  box3: {
    flexDirection:'row',
    flex: 2
  },
  img: {
    width: 140,
    height: 90,
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
    fontSize: 22,
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
 