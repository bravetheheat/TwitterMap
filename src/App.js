import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Mapbox from "./components/mapbox";
import Grid from "@material-ui/core/Grid";
import ContainerDimensions from "react-container-dimensions";
import Typography from "@material-ui/core/Typography";
import Sidebar from "./components/messages.js";
import { connect } from "react-redux";
import { addKeyword } from "./actions/actions";

const mapDispatchToProps = dispatch => {
  return {
    addKeyword: keyword => dispatch(addKeyword(keyword))
  };
};

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#ff5983",
      main: "#f50057",
      dark: "#bb002f",
      contrastText: "#000000"
    }
  }
});

const styles = {
  textField: {
    width: "100%",
    autoFocus: true,
    fontSize: 20
  },

  header: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    width: "100%"
  },

  map: {
    width: "60vw"
  },

  body: {}
};

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggered: false,
      keyword: ""
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {}

  _handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.addKeyword(this.state.keyword);
      console.log(`Entered keyword ${this.state.keyword}`);
    }
  }

  handleChange(e) {
    this.setState({ keyword: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Grid
            container
            direction="row"
            type="flex"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item xs={2}>
              <Typography variant="display3" gutterBottom>
                TwitterMap
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.header}>
                <TextField
                  className={classes.textField}
                  label="Keyword"
                  onKeyPress={this._handleKeyPress}
                  onChange={this.handleChange}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            type="flex"
            className={classes.body}
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={8}>
              <Paper
                style={{
                  padding: theme.spacing.unit * 2,
                  height: "80vh",
                  width: "100%"
                }}
              >
                <ContainerDimensions>
                  <Mapbox />
                </ContainerDimensions>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

const App = connect(
  null,
  mapDispatchToProps
)(ConnectedApp);

export default withStyles(styles)(App);
