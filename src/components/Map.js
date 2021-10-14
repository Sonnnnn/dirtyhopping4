import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

// Get data from Airtable

const getCafeAsync = async () => {
  const response = await axios.get('http://localhost:3000/api/getcafe').then((res) => res)
  return response.data
}

const Map = () => {
  const [placeId, setPlaceId] = useState(null)
  const [placeDetails, setPlaceDetails] = useState(null)
  const mapRef = useRef(null)

  // This function will run once after Map component render
  useEffect(() => {
    // TODO: update to get cafe on click find dirty instead
    getCafe()
  }, [])

  // Run this function everytime on placeId change
  useEffect(() => {
    // Get place details after we have placeId
    if (placeId) {
      getPlaceDetails(placeId)
    }
  }, [placeId]) // <= dependency to watch

  const getCafe = async () => {
    const data = await getCafeAsync()
    setPlaceId(data[0].fields['Place ID'])
  }

  const getPlaceDetails = (placeId) => {
    const request = {
      fields: ['name', 'photo'],
      placeId: placeId,
    }

    const service = new window.google.maps.places.PlacesService(map)
    service.getDetails(request, (place) => {
      // set place detail state to variable placeDetails
      setPlaceDetails(place)
    })
  }

  // After map is loaded, set map object to mapRef
  const handleApiLoaded = (map) => {
    mapRef.current = map
  }

  return (


    // Important! Always set the container height explicitly
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}` }}
        defaultCenter={{
          lat: 13.723558588353212,
          lng: 100.5221113404444,
        }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
      >
        <AnyReactComponent lat={13.723558588353212} lng={100.5221113404444} text="DIRTY" />
      </GoogleMapReact>
    </div>
  )
}

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default Map
