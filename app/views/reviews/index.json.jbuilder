json.array!(@reviews) do |review|
  json.extract! review, :id, :doctor_id, :facility_id, :user_id, :body
  json.url review_url(review, format: :json)
end
