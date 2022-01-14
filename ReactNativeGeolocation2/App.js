/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState} from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'

import RNLocation from 'react-native-location'

RNLocation.configure ({
  distanceFilter: null
})


const App = () => {
  
  let [viewLocation, isViewLocation] = useState ([])
  
  const permissionHandle = async () => {
    
    let permission = false
    let location
    
    console.log('inside the permissionHandle function')

    permission = await RNLocation.checkPermission ({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    })

    console.log('checked permissions inside permissionHandle:', permission)
    
    if (!permission) {
      permission = await RNLocation.requestPermission ({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need access to your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            butttonNegative: "Cancel"
          }
        }
      })

      console.log("permission after asking for permission:",permission)
    
      location = await RNLocation.getLatestLocation({timeout: 100})
      isViewLocation (location)
      console.log (location, location.longitude, location.latitude, location.timestamp)
    
    } else {
      console.log("Here 7")
      location = await RNLocation.getLatestLocation({timeout: 100})
      isViewLocation (location)
      console.log (location, location.longitude, location.latitude, location.timestamp)
    }

  }

  return (
    <View style = {styles.container}>
      <Text>Welcome!</Text>
      <View style = {{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button
          title="Get Location"
          onPress={permissionHandle}
        />
      </View>
      <Text>
        Latitude:  {viewLocation.latitude}
      </Text>
      <Text>
        Longitude:  {viewLocation.longitude}
      </Text>
      <View style = {{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button
          title="Send Location"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App