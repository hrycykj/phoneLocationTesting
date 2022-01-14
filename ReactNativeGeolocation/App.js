import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location'

const App = () => {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMessage] = useState(null)

  useEffect (() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync ()
      if (status != 'granted') {
        setErrorMessage('Permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      // let location = await Location.getLastKnownPositionAsync({})
      setLocation(location)
    })()
  },[])

  let text = 'Waiting...'
  if (errorMsg) {
    text=errorMsg
  } else if (location) {
    text=JSON.stringify(location)
    console.log (location.coords.latitude, location.coords.longitude, location.coords.accuracy)
  }

  
  // const permissionHandle = async () => {
  //   console.log('inside the permissionHandle function')

  //   let permission = await RNLocation.checkPermission({
  //     ios: 'whenInUse', // or 'always'
  //     android: {
  //       detail: 'course' // or 'fine'
  //     }
  //   })

  //   console.log('made it past the check permission request to see what its status is')
  //   console.log(permission)

  // }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>This is my location testing app</Text>    
      </View>
      {/* <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button
          title="Get Location"
          onPress={permissionHandle}
        />
      </View>
      <Text>Lattitude: </Text>
      <Text>Longitude: </Text>
      <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button
          title="Send Location"
        />
      </View> */}
      <View style = {styles.container}>
        {(location) 
          ? (<View>
              <Text>Latitude: {location.coords.latitude}</Text>
              <Text>Longitude: {location.coords.longitude}</Text>
              <Text>Accuracy: {location.coords.accuracy}</Text>
            </View>)
          : <Text>{text}</Text>}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App