import React from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WebMapView from "./webmapview";
import WebMapViewTest from "./webmapview copy";
import ListData from "./listdata.jsx";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
  dataDisplay: {
    marginTop: theme.spacing(8),
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
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
    };
  }

  handleFlag = (e) => {
    this.props.handleFlag(e);
  }

  componentWillMount() {
    // TODO: retrieve map data
    this.setState({
      mapData: null,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container component="main" maxWidth="xl">
          <Grid container spacing={3}>
            
            
            <Grid item xs={12} sm={6}>
            <h1>{this.props.company.name}</h1>
            <Button onClick={this.handleCompanyClose}>Back</Button>
              <div className={classes.dataDisplay}>
                <ul>
                  {this.props.company.data.map((dataValue) => (
                      <ListData data={dataValue} handleFlag={this.handleFlag} />
                  ))}
                </ul>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <WebMapView data={this.state.mapData} />
              {/* <WebMapViewTest /> */}
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(CompanyView);
