class Facility < ActiveRecord::Base
	has_many :doctors, :through => :facility_doctor
	has_many :facility_doctors
	acts_as_mappable :default_units => :kms,
					:lng_column_name => :longitude,
					:lat_column_name => :latitude
end
