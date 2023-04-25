import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { auth, firestore } from "../../config/firebase";

class EditCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: null,
      brand: '',
      fuel: '',
      model: '',
      name: '',
      pname: '',
      price: '',
      speed: ''
    };
  }

  async componentDidMount() {
    await this.fetchCarData();
  }

  fetchCarData = () => {
    firestore.collection("cars").doc(this.props.route.params.carId).get()
    .then(car => {
      this.setState((state, props) => {
        return {
          car: car.data(),
          brand: car.data().brand,
          fuel: car.data().fuel,
          model: car.data().model,
          name: car.data().name,
          pname: car.data().pname,
          price: car.data().price,
          speed: car.data().speed
        };
      });
    })
  }

  handleEditCar = () => {
    firestore.collection("cars").doc(this.props.route.params.carId).set({
      brand: this.state.brand,
      carID: this.state.car?.carID,
      fuel: this.state.fuel,
      id: this.props.route.params.carId,
      imgUri: this.state.car?.imgUri,
      model: this.state.model,
      name: this.state.name,
      pname: this.state.pname,
      price: this.state.price,
      speed: this.state.speed
    })
    .catch(error => alert(error.message))
    this.props.navigation.navigate('ViewCar')
  }

  handleBrandChange = (brand) => {
    this.setState({ brand: brand })
  }

  handleFuelChange = (fuel) => {
    this.setState({ fuel: fuel })
  }

  handleModelChange = (model) => {
    this.setState({ model: model })
  }

  handleNameChange = (name) => {
    this.setState({ name: name })
  }

  handlePnameChange = (pname) => {
    this.setState({ pname: pname })
  }

  handlePriceChange = (price) => {
    this.setState({ price: price })
  }

  handleSpeedChange = (speed) => {
    this.setState({ speed: speed })
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
        <View style={styles.viewContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.top}>
            <View style={styles.topTitle}>
              <Text style={styles.title}>Edit Car</Text>
            </View>
          </View>
            <Image style={styles.car} source={{uri: this.state.car?.imgUri}}/>
            <View style={styles.center}>
                <Text style= {styles.text}>Car ID:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter carID'
                value={this.state.car?.carID}
                editable={false} 
                selectTextOnFocus={false}
                />

                <Text style= {styles.text}>Model:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter Model'
                onChangeText={this.handleModelChange} 
                value={this.state.model}
                />

                <Text style= {styles.text}>Name:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter Name'
                onChangeText={this.handleNameChange} 
                value={this.state.name}
                />

                <Text style= {styles.text}>Full Name:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter Full Name'
                onChangeText={this.handlePnameChange} 
                value={this.state.pname}
                />

                <Text style= {styles.text}>Brand:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter Brand'
                onChangeText={this.handleBrandChange} 
                value={this.state.brand}
                />

                <Text style= {styles.text}>Fuel:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter Fuel'
                onChangeText={this.handleFuelChange} 
                value={this.state.fuel}
                />

                <Text style= {styles.text}>Price:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter Price'
                onChangeText={this.handlePriceChange} 
                value={this.state.price}
                />

                <Text style= {styles.text}>Speed:</Text>
                <TextInput 
                style={styles.textbox} 
                placeholder= 'Enter Speed'
                onChangeText={this.handleSpeedChange} 
                value={this.state.speed}
                />

                <TouchableOpacity style={styles.button} onPress={this.handleEditCar}>
                <Text style={styles.login}>EDIT</Text>
                </TouchableOpacity>
            </View>
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

export default EditCar;