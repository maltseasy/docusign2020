import React from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WebMapView from "./webmapview";
import WebMapView2 from './webmapviewtest';
import ListData from "./listdata.jsx";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getOrganizationRequirements } from "../data/dynamics";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {DocusignRequest} from "./docusign";

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
      organizationRequirements: [],
      mapLayerToggles: {
        covidTravelRisks: false,
        covidCases: false,
        deforestation: false,
      },
    };
  }

  handleFlag = (e, index) => {
    console.log(e, index);
      };

  handleNote = (e, index) => {

    console.log(e, index);
  }

  componentWillMount() {
    // retrieve list or organization requirements
    getOrganizationRequirements(this.props.company.accountid).then((data) => {
      data.value.forEach((element) => {
        element.flagged = false;
        element.notes = "";
      });
      console.log(data.value);
      this.setState({
        organizationRequirements: data.value,
      });
    });

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

  handleCovidCasesToggle = () => {
    this.setState({
      mapLayerToggles: {
        ...this.state.mapLayerToggles,
        covidCases: !this.state.mapLayerToggles.covidCases,
      },
    });
  };

  handleCovidTravelToggle = () => {
    this.setState({
      mapLayerToggles: {
        ...this.state.mapLayerToggles,
        covidTravelRisks: !this.state.mapLayerToggles.covidTravelRisks,
      },
    });
  };
  handleDeforestationToggle = () => {
    this.setState({
      mapLayerToggles: {
        ...this.state.mapLayerToggles,
        deforestation: !this.state.mapLayerToggles.deforestation,
      },
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
                    <h3>
                      FSC License Number: {this.props.company.fsc_licensenumber}
                    </h3>
                    <ul>
                      
                      {this.state.organizationRequirements &&
                        this.state.organizationRequirements.map(
                          (dataValue, index) => (
                            <ListData
                              data={dataValue}
                              handleFlag={this.handleFlag}

                              handleNote={this.handleNote}                              index={index}
                            />
                          )
                        )}
                    </ul>
                  </>
                ) : null}
                {this.state.showReview ? (
                  <>
                    <h1>Review</h1>
                    <DocusignRequest/>
                  </>
                ) : null}
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.mapLayerToggles.covidCases}
                      onChange={this.handleCovidCasesToggle}
                      name="covidCases"
                      color="primary"
                    />
                  }
                  label="COVID-19 Cases"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.mapLayerToggles.covidTravelRisks}
                      onChange={this.handleCovidTravelToggle}
                      name="covidTravelRisks"
                      color="primary"
                    />
                  }
                  label="COVID-19 Travel Risks"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.mapLayerToggles.deforestation}
                      onChange={this.handleDeforestationToggle}
                      name="deforestation"
                      color="primary"
                    />
                  }
                  label="Deforestation Regions"
                />
              </FormGroup>
              <WebMapView
                data={this.state.mapData}
                id={this.props.company.accountid}
                layers={this.state.mapLayerToggles}
                key={this.state.mapLayerToggles}
              />
              <WebMapView2 />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(CompanyView);
