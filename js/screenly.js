var now = moment().format('MMM Do YYYY, h:mm a');
$("#date").append( now );

var HTMLdepartmentEntry = '<dt>%data%</dt>'
var HTMLvehicleEntry = '<dd>%data%</dd>'

var deliveries = {
	"deliveries" : [
		{
			"departmentName" : "West Palm Beach Fire Department",
			"vehicleType" : "Sutphen Custom Pumper",
			"location" : "West Palm Beach, FL",
		},
		{
			"departmentName" : "Orlando Fire Department",
			"vehicleType" : "Sutphen SVI Heavy Rescue<br>Sutphen SP95 Platform<br>Sutphen SP95 Platform",
			"location" : "Orlando, FL",
		},
		{
			"departmentName" : "Pembroke Pines Fire Department",
			"vehicleType" : "Sutphen S3 Pumper",
			"location" : "Pembroke Pines, FL",
		},
		{
			"departmentName" : "St. Petersburg Fire Department",
			"vehicleType" : "Sutphen SL100 Ladder<br>Sutphen SL75",
			"location" : "Saint Petersburg, FL",
		},
		{
			"departmentName" : "South Pasadena Fire Department",
			"vehicleType" : "Sutphen SP70 Platform",
			"location" : "South Pasadena, FL",
		},
		{
			"departmentName" : "Boynton Beach Fire Department",
			"vehicleType" : "Sutphen SL75 Ladder",
			"location" : "Boynton Beach, FL",
		},
		{
			"departmentName" : "Hernando Beach Fire Department",
			"vehicleType" : "Sutphen S2 Pumper",
			"location" : "Hernando Beach, FL",
		},
	],
	"display" : function () {
		for(delivery in deliveries.deliveries){
			var formattedDepartmentEntry = 
				HTMLdepartmentEntry.replace("%data%", deliveries.deliveries[delivery].departmentName);
				$("#deliveryEntry").append([formattedDepartmentEntry]);
			var formattedVehicleEntry =
				HTMLvehicleEntry.replace("%data%", deliveries.deliveries[delivery].vehicleType);
				$("#deliveryEntry").append([formattedVehicleEntry]);
		};
	}	
};

var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // iterates through school locations and appends each location to
    // the locations array
    for (var delivery in deliveries.deliveries) {
      locations.push(deliveries.deliveries[delivery].location);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window
    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name //contentString

    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map,marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});

deliveries.display();