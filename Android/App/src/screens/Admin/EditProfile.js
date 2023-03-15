import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  View
} from "react-native";
import { auth } from "../../config/firebase";
import { firestore } from "../../config/firebase";
import DateTimePicker from '@react-native-community/datetimepicker'
import { SelectList } from 'react-native-dropdown-select-list'

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.route.params.user?.firstName,
      lastName: this.props.route.params.user?.lastName,
      gender: this.props.route.params.user?.gender,
      dob: this.props.route.params.user?.dob,
      address1: this.props.route.params.user?.address1,
      address2: this.props.route.params.user?.address2,
      city: this.props.route.params.user?.city,
      email: this.props.route.params.user?.email,
      password: this.props.route.params.user?.firstName,

      show: false,
      date: new Date()
    };
  }

  handleFirstNameChange = (firstName) => {
    this.setState({ firstName: firstName })
  }

  handleLastNameChange = (lastName) => {
    this.setState({ lastName: lastName })
  }

  handleGenderChange = (gender) => {
    this.setState({ gender: gender })
  }

  handleDOBChange = (event, dob) => {
    const currentDate = dob || date;
    this.setState({ show: false })
    this.setState({ date: currentDate });
    let date = new Date(currentDate);
    let fDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    this.setState({ dob: fDate });
  }

  handleAddress1Change = (address1) => {
    this.setState({ address1: address1 })
  }

  handleAddress2Change = (address2) => {
    this.setState({ address2: address2 })
  }

  handleCityChange = (city) => {
    this.setState({ city: city })
  }

  handlePasswordChange = (password) => {
    this.setState({ password: password })
  }

  handleEditUser = () => {
    firestore.collection("users").doc(this.props.route.params.user?.userID).set({
      userID: this.props.route.params.user?.userID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      dob: this.state.dob,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      email: this.state.email,
      role: "user",
      active: "Active"
    })
    .catch(error => alert(error.message))
    this.props.navigation.navigate('ViewUser')
  }

  showDatePicker = () => {
    this.setState({ show: true })
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
    const data = [
      {key:'1', value:'Male'},
      {key:'2', value:'Female'},
    ]

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
        <View style={styles.viewContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView behavior="padding" style={styles.viewContainer}>
            <Text style= {styles.title}>Edit Profile</Text>

            <Text style= {styles.text}>Email:</Text>
            <TextInput 
              style={styles.textbox} 
              placeholder= 'Enter Email'
              value={this.state.email}
              editable={false} 
              selectTextOnFocus={false}
            />

            <Text style= {styles.text}>First Name:</Text>
            <TextInput 
              style={styles.textbox} 
              placeholder= 'Enter First Name'
              onChangeText={this.handleFirstNameChange} 
              value={this.state.firstName}
            />

            <Text style= {styles.text}>Last Name:</Text>
            <TextInput 
              style={styles.textbox} 
              placeholder= 'Enter Last Name'
              onChangeText={this.handleLastNameChange} 
              value={this.state.lastName}
            />

            <Text style= {styles.text}>Gender:</Text>
            <SelectList 
              boxStyles={styles.selectBox}
              setSelected={this.handleGenderChange} 
              data={data} 
              save="value"
              defaultOption={{ key: this.state.gender, value: this.state.gender}}
            />

            <Text style= {styles.text}>Date of Birth:</Text>
            <Text style= {styles.dateBox}>{this.state.dob}</Text>
            <TouchableOpacity style={styles.dateBtn} onPress={this.showDatePicker}>
              <Text style={styles.login}>Pick Date</Text>
            </TouchableOpacity>

            {this.state.show && (
              <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode="date"
              is24Hour={true}
              display='default'
              onChange={this.handleDOBChange}
              />
            )}

            <Text style= {styles.text}>Address 1:</Text>
            <TextInput 
              style={styles.textbox} 
              placeholder= 'Enter Address 1'
              onChangeText={this.handleAddress1Change} 
              value={this.state.address1}
            />

            <Text style= {styles.text}>Address 2:</Text>
            <TextInput 
              style={styles.textbox} 
              placeholder= 'Enter Address 2'
              onChangeText={this.handleAddress2Change} 
              value={this.state.address2}
            />

            <Text style= {styles.text}>City:</Text>
            <TextInput 
              style={styles.textbox} 
              placeholder= 'Enter City'
              onChangeText={this.handleCityChange} 
              value={this.state.city}
            />

            <TouchableOpacity style={styles.button} onPress={this.handleEditUser}>
              <Text style={styles.login}>EDIT</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
  viewContainer: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection:'row',
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
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  home: {
    marginLeft: 30,
    marginTop: 40,
    height: 35,
    width: 35
  },
  text: {
    fontSize: 20,
    color: '#434343',
    marginBottom: 8
  },
  textbox: {
    backgroundColor: '#DFDEDE',
    borderRadius: 6,
    height: 38,
    width: 174,
    marginBottom: 20,
    padding: 5
  },
  button: {
    backgroundColor: '#DEB27C',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    paddingTop: 3, 
    paddingBottom: 3,
    marginTop: 10
  },
  login: {
    fontSize: 20,
    color: '#FFFEFE'
  },
  dateBtn: {
    backgroundColor: '#0000FF',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    paddingTop: 3, 
    paddingBottom: 3,
    marginBottom: 10
  },
  dateBox: {
    backgroundColor: '#DFDEDE',
    borderRadius: 6,
    height: 38,
    width: 174,
    marginBottom: 20,
    padding: 5,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBox: {
    backgroundColor: '#DFDEDE',
    borderRadius: 6,
    height: 45,
    width: 174,
    marginBottom: 20,
    padding: 5
  }
});

export default EditProfile;