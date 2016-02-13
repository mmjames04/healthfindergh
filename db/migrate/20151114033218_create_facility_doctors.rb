class CreateFacilityDoctors < ActiveRecord::Migration
  def change
    create_table :facility_doctors do |t|
      t.integer :doctor_id
      t.integer :facility_id
      t.timestamps null: false
    end
  end
end
