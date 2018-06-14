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
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import classNames from "classnames";

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
    width: "70%",
    autoFocus: true,
    fontSize: 20
  },

  title: {
    marginBottom: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
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

  body: {},

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },

  buttonSucess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
};

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggered: false,
      keyword: "",
      submit: {
        loading: false,
        success: false
      }
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
  }

  handleSubmit() {
    if (this.state.keyword !== "") {
      this.props.addKeyword(this.state.keyword);
      this.setState({ triggered: true });
      console.log(`Entered keyword ${this.state.keyword}`);
      this.buttonChange();
    }
  }

  buttonChange() {
    if (!this.state.submit.loading) {
      this.setState(
        {
          submit: {
            success: false,
            loading: true
          }
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              submit: {
                loading: false,
                success: true
              }
            });
          }, 1000);
        }
      );
    }
  }

  _handleKeyPress(e) {
    if (e.key === "Enter" && this.state.keyword !== "") {
      this.props.addKeyword(this.state.keyword);
      this.setState({ triggered: true });
      console.log(`Entered keyword ${this.state.keyword}`);
      this.buttonChange();
    }
  }

  handleChange(e) {
    this.setState({ keyword: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { loading, success } = this.state.submit;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });
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
              <Typography variant="display2" className={classes.title}>
                TwitterMap
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.header}>
                <Grid
                  container
                  direction="row"
                  type="flex"
                  justify="space-between"
                  alignItems="center"
                  spacing={0}
                >
                  <Grid item xs={10}>
                    <TextField
                      className={classes.textField}
                      label="Keyword"
                      onKeyPress={this._handleKeyPress}
                      onChange={this.handleChange}
                      disabled={this.state.triggered}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading || success}
                      className={buttonClassname}
                      onClick={this.handleSubmit}
                    >
                      {success ? "Submitted" : "Submit"}
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </Button>
                  </Grid>
                </Grid>
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
