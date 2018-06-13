import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import io from "socket.io-client";
import { connect } from "react-redux";
import { addTweet } from "../actions/actions";

const mapStateToProps = state => {
  return {
    tweets: state.tweets,
    keyword: state.keyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTweet: tweet => dispatch(addTweet(tweet))
  };
};

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2
  }
});

class ConnectedSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      keyword: ""
    };
    this.buildSidebar = this.buildSidebar.bind(this);
    this.updateSidebar = this.updateSidebar.bind(this);
    this.socket = io("https://twittermap-backend.herokuapp.com/");
    this.socket.on("tweet", data => {
      if (data.text != null) {
        this.updateSidebar(data.text);
        this.props.addTweet(data);
        console.log("New message");
      }
    });
  }

  ComponentDidMount() {}
  componentWillReceiveProps(new_props) {
    if (new_props.keyword !== "" && new_props.keyword !== this.state.keyword) {
      this.setState({
        keyword: new_props.keyword
      });
      this.socket.emit("keyword", new_props.keyword);
    }
  }

  buildSidebar() {
    const { classes } = this.props;
    return this.state.tweets.map(tweet => (
      <Paper className={classes.paper} elevation={8}>
        {tweet}
      </Paper>
    ));
  }

  updateSidebar(new_tweet) {
    let tweet = this.state.tweets.slice();

    if (tweet.length > 5) {
      tweet.shift();
      tweet.push(new_tweet);
      this.setState({
        tweets: tweet
      });
    } else {
      tweet.push(new_tweet);
      this.setState({
        tweets: tweet
      });
    }
  }

  render() {
    const { classes } = this.props;

    return <this.buildSidebar />;
  }
}

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSidebar);

export default withStyles(styles)(Sidebar);
