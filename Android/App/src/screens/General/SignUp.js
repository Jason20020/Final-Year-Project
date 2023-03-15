import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { auth } from "../../config/firebase";
import { firestore } from "../../config/firebase";
import DateTimePicker from '@react-native-community/datetimepicker'
import { SelectList } from 'react-native-dropdown-select-list'

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      address1: '',
      address2: '',
      city: '',
      email: '',
      password: '',

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

  handleEmailChange = (email) => {
    this.setState({ email: email })
  }

  handlePasswordChange = (password) => {
    this.setState({ password: password })
  }

  handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        firestore.collection("users").doc(auth.currentUser.uid).set({
          userID: auth.currentUser.uid,
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
        const user = userCredentials.user;
        console.log(user.email);
        this.props.navigation.navigate('Login')
      })
      .catch(error => alert(error.message))
  }

  showDatePicker = () => {
    this.setState({ show: true })
  }


  render() {
    const { navigation } = this.props;
    const data = [
      {key:'1', value:'Male'},
      {key:'2', value:'Female'},
    ]

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.home} source={require("../../../assets/icons8-home-50.png")}/>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding" style={styles.viewContainer}>
          <Text style= {styles.title}>Sign Up</Text>

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

          <Text style= {styles.text}>Email:</Text>
          <TextInput 
            style={styles.textbox} 
            placeholder= 'Enter Email'
            onChangeText={this.handleEmailChange} 
            value={this.state.email}
          />

          <Text style= {styles.text}>Password:</Text>
          <TextInput 
            style={styles.textbox} 
            placeholder= 'Enter Password'
            onChangeText={this.handlePasswordChange} 
            value={this.state.password}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.login}>SIGN UP</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
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
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default SignUp;