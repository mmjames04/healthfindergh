class CreateDoctors < ActiveRecord::Migration
  def change
    create_table :doctors do |t|
      t.string :last_name
      t.string :first_name
      t.string :photo
      t.string :phone
      t.string :email
      t.string :specialty
      t.string :med_school
      t.date :grad_date
      t.text :bio

      t.timestamps null: false
    end
  end
end
