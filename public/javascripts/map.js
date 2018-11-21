'use strict';

const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmNvZGVyOTIiLCJhIjoiY2pkbmRmdno4MGQ2ODJ4bWtxcG02dnk1ciJ9.DehQETKEOyrOha4hqclYvg';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [41.3948976, 2.0787281].reverse(),
    zoom: 12
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = [position.coords.longitude, position.coords.latitude];
      map.setCenter(pos);
    }, () => {
      alert('Issue retrieving your location');
    });
  } else {
    alert(' Your browser doesn\'t support Geolocation');
  }

  axios.get('http://localhost:3000/api/restaurants')
    .then((result) => {
      result.data.forEach(restaurant => {
        new mapboxgl.Marker()
          .setLngLat(restaurant.location.coordinates.reverse())
          .addTo(map);
      });
    })
    .catch(err => console.error(err));
};

window.addEventListener('load', main);
