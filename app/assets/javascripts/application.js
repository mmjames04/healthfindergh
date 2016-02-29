// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require dist/leaflet.awesome-markers.js
//= require leaflet-routing-machine/dist/leaflet-routing-machine.js
//= require_tree .

navigator.geolocation.getCurrentPosition(function(position){
	var current_lat = position.coords.latitutde;
	var current_long = position.coords.longitude;

	if (current_lat < 12 && current_lat > 4 && current_long > -7 && current_long < 2){
	} else {
		current_lat = 5.622460;
		current_long = -0.173571;
	}

	var show_map = L.map('show_map');

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'jamescorey82.cigwmmw8k0s9tvkm5oddb184s',
	    accessToken: 'pk.eyJ1IjoiamFtZXNjb3JleTgyIiwiYSI6ImNpZ3dtbXhmbjBzNnQ0bW0zeGYzNjVwdTAifQ.SES6Vh2bG_ltfmXzLkWBeg'
	}).addTo(show_map);

	var id = $("#facility_id").text();
	var url = "/facilities/" + id + ".json"

	$.ajax({
		method: "GET",
		url: url,
		dataType: "json"
	}).done(function(result){

		var panLat = (current_lat + result.latitude)/2
		var panLong = (current_long + result.longitude)/2

		show_map.panTo(new L.LatLng(panLat, panLong));

		L.Routing.control({
			waypoints: [
				L.latLng(current_lat, current_long),
				L.latLng(result.latitude, result.longitude)
			]
		}).addTo(show_map);

		var myMarker = L.marker([current_lat,current_long], {icon: L.AwesomeMarkers.icon({icon: 'home', prefix: 'fa', markerColor: 'green'})}).addTo(show_map);
		myMarker.bindPopup('My Location');

		var healthMarker = L.marker([result.latitude,result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'medkit', prefix: 'fa', markerColor: 'green'})}).addTo(show_map);
		healthMarker.bindPopup(result.name);

		if (result.phone && result.website) {
			$('#phoneWebsite').html("<p>" + result.phone + " | <a href='" + result.website + "'>Visit Website</a></p>");
		} else if (result.phone && !result.website) {
			$('#phoneWebsite').html("<p>" + result.phone + " | <a href='/facilities/" + result.id + "/edit'>Add Website</a></p>")
		} else if (!result.phone && result.website) {
			$('#phoneWebsite').html("<p><a href='facilities/" + result.id + "/edit'>Add Phone</a> | " + result.website + "</p>")
		} else {
			$('#phoneWebsite').html("<p><a href='/facilities/" + result.id + "/edit'>Add Phone</a> | <a href='/facilities/" + result.id + "/edit'>Add Website</a></p>")
		}

	});
});

