// import React from "react";
// import {Helmet} from "react-helmet";
// // import { loadModules } from "esri-loader";

// export default class WebMapViewTest extends React.Component {
//   constructor(props) {
//     super(props);
//     this.mapRef = React.createRef();
//   }

//   componentWillReceiveProps() {}

//   componentWillMount() {
//     const script = document.createElement("script");

//     script.src = "https://js.arcgis.com/3.33/";
//     script.async = true;

//     document.body.appendChild(script);
//   }

//   // componentWillUnmount() {
//   // if (this.view) {
//   //   // destroy the map view
//   //   this.view.container = null;
//   // }
//   // }

//   render() {
//     var map;

//     require([
//       "esri/map",
//       "esri/InfoTemplate",
//       "esri/layers/WFSLayer",
//       "esri/config",
//       "dojo/domReady!",
//     ], function (Map, InfoTemplate, WFSLayer, esriConfig) {
//       map = new Map("map", {
//         basemap: "satellite",
//         center: [138, 35],
//         zoom: 7,
//       });

//       // esriConfig.defaults.io.proxyUrl = "/proxy/";

//       var url =
//         "https://dservices.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/services/JapanPrefectures2018/WFSServer";

//       var opts = {
//         url: url,
//         version: "2.0.0",
//         name: "JapanPrefectures2018",
//       };
//       var layer = new WFSLayer();

//       layer.fromJson(opts);

//       map.addLayer(layer);
//     });

//     return (
//       <>
//       <Helmet>
//         <link rel="stylesheet" href="https://js.arcgis.com/3.33/esri/css/esri.css"/>
//         <script src="https://js.arcgis.com/3.33/"></script>
//       </Helmet>
//         {/* <div className="webmap-controls"></div> */}
//         <div className="webmap" id="map" />
//       </>
//     );
//   }
// }
