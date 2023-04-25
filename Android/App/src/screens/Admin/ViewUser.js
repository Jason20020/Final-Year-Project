import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { auth, firestore } from "../../config/firebase";

export default class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchUser: ''
    };
  }

  async componentDidMount() {
    await this.fetchUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the state has changed and reload the data if necessary
    if (prevState.users !== this.state.users && this.state.searchUser == '') {
      this.fetchUserData();
    }
  }

  handleSearch = (query) => {
    // Update the searchQuery state and filter the users
    const filteredUsers = this.state.users.filter((user) =>
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ searchUser: query, users: filteredUsers });
  };

  fetchUserData = () => {
    firestore.collection("users").get()
    .then((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const {firstName, lastName, gender, role, email, dob, city, address1, address2, active} = doc.data();
        if(role == "user") 
          users.push({
            userID: doc.id,
            firstName,
            lastName,
            gender,
            role,
            email,
            dob,
            city,
            address1,
            address2,
            active
          })
      })
      this.setState({users: users});
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

  handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= 0) {
      this.fetchUserData();
    }
  };

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
            <TouchableOpacity onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Yes", onPress: () => this.handleSignOut() }
                ],
                { cancelable: false }
              );
            }}
            >
              <Image style={styles.fav} source={require("../../../assets/logout.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputBox}>
            <TextInput 
                style={styles.textbox} 
                placeholder= 'Search...'
                value={this.state.searchUser}
                onChangeText={this.handleSearch}
            />
        </View>
        <View style={styles.favorite}>
          <Text style={styles.title}>Users</Text>
        </View>
        <View style={styles.viewContainer}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
          {
            this.state.users.map((item, key) => {
              return (
              <View style={styles.box} key={key}>
                <View style={styles.box1}>
                  <Image style={styles.img} source={item.gender == "Male" ? require("../../../assets/male.png") : require("../../../assets/female.png")}/>
                </View>
                <View style={styles.box2}>
                  <View style={styles.colBox}>
                    <View><Text style={styles.carID}>{item.city}</Text></View>
                    <View><Text style={styles.text}>{item.firstName}</Text></View>
                    <View><Text style={styles.text}>{item.lastName}</Text></View>
                  </View>
                </View>
                <View style={styles.box3}>
                  <View style={styles.colBox}>
                  <View><Text style={styles.active}>{item.active}</Text></View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile', {user: item})}>
                      <Text style={styles.login}>VIEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile', {user: item})}>
                      <Text style={styles.login}>EDIT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
    maxHeight: 100,
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
  },
  active: {
    fontSize: 20,
    color: "#9B9999",
    marginBottom: 5
  }
});
