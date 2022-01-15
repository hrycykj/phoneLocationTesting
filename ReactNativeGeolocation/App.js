import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';

import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'

const screenMapWidth = Dimensions.get('window').width
const screenMapHeight = Dimensions.get('window').height
let styles = {}

const App = () => {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMessage] = useState(null)
  const [showMap, setShowMap] = useState(false)

  const mapLatAndLong = () => {
      console.log ("inside the map lat & long function")
      setShowMap(true)
      return
  }

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
      {(!showMap) && <View style={styles.container}>
        <Text>This is my location testing app</Text>    
      </View>} 
      {(location&&!showMap) &&
        <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '30%', borderWidth: 1}}>
            <Button
              title="Map It!"
              onPress={mapLatAndLong}
          />
        </View>
      }
        {(showMap&&location) ?
            <View style={styles.container}>
              <MapView
                style={styles.map}
                region={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: (location.coords.accuracy*30/111111),
                  longitudeDelta: (location.coords.accuracy*1/111111),
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title={'Me!'}
                  flat={true}
                />
              </MapView>
            </View>
        :   <Text></Text>
        }

      {(!showMap)&&<View style = {styles.container}>
        {(location)
          ? <View>
              <Text>Latitude: {location.coords.latitude}</Text>
              <Text>Longitude: {location.coords.longitude}</Text>
              <Text>Accuracy: {location.coords.accuracy}</Text>
            </View>
          : <Text>{text}</Text>
        }
      </View>}
      <StatusBar style="auto" />
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: screenMapWidth,
    height: screenMapHeight,
  },
});


export default App