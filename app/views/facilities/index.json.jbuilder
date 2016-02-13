json.array!(@facilities) do |facility|
  json.extract! facility, :id, :name, :type, :town, :district, :region, :latitude, :longitude, :phone, :website, :specialty
  json.url facility_url(facility, format: :json)
end
