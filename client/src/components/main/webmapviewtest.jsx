import React from "react";
import { loadModules } from "esri-loader";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class WebMapViewTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    loadModules(
      [
        "esri/map",
        "esri/InfoTemplate",
        "esri/layers/WFSLayer",
        "esri/config",
        "dojo/domReady!",
      ],
      { css: true }
    ).then(([ArcGISMap, InfoTemplate, WFSLayer, esriConfig]) => {
      const map = new ArcGISMap("map", {
        basemap: "satellite",
        center: [138, 35],
        zoom: 7,
      });
      var url =
        "https://dservices8.arcgis.com/32TQOipPYLOeSkYk/arcgis/services/Tree_loss_cluster/WFSServer";
      var opts = {
        url: url,
        version: "2.0.0",
        name: "Tree_loss_cluster",
      };
      var layer = new WFSLayer();
      layer.fromJson(opts);
      map.addLayer(layer);
      
      // console.log(map,layer);
    }).then(() => {
      console.log("reached this point");
      this.setState({
        loading: false,
      });
    }).catch(err => console.log(err));
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{align: 'center'}}>
          <CircularProgress />;
        </div>
      )
    } else {
      return (
        <>
          <div className="webmap-controls"></div>
          <div className="webmap" id="map" />
        </>
      );
    }
  }
}
