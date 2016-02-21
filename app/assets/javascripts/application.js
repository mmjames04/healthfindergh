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
//= require_tree .

navigator.geolocation.getCurrentPosition(function(position){
	// var current_lat = position.coords.latitude;
	// var current_long = position.coords.longitude;
	var current_lat = 5.53282;
	var current_long = -0.2177;

	var map = L.map('map').setView([current_lat, current_long], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'jamescorey82.cigwmmw8k0s9tvkm5oddb184s',
	    accessToken: 'pk.eyJ1IjoiamFtZXNjb3JleTgyIiwiYSI6ImNpZ3dtbXhmbjBzNnQ0bW0zeGYzNjVwdTAifQ.SES6Vh2bG_ltfmXzLkWBeg'
	}).addTo(map);

	$.ajax({
		method: "GET",
		url: "/facilities.json",
		dataType: "json"
	}).done(function(results){
			var low_lat = (current_lat - 0.15);
			var high_lat = (current_lat + 0.15);
			var low_long = (current_long - 0.15);
			var high_long = (current_long + 0.15);

		$.each(results, function(i, result){
			if (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long) {
				var marker = L.marker([result.latitude, result.longitude]);
				map.addLayer(marker);
				marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
			}
		});

		map.on('moveend', function(){
			var center = map.getCenter();
			current_lat = center.lat;
			current_long = center.lng;

			var low_lat = (current_lat - 0.15);
			var high_lat = (current_lat + 0.15);
			var low_long = (current_long - 0.15);
			var high_long = (current_long + 0.15);

			$.each(results, function(i, result){
				if (low_lat < result.latitude && result.latitude < high_lat && low_long < result.longitude && result.longitude < high_long) {
					var marker = L.marker([result.latitude, result.longitude]);
					map.addLayer(marker);
					marker.bindPopup('<a href="/facilities/'+ result.id + '">'+ result.name +'</a>');
				}
			});

		});

	});
});
