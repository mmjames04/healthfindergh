class FacilityDoctor < ActiveRecord::Base
	belongs_to :doctor 
	belongs_to :facility 
end
