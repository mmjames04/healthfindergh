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
//= require_tree .

navigator.geolocation.getCurrentPosition(function(position){
	
	var current_lat = position.coords.latitude;
	var current_long = position.coords.longitude;

	if (current_lat < 12 && current_lat > 4 && current_long > -7 && current_long < 2){
	} else {
		current_lat = 5.5423;
		current_long = -0.2177;
	}

	var map = L.map('map').setView([current_lat, current_long], 16);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'jamescorey82.cigwmmw8k0s9tvkm5oddb184s',
	    accessToken: 'pk.eyJ1IjoiamFtZXNjb3JleTgyIiwiYSI6ImNpZ3dtbXhmbjBzNnQ0bW0zeGYzNjVwdTAifQ.SES6Vh2bG_ltfmXzLkWBeg'
	}).addTo(map);

	var myMarker = L.marker([current_lat,current_long], {icon: L.AwesomeMarkers.icon({icon: 'home', prefix: 'fa', markerColor: 'green'})}).addTo(map);
	myMarker.bindPopup('My Location');

	$.ajax({
		method: "GET",
		url: "/facilities.json",
		dataType: "json"
	}).done(function(results){

		var markers = new L.FeatureGroup();

		function populate(){
			var center = map.getCenter();
			current_lat = center.lat;
			current_long = center.lng;

			var low_lat = (current_lat - 0.1);
			var high_lat = (current_lat + 0.1);
			var low_long = (current_long - 0.1);
			var high_long = (current_long + 0.1);

			$.each(results, function(i, result){
				var category = result.category.toLowerCase()
				if ((category == 'clinic' || category == 'polyclinic' || category == 'health centre') && (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long)){
					var marker = L.marker([result.latitude, result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'medkit', prefix: 'fa', markerColor: 'blue'})}).addTo(map);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
					markers.addLayer(marker);
				} else if ((category == 'maternity home') && (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long)) {
					var marker = L.marker([result.latitude, result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'female', prefix: 'fa', markerColor: 'pink'})}).addTo(map);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
					markers.addLayer(marker);
				} else if ((category == 'hospital' || category == 'district hospital' || category == 'municipal hospital' || category == 'teaching hospital') && (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long)) {
					var marker = L.marker([result.latitude, result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'h-square', prefix: 'fa', markerColor: 'red'})}).addTo(map);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
					markers.addLayer(marker);
				} else if ((category == 'psychiatric hospital') && (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long)) {
					var marker = L.marker([result.latitude, result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'user-md', prefix: 'fa', markerColor: 'purple'})}).addTo(map);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
					markers.addLayer(marker);
				} else if ((category == 'training institution') && (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long)) {
					var marker = L.marker([result.latitude, result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'graduation-cap', prefix: 'fa', markerColor: 'orange'})}).addTo(map);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
					markers.addLayer(marker);
				} else if ((category == 'chps') && (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long)) {
					var marker = L.marker([result.latitude, result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'stethoscope', prefix: 'fa', markerColor: 'cadetblue'})}).addTo(map);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
					markers.addLayer(marker);
				} else if (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long) {
					var marker = L.marker([result.latitude, result.longitude], {icon: L.AwesomeMarkers.icon({icon: 'building', prefix: 'fa', markerColor: 'black'})}).addTo(map);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
					markers.addLayer(marker);
				} 
			});
			return false;
		}

		map.addLayer(markers)
		populate();

		map.on('moveend', function(){
			var markers = new L.FeatureGroup();
			map.addLayer(markers);
			populate();
		});
	});
});
