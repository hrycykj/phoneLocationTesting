import MapView from 'react-native-maps'
import CurrentMapview from './CurrentMapview'


const CentreMapview = (props) => {
    const coords1 = props.coords1
    const coords2 = props.coords2

    const calcCentreCoordinate = (coord1, coord2) => {
        let long = (coord1.longitude+coord2.longitude)/2
        let lat = (coord1.latitude+coord2.latitude)/2
        return [long, lat]
      }
    
    return (
      <CurrentMapview
      latitude= {lat} 
      longitude= {long}
      latitudeDelta= {.008}
      longitudeDelta= {.005}
      >
        {props.children}
      </CurrentMapview>
    )
}

export default CentreMapview