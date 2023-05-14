var baseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

var map = L.map('map',{
    center:[-6.89077, 107.61199],
    zoom: 15,
    zoomControl: true,
    layers: [baseLayer],
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems:[{
        text: 'Start from here',
        callback: startHere
    }, '-', {
        text: 'Go to here',
        callback: goHere
    }]
});

var control = L.Routing.control({
    waypoints: [
        L.latLng(-6.89323,107.61048),
        L.latLng(-6.89093,107.61038)
    ],
    createMarker: function (i, waypoints, n) {
        var startIcon = L.icon({
            iconUrl:'http://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadownUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        var sampahIcon = L.icon({
            iconUrl:'http://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
            shadownUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        var destinationIcon = L.icon({
            iconUrl:'http://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            shadownUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        if (i==0){
            marker_icon = startIcon
        }else if (i > 0 && i < n - 1){
            marker_icon = sampahIcon
        }else if (i == n - 1){
            marker_icon = destinationIcon
        }
        var marker = L.marker(waypoints.latLng, {
            draggable: true,
            bounceOnAdd: true,
            bounceOnAddOptions:{
                duration: 1000,
                height: 800,
                function(){
                    (bindPopUp(myPopup).openOn(mymap))
                }
            },
            icon: marker_icon
        });
        return marker
    },

    showsAlternatives: true,
    altLineOptions: {
        styles: [
            { color: 'black', opacity: 0.15, weight: 9},
            { color: 'white', opacity: 0.8, weight: 6},
            { color: 'blue', opacity: 0.5, weight: 2}
        ]
    },
    geocoder: L.Control.Geocoder.nominatim()
})
.on('routingstart', showSpinner)
.on('routesfound routingerror', hideSpinner)
.addTo(map);

function startHere (e) {
    control.spliceWaypoints(0, 1, e.latLng);
}

function goHere (e) {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latLng);
}

var spinner = true;
function showSpinner() {
    if(spinner){
        document.getElementById("loader").style.display = "block";
    }
}

function hideSpinner() {
    document.getElementById("loader").style.display = "none";
}

map.on('zoomstart', function(e) { spinner = false });
map.on('zoomend', function(e) { spinner = true });