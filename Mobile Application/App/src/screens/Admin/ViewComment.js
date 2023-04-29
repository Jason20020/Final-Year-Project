import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { auth, firestore } from "../../config/firebase";

export default class ViewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentList: [],
      searchComment: ''
    };
  }

  async componentDidMount() {
    await this.fetchCommentData();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the state has changed and reload the data if necessary
    if (prevState.commentList !== this.state.commentList && this.state.searchComment == '') {
      this.fetchCommentData();
    }
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

  handleSearch = (query) => {
    // Update the searchQuery state and filter the users
    const filteredComments = this.state.commentList.filter((comment) =>
      comment.userFirstName.toLowerCase().includes(query.toLowerCase()) ||
      comment.comment.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ searchComment: query, commentList: filteredComments });
  };

  fetchCommentData = () => {
    firestore.collection("comments").orderBy("carID").get()
    .then((querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        const { carID, imgUri, carModel, carName, comment, rate, userFirstName, gender, userID, status } = doc.data();
        comments.push({
          commentID: doc.id,
          carID,
          imgUri,
          carModel,
          carName,
          comment,
          rate,
          userFirstName,
          gender,
          userID,
          status
        })
      })
      this.setState({commentList: comments});
    })
  }

  handleCommentStatus = (item) => {
    if(item.status == "Show"){
      firestore.collection("comments").doc(item.commentID).set({
        userID: item.userID,
        userFirstName: item.userFirstName,
        carID: item.carID,
        carModel: item.carModel,
        carName: item.carName,
        imgUri: item.imgUri,
        comment: item.comment,
        rate: item.rate,
        gender: item.gender,
        status: "Hide"
      })
      .catch(error => alert(error.message))
    }
    else {
      firestore.collection("comments").doc(item.commentID).set({
        userID: item.userID,
        userFirstName: item.userFirstName,
        carID: item.carID,
        carModel: item.carModel,
        carName: item.carName,
        imgUri: item.imgUri,
        comment: item.comment,
        rate: item.rate,
        gender: item.gender,
        status: "Show"
      })
      .catch(error => alert(error.message))
    }
    this.props.navigation.navigate('Comment')
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
                value={this.state.searchComment}
                onChangeText={this.handleSearch}
            />
        </View>
        <View style={styles.favorite}>
          <Text style={styles.title}>Comments</Text>
        </View>
        <View style={styles.viewContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.commentList.map((item, key) => {
              return (
                <View style={styles.box} key={key}>
                  <View style={styles.box1}>
                    <Image style={styles.img} source={item.gender == "Male" ? require("../../../assets/male.png") : require("../../../assets/female.png")}/>
                  </View>
                  <View style={styles.box2}>
                    <View style={styles.colBox}>
                      <View><Text style={styles.carID}>{item.carID}</Text></View>
                      <View><Text style={styles.text}>{item.userFirstName}</Text></View>
                      <View><Text numberOfLines={2} style={styles.cmt}>{item.comment}</Text></View>
                    </View>
                  </View>
                  <View style={styles.box3}>
                    <View style={styles.colBox}>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CommentDetail', {comment: item.commentID})}>
                        <Text style={styles.login}>VIEW</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => {
                        Alert.alert(
                          "Comment Activation",
                          `Are you sure you want to ${item.status == "Show" ? "Hide" : "Show"} this comment?`,
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            { text: "Yes", onPress: () => this.handleCommentStatus(item) }
                          ],
                          { cancelable: false }
                        );
                      }}>
                        <Text style={styles.login}>{item.status == "Show" ? "HIDE" : "SHOW"}</Text>
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
    flex: 0.8,
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
    maxHeight:100,
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
    fontSize: 20,
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
  cmt: {
    fontSize: 16
  }
});
