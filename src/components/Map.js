
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { useEffect, useState } from 'react'

// Get data from Airtable 

const getCafeAsync = async () => {
    const response = await axios.get('http://localhost:3000/api/getcafe')
    .then(res => res)
    return response.data
};


const Map = () => {
    // const { placeService
    // } = usePlacesService({apiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY});

    const [placeId, setPlaceId] = useState('')

        useEffect(() => {
            getCafe()
        }, [])

      



        const getCafe = async () => {
            const data = await getCafeAsync()

            
            setPlaceId(data[0].fields['Place ID'])
        }
    



    

        
        const handleApiLoaded = (map, maps) => {
            console.log(map)
            console.log(maps)

            var request = {
                placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
                fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
              };
              
              service = new window.google.maps.places.PlacesService(map);
              service.getDetails(request, callback);
              
              function callback(place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  createMarker(place);
                }
                console.log(place);
              }

              
        }


        
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:`${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}`}}
          defaultCenter={{
              lat: 13.723558588353212, 
            lng: 100.5221113404444
        }}
        defaultZoom={11}
        onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent
            lat={13.723558588353212}
            lng={100.5221113404444}
            text="DIRTY"
          />

        </GoogleMapReact>
      </div>
    );
    
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default Map