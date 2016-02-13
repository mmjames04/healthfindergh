class Review < ActiveRecord::Base

	belongs_to :user
	belongs_to :doctor
	belongs_to :facility
end
