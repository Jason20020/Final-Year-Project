import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { auth, firestore } from "../../config/firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
      car: null,
      user: null,
    };
  }

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    await this.fetchUserData();
    this.setState((state, props) => {
      return {
        cameraRollPer: status === "granted",
        disableButton: false,
      };
    });
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

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

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
    } else {
      let base64 = await this.uriToBase64(result.uri);
      await this.toServer({
        type: result.type,
        base64: base64,
        uri: result.uri,
      });
    }
  };

  toServer = async (mediaFile) => {
    let type = mediaFile.type;
    let schema = "http://";
    let host = "172.20.10.4";
    let route = "";
    let port = "5000";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    url = schema + host + ":" + port + route;

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
    this.props.navigation.navigate('CarDetail', {car: this.state.car});
  };

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
        <View style={styles.welcome}>
          <Text style={styles.welText}>Welcome, Admin!</Text>
        </View>
        <View style={styles.viewContainer}>
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
            }}>
            <Image style={styles.logo} source={require("../../../assets/carLogo.png")}/>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welText: {
    fontSize: 32,
  },
  carButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 80,
    alignItems: 'center'
  },
  logo: {
    width: 94,
    height: 143,
  },
});
