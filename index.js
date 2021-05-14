import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Attribution, ScaleLine, OverviewMap, ZoomToExtent, defaults as defaultControls} from 'ol/control';

let basemapLayer = new TileLayer({
  source: new OSM({
    url : "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
  })
})

let overviewLayer = new TileLayer({
  source: new OSM({
    url : "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
  })
})

let wmsLayer = new TileLayer({
  source: new TileWMS({
    url: 'https://sedac.ciesin.columbia.edu/geoserver/wms',
    params: {'LAYERS': 'ndh:ndh-earthquake-frequency-distribution', 'TILED': true},
    transition: 0,
  }),
})

let earthquakeLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  })
})

let overviewMapControl = new OverviewMap({
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: [
    overviewLayer
  ],
  collapsed: false,
});

let zoomToExtentControl = new ZoomToExtent({
  extent: [
    7112924,
   -1271912,
   22121487,
    6545455
  ],
})

function scaleControl() {
  let control = new ScaleLine({
    units: 'metric',
    bar: false,
    steps: 4,
    text: true,
    minWidth: 140,
  });
  return control;
}

const map = new Map({
  target: 'map',
  layers: [
    basemapLayer,
    wmsLayer,
    earthquakeLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 0,
  }),
  controls: defaultControls().extend([
    overviewMapControl,
    zoomToExtentControl,
    scaleControl()
  ])
})
