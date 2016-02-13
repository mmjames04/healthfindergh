class CreateFacilities < ActiveRecord::Migration
  def change
    create_table :facilities do |t|
      t.string :name
      t.string :type
      t.string :town
      t.string :district
      t.string :region
      t.float :latitude
      t.float :longitude
      t.string :phone
      t.string :website
      t.text :specialty

      t.timestamps null: false
    end
  end
end
