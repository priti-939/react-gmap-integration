import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "70vh",
  width: "100%"
};

const options = {
  //  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};

const Map = (props) => {
    const {searchMarker, currentMarker} = props;
   

    const { isLoaded, loadError } = useLoadScript({
        //googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey,
      });
    
      const mapRef = useRef();
      const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);
      if (loadError) return "Error";
      if (!isLoaded) return "Loading...";
    return(
        <>
            <GoogleMap 
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={11} 
                center={{
                  lat: 18.5196,
                  lng: 73.85
                }} 
                options={options}
                onLoad={onMapLoad}
            >
                <Marker position={currentMarker}/>
                <Marker position={searchMarker} />

            </GoogleMap>
        </>
    )
};

export default Map;