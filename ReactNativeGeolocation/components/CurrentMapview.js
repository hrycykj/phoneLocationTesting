import { Button, StyleSheet, Text, View, Dimensions } from 'react-native'

import MapView, { Marker, Polyline } from 'react-native-maps'

const screenMapWidth = Dimensions.get('window').width
const screenMapHeight = Dimensions.get('window').height

const CurrentMapview = (props) => {
    latitude = props.latitude
    longitude = props.longitude
    latitudeDelta = props.latitudeDelta
    longitudeDelta = props.longitudeDelta

    console.log(latitude, longitude, latitudeDelta, longitudeDelta)

    return (
        <MapView
            style={styles.map}
            region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            }}
        >
        {props.children}
        </MapView>
    )
}

// figure out what the styles should really be for this!

let styles = StyleSheet.create({
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

export default CurrentMapview