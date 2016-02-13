class ChangeTableFacility < ActiveRecord::Migration
  def change
  	change_table :facilities do |t|
  		t.remove :type
  		t.string :category
  	end
  end
end
