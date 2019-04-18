import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Paper } from "@material-ui/core";

const mapStyles = {
  width: "100%",
  height: "300px"
};

export class MapContainer extends Component {
  
  
  render() {
    console.log(this.props);
    return (
        <Map google={this.props.google} zoom={10} style={mapStyles}>
          <Marker onClick={this.onMarkerClick} name={"Current location"} />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div />
          </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyASD8l4ED4-0lpLSgZ_fiHTr9XvBm4SYH4"
})(MapContainer);