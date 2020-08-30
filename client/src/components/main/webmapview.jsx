import React from "react";
import { loadModules } from "esri-loader";
import {getCompanySites} from '../data/dynamics';
// import CircularProgress from "@material-ui/core/CircularProgress";

export default class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
    };

    getCompanySites(this.props.id).then(data => {
      this.setState({
        sites: data.value
      });
    })

    console.log('rendering map')
    loadModules(
      [
        "esri/map",
        "esri/dijit/LayerList",
        "esri/InfoTemplate",
        "esri/layers/WFSLayer",
        "esri/config",
        "esri/layers/FeatureLayer",
        "dojo/domReady!",
      ],
      { css: true }
    ).then(([ArcGISMap, LayerList, InfoTemplate, WFSLayer,esriConfig,FeatureLayer]) => {
      const map = new ArcGISMap("map", {
        basemap: "topo-vector",
        center: [this.state.sites[0].fsc_longitude, this.state.sites[0].fsc_latitude],
        zoom: 7,
      });
      
      var url =
        "https://dservices8.arcgis.com/32TQOipPYLOeSkYk/arcgis/services/Tree_loss_cluster/WFSServer";
      var opts = {
        url: url,
        version: "2.0.0",
        name: "Tree_loss_cluster",
      };
      var covidTravelLayer = new FeatureLayer("https://services1.arcgis.com/vY6WuhLW0HkFe6Fl/arcgis/rest/services/TravelAdvisoriesV3/FeatureServer/0", {
        mode: FeatureLayer.MODE_ONDEMAND,  
        showLabels: true,
        outFields: ["*"]
      });
      var covidCasesLayer = new FeatureLayer("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2");
      var corruptionIndexLayer = new FeatureLayer("https://services1.arcgis.com/RTK5Unh1Z71JKIiR/arcgis/rest/services/Corruption_Perception_Index_countries_layer/FeatureServer/0");
      var deforestationLayer = new WFSLayer();
      deforestationLayer.fromJson(opts);

        map.addLayer(covidTravelLayer);
        map.addLayer(covidCasesLayer);
        map.addLayer(corruptionIndexLayer);
        map.addLayer(deforestationLayer);

      var layerList = new LayerList({
        map: map,
        showLegend: true,
        showSubLayers: false,
        showOpacitySlider: true,
        layers: [
          {
            layer: covidTravelLayer,
          },
          {
            layer: covidCasesLayer,
          },
          {
            layer: corruptionIndexLayer,
          },
          {
            layer: deforestationLayer,
          },
        ]
      }, "layerListDom");
      layerList.startup();
      
      // console.log(map,layer);
    }).catch(err => console.log(err));
  }

  componentWillReceiveProps() {
    console.log(this.props.layers);
    this.setState(this.state);
  }

  componentDidMount() {
    
  }

  render() {
      return (
        <>
          <div className="webmap-controls"></div>
          <div className="webmap" id="map">
            <div id="layerListDom"></div>
          </div>
        </>
      );
  }
}
