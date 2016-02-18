json.array!(@facilities) do |facility|
  json.extract! facility, :id, :name, :town, :district, :region, :latitude, :longitude, :phone, :website, :specialty, :photo, :category
  json.url facility_url(facility, format: :json)
end
