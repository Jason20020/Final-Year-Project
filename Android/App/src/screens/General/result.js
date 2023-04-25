import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { firestore } from "../../config/firebase";


class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: [],
    };
  }

  async componentDidMount() {
    await this.fetchCarData();
  }

  fetchCarData = () => {
    firestore.collection("cars").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const {pname} = doc.data();
        if(pname == this.props.route.params.car)
          this.setState({car: doc.data()});
      })
    })
  }
  
  render() {
    const { navigation } = this.props;
    const data = this.props.route.params.car; 

    return (
      <SafeAreaView style={styles.container} testID="generalResult">
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image style={styles.home} source={require("../../../assets/icons8-home-50.png")}/>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{this.state.car.model} {this.state.car.name}</Text>
          </View>
          <Image style={styles.car} source={{uri: this.state.car.imgUri}}/>
          <View style = {styles.carDetails}>
          <Text style={styles.heading}>Car Details</Text>
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

          <Text style={styles.comment}>Comment</Text>
          <Text style={styles.heading4}>Please Login to see the comment</Text>
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
  viewContainer: {
    flex: 1,
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
    marginTop: 20,
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
    borderRadius: 6
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

  }
});

export default Result;