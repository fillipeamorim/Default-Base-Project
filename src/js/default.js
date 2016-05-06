// Default JavaScript Functions and Initiations

// Load Custom Google Font
WebFont.load({
  google: {
    families: ['Ubuntu:300,400,500,700', 'Montserrat:400,700']
  }
});


// Setup WOW.js
var wow = new WOW({
  boxClass:     'content-block',
  animateClass: 'active',
  offset:       1,
  mobile:       true,
  live:         true
});
// Initiate WOW.js
wow.init();


// Google Map
function googleMap() {
  var map = document.getElementById('google-map');
  var map_options = {
    center: new google.maps.LatLng(-33.867363,151.183539),
    scrollwheel: false,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(map, map_options)
  // Map Marker
  var myLatlng = new google.maps.LatLng(-33.867363,151.183539);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: 'img/location-pin.svg'
  });
}
google.maps.event.addDomListener(window, 'load', googleMap);