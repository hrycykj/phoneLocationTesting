import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Text, View} from 'react-native';

const MyLocation = (props) => {
  let location = props.location;
  let setLocation = props.setLocation;
  let errorMsg = props.errorMsg;
  let setErrorMessage = props.setErrorMessage;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // let location = await Location.getLastKnownPositionAsync({})
      setLocation(location);
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(
      location.coords.latitude,
      location.coords.longitude,
      location.coords.accuracy
    );
  }

  return (
    <View>
      {location ? (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          <Text>Accuracy: {location.coords.accuracy}</Text>
        </View>
      ) : (
        <Text>{text}</Text>
      )}
    </View>
  );
};

export default MyLocation