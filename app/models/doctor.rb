class Doctor < ActiveRecord::Base
	has_many :facilities through: :facility_doctors
	has_many :facility_doctors
end
