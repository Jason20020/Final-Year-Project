import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { auth, firestore } from "../../config/firebase";
import Loader from "../../component/Loader";
import { Camera } from 'expo-camera';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
      car: null,
      user: null,
      loader: false
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

    const { cameraStatus } = await Camera.requestCameraPermissionsAsync();
    this.setState((state, props) => {
      return {
      cameraPer: cameraStatus === "granted",
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
    if (result.canceled) {
      this.setState((state, props) => {
        return {
          cameraRollPer: state.cameraRollPer,
          disableButton: false,
        };
      });
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

  takePhoto = async () => {
    this.setState((state, props) => {
      return {
        cameraPer: state.cameraPer,
        disableButton: true,
      };
    });

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (result.canceled) {
      this.setState((state, props) => {
        return {
          cameraPer: state.cameraPer,
          disableButton: false,
        };
      });
      return;
    }
    await this.toServer({
      type: "image",
      base64: result.base64,
      uri: result.uri,
    });
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
    this.props.navigation.navigate('Result', {car: this.state.car, user: this.state.user});
    this.setState({ loader: false, disableButton: false })
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

  showMediaOptionsAlert() {
    Alert.alert(
      "Choose an option",
      "Would you like to pick media or take a photo?",
      [
        {
          text: "Pick Media",
          onPress: () => this.pickMedia(),
        },
        {
          text: "Take Photo",
          onPress: () => this.takePhoto(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerFav}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
                <Image style={styles.fav} source={require("../../../assets/favorite.png")}/>
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
        <View style={styles.welcome}>
          <Text style={styles.welText}>Welcome, {this.state.user?.firstName}!</Text>
        </View>
        <View style={styles.viewContainer}>
          <TouchableOpacity 
            style={styles.carButton} 
            disabled={this.state.disableButton}
            onPress={() => {
              this.showMediaOptionsAlert();
              this.setState((s, p) => {
                return {
                  cameraRollPer: s.cameraRollPer,
                  cameraPer: s.cameraPer,
                  disableButton: false,
                };
              });
            }}
            testID="logoButton"
            >
            <Image style={styles.logo} source={require("../../../assets/carLogo.png")}/>
          </TouchableOpacity>
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
      {this.state.loader ? <Loader/> : null}
      </>
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
    flex: 0.8,
    flexDirection:'row'
  },
  fav: {
    marginLeft: 30,
    marginTop: 40,
    height: 35,
    width: 35
  },
  viewContainer: {
    flex: 7,
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
  footer: {
    flex: 1,
    backgroundColor: '#FFE999',
    flexDirection:'row',
    borderRadius: 10,
    borderColor: 'black'
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
  }
});
