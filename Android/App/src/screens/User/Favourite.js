import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { auth, firestore } from "../../config/firebase";


export default class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    await this.fetchUserData();
  }

  fetchUserData = () => {
    firestore.collection("users").doc(auth.currentUser.uid).get()
    .then(user => {
      this.setState((state, props) => {
        return {
          user: user.data()
        };
      });
    })
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
    const {navigation} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerFav}>
            <TouchableOpacity onPress={() => navigation.navigate('UserHome')}>
                <Image style={styles.fav} source={require("../../../assets/icons8-home-50.png")}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerSpac}>
            <Text style={styles.title}>{this.state.user?.firstName}</Text>
          </View>
          <View style={styles.headerLogout}>
            <TouchableOpacity onPress={this.handleSignOut}>
                <Image style={styles.fav} source={require("../../../assets/logout.png")}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.favorite}>
          <Text style={styles.title}>Favorites</Text>
        </View>
        <View style={styles.viewContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/carphoto.png")}/>
              </View>
              <View style={styles.box2}>
                <Text style={styles.text}>Ferrari</Text>
                <Text style={styles.text}>458</Text>
              </View>
              <View style={styles.box3}>
                <Image style={styles.favIcon} source={require("../../../assets/favorite.png")}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/carphoto.png")}/>
              </View>
              <View style={styles.box2}>
                <Text style={styles.text}>Ferrari</Text>
                <Text style={styles.text}>458</Text>
              </View>
              <View style={styles.box3}>
                <Image style={styles.favIcon} source={require("../../../assets/favorite.png")}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/carphoto.png")}/>
              </View>
              <View style={styles.box2}>
                <Text style={styles.text}>Ferrari</Text>
                <Text style={styles.text}>458</Text>
              </View>
              <View style={styles.box3}>
                <Image style={styles.favIcon} source={require("../../../assets/favorite.png")}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/carphoto.png")}/>
              </View>
              <View style={styles.box2}>
                <Text style={styles.text}>Ferrari</Text>
                <Text style={styles.text}>458</Text>
              </View>
              <View style={styles.box3}>
                <Image style={styles.favIcon} source={require("../../../assets/favorite.png")}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.img} source={require("../../../assets/carphoto.png")}/>
              </View>
              <View style={styles.box2}>
                <Text style={styles.text}>Ferrari</Text>
                <Text style={styles.text}>458</Text>
              </View>
              <View style={styles.box3}>
                <Image style={styles.favIcon} source={require("../../../assets/favorite.png")}/>
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
    flexDirection:'row',
    backgroundColor: "#FFE999"
  },
  headerFav: {
    flex: 1,
    flexDirection:'row'
  },
  headerSpac: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
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
    marginTop: 20,
    marginLeft: 25,
    marginBottom: 15
  },
  viewContainer: {
    flex: 7,
  },
  text: {
    fontSize: 20,
    flex: 1,
    flexDirection:'column',
  },
  home: {
    height: 35,
    width: 35
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
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box2: {
    flexDirection:'row',
    flex: 4,
    alignItems: 'center',
  },
  box3: {
    flexDirection:'row',
    flex: 1.5
  },
  img: {
    maxWidth: 140,
    maxHeight: 90,
    borderRadius: 5
  },
  favIcon: {
    margin: 10,
    maxHeight: 30,
    maxWeigth: 30,
  }
});
