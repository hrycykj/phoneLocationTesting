import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';

import * as Location from 'expo-location'
import MapView, { Marker, Polyline } from 'react-native-maps'

const screenMapWidth = Dimensions.get('window').width
const screenMapHeight = Dimensions.get('window').height
let styles = {}
const route = [
  {latitude: 51.04769262287585, longitude: -114.04988370706592},
  {latitude: 51.04780728888966, longitude: -114.0505864451202},
  {latitude: 51.046185944568315, longitude: -114.05069665072232},
  {latitude: 51.046133578438834, longitude: -114.05098639612481},
  {latitude: 51.04579178023688, longitude: -114.05102948718338},
  {latitude: 51.045716561484234, longitude: -114.05094586682625},
  {latitude: 51.045693105693935, longitude: -114.05072974023673},
  {latitude: 51.04519568760202, longitude: -114.05076962063674},
  {latitude: 51.0452995902993, longitude: -114.0545529482637}
]

const App = () => {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMessage] = useState(null)
  const [showMap, setShowMap] = useState(false)
  const [showCoffeeMap, setShowCoffeeMap] = useState(false)

  const mapLatAndLong = () => {
      console.log ("inside the map lat & long function")
      setShowMap(true)
      return
  }

  const mapCoffee = () => {
      console.log ("inside the map Coffee function", route)
      setShowCoffeeMap(true)
      return
  }

  const returnFromMap = () => {
    console.log ("returnFromMap pressed")
    setShowMap(false)
    setShowCoffeeMap(false)
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

  return (
    <View style={styles.container}>
      {(!showMap&&!showCoffeeMap) && 
        <View style={styles.container}>
          <Text>This is my location testing app</Text>    
        </View>} 
      {(location&&(!showMap&&!showCoffeeMap)) &&
        <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '30%', borderWidth: 1}}>
            <Button
              title="Map It!"
              onPress={mapLatAndLong}
            />
        </View>
      }
      {(location&&(!showMap&&!showCoffeeMap)) &&        
        <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '30%', borderWidth: 1}}>
            <Button
              title="Coffee"
              onPress={mapCoffee}
            />
        </View>
      }
        {(showMap&&location) &&
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
              <View
                style={{
                  position: 'absolute',//use absolute position to show button on top of the map
                  top: '5%', //for center align
                  // alignSelf: 'flex-end' //for align to right
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 10,
                  width: '25%',
                  borderWidth: 1,
                  backgroundColor: '#fff'
                }}
              >
                <Button
                  title="Return"
                  onPress={returnFromMap}
                />
              </View>
            </View>
        }

        {(showCoffeeMap&&location) &&
            <View style={styles.container}>
              <MapView
                style={styles.map}
                region={{
                  latitude: 51.046411678111916, 
                  longitude: -114.05200055414592,
                  latitudeDelta: .008,
                  longitudeDelta: .005,
                }}
              >
                <Polyline
                  coordinates={route}
                  strokeColor='#3399ff'
                  strokeWidth={6}
                />
              </MapView>
              <View
                style={{
                  position: 'absolute',//use absolute position to show button on top of the map
                  top: '5%', //for center align
                  // alignSelf: 'flex-end' //for align to right
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 10,
                  width: '25%',
                  borderWidth: 1,
                  backgroundColor: '#fff'
                }}
              >
                <Button
                  title="Return"
                  onPress={returnFromMap}
                />
              </View>
            </View>
        }


      {(!showMap&&!showCoffeeMap)&&<View style = {styles.container}>
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