import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { auth, firestore } from "../../config/firebase";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
        comment: null,
        maxRating: [1,2,3,4,5],
    };
  }

  async componentDidMount() {
    await this.fetchCommentData();
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

  fetchCommentData = () => {
    firestore.collection("comments").doc(this.props.route.params.comment).get()
    .then(comment => {
      this.setState((state, props) => {
        return {
          comment: comment.data()
        };
      });
    })
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
        <View style={styles.viewContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.top}>
            <View style={styles.topTitle}>
              <Text style={styles.title}>View Comment</Text>
            </View>
          </View>
            <Image style={styles.car} source={{uri: this.state.comment?.imgUri}}/>
          <View style = {styles.carDetails}>
            <View style = {styles.detailTop}>
              <View style = {styles.detailTitle}>
                <Text style={styles.heading}>Details</Text>
              </View>
              <View style = {styles.detailRate}>
                {
                    this.state.maxRating.map((star, key) => {
                    return (
                        <View>
                        <Image
                            style={styles.favImg}
                            source={
                            star <= this.state.comment?.rate ? require("../../../assets/yellowStar.png") : null
                            }
                        />
                        </View>
                    )
                    })
                }
            </View>
            </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>CarID</Text>
            </View>
            <View style={styles.inside}>
                  <Text style={styles.heading3}>{this.state.comment?.carID}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Model</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.comment?.carModel}</Text>
              </View>
            </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Name</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.comment?.carName}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>User Name</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.comment?.userFirstName}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Gender</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.comment?.gender}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Status</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.comment?.status}</Text>
            </View>
          </View>
          </View>
          <TextInput
            editable={false} 
            multiline
            numberOfLines={5}
            maxLength={255}
            placeholder="Leave your comment.."
            value={this.state.comment?.comment}
            style={styles.commentBox}
          />
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
  top: {
    flexDirection:'row',
  },
  topTitle: {
    flex: 7,
    flexDirection:'row'
  },
  topRating: {
    flex: 1,
    flexDirection:'row',
    marginTop: 3
  },
  fav: {
    marginLeft: 30,
    marginTop: 40,
    height: 35,
    width: 35
  },
  viewContainer: {
    flex: 7,
    margin: 10
  },
  home: {
    marginLeft: 20,
    marginTop: 30,
    height: 35,
    width: 35
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  car: {
    height: 200,
    width: 370,
    borderRadius: 5
  },
  carDetails: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    marginTop: 20,
    borderRadius: 6,
  },
  detailTop: {
    flexDirection:'row',
  },
  detailTitle: {
    flex: 1,
    flexDirection:'row',
  },
  detailRate: {
    flex: 1,
    flexDirection:'row',
  },
  heading: {
    fontSize: 28
  },
  bigBox: {
    flexDirection:'row'
  },
  box: {
    backgroundColor: '#EBEAEA',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    flex:1,
    flexDirection:'row'
  },
  heading2: {
    fontSize: 24
  },
  inside: {
    backgroundColor: '#17140F',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    flex:1,
    flexDirection:'row',
    justifyContent: 'center'
  },
  heading3: {
    fontSize: 24,
    color: '#FFFDFD'
  },
  comment: {
    fontSize: 32,
    marginTop: 5
  },
  heading4: {
    fontSize: 20,

  },
  commentBox: {
    backgroundColor: "#DFDEDE",
    borderRadius: 6,
    padding: 6,
    marginTop: 10
  },
  commentTop: {
    flexDirection:'row',
  },
  commentTitle: {
    flex: 1,
    flexDirection:'row',
  },
  commentRate: {
    flex: 1,
    flexDirection:'row',
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10
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
  favImg: {
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Comment;