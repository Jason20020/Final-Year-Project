import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { auth, firestore } from "../../config/firebase";

export default class Profile extends Component {
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
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
                <View style={styles.header}>
          <View style={styles.headerFav}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
                <Image style={styles.fav} source={require("../../../assets/favorite.png")}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerSpac} />
          <View style={styles.headerLogout}>
            <TouchableOpacity onPress={this.handleSignOut}>
                <Image style={styles.fav} source={require("../../../assets/logout.png")}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileBox}>
                    <Text style={styles.proText}>PROFILE</Text>
                </View>
                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>First Name:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.firstName}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>Last Name:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.lastName}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>Gender:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.gender}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>Date of Birth:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.dob}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>Address1:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.address1}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>Address2:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.address2}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>City:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.city}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.left}>
                    <Text style={styles.title}>Email:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.word}>{this.state.user?.email}</Text>
                  </View>
                </View>
                <View style={styles.editButton}>
                  <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EditProfile', {user: this.state.user})}>
                    <Text style={styles.text}>EDIT PROFILE</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.homeBox}>
            <TouchableOpacity onPress={() => navigation.navigate('UserHome')}>
                <Image style={styles.home} source={require("../../../assets/icons8-home-50.png")}/>
            </TouchableOpacity>
          </View>
          <View style={styles.profileBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image style={styles.home} source={require("../../../assets/profile.png")}/>
            </TouchableOpacity>
          </View>
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
  viewContainer: {
    flex: 9,
    backgroundColor: '#F3DBDB',
    margin: 12,
    borderRadius: 10,
  },
  profileBox: {
    backgroundColor: '#F3DBDB',
  },
  proText: {
    fontSize: 32,
    margin: 20
  },
  button: {
    backgroundColor: '#DEB27C',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    paddingTop: 3, 
    paddingBottom: 3,
    marginBottom: 15
  },
  text: {
    fontSize: 20,
    color: '#FFFEFE'
  },
  footer: {
    flex: 1,
    backgroundColor: '#FFE999',
    flexDirection:'row',
    borderRadius: 10,
  },
  home: {
    height: 35,
    width: 35,
  },
  homeBox: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBox: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  details: {
    flex: 1,
    flexDirection:'row',
    margin: 15
  },
  left: {
    flex: 1,
    flexDirection:'row',
    marginLeft: 20
  },
  right: {
    flex: 1,
    flexDirection:'row'
  },
  title: {
    fontSize: 20,
    color: '#434343'
  },
  word: {
    fontSize: 20,
    color: '#0C0C0C'
  },
  editButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
