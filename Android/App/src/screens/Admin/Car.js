import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { auth, firestore } from "../../config/firebase";

class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: [],
      maxRating: [1,2,3,4,5],
      commentList: []
    };
  }

  async componentDidMount() {
    await this.fetchCarData();
    await this.fetchCommentData();
  }

  fetchCarData = () => {
    firestore.collection("cars").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const {pname, carID} = doc.data();
        if(pname == this.props.route.params.car || carID == this.props.route.params.car)
          this.setState({car: doc.data()});
      })
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

  fetchCommentData = () => {
    firestore.collection("comments").get()
    .then((querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        const { carID, imgUri, carModel, carName, comment, rate, userFirstName, gender, userID } = doc.data();
        if(carID === this.state.car.carID)
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
                userID
            })
      })
      this.setState({commentList: comments});
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
              <Text style={styles.title}>{this.state.car.model} {this.state.car.name}</Text>
            </View>
          </View>
            <Image style={styles.car} source={{uri: this.state.car.imgUri}}/>
          <View style = {styles.carDetails}>
            <View style = {styles.detailTop}>
              <View style = {styles.detailTitle}>
                <Text style={styles.heading}>Car Details</Text>
              </View>
              <View style = {styles.detailRate}>
                <Image style={styles.favImg} source={require("../../../assets/yellowStar.png")}/>
                <Image style={styles.favImg} source={require("../../../assets/yellowStar.png")}/>
                <Image style={styles.favImg} source={require("../../../assets/yellowStar.png")}/>
                <Image style={styles.favImg} source={require("../../../assets/yellowStar.png")}/>
                <Image style={styles.favImg} source={require("../../../assets/yellowHalfStar.png")}/>
              </View>
            </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Model</Text>
            </View>
            <View style={styles.inside}>
                  <Text style={styles.heading3}>{this.state.car.model}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Brand</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.car.brand}</Text>
              </View>
            </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Name</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.car.name}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Speed</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.car.speed}mph</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Fuel</Text>
            </View>
            <View style={styles.inside}>
              <Text style={styles.heading3}>{this.state.car.fuel}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.box}>
              <Text style={styles.heading2}>Price</Text>
            </View>
            <View style={styles.inside}>
                <Text style={styles.heading3}>€{this.state.car.price}</Text>
              </View>
            </View>
          </View>
          <View style={styles.commentTop}>
            <View style={styles.commentTitle}>
              <Text style={styles.comment}>Comment</Text>
            </View>
            <View style={styles.commentSpace}></View>
            <View style={styles.commentTitle}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditCar', { carId: this.state.car.id})}>
                    <Text style={styles.btnText}>EDIT CAR</Text>
                </TouchableOpacity>
            </View>
          </View>
            {
              this.state.commentList.map((item, key) => {
                return (
                  <View style={styles.commentListBox}>
                    <View style={styles.commentListLeft}>
                      <Image style={styles.img} source={item.gender == "Male" ? require("../../../assets/male.png") : require("../../../assets/female.png")}/>
                    </View>
                    <View style={styles.commentListRight}>
                      <View style={styles.commentListRightTop}>
                        <View style={styles.commentListRightTopLeft}>
                          <Text style={styles.userTitle}>{item.userFirstName}</Text>
                        </View>
                        <View style={styles.commentListRightTopRight}>
                        {
                          this.state.maxRating.map((star, key) => {
                            return (
                              <View>
                                <Image
                                  style={styles.rateImg}
                                  source={
                                    star <= item.rate ? require("../../../assets/yellowStar.png") : null
                                  }
                                />
                              </View>
                            )
                          })
                        }
                        </View>
                      </View>
                      <View style={styles.commentListRightBottom}>
                        <Text>{item.comment}</Text>
                      </View>
                      <View style={styles.commentListFooter}>
                        <View style={styles.commentFooterSpace}></View>
                        <View style={styles.commentFooterBtn}>
                            <TouchableOpacity style={styles.dltButton} onPress={() => navigation.navigate('EditCar', { carId: this.state.car.id})}>
                                <Text style={styles.dltBtnText}>View</Text>
                            </TouchableOpacity>
                        </View>
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
    marginTop: 15,
    maxWidth: 175
  },
  btnText: {
    fontSize: 20,
    color: '#FFFEFE'
  },
  favImg: {
    height: 35,
    width: 35
  },
  commentListBox: {
    backgroundColor: '#EBEAEA',
    marginTop: 20,
    height: 120,
    borderRadius: 10,
    paddingTop: 10,
    flexDirection: 'row'
  },
  commentListRightTop: {
    flexDirection: 'row',
    width: 270,
  },
  commentListRightTopLeft: {
    flex: 1,
  },
  commentListRightTopRight: {
    flex: 1,
    flexDirection: 'row',
  },
  commentListRightBottom: {
    marginTop: 5,
    maxWidth: 270,
    height: 45
  },
  rateImg: {
    height: 25,
    width: 25
  },
  userTitle: {
    fontSize: 20
  },
  dltButton: {
    backgroundColor: '#DEB27C',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  dltBtnText: {
    fontSize: 16,
    color: '#FFFEFE'
  },
  commentListFooter: {
    flexDirection: 'row',
  },
  commentFooterSpace: {
    flex: 2.2
  },
  commentFooterBtn: {
    flex: 1
  },
  commentSpace: {
    flex: 0.4
  }
});

export default Car;