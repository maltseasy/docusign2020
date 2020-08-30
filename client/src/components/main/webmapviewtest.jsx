import React, {useState, useEffect} from "react";
import { loadModules } from "esri-loader";
// import CircularProgress from "@material-ui/core/CircularProgress";

const WebMapView2 = (props) => {

  useEffect(() => {
    console.log(props);
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
      
      var url_def =
        "https://dservices8.arcgis.com/32TQOipPYLOeSkYk/arcgis/services/Tree_loss_cluster/WFSServer";
      var opts_def = {
        url: url_def,
        version: "2.0.0",
        name: "Tree_loss_cluster",
      };
      var covidTravelLayer = new FeatureLayer("https://services1.arcgis.com/vY6WuhLW0HkFe6Fl/arcgis/rest/services/TravelAdvisoriesV3/FeatureServer/0");
      var covidCasesLayer = new FeatureLayer("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2");
      var deforestationLayer = new WFSLayer();
      deforestationLayer.fromJson(opts_def);
      console.log(props);
      if(props.layers.covidTravelRisks){
        map.addLayer(covidTravelLayer);
      }
      if(props.layers.covidCases){
        map.addLayer(covidCasesLayer);
      }
      if(props.layers.deforestation){
        map.addLayer(deforestationLayer);
      }
      
      // console.log(map,layer);
    }).catch(err => console.log(err));
  }, [props])


  return (
    <>
      <div className="webmap-controls"></div>
      <div className="webmap" id="map" />
    </>
  )
}

export default WebMapView2;

/*
export default class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
      var covidTravelLayer = new FeatureLayer("https://services1.arcgis.com/vY6WuhLW0HkFe6Fl/arcgis/rest/services/TravelAdvisoriesV3/FeatureServer/0");
      var covidCasesLayer = new FeatureLayer("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2");
      var deforestationLayer = new WFSLayer();
      deforestationLayer.fromJson(opts);

      if(this.props.layers.covidTravelRisks){
        map.addLayer(covidTravelLayer);
      }
      if(this.props.layers.covidCases){
        map.addLayer(covidCasesLayer);
      }
      if(this.props.layers.deforestation){
        map.addLayer(deforestationLayer);
      }
      
      // console.log(map,layer);
    }).catch(err => console.log(err));
  }

  render() {
      return (
        
      );
  }
}
*/