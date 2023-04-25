import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import Loader from "../../component/Loader";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
      car: null,
      loader: false
    };
  }

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState((state, props) => {
      return {
        cameraRollPer: status === "granted",
        disableButton: false,
      };
    });
  }

  pickMedia = async () => {
    this.setState((state, props) => {
      return {
        cameraRollPer: state.cameraRollPer,
        disableButton: true,
      };
    });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (result.cancelled) {
      return;
    }
    if (result.type == "image") {
      await this.toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
    }
  };

  toServer = async (mediaFile) => {
    this.setState({ loader: true })
    let type = mediaFile.type;
    let schema = "https://";
    let host = "final-project-9dfc4.ew.r.appspot.com";
    let route = "";
    let port = "";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    url = schema + host + port + route;

    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    console.log(response.headers);
    console.log(response.body);
    this.setState((state, props) => {
      return {
        car: response.body
      };
    })
    this.props.navigation.navigate('Result', {car: this.state.car});
    this.setState({ loader: false })
  };


  render() {
    return (
      <>
      <SafeAreaView style={styles.container} testID="generalHome">
        <View style={styles.viewContainer}>
        <Text></Text>
          <TouchableOpacity 
            style={styles.carButton} 
            disabled={this.state.disableButton}
            onPress={async () => {
              await this.pickMedia();
              this.setState((s, p) => {
                return {
                  cameraRollPer: s.cameraRollPer,
                  disableButton: false,
                };
              });
            }}
            testID="logoButton"
            >
            <Image style={styles.logo} source={require("../../../assets/carLogo.png")}/>
          </TouchableOpacity>
          <TouchableOpacity testID="loginButton" style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="signUpButton" onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.text}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {this.state.loader ? <Loader/> : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE0B',
    justifyContent: 'center',
    fontSize: 20
  },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 5,
    alignItems: 'center'
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
  logo: {
    width: 94,
    height: 143,
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  text: {
    fontSize: 20,
    color: '#FFFEFE'
  }
});
