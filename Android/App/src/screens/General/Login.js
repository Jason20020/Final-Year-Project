import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { auth, firestore } from "../../config/firebase";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (email) => {
    this.setState({ email: email })
  }

  handlePasswordChange = (password) => {
    this.setState({ password: password })
  }

  Login = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      firestore.collection("users").doc(auth.currentUser.uid).get()
      .then(user => {
        if(user.data()?.role === "user"){
          if(user.data()?.active === "Active")
          {
            this.props.navigation.replace("UserHome");
            console.log("Login Successfully")
          }
          else {
            alert("Your account had been blocked!")
          }
        }
        else {
          this.props.navigation.replace("AdminHome");
          console.log("Login Successfully")
        }
      })
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.home} source={require("../../../assets/icons8-home-50.png")}/>
        </TouchableOpacity>
        <KeyboardAvoidingView behavior="padding" style={styles.viewContainer}>
          <Text style= {styles.title}>Login</Text>
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
          <TouchableOpacity style={styles.button} onPress={this.Login}>
            <Text style={styles.login}>LOGIN</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
    marginBottom: 20,
    marginTop: -100
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
  }
});

export default Login;