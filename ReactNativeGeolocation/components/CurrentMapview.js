import { Button, StyleSheet, Text, View, Dimensions } from 'react-native'

import MapView, { Marker, Polyline } from 'react-native-maps'

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
      width: 300,
      height: 300,
    },
  });

export default CurrentMapview