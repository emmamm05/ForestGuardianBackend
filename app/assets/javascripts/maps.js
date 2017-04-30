/**
 * Created by Luis Alonso Murillo Rojas on 11/12/16.
 */

function displayWildfiresDetails(lat, lng, brightness, scan, track, date, time, satellite, confidence, version, bright_t31, frp, daynight) {
    var jsonMODIS = {"LATITUDE":lat,
        "LONGITUDE":lng,
        "BRIGHTNESS":brightness,
        "SCAN":scan,
        "TRACK":track,
        "ACQ_DATE":date,
        "ACQ_TIME":time,
        "SATELLITE":satellite,
        "CONFIDENCE":confidence,
        "VERSION":version,
        "BRIGHT_T31":bright_t31,
        "FRP":frp,
        "DAYNIGHT":daynight};
    console.log(JSON.stringify(jsonMODIS));
    try {
        mobile.getMODISData(JSON.stringify(jsonMODIS));
    } catch(err) {
        console.log("Error trying to invoke mobile method");
    }
}

function setUserCurrentLocation(latitude, longitude) {
    map.setView(L.latLng(latitude, longitude), 8);
    try {
        mobile.notifyCurrentLocation();
    } catch (err) {
        console.log("Error trying to invoke mobile method");
    }
}

function setRouteFromTwoPoints(latitudeA, longitudeA, latitudeB, longitudeB) {
    route.setWaypoints([
        L.latLng(latitudeA, longitudeA),
        L.latLng(latitudeB, longitudeB)
    ]);
}

function removeRoute() {
    route.setWaypoints([]);
}

function addFireStationMark(latitude, longitude) {
    fireStationMarker = L.marker([latitude, longitude], {icon: fireStationIcon});
    fireStationMarker.addTo(map);
}

function removeFireStationMark() {
    fireStationMarker.removeFrom(map);
}

function mobileShowDetails() {
    try {
        mobile.showWildfireDetails();
    } catch(err) {
        console.log("Error trying to invoke mobile method");
    }
}

function addWildfireMessage(latitude, longitude, brightness, temperature, humidity) {
    var popup = L.popup({offset: L.point(0, -37)})
        .setLatLng(L.latLng(latitude, longitude))
        .setContent('<b>Incendio</b>' +
            '<br>Intecidad: ' + brightness +
            '<br>Temperatura: ' + temperature + " &#8451;" +
            '<br>Humedad: ' + humidity + "%" +
            '<br><a href="javascript:mobileShowDetails();">Detalles</a>')
        .openOn(map);
}

function removeWildfireMessage() {
    map.closePopup();
}

function onEachFeature(feature, layer) {
    layer.setIcon(fireIcon);
    layer.on('click', function (e) {
        //console.log(e);
        map.setView(e.latlng, 13);
        currentFireCoordinates = L.latLng(e.latlng.lat, e.latlng.lng);
        displayWildfiresDetails(e.target.feature.properties.LATITUDE,
            e.target.feature.properties.LONGITUDE,
            e.target.feature.properties.BRIGHTNESS,
            e.target.feature.properties.SCAN,
            e.target.feature.properties.TRACK,
            e.target.feature.properties.ACQ_DATE,
            e.target.feature.properties.ACQ_TIME,
            e.target.feature.properties.SATELLITE,
            e.target.feature.properties.CONFIDENCE,
            e.target.feature.properties.VERSION,
            e.target.feature.properties.BRIGHT_T31,
            e.target.feature.properties.FRP,
            e.target.feature.properties.DAYNIGHT);
    });
}

$(function() {
    var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
        attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
    var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
    var map = new L.Map('map').addLayer(osm).setView(L.latLng(10.07568504578726, -84.31182861328125), 8);

    //Global variables
    var currentFireCoordinates = null;

    /* Routing */

    var route = L.Routing.control({
        waypoints: [],
        routeWhileDragging: false,
        createMarker: function() { return null; },
        router: L.Routing.graphHopper('c06e05f1-cd2f-4c9d-921c-06d634c9c8e9')
    });
    route.addTo(map);


    /* Fire station mark */
    var fireStationIcon = L.icon({
        iconUrl: 'firemen.png',
        iconSize:     [32, 37],
        iconAnchor:   [16, 36],
        popupAnchor:  [0, -37]
    });
    var fireStationMarker = null;


    /* Wildfire icon */

    var fireIcon = L.icon({
        iconUrl: '/assets/fire.png',
        iconSize:     [32, 37],
        iconAnchor:   [16, 36],
        popupAnchor:  [0, -37]
    });

    /* MODIS geoJSON */

    var geojsonLayer = new L.GeoJSON.AJAX("/modis_data/fires.json", {
        onEachFeature: onEachFeature
    });

    geojsonLayer.addTo(map);

});
