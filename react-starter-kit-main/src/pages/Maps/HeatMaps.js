import GoogleMapReact from 'google-map-react';
import cityData from '../../data/city.json'

function HeatMaps() {


    const heatData = cityData.map((city) => {
        return city
    })


    return (
        <div>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' ,libraries:['visualization']}}
                    defaultCenter={{ lat: 28.7041, lng: 77.1025 }}
                    defaultZoom={2}
                    heatmapLibrary
                    heatmap={{    
                        positions: heatData,
                        options: {   
                          radius: 30,   
                          opacity: 0.6,
                      }}}
                />
      </div>
        </div>
    )
}


export default HeatMaps