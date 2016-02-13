class User < ActiveRecord::Base

	has_many :reviews

	def self.create_with_omniauth(auth)
		user = User.new
		user.username = auth["info"]["name"]
		user.photo = auth["info"]["image"]
		user.save
	end
end
