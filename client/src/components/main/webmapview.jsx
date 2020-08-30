import React from "react";
import { loadModules } from "esri-loader";
// import CircularProgress from "@material-ui/core/CircularProgress";

export default class WebMapView extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    loadModules(
      [
        "esri/map",
        "esri/InfoTemplate",
        "esri/layers/WFSLayer",
        "esri/config",
        "esri/layers/FeatureLayer",
        "dojo/domReady!",
      ],
      { css: true }
    ).then(([ArcGISMap, InfoTemplate, WFSLayer,esriConfig,FeatureLayer]) => {
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
      var featureLayer = new FeatureLayer("https://services1.arcgis.com/vY6WuhLW0HkFe6Fl/arcgis/rest/services/TravelAdvisoriesV3/FeatureServer/0");
      var layer = new WFSLayer();
      layer.fromJson(opts);
      map.addLayer(layer);
      map.addLayer(featureLayer);
      
      // console.log(map,layer);
    }).catch(err => console.log(err));
  }

  render() {
      return (
        <>
          <div className="webmap-controls"></div>
          <div className="webmap" id="map" />
        </>
      );
  }
}
