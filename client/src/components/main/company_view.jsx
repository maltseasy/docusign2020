import React from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WebMapView from "./webmapview";
import ListData from "./listdata.jsx";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
  dataDisplay: {
    marginTop: theme.spacing(4),
    alignItems: "left",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 30,
    align: "left",
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)",
  },
});

class CompanyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: null,
      value: 0,
      showData: true,
      showReview: false,
    };
  }

  handleFlag = (e,index) => {
    console.log(e,index);
    this.props.handleFlag(e,this.props.index,index);
  };

  componentWillMount() {
    // TODO: retrieve map data
    this.setState({
      mapData: null,
    });
  }

  handleChange = (e, newVal) => {
    this.setState({
      value: newVal,
    });
  };

  showData = () => {
    this.setState({
      showData: true,
      showReview: false,
    });
  };

  showReview = () => {
    this.setState({
      showData: false,
      showReview: true,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container component="main" maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button onClick={this.props.handleCompanyClose}>Back</Button>
              <div className={classes.dataDisplay}>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Button style={{ width: "100%" }} onClick={this.showData}>
                      Data
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Button style={{ width: "100%" }} onClick={this.showReview}>
                      Review
                    </Button>
                  </Grid>
                </Grid>

                {this.state.showData ? (
                  <>
                    <h1>{this.props.company.name}</h1>
                    <ul>
                      {this.props.company.data.map((dataValue,index) => (
                        <ListData
                          data={dataValue}
                          handleFlag={this.handleFlag}
                          index={index}
                        />
                      ))}
                    </ul>
                  </>
                ) : null}
                {this.state.showReview ? (
                  <>
                    <h1>Review</h1>
                  </>
                ) : null}
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <WebMapView data={this.state.mapData} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(CompanyView);
