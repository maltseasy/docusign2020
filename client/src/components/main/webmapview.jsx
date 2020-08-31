import React from "react";
import { loadModules } from "esri-loader";
import { getCompanySites } from '../data/dynamics';
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
        "esri/graphic", 
        "esri/graphicsUtils",
        "esri/geometry/Point", 
        "esri/tasks/GeometryService", 
        "esri/tasks/Geoprocessor",
        "esri/tasks/FeatureSet", 
        "esri/tasks/RelationParameters",
        "esri/dijit/LayerList",
        "esri/dijit/Legend",
        "esri/dijit/BasemapGallery",
        "esri/dijit/analysis/SummarizeNearby",
        "esri/InfoTemplate",
        "esri/layers/WFSLayer",
        "esri/config",
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/renderers/UniqueValueRenderer",
        "esri/renderers/HeatmapRenderer",
        "esri/renderers/SimpleRenderer",
        "esri/Color",
        "dojo/domReady!",
      ],
      { css: true }
    ).then(([ArcGISMap, Graphic, graphicsUtils,
      Point, GeometryService, Geoprocessor,
      FeatureSet, RelationParameters, LayerList, 
      Legend, BasemapGallery, SummarizeNearby, InfoTemplate, 
      WFSLayer, esriConfig, FeatureLayer, SimpleLineSymbol, 
      SimpleFillSymbol, SimpleMarkerSymbol, UniqueValueRenderer, 
      HeatmapRenderer, SimpleRenderer, Color]) => {
      const map = new ArcGISMap("map", {
        basemap: "topo-vector",
        center: [this.state.sites[0].fsc_longitude, this.state.sites[0].fsc_latitude],
        zoom: 5,
      });

      var url =
        "https://dservices8.arcgis.com/32TQOipPYLOeSkYk/arcgis/services/Tree_loss_cluster/WFSServer";
      var opts = {
        url: url,
        version: "2.0.0",
        name: "Tree_loss_cluster",
      };

      var covidTravelTemplate = new InfoTemplate("${COUNTRY}", "<b>Travel Advisory: </b><p>${TravelAdvisory}</p><br><p>${RestrictionInfo}</p>");

      var covidTravelLayer = new FeatureLayer("https://services1.arcgis.com/vY6WuhLW0HkFe6Fl/arcgis/rest/services/TravelAdvisoriesV3/FeatureServer/0", {
        mode: FeatureLayer.MODE_SNAPSHOT,
        showLabels: true,
        outFields: ["*"],
        infoTemplate: covidTravelTemplate
      });

      var defaultSymbol = new SimpleFillSymbol().setStyle(SimpleFillSymbol.STYLE_NULL);
      defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);
      var renderer = new UniqueValueRenderer(defaultSymbol, "TravelAdvisory");
      renderer.addValue("Avoid non-essential travel",
        new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));
      renderer.addValue("Avoid non-essential travel with regional advisories",
        new SimpleFillSymbol().setColor(new Color([0, 255, 0, 0.5])));
      renderer.addValue("Avoid all travel",
        new SimpleFillSymbol().setColor(new Color([0, 0, 255, 0.5])));
      covidTravelLayer.setRenderer(renderer);

      var covidCasesTemplate = new InfoTemplate("${Country_Region}", "<b>Active Cases: </b><p>${Active}</p><br><b>Confirmed Cases: </b><p>${Confirmed}</p><br><b>Deaths: </b><p>${Deaths}</p><br><b>Recovered Cases: </b><p>${Recovered}</p><br>");
      var covidCasesLayer = new FeatureLayer("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2", {
        mode: FeatureLayer.MODE_SNAPSHOT,
        outFields: ["*"],
        infoTemplate: covidCasesTemplate
      });
      var heatmapRenderer = new HeatmapRenderer({
        field: "Active",
        blurRadius: 3,
        maxPixelIntensity: 100,
        minPixelIntensity: 0
      });
      covidCasesLayer.setRenderer(heatmapRenderer);

      var corruptionIndexTemplate = new InfoTemplate("${NAME}", "<b>CPI Score: </b><p>${CPI_Score_}</p><br><b>Rank: </b><p>${Rank}</p><br><b>Upper CI: </b><p>${Upper_CI}</p><br><b>Lower CI: </b><p>${Lower_CI}</p><br>");
      var corruptionIndexLayer = new FeatureLayer("https://services1.arcgis.com/RTK5Unh1Z71JKIiR/arcgis/rest/services/Corruption_Perception_Index_countries_layer/FeatureServer/0", {
        outFields: ["*"],
        infoTemplate: corruptionIndexTemplate
      });
      var corruptionIndexRenderer = new SimpleRenderer(new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128, 128, 128]))));
      corruptionIndexRenderer.setColorInfo({
        field: "CPI_Score_",
        minDataValue: 0,
        maxDataValue: 100,
        colors: [
          new Color([255, 255, 255]),
          new Color([127, 127, 0])
        ]
      });
      corruptionIndexLayer.setRenderer(corruptionIndexRenderer);


      var deforestationLayer = new WFSLayer();
      deforestationLayer.fromJson(opts);
      map.addLayer(corruptionIndexLayer);
      map.addLayer(covidTravelLayer);
      map.addLayer(covidCasesLayer);

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

      var legend = new Legend({
        map: map,
        layerInfos: [{
          title: "Travel Advisories for Countries",
          layer: covidTravelLayer
        },
        {
          title: "Covid Cases per Country",
          layer: covidCasesLayer
        },
        {
          title: "Corruption Perception Index (CPI) for Countries",
          layer: corruptionIndexLayer
        },
        {
          title: "Deforestation Tree Loss Clusters",
          layer: deforestationLayer
        }
        ],
      }, "legend");
      legend.startup();

      // Plot company locations
      function createSymbol(path, color) {
        var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setPath(path);
        markerSymbol.setColor(new Color(color));
        markerSymbol.setSize(50);
        return markerSymbol;
      }

      var geoprocessor, geometryService, geometries, baseGraphics;
      geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
      geoprocessor = new Geoprocessor("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Network/ESRI_DriveTime_US/GPServer/CreateDriveTimePolygons");


      map.on("load", () => {
        var iconPath = "M32, 2a20, 20, 0, 0, 0-20, 20c0, 18, 20, 40, 20, 40s20-22, 20-40A20, 20, 0, 0, 0, 32, 2zm0, 28a8, 8, 0, 1, 1, 8-8, 8, 8, 0, 0, 1-8, 8z";
        // var iconPath = "M24.0,2.199C11.9595,2.199,2.199,11.9595,2.199,24.0c0.0,12.0405,9.7605,21.801,21.801,21.801c12.0405,0.0,21.801-9.7605,21.801-21.801C45.801,11.9595,36.0405,2.199,24.0,2.199zM31.0935,11.0625c1.401,0.0,2.532,2.2245,2.532,4.968S32.4915,21.0,31.0935,21.0c-1.398,0.0-2.532-2.2245-2.532-4.968S29.697,11.0625,31.0935,11.0625zM16.656,11.0625c1.398,0.0,2.532,2.2245,2.532,4.968S18.0555,21.0,16.656,21.0s-2.532-2.2245-2.532-4.968S15.258,11.0625,16.656,11.0625zM24.0315,39.0c-4.3095,0.0-8.3445-2.6355-11.8185-7.2165c3.5955,2.346,7.5315,3.654,11.661,3.654c4.3845,0.0,8.5515-1.47,12.3225-4.101C32.649,36.198,28.485,39.0,24.0315,39.0z";
        var color = "#024823";
        this.state.sites.forEach(site => {
          console.log(site);
          var point = [site.fsc_longitude, site.fsc_latitude];
          var graphic = new Graphic(new Point(point), createSymbol(iconPath, color));
          map.graphics.add(graphic);
        })

        
      })

      var basemapGallery = new BasemapGallery({
        showArcGISBasemaps: true,
        map: map
      }, "basemapGallery");

      basemapGallery.startup();

      basemapGallery.on("error", function (msg) {
        console.log("basemap gallery error:  ", msg);
      });



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
        <div className="webmap-controls">
          <div id="basemapGallery"></div>
          <div id="layerListDom"></div>
        </div>

        <div className="webmap" id="map"></div>
        <div id="info"><div id="legend"></div></div>
      </>
    );
  }
}
