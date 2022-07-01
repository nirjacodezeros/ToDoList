import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import './MarkerMaps.css';
import {Modal } from 'react-bootstrap';
import cityData from '../../data/city.json'
import LocationImg from '../../assets/images/placeholder.png'


const Marker = ({ children }) => children;


const CityModal = ({show , close , data}) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide = {close}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      {data && <Modal.Body>
        <h4>City : <span>{data.name}</span></h4>
        <h4>State : <span>{data.state}</span></h4>
      </Modal.Body>}
    </Modal>
  )
}

function MarkerMaps() {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [showModal , setModalShow] = useState(false)

  const [citydata , setCityData] = useState({})

  
 

  const points = cityData.map(mark => ({
    type: 'Feature',
    properties: { cluster: false, cityId: mark.id, name: mark.name , state : mark.state },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(mark.lng),
        parseFloat(mark.lat)
      ]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '',libraries:['visualization']}}
        defaultCenter={{ lat: 28.7041, lng: 77.1025 }}
        defaultZoom={2}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);
        }}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 80}px`,
                    height: `${10 + (pointCount / points.length) * 80}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`loc-${cluster.properties.cityId}`}
              lat={latitude}
              lng={longitude}
            >
              <button
                type="button"
                onClick={() => {
                  setCityData(cluster.properties)
                 if(cityData) {
                  setModalShow(true)
                 }
                }} className="loc-image "
              >
                <img src={LocationImg} alt="location" />
              </button>
            </Marker>
          );
        })}
        <CityModal show={showModal} close={() => setModalShow(false)} data={citydata} />

      </GoogleMapReact>
    </div>
  );
}

export default MarkerMaps
