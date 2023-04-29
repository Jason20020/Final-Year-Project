import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Loader() {
  return (
    <View style={ [ StyleSheet.absoluteFillObject, styles.container] }>
      <LottieView source={require('../../assets/93387-car-insurance-offers-loading-page.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
    }
})