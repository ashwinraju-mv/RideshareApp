import React, { Component } from "react";

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    error: null,
    location: "",
    destination: ""
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleSuccess,
        this.handleError
      );
    } else {
      this.setState({ error: "Geolocation is not supported by your browser" });
    }
  }

  handleSuccess = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      error: null
    });
  };

  handleError = (error) => {
    this.setState({ error: error.message });
  };

  handleLocationChange = (event) => {
    const { value } = event.target;
    this.setState({ location: value });
  };

  handleDestinationChange = (event) => {
    const { value } = event.target;
    this.setState({ destination: value });
  };

  render() {
    const { latitude, longitude, error, location, destination } = this.state;

    return (
      <div>
        <h1>Book your ride</h1>
        <div>
          <label>Enter your location: </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={this.handleLocationChange}
          />
          {latitude && longitude && (
            <button onClick={() => this.setState({ location: `${latitude}, ${longitude}` })}>
              Use Current Location
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
