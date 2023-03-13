import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { auth, firestore } from "../../config/firebase";

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      fav: false,
      rate: 3,
      car: [],
      maxRating: [1,2,3,4,5]
    };
  }

  async componentDidMount() {
    await this.fetchCarData();
  }

  fetchCarData = () => {
    firestore.collection("cars").get()
    .then((querySnapshot) => {
      const cars = [];
      querySnapshot.forEach((doc) => {
        const {pname} = doc.data();
        if(pname == this.props.route.params.car)
          this.setState({car: doc.data()});
      })
    })
  }

  handleCommentChange = (comment) => {
    this.setState({ comment: comment })
  }

  handleFavChange = () => {
    if(this.state.fav) {
      this.setState({ fav: false });

    } else {
      this.addFavorite();
      this.setState({ fav: true });
    }
  }

  handleRateChange = (item) => {
    this.setState({ rate: item })
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

  addFavorite = () => {
    firestore.collection("favorites").doc().set({
      userID: this.props.route.params.user?.userID,
      carID: this.state.car.carID,
    })
    .catch(error => alert(error.message))
  }

  render() {
    const { navigation } = this.props;
    const userName = this.props.route.params.user?.firstName

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerFav}>
            <TouchableOpacity onPress={() => navigation.navigate('UserHome')}>
                <Image style={styles.fav} source={require("../../../assets/icons8-home-50.png")}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerSpac}>
            <Text style={styles.title}>{userName}</Text>
          </View>
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
            <View style={styles.topRating}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleFavChange}
              >
                <Image
                  style={styles.favImg}
                  source={
                    this.state.fav ? require("../../../assets/favorite.png") : require("../../../assets/favorite_Empty.png")
                  }
                />
              </TouchableOpacity>
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
            <View style={styles.commentRate}>
              {
                this.state.maxRating.map((item, key) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={item}
                      onPress={() => this.handleRateChange(item)}
                    >
                    <Image
                      style={styles.favImg}
                      source={
                        item <= this.state.rate ? require("../../../assets/yellowStar.png") : require("../../../assets/star.png")
                      }
                    />
                  </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <TextInput
            editable
            multiline
            numberOfLines={5}
            maxLength={255}
            onChangeText={comment => this.handleCommentChange(comment)}
            placeholder="Leave your comment.."
            value={this.state.comment}
            style={styles.commentBox}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.btnText}>SUBMIT</Text>
          </TouchableOpacity>
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
    backgroundColor: "#FFE999"
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
    maxWidth: 135
  },
  btnText: {
    fontSize: 20,
    color: '#FFFEFE'
  },
  favImg: {
    height: 35,
    width: 35
  }
});

export default Result;