mapboxgl.accessToken = 'pk.eyJ1IjoiZWxsaWVmcnkiLCJhIjoiY2xsc2RtN3htMHRwdzNlczJwNDJkMWN0bSJ9.0yud2cyis9T9rp3CeanjIA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-96, 37.09], // starting position [lng, lat]
  zoom: 4, // starting zoom
});

const nav = new mapboxgl.NavigationControl({
  visualizePitch: true
}); // create a zoom / pitch control
map.addControl(nav, 'bottom-right'); // add it to the map

// Create a default Marker and add it to the map.
const gc = new mapboxgl.Marker()
  .setLngLat([-73.9833, 40.7423])
  .setPopup(new mapboxgl.Popup().setHTML(`
    <h3>Graduate Center</h3>
    <div>City University of New York</div>
    <div>365 5th Ave, New York, NY 10016</div>
    <div>Coordinates: [-73.9833, 40.7423]</div>
  `)) // add popup
  .addTo(map);
