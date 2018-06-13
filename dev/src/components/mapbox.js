import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import io from "socket.io-client";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { tweets: state.tweets };
};

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYnJhdmV0aGVoZWF0IiwiYSI6ImNqaTNmMnAwYTByMjAzcW50amIwdzc2cHYifQ.nG6ileQvpSg3jXrWZfTfzQ",
  minZoom: 1.5
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    root: "60vh",
    width: "60vw"
  }
});

class ConnectedMapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        center: [5, 34],
        zoom: [1.5]
      },
      tweets: this.props.tweets
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(newProps) {
    newProps.tweets.map(tweet => {
      console.log(tweet);
      if (tweet.location !== null) {
        let marker = new mapboxgl.Marker()
          .setLngLat(tweet.location)
          .addTo(this.map);
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={{ height: "100%", width: "100%" }}
        onStyleLoad={el => (this.map = el)}
        {...this.state.map}
      />
    );
  }
}

const Mapbox = connect(mapStateToProps)(ConnectedMapbox);

export default withStyles(styles)(Mapbox);
