json.array!(@doctors) do |doctor|
  json.extract! doctor, :id, :last_name, :first_name, :photo, :phone, :email, :specialty, :med_school, :grad_date, :bio
  json.url doctor_url(doctor, format: :json)
end
