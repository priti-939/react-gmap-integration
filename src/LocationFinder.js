import React, { useState, useEffect } from "react";
import Map from "./Map";
import Geocode from "react-geocode";
import { getDistance } from "geolib";
const LocationFinder = () => {
  const [markerAdd, setMarkerAdd] = useState("");
  const [markErr, setMarErr] = useState(null);
  const [currentMarker, setCurrentMarker] = useState({
    lat: null,
    lng: null,
  });

  const [searchMarker, setSerchMarker] = useState({
    lat: null,
    lng: null,
  });

  const [distance, setDistance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    setMarErr(null)
  }, []);

  useEffect(() => {
    if (currentMarker.lat !== null && searchMarker.lat !== null) {
      const dist = getDistance(currentMarker, searchMarker);
      setDistance(dist / 1000);
    }
  }, [searchMarker]);

  const handleChange = (e) => {
    setMarErr(null);
    setMarkerAdd(e.target.value);
  };

  const findLocation = () => {
    if (markerAdd === "") {
      setMarErr("Please enter search address.");
    } else {
      // set response language. Defaults to english.
      Geocode.setLanguage("en");
      // set response region. Its optional.
      // A Geocoding request with region=es (Spain) will return the Spanish city.
      Geocode.setRegion("es");

      Geocode.fromAddress(markerAdd).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setSerchMarker({
            lat: lat,
            lng: lng,
          });
        },
        (error) => {
          setMarErr('Please enter valid address')
        }
      );
    }
  };

  const handleKeyPress = (e) => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        findLocation();
      }
  }

  return (
    <>
      <div className="main-div">
        <div className="text-div">
          <h1>Find location</h1>
          <input
            type="text"
            name="markerAdd"
            className="marker-input"
            value={markerAdd}
            onChange={handleChange}
            placeholder="Please enter valid address"
          />

          <div className="btn-div">
            <button className="marker-btn" type="submit" onClick={findLocation} onKeyDown={handleKeyPress}>
              Set Marker
            </button>
          </div>
          {markErr && (
            <div style={{ color: "red", fontSize: "14px", fontWeight:'500'}}>{markErr}</div>
          )}

          <div>
            <h2><span className="heading-info">Location Information :</span></h2>
            <span className="separator"></span>
            {(currentMarker.lat !== null || currentMarker.lng !== null) && (
              <p>
                {/* <span className="currrentlocation"> </span> */}
                <span className="heading-info">Current location Latitude :</span>{currentMarker.lat}  
                <span className="heading-info" style={{marginLeft:'10px'}}>Longitude :{" "}</span>
                {currentMarker.lng}
              </p>
            )}
            {(searchMarker.lat !== null || searchMarker.lng !== null) && (
              <p> 
                <span className="heading-info">Search location Latitude :</span> {searchMarker.lat}  
                <span className="heading-info" style={{marginLeft:'10px'}}>Longitude:</span>
                {searchMarker.lng}
              </p>
            )}
            {(searchMarker.lat !== null || searchMarker.lng !== null) && (
              <p><span className="heading-info">Distance between two places :</span> {distance}km</p>
            )}
          </div>
        </div>
        <div style={{ height: "60vh", width: "100%" }}>
          <Map searchMarker={searchMarker} currentMarker={currentMarker} />
        </div>
      </div>
    </>
  );
};

export default LocationFinder;
