# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

navigator.geolocation.getCurrentPosition (position) ->
  current_lat = position.coords.latitude
  current_long = position.coords.longitude
  if current_lat < 12 and current_lat > 4 and current_long > -7 and current_long < 2
  else
    current_lat = 5.622460
    current_long = -0.173571
  if !map
    map = L.map('map').setView([
      current_lat
      current_long
    ], 15)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
    maxZoom: 18
    id: 'jamescorey82.cigwmmw8k0s9tvkm5oddb184s'
    accessToken: 'pk.eyJ1IjoiamFtZXNjb3JleTgyIiwiYSI6ImNpZ3dtbXhmbjBzNnQ0bW0zeGYzNjVwdTAifQ.SES6Vh2bG_ltfmXzLkWBeg').addTo map
  myMarker = L.marker([
    current_lat
    current_long
  ], icon: L.AwesomeMarkers.icon(
    icon: 'home'
    prefix: 'fa'
    markerColor: 'green')).addTo(map)
  myMarker.bindPopup 'My Location'
  $.ajax(
    method: 'GET'
    url: '/facilities.json'
    dataType: 'json').done (results) ->
    markers = new (L.FeatureGroup)

    populate = ->
      center = map.getCenter()
      current_lat = center.lat
      current_long = center.lng
      low_lat = current_lat - 0.1
      high_lat = current_lat + 0.1
      low_long = current_long - 0.1
      high_long = current_long + 0.1
      $.each results, (i, result) ->
        `var marker`
        `var marker`
        `var marker`
        `var marker`
        `var marker`
        `var marker`
        category = result.category.toLowerCase()
        if (category == 'clinic' or category == 'polyclinic' or category == 'health centre') and low_lat < result.latitude and result.latitude < high_lat and low_long < result.longitude and result.longitude < high_long
          marker = L.marker([
            result.latitude
            result.longitude
          ], icon: L.AwesomeMarkers.icon(
            icon: 'medkit'
            prefix: 'fa'
            markerColor: 'blue')).addTo(map)
          marker.bindPopup '<a href="/facilities/' + result.id + '">' + result.name + '</a>'
          markers.addLayer marker
        else if category == 'maternity home' and low_lat < result.latitude and result.latitude < high_lat and low_long < result.longitude and result.longitude < high_long
          marker = L.marker([
            result.latitude
            result.longitude
          ], icon: L.AwesomeMarkers.icon(
            icon: 'female'
            prefix: 'fa'
            markerColor: 'pink')).addTo(map)
          marker.bindPopup '<a href="/facilities/' + result.id + '">' + result.name + '</a>'
          markers.addLayer marker
        else if (category == 'hospital' or category == 'district hospital' or category == 'municipal hospital' or category == 'teaching hospital') and low_lat < result.latitude and result.latitude < high_lat and low_long < result.longitude and result.longitude < high_long
          marker = L.marker([
            result.latitude
            result.longitude
          ], icon: L.AwesomeMarkers.icon(
            icon: 'h-square'
            prefix: 'fa'
            markerColor: 'red')).addTo(map)
          marker.bindPopup '<a href="/facilities/' + result.id + '">' + result.name + '</a>'
          markers.addLayer marker
        else if category == 'psychiatric hospital' and low_lat < result.latitude and result.latitude < high_lat and low_long < result.longitude and result.longitude < high_long
          marker = L.marker([
            result.latitude
            result.longitude
          ], icon: L.AwesomeMarkers.icon(
            icon: 'user-md'
            prefix: 'fa'
            markerColor: 'purple')).addTo(map)
          marker.bindPopup '<a href="/facilities/' + result.id + '">' + result.name + '</a>'
          markers.addLayer marker
        else if category == 'training institution' and low_lat < result.latitude and result.latitude < high_lat and low_long < result.longitude and result.longitude < high_long
          marker = L.marker([
            result.latitude
            result.longitude
          ], icon: L.AwesomeMarkers.icon(
            icon: 'graduation-cap'
            prefix: 'fa'
            markerColor: 'orange')).addTo(map)
          marker.bindPopup '<a href="/facilities/' + result.id + '">' + result.name + '</a>'
          markers.addLayer marker
        else if category == 'chps' and low_lat < result.latitude and result.latitude < high_lat and low_long < result.longitude and result.longitude < high_long
          marker = L.marker([
            result.latitude
            result.longitude
          ], icon: L.AwesomeMarkers.icon(
            icon: 'stethoscope'
            prefix: 'fa'
            markerColor: 'cadetblue')).addTo(map)
          marker.bindPopup '<a href="/facilities/' + result.id + '">' + result.name + '</a>'
          markers.addLayer marker
        else if low_lat < result.latitude and result.latitude < high_lat and low_long < result.longitude and result.longitude < high_long
          marker = L.marker([
            result.latitude
            result.longitude
          ], icon: L.AwesomeMarkers.icon(
            icon: 'building'
            prefix: 'fa'
            markerColor: 'black')).addTo(map)
          marker.bindPopup '<a href="/facilities/' + result.id + '">' + result.name + '</a>'
          markers.addLayer marker
        return
      false

    map.addLayer markers
    populate()
    map.on 'moveend', ->
      `var markers`
      markers = new (L.FeatureGroup)
      map.addLayer markers
      populate()
      return
    return
  return

# ---
# generated by js2coffee 2.1.0